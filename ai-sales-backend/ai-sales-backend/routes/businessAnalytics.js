// routes/businessAnalytics.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // For token verification
const { GoogleGenerativeAI } = require('@google/generative-ai'); // For Gemini API

// Import necessary Mongoose models to fetch data
const Sale = require('../models/Sale');
const Expense = require('../models/Expense');
const Customer = require('../models/Customer');
const CustomerInteraction = require('../models/CustomerInteraction');
const InventoryItem = require('../models/InventoryItem');
const Supplier = require('../models/Supplier');

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

// @route   GET /api/business-analytics/overview
// @desc    Get AI-powered business performance overview and strategic advice
// @access  Private
router.get('/overview', protect, async (req, res) => {
  const userId = req.user.id;

  try {
    // 1. Fetch comprehensive data from all relevant models for the user
    const sales = await Sale.find({ userId }).sort({ date: 1 }); // Sorted for potential trend analysis
    const expenses = await Expense.find({ userId }).sort({ date: 1 });
    const customers = await Customer.find({ userId });
    const interactions = await CustomerInteraction.find({ userId });
    const inventory = await InventoryItem.find({ userId });
    const suppliers = await Supplier.find({ userId });

    // 2. Prepare data for AI prompt (summarize and format)
    let salesData = sales.map(s => `Date: ${s.date.toISOString().split('T')[0]}, Product: ${s.productName}, Amount: ${s.amount}, Profit: ${s.profit}, Quantity: ${s.quantity}`).join('\n');
    if (sales.length === 0) salesData = "No sales data available.";

    let expenseData = expenses.map(e => `Date: ${e.date.toISOString().split('T')[0]}, Category: ${e.category}, Amount: ${e.amount}, Description: ${e.description}`).join('\n');
    if (expenses.length === 0) expenseData = "No expense data available.";

    let customerData = customers.map(c => `Name: ${c.name}, Email: ${c.email || 'N/A'}, Phone: ${c.phone || 'N/A'}, Category: ${c.category || 'N/A'}, Last Purchase: ${c.lastPurchaseDate ? c.lastPurchaseDate.toISOString().split('T')[0] : 'N/A'}`).join('\n');
    if (customers.length === 0) customerData = "No customer data available.";

    let interactionData = interactions.map(i => `Customer ID: ${i.customerId}, Type: ${i.type}, Date: ${i.date.toISOString().split('T')[0]}, Summary: ${i.summary}, Follow-up: ${i.followUpRequired ? `Yes by ${i.followUpDate ? i.followUpDate.toISOString().split('T')[0] : 'N/A'}` : 'No'}`).join('\n');
    if (interactions.length === 0) interactionData = "No customer interaction data available.";

    let inventoryData = inventory.map(item => `Name: ${item.name}, Current Stock: ${item.currentStock}, Reorder Point: ${item.reorderPoint}, Last Restock: ${item.lastRestockDate ? item.lastRestockDate.toISOString().split('T')[0] : 'N/A'}`).join('\n');
    if (inventory.length === 0) inventoryData = "No inventory data available.";

    let supplierData = suppliers.map(s => `Name: ${s.name}, Contact: ${s.contactPerson || 'N/A'} (${s.phone || 'N/A'}), Products: ${s.productsSupplied && s.productsSupplied.length > 0 ? s.productsSupplied.join(', ') : 'N/A'}`).join('\n');
    if (suppliers.length === 0) supplierData = "No supplier data available.";


    const prompt = `You are an AI Business Strategic Advisor for a small business in Kenya.
    Analyze the following comprehensive business data to provide a holistic performance overview, identify key insights, potential problems, and actionable strategic recommendations for growth and efficiency.

    Consider the Kenyan market context (e.g., M-Pesa trends, local consumer behavior, supply chain dynamics).

    ---
    **Sales Data:**
    ${salesData}
    ---
    **Expense Data:**
    ${expenseData}
    ---
    **Customer Data:**
    ${customerData}
    ---
    **Customer Interaction Data:**
    ${interactionData}
    ---
    **Inventory Data:**
    ${inventoryData}
    ---
    **Supplier Data:**
    ${supplierData}
    ---

    Provide the output in a structured JSON format with the following keys:
    {
      "overallBusinessHealth": "string", // A summary of the business's current health (e.g., "Strong growth", "Stable but needs optimization", "Facing challenges")
      "keyPerformanceIndicators": { // Quantitative summaries
        "totalSales": "number",
        "totalProfit": "number",
        "totalExpenses": "number",
        "averageSaleValue": "number",
        "numberOfCustomers": "number",
        "totalInventoryValue": "number" // Estimate if not directly available
      },
      "strengths": ["List of strengths based on data"],
      "weaknesses": ["List of weaknesses based on data"],
      "opportunities": ["List of opportunities for growth"],
      "threats": ["List of potential threats/risks"],
      "crossModuleInsights": [ // Insights derived from combining data from different modules
        {
          "insight": "string", // e.g., "High marketing spend on X product but low sales conversion."
          "modulesInvolved": ["string"] // e.g., ["Marketing", "Sales"]
        }
      ],
      "strategicRecommendations": [ // Actionable steps for improvement
        {
          "area": "string", // e.g., "Sales", "Marketing", "Operations", "Customer Retention"
          "recommendation": "string",
          "priority": "string" // e.g., "High", "Medium", "Low"
        }
      ],
      "potentialProblemsIdentified": ["List of potential problems or bottlenecks"],
      "nextSteps": ["List of immediate next steps for the vendor"]
    }
    `;

    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            "overallBusinessHealth": { "type": "STRING" },
            "keyPerformanceIndicators": {
              "type": "OBJECT",
              "properties": {
                "totalSales": { "type": "NUMBER" },
                "totalProfit": { "type": "NUMBER" },
                "totalExpenses": { "type": "NUMBER" },
                "averageSaleValue": { "type": "NUMBER" },
                "numberOfCustomers": { "type": "NUMBER" },
                "totalInventoryValue": { "type": "NUMBER" }
              },
              "propertyOrdering": ["totalSales", "totalProfit", "totalExpenses", "averageSaleValue", "numberOfCustomers", "totalInventoryValue"]
            },
            "strengths": { "type": "ARRAY", "items": { "type": "STRING" } },
            "weaknesses": { "type": "ARRAY", "items": { "type": "STRING" } },
            "opportunities": { "type": "ARRAY", "items": { "type": "STRING" } },
            "threats": { "type": "ARRAY", "items": { "type": "STRING" } },
            "crossModuleInsights": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "insight": { "type": "STRING" },
                  "modulesInvolved": { "type": "ARRAY", "items": { "type": "STRING" } }
                },
                "propertyOrdering": ["insight", "modulesInvolved"]
              }
            },
            "strategicRecommendations": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "area": { "type": "STRING" },
                  "recommendation": { "type": "STRING" },
                  "priority": { "type": "STRING" }
                },
                "propertyOrdering": ["area", "recommendation", "priority"]
              }
            },
            "potentialProblemsIdentified": { "type": "ARRAY", "items": { "type": "STRING" } },
            "nextSteps": { "type": "ARRAY", "items": { "type": "STRING" } }
          },
          "propertyOrdering": [
            "overallBusinessHealth", "keyPerformanceIndicators", "strengths", "weaknesses",
            "opportunities", "threats", "crossModuleInsights", "strategicRecommendations",
            "potentialProblemsIdentified", "nextSteps"
          ]
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
      const parsedAnalysis = JSON.parse(jsonString);
      res.status(200).json(parsedAnalysis);
    } else {
      console.error('Unexpected Gemini API response structure:', result);
      throw new Error('Unexpected AI response structure. Could not generate business analysis. Please try again.');
    }

  } catch (aiError) {
    console.error('Error during AI business analysis generation:', aiError);
    res.status(500).json({ message: 'Error generating AI business analysis.', error: aiError instanceof Error ? aiError.message : String(aiError) });
  }
});

module.exports = router;
