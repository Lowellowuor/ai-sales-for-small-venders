// routes/suppliers.js
const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');
const InventoryItem = require('../models/InventoryItem'); // Needed for order automation
const Sale = require('../models/Sale'); // Needed for order automation (sales history)
const jwt = require('jsonwebtoken'); // For token verification
const { GoogleGenerativeAI } = require('@google/generative-ai'); // For Gemini API

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

// @route   POST /api/suppliers
// @desc    Add a new supplier
// @access  Private
router.post('/', protect, async (req, res) => {
  const { name, contactPerson, phone, email, address, productsSupplied, paymentTerms, notes } = req.body;

  // Basic validation
  if (!name) {
    return res.status(400).json({ message: 'Supplier name is required.' });
  }

  try {
    // Check if a supplier with the same name already exists for this user
    const existingSupplier = await Supplier.findOne({ userId: req.user.id, name: name });
    if (existingSupplier) {
      return res.status(400).json({ message: 'A supplier with this name already exists for your account.' });
    }

    const newSupplier = new Supplier({
      userId: req.user.id,
      name,
      contactPerson,
      phone,
      email,
      address,
      productsSupplied,
      paymentTerms,
      notes,
    });

    const savedSupplier = await newSupplier.save();
    res.status(201).json(savedSupplier);
  } catch (err) {
    console.error('Error adding supplier:', err.message);
    if (err.code === 11000) { // Duplicate key error
      return res.status(400).json({ message: 'Duplicate supplier name. A supplier with this name already exists for your account.' });
    }
    res.status(500).json({ message: 'Server error: Could not add supplier.' });
  }
});

// @route   GET /api/suppliers
// @desc    Get all suppliers for the authenticated user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const suppliers = await Supplier.find({ userId: req.user.id }).sort({ name: 1 });
    res.status(200).json(suppliers);
  } catch (err) {
    console.error('Error fetching suppliers:', err.message);
    res.status(500).json({ message: 'Server error: Could not fetch suppliers.' });
  }
});

// @route   PUT /api/suppliers/:id
// @desc    Update a supplier
// @access  Private
router.put('/:id', protect, async (req, res) => {
  const { id } = req.params;
  const { name, contactPerson, phone, email, address, productsSupplied, paymentTerms, notes } = req.body;

  try {
    const updatedSupplier = await Supplier.findOneAndUpdate(
      { _id: id, userId: req.user.id }, // Find by ID and ensure it belongs to the user
      {
        name,
        contactPerson,
        phone,
        email,
        address,
        productsSupplied,
        paymentTerms,
        notes,
      },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedSupplier) {
      return res.status(404).json({ message: 'Supplier not found or not authorized.' });
    }
    res.status(200).json(updatedSupplier);
  } catch (err) {
    console.error('Error updating supplier:', err.message);
    if (err.code === 11000) { // Duplicate key error
      return res.status(400).json({ message: 'Duplicate supplier name. A supplier with this name already exists for your account.' });
    }
    res.status(500).json({ message: 'Server error: Could not update supplier.' });
  }
});

// @route   DELETE /api/suppliers/:id
// @desc    Delete a supplier
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSupplier = await Supplier.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!deletedSupplier) {
      return res.status(404).json({ message: 'Supplier not found or not authorized.' });
    }
    res.status(200).json({ message: 'Supplier deleted successfully.' });
  } catch (err) {
    console.error('Error deleting supplier:', err.message);
    res.status(500).json({ message: 'Server error: Could not delete supplier.' });
  }
});

// @route   GET /api/suppliers/order-automation
// @desc    Get AI-powered order automation suggestions (reorder quantities, draft PO)
// @access  Private
router.get('/order-automation', protect, async (req, res) => {
  const userId = req.user.id;

  try {
    const inventoryItems = await InventoryItem.find({ userId: userId });
    const salesData = await Sale.find({ userId: userId }).sort({ date: -1 }).limit(100); // Get recent sales
    const suppliers = await Supplier.find({ userId: userId });

    if (inventoryItems.length === 0) {
      return res.status(200).json({
        message: "No inventory data available for order automation. Please add some items first.",
        suggestions: [],
        draftPurchaseOrders: []
      });
    }

    // Prepare data for AI
    let inventoryDataForAI = inventoryItems.map(item =>
      `Name: ${item.name}, Current Stock: ${item.currentStock}, Reorder Point: ${item.reorderPoint}, ` +
      `Cost Price: Ksh ${item.costPrice}, Selling Price: Ksh ${item.sellingPrice}, Category: ${item.category || 'N/A'}`
    ).join('\n');

    let salesDataForAI = "No recent sales data to inform reorder decisions.\n";
    if (salesData.length > 0) {
      salesDataForAI = "Recent Sales Data (Product, Quantity, Date):\n" +
        salesData.map(sale => `- ${sale.productName}, Qty: ${sale.quantity}, Date: ${sale.date.toISOString().split('T')[0]}`).join('\n');
    }

    let suppliersDataForAI = "No supplier data available.\n";
    if (suppliers.length > 0) {
      suppliersDataForAI = "Available Suppliers:\n" +
        suppliers.map(sup => `- Name: ${sup.name}, Contact: ${sup.contactPerson || 'N/A'}, Products: ${sup.productsSupplied.join(', ') || 'N/A'}`).join('\n');
    }

    const prompt = `You are an AI procurement assistant for a small business in Kenya.
    Based on the following inventory, sales, and supplier data, provide:
    1. Reorder suggestions for items that are low in stock or below their reorder point. Suggest optimal reorder quantities.
    2. Identify items that might be overstocked based on sales velocity.
    3. Generate a draft purchase order (PO) for items that need reordering, grouping by supplier if possible.
    
    Consider typical lead times for small businesses in Kenya and aim for efficient stock management.

    Provide the output in a structured JSON format with the following keys:
    {
      "reorderSuggestions": [
        {
          "itemName": "string",
          "currentStock": number,
          "reorderPoint": number,
          "suggestedQuantityToOrder": number,
          "reason": "string"
        }
      ],
      "overstockedItems": [
        {
          "itemName": "string",
          "currentStock": number,
          "reason": "string",
          "actionSuggestion": "string" // e.g., "Promote sales", "Discount", "Return to supplier"
        }
      ],
      "draftPurchaseOrders": [
        {
          "supplierName": "string",
          "poDetails": "string", // Formatted text for the PO, including items, quantities, and total estimated cost
          "notes": "string" // Any specific notes for this PO
        }
      ],
      "generalTips": ["List of general procurement and inventory tips."]
    }

    Inventory Data:
    ${inventoryDataForAI}

    Sales Data:
    ${salesDataForAI}

    Supplier Data:
    ${suppliersDataForAI}
    `;

    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            "reorderSuggestions": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "itemName": { "type": "STRING" },
                  "currentStock": { "type": "NUMBER" },
                  "reorderPoint": { "type": "NUMBER" },
                  "suggestedQuantityToOrder": { "type": "NUMBER" },
                  "reason": { "type": "STRING" }
                },
                "propertyOrdering": ["itemName", "currentStock", "reorderPoint", "suggestedQuantityToOrder", "reason"]
              }
            },
            "overstockedItems": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "itemName": { "type": "STRING" },
                  "currentStock": { "type": "NUMBER" },
                  "reason": { "type": "STRING" },
                  "actionSuggestion": { "type": "STRING" }
                },
                "propertyOrdering": ["itemName", "currentStock", "reason", "actionSuggestion"]
              }
            },
            "draftPurchaseOrders": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "supplierName": { "type": "STRING" },
                  "poDetails": { "type": "STRING" },
                  "notes": { "type": "STRING" }
                },
                "propertyOrdering": ["supplierName", "poDetails", "notes"]
              }
            },
            "generalTips": { "type": "ARRAY", "items": { "type": "STRING" } }
          },
          "propertyOrdering": ["reorderSuggestions", "overstockedItems", "draftPurchaseOrders", "generalTips"]
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
      const parsedAutomation = JSON.parse(jsonString);
      res.status(200).json(parsedAutomation);
    } else {
      console.error('Unexpected Gemini API response structure:', result);
      throw new Error('Unexpected AI response structure. Could not generate order automation suggestions. Please try again.');
    }

  } catch (aiError) {
    console.error('Error during AI order automation generation:', aiError);
    res.status(500).json({ message: 'Error generating order automation suggestions with AI.', error: aiError instanceof Error ? aiError.message : String(aiError) });
  }
});

module.exports = router;
