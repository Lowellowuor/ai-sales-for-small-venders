// routes/expenses.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); // Import the Expense model
const jwt = require('jsonwebtoken'); // For token verification
const User = require('../models/User'); // To ensure user exists
const mongoose = require('mongoose'); // <<< ADDED THIS CRUCIAL LINE

// --- Middleware to protect routes and get user ID from JWT ---
// This is a simplified example. In a real app, you'd put this in a separate middleware file.
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

// @route   POST /api/expenses
// @desc    Record a new expense
// @access  Private (requires authentication)
router.post('/', protect, async (req, res) => {
  const { amount, category, description, paymentMethod, date, notes } = req.body;

  // Basic validation
  if (amount === undefined || amount <= 0 || !category || !description) {
    return res.status(400).json({ message: 'Please provide a valid amount, category, and description for the expense.' });
  }

  try {
    // Ensure the user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const newExpense = new Expense({
      userId: req.user.id, // Get userId from the authenticated request
      amount,
      category,
      description,
      paymentMethod,
      date: date ? new Date(date) : undefined, // Use provided date or default to now
      notes
    });

    await newExpense.save();

    res.status(201).json({ message: 'Expense recorded successfully', expense: newExpense });
  } catch (err) {
    console.error('Error recording expense:', err.message);
    res.status(500).json({ message: 'Server error: Could not record expense. Please try again.' });
  }
});

// @route   GET /api/expenses
// @desc    Get all expenses for the authenticated user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 }); // Sort by most recent
    res.status(200).json(expenses);
  } catch (err) {
    console.error('Error fetching expenses:', err.message);
    res.status(500).json({ message: 'Server error: Could not fetch expenses.' });
  }
});

// @route   GET /api/expenses/summary
// @desc    Get aggregated expense summary by category for the authenticated user
// @access  Private
router.get('/summary', protect, async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } }, // Filter by user ID
      {
        $group: {
          _id: '$category', // Group by category
          totalAmount: { $sum: '$amount' },
          numberOfExpenses: { $sum: 1 }
        }
      },
      { $sort: { totalAmount: -1 } } // Sort by highest amount first
    ]);

    res.status(200).json(summary);
  } catch (err) {
    console.error('Error fetching expense summary:', err.message);
    res.status(500).json({ message: 'Server error: Could not fetch expense summary.' });
  }
});

// @route   GET /api/expenses/trends
// @desc    Get expense trends by day/month for the authenticated user
// @access  Private
router.get('/trends', protect, async (req, res) => {
  const { period = 'day' } = req.query; // 'day' or 'month'

  let groupByFormat;
  if (period === 'month') {
    groupByFormat = { year: { $year: '$date' }, month: { $month: '$date' } };
  } else {
    groupByFormat = { year: { $year: '$date' }, month: { $month: '$date' }, day: { $dayOfMonth: '$date' } };
  }

  try {
    const trends = await Expense.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $group: {
          _id: groupByFormat,
          dailyExpenses: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }, // Sort chronologically
      {
        $project: {
          _id: 0,
          date: {
            $dateFromParts: {
              year: '$_id.year',
              month: '$_id.month',
              day: { $ifNull: ['$_id.day', 1] } // Default to 1st day for monthly grouping
            }
          },
          totalExpenses: '$dailyExpenses',
          numberOfExpenses: '$count'
        }
      }
    ]);

    res.status(200).json(trends);
  } catch (err) {
    console.error('Error fetching expense trends:', err.message);
    res.status(500).json({ message: 'Server error: Could not fetch expense trends.' });
  }
});

module.exports = router;
