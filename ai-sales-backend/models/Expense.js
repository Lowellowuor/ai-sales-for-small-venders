// models/Expense.js
const mongoose = require('mongoose'); // Only one import needed!

const ExpenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Link to the User who incurred the expense
    ref: 'User', // Refers to the 'User' model
    required: true
  },
  date: {
    type: Date,
    default: Date.now, // Automatically set to current date/time
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01 // Minimum amount for an expense
  },
  category: {
    type: String,
    required: true,
    trim: true,
    // You might want to define a fixed list of categories later, e.g., 'Rent', 'Utilities', 'Supplies', 'Transport', 'Salaries'
    default: 'Uncategorized'
  },
  description: {
    type: String,
    trim: true,
    required: true // A description is important for tracking
  },
  paymentMethod: { // e.g., 'Cash', 'M-Pesa', 'Bank Transfer', 'Card'
    type: String,
    enum: ['Cash', 'M-Pesa', 'Bank Transfer', 'Card', 'Other'],
    default: 'Cash'
  },
  notes: {
    type: String,
    trim: true
  }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

module.exports = mongoose.model('Expense', ExpenseSchema);
