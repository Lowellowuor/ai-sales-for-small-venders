const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
  // Stub analytics data
  res.json({
    users: 123,
    messagesSent: 456,
    activeWebhooks: 2,
    lastUpdated: new Date()
  });
});

module.exports = router; 