import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gavel, Shield, FileText, User, Lock, Home } from 'lucide-react'; // Added Home for the back to home button

// This is the content array that was declared but not used.
// It is now correctly referenced in the component's JSX.
const GDPRComplianceGuideSections = [
  {
    icon: <Gavel className="w-8 h-8 text-blue-600" />,
    title: "GDPR Summary",
    description: "Key principles of the regulation",
    details: [
      "Lawfulness, fairness and transparency",
      "Purpose limitation and data minimization",
      "Accuracy and storage limitation",
      "Confidentiality and accountability"
    ]
  },
  {
    icon: <Shield className="w-8 h-8 text-green-600" />,
    title: "Your Rights",
    description: "Rights under GDPR",
    details: [
      "Right to access and data portability",
      "Right to rectification",
      "Right to erasure ('right to be forgotten')",
      "Right to object and restrict processing"
    ]
  },
  {
    icon: <FileText className="w-8 h-8 text-purple-600" />,
    title: "Our Compliance",
    description: "How we meet requirements",
    details: [
      "Data Protection Officer contact: dpo@yourcompany.com",
      "Data Protection Impact Assessments",
      "Records of processing activities",
      "72-hour breach notification policy"
    ]
  },
  {
    icon: <User className="w-8 h-8 text-orange-500" />,
    title: "Data Transfers",
    description: "International data mechanisms",
    details: [
      "EU Standard Contractual Clauses",
      "UK International Data Transfer Agreement",
      "Adequacy decisions",
      "Supplementary technical measures"
    ]
  },
  {
    icon: <Lock className="w-8 h-8 text-teal-500" />,
    title: "Enforcement",
    description: "Compliance verification",
    details: [
      "Regular audits by EU authorities",
      "Cooperation with supervisory authorities",
      "Maximum fines: €20M or 4% global turnover",
      "Compensation rights for damages"
    ]
  }
];

// This is your React functional component
const GDPRComplianceGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-12 px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="py-8 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-2xl mb-8 shadow-lg">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <Gavel className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">GDPR Compliance Guide</h1>
          <p className="mb-4 text-md md:text-lg text-white/90">
            Understand how we comply with the General Data Protection Regulation (GDPR) and what it means for your data rights.
          </p>
          <button
            onClick={() => navigate('/privacy-and-data-protection')} // Changed from /gdpr to /privacy-and-data-protection
            className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition-colors text-sm"
          >
            Back to Privacy Overview
          </button>
        </div>
      </section>

      {/* Main Content Sections - THIS IS WHERE GDPRComplianceGuideSections IS NOW USED */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Key Aspects of GDPR Compliance
        </h2>
        
        <div className="space-y-6">
          {GDPRComplianceGuideSections.map((section, index) => (
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

      {/* Call to Action / Next Steps (Example, adjust as needed) */}
      <section className="mb-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Need Further Assistance?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          If you have specific questions about GDPR compliance for your business,
          feel free to contact our support team.
        </p>
        <button
          onClick={() => navigate('/contact-support')}
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition-colors text-sm"
        >
          Contact Support
        </button>
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

export default GDPRComplianceGuide;
