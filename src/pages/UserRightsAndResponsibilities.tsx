import { Shield, Lock, ClipboardCheck, AlertTriangle, Key, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserRightsAndResponsibilities = () => {
  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Rights & Responsibilities</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Understand your rights and obligations as a user of our platform.
        </p>
      </div>

      {/* Rights and Responsibilities Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* User Rights Card */}
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-8 border-t-4 border-blue-500">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Rights</h2>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Access & Control</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  View, update, or delete your personal information anytime through your account settings.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Key className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Content Ownership</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  You retain ownership of all content you create, while granting us a license to display it.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Privacy Protection</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Expect transparent data practices and security measures protecting your information.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* User Responsibilities Card */}
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Responsibilities</h2>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Account Security</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Maintain strong passwords and immediately report unauthorized access to your account.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Prohibited Activities</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  No illegal content, harassment, spamming, or attempts to compromise system security.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Compliance</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Follow all platform rules and applicable laws in your jurisdiction.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Account Security Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Lock className="w-6 h-6 text-blue-600" /> Account Security
        </h2>
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Best Practices</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span> Use a unique, complex password
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span> Enable two-factor authentication
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span> Regularly review active sessions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span> Be cautious of phishing attempts
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Security Features</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span> Login attempt monitoring
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span> Suspicious activity alerts
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span> Device authorization
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span> Emergency account freeze
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <Link 
              to="/account/security" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Manage your security settings
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Content Policy Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <ClipboardCheck className="w-6 h-6 text-blue-600" /> Content Policy
        </h2>
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-dark-700">
            <div className="p-8">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Allowed Content</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span> Original creations and properly licensed works
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span> Constructive, respectful discussions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span> Properly attributed third-party content
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span> Legally compliant business communications
                </li>
              </ul>
            </div>
            <div className="p-8">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Prohibited Content</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span> Illegal or regulated goods/services
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span> Hate speech or harassment
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span> Misinformation or fraud
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span> Spam or unauthorized advertising
                </li>
              </ul>
            </div>
          </div>
          <div className="px-8 py-6 bg-gray-50 dark:bg-dark-700">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Violations may result in content removal, account suspension, or legal action.
            </p>
            <Link 
              to="/content-policy" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Read full content policy
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Enforcement Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Policy Enforcement</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Reporting</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Users can report violations through:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span> In-app reporting tools
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span> Email to reports@pitchpoa.com
              </li>
            </ul>
          </div>
          <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Review Process</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Our moderation team:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span> Reviews reports within 24 hours
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span> Provides transparency when possible
              </li>
            </ul>
          </div>
          <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Appeals</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              If you believe we made a mistake:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span> Submit an appeal within 30 days
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span> Response within 5 business days
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center">
          <Link 
            to="/contact/moderation" 
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow"
          >
            Contact Moderation Team
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UserRightsAndResponsibilities;