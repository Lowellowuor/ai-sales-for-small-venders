import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Icons for marketing campaigns
// FIX: Replaced 'Whatsapp' with 'MessageSquare' as 'Whatsapp' is not directly exported by lucide-react.
import { Megaphone, Sparkles, Loader2, LogOut,  Mic, BarChart2, Receipt, Users, TrendingUp, Package, Truck, MessageSquare, Mail, Facebook, Calendar, Goal,FileText } from 'lucide-react';

// Ensure this matches your frontend/.env setting
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

interface CampaignContent {
  channel: string; // e.g., "SMS", "WhatsApp", "Facebook Post", "Email"
  subjectOrHeadline: string;
  body: string;
  callToAction: string;
  notes: string;
}

interface MarketingCampaignResult {
  campaignName: string;
  targetAudience: string;
  marketingGoal: string;
  campaignDuration: string;
  campaignContent: CampaignContent[];
  suggestedTimeline: string[];
  generalExecutionTips: string[];
}

const MarketingCampaignsPage: React.FC = () => {
  const navigate = useNavigate();
  const [campaignName, setCampaignName] = useState('');
  const [targetAudienceDescription, setTargetAudienceDescription] = useState('');
  const [marketingGoal, setMarketingGoal] = useState('');
  const [desiredChannels, setDesiredChannels] = useState<string[]>([]);
  const [campaignDuration, setCampaignDuration] = useState('');

  const [marketingCampaign, setMarketingCampaign] = useState<MarketingCampaignResult | null>(null);
  const [fetchingCampaign, setFetchingCampaign] = useState(false);
  const [campaignError, setCampaignError] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleChannelChange = (channel: string) => {
    setDesiredChannels(prev =>
      prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]
    );
  };

  const handleGenerateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setFetchingCampaign(true);
    setCampaignError(null);
    setMarketingCampaign(null); // Clear previous results

    const token = localStorage.getItem('authToken');

    if (!token) {
      setCampaignError('You are not logged in. Please log in to generate marketing campaigns.');
      setFetchingCampaign(false);
      navigate('/login');
      return;
    }

    if (!campaignName || !targetAudienceDescription || !marketingGoal || desiredChannels.length === 0) {
      setCampaignError('Please fill in all required fields: Campaign Name, Target Audience, Marketing Goal, and select at least one Channel.');
      setFetchingCampaign(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/marketing-campaigns`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignName,
          targetAudienceDescription,
          marketingGoal,
          desiredChannels,
          campaignDuration: campaignDuration || 'Not specified'
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate marketing campaign.');
      }
      setMarketingCampaign(data);
    } catch (err: any) {
      console.error('Error generating marketing campaign:', err);
      setCampaignError(err.message || 'Failed to generate marketing campaign. Please try again.');
    } finally {
      setFetchingCampaign(false);
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case 'sms': return <MessageSquare size={16} className="text-blue-500" />;
      case 'whatsapp': return <MessageSquare size={16} className="text-green-500" />; // Using MessageSquare for WhatsApp
      case 'facebook post': return <Facebook size={16} className="text-indigo-500" />;
      case 'email': return <Mail size={16} className="text-red-500" />;
      default: return null;
    }
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
            <Megaphone className="mr-3 text-blue-600 dark:text-blue-400" size={32} />
            Marketing Campaigns
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
        </div>

        {/* Campaign Input Form */}
        <form onSubmit={handleGenerateCampaign} className="space-y-4 bg-gray-50 dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center mb-4">
            <Megaphone className="mr-2 text-blue-600 dark:text-blue-400" size={24} /> Create New Marketing Campaign
          </h2>

          <div>
            <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Campaign Name
            </label>
            <input
              type="text"
              id="campaignName"
              name="campaignName"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
              placeholder="e.g., End-of-Month Sale, New Product Launch"
            />
          </div>

          <div>
            <label htmlFor="targetAudienceDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Target Audience Description
            </label>
            <textarea
              id="targetAudienceDescription"
              name="targetAudienceDescription"
              value={targetAudienceDescription}
              onChange={(e) => setTargetAudienceDescription(e.target.value)}
              rows={3}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600 resize-y"
              placeholder="e.g., Young professionals in Nairobi interested in sustainable fashion, Small business owners looking for accounting software."
            ></textarea>
          </div>

          <div>
            <label htmlFor="marketingGoal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Marketing Goal
            </label>
            <input
              type="text"
              id="marketingGoal"
              name="marketingGoal"
              value={marketingGoal}
              onChange={(e) => setMarketingGoal(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
              placeholder="e.g., Increase sales by 20%, Generate 50 new leads, Improve brand awareness."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Desired Channels
            </label>
            <div className="flex flex-wrap gap-3">
              {['SMS', 'WhatsApp', 'Facebook Post', 'Email'].map(channel => (
                <button
                  key={channel}
                  type="button"
                  onClick={() => handleChannelChange(channel)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                    desiredChannels.includes(channel)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'
                  }`}
                >
                  {getChannelIcon(channel)}
                  <span className="ml-2">{channel}</span>
                </button>
              ))}
            </div>
            {desiredChannels.length === 0 && <p className="text-red-500 text-xs mt-1">Please select at least one channel.</p>}
          </div>

          <div>
            <label htmlFor="campaignDuration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Campaign Duration (Optional)
            </label>
            <input
              type="text"
              id="campaignDuration"
              name="campaignDuration"
              value={campaignDuration}
              onChange={(e) => setCampaignDuration(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
              placeholder="e.g., 2 weeks, 1 month, Until stock lasts"
            />
          </div>

          {campaignError && (
            <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
              {campaignError}
            </div>
          )}

          <button
            type="submit"
            disabled={fetchingCampaign || desiredChannels.length === 0}
            className="w-full flex justify-center items-center py-3 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-2 text-white font-medium rounded-lg transition-all disabled:opacity-50"
          >
            {fetchingCampaign ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Generating Campaign...
              </>
            ) : (
              <>
                <Sparkles className="mr-2" size={18} />
                Generate Campaign
              </>
            )}
          </button>
        </form>

        {/* Generated Campaign Output */}
        {marketingCampaign ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Megaphone className="mr-2 text-green-600 dark:text-green-400" size={28} /> Generated Campaign: {marketingCampaign.campaignName}
            </h2>
            <div className="text-gray-700 dark:text-gray-300 space-y-2">
              <p><span className="font-semibold">Target Audience:</span> {marketingCampaign.targetAudience}</p>
              <p><span className="font-semibold">Marketing Goal:</span> {marketingCampaign.marketingGoal}</p>
              <p><span className="font-semibold">Campaign Duration:</span> {marketingCampaign.campaignDuration}</p>
            </div>

            {marketingCampaign.campaignContent.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <FileText className="mr-2 text-blue-600 dark:text-blue-400" size={22} /> Campaign Content by Channel:
                </h3>
                <div className="space-y-4">
                  {marketingCampaign.campaignContent.map((content, cIndex) => (
                    <div key={cIndex} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center mb-2">
                        {getChannelIcon(content.channel)} <span className="ml-2">{content.channel}</span>
                      </p>
                      {content.subjectOrHeadline && (
                        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Subject/Headline: {content.subjectOrHeadline}</p>
                      )}
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">Body: {content.body}</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Call to Action: {content.callToAction}</p>
                      {content.notes && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Notes: {content.notes}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {marketingCampaign.suggestedTimeline.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Calendar className="mr-2 text-green-600 dark:text-green-400" size={22} /> Suggested Timeline:
                </h3>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700 dark:text-gray-300">
                  {marketingCampaign.suggestedTimeline.map((item, tIndex) => (
                    <li key={tIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {marketingCampaign.generalExecutionTips.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Goal className="mr-2 text-orange-600 dark:text-orange-400" size={22} /> General Execution Tips:
                </h3>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700 dark:text-gray-300">
                  {marketingCampaign.generalExecutionTips.map((tip, gIndex) => (
                    <li key={gIndex}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ) : (
          !fetchingCampaign && !campaignError && (
            <p className="text-gray-600 dark:text-gray-400 text-center py-10">
              Fill in the details above and click "Generate Campaign" to get AI-powered marketing content and a plan.
            </p>
          )
        )}
      </motion.div>
    </div>
  );
};

export default MarketingCampaignsPage;
