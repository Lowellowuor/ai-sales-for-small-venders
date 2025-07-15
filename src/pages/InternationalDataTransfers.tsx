import React from 'react';
import { Globe, FileText, Gavel, Shield, Flag, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const transferMechanisms = [
  {
    icon: <Gavel className="w-8 h-8 text-blue-600" />,
    title: "Standard Contractual Clauses (SCCs)",
    description: "EU-approved contractual safeguards for international transfers",
    details: [
      "Implemented for all non-adequate country transfers",
      "Regularly updated to reflect latest EU requirements",
      "Include supplementary measures where needed",
      "Available for review upon request"
    ]
  },
  {
    icon: <Shield className="w-8 h-8 text-green-600" />,
    title: "Adequacy Decisions",
    description: "Countries with EU-approved data protection standards",
    details: [
      "Automatic compliance for transfers to adequate countries",
      "Current adequacy decisions include UK, Japan, and Canada",
      "Regular monitoring of adequacy status changes",
      "Alternative safeguards implemented if adequacy revoked"
    ]
  },
  {
    icon: <Flag className="w-8 h-8 text-purple-600" />,
    title: "Region-Specific Compliance",
    description: "Additional protections for key jurisdictions",
    details: [
      "CCPA compliance for California residents",
      "LGPD compliance for Brazilian data subjects",
      "PIPL compliance for Chinese user data",
      "APP compliance for Australian users"
    ]
  },
  {
    icon: <FileText className="w-8 h-8 text-orange-500" />,
    title: "Transfer Impact Assessments",
    description: "Evaluating risks before international transfers",
    details: [
      "Assessment of local surveillance laws",
      "Evaluation of judicial redress options",
      "Technical measures to mitigate risks",
      "Regular reassessment of transfer mechanisms"
    ]
  }
];

const InternationalTransfersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-purple-600 to-purple-400 text-white rounded-2xl mb-12 shadow-lg">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <Globe className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">International Data Transfers</h1>
          <p className="mb-6 text-lg md:text-xl text-white/90">
            How we ensure your data remains protected when transferred across borders in compliance with global regulations.
          </p>
          <button
            onClick={() => navigate('/privacy-policy')}
            className="inline-block bg-white text-purple-700 font-semibold px-8 py-4 rounded-lg shadow hover:bg-gray-100 transition-colors"
          >
            Back to Privacy Policy
          </button>
        </div>
      </section>

      {/* Transfer Mechanisms */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Our Transfer Safeguards
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {transferMechanisms.map((mechanism, index) => (
            <div key={index} className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0">
                  {mechanism.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{mechanism.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{mechanism.description}</p>
                </div>
              </div>
              
              <ul className="space-y-3 pl-2">
                {mechanism.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance Framework */}
      <section className="mb-16 bg-white dark:bg-dark-800 rounded-2xl shadow p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Compliance Framework</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">GDPR Compliance</h3>
            <p className="text-gray-700 dark:text-gray-300">
              All international transfers of EU personal data comply with Chapter V of the GDPR, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Maintaining an up-to-date Record of Processing Activities</li>
              <li>Implementing SCCs with all non-adequate third countries</li>
              <li>Conducting Transfer Impact Assessments for high-risk transfers</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Global Standards</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We align our transfer mechanisms with multiple international standards:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
              <li>APEC Cross-Border Privacy Rules (CBPR) system</li>
              <li>ASEAN Data Management Framework</li>
              <li>OECD Privacy Guidelines</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="mb-16 bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Related Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            className="bg-white dark:bg-dark-700 p-6 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/data-security')}
          >
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold">Data Security Measures</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Learn about our technical safeguards that protect data regardless of location.
            </p>
          </div>
          <div 
            className="bg-white dark:bg-dark-700 p-6 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/privacy-policy-guide')}
          >
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Privacy Policy Guide</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Understand our comprehensive approach to data protection.
            </p>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <div className="flex justify-center mb-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
        >
          <Home className="w-5 h-5 mr-2" /> Back to Home
        </button>
      </div>
    </div>
  );
};

export default InternationalTransfersPage;