// models/Customer.js
const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Link to the User who owns this customer record
    ref: 'User', // Refers to the 'User' model
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phone: {
    type: String,
    trim: true,
    // Basic validation for Kenyan phone numbers (optional, can be more robust)
    match: [/^(?:254|\+254|0)?(7(?:(?:[0-2]|[9][0-9])(?:[0-9]{6}))|(1(?:(?:[0-2]|[9][0-9])(?:[0-9]{6}))))$/, 'Please fill a valid Kenyan phone number']
  },
  address: {
    type: String,
    trim: true
  },
  lastPurchaseDate: {
    type: Date
  },
  totalPurchasesAmount: {
    type: Number,
    default: 0
  },
  notes: {
    type: String,
    trim: true
  }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

// Optional: Add an index for faster lookup by userId and email/phone
CustomerSchema.index({ userId: 1, email: 1 }, { unique: false, sparse: true }); // sparse allows null email
CustomerSchema.index({ userId: 1, phone: 1 }, { unique: false, sparse: true }); // sparse allows null phone

module.exports = mongoose.model('Customer', CustomerSchema);
