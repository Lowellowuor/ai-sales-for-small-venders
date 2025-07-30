// routes/salesScripts.js
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

// @route   POST /api/sales-scripts/generate
// @desc    Generate a sales script using AI based on provided details
// @access  Private
router.post('/generate', protect, async (req, res) => {
  const { productName, targetAudience, keyBenefits, tone, length } = req.body;

  // Basic validation
  if (!productName || !targetAudience || !keyBenefits) {
    return res.status(400).json({ message: 'Product name, target audience, and key benefits are required.' });
  }

  try {
    const prompt = `Generate a sales script for a small vendor in Kenya.
    The product/service is: "${productName}".
    The target audience is: "${targetAudience}".
    Key benefits to highlight: "${keyBenefits}".
    Desired tone: ${tone || 'professional and friendly'}.
    Desired length: ${length || 'medium (around 200 words)'}.

    Ensure the script is culturally relevant to the Kenyan market, considering common communication styles and local business practices.
    Provide the script in plain text, ready for use.`;

    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "text/plain" // We want plain text output for a script
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
      const generatedScript = result.candidates[0].content.parts[0].text;
      res.status(200).json({ script: generatedScript });
    } else {
      console.error('Unexpected Gemini API response structure:', result);
      throw new Error('Unexpected AI response structure. Could not generate script. Please try again.');
    }

  } catch (aiError) {
    console.error('Error during AI script generation:', aiError);
    res.status(500).json({ message: 'Error generating sales script with AI.', error: aiError instanceof Error ? aiError.message : String(aiError) });
  }
});

module.exports = router;
