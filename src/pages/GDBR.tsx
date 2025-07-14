import React, { useState } from 'react';

const GDPRCompliancePage = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'contact-requests': true // Contact section open by default
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-center text-pink-500 dark:text-pink-300 mb-4">
          Our GDPR Commitment
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Protecting your data rights with EU GDPR standards applied globally
        </p>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          {/* 1. What is GDPR? */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              1. What is GDPR?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The General Data Protection Regulation (GDPR) is a European Union law that sets strict standards for data privacy, transparency, and user rights.
            </p>
            <button
              onClick={() => toggleSection('what-is-gdpr')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              {expandedSections['what-is-gdpr'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['what-is-gdpr'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  We apply these standards to <strong>all users worldwide</strong>, not just those in the EU. The GDPR establishes:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Strict requirements for data collection and processing</li>
                  <li>Transparency about how personal data is used</li>
                  <li>Enhanced rights for individuals regarding their data</li>
                  <li>Accountability measures for organizations</li>
                </ul>
              </div>
            )}
          </div>

          {/* 2. Your Rights Under GDPR */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              2. Your Rights Under GDPR
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You have comprehensive rights regarding your personal data under GDPR.
            </p>
            <button
              onClick={() => toggleSection('your-rights')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              {expandedSections['your-rights'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['your-rights'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                  <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request deletion of your data</li>
                  <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                  <li><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
                  <li><strong>Right to Object:</strong> Object to certain processing, including marketing</li>
                  <li><strong>Right to Withdraw Consent:</strong> Withdraw your consent at any time</li>
                  <li><strong>Right to Lodge a Complaint:</strong> Contact a supervisory authority if you believe your rights are violated</li>
                </ul>
              </div>
            )}
          </div>

          {/* 3. How We Protect Your Data */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              3. How We Protect Your Data
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We implement robust measures to safeguard your personal information.
            </p>
            <button
              onClick={() => toggleSection('data-protection')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              {expandedSections['data-protection'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['data-protection'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>We use <strong>strong encryption</strong> and secure servers</li>
                  <li>We conduct <strong>regular security audits</strong> and staff training</li>
                  <li>We <strong>minimize data collection</strong> and retention</li>
                  <li>We only share data with <strong>trusted partners</strong> under strict agreements</li>
                  <li>We respond <strong>promptly</strong> to data access and deletion requests</li>
                  <li>We implement <strong>privacy by design</strong> in all our systems</li>
                </ul>
              </div>
            )}
          </div>

          {/* 4. International Data Transfers */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              4. International Data Transfers
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your data may be transferred outside the EU with appropriate safeguards.
            </p>
            <button
              onClick={() => toggleSection('data-transfers')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              {expandedSections['data-transfers'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['data-transfers'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  When your data is transferred outside the European Union:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>We use <strong>standard contractual clauses</strong> approved by the EU</li>
                  <li>We implement <strong>additional safeguards</strong> where required</li>
                  <li>We ensure all third parties provide <strong>GDPR-level protection</strong></li>
                  <li>We conduct <strong>due diligence</strong> on all international data processors</li>
                </ul>
              </div>
            )}
          </div>

          {/* 5. Data Breach Notification */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              5. Data Breach Notification
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our protocol for handling potential data breaches.
            </p>
            <button
              onClick={() => toggleSection('breach-notification')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              {expandedSections['breach-notification'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['breach-notification'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>In the event of a data breach, we will <strong>notify affected users</strong> and authorities within <strong>72 hours</strong></li>
                  <li>We maintain an <strong>incident response plan</strong> for data breaches</li>
                  <li>All breaches are <strong>documented and reviewed</strong> to prevent recurrence</li>
                  <li>Notifications will include <strong>nature of the breach</strong>, affected data, and recommended actions</li>
                </ul>
              </div>
            )}
          </div>

          {/* 6. Children's Data */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              6. Children's Data
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Special protections for children's personal information.
            </p>
            <button
              onClick={() => toggleSection('children-data')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              {expandedSections['children-data'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['children-data'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>We do not <strong>knowingly collect</strong> data from children under 16</li>
                  <li>Parents or guardians may <strong>contact us</strong> to request deletion of a child's data</li>
                  <li>We implement <strong>age verification</strong> measures where appropriate</li>
                  <li>Any services directed at children have <strong>additional privacy protections</strong></li>
                </ul>
              </div>
            )}
          </div>

          {/* 7. Contact & Requests */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              7. Contact & Requests
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              How to exercise your rights or ask about our GDPR practices.
            </p>
            <button
              onClick={() => toggleSection('contact-requests')}
              className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              {expandedSections['contact-requests'] ? 'Hide Details' : 'View Details'}
            </button>
            {expandedSections['contact-requests'] && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    To exercise your GDPR rights or ask about our data protection practices:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Email us at: <strong>support@pitchpoa.com</strong></li>
                    <li>Include "GDPR Request" in your subject line</li>
                    <li>Specify which right(s) you wish to exercise</li>
                    <li>Provide sufficient information for us to verify your identity</li>
                  </ul>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                      Send Us a GDPR or Data Protection Question
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-gray-200"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-gray-200"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-1">
                          Your GDPR Question or Request
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-gray-200"
                          placeholder="Please describe your GDPR question or request..."
                          required
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                      >
                        Submit Request
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GDPRCompliancePage;