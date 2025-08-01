import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Added Package, Box, Lightbulb, TrendingUp for inventory icons, Truck for supplier
import { Package, Box, PlusCircle, Edit, Trash2, Loader2, LogOut, RefreshCw, XCircle, Mic, BarChart2, Receipt, FileText, Users, TrendingUp, Sparkles, Lightbulb, Truck } from 'lucide-react';

// Ensure this matches your frontend/.env setting
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://ai-sales-backend-lqzb.onrender.com';

interface InventoryItem {
  _id: string;
  name: string;
  currentStock: number;
  reorderPoint: number;
  costPrice: number;
  sellingPrice: number;
  category?: string;
  supplier?: string;
  lastRestockDate?: string; // ISO string
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface InventoryInsight {
  type: string; // e.g., "Fast-Moving", "Slow-Moving", "Low Stock", "Overstocked"
  itemNames: string[];
  description: string;
  recommendations: string[];
}

interface InventoryOptimizationResult {
  overallInventoryStatus: string;
  insights: InventoryInsight[];
  generalTips: string[];
}

const InventoryDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showItemModal, setShowItemModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [itemFormData, setItemFormData] = useState({
    name: '',
    currentStock: '',
    reorderPoint: '',
    costPrice: '',
    sellingPrice: '',
    category: '',
    supplier: '',
    lastRestockDate: '',
    notes: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // --- STATES FOR AI INVENTORY OPTIMIZATION ---
  const [optimizationResult, setOptimizationResult] = useState<InventoryOptimizationResult | null>(null);
  const [fetchingOptimization, setFetchingOptimization] = useState(false);
  const [optimizationError, setOptimizationError] = useState<string | null>(null);
  // --- END STATES FOR AI INVENTORY OPTIMIZATION ---

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  const fetchInventoryItems = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('You are not logged in. Please log in to view inventory data.');
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/inventory`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch inventory items.');
      }
      setInventoryItems(data);
    } catch (err: any) {
      console.error('Error fetching inventory items:', err);
      setError(err.message || 'Failed to load inventory data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItemFormData(prev => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentItem(null);
    setItemFormData({
      name: '',
      currentStock: '',
      reorderPoint: '',
      costPrice: '',
      sellingPrice: '',
      category: '',
      supplier: '',
      lastRestockDate: '',
      notes: ''
    });
    setFormError(null);
    setFormSuccess(null);
    setShowItemModal(true);
  };

  const openEditModal = (item: InventoryItem) => {
    setIsEditing(true);
    setCurrentItem(item);
    setItemFormData({
      name: item.name,
      currentStock: item.currentStock.toString(),
      reorderPoint: item.reorderPoint.toString(),
      costPrice: item.costPrice.toString(),
      sellingPrice: item.sellingPrice.toString(),
      category: item.category || '',
      supplier: item.supplier || '',
      lastRestockDate: item.lastRestockDate ? new Date(item.lastRestockDate).toISOString().split('T')[0] : '',
      notes: item.notes || ''
    });
    setFormError(null);
    setFormSuccess(null);
    setShowItemModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    setFormSuccess(null);
    const token = localStorage.getItem('authToken');

    if (!token) {
      setFormError('Not authenticated. Please log in.');
      setFormLoading(false);
      return;
    }

    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `${BACKEND_URL}/api/inventory/${currentItem?._id}` : `${BACKEND_URL}/api/inventory`;
      
      const payload = {
        name: itemFormData.name,
        currentStock: parseFloat(itemFormData.currentStock),
        reorderPoint: parseFloat(itemFormData.reorderPoint),
        costPrice: parseFloat(itemFormData.costPrice),
        sellingPrice: parseFloat(itemFormData.sellingPrice),
        category: itemFormData.category || undefined,
        supplier: itemFormData.supplier || undefined,
        lastRestockDate: itemFormData.lastRestockDate || undefined,
        notes: itemFormData.notes || undefined
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
        throw new Error(data.message || (isEditing ? 'Failed to update item.' : 'Failed to add item.'));
      }

      setFormSuccess(isEditing ? 'Inventory item updated successfully!' : 'Inventory item added successfully!');
      fetchInventoryItems(); // Refresh inventory list
      setTimeout(() => setShowItemModal(false), 1500); // Close modal after success
    } catch (err: any) {
      console.error('Error saving inventory item:', err);
      setFormError(err.message || 'Failed to save inventory item. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this inventory item?')) {
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
      const response = await fetch(`${BACKEND_URL}/api/inventory/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete inventory item.');
      }

      setInventoryItems(prev => prev.filter(item => item._id !== id)); // Remove from UI
      setError(null); // Clear any previous errors
      alert('Inventory item deleted successfully!'); // Simple alert for demo
    } catch (err: any) {
      console.error('Error deleting inventory item:', err);
      setError(err.message || 'Failed to delete inventory item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- FUNCTION: Fetch AI Inventory Optimization ---
  const fetchInventoryOptimization = async () => {
    setFetchingOptimization(true);
    setOptimizationError(null);
    setOptimizationResult(null); // Clear previous results

    const token = localStorage.getItem('authToken');

    if (!token) {
      setOptimizationError('You are not logged in. Please log in to get inventory optimization insights.');
      setFetchingOptimization(false);
      navigate('/login');
      return;
    }

    if (inventoryItems.length === 0) {
      setOptimizationError('No inventory data available for optimization. Please add some items first.');
      setFetchingOptimization(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/inventory/optimization`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch AI inventory optimization.');
      }
      setOptimizationResult(data);
    } catch (err: any) {
      console.error('Error fetching AI inventory optimization:', err);
      setOptimizationError(err.message || 'Failed to get AI inventory optimization. Please try again.');
    } finally {
      setFetchingOptimization(false);
    }
  };
  // --- END FUNCTION: Fetch AI Inventory Optimization ---

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
            <Package className="mr-3 text-blue-600 dark:text-blue-400" size={32} />
            Inventory Dashboard
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={openAddModal}
              className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 transition-colors flex items-center"
              aria-label="Add New Item"
            >
              <PlusCircle className="mr-1" size={20} /> Add Item
            </button>
            <button
              onClick={fetchInventoryItems}
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
        <div className="p-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700 text-center flex justify-center space-x-4 rounded-lg overflow-x-auto">
          <Link 
            to="/pitch-practice" 
            className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-full hover:bg-blue-600 transition-colors whitespace-nowrap"
          >
            <Mic className="w-3 h-3 mr-1" /> Pitch Practice
          </Link>
          <Link 
            to="/sales-dashboard" 
            className="inline-flex items-center px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-full hover:bg-green-600 transition-colors whitespace-nowrap"
          >
            <BarChart2 className="w-3 h-3 mr-1" /> Sales
          </Link>
          <Link 
            to="/expense-dashboard" 
            className="inline-flex items-center px-3 py-1.5 bg-purple-500 text-white text-xs font-medium rounded-full hover:bg-purple-600 transition-colors whitespace-nowrap"
          >
            <Receipt className="w-3 h-3 mr-1" /> Expenses
          </Link>
          <Link 
            to="/sales-script-generator" 
            className="inline-flex items-center px-3 py-1.5 bg-orange-500 text-white text-xs font-medium rounded-full hover:bg-orange-600 transition-colors whitespace-nowrap"
          >
            <FileText className="w-3 h-3 mr-1" /> Script
          </Link>
          <Link 
            to="/customers" 
            className="inline-flex items-center px-3 py-1.5 bg-teal-500 text-white text-xs font-medium rounded-full hover:bg-teal-600 transition-colors whitespace-nowrap"
          >
            <Users className="w-3 h-3 mr-1" /> Customers
          </Link>
          <Link 
            to="/mpesa-analysis" 
            className="inline-flex items-center px-3 py-1.5 bg-yellow-500 text-white text-xs font-medium rounded-full hover:bg-yellow-600 transition-colors whitespace-nowrap"
          >
            <TrendingUp className="w-3 h-3 mr-1" /> M-Pesa
          </Link>
          <Link
            to="/suppliers" 
            className="inline-flex items-center px-3 py-1.5 bg-pink-500 text-white text-xs font-medium rounded-full hover:bg-pink-600 transition-colors whitespace-nowrap"
          >
            <Truck className="w-3 h-3 mr-1" /> Suppliers
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
            <p className="text-gray-600 dark:text-gray-400">Loading inventory data...</p>
          </div>
        ) : (
          <>
            {/* AI Inventory Optimization Section */}
            <div className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-xl shadow-sm border border-purple-100 dark:border-purple-900">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <Box className="mr-2 text-purple-600 dark:text-purple-400" size={24} />
                  AI Inventory Optimization
                </h2>
                <button
                  onClick={fetchInventoryOptimization}
                  className="px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors flex items-center disabled:opacity-50"
                  disabled={fetchingOptimization || inventoryItems.length === 0}
                >
                  {fetchingOptimization ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} /> Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2" size={18} /> Get Optimization Insights
                    </>
                  )}
                </button>
              </div>

              {optimizationError && (
                <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm mb-4">
                  {optimizationError}
                </div>
              )}

              {optimizationResult ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-4 space-y-4 text-gray-700 dark:text-gray-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Overall Inventory Status: <span className="font-normal text-blue-600 dark:text-blue-400">{optimizationResult.overallInventoryStatus}</span>
                  </h3>
                  
                  {optimizationResult.insights.length > 0 ? (
                    <div className="space-y-4">
                      <h4 className="text-md font-semibold text-gray-900 dark:text-white">Key Insights:</h4>
                      {optimizationResult.insights.map((insight, iIndex) => (
                        <div key={iIndex} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                          <p className="text-sm font-bold text-purple-600 dark:text-purple-400 flex items-center mb-1">
                            <Lightbulb className="mr-2" size={16} /> {insight.type}
                          </p>
                          <p className="text-sm mb-2">{insight.description}</p>
                          {insight.itemNames && insight.itemNames.length > 0 && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                              Items: {insight.itemNames.join(', ')}
                            </p>
                          )}
                          {insight.recommendations && insight.recommendations.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Recommendations:</p>
                              <ul className="list-disc list-inside ml-4 text-xs space-y-1">
                                {insight.recommendations.map((rec, rIndex) => (
                                  <li key={rIndex}>{rec}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">No specific insights generated at this time.</p>
                  )}

                  {optimizationResult.generalTips && optimizationResult.generalTips.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-md font-semibold text-gray-900 dark:text-white">General Tips:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        {optimizationResult.generalTips.map((tip, tIndex) => (
                          <li key={tIndex}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ) : (
                !fetchingOptimization && !optimizationError && (
                  <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                    Click "Get Optimization Insights" to receive AI-powered recommendations for your inventory.
                  </p>
                )
              )}
            </div>

            {/* Existing Inventory List */}
            {inventoryItems.length > 0 ? (
              <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Inventory Items</h2>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tl-lg">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Stock
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Reorder Point
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Cost Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Selling Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tr-lg">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {inventoryItems.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            item.currentStock <= item.reorderPoint ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          }`}>
                            {item.currentStock}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {item.reorderPoint}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          Ksh {item.costPrice.toLocaleString('en-KE')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          Ksh {item.sellingPrice.toLocaleString('en-KE')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => openEditModal(item)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                            aria-label={`Edit ${item.name}`}
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item._id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            aria-label={`Delete ${item.name}`}
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-center py-10">No inventory items found. Click "Add Item" to get started!</p>
            )}
          </>
        )}
      </motion.div>

      {/* Add/Edit Inventory Item Modal */}
      <AnimatePresence>
        {showItemModal && (
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
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 relative max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setShowItemModal(false)}
                className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors z-10"
                aria-label="Close"
              >
                <XCircle size={20} />
              </button>
              
              <div className="overflow-y-auto flex-grow">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center sticky top-0 bg-white dark:bg-gray-800 py-2">
                  {isEditing ? 'Edit Inventory Item' : 'Add New Inventory Item'}
                </h2>

                <form onSubmit={handleFormSubmit} className="space-y-4 pb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Item Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={itemFormData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                      placeholder="e.g., Maize Flour (2kg), Liquid Soap (1L)"
                    />
                  </div>
                  <div>
                    <label htmlFor="currentStock" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Current Stock Quantity
                    </label>
                    <input
                      type="number"
                      id="currentStock"
                      name="currentStock"
                      value={itemFormData.currentStock}
                      onChange={handleFormChange}
                      required
                      min="0"
                      step="1"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="reorderPoint" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Reorder Point
                    </label>
                    <input
                      type="number"
                      id="reorderPoint"
                      name="reorderPoint"
                      value={itemFormData.reorderPoint}
                      onChange={handleFormChange}
                      required
                      min="0"
                      step="1"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="costPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Cost Price (Ksh per unit)
                    </label>
                    <input
                      type="number"
                      id="costPrice"
                      name="costPrice"
                      value={itemFormData.costPrice}
                      onChange={handleFormChange}
                      required
                      min="0.01"
                      step="0.01"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Selling Price (Ksh per unit)
                    </label>
                    <input
                      type="number"
                      id="sellingPrice"
                      name="sellingPrice"
                      value={itemFormData.sellingPrice}
                      onChange={handleFormChange}
                      required
                      min="0.01"
                      step="0.01"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
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
                      value={itemFormData.category}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                      placeholder="e.g., Groceries, Cleaning Supplies"
                    />
                  </div>
                  <div>
                    <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Supplier (Optional)
                    </label>
                    <input
                      type="text"
                      id="supplier"
                      name="supplier"
                      value={itemFormData.supplier}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                      placeholder="e.g., Bidco Africa Ltd."
                    />
                  </div>
                  <div>
                    <label htmlFor="lastRestockDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Restock Date (Optional)
                    </label>
                    <input
                      type="date"
                      id="lastRestockDate"
                      name="lastRestockDate"
                      value={itemFormData.lastRestockDate}
                      onChange={handleFormChange}
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
                      value={itemFormData.notes}
                      onChange={handleFormChange}
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600 resize-y"
                      placeholder="Any additional notes about this item"
                    ></textarea>
                  </div>

                  {formError && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                      {formError}
                    </div>
                  )}
                  {formSuccess && (
                    <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-sm">
                      {formSuccess}
                    </div>
                  )}
                </form>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800">
                <button
                  type="submit"
                  onClick={handleFormSubmit}
                  disabled={formLoading}
                  className="w-full flex justify-center items-center py-3 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2 text-white font-medium rounded-lg transition-all disabled:opacity-50"
                >
                  {formLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Saving...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="mr-2" size={18} />
                      {isEditing ? 'Update Item' : 'Add Item'}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InventoryDashboardPage;