import React from 'react';
import { Shield, Lock, AlertCircle, UserCheck, FileText, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const safetyStandardsSections = [
  {
    icon: <Shield className="w-8 h-8 text-blue-600" />,
    title: "Data Protection",
    description: "How we safeguard your information",
    details: [
      "End-to-end encryption for sensitive data",
      "Regular security audits and penetration testing",
      "SOC 2 Type II compliant infrastructure",
      "Data minimization principles"
    ]
  },
  {
    icon: <Lock className="w-8 h-8 text-green-600" />,
    title: "Reporting Mechanisms",
    description: "How to report safety concerns",
    details: [
      "In-app reporting tools",
      "24/7 security team availability",
      "Anonymous reporting options",
      "Clear escalation procedures"
    ]
  },
  {
    icon: <AlertCircle className="w-8 h-8 text-purple-600" />,
    title: "Enforcement Policies",
    description: "How we handle violations",
    details: [
      "Graduated enforcement system",
      "Transparent appeal process",
      "Immediate action for severe violations",
      "Cross-platform ban coordination"
    ]
  },
  {
    icon: <UserCheck className="w-8 h-8 text-orange-500" />,
    title: "Safety Features",
    description: "Tools to protect your experience",
    details: [
      "Two-factor authentication",
      "Login activity monitoring",
      "Content filtering options",
      "Block and mute controls"
    ]
  },
  {
    icon: <FileText className="w-8 h-8 text-teal-500" />,
    title: "Safety Resources",
    description: "Educational materials and guides",
    details: [
      "Online safety tutorials",
      "Scam prevention guides",
      "Digital wellness resources",
      "Community safety workshops"
    ]
  }
];

const SafetyStandardsSection = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-12 px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="py-8 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-2xl mb-8 shadow-lg">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Safety & Security Standards</h1>
          <p className="mb-4 text-md md:text-lg text-white/90">
            See how we protect your data and ensure a safe environment for all users.
          </p>
          <button
            onClick={() => navigate('/terms-of-service')}
            className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition-colors text-sm"
          >
            Back to Terms of Service
          </button>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Our Safety Framework
        </h2>
        
        <div className="space-y-6">
          {safetyStandardsSections.map((section, index) => (
            <div key={index} className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{section.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{section.description}</p>
                </div>
              </div>
              
              <ul className="space-y-2 pl-2">
                {section.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                    <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Resources */}
      <section className="mb-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Related Safety Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            className="bg-white dark:bg-dark-700 p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/safety-tips')}
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-green-600" />
              <h3 className="text-md font-semibold">Safety Tips</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Practical advice for staying safe online.
            </p>
          </div>
          <div 
            className="bg-white dark:bg-dark-700 p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/reporting-guide')}
          >
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <h3 className="text-md font-semibold">Reporting Guide</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Step-by-step instructions for reporting issues.
            </p>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors text-sm"
        >
          <Home className="w-4 h-4 mr-2" /> Back to Home
        </button>
      </div>
    </div>
  );
};

export default SafetyStandardsSection;