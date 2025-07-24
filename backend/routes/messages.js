const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// Stub: Save message, simulate WhatsApp send
router.post('/', auth, async (req, res) => {
  try {
    const { to, message } = req.body;
    if (!to || !message) {
      return res.status(400).json({ error: 'Recipient and message are required.' });
    }
    const msg = new Message({ to, message });
    await msg.save();
    // Here you would integrate with WhatsApp API
    res.status(201).json({ message: 'Message sent (stub).' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router; 