import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Added User, PlusCircle, Edit, Trash2, Loader2, LogOut, RefreshCw, XCircle, MessageSquare, Mail, Phone, Calendar, TrendingUp, AlertTriangle, Star, Lightbulb for CRM icons
import { Users, PlusCircle, Edit, Trash2, Loader2, LogOut, RefreshCw, XCircle, Mic, BarChart2, Receipt,Sparkles, FileText, TrendingUp, Package, Truck, Megaphone, MessageSquare, Mail, Phone, Calendar, AlertTriangle, Star, Lightbulb } from 'lucide-react';

// Ensure this matches your frontend/.env setting
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://ai-sales-backend-lqzb.onrender.com';

interface Customer {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  category?: string; // e.g., "Loyal", "New", "At-Risk"
  lastPurchaseDate?: string; // ISO string
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface CustomerInteraction {
  _id: string;
  customerId: string;
  type: 'Call' | 'SMS' | 'WhatsApp' | 'Email' | 'Meeting' | 'Other';
  date: string; // ISO string
  summary: string;
  notes?: string;
  followUpRequired: boolean;
  followUpDate?: string; // ISO string
  createdAt: string;
  updatedAt: string;
}

interface FollowUpSuggestion {
  customerId: string;
  customerName: string;
  reason: string;
  suggestedTiming: string;
  draftMessage: {
    channel: string;
    content: string;
  };
}

interface AtRiskCustomer {
  customerId: string;
  customerName: string;
  reason: string;
  actionSuggestion: string;
}

interface HighPotentialCustomer {
  customerId: string;
  customerName: string;
  reason: string;
  actionSuggestion: string;
}

interface FollowUpResult {
  message?: string; // For cases with no data
  followUpSuggestions: FollowUpSuggestion[];
  atRiskCustomers: AtRiskCustomer[];
  highPotentialCustomers: HighPotentialCustomer[];
  generalRetentionTips: string[];
}

const CustomerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- State for Add/Edit Customer Modal ---
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [customerFormData, setCustomerFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    category: '',
    lastPurchaseDate: '',
    notes: ''
  });
  const [customerFormLoading, setCustomerFormLoading] = useState(false);
  const [customerFormError, setCustomerFormError] = useState<string | null>(null);
  const [customerFormSuccess, setCustomerFormSuccess] = useState<string | null>(null);
  // --- End State for Add/Edit Customer Modal ---

  // --- State for Customer Interactions (CRM) ---
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [isEditingInteraction, setIsEditingInteraction] = useState(false);
  const [currentInteraction, setCurrentInteraction] = useState<CustomerInteraction | null>(null);
  const [selectedCustomerForInteraction, setSelectedCustomerForInteraction] = useState<Customer | null>(null);
  const [customerInteractions, setCustomerInteractions] = useState<CustomerInteraction[]>([]); // Interactions for selected customer
  const [interactionFormData, setInteractionFormData] = useState({
    type: 'Call' as 'Call' | 'SMS' | 'WhatsApp' | 'Email' | 'Meeting' | 'Other',
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    summary: '',
    notes: '',
    followUpRequired: false,
    followUpDate: '' // YYYY-MM-DD
  });
  const [interactionFormLoading, setInteractionFormLoading] = useState(false);
  const [interactionFormError, setInteractionFormError] = useState<string | null>(null);
  const [interactionFormSuccess, setInteractionFormSuccess] = useState<string | null>(null);
  // --- End State for Customer Interactions (CRM) ---

  // --- State for AI Follow-up Suggestions ---
  const [followUpResult, setFollowUpResult] = useState<FollowUpResult | null>(null);
  const [fetchingFollowUp, setFetchingFollowUp] = useState(false);
  const [followUpError, setFollowUpError] = useState<string | null>(null);
  // --- End State for AI Follow-up Suggestions ---

  useEffect(() => {
    fetchCustomers();
  }, []);

  // --- Logout Function ---
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };
  // --- End Logout Function ---

  // --- Customer Management Functions ---
  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('You are not logged in. Please log in to view customer data.');
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/customers`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch customers.');
      }
      setCustomers(data);
    } catch (err: any) {
      console.error('Error fetching customers:', err);
      setError(err.message || 'Failed to load customer data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerFormData(prev => ({ ...prev, [name]: value }));
  };

  const openAddCustomerModal = () => {
    setIsEditingCustomer(false);
    setCurrentCustomer(null);
    setCustomerFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      category: '',
      lastPurchaseDate: '',
      notes: ''
    });
    setCustomerFormError(null);
    setCustomerFormSuccess(null);
    setShowCustomerModal(true);
  };

  const openEditCustomerModal = (customer: Customer) => {
    setIsEditingCustomer(true);
    setCurrentCustomer(customer);
    setCustomerFormData({
      name: customer.name,
      email: customer.email || '',
      phone: customer.phone || '',
      address: customer.address || '',
      category: customer.category || '',
      lastPurchaseDate: customer.lastPurchaseDate ? new Date(customer.lastPurchaseDate).toISOString().split('T')[0] : '',
      notes: customer.notes || ''
    });
    setCustomerFormError(null);
    setCustomerFormSuccess(null);
    setShowCustomerModal(true);
  };

  const handleCustomerFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCustomerFormLoading(true);
    setCustomerFormError(null);
    setCustomerFormSuccess(null);
    const token = localStorage.getItem('authToken');

    if (!token) {
      setCustomerFormError('Not authenticated. Please log in.');
      setCustomerFormLoading(false);
      return;
    }

    try {
      const method = isEditingCustomer ? 'PUT' : 'POST';
      const url = isEditingCustomer ? `${BACKEND_URL}/api/customers/${currentCustomer?._id}` : `${BACKEND_URL}/api/customers`;
      
      const payload = {
        name: customerFormData.name,
        email: customerFormData.email || undefined,
        phone: customerFormData.phone || undefined,
        address: customerFormData.address || undefined,
        category: customerFormData.category || undefined,
        lastPurchaseDate: customerFormData.lastPurchaseDate || undefined,
        notes: customerFormData.notes || undefined
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || (isEditingCustomer ? 'Failed to update customer.' : 'Failed to add customer.'));
      }

      setCustomerFormSuccess(isEditingCustomer ? 'Customer updated successfully!' : 'Customer added successfully!');
      fetchCustomers(); // Refresh customer list
      setTimeout(() => setShowCustomerModal(false), 1500); // Close modal after success
    } catch (err: any) {
      console.error('Error saving customer:', err);
      setCustomerFormError(err.message || 'Failed to save customer. Please try again.');
    } finally {
      setCustomerFormLoading(false);
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this customer and all associated data (interactions, sales)? This action cannot be undone.')) {
      return;
    }

    setLoading(true); // Show loading while deleting
    setError(null);
    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('Not authenticated. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/customers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete customer.');
      }

      setCustomers(prev => prev.filter(cust => cust._id !== id)); // Remove from UI
      setError(null); // Clear any previous errors
      alert('Customer and associated data deleted successfully!'); // Simple alert for demo
    } catch (err: any) {
      console.error('Error deleting customer:', err);
      setError(err.message || 'Failed to delete customer. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  // --- End Customer Management Functions ---

  // --- Customer Interaction (CRM) Functions ---
  const fetchCustomerInteractions = async (customerId: string) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Not authenticated for fetching interactions.');
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/customer-crm/interactions/${customerId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch customer interactions.');
      }
      setCustomerInteractions(data);
    } catch (err: any) {
      console.error('Error fetching interactions:', err);
      // Handle error display if needed, but don't block main UI
    }
  };

  const openAddInteractionModal = (customer: Customer) => {
    setIsEditingInteraction(false);
    setCurrentInteraction(null);
    setSelectedCustomerForInteraction(customer);
    setInteractionFormData({
      type: 'Call',
      date: new Date().toISOString().split('T')[0],
      summary: '',
      notes: '',
      followUpRequired: false,
      followUpDate: ''
    });
    setInteractionFormError(null);
    setInteractionFormSuccess(null);
    setShowInteractionModal(true);
  };

  const openEditInteractionModal = (interaction: CustomerInteraction, customer: Customer) => {
    setIsEditingInteraction(true);
    setCurrentInteraction(interaction);
    setSelectedCustomerForInteraction(customer);
    setInteractionFormData({
      type: interaction.type,
      date: new Date(interaction.date).toISOString().split('T')[0],
      summary: interaction.summary,
      notes: interaction.notes || '',
      followUpRequired: interaction.followUpRequired,
      followUpDate: interaction.followUpRequired ? new Date(interaction.followUpDate!).toISOString().split('T')[0] : ''
    });
    setInteractionFormError(null);
    setInteractionFormSuccess(null);
    setShowInteractionModal(true);
  };

  const handleInteractionFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setInteractionFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleInteractionFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInteractionFormLoading(true);
    setInteractionFormError(null);
    setInteractionFormSuccess(null);
    const token = localStorage.getItem('authToken');

    if (!token || !selectedCustomerForInteraction?._id) {
      setInteractionFormError('Not authenticated or customer not selected.');
      setInteractionFormLoading(false);
      return;
    }

    try {
      const method = isEditingInteraction ? 'PUT' : 'POST';
      const url = isEditingInteraction ? `${BACKEND_URL}/api/customer-crm/interactions/${currentInteraction?._id}` : `${BACKEND_URL}/api/customer-crm/interactions`;
      
      const payload = {
        customerId: selectedCustomerForInteraction._id,
        type: interactionFormData.type,
        date: interactionFormData.date,
        summary: interactionFormData.summary,
        notes: interactionFormData.notes || undefined,
        followUpRequired: interactionFormData.followUpRequired,
        followUpDate: interactionFormData.followUpRequired ? (interactionFormData.followUpDate || undefined) : undefined
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || (isEditingInteraction ? 'Failed to update interaction.' : 'Failed to log interaction.'));
      }

      setInteractionFormSuccess(isEditingInteraction ? 'Interaction updated successfully!' : 'Interaction logged successfully!');
      fetchCustomerInteractions(selectedCustomerForInteraction._id); // Refresh interactions for this customer
      setTimeout(() => setShowInteractionModal(false), 1500);
    } catch (err: any) {
      console.error('Error saving interaction:', err);
      setInteractionFormError(err.message || 'Failed to save interaction. Please try again.');
    } finally {
      setInteractionFormLoading(false);
    }
  };

  const handleDeleteInteraction = async (interactionId: string, customerId: string) => {
    if (!window.confirm('Are you sure you want to delete this interaction?')) {
      return;
    }

    setInteractionFormLoading(true); // Use interaction form loading for this
    setInteractionFormError(null);
    const token = localStorage.getItem('authToken');

    if (!token) {
      setInteractionFormError('Not authenticated.');
      setInteractionFormLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/customer-crm/interactions/${interactionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete interaction.');
      }

      setInteractionFormSuccess('Interaction deleted successfully!');
      fetchCustomerInteractions(customerId); // Refresh interactions
      setTimeout(() => setInteractionFormSuccess(null), 1500); // Clear success message
    } catch (err: any) {
      console.error('Error deleting interaction:', err);
      setInteractionFormError(err.message || 'Failed to delete interaction. Please try again.');
    } finally {
      setInteractionFormLoading(false);
    }
  };
  // --- End Customer Interaction (CRM) Functions ---

  // --- AI Follow-up Suggestions Functions ---
  const fetchFollowUpSuggestions = async () => {
    setFetchingFollowUp(true);
    setFollowUpError(null);
    setFollowUpResult(null); // Clear previous results

    const token = localStorage.getItem('authToken');

    if (!token) {
      setFollowUpError('You are not logged in. Please log in to get follow-up suggestions.');
      setFetchingFollowUp(false);
      navigate('/login');
      return;
    }

    if (customers.length === 0) {
      setFollowUpError('No customer data available for follow-up suggestions. Please add some customers first.');
      setFetchingFollowUp(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/customer-crm/follow-up-suggestions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch AI follow-up suggestions.');
      }
      setFollowUpResult(data);
    } catch (err: any) {
      console.error('Error fetching AI follow-up suggestions:', err);
      setFollowUpError(err.message || 'Failed to get AI follow-up suggestions. Please try again.');
    } finally {
      setFetchingFollowUp(false);
    }
  };

  const copyToClipboard = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      alert('Message copied to clipboard!'); // Use a custom modal in a real app
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy message. Please copy manually.');
    }
    document.body.removeChild(textarea);
  };
  // --- End AI Follow-up Suggestions Functions ---

  const handleViewInteractions = (customer: Customer) => {
    setSelectedCustomerForInteraction(customer);
    fetchCustomerInteractions(customer._id);
    // You might want to show a dedicated modal or section for interactions here
    // For now, we'll just fetch and assume they will be displayed in a separate component/modal if needed.
    // Instead of an alert, we'll make the interactions visible in the UI below the customer list.
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
            <Users className="mr-3 text-blue-600 dark:text-blue-400" size={32} />
            Customer Dashboard
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={openAddCustomerModal}
              className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 transition-colors flex items-center"
              aria-label="Add New Customer"
            >
              <PlusCircle className="mr-1" size={20} /> Add Customer
            </button>
            <button
              onClick={fetchCustomers}
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
            <p className="text-gray-600 dark:text-gray-400">Loading customer data...</p>
          </div>
        ) : (
          <>
            {/* AI Follow-up Suggestions Section */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl shadow-sm border border-blue-100 dark:border-blue-900">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <MessageSquare className="mr-2 text-blue-600 dark:text-blue-400" size={24} />
                  AI Follow-up Suggestions
                </h2>
                <button
                  onClick={fetchFollowUpSuggestions}
                  className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50"
                  disabled={customers.length === 0}
                >
                  {fetchingFollowUp ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} /> Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2" size={18} /> Get Suggestions
                    </>
                  )}
                </button>
              </div>

              {followUpError && (
                <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm mb-4">
                  {followUpError}
                </div>
              )}

              {followUpResult ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-4 space-y-6 text-gray-700 dark:text-gray-300"
                >
                  {followUpResult.followUpSuggestions.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <Calendar className="mr-2 text-blue-600 dark:text-blue-400" size={20} /> Suggested Follow-ups:
                      </h3>
                      <div className="space-y-3">
                        {followUpResult.followUpSuggestions.map((sugg, sIndex) => (
                          <div key={sIndex} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <p className="text-sm font-bold text-gray-900 dark:text-white">Customer: {sugg.customerName}</p>
                            <p className="text-xs">Reason: {sugg.reason}</p>
                            <p className="text-sm mt-1">Suggested Timing: <span className="font-semibold text-green-600 dark:text-green-400">{sugg.suggestedTiming}</span></p>
                            <p className="text-sm mt-1">Channel: {sugg.draftMessage.channel}</p>
                            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md mt-2 text-xs relative">
                              <p className="whitespace-pre-wrap break-words">{sugg.draftMessage.content}</p>
                              <button
                                onClick={() => copyToClipboard(sugg.draftMessage.content)}
                                className="absolute top-2 right-2 p-1 bg-gray-200 dark:bg-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 text-xs"
                                title="Copy message"
                              >
                                Copy
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {followUpResult.atRiskCustomers.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <AlertTriangle className="mr-2 text-red-600 dark:text-red-400" size={20} /> At-Risk Customers:
                      </h3>
                      <div className="space-y-3">
                        {followUpResult.atRiskCustomers.map((customer, arIndex) => (
                          <div key={arIndex} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <p className="text-sm font-bold text-gray-900 dark:text-white">Customer: {customer.customerName}</p>
                            <p className="text-xs">Reason: {customer.reason}</p>
                            <p className="text-sm mt-1">Action: {customer.actionSuggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {followUpResult.highPotentialCustomers.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <Star className="mr-2 text-yellow-600 dark:text-yellow-400" size={20} /> High-Potential Customers:
                      </h3>
                      <div className="space-y-3">
                        {followUpResult.highPotentialCustomers.map((customer, hpIndex) => (
                          <div key={hpIndex} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <p className="text-sm font-bold text-gray-900 dark:text-white">Customer: {customer.customerName}</p>
                            <p className="text-xs">Reason: {customer.reason}</p>
                            <p className="text-sm mt-1">Action: {customer.actionSuggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {followUpResult.generalRetentionTips.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <Lightbulb className="mr-2 text-green-600 dark:text-green-400" size={20} /> General Retention Tips:
                      </h3>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        {followUpResult.generalRetentionTips.map((tip, tIndex) => (
                          <li key={tIndex}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ) : (
                !fetchingFollowUp && !followUpError && (
                  <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                    Click "Get Suggestions" to receive AI-powered recommendations for customer follow-ups and retention strategies.
                  </p>
                )
              )}
            </div>

            {/* Existing Customer List */}
            {customers.length > 0 ? (
              <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Customers</h2>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tl-lg">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Contact
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Last Purchase
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tr-lg">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {customers.map((customer) => (
                      <tr key={customer._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {customer.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {customer.phone && <div><Phone size={14} className="inline-block mr-1" />{customer.phone}</div>}
                          {customer.email && <div><Mail size={14} className="inline-block mr-1" />{customer.email}</div>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {customer.category || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {customer.lastPurchaseDate ? new Date(customer.lastPurchaseDate).toLocaleDateString('en-KE') : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => openAddInteractionModal(customer)}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-3"
                            aria-label={`Log interaction for ${customer.name}`}
                            title="Log Interaction"
                          >
                            <MessageSquare size={18} />
                          </button>
                          <button
                            onClick={() => handleViewInteractions(customer)}
                            className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 mr-3"
                            aria-label={`View interactions for ${customer.name}`}
                            title="View Interactions"
                          >
                            <FileText size={18} />
                          </button>
                          <button
                            onClick={() => openEditCustomerModal(customer)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                            aria-label={`Edit ${customer.name}`}
                            title="Edit Customer"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteCustomer(customer._id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            aria-label={`Delete ${customer.name}`}
                            title="Delete Customer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Display interactions for selected customer (for demo purposes, could be a separate modal) */}
                {selectedCustomerForInteraction && customerInteractions.length > 0 && (
                  <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Interactions for {selectedCustomerForInteraction.name}
                    </h3>
                    <div className="space-y-3">
                      {customerInteractions.map(interaction => (
                        <div key={interaction._id} className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm border border-gray-200 dark:border-gray-600">
                          <div className="flex justify-between items-center text-sm font-medium text-gray-900 dark:text-white">
                            <span>{interaction.type} on {new Date(interaction.date).toLocaleDateString()}</span>
                            <div>
                              <button
                                onClick={() => openEditInteractionModal(interaction, selectedCustomerForInteraction)}
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-2"
                                title="Edit Interaction"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteInteraction(interaction._id, selectedCustomerForInteraction._id)}
                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                title="Delete Interaction"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Summary: {interaction.summary}</p>
                          {interaction.notes && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Notes: {interaction.notes}</p>}
                          {interaction.followUpRequired && (
                            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                              Follow-up required by: {interaction.followUpDate ? new Date(interaction.followUpDate).toLocaleDateString() : 'N/A'}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-center py-10">No customers found. Click "Add Customer" to get started!</p>
            )}
          </>
        )}
      </motion.div>

      {/* Add/Edit Customer Modal */}
      <AnimatePresence>
        {showCustomerModal && (
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
                onClick={() => setShowCustomerModal(false)}
                className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Close"
              >
                <XCircle size={20} />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                {isEditingCustomer ? 'Edit Customer' : 'Add New Customer'}
              </h2>

              <form onSubmit={handleCustomerFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={customerFormData.name}
                    onChange={handleCustomerFormChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                    placeholder="e.g., Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={customerFormData.email}
                    onChange={handleCustomerFormChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                    placeholder="customer@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={customerFormData.phone}
                    onChange={handleCustomerFormChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                    placeholder="e.g., 07XXXXXXXX"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Address (Optional)
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={customerFormData.address}
                    onChange={handleCustomerFormChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                    placeholder="Customer's physical address"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category (Optional)
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={customerFormData.category}
                    onChange={handleCustomerFormChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                    placeholder="e.g., Loyal, New, At-Risk, VIP"
                  />
                </div>
                <div>
                  <label htmlFor="lastPurchaseDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Purchase Date (Optional)
                  </label>
                  <input
                    type="date"
                    id="lastPurchaseDate"
                    name="lastPurchaseDate"
                    value={customerFormData.lastPurchaseDate}
                    onChange={handleCustomerFormChange}
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
                    value={customerFormData.notes}
                    onChange={handleCustomerFormChange}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600 resize-y"
                    placeholder="Any additional notes about this customer"
                  ></textarea>
                </div>

                {customerFormError && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                    {customerFormError}
                  </div>
                )}
                {customerFormSuccess && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-sm">
                    {customerFormSuccess}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={customerFormLoading}
                  className="w-full flex justify-center items-center py-3 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2 text-white font-medium rounded-lg transition-all disabled:opacity-50"
                >
                  {customerFormLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Saving...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="mr-2" size={18} />
                      {isEditingCustomer ? 'Update Customer' : 'Add Customer'}
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Interaction Modal */}
      <AnimatePresence>
        {showInteractionModal && selectedCustomerForInteraction && (
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
                onClick={() => setShowInteractionModal(false)}
                className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Close"
              >
                <XCircle size={20} />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                {isEditingInteraction ? 'Edit Interaction' : `Log Interaction for ${selectedCustomerForInteraction.name}`}
              </h2>

              <form onSubmit={handleInteractionFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Interaction Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={interactionFormData.type}
                    onChange={handleInteractionFormChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  >
                    <option value="Call">Call</option>
                    <option value="SMS">SMS</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Email">Email</option>
                    <option value="Meeting">Meeting</option>
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
                    value={interactionFormData.date}
                    onChange={handleInteractionFormChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="summary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Summary
                  </label>
                  <input
                    type="text"
                    id="summary"
                    name="summary"
                    value={interactionFormData.summary}
                    onChange={handleInteractionFormChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                    placeholder="e.g., Discussed new product, Followed up on delivery"
                  />
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Detailed Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={interactionFormData.notes}
                    onChange={handleInteractionFormChange}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600 resize-y"
                    placeholder="Detailed notes about the interaction"
                  ></textarea>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="followUpRequired"
                    name="followUpRequired"
                    checked={interactionFormData.followUpRequired}
                    onChange={handleInteractionFormChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="followUpRequired" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    Follow-up Required?
                  </label>
                </div>
                {interactionFormData.followUpRequired && (
                  <div>
                    <label htmlFor="followUpDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Follow-up Date
                    </label>
                    <input
                      type="date"
                      id="followUpDate"
                      name="followUpDate"
                      value={interactionFormData.followUpDate}
                      onChange={handleInteractionFormChange}
                      required={interactionFormData.followUpRequired}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                  </div>
                )}

                {interactionFormError && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                    {interactionFormError}
                  </div>
                )}
                {interactionFormSuccess && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-sm">
                    {interactionFormSuccess}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={interactionFormLoading}
                  className="w-full flex justify-center items-center py-3 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2 text-white font-medium rounded-lg transition-all disabled:opacity-50"
                >
                  {interactionFormLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Saving...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="mr-2" size={18} />
                      {isEditingInteraction ? 'Update Interaction' : 'Log Interaction'}
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

export default CustomerDashboardPage;
