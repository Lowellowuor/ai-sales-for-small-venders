import React, { useState, useRef } from 'react';
import { Mic, StopCircle, PlayCircle, Loader2, MessageSquareText, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

// This would be your deployed backend URL.
// For local testing, keep it as 'http://localhost:5000'.
// Once your backend is deployed, update this to its live URL (e.g., 'https://your-backend-app.onrender.com').
const BACKEND_API_URL = 'http://localhost:5000';

// Define the structure for AI feedback
interface AiFeedback {
  overallImpression: string;
  toneAnalysis: string;
  paceAnalysis: string;
  confidenceAnalysis: string;
  culturalNuances: string;
  suggestionsForImprovement: string[];
  multilingualConsiderations?: string;
}

const PitchPracticePage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<AiFeedback | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Function to start recording audio
  const startRecording = async () => {
    setError(null);
    setFeedback(null); // Clear previous feedback
    setAudioBlob(null);
    setAudioUrl(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm; codecs=opus' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('Could not access microphone. Please ensure it is connected and permissions are granted.');
    }
  };

  // Function to stop recording audio
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Function to play recorded audio
  const playAudio = () => {
    if (audioUrl) {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.play();
      }
    }
  };

  // Function to send audio to backend for AI analysis
  const analyzePitch = async () => {
    if (!audioBlob) {
      setError('No audio recorded to analyze.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setFeedback(null);

    const formData = new FormData();
    formData.append('audio', audioBlob, 'pitch_recording.webm');
    // You could also add context like language, pitch type, etc.
    formData.append('language', 'English'); // Example: User selects language
    formData.append('pitchContext', 'Sales pitch for a new product'); // Example context

    try {
      const response = await fetch(`${BACKEND_API_URL}/api/analyze-pitch`, {
        method: 'POST',
        body: formData,
        // No 'Content-Type' header needed when using FormData, browser sets it
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get AI feedback.');
      }

      const data: AiFeedback = await response.json();
      setFeedback(data);
    } catch (err: any) {
      console.error('Error analyzing pitch:', err);
      setError(`Analysis failed: ${err.message || 'Network error'}. Ensure your backend is running and accessible.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to reset the practice session
  const resetPractice = () => {
    setIsRecording(false);
    setAudioBlob(null);
    setAudioUrl(null);
    setIsLoading(false);
    setFeedback(null);
    setError(null);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      mediaRecorderRef.current = null;
    }
    audioChunksRef.current = [];
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 sm:p-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          AI Pitch Practice & Coaching
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-gray-600 dark:text-gray-300 mb-10"
        >
          Record your sales pitch and get instant, personalized AI feedback on your delivery, tone, and more.
        </motion.p>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg relative mb-6"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </motion.div>
        )}

        <div className="flex flex-col items-center space-y-6 mb-10">
          {!isRecording && !audioUrl && (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startRecording}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg flex items-center space-x-3 transition-all duration-200"
            >
              <Mic className="w-6 h-6" />
              <span>Start Recording Pitch</span>
            </motion.button>
          )}

          {isRecording && (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={stopRecording}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full shadow-lg flex items-center space-x-3 transition-all duration-200"
            >
              <StopCircle className="w-6 h-6" />
              <span>Stop Recording</span>
            </motion.button>
          )}

          {audioUrl && !isRecording && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <audio ref={audioPlayerRef} src={audioUrl} controls className="w-full sm:w-auto rounded-lg shadow-md dark:bg-gray-700"></audio>
              <button
                onClick={analyzePitch}
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md flex items-center space-x-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <MessageSquareText className="w-5 h-5" />
                )}
                <span>{isLoading ? 'Analyzing...' : 'Analyze Pitch'}</span>
              </button>
              <button
                onClick={resetPractice}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 font-bold py-3 px-6 rounded-lg shadow-md flex items-center space-x-2 transition-all duration-200"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </motion.div>
          )}
        </div>

        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-inner"
          >
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center space-x-2">
              <MessageSquareText className="w-6 h-6" />
              <span>AI Coaching Feedback</span>
            </h2>

            <div className="space-y-4 text-gray-800 dark:text-gray-200">
              <p><strong>Overall Impression:</strong> {feedback.overallImpression}</p>
              <p><strong>Tone Analysis:</strong> {feedback.toneAnalysis}</p>
              <p><strong>Pace Analysis:</strong> {feedback.paceAnalysis}</p>
              <p><strong>Confidence Analysis:</strong> {feedback.confidenceAnalysis}</p>
              <p><strong>Cultural Nuances:</strong> {feedback.culturalNuances}</p>
              {feedback.multilingualConsiderations && (
                <p><strong>Multilingual Considerations:</strong> {feedback.multilingualConsiderations}</p>
              )}
              <div>
                <h3 className="text-lg font-semibold mt-4 mb-2">Suggestions for Improvement:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {feedback.suggestionsForImprovement.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold">
                <ThumbsUp className="w-5 h-5" />
                <span>Helpful</span>
              </button>
              <button className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-semibold">
                <ThumbsDown className="w-5 h-5" />
                <span>Not Helpful</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PitchPracticePage;
