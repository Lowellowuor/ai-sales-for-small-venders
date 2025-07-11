import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // We might not need motion if we remove all its uses for background
import { Play, Mic, Users, TrendingUp, MessageCircle } from 'lucide-react';
import VoiceDemoWidget from './VoiceDemoWidget';

const HeroSection = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [typedText, setTypedText] = useState('');

  const stats = [
    { number: '50,000+', label: 'Active Vendors' },
    { number: '300%', label: 'Average Sales Increase' },
    { number: '15', label: 'Languages Supported' },
    { number: '98%', label: 'User Satisfaction' },
  ];

  const headlines = [
    'Turn Every Pitch Into Profit',
    'Boost Your Sales with AI',
    'Master Selling in Swahili',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let index = 0;
    const currentHeadline = headlines[0];
    const timer = setInterval(() => {
      if (index < currentHeadline.length) {
        setTypedText(currentHeadline.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/4054850/pexels-photo-4054850.jpeg')" }} // <-- ADD THIS LINE
    >   

      {/* Overlay to darken the image and ensure text readability */}
      <div className="absolute inset-0 bg-black/50"></div> {/* <-- ADD THIS OVERLAY */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          {/* Re-introducing motion import as it's still used here */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/20 dark:bg-white/10 backdrop-blur-lg rounded-full px-4 py-2"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">
                Now Live: WhatsApp Integration
              </span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="block">{typedText}</span>
                <span className="block text-2xl md:text-3xl font-normal mt-2 text-white/90">
                  with AI
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                The only sales trainer that speaks Swahili, thinks like you,
                and works on{' '}
                <span className="text-whatsapp-500 font-semibold">
                  WhatsApp
                </span>
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: MessageCircle, text: 'WhatsApp Native' },
                { icon: Users, text: '50K+ Happy Vendors' },
                { icon: TrendingUp, text: '300% Sales Boost' },
                { icon: Mic, text: 'Voice Training' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-3 bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-lg p-3"
                >
                  <item.icon className="w-5 h-5 text-whatsapp-500" />
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl">
                Start Free Trial
              </button>
              <button className="flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-200">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center space-x-6 pt-4"
            >
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {stats[currentStat].number}
                </div>
                <div className="text-sm text-white/80">
                  {stats[currentStat].label}
                </div>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div className="text-sm text-white/80">
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>{Math.floor(Math.random() * 50) + 150} vendors training now</span>
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <VoiceDemoWidget />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;