import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-center text-pink-500 dark:text-pink-300 mb-4">
          Terms of Service
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          {/* Essential Terms & Service Resources */}
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Essential Terms
          </h2>
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">Core Agreement</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              <li>By using our services, you agree to these binding terms</li>
              <li>You must be at least 18 years old to create an account</li>
              <li>We may modify these terms with 30 days notice</li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Service Resources
          </h2>
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">Available Support</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access these resources in your account dashboard:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Interactive service tutorials</li>
              <li>Business planning templates</li>
              <li>24/7 help center with FAQs</li>
              <li>Community discussion forums</li>
            </ul>
          </div>

          {/* Terms of Service Explained */}
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Terms of Service Explained
          </h2>
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">Plain Language Summary</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Acceptable Use:</strong> Don't misuse our platform or break laws</li>
              <li><strong>Content Rules:</strong> You own your content but grant us usage rights</li>
              <li><strong>Disputes:</strong> We prefer negotiation, then arbitration in Nairobi</li>
              <li><strong>Termination:</strong> Either party can end this agreement anytime</li>
            </ul>
          </div>

          {/* User Rights & Responsibilities */}
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            User Rights & Responsibilities
          </h2>
          <div className="mb-8 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">Your Rights</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Access your data anytime</li>
                <li>Delete your account</li>
                <li>Opt-out of marketing</li>
                <li>Receive service support</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">Your Responsibilities</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Keep login details secure</li>
                <li>Provide accurate information</li>
                <li>Follow community guidelines</li>
                <li>Respect intellectual property</li>
              </ul>
            </div>
          </div>

          {/* Safety & Security Standards */}
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Safety & Security Standards
          </h2>
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">Our Protections</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Bank-grade 256-bit encryption</li>
              <li>Regular third-party security audits</li>
              <li>Strict employee access controls</li>
              <li>24/7 system monitoring</li>
            </ul>
            <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mt-4 mb-2">Reporting Issues</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Contact <span className="font-medium">security@pitch-poa.com</span> immediately for:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Suspected security breaches</li>
              <li>Unauthorized account access</li>
              <li>Vulnerability disclosures</li>
            </ul>
          </div>

          {/* International Compliance */}
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            International Compliance
          </h2>
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">Global Standards</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              <li>GDPR compliant for EU users</li>
              <li>CCPA compliant for California residents</li>
              <li>Data Protection Act compliant in Kenya</li>
              <li>Regular compliance audits</li>
            </ul>
          </div>

          {/* Community Guidelines */}
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Community Guidelines
          </h2>
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">Our Standards</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Be respectful to all members</li>
              <li>Share knowledge generously</li>
              <li>Give constructive feedback</li>
              <li>Report bad behavior</li>
            </ul>
            <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mt-4 mb-2">Zero Tolerance</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We immediately remove:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Hate speech or discrimination</li>
              <li>Harassment or threats</li>
              <li>Spam or scams</li>
              <li>Illegal content</li>
            </ul>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              For questions about these terms, contact us at:
              <br />
              <span className="font-medium">legal@pitch-poa.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;