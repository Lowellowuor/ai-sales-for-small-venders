
import { ShieldCheck, FileText, Lock, Server, EyeOff, Shield, Clock,Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const securitySections = [
  {
    icon: <Lock className="w-8 h-8 text-blue-600" />,
    title: "Encryption Standards",
    description: "How we protect data in transit and at rest",
    details: [
      "AES-256 encryption for data at rest",
      "TLS 1.3 for all data in transit",
      "End-to-end encryption for sensitive communications",
      "Regular key rotation policies"
    ]
  },
  {
    icon: <Shield className="w-8 h-8 text-green-600" />,
    title: "Access Controls",
    description: "Strict protocols for who can access your data",
    details: [
      "Role-based access control (RBAC) systems",
      "Multi-factor authentication for all employees",
      "Principle of least privilege enforcement",
      "Just-in-time access provisioning"
    ]
  },
  {
    icon: <Server className="w-8 h-8 text-purple-600" />,
    title: "Infrastructure Security",
    description: "Protecting our systems and networks",
    details: [
      "Enterprise-grade firewalls and intrusion detection",
      "DDoS protection and mitigation",
      "Isolated production environments",
      "Regular vulnerability scanning"
    ]
  },
  {
    icon: <EyeOff className="w-8 h-8 text-orange-500" />,
    title: "Data Minimization",
    description: "Collecting only what we need",
    details: [
      "Purpose limitation for all data collection",
      "Automatic data anonymization where possible",
      "Regular data purging schedules",
      "Pseudonymization techniques"
    ]
  },
  {
    icon: <Clock className="w-8 h-8 text-teal-500" />,
    title: "Monitoring & Response",
    description: "Continuous protection and rapid action",
    details: [
      "24/7 security operations center",
      "SIEM (Security Information and Event Management)",
      "Automated alerting for suspicious activity",
      "Incident response playbooks"
    ]
  }
];

const DataSecurityMeasures= () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-2xl mb-12 shadow-lg">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Data Security Measures</h1>
          <p className="mb-6 text-lg md:text-xl text-white/90">
            Comprehensive overview of our technical and organizational safeguards to protect your information.
          </p>
          <button
            onClick={() => navigate('/privacy-policy')}
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-4 rounded-lg shadow hover:bg-gray-100 transition-colors"
          >
            Back to Privacy Policy
          </button>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Our Security Framework
        </h2>
        
        <div className="space-y-8">
          {securitySections.map((section, index) => (
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
          Related Security Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            className="bg-white dark:bg-dark-700 p-6 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/privacy-policy')}
          >
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold">Privacy Policy</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Learn how we collect, use, and protect your personal information.
            </p>
          </div>
          <div 
            className="bg-white dark:bg-dark-700 p-6 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/compliance')}
          >
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold">Compliance Standards</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Our adherence to GDPR, CCPA, and other regulatory requirements.
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

export default DataSecurityMeasures;