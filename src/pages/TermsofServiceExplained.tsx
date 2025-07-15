import React from 'react';
import { FileText, CheckCircle, AlertCircle, Scale, Users, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const termsSections = [
  {
    icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
    title: "User Responsibilities",
    description: "What we expect from all platform users",
    details: [
      "Provide accurate account information",
      "Maintain account security credentials",
      "Comply with all applicable laws",
      "Report suspicious activity immediately"
    ]
  },
  {
    icon: <AlertCircle className="w-8 h-8 text-red-500" />,
    title: "Prohibited Activities",
    description: "Actions that may result in account suspension",
    details: [
      "Illegal or fraudulent behavior",
      "Harassment or hate speech",
      "Spamming or phishing attempts",
      "Unauthorized commercial activities"
    ]
  },
  {
    icon: <FileText className="w-8 h-8 text-green-600" />,
    title: "Content Ownership",
    description: "Rights regarding your uploaded content",
    details: [
      "You retain ownership of your content",
      "License granted to us for platform operation",
      "DMCA-compliant takedown process",
      "User-generated content guidelines"
    ]
  },
  {
    icon: <Scale className="w-8 h-8 text-purple-600" />,
    title: "Dispute Resolution",
    description: "How we handle conflicts and issues",
    details: [
      "Mandatory informal negotiation period",
      "Binding arbitration for unresolved disputes",
      "Small claims court opt-out provision",
      "Governing law and jurisdiction"
    ]
  },
  {
    icon: <Users className="w-8 h-8 text-orange-500" />,
    title: "Community Guidelines",
    description: "Expected standards of behavior",
    details: [
      "Respect all community members",
      "No false or misleading information",
      "Proper attribution of content",
      "Constructive feedback practices"
    ]
  }
];

const TermsExplainedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-2xl mb-12 shadow-lg">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <FileText className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Terms of Service Explained</h1>
          <p className="mb-6 text-lg md:text-xl text-white/90">
            A plain-language guide to understanding your rights and responsibilities when using our platform.
          </p>
          <button
            onClick={() => navigate('/terms-of-service')}
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-4 rounded-lg shadow hover:bg-gray-100 transition-colors"
          >
            View Full Legal Terms
          </button>
        </div>
      </section>

      {/* Key Sections */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Key Terms Explained
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {termsSections.map((section, index) => (
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

      {/* FAQs Section */}
      <section className="mb-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div className="bg-white dark:bg-dark-700 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Can I use this service for commercial purposes?
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Our standard terms allow personal and non-commercial use only. For commercial applications, please contact us about our enterprise agreements.
            </p>
          </div>
          <div className="bg-white dark:bg-dark-700 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              What happens if I violate the terms?
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Minor violations may result in warnings, while serious or repeated violations can lead to account suspension or termination. We follow a graduated enforcement policy.
            </p>
          </div>
          <div className="bg-white dark:bg-dark-700 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              How do I report a terms violation?
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Use our in-app reporting tool or email abuse@pitchpoa.com with details of the violation. All reports are confidential.
            </p>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Related Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            className="bg-white dark:bg-dark-700 p-6 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/user-rights')}
          >
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold">User Rights & Responsibilities</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Detailed guide to your account rights and platform obligations.
            </p>
          </div>
          <div 
            className="bg-white dark:bg-dark-700 p-6 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/community-guidelines')}
          >
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-6 h-6 text-orange-500" />
              <h3 className="text-lg font-semibold">Community Guidelines</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Learn about our standards for positive community engagement.
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

export default TermsExplainedPage;