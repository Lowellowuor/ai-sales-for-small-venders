import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Zap, Crown, Users, Calculator } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate

const PricingSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const [isAnnual, setIsAnnual] = useState(false);
  const [roiInputs, setRoiInputs] = useState({
    currentSales: 25000, // Default value for current monthly sales
    customers: 50,       // Default value for monthly customers
  });

  const plans = [
    {
      name: 'Starter',
      price: isAnnual ? 1200 : 150,
      originalPrice: isAnnual ? 1800 : 200,
      currency: 'KES',
      period: isAnnual ? '/year' : '/month',
      description: 'Perfect for individual vendors getting started',
      icon: Zap,
      popular: false,
      features: [
        '100 AI coaching sessions/month',
        'WhatsApp integration',
        'Basic voice analysis',
        'Swahili & English support',
        'Mobile app access',
        'Community forum',
      ],
      cta: 'Start Free Trial',
      link: '/signup' // Navigate to signup page
    },
    {
      name: 'Professional',
      price: isAnnual ? 3600 : 400,
      originalPrice: isAnnual ? 4800 : 500,
      currency: 'KES',
      period: isAnnual ? '/year' : '/month',
      description: 'Advanced features for serious entrepreneurs',
      icon: Crown,
      popular: true,
      features: [
        'Unlimited AI coaching',
        'Advanced voice & emotion analysis',
        'Custom training scenarios',
        '15 language support',
        'Video call practice',
        'Performance analytics',
        'Priority support',
        'M-Pesa payment integration',
      ],
      cta: 'Start Free Trial',
      link: '/signup' // Navigate to signup page
    },
    {
      name: 'Team',
      price: isAnnual ? 8400 : 800,
      originalPrice: isAnnual ? 12000 : 1200,
      currency: 'KES',
      period: isAnnual ? '/year' : '/month',
      description: 'For cooperatives and small business groups',
      icon: Users,
      popular: false,
      features: [
        'Everything in Professional',
        'Up to 10 team members',
        'Group training sessions',
        'Team performance dashboard',
        'Custom coaching modules',
        'Dedicated account manager',
        'API access',
        'White-label options',
      ],
      cta: 'Contact Sales',
      link: '/contact-support' // Navigate to contact support page
    }
  ];

  const calculateROI = () => {
    const currentMonthly = roiInputs.currentSales;
    const projectedIncrease = currentMonthly * 3; // Based on "300% Average Sales Increase"
    const annualIncrease = projectedIncrease * 12;
    // Using Professional plan costs for ROI calculation
    const planCostPerMonth = isAnnual ? 3600 / 12 : 400; // Monthly cost of Professional plan
    const annualPlanCost = planCostPerMonth * 12;

    // Avoid division by zero if planCost is 0
    const roi = annualPlanCost > 0 ? ((annualIncrease - annualPlanCost) / annualPlanCost) * 100 : 0;
    
    return {
      monthlyIncrease: projectedIncrease,
      annualIncrease,
      roi: Math.round(roi),
      paybackMonths: projectedIncrease > 0 ? Math.ceil(annualPlanCost / projectedIncrease) : Infinity, // Handle Infinity
      netProfitYear1: annualIncrease - annualPlanCost
    };
  };

  const roiData = calculateROI();

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"> {/* Adjusted dark:bg-dark-900 to dark:bg-gray-900 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Choose Your 
            <span className="text-blue-600 dark:text-blue-400"> Growth Plan</span> {/* Adjusted primary-500 to blue-600 */}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Start free, scale fast. Every plan includes our 30-day money-back guarantee.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg"> {/* Adjusted dark:bg-dark-700 to dark:bg-gray-800 */}
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                !isAnnual 
                  ? 'bg-blue-600 text-white shadow-md' // Adjusted primary-500 to blue-600
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-md font-medium transition-all relative ${
                isAnnual 
                  ? 'bg-blue-600 text-white shadow-md' // Adjusted primary-500 to blue-600
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full"> {/* Adjusted secondary-500 to green-500 */}
                Save 33%
              </span>
            </button>
          </div>
        </motion.div>

        {/* ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl mb-16" 
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Calculator className="w-8 h-8 text-blue-600 dark:text-blue-400" /> {/* Adjusted primary-500 to blue-600 */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">ROI Calculator</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                See your potential return on investment with PitchPoa AI
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Current Monthly Sales (KES)
                  </label>
                  <input
                    type="number"
                    value={roiInputs.currentSales}
                    onChange={(e) => setRoiInputs({...roiInputs, currentSales: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white" // Adjusted dark:border-gray-600 to dark:border-gray-700, dark:bg-dark-700 to dark:bg-gray-900
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Monthly Customers
                  </label>
                  <input
                    type="number"
                    value={roiInputs.customers}
                    onChange={(e) => setRoiInputs({...roiInputs, customers: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white" // Adjusted dark:border-gray-600 to dark:border-gray-700, dark:bg-dark-700 to dark:bg-gray-900
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 rounded-2xl p-6 text-white"> {/* Adjusted gradient colors for dark mode */}
              <h4 className="text-xl font-bold mb-6">Your Projected Results</h4>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold">KES {roiData.monthlyIncrease.toLocaleString()}</div>
                  <div className="text-sm opacity-90">Monthly Revenue</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold">{roiData.roi}%</div>
                  <div className="text-sm opacity-90">Annual ROI</div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Annual Revenue Increase:</span>
                  <span className="font-semibold">KES {roiData.annualIncrease.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Investment Payback:</span>
                  <span className="font-semibold">{roiData.paybackMonths === Infinity ? 'N/A' : `${roiData.paybackMonths} months`}</span>
                </div>
                <div className="flex justify-between border-t border-white/20 pt-3">
                  <span>Net Profit (Year 1):</span>
                  <span className="font-bold text-lg">KES {roiData.netProfitYear1.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className={`relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 ${ /* Adjusted dark:bg-dark-800 to dark:bg-gray-800 */
                plan.popular ? 'ring-2 ring-blue-600 transform scale-105' : '' // Adjusted primary-500 to blue-600
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold"> {/* Adjusted primary-500 to blue-600 */}
                    Most Popular
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  plan.popular ? 'bg-blue-600' : 'bg-gray-100 dark:bg-gray-900' /* Adjusted primary-500 to blue-600, dark:bg-dark-700 to dark:bg-gray-900 */
                }`}>
                  <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{plan.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{plan.currency} {plan.price.toLocaleString()}</span>
                    <span className="text-gray-500 dark:text-gray-400">{plan.period}</span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                    {plan.currency} {plan.originalPrice.toLocaleString()}{plan.period}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" /> {/* Adjusted primary-500 to blue-600 */}
                    <span className="text-gray-700 dark:text-gray-200 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              {/* Use navigate for buttons that trigger actions or complex flows, Link for simple page navigation */}
              {plan.cta === 'Contact Sales' ? (
                <button
                  onClick={() => navigate(plan.link)}
                  className="block w-full py-4 rounded-lg font-semibold transition-all duration-200 text-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" // Adjusted dark:bg-dark-700, dark:hover:bg-dark-600 to dark:bg-gray-900, dark:hover:bg-gray-700
                >
                  {plan.cta}
                </button>
              ) : (
                <Link
                  to={plan.link}
                  className={`block w-full py-4 rounded-lg font-semibold transition-all duration-200 text-center ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl' // Adjusted primary-500 to blue-600
                      : 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700' // Adjusted dark:bg-dark-700, dark:hover:bg-dark-600 to dark:bg-gray-900, dark:hover:bg-gray-700
                  }`}
                >
                  {plan.cta}
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Flexible Payment Options
          </h3>
          <div className="flex items-center justify-center space-x-8 opacity-60">
            <div className="text-center">
              <div className="text-2xl mb-2">📱</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">M-Pesa</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💳</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Credit Card</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🏦</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Bank Transfer</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Mobile Money</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
