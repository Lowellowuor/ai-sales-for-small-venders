// models/InventoryItem.js
const mongoose = require('mongoose');

const InventoryItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Link to the User who owns this inventory item
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: false // Not unique globally, but unique per user is good practice (handled in routes)
  },
  currentStock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  reorderPoint: { // The stock level at which a new order should be placed
    type: Number,
    min: 0,
    default: 5 // Default reorder point
  },
  costPrice: { // Cost to acquire one unit
    type: Number,
    required: true,
    min: 0
  },
  sellingPrice: { // Price at which one unit is sold
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    trim: true,
    default: 'General'
  },
  supplier: {
    type: String,
    trim: true
  },
  lastRestockDate: {
    type: Date
  },
  notes: {
    type: String,
    trim: true
  }
}, { timestamps: true }); // Adds createdAt and updatedAt

// Optional: Add a unique index for name per user to prevent duplicate items for the same user
InventoryItemSchema.index({ userId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('InventoryItem', InventoryItemSchema);
