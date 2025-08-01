import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Mic, MessageCircle, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CTASection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation triggers only once when it enters view
    threshold: 0.1,    // 10% of the component must be visible to trigger
  });
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const benefits = [
    { icon: MessageCircle, text: "WhatsApp Integration" },
    { icon: Mic, text: "Voice AI Training" },
    { icon: Zap, text: "300% Sales Increase" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-800 dark:via-purple-800 dark:to-pink-800 relative overflow-hidden">
      {/* Background Animated Elements (Dots/Orbs) */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0], // Move up and down
              opacity: [0.2, 0.8, 0.2], // Fade in and out
              scale: [1, 1.2, 1], // Slightly scale
            }}
            transition={{
              duration: 4 + Math.random() * 2, // Random duration for variety
              repeat: Infinity, // Loop indefinitely
              ease: "easeInOut", // Smooth animation
              delay: Math.random() * 2, // Staggered start times
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          {/* Main Heading */}
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Ready to Transform
              <br />
              <span className="text-yellow-300 dark:text-yellow-200">Your Sales?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 dark:text-white/80 max-w-3xl mx-auto leading-relaxed">
              Join 50,000+ African entrepreneurs who've already boosted their
              sales with PitchPoa AI. Start your free trial today - no credit
              card required.
            </p>
          </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-white/20 dark:bg-white/30 rounded-full px-6 py-3 backdrop-blur-lg border border-white/30 shadow-md"
              >
                <benefit.icon className="w-5 h-5" />
                <span className="font-medium">{benefit.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-6 mb-12"
          >
            <button
              onClick={() => navigate('/signup')} // Navigates to the signup page
              className="bg-white dark:bg-gray-100 text-blue-600 dark:text-blue-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 dark:hover:bg-gray-200 transform hover:scale-105 transition-all duration-200 shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-purple-600 dark:hover:text-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              <a
                href="https://wa.me/+254113661960?text=Hello!%20I%20saw%20your%20website%20and%20want%20to%20chat."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:no-underline" // Prevent underline on hover for the link within button
              >
                Chat on WhatsApp
              </a>
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="space-y-4"
          >
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/80 dark:text-white/70">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-400 dark:bg-green-300 rounded-full"></div>
                <span className="text-sm">7-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-400 dark:bg-green-300 rounded-full"></div>
                <span className="text-sm">No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-400 dark:bg-green-300 rounded-full"></div>
                <span className="text-sm">30-day money-back guarantee</span>
              </div>
            </div>

            <p className="text-white/60 dark:text-white/50 text-sm">
              Join thousands of successful African entrepreneurs • Cancel anytime
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements (Circles) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-10 w-20 h-20 border-2 border-white/30 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 left-10 w-16 h-16 border-2 border-white/20 rounded-full"
      />
    </section>
  );
};

export default CTASection;
