// routes/customerSegmentation.js
const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer'); // Import the Customer model
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

// @route   GET /api/customer-segmentation
// @desc    Get AI-powered customer segments for the authenticated user
// @access  Private
router.get('/', protect, async (req, res) => {
  const userId = req.user.id;

  try {
    const customers = await Customer.find({ userId: userId }).sort({ createdAt: 1 });

    if (customers.length === 0) {
      return res.status(200).json({
        message: "No customer data available to segment. Please add some customers first.",
        segments: [],
        rawCustomerDataSentToAI: "No customer data."
      });
    }

    // Prepare customer data for the AI prompt
    let customerDataForAI = customers.map(customer => ({
      id: customer._id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      lastPurchaseDate: customer.lastPurchaseDate ? customer.lastPurchaseDate.toISOString().split('T')[0] : 'N/A',
      totalPurchasesAmount: customer.totalPurchasesAmount,
      notes: customer.notes
    }));

    // Convert to a string format suitable for the AI prompt
    let formattedCustomerData = customerDataForAI.map(c =>
      `ID: ${c.id}, Name: ${c.name}, Email: ${c.email || 'N/A'}, Phone: ${c.phone || 'N/A'}, ` +
      `Last Purchase: ${c.lastPurchaseDate}, Total Spent: Ksh ${c.totalPurchasesAmount}, Notes: ${c.notes || 'N/A'}`
    ).join('\n');

    const prompt = `Analyze the following customer data for a small business in Kenya.
    Identify distinct customer segments based on their purchase behavior (e.g., total spent, last purchase date), contact information, and any notes.
    For each segment, provide:
    1. A clear segment name (e.g., "High-Value Customers", "New Customers", "At-Risk Customers", "Regular Buyers").
    2. A brief description of the segment's characteristics.
    3. A list of customer IDs that belong to this segment.
    4. Suggested marketing or engagement strategies relevant to this segment for a Kenyan small business context.

    If there isn't enough data for clear segmentation, suggest general strategies for customer engagement.

    Provide the output in a structured JSON format with the following keys:
    {
      "segments": [
        {
          "name": "string",
          "description": "string",
          "customerIds": ["string"], // Array of customer _id strings
          "suggestedStrategies": ["string"]
        }
      ],
      "overallInsights": ["string"] // General insights if segmentation is difficult or for overall context
    }

    Customer Data:
    ${formattedCustomerData}
    `;

    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            "segments": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "name": { "type": "STRING" },
                  "description": { "type": "STRING" },
                  "customerIds": { "type": "ARRAY", "items": { "type": "STRING" } },
                  "suggestedStrategies": { "type": "ARRAY", "items": { "type": "STRING" } }
                },
                "propertyOrdering": ["name", "description", "customerIds", "suggestedStrategies"]
              }
            },
            "overallInsights": { "type": "ARRAY", "items": { "type": "STRING" } }
          },
          "propertyOrdering": ["segments", "overallInsights"]
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
      const parsedSegmentation = JSON.parse(jsonString);
      res.status(200).json({
        segments: parsedSegmentation.segments,
        overallInsights: parsedSegmentation.overallInsights,
        rawCustomerDataSentToAI: formattedCustomerData // For debugging/transparency
      });
    } else {
      console.error('Unexpected Gemini API response structure:', result);
      throw new Error('Unexpected AI response structure. Could not generate customer segments. Please try again.');
    }

  } catch (aiError) {
    console.error('Error during AI customer segmentation:', aiError);
    res.status(500).json({ message: 'Error generating customer segments with AI.', error: aiError instanceof Error ? aiError.message : String(aiError) });
  }
});

module.exports = router;
