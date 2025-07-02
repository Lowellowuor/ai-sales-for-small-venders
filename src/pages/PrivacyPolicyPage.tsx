import { ShieldCheck, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto py-20 px-4 bg-white dark:bg-dark-900 rounded-2xl shadow-lg">
      {/* Header with icon */}
      <div className="flex items-center mb-6">
        <ShieldCheck className="w-10 h-10 text-primary-600 dark:text-primary-400 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
      </div>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Effective Date: July 1, 2025
      </p>

      {/* Optional illustration */}
      <div className="flex justify-center mb-8">
        <img
          src="https://illustrations.popsy.co/gray/padlock.svg"
          alt="Privacy illustration"
          className="w-40 h-40"
        />
      </div>

      {/* Main content */}
      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">1. Introduction</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        PitchPoa AI (“we”, “us”, or “our”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">2. Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
        <li>Personal Information: Name, email address, phone number, and other contact details you provide.</li>
        <li>Usage Data: Information about how you use our website, including IP address, browser type, device information, and pages visited.</li>
        <li>Cookies and Tracking Technologies: We use cookies to enhance your experience and analyze site usage.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">3. How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
        <li>To provide and maintain our services.</li>
        <li>To communicate with you, including sending updates and marketing materials.</li>
        <li>To improve our website and services.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">4. How We Share Your Information</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
        <li>With service providers who help us operate our business.</li>
        <li>With your consent or at your direction.</li>
        <li>As required by law or to protect our rights.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">5. Data Security</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        We implement reasonable security measures to protect your information. However, no method of transmission over the Internet is 100% secure.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">6. Your Rights</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
        <li>You may access, update, or delete your personal information by contacting us.</li>
        <li>You may opt out of marketing communications at any time.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">7. Children’s Privacy</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Our services are not intended for children under 13. We do not knowingly collect personal information from children.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">8. Changes to This Policy</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">9. Contact Us</h2>
      <p className="mb-8 text-gray-700 dark:text-gray-300">
        If you have any questions about this Privacy Policy, please contact us at{' '}
        <a href="mailto:support@pitchpoa.com" className="text-primary-600 underline">support@pitchpoa.com</a>.
      </p>

      {/* Call-to-action buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
        >
          Back to Home
        </button>
        <a
          href="mailto:support@pitchpoa.com"
          className="flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-dark-700 text-primary-600 dark:text-primary-400 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
        >
          <Mail className="w-5 h-5 mr-2" />
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;