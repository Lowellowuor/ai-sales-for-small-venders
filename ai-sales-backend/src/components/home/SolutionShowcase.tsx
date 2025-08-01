import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  MessageCircle, 
  Mic, 
  Brain, 
  Globe, 
  Zap, 
  Shield,
  Smartphone,
  Users,
  Play
} from 'lucide-react';

const SolutionShowcase = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: MessageCircle,
      title: 'WhatsApp Integration',
      description: 'Train directly in WhatsApp - the app your customers already use daily',
      details: 'Send voice notes, get instant feedback, and practice with real conversation flows',
      demo: 'whatsapp-demo.mp4'
    },
    {
      icon: Mic,
      title: 'Voice AI Training',
      description: 'AI that understands tone, pace, confidence, and cultural nuances',
      details: 'Advanced speech analysis provides personalized coaching for every conversation',
      demo: 'voice-analysis.mp4'
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Works in Swahili, English, and 13 other African languages',
      details: 'Code-switching support for natural conversation patterns',
      demo: 'language-demo.mp4'
    },
    {
      icon: Brain,
      title: 'Smart Learning',
      description: 'Personalized coaching that adapts to your business and style',
      details: 'Machine learning algorithms create custom training paths for maximum impact',
      demo: 'smart-learning.mp4'
    }
  ];

  const benefits = [
    { icon: Zap, title: 'Instant Feedback', description: 'Get AI coaching in real-time' },
    { icon: Smartphone, title: 'Mobile-First', description: 'Train anywhere, anytime' },
    { icon: Users, title: 'Community', description: 'Learn with 50K+ vendors' },
    { icon: Shield, title: 'Privacy-First', description: 'Your data stays secure' },
  ];

  return (
    <section className="py-20 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Meet Your AI 
            <span className="text-primary-500"> Sales Coach</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Powered by advanced AI and designed specifically for African entrepreneurs, 
            PitchPoa understands your context, culture, and challenges.
          </p>
        </motion.div>

        {/* Interactive Feature Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Feature List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
                  activeFeature === index 
                    ? 'bg-primary-50 dark:bg-dark-700 border-2 border-primary-500 shadow-lg' 
                    : 'bg-gray-50 dark:bg-dark-800 hover:bg-gray-100 dark:hover:bg-dark-700 border-2 border-transparent'
                }`}
                onClick={() => setActiveFeature(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${
                    activeFeature === index 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-white dark:bg-dark-600 text-primary-500'
                  }`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {feature.description}
                    </p>
                    {activeFeature === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-primary-700 dark:text-primary-400 text-sm font-medium"
                      >
                        {feature.details}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Demo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">
                  {features[activeFeature].title}
                </h3>
                <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Play className="w-6 h-6 ml-1" />
                </button>
              </div>
              
              {/* Demo Visual */}
              <div className="bg-white/10 rounded-2xl p-6 mb-6">
                <div className="space-y-4">
                  {activeFeature === 0 && (
                    // WhatsApp Demo
                    <div className="space-y-3">
                      <div className="flex justify-end">
                        <div className="bg-white/20 rounded-2xl rounded-tr-sm px-4 py-2 max-w-xs">
                          <div className="flex items-center space-x-2">
                            <Mic className="w-4 h-4" />
                            <span className="text-sm">Voice Note • 0:23</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                          <Brain className="w-4 h-4" />
                        </div>
                        <div className="bg-white/20 rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs">
                          <p className="text-sm">Great energy! Try emphasizing the unique value proposition in the first 10 seconds. Score: 8.2/10</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeFeature === 1 && (
                    // Voice Analysis Demo
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Confidence Level</span>
                        <span>89%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <motion.div 
                          className="bg-white h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '89%' }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>Pace: Optimal</div>
                        <div>Clarity: 94%</div>
                        <div>Emotion: Positive</div>
                        <div>Energy: High</div>
                      </div>
                    </div>
                  )}
                  
                  {activeFeature === 2 && (
                    // Language Demo
                    <div className="text-center space-y-4">
                      <div className="text-2xl">🇰🇪 🇹🇿 🇺🇬 🇷🇼</div>
                      <p className="text-sm">"Habari yako? My product ni very unique..."</p>
                      <div className="bg-white/20 rounded-lg p-3">
                        <p className="text-xs">✓ Code-switching detected</p>
                        <p className="text-xs">✓ Cultural context understood</p>
                        <p className="text-xs">✓ Suggestions in preferred language</p>
                      </div>
                    </div>
                  )}
                  
                  {activeFeature === 3 && (
                    // Smart Learning Demo
                    <div className="space-y-3">
                      <div className="text-center text-sm mb-4">Your Learning Path</div>
                      <div className="space-y-2">
                        {['Opening Lines', 'Value Proposition', 'Objection Handling', 'Closing Techniques'].map((skill, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-white/90">{skill}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-white/20 rounded-full h-1">
                                <div 
                                  className="bg-white h-1 rounded-full"
                                  style={{ width: `${100 - (index * 25)}%` }}
                                />
                              </div>
                              <span className="text-xs">{100 - (index * 25)}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <p className="text-white/80 text-sm">
                {features[activeFeature].details}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-dark-800 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors group"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-dark-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 dark:group-hover:bg-dark-600 transition-colors">
                <benefit.icon className="w-8 h-8 text-primary-600 dark:text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionShowcase;