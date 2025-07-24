const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    priceAtSale: Number
  }],
  totalAmount: Number,
  customerInfo: {
    name: String,
    contact: String
  },
  paymentMethod: String,
  saleDate: { type: Date, default: Date.now },
  aiInsights: Object
});

module.exports = mongoose.model('Sale', saleSchema);