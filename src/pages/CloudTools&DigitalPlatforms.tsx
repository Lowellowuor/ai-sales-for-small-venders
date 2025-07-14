import React, { useState } from 'react';
import { Cloud } from 'lucide-react';

const CloudToolsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resources' | 'consultation' | null>(null);

  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-12">
      {/* Header Section */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <Cloud className="w-10 h-10 text-purple-600 dark:text-purple-400" />
          <h1 className="text-4xl font-bold text-purple-600 dark:text-purple-300">
            Cloud Tools & Digital Platforms
          </h1>
        </div>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Leverage cloud solutions for storage, collaboration, and scaling your business securely.
        </p>
      </header>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Transform Your Business with Cloud Technology
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Cloud platforms enable businesses to operate more efficiently, collaborate remotely, and scale without heavy infrastructure investments. Our guide helps you navigate the options and implement the right solutions.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-purple-600 dark:text-purple-400 mb-2">Key Solutions</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Cloud storage and file sharing</li>
                <li>Business productivity suites</li>
                <li>Cloud-based accounting/ERP</li>
                <li>Remote collaboration tools</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-purple-600 dark:text-purple-400 mb-2">Key Benefits</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Access from anywhere</li>
                <li>Reduced IT costs</li>
                <li>Automatic updates</li>
                <li>Easy scalability</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Cloud Migration Roadmap
          </h2>
          <ol className="space-y-4">
            {[
              "Assess your current systems and needs",
              "Select appropriate cloud platforms",
              "Plan data migration strategy",
              "Implement security measures",
              "Train your team on new tools",
              "Monitor performance and optimize"
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
          Ready for Cloud Transformation?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
          Access our complete Cloud Migration Toolkit with platform comparisons, checklists, and security guides.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setActiveTab('resources')}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Get Cloud Resources
          </button>
          <button
            onClick={() => setActiveTab('consultation')}
            className="border border-purple-600 text-purple-600 dark:text-purple-300 dark:border-purple-300 font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Migration Consultation
          </button>
        </div>
      </div>

      {/* Resources Content */}
      {activeTab === 'resources' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Cloud Implementation Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-purple-600 dark:text-purple-400 mb-3">Essential Guides</h3>
              <ul className="space-y-3">
                <li className="flex items-start p-3 rounded-md hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-purple-500 dark:text-purple-300 mr-3 mt-0.5">☁️</span>
                  <span className="text-gray-700 dark:text-gray-200">Platform Comparison Chart</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-purple-500 dark:text-purple-300 mr-3 mt-0.5">🔒</span>
                  <span className="text-gray-700 dark:text-gray-200">Cloud Security Checklist</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-purple-500 dark:text-purple-300 mr-3 mt-0.5">📦</span>
                  <span className="text-gray-700 dark:text-gray-200">Data Migration Planner</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-purple-600 dark:text-purple-400 mb-3">Premium Resources</h3>
              <ul className="space-y-3">
                <li className="flex items-start p-3 rounded-md hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-purple-500 dark:text-purple-300 mr-3 mt-0.5">💰</span>
                  <span className="text-gray-700 dark:text-gray-200">Cost Optimization Guide</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-purple-500 dark:text-purple-300 mr-3 mt-0.5">🔄</span>
                  <span className="text-gray-700 dark:text-gray-200">Hybrid Cloud Framework</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-purple-500 dark:text-purple-300 mr-3 mt-0.5">👥</span>
                  <span className="text-gray-700 dark:text-gray-200">Team Collaboration Setup</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a 
              href="/cloud-resources-full"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              View All Resources
            </a>
          </div>
        </div>
      )}

      {/* Consultation Content */}
      {activeTab === 'consultation' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Cloud Migration Consultation</h2>
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
                <option value="">Select your business size</option>
                <option value="small">Small (1-10 employees)</option>
                <option value="medium">Medium (11-50 employees)</option>
                <option value="large">Large (50+ employees)</option>
              </select>
            </div>
            <div>
              <label htmlFor="cloud-needs" className="block text-gray-700 dark:text-gray-300 mb-1">Cloud Needs</label>
              <textarea 
                id="cloud-needs" 
                rows={4} 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Describe your current systems and what you hope to achieve with cloud solutions"
              ></textarea>
            </div>
            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
              >
                Request Cloud Consultation
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Success Stories */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Cloud Success Stories
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Retail Example:</strong> A Kampala fashion retailer reduced inventory costs by 25% by moving to cloud-based inventory management.
            </p>
            <p>
              <strong>Service Example:</strong> A Nairobi accounting firm improved client collaboration by 40% using cloud accounting platforms.
            </p>
            <p>
              <strong>Manufacturing Example:</strong> A Lagos food processor cut administrative time by 30 hours/week with cloud ERP implementation.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Cloud Quick Tips</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
          <li>Start with one business process (like file sharing) before full migration</li>
          <li>Choose platforms with good local support and data centers</li>
          <li>Ensure your internet connection can handle cloud workloads</li>
          <li>Train staff on security best practices for cloud tools</li>
          <li>Monitor usage to optimize costs as you scale</li>
        </ul>
      </div>
    </div>
  );
};

export default CloudToolsPage;