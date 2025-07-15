import React, { useState } from 'react';
import { ShieldCheck, FileText, Lock, Globe, Mail, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const privacyResources = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
    title: "Privacy Policy Guide",
    description: "Understand how we collect, use, and protect your personal information.",
    path: "/privacy-policy-guide",
    details: "Data collection · Usage · Protection"
  },
  {
    icon: <Lock className="w-8 h-8 text-green-600" />,
    title: "Data Security Measures",
    description: "Learn about the technical and organizational measures we implement to safeguard your data.",
    path: "/data-security",
    details: "Encryption · Access controls · Audits"
  },
  {
    icon: <Globe className="w-8 h-8 text-purple-600" />,
    title: "International Data Transfers",
    description: "Understand how we handle cross-border data transfers in compliance with global regulations.",
    path: "/international-data-transfers",
    details: "GDPR · SCCs · Adequacy decisions"
  }
];

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleViewClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-2xl mb-12 shadow-lg">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Privacy Policy</h1>
          <p className="mb-6 text-lg md:text-xl text-white/90">
            We are committed to protecting your personal data and being transparent about how we collect, use, and share your information.
          </p>
          <a
            href="#privacy-resources"
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-4 rounded-lg shadow hover:bg-gray-100 transition-colors"
          >
            Explore Privacy Resources
          </a>
        </div>
      </section>

      {/* Privacy Resources Section */}
      <section id="privacy-resources" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Essential Privacy Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {privacyResources.map((res, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 flex flex-col transition hover:shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">{res.icon}
                <span className="text-xl font-semibold text-blue-700 dark:text-blue-300">{res.title}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-200 mb-4">{res.description}</p>
              <button
                onClick={() => handleViewClick(res.path)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow w-max"
              >
                <FileText className="w-5 h-5" /> View Details
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{res.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Privacy Policy Content */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Privacy Policy</h2>
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow p-8">
          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white">1. Information We Collect</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            We collect information you provide directly (name, email, etc.), automatically (usage data, cookies), and from third parties (social media, partners) to provide and improve our services.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">2. How We Use Your Information</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
            <li>To provide and maintain our services</li>
            <li>To communicate with you</li>
            <li>To improve and personalize your experience</li>
            <li>For security and fraud prevention</li>
            <li>To comply with legal obligations</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">3. Data Sharing and Disclosure</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            We may share your information with service providers, for legal compliance, during business transfers, or with your consent. We never sell your personal data.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">4. Data Security</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            We implement appropriate technical and organizational measures to protect your personal data, including encryption, access controls, and regular security audits.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">5. Your Rights</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict use of your personal data, and to object to processing or request data portability.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">6. International Data Transfers</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Your information may be transferred to and processed in countries other than your own. We ensure these transfers comply with applicable data protection laws.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">7. Children's Privacy</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Our services are not directed to children under 13 (or 16 in some regions). We do not knowingly collect personal information from children.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">8. Changes to This Policy</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            We may update this Privacy Policy periodically. We will notify you of significant changes and indicate the "Last Updated" date at the top of this page.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">9. Contact Us</h3>
          <p className="mb-8 text-gray-700 dark:text-gray-300">
            For privacy-related inquiries or to exercise your rights, contact our Data Protection Officer at{' '}
            <a href="mailto:privacy@pitchpoa.com" className="text-blue-700 underline">privacy@pitchpoa.com</a>.
          </p>
        </div>
      </section>

      {/* Contact/Feedback Form */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Privacy Questions or Concerns
        </h2>
        <div className="max-w-xl mx-auto bg-white dark:bg-dark-800 rounded-2xl shadow p-8">
          {submitted ? (
            <div className="text-center text-green-600 dark:text-green-400 font-semibold">
              Thank you for your inquiry! Our privacy team will respond to your question shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your privacy-related question here..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 dark:bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
              >
                Submit Question
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Call-to-action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          <Home className="w-5 h-5 mr-2" /> Back to Home
        </button>
        <a
          href="mailto:privacy@pitchpoa.com"
          className="flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-dark-700 text-blue-700 dark:text-blue-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
        >
          <Mail className="w-5 h-5 mr-2" />
          Contact Privacy Team
        </a>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;