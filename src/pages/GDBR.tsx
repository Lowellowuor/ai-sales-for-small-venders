import React, { useState } from 'react';
import { ShieldCheck, Globe, FileText, UserCheck, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const gdprResources = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
    title: "GDPR Compliance Guide",
    description: "Understand how we comply with the General Data Protection Regulation (GDPR) and what it means for your data rights.",
    link: "/gdpr-compliance-guide",
    details: "GDPR summary · Compliance checklist · FAQs"
  },
  {
    icon: <UserCheck className="w-8 h-8 text-green-600" />,
    title: "Your Data Rights",
    description: "Learn about your rights to access, correct, delete, and restrict the processing of your personal data under GDPR.",
    link: "/your-data-rights",
    details: "Access request · Data deletion · Restriction forms"
  },
  {
    icon: <FileText className="w-8 h-8 text-purple-600" />,
    title: "Privacy Policy & Transparency",
    description: "Read our privacy policy in clear language, including how we collect, use, and protect your data.",
    link: "/privacy-policy",
    details: "Policy summary · Data usage · Security"
  },
  {
    icon: <Globe className="w-8 h-8 text-orange-500" />,
    title: "International Data Transfers",
    description: "See how we handle cross-border data transfers in compliance with GDPR and other international laws.",
    link: "/international-data-transfers",
    details: "Standard contractual clauses · Safeguards · Global compliance"
  }
];

const GdbrPage = () => {
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

  const handleViewClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-700 to-blue-400 text-white rounded-2xl mb-12 shadow-lg">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">GDPR & Data Protection</h1>
          <p className="mb-6 text-lg md:text-xl text-white/90">
            We are committed to full compliance with the General Data Protection Regulation (GDPR) and global privacy standards. Learn about your rights, our responsibilities, and how we protect your data.
          </p>
          <a
            href="#gdpr-resources"
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-4 rounded-lg shadow hover:bg-gray-100 transition-colors"
          >
            Explore GDPR Resources
          </a>
        </div>
      </section>

      {/* GDPR Resources Section */}
      <section id="gdpr-resources" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Essential GDPR & Data Protection Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gdprResources.map((res, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 flex flex-col transition hover:shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">{res.icon}
                <span className="text-xl font-semibold text-blue-700 dark:text-blue-300">{res.title}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-200 mb-4">{res.description}</p>
              <button
                onClick={() => handleViewClick(res.link)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow w-max"
              >
                <FileText className="w-5 h-5" /> View Details
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{res.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main GDPR Content */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our GDPR Commitment</h2>
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow p-8">
          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white">1. What is GDPR?</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            The General Data Protection Regulation (GDPR) is a European Union law that sets strict standards for data privacy, transparency, and user rights. We apply these standards to all users, regardless of location.
          </p>
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">2. Your Rights Under GDPR</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
            <li>Right to Access: Request a copy of your personal data.</li>
            <li>Right to Rectification: Correct inaccurate or incomplete data.</li>
            <li>Right to Erasure ("Right to be Forgotten"): Request deletion of your data.</li>
            <li>Right to Restrict Processing: Limit how we use your data.</li>
            <li>Right to Data Portability: Receive your data in a portable format.</li>
            <li>Right to Object: Object to certain types of processing, including marketing.</li>
            <li>Right to Withdraw Consent: Withdraw your consent at any time.</li>
            <li>Right to Lodge a Complaint: Contact a supervisory authority if you believe your rights are violated.</li>
          </ul>
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">3. How We Protect Your Data</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
            <li>We use strong encryption and secure servers.</li>
            <li>We conduct regular security audits and staff training.</li>
            <li>We minimize data collection and retention.</li>
            <li>We only share data with trusted partners under strict agreements.</li>
            <li>We respond promptly to data access and deletion requests.</li>
          </ul>
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">4. International Data Transfers</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            If your data is transferred outside the EU, we use standard contractual clauses and other safeguards to ensure your privacy is protected worldwide.
          </p>
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">5. Data Breach Notification</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            In the event of a data breach, we will notify affected users and authorities within 72 hours, as required by GDPR.
          </p>
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">6. Children's Data</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            We do not knowingly collect data from children under 16. Parents or guardians may contact us to request deletion of a child's data.
          </p>
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">7. Contact & Requests</h3>
          <p className="mb-8 text-gray-700 dark:text-gray-300">
            To exercise your rights or ask about our GDPR practices, contact us at{' '}
            <a href="mailto:support@pitchpoa.com" className="text-blue-700 underline">support@pitchpoa.com</a>.
          </p>
        </div>
      </section>

      {/* Contact/Feedback Form */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Send Us a GDPR or Data Protection Question
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
                  placeholder="Type your GDPR or data protection question here..."
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
}

export default GdbrPage;