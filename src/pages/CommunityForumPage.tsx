import React, { useState } from 'react';
import { Users, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

const featuredTopics = [
  {
    title: "Getting Started with PitchPoa AI",
    description: "Tips and guides for new users. Share your onboarding experience or ask for help!",
    replies: [
      { user: "Jane", text: "Welcome! The onboarding video was super helpful." },
      { user: "Samuel", text: "How do I reset my password?" },
      { user: "Admin", text: "Hi Samuel, you can reset your password from the account settings page." },
    ],
  },
  {
    title: "Integrating WhatsApp & Automation",
    description: "Discuss best practices for connecting WhatsApp, automating sales, and using chatbots.",
    replies: [
      { user: "Amina", text: "The WhatsApp integration is seamless!" },
      { user: "John", text: "Can I automate follow-up messages?" },
      { user: "Support", text: "Yes, you can set up automated flows in the dashboard." },
    ],
  },
  {
    title: "AI for African Entrepreneurs",
    description: "Share your story, ask questions, and connect with other business owners across Africa.",
    replies: [
      { user: "Kwame", text: "AI has helped me close more deals this month." },
      { user: "Fatima", text: "Is there a local community group for Kenya?" },
      { user: "Admin", text: "Yes! Join our WhatsApp group for Kenyan entrepreneurs." },
    ],
  },
];

const CommunityForumPage: React.FC = () => {
  const [openTopic, setOpenTopic] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenTopic(openTopic === idx ? null : idx);
  };

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-700 to-blue-400 text-white rounded-2xl mb-12 shadow-lg">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <Users className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Community Forum</h1>
          <p className="mb-6 text-lg md:text-xl text-white/90">
            Connect, share, and learn with other PitchPoa AI users. Ask questions, get answers, and grow your business together.
          </p>
        </div>
      </section>

      {/* Forum Actions */}
      <section className="mb-10">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <div className="flex-1 flex items-center bg-white dark:bg-dark-800 rounded-lg shadow px-4 py-2">
            {/* Search bar placeholder */}
            <input
              type="text"
              placeholder="Search topics, questions, or users..."
              className="w-full bg-transparent outline-none text-gray-900 dark:text-white"
              disabled
            />
          </div>
          <button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition"
            disabled
          >
            New Post
          </button>
        </div>
        <div className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          <span className="font-semibold">Note:</span> Community posting and search features are coming soon!
        </div>
      </section>

      {/* Featured Topics with expandable replies */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Featured Topics</h2>
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow p-6 space-y-4">
          {featuredTopics.map((topic, idx) => (
            <div key={topic.title} className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <button
                className="w-full flex justify-between items-center text-left focus:outline-none"
                onClick={() => handleToggle(idx)}
              >
                <div>
                  <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-1">{topic.title}</h3>
                  <p className="text-gray-700 dark:text-gray-200 mb-1">{topic.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <MessageCircle className="w-4 h-4" /> {topic.replies.length} replies
                  </div>
                </div>
                {openTopic === idx ? (
                  <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-600" />
                )}
              </button>
              {openTopic === idx && (
                <div className="mt-3 pl-2 border-l-2 border-blue-200 dark:border-blue-700">
                  {topic.replies.map((reply, rIdx) => (
                    <div key={rIdx} className="mb-2">
                      <span className="font-semibold text-blue-700 dark:text-blue-300">{reply.user}:</span>{' '}
                      <span className="text-gray-700 dark:text-gray-200">{reply.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Community Guidelines</h2>
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow p-6">
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200 space-y-2">
            <li>Be respectful and supportive to all members.</li>
            <li>No spam, advertising, or self-promotion.</li>
            <li>Keep discussions relevant to PitchPoa AI and business growth.</li>
            <li>Protect your privacy and do not share sensitive information.</li>
            <li>Report inappropriate content to moderators.</li>
          </ul>
        </div>
      </section>

      {/* Contact Support */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Need Help?</h2>
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow p-6">
          <p className="text-gray-700 dark:text-gray-200 mb-2">
            If you have urgent questions or need technical support, please contact our team directly at{' '}
            <a href="mailto:support@pitchpoa.com" className="text-blue-700 dark:text-blue-300 underline">support@pitchpoa.com</a>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default
CommunityForumPage;