import React from 'react';
import { Lock, ShieldCheck, Cpu, Key, Activity, Server,Home,Globe} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const securityMeasures = [
  {
    icon: <Lock className="w-8 h-8 text-blue-600" />,
    title: "Data Encryption",
    description: "How we protect your data at rest and in transit",
    details: [
      "AES-256 encryption for stored data",
      "TLS 1.3 for all data transmissions",
      "End-to-end encryption for sensitive communications",
      "Regular key rotation policies"
    ]
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
    title: "Access Controls",
    description: "Strict policies governing who can access your data",
    details: [
      "Role-based access control (RBAC)",
      "Multi-factor authentication enforcement",
      "Principle of least privilege access",
      "Just-in-time privileged access"
    ]
  },
  {
    icon: <Cpu className="w-8 h-8 text-purple-600" />,
    title: "Infrastructure Security",
    description: "How we secure our systems and networks",
    details: [
      "Enterprise-grade firewalls and DDoS protection",
      "Intrusion detection/prevention systems",
      "Zero-trust network architecture",
      "Regular vulnerability scanning"
    ]
  },
  {
    icon: <Key className="w-8 h-8 text-orange-500" />,
    title: "Authentication",
    description: "Secure methods to verify user identities",
    details: [
      "Passwordless authentication options",
      "Biometric verification support",
      "Device fingerprinting for suspicious logins",
      "Session timeout policies"
    ]
  },
  {
    icon: <Activity className="w-8 h-8 text-red-500" />,
    title: "Monitoring & Auditing",
    description: "How we track and review access to your data",
    details: [
      "Real-time security event monitoring",
      "Automated anomaly detection",
      "Quarterly third-party security audits",
      "Compliance certifications (SOC 2, ISO 27001)"
    ]
  },
  {
    icon: <Server className="w-8 h-8 text-teal-500" />,
    title: "Data Resilience",
    description: "Ensuring your data remains available and intact",
    details: [
      "Geo-distributed data centers",
      "Immutable backup systems",
      "Disaster recovery planning",
      "99.99% uptime SLA"
    ]
  }
];

const DataSecurityPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-green-600 to-green-400 text-white rounded-2xl mb-12 shadow-lg">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <Lock className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Data Security Measures</h1>
          <p className="mb-6 text-lg md:text-xl text-white/90">
            Comprehensive technical and organizational safeguards we implement to protect your information.
          </p>
          <button
            onClick={() => navigate('/privacy-policy')}
            className="inline-block bg-white text-green-700 font-semibold px-8 py-4 rounded-lg shadow hover:bg-gray-100 transition-colors"
          >
            Back to Privacy Policy
          </button>
        </div>
      </section>

      {/* Security Measures Grid */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Our Security Framework
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityMeasures.map((measure, index) => (
            <div key={index} className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0">
                  {measure.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{measure.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{measure.description}</p>
                </div>
              </div>
              
              <ul className="space-y-3 pl-2">
                {measure.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Resources */}
      <section className="mb-16 bg-green-50 dark:bg-green-900/20 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Related Security Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            className="bg-white dark:bg-dark-700 p-6 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/privacy-policy-guide')}
          >
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Privacy Policy Guide</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Understand how we collect, use, and protect your personal information.
            </p>
          </div>
          <div 
            className="bg-white dark:bg-dark-700 p-6 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/international-compliance')}
          >
            <div className="flex items-center gap-3 mb-3">
              <Globe className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold">Compliance Certifications</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              View our international security standards and compliance documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <div className="flex justify-center mb-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
        >
          <Home className="w-5 h-5 mr-2" /> Back to Home
        </button>
      </div>
    </div>
  );
};

export default DataSecurityPage;