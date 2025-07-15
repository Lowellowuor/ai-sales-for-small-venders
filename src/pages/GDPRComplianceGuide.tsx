import React from 'react';
import { Gavel, Shield, FileText, User, Lock, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const gdprSections = [
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
            onClick={() => navigate('/gdpr')}  // Matches your main GDBR page route
            className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition-colors text-sm"
          >
            Back to GDBR Overview
          </button>
        </div>
      </section>

      {/* Main Content - Same structure as before */}
      {/* ... (rest of the component remains identical) ... */}
    </div>
  );
};

export default GDPRComplianceGuide;