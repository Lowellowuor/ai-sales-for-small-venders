import React, { useState } from 'react';
import { Cpu } from 'lucide-react';

const AIForBusinessGrowthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resources' | 'consultation' | null>(null);

  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-12">
      {/* Header Section */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <Cpu className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-300">
            AI for Business Growth
          </h1>
        </div>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover how artificial intelligence can automate tasks, analyze data, and personalize customer experiences.
        </p>
      </header>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Transform Your Business with AI
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            AI technologies are revolutionizing how small businesses operate. Our guide provides practical applications to help you automate processes, gain customer insights, and boost efficiency.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-blue-600 dark:text-blue-400 mb-2">Key Applications</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Customer service chatbots</li>
                <li>Predictive analytics</li>
                <li>Personalized marketing</li>
                <li>Process automation</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-blue-600 dark:text-blue-400 mb-2">Key Benefits</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>24/7 customer support</li>
                <li>Data-driven decisions</li>
                <li>Increased efficiency</li>
                <li>Competitive advantage</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Getting Started with AI
          </h2>
          <ol className="space-y-4">
            {[
              "Identify repetitive tasks that can be automated",
              "Collect and organize your business data",
              "Start with simple AI tools (chatbots, analytics)",
              "Train staff on new AI systems",
              "Monitor performance and optimize",
              "Scale successful implementations"
            ].map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-600 dark:text-gray-300">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Resource CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-8 text-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
          Ready to Implement AI?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
          Access our complete AI Implementation Toolkit with use cases, checklists, and ROI calculators.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setActiveTab('resources')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Get AI Resources
          </button>
          <button
            onClick={() => setActiveTab('consultation')}
            className="border border-blue-600 text-blue-600 dark:text-blue-300 dark:border-blue-300 font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            AI Consultation
          </button>
        </div>
      </div>

      {/* Resources Content */}
      {activeTab === 'resources' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">AI Implementation Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-blue-600 dark:text-blue-400 mb-3">Essential Tools</h3>
              <ul className="space-y-3">
                <li className="flex items-start p-3 rounded-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-blue-500 dark:text-blue-300 mr-3 mt-0.5">🤖</span>
                  <span className="text-gray-700 dark:text-gray-200">AI Use Case Library</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-blue-500 dark:text-blue-300 mr-3 mt-0.5">📋</span>
                  <span className="text-gray-700 dark:text-gray-200">Automation Checklist</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-blue-500 dark:text-blue-300 mr-3 mt-0.5">🧮</span>
                  <span className="text-gray-700 dark:text-gray-200">ROI Calculator</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-blue-600 dark:text-blue-400 mb-3">Premium Resources</h3>
              <ul className="space-y-3">
                <li className="flex items-start p-3 rounded-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-blue-500 dark:text-blue-300 mr-3 mt-0.5">📊</span>
                  <span className="text-gray-700 dark:text-gray-200">AI Vendor Comparison</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-blue-500 dark:text-blue-300 mr-3 mt-0.5">🎓</span>
                  <span className="text-gray-700 dark:text-gray-200">Staff Training Modules</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-blue-500 dark:text-blue-300 mr-3 mt-0.5">🔄</span>
                  <span className="text-gray-700 dark:text-gray-200">Implementation Roadmap</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a 
              href="/ai-resources-full"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              View All Resources
            </a>
          </div>
        </div>
      )}

      {/* Consultation Content */}
      {activeTab === 'consultation' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">AI Implementation Consultation</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="business-type" className="block text-gray-700 dark:text-gray-300 mb-1">Business Type</label>
              <select 
                id="business-type" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="">Select your business type</option>
                <option value="retail">Retail</option>
                <option value="service">Service</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="ecommerce">E-commerce</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="ai-goals" className="block text-gray-700 dark:text-gray-300 mb-1">AI Goals</label>
              <textarea 
                id="ai-goals" 
                rows={4} 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Describe what you hope to achieve with AI"
              ></textarea>
            </div>
            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
              >
                Request AI Consultation
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Additional AI Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            AI Success Stories
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Retail Example:</strong> A Nairobi boutique increased sales by 30% using AI-powered product recommendations and WhatsApp chatbot ordering.
            </p>
            <p>
              <strong>Service Example:</strong> A Lagos cleaning service reduced no-shows by 75% with AI scheduling and automated reminders.
            </p>
            <p>
              <strong>Manufacturing Example:</strong> A Johannesburg factory cut material waste by 20% using AI-powered inventory forecasting.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">AI Quick Tips</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
          <li>Start with one high-impact area rather than trying to automate everything at once</li>
          <li>Look for AI tools with free trials or freemium options to test before committing</li>
          <li>Ensure any AI solution you choose works with your existing systems</li>
          <li>Train your team to understand and work with AI tools</li>
          <li>Monitor results and be prepared to adjust your approach</li>
        </ul>
      </div>
    </div>
  );
};

export default AIForBusinessGrowthPage;