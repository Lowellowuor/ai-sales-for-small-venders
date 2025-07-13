import React, { useState } from 'react';
import { FileText, ShieldCheck, Users, Globe, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const privacyResources = [
  {
    icon: <FileText className="w-8 h-8 text-blue-600" />,
    title: "Privacy Policy Overview",
    description: "A clear summary of our privacy practices, including data collection, usage, and user rights.",
    link: "/downloads/privacy-policy-guide.pdf",
    fileType: "PDF",
    details: "Plain language · Policy summary · FAQs"
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
    title: "Data Protection Standards",
    description: "See how we protect your data and ensure a safe environment for all users. Includes reporting and enforcement procedures.",
    link: "/downloads/data-protection-guide.pdf",
    fileType: "PDF",
    details: "Reporting · Enforcement · Safety tips"
  },
  {
    icon: <Globe className="w-8 h-8 text-orange-500" />,
    title: "International Compliance",
    description: "Review our compliance with global privacy regulations and cross-border service standards.",
    link: "/downloads/international-privacy.pdf",
    fileType: "PDF",
    details: "Global standards · Dispute resolution · Certifications"
  },
  {
    icon: <Users className="w-8 h-8 text-pink-500" />,
    title: "Community Guidelines",
    description: "Learn about our community standards, anti-abuse policies, and how to contribute positively.",
    link: "/downloads/community-guidelines.pdf",
    fileType: "PDF",
    details: "Community rules · Anti-abuse · Positive engagement"
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
    // Here you would send the form data to your backend or API
    setSubmitted(true);
  };

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-700 to-blue-400 text-white rounded-2xl mb-12 shadow-lg">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Privacy Policy</h1>
          <p className="mb-6 text-lg md:text-xl text-white/90">
            Please review our privacy policy to understand how we collect, use, and protect your personal information.
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
              <a
                href={res.link}
                download
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow w-max"
              >
                <FileText className="w-5 h-5" /> Download {res.fileType}
              </a>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{res.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Privacy Content */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Privacy Policy</h2>
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow p-8">
          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white">1. Information Collection</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            We collect personal information you provide when using PitchPoa AI, such as your name, email address, and usage data. We may also collect information automatically through cookies and similar technologies.
          </p>
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">2. Use of Information</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
            <li>To provide and improve our services</li>
            <li>To communicate with you about updates and support</li>
            <li>To ensure security and prevent abuse</li>
            <li>To comply with legal obligations</li>
          </ul>
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">3. Data Protection</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
            <li>We use industry-standard security measures to protect your data</li>
            <li>Access to personal data is restricted to authorized personnel only</li>
            <li>We do not sell your personal information to third parties</li>
          </ul>
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">4. International Compliance</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            We comply with global privacy regulations, including GDPR and other international standards, to protect your rights wherever you are located.
          </p>
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">5. Community Guidelines</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Users are expected to follow our community standards and anti-abuse policies to maintain a safe and positive environment.
          </p>
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">6. Changes to Privacy Policy</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            We may update this Privacy Policy at any time. Continued use of the platform means you accept the revised policy.
          </p>
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">7. Contact Us</h3>
          <p className="mb-8 text-gray-700 dark:text-gray-300">
            For questions about this policy, contact us at{' '}
            <a href="mailto:support@pitchpoa.com" className="text-primary-600 underline">support@pitchpoa.com</a>.
          </p>
        </div>
      </section>

      {/* Contact/Feedback Form */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Send Us a Privacy Question
        </h2>
        <div className="max-w-xl mx-auto bg-white dark:bg-dark-800 rounded-2xl shadow p-8">
          {submitted ? (
            <div className="text-center text-green-600 dark:text-green-400 font-semibold">
              Thank you for reaching out! Our team will respond to your question as soon as possible.
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
                  placeholder="Type your privacy question here..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 dark:bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
              >
                Send Message
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
          Back to Home
        </button>
        <a
          href="mailto:support@pitchpoa.com"
          className="flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-dark-700 text-blue-700 dark:text-blue-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
        >
          <Mail className="w-5 h-5 mr-2" />
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;