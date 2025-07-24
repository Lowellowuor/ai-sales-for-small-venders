const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Customer = require('../models/Customer');
const Sale = require('../models/Sale');
const axios = require('axios');

// List all customers
router.get('/', auth, async (req, res) => {
  try {
    const customers = await Customer.find({ vendorId: req.user.id });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get customer details
router.get('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findOne({ 
      _id: req.params.id, 
      vendorId: req.user.id 
    }).populate('purchaseHistory.saleId');
    
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get AI-generated customer profile
router.get('/:id/ai-profile', auth, async (req, res) => {
  try {
    const customer = await Customer.findOne({ 
      _id: req.params.id, 
      vendorId: req.user.id 
    }).populate('purchaseHistory.saleId');
    
    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    // Call AI service to generate profile
    const response = await axios.post(`${process.env.AI_SERVICE_URL}/customer-profile`, {
      customerData: customer,
      purchaseHistory: customer.purchaseHistory
    });

    // Update customer with AI profile
    customer.aiProfile = response.data.profile;
    await customer.save();

    res.json(response.data.profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;