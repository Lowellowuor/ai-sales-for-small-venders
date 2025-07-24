import React, { useState } from 'react';
import { HelpCircle, Search, BookOpen, Users, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const helpTopics = [
  {
    title: "Getting Started",
    description: "Learn how to set up your PitchPoa AI account and begin your journey.",
    link: "/training-videos"
  },
  {
    title: "Account & Security",
    description: "Manage your profile, password, and account security settings.",
    link: "/privacy-policy"
  },
  {
    title: "Integrations",
    description: "Connect WhatsApp and other tools to automate your sales process.",
    link: "/api-documentation"
  },
  {
    title: "Community & Support",
    description: "Join discussions, ask questions, and get help from other users.",
    link: "/community-forum"
  }
];

const HelpCenterPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredTopics = helpTopics.filter(topic =>
    topic.title.toLowerCase().includes(search.toLowerCase()) ||
    topic.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-700 to-blue-400 text-white rounded-2xl mb-12 shadow-lg">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <HelpCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Help Center</h1>
          <p className="mb-6 text-lg md:text-xl text-white/90">
            Find answers, guides, and resources to get the most out of PitchPoa AI. We're here to help you succeed!
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="mb-8">
        <div className="flex items-center bg-white dark:bg-dark-800 rounded-lg shadow px-4 py-2 max-w-lg mx-auto">
          <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search help topics..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-900 dark:text-white"
          />
        </div>
      </section>

      {/* Help Topics */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Popular Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTopics.map((topic, idx) => (
            <button
              key={idx}
              onClick={() => navigate(topic.link)}
              className="bg-white dark:bg-dark-800 rounded-xl shadow p-6 flex flex-col hover:shadow-lg transition group text-left"
            >
              <div className="flex items-center mb-3">
                <BookOpen className="w-7 h-7 text-blue-600 group-hover:text-blue-800 dark:group-hover:text-blue-400 mr-3" />
                <span className="font-bold text-blue-700 dark:text-blue-300 text-lg">{topic.title}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-200">{topic.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Community & Support */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Still Need Help?</h2>
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow p-6 flex flex-col gap-4">
          <button
            onClick={() => navigate('/community-forum')}
            className="flex items-center gap-3 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
          >
            <Users className="w-5 h-5" />
            Visit Community Forum
          </button>
          <button
            onClick={() => navigate('/contact-support')}
            className="flex items-center gap-3 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            <Mail className="w-5 h-5" />
            Contact Support
          </button>
        </div>
      </section>
    </div>
  );
};

export
  default HelpCenterPage;