// routes/customerCRM.js
const express = require('express');
const router = express.Router();
const CustomerInteraction = require('../models/CustomerInteraction');
const Customer = require('../models/Customer'); // Needed for AI context
const Sale = require('../models/Sale'); // Needed for AI context (customer purchase history)
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

// @route   POST /api/customer-crm/interactions
// @desc    Log a new customer interaction
// @access  Private
router.post('/interactions', protect, async (req, res) => {
  const { customerId, type, date, summary, notes, followUpRequired, followUpDate } = req.body;

  if (!customerId || !type || !summary) {
    return res.status(400).json({ message: 'Customer ID, type, and summary are required for interaction.' });
  }

  try {
    // Verify customer exists and belongs to the user
    const customer = await Customer.findOne({ _id: customerId, userId: req.user.id });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found or not authorized.' });
    }

    const newInteraction = new CustomerInteraction({
      userId: req.user.id,
      customerId,
      type,
      date: date || Date.now(),
      summary,
      notes,
      followUpRequired,
      followUpDate: followUpRequired ? (followUpDate || null) : null
    });

    const savedInteraction = await newInteraction.save();
    res.status(201).json(savedInteraction);
  } catch (err) {
    console.error('Error logging customer interaction:', err.message);
    res.status(500).json({ message: 'Server error: Could not log interaction.' });
  }
});

// @route   GET /api/customer-crm/interactions/:customerId
// @desc    Get all interactions for a specific customer
// @access  Private
router.get('/interactions/:customerId', protect, async (req, res) => {
  const { customerId } = req.params;

  try {
    // Verify customer exists and belongs to the user
    const customer = await Customer.findOne({ _id: customerId, userId: req.user.id });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found or not authorized.' });
    }

    const interactions = await CustomerInteraction.find({ customerId, userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(interactions);
  } catch (err) {
    console.error('Error fetching customer interactions:', err.message);
    res.status(500).json({ message: 'Server error: Could not fetch interactions.' });
  }
});

// @route   PUT /api/customer-crm/interactions/:id
// @desc    Update a customer interaction
// @access  Private
router.put('/interactions/:id', protect, async (req, res) => {
  const { id } = req.params;
  const { type, date, summary, notes, followUpRequired, followUpDate } = req.body;

  try {
    const updatedInteraction = await CustomerInteraction.findOneAndUpdate(
      { _id: id, userId: req.user.id }, // Find by ID and ensure it belongs to the user
      {
        type,
        date,
        summary,
        notes,
        followUpRequired,
        followUpDate: followUpRequired ? (followUpDate || null) : null
      },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedInteraction) {
      return res.status(404).json({ message: 'Interaction not found or not authorized.' });
    }
    res.status(200).json(updatedInteraction);
  } catch (err) {
    console.error('Error updating interaction:', err.message);
    res.status(500).json({ message: 'Server error: Could not update interaction.' });
  }
});

// @route   DELETE /api/customer-crm/interactions/:id
// @desc    Delete a customer interaction
// @access  Private
router.delete('/interactions/:id', protect, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedInteraction = await CustomerInteraction.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!deletedInteraction) {
      return res.status(404).json({ message: 'Interaction not found or not authorized.' });
    }
    res.status(200).json({ message: 'Interaction deleted successfully.' });
  } catch (err) {
    console.error('Error deleting interaction:', err.message);
    res.status(500).json({ message: 'Server error: Could not delete interaction.' });
  }
});

// @route   GET /api/customer-crm/follow-up-suggestions
// @desc    Get AI-powered follow-up suggestions for all customers
// @access  Private
router.get('/follow-up-suggestions', protect, async (req, res) => {
  const userId = req.user.id;

  try {
    const customers = await Customer.find({ userId: userId });
    if (customers.length === 0) {
      return res.status(200).json({
        message: "No customer data available for follow-up suggestions. Please add some customers first.",
        suggestions: [],
        generalTips: []
      });
    }

    // Fetch recent sales for all customers
    const recentSales = await Sale.find({ userId: userId }).sort({ date: -1 }).limit(200); // Limit to recent sales for performance

    // Fetch recent interactions for all customers
    const recentInteractions = await CustomerInteraction.find({ userId: userId }).sort({ date: -1 }).limit(200);

    // Prepare data for AI
    let customersDataForAI = customers.map(customer => {
      const customerSales = recentSales.filter(sale => sale.customerId && sale.customerId.toString() === customer._id.toString());
      const customerInteractions = recentInteractions.filter(interaction => interaction.customerId && interaction.customerId.toString() === customer._id.toString());

      let salesHistory = customerSales.length > 0 ?
        `Recent Sales: ${customerSales.map(s => `${s.productName} (Ksh ${s.amount}) on ${s.date.toISOString().split('T')[0]}`).join('; ')}` :
        'No recent sales.';
      
      let interactionHistory = customerInteractions.length > 0 ?
        `Recent Interactions: ${customerInteractions.map(i => `${i.type} on ${i.date.toISOString().split('T')[0]} - ${i.summary}`).join('; ')}` :
        'No recent interactions.';

      return `Customer Name: ${customer.name}, Email: ${customer.email || 'N/A'}, Phone: ${customer.phone || 'N/A'}, ` +
             `Category: ${customer.category || 'N/A'}, Last Purchase: ${customer.lastPurchaseDate ? customer.lastPurchaseDate.toISOString().split('T')[0] : 'N/A'}. ` +
             `${salesHistory}. ${interactionHistory}.`;
    }).join('\n');

    const prompt = `You are an AI customer relationship manager for a small business in Kenya.
    Based on the following customer data, sales history, and interaction logs, provide:
    1. Personalized follow-up suggestions for each customer, indicating why and when to follow up.
    2. Draft a short, engaging message (SMS/WhatsApp style) for each suggested follow-up.
    3. Identify customers who might be at risk of churning or who are high-potential.
    4. Provide general tips for improving customer retention and loyalty in the Kenyan market.

    Consider the Kenyan context (e.g., M-Pesa, community focus, mobile communication).

    Provide the output in a structured JSON format with the following keys:
    {
      "followUpSuggestions": [
        {
          "customerId": "string", // The ID of the customer
          "customerName": "string",
          "reason": "string", // Why to follow up (e.g., "Post-purchase check-in", "Birthday", "No activity in X days")
          "suggestedTiming": "string", // When to follow up (e.g., "Within 3 days", "Next week", "On their birthday")
          "draftMessage": {
            "channel": "string", // e.g., "SMS", "WhatsApp", "Email"
            "content": "string" // The drafted message
          }
        }
      ],
      "atRiskCustomers": [
        {
          "customerId": "string",
          "customerName": "string",
          "reason": "string", // Why they are at risk
          "actionSuggestion": "string" // e.g., "Offer personalized discount", "Direct call"
        }
      ],
      "highPotentialCustomers": [
        {
          "customerId": "string",
          "customerName": "string",
          "reason": "string", // Why they are high potential
          "actionSuggestion": "string" // e.g., "Introduce new premium product", "Invite to loyalty program"
        }
      ],
      "generalRetentionTips": ["List of general customer retention tips."]
    }

    Customer Data:
    ${customersDataForAI}
    `;

    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            "followUpSuggestions": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "customerId": { "type": "STRING" },
                  "customerName": { "type": "STRING" },
                  "reason": { "type": "STRING" },
                  "suggestedTiming": { "type": "STRING" },
                  "draftMessage": {
                    "type": "OBJECT",
                    "properties": {
                      "channel": { "type": "STRING" },
                      "content": { "type": "STRING" }
                    },
                    "propertyOrdering": ["channel", "content"]
                  }
                },
                "propertyOrdering": ["customerId", "customerName", "reason", "suggestedTiming", "draftMessage"]
              }
            },
            "atRiskCustomers": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "customerId": { "type": "STRING" },
                  "customerName": { "type": "STRING" },
                  "reason": { "type": "STRING" },
                  "actionSuggestion": { "type": "STRING" }
                },
                "propertyOrdering": ["customerId", "customerName", "reason", "actionSuggestion"]
              }
            },
            "highPotentialCustomers": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "customerId": { "type": "STRING" },
                  "customerName": { "type": "STRING" },
                  "reason": { "type": "STRING" },
                  "actionSuggestion": { "type": "STRING" }
                },
                "propertyOrdering": ["customerId", "customerName", "reason", "actionSuggestion"]
              }
            },
            "generalRetentionTips": { "type": "ARRAY", "items": { "type": "STRING" } }
          },
          "propertyOrdering": ["followUpSuggestions", "atRiskCustomers", "highPotentialCustomers", "generalRetentionTips"]
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
      const parsedSuggestions = JSON.parse(jsonString);
      res.status(200).json(parsedSuggestions);
    } else {
      console.error('Unexpected Gemini API response structure:', result);
      throw new Error('Unexpected AI response structure. Could not generate follow-up suggestions. Please try again.');
    }

  } catch (aiError) {
    console.error('Error during AI follow-up suggestion generation:', aiError);
    res.status(500).json({ message: 'Error generating AI follow-up suggestions.', error: aiError instanceof Error ? aiError.message : String(aiError) });
  }
});

module.exports = router;
