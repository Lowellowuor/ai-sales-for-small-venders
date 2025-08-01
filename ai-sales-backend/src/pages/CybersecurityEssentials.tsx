import React, { useState } from 'react';
import { Shield } from 'lucide-react';

const CybersecurityEssentialsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resources' | 'consultation' | null>(null);

  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-12">
      {/* Header Section */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <Shield className="w-10 h-10 text-red-500 dark:text-red-400" />
          <h1 className="text-4xl font-bold text-red-500 dark:text-red-300">
            Cybersecurity Essentials
          </h1>
        </div>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Protect your business from cyber threats with our comprehensive security framework.
        </p>
      </header>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Business Security Framework
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            In today's digital landscape, cybersecurity is critical for businesses of all sizes. Our guide provides practical measures to safeguard your data, finances, and customer information.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-red-500 dark:text-red-400 mb-2">Core Protections</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Data encryption standards</li>
                <li>Secure payment processing</li>
                <li>Employee security training</li>
                <li>Network protection</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-red-500 dark:text-red-400 mb-2">Key Threats</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Phishing attacks</li>
                <li>Ransomware</li>
                <li>Data breaches</li>
                <li>Financial fraud</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Security Implementation Roadmap
          </h2>
          <ol className="space-y-4">
            {[
              "Conduct security risk assessment",
              "Implement basic protections (firewall, antivirus)",
              "Establish secure authentication practices",
              "Train employees on security protocols",
              "Secure payment and data handling processes",
              "Create incident response plan"
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
          Access our complete Cybersecurity Toolkit with checklists, templates, and expert guidance.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setActiveTab('resources')}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Get Security Resources
          </button>
          <button
            onClick={() => setActiveTab('consultation')}
            className="border border-red-500 text-red-500 dark:text-red-300 dark:border-red-300 font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Security Audit
          </button>
        </div>
      </div>

      {/* Resources Content */}
      {activeTab === 'resources' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Cybersecurity Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-red-500 dark:text-red-400 mb-3">Essential Tools</h3>
              <ul className="space-y-3">
                <li className="flex items-start p-3 rounded-md hover:bg-red-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-red-500 dark:text-red-300 mr-3 mt-0.5">🔐</span>
                  <span className="text-gray-700 dark:text-gray-200">Security Checklist</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-red-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-red-500 dark:text-red-300 mr-3 mt-0.5">🛡️</span>
                  <span className="text-gray-700 dark:text-gray-200">Fraud Prevention Guide</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-red-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-red-500 dark:text-red-300 mr-3 mt-0.5">📜</span>
                  <span className="text-gray-700 dark:text-gray-200">Data Privacy Template</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-red-500 dark:text-red-400 mb-3">Premium Resources</h3>
              <ul className="space-y-3">
                <li className="flex items-start p-3 rounded-md hover:bg-red-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-red-500 dark:text-red-300 mr-3 mt-0.5">🚨</span>
                  <span className="text-gray-700 dark:text-gray-200">Incident Response Plan</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-red-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-red-500 dark:text-red-300 mr-3 mt-0.5">💳</span>
                  <span className="text-gray-700 dark:text-gray-200">Secure Payments Framework</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-red-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-red-500 dark:text-red-300 mr-3 mt-0.5">👨‍💻</span>
                  <span className="text-gray-700 dark:text-gray-200">Employee Training Modules</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a 
              href="/cybersecurity-resources-full"
              className="inline-block bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              View All Resources
            </a>
          </div>
        </div>
      )}

      {/* Consultation Content */}
      {activeTab === 'consultation' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Security Audit Request</h2>
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
                <option value="retail">Retail/E-commerce</option>
                <option value="service">Service</option>
                <option value="financial">Financial Services</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="security-concerns" className="block text-gray-700 dark:text-gray-300 mb-1">Security Concerns</label>
              <textarea 
                id="security-concerns" 
                rows={4} 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Describe your current security measures and concerns"
              ></textarea>
            </div>
            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
              >
                Request Security Audit
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Security Alerts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Current Threat Alerts
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <div className="p-4 bg-red-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-bold text-red-600 dark:text-red-400 mb-1">⚠️ Phishing Scams Targeting SMEs</h3>
              <p>Increase in fake invoice and shipping notification emails targeting African businesses</p>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-bold text-yellow-600 dark:text-yellow-400 mb-1">⚠️ Mobile Payment Fraud</h3>
              <p>New SIM swap attacks targeting mobile money users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Security Quick Tips</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
          <li>Use unique, complex passwords for each business account</li>
          <li>Enable two-factor authentication wherever possible</li>
          <li>Regularly update all software and apps</li>
          <li>Train employees to recognize phishing attempts</li>
          <li>Backup critical data regularly and test restoration</li>
          <li>Limit access to sensitive information</li>
        </ul>
      </div>
    </div>
  );
};

export default CybersecurityEssentialsPage;