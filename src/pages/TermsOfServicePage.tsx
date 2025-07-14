import React, { useState } from 'react';

const TermsOfServicePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terms' | 'contact' | null>(null);

  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-12">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-center text-purple-700 dark:text-purple-300 mb-4">
          Terms of Service
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Please review our terms to understand your rights and responsibilities when using PitchPoa AI.
        </p>
      </header>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            User Agreement Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            By using PitchPoa AI, you agree to follow our rules, respect other users, and use our services responsibly. These terms protect both you and our platform.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-purple-700 dark:text-purple-400 mb-2">Key Points</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Acceptable use of services</li>
                <li>Respect for intellectual property</li>
                <li>Prohibited activities</li>
                <li>Account security</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-purple-700 dark:text-purple-400 mb-2">Your Responsibilities</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Provide accurate information</li>
                <li>Keep login details secure</li>
                <li>Report misuse or abuse</li>
                <li>Comply with local laws</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Details */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Terms of Service Details
          </h2>
          <ol className="space-y-4">
            <li>
              <span className="font-bold text-purple-700 dark:text-purple-300">1. Acceptance of Terms:</span>
              <span className="text-gray-600 dark:text-gray-300 ml-2">
                By accessing PitchPoa AI, you agree to these terms and any future updates.
              </span>
            </li>
            <li>
              <span className="font-bold text-purple-700 dark:text-purple-300">2. User Conduct:</span>
              <span className="text-gray-600 dark:text-gray-300 ml-2">
                You must not use our services for illegal, harmful, or abusive purposes.
              </span>
            </li>
            <li>
              <span className="font-bold text-purple-700 dark:text-purple-300">3. Intellectual Property:</span>
              <span className="text-gray-600 dark:text-gray-300 ml-2">
                All content and tools are protected by copyright. Do not copy or redistribute without permission.
              </span>
            </li>
            <li>
              <span className="font-bold text-purple-700 dark:text-purple-300">4. Account Security:</span>
              <span className="text-gray-600 dark:text-gray-300 ml-2">
                Keep your login details confidential. Notify us of any unauthorized access.
              </span>
            </li>
            <li>
              <span className="font-bold text-purple-700 dark:text-purple-300">5. Termination:</span>
              <span className="text-gray-600 dark:text-gray-300 ml-2">
                We may suspend or terminate accounts that violate these terms.
              </span>
            </li>
            <li>
              <span className="font-bold text-purple-700 dark:text-purple-300">6. Changes to Terms:</span>
              <span className="text-gray-600 dark:text-gray-300 ml-2">
                We may update these terms. Continued use means you accept changes.
              </span>
            </li>
            <li>
              <span className="font-bold text-purple-700 dark:text-purple-300">7. Contact Us:</span>
              <span className="text-gray-600 dark:text-gray-300 ml-2">
                Email <a href="mailto:support@pitchpoa.com" className="text-purple-700 underline">support@pitchpoa.com</a> for questions about our terms.
              </span>
            </li>
          </ol>
        </div>
      </div>

      {/* Resource CTA */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-8 text-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
          Questions About Our Terms?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
          Contact our team or review the full terms for more details.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setActiveTab('terms')}
            className="bg-purple-700 hover:bg-purple-800 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            View Full Terms
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className="border border-purple-700 text-purple-700 dark:text-purple-300 dark:border-purple-300 font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Contact Support
          </button>
        </div>
      </div>

      {/* Terms Tab Content */}
      {activeTab === 'terms' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Full Terms of Service
          </h2>
          <p className="text-gray-700 dark:text-gray-200 mb-4">
            For the complete terms of service, please visit our website or contact us for a copy.
          </p>
        </div>
      )}

      {/* Contact Tab Content */}
      {activeTab === 'contact' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Contact Support
          </h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-purple-700 focus:border-purple-700 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-purple-700 focus:border-purple-700 dark:bg-gray-700 dark:text-gray-200"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="terms-question" className="block text-gray-700 dark:text-gray-300 mb-1">Terms Question</label>
              <textarea
                id="terms-question"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-purple-700 focus:border-purple-700 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Type your question about our terms here..."
              ></textarea>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-purple-700 hover:bg-purple-800 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TermsOfServicePage;