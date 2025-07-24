import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Play, Pause, Volume2, CheckCircle, AlertCircle } from 'lucide-react';

const VoiceDemoWidget = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate recording
      setTimeout(() => {
        setIsRecording(false);
        setHasRecording(true);
      }, 3000);
    }
  };

  const handlePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && hasRecording) {
      setTimeout(() => {
        setIsPlaying(false);
        setShowAnalysis(true);
      }, 2000);
    }
  };

  const analysisData = {
    score: 8.5,
    confidence: 92,
    clarity: 89,
    persuasiveness: 94,
    suggestions: [
      { type: 'positive', text: 'Great energy and enthusiasm!' },
      { type: 'improvement', text: 'Try speaking 10% slower for better clarity' },
      { type: 'improvement', text: 'Mention specific benefits earlier' },
    ]
  };

  return (
    <div className="relative max-w-md mx-auto">
      {/* WhatsApp-style Chat Interface */}
      <div className="bg-white dark:bg-dark-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-dark-700">
        {/* Header */}
        <div className="bg-whatsapp-500 px-6 py-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Mic className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">PitchPoa AI Coach</h3>
            <p className="text-whatsapp-100 text-sm">Online • Ready to help</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="p-6 space-y-4 h-80 overflow-y-auto bg-gray-50 dark:bg-dark-700">
          {/* AI Message */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white dark:bg-dark-600 rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs shadow-sm border border-gray-200 dark:border-dark-500">
              <p className="text-gray-800 dark:text-gray-200 text-sm">
                Habari! 👋 Ready to practice your pitch? Record a 30-second sample and I'll give you instant feedback.
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">2:34 PM</span>
            </div>
          </motion.div>

          {/* Recording Interface */}
          <div className="flex justify-end">
            <div className="bg-accent-500 rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={handleRecord}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  <Mic className={`w-8 h-8 ${isRecording ? 'text-white' : 'text-gray-700'}`} />
                </button>
                
                {hasRecording && (
                  <button
                    onClick={handlePlayback}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-200"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-gray-700" />
                    ) : (
                      <Play className="w-6 h-6 text-gray-700 ml-1" />
                    )}
                  </button>
                )}
              </div>
              
              {isRecording && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center mt-2"
                >
                  <p className="text-white text-sm font-medium">Recording...</p>
                  <div className="flex justify-center space-x-1 mt-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-1 bg-white rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              
              {hasRecording && !isRecording && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mt-2"
                >
                  <div className="flex items-center justify-center space-x-1">
                    <Volume2 className="w-4 h-4 text-white" />
                    <span className="text-white text-sm">Voice Note • 0:15</span>
                  </div>
                </motion.div>
              )}
              
              <span className="text-xs text-accent-100 mt-1 block text-right">2:35 PM</span>
            </div>
          </div>

          {/* AI Analysis */}
          <AnimatePresence>
            {showAnalysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                  <Mic className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white dark:bg-dark-600 rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs shadow-sm border border-gray-200 dark:border-dark-500">
                  <div className="space-y-3">
                    <p className="text-gray-800 dark:text-gray-200 text-sm font-medium">
                      Great job! Here's your analysis:
                    </p>
                    
                    {/* Score */}
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Score</span>
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">{analysisData.score}/10</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600 dark:text-gray-400">Confidence</span>
                          <span className="text-gray-600 dark:text-gray-400">{analysisData.confidence}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                          <div 
                            className="bg-green-500 h-1 rounded-full transition-all duration-500"
                            style={{ width: `${analysisData.confidence}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quick Tips */}
                    <div className="space-y-2">
                      {analysisData.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          {suggestion.type === 'positive' ? (
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          )}
                          <span className="text-xs text-gray-700 dark:text-gray-300">{suggestion.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">2:36 PM</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="px-6 py-4 bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => {
                setHasRecording(false);
                setShowAnalysis(false);
                setIsRecording(false);
                setIsPlaying(false);
              }}
              className="text-primary-500 hover:text-primary-600 font-medium text-sm"
            >
              Try Again
            </button>
            <div className="flex-1"></div>
            <button className="text-accent-500 hover:text-accent-600 font-medium text-sm">
              Get Full Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -top-4 -right-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg"
      >
        Live Demo
      </motion.div>
      
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        className="absolute -bottom-4 -left-4 bg-whatsapp-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg"
      >
        WhatsApp Ready
      </motion.div>
    </div>
  );
};

export default VoiceDemoWidget;