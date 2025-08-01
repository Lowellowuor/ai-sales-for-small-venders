import React, { useState } from 'react';

const LossRiskManagementInfoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resources' | 'consultation' | null>(null);

  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-12">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-center text-red-500 dark:text-red-300 mb-4">
          Managing Loss & Risk Guide
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Identify, manage, and recover from business losses with our comprehensive risk management framework.
        </p>
      </header>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Risk Management Essentials
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Protect your business from potential threats with our proven strategies for risk assessment, loss prevention, and recovery planning.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-red-500 dark:text-red-400 mb-2">Key Components</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Comprehensive risk checklists</li>
                <li>Insurance optimization strategies</li>
                <li>Fraud prevention techniques</li>
                <li>Business continuity plans</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-red-500 dark:text-red-400 mb-2">Key Benefits</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Reduced financial vulnerabilities</li>
                <li>Improved crisis response</li>
                <li>Enhanced business resilience</li>
                <li>Peace of mind for stakeholders</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Risk Management Process
          </h2>
          <ol className="space-y-4">
            {[
              "Identify potential risks and vulnerabilities",
              "Assess impact and likelihood of each risk",
              "Develop prevention and mitigation strategies",
              "Implement monitoring and early warning systems",
              "Create response and recovery plans",
              "Regularly review and update risk framework"
            ].map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 bg-red-100 dark:bg-red-900 text-red-500 dark:text-red-300 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-600 dark:text-gray-300">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Resource CTA */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-8 text-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
          Secure Your Business Today
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
          Access our complete Risk Management Toolkit with templates, checklists, and expert guidance.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setActiveTab('resources')}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Get Risk Resources
          </button>
          <button
            onClick={() => setActiveTab('consultation')}
            className="border border-red-500 text-red-500 dark:text-red-300 dark:border-red-300 font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Risk Assessment
          </button>
        </div>
      </div>

      {/* Resources Content */}
      {activeTab === 'resources' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Risk Management Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-red-500 dark:text-red-400 mb-3">Essential Tools</h3>
              <ul className="space-y-3">
                <li className="flex items-start p-3 rounded-md hover:bg-red-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-red-500 dark:text-red-300 mr-3 mt-0.5">⚠️</span>
                  <span className="text-gray-700 dark:text-gray-200">Risk Identification Checklist</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-red-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-red-500 dark:text-red-300 mr-3 mt-0.5">🛡️</span>
                  <span className="text-gray-700 dark:text-gray-200">Fraud Prevention Guide</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-red-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-red-500 dark:text-red-300 mr-3 mt-0.5">📝</span>
                  <span className="text-gray-700 dark:text-gray-200">Insurance Policy Comparison Tool</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-red-500 dark:text-red-400 mb-3">Premium Resources</h3>
              <ul className="space-y-3">
                <li className="flex items-start p-3 rounded-md hover:bg-red-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-red-500 dark:text-red-300 mr-3 mt-0.5">🚨</span>
                  <span className="text-gray-700 dark:text-gray-200">Crisis Response Playbook</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-red-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-red-500 dark:text-red-300 mr-3 mt-0.5">💼</span>
                  <span className="text-gray-700 dark:text-gray-200">Business Continuity Planner</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-red-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-red-500 dark:text-red-300 mr-3 mt-0.5">📊</span>
                  <span className="text-gray-700 dark:text-gray-200">Risk Assessment Dashboard</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a 
              href="/downloads/risk-management-pack" 
              className="inline-block bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              Download All Resources
            </a>
          </div>
        </div>
      )}

      {/* Consultation Content */}
      {activeTab === 'consultation' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Risk Assessment Consultation</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="business-type" className="block text-gray-700 dark:text-gray-300 mb-1">Business Type</label>
              <select 
                id="business-type" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="">Select your business type</option>
                <option value="retail">Retail</option>
                <option value="service">Service</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="tech">Technology</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="risk-concerns" className="block text-gray-700 dark:text-gray-300 mb-1">Primary Risk Concerns</label>
              <textarea 
                id="risk-concerns" 
                rows={4} 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Describe your main risk concerns and past challenges"
              ></textarea>
            </div>
            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
              >
                Request Risk Assessment
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LossRiskManagementInfoPage;