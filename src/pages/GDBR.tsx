import { ShieldCheck, UserCheck, Lock, Mail, FileDown, ArrowUpRight } from "lucide-react";

const GDPRPage = () => (
  <div className="max-w-3xl mx-auto py-20 px-4 bg-white dark:bg-dark-900 rounded-2xl shadow-lg">
    {/* Header */}
    <div className="flex items-center mb-6">
      <ShieldCheck className="w-10 h-10 text-primary-600 dark:text-primary-400 mr-3" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">GDPR Compliance</h1>
    </div>
    <p className="mb-4 text-gray-700 dark:text-gray-300">
      Effective Date: July 1, 2025
    </p>
    <div className="flex justify-center mb-8">
      <img
        src="https://illustrations.popsy.co/gray/privacy-policy.svg"
        alt="GDPR illustration"
        className="w-40 h-40"
      />
    </div>

    {/* Introduction */}
    <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">What is GDPR?</h2>
    <p className="mb-4 text-gray-700 dark:text-gray-300">
      The General Data Protection Regulation (GDPR) is a European Union regulation that protects the privacy and personal data of individuals within the EU and EEA. PitchPoa AI is committed to full GDPR compliance and to safeguarding your data rights.
    </p>

    {/* Data Collection */}
    <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white flex items-center">
      <UserCheck className="w-5 h-5 mr-2" /> Your Data Rights
    </h2>
    <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
      <li><strong>Right to Access:</strong> You can request access to your personal data at any time.</li>
      <li><strong>Right to Rectification:</strong> You can request corrections to inaccurate or incomplete data.</li>
      <li><strong>Right to Erasure:</strong> You can request deletion of your data (“right to be forgotten”).</li>
      <li><strong>Right to Restrict Processing:</strong> You can limit how we use your data.</li>
      <li><strong>Right to Data Portability:</strong> You can request your data in a portable format.</li>
      <li><strong>Right to Object:</strong> You can object to certain types of data processing.</li>
    </ul>

    {/* Data Security */}
    <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white flex items-center">
      <Lock className="w-5 h-5 mr-2" /> Data Security & Storage
    </h2>
    <p className="mb-4 text-gray-700 dark:text-gray-300">
      We use industry-leading security measures to protect your data, including encryption, secure servers, and regular audits. PitchPoa AI is ISO 27001 certified and SOC 2 compliant.
    </p>

    {/* Lawful Basis */}
    <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">Lawful Basis for Processing</h2>
    <p className="mb-4 text-gray-700 dark:text-gray-300">
      We only process your personal data when we have a lawful basis, such as your consent, to fulfill a contract, to comply with legal obligations, or for legitimate business interests.
    </p>

    {/* International Transfers */}
    <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">International Data Transfers</h2>
    <p className="mb-4 text-gray-700 dark:text-gray-300">
      If your data is transferred outside the EU/EEA, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses or equivalent protections.
    </p>

    {/* Data Retention */}
    <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">Data Retention</h2>
    <p className="mb-4 text-gray-700 dark:text-gray-300">
      We retain your personal data only as long as necessary for the purposes stated in our Privacy Policy, or as required by law.
    </p>

    {/* Contact & Requests */}
    <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">How to Exercise Your Rights</h2>
    <p className="mb-4 text-gray-700 dark:text-gray-300">
      To exercise any of your GDPR rights, please contact us using the button below or email us at <a href="mailto:support@pitchpoa.com" className="text-primary-600 underline">support@pitchpoa.com</a>.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 mb-10">
      <a
        href="mailto:support@pitchpoa.com?subject=GDPR%20Request"
        className="flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
      >
        <Mail className="w-5 h-5 mr-2" />
        Contact Data Protection Officer
      </a>
    </div>

    {/* Additional Resources - Styled Cards */}
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Additional Resources</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="/privacy-policy"
          className="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-dark-800 hover:bg-primary-50 dark:hover:bg-dark-700 transition-colors shadow group"
        >
          <ShieldCheck className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3 group-hover:scale-110 transition-transform" />
          <span className="font-medium text-gray-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400">
            Privacy Policy
          </span>
        </a>
        <a
          href="/cookie-policy"
          className="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-dark-800 hover:bg-primary-50 dark:hover:bg-dark-700 transition-colors shadow group"
        >
          <Lock className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3 group-hover:scale-110 transition-transform" />
          <span className="font-medium text-gray-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400">
            Cookie Policy
          </span>
        </a>
        <a
          href="/terms-of-service"
          className="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-dark-800 hover:bg-primary-50 dark:hover:bg-dark-700 transition-colors shadow group"
        >
          <FileDown className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3 group-hover:scale-110 transition-transform" />
          <span className="font-medium text-gray-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400">
            Terms of Service
          </span>
        </a>
        <a
          href="https://gdpr.eu/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-dark-800 hover:bg-primary-50 dark:hover:bg-dark-700 transition-colors shadow group"
        >
          <ArrowUpRight className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3 group-hover:scale-110 transition-transform" />
          <span className="font-medium text-gray-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400">
            Learn more about GDPR
          </span>
        </a>
      </div>
    </div>
  </div>
);

export default GDPRPage;