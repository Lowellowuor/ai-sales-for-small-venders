import React from 'react';
import { PlayCircle, Video, Search, BookOpen, Users, HelpCircle, FileText, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const trainingVideos = [
  {
    title: "Getting Started with PitchPoa AI",
    description: "A step-by-step walkthrough for new users to set up and start using the platform.",
    url: "https://www.youtube.com/watch?v=example1"
  },
  {
    title: "How to Use WhatsApp Integration",
    description: "Learn how to connect and automate your sales process with WhatsApp.",
    url: "https://www.youtube.com/watch?v=example2"
  },
  {
    title: "AI Sales Coaching in Action",
    description: "See real examples of AI-powered sales coaching and feedback.",
    url: "https://www.youtube.com/watch?v=example3"
  },
  {
    title: "Advanced Analytics & Reporting",
    description: "Unlock insights with our analytics dashboard and reporting tools.",
    url: "https://www.youtube.com/watch?v=example4"
  }
];

const TrainingVideosPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-700 to-blue-400 text-white rounded-2xl mb-12 shadow-lg">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <PlayCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Training Videos</h1>
          <p className="mb-6 text-lg md:text-xl text-white/90">
            Watch our expert-led video tutorials to master PitchPoa AI. Learn at your own pace and boost your business skills.
          </p>
        </div>
      </section>

      {/* Search Bar (future feature) */}
      <section className="mb-8">
        <div className="flex items-center bg-white dark:bg-dark-800 rounded-lg shadow px-4 py-2 max-w-lg mx-auto">
          <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search training videos..."
            className="w-full bg-transparent outline-none text-gray-900 dark:text-white"
            disabled
          />
        </div>
        <div className="text-gray-600 dark:text-gray-400 text-sm text-center mt-2">
          <span className="font-semibold">Note:</span> Video search is coming soon!
        </div>
      </section>

      {/* Video List */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Featured Tutorials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trainingVideos.map((video, idx) => (
            <a
              key={idx}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-dark-800 rounded-xl shadow p-6 flex flex-col hover:shadow-lg transition group"
            >
              <div className="flex items-center mb-3">
                <Video className="w-8 h-8 text-blue-600 group-hover:text-blue-800 dark:group-hover:text-blue-400 mr-3" />
                <span className="font-bold text-blue-700 dark:text-blue-300 text-lg">{video.title}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-200 mb-2">{video.description}</p>
              <span className="inline-block mt-auto text-blue-600 dark:text-blue-300 font-semibold hover:underline">
                Watch Video &rarr;
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Learning Resources with Navigation Buttons */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">More Learning Resources</h2>
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow p-6 flex flex-col gap-4">
          <button
            onClick={() => navigate('/help-center')}
            className="flex items-center gap-3 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            <HelpCircle className="w-5 h-5" />
            Help Center
          </button>
          <button
            onClick={() => navigate('/api-documentation')}
            className="flex items-center gap-3 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
          >
            <FileText className="w-5 h-5" />
            API Documentation
          </button>
          <button
            onClick={() => navigate('/community-forum')}
            className="flex items-center gap-3 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
          >
            <Users className="w-5 h-5" />
            Community Forum
          </button>
          <button
            onClick={() => navigate('/contact-support')}
            className="flex items-center gap-3 px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition"
          >
            <Mail className="w-5 h-5" />
            Contact Support
          </button>
        </div>
        </section>
        {/* Additional Resources */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="/resources/whatsapp-tips.pdf"
              download
              className="bg-white dark:bg-dark-800 rounded-xl shadow p-5 hover:shadow-lg transition flex items-center gap-3"
            >
              <BookOpen className="w-6 h-6 text-green-600" />
              <span className="font-semibold text-green-700 dark:text-green-300">WhatsApp Sales Tips</span>
            </a>
            <a
              href="/resources/sales-coaching-guide.pdf"
              download
              className="bg-white dark:bg-dark-800 rounded-xl shadow p-5 hover:shadow-lg transition flex items-center gap-3"
            >
              <FileText className="w-6 h-6 text-blue-600" />
              <span className="font-semibold text-blue-700 dark:text-blue-300">AI Sales Coaching Guide</span>
            </a>
          </div>
        </section>
        {/* Footer */}
        <footer className="text-center text-gray-600 dark:text-gray-400 text-sm mt-12">
          &copy; {new Date().getFullYear()} PitchPoa AI. All rights reserved.
        </footer>
    </div>
    );
}
export default TrainingVideosPage;
