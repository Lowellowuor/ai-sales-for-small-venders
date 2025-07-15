import { FileText, Scale, Gavel, AlertTriangle, HelpCircle, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfServiceExplained = () => {
  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FileText className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Terms of Service Explained</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          A clear summary of our terms, including user responsibilities, acceptable use, and dispute resolution.
        </p>
      </div>

      {/* Three Key Sections */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* User Responsibilities */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <Scale className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold">Your Responsibilities</h2>
          </div>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Provide accurate information
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Keep credentials secure
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Comply with all laws
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Pay fees on time (if applicable)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Maintain device security
            </li>
          </ul>
        </div>

        {/* Acceptable Use */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-lg border-t-4 border-orange-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold">Acceptable Use</h2>
          </div>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-orange-600">•</span> No illegal activities
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600">•</span> No service disruption
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600">•</span> No reverse engineering
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600">•</span> No automated scraping
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600">•</span> No harmful content
            </li>
          </ul>
        </div>

        {/* Dispute Resolution */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-lg border-t-4 border-purple-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
              <Gavel className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold">Dispute Resolution</h2>
          </div>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-purple-600">•</span> Informal negotiation first
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600">•</span> Mediation if unresolved
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600">•</span> Binding arbitration option
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600">•</span> No class actions
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600">•</span> [Your Country] law applies
            </li>
          </ul>
        </div>
      </div>

      {/* Key Terms Section */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-8 mb-12">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Terms Summary</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Our Responsibilities</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span> Provide services as described
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span> Maintain service availability
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span> Protect your data
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Limitations</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span> Service provided "as is"
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span> Limited liability
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span> May terminate accounts
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-blue-600" /> Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">1. Can I cancel my account anytime?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Yes, you may cancel your account at any time through your account settings. Paid subscriptions will remain active until the end of the current billing period.
            </p>
          </div>
          
          <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">2. What happens if I violate the terms?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Depending on the severity, we may issue a warning, temporarily suspend your account, or permanently terminate your access. Serious violations may result in legal action.
            </p>
          </div>
          
          <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">3. How are disputes resolved?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We first attempt to resolve disputes informally. If unsuccessful, disputes are resolved through binding arbitration in [Your Country], with each party bearing their own costs.
            </p>
          </div>
        </div>
      </div>

      {/* Download & Contact */}
      <div className="text-center">
        <div className="inline-block bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Full Terms of Service</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Review our complete Terms of Service document for all legal details and conditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/terms-of-service.pdf"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow inline-flex items-center justify-center gap-2"
              download
            >
              <Download className="w-5 h-5" /> Download PDF
            </Link>
            <Link
              to="/contact/legal"
              className="bg-white dark:bg-dark-700 hover:bg-gray-100 dark:hover:bg-dark-600 text-gray-800 dark:text-white px-6 py-3 rounded-lg font-medium shadow inline-flex items-center justify-center gap-2"
            >
              Contact Legal Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsOfServiceExplained;