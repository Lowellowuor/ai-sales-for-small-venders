import React, { useState } from 'react';
// Importing icons from lucide-react for a modern look
import { FileText, CheckCircle, ShieldCheck, Users, Globe, Mail, Home } from 'lucide-react';

// React Router navigation hook
const useNavigate = () => {
  return (path: string) => {
    console.log(`Navigating to: ${path}`);
    // In a real app, this would use react-router's navigate function
    // For this demo, we'll just log it and update the UI
    window.location.hash = `#navigated-to-${path}`;
  };
};

const termsResources = [
  {
    icon: <FileText className="w-8 h-8 text-blue-600" />,
    title: "Terms of Service Explained",
    description: "A clear summary of our terms, including user responsibilities, acceptable use, and dispute resolution.",
    path: "/terms-explained", // Changed from link to path
    details: "Plain language · Policy summary · FAQs"
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-green-600" />,
    title: "User Rights & Responsibilities",
    description: "Understand your rights and obligations as a user of our platform. Learn about account security, content ownership, and prohibited activities.",
    path: "/user-rights",
    details: "User rights · Account security · Content policy"
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
    title: "Safety & Security Standards",
    description: "See how we protect your data and ensure a safe environment for all users. Includes reporting and enforcement procedures.",
    path: "/safety-security",
    details: "Reporting · Enforcement · Safety tips"
  },
  {
    icon: <Globe className="w-8 h-8 text-orange-500" />,
    title: "International Compliance",
    description: "Review our compliance with global regulations and cross-border service standards.",
    path: "/international-compliance",
    details: "Global standards · Dispute resolution · Certifications"
  },
  {
    icon: <Users className="w-8 h-8 text-pink-500" />,
    title: "Community Guidelines",
    description: "Learn about our community standards, anti-abuse policies, and how to contribute positively.",
    path: "/community-guidelines",
    details: "Community rules · Anti-abuse · Positive engagement"
  }
];

const TermsOfServicesPage = () => {
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
    console.log('Terms or Service Question Submitted:', form);
    alert('Thank you for reaching out! Our team will respond to your question as soon as possible.');
    setSubmitted(true);
  };

  const handleResourceClick = (path: string) => {
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
          Essential Terms & Service Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {termsResources.map((res, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col transition hover:shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">{res.icon}
                <span className="text-xl font-semibold text-blue-700 dark:text-blue-300">{res.title}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-200 mb-4">{res.description}</p>
              <button
                onClick={() => handleResourceClick(res.path)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow w-max"
              >
                <FileText className="w-5 h-5" /> View
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{res.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Terms Content */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Terms of Service</h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-8">
          {/* ... (rest of the terms content remains the same) ... */}
        </div>
      </section>

      {/* Contact/Feedback Form */}
      <section className="mb-16">
        {/* ... (contact form remains the same) ... */}
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
          className="flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-gray-700 text-blue-700 dark:text-blue-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Mail className="w-5 h-5 mr-2" />
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default TermsOfServices;