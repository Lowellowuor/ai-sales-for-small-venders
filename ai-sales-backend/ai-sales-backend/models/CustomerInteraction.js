// models/CustomerInteraction.js
const mongoose = require('mongoose');

const CustomerInteractionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Link to the User who owns this interaction record
    ref: 'User',
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId, // Link to the specific Customer
    ref: 'Customer',
    required: true
  },
  type: { // e.g., 'Call', 'SMS', 'WhatsApp', 'Email', 'Meeting'
    type: String,
    required: true,
    enum: ['Call', 'SMS', 'WhatsApp', 'Email', 'Meeting', 'Other']
  },
  date: {
    type: Date,
    default: Date.now
  },
  summary: { // Brief summary of the interaction
    type: String,
    required: true,
    trim: true
  },
  notes: { // Detailed notes
    type: String,
    trim: true
  },
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: {
    type: Date
  }
}, { timestamps: true }); // Adds createdAt and updatedAt

// Optional: Add an index for faster queries by customer and date
CustomerInteractionSchema.index({ customerId: 1, date: -1 });

module.exports = mongoose.model('CustomerInteraction', CustomerInteractionSchema);
