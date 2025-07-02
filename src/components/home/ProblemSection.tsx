import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingDown, Users, AlertTriangle, Clock } from 'lucide-react';

const ProblemSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const problems = [
    {
      icon: TrendingDown,
      stat: '70%',
      title: 'Lost Sales',
      description: 'African vendors lose 7 out of 10 potential sales due to poor pitch delivery',
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
    },
    {
      icon: Clock,
      stat: '3 Hours',
      title: 'Learning Time',
      description: 'Average time to master basic sales techniques without proper guidance',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      icon: Users,
      stat: '85%',
      title: 'Need Training',
      description: 'Small business owners want sales training but lack access to quality resources',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: AlertTriangle,
      stat: 'KES 50K',
      title: 'Monthly Loss',
      description: 'Average monthly revenue loss due to ineffective sales conversations',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            The Hidden Cost of 
            <span className="text-red-500"> Poor Pitches</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Every day, thousands of talented African entrepreneurs lose valuable sales 
            opportunities simply because they haven't mastered the art of persuasive communication.
          </p>
        </motion.div>

        {/* Problem Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white dark:bg-dark-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-dark-600"
            >
              <div className={`${problem.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}>
                <problem.icon className={`w-8 h-8 ${problem.color}`} />
              </div>
              <div className={`text-3xl font-bold ${problem.color} mb-2`}>
                {problem.stat}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {problem.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Before/After Audio Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white dark:bg-dark-700 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-dark-600"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Hear the Difference
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Listen to real vendor pitches before and after PitchPoa AI training
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Before */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Before Training</h4>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Sarah M.</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Jewelry Vendor, Nairobi</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-dark-600 rounded-lg p-4 mb-4 border border-gray-200 dark:border-dark-500">
                  <p className="text-gray-700 dark:text-gray-300 italic text-sm">
                    "Um... my jewelry is good. It's... um... beautiful and cheap. 
                    You should buy it because... well... it's nice."
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-red-600 font-medium">Conversion Rate: 12%</span>
                  <span className="text-gray-500 dark:text-gray-400">Monthly Sales: KES 15,000</span>
                </div>
              </div>
            </div>

            {/* After */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">After Training</h4>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Sarah M.</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Jewelry Vendor, Nairobi</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-dark-600 rounded-lg p-4 mb-4 border border-gray-200 dark:border-dark-500">
                  <p className="text-gray-700 dark:text-gray-300 italic text-sm">
                    "Habari! I create handcrafted jewelry that tells your unique story. 
                    Each piece transforms you from ordinary to extraordinary. Which story 
                    would you like to wear today?"
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-600 font-medium">Conversion Rate: 47%</span>
                  <span className="text-gray-500 dark:text-gray-400">Monthly Sales: KES 58,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Improvement Metrics */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { metric: '287%', label: 'Sales Increase', color: 'text-green-600' },
              { metric: '92%', label: 'Confidence Boost', color: 'text-blue-600' },
              { metric: '3.8x', label: 'Customer Engagement', color: 'text-purple-600' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold ${item.color} mb-1`}>
                  {item.metric}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;