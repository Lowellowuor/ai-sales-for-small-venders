import React, { useState } from 'react';

const CookiePolicyPage = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'contact-us': true // Contact section open by default
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Your cookie policy question has been submitted!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-center text-pink-500 dark:text-pink-300 mb-4">
          Our Cookie Policy
        </h1>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          {/* What Are Cookies? */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              1. What Are Cookies?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Cookies are small text files stored on your device by your browser to enhance your experience.
            </p>
            <button
              onClick={() => toggleSection('what-are-cookies')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mb-4"
            >
              {expandedSections['what-are-cookies'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['what-are-cookies'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Small text files stored on your device</li>
                  <li>Help remember your preferences and settings</li>
                  <li>Analyze site traffic and usage patterns</li>
                  <li>Improve website functionality and performance</li>
                </ul>
              </div>
            )}
          </div>

          {/* Types of Cookies We Use */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              2. Types of Cookies We Use
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We use different types of cookies for various purposes to enhance your experience.
            </p>
            <button
              onClick={() => toggleSection('cookie-types')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mb-4"
            >
              {expandedSections['cookie-types'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['cookie-types'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>Essential Cookies:</strong> Necessary for site functionality and security</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and choices</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant ads and measure campaign effectiveness</li>
                </ul>
              </div>
            )}
          </div>

          {/* Managing Your Cookie Preferences */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              3. Managing Your Cookie Preferences
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You have control over how cookies are used on your device.
            </p>
            <button
              onClick={() => toggleSection('cookie-preferences')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mb-4"
            >
              {expandedSections['cookie-preferences'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['cookie-preferences'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Adjust settings in your browser preferences</li>
                  <li>Use our cookie consent manager when first visiting</li>
                  <li>Essential cookies cannot be disabled without affecting functionality</li>
                  <li>Opt-out tools available for specific services</li>
                </ul>
              </div>
            )}
          </div>

          {/* Third-Party Cookies */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              4. Third-Party Cookies
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Some cookies come from trusted third-party services we use.
            </p>
            <button
              onClick={() => toggleSection('third-party-cookies')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mb-4"
            >
              {expandedSections['third-party-cookies'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['third-party-cookies'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Google Analytics for website traffic analysis</li>
                  <li>Advertising networks for relevant marketing</li>
                  <li>Social media platforms for sharing features</li>
                  <li>Each provider has their own privacy policy</li>
                </ul>
              </div>
            )}
          </div>

          {/* International Compliance */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              5. International Compliance
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We adhere to global cookie regulations and privacy laws.
            </p>
            <button
              onClick={() => toggleSection('cookie-compliance')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mb-4"
            >
              {expandedSections['cookie-compliance'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['cookie-compliance'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>GDPR compliant for EU users</li>
                  <li>CCPA compliant for California residents</li>
                  <li>ePrivacy Directive compliant</li>
                  <li>Regular compliance audits</li>
                </ul>
              </div>
            )}
          </div>

          {/* Updates to This Policy */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              6. Updates to This Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may occasionally update our Cookie Policy.
            </p>
            <button
              onClick={() => toggleSection('policy-updates')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mb-4"
            >
              {expandedSections['policy-updates'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['policy-updates'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Changes will be posted on this page</li>
                  <li>Significant changes will be notified via email</li>
                  <li>Updated "Last Modified" date will be displayed</li>
                  <li>Continued use means acceptance of changes</li>
                </ul>
              </div>
            )}
          </div>

          {/* Contact Us - Always Expanded */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              7. Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              For questions about our cookie policy, contact us at support@pitchpoa.com.
            </p>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                Send Us a Cookie Policy Question
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-gray-200"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-gray-200"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-gray-200"
                    placeholder="Type your cookie policy question here..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-8">
        <a href="/" className="text-pink-500 dark:text-pink-400 hover:underline">
          Back to Home
        </a>
        <a href="/contact" className="text-pink-500 dark:text-pink-400 hover:underline">
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default CookiePolicyPage;