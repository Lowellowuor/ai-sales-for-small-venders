import React, { useState } from 'react';

const TermsOfServicePage = () => {
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
    alert('Your terms of service question has been submitted!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-center text-pink-500 dark:text-pink-300 mb-4">
          Our Terms of Service
        </h1>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          {/* Acceptance of Terms - Short Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              By using PitchPoa AI, you agree to these Terms and all applicable laws. If you disagree, please don't use our services.
            </p>
            <button
              onClick={() => toggleSection('acceptance-terms')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mb-4"
            >
              {expandedSections['acceptance-terms'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['acceptance-terms'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>These terms constitute a legally binding agreement</li>
                  <li>You must be at least 18 years old or have parental consent</li>
                  <li>Your use constitutes acceptance of these terms</li>
                  <li>We may refuse service to anyone at our discretion</li>
                </ul>
              </div>
            )}
          </div>

          {/* User Responsibilities - Short Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              2. User Responsibilities
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You must provide accurate information, maintain account security, and use our platform lawfully.
            </p>
            <button
              onClick={() => toggleSection('user-responsibilities')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mb-4"
            >
              {expandedSections['user-responsibilities'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['user-responsibilities'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Provide accurate and current registration information</li>
                  <li>Keep your login credentials confidential</li>
                  <li>Use the service only for lawful purposes</li>
                  <li>Respect intellectual property rights</li>
                  <li>Report any security vulnerabilities</li>
                </ul>
              </div>
            )}
          </div>

          {/* Prohibited Activities - Short Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              3. Prohibited Activities
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You may not engage in illegal activities, abuse our systems, or post harmful content.
            </p>
            <button
              onClick={() => toggleSection('prohibited-activities')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mb-4"
            >
              {expandedSections['prohibited-activities'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['prohibited-activities'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>No fraudulent, deceptive, or illegal activities</li>
                  <li>No unauthorized access to systems or data</li>
                  <li>No harassment, hate speech, or harmful content</li>
                  <li>No spamming or unauthorized commercial communications</li>
                  <li>No reverse engineering or copying of our technology</li>
                </ul>
              </div>
            )}
          </div>

          {/* Intellectual Property - Short Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              4. Intellectual Property
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our content, trademarks, and technology are owned by PitchPoa AI or its licensors.
            </p>
            <button
              onClick={() => toggleSection('intellectual-property')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mb-4"
            >
              {expandedSections['intellectual-property'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['intellectual-property'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>All platform content and technology is protected by copyright</li>
                  <li>PitchPoa AI trademarks may not be used without permission</li>
                  <li>User-generated content remains the property of the creator</li>
                  <li>By posting content, you grant us a license to display it</li>
                </ul>
              </div>
            )}
          </div>

          {/* Disclaimers & Liability - Short Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              5. Disclaimers & Limitation of Liability
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our services are provided "as is" and we're not liable for certain damages.
            </p>
            <button
              onClick={() => toggleSection('disclaimers')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mb-4"
            >
              {expandedSections['disclaimers'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['disclaimers'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>No warranty of uninterrupted or error-free service</li>
                  <li>We're not responsible for third-party content or services</li>
                  <li>Your use of the platform is at your own risk</li>
                  <li>Maximum liability limited to fees paid for services</li>
                </ul>
              </div>
            )}
          </div>

          {/* Changes to Terms - Short Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              6. Changes to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may update these Terms, and continued use means you accept the changes.
            </p>
            <button
              onClick={() => toggleSection('changes-terms')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mb-4"
            >
              {expandedSections['changes-terms'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['changes-terms'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>We'll notify users of significant changes</li>
                  <li>Changes become effective 30 days after posting</li>
                  <li>It's your responsibility to review terms periodically</li>
                  <li>Archive of previous versions available upon request</li>
                </ul>
              </div>
            )}
          </div>

          {/* Governing Law - Short Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              7. Governing Law
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              These terms are governed by applicable laws and international standards.
            </p>
            <button
              onClick={() => toggleSection('governing-law')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mb-4"
            >
              {expandedSections['governing-law'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['governing-law'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Disputes will first attempt resolution through negotiation</li>
                  <li>If unresolved, disputes will go through binding arbitration</li>
                  <li>Arbitration will take place in Nairobi, Kenya</li>
                  <li>Each party bears their own arbitration costs</li>
                </ul>
              </div>
            )}
          </div>

          {/* Contact Us - Always Expanded */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              8. Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              For questions about these terms, contact us at support@pitchpoa.com.
            </p>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                Send Us a Terms or Service Question
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
                    placeholder="Type your terms or service question here..."
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

export default TermsOfServicePage;