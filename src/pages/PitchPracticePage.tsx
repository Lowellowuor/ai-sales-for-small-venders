import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, Loader2, Volume2, VolumeX, Bot, Lightbulb, DollarSign, Scale, Laptop, Truck, BarChart2, Receipt, Bell, CheckCircle, XCircle, FileText, Users, TrendingUp } from 'lucide-react'; // Added TrendingUp icon
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for logout

// Firebase imports (kept for consistency)
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithCustomToken, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Declare global variables provided by the Canvas environment
declare const __app_id: string | undefined;
declare const __firebase_config: string | undefined;
declare const __initial_auth_token: string | undefined;

// Ensure this matches your frontend/.env setting
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

interface Message {
  type: 'user' | 'ai';
  text: string;
  id: string;
  timestamp: number;
}

interface Notification {
  _id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  timestamp: string;
}

// Robot SVG Icon (inline for simplicity and styling)
const RobotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-500 dark:text-blue-400">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM10 16C9.44772 16 9 15.5523 9 15C9 14.4477 9.44772 14 10 14C10.5523 14 11 14.4477 11 15C11 15.5523 10.5523 16 10 16ZM14 16C13.4477 16 13 15.5523 13 15C13 14.4477 13.4477 14 14 14C14.5523 14 15 14.4477 15 15C15 15.5523 14.5523 16 14 16ZM12 6C10.3431 6 9 7.34315 9 9H15C15 7.34315 13.6569 6 12 6ZM8.5 10C8.5 9.17157 9.17157 8.5 10 8.5H14C14.8284 8.5 15.5 9.17157 15.5 10V10.5C15.5 11.3284 14.8284 12 14 12H10C9.17157 12 8.5 11.3284 8.5 10.5V10Z" fill="currentColor" />
  </svg>
);

type ChallengeArea = 'sales_marketing' | 'finance' | 'regulatory' | 'tech_digital' | 'operations';

const PitchPracticePage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypedText, setCurrentTypedText] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ChallengeArea>('sales_marketing');

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // --- NEW STATES FOR NOTIFICATIONS ---
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [notificationError, setNotificationError] = useState<string | null>(null);
  // --- END NEW STATES ---

  // Initialize speech recognition and synthesis
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        sendToAI(transcript);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        setError('Speech recognition error. Please try again.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setError("Speech recognition not available in your browser.");
    }

    synthRef.current = window.speechSynthesis;

    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (recognitionRef.current) recognitionRef.current.stop();
      if (synthRef.current) synthRef.current.cancel();
    };
  }, []);

  // Initialize Firebase (for Canvas environment)
  useEffect(() => {
    try {
      const firebaseConfig = typeof __firebase_config !== 'undefined'
        ? JSON.parse(__firebase_config)
        : {};
      
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      getFirestore(app); // Keep db for potential future use, even if not directly used in LLM interaction

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
          try {
            if (typeof __initial_auth_token !== 'undefined') {
              await signInWithCustomToken(auth, __initial_auth_token);
            } else {
              await signInAnonymously(auth);
            }
          } catch (anonError) {
            console.error("Firebase anonymous sign-in failed:", anonError);
          }
        }
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Firebase initialization error:", err);
    }
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, currentTypedText]);

  // --- NEW EFFECT FOR NOTIFICATIONS ---
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // Fetch every 1 minute
    return () => clearInterval(interval);
  }, []);
  // --- END NEW EFFECT ---

  const startListening = () => {
    if (!recognitionRef.current) {
      setError("Speech recognition not initialized.");
      return;
    }

    if (isListening) return;

    setError(null);
    setIsListening(true);
    try {
      recognitionRef.current.start();
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      setIsListening(false);
      setError("Failed to start voice input. Please try again.");
    }
  };

  const speakAIResponse = (text: string) => {
    if (!synthRef.current || isMuted) return;

    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
  };

  const typeAIResponse = (fullText: string) => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
    setCurrentTypedText('');
    setIsTyping(true);
    
    let charIndex = 0;
    typingIntervalRef.current = setInterval(() => {
      if (charIndex < fullText.length) {
        setCurrentTypedText(fullText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        setIsTyping(false);
        setMessages(prev => [...prev, { 
          type: 'ai', 
          text: fullText, 
          id: Date.now().toString() + '-ai',
          timestamp: Date.now()
        }]);
        setCurrentTypedText('');
      }
    }, 20); // Typing speed (milliseconds per character)
  };

  const getSystemInstruction = (tab: ChallengeArea) => {
    switch (tab) {
      case 'sales_marketing':
        return "The user is a small vendor in Kenya asking about sales and marketing. Provide concise, actionable advice, focusing on branding, lead generation, or sales skills. Keep responses practical for the Kenyan market.";
      case 'finance':
        return "The user is a small vendor in Kenya asking about financial management. Provide practical, easy-to-understand advice on managing cash flow, accessing loans, or financial planning. Focus on common Kenyan financial practices like M-Pesa.";
      case 'regulatory':
        return "The user is a small vendor in Kenya asking about regulatory and compliance issues. Provide clear, simplified explanations of common regulations, licensing, or tax compliance relevant to small businesses in Kenya. Advise on where to find official information.";
      case 'tech_digital':
        return "The user is a small vendor in Kenya asking about technology adoption and digital skills. Suggest affordable digital tools, explain basic tech concepts, or provide tips for digital marketing relevant to the Kenyan context.";
      case 'operations':
        return "The user is a small vendor in Kenya asking about operational challenges. Provide general advice on logistics, talent acquisition, formalization, or supply chain management. Keep it relevant to the Kenyan informal and formal business environment.";
      default:
        return "The user is a small vendor in Kenya. Provide helpful business advice.";
    }
  };

  const sendToAI = async (userText: string) => {
    if (!userText.trim()) return;

    const userMessage = {
      type: 'user' as const,
      text: userText,
      id: Date.now().toString() + '-user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);
    setError(null);

    try {
      const systemInstruction = getSystemInstruction(activeTab);
      const chatHistory = messages.filter(msg => msg.type !== 'ai' || (msg.type === 'ai' && msg.text !== '')).map(msg => ({ 
        role: msg.type === 'user' ? 'user' : 'model', 
        parts: [{ text: msg.text }] 
      }));
      
      const payload = { 
        contents: [
          { role: "user", parts: [{ text: systemInstruction + "\n\n" + userText }] }
        ]
      };
      
      // If you want the AI to remember previous turns *within the current tab's context*,
      // you'd build chatHistory differently, potentially starting each new tab with a fresh context.
      // For simplicity and immediate context, we're making each query fresh with the instruction.
      // If you want full conversation history per tab, you'd need to manage `messages` per tab.

      const apiKey = ""; // Canvas will inject this
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API error: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        const aiText = result.candidates[0].content.parts[0].text;
        console.log("AI responded:", aiText);
        typeAIResponse(aiText);
        speakAIResponse(aiText);
      } else {
        throw new Error("AI did not provide a valid response.");
      }
    } catch (err: any) {
      console.error("AI error:", err);
      setError(err.message || "Failed to get AI response");
      setMessages(prev => [...prev, { 
        type: 'ai', 
        text: "I'm having trouble responding. Please try again.", 
        id: Date.now().toString() + '-ai-error',
        timestamp: Date.now()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (inputMessage.trim() && !loading && !isTyping) {
      sendToAI(inputMessage);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleMute = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsMuted(prev => !prev);
  };

  // Handle tab change and reset chat/send welcome message for new tab
  useEffect(() => {
    setMessages([]); // Clear messages when tab changes
    setCurrentTypedText('');
    setIsTyping(false);
    setLoading(false);
    setError(null);

    const welcomeMessages: Record<ChallengeArea, string> = {
      sales_marketing: "Welcome to Sales & Marketing! Ask me about branding, lead generation, WhatsApp marketing, or improving your pitch.",
      finance: "Welcome to Finance! I can help with cash flow, loan applications, M-Pesa integration, and financial planning.",
      regulatory: "Welcome to Regulatory & Compliance! Ask me about business permits, taxes, and navigating Kenyan regulations.",
      tech_digital: "Welcome to Tech & Digital! Let's explore digital tools, online presence, and basic tech skills for your business.",
      operations: "Welcome to Operations! Ask me about logistics, supply chain, finding talent, or formalizing your business."
    };

    const initialAIMessage = {
      type: 'ai' as const,
      text: welcomeMessages[activeTab],
      id: `welcome-message-${activeTab}`,
      timestamp: Date.now()
    };

    setTimeout(() => {
      setMessages([initialAIMessage]);
      speakAIResponse(initialAIMessage.text);
    }, 500);

  }, [activeTab]); // Rerun when activeTab changes

  const tabs: { id: ChallengeArea; name: string; icon: React.ElementType }[] = [
    { id: 'sales_marketing', name: 'Sales & Marketing', icon: Lightbulb },
    { id: 'finance', name: 'Finance', icon: DollarSign },
    { id: 'regulatory', name: 'Regulatory', icon: Scale },
    { id: 'tech_digital', name: 'Tech & Digital', icon: Laptop },
    { id: 'operations', name: 'Operations', icon: Truck },
  ];

  // --- NEW NOTIFICATION FUNCTIONS ---
  const fetchNotifications = async () => {
    setNotificationLoading(true);
    setNotificationError(null);
    const token = localStorage.getItem('authToken');

    if (!token) {
      setNotificationError('Not authenticated. Cannot fetch notifications.');
      setNotificationLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/notifications`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch notifications.');
      }
      setNotifications(data);
      setUnreadCount(data.filter((n: Notification) => !n.isRead).length);
    } catch (err: any) {
      console.error('Error fetching notifications:', err);
      setNotificationError(err.message || 'Failed to fetch notifications.');
    } finally {
      setNotificationLoading(false);
    }
  };

  const markNotificationAsRead = async (id: string) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setNotificationError('Not authenticated. Cannot mark notification as read.');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/notifications/${id}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to mark notification as read.');
      }
      fetchNotifications(); // Refresh notifications after marking one as read
    } catch (err: any) {
      console.error('Error marking notification as read:', err);
      setNotificationError(err.message || 'Failed to mark notification as read.');
    }
  };

  const markAllNotificationsAsRead = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setNotificationError('Not authenticated. Cannot mark notifications as read.');
      return;
    }

    try {
      // Find all unread notifications and send individual PATCH requests
      const unreadNotifications = notifications.filter(n => !n.isRead);
      await Promise.all(unreadNotifications.map(n => 
        fetch(`${BACKEND_URL}/api/notifications/${n._id}/read`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }).then(res => {
          if (!res.ok) throw new Error(`Failed to mark ${n._id} as read.`);
          return res.json();
        })
      ));
      fetchNotifications(); // Refresh notifications
    } catch (err: any) {
      console.error('Error marking all notifications as read:', err);
      setNotificationError(err.message || 'Failed to mark all notifications as read.');
    }
  };

  const generateTestAlert = async (type: string, title: string, message: string, link?: string) => {
    setNotificationLoading(true);
    setNotificationError(null);
    const token = localStorage.getItem('authToken');

    if (!token) {
      setNotificationError('Not authenticated. Cannot generate test alert.');
      setNotificationLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/notifications/check-for-alerts`, { // Use check-for-alerts to simulate
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        // For check-for-alerts, body might not be needed or can be empty
        body: JSON.stringify({}), 
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to trigger alert check.');
      }
      // alert('Test alert generation triggered. Check notifications!'); // Using alert for quick demo feedback
      fetchNotifications(); // Refresh notifications
    } catch (err: any) {
      console.error('Error triggering test alert:', err);
      setNotificationError(err.message || 'Failed to trigger test alert. Ensure you have sales/expense data.');
    } finally {
      setNotificationLoading(false);
    }
  };
  // --- END NEW NOTIFICATION FUNCTIONS ---

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-md h-[90vh] flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800 p-4 flex items-center space-x-3">
          <div className="bg-white dark:bg-gray-900 p-2 rounded-full">
            <Bot className="text-blue-600 dark:text-blue-400 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-white font-semibold">PitchPoa AI Assistant</h1>
            <p className="text-xs text-blue-100 dark:text-blue-200">Your personal business coach</p>
          </div>
          
          {/* Notification Bell Icon */}
          <button
            onClick={() => setShowNotificationsModal(true)}
            className="relative p-1.5 rounded-full bg-white/20 hover:bg-white/30 dark:bg-gray-700/50 dark:hover:bg-gray-600/50 transition-colors ml-auto"
            aria-label="Notifications"
          >
            <Bell className="text-white w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={toggleMute}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 dark:bg-gray-700/50 dark:hover:bg-gray-600/50 transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="text-white w-4 h-4" />
            ) : (
              <Volume2 className="text-white w-4 h-4" />
            )}
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-around bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center p-3 text-sm font-medium transition-colors relative
                ${activeTab === tab.id 
                  ? 'text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
            >
              <tab.icon className="w-5 h-5 mb-1" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Navigation Links */}
        <div className="p-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700 text-center flex justify-center space-x-4">
          <Link 
            to="/sales-dashboard" 
            className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-full hover:bg-blue-600 transition-colors"
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
          <Link // <<< NEW LINK TO M-PESA ANALYSIS
            to="/mpesa-analysis" 
            className="inline-flex items-center px-3 py-1.5 bg-yellow-500 text-white text-xs font-medium rounded-full hover:bg-yellow-600 transition-colors"
          >
            <TrendingUp className="w-3 h-3 mr-1" /> M-Pesa
          </Link>
        </div>

        {/* Chat Area */}
        <div 
          ref={chatContainerRef}
          className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900 custom-scrollbar"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`mb-3 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3 flex justify-start"
              >
                <div className="max-w-[80%] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg rounded-bl-none p-3 border border-gray-200 dark:border-gray-600">
                  {currentTypedText}
                  <span className="inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse dark:bg-blue-400"></span>
                </div>
              </motion.div>
            )}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center mb-3"
              >
                <div className="bg-white dark:bg-gray-700 rounded-full p-2 shadow-sm">
                  <Loader2 className="animate-spin text-blue-500 dark:text-blue-400 w-4 h-4" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <button
              onClick={startListening}
              disabled={isListening || loading || isTyping}
              className={`p-2 rounded-full ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              } transition-colors disabled:opacity-50`}
              aria-label="Voice input"
            >
              <Mic className="w-5 h-5" />
            </button>

            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask about ${tabs.find(t => t.id === activeTab)?.name.toLowerCase()}...`}
                className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-900 border-none focus:ring-2 focus:ring-blue-500 focus:outline-none pr-12 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                disabled={loading || isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!inputMessage.trim() || loading || isTyping}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm shadow-lg z-30"
            >
              {error}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Notifications Modal */}
      <AnimatePresence>
        {showNotificationsModal && (
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
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 relative flex flex-col h-[80vh]"
            >
              <button
                onClick={() => setShowNotificationsModal(false)}
                className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Close"
              >
                <XCircle size={20} />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Your Notifications</h2>

              {notificationError && (
                <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm mb-4">
                  {notificationError}
                </div>
              )}

              <div className="flex justify-center space-x-2 mb-4">
                <button
                  onClick={() => generateTestAlert('sales_alert', 'Test Sales Alert', 'This is a test sales alert message!', '/sales-dashboard')}
                  className="px-3 py-1.5 bg-yellow-500 text-white text-xs font-medium rounded-full hover:bg-yellow-600 transition-colors disabled:opacity-50"
                  disabled={notificationLoading}
                >
                  Trigger Sales Alert Check
                </button>
                <button
                  onClick={() => generateTestAlert('expense_alert', 'Test Expense Alert', 'This is a test expense alert message!', '/expense-dashboard')}
                  className="px-3 py-1.5 bg-orange-500 text-white text-xs font-medium rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50"
                  disabled={notificationLoading}
                >
                  Trigger Expense Alert Check
                </button>
              </div>
              <button
                onClick={markAllNotificationsAsRead}
                className="w-full px-4 py-2 mb-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                disabled={unreadCount === 0 || notificationLoading}
              >
                Mark All as Read
              </button>

              {notificationLoading ? (
                <div className="flex flex-col items-center justify-center flex-1">
                  <Loader2 className="animate-spin text-blue-500 dark:text-blue-400 w-8 h-8 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Loading notifications...</p>
                </div>
              ) : notifications.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4 flex-1 flex items-center justify-center">No notifications yet.</p>
              ) : (
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`p-4 rounded-lg shadow-sm border ${
                        notification.isRead
                          ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400'
                          : 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900 text-gray-900 dark:text-white font-semibold'
                      } flex items-start space-x-3`}
                    >
                      <Bell size={20} className={notification.isRead ? "text-gray-400" : "text-blue-500 dark:text-blue-400"} />
                      <div className="flex-1">
                        <h3 className="text-md font-semibold">{notification.title}</h3>
                        <p className="text-sm">{notification.message}</p>
                        {notification.link && (
                          <Link 
                            to={notification.link} 
                            onClick={() => {
                                markNotificationAsRead(notification._id);
                                setShowNotificationsModal(false); // Close modal on link click
                            }}
                            className="text-blue-600 dark:text-blue-400 text-sm hover:underline mt-1 block"
                          >
                            View Details
                          </Link>
                        )}
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <button
                          onClick={() => markNotificationAsRead(notification._id)}
                          className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-300 dark:hover:bg-blue-600 transition-colors"
                          aria-label="Mark as read"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PitchPracticePage;
