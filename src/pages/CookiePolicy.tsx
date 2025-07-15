import React, { useState } from 'react';
// Importing icons from lucide-react for a modern look
import { Cookie, FileText, ShieldCheck, Globe, Mail, Home } from 'lucide-react';

// Placeholder for react-router-dom's useNavigate
const useNavigate = () => {
  return (path: string) => {
    window.location.href = path; // Simulate navigation for preview
  };
};

const cookieResources = [
  {
    icon: <Cookie className="w-8 h-8 text-yellow-600" />,
    title: "Cookie Policy Explained",
    description: "Understand what cookies are, how we use them, and how you can manage your preferences. Download our easy-to-read cookie policy.",
    link: "/downloads/cookie-policy-guide.pdf",
    fileType: "PDF",
    details: "Cookie types · Usage · Preferences"
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
    title: "Privacy & Data Protection",
    description: "Learn how cookies relate to your privacy and how we protect your personal data in compliance with GDPR and other regulations.",
    link: "/downloads/cookie-privacy-guide.pdf",
    fileType: "PDF",
    details: "GDPR · Data protection · Security"
  },
  {
    icon: <Globe className="w-8 h-8 text-green-600" />,
    title: "International Compliance",
    description: "See how our cookie practices comply with international standards and cross-border data regulations.",
    link: "/downloads/cookie-international-compliance.pdf",
    fileType: "PDF",
    details: "Global standards · Consent · Transfers"
  }
];

const CookiePolicyPage = () => {
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
    console.log('Cookie Policy Question Submitted:', form);
    alert('Thank you for reaching out! Our team will respond to your question as soon as possible.');
    setSubmitted(true);
  };

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-yellow-600 to-yellow-400 text-white rounded-2xl mb-12 shadow-lg">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <Cookie className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Cookie Policy</h1>
          <p className="mb-6 text-lg md:text-xl text-white/90">
            We use cookies to enhance your experience, analyze site usage, and comply with international privacy standards. Learn more about our cookie practices and your choices.
          </p>
          <a
            href="#cookie-resources"
            className="inline-block bg-white text-yellow-700 font-semibold px-8 py-4 rounded-lg shadow hover:bg-gray-100 transition-colors"
          >
            Explore Cookie Resources
          </a>
        </div>
      </section>

      {/* Cookie Resources Section */}
      <section id="cookie-resources" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Essential Cookie Policy Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cookieResources.map((res, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col transition hover:shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">{res.icon}
                <span className="text-xl font-semibold text-yellow-700 dark:text-yellow-300">{res.title}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-200 mb-4">{res.description}</p>
              {/* MODIFIED: Changed from download to view button */}
              <a
                href={res.link}
                // Removed 'download' attribute
                className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow w-max"
                target="_blank" // Opens in a new tab
                rel="noopener noreferrer" // Security best practice for target="_blank"
              >
                <FileText className="w-5 h-5" /> View {/* Changed text */}
              </a>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{res.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Cookie Policy Content */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Cookie Policy</h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-8">
          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white">1. What Are Cookies?</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Cookies are small text files stored on your device by your browser. They help us remember your preferences, analyze site traffic, and improve your experience.
          </p>
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">2. Types of Cookies We Use</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
            <li>Essential Cookies: Necessary for site functionality and security.</li>
            <li>Analytics Cookies: Help us understand how visitors use our site.</li>
            <li>Preference Cookies: Remember your settings and choices.</li>
            <li>Marketing Cookies: Used to deliver relevant ads and measure campaign effectiveness.</li>
          </ul>
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">3. Managing Your Cookie Preferences</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            You can manage or disable cookies in your browser settings. Some features may not work properly if you disable certain cookies.
          </p>
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">4. Third-Party Cookies</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            We may use third-party cookies for analytics and advertising. These providers have their own privacy policies.
          </p>
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">5. International Compliance</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Our cookie practices comply with GDPR, CCPA, and other international privacy laws. We respect your right to privacy and data protection.
          </p>
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">6. Updates to This Policy</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            We may update this Cookie Policy from time to time. Changes will be posted on this page.
          </p>
          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">7. Contact Us</h3>
          <p className="mb-8 text-gray-700 dark:text-gray-300">
            For questions about our cookie policy, contact us at{' '}
            <a href="mailto:support@pitchpoa.com" className="text-yellow-700 underline">support@pitchpoa.com</a>.
          </p>
        </div>
      </section>

      {/* Contact/Feedback Form */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Send Us a Cookie Policy Question
        </h2>
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow p-8">
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500"
                  placeholder="Type your cookie policy question here..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-600 dark:bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-700 dark:hover:bg-yellow-600 transition"
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
          className="flex items-center justify-center px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors"
        >
          <Home className="w-5 h-5 mr-2" /> Back to Home
        </button>
        <a
          href="mailto:support@pitchpoa.com"
          className="flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-gray-700 text-yellow-700 dark:text-yellow-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Mail className="w-5 h-5 mr-2" />
          Contact Support
        </a>
      </div>
    </div>
  );
}

// Main App component to render the CookiePolicyPage
export default function App() {
  return (
    // Tailwind CSS setup for the preview
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>
      <CookiePolicyPage />
    </>
  );
}
