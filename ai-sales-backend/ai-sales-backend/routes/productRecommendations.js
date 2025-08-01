// routes/productRecommendations.js
const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer'); // Import the Customer model
const Sale = require('../models/Sale'); // Import the Sale model to get purchase history
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

// @route   GET /api/product-recommendations/:customerId
// @desc    Get AI-powered product/service recommendations for a specific customer
// @access  Private
router.get('/:customerId', protect, async (req, res) => {
  const { customerId } = req.params;
  const userId = req.user.id;

  try {
    // 1. Fetch the specific customer's data
    const customer = await Customer.findOne({ _id: customerId, userId: userId });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found or not authorized.' });
    }

    // 2. Fetch sales history associated with this customer (if any identifiable link exists)
    // For now, we'll simulate linking by customer name/email/phone to sales if direct customerId isn't on Sale model.
    // In a real system, you'd link sales directly to customer IDs.
    // For this example, let's assume we can gather sales data for the user and try to infer.
    // A more robust solution would involve linking Sale documents directly to Customer documents.
    const allUserSales = await Sale.find({ userId: userId }).sort({ date: -1 }).limit(20); // Get recent sales for the user

    let salesHistoryText = "No recent sales data available for this user's customers.";
    if (allUserSales.length > 0) {
      salesHistoryText = "Recent products sold by this business:\n" +
        allUserSales.map(s => `- Product: ${s.productName}, Amount: Ksh ${s.amount}, Quantity: ${s.quantity}, Date: ${s.date.toISOString().split('T')[0]}`).join('\n');
    }

    // Prepare customer profile for AI
    const customerProfileForAI = `Customer Name: ${customer.name}
Email: ${customer.email || 'N/A'}
Phone: ${customer.phone || 'N/A'}
Address: ${customer.address || 'N/A'}
Last Purchase Date: ${customer.lastPurchaseDate ? customer.lastPurchaseDate.toISOString().split('T')[0] : 'N/A'}
Total Purchases Amount: Ksh ${customer.totalPurchasesAmount || 0}
Notes: ${customer.notes || 'N/A'}`;

    const prompt = `You are an AI assistant specializing in product recommendations for small businesses in Kenya.
    Based on the following customer profile and general sales history, suggest 3-5 relevant products or services this business could recommend to this specific customer.
    Consider their past purchase behavior (if any inferred), contact details, and any notes.
    Provide a brief rationale for each recommendation, focusing on how it benefits the customer or aligns with their profile.
    Keep the recommendations practical and suitable for a small Kenyan vendor's offerings.

    Customer Profile:
    ${customerProfileForAI}

    Business's General Sales History (products/services they sell):
    ${salesHistoryText}

    Provide the output in a structured JSON format with the following keys:
    {
      "customerName": "string",
      "recommendations": [
        {
          "productOrService": "string",
          "rationale": "string"
        }
      ],
      "generalTips": ["List of general tips for making recommendations."]
    }
    `;

    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            "customerName": { "type": "STRING" },
            "recommendations": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "productOrService": { "type": "STRING" },
                  "rationale": { "type": "STRING" }
                },
                "propertyOrdering": ["productOrService", "rationale"]
              }
            },
            "generalTips": { "type": "ARRAY", "items": { "type": "STRING" } }
          },
          "propertyOrdering": ["customerName", "recommendations", "generalTips"]
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
      const parsedRecommendations = JSON.parse(jsonString);
      res.status(200).json(parsedRecommendations);
    } else {
      console.error('Unexpected Gemini API response structure:', result);
      throw new Error('Unexpected AI response structure. Could not generate product recommendations. Please try again.');
    }

  } catch (aiError) {
    console.error('Error during AI product recommendations generation:', aiError);
    res.status(500).json({ message: 'Error generating product recommendations with AI.', error: aiError instanceof Error ? aiError.message : String(aiError) });
  }
});

module.exports = router;
