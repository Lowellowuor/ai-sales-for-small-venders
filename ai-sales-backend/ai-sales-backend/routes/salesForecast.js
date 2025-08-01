// routes/salesForecast.js
const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale'); // Import the Sale model
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

// @route   POST /api/sales-forecast
// @desc    Get AI-powered sales forecast for the authenticated user
// @access  Private
router.post('/', protect, async (req, res) => {
  const userId = req.user.id;
  const { forecastPeriod } = req.body; // e.g., "next_month", "next_quarter"

  if (!forecastPeriod) {
    return res.status(400).json({ message: 'Forecast period is required.' });
  }

  try {
    // Fetch all sales data for the user to provide comprehensive history to AI
    const sales = await Sale.find({ userId: userId }).sort({ date: 1 }); // Sort by date ascending

    if (sales.length < 5) { // Require a minimum number of sales for meaningful forecasting
      return res.status(200).json({
        forecast: null,
        explanation: "Not enough sales data to generate a meaningful forecast. Please record more sales.",
        period: forecastPeriod,
        rawSalesDataSentToAI: "Insufficient data."
      });
    }

    // Format sales data for AI prompt
    let formattedSalesData = "Historical Sales Data:\n";
    sales.forEach(sale => {
      formattedSalesData += `- Date: ${sale.date.toISOString().split('T')[0]}, Product: ${sale.productName}, Amount: Ksh ${sale.amount}, Quantity: ${sale.quantity}, Profit: Ksh ${sale.profit}\n`;
    });

    const prompt = `You are an AI sales analyst for a small business in Kenya.
    Based on the following historical sales data, generate a sales forecast for the "${forecastPeriod}".
    Consider trends, seasonality (if evident), and any potential growth.
    Provide the forecast as a single estimated total sales amount for the period.
    Also, provide a brief explanation of the forecast, including factors that might influence it (e.g., seasonality, past performance).

    Historical Sales Data:
    ${formattedSalesData}

    Provide the output in a structured JSON format with the following keys:
    {
      "forecastPeriod": "string", // The period requested, e.g., "next_month"
      "estimatedTotalSales": number, // The forecasted sales amount
      "explanation": "string", // A brief explanation of the forecast and influencing factors
      "tipsForAchievingForecast": ["string"] // Actionable tips to reach or exceed the forecast
    }
    `;

    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            "forecastPeriod": { "type": "STRING" },
            "estimatedTotalSales": { "type": "NUMBER" },
            "explanation": { "type": "STRING" },
            "tipsForAchievingForecast": { "type": "ARRAY", "items": { "type": "STRING" } }
          },
          "propertyOrdering": ["forecastPeriod", "estimatedTotalSales", "explanation", "tipsForAchievingForecast"]
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
      const parsedForecast = JSON.parse(jsonString);
      res.status(200).json(parsedForecast);
    } else {
      console.error('Unexpected Gemini API response structure:', result);
      throw new Error('Unexpected AI response structure. Could not generate sales forecast. Please try again.');
    }

  } catch (aiError) {
    console.error('Error during AI sales forecast generation:', aiError);
    res.status(500).json({ message: 'Error generating sales forecast with AI.', error: aiError instanceof Error ? aiError.message : String(aiError) });
  }
});

module.exports = router;
