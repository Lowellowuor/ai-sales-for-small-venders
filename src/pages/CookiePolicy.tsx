import React from 'react';

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-12">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-center text-pink-500 dark:text-pink-300 mb-4">
          Cookie Policy
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Our Use of Cookies and Similar Technologies
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            We use cookies and similar tracking technologies to enhance your experience, analyze usage, and improve our services.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">1. What Are Cookies?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Cookies are small text files stored on your device when you visit websites. They help websites remember information about your visit.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">2. Types of Cookies We Use</h3>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-pink-500 dark:text-pink-400 mb-1">Essential Cookies</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Necessary for website functionality, such as login sessions and security features.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-pink-500 dark:text-pink-400 mb-1">Performance Cookies</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Collect anonymous data about how visitors use our site to improve performance.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-pink-500 dark:text-pink-400 mb-1">Functionality Cookies</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Remember your preferences to provide enhanced features.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-pink-500 dark:text-pink-400 mb-1">Targeting/Advertising Cookies</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Used to deliver relevant ads and track ad campaign performance.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">3. How We Use Cookies</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our cookies help us:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Authenticate users and prevent fraud</li>
                <li>Remember your preferences and settings</li>
                <li>Analyze site traffic and usage patterns</li>
                <li>Improve our services and user experience</li>
                <li>Deliver targeted advertising (with consent)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">4. Third-Party Cookies</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We may allow third parties to set cookies for:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Analytics services (e.g., Google Analytics)</li>
                <li>Advertising networks</li>
                <li>Social media features</li>
                <li>Embedded content providers</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                These third parties have their own privacy policies.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">5. Your Cookie Choices</h3>
              <p className="text-gray-600 dark:text-gray-300">
                You can control cookies through:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Browser settings to block or delete cookies</li>
                <li>Our cookie consent banner when you first visit</li>
                <li>Opt-out tools for specific services</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Note that blocking essential cookies may impact website functionality.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">6. Changes to This Policy</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We may update this policy as our practices change or legal requirements evolve. We'll notify you of significant changes.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">7. Contact Us</h3>
              <p className="text-gray-600 dark:text-gray-300">
                For questions about our use of cookies, please contact us at:
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

export default CookiePolicyPage;