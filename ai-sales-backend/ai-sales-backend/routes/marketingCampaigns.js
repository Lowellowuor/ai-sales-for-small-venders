// routes/marketingCampaigns.js
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

// @route   POST /api/marketing-campaigns
// @desc    Generate AI-powered marketing campaign content
// @access  Private
router.post('/', protect, async (req, res) => {
  const { campaignName, targetAudienceDescription, marketingGoal, desiredChannels, campaignDuration } = req.body;

  if (!campaignName || !targetAudienceDescription || !marketingGoal || !desiredChannels || desiredChannels.length === 0) {
    return res.status(400).json({ message: 'Campaign name, target audience, marketing goal, and at least one desired channel are required.' });
  }

  try {
    const prompt = `You are an AI marketing strategist for a small business in Kenya.
    Generate a comprehensive marketing campaign plan and content based on the following details:

    Campaign Name: "${campaignName}"
    Target Audience Description: "${targetAudienceDescription}"
    Marketing Goal: "${marketingGoal}"
    Desired Channels: ${desiredChannels.join(', ')}
    Campaign Duration: ${campaignDuration || 'Not specified, assume a typical short-term campaign (e.g., 1-2 weeks)'}

    For each desired channel, provide specific, actionable content.
    Also, include a suggested campaign structure/timeline and general tips for execution.

    Consider the Kenyan market context (e.g., M-Pesa, community focus, mobile-first).

    Provide the output in a structured JSON format with the following keys:
    {
      "campaignName": "string",
      "targetAudience": "string",
      "marketingGoal": "string",
      "campaignDuration": "string",
      "campaignContent": [
        {
          "channel": "string", // e.g., "SMS", "WhatsApp", "Facebook Post", "Email"
          "subjectOrHeadline": "string", // For email/social media
          "body": "string", // The main content
          "callToAction": "string",
          "notes": "string" // Any specific notes for this channel's content
        }
      ],
      "suggestedTimeline": ["string"], // e.g., "Day 1: SMS blast", "Day 3: Facebook engagement post"
      "generalExecutionTips": ["List of general tips for running the campaign."]
    }
    `;

    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            "campaignName": { "type": "STRING" },
            "targetAudience": { "type": "STRING" },
            "marketingGoal": { "type": "STRING" },
            "campaignDuration": { "type": "STRING" },
            "campaignContent": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "channel": { "type": "STRING" },
                  "subjectOrHeadline": { "type": "STRING" },
                  "body": { "type": "STRING" },
                  "callToAction": { "type": "STRING" },
                  "notes": { "type": "STRING" }
                },
                "propertyOrdering": ["channel", "subjectOrHeadline", "body", "callToAction", "notes"]
              }
            },
            "suggestedTimeline": { "type": "ARRAY", "items": { "type": "STRING" } },
            "generalExecutionTips": { "type": "ARRAY", "items": { "type": "STRING" } }
          },
          "propertyOrdering": ["campaignName", "targetAudience", "marketingGoal", "campaignDuration", "campaignContent", "suggestedTimeline", "generalExecutionTips"]
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
      const parsedCampaign = JSON.parse(jsonString);
      res.status(200).json(parsedCampaign);
    } else {
      console.error('Unexpected Gemini API response structure:', result);
      throw new Error('Unexpected AI response structure. Could not generate marketing campaign. Please try again.');
    }

  } catch (aiError) {
    console.error('Error during AI marketing campaign generation:', aiError);
    res.status(500).json({ message: 'Error generating marketing campaign with AI.', error: aiError instanceof Error ? aiError.message : String(aiError) });
  }
});

module.exports = router;
