import React from 'react';
import { Download, Video, FileText, Lightbulb, Users, MessageCircle } from 'lucide-react';

const resources = [
  {
    type: 'guide',
    title: 'Complete Sales Pitch Guide',
    description: 'Master persuasive selling with culturally relevant techniques for African entrepreneurs. Includes pitch structure, objection handling, and closing strategies.',
    file: '/downloads/sales-pitch-guide.pdf',
    fileType: 'PDF',
    details: '18 pages · Practical examples for African markets',
    featured: true,
  },
  {
    type: 'template',
    title: 'Sales Script Templates',
    description: 'Editable scripts for 15 industries, perfect for phone, WhatsApp, or in-person sales. Tailored for African markets.',
    file: '/downloads/sales-script-templates.docx',
    fileType: 'DOCX',
    details: '15 scripts · Easy to customize',
    featured: false,
  },
  {
    type: 'video',
    title: 'WhatsApp Sales Mastery Course',
    description: 'Free video course on leveraging WhatsApp for business growth and customer engagement. Step-by-step sales process.',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    details: 'Free video · 2h 30m · Step-by-step WhatsApp sales',
    featured: true,
  },
];

const getResourceIcon = (type: string) => {
  switch (type) {
    case 'video':
      return <Video className="w-6 h-6 text-red-500" />;
    case 'guide':
      return <FileText className="w-6 h-6 text-primary-500" />;
    case 'template':
      return <Download className="w-6 h-6 text-green-500" />;
    default:
      return <FileText className="w-6 h-6 text-gray-400" />;
  }
};

const SalesTrainingPage: React.FC = () => (
  <div className="pt-20 px-4 max-w-7xl mx-auto">
    {/* Hero Section */}
    <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-400 text-white rounded-2xl mb-12 shadow-lg">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Sales Training Resources</h1>
        <p className="mb-8 text-lg md:text-xl text-white/90">
          Unlock your sales potential with expertly crafted guides, templates, and video courses—designed for African entrepreneurs to thrive in today’s market.
        </p>
        <a
          href="#featured"
          className="inline-block bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg shadow hover:bg-gray-100 transition-colors"
        >
          Explore Resources
        </a>
      </div>
    </section>

    {/* Featured Resources */}
    <section id="featured" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Featured Sales Training Resources
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
                <span className="text-lg font-semibold text-primary-700 dark:text-primary-300">
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
              ) : (
                <a
                  href={resource.file}
                  download
                  className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow w-max"
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
        All Sales Training Resources
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
              <h3 className="text-lg font-bold text-primary-700 dark:text-primary-300 mb-2">{resource.title}</h3>
              <p className="text-gray-700 dark:text-gray-200 mb-3">{resource.description}</p>
              <a
                href={resource.file}
                download
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow w-max"
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
        <Users className="w-6 h-6 text-purple-500" /> Advanced Sales Strategies
      </h2>
      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 mb-4 transition hover:shadow-2xl">
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200 space-y-2">
          <li>
            <span className="font-semibold">Segment your leads:</span> Use CRM or spreadsheets to group prospects and tailor your approach.
          </li>
          <li>
            <span className="font-semibold">Automate follow-ups:</span> Use reminders or automation tools to never miss a sales opportunity.
          </li>
          <li>
            <span className="font-semibold">Personalized offers:</span> Use customer data to craft offers that resonate and convert.
          </li>
          <li>
            <span className="font-semibold">Leverage testimonials:</span> Share real customer stories to build trust and credibility.
          </li>
          <li>
            <span className="font-semibold">Continuous learning:</span> Stay updated with the latest sales trends and tools.
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
            <span className="font-semibold">Active listening:</span> Understand your customer’s needs before pitching.
          </li>
          <li>
            <span className="font-semibold">Prompt responses:</span> Reply quickly to inquiries to build trust.
          </li>
          <li>
            <span className="font-semibold">Value-driven communication:</span> Share tips, insights, and resources—not just sales offers.
          </li>
          <li>
            <span className="font-semibold">Feedback loops:</span> Ask for feedback to improve your sales process and products.
          </li>
          <li>
            <span className="font-semibold">Relationship building:</span> Follow up after the sale to nurture long-term loyalty.
          </li>
        </ul>
      </div>
    </section>

    {/* Quick Tips */}
    <section>
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
        <Lightbulb className="w-6 h-6 text-yellow-400" /> Quick Sales Tips
      </h2>
      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 transition hover:shadow-2xl">
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200 space-y-2">
          <li>Always listen more than you speak during a sales conversation.</li>
          <li>Follow up promptly with leads and customers.</li>
          <li>Personalize your pitch for each customer’s unique situation.</li>
          <li>Track your sales activities and learn from each interaction.</li>
          <li>Practice your pitch regularly to build confidence.</li>
          <li>Use storytelling to make your product memorable.</li>
          <li>Ask open-ended questions to understand your customer better.</li>
        </ul>
      </div>
    </section>

    {/* Call to Action */}
    <section className="mt-16 text-center">
      <div className="inline-block bg-primary-600 dark:bg-primary-500 text-white px-8 py-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
        <h3 className="text-2xl font-bold mb-2">Ready to boost your sales?</h3>
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
export default SalesTrainingPage;