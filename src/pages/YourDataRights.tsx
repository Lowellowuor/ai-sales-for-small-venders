import React from 'react'; 
import { Shield, Edit3, Trash2, Lock, Download, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Renamed the array to avoid conflict with the component name
const dataRightsContent = [
  {
    icon: <Shield className="w-8 h-8 text-blue-600" />,
    title: "Right to Access",
    description: "Obtain a copy of your personal data",
    details: [
      "Request all data we hold about you",
      "Receive data in machine-readable format",
      "No fee for first request",
      "Response within 30 days"
    ]
  },
  {
    icon: <Edit3 className="w-8 h-8 text-green-600" />,
    title: "Right to Rectification",
    description: "Correct inaccurate personal data",
    details: [
      "Update your account information",
      "Request corrections to processed data",
      "Verification process for sensitive changes",
      "Third-party notification where required"
    ]
  },
  {
    icon: <Trash2 className="w-8 h-8 text-purple-600" />,
    title: "Right to Erasure",
    description: "Request deletion of your data",
    details: [
      "Also known as 'Right to be Forgotten'",
      "Subject to legal retention requirements",
      "Includes third-party processors",
      "Partial erasure options available"
    ]
  },
  {
    icon: <Lock className="w-8 h-8 text-orange-500" />,
    title: "Right to Restriction",
    description: "Limit how we use your data",
    details: [
      "Temporary processing restriction",
      "Applies during accuracy disputes",
      "Maintains data without processing",
      "Lift restriction when resolved"
    ]
  },
  {
    icon: <Download className="w-8 h-8 text-teal-500" />,
    title: "Right to Portability",
    description: "Transfer your data to another service",
    details: [
      "Receive data in common formats (JSON, CSV)",
      "Direct transfer where technically feasible",
      "Applies to data you provided directly",
      "Excludes derived/processed data"
    ]
  }
];

// This is your actual React functional component
const YourDataRights = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-12 px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="py-8 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-2xl mb-8 shadow-lg">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Your Data Rights</h1>
          <p className="mb-4 text-md md:text-lg text-white/90">
            Learn about your rights to access, correct, delete, and restrict the processing of your personal data under GDPR.
          </p>
          <button
            onClick={() => navigate('/gdpr')}
            className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition-colors text-sm"
          >
            Back to GDBR Overview
          </button>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          GDPR Data Rights Explained
        </h2>
        
        {/* Use the renamed array here */}
        <div className="space-y-6">
          {dataRightsContent.map((section, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
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

      {/* Action Tools */}
      <section className="mb-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Exercise Your Rights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/gdpr/access-request')}
          >
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <h3 className="text-md font-semibold">Access Request</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Request a copy of all your personal data
            </p>
          </div>
          <div 
            className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/gdpr/deletion-request')}
          >
            <div className="flex items-center gap-2 mb-2">
              <Trash2 className="w-5 h-5 text-red-500" />
              <h3 className="text-md font-semibold">Deletion Request</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Request permanent deletion of your data
            </p>
          </div>
          <div 
            className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/gdpr/restriction-request')}
          >
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-5 h-5 text-purple-600" />
              <h3 className="text-md font-semibold">Restriction Form</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Limit how we process your data
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

export default YourDataRights;
