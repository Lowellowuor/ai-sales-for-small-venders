import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Added Truck, Factory, FileText, ShoppingCart for supplier/order automation icons
import { Truck, Factory, PlusCircle, Edit, Trash2, Loader2, LogOut, RefreshCw, XCircle, Mic, BarChart2, Receipt, Users, TrendingUp, Package, Sparkles, FileText, ShoppingCart,Box } from 'lucide-react';

// Ensure this matches your frontend/.env setting
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://ai-sales-backend-lqzb.onrender.com';

interface Supplier {
  _id: string;
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  productsSupplied?: string[];
  paymentTerms?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface ReorderSuggestion {
  itemName: string;
  currentStock: number;
  reorderPoint: number;
  suggestedQuantityToOrder: number;
  reason: string;
}

interface OverstockedItem {
  itemName: string;
  currentStock: number;
  reason: string;
  actionSuggestion: string;
}

interface DraftPurchaseOrder {
  supplierName: string;
  poDetails: string;
  notes: string;
}

interface OrderAutomationResult {
  reorderSuggestions: ReorderSuggestion[];
  overstockedItems: OverstockedItem[];
  draftPurchaseOrders: DraftPurchaseOrder[];
  generalTips: string[];
}

const SupplierDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null);
  const [supplierFormData, setSupplierFormData] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    productsSupplied: '', // Comma-separated string
    paymentTerms: '',
    notes: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // --- STATES FOR AI ORDER AUTOMATION ---
  const [orderAutomationResult, setOrderAutomationResult] = useState<OrderAutomationResult | null>(null);
  const [fetchingOrderAutomation, setFetchingOrderAutomation] = useState(false);
  const [orderAutomationError, setOrderAutomationError] = useState<string | null>(null);
  // --- END STATES FOR AI ORDER AUTOMATION ---

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('You are not logged in. Please log in to view supplier data.');
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/suppliers`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch suppliers.');
      }
      setSuppliers(data);
    } catch (err: any) {
      console.error('Error fetching suppliers:', err);
      setError(err.message || 'Failed to load supplier data. Please try again.');
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
    setSupplierFormData(prev => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentSupplier(null);
    setSupplierFormData({
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      productsSupplied: '',
      paymentTerms: '',
      notes: ''
    });
    setFormError(null);
    setFormSuccess(null);
    setShowSupplierModal(true);
  };

  const openEditModal = (supplier: Supplier) => {
    setIsEditing(true);
    setCurrentSupplier(supplier);
    setSupplierFormData({
      name: supplier.name,
      contactPerson: supplier.contactPerson || '',
      phone: supplier.phone || '',
      email: supplier.email || '',
      address: supplier.address || '',
      productsSupplied: supplier.productsSupplied?.join(', ') || '',
      paymentTerms: supplier.paymentTerms || '',
      notes: supplier.notes || ''
    });
    setFormError(null);
    setFormSuccess(null);
    setShowSupplierModal(true);
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
      const url = isEditing ? `${BACKEND_URL}/api/suppliers/${currentSupplier?._id}` : `${BACKEND_URL}/api/suppliers`;
      
      const payload = {
        name: supplierFormData.name,
        contactPerson: supplierFormData.contactPerson || undefined,
        phone: supplierFormData.phone || undefined,
        email: supplierFormData.email || undefined,
        address: supplierFormData.address || undefined,
        productsSupplied: supplierFormData.productsSupplied ? supplierFormData.productsSupplied.split(',').map(s => s.trim()).filter(s => s) : [],
        paymentTerms: supplierFormData.paymentTerms || undefined,
        notes: supplierFormData.notes || undefined
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
        throw new Error(data.message || (isEditing ? 'Failed to update supplier.' : 'Failed to add supplier.'));
      }

      setFormSuccess(isEditing ? 'Supplier updated successfully!' : 'Supplier added successfully!');
      fetchSuppliers(); // Refresh supplier list
      setTimeout(() => setShowSupplierModal(false), 1500); // Close modal after success
    } catch (err: any) {
      console.error('Error saving supplier:', err);
      setFormError(err.message || 'Failed to save supplier. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteSupplier = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this supplier?')) {
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
      const response = await fetch(`${BACKEND_URL}/api/suppliers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete supplier.');
      }

      setSuppliers(prev => prev.filter(supp => supp._id !== id)); // Remove from UI
      setError(null); // Clear any previous errors
      alert('Supplier deleted successfully!'); // Simple alert for demo
    } catch (err: any) {
      console.error('Error deleting supplier:', err);
      setError(err.message || 'Failed to delete supplier. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- FUNCTION: Fetch AI Order Automation ---
  const fetchOrderAutomation = async () => {
    setFetchingOrderAutomation(true);
    setOrderAutomationError(null);
    setOrderAutomationResult(null); // Clear previous results

    const token = localStorage.getItem('authToken');

    if (!token) {
      setOrderAutomationError('You are not logged in. Please log in to get order automation suggestions.');
      setFetchingOrderAutomation(false);
      navigate('/login');
      return;
    }

    if (suppliers.length === 0) {
      setOrderAutomationError('No supplier data available for order automation. Please add some suppliers and inventory items first.');
      setFetchingOrderAutomation(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/suppliers/order-automation`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch AI order automation suggestions.');
      }
      setOrderAutomationResult(data);
    } catch (err: any) {
      console.error('Error fetching AI order automation:', err);
      setOrderAutomationError(err.message || 'Failed to get AI order automation suggestions. Please try again.');
    } finally {
      setFetchingOrderAutomation(false);
    }
  };
  // --- END FUNCTION: Fetch AI Order Automation ---

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
            <Truck className="mr-3 text-blue-600 dark:text-blue-400" size={32} />
            Supplier Dashboard
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={openAddModal}
              className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 transition-colors flex items-center"
              aria-label="Add New Supplier"
            >
              <PlusCircle className="mr-1" size={20} /> Add Supplier
            </button>
            <button
              onClick={fetchSuppliers}
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
            <p className="text-gray-600 dark:text-gray-400">Loading supplier data...</p>
          </div>
        ) : (
          <>
            {/* AI Order Automation Section */}
            <div className="bg-orange-50 dark:bg-orange-900/20 p-5 rounded-xl shadow-sm border border-orange-100 dark:border-orange-900">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <ShoppingCart className="mr-2 text-orange-600 dark:text-orange-400" size={24} />
                  AI Order Automation
                </h2>
                <button
                  onClick={fetchOrderAutomation}
                  className="px-4 py-2 rounded-full bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 transition-colors flex items-center disabled:opacity-50"
                  disabled={fetchingOrderAutomation || suppliers.length === 0}
                >
                  {fetchingOrderAutomation ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} /> Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2" size={18} /> Get Order Suggestions
                    </>
                  )}
                </button>
              </div>

              {orderAutomationError && (
                <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm mb-4">
                  {orderAutomationError}
                </div>
              )}

              {orderAutomationResult ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-4 space-y-6 text-gray-700 dark:text-gray-300"
                >
                  {orderAutomationResult.reorderSuggestions.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <ShoppingCart className="mr-2 text-orange-600 dark:text-orange-400" size={20} /> Reorder Suggestions:
                      </h3>
                      <div className="space-y-3">
                        {orderAutomationResult.reorderSuggestions.map((sugg, sIndex) => (
                          <div key={sIndex} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <p className="text-sm font-bold text-gray-900 dark:text-white">Item: {sugg.itemName}</p>
                            <p className="text-xs">Current Stock: {sugg.currentStock}, Reorder Point: {sugg.reorderPoint}</p>
                            <p className="text-sm mt-1">Suggested Quantity to Order: <span className="font-semibold text-green-600 dark:text-green-400">{sugg.suggestedQuantityToOrder}</span></p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Reason: {sugg.reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {orderAutomationResult.overstockedItems.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <Box className="mr-2 text-red-600 dark:text-red-400" size={20} /> Overstocked Items:
                      </h3>
                      <div className="space-y-3">
                        {orderAutomationResult.overstockedItems.map((item, oIndex) => (
                          <div key={oIndex} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <p className="text-sm font-bold text-gray-900 dark:text-white">Item: {item.itemName}</p>
                            <p className="text-xs">Current Stock: {item.currentStock}</p>
                            <p className="text-sm mt-1">Reason: {item.reason}</p>
                            <p className="text-sm text-blue-600 dark:text-blue-400">Action: {item.actionSuggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {orderAutomationResult.draftPurchaseOrders.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <FileText className="mr-2 text-blue-600 dark:text-blue-400" size={20} /> Draft Purchase Orders:
                      </h3>
                      <div className="space-y-3">
                        {orderAutomationResult.draftPurchaseOrders.map((po, pIndex) => (
                          <div key={pIndex} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <p className="text-sm font-bold text-gray-900 dark:text-white">Supplier: {po.supplierName}</p>
                            <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded-md mt-2 whitespace-pre-wrap break-words">
                              {po.poDetails}
                            </pre>
                            {po.notes && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Notes: {po.notes}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {orderAutomationResult.generalTips.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">General Tips:</h3>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        {orderAutomationResult.generalTips.map((tip, tIndex) => (
                          <li key={tIndex}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ) : (
                !fetchingOrderAutomation && !orderAutomationError && (
                  <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                    Click "Get Order Suggestions" to receive AI-powered recommendations for reordering and draft purchase orders.
                  </p>
                )
              )}
            </div>

            {/* Existing Supplier List */}
            {suppliers.length > 0 ? (
              <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Suppliers</h2>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tl-lg">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Contact Person
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Contact Info
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Products Supplied
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tr-lg">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {suppliers.map((supplier) => (
                      <tr key={supplier._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {supplier.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {supplier.contactPerson || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {supplier.phone && <div>{supplier.phone}</div>}
                          {supplier.email && <div>{supplier.email}</div>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {supplier.productsSupplied && supplier.productsSupplied.length > 0 ? supplier.productsSupplied.join(', ') : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => openEditModal(supplier)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                            aria-label={`Edit ${supplier.name}`}
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteSupplier(supplier._id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            aria-label={`Delete ${supplier.name}`}
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
              <p className="text-gray-600 dark:text-gray-400 text-center py-10">No suppliers found. Click "Add Supplier" to get started!</p>
            )}
          </>
        )}
      </motion.div>

      {/* Add/Edit Supplier Modal */}
      <AnimatePresence>
        {showSupplierModal && (
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
                onClick={() => setShowSupplierModal(false)}
                className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Close"
              >
                <XCircle size={20} />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                {isEditing ? 'Edit Supplier' : 'Add New Supplier'}
              </h2>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Supplier Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={supplierFormData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                    placeholder="e.g., ABC Wholesalers"
                  />
                </div>
                <div>
                  <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Contact Person (Optional)
                  </label>
                  <input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    value={supplierFormData.contactPerson}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                    placeholder="e.g., John Doe"
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
                    value={supplierFormData.phone}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                    placeholder="e.g., 07XXXXXXXX"
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
                    value={supplierFormData.email}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                    placeholder="supplier@example.com"
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
                    value={supplierFormData.address}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                    placeholder="Supplier's physical address"
                  />
                </div>
                <div>
                  <label htmlFor="productsSupplied" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Products Supplied (Comma-separated, Optional)
                  </label>
                  <input
                    type="text"
                    id="productsSupplied"
                    name="productsSupplied"
                    value={supplierFormData.productsSupplied}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                    placeholder="e.g., Sugar, Rice, Cooking Oil"
                  />
                </div>
                <div>
                  <label htmlFor="paymentTerms" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Payment Terms (Optional)
                  </label>
                  <input
                    type="text"
                    id="paymentTerms"
                    name="paymentTerms"
                    value={supplierFormData.paymentTerms}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                    placeholder="e.g., Net 30, Cash on Delivery"
                  />
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={supplierFormData.notes}
                    onChange={handleFormChange}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600 resize-y"
                    placeholder="Any additional notes about this supplier"
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

                <button
                  type="submit"
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
                      {isEditing ? 'Update Supplier' : 'Add Supplier'}
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

export default SupplierDashboardPage;
