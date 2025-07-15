import React from 'react';
import { ShieldCheck, FileText, Lock, Users, Globe,Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const privacySections = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
    title: "Information Collection",
    description: "What data we collect and how we gather it",
    details: [
      "Personal information you provide (name, email, etc.)",
      "Automatically collected data (usage, device information)",
      "Data from third parties (social media, partners)"
    ]
  },
  {
    icon: <FileText className="w-8 h-8 text-green-600" />,
    title: "Data Usage",
    description: "How we use your personal information",
    details: [
      "To provide and improve our services",
      "For communication and support",
      "Personalization and recommendations",
      "Security and fraud prevention"
    ]
  },
  {
    icon: <Lock className="w-8 h-8 text-purple-600" />,
    title: "Data Protection",
    description: "Our security measures to safeguard your information",
    details: [
      "Encryption technologies",
      "Access controls and authentication",
      "Regular security audits",
      "Staff training on data protection"
    ]
  },
  {
    icon: <Users className="w-8 h-8 text-orange-500" />,
    title: "Your Rights",
    description: "Control you have over your personal data",
    details: [
      "Access and download your data",
      "Request corrections or deletions",
      "Object to certain processing",
      "Data portability options"
    ]
  },
  {
    icon: <Globe className="w-8 h-8 text-teal-500" />,
    title: "International Transfers",
    description: "How we handle cross-border data",
    details: [
      "Compliance with GDPR requirements",
      "Standard Contractual Clauses",
      "Data protection adequacy decisions",
      "Transfer impact assessments"
    ]
  }
];

const PrivacyPolicyGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-2xl mb-12 shadow-lg">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Privacy Policy Guide</h1>
          <p className="mb-6 text-lg md:text-xl text-white/90">
            A clear explanation of how we handle your personal information and protect your privacy.
          </p>
          <button
            onClick={() => navigate('/privacy-policy')}
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-4 rounded-lg shadow hover:bg-gray-100 transition-colors"
          >
            Back to Full Privacy Policy
          </button>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Understanding Our Privacy Practices
        </h2>
        
        <div className="space-y-8">
          {privacySections.map((section, index) => (
            <div key={index} className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{section.description}</p>
                </div>
              </div>
              
              <ul className="space-y-3 pl-2">
                {section.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
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
      <section className="mb-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Additional Privacy Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            className="bg-white dark:bg-dark-700 p-6 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/data-security')}
          >
            <div className="flex items-center gap-3 mb-3">
              <Lock className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold">Data Security Measures</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Detailed information about our technical safeguards and security protocols.
            </p>
          </div>
          <div 
            className="bg-white dark:bg-dark-700 p-6 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/user-rights')}
          >
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-6 h-6 text-orange-500" />
              <h3 className="text-lg font-semibold">Exercise Your Rights</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Step-by-step guide to accessing, correcting, or deleting your personal data.
            </p>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <div className="flex justify-center mb-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          <Home className="w-5 h-5 mr-2" /> Back to Home
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicyGuide;