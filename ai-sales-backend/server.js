require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const multer = require('multer'); // For handling file uploads
const cors = require('cors'); // For Cross-Origin Resource Sharing
const { GoogleGenerativeAI } = require('@google/generative-ai'); // For Gemini API
const mongoose = require('mongoose'); // For MongoDB
const authRoutes = require('./routes/auth'); // Import authentication routes

const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));
// --- END MongoDB Connection ---

// Configure Multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory as a Buffer
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
  },
});

// Initialize Gemini API (using environment variable for API key)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || ""); 
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Use gemini-2.0-flash

// Middleware
app.use(cors()); // Enable CORS for all origins (adjust for production)
app.use(express.json()); // For parsing application/json

// --- Authentication Routes ---
app.use('/api/auth', authRoutes); // All auth-related routes will start with /api/auth
// E.g., POST /api/auth/register, POST /api/auth/login
// --- END Authentication Routes ---

// --- Existing API Endpoint for Pitch Analysis ---
app.post('/api/analyze-pitch', upload.single('audio'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No audio file uploaded.' });
  }

  const audioBuffer = req.file.buffer; // This buffer can be processed by an STT service
  const language = req.body.language || 'English';
  const pitchContext = req.body.pitchContext || 'general sales pitch';

  // In a real application, you would integrate a Speech-to-Text (STT) service here.
  // Examples: Google Cloud Speech-to-Text, AWS Transcribe, or a local STT library.
  // For this example, we'll simulate transcription.
  let transcribedText = `This is a simulated transcription of a pitch in ${language} about ${pitchContext}.`;
  // Example of a more detailed simulated transcription for testing:
  if (language === 'English') {
    transcribedText = `Hello, good morning! My name is Alex, and I'm thrilled to introduce you to PitchPoa AI. We empower small businesses in Kenya with cutting-edge AI tools to dramatically improve their sales pitches. Imagine getting instant, personalized feedback on your tone, pace, and confidence, right from your phone. Our platform helps you turn every conversation into a successful sale. It's designed to be mobile-first and supports multiple African languages, including Swahili. This is a game-changer for entrepreneurs looking to grow their business.`;
  } else if (language === 'Swahili') {
    transcribedText = `Habari za asubuhi! Jina langu ni Alex, na nina furaha kukuletea PitchPoa AI. Tunawawezesha wafanyabiashara wadogo nchini Kenya kwa zana za kisasa za AI ili kuboresha sana mauzo yao. Fikiria kupata maoni ya papo hapo, ya kibinafsi kuhusu sauti yako, kasi, na ujasiri, moja kwa moja kutoka kwa simu yako. Jukwao letu linakusaidia kugeuza kila mazungumzo kuwa mauzo yenye mafanikio. Imeundwa kuwa ya kwanza kwa simu na inasaidia lugha nyingi za Kiafrika, ikiwemo Kiswahili. Huu ni mabadiliko makubwa kwa wajasamali wanaotaka kukuza biashara zao.`;
  }

  // --- AI Analysis using Gemini API ---
  try {
    const prompt = `Analyze the following sales pitch transcription for tone, pace, confidence, and cultural nuances relevant to an African market, specifically Kenya. Provide personalized suggestions for improvement. The pitch was given in ${language} about a ${pitchContext}.

    Provide the feedback in a structured JSON format with the following keys:
    {
        "overallImpression": "A brief summary of the pitch's effectiveness.",
        "toneAnalysis": "Feedback on the speaker's tone (e.g., enthusiastic, monotone, friendly).",
        "paceAnalysis": "Feedback on the speaker's pace (e.g., too fast, too slow, just right, clear articulation).",
        "confidenceAnalysis": "Assessment of speaker's confidence (e.g., highly confident, needs improvement in delivery).",
        "culturalNuances": "Observations on cultural appropriateness and effectiveness for an African/Kenyan context.",
        "suggestionsForImprovement": ["List of actionable suggestions."],
        "multilingualConsiderations": "Any specific feedback related to multilingual delivery if applicable."
    }
    Transcription: "${transcribedText}"
    `;

    // Call Gemini API to generate content
    const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    "overallImpression": { "type": "STRING" },
                    "toneAnalysis": { "type": "STRING" },
                    "paceAnalysis": { "type": "STRING" },
                    "confidenceAnalysis": { "type": "STRING" },
                    "culturalNuances": { "type": "STRING" },
                    "suggestionsForImprovement": {
                        "type": "ARRAY",
                        "items": { "type": "STRING" }
                    },
                    "multilingualConsiderations": { "type": "STRING" }
                },
                "propertyOrdering": [
                    "overallImpression", "toneAnalysis", "paceAnalysis",
                    "confidenceAnalysis", "culturalNuances", "suggestionsForImprovement",
                    "multilingualConsiderations"
                ]
            }
        }
    };

    // The API key is already loaded from process.env.GEMINI_API_KEY by GoogleGenerativeAI
    // No need to pass it in the fetch URL if using the SDK directly as `model.generateContent`
    // However, the provided code uses a direct fetch, so we keep the key in the URL for consistency.
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
      const parsedFeedback = JSON.parse(jsonString);

      // Save pitch session data to MongoDB (conceptual - you'd need a PitchSession model)
      // Example:
      // const PitchSession = require('./models/PitchSession'); 
      // const newSession = new PitchSession({
      //   userId: req.user.id, // Requires authentication middleware to populate req.user
      //   transcription: transcribedText,
      //   feedback: parsedFeedback,
      //   timestamp: new Date()
      // });
      // await newSession.save();

      res.status(200).json(parsedFeedback);
    } else {
      console.error('Unexpected Gemini API response structure:', result);
      throw new Error('Unexpected AI response structure. Please try again.');
    }

  } catch (aiError) {
    console.error('Error during AI analysis:', aiError);
    res.status(500).json({ message: 'Error processing pitch with AI.', error: aiError instanceof Error ? aiError.message : String(aiError) });
  }
});

// Basic route for testing backend
app.get('/', (req, res) => {
  res.send('PitchPoa AI Backend is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`PitchPoa AI Backend listening at http://localhost:${port}`);
});
