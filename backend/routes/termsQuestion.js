const express = require('express');
const router = express.Router();
const TermsQuestion = require('../models/TermsQuestion');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const question = new TermsQuestion({ name, email, message });
    await question.save();
    res.status(201).json({ message: 'Question submitted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router; 