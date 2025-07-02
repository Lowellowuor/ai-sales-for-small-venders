import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Video, Users, Download, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResourcesPage = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = [
    { name: 'All Resources', count: 156, active: true },
    { name: 'Sales Training', count: 45, active: false },
    { name: 'WhatsApp Tips', count: 23, active: false },
    { name: 'Success Stories', count: 34, active: false },
    { name: 'Business Growth', count: 28, active: false },
    { name: 'AI & Technology', count: 26, active: false },
  ];

  const resources = [
    {
      type: 'guide',
      title: 'Complete Sales Pitch Guide for African Entrepreneurs',
      description: 'Master the art of persuasive selling with culturally relevant techniques.',
      readTime: '15 min read',
      downloads: '12.5K',
      category: 'Sales Training',
      featured: true
    },
    {
      type: 'video',
      title: 'WhatsApp Sales Mastery Course',
      description: 'Learn to leverage WhatsApp for business growth and customer engagement.',
      duration: '2h 30m',
      views: '45K',
      category: 'WhatsApp Tips',
      featured: true
    },
    {
      type: 'webinar',
      title: 'AI-Powered Sales Training: The Future is Now',
      description: 'Discover how AI is revolutionizing sales training across Africa.',
      duration: '1h 15m',
      attendees: '8.2K',
      category: 'AI & Technology',
      featured: false
    },
    {
      type: 'case-study',
      title: 'How Grace Increased Sales by 340% in 3 Months',
      description: 'Detailed breakdown of a fashion retailer\'s transformation journey.',
      readTime: '8 min read',
      shares: '2.1K',
      category: 'Success Stories',
      featured: false
    },
    {
      type: 'template',
      title: 'Sales Script Templates for 15 Industries',
      description: 'Ready-to-use scripts customized for African market contexts.',
      downloads: '18.7K',
      category: 'Sales Training',
      featured: false
    },
    {
      type: 'guide',
      title: 'Building Customer Trust in Digital Sales',
      description: 'Strategies for establishing credibility in online interactions.',
      readTime: '12 min read',
      downloads: '9.3K',
      category: 'Business Growth',
      featured: false
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
        return 'bg-red-100 text-red-600';
      case 'guide':
      case 'case-study':
        return 'bg-blue-100 text-blue-600';
      case 'template':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-accent-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories & Filters */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    category.active
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Filter Button */}
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Resources</h2>
            <p className="text-gray-600">Our most popular and impactful training materials</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {resources.filter(r => r.featured).map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getResourceColor(resource.type)}`}>
                    {React.createElement(getResourceIcon(resource.type), { className: 'w-6 h-6' })}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                        {resource.category}
                      </span>
                      <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
                        Featured
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {resource.readTime && <span>{resource.readTime}</span>}
                        {resource.duration && <span>{resource.duration}</span>}
                        {resource.downloads && <span>{resource.downloads} downloads</span>}
                        {resource.views && <span>{resource.views} views</span>}
                      </div>
  <button
    className="text-primary-600 hover:text-primary-700 font-medium"
    onClick={() => navigate('/signup')}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">All Resources</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.filter(r => !r.featured).map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getResourceColor(resource.type)}`}>
                    {React.createElement(getResourceIcon(resource.type), { className: 'w-5 h-5' })}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                      {resource.category}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {resource.readTime && <span>{resource.readTime}</span>}
                    {resource.duration && <span>{resource.duration}</span>}
                    {resource.downloads && <span>{resource.downloads} downloads</span>}
                  </div>
                  <button
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    onClick={() => alert('view!')}
                  >
                    View →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Join Our Learning Community
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Connect with 50,000+ African entrepreneurs, share experiences, 
                and learn from each other's success stories.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  'Weekly live training sessions',
                  'Peer-to-peer learning groups',
                  'Expert Q&A sessions',
                  'Resource sharing and collaboration'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
<button
  className="bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
  onClick={() => alert('Join Community clicked!')}
>
  Join Community
</button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl p-8 text-white"
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Stay Updated with New Resources
            </h2>
            <p className="text-gray-600 mb-8">
              Get weekly sales tips, new training materials, and success stories delivered to your inbox
            </p>
            
            <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
                onClick={() => alert('Subscribed!')}
              >
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;