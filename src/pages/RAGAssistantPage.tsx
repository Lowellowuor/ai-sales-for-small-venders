import React, { useState, useEffect } from 'react';
import axios, { AxiosInstance } from 'axios';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useLocation } from 'react-router-dom';

// --- File: src/api.ts ---
// This file configures the Axios instance for all API calls,
// handling authentication and global error responses.

const backendUrl: string = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const api: AxiosInstance = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      console.warn('Unauthorized request. Redirecting to login.');
      // In a real app, you would navigate the user here.
      // e.g., window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// --- File: src/components/LoadingSpinner.tsx ---
// A simple loading spinner component.
const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

// --- File: src/pages/RAGAssistantPage.tsx ---
// The main RAG assistant page component, enhanced with chat history.
type ChatEntry = {
  type: 'user' | 'ai' | 'error';
  text: string;
};

const RAGAssistantPage = () => {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const newChatEntry: ChatEntry = { type: 'user', text: query };
    setChatHistory((prev) => [...prev, newChatEntry]);
    setLoading(true);
    setError(null);
    setQuery(''); // Clear input field immediately

    try {
      const res = await api.post('/api/rag-query', { query });
      const aiResponse: string = res.data.answer;
      setChatHistory((prev) => [...prev, { type: 'ai', text: aiResponse }]);
    } catch (err: any) {
      console.error('Error fetching RAG response:', err);
      const errorMessage: string = err.response?.data?.message || 'Failed to get AI response. Please try again.';
      setError(errorMessage);
      setChatHistory((prev) => [...prev, { type: 'error', text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6 sm:p-8 flex flex-col h-[calc(100vh-80px)]">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">AI Business Assistant (RAG)</h1>

        {/* Chat History Display Area */}
        <div className="flex-grow overflow-y-auto p-4 bg-gray-50 rounded-lg mb-6 shadow-inner custom-scrollbar">
          {chatHistory.length === 0 ? (
            <p className="text-center text-gray-500 italic">Ask me anything about your products, customers, sales, or expenses!</p>
          ) : (
            chatHistory.map((entry, index) => (
              <div key={index} className={`mb-4 p-3 rounded-lg ${entry.type === 'user' ? 'bg-blue-100 text-blue-800 self-end ml-auto' : entry.type === 'ai' ? 'bg-green-100 text-green-800 self-start mr-auto' : 'bg-red-100 text-red-700'} max-w-[80%]`}>
                <p className="font-semibold capitalize mb-1">{entry.type === 'user' ? 'You' : 'Assistant'}:</p>
                <p>{entry.text}</p>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-center mt-4">
              <LoadingSpinner />
            </div>
          )}
        </div>

        {/* Query Input Form */}
        <form onSubmit={handleQuerySubmit} className="flex items-center space-x-4">
          <input
            type="text"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            placeholder="Ask a question about your business data..."
            className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-800"
            disabled={loading}
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out flex items-center justify-center"
            disabled={loading}
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </form>
        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
      </div>

      {/* Custom Scrollbar Styling */}
      <style>
        {`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        `}
      </style>
    </div>
  );
};

// --- File: src/App.tsx ---
// The main application component with a simple routing solution.
const App = () => {
  const [currentPage, setCurrentPage] = useState<string>('home'); // 'home', 'login', 'rag'

  const renderPage = () => {
    switch (currentPage) {
      case 'rag':
        return <RAGAssistantPage />;
      default:
        // You could add a home page or login page here.
        // For now, let's just default to the RAG page.
        return <RAGAssistantPage />;
    }
  };

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-100 min-h-screen">
      <nav className="bg-white shadow-md p-4 flex justify-center items-center">
        <h1 className="text-2xl font-bold text-blue-600">AI Sales Assistant</h1>
      </nav>
      <main className="container mx-auto p-4">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
