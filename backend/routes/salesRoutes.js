const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const axios = require('axios');

// Record new sale
router.post('/', auth, async (req, res) => {
  try {
    const { products, customerInfo, paymentMethod } = req.body;
    
    // Calculate total amount
    let totalAmount = 0;
    const productDetails = await Promise.all(products.map(async item => {
      const product = await Product.findById(item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      
      // Update stock quantity
      product.stockQuantity -= item.quantity;
      await product.save();
      
      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;
      
      return {
        productId: product._id,
        quantity: item.quantity,
        priceAtSale: product.price
      };
    }));

    const sale = new Sale({
      vendorId: req.user.id,
      products: productDetails,
      totalAmount,
      customerInfo,
      paymentMethod
    });

    await sale.save();
    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get sales history
router.get('/', auth, async (req, res) => {
  try {
    const sales = await Sale.find({ vendorId: req.user.id })
      .populate('products.productId', 'name price');
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get sales analytics
router.get('/analytics', auth, async (req, res) => {
  try {
    const sales = await Sale.find({ vendorId: req.user.id });
    
    // Basic analytics
    const totalSales = sales.length;
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const avgSaleValue = totalSales > 0 ? totalRevenue / totalSales : 0;
    
    res.json({
      totalSales,
      totalRevenue,
      avgSaleValue
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get AI sales recommendations
router.get('/ai-recommendations', auth, async (req, res) => {
  try {
    const sales = await Sale.find({ vendorId: req.user.id });
    const products = await Product.find({ vendorId: req.user.id });
    
    // Call AI service for recommendations
    const response = await axios.post(`${process.env.AI_SERVICE_URL}/sales-recommendations`, {
      salesHistory: sales,
      productCatalog: products
    });

    res.json(response.data.recommendations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;