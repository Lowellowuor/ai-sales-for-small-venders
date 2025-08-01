// routes/mpesaAnalysis.js
const express = require('express');
const router = express.Router();
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

// @route   POST /api/mpesa-analysis
// @desc    Analyze raw M-Pesa transaction text using AI
// @access  Private
router.post('/', protect, async (req, res) => {
  const { transactionText } = req.body;

  if (!transactionText || transactionText.trim() === '') {
    return res.status(400).json({ message: 'M-Pesa transaction text is required for analysis.' });
  }

  try {
    const prompt = `Analyze the following raw M-Pesa transaction text for a small business in Kenya.
    Identify and categorize transactions as 'Income' (sales, payments received) or 'Expense' (payments made, purchases).
    Extract key details for each transaction: Date, Type (e.g., 'M-Pesa Pay Bill', 'M-Pesa Send Money', 'M-Pesa Receive Money'), Description (e.g., 'Payment for goods', 'Electricity bill'), Amount, and Balance (if available).
    Provide a summary of total income and total expenses.
    Offer insights into spending patterns, potential savings, or notable transactions.
    
    Example M-Pesa Transaction Line Format:
    "Confirmed. ONYANGO OTIENO +2547XXXXXXXX Confirmed. Ksh1,000.00 received on 2024-07-29 at 10:30 AM. New M-PESA balance is Ksh5,000.00. Transaction cost: Ksh0.00."
    "Confirmed. Paid KPLC on 2024-07-28 at 09:15 AM. Ksh1,500.00. New M-PESA balance is Ksh3,500.00. Transaction cost: Ksh22.00."
    
    Provide the output in a structured JSON format with the following keys:
    {
      "summary": {
        "totalIncome": number,
        "totalExpenses": number,
        "netFlow": number
      },
      "transactions": [
        {
          "date": "YYYY-MM-DD",
          "time": "HH:MM AM/PM",
          "type": "Income" | "Expense",
          "description": "string",
          "amount": number,
          "balanceAfter": number | null,
          "rawText": "original transaction line"
        }
      ],
      "insights": ["List of actionable insights based on the transactions."]
    }
    
    M-Pesa Transaction Text:
    "${transactionText}"
    `;

    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            "summary": {
              "type": "OBJECT",
              "properties": {
                "totalIncome": { "type": "NUMBER" },
                "totalExpenses": { "type": "NUMBER" },
                "netFlow": { "type": "NUMBER" }
              },
              "propertyOrdering": ["totalIncome", "totalExpenses", "netFlow"]
            },
            "transactions": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "date": { "type": "STRING" },
                  "time": { "type": "STRING" },
                  "type": { "type": "STRING", "enum": ["Income", "Expense"] },
                  "description": { "type": "STRING" },
                  "amount": { "type": "NUMBER" },
                  "balanceAfter": { "type": "NUMBER", "nullable": true },
                  "rawText": { "type": "STRING" }
                },
                "propertyOrdering": ["date", "time", "type", "description", "amount", "balanceAfter", "rawText"]
              }
            },
            "insights": {
              "type": "ARRAY",
              "items": { "type": "STRING" }
            }
          },
          "propertyOrdering": ["summary", "transactions", "insights"]
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
      throw new Error('Unexpected AI response structure. Could not analyze M-Pesa transactions. Please try again.');
    }

  } catch (aiError) {
    console.error('Error during AI M-Pesa analysis:', aiError);
    res.status(500).json({ message: 'Error analyzing M-Pesa transactions with AI.', error: aiError instanceof Error ? aiError.message : String(aiError) });
  }
});

module.exports = router;
