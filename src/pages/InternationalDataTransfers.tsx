import React from 'react';
import { Globe, FileText, Gavel, Shield, Lock, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const dataTransferSections = [
  {
    icon: <Globe className="w-8 h-8 text-blue-600" />,
    title: "Transfer Mechanisms",
    description: "Legal frameworks we use for international transfers",
    details: [
      "EU Standard Contractual Clauses (SCCs)",
      "UK International Data Transfer Agreement",
      "Binding Corporate Rules (BCRs)",
      "Adequacy decisions where applicable"
    ]
  },
  {
    icon: <FileText className="w-8 h-8 text-green-600" />,
    title: "Supplemental Safeguards",
    description: "Additional protections for cross-border transfers",
    details: [
      "Data encryption in transit and at rest",
      "Pseudonymization techniques",
      "Strict access controls",
      "Transfer impact assessments"
    ]
  },
  {
    icon: <Gavel className="w-8 h-8 text-purple-600" />,
    title: "GDPR Compliance",
    description: "How we meet Chapter V requirements",
    details: [
      "Article 44: General principle for transfers",
      "Article 45: Adequacy decisions",
      "Article 46: Appropriate safeguards",
      "Article 49: Derogations"
    ]
  },
  {
    icon: <Shield className="w-8 h-8 text-orange-500" />,
    title: "Country-Specific Protections",
    description: "Regional data transfer solutions",
    details: [
      "US Data Privacy Framework compliance",
      "China Personal Information Protection Law",
      "Brazil LGPD international transfers",
      "South Korea PIPA cross-border rules"
    ]
  },
  {
    icon: <Lock className="w-8 h-8 text-teal-500" />,
    title: "Your Rights",
    description: "Control over your international data",
    details: [
      "Right to information about transfers",
      "Right to object to specific transfers",
      "Right to request transfer restrictions",
      "Right to data localization where offered"
    ]
  }
];

const DataTransfersSection = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-12 px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="py-8 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-2xl mb-8 shadow-lg">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <Globe className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">International Data Transfers</h1>
          <p className="mb-4 text-md md:text-lg text-white/90">
            See how we handle cross-border data transfers in compliance with GDPR and other international laws.
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
          Our Transfer Framework
        </h2>
        
        <div className="space-y-6">
          {dataTransferSections.map((section, index) => (
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

      {/* Compliance Documents */}
      <section className="mb-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Transfer Documentation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            className="bg-white dark:bg-dark-700 p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/gdpr/scc-documents')}
          >
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="text-md font-semibold">SCC Documents</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              View our Standard Contractual Clauses
            </p>
          </div>
          <div 
            className="bg-white dark:bg-dark-700 p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/gdpr/transfer-impact-assessments')}
          >
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-green-600" />
              <h3 className="text-md font-semibold">Impact Assessments</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Review our transfer risk evaluations
            </p>
          </div>
          <div 
            className="bg-white dark:bg-dark-700 p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/gdpr/country-specific-guides')}
          >
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-purple-600" />
              <h3 className="text-md font-semibold">Country Guides</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Region-specific transfer information
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

export default DataTransfersSection;