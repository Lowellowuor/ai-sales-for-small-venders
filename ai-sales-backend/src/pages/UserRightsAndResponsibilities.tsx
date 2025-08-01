import React from 'react';
import { CheckCircle, Shield, Lock, User, FileText, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const userRightsSections = [
  {
    icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
    title: "User Rights",
    description: "What you're entitled to as a platform user",
    details: [
      "Right to access and use platform services",
      "Right to control your personal data",
      "Right to appeal account actions",
      "Right to clear communication"
    ]
  },
  {
    icon: <Shield className="w-8 h-8 text-green-600" />,
    title: "Account Security",
    description: "Your responsibilities for account protection",
    details: [
      "Maintain confidentiality of credentials",
      "Immediately report unauthorized access",
      "Use strong authentication methods",
      "Keep recovery options updated"
    ]
  },
  {
    icon: <Lock className="w-8 h-8 text-purple-600" />,
    title: "Content Policy",
    description: "Rules governing user-generated content",
    details: [
      "You retain ownership of your content",
      "Prohibited content types",
      "Reporting mechanisms for violations",
      "Consequences for policy breaches"
    ]
  },
  {
    icon: <User className="w-8 h-8 text-orange-500" />,
    title: "Privacy Obligations",
    description: "Your duties regarding others' privacy",
    details: [
      "No unauthorized data collection",
      "Respect others' personal information",
      "Comply with privacy laws",
      "Reporting privacy violations"
    ]
  },
  {
    icon: <FileText className="w-8 h-8 text-teal-500" />,
    title: "Dispute Resolution",
    description: "How to address conflicts or issues",
    details: [
      "Informal resolution process",
      "Formal complaint procedures",
      "Mediation options",
      "Arbitration requirements"
    ]
  }
];

const UserRightsSection = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-12 px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="py-8 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-2xl mb-8 shadow-lg">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">User Rights & Responsibilities</h1>
          <p className="mb-4 text-md md:text-lg text-white/90">
            Understand your rights and obligations as a user of our platform.
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
          Your Platform Rights & Duties
        </h2>
        
        <div className="space-y-6">
          {userRightsSections.map((section, index) => (
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
          Related Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            className="bg-white dark:bg-dark-700 p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/account-safety')}
          >
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-green-600" />
              <h3 className="text-md font-semibold">Account Safety Guide</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Best practices for securing your account.
            </p>
          </div>
          <div 
            className="bg-white dark:bg-dark-700 p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/content-policy')}
          >
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <h3 className="text-md font-semibold">Content Policy Details</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Complete guidelines for user-generated content.
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

export default UserRightsSection;