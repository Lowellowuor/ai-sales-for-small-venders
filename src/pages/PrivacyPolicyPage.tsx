import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-12">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-center text-pink-500 dark:text-pink-300 mb-4">
          Privacy Policy
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Your Privacy Matters
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            We are committed to protecting your personal information and being transparent about what data we collect and how we use it.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">1. Information We Collect</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We collect information you provide directly when you register, use our services, or communicate with us. This may include:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Contact information (name, email, phone number)</li>
                <li>Business information (company name, industry)</li>
                <li>Financial information for payment processing</li>
                <li>Usage data and preferences</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">2. How We Use Your Information</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your information helps us provide, maintain, and improve our services:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Deliver and personalize our services</li>
                <li>Process transactions and send notices</li>
                <li>Respond to your requests and provide support</li>
                <li>Improve our products and develop new features</li>
                <li>Communicate about updates and offers</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">3. Data Sharing & Disclosure</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We do not sell your personal information. We may share data in these limited circumstances:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                <li>With service providers who assist our operations</li>
                <li>When required by law or to protect rights</li>
                <li>During business transfers like mergers or acquisitions</li>
                <li>With your explicit consent</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">4. Data Security</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We implement industry-standard security measures including:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Encryption of sensitive data</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Secure data storage practices</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">5. Your Rights & Choices</h3>
              <p className="text-gray-600 dark:text-gray-300">
                You have control over your personal information:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Access and request a copy of your data</li>
                <li>Update or correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent where applicable</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">6. Changes to This Policy</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We may update this policy periodically. We'll notify you of significant changes through our website or email. Your continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">7. Contact Us</h3>
              <p className="text-gray-600 dark:text-gray-300">
                For questions about this privacy policy or your personal data, please contact our Data Protection Officer at:
                <br />
                <span className="font-medium">privacy@pitch-poa.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;