// routes/marketingSuggestions.js
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

// @route   POST /api/marketing-suggestions
// @desc    Get AI-powered marketing content suggestions for a given segment/goal
// @access  Private
router.post('/', protect, async (req, res) => {
  const { segmentDescription, marketingGoal, desiredFormat } = req.body;

  if (!segmentDescription || !marketingGoal || !desiredFormat) {
    return res.status(400).json({ message: 'Segment description, marketing goal, and desired format are required.' });
  }

  try {
    const prompt = `You are an expert marketing assistant for small businesses in Kenya.
    Generate marketing content suggestions based on the following details:

    Customer Segment Description: "${segmentDescription}"
    Marketing Goal: "${marketingGoal}"
    Desired Format: "${desiredFormat}" (e.g., "Short SMS", "WhatsApp message", "Social media post", "Email subject line and body")

    Ensure the tone is appropriate for a Kenyan small business context (e.g., friendly, respectful, clear, value-oriented).
    Include a call to action if appropriate for the format.
    Keep the content concise and impactful.

    Provide the output in a structured JSON format with the following keys:
    {
      "suggestions": [
        {
          "format": "string", // e.g., "SMS", "WhatsApp", "Social Media", "Email"
          "content": "string", // The actual marketing message
          "notes": "string" // Any specific notes about this suggestion
        }
      ],
      "generalTips": ["List of general marketing tips for this scenario."]
    }
    `;

    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            "suggestions": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "format": { "type": "STRING" },
                  "content": { "type": "STRING" },
                  "notes": { "type": "STRING" }
                },
                "propertyOrdering": ["format", "content", "notes"]
              }
            },
            "generalTips": { "type": "ARRAY", "items": { "type": "STRING" } }
          },
          "propertyOrdering": ["suggestions", "generalTips"]
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
      throw new Error('Unexpected AI response structure. Could not generate marketing suggestions. Please try again.');
    }

  } catch (aiError) {
    console.error('Error during AI marketing suggestions generation:', aiError);
    res.status(500).json({ message: 'Error generating marketing suggestions with AI.', error: aiError instanceof Error ? aiError.message : String(aiError) });
  }
});

module.exports = router;
