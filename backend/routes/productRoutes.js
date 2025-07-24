const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Product = require('../models/Product');
const axios = require('axios');

// Add new product
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, price, category, stockQuantity, imageUrl } = req.body;
    
    const product = new Product({
      vendorId: req.user.id,
      name,
      description,
      price,
      category,
      stockQuantity,
      imageUrl
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// List all products for current vendor
router.get('/', auth, async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get product details
router.get('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findOne({ 
      _id: req.params.id, 
      vendorId: req.user.id 
    });
    
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update product
router.put('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, vendorId: req.user.id },
      req.body,
      { new: true }
    );
    
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete product
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ 
      _id: req.params.id, 
      vendorId: req.user.id 
    });
    
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get AI-generated product tags
router.get('/ai-tags/:productId', auth, async (req, res) => {
  try {
    const product = await Product.findOne({ 
      _id: req.params.productId, 
      vendorId: req.user.id 
    });
    
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Call AI service to generate tags
    const response = await axios.post(`${process.env.AI_SERVICE_URL}/generate-tags`, {
      productName: product.name,
      productDescription: product.description,
      category: product.category
    });

    // Update product with AI tags
    product.aiTags = response.data.tags;
    await product.save();

    res.json({ tags: response.data.tags });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;