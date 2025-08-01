// ai-sales-backend/routes/rag.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const mongoose = require('mongoose');

// --- FIX: Corrected model name from 'Product' to 'InventoryItem' ---
const InventoryItem = require('../models/InventoryItem'); // This file exists in your models directory

const Customer = require('../models/Customer');
const Sale = require('../models/Sale');
const Expense = require('../models/Expense');

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

// Helper function for exponential backoff for API calls
const callGeminiWithRetry = async (payload, apiKey, apiUrl, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        return await response.json();
      } else if (response.status === 503 && i < retries - 1) {
        console.warn(`Gemini API returned 503. Retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      } else {
        const errorText = await response.text();
        throw new Error(`Gemini API request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }
    } catch (err) {
      if (i === retries - 1) throw err; // Re-throw on last retry
      console.warn(`Error calling Gemini API: ${err.message}. Retrying in ${delay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
};

// Helper to parse date ranges from natural language
const parseDateRange = (text) => {
  const now = new Date();
  let startDate = null;
  let endDate = now;

  text = text.toLowerCase();

  if (text.includes('today')) {
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else if (text.includes('yesterday')) {
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    startDate.setDate(startDate.getDate() - 1);
    endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1); // End of yesterday
  } else if (text.includes('this week')) {
    startDate = new Date(now.setDate(now.getDate() - now.getDay())); // Start of current week (Sunday)
  } else if (text.includes('last week')) {
    startDate = new Date(now.setDate(now.getDate() - now.getDay() - 7));
    endDate = new Date(now.setDate(now.getDate() + 6)); // End of last week
  } else if (text.includes('this month')) {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  } else if (text.includes('last month')) {
    startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    endDate = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of last month
  } else if (text.includes('this year')) {
    startDate = new Date(now.getFullYear(), 0, 1);
  } else if (text.includes('last year')) {
    startDate = new Date(now.getFullYear() - 1, 0, 1);
    endDate = new Date(now.getFullYear() - 1, 11, 31);
  } else if (text.match(/q[1-4] \d{4}/)) { // e.g., "Q1 2024"
    const [q, yearStr] = text.split(' ');
    const year = parseInt(yearStr);
    const quarter = parseInt(q.replace('q', ''));
    if (!isNaN(year) && !isNaN(quarter) && quarter >= 1 && quarter <= 4) {
      startDate = new Date(year, (quarter - 1) * 3, 1);
      endDate = new Date(year, quarter * 3, 0);
    }
  }

  return { startDate, endDate };
};


// @route   POST /api/rag-query
// @desc    Process a user query using advanced RAG (Retrieval Augmented Generation)
// @access  Private
router.post('/', protect, async (req, res) => {
  const userQuery = req.body.query;
  const userId = req.user.id;

  if (!userQuery) {
    return res.status(400).json({ message: 'Query is required.' });
  }

  let context = '';
  let intentData = {};

  try {
    // --- Step 1: Intelligent Query Analysis by LLM ---
    // Use Gemini to understand the user's intent and extract entities
    const queryAnalysisPrompt = `Analyze the following user query to identify the primary intent and any relevant entities (e.g., product names, customer names, date ranges, categories).
    Output a JSON object with 'intent' (e.g., 'get_sales_summary', 'find_product', 'get_customer_info', 'get_expense_summary', 'general_question'), and 'entities' (an object containing extracted details like 'productName', 'customerName', 'category', 'timePeriod').
    If no specific intent or entities are found, use 'general_question' and an empty entities object.

    Query: "${userQuery}"

    Example Output for "What were my sales for 'Coffee Beans' last month?":
    { "intent": "get_sales_summary", "entities": { "productName": "Coffee Beans", "timePeriod": "last month" } }

    Example Output for "Who is John Doe?":
    { "intent": "get_customer_info", "entities": { "customerName": "John Doe" } }

    Example Output for "Tell me about my highest stock items":
    { "intent": "find_product", "entities": { "criteria": "highest stock" } }

    Example Output for "What were my transport expenses in Q1 2024?":
    { "intent": "get_expense_summary", "entities": { "category": "Transport", "timePeriod": "Q1 2024" } }

    Output only the JSON object.
    `;

    const analysisPayload = {
      contents: [{ role: "user", parts: [{ text: queryAnalysisPrompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            "intent": { "type": "STRING" },
            "entities": {
              "type": "OBJECT",
              "additionalProperties": { "type": "STRING" } // Flexible for various entities
            }
          },
          "propertyOrdering": ["intent", "entities"]
        }
      }
    };

    const analysisResult = await callGeminiWithRetry(analysisPayload, process.env.GEMINI_API_KEY || "", `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`);
    const analysisJsonString = analysisResult.candidates[0]?.content?.parts[0]?.text;
    if (analysisJsonString) {
      intentData = JSON.parse(analysisJsonString);
    } else {
      console.warn("Gemini query analysis returned no valid JSON. Defaulting to general question.");
      intentData = { intent: "general_question", entities: {} };
    }

    const { intent, entities } = intentData;
    const userIdObjectId = new mongoose.Types.ObjectId(userId);

    // --- Step 2: Dynamic Data Retrieval based on Intent ---
    let retrievedData = {};
    const { startDate, endDate } = parseDateRange(entities.timePeriod || '');

    switch (intent) {
      case 'get_sales_summary':
        let salesMatch = { userId: userIdObjectId };
        if (entities.productName) {
          // Using InventoryItem instead of the missing Product model
          const inventoryItem = await InventoryItem.findOne({ userId: userIdObjectId, name: { $regex: entities.productName, $options: 'i' } });
          if (inventoryItem) {
            salesMatch.inventoryItemId = new mongoose.Types.ObjectId(inventoryItem._id);
          } else {
            context += `Note: Product "${entities.productName}" not found. Showing general sales.\n`;
          }
        }
        if (startDate && endDate) {
          salesMatch.date = { $gte: startDate, $lte: endDate };
        }

        const salesSummary = await Sale.aggregate([
          { $match: salesMatch },
          { $group: { _id: null, totalAmount: { $sum: '$amount' }, totalProfit: { $sum: '$profit' } } }
        ]);
        const recentSales = await Sale.find(salesMatch).sort({ date: -1 }).limit(5);
        retrievedData.sales = { summary: salesSummary[0], recent: recentSales };
        break;

      case 'get_expense_summary':
        let expenseMatch = { userId: userIdObjectId };
        if (entities.category) {
          expenseMatch.category = { $regex: entities.category, $options: 'i' };
        }
        if (startDate && endDate) {
          expenseMatch.date = { $gte: startDate, $lte: endDate };
        }

        const expenseSummary = await Expense.aggregate([
          { $match: expenseMatch },
          { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
        ]);
        const expensesByCategory = await Expense.aggregate([
          { $match: expenseMatch },
          { $group: { _id: '$category', total: { $sum: '$amount' } } },
          { $sort: { total: -1 } }
        ]);
        const recentExpenses = await Expense.find(expenseMatch).sort({ date: -1 }).limit(5);
        retrievedData.expenses = { summary: expenseSummary[0], byCategory: expensesByCategory, recent: recentExpenses };
        break;

      case 'find_product':
        let productQuery = { userId: userIdObjectId };
        if (entities.productName) {
          productQuery.name = { $regex: entities.productName, $options: 'i' };
        } else if (entities.category) {
          productQuery.category = { $regex: entities.category, $options: 'i' };
        } else if (entities.criteria && entities.criteria.includes('highest stock')) {
          retrievedData.products = await InventoryItem.find({ userId: userIdObjectId }).sort({ stock: -1 }).limit(3);
        } else if (entities.criteria && entities.criteria.includes('lowest stock')) {
          retrievedData.products = await InventoryItem.find({ userId: userIdObjectId }).sort({ stock: 1 }).limit(3);
        } else {
          retrievedData.products = await InventoryItem.find(productQuery).limit(5); // General product search
        }
        break;

      case 'get_customer_info':
        let customerQuery = { userId: userIdObjectId };
        if (entities.customerName) {
          customerQuery.name = { $regex: entities.customerName, $options: 'i' };
        } else if (entities.criteria && entities.criteria.includes('top customers')) {
          const topCustomers = await Sale.aggregate([
            { $match: { userId: userIdObjectId } },
            { $group: { _id: '$customerId', totalSales: { $sum: '$amount' } } },
            { $sort: { totalSales: -1 } },
            { $limit: 3 },
            { $lookup: { from: 'customers', localField: '_id', foreignField: '_id', as: 'customerDetails' } },
            { $unwind: '$customerDetails' },
            { $project: { _id: 0, customerName: '$customerDetails.name', customerEmail: '$customerDetails.email', totalSales: '$totalSales' } }
          ]);
          retrievedData.customers = topCustomers;
        } else {
          retrievedData.customers = await Customer.find(customerQuery).limit(5); // General customer search
        }
        break;

      case 'general_question':
      default:
        // For general questions, provide a broad overview of recent data
        retrievedData.recentSales = await Sale.find({ userId: userIdObjectId }).sort({ date: -1 }).limit(3);
        retrievedData.recentExpenses = await Expense.find({ userId: userIdObjectId }).sort({ date: -1 }).limit(3);
        retrievedData.recentProducts = await InventoryItem.find({ userId: userIdObjectId }).sort({ createdAt: -1 }).limit(3);
        retrievedData.recentCustomers = await Customer.find({ userId: userIdObjectId }).sort({ createdAt: -1 }).limit(3);
        break;
    }

    // --- Step 3: Augmentation - Format retrieved data into context ---
    if (retrievedData.sales) {
      context += '\n### Sales Data:\n';
      if (retrievedData.sales.summary) {
        context += `- Total Sales: Ksh ${retrievedData.sales.summary.totalAmount?.toFixed(2) || 0}\n`;
        context += `- Total Profit: Ksh ${retrievedData.sales.summary.totalProfit?.toFixed(2) || 0}\n`;
      }
      if (retrievedData.sales.recent && retrievedData.sales.recent.length > 0) {
        context += 'Recent Sales:\n';
        retrievedData.sales.recent.forEach(s => context += `  - ${s.productName} (Ksh ${s.amount.toFixed(2)}) on ${s.date.toISOString().split('T')[0]}\n`);
      }
    }

    if (retrievedData.expenses) {
      context += '\n### Expense Data:\n';
      if (retrievedData.expenses.summary) {
        context += `- Total Expenses: Ksh ${retrievedData.expenses.summary.totalAmount?.toFixed(2) || 0}\n`;
      }
      if (retrievedData.expenses.byCategory && retrievedData.expenses.byCategory.length > 0) {
        context += 'Expenses by Category:\n';
        retrievedData.expenses.byCategory.forEach(cat => context += `  - ${cat._id}: Ksh ${cat.total.toFixed(2)}\n`);
      }
      if (retrievedData.expenses.recent && retrievedData.expenses.recent.length > 0) {
        context += 'Recent Expenses:\n';
        retrievedData.expenses.recent.forEach(e => context += `  - ${e.category} (Ksh ${e.amount.toFixed(2)}) on ${e.date.toISOString().split('T')[0]}\n`);
      }
    }

    if (retrievedData.products && retrievedData.products.length > 0) {
      context += '\n### Product Data:\n';
      retrievedData.products.forEach(p => context += `  - ${p.name} (Category: ${p.category}, Price: Ksh ${p.price.toFixed(2)}, Stock: ${p.stock})\n`);
    }

    if (retrievedData.customers && retrievedData.customers.length > 0) {
      context += '\n### Customer Data:\n';
      retrievedData.customers.forEach(c => context += `  - ${c.customerName || c.name} (Email: ${c.customerEmail || c.email || 'N/A'}, Phone: ${c.phone || 'N/A'}${c.totalSales ? `, Total Sales: Ksh ${c.totalSales.toFixed(2)}` : ''})\n`);
    }

    if (intent === 'general_question' && !context) {
      context = "No specific data found. Here's a general overview of your recent business activities:";
      if (retrievedData.recentSales && retrievedData.recentSales.length > 0) {
        context += '\nRecent Sales:\n';
        retrievedData.recentSales.forEach(s => context += `  - ${s.productName} (Ksh ${s.amount.toFixed(2)}) on ${s.date.toISOString().split('T')[0]}\n`);
      }
      if (retrievedData.recentExpenses && retrievedData.recentExpenses.length > 0) {
        context += '\nRecent Expenses:\n';
        retrievedData.recentExpenses.forEach(e => context += `  - ${e.category} (Ksh ${e.amount.toFixed(2)}) on ${e.date.toISOString().split('T')[0]}\n`);
      }
      if (retrievedData.recentProducts && retrievedData.recentProducts.length > 0) {
        context += '\nRecent Products Added:\n';
        retrievedData.recentProducts.forEach(p => context += `  - ${p.name} (Stock: ${p.stock})\n`);
      }
      if (retrievedData.recentCustomers && retrievedData.recentCustomers.length > 0) {
        context += '\nRecent Customers Added:\n';
        retrievedData.recentCustomers.forEach(c => context += `  - ${c.name} (Phone: ${c.phone || 'N/A'})\n`);
      }
      if (!retrievedData.recentSales?.length && !retrievedData.recentExpenses?.length && !retrievedData.recentProducts?.length && !retrievedData.recentCustomers?.length) {
        context = "No recent business data available to provide a general overview. Please add some sales, expenses, products, or customers.";
      }
    } else if (!context && intent !== 'general_question') {
        context = `No specific data found for your query about "${userQuery}".`;
    }


    // --- Step 4: Generation with Augmented Prompt ---
    const augmentedPrompt = `You are an AI business assistant for a small vendor in Kenya.
    Your goal is to provide concise, accurate, and actionable answers based *only* on the provided "Context from Business Data".
    If the context does not contain the specific information needed to answer the user's question, state that you cannot answer based on the available data.
    Do not invent information. Focus on direct answers.
    Consider the Kenyan market context where applicable (e.g., M-Pesa, local business practices).

    --- User Query ---
    ${userQuery}

    --- Context from Business Data ---
    ${context}
    ---

    Provide your answer in a clear, conversational tone.`;

    const payload = {
      contents: [{ role: "user", parts: [{ text: augmentedPrompt }] }],
      generationConfig: {
        responseMimeType: "text/plain", // We expect plain text for the answer
      }
    };

    const apiKey = process.env.GEMINI_API_KEY || "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const result = await callGeminiWithRetry(payload, apiKey, apiUrl);

    if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
      const aiResponse = result.candidates[0].content.parts[0].text;
      res.status(200).json({ answer: aiResponse });
    } else {
      console.error('Unexpected Gemini API response structure:', result);
      res.status(500).json({ message: 'Unexpected AI response structure. Could not generate an answer.' });
    }

  } catch (aiError) {
    console.error('Error during advanced RAG query processing:', aiError);
    res.status(500).json({ message: 'Error processing your query with AI.', error: aiError.message });
  }
});

module.exports = router;
