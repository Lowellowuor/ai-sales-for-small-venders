import React, { useState } from 'react';

const ScalingBusinessPlaybookInfoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'playbook' | 'consultation' | null>(null);

  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-12">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-300 mb-4">
          Scaling Your Business Playbook
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Step-by-step playbooks for scaling operations, hiring, expanding to new markets, and automating processes.
        </p>
      </header>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Scaling Essentials
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Successful scaling requires careful planning and execution. Our playbook provides comprehensive guidance to grow your business sustainably while maintaining quality and culture.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-blue-600 dark:text-blue-400 mb-2">Core Components</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Scaling checklists</li>
                <li>Strategic hiring guides</li>
                <li>Process automation tools</li>
                <li>Market expansion frameworks</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-blue-600 dark:text-blue-400 mb-2">Key Benefits</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Structured growth approach</li>
                <li>Reduced operational friction</li>
                <li>Data-driven decision making</li>
                <li>Competitive market positioning</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Scaling Roadmap
          </h2>
          <ol className="space-y-4">
            {[
              "Assess current operations and bottlenecks",
              "Develop your scaling strategy and KPIs",
              "Implement automation where possible",
              "Build your leadership and management team",
              "Execute controlled market expansion",
              "Continuously optimize and iterate"
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
          Ready to Scale Your Business?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
          Access our complete Scaling Playbook with frameworks, templates, and expert guidance.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setActiveTab('playbook')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Get Scaling Playbook
          </button>
          <button
            onClick={() => setActiveTab('consultation')}
            className="border border-blue-600 text-blue-600 dark:text-blue-300 dark:border-blue-300 font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Growth Consultation
          </button>
        </div>
      </div>

      {/* Playbook Content */}
      {activeTab === 'playbook' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Scaling Playbook Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-blue-600 dark:text-blue-400 mb-3">Essential Templates</h3>
              <ul className="space-y-3">
                <li className="flex items-start p-3 rounded-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-blue-500 dark:text-blue-300 mr-3 mt-0.5">📋</span>
                  <span className="text-gray-700 dark:text-gray-200">Scaling Readiness Assessment</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-blue-500 dark:text-blue-300 mr-3 mt-0.5">📈</span>
                  <span className="text-gray-700 dark:text-gray-200">Growth Metrics Dashboard</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-blue-500 dark:text-blue-300 mr-3 mt-0.5">🤖</span>
                  <span className="text-gray-700 dark:text-gray-200">Automation Opportunity Finder</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-blue-600 dark:text-blue-400 mb-3">Premium Resources</h3>
              <ul className="space-y-3">
                <li className="flex items-start p-3 rounded-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-blue-500 dark:text-blue-300 mr-3 mt-0.5">🌍</span>
                  <span className="text-gray-700 dark:text-gray-200">Market Expansion Playbook</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-blue-500 dark:text-blue-300 mr-3 mt-0.5">👥</span>
                  <span className="text-gray-700 dark:text-gray-200">Leadership Scaling Framework</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-blue-500 dark:text-blue-300 mr-3 mt-0.5">🔄</span>
                  <span className="text-gray-700 dark:text-gray-200">Process Optimization System</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a 
              href="/downloads/scaling-playbook" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              Download Complete Playbook
            </a>
          </div>
        </div>
      )}

      {/* Consultation Content */}
      {activeTab === 'consultation' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Scaling Consultation</h2>
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
              <label htmlFor="business-stage" className="block text-gray-700 dark:text-gray-300 mb-1">Business Stage</label>
              <select 
                id="business-stage" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="">Select your growth stage</option>
                <option value="startup">Startup (Pre-Scale)</option>
                <option value="scaling">Currently Scaling</option>
                <option value="established">Established (Optimizing Growth)</option>
              </select>
            </div>
            <div>
              <label htmlFor="scaling-needs" className="block text-gray-700 dark:text-gray-300 mb-1">Scaling Challenges</label>
              <textarea 
                id="scaling-needs" 
                rows={4} 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Describe your current scaling challenges and goals"
              ></textarea>
            </div>
            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
              >
                Request Scaling Consultation
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ScalingBusinessPlaybookInfoPage;