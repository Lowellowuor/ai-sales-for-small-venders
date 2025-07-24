const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  purchaseHistory: [{
    saleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sale' },
    date: Date,
    amount: Number
  }],
  preferences: [String],
  aiProfile: Object
});

module.exports = mongoose.model('Customer', customerSchema);