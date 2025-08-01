// routes/inventory.js
const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/InventoryItem');
const Sale = require('../models/Sale'); // To link sales data for optimization
const jwt = require('jsonwebtoken'); // For token verification
const { GoogleGenerativeAI } = require('@google/generative-ai'); // For Gemini API
const mongoose = require('mongoose'); // For ObjectId conversion

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// --- Middleware to protect routes and get user ID from JWT ---
const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user info (id, email) to the request
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
// --- END Middleware ---

// @route   POST /api/inventory
// @desc    Add a new inventory item
// @access  Private
router.post('/', protect, async (req, res) => {
  const { name, currentStock, reorderPoint, costPrice, sellingPrice, category, supplier, lastRestockDate, notes } = req.body;

  // Basic validation
  if (!name || currentStock === undefined || reorderPoint === undefined || !costPrice || !sellingPrice) {
    return res.status(400).json({ message: 'Please provide name, current stock, reorder point, cost price, and selling price.' });
  }

  try {
    // Check if an item with the same name already exists for this user
    const existingItem = await InventoryItem.findOne({ userId: req.user.id, name: name });
    if (existingItem) {
      return res.status(400).json({ message: 'An inventory item with this name already exists.' });
    }

    const newItem = new InventoryItem({
      userId: req.user.id,
      name,
      currentStock,
      reorderPoint,
      costPrice,
      sellingPrice,
      category,
      supplier,
      lastRestockDate: lastRestockDate ? new Date(lastRestockDate) : undefined,
      notes,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error('Error adding inventory item:', err.message);
    if (err.code === 11000) { // Duplicate key error
      return res.status(400).json({ message: 'Duplicate item name. An item with this name already exists for your account.' });
    }
    res.status(500).json({ message: 'Server error: Could not add inventory item.' });
  }
});

// @route   GET /api/inventory
// @desc    Get all inventory items for the authenticated user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const inventoryItems = await InventoryItem.find({ userId: req.user.id }).sort({ name: 1 });
    res.status(200).json(inventoryItems);
  } catch (err) {
    console.error('Error fetching inventory items:', err.message);
    res.status(500).json({ message: 'Server error: Could not fetch inventory items.' });
  }
});

// @route   PUT /api/inventory/:id
// @desc    Update an inventory item
// @access  Private
router.put('/:id', protect, async (req, res) => {
  const { id } = req.params;
  const { name, currentStock, reorderPoint, costPrice, sellingPrice, category, supplier, lastRestockDate, notes } = req.body;

  try {
    const updatedItem = await InventoryItem.findOneAndUpdate(
      { _id: id, userId: req.user.id }, // Find by ID and ensure it belongs to the user
      {
        name,
        currentStock,
        reorderPoint,
        costPrice,
        sellingPrice,
        category,
        supplier,
        lastRestockDate: lastRestockDate ? new Date(lastRestockDate) : undefined,
        notes,
      },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Inventory item not found or not authorized.' });
    }
    res.status(200).json(updatedItem);
  } catch (err) {
    console.error('Error updating inventory item:', err.message);
    if (err.code === 11000) { // Duplicate key error
      return res.status(400).json({ message: 'Duplicate item name. An item with this name already exists for your account.' });
    }
    res.status(500).json({ message: 'Server error: Could not update inventory item.' });
  }
});

// @route   DELETE /api/inventory/:id
// @desc    Delete an inventory item
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await InventoryItem.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!deletedItem) {
      return res.status(404).json({ message: 'Inventory item not found or not authorized.' });
    }
    res.status(200).json({ message: 'Inventory item deleted successfully.' });
  } catch (err) {
    console.error('Error deleting inventory item:', err.message);
    res.status(500).json({ message: 'Server error: Could not delete inventory item.' });
  }
});

// @route   GET /api/inventory/optimization
// @desc    Get AI-powered inventory optimization suggestions
// @access  Private
router.get('/optimization', protect, async (req, res) => {
  const userId = req.user.id;

  try {
    const inventoryItems = await InventoryItem.find({ userId: userId });
    const salesData = await Sale.find({ userId: userId }).sort({ date: -1 }).limit(100); // Get recent sales

    if (inventoryItems.length === 0) {
      return res.status(200).json({
        message: "No inventory data available for optimization. Please add some items first.",
        insights: [],
        recommendations: []
      });
    }

    // Prepare data for AI
    let inventoryDataForAI = inventoryItems.map(item =>
      `Name: ${item.name}, Current Stock: ${item.currentStock}, Reorder Point: ${item.reorderPoint}, ` +
      `Cost Price: Ksh ${item.costPrice}, Selling Price: Ksh ${item.sellingPrice}, Category: ${item.category || 'N/A'}`
    ).join('\n');

    let salesDataForAI = "No recent sales data to correlate with inventory.\n";
    if (salesData.length > 0) {
      salesDataForAI = "Recent Sales Data (Product, Quantity, Date):\n" +
        salesData.map(sale => `- ${sale.productName}, Qty: ${sale.quantity}, Date: ${sale.date.toISOString().split('T')[0]}`).join('\n');
    }

    const prompt = `You are an AI inventory management expert for a small business in Kenya.
    Analyze the following inventory and sales data.
    Provide insights into:
    1. Fast-moving items (high sales velocity).
    2. Slow-moving or stagnant items (low sales velocity, high stock).
    3. Items nearing reorder points or below reorder points.
    4. Potential overstocking or understocking issues.

    Provide actionable recommendations for each insight, such as:
    - Adjusting reorder points or quantities.
    - Marketing strategies for slow-moving items.
    - Prioritizing restocking for fast-moving items.
    - General tips for inventory efficiency in a Kenyan context (e.g., managing perishables, seasonal demand).

    Provide the output in a structured JSON format with the following keys:
    {
      "overallInventoryStatus": "string", // e.g., "Healthy", "Needs Attention", "Optimized"
      "insights": [
        {
          "type": "string", // e.g., "Fast-Moving", "Slow-Moving", "Low Stock", "Overstocked"
          "itemNames": ["string"], // Names of items relevant to this insight
          "description": "string", // Detailed description of the insight
          "recommendations": ["string"] // Actionable recommendations
        }
      ],
      "generalTips": ["List of general inventory management tips."]
    }

    Inventory Data:
    ${inventoryDataForAI}

    Sales Data:
    ${salesDataForAI}
    `;

    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            "overallInventoryStatus": { "type": "STRING" },
            "insights": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "type": { "type": "STRING" },
                  "itemNames": { "type": "ARRAY", "items": { "type": "STRING" } },
                  "description": { "type": "STRING" },
                  "recommendations": { "type": "ARRAY", "items": { "type": "STRING" } }
                },
                "propertyOrdering": ["type", "itemNames", "description", "recommendations"]
              }
            },
            "generalTips": { "type": "ARRAY", "items": { "type": "STRING" } }
          },
          "propertyOrdering": ["overallInventoryStatus", "insights", "generalTips"]
        }
      }
    };

    const apiKey = process.env.GEMINI_API_KEY || "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error response:', errorText);
      throw new Error(`Gemini API request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();

    if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
      const jsonString = result.candidates[0].content.parts[0].text;
      const parsedOptimization = JSON.parse(jsonString);
      res.status(200).json(parsedOptimization);
    } else {
      console.error('Unexpected Gemini API response structure:', result);
      throw new Error('Unexpected AI response structure. Could not generate inventory optimization. Please try again.');
    }

  } catch (aiError) {
    console.error('Error during AI inventory optimization generation:', aiError);
    res.status(500).json({ message: 'Error generating inventory optimization with AI.', error: aiError instanceof Error ? aiError.message : String(aiError) });
  }
});

module.exports = router;
