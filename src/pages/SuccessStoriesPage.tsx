import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, TrendingUp, Users, MapPin, Play } from 'lucide-react';

const SuccessStoriesPage = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stories = [
    {
      name: 'Grace Wanjiku',
      role: 'Fashion Retailer',
      location: 'Nairobi, Kenya',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      beforeRevenue: 'KES 25,000',
      afterRevenue: 'KES 110,000',
      increase: '340%',
      testimonial: 'PitchPoa AI transformed how I present my fashion pieces. Now customers immediately understand the value and craftsmanship. My closing rate went from 20% to 75%!',
      story: 'Grace struggled to communicate the unique value of her handmade fashion pieces. After 3 months with PitchPoa AI, she developed compelling storytelling techniques that highlight the cultural significance and quality of her work.',
      rating: 5
    },
    {
      name: 'Samuel Njoroge',
      role: 'Electronics Vendor',
      location: 'Kampala, Uganda', 
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
      beforeRevenue: 'UGX 8M',
      afterRevenue: 'UGX 35M',
      increase: '337%',
      testimonial: 'The AI coach helped me explain complex electronics in simple terms. My customers now trust my recommendations and buy premium products confidently.',
      story: 'Samuel had excellent technical knowledge but struggled to simplify complex product features for everyday customers. PitchPoa AI taught him to use analogies and focus on benefits rather than specifications.',
      rating: 5
    },
    {
      name: 'Amina Hassan',
      role: 'Food Business Owner',
      location: 'Dar es Salaam, Tanzania',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400',
      beforeRevenue: 'TSh 12M',
      afterRevenue: 'TSh 47M',
      increase: '292%',
      testimonial: 'Learning to sell premium meals was challenging until PitchPoa AI taught me to create urgency and highlight health benefits. Now I sell out daily!',
      story: 'Amina wanted to expand from basic meals to premium healthy options but customers resisted higher prices. Through practice with PitchPoa AI, she learned to position her food as health investments.',
      rating: 5
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
              Real Stories,
              <span className="block text-yellow-300">Real Success</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover how African entrepreneurs transformed their businesses with PitchPoa AI
            </p>
          </motion.div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Transformation Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how PitchPoa AI helped these entrepreneurs achieve extraordinary results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow"
              >
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <img
                      src={story.avatar}
                      alt={story.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <button 
                    onClick={() => alert('Play story video!')}
                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{story.name}</h3>
                    <p className="text-gray-600">{story.role}</p>
                    <div className="flex items-center space-x-1 text-gray-500 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{story.location}</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Results */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-red-50 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Before</div>
                    <div className="text-lg font-bold text-gray-900">{story.beforeRevenue}</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">After</div>
                    <div className="text-lg font-bold text-green-600">{story.afterRevenue}</div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary-600 mb-1">{story.increase}</div>
                  <div className="text-sm text-gray-600">Revenue Increase</div>
                </div>

                {/* Testimonial */}
                <blockquote className="text-gray-700 text-sm leading-relaxed mb-4">
                  "{story.testimonial}"
                </blockquote>

                {/* Story Details */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Success Journey</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{story.story}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Detailed Case Studies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deep dive into comprehensive transformations achieved through group training
            </p>
          </motion.div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                className="bg-white rounded-3xl p-8 shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Overview */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{study.title}</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-primary-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="w-5 h-5 text-primary-600" />
                          <span className="text-sm font-medium text-gray-700">Participants</span>
                        </div>
                        <div className="text-lg font-bold text-gray-900">{study.participants}</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium text-gray-700">Growth</span>
                        </div>
                        <div className="text-lg font-bold text-green-600">{study.growth}</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{study.solution}</p>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Key Results</h4>
                    
                    <div className="space-y-4">
                      {study.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          </div>
                          <p className="text-gray-700 text-sm">{result}</p>
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join these successful entrepreneurs and transform your sales today
            </p>
            <button 
            onClick={() => alert('Start your transformation!')}
            className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Start Your Transformation
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStoriesPage;