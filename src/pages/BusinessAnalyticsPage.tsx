import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Icons for business analytics
import { BarChart, Sparkles, Loader2, LogOut, RefreshCw, Mic, Users, FileText, Receipt,BarChart2, TrendingUp, Package, Truck, Megaphone, DollarSign, AlertTriangle, Lightbulb, Zap, CheckCircle, XCircle, ChevronRight } from 'lucide-react';

// Ensure this matches your frontend/.env setting
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

interface KeyPerformanceIndicators {
  totalSales: number;
  totalProfit: number;
  totalExpenses: number;
  averageSaleValue: number;
  numberOfCustomers: number;
  totalInventoryValue: number;
}

interface CrossModuleInsight {
  insight: string;
  modulesInvolved: string[];
}

interface StrategicRecommendation {
  area: string;
  recommendation: string;
  priority: string;
}

interface BusinessAnalysisResult {
  overallBusinessHealth: string;
  keyPerformanceIndicators: KeyPerformanceIndicators;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  crossModuleInsights: CrossModuleInsight[];
  strategicRecommendations: StrategicRecommendation[];
  potentialProblemsIdentified: string[];
  nextSteps: string[];
}

const BusinessAnalyticsPage: React.FC = () => {
  const navigate = useNavigate();
  const [businessAnalysis, setBusinessAnalysis] = useState<BusinessAnalysisResult | null>(null);
  const [fetchingAnalysis, setFetchingAnalysis] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const fetchBusinessAnalysis = async () => {
    setFetchingAnalysis(true);
    setAnalysisError(null);
    setBusinessAnalysis(null); // Clear previous results

    const token = localStorage.getItem('authToken');

    if (!token) {
      setAnalysisError('You are not logged in. Please log in to get business analytics.');
      setFetchingAnalysis(false);
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/business-analytics/overview`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch business analysis.');
      }
      setBusinessAnalysis(data);
    } catch (err: any) {
      console.error('Error fetching business analysis:', err);
      setAnalysisError(err.message || 'Failed to get business analysis. Please ensure you have sufficient data in Sales, Expenses, Customers, and Inventory, then try again.');
    } finally {
      setFetchingAnalysis(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'text-red-600 dark:text-red-400';
      case 'medium': return 'text-orange-600 dark:text-orange-400';
      case 'low': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-6 space-y-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <BarChart className="mr-3 text-blue-600 dark:text-blue-400" size={32} />
            Business Analytics & Advisor
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLogout}
              className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 transition-colors"
              aria-label="Log Out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="p-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700 text-center flex justify-center space-x-4 rounded-lg">
          <Link 
            to="/pitch-practice" 
            className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-full hover:bg-blue-600 transition-colors"
          >
            <Mic className="w-3 h-3 mr-1" /> Pitch Practice
          </Link>
          <Link 
            to="/sales-dashboard" 
            className="inline-flex items-center px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-full hover:bg-green-600 transition-colors"
          >
            <BarChart2 className="w-3 h-3 mr-1" /> Sales
          </Link>
          <Link 
            to="/expense-dashboard" 
            className="inline-flex items-center px-3 py-1.5 bg-purple-500 text-white text-xs font-medium rounded-full hover:bg-purple-600 transition-colors"
          >
            <Receipt className="w-3 h-3 mr-1" /> Expenses
          </Link>
          <Link 
            to="/sales-script-generator" 
            className="inline-flex items-center px-3 py-1.5 bg-orange-500 text-white text-xs font-medium rounded-full hover:bg-orange-600 transition-colors"
          >
            <FileText className="w-3 h-3 mr-1" /> Script
          </Link>
          <Link 
            to="/customers" 
            className="inline-flex items-center px-3 py-1.5 bg-teal-500 text-white text-xs font-medium rounded-full hover:bg-teal-600 transition-colors"
          >
            <Users className="w-3 h-3 mr-1" /> Customers
          </Link>
          <Link 
            to="/mpesa-analysis" 
            className="inline-flex items-center px-3 py-1.5 bg-yellow-500 text-white text-xs font-medium rounded-full hover:bg-yellow-600 transition-colors"
          >
            <TrendingUp className="w-3 h-3 mr-1" /> M-Pesa
          </Link>
          <Link 
            to="/inventory" 
            className="inline-flex items-center px-3 py-1.5 bg-indigo-500 text-white text-xs font-medium rounded-full hover:bg-indigo-600 transition-colors"
          >
            <Package className="w-3 h-3 mr-1" /> Inventory
          </Link>
          <Link 
            to="/suppliers" 
            className="inline-flex items-center px-3 py-1.5 bg-pink-500 text-white text-xs font-medium rounded-full hover:bg-pink-600 transition-colors"
          >
            <Truck className="w-3 h-3 mr-1" /> Suppliers
          </Link>
          <Link 
            to="/marketing-campaigns" 
            className="inline-flex items-center px-3 py-1.5 bg-purple-500 text-white text-xs font-medium rounded-full hover:bg-purple-600 transition-colors"
          >
            <Megaphone className="w-3 h-3 mr-1" /> Marketing
          </Link>
        </div>

        {/* Generate Analysis Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl shadow-sm border border-blue-100 dark:border-blue-900 text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
            <Sparkles className="mr-2 text-blue-600 dark:text-blue-400" size={24} />
            Get Your AI Business Overview & Strategy
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Click the button below to get a comprehensive AI-powered analysis of your business performance,
            including key insights, strengths, weaknesses, opportunities, threats, and strategic recommendations.
          </p>
          <button
            onClick={fetchBusinessAnalysis}
            className="px-6 py-3 rounded-full bg-blue-600 text-white text-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto disabled:opacity-50"
            disabled={fetchingAnalysis}
          >
            {fetchingAnalysis ? (
              <>
                <Loader2 className="animate-spin mr-3" size={24} /> Generating Analysis...
              </>
            ) : (
              <>
                <BarChart className="mr-3" size={24} /> Generate Full Business Report
              </>
            )}
          </button>
        </div>

        {analysisError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm"
          >
            {analysisError}
          </motion.div>
        )}

        {/* Display Business Analysis Result */}
        {businessAnalysis ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 space-y-8 text-gray-700 dark:text-gray-300"
          >
            {/* Overall Health */}
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl shadow-sm border border-green-100 dark:border-green-900">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                <CheckCircle className="mr-2 text-green-600 dark:text-green-400" size={24} /> Overall Business Health:
              </h2>
              <p className="text-lg">{businessAnalysis.overallBusinessHealth}</p>
            </div>

            {/* Key Performance Indicators */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-xl shadow-sm border border-yellow-100 dark:border-yellow-900">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <DollarSign className="mr-2 text-yellow-600 dark:text-yellow-400" size={24} /> Key Performance Indicators:
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(businessAnalysis.keyPerformanceIndicators).map(([key, value]) => (
                  <div key={key} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {typeof value === 'number' ? `Ksh ${value.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* SWOT Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl shadow-sm border border-blue-100 dark:border-blue-900">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <CheckCircle className="mr-2 text-blue-600 dark:text-blue-400" size={22} /> Strengths:
                </h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  {businessAnalysis.strengths.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-5 rounded-xl shadow-sm border border-orange-100 dark:border-orange-900">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <AlertTriangle className="mr-2 text-orange-600 dark:text-orange-400" size={22} /> Weaknesses:
                </h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  {businessAnalysis.weaknesses.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl shadow-sm border border-green-100 dark:border-green-900">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Lightbulb className="mr-2 text-green-600 dark:text-green-400" size={22} /> Opportunities:
                </h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  {businessAnalysis.opportunities.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl shadow-sm border border-red-100 dark:border-red-900">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <XCircle className="mr-2 text-red-600 dark:text-red-400" size={22} /> Threats:
                </h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  {businessAnalysis.threats.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </div>

            {/* Cross-Module Insights */}
            {businessAnalysis.crossModuleInsights.length > 0 && (
              <div className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-xl shadow-sm border border-purple-100 dark:border-purple-900">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Zap className="mr-2 text-purple-600 dark:text-purple-400" size={24} /> Cross-Module Insights:
                </h3>
                <div className="space-y-3">
                  {businessAnalysis.crossModuleInsights.map((insight, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{insight.insight}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Involving: {insight.modulesInvolved.join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strategic Recommendations */}
            {businessAnalysis.strategicRecommendations.length > 0 && (
              <div className="bg-teal-50 dark:bg-teal-900/20 p-5 rounded-xl shadow-sm border border-teal-100 dark:border-teal-900">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <TrendingUp className="mr-2 text-teal-600 dark:text-teal-400" size={24} /> Strategic Recommendations:
                </h3>
                <div className="space-y-3">
                  {businessAnalysis.strategicRecommendations.map((rec, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Area: {rec.area}</p>
                      <p className="text-sm mt-1">{rec.recommendation}</p>
                      <p className={`text-xs font-medium mt-1 ${getPriorityColor(rec.priority)}`}>Priority: {rec.priority}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Potential Problems Identified */}
            {businessAnalysis.potentialProblemsIdentified.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl shadow-sm border border-red-100 dark:border-red-900">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <AlertTriangle className="mr-2 text-red-600 dark:text-red-400" size={24} /> Potential Problems Identified:
                </h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  {businessAnalysis.potentialProblemsIdentified.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            )}

            {/* Next Steps */}
            {businessAnalysis.nextSteps.length > 0 && (
              <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <ChevronRight className="mr-2 text-gray-600 dark:text-gray-400" size={24} /> Next Steps:
                </h3>
                <ul className="list-decimal list-inside ml-4 space-y-1">
                  {businessAnalysis.nextSteps.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            )}

          </motion.div>
        ) : (
          !fetchingAnalysis && !analysisError && (
            <p className="text-gray-600 dark:text-gray-400 text-center py-10">
              Click "Generate Full Business Report" to get a strategic overview of your business.
            </p>
          )
        )}
      </motion.div>
    </div>
  );
};

export default BusinessAnalyticsPage;
