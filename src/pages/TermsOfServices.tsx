import React, { useState } from 'react';
import { FileText, CheckCircle, ShieldCheck, Globe, Mail, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const termsResources = [
  {
    icon: <FileText className="w-8 h-8 text-blue-600" />,
    title: "Terms of Service Explained",
    description: "A clear summary of our terms, including user responsibilities, acceptable use, and dispute resolution.",
    path: "/terms-of-service-explained",
    details: "Plain language · Policy summary · FAQs"
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-green-600" />,
    title: "User Rights & Responsibilities",
    description: "Understand your rights and obligations as a user of our platform.",
    path: "/user-rights-and-responsibilities",
    details: "User rights · Account security · Content policy"
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
    title: "Safety & Security Standards",
    description: "See how we protect your data and ensure a safe environment for all users.",
    path: "/safety-and-security-standards",
    details: "Reporting · Enforcement · Safety tips"
  },
  {
    icon: <Globe className="w-8 h-8 text-orange-500" />,
    title: "International Compliance",
    description: "Review our compliance with global regulations and cross-border service standards.",
    path: "/international-compliance",
    details: "Global standards · Dispute resolution · Certifications"
  }
];

const TermsOfService = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error messages

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Resolved handleSubmit function: combines logic and uses state for errors
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); // Clear previous errors

    // Define your API URL. For Vite, you'd typically use import.meta.env.VITE_API_URL
    // For local development, assuming backend runs on port 5000
    const API_URL = 'http://localhost:5000'; 

    try {
      const response = await fetch(
        `${API_URL}/terms-question`, // Assuming a /terms-question endpoint on your backend
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (response.ok) {
        setSubmitted(true);
        setForm({ // Optionally clear the form on successful submission
          name: '',
          email: '',
          message: '',
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Network error during form submission:", error);
      setErrorMessage("Network error. Please check your connection and try again.");
    }
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
            <FileText className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Terms of Service</h1>
          <p className="mb-6 text-lg md:text-xl text-white/90">
            Please review our terms and conditions to understand your rights, responsibilities, and how we keep our platform safe and fair for everyone.
          </p>
          <a
            href="#terms-resources"
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-4 rounded-lg shadow hover:bg-gray-100 transition-colors"
          >
            Explore Terms Resources
          </a>
        </div>
      </section>

      {/* Terms Resources Section */}
      <section id="terms-resources" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Essential Terms of Service Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {termsResources.map((res, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col transition hover:shadow-2xl" // Adjusted dark mode class
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

      {/* Main Terms Content */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Terms of Service</h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-8"> {/* Adjusted dark mode class */}
          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white">1. Acceptance of Terms</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            By accessing or using our services, you agree to be bound by these Terms of Service. If you disagree with any part, you may not access the service.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">2. User Responsibilities</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
            <li>Provide accurate account information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Not engage in unauthorized commercial activities</li>
            <li>Not upload harmful or illegal content</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">3. Content Ownership</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            You retain ownership of any content you submit, but grant us a worldwide license to use, display, and distribute it in connection with our services.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">4. Prohibited Conduct</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
            <li>Spamming or phishing attempts</li>
            <li>Harassment or hate speech</li>
            <li>Impersonation or false representation</li>
            <li>Reverse engineering or hacking attempts</li>
            <li>Automated scraping or data collection</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">5. Account Termination</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            We reserve the right to suspend or terminate accounts that violate these terms. You may terminate your account at any time.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">6. Dispute Resolution</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Most disputes can be resolved by contacting our support team. For unresolved disputes, binding arbitration may be required.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">7. Limitation of Liability</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            We are not liable for indirect, incidental, or consequential damages arising from use of our services.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-gray-300">8. Changes to Terms</h3>
          <p className="mb-8 text-gray-700 dark:text-gray-300">
            We may update these terms periodically. Continued use after changes constitutes acceptance of the new terms.
          </p>
        </div>
      </section>

      {/* Contact/Feedback Form */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Send Us a Terms of Service Question
        </h2>
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow p-8"> {/* Adjusted dark mode class */}
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" // Adjusted dark mode class
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" // Adjusted dark mode class
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" // Adjusted dark mode class
                  placeholder="Type your terms of service question here..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 dark:bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
              >
                Send Message
              </button>
              {errorMessage && ( // Display error message if present
                <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
              )}
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
          href="mailto:support@pitchpoa.com"
          className="flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-gray-700 text-blue-700 dark:text-blue-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" // Adjusted dark mode class
        >
          <Mail className="w-5 h-5 mr-2" />
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default TermsOfService;
