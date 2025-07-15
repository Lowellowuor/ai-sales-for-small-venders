import React, { useState } from 'react';
import { Shield, AlertCircle, FileText } from 'lucide-react';

const SafetySecurityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reporting' | 'enforcement' | 'tips' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'data' | 'community' | 'privacy'>('data');

  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-12">
      {/* Header Section */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <Shield className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-300">
            Safety & Security Standards
          </h1>
        </div>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          How we protect your data and ensure a safe environment for all users.
        </p>
      </header>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Our Protection Framework
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            We employ industry-leading security measures and community guidelines to maintain a safe platform for everyone.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <button 
              onClick={() => setSelectedCategory('data')}
              className={`p-4 rounded-lg transition-all ${selectedCategory === 'data' ? 'bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-700' : 'bg-gray-50 dark:bg-gray-700'}`}
            >
              <h3 className="font-medium text-lg text-blue-600 dark:text-blue-400 mb-2">Data Protection</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">How we secure your information</p>
            </button>
            
            <button 
              onClick={() => setSelectedCategory('community')}
              className={`p-4 rounded-lg transition-all ${selectedCategory === 'community' ? 'bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-700' : 'bg-gray-50 dark:bg-gray-700'}`}
            >
              <h3 className="font-medium text-lg text-blue-600 dark:text-blue-400 mb-2">Community Safety</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Guidelines and protections</p>
            </button>
            
            <button 
              onClick={() => setSelectedCategory('privacy')}
              className={`p-4 rounded-lg transition-all ${selectedCategory === 'privacy' ? 'bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-700' : 'bg-gray-50 dark:bg-gray-700'}`}
            >
              <h3 className="font-medium text-lg text-blue-600 dark:text-blue-400 mb-2">Privacy Controls</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Manage your settings</p>
            </button>
          </div>

          {selectedCategory === 'data' && (
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Data Security Measures</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>End-to-end encryption for sensitive data</li>
                <li>Regular security audits and penetration testing</li>
                <li>Compliance with global data protection regulations</li>
                <li>Secure server infrastructure with 24/7 monitoring</li>
              </ul>
            </div>
          )}

          {selectedCategory === 'community' && (
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Community Guidelines</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Zero tolerance for harassment or hate speech</li>
                <li>Content moderation policies</li>
                <li>Age-appropriate content restrictions</li>
                <li>Transparent reporting mechanisms</li>
              </ul>
            </div>
          )}

          {selectedCategory === 'privacy' && (
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Privacy Features</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Granular control over data sharing</li>
                <li>Download or delete your data anytime</li>
                <li>Anonymous usage options</li>
                <li>Customizable visibility settings</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Implementation Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Our Security Processes
          </h2>
          <div className="space-y-4">
            <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                1
              </span>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Prevention</h3>
                <p className="text-gray-600 dark:text-gray-300">Proactive security measures and system hardening</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                2
              </span>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Detection</h3>
                <p className="text-gray-600 dark:text-gray-300">24/7 monitoring and anomaly detection</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                3
              </span>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Response</h3>
                <p className="text-gray-600 dark:text-gray-300">Rapid incident response protocols</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                4
              </span>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Recovery</h3>
                <p className="text-gray-600 dark:text-gray-300">Data backup and restoration procedures</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                5
              </span>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Improvement</h3>
                <p className="text-gray-600 dark:text-gray-300">Continuous security enhancements</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resource CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-8 text-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
          Safety Resources
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
          Access our safety guides and learn how to report issues or manage your security settings.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setActiveTab('reporting')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            Reporting Procedures
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className="border border-blue-600 text-blue-600 dark:text-blue-300 dark:border-blue-300 font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
          >
            <Shield className="w-5 h-5 mr-2" />
            Safety Tips
          </button>
        </div>
      </div>

      {/* Reporting Content */}
      {activeTab === 'reporting' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
            Reporting Procedures
          </h2>
          
          <div className="mb-6">
            <div className="flex space-x-2 mb-4">
              <button 
                onClick={() => setSelectedCategory('data')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === 'data' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                Data Issues
              </button>
              <button 
                onClick={() => setSelectedCategory('community')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === 'community' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                Community Issues
              </button>
              <button 
                onClick={() => setSelectedCategory('privacy')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === 'privacy' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                Privacy Concerns
              </button>
            </div>

            {selectedCategory === 'data' && (
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center mb-2">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-2 rounded-lg mr-3">
                      🔐
                    </span>
                    <span>Report Data Breach</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    If you suspect unauthorized access to your account or data, report it immediately.
                  </p>
                  <a href="#" className="text-blue-600 dark:text-blue-400 text-sm font-medium">Report Now →</a>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center mb-2">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-2 rounded-lg mr-3">
                      🕵️
                    </span>
                    <span>Suspicious Activity</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Notice unusual behavior in your account? Let us investigate.
                  </p>
                  <a href="#" className="text-blue-600 dark:text-blue-400 text-sm font-medium">Report Activity →</a>
                </div>
              </div>
            )}

            {selectedCategory === 'community' && (
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center mb-2">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-2 rounded-lg mr-3">
                      ⚠️
                    </span>
                    <span>Report Abuse</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Encounter harassment, hate speech, or inappropriate content? Report it here.
                  </p>
                  <a href="#" className="text-blue-600 dark:text-blue-400 text-sm font-medium">Report Content →</a>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center mb-2">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-2 rounded-lg mr-3">
                      🚨
                    </span>
                    <span>Immediate Danger</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    If you're in immediate danger, contact local authorities first, then report to us.
                  </p>
                  <a href="#" className="text-blue-600 dark:text-blue-400 text-sm font-medium">Emergency Report →</a>
                </div>
              </div>
            )}

            {selectedCategory === 'privacy' && (
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center mb-2">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-2 rounded-lg mr-3">
                      👁️
                    </span>
                    <span>Privacy Violation</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Report unauthorized use of your personal information or images.
                  </p>
                  <a href="#" className="text-blue-600 dark:text-blue-400 text-sm font-medium">Report Violation →</a>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center mb-2">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-2 rounded-lg mr-3">
                      ✋
                    </span>
                    <span>Right to Be Forgotten</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Request removal of your personal data from our systems.
                  </p>
                  <a href="#" className="text-blue-600 dark:text-blue-400 text-sm font-medium">Request Removal →</a>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">What happens after you report?</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Our team reviews all reports within 24 hours</li>
              <li>You'll receive a confirmation of receipt</li>
              <li>We may contact you for additional information</li>
              <li>We'll notify you of the outcome when investigation is complete</li>
            </ul>
          </div>
        </div>
      )}

      {/* Safety Tips Content */}
      {activeTab === 'tips' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
            Safety Tips
          </h2>
          
          <div className="mb-6">
            <div className="flex space-x-2 mb-4">
              <button 
                onClick={() => setSelectedCategory('data')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === 'data' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                Data Security
              </button>
              <button 
                onClick={() => setSelectedCategory('community')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === 'community' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                Community Safety
              </button>
              <button 
                onClick={() => setSelectedCategory('privacy')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === 'privacy' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                Privacy Settings
              </button>
            </div>

            {selectedCategory === 'data' && (
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center mb-2">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-2 rounded-lg mr-3">
                      🔑
                    </span>
                    <span>Password Security</span>
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>Use unique passwords for each service</li>
                    <li>Enable two-factor authentication</li>
                    <li>Consider using a password manager</li>
                    <li>Change passwords periodically</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center mb-2">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-2 rounded-lg mr-3">
                      🖥️
                    </span>
                    <span>Device Security</span>
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>Keep your operating system updated</li>
                    <li>Install reputable antivirus software</li>
                    <li>Be cautious with public Wi-Fi</li>
                    <li>Log out from shared devices</li>
                  </ul>
                </div>
              </div>
            )}

            {selectedCategory === 'community' && (
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center mb-2">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-2 rounded-lg mr-3">
                      👥
                    </span>
                    <span>Safe Interactions</span>
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>Be cautious sharing personal information</li>
                    <li>Trust your instincts about people</li>
                    <li>Meet in public places for first meetings</li>
                    <li>Tell someone where you're going</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center mb-2">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-2 rounded-lg mr-3">
                      🧒
                    </span>
                    <span>Youth Safety</span>
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>Monitor children's online activity</li>
                    <li>Educate about online dangers</li>
                    <li>Use parental controls when appropriate</li>
                    <li>Encourage open communication</li>
                  </ul>
                </div>
              </div>
            )}

            {selectedCategory === 'privacy' && (
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center mb-2">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-2 rounded-lg mr-3">
                      ⚙️
                    </span>
                    <span>Privacy Settings</span>
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>Review privacy settings regularly</li>
                    <li>Limit data sharing with third parties</li>
                    <li>Customize what's visible to others</li>
                    <li>Opt out of data collection when possible</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center mb-2">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-2 rounded-lg mr-3">
                      📱
                    </span>
                    <span>App Permissions</span>
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>Review app permissions before installing</li>
                    <li>Only grant necessary permissions</li>
                    <li>Revoke unused permissions periodically</li>
                    <li>Uninstall apps you no longer use</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Enforcement Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Enforcement Procedures
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div className="flex items-start mb-3">
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-3 rounded-lg mr-4">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Policy Violations</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Our response process</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                When violations are reported, our team investigates and takes appropriate action which may include content removal, warnings, or account suspension.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div className="flex items-start mb-3">
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Appeals Process</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Fair review system</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Users can appeal enforcement actions if they believe a mistake was made. Our team will conduct a secondary review.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Resources */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Quick Security Resources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-lg text-blue-600 dark:text-blue-400 mb-3">For Data Protection</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>How to create strong passwords</li>
              <li>Recognizing phishing attempts</li>
              <li>Securing your email account</li>
              <li>Using two-factor authentication</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-lg text-blue-600 dark:text-blue-400 mb-3">For Online Safety</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Identifying scams and fraud</li>
              <li>Safe online shopping practices</li>
              <li>Protecting your digital identity</li>
              <li>Social media safety checklist</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetySecurityPage;