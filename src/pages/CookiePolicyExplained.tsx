import { Cookie,  Settings, ListChecks, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookiePolicyExplained = () => {
  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Cookie className="w-8 h-8 text-amber-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cookie Policy</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how we use cookies to enhance your experience and how to manage your preferences.
        </p>
      </div>

      {/* Three Key Sections */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* What Are Cookies */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-lg border-t-4 border-amber-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
              <Cookie className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-xl font-bold">What Are Cookies?</h2>
          </div>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-amber-600">•</span> Small text files stored on your device
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">•</span> Created when you visit websites
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">•</span> Help remember preferences and improve experience
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">•</span> Not programs - can't execute code
            </li>
          </ul>
        </div>

        {/* How We Use Them */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <ListChecks className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold">How We Use Cookies</h2>
          </div>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Essential: Site functionality (login, cart)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Performance: Analytics & improvements
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Personalization: Remember preferences
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Marketing: Relevant ads (opt-out available)
            </li>
          </ul>
        </div>

        {/* Your Control */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-lg border-t-4 border-green-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <Settings className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold">Your Control</h2>
          </div>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span> Browser settings to block/delete
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span> Our cookie consent manager
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span> Opt-out of non-essential cookies
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span> Manage preferences anytime
            </li>
          </ul>
        </div>
      </div>

      {/* Detailed Types */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-8 mb-12">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
              <ListChecks className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cookie Types We Use</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Strictly Necessary</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Essential for website operation (e.g., authentication, security). Cannot be disabled.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Performance</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Help us understand visitor behavior (e.g., Google Analytics). Optional.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Functional</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Remember preferences (e.g., language, region). Optional but improve experience.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Targeting/Advertising</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Used by advertisers to deliver relevant ads. Fully optional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Management & Contact */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Managing Cookies</h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Browser settings (Chrome, Firefox, Safari, etc.)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Use our cookie consent banner
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Third-party opt-out tools:
              <ul className="mt-2 space-y-2 ml-6">
                <li>- <a href="https://optout.aboutads.info" className="text-blue-600 hover:underline">YourAdChoices (US)</a></li>
                <li>- <a href="https://www.youronlinechoices.com" className="text-blue-600 hover:underline">Your Online Choices (EU)</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Important Notes</h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span> Blocking all cookies may break site functionality
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span> Deleting cookies logs you out of services
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span> We never sell personal data from cookies
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span> See our <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link> for details
            </li>
          </ul>
        </div>
      </div>

      {/* Download & Contact */}
      <div className="text-center">
        <div className="inline-block bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Full Cookie Policy</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Download our complete cookie policy document for detailed technical information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cookie-policy.pdf"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow inline-flex items-center justify-center gap-2"
              download
            >
              <Download className="w-5 h-5" /> Download PDF
            </Link>
            <Link
              to="/contact/privacy"
              className="bg-white dark:bg-dark-700 hover:bg-gray-100 dark:hover:bg-dark-600 text-gray-800 dark:text-white px-6 py-3 rounded-lg font-medium shadow inline-flex items-center justify-center gap-2"
            >
              Contact Privacy Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CookiePolicyExplained ;