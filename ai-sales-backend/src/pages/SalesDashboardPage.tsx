import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Added LineChart for forecasting icon, Package for inventory, Megaphone for marketing, BarChart for Business Analytics
import { DollarSign, BarChart2, TrendingUp, Loader2, LogOut, RefreshCw, PlusCircle, XCircle, Mic, Users, FileText, Receipt, LineChart, Sparkles, Package, Truck, Megaphone, BarChart } from 'lucide-react';

// Ensure this matches your frontend/.env setting
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://ai-sales-backend-lqzb.onrender.com';

interface SaleSummary {
  totalSalesAmount: number;
  totalProfitAmount: number;
  numberOfSales: number;
}

interface SaleTrend {
  date: string; // ISO string
  totalSales: number;
  totalProfit: number;
  numberOfSales: number;
}

interface SalesForecastResult {
  forecastPeriod: string;
  estimatedTotalSales: number;
  explanation: string;
  tipsForAchievingForecast: string[];
}

const SalesDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [sales, setSales] = useState<any[]>([]); // Raw sales list
  const [summary, setSummary] = useState<SaleSummary | null>(null);
  const [trends, setTrends] = useState<SaleTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<'day' | 'month'>('day'); // State for trend period

  const [showAddSaleModal, setShowAddSaleModal] = useState(false);
  const [newSale, setNewSale] = useState({
    productName: '',
    amount: '',
    profit: '',
    quantity: '',
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    notes: ''
  });
  const [addSaleLoading, setAddSaleLoading] = useState(false);
  const [addSaleError, setAddSaleError] = useState<string | null>(null);
  const [addSaleSuccess, setAddSaleSuccess] = useState<string | null>(null);

  // --- STATES FOR AI SALES FORECASTING ---
  const [forecastPeriod, setForecastPeriod] = useState('next_month'); // Default forecast period
  const [salesForecast, setSalesForecast] = useState<SalesForecastResult | null>(null);
  const [fetchingForecast, setFetchingForecast] = useState(false);
  const [forecastError, setForecastError] = useState<string | null>(null);
  // --- END NEW STATES FOR AI SALES FORECASTING ---

  useEffect(() => {
    fetchSalesData();
  }, [period]); // Refetch when period changes

  const fetchSalesData = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('You are not logged in. Please log in to view sales data.');
      setLoading(false);
      navigate('/login'); // Redirect to login if no token
      return;
    }

    try {
      // Fetch Sales Summary
      const summaryResponse = await fetch(`${BACKEND_URL}/api/sales/summary`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const summaryData = await summaryResponse.json();

      if (!summaryResponse.ok) {
        throw new Error(summaryData.message || 'Failed to fetch sales summary.');
      }
      setSummary(summaryData);

      // Fetch Sales Trends
      const trendsResponse = await fetch(`${BACKEND_URL}/api/sales/trends?period=${period}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const trendsData = await trendsResponse.json();

      if (!trendsResponse.ok) {
        throw new Error(trendsData.message || 'Failed to fetch sales trends.');
      }
      setTrends(trendsData);

      // Fetch all sales (for listing)
      const allSalesResponse = await fetch(`${BACKEND_URL}/api/sales`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const allSalesData = await allSalesResponse.json();

      if (!allSalesResponse.ok) {
        throw new Error(allSalesData.message || 'Failed to fetch all sales.');
      }
      setSales(allSalesData);

    } catch (err: any) {
      console.error('Error fetching sales data:', err);
      setError(err.message || 'Failed to load sales data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

  const handleNewSaleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewSale(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSaleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddSaleLoading(true);
    setAddSaleError(null);
    setAddSaleSuccess(null);
    const token = localStorage.getItem('authToken');

    if (!token) {
      setAddSaleError('Not authenticated. Please log in.');
      setAddSaleLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/sales`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: newSale.productName,
          amount: parseFloat(newSale.amount), // Ensure amount is a number
          profit: parseFloat(newSale.profit), // Ensure profit is a number
          quantity: parseInt(newSale.quantity), // Ensure quantity is an integer
          date: newSale.date,
          notes: newSale.notes
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to record sale.');
      }

      setAddSaleSuccess('Sale recorded successfully!');
      setNewSale({ // Reset form
        productName: '',
        amount: '',
        profit: '',
        quantity: '',
        date: new Date().toISOString().split('T')[0],
        notes: ''
      });
      fetchSalesData(); // Refresh data on dashboard
      setTimeout(() => setShowAddSaleModal(false), 1500); // Close modal after success
    } catch (err: any) {
      console.error('Error adding sale:', err);
      setAddSaleError(err.message || 'Failed to add sale. Please try again.');
    } finally {
      setAddSaleLoading(false);
    }
  };

  // --- FUNCTION: Fetch AI Sales Forecast ---
  const fetchSalesForecast = async () => {
    setFetchingForecast(true);
    setForecastError(null);
    setSalesForecast(null); // Clear previous forecast

    const token = localStorage.getItem('authToken');

    if (!token) {
      setForecastError('You are not logged in. Please log in to get a sales forecast.');
      setFetchingForecast(false);
      navigate('/login');
      return;
    }

    if (!sales || sales.length < 5) { // Require at least 5 sales for meaningful forecast
      setForecastError('Not enough historical sales data to generate a meaningful forecast. Please record at least 5 sales.');
      setFetchingForecast(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/sales-forecast`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ forecastPeriod }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch AI sales forecast.');
      }
      setSalesForecast(data);
    } catch (err: any) {
      console.error('Error fetching AI sales forecast:', err);
      setForecastError(err.message || 'Failed to get AI sales forecast. Please try again.');
    } finally {
      setFetchingForecast(false);
    }
  };
  // --- END NEW FUNCTION: Fetch AI Sales Forecast ---

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
            <BarChart2 className="mr-3 text-blue-600 dark:text-blue-400" size={32} />
            Sales Dashboard
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAddSaleModal(true)}
              className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 transition-colors flex items-center"
              aria-label="Add New Sale"
            >
              <PlusCircle className="mr-1" size={20} /> Add Sale
            </button>
            <button
              onClick={fetchSalesData}
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
          <Link // <<< NEW LINK TO BUSINESS ANALYTICS
            to="/business-analytics" 
            className="inline-flex items-center px-3 py-1.5 bg-gray-600 text-white text-xs font-medium rounded-full hover:bg-gray-700 transition-colors"
          >
            <BarChart className="w-3 h-3 mr-1" /> Analytics
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
            <p className="text-gray-600 dark:text-gray-400">Loading sales data...</p>
          </div>
        ) : (
          <>
            {/* Overall Sales Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl shadow-sm flex items-center space-x-4 border border-blue-100 dark:border-blue-900"
              >
                <DollarSign className="text-blue-600 dark:text-blue-400" size={28} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Sales Amount</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    Ksh {summary?.totalSalesAmount.toLocaleString('en-KE') || '0.00'}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl shadow-sm flex items-center space-x-4 border border-green-100 dark:border-green-900"
              >
                <TrendingUp className="text-green-600 dark:text-green-400" size={28} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Profit</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    Ksh {summary?.totalProfitAmount.toLocaleString('en-KE') || '0.00'}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-xl shadow-sm flex items-center space-x-4 border border-purple-100 dark:border-purple-900"
              >
                <BarChart2 className="text-purple-600 dark:text-purple-400" size={28} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Number of Sales</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {summary?.numberOfSales.toLocaleString('en-KE') || '0'}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* AI Sales Forecasting Section */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-xl shadow-sm border border-yellow-100 dark:border-yellow-900">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <LineChart className="mr-2 text-yellow-600 dark:text-yellow-400" size={24} />
                AI Sales Forecasting
              </h2>
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <label htmlFor="forecastPeriod" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Forecast for:
                </label>
                <select
                  id="forecastPeriod"
                  name="forecastPeriod"
                  value={forecastPeriod}
                  onChange={(e) => setForecastPeriod(e.target.value)}
                  className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                >
                  <option value="next_month">Next Month</option>
                  <option value="next_quarter">Next Quarter</option>
                  <option value="next_6_months">Next 6 Months</option>
                  <option value="next_year">Next Year</option>
                </select>
                <button
                  onClick={fetchSalesForecast}
                  className="px-4 py-2 rounded-full bg-yellow-600 text-white text-sm font-medium hover:bg-yellow-700 transition-colors flex items-center disabled:opacity-50 w-full md:w-auto justify-center"
                  disabled={fetchingForecast || sales.length < 5}
                >
                  {fetchingForecast ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} /> Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2" size={18} /> Get Forecast
                    </>
                  )}
                </button>
              </div>

              {forecastError && (
                <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm mb-4">
                  {forecastError}
                </div>
              )}

              {salesForecast ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-4 space-y-4 text-gray-700 dark:text-gray-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Forecast for {salesForecast.forecastPeriod.replace(/_/g, ' ')}:
                  </h3>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-bold text-yellow-600 dark:text-yellow-400">Estimated Total Sales:</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      Ksh {salesForecast.estimatedTotalSales.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Explanation:</p>
                    <p className="text-sm">{salesForecast.explanation}</p>
                  </div>
                  {salesForecast.tipsForAchievingForecast && salesForecast.tipsForAchievingForecast.length > 0 && (
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Tips for Achieving Forecast:</p>
                      <ul className="list-disc list-inside ml-4 text-sm space-y-1">
                        {salesForecast.tipsForAchievingForecast.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ) : (
                !fetchingForecast && !forecastError && (
                  <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                    Select a period and click "Get Forecast" to receive AI-powered sales predictions.
                  </p>
                )
              )}
            </div>

            {/* Sales Trends */}
            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Sales Trends</h2>
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
                          Total Sales
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Total Profit
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tr-lg">
                          # Sales
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
                            Ksh {trend.totalSales.toLocaleString('en-KE')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            Ksh {trend.totalProfit.toLocaleString('en-KE')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {trend.numberOfSales}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">No sales trend data available. Record some sales!</p>
              )}
            </div>

            {/* Recent Sales List */}
            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Sales</h2>
              {sales.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tl-lg">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Profit
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tr-lg">
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {sales.slice(0, 10).map((sale, index) => ( // Show last 10 sales
                        <tr key={sale._id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {new Date(sale.date).toLocaleDateString('en-KE')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {sale.productName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            Ksh {sale.amount.toLocaleString('en-KE')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            Ksh {sale.profit.toLocaleString('en-KE')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {sale.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">No recent sales to display. Add some sales to see them here!</p>
              )}
            </div>
          </>
        )}
      </motion.div>

      {/* Add Sale Modal */}
      <AnimatePresence>
        {showAddSaleModal && (
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
                onClick={() => setShowAddSaleModal(false)}
                className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Close"
              >
                <XCircle size={20} />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Record New Sale</h2>

              <form onSubmit={handleAddSaleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Product/Service Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={newSale.productName}
                    onChange={handleNewSaleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                    placeholder="e.g., Handcrafted Soap, Web Design Service"
                  />
                </div>
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Sale Amount (Ksh)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={newSale.amount}
                    onChange={handleNewSaleChange}
                    required
                    min="0.01"
                    step="0.01"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                  />
                </div>
                <div>
                  <label htmlFor="profit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Profit (Ksh)
                  </label>
                  <input
                    type="number"
                    id="profit"
                    name="profit"
                    value={newSale.profit}
                    onChange={handleNewSaleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                  />
                </div>
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={newSale.quantity}
                    onChange={handleNewSaleChange}
                    required
                    min="1"
                    step="1"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newSale.date}
                    onChange={handleNewSaleChange}
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
                    value={newSale.notes}
                    onChange={handleNewSaleChange}
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600 resize-y"
                    placeholder="Any additional notes about the sale"
                  ></textarea>
                </div>

                {addSaleError && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                    {addSaleError}
                  </div>
                )}
                {addSaleSuccess && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-sm">
                    {addSaleSuccess}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={addSaleLoading}
                  className="w-full flex justify-center items-center py-3 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2 text-white font-medium rounded-lg transition-all disabled:opacity-50"
                >
                  {addSaleLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Adding Sale...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="mr-2" size={18} />
                      Add Sale
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

export default SalesDashboardPage;
