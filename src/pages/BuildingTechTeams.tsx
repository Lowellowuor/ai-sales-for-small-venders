import React, { useState } from 'react';
import { Users } from 'lucide-react';

const BuildingTechTeamsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resources' | 'consultation' | null>(null);

  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-12">
      {/* Header Section */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <Users className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-300">
            Building Tech Teams
          </h1>
        </div>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Master the art of hiring, training, and managing high-performing technical teams in today's digital landscape.
        </p>
      </header>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Tech Team Excellence Framework
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            From startup to enterprise scale, build teams that deliver innovative solutions while adapting to remote work and rapid technological change.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-indigo-600 dark:text-indigo-400 mb-2">Core Pillars</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Strategic technical hiring</li>
                <li>Continuous skills development</li>
                <li>Effective remote collaboration</li>
                <li>Innovation culture</li>
                <li>Career growth pathways</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-indigo-600 dark:text-indigo-400 mb-2">Key Outcomes</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Higher quality hires</li>
                <li>Faster onboarding</li>
                <li>Improved retention</li>
                <li>Stronger technical leadership</li>
                <li>Adaptive, future-ready teams</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Team Building Roadmap
          </h2>
          <ol className="space-y-4">
            {[
              "Define your technical competency framework",
              "Develop structured hiring processes",
              "Create immersive onboarding programs",
              "Implement continuous learning systems",
              "Establish remote work best practices",
              "Measure and optimize team performance"
            ].map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-600 dark:text-gray-300">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Resource CTA */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-8 text-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
          Build Your Dream Tech Team
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
          Access our complete Tech Team Builder Toolkit with templates, roadmaps, and expert guides.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setActiveTab('resources')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Get Team Resources
          </button>
          <button
            onClick={() => setActiveTab('consultation')}
            className="border border-indigo-600 text-indigo-600 dark:text-indigo-300 dark:border-indigo-300 font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Team Strategy Session
          </button>
        </div>
      </div>

      {/* Resources Content */}
      {activeTab === 'resources' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Tech Team Resources</h2>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-3">Featured Resources</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 dark:bg-gray-700 p-4 rounded-lg border border-indigo-100 dark:border-gray-600">
                <h4 className="font-medium mb-2 flex items-center">
                  <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 p-2 rounded-lg mr-3">
                    📋
                  </span>
                  <span>Technical Hiring Kit</span>
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Complete templates for job descriptions, interview questions, and coding challenges
                </p>
              </div>
              <div className="bg-indigo-50 dark:bg-gray-700 p-4 rounded-lg border border-indigo-100 dark:border-gray-600">
                <h4 className="font-medium mb-2 flex items-center">
                  <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 p-2 rounded-lg mr-3">
                    📈
                  </span>
                  <span>Upskilling Roadmap</span>
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Quarterly learning plans for frontend, backend, DevOps, and data teams
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-lg text-indigo-600 dark:text-indigo-400 mb-3">Hiring & Onboarding</h3>
              <ul className="space-y-3">
                <li className="flex items-start p-3 rounded-md hover:bg-indigo-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-indigo-500 dark:text-indigo-300 mr-3 mt-0.5">👨‍💻</span>
                  <span className="text-gray-700 dark:text-gray-200">Technical Interview Rubrics</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-indigo-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-indigo-500 dark:text-indigo-300 mr-3 mt-0.5">🏗️</span>
                  <span className="text-gray-700 dark:text-gray-200">30-60-90 Day Onboarding Plans</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-lg text-indigo-600 dark:text-indigo-400 mb-3">Team Development</h3>
              <ul className="space-y-3">
                <li className="flex items-start p-3 rounded-md hover:bg-indigo-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-indigo-500 dark:text-indigo-300 mr-3 mt-0.5">🏠</span>
                  <span className="text-gray-700 dark:text-gray-200">Remote Team Playbook</span>
                </li>
                <li className="flex items-start p-3 rounded-md hover:bg-indigo-50 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-indigo-500 dark:text-indigo-300 mr-3 mt-0.5">💡</span>
                  <span className="text-gray-700 dark:text-gray-200">Innovation Sprint Framework</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a 
              href="/tech-team-resources-full"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              View All Team Resources
            </a>
          </div>
        </div>
      )}

      {/* Consultation Content */}
      {activeTab === 'consultation' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Tech Team Strategy Session</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-2">How it works:</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
              <li>60-minute consultation with our tech team experts</li>
              <li>Analysis of your current team structure</li>
              <li>Customized roadmap for your needs</li>
              <li>Follow-up resources and recommendations</li>
            </ol>
          </div>

          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="team-size" className="block text-gray-700 dark:text-gray-300 mb-1">Current Team Size</label>
                <select 
                  id="team-size" 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200"
                  required
                >
                  <option value="">Select</option>
                  <option value="1-5">1-5 people</option>
                  <option value="6-15">6-15 people</option>
                  <option value="16-50">16-50 people</option>
                  <option value="50+">50+ people</option>
                </select>
              </div>
              <div>
                <label htmlFor="focus-area" className="block text-gray-700 dark:text-gray-300 mb-1">Focus Area</label>
                <select 
                  id="focus-area" 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200"
                  required
                >
                  <option value="">Select priority</option>
                  <option value="hiring">Technical Hiring</option>
                  <option value="training">Upskilling</option>
                  <option value="remote">Remote Work</option>
                  <option value="scaling">Team Scaling</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="challenges" className="block text-gray-700 dark:text-gray-300 mb-1">Key Challenges</label>
              <textarea 
                id="challenges" 
                rows={4} 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Describe your top 2-3 team building challenges"
                required
              ></textarea>
            </div>
            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
              >
                <span>Request Strategy Session</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Success Stories */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Tech Team Transformations
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div className="flex items-start mb-3">
                <div className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 p-3 rounded-lg mr-4">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Fintech Startup Scaling</h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">Lagos, Nigeria</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Scaled engineering team from 5 to 50 in 18 months while maintaining 85% retention rate using our hiring and onboarding frameworks.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div className="flex items-start mb-3">
                <div className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Bank Security Team</h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">Nairobi, Kenya</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Reduced security incidents by 70% after implementing our upskilling program and career path framework for their tech team.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Tech Team Quick Wins</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-lg text-indigo-600 dark:text-indigo-400 mb-3">For Hiring</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Use work sample tests instead of whiteboarding</li>
              <li>Include team members in interviews for culture fit</li>
              <li>Create clear rubrics to evaluate candidates</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-lg text-indigo-600 dark:text-indigo-400 mb-3">For Retention</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Implement quarterly "innovation days"</li>
              <li>Create visible career progression paths</li>
              <li>Offer flexible work arrangements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingTechTeamsPage;