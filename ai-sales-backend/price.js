const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const pricingRoutes = require('./routes/pricingRoutes');
app.use('/api/pricing', pricingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// data/pricingData.js
module.exports = {
  pricingPlans: [
    {
      id: 1,
      name: 'Starter',
      monthlyPrice: 150,
      annualPrice: 1200,
      originalMonthlyPrice: 200,
      originalAnnualPrice: 1800,
      currency: 'KES',
      description: 'Perfect for individual vendors getting started',
      features: [
        '100 AI coaching sessions/month',
        'WhatsApp integration',
        'Basic voice analysis',
        'Swahili & English support',
        'Mobile app access',
        'Community forum'
      ],
      isPopular: false,
      trialPeriodDays: 14
    },
    {
      id: 2,
      name: 'Professional',
      monthlyPrice: 400,
      annualPrice: 3600,
      originalMonthlyPrice: 500,
      originalAnnualPrice: 4800,
      currency: 'KES',
      description: 'Advanced features for serious entrepreneurs',
      features: [
        'Unlimited AI coaching',
        'Advanced voice & emotion analysis',
        'Custom training scenarios',
        '15 language support',
        'Video call practice',
        'Performance analytics',
        'Priority support',
        'M-Pesa payment integration'
      ],
      isPopular: true,
      trialPeriodDays: 14
    },
    {
      id: 3,
      name: 'Team',
      monthlyPrice: 800,
      annualPrice: 8400,
      originalMonthlyPrice: 1200,
      originalAnnualPrice: 12000,
      currency: 'KES',
      description: 'For cooperatives and small business groups',
      features: [
        'Everything in Professional',
        'Up to 10 team members',
        'Group training sessions',
        'Team performance dashboard',
        'Custom coaching modules',
        'Dedicated account manager',
        'API access',
        'White-label options'
      ],
      isPopular: false,
      trialPeriodDays: 14
    }
  ],
  // Temporary in-memory storage for subscriptions
  subscriptions: []
};
// controllers/pricingController.js
const { pricingPlans, subscriptions } = require('../data/pricingData');

// Get all pricing plans
exports.getPlans = (req, res) => {
  try {
    res.json(pricingPlans);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch pricing plans' });
  }
};

// Calculate ROI
exports.calculateROI = (req, res) => {
  try {
    const { currentSales, customers, isAnnual } = req.body;
    
    if (!currentSales || !customers) {
      return res.status(400).json({ message: 'Current sales and customers are required' });
    }

    const currentMonthly = parseFloat(currentSales);
    const projectedIncrease = currentMonthly * 3; // 300% average increase
    const annualIncrease = projectedIncrease * 12;
    const planCost = isAnnual ? 3600 : 400 * 12;
    const roi = ((annualIncrease - planCost) / planCost) * 100;
    
    res.json({
      monthlyIncrease: projectedIncrease,
      annualIncrease,
      roi: Math.round(roi),
      paybackMonths: Math.ceil(planCost / projectedIncrease),
      netProfit: annualIncrease - (isAnnual ? 3600 : 4800)
    });
  } catch (err) {
    res.status(500).json({ message: 'ROI calculation failed' });
  }
};

// Mock trial signup (in-memory)
exports.startTrial = (req, res) => {
  try {
    const { planId } = req.body;
    
    const plan = pricingPlans.find(p => p.id === planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    
    // In a real app, you would check for existing subscriptions
    // For now, we'll just create a mock response
    const trialSubscription = {
      id: Date.now(),
      planId,
      status: 'trial',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + plan.trialPeriodDays * 24 * 60 * 60 * 1000).toISOString()
    };
    
    subscriptions.push(trialSubscription);
    
    res.json({
      message: 'Trial started successfully',
      subscription: trialSubscription
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to start trial' });
  }
};

// Mock payment processing
exports.processPayment = (req, res) => {
  try {
    const { planId, isAnnual, paymentMethod, phoneNumber } = req.body;
    
    const plan = pricingPlans.find(p => p.id === planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    
    // Mock payment processing
    const paymentReference = `MOCK-${Date.now()}`;
    
    const subscription = {
      id: Date.now(),
      planId,
      isAnnual,
      status: 'active',
      paymentMethod,
      paymentReference,
      amountPaid: isAnnual ? plan.annualPrice : plan.monthlyPrice,
      startDate: new Date().toISOString(),
      endDate: isAnnual 
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };
    
    subscriptions.push(subscription);
    
    res.json({
      message: 'Payment processed successfully',
      paymentReference,
      subscription
    });
  } catch (err) {
    res.status(500).json({ message: 'Payment processing failed' });
  }
};
// routes/pricingRoutes.js
const express = require('express');
const router = express.Router();
const pricingController = require('../controllers/pricingController');

// Public routes
router.get('/plans', pricingController.getPlans);
router.post('/calculate-roi', pricingController.calculateROI);

// Mock protected routes (in a real app, add auth middleware)
router.post('/start-trial', pricingController.startTrial);
router.post('/subscribe', pricingController.processPayment);

module.exports = router;
[
  {
    "id": 1,
    "name": "Starter",
    "monthlyPrice": 150,
    "annualPrice": 1200,
    // ... all plan details
  }
  // ... other plans
]
{
  "currentSales"; 25000,
  "customers"; 50,
  "isAnnual"; false
}
{
  "monthlyIncrease"; 75000,
  "annualIncrease"; 900000,
  "roi"; 1775,
  "paybackMonths"; 1,
  "netProfit"; 895200
}
{
  "planId"; 1
}
{
  "message"; "Trial started successfully",
  "subscription"; {
    "id"; 123456789,
    "planId"; 1,
    "status"; "trial",
    "startDate"; "2023-06-15T10:00:00.000Z",
    "endDate"; "2023-06-29T10:00:00.000Z"
  }
}
{
  "planId"; 2,
  "isAnnual"; true,
  "paymentMethod"; "mpesa",
  "phoneNumber"; "254712345678"
}
{
  "message"; "Payment processed successfully",
  "paymentReference"; "MOCK-1686825600000",
  "subscription"; {
    "id"; 123456790,
    "planId"; 2,
    "isAnnual"; true,
    "status"; "active",
    "paymentMethod"; "mpesa",
    "paymentReference"; "MOCK-1686825600000",
    "amountPaid"; 3600,
    "startDate"; "2023-06-15T10:00:00.000Z",
    "endDate"; "2024-06-15T10:00:00.000Z"
  }
}
//6. Future Database Integration
//When you're ready to add a database later, you can:

//Choose a database:

//MongoDB (with Mongoose)

//
//PostgreSQL (with Sequelize or Prisma)

//MySQL (with Sequelize)

//Migration steps:

//Install the database and ORM/ODM

//Create models/schemas

//Replace the in-memory operations with database calls

//Add proper error handling for database operations

//Example conversion (for MongoDB):

//Replace pricingPlans array with a Plan model

//Replace subscriptions array with a Subscription model

//Update controller methods to use await Plan.find() instead of the array

//Add proper connection handling

//  This implementation gives you a fully functional backend that you can use immediately while developing your frontend, with clear paths for database integration when you're ready.
