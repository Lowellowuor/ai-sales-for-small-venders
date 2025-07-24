
import { Shield, Lock, EyeOff, Home, FileText, Cookie, Gavel } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const cookiePrivacySections = [
  {
    icon: <Cookie className="w-8 h-8 text-blue-600" />,
    title: "Cookie Types",
    description: "Categories of cookies we use and their purposes",
    details: [
      "Essential: Required for core functionality",
      "Performance: Analytics and service improvement",
      "Functional: Remembering preferences",
      "Marketing: Personalized content (opt-in only)"
    ]
  },
  {
    icon: <Shield className="w-8 h-8 text-green-600" />,
    title: "Data Protection",
    description: "How we safeguard data collected via cookies",
    details: [
      "Pseudonymization of tracking data",
      "Limited data retention periods",
      "Secure transmission encryption",
      "Regular privacy impact assessments"
    ]
  },
  {
    icon: <Gavel className="w-8 h-8 text-purple-600" />,
    title: "GDPR Compliance",
    description: "Cookie usage under EU regulations",
    details: [
      "Explicit consent for non-essential cookies",
      "Granular consent options",
      "Easy withdrawal of consent",
      "Records of consent management"
    ]
  },
  {
    icon: <Lock className="w-8 h-8 text-orange-500" />,
    title: "Security Measures",
    description: "Protection for cookie-stored data",
    details: [
      "HttpOnly and Secure flags on sensitive cookies",
      "SameSite cookie restrictions",
      "Regular security audits",
      "CSRF protection mechanisms"
    ]
  },
  {
    icon: <FileText className="w-8 h-8 text-teal-500" />,
    title: "Your Control",
    description: "Managing cookie preferences",
    details: [
      "Cookie consent dashboard",
      "Browser-level opt-out instructions",
      "Per-category consent settings",
      "Clear cookie policy documentation"
    ]
  }
];

const CookiePrivacySection = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-12 px-4 max-w-4xl mx-auto"> {/* Reduced top padding for nested section */}
      {/* Hero Section */}
      <section className="py-8 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-2xl mb-8 shadow-lg">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <Shield className="w-10 h-10 text-white" /> {/* Slightly smaller icon */}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Privacy & Data Protection</h1>
          <p className="mb-4 text-md md:text-lg text-white/90">
            Learn how cookies relate to your privacy and how we protect your personal data.
          </p>
          <button
            onClick={() => navigate(-1)} // Goes back to Cookie Policy
            className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition-colors text-sm"
          >
            Back to Cookie Policy
          </button>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Cookie-Related Privacy Framework
        </h2>
        
        <div className="space-y-6">
          {cookiePrivacySections.map((section, index) => (
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
          Related Cookie Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            className="bg-white dark:bg-dark-700 p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/cookie-settings')}
          >
            <div className="flex items-center gap-2 mb-2">
              <Cookie className="w-5 h-5 text-blue-600" />
              <h3 className="text-md font-semibold">Cookie Settings</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Adjust your cookie preferences at any time.
            </p>
          </div>
          <div 
            className="bg-white dark:bg-dark-700 p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/tracking-technologies')}
          >
            <div className="flex items-center gap-2 mb-2">
              <EyeOff className="w-5 h-5 text-purple-600" />
              <h3 className="text-md font-semibold">Tracking Technologies</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Learn about other tracking methods we use.
            </p>
          </div>
        </div>
      </section>

      {/* Back to Home - Optional for nested pages */}
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

export default CookiePrivacySection;