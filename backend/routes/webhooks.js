const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Stub: Accept webhook registration
router.post('/', auth, (req, res) => {
  const { url, event } = req.body;
  if (!url || !event) {
    return res.status(400).json({ error: 'Webhook URL and event are required.' });
  }
  // Here you would save webhook info to DB and validate
  res.status(201).json({ message: 'Webhook registered (stub).' });
});

module.exports = router; 