import { useState } from 'react';
import { ShieldCheck, Settings2 } from 'lucide-react';

const CoockiePolicy = () => {
  const [showPreferences, setShowPreferences] = useState(false);

  return (
    <div className="max-w-3xl mx-auto py-20 px-4 bg-white dark:bg-dark-900 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="flex items-center mb-6">
        <ShieldCheck className="w-10 h-10 text-primary-600 dark:text-primary-400 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cookie Policy</h1>
      </div>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Effective Date: July 1, 2025
      </p>
      <div className="flex justify-center mb-8">
        <img
          src="https://illustrations.popsy.co/gray/cookie.svg"
          alt="Cookie illustration"
          className="w-40 h-40"
        />
      </div>

      {/* Main Content */}
      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">1. What Are Cookies?</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Cookies are small text files stored on your device when you visit a website. They help us remember your preferences, improve your experience, and analyze site usage.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">2. Types of Cookies We Use</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
        <li>
          <strong>Strictly Necessary Cookies:</strong> Essential for the website to function and cannot be switched off in our systems.
        </li>
        <li>
          <strong>Performance Cookies:</strong> Help us understand how visitors interact with our site by collecting and reporting information anonymously.
        </li>
        <li>
          <strong>Functional Cookies:</strong> Enable the website to provide enhanced functionality and personalization.
        </li>
        <li>
          <strong>Targeting/Advertising Cookies:</strong> Used to deliver relevant ads and track campaign performance.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">3. How We Use Cookies</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
        <li>Remember your login and preferences</li>
        <li>Analyze website traffic and usage</li>
        <li>Personalize your experience</li>
        <li>Deliver targeted advertising</li>
        <li>Ensure security and prevent fraud</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">4. Managing Your Cookie Preferences</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        You can manage your cookie preferences at any time. Most browsers allow you to control cookies through their settings. However, disabling certain cookies may affect your experience on our site.
      </p>
      <button
        onClick={() => setShowPreferences(true)}
        className="flex items-center px-5 py-2 mb-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
      >
        <Settings2 className="w-5 h-5 mr-2" />
        Open Cookie Preferences
      </button>
      {showPreferences && (
        <div className="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl shadow-lg mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Cookie Preferences</h3>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            (This is a sample modal. Integrate your cookie management tool here.)
          </p>
          <ul className="mb-4 text-gray-700 dark:text-gray-300">
            <li>
              <input type="checkbox" checked disabled className="mr-2" />
              Strictly Necessary Cookies (Always Active)
            </li>
            <li>
              <input type="checkbox" className="mr-2" />
              Performance Cookies
            </li>
            <li>
              <input type="checkbox" className="mr-2" />
              Functional Cookies
            </li>
            <li>
              <input type="checkbox" className="mr-2" />
              Targeting/Advertising Cookies
            </li>
          </ul>
          <button
            onClick={() => setShowPreferences(false)}
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg"
          >
            Save Preferences
          </button>
        </div>
      )}

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">5. Third-Party Cookies</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Some cookies may be set by third-party services we use, such as analytics providers or advertisers. We do not control these cookies.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">6. Changes to This Policy</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        We may update this Cookie Policy from time to time. Any changes will be posted on this page.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">7. Contact Us</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        If you have any questions about our Cookie Policy, please contact us at{' '}
        <a href="mailto:support@pitchpoa.com" className="text-primary-600 underline">support@pitchpoa.com</a>.
      </p>
    </div>
  );
};

export default CoockiePolicy;