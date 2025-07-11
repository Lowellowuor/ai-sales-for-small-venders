import React from 'react';
import { Download, Video, FileText, Users, MessageCircle } from 'lucide-react';

const resources = [
  {
    type: 'guide',
    title: 'WhatsApp Sales Success Guide',
    description: 'Step-by-step strategies for building trust, engaging customers, and closing deals on WhatsApp. Includes global best practices and local insights.',
    file: '/downloads/whatsapp-sales-guide.pdf',
    fileType: 'PDF',
    details: '12 pages · Actionable WhatsApp sales tips',
    featured: true,
  },
  {
    type: 'template',
    title: 'WhatsApp Sales Message Templates',
    description: 'Ready-to-use message templates for greetings, follow-ups, promotions, and closing sales. Adapted for different industries and customer types.',
    file: '/downloads/whatsapp-message-templates.docx',
    fileType: 'DOCX',
    details: '20+ templates · Easy to edit and use',
    featured: false,
  },
  {
    type: 'video',
    title: 'WhatsApp Sales Mastery Video',
    description: 'Expert-led video lesson on using WhatsApp to build relationships and drive sales. Learn how to use broadcast lists, status, and automation tools.',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    details: 'Free video · 1h 45m · WhatsApp sales walkthrough',
    featured: true,
  },
];

const getResourceIcon = (type: string) => {
  switch (type) {
    case 'video':
      return <Video className="w-6 h-6 text-red-500" />;
    case 'guide':
      return <FileText className="w-6 h-6 text-green-500" />;
    case 'template':
      return <Download className="w-6 h-6 text-blue-500" />;
    default:
      return <FileText className="w-6 h-6 text-gray-400" />;
  }
};

const WhatsAppTipsPage: React.FC = () => (
  <div className="pt-20 px-4 max-w-7xl mx-auto">
    {/* Hero Section */}
    <section className="py-16 bg-gradient-to-br from-green-600 to-green-400 text-white rounded-2xl mb-12 shadow-lg">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">WhatsApp Sales Tips</h1>
        <p className="mb-8 text-lg md:text-xl text-white/90">
          Discover world-class strategies, downloadable scripts, and video lessons to help you close more sales using WhatsApp—tailored for African entrepreneurs and global best practices.
        </p>
        <a
          href="#featured"
          className="inline-block bg-white text-green-600 font-semibold px-8 py-4 rounded-lg shadow hover:bg-gray-100 transition-colors"
        >
          Explore Resources
        </a>
      </div>
    </section>

    {/* Featured Resources */}
    <section id="featured" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Featured WhatsApp Resources
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resources
          .filter((r) => r.featured)
          .map((resource, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 transition hover:shadow-2xl flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                {getResourceIcon(resource.type)}
                <span className="text-lg font-semibold text-green-700 dark:text-green-300">
                  {resource.title}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-200 mb-4">{resource.description}</p>
              {resource.type === 'video' ? (
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow w-max"
                >
                  <Video className="w-5 h-5" /> Watch Video
                </a>
              ) : resource.title === 'WhatsApp Sales Success Guide' ? (
                <a
                  href="/resources/whatsapp-sales-guide-info"
                  className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow w-max"
                >
                  <FileText className="w-5 h-5" /> View
                </a>
              ) : (
                <a
                  href={resource.file}
                  download
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow w-max"
                >
                  <Download className="w-5 h-5" /> Download {resource.fileType}
                </a>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{resource.details}</p>
            </div>
          ))}
      </div>
    </section>

    {/* All Resources */}
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        All WhatsApp Sales Resources
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {resources
          .filter((r) => !r.featured)
          .map((resource, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="flex items-center gap-2 mb-2">{getResourceIcon(resource.type)}</div>
              <h3 className="text-lg font-bold text-green-700 dark:text-green-300 mb-2">{resource.title}</h3>
              <p className="text-gray-700 dark:text-gray-200 mb-3">{resource.description}</p>
              <a
                href={resource.file}
                download
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow w-max"
              >
                <Download className="w-5 h-5" /> Download {resource.fileType}
              </a>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{resource.details}</p>
            </div>
          ))}
      </div>
    </section>

    {/* Advanced Strategies */}
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
        <Users className="w-6 h-6 text-purple-500" /> Advanced Strategies
      </h2>
      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 mb-4 transition hover:shadow-2xl">
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200 space-y-2">
          <li>
            <span className="font-semibold">Segment your audience:</span> Use WhatsApp labels to group leads, customers, and VIPs for targeted messaging.
          </li>
          <li>
            <span className="font-semibold">Automate follow-ups:</span> Use WhatsApp Business tools or third-party integrations to schedule reminders and automate responses.
          </li>
          <li>
            <span className="font-semibold">Broadcast lists:</span> Send updates and offers to multiple customers at once without creating a group.
          </li>
          <li>
            <span className="font-semibold">Rich media:</span> Share product videos, catalogs, and testimonials to increase engagement and trust.
          </li>
          <li>
            <span className="font-semibold">Integrate with CRM:</span> Connect WhatsApp with your CRM to track conversations and sales progress.
          </li>
        </ul>
      </div>
    </section>

    {/* Customer Engagement */}
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-cyan-500" /> Customer Engagement Tips
      </h2>
      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 mb-4 transition hover:shadow-2xl">
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200 space-y-2">
          <li>
            <span className="font-semibold">Personalized messages:</span> Address customers by name and tailor your messages to their preferences.
          </li>
          <li>
            <span className="font-semibold">Quick replies:</span> Use WhatsApp's quick reply feature to respond to common inquiries faster.
          </li>
          <li>
            <span className="font-semibold">Engaging content:</span> Share tips, articles, and videos that provide value to your customers.
          </li>
          <li>
            <span className="font-semibold">Feedback loops:</span> Encourage customers to share their thoughts and experiences to improve your offerings.
          </li>
          <li>
            <span className="font-semibold">Community building:</span> Create groups for customers to share ideas, ask questions, and support each other.
          </li>
        </ul>
      </div>
    </section>

    {/* Call to Action */}
    <section className="mt-16 text-center">
      <div className="inline-block bg-primary-600 dark:bg-primary-500 text-white px-8 py-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
        <h3 className="text-2xl font-bold mb-2">Ready to take your sales to the next level?</h3>
        <p className="mb-4">Join our community for exclusive resources, live training, and support from fellow entrepreneurs.</p>
        <button
          className="bg-white text-primary-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition-colors"
          onClick={() => alert('Join Community!')}
        >
          Join Now
        </button>
      </div>
    </section>
    </div>  
);
export default WhatsAppTipsPage;