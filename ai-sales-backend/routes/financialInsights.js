// routes/financialInsights.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Sale = require('../models/Sale'); // Import Sale model
const Expense = require('../models/Expense'); // Import Expense model
const { GoogleGenerativeAI } = require('@google/generative-ai'); // For Gemini API
const mongoose = require('mongoose'); // <<< ADDED THIS LINE

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

// @route   GET /api/financial-insights
// @desc    Get AI-powered financial insights based on user's sales and expenses
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch recent sales data
    const recentSales = await Sale.find({ userId }).sort({ date: -1 }).limit(10); // Last 10 sales
    const totalSalesAmount = await Sale.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalProfitAmount = await Sale.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: '$profit' } } }
    ]);

    // Fetch recent expense data
    const recentExpenses = await Expense.find({ userId }).sort({ date: -1 }).limit(10); // Last 10 expenses
    const totalExpensesAmount = await Expense.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const expensesByCategory = await Expense.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $sort: { total: -1 } }
    ]);

    const salesData = {
      totalSales: totalSalesAmount.length > 0 ? totalSalesAmount[0].total : 0,
      totalProfit: totalProfitAmount.length > 0 ? totalProfitAmount[0].total : 0,
      recentSales: recentSales.map(s => ({
        productName: s.productName,
        amount: s.amount,
        profit: s.profit,
        date: s.date.toISOString().split('T')[0]
      }))
    };

    const expenseData = {
      totalExpenses: totalExpensesAmount.length > 0 ? totalExpensesAmount[0].total : 0,
      recentExpenses: recentExpenses.map(e => ({
        description: e.description,
        amount: e.amount,
        category: e.category,
        date: e.date.toISOString().split('T')[0]
      })),
      expensesByCategory: expensesByCategory.map(cat => ({
        category: cat._id,
        total: cat.total
      }))
    };

    // Construct prompt for Gemini AI
    const prompt = `Analyze the following financial data for a small business in Kenya. Provide actionable insights, recommendations for improvement, and a simple budgeting tip. Focus on practical advice relevant to the Kenyan market (e.g., M-Pesa usage, local market conditions).

    Financial Data:
    Sales Summary:
      Total Sales: Ksh ${salesData.totalSales.toLocaleString('en-KE')}
      Total Profit: Ksh ${salesData.totalProfit.toLocaleString('en-KE')}
      Recent Sales: ${JSON.stringify(salesData.recentSales, null, 2)}

    Expense Summary:
      Total Expenses: Ksh ${expenseData.totalExpenses.toLocaleString('en-KE')}
      Expenses by Category: ${JSON.stringify(expenseData.expensesByCategory, null, 2)}
      Recent Expenses: ${JSON.stringify(expenseData.recentExpenses, null, 2)}

    Based on this data, provide feedback in a structured JSON format with the following keys:
    {
      "overallFinancialHealth": "A brief summary of the business's financial standing.",
      "revenueInsights": "Observations and suggestions related to sales and profit.",
      "costManagementInsights": "Observations and suggestions related to expenses, especially high-spending categories.",
      "actionableRecommendations": ["List of practical, actionable steps for financial improvement."],
      "budgetingTip": "A simple, actionable budgeting tip.",
      "culturalContextNotes": "Any specific notes on how this advice applies to the Kenyan context."
    }
    `;

    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            "overallFinancialHealth": { "type": "STRING" },
            "revenueInsights": { "type": "STRING" },
            "costManagementInsights": { "type": "STRING" },
            "actionableRecommendations": {
              "type": "ARRAY",
              "items": { "type": "STRING" }
            },
            "budgetingTip": { "type": "STRING" },
            "culturalContextNotes": { "type": "STRING" }
          },
          "propertyOrdering": [
            "overallFinancialHealth", "revenueInsights", "costManagementInsights",
            "actionableRecommendations", "budgetingTip", "culturalContextNotes"
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
      const parsedInsights = JSON.parse(jsonString);
      res.status(200).json(parsedInsights);
    } else {
      console.error('Unexpected Gemini API response structure:', result);
      throw new Error('Unexpected AI response structure. Please try again.');
    }

  } catch (aiError) {
    console.error('Error during AI financial analysis:', aiError);
    res.status(500).json({ message: 'Error processing financial insights with AI.', error: aiError instanceof Error ? aiError.message : String(aiError) });
  }
});

module.exports = router;
