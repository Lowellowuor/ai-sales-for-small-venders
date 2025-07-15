import { Users, Shield, Heart, Flag, MessageSquare, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommunityGuidelines = () => {
  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Users className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Community Guidelines</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn about our community standards, anti-abuse policies, and how to contribute positively.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Community Rules Card */}
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Community Rules</h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Be respectful to all members
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> No hate speech or discrimination
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Keep discussions relevant
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> No spamming or self-promotion
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Protect everyone's privacy
            </li>
          </ul>
        </div>

        {/* Anti-Abuse Card */}
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Anti-Abuse Policies</h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span> Zero tolerance for harassment
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span> No illegal content or activities
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span> Strictly no impersonation
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span> Automated scraping prohibited
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span> Report violations immediately
            </li>
          </ul>
        </div>

        {/* Positive Engagement Card */}
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Positive Engagement</h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span> Share knowledge generously
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span> Give constructive feedback
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span> Welcome new members
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span> Credit original sources
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span> Celebrate others' success
            </li>
          </ul>
        </div>
      </div>

      {/* Reporting Section */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-8 mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0 w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
            <Flag className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Reporting Violations</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Help us maintain a safe community by reporting any guideline violations you encounter.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How to Report</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span> Click the "Report" button on content
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span> Email community@pitchpoa.com
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What to Include</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span> URL or screenshot
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span> Description of violation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="text-center">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 inline-block max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Full Community Guidelines</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Download our complete community guidelines document for detailed policies and procedures.
          </p>
          <Link
            to="/community-guidelines.pdf"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow inline-flex items-center gap-2"
            download
          >
            <Download className="w-5 h-5" /> Download PDF
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommunityGuidelines;