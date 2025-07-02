import { motion } from 'framer-motion';
import { Play, Mic, MessageCircle, Brain, Smartphone } from 'lucide-react';

const DemoPage = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-accent-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Experience PitchPoa AI
              <span className="block text-2xl md:text-3xl font-normal mt-2 text-white/90">
                Interactive Demo
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              See how our AI coach transforms your sales pitches in real-time. 
              Try all features without any commitment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Demo Interface */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 rounded-3xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Live Voice Training Demo
              </h2>
              
              {/* WhatsApp-style Interface */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-whatsapp-500 px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">PitchPoa AI Coach</h3>
                      <p className="text-whatsapp-100 text-sm">Online • Ready to help</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 h-96 overflow-y-auto bg-gray-50">
                  {/* Demo messages would go here */}
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs shadow-sm">
                        <p className="text-gray-800 text-sm">
                          Habari! 👋 I'm your AI sales coach. Let's practice your pitch together!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-gray-900">
                What You'll Experience
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Mic,
                    title: 'Voice Analysis',
                    description: 'Real-time feedback on tone, pace, and confidence levels'
                  },
                  {
                    icon: MessageCircle,
                    title: 'WhatsApp Native',
                    description: 'Practice in the familiar WhatsApp environment'
                  },
                  {
                    icon: Brain,
                    title: 'AI Coaching',
                    description: 'Personalized suggestions for improvement'
                  },
                  {
                    icon: Smartphone,
                    title: 'Mobile-First',
                    description: 'Optimized for your smartphone experience'
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Demos Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              See It In Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch real vendors transform their pitches with PitchPoa AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Before & After: Market Vendor', duration: '3:24' },
              { title: 'WhatsApp Integration Demo', duration: '2:18' },
              { title: 'Multilingual Training', duration: '4:12' }
            ].map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-primary-600 ml-1" />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{video.duration}</p>
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
              Ready to Start Your Sales Transformation?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of successful African entrepreneurs today
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors">
                Schedule Demo Call
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DemoPage;