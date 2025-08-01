import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign,  ClipboardList, Loader2, LogOut, RefreshCw, PlusCircle, XCircle, Lightbulb, BarChart2, Mic, Users, FileText } from 'lucide-react';

// Ensure this matches your frontend/.env setting
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://ai-sales-backend-lqzb.onrender.com';

interface ExpenseSummary {
  _id: string; // Category name
  totalAmount: number;
  numberOfExpenses: number;
}

interface ExpenseTrend {
  date: string; // ISO string
  totalExpenses: number;
  numberOfExpenses: number;
}

interface FinancialInsights {
  overallFinancialHealth: string;
  revenueInsights: string;
  costManagementInsights: string;
  actionableRecommendations: string[];
  budgetingTip: string;
  culturalContextNotes: string;
}

const ExpenseDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<any[]>([]); // Raw expenses list
  const [summary, setSummary] = useState<ExpenseSummary[]>([]);
  const [trends, setTrends] = useState<ExpenseTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<'day' | 'month'>('day'); // State for trend period
  
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: '',
    description: '',
    paymentMethod: 'Cash',
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    notes: ''
  });
  const [addExpenseLoading, setAddExpenseLoading] = useState(false);
  const [addExpenseError, setAddExpenseError] = useState<string | null>(null);
  const [addExpenseSuccess, setAddExpenseSuccess] = useState<string | null>(null);

  // --- NEW STATES FOR AI INSIGHTS ---
  const [aiInsights, setAiInsights] = useState<FinancialInsights | null>(null);
  const [fetchingInsights, setFetchingInsights] = useState(false);
  const [aiInsightsError, setAiInsightsError] = useState<string | null>(null);
  // --- END NEW STATES ---

  useEffect(() => {
    fetchExpenseData();
  }, [period]); // Refetch when period changes

  const fetchExpenseData = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('You are not logged in. Please log in to view expense data.');
      setLoading(false);
      navigate('/login'); // Redirect to login if no token
      return;
    }

    try {
      // Fetch Expense Summary
      const summaryResponse = await fetch(`${BACKEND_URL}/api/expenses/summary`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const summaryData = await summaryResponse.json();

      if (!summaryResponse.ok) {
        throw new Error(summaryData.message || 'Failed to fetch expense summary.');
      }
      setSummary(summaryData);

      // Fetch Expense Trends
      const trendsResponse = await fetch(`${BACKEND_URL}/api/expenses/trends?period=${period}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const trendsData = await trendsResponse.json();

      if (!trendsResponse.ok) {
        throw new Error(trendsData.message || 'Failed to fetch expense trends.');
      }
      setTrends(trendsData);

      // Fetch all expenses (for listing)
      const allExpensesResponse = await fetch(`${BACKEND_URL}/api/expenses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const allExpensesData = await allExpensesResponse.json();

      if (!allExpensesResponse.ok) {
        throw new Error(allExpensesData.message || 'Failed to fetch all expenses.');
      }
      setExpenses(allExpensesData);


    } catch (err: any) {
      console.error('Error fetching expense data:', err);
      setError(err.message || 'Failed to load expense data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- NEW FUNCTION: Fetch AI Financial Insights ---
  const fetchFinancialInsights = async () => {
    setFetchingInsights(true);
    setAiInsightsError(null);
    setAiInsights(null); // Clear previous insights
    const token = localStorage.getItem('authToken');

    if (!token) {
      setAiInsightsError('You are not logged in. Please log in to get insights.');
      setFetchingInsights(false);
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/financial-insights`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch AI insights.');
      }
      setAiInsights(data);
    } catch (err: any) {
      console.error('Error fetching AI insights:', err);
      setAiInsightsError(err.message || 'Failed to get AI financial insights. Please try again.');
    } finally {
      setFetchingInsights(false);
    }
  };
  // --- END NEW FUNCTION ---


  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const formatDate = (isoString: string, period: 'day' | 'month') => {
    const date = new Date(isoString);
    if (period === 'month') {
      return date.toLocaleString('en-US', { year: 'numeric', month: 'short' });
    }
    return date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleNewExpenseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddExpenseLoading(true);
    setAddExpenseError(null);
    setAddExpenseSuccess(null);
    const token = localStorage.getItem('authToken');

    if (!token) {
      setAddExpenseError('Not authenticated. Please log in.');
      setAddExpenseLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/expenses`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(newExpense.amount), // Ensure amount is a number
          category: newExpense.category,
          description: newExpense.description,
          paymentMethod: newExpense.paymentMethod,
          date: newExpense.date,
          notes: newExpense.notes
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to record expense.');
      }

      setAddExpenseSuccess('Expense recorded successfully!');
      setNewExpense({ // Reset form
        amount: '',
        category: '',
        description: '',
        paymentMethod: 'Cash',
        date: new Date().toISOString().split('T')[0],
        notes: ''
      });
      fetchExpenseData(); // Refresh data on dashboard
      setTimeout(() => setShowAddExpenseModal(false), 1500); // Close modal after success
    } catch (err: any) {
      console.error('Error adding expense:', err);
      setAddExpenseError(err.message || 'Failed to add expense. Please try again.');
    } finally {
      setAddExpenseLoading(false);
    }
  };

  // Calculate total expenses from summary for overall display
  const totalOverallExpenses = summary.reduce((sum, cat) => sum + cat.totalAmount, 0);
  const totalNumberOfExpenses = summary.reduce((sum, cat) => sum + cat.numberOfExpenses, 0);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-6 space-y-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <ClipboardList className="mr-3 text-blue-600 dark:text-blue-400" size={32} />
            Expense Dashboard
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAddExpenseModal(true)}
              className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 transition-colors flex items-center"
              aria-label="Add New Expense"
            >
              <PlusCircle className="mr-1" size={20} /> Add Expense
            </button>
            <button
              onClick={fetchExpenseData}
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 transition-colors"
              aria-label="Refresh Data"
              disabled={loading}
            >
              <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
            </button>
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
            <BarChart2 className="w-3 h-3 mr-1" /> Sales Dashboard
          </Link>
          <Link 
            to="/sales-script-generator" 
            className="inline-flex items-center px-3 py-1.5 bg-orange-500 text-white text-xs font-medium rounded-full hover:bg-orange-600 transition-colors"
          >
            <FileText className="w-3 h-3 mr-1" /> Script
          </Link>
          <Link // <<< NEW LINK TO CUSTOMER DASHBOARD
            to="/customers" 
            className="inline-flex items-center px-3 py-1.5 bg-teal-500 text-white text-xs font-medium rounded-full hover:bg-teal-600 transition-colors"
          >
            <Users className="w-3 h-3 mr-1" /> Customers
          </Link>
        </div>


        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm"
          >
            {error}
          </motion.div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="animate-spin text-blue-500 dark:text-blue-400 w-10 h-10 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading expense data...</p>
          </div>
        ) : (
          <>
            {/* Overall Expense Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl shadow-sm flex items-center space-x-4 border border-red-100 dark:border-red-900"
              >
                <DollarSign className="text-red-600 dark:text-red-400" size={28} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    Ksh {totalOverallExpenses.toLocaleString('en-KE')}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-orange-50 dark:bg-orange-900/20 p-5 rounded-xl shadow-sm flex items-center space-x-4 border border-orange-100 dark:border-orange-900"
              >
                <ClipboardList className="text-orange-600 dark:text-orange-400" size={28} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Number of Expenses</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {totalNumberOfExpenses.toLocaleString('en-KE')}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* AI Financial Insights Section */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl shadow-sm border border-blue-100 dark:border-blue-900">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <Lightbulb className="mr-2 text-blue-600 dark:text-blue-400" size={24} />
                  AI Financial Insights
                </h2>
                <button
                  onClick={fetchFinancialInsights}
                  className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50"
                  disabled={fetchingInsights}
                >
                  {fetchingInsights ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} /> Generating...
                    </>
                  ) : (
                    <>
                      <Lightbulb className="mr-2" size={18} /> Get Insights
                    </>
                  )}
                </button>
              </div>

              {aiInsightsError && (
                <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm mb-4">
                  {aiInsightsError}
                </div>
              )}

              {aiInsights ? (
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p><strong>Overall Financial Health:</strong> {aiInsights.overallFinancialHealth}</p>
                  <p><strong>Revenue Insights:</strong> {aiInsights.revenueInsights}</p>
                  <p><strong>Cost Management Insights:</strong> {aiInsights.costManagementInsights}</p>
                  <div>
                    <strong>Actionable Recommendations:</strong>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      {aiInsights.actionableRecommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                  <p><strong>Budgeting Tip:</strong> {aiInsights.budgetingTip}</p>
                  <p><strong>Cultural Context Notes:</strong> {aiInsights.culturalContextNotes}</p>
                </div>
              ) : (
                !fetchingInsights && !aiInsightsError && (
                  <p className="text-gray-600 dark:text-gray-400 text-center py-4">Click "Get Insights" to receive AI-powered financial analysis.</p>
                )
              )}
            </div>


            {/* Expense Summary by Category */}
            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Expenses by Category</h2>
              {summary.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tl-lg">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Total Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tr-lg">
                          # Expenses
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {summary.map((cat, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {cat._id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            Ksh {cat.totalAmount.toLocaleString('en-KE')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {cat.numberOfExpenses}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">No expense data by category. Record some expenses!</p>
              )}
            </div>

            {/* Expense Trends */}
            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Expense Trends</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPeriod('day')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      period === 'day'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                    }`}
                  >
                    Daily
                  </button>
                  <button
                    onClick={() => setPeriod('month')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      period === 'month'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {trends.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tl-lg">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Total Expenses
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tr-lg">
                          # Expenses
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {trends.map((trend, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {formatDate(trend.date, period)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            Ksh {trend.totalExpenses.toLocaleString('en-KE')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {trend.numberOfExpenses}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">No expense trend data available. Record some expenses!</p>
              )}
            </div>

            {/* Recent Expenses List */}
            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Expenses</h2>
              {expenses.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tl-lg">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tr-lg">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {expenses.slice(0, 10).map((exp, index) => ( // Show last 10 expenses
                        <tr key={exp._id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {new Date(exp.date).toLocaleDateString('en-KE')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {exp.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {exp.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            Ksh {exp.amount.toLocaleString('en-KE')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">No recent expenses to display.</p>
              )}
            </div>
          </>
        )}
      </motion.div>

      {/* Add Expense Modal */}
      <AnimatePresence>
        {showAddExpenseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 relative"
            >
              <button
                onClick={() => setShowAddExpenseModal(false)}
                className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Close"
              >
                <XCircle size={20} />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Record New Expense</h2>

              <form onSubmit={handleAddExpenseSubmit} className="space-y-4">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amount (Ksh)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={newExpense.amount}
                    onChange={handleNewExpenseChange}
                    required
                    min="0.01"
                    step="0.01"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={newExpense.category}
                    onChange={handleNewExpenseChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                    placeholder="e.g., Supplies, Rent, Transport"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newExpense.description}
                    onChange={handleNewExpenseChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600 resize-y"
                    placeholder="Brief description of the expense"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={newExpense.paymentMethod}
                    onChange={handleNewExpenseChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  >
                    <option value="Cash">Cash</option>
                    <option value="M-Pesa">M-Pesa</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Card">Card</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newExpense.date}
                    onChange={handleNewExpenseChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={newExpense.notes}
                    onChange={handleNewExpenseChange}
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600 resize-y"
                    placeholder="Any additional notes"
                  ></textarea>
                </div>

                {addExpenseError && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                    {addExpenseError}
                  </div>
                )}
                {addExpenseSuccess && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-sm">
                    {addExpenseSuccess}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={addExpenseLoading}
                  className="w-full flex justify-center items-center py-3 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2 text-white font-medium rounded-lg transition-all disabled:opacity-50"
                >
                  {addExpenseLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Adding Expense...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="mr-2" size={18} />
                      Add Expense
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpenseDashboardPage;
