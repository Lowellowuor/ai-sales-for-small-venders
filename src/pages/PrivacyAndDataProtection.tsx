import { Lock, Shield, Gavel, Database, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyAndDataProtection = () => {
  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Shield className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Privacy & Data Protection</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          How we safeguard your personal data in compliance with GDPR, CCPA, and other global regulations.
        </p>
      </div>

      {/* Three Pillars */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* GDPR Compliance */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-lg border-t-4 border-indigo-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center">
              <Gavel className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold">GDPR Compliance</h2>
          </div>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-indigo-600">•</span> Lawful data processing
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600">•</span> Data minimization
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600">•</span> Right to access/delete
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600">•</span> 72-hour breach notification
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600">•</span> EU Representative appointed
            </li>
          </ul>
        </div>

        {/* Data Protection */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <Lock className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold">Data Protection</h2>
          </div>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Encryption in transit & at rest
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Regular security audits
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Limited employee access
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Data retention policies
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Secure third-party vetting
            </li>
          </ul>
        </div>

        {/* Your Rights */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-lg border-t-4 border-green-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <EyeOff className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold">Your Rights</h2>
          </div>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span> Access personal data
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span> Request correction
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span> Data portability
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span> Withdraw consent
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span> Lodge complaints
            </li>
          </ul>
        </div>
      </div>

      {/* Global Compliance */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-8 mb-12">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
              <Database className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Global Regulations</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">CCPA (California)</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span> Right to opt-out of sales
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span> Non-discrimination
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span> "Do Not Sell" mechanism
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Other Regulations</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span> LGPD (Brazil)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span> PIPEDA (Canada)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span> APP (Australia)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Practices */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Our Data Practices</h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Never sell personal data
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Limited data collection
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Clear consent mechanisms
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> DPO contact: dpo@yourcompany.com
            </li>
          </ul>
        </div>
        <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Exercise Your Rights</h2>
          <ol className="list-decimal pl-5 space-y-3 text-gray-700 dark:text-gray-300">
            <li>Submit request via privacy portal</li>
            <li>Identity verification</li>
            <li>Processing within 30 days</li>
            <li>Appeal process available</li>
          </ol>
        </div>
      </div>

      {/* Download & Contact */}
      <div className="text-center">
        <div className="inline-block bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Full Documentation</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Download our complete privacy policy and data processing agreements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/privacy-policy.pdf"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow inline-flex items-center justify-center gap-2"
              download
            >
              <Download className="w-5 h-5" /> Privacy Policy
            </Link>
            <Link
              to="/dpa.pdf"
              className="bg-white dark:bg-dark-700 hover:bg-gray-100 dark:hover:bg-dark-600 text-gray-800 dark:text-white px-6 py-3 rounded-lg font-medium shadow inline-flex items-center justify-center gap-2"
              download
            >
              <Download className="w-5 h-5" /> DPA
            </Link>
            <Link
              to="/contact/privacy"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium shadow inline-flex items-center justify-center gap-2"
            >
              Contact DPO
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyAndDataProtection;