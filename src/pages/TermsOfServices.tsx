import React, { useState } from 'react';

const TermsOfServicePage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

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
          Terms of Service
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          {/* Essential Terms */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Essential Terms
            </h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">Core Agreement</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>By using our services, you agree to these binding terms</li>
                <li>You must be at least 18 years old to create an account</li>
                <li>We may modify these terms with 30 days notice</li>
              </ul>
              <button 
                onClick={() => toggleSection('essentialTerms')}
                className="mt-3 text-pink-500 dark:text-pink-400 font-medium flex items-center"
              >
                {expandedSections['essentialTerms'] ? 'View Less' : 'View More'}
                <svg 
                  className={`ml-1 w-4 h-4 transition-transform ${expandedSections['essentialTerms'] ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections['essentialTerms'] && (
                <div className="mt-3 pl-5 border-l-2 border-pink-500 dark:border-pink-400">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    These essential terms form the foundation of our agreement. They outline the basic rules for accessing and using our services.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Modifications to these terms will be communicated via email and through in-app notifications. Your continued use after changes constitutes acceptance.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Service Resources */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Service Resources
            </h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">Available Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access these resources in your account dashboard:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Interactive service tutorials</li>
                <li>Business planning templates</li>
                <li>24/7 help center with FAQs</li>
              </ul>
              <button 
                onClick={() => toggleSection('serviceResources')}
                className="mt-3 text-pink-500 dark:text-pink-400 font-medium flex items-center"
              >
                {expandedSections['serviceResources'] ? 'View Less' : 'View More'}
                <svg 
                  className={`ml-1 w-4 h-4 transition-transform ${expandedSections['serviceResources'] ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections['serviceResources'] && (
                <div className="mt-3 pl-5 border-l-2 border-pink-500 dark:border-pink-400">
                  <h4 className="font-medium text-gray-800 dark:text-white mb-1">Resource Details</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                    <li><strong>Tutorials:</strong> Step-by-step guides with screenshots and videos</li>
                    <li><strong>Templates:</strong> Downloadable Word, Excel, and PDF formats</li>
                    <li><strong>Help Center:</strong> Searchable knowledge base with troubleshooting</li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Premium members get access to additional resources including webinars and personalized support.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Terms of Service Explained */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Terms of Service Explained
            </h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">Plain Language Summary</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li><strong>Acceptable Use:</strong> Don't misuse our platform or break laws</li>
                <li><strong>Content Rules:</strong> You own your content but grant us usage rights</li>
                <li><strong>Disputes:</strong> We prefer negotiation, then arbitration in Nairobi</li>
              </ul>
              <button 
                onClick={() => toggleSection('tosExplained')}
                className="mt-3 text-pink-500 dark:text-pink-400 font-medium flex items-center"
              >
                {expandedSections['tosExplained'] ? 'View Less' : 'View More'}
                <svg 
                  className={`ml-1 w-4 h-4 transition-transform ${expandedSections['tosExplained'] ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections['tosExplained'] && (
                <div className="mt-3 pl-5 border-l-2 border-pink-500 dark:border-pink-400">
                  <h4 className="font-medium text-gray-800 dark:text-white mb-1">Detailed Explanation</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Acceptable Use:</strong> This includes prohibitions against spamming, hacking attempts, harassment, and illegal activities. We reserve the right to terminate accounts for violations.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Content Rules:</strong> While you retain ownership of your content, you grant us a worldwide license to host, display, and distribute it as part of our services.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Disputes:</strong> Before formal arbitration, we require a 30-day negotiation period. Arbitration will be conducted in English under Kenyan law.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* User Rights & Responsibilities */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              User Rights & Responsibilities
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">Your Rights</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Access your data anytime</li>
                  <li>Delete your account</li>
                  <li>Opt-out of marketing</li>
                </ul>
                <button 
                  onClick={() => toggleSection('userRights')}
                  className="mt-3 text-pink-500 dark:text-pink-400 font-medium flex items-center"
                >
                  {expandedSections['userRights'] ? 'View Less' : 'View More'}
                  <svg 
                    className={`ml-1 w-4 h-4 transition-transform ${expandedSections['userRights'] ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSections['userRights'] && (
                  <div className="mt-3 pl-5 border-l-2 border-pink-500 dark:border-pink-400">
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Data Access:</strong> You can download your data in JSON or CSV format from your account settings.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Account Deletion:</strong> Complete deletion occurs within 30 days, with some anonymized data retained for legal compliance.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>Marketing Opt-out:</strong> You can manage preferences in your account or unsubscribe via any marketing email.
                    </p>
                  </div>
                )}
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">Your Responsibilities</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Keep login details secure</li>
                  <li>Provide accurate information</li>
                  <li>Follow community guidelines</li>
                </ul>
                <button 
                  onClick={() => toggleSection('userResponsibilities')}
                  className="mt-3 text-pink-500 dark:text-pink-400 font-medium flex items-center"
                >
                  {expandedSections['userResponsibilities'] ? 'View Less' : 'View More'}
                  <svg 
                    className={`ml-1 w-4 h-4 transition-transform ${expandedSections['userResponsibilities'] ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSections['userResponsibilities'] && (
                  <div className="mt-3 pl-5 border-l-2 border-pink-500 dark:border-pink-400">
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Account Security:</strong> Use strong passwords and enable two-factor authentication. We're not liable for unauthorized access due to credential compromise.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Information Accuracy:</strong> Providing false information may result in account suspension, especially for verified accounts.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>Community Standards:</strong> Repeated violations may lead to permanent bans. Serious violations will be reported to authorities.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Safety & Security Standards */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Safety & Security Standards
            </h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">Our Protections</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Bank-grade 256-bit encryption</li>
                <li>Regular third-party security audits</li>
                <li>Strict employee access controls</li>
              </ul>
              <button 
                onClick={() => toggleSection('safetySecurity')}
                className="mt-3 text-pink-500 dark:text-pink-400 font-medium flex items-center"
              >
                {expandedSections['safetySecurity'] ? 'View Less' : 'View More'}
                <svg 
                  className={`ml-1 w-4 h-4 transition-transform ${expandedSections['safetySecurity'] ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections['safetySecurity'] && (
                <div className="mt-3 pl-5 border-l-2 border-pink-500 dark:border-pink-400">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Encryption:</strong> All data is encrypted both in transit (TLS 1.2+) and at rest (AES-256). Payment information uses additional tokenization.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Security Audits:</strong> Conducted quarterly by independent firms. Critical vulnerabilities are patched within 72 hours of discovery.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Access Controls:</strong> Employees undergo background checks and receive regular security training. Access follows least-privilege principles.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* International Compliance */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              International Compliance
            </h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">Global Standards</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>GDPR compliant for EU users</li>
                <li>CCPA compliant for California residents</li>
                <li>Data Protection Act compliant in Kenya</li>
              </ul>
              <button 
                onClick={() => toggleSection('internationalCompliance')}
                className="mt-3 text-pink-500 dark:text-pink-400 font-medium flex items-center"
              >
                {expandedSections['internationalCompliance'] ? 'View Less' : 'View More'}
                <svg 
                  className={`ml-1 w-4 h-4 transition-transform ${expandedSections['internationalCompliance'] ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections['internationalCompliance'] && (
                <div className="mt-3 pl-5 border-l-2 border-pink-500 dark:border-pink-400">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <strong>GDPR:</strong> EU users have rights to access, rectification, erasure, and data portability. Our Data Protection Officer can be contacted at dpo@pitch-poa.com.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <strong>CCPA:</strong> California residents may opt-out of data sales and request disclosure of data collection practices.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Kenyan DPA:</strong> We comply with all registration and processing requirements under Kenyan data protection laws.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Community Guidelines
            </h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">Our Standards</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Be respectful to all members</li>
                <li>Share knowledge generously</li>
                <li>Give constructive feedback</li>
              </ul>
              <button 
                onClick={() => toggleSection('communityGuidelines')}
                className="mt-3 text-pink-500 dark:text-pink-400 font-medium flex items-center"
              >
                {expandedSections['communityGuidelines'] ? 'View Less' : 'View More'}
                <svg 
                  className={`ml-1 w-4 h-4 transition-transform ${expandedSections['communityGuidelines'] ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections['communityGuidelines'] && (
                <div className="mt-3 pl-5 border-l-2 border-pink-500 dark:border-pink-400">
                  <h4 className="font-medium text-gray-800 dark:text-white mb-1">Detailed Guidelines</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Respect:</strong> No personal attacks, discrimination, or harassment. Debate ideas, not people.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Knowledge Sharing:</strong> Cite sources when possible. Don't share confidential or proprietary information without permission.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Feedback:</strong> Focus on being helpful rather than critical. Suggest improvements rather than just pointing out flaws.
                  </p>
                </div>
              )}
            </div>
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