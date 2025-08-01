import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Receipt, Send, Loader2, LogOut, ClipboardList, BarChart2, Mic, Users, FileText, TrendingUp, Lightbulb } from 'lucide-react';

// Ensure this matches your frontend/.env setting
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://ai-sales-backend-lqzb.onrender.com';

interface MpesaTransaction {
  date: string;
  time: string;
  type: 'Income' | 'Expense';
  description: string;
  amount: number;
  balanceAfter: number | null;
  rawText: string;
}

interface MpesaAnalysisResult {
  summary: {
    totalIncome: number;
    totalExpenses: number;
    netFlow: number;
  };
  transactions: MpesaTransaction[];
  insights: string[];
}

const MpesaAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const [transactionText, setTransactionText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<MpesaAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTransactionText(e.target.value);
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAnalysisResult(null); // Clear previous results

    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('You are not logged in. Please log in to analyze M-Pesa transactions.');
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/mpesa-analysis`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactionText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to analyze M-Pesa transactions.');
      }

      setAnalysisResult(data);
    } catch (err: any) {
      console.error('Error analyzing M-Pesa transactions:', err);
      setError(err.message || 'Failed to analyze M-Pesa transactions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const sampleMpesaText = `Confirmed. ONYANGO OTIENO +254712345678 Confirmed. Ksh1,000.00 received on 2024-07-29 at 10:30 AM. New M-PESA balance is Ksh5,000.00. Transaction cost: Ksh0.00.
Confirmed. Paid KPLC on 2024-07-28 at 09:15 AM. Ksh1,500.00. New M-PESA balance is Ksh3,500.00. Transaction cost: Ksh22.00.
Confirmed. Payment of Ksh 250.00 received from JANE DOE +254723456789 for goods on 2024-07-27 at 14:00 PM. New M-PESA balance is Ksh3,750.00.
Confirmed. Sent Ksh 500.00 to JOHN SMITH +254734567890 for supplies on 2024-07-26 at 11:45 AM. New M-PESA balance is Ksh3,250.00. Transaction cost: Ksh10.00.
Confirmed. You paid Ksh 120.00 to Safaricom for airtime on 2024-07-25 at 08:00 AM. New M-PESA balance is Ksh3,130.00.
`;

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
            <Receipt className="mr-3 text-blue-600 dark:text-blue-400" size={32} />
            M-Pesa Transaction Analysis
          </h1>
          <button
            onClick={handleLogout}
            className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 transition-colors"
            aria-label="Log Out"
          >
            <LogOut size={20} />
          </button>
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
            <ClipboardList className="w-3 h-3 mr-1" /> Expenses
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

        {/* Input Form */}
        <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Paste M-Pesa Transaction Text</h2>
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label htmlFor="transactionText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Enter your M-Pesa transaction SMS/statement lines below:
              </label>
              <textarea
                id="transactionText"
                name="transactionText"
                value={transactionText}
                onChange={handleTextChange}
                rows={10}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600 resize-y"
                placeholder="Paste your M-Pesa transaction messages here, each on a new line. E.g.:
Confirmed. ONYANGO OTIENO +2547XXXXXXXX Confirmed. Ksh1,000.00 received on 2024-07-29 at 10:30 AM. New M-PESA balance is Ksh5,000.00. Transaction cost: Ksh0.00.
Confirmed. Paid KPLC on 2024-07-28 at 09:15 AM. Ksh1,500.00. New M-PESA balance is Ksh3,500.00. Transaction cost: Ksh22.00."
              ></textarea>
            </div>
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setTransactionText(sampleMpesaText)}
                className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Load Sample Text
              </button>
              <button
                type="submit"
                disabled={loading || !transactionText.trim()}
                className="flex justify-center items-center py-3 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2 text-white font-medium rounded-lg transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" size={18} />
                    Analyze Transactions
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Analysis Results Display */}
        <AnimatePresence>
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mt-6 space-y-5"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <TrendingUp className="mr-2 text-green-600 dark:text-green-400" size={24} />
                Analysis Results
              </h2>

              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-900">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Income</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">Ksh {analysisResult.summary.totalIncome.toLocaleString('en-KE')}</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-900">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">Ksh {analysisResult.summary.totalExpenses.toLocaleString('en-KE')}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Net Flow</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">Ksh {analysisResult.summary.netFlow.toLocaleString('en-KE')}</p>
                </div>
              </div>

              {/* Transactions List */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Categorized Transactions:</h3>
                {analysisResult.transactions.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tl-lg">Date</th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                          <th scope="col" className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                          <th scope="col" className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tr-lg">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {analysisResult.transactions.map((tx, index) => (
                          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">{tx.date}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                              <span className={`px-2 py-0.5 rounded-full text-xs ${tx.type === 'Income' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                {tx.type}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{tx.description}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-right text-sm text-gray-700 dark:text-gray-300">Ksh {tx.amount.toLocaleString('en-KE')}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-right text-sm text-gray-700 dark:text-gray-300">
                              {tx.balanceAfter !== null ? `Ksh ${tx.balanceAfter.toLocaleString('en-KE')}` : 'N/A'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">No transactions could be parsed from the provided text.</p>
                )}
              </div>

              {/* Insights */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Lightbulb className="mr-2 text-blue-600 dark:text-blue-400" size={20} />
                  AI Insights:
                </h3>
                {analysisResult.insights.length > 0 ? (
                  <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700 dark:text-gray-300">
                    {analysisResult.insights.map((insight, index) => (
                      <li key={index}>{insight}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">No specific insights generated for these transactions.</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MpesaAnalysisPage;
