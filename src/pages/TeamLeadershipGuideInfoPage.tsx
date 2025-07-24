import React, { useState } from 'react';

const TeamLeadershipGuideInfoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resources' | 'coaching' | null>(null);

  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-12">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-center text-orange-500 dark:text-orange-300 mb-4">
          Building Teams & Leadership Guide
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Learn how to hire, train, and retain top talent while developing leadership skills for business growth.
        </p>
      </header>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Essential Leadership Components
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Effective team building and leadership requires a strategic approach. Our guide covers all aspects from hiring to creating a thriving organizational culture.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-orange-500 dark:text-orange-400 mb-2">Core Topics</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Hiring templates and interview guides</li>
                <li>Leadership development frameworks</li>
                <li>Team management strategies</li>
                <li>Culture building techniques</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-orange-500 dark:text-orange-400 mb-2">Special Features</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Remote/hybrid team management</li>
                <li>Employee retention strategies</li>
                <li>Performance evaluation systems</li>
                <li>Conflict resolution approaches</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Leadership Development Path
          </h2>
          <ol className="space-y-4">
            {[
              "Assess your current team structure and leadership needs",
              "Develop hiring and onboarding processes",
              "Implement leadership training programs",
              "Establish clear communication channels",
              "Create feedback and growth systems"
            ].map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 bg-orange-100 dark:bg-orange-900 text-orange-500 dark:text-orange-300 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-600 dark:text-gray-300">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Resource CTA */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-8 text-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
          Build Your Dream Team Today
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
          Access our complete Leadership Toolkit with templates, training modules, and management frameworks.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setActiveTab('resources')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Leadership Resources
          </button>
          <button
            onClick={() => setActiveTab('coaching')}
            className="border border-orange-500 text-orange-500 dark:text-orange-300 dark:border-orange-300 font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Request Coaching
          </button>
        </div>
      </div>

      {/* Resources Content - Enhanced for Dark Mode */}
      {activeTab === 'resources' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Leadership Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-orange-500 dark:text-orange-400 mb-3">Free Downloads</h3>
              <ul className="space-y-3">
                <li className="flex items-start p-3 rounded-md hover:bg-orange-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-orange-500 dark:text-orange-300 mr-3 mt-0.5">📄</span>
                  <span className="text-gray-700 dark:text-gray-200">Hiring Process Checklist</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-orange-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-orange-500 dark:text-orange-300 mr-3 mt-0.5">📊</span>
                  <span className="text-gray-700 dark:text-gray-200">Team Performance Evaluation Template</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-orange-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-orange-500 dark:text-orange-300 mr-3 mt-0.5">🎯</span>
                  <span className="text-gray-700 dark:text-gray-200">Leadership Development Roadmap</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-orange-500 dark:text-orange-400 mb-3">Premium Resources</h3>
              <ul className="space-y-3">
                <li className="flex items-start p-3 rounded-md hover:bg-orange-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-orange-500 dark:text-orange-300 mr-3 mt-0.5">📚</span>
                  <span className="text-gray-700 dark:text-gray-200">Complete Leadership Training Course</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-orange-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-orange-500 dark:text-orange-300 mr-3 mt-0.5">🤝</span>
                  <span className="text-gray-700 dark:text-gray-200">Conflict Resolution Workshop Kit</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-orange-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-orange-500 dark:text-orange-300 mr-3 mt-0.5">🔄</span>
                  <span className="text-gray-700 dark:text-gray-200">Hybrid Team Management System</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a 
              href="/downloads/leadership-resources-pack" 
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              Download All Resources
            </a>
          </div>
        </div>
      )}

      {/* Coaching Content */}
      {activeTab === 'coaching' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Leadership Coaching Request</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="coaching-type" className="block text-gray-700 dark:text-gray-300 mb-1">Coaching Type</label>
              <select 
                id="coaching-type" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="">Select an option</option>
                <option value="individual">Individual Leadership Coaching</option>
                <option value="team">Team Development Program</option>
                <option value="executive">Executive Leadership</option>
                <option value="custom">Custom Program</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-1">Your Needs</label>
              <textarea 
                id="message" 
                rows={4} 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Tell us about your leadership challenges and goals"
              ></textarea>
            </div>
            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
              >
                Submit Coaching Request
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TeamLeadershipGuideInfoPage;