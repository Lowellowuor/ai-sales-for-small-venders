import React, { useState } from 'react';

const SavingsStrategiesInfoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resources' | 'consultation' | null>(null);

  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-12">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-center text-pink-500 dark:text-pink-300 mb-4">
          Smart Savings & Investment Guide
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover savings plans for entrepreneurs, emergency funds, and how to reinvest profits for sustainable growth.
        </p>
      </header>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Financial Growth Strategies
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Build financial resilience and grow your wealth with our comprehensive approach to savings and smart investments tailored for business owners.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">Core Components</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Personalized savings plans</li>
                <li>Chama/group savings strategies</li>
                <li>Digital savings tools</li>
                <li>Emergency fund building</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">Key Benefits</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Financial security</li>
                <li>Compound growth</li>
                <li>Business reinvestment</li>
                <li>Risk mitigation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Wealth Building Roadmap
          </h2>
          <ol className="space-y-4">
            {[
              "Assess your current financial position",
              "Establish emergency fund targets",
              "Create automated savings systems",
              "Explore group investment opportunities",
              "Diversify with low-risk investments",
              "Monitor and adjust your strategy"
            ].map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 bg-pink-100 dark:bg-pink-900 text-pink-500 dark:text-pink-300 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-600 dark:text-gray-300">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Resource CTA */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-8 text-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
          Start Growing Your Wealth Today
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
          Access our complete Savings & Investment Toolkit with calculators, templates, and expert guidance.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setActiveTab('resources')}
            className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Get Financial Tools
          </button>
          <button
            onClick={() => setActiveTab('consultation')}
            className="border border-pink-500 text-pink-500 dark:text-pink-300 dark:border-pink-300 font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Financial Consultation
          </button>
        </div>
      </div>

      {/* Resources Content */}
      {activeTab === 'resources' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Financial Growth Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-3">Essential Tools</h3>
              <ul className="space-y-3">
                <li className="flex items-start p-3 rounded-md hover:bg-pink-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-pink-500 dark:text-pink-300 mr-3 mt-0.5">💰</span>
                  <span className="text-gray-700 dark:text-gray-200">Savings Goal Calculator</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-pink-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-pink-500 dark:text-pink-300 mr-3 mt-0.5">👥</span>
                  <span className="text-gray-700 dark:text-gray-200">Chama Management Guide</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-pink-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-pink-500 dark:text-pink-300 mr-3 mt-0.5">📱</span>
                  <span className="text-gray-700 dark:text-gray-200">Digital Savings App Comparison</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-3">Premium Resources</h3>
              <ul className="space-y-3">
                <li className="flex items-start p-3 rounded-md hover:bg-pink-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-pink-500 dark:text-pink-300 mr-3 mt-0.5">📈</span>
                  <span className="text-gray-700 dark:text-gray-200">Investment Portfolio Builder</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-pink-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-pink-500 dark:text-pink-300 mr-3 mt-0.5">🛡️</span>
                  <span className="text-gray-700 dark:text-gray-200">Emergency Fund Planner</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-pink-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-pink-500 dark:text-pink-300 mr-3 mt-0.5">🔄</span>
                  <span className="text-gray-700 dark:text-gray-200">Profit Reinvestment Framework</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a 
              href="/downloads/financial-tools-pack" 
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              Download All Resources
            </a>
          </div>
        </div>
      )}

      {/* Consultation Content */}
      {activeTab === 'consultation' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Financial Growth Consultation</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="income-level" className="block text-gray-700 dark:text-gray-300 mb-1">Monthly Business Income</label>
              <select 
                id="income-level" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="">Select income range</option>
                <option value="under-50k">Under KES 50,000</option>
                <option value="50k-200k">KES 50,000 - 200,000</option>
                <option value="200k-500k">KES 200,000 - 500,000</option>
                <option value="over-500k">Over KES 500,000</option>
              </select>
            </div>
            <div>
              <label htmlFor="financial-goals" className="block text-gray-700 dark:text-gray-300 mb-1">Financial Goals</label>
              <textarea 
                id="financial-goals" 
                rows={4} 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Describe your savings targets and investment objectives"
              ></textarea>
            </div>
            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
              >
                Request Financial Consultation
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SavingsStrategiesInfoPage;