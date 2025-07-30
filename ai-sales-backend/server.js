require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const multer = require('multer'); // For handling file uploads
const cors = require('cors'); // For Cross-Origin Resource Sharing
const { GoogleGenerativeAI } = require('@google/generative-ai'); // For Gemini API
const mongoose = require('mongoose'); // For MongoDB

// Import routes
const authRoutes = require('./routes/auth'); // User authentication routes
const salesRoutes = require('./routes/sales'); // Sales routes
const expenseRoutes = require('./routes/expenses'); // Expense routes
const financialInsightsRoutes = require('./routes/financialInsights'); // Financial Insights routes
const notificationRoutes = require('./routes/notifications'); // Notification routes
const salesScriptsRoutes = require('./routes/salesScripts'); // Sales Scripts routes
const mpesaAnalysisRoutes = require('./routes/mpesaAnalysis'); // M-Pesa Analysis routes
const customerRoutes = require('./routes/customers'); // Customer routes
const customerSegmentationRoutes = require('./routes/customerSegmentation'); // Customer Segmentation routes
const marketingSuggestionsRoutes = require('./routes/marketingSuggestions'); // Marketing Suggestions routes
const productRecommendationsRoutes = require('./routes/productRecommendations'); // Product Recommendations routes
const salesForecastRoutes = require('./routes/salesForecast'); // Sales Forecast routes
const inventoryRoutes = require('./routes/inventory'); // Inventory routes
const supplierRoutes = require('./routes/suppliers'); // Supplier routes
const marketingCampaignsRoutes = require('./routes/marketingCampaigns'); // Marketing Campaigns routes
const customerCRMRoutes = require('./routes/customerCRM'); // Customer CRM routes
const businessAnalyticsRoutes = require('./routes/businessAnalytics'); // <<< NEW: Business Analytics routes

// Passport for social authentication
const passport = require('passport');
const session = require('express-session'); // For session management (required by Passport for OAuth)

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
app.use(cors({
  origin: ['http://localhost:5173', 'https://pitch-poa.web.app'], // IMPORTANT: Add your frontend URL(s) here
  credentials: true // Allow cookies and authorization headers to be sent
}));
app.use(express.json()); // For parsing application/json

// --- Session Middleware (required for Passport OAuth) ---
app.use(session({
  secret: process.env.JWT_SECRET, // Use your JWT secret for session secret
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
    // secure: process.env.NODE_ENV === 'production' // Use secure cookies in production (HTTPS)
  }
}));

// --- Passport Initialization ---
app.use(passport.initialize());
app.use(passport.session()); // Use passport session middleware

// Passport serialize and deserialize user (for session management)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const User = require('./models/User'); // Import User model here to avoid circular dependency
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// --- Configure Passport Strategies (Google & GitHub) ---
// require('./config/passport')(passport); // Still commented out if you chose to disable social logins
// --- END Passport Initialization ---


// --- Authentication Routes ---
app.use('/api/auth', authRoutes); // All auth-related routes will start with /api/auth
// --- Sales Routes ---
app.use('/api/sales', salesRoutes); // All sales-related routes will start with /api/sales
// --- Expense Routes ---
app.use('/api/expenses', expenseRoutes); // All expense-related routes will start with /api/expenses
// --- Financial Insights Routes ---
app.use('/api/financial-insights', financialInsightsRoutes); // All financial insights routes
// --- Notification Routes ---
app.use('/api/notifications', notificationRoutes); // All notification routes
// --- Sales Scripts Routes ---
app.use('/api/sales-scripts', salesScriptsRoutes); // All sales script generation routes
// --- M-Pesa Analysis Routes ---
app.use('/api/mpesa-analysis', mpesaAnalysisRoutes); // All M-Pesa analysis routes
// --- Customer Routes ---
app.use('/api/customers', customerRoutes); // All customer management routes
// --- Customer Segmentation Routes ---
app.use('/api/customer-segmentation', customerSegmentationRoutes); // All customer segmentation routes
// --- Marketing Suggestions Routes ---
app.use('/api/marketing-suggestions', marketingSuggestionsRoutes); // All marketing suggestions routes
// --- Product Recommendations Routes ---
app.use('/api/product-recommendations', productRecommendationsRoutes); // All product recommendations routes
// --- Sales Forecast Routes ---
app.use('/api/sales-forecast', salesForecastRoutes); // All sales forecast routes
// --- Inventory Routes ---
app.use('/api/inventory', inventoryRoutes); // All inventory management routes
// --- Supplier Routes ---
app.use('/api/suppliers', supplierRoutes); // All supplier management and order automation routes
// --- Marketing Campaigns Routes ---
app.use('/api/marketing-campaigns', marketingCampaignsRoutes); // All marketing campaign generation routes
// --- Customer CRM Routes ---
app.use('/api/customer-crm', customerCRMRoutes); // All customer CRM and follow-up routes
// --- NEW: Business Analytics Routes ---
app.use('/api/business-analytics', businessAnalyticsRoutes); // All business analytics routes
// --- END New Routes ---

// --- Existing API Endpoint for Pitch Analysis ---
app.post('/api/analyze-pitch', upload.single('audio'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No audio file uploaded.' });
  }

  const audioBuffer = req.file.buffer;
  const language = req.body.language || 'English';
  const pitchContext = req.body.pitchContext || 'general sales pitch';

  let transcribedText = `This is a simulated transcription of a pitch in ${language} about ${pitchContext}.`;
  if (language === 'English') {
    transcribedText = `Hello, good morning! My name is Alex, and I'm thrilled to introduce you to PitchPoa AI. We empower small businesses in Kenya with cutting-edge AI tools to dramatically improve their sales pitches. Imagine getting instant, personalized feedback on your tone, pace, and confidence, right from your phone. Our platform helps you turn every conversation into a successful sale. It's designed to be mobile-first and supports multiple African languages, including Swahili. This is a game-changer for entrepreneurs looking to grow their business.`;
  } else if (language === 'Swahili') {
    transcribedText = `Habari za asubuhi! Jina langu ni Alex, na nina furaha kukuletea PitchPoa AI. Tunawawezesha wafanyabiashara wadogo nchini Kenya kwa zana za kisasa za AI ili kuboresha sana mauzo yao. Fikiria kupata maoni ya papo hapo, ya kibinafsi kuhusu sauti yako, kasi, na ujasiri, moja kwa moja kutoka kwa simu yako. Jukwao letu linakusaidia kugeuza kila mazungumzo kuwa mauzo yenye mafanikio. Imeundwa kuwa ya kwanza kwa simu na inasaidia lugha nyingi za Kiafrika, ikiwemo Kiswahili. Huu ni mabadiliko makubwa kwa wajasamali wanaotaka kukuza biashara zao.`;
  }

  try {
    const prompt = `Analyze the following sales pitch transcription for tone, pace, confidence, and cultural nuances relevant to an African market, specifically Kenya. Provide personalized suggestions for improvement. The pitch was given in ${language} about a ${pitchContext}.

    Provide the feedback in a structured JSON format with the following keys:
    {
        "overallImpression": "A brief summary of the pitch's effectiveness.",
        "toneAnalysis": "Feedback on the speaker's tone (e.g., enthusiastic, monotone, friendly).",
        "paceAnalysis": "Feedback on the speaker's pace (e.g., too fast, too slow, just right, clear articulation).",
        "confidenceAnalysis": "Assessment of speaker's confidence (e.g., highly confident, needs improvement in delivery).",
        "culturalNuances": { "type": "STRING" },
        "suggestionsForImprovement": {
            "type": "ARRAY",
            "items": { "type": "STRING" }
        },
        "multilingualConsiderations": { "type": "STRING" }
    }
    Transcription: "${transcribedText}"
    `;

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
