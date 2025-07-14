import React, { useState } from 'react';

const PrivacyPolicyPage = () => {
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
    alert('Your privacy question has been submitted!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-center text-pink-500 dark:text-pink-300 mb-4">
          Our Privacy Policy
        </h1>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          {/* Information Collection - Short Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              1. Information Collection
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We collect necessary personal information when you use PitchPoa AI, including account details and usage data through cookies.
            </p>
            <button
              onClick={() => toggleSection('information-collection')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mb-4"
            >
              {expandedSections['information-collection'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['information-collection'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Account registration information (name, email, contact details)</li>
                  <li>Service usage patterns and analytics data</li>
                  <li>Device and browser information for compatibility</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            )}
          </div>

          {/* Use of Information - Short Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              2. Use of Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your data helps us provide, improve, and secure our services while complying with legal requirements.
            </p>
            <button
              onClick={() => toggleSection('information-use')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mb-4"
            >
              {expandedSections['information-use'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['information-use'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Deliver and personalize our services</li>
                  <li>Respond to your inquiries and provide support</li>
                  <li>Detect and prevent security incidents</li>
                  <li>Comply with legal obligations and enforce policies</li>
                  <li>Improve our products and develop new features</li>
                </ul>
              </div>
            )}
          </div>

          {/* Data Protection - Short Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              3. Data Protection
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We implement robust security measures and restrict data access to protect your information.
            </p>
            <button
              onClick={() => toggleSection('data-protection')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mb-4"
            >
              {expandedSections['data-protection'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['data-protection'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Industry-standard encryption for data in transit and at rest</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Strict access controls with multi-factor authentication</li>
                  <li>Employee training on data protection best practices</li>
                  <li>We never sell your personal information</li>
                </ul>
              </div>
            )}
          </div>

          {/* International Compliance - Short Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              4. International Compliance
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We adhere to global privacy regulations including GDPR to protect your data rights worldwide.
            </p>
            <button
              onClick={() => toggleSection('international-compliance')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mb-4"
            >
              {expandedSections['international-compliance'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['international-compliance'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>GDPR compliant for European users</li>
                  <li>CCPA compliant for California residents</li>
                  <li>Standard Contractual Clauses for international data transfers</li>
                  <li>Data Protection Officer appointed for EU compliance</li>
                  <li>72-hour breach notification protocol</li>
                </ul>
              </div>
            )}
          </div>

          {/* Community Guidelines - Short Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              5. Community Guidelines
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We maintain a safe environment through community standards and anti-abuse policies.
            </p>
            <button
              onClick={() => toggleSection('community-guidelines')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mb-4"
            >
              {expandedSections['community-guidelines'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['community-guidelines'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Be respectful to all community members</li>
                  <li>No harassment, hate speech, or discrimination</li>
                  <li>Protect your own privacy and others' privacy</li>
                  <li>Report suspicious activity to our moderation team</li>
                  <li>Violations may result in account suspension</li>
                </ul>
              </div>
            )}
          </div>

          {/* Changes to Privacy Policy - Short Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              6. Changes to Privacy Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may update this policy, and continued use of our services means you accept the changes.
            </p>
            <button
              onClick={() => toggleSection('policy-changes')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mb-4"
            >
              {expandedSections['policy-changes'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['policy-changes'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Significant changes will be notified via email</li>
                  <li>Updated "Last Modified" date will be displayed</li>
                  <li>Previous versions available upon request</li>
                  <li>Changes effective 30 days after posting</li>
                </ul>
              </div>
            )}
          </div>

          {/* Contact Us - Always Expanded with View Button */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              7. Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              For questions about this policy, contact us at support@pitchpoa.com.
            </p>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                Send Us a Privacy Question
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
                    placeholder="Type your privacy question here..."
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

export default PrivacyPolicyPage;