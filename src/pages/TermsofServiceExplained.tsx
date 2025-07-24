
import { FileText, CheckCircle, AlertCircle, Scale, Users, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const termsExplainedSections = [
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
    title: "Acceptable Use",
    description: "Permitted and prohibited activities",
    details: [
      "No illegal or fraudulent behavior",
      "No harassment or hate speech",
      "No spamming or phishing attempts",
      "No unauthorized commercial activities"
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
    title: "Account Management",
    description: "Rules regarding your account",
    details: [
      "You control your account credentials",
      "We may suspend for policy violations",
      "You can terminate at any time",
      "Content deletion policies"
    ]
  },
  {
    icon: <FileText className="w-8 h-8 text-teal-500" />,
    title: "Content Ownership",
    description: "Rights regarding your content",
    details: [
      "You retain ownership of your content",
      "License granted for platform operation",
      "DMCA-compliant takedown process",
      "User-generated content guidelines"
    ]
  }
];

const TermsExplainedSection = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-12 px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="py-8 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-2xl mb-8 shadow-lg">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Terms of Service Explained</h1>
          <p className="mb-4 text-md md:text-lg text-white/90">
            A clear summary of our terms, including user responsibilities, acceptable use, and dispute resolution.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition-colors text-sm"
          >
            Back to Terms of Service
          </button>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Key Terms Explained
        </h2>
        
        <div className="space-y-6">
          {termsExplainedSections.map((section, index) => (
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
            onClick={() => navigate('/terms-faq')}
          >
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="text-md font-semibold">Terms FAQ</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Answers to common questions about our terms.
            </p>
          </div>
          <div 
            className="bg-white dark:bg-dark-700 p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/acceptable-use')}
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <h3 className="text-md font-semibold">Acceptable Use Policy</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Detailed guidelines on permitted platform uses.
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

export default TermsExplainedSection;