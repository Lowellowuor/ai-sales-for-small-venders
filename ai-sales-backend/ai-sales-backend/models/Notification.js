// models/Notification.js
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Link to the User who receives the notification
    ref: 'User', // Refers to the 'User' model
    required: true
  },
  type: {
    type: String,
    enum: ['sales_alert', 'expense_alert', 'financial_tip', 'system_message', 'other'],
    default: 'system_message',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  link: { // Optional link if the notification should direct the user somewhere
    type: String,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

module.exports = mongoose.model('Notification', NotificationSchema);
