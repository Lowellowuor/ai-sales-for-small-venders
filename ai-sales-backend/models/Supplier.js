// models/Supplier.js
const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Link to the User who owns this supplier record
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  contactPerson: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  address: {
    type: String,
    trim: true
  },
  productsSupplied: { // What products/categories this supplier provides
    type: [String], // Array of strings
    default: []
  },
  paymentTerms: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  }
}, { timestamps: true }); // Adds createdAt and updatedAt

// Optional: Add a unique index for name per user to prevent duplicate suppliers for the same user
SupplierSchema.index({ userId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Supplier', SupplierSchema);
