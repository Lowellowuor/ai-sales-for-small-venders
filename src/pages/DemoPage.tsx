import { motion } from 'framer-motion';
import { Play, Mic, MessageCircle, Brain, Smartphone } from 'lucide-react';
import { useState } from 'react';
import integrationVideo from '../resources/integration.mp4';
import multiVideo from '../resources/multi.mp4';
import vendorVideo from '../resources/vendor.mp4';
// Placeholder video URLs for demonstration.
const videoUrls = {
  'Market Vendor': vendorVideo,
  'WhatsApp Integration': integrationVideo,
  'Multilingual Training': multiVideo
};

type ChatMessage = { sender: 'ai' | 'user'; text: string };

const featureChatMessages: Record<string, ChatMessage[]> = {
  'Voice Analysis': [
    { sender: 'ai', text: 'Habari! 👋 I\'m your AI sales coach. Let\'s practice your pitch together!' },
    { sender: 'user', text: 'Hello! I want to practice my pitch for selling fresh produce.' },
    { sender: 'ai', text: 'Excellent! Please record your pitch. I\'ll analyze your tone, pace, and confidence.' },
    { sender: 'user', text: '(Simulated voice recording of pitch)' },
    { sender: 'ai', text: 'Analysis complete! Your pace was good, but try adding more vocal variety to sound more confident. Your tone was friendly, well done! 👍' },
  ],
  'WhatsApp Native': [
    { sender: 'ai', text: 'Habari! 👋 I\'m your AI sales coach. Let\'s practice your pitch together!' },
    { sender: 'user', text: 'This is great! I love that I can do this directly on WhatsApp.' },
    { sender: 'ai', text: 'Absolutely! Our platform is built to seamlessly integrate with WhatsApp, making training accessible and convenient for you, right where your customers are.' },
    { sender: 'user', text: 'Perfect for my daily routine!' },
  ],
  'AI Coaching': [
    { sender: 'ai', text: 'Habari! 👋 I\'m your AI sales coach. Let\'s practice your pitch together!' },
    { sender: 'user', text: 'My last pitch didn\'t close the deal. What should I improve?' },
    { sender: 'ai', text: 'Based on your previous pitch, consider focusing more on the customer\'s pain points and how your product directly solves them. Let\'s rephrase your value proposition.' },
    { sender: 'user', text: 'Okay, how about this: "Are you tired of [pain point]? Our solution [product benefit] will help you [achieve goal]."' },
    { sender: 'ai', text: 'Much better! That clearly addresses the customer\'s need. Let\'s try practicing that.' },
  ],
  'Mobile-First': [
    { sender: 'ai', text: 'Habari! 👋 I\'m your AI sales coach. Let\'s practice your pitch together!' },
    { sender: 'user', text: 'I\'m often on the go. Does PitchPoa work well on my phone?' },
    { sender: 'ai', text: 'Yes! PitchPoa AI is designed with a mobile-first approach. All features are optimized for your smartphone, ensuring a smooth and responsive experience wherever you are.' },
    { sender: 'user', text: 'Awesome! That makes it super convenient.' },
  ]
};

const DemoPage = () => {
  const [activeFeatureId, setActiveFeatureId] = useState<string | null>(null);
  const [currentChatMessages, setCurrentChatMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: 'Habari! 👋 I\'m your AI sales coach. Let\'s practice your pitch together!' }
  ]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

  const handleFeatureClick = (featureTitle: string) => {
    setActiveFeatureId(featureTitle);
    setCurrentChatMessages(featureChatMessages[featureTitle]);
    setSelectedVideoUrl(null);
  };

  const handlePlayVideo = (videoTitle: keyof typeof videoUrls) => {
    setSelectedVideoUrl(videoUrls[videoTitle]);
    setActiveFeatureId(null);
  };

  return (
    <div className="pt-20 bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-20 relative text-white overflow-hidden"> {/* Added relative and overflow-hidden */}
 <div className="absolute top-0 left-0 w-full h-full overflow-hidden"> {/* Video container */}
  <video
   src={'https://media.istockphoto.com/id/2178019507/video/talking-seminar-and-man-with-mic-audience-and-discussion-of-ai-and-automation-on-stage-and.mp4?s=mp4-640x640-is&k=20&c=kcweTiRSNEwK2eYad4c5qNsn--o5mme90c4nVKXpICw='} // Replace with your desired video import (e.g., heroVideo)
   autoPlay
   loop
   muted
   className="absolute top-0 left-0 min-w-full min-h-full object-cover"
  />
  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div> {/* Optional: Dark overlay for better text readability */}
 </div>
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"> {/* Added relative and z-10 */}
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
      <section className="py-20 bg-white dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Demo Interface */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 dark:bg-dark-700 rounded-3xl p-8 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                Live Voice Training Demo
              </h2>
              <div className="bg-white dark:bg-dark-900 rounded-2xl shadow-lg overflow-hidden">
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
                <div className="p-6 h-96 overflow-y-auto bg-gray-50 dark:bg-dark-800">
                  <div className="space-y-4">
                    {currentChatMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} space-x-2`}
                      >
                        {msg.sender === 'ai' && (
                          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Brain className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div
                          className={`rounded-2xl px-4 py-3 max-w-xs shadow-sm ${
                            msg.sender === 'user'
                              ? 'bg-accent-500 text-white rounded-br-sm'
                              : 'bg-white dark:bg-dark-700 text-gray-800 dark:text-gray-200 rounded-tl-sm'
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                        </div>
                        {msg.sender === 'user' && (
                          <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Smartphone className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
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
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                What You'll Experience
              </h2>
              <div className="space-y-6">
                {[
                  {
                    id: 'Voice Analysis',
                    icon: Mic,
                    title: 'Voice Analysis',
                    description: 'Real-time feedback on tone, pace, and confidence levels'
                  },
                  {
                    id: 'WhatsApp Native',
                    icon: MessageCircle,
                    title: 'WhatsApp Native',
                    description: 'Practice in the familiar WhatsApp environment'
                  },
                  {
                    id: 'AI Coaching',
                    icon: Brain,
                    title: 'AI Coaching',
                    description: 'Personalized suggestions for improvement'
                  },
                  {
                    id: 'Mobile-First',
                    icon: Smartphone,
                    title: 'Mobile-First',
                    description: 'Optimized for your smartphone experience'
                  }
                ].map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => handleFeatureClick(feature.id)}
                    className={`flex items-start space-x-4 p-4 rounded-xl text-left w-full transition-all duration-200
                      ${activeFeatureId === feature.id
                        ? 'bg-primary-500 text-white shadow-lg dark:bg-primary-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-dark-700 dark:text-gray-100 dark:hover:bg-dark-600'
                      }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                      ${activeFeatureId === feature.id
                        ? 'bg-white text-primary-600'
                        : 'bg-primary-100 text-primary-600 dark:bg-dark-600 dark:text-primary-400'
                      }`}
                    >
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold mb-1
                        ${activeFeatureId === feature.id ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}
                      >
                        {feature.title}
                      </h3>
                      <p className={`text-sm
                        ${activeFeatureId === feature.id ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'}`}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Demos Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              See It In Action
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Watch real vendors transform their pitches with PitchPoa AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {([
              { title: 'Market Vendor', duration: '3:24' },
              { title: 'WhatsApp Integration', duration: '2:18' },
              { title: 'Multilingual Training', duration: '4:12' }
            ] as { title: keyof typeof videoUrls; duration: string }[]).map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white dark:bg-dark-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                {selectedVideoUrl === videoUrls[video.title] ? (
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={selectedVideoUrl || undefined}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-primary-500 to-accent-500 dark:from-primary-800 dark:to-accent-800 flex items-center justify-center">
                    <button
                      onClick={() => handlePlayVideo(video.title)}
                      className="w-16 h-16 bg-white dark:bg-dark-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform text-primary-600 dark:text-primary-400"
                      aria-label={`Play ${video.title} video`}
                    >
                      <Play className="w-8 h-8 ml-1" />
                    </button>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{video.duration}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500 dark:bg-primary-800 text-white">
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
              <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors dark:bg-dark-900 dark:text-primary-400 dark:hover:bg-dark-700">
                Start Free Trial
              </button>
              <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors dark:bg-dark-900 dark:text-primary-400 dark:hover:bg-dark-700">
                Schedule Demo Call
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DemoPage ;