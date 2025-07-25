import React, { useState } from 'react'; // Added useState for newsletter feedback
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Video, Users, Download, Search, Filter, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResourcesPage = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State for newsletter subscription feedback
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  // Define your live image URL for the Resource Hub hero here
  const resourceHubHeroImageUrl = 'https://images.pexels.com/photos/259165/pexels-photo-259165.jpeg'; // <--- IMPORTANT: Replace with your actual live image URL

  const categories = [
    { name: 'All Resources', count: 5, route: '/resources', active: true },
    { name: 'Sales Training', count: 1, route: '/resources/sales-training', active: false },
    { name: 'WhatsApp Tips', count: 1, route: '/resources/whatsapp-tips', active: false },
    { name: 'Success Stories', count: 1, route: '/resources/success-stories', active: false },
    { name: 'Business Growth', count: 1, route: '/resources/business-growth', active: false },
    { name: 'AI & Technology', count: 1, route: '/resources/ai-technology', active: false },
  ];

  const resources = [
    {
      type: 'guide',
      title: 'Complete Sales Pitch Guide for African Entrepreneurs',
      description: 'Master the art of persuasive selling with culturally relevant techniques.',
      readTime: '15 min read',
      downloads: '12.5K',
      category: 'Sales Training',
      featured: true,
      path: '/resources/sales-pitch-guide-info', // Corrected and specific path
    },
    {
      type: 'video',
      title: 'WhatsApp Sales Mastery Course',
      description: 'Learn to leverage WhatsApp for business growth and customer engagement.',
      duration: '2h 30m',
      views: '45K',
      category: 'WhatsApp Tips',
      featured: true,
      path: '/resources/whatsapp-sales-guide-info', // Corrected typo and specific path
    },
    {
      type: 'webinar',
      title: 'AI-Powered Sales Training: The Future is Now',
      description: 'Discover how AI is revolutionizing sales training across Africa.',
      duration: '1h 15m',
      attendees: '8.2K',
      category: 'AI & Technology',
      featured: false,
      path: '/resources/ai-technology',
    },
    {
      type: 'case-study',
      title: 'How Grace Increased Sales by 340% in 3 Months',
      description: 'Detailed breakdown of a fashion retailer\'s transformation journey.',
      readTime: '8 min read',
      shares: '2.1K',
      category: 'Success Stories',
      featured: false,
      path: '/success-stories', // Navigates to the general success stories page
    },
    {
      type: 'template',
      title: 'Sales Script Templates for 15 Industries',
      description: 'Ready-to-use scripts customized for African market contexts.',
      downloads: '18.7K',
      category: 'Sales Training',
      featured: false,
      path: '/resources/sales-script-templates-info', // Added specific path
    },
    {
      type: 'guide',
      title: 'Building Customer Trust in Digital Sales',
      description: 'Strategies for establishing credibility in online interactions.',
      readTime: '12 min read',
      downloads: '9.3K',
      category: 'Business Growth',
      featured: false,
      path: '/resources/business-growth', // Added specific path
    }
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
      case 'webinar':
        return Video;
      case 'guide':
      case 'case-study':
        return BookOpen;
      case 'template':
        return Download;
      default:
        return BookOpen;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'video':
      case 'webinar':
        return 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300';
      case 'guide':
      case 'case-study':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300';
      case 'template':
        return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const handleNewsletterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError(null);
    if (!newsletterEmail.trim()) {
      setNewsletterError("Email cannot be empty.");
      return;
    }
    // In a real app, you'd send this email to your backend
    console.log("Subscribing email:", newsletterEmail);
    setNewsletterSubscribed(true);
    setNewsletterEmail(''); // Clear input
    // Simulate API call success
    // setTimeout(() => { setNewsletterSubscribed(true); }, 500);
  };

  return (
    <div className="pt-20 bg-white dark:bg-gray-900 transition-colors duration-300"> {/* Adjusted dark mode class */}
      {/* Hero Section - Sales Training Resource Hub */}
      <section className="py-20 text-white relative overflow-hidden">
        {/* Background Image Container */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${resourceHubHeroImageUrl}')` }}
        >
          {/* Optional: Overlay for better text readability */}
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sales Training
              <span className="block text-yellow-300">Resource Hub</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Free guides, templates, and training materials to accelerate your sales success
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources, guides, templates..."
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none bg-white dark:bg-gray-800" // Adjusted dark mode class
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories & Filters */}
      <section className="py-12 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700"> {/* Adjusted dark mode class */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    category.active
                      ? 'bg-blue-500 text-white' // Adjusted color
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600' // Adjusted dark mode class
                  }`}
                  onClick={() => navigate(category.route)}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Filter Button */}
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"> {/* Adjusted dark mode class */}
              <Filter className="w-4 h-4 text-blue-600 dark:text-blue-300" /> {/* Adjusted color */}
              <span className="text-blue-600 dark:text-blue-300">Filter</span> {/* Adjusted color */}
            </button>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800"> {/* Adjusted dark mode class */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Resources</h2>
            <p className="text-gray-600 dark:text-gray-300">Our most popular and impactful training materials</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {resources.filter(r => r.featured).map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow" // Adjusted dark mode class
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getResourceColor(resource.type)}`}>
                    {React.createElement(getResourceIcon(resource.type), { className: 'w-6 h-6' })}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 dark:bg-gray-700 px-2 py-1 rounded"> {/* Adjusted color */}
                        {resource.category}
                      </span>
                      <span className="text-xs font-medium text-orange-600 bg-orange-50 dark:bg-gray-700 px-2 py-1 rounded"> {/* Adjusted dark mode class */}
                        Featured
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{resource.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{resource.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        {resource.readTime && <span>{resource.readTime}</span>}
                        {resource.duration && <span>{resource.duration}</span>}
                        {resource.downloads && <span>{resource.downloads} downloads</span>}
                        {resource.views && <span>{resource.views} views</span>}
                      </div>
                      <button
                        className="text-blue-600 hover:text-blue-700 font-medium" // Adjusted color
                        onClick={() => resource.path && navigate(resource.path)} // Navigate to path if it exists
                      >
                        Access Now →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* All Resources Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">All Resources</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.filter(r => !r.featured).map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow" // Adjusted dark mode class
              >
                <div className="flex items-start space-x-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getResourceColor(resource.type)}`}>
                    {React.createElement(getResourceIcon(resource.type), { className: 'w-5 h-5' })}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 dark:bg-gray-700 px-2 py-1 rounded"> {/* Adjusted color */}
                      {resource.category}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{resource.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{resource.description}</p>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {resource.readTime && <span>{resource.readTime}</span>}
                    {resource.duration && <span>{resource.duration}</span>}
                    {resource.downloads && <span>{resource.downloads} downloads</span>}
                  </div>
                  <button
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium" // Adjusted color
                    onClick={() => resource.path && navigate(resource.path)} // Navigate to path if it exists
                  >
                    View →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration & Integration Section */}
      <section className="py-20 bg-white dark:bg-gray-900"> {/* Adjusted dark mode class */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Collaborate & Learn More
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Connect with our community, access video tutorials, get API help, or find answers in the help center.
              </p>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => navigate('/training-videos')}
                  className="flex items-center gap-3 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                >
                  <Video className="w-5 h-5" />
                  Training Videos
                </button>
                <button
                  onClick={() => navigate('/api-documentation')}
                  className="flex items-center gap-3 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
                >
                  <BookOpen className="w-5 h-5" />
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
                  onClick={() => navigate('/help-center')}
                  className="flex items-center gap-3 px-5 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition"
                >
                  <HelpCircle className="w-5 h-5" />
                  Help Center
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-500 to-purple-500 dark:from-gray-700 dark:to-gray-500 rounded-3xl p-8 text-white" // Adjusted colors
            >
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Community Stats</h3>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">50,000+</div>
                  <div className="text-white/80 text-sm">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">1,200+</div>
                  <div className="text-white/80 text-sm">Success Stories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">15</div>
                  <div className="text-white/80 text-sm">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">98%</div>
                  <div className="text-white/80 text-sm">Satisfaction</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800"> {/* Adjusted dark mode class */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Stay Updated with New Resources
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Get weekly sales tips, new training materials, and success stories delivered to your inbox
            </p>

            {newsletterSubscribed ? (
              <div className="text-green-600 dark:text-green-400 font-semibold text-lg">
                Thank you for subscribing to our newsletter!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row max-w-md mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white" // Adjusted colors
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors" // Adjusted colors
                >
                  Subscribe
                </button>
              </form>
            )}
            {newsletterError && (
              <p className="text-red-500 text-sm mt-2">{newsletterError}</p>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
