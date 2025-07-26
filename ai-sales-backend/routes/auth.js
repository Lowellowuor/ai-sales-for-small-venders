const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken'); // For creating JSON Web Tokens

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', async (req, res) => {
  const { email, password } = req.body; // Extract email and password from request body

  // Basic validation: Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields (email and password)' });
  }

  try {
    // Check if a user with the given email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User with that email already exists' });
    }

    // Create a new User instance
    user = new User({ email, password }); // Password will be hashed by the pre-save hook

    // Save the new user to MongoDB
    await user.save();

    // Create a JSON Web Token (JWT) for the newly registered user
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload: user ID and email
      process.env.JWT_SECRET,             // Secret key from environment variables
      { expiresIn: '1h' }                 // Token expiration time (e.g., 1 hour)
    );

    // Respond with success message, token, and basic user info
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (err) {
    console.error('Registration error:', err.message);
    // Handle specific Mongoose validation errors if needed, otherwise a generic server error
    if (err.code === 11000) { // MongoDB duplicate key error (for unique email)
      return res.status(400).json({ message: 'Email already registered.' });
    }
    res.status(500).json({ message: 'Server error during registration. Please try again.' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // Extract email and password

  // Basic validation: Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields (email and password)' });
  }

  try {
    // Check if user exists by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials (email or password incorrect)' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials (email or password incorrect)' });
    }

    // Create a JSON Web Token (JWT) for the authenticated user
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload: user ID and email
      process.env.JWT_SECRET,             // Secret key
      { expiresIn: '1h' }                 // Token expiration time
    );

    // Respond with success message, token, and basic user info
    res.status(200).json({
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error during login. Please try again.' });
  }
});

module.exports = router;
