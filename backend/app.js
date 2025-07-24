require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const contactRoutes = require('./routes/contact');
const termsQuestionRoutes = require('./routes/termsQuestion');
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages');
const analyticsRoutes = require('./routes/analytics');
const webhookRoutes = require('./routes/webhooks');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/terms-question', termsQuestionRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/webhooks', webhookRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('PitchPoa Backend API');
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  }); 