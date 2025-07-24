const Product = require('../models/Product');
const aiService = require('../config/ai-service');

const createProduct = async (req, res) => {
  try {
    const product = new Product({
      vendorId: req.user.id,
      ...req.body
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
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
};

const updateProduct = async (req, res) => {
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
};

const deleteProduct = async (req, res) => {
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
};

const getProductTags = async (req, res) => {
  try {
    const product = await Product.findOne({ 
      _id: req.params.id, 
      vendorId: req.user.id 
    });
    
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const tags = await aiService.generateTags({
      productName: product.name,
      productDescription: product.description,
      category: product.category
    });

    product.aiTags = tags;
    await product.save();

    res.json({ tags });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductTags
};