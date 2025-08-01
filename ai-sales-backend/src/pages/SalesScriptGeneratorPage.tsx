import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Send, Loader2, Copy, CheckCircle, XCircle, LogOut, BarChart2, Receipt, Mic } from 'lucide-react';

// Ensure this matches your frontend/.env setting
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

interface ScriptGenerationPayload {
  productName: string;
  targetAudience: string;
  keyBenefits: string;
  tone: string;
  length: string;
}

const SalesScriptGeneratorPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ScriptGenerationPayload>({
    productName: '',
    targetAudience: '',
    keyBenefits: '',
    tone: 'professional and friendly',
    length: 'medium (around 200 words)'
  });
  const [generatedScript, setGeneratedScript] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setGeneratedScript(null);
    setCopySuccess(null);

    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('You are not logged in. Please log in to generate scripts.');
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/sales-scripts/generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate sales script.');
      }

      setGeneratedScript(data.script);
    } catch (err: any) {
      console.error('Error generating script:', err);
      setError(err.message || 'Failed to generate script. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (generatedScript) {
      // Using document.execCommand('copy') for better iframe compatibility
      const textarea = document.createElement('textarea');
      textarea.value = generatedScript;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopySuccess('Copied to clipboard!');
        setTimeout(() => setCopySuccess(null), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
        setCopySuccess('Failed to copy!');
      }
      document.body.removeChild(textarea);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

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
            <Lightbulb className="mr-3 text-blue-600 dark:text-blue-400" size={32} />
            Sales Script Generator
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
            <BarChart2 className="w-3 h-3 mr-1" /> Sales Dashboard
          </Link>
          <Link 
            to="/expense-dashboard" 
            className="inline-flex items-center px-3 py-1.5 bg-purple-500 text-white text-xs font-medium rounded-full hover:bg-purple-600 transition-colors"
          >
            <Receipt className="w-3 h-3 mr-1" /> Expenses
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Product/Service Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
              placeholder="e.g., Organic Honey, Mobile Repair Service"
            />
          </div>
          <div>
            <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Target Audience
            </label>
            <input
              type="text"
              id="targetAudience"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
              placeholder="e.g., Busy urban professionals, Rural farmers, Small business owners"
            />
          </div>
          <div>
            <label htmlFor="keyBenefits" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Key Benefits (comma-separated)
            </label>
            <textarea
              id="keyBenefits"
              name="keyBenefits"
              value={formData.keyBenefits}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600 resize-y"
              placeholder="e.g., Saves time, Increases profit, Eco-friendly, Durable"
            ></textarea>
          </div>
          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Desired Tone
            </label>
            <select
              id="tone"
              name="tone"
              value={formData.tone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="professional and friendly">Professional and Friendly</option>
              <option value="enthusiastic and energetic">Enthusiastic and Energetic</option>
              <option value="empathetic and understanding">Empathetic and Understanding</option>
              <option value="direct and concise">Direct and Concise</option>
              <option value="persuasive and confident">Persuasive and Confident</option>
            </select>
          </div>
          <div>
            <label htmlFor="length" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Desired Length
            </label>
            <select
              id="length"
              name="length"
              value={formData.length}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="short (around 100 words)">Short (around 100 words)</option>
              <option value="medium (around 200 words)">Medium (around 200 words)</option>
              <option value="long (around 300 words)">Long (around 300 words)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2 text-white font-medium rounded-lg transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Generating Script...
              </>
            ) : (
              <>
                <Send className="mr-2" size={18} />
                Generate Script
              </>
            )}
          </button>
        </form>

        {generatedScript && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 p-5 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <Lightbulb className="mr-2 text-blue-600 dark:text-blue-400" size={24} />
              Your Generated Sales Script
            </h2>
            <div className="relative">
              <textarea
                readOnly
                value={generatedScript}
                className="w-full p-4 pr-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white font-mono text-sm leading-relaxed min-h-[200px] max-h-[400px] overflow-y-auto custom-scrollbar"
              />
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Copy script"
              >
                {copySuccess === 'Copied to clipboard!' ? <CheckCircle size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
              {copySuccess && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-1/2 right-14 transform -translate-y-1/2 text-xs text-green-600 dark:text-green-400"
                >
                  {copySuccess}
                </motion.span>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SalesScriptGeneratorPage;
