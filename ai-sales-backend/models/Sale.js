const mongoose = require('mongoose');

const SaleItemSchema = new mongoose.Schema({
  productId: { // You might want to reference a Product model later, but for now, a string is fine
    type: String,
    required: true,
    trim: true
  },
  productName: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0
  },
  costPrice: { // Optional: if you track cost for profit calculation
    type: Number,
    min: 0,
    default: 0
  },
  subtotal: { // Calculated: quantity * unitPrice
    type: Number,
    required: true,
    min: 0
  },
  profitPerItem: { // Optional: (unitPrice - costPrice)
    type: Number,
    default: 0
  }
}, { _id: false }); // Do not create a separate _id for sub-documents if not needed

const SaleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Link to the User who made the sale
    ref: 'User', // Refers to the 'User' model
    required: true
  },
  date: {
    type: Date,
    default: Date.now, // Automatically set to current date/time
    required: true
  },
  items: [SaleItemSchema], // Array of items sold in this transaction
  totalAmount: { // Sum of all item subtotals
    type: Number,
    required: true,
    min: 0
  },
  totalProfit: { // Sum of profitPerItem * quantity for all items
    type: Number,
    default: 0,
    min: 0
  },
  customerName: { // Optional: if you want to track customer for this sale
    type: String,
    trim: true
  },
  paymentMethod: { // e.g., 'Cash', 'M-Pesa', 'Card'
    type: String,
    enum: ['Cash', 'M-Pesa', 'Card', 'Other'],
    default: 'Cash'
  },
  notes: {
    type: String,
    trim: true
  }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

// Pre-save hook to calculate totalAmount and totalProfit before saving
SaleSchema.pre('save', function(next) {
  let calculatedTotalAmount = 0;
  let calculatedTotalProfit = 0;

  this.items.forEach(item => {
    item.subtotal = item.quantity * item.unitPrice;
    calculatedTotalAmount += item.subtotal;

    // Calculate profit per item if costPrice is provided
    if (item.costPrice !== undefined && item.costPrice !== null) {
      item.profitPerItem = item.unitPrice - item.costPrice;
      calculatedTotalProfit += item.profitPerItem * item.quantity;
    }
  });

  this.totalAmount = calculatedTotalAmount;
  this.totalProfit = calculatedTotalProfit;
  next();
});

module.exports = mongoose.model('Sale', SaleSchema);
