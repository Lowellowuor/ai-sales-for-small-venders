import React from 'react';
import { Cpu, Cloud, Shield, TrendingUp, Users, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const aiTechResources = [
  {
    icon: <Cpu className="w-8 h-8 text-blue-600" />,
    title: "AI for Business Growth",
    description: "Discover how artificial intelligence can automate tasks, analyze data, and personalize customer experiences. Learn practical AI applications for small businesses.",
    link: "/resources/ai-for-business-growth",
    fileType: "Guide",
    details: "AI use cases · Automation checklist · ROI calculator"
  },
  {
    icon: <Cloud className="w-8 h-8 text-purple-600" />,
    title: "Cloud Tools & Digital Platforms",
    description: "Leverage cloud solutions for storage, collaboration, and scaling your business. Includes guides on choosing the right platforms and migrating your data securely.",
    link: "/resources/cloud-tools-and-digital-platforms",
    fileType: "Guide",
    details: "Cloud migration · Platform comparison · Security tips"
  },
  {
    icon: <Shield className="w-8 h-8 text-red-500" />,
    title: "Cybersecurity Essentials",
    description: "Protect your business from cyber threats. Learn about data privacy, secure payments, and best practices for online safety.",
    link: "/resources/cybersecurity-essentials",
    fileType: "Guide",
    details: "Security checklist · Fraud prevention · Data privacy"
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-green-600" />,
    title: "Digital Marketing & Analytics",
    description: "Grow your business with digital marketing strategies powered by AI. Understand analytics, SEO, and social media automation.",
    link: "/resources/digital-marketing-and-analytics",
    fileType: "Guide",
    details: "SEO guide · Analytics tools · Social automation"
  },
  {
    icon: <Users className="w-8 h-8 text-orange-500" />,
    title: "Building Tech Teams",
    description: "Learn how to hire, train, and manage tech talent. Includes remote work tips, upskilling, and fostering innovation.",
    link: "/resources/building-tech-teams",
    fileType: "Guide",
    details: "Hiring templates · Upskilling roadmap · Remote work"
  }
];

const AITechnologyPage: React.FC = () => {
  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-700 to-blue-400 text-white rounded-2xl mb-12 shadow-lg">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">AI & Technology Resources</h1>
          <p className="mb-8 text-lg md:text-xl text-white/90">
            Discover how artificial intelligence and modern technology can help you grow your business, automate sales, and reach more customers in Africa. Stay ahead with the latest global trends in AI, automation, and digital transformation.
          </p>
          <a
            href="#ai-tech-resources"
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-4 rounded-lg shadow hover:bg-gray-100 transition-colors"
          >
            Explore AI & Tech Resources
          </a>
        </div>
      </section>

      {/* AI & Tech Resource Cards */}
      <section id="ai-tech-resources" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Essential AI & Technology Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {aiTechResources.map((res, idx) => (
            <Link
              to={res.link}
              key={idx}
              className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 flex flex-col transition hover:shadow-2xl hover:transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                {res.icon}
                <span className="text-xl font-semibold text-blue-700 dark:text-blue-300">{res.title}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-200 mb-4">{res.description}</p>
              <div className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow w-max mt-auto">
                <Download className="w-5 h-5" /> View {res.fileType}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{res.details}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Webinar */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Featured Webinar</h2>
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow p-6 mb-4">
          <h3 className="text-xl font-bold mb-2 text-blue-700 dark:text-blue-300">AI-Powered Sales Training: The Future is Now</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Discover how AI is revolutionizing sales training across Africa. Learn about:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200 mb-2">
            <li>Using chatbots to answer customer questions 24/7</li>
            <li>Automating follow-ups and reminders</li>
            <li>Personalizing offers with AI-driven insights</li>
            <li>Tracking sales performance with smart analytics</li>
            <li>Leveraging generative AI for content creation and marketing</li>
            <li>Integrating AI with WhatsApp, Facebook, and e-commerce platforms</li>
          </ul>
          <a
            href="#"
            className="text-blue-700 dark:text-blue-300 hover:underline font-medium"
          >
            Watch Webinar
          </a>
        </div>
      </section>

      {/* AI Tools for Small Businesses */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">AI Tools for Small Businesses</h2>
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow p-6">
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200 space-y-2">
            <li>
              <span className="font-semibold">Chatbots:</span> Automate customer support and lead generation on WhatsApp, Facebook, and your website.
            </li>
            <li>
              <span className="font-semibold">Email Automation:</span> Send personalized emails and follow-ups without manual work.
            </li>
            <li>
              <span className="font-semibold">Sales Analytics:</span> Use AI to analyze your sales data and find new growth opportunities.
            </li>
            <li>
              <span className="font-semibold">Voice Assistants:</span> Use voice commands to manage tasks and get business updates.
            </li>
            <li>
              <span className="font-semibold">AI Content Creation:</span> Generate marketing copy, product descriptions, and social media posts in seconds.
            </li>
            <li>
              <span className="font-semibold">Inventory & Supply Chain AI:</span> Predict demand, optimize stock, and reduce losses with AI-powered forecasting.
            </li>
            <li>
              <span className="font-semibold">AI for Payments & Fraud Detection:</span> Secure your transactions and detect suspicious activity in real time.
            </li>
          </ul>
        </div>
      </section>

      {/* AI Trends & Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">AI Trends & Best Practices</h2>
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow p-6">
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200 space-y-2">
            <li>
              <span className="font-semibold">Responsible AI:</span> Ensure your AI tools are ethical, unbiased, and respect customer privacy.
            </li>
            <li>
              <span className="font-semibold">AI Integration:</span> Connect AI with your CRM, e-commerce, and marketing platforms for seamless workflows.
            </li>
            <li>
              <span className="font-semibold">Continuous Learning:</span> Stay updated with the latest AI advancements and train your team regularly.
            </li>
            <li>
              <span className="font-semibold">Global & Local Trends:</span> Leverage AI for cross-border business, language translation, and local market insights.
            </li>
            <li>
              <span className="font-semibold">Data Security:</span> Protect your business and customer data with robust cybersecurity practices.
            </li>
          </ul>
        </div>
      </section>

      {/* Quick Tips */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Quick Tips</h2>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200 space-y-2">
          <li>Start small: Try one AI tool at a time and measure its impact.</li>
          <li>Use free trials to test if a tool fits your business needs.</li>
          <li>Stay updated: Follow tech blogs and communities for the latest trends.</li>
          <li>Train your team to use new technology effectively.</li>
          <li>Network with other entrepreneurs to share AI success stories and lessons.</li>
        </ul>
      </section>

      {/* CTA Section */}
      <section className="mt-16 text-center">
        <div className="inline-block bg-primary-600 dark:bg-primary-500 text-white px-8 py-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <h3 className="text-2xl font-bold mb-2">Ready to write your success story?</h3>
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
}

export default AITechnologyPage;