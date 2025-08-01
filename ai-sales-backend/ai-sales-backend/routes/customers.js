// routes/customers.js
const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer'); // Import the Customer model
const jwt = require('jsonwebtoken'); // For token verification

// --- Middleware to protect routes and get user ID from JWT ---
const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user info (id, email) to the request
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
// --- END Middleware ---

// @route   POST /api/customers
// @desc    Add a new customer
// @access  Private
router.post('/', protect, async (req, res) => {
  const { name, email, phone, address, lastPurchaseDate, totalPurchasesAmount, notes } = req.body;

  // Basic validation
  if (!name) {
    return res.status(400).json({ message: 'Customer name is required.' });
  }

  try {
    const newCustomer = new Customer({
      userId: req.user.id,
      name,
      email,
      phone,
      address,
      lastPurchaseDate: lastPurchaseDate ? new Date(lastPurchaseDate) : undefined,
      totalPurchasesAmount: totalPurchasesAmount || 0,
      notes
    });

    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    console.error('Error adding customer:', err.message);
    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error: Could not add customer.' });
  }
});

// @route   GET /api/customers
// @desc    Get all customers for the authenticated user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const customers = await Customer.find({ userId: req.user.id }).sort({ name: 1 });
    res.status(200).json(customers);
  } catch (err) {
    console.error('Error fetching customers:', err.message);
    res.status(500).json({ message: 'Server error: Could not fetch customers.' });
  }
});

// @route   GET /api/customers/:id
// @desc    Get a single customer by ID for the authenticated user
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id, userId: req.user.id });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found or not authorized.' });
    }
    res.status(200).json(customer);
  } catch (err) {
    console.error('Error fetching customer:', err.message);
    res.status(500).json({ message: 'Server error: Could not fetch customer.' });
  }
});

// @route   PUT /api/customers/:id
// @desc    Update a customer by ID for the authenticated user
// @access  Private
router.put('/:id', protect, async (req, res) => {
  const { name, email, phone, address, lastPurchaseDate, totalPurchasesAmount, notes } = req.body;

  try {
    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        $set: {
          name,
          email,
          phone,
          address,
          lastPurchaseDate: lastPurchaseDate ? new Date(lastPurchaseDate) : undefined,
          totalPurchasesAmount,
          notes,
          updatedAt: Date.now() // Manually update updatedAt if not using {timestamps: true} for update
        }
      },
      { new: true, runValidators: true } // Return updated document and run schema validators
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found or not authorized.' });
    }
    res.status(200).json(updatedCustomer);
  } catch (err) {
    console.error('Error updating customer:', err.message);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error: Could not update customer.' });
  }
});

// @route   DELETE /api/customers/:id
// @desc    Delete a customer by ID for the authenticated user
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const deletedCustomer = await Customer.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found or not authorized.' });
    }
    res.status(200).json({ message: 'Customer deleted successfully.' });
  } catch (err) {
    console.error('Error deleting customer:', err.message);
    res.status(500).json({ message: 'Server error: Could not delete customer.' });
  }
});

module.exports = router;
