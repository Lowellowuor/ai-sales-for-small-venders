
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb'); // Import ObjectId

const app = express();
const PORT = process.env.PORT || 5000; // Use port 5000 or specified by environment

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Enable parsing of JSON request bodies

// --- MongoDB Connection ---
// IMPORTANT: Store your MONGO_URI in a .env file for security!
// Create a file named .env in the 'ai-sales-backend' directory with:
// MONGO_URI="mongodb+srv://<username>:<password>@clustername.mongodb.net/?retryWrites=true&w=majority"
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in .env file or environment variables.");
  console.error("Please create a .env file in the ai-sales-backend directory with MONGO_URI='YOUR_CONNECTION_STRING'");
  process.exit(1); // Exit if critical variable is missing
}

let db; // To hold the database instance
let itemsCollection; // To hold the collection instance

async function connectToMongoDB() {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log("Successfully connected to MongoDB!");
    db = client.db('pitchpoa_db'); // Replace 'pitchpoa_db' with your desired database name
    itemsCollection = db.collection('sales_data'); // Replace 'sales_data' with your desired collection name
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
    process.exit(1); // Exit if connection fails at startup
  }
}

// Connect to MongoDB when the server starts
connectToMongoDB();

// --- API Endpoints ---

app.get('/', (req, res) => {
  /**
   * @route GET /
   * @desc Basic home route to confirm server is running.
   */
  res.send("Backend server is running and connected to MongoDB!");
});

app.post('/items', async (req, res) => {
  /**
   * @route POST /items
   * @desc Adds a new item to the MongoDB collection.
   * @body {object} data - The item data to be inserted.
   */
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).json({ error: "Request must contain JSON data" });
    }

    const result = await itemsCollection.insertOne(data);
    
    res.status(201).json({ // 201 Created
      message: "Item added successfully",
      id: result.insertedId, // MongoDB driver returns ObjectId directly
      item: data
    });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/items', async (req, res) => {
  /**
   * @route GET /items
   * @desc Retrieves all items from the MongoDB collection.
   */
  try {
    const allItems = await itemsCollection.find({}).toArray();
    // Convert ObjectId to string for each item before sending
    const formattedItems = allItems.map(item => ({
      ...item,
      _id: item._id.toString() // Convert ObjectId to string for frontend
    }));
    res.status(200).json(formattedItems);
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ error: error.message });
  }
});

// Example /contact endpoint for your ContactSupportPage
app.post('/contact', async (req, res) => {
  /**
   * @route POST /contact
   * @desc Handles contact form submissions.
   * @body {object} data - Form data (name, email, subject, message).
   */
  try {
    const formData = req.body;
    if (!formData || !formData.name || !formData.email || !formData.subject || !formData.message) {
      return res.status(400).json({ error: "Missing required form fields." });
    }

    // In a real application, you would:
    // 1. Save this data to a 'contact_submissions' collection in MongoDB.
    // 2. Send an email notification (e.g., using Nodemailer).
    // For now, we'll just log it and send a success response.
    console.log("Received contact form submission:", formData);

    // Example: Save to a 'contact_submissions' collection
    // const contactSubmissionsCollection = db.collection('contact_submissions');
    // await contactSubmissionsCollection.insertOne({ ...formData, timestamp: new Date() });

    res.status(200).json({ message: "Contact form submitted successfully!" });
  } catch (error) {
    console.error("Error processing contact form:", error);
    res.status(500).json({ error: error.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
