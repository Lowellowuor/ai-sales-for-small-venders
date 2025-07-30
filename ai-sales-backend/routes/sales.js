const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale'); // Import the Sale model
const jwt = require('jsonwebtoken'); // For token verification
const User = require('../models/User'); // To ensure user exists

// --- Middleware to protect routes and get user ID from JWT ---
// This is a simplified example. In a real app, you'd put this in a separate middleware file.
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

// @route   POST /api/sales
// @desc    Record a new sale
// @access  Private (requires authentication)
router.post('/', protect, async (req, res) => {
  const { items, customerName, paymentMethod, notes } = req.body;

  // Basic validation
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Sales must include at least one item.' });
  }

  // Validate each item structure
  for (const item of items) {
    if (!item.productId || !item.productName || item.quantity === undefined || item.unitPrice === undefined) {
      return res.status(400).json({ message: 'Each item must have productId, productName, quantity, and unitPrice.' });
    }
    if (item.quantity <= 0 || item.unitPrice < 0 || (item.costPrice !== undefined && item.costPrice < 0)) {
      return res.status(400).json({ message: 'Quantity and prices must be positive numbers.' });
    }
  }

  try {
    // Ensure the user exists (optional, but good practice if user could be deleted)
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const newSale = new Sale({
      userId: req.user.id, // Get userId from the authenticated request
      items,
      customerName,
      paymentMethod,
      notes
    });

    await newSale.save(); // Pre-save hook will calculate totalAmount and totalProfit

    res.status(201).json({ message: 'Sale recorded successfully', sale: newSale });
  } catch (err) {
    console.error('Error recording sale:', err.message);
    res.status(500).json({ message: 'Server error: Could not record sale. Please try again.' });
  }
});

// @route   GET /api/sales
// @desc    Get all sales for the authenticated user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const sales = await Sale.find({ userId: req.user.id }).sort({ date: -1 }); // Sort by most recent
    res.status(200).json(sales);
  } catch (err) {
    console.error('Error fetching sales:', err.message);
    res.status(500).json({ message: 'Server error: Could not fetch sales.' });
  }
});

// @route   GET /api/sales/summary
// @desc    Get aggregated sales performance summary for the authenticated user
// @access  Private
router.get('/summary', protect, async (req, res) => {
  try {
    const summary = await Sale.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } }, // Filter by user ID
      {
        $group: {
          _id: null, // Group all documents into a single group
          totalSalesAmount: { $sum: '$totalAmount' },
          totalProfitAmount: { $sum: '$totalProfit' },
          numberOfSales: { $sum: 1 } // Count the number of sales
        }
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          totalSalesAmount: 1,
          totalProfitAmount: 1,
          numberOfSales: 1
        }
      }
    ]);

    // If no sales, return default 0 values
    if (summary.length === 0) {
      return res.status(200).json({ totalSalesAmount: 0, totalProfitAmount: 0, numberOfSales: 0 });
    }

    res.status(200).json(summary[0]); // summary is an array, we take the first (and only) element
  } catch (err) {
    console.error('Error fetching sales summary:', err.message);
    res.status(500).json({ message: 'Server error: Could not fetch sales summary.' });
  }
});

// @route   GET /api/sales/trends
// @desc    Get sales trends by day/month for the authenticated user
// @access  Private
router.get('/trends', protect, async (req, res) => {
  const { period = 'day' } = req.query; // 'day' or 'month'

  let groupByFormat;
  if (period === 'month') {
    groupByFormat = { year: { $year: '$date' }, month: { $month: '$date' } };
  } else {
    groupByFormat = { year: { $year: '$date' }, month: { $month: '$date' }, day: { $dayOfMonth: '$date' } };
  }

  try {
    const trends = await Sale.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $group: {
          _id: groupByFormat,
          dailySales: { $sum: '$totalAmount' },
          dailyProfit: { $sum: '$totalProfit' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }, // Sort chronologically
      {
        $project: {
          _id: 0,
          date: {
            $dateFromParts: {
              year: '$_id.year',
              month: '$_id.month',
              day: { $ifNull: ['$_id.day', 1] } // Default to 1st day for monthly grouping
            }
          },
          totalSales: '$dailySales',
          totalProfit: '$dailyProfit',
          numberOfSales: '$count'
        }
      }
    ]);

    res.status(200).json(trends);
  } catch (err) {
    console.error('Error fetching sales trends:', err.message);
    res.status(500).json({ message: 'Server error: Could not fetch sales trends.' });
  }
});


module.exports = router;
