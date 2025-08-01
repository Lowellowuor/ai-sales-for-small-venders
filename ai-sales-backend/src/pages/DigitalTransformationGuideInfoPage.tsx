import React, { useState } from 'react';

const DigitalTransformationGuideInfoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'toolkit' | 'consultation' | null>(null);

  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-12">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-center text-purple-600 dark:text-purple-300 mb-4">
          Digital Transformation Guide
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Modernize your business with essential digital tools and strategies to stay competitive.
        </p>
      </header>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Why Digital Transformation Matters
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            In today's fast-paced economy, adopting digital tools is no longer optional. Our comprehensive guide covers everything from e-commerce setup to advanced digital marketing techniques.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-purple-600 dark:text-purple-400 mb-2">Core Components</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>E-commerce platforms</li>
                <li>Mobile payment solutions</li>
                <li>CRM systems</li>
                <li>Social media integration</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-purple-600 dark:text-purple-400 mb-2">Key Benefits</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Increased customer reach</li>
                <li>Improved operational efficiency</li>
                <li>Enhanced customer insights</li>
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
            Getting Started
          </h2>
          <ol className="space-y-4">
            {[
              "Assess your current digital capabilities",
              "Identify key areas for improvement",
              "Select appropriate digital tools",
              "Train your team on new systems",
              "Monitor and optimize performance"
            ].map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-600 dark:text-gray-300">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Resource CTA */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-8 text-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
          Ready to Transform Your Business?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
          Access our complete Digital Transformation Toolkit with templates, checklists, and vendor comparisons.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setActiveTab('toolkit')}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Get the Toolkit
          </button>
          <button
            onClick={() => setActiveTab('consultation')}
            className="border border-purple-600 text-purple-600 dark:text-purple-300 dark:border-purple-300 font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Schedule Consultation
          </button>
        </div>
      </div>

      {/* Digital Toolkit Content */}
      {activeTab === 'toolkit' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Digital Transformation Toolkit</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-purple-600 dark:text-purple-400 mb-3">Essential Templates</h3>
              <ul className="space-y-3">
                <li className="flex items-start p-3 rounded-md hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-purple-500 dark:text-purple-300 mr-3 mt-0.5">🛒</span>
                  <span className="text-gray-700 dark:text-gray-200">E-commerce Setup Checklist</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-purple-500 dark:text-purple-300 mr-3 mt-0.5">📱</span>
                  <span className="text-gray-700 dark:text-gray-200">Mobile Payment Implementation Guide</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-purple-500 dark:text-purple-300 mr-3 mt-0.5">📊</span>
                  <span className="text-gray-700 dark:text-gray-200">Digital Maturity Assessment</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-purple-600 dark:text-purple-400 mb-3">Premium Resources</h3>
              <ul className="space-y-3">
                <li className="flex items-start p-3 rounded-md hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-purple-500 dark:text-purple-300 mr-3 mt-0.5">📈</span>
                  <span className="text-gray-700 dark:text-gray-200">Digital ROI Calculator</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-purple-500 dark:text-purple-300 mr-3 mt-0.5">🤖</span>
                  <span className="text-gray-700 dark:text-gray-200">AI Integration Playbook</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-purple-500 dark:text-purple-300 mr-3 mt-0.5">🔄</span>
                  <span className="text-gray-700 dark:text-gray-200">Omnichannel Strategy Framework</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a 
              href="/downloads/digital-toolkit" 
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              Download Complete Toolkit
            </a>
          </div>
        </div>
      )}

      {/* Consultation Content */}
      {activeTab === 'consultation' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Digital Transformation Consultation</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="business-size" className="block text-gray-700 dark:text-gray-300 mb-1">Business Size</label>
              <select 
                id="business-size" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="">Select an option</option>
                <option value="small">Small Business (1-50 employees)</option>
                <option value="medium">Medium Business (51-250 employees)</option>
                <option value="large">Large Enterprise (250+ employees)</option>
              </select>
            </div>
            <div>
              <label htmlFor="digital-needs" className="block text-gray-700 dark:text-gray-300 mb-1">Digital Needs</label>
              <textarea 
                id="digital-needs" 
                rows={4} 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Tell us about your digital challenges and goals"
              ></textarea>
            </div>
            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
              >
                Request Consultation
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DigitalTransformationGuideInfoPage;