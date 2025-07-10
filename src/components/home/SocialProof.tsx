import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, Play, TrendingUp, Users } from 'lucide-react';

const SocialProof = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      name: 'Grace Wanjiku',
      role: 'Fashion Retailer',
      location: 'Nairobi, Kenya',
      avatar: 'https://images.pexels.com/photos/3848184/pexels-photo-3848184.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'PitchPoa AI helped me increase my sales by 340% in just 3 months. My customers now understand the value of my products immediately.',
      rating: 5,
      revenue: 'KES 180,000/month',
      improvement: '+340%'
    },
    {
      name: 'Samuel Njoroge',
      role: 'Electronics Vendor',
      location: 'Kampala, Uganda',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'The AI coaches me in Swahili and English perfectly. I can now handle any customer with confidence. My closing rate went from 15% to 65%.',
      rating: 5,
      revenue: 'UGX 12M/month',
      improvement: '+433%'
    },
    {
      name: 'Amina Hassan',
      role: 'Food Business Owner',
      location: 'Dar es Salaam, Tanzania',
      avatar: 'https://images.pexels.com/photos/32928926/pexels-photo-32928926.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'The WhatsApp integration is genius! I practice while serving customers. Now I sell 3x more premium meals because I know how to present value.',
      rating: 5,
      revenue: 'TSh 8.5M/month',
      improvement: '+290%'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Active Users', icon: Users },
    { number: '300%', label: 'Average Sales Increase', icon: TrendingUp },
    { number: '98%', label: 'User Satisfaction', icon: Star },
    { number: '15', label: 'Languages Supported', icon: Quote },
  ];

  const partners = [
    'Kenya Association of Manufacturers',
    'Uganda Small Business Association',
    'Tanzania Chamber of Commerce',
    'Rwanda Development Board',
    'Mastercard Foundation',
    'African Development Bank'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by 
            <span className="text-primary-500"> 50,000+ </span>
            African Entrepreneurs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real vendors, real results. See how PitchPoa AI has transformed businesses across East Africa.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Video Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              {/* Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  <p className="text-gray-500 text-xs">{testimonial.location}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                <Quote className="w-6 h-6 text-primary-500 mb-2" />
                "{testimonial.quote}"
              </blockquote>

              {/* Results */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary-600">{testimonial.revenue}</div>
                  <div className="text-xs text-gray-500">Monthly Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{testimonial.improvement}</div>
                  <div className="text-xs text-gray-500">Sales Growth</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Case Study Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl p-8 text-white mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Success Story: Maasai Market Collective
              </h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                200 artisan vendors increased their collective revenue by 450% in 6 months 
                using PitchPoa AI's group training features and cultural-specific coaching.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-3xl font-bold">KES 24M</div>
                  <div className="text-white/80 text-sm">Total Revenue Increase</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">450%</div>
                  <div className="text-white/80 text-sm">Average Growth</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="inline-flex items-center space-x-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                <Play className="w-5 h-5" />
                <span>Watch Full Case Study</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-lg font-semibold text-gray-600 mb-8">
            Trusted by Leading Organizations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60">
            {partners.map((partner, index) => (
              <div key={index} className="text-center">
                <div className="h-12 flex items-center justify-center text-gray-600 text-sm font-medium">
                  {partner}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;