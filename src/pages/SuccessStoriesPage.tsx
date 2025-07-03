import { Star, TrendingUp, Users, MapPin } from 'lucide-react';

const SuccessStoriesPage = () => {
  // Removed unused useInView hook

  const stories = [
    {
      type: 'story',
      name: 'Grace Wanjiku',
      role: 'Fashion Retailer',
      location: 'Nairobi, Kenya',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      beforeRevenue: 'KES 25,000',
      afterRevenue: 'KES 110,000',
      increase: '340%',
      testimonial: 'PitchPoa AI transformed how I present my fashion pieces. Now customers immediately understand the value and craftsmanship. My closing rate went from 20% to 75%!',
      story: 'Grace struggled to communicate the unique value of her handmade fashion pieces. After 3 months with PitchPoa AI, she developed compelling storytelling techniques that highlight the cultural significance and quality of her work.',
      rating: 5,
      featured: true,
    },
    {
      type: 'story',
      name: 'Samuel Njoroge',
      role: 'Electronics Vendor',
      location: 'Kampala, Uganda', 
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
      beforeRevenue: 'UGX 8M',
      afterRevenue: 'UGX 35M',
      increase: '337%',
      testimonial: 'The AI coach helped me explain complex electronics in simple terms. My customers now trust my recommendations and buy premium products confidently.',
      story: 'Samuel had excellent technical knowledge but struggled to simplify complex product features for everyday customers. PitchPoa AI taught him to use analogies and focus on benefits rather than specifications.',
      rating: 5,
      featured: true,
    },
    {
      type: 'story',
      name: 'Amina Hassan',
      role: 'Food Business Owner',
      location: 'Dar es Salaam, Tanzania',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400',
      beforeRevenue: 'TSh 12M',
      afterRevenue: 'TSh 47M',
      increase: '292%',
      testimonial: 'Learning to sell premium meals was challenging until PitchPoa AI taught me to create urgency and highlight health benefits. Now I sell out daily!',
      story: 'Amina wanted to expand from basic meals to premium healthy options but customers resisted higher prices. Through practice with PitchPoa AI, she learned to position her food as health investments.',
      rating: 5,
      featured: false,
    }
  ];

  const caseStudies = [
    {
      title: 'Maasai Market Collective',
      participants: '200 Artisan Vendors',
      location: 'Nairobi, Kenya',
      timeline: '6 months',
      revenue: 'KES 24M increase',
      growth: '450%',
      challenge: 'Artisans struggled to communicate the cultural significance and quality of their handmade items to tourists and locals.',
      solution: 'Group training sessions focused on storytelling, cultural context, and value positioning using PitchPoa AI\'s multilingual capabilities.',
      results: [
        'Average vendor revenue increased 450%',
        'Tourist satisfaction scores improved 85%',
        'Repeat customer rate increased to 67%',
        'Collective bargaining power strengthened'
      ]
    },
    {
      title: 'Kampala Tech Hub Vendors',
      participants: '150 Electronics Retailers',
      location: 'Kampala, Uganda',
      timeline: '4 months',
      revenue: 'UGX 180M increase',
      growth: '380%',
      challenge: 'Complex technical products required better explanation and customer education for successful sales.',
      solution: 'AI coaching on simplifying technical concepts, building trust, and consultative selling approaches.',
      results: [
        'Customer confidence scores up 92%',
        'Average order value increased 65%',
        'Return rates decreased 40%',
        'Premium product sales up 320%'
      ]
    }
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'story':
        return <Star className="w-6 h-6 text-yellow-400" />;
      default:
        return <Star className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-accent-500 text-white rounded-2xl mb-12 shadow-lg">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Success Stories</h1>
          <p className="mb-8 text-lg md:text-xl text-white/90">
            Discover how African entrepreneurs transformed their businesses with PitchPoa AI.
          </p>
          <a
            href="#featured"
            className="inline-block bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg shadow hover:bg-gray-100 transition-colors"
          >
            Explore Stories
          </a>
        </div>
      </section>

      {/* Featured Stories */}
      <section id="featured" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Featured Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories
            .filter((r) => r.featured)
            .map((story, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 transition hover:shadow-2xl flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  {getResourceIcon(story.type)}
                  <span className="text-lg font-semibold text-primary-700 dark:text-primary-300">
                    {story.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{story.role}</div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {story.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-2 bg-red-50 dark:bg-red-900 rounded-xl">
                    <div className="text-xs text-gray-600 dark:text-gray-300">Before</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{story.beforeRevenue}</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 dark:bg-green-900 rounded-xl">
                    <div className="text-xs text-gray-600 dark:text-gray-300">After</div>
                    <div className="text-lg font-bold text-green-600 dark:text-green-300">{story.afterRevenue}</div>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-300">{story.increase}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Revenue Increase</div>
                </div>
                <blockquote className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed mb-4">
                  "{story.testimonial}"
                </blockquote>
                <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Success Journey</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{story.story}</p>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* All Stories */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          More Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories
            .filter((r) => !r.featured)
            .map((story, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="flex items-center gap-2 mb-2">{getResourceIcon(story.type)}</div>
                <h3 className="text-lg font-bold text-primary-700 dark:text-primary-300 mb-2">{story.name}</h3>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {story.location}
                </div>
                <blockquote className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed mb-2">
                  "{story.testimonial}"
                </blockquote>
                <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-3">
                  <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">{story.story}</p>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Case Studies */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Case Studies
        </h2>
        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark-800 rounded-3xl p-8 shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Overview */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{study.title}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-primary-50 dark:bg-primary-900 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="w-5 h-5 text-primary-600" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Participants</span>
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{study.participants}</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Growth</span>
                      </div>
                      <div className="text-lg font-bold text-green-600 dark:text-green-300">{study.growth}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Challenge</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Solution</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{study.solution}</p>
                    </div>
                  </div>
                </div>
                {/* Results */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Key Results</h4>
                  <div className="space-y-4">
                    {study.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-green-600 dark:bg-green-300 rounded-full"></div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-200 text-sm">{result}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl text-white">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">{study.revenue}</div>
                      <div className="text-white/90">Total Revenue Impact</div>
                      <div className="text-sm text-white/70 mt-2">
                        Achieved in {study.timeline} • {study.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
};

export default SuccessStoriesPage;