// routes/notifications.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification'); // Import the Notification model
const Sale = require('../models/Sale'); // Needed for alert logic
const Expense = require('../models/Expense'); // Needed for alert logic
const jwt = require('jsonwebtoken'); // For token verification
const mongoose = require('mongoose'); // For ObjectId in aggregation

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

// @route   GET /api/notifications
// @desc    Get all notifications for the authenticated user, optionally filter by read status
// @access  Private
router.get('/', protect, async (req, res) => {
  const { isRead } = req.query; // Query parameter: ?isRead=true or ?isRead=false
  let filter = { userId: req.user.id };

  if (isRead !== undefined) {
    filter.isRead = isRead === 'true'; // Convert string to boolean
  }

  try {
    const notifications = await Notification.find(filter).sort({ timestamp: -1 }); // Sort by most recent
    res.status(200).json(notifications);
  } catch (err) {
    console.error('Error fetching notifications:', err.message);
    res.status(500).json({ message: 'Server error: Could not fetch notifications.' });
  }
});

// @route   PATCH /api/notifications/:id/read
// @desc    Mark a specific notification as read
// @access  Private
router.patch('/:id/read', protect, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // Find by ID and ensure it belongs to the user
      { $set: { isRead: true } },
      { new: true } // Return the updated document
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found or not authorized.' });
    }

    res.status(200).json({ message: 'Notification marked as read.', notification });
  } catch (err) {
    console.error('Error marking notification as read:', err.message);
    res.status(500).json({ message: 'Server error: Could not mark notification as read.' });
  }
});

// @route   POST /api/notifications/generate-test-alert
// @desc    (FOR TESTING) Generate a sample sales or expense alert
// @access  Private
router.post('/generate-test-alert', protect, async (req, res) => {
  const { type, title, message, link } = req.body;

  if (!type || !title || !message) {
    return res.status(400).json({ message: 'Type, title, and message are required for a test alert.' });
  }

  try {
    const newNotification = new Notification({
      userId: req.user.id,
      type,
      title,
      message,
      link,
      isRead: false
    });

    await newNotification.save();
    res.status(201).json({ message: 'Test notification generated successfully!', notification: newNotification });
  } catch (err) {
    console.error('Error generating test alert:', err.message);
    res.status(500).json({ message: 'Server error: Could not generate test alert.' });
  }
});

// --- Example of a simple alert generation logic (can be expanded) ---
// This could be triggered by a cron job or a data change listener
router.post('/check-for-alerts', protect, async (req, res) => {
  const userId = req.user.id;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  let generatedAlerts = [];

  try {
    // Check for low sales in the last 7 days (example rule)
    const salesLast7Days = await Sale.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId), date: { $gte: sevenDaysAgo } } },
      { $group: { _id: null, totalSales: { $sum: '$amount' } } }
    ]);

    const totalSales = salesLast7Days.length > 0 ? salesLast7Days[0].totalSales : 0;

    if (totalSales < 1000 && totalSales > 0) { // Example threshold: less than Ksh 1000 in a week
      const existingAlert = await Notification.findOne({
        userId,
        type: 'sales_alert',
        title: 'Low Sales Alert',
        isRead: false,
        timestamp: { $gte: sevenDaysAgo } // Only create if no similar unread alert in last 7 days
      });

      if (!existingAlert) {
        const alert = new Notification({
          userId,
          type: 'sales_alert',
          title: 'Low Sales Alert',
          message: `Your total sales for the last 7 days are Ksh ${totalSales.toLocaleString('en-KE')}. Consider new marketing strategies!`,
          link: '/sales-dashboard'
        });
        await alert.save();
        generatedAlerts.push(alert);
      }
    } else if (totalSales === 0) {
        const existingAlert = await Notification.findOne({
            userId,
            type: 'sales_alert',
            title: 'No Sales Recorded',
            isRead: false,
            timestamp: { $gte: sevenDaysAgo }
        });
        if (!existingAlert) {
            const alert = new Notification({
                userId,
                type: 'sales_alert',
                title: 'No Sales Recorded',
                message: 'You have not recorded any sales in the last 7 days. Time to get selling!',
                link: '/sales-dashboard'
            });
            await alert.save();
            generatedAlerts.push(alert);
        }
    }

    // Check for high expenses (example rule)
    const expensesToday = await Expense.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId), date: { $gte: today } } },
      { $group: { _id: null, totalExpenses: { $sum: '$amount' } } }
    ]);

    const totalDailyExpenses = expensesToday.length > 0 ? expensesToday[0].totalExpenses : 0;

    if (totalDailyExpenses > 500) { // Example threshold: more than Ksh 500 today
      const existingAlert = await Notification.findOne({
        userId,
        type: 'expense_alert',
        title: 'High Daily Expenses',
        isRead: false,
        timestamp: { $gte: today } // Only create if no similar unread alert today
      });

      if (!existingAlert) {
        const alert = new Notification({
          userId,
          type: 'expense_alert',
          title: 'High Daily Expenses',
          message: `Your expenses today are Ksh ${totalDailyExpenses.toLocaleString('en-KE')}. Review your spending!`,
          link: '/expense-dashboard'
        });
        await alert.save();
        generatedAlerts.push(alert);
      }
    }

    res.status(200).json({ message: 'Alert check completed.', generatedAlerts });

  } catch (err) {
    console.error('Error checking for alerts:', err.message);
    res.status(500).json({ message: 'Server error: Could not check for alerts.' });
  }
});

module.exports = router;
