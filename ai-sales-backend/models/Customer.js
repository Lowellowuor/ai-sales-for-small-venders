// models/Customer.js
const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    // Optional: Add email validation if needed, but not required for phone issue
    // match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    unique: true, // Ensure phone numbers are unique
    // More robust regex for Kenyan phone numbers
    // Supports: 07XXXXXXXX, 01XXXXXXXX, +2547XXXXXXXX, +2541XXXXXXXX, 2547XXXXXXXX, 2541XXXXXXXX
    match: [
      /^(?:0|254|\+254)(7\d{8}|1\d{8})$/,
      'Please fill a valid Kenyan phone number (e.g., 07XXXXXXXX, +2547XXXXXXXX, 01XXXXXXXX, +2541XXXXXXXX)'
    ]
  },
  address: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema);
