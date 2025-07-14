import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

const DigitalMarketingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resources' | 'consultation' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'seo' | 'analytics' | 'automation'>('seo');

  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-12">
      {/* Header Section */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <TrendingUp className="w-10 h-10 text-teal-600 dark:text-teal-400" />
          <h1 className="text-4xl font-bold text-teal-600 dark:text-teal-300">
            Digital Marketing & Analytics
          </h1>
        </div>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Leverage AI-powered strategies to grow your business with data-driven marketing and automation.
        </p>
      </header>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Modern Marketing Framework
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Transform your marketing with cutting-edge techniques that combine AI automation with deep analytics for maximum impact.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <button 
              onClick={() => setSelectedCategory('seo')}
              className={`p-4 rounded-lg transition-all ${selectedCategory === 'seo' ? 'bg-teal-100 dark:bg-teal-900 border border-teal-200 dark:border-teal-700' : 'bg-gray-50 dark:bg-gray-700'}`}
            >
              <h3 className="font-medium text-lg text-teal-600 dark:text-teal-400 mb-2">SEO</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Organic growth strategies</p>
            </button>
            
            <button 
              onClick={() => setSelectedCategory('analytics')}
              className={`p-4 rounded-lg transition-all ${selectedCategory === 'analytics' ? 'bg-teal-100 dark:bg-teal-900 border border-teal-200 dark:border-teal-700' : 'bg-gray-50 dark:bg-gray-700'}`}
            >
              <h3 className="font-medium text-lg text-teal-600 dark:text-teal-400 mb-2">Analytics</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Data-driven decisions</p>
            </button>
            
            <button 
              onClick={() => setSelectedCategory('automation')}
              className={`p-4 rounded-lg transition-all ${selectedCategory === 'automation' ? 'bg-teal-100 dark:bg-teal-900 border border-teal-200 dark:border-teal-700' : 'bg-gray-50 dark:bg-gray-700'}`}
            >
              <h3 className="font-medium text-lg text-teal-600 dark:text-teal-400 mb-2">Automation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">AI-powered tools</p>
            </button>
          </div>

          {selectedCategory === 'seo' && (
            <div className="bg-teal-50 dark:bg-teal-900/30 p-4 rounded-lg border border-teal-100 dark:border-teal-800">
              <h3 className="font-semibold text-teal-700 dark:text-teal-300 mb-2">SEO Focus Area</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Keyword research and optimization</li>
                <li>Content strategy development</li>
                <li>Technical SEO improvements</li>
                <li>Local search optimization</li>
              </ul>
            </div>
          )}

          {selectedCategory === 'analytics' && (
            <div className="bg-teal-50 dark:bg-teal-900/30 p-4 rounded-lg border border-teal-100 dark:border-teal-800">
              <h3 className="font-semibold text-teal-700 dark:text-teal-300 mb-2">Analytics Focus Area</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Campaign performance tracking</li>
                <li>Customer journey analysis</li>
                <li>Conversion rate optimization</li>
                <li>Predictive analytics</li>
              </ul>
            </div>
          )}

          {selectedCategory === 'automation' && (
            <div className="bg-teal-50 dark:bg-teal-900/30 p-4 rounded-lg border border-teal-100 dark:border-teal-800">
              <h3 className="font-semibold text-teal-700 dark:text-teal-300 mb-2">Automation Focus Area</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Social media scheduling</li>
                <li>Email marketing workflows</li>
                <li>Chatbot integration</li>
                <li>Ad campaign automation</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Implementation Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Digital Marketing Roadmap
          </h2>
          <div className="space-y-4">
            <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="flex-shrink-0 bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                1
              </span>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Audit & Planning</h3>
                <p className="text-gray-600 dark:text-gray-300">Conduct full digital presence audit and set KPIs</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="flex-shrink-0 bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                2
              </span>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Content Strategy</h3>
                <p className="text-gray-600 dark:text-gray-300">Develop SEO-optimized content calendar</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="flex-shrink-0 bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                3
              </span>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Automation Setup</h3>
                <p className="text-gray-600 dark:text-gray-300">Implement marketing automation tools</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="flex-shrink-0 bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                4
              </span>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Launch & Monitor</h3>
                <p className="text-gray-600 dark:text-gray-300">Execute campaigns with real-time analytics</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="flex-shrink-0 bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                5
              </span>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Optimize</h3>
                <p className="text-gray-600 dark:text-gray-300">Continuously test and improve performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resource CTA */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-8 text-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
          Transform Your Marketing
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
          Get our complete Digital Marketing Toolkit with AI-powered templates and automation guides.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setActiveTab('resources')}
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Get Marketing Resources
          </button>
          <button
            onClick={() => setActiveTab('consultation')}
            className="border border-teal-600 text-teal-600 dark:text-teal-300 dark:border-teal-300 font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Strategy Consultation
          </button>
        </div>
      </div>

      {/* Resources Content */}
      {activeTab === 'resources' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Marketing Resources</h2>
          
          <div className="mb-6">
            <div className="flex space-x-2 mb-4">
              <button 
                onClick={() => setSelectedCategory('seo')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === 'seo' ? 'bg-teal-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                SEO
              </button>
              <button 
                onClick={() => setSelectedCategory('analytics')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === 'analytics' ? 'bg-teal-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                Analytics
              </button>
              <button 
                onClick={() => setSelectedCategory('automation')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === 'automation' ? 'bg-teal-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                Automation
              </button>
            </div>

            {selectedCategory === 'seo' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center mb-2">
                    <span className="bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 p-2 rounded-lg mr-3">
                      🔍
                    </span>
                    <span>SEO Starter Kit</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Complete guide to ranking higher in search results with keyword research templates and optimization checklists.
                  </p>
                  <a href="#" className="text-teal-600 dark:text-teal-400 text-sm font-medium">View Guide →</a>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center mb-2">
                    <span className="bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 p-2 rounded-lg mr-3">
                      ✍️
                    </span>
                    <span>Content Strategy Template</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Plan and execute a 90-day content calendar with SEO optimization built in.
                  </p>
                  <a href="#" className="text-teal-600 dark:text-teal-400 text-sm font-medium">View Template →</a>
                </div>
              </div>
            )}

            {selectedCategory === 'analytics' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center mb-2">
                    <span className="bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 p-2 rounded-lg mr-3">
                      📊
                    </span>
                    <span>Analytics Dashboard</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Ready-to-use Google Data Studio template with key marketing metrics pre-configured.
                  </p>
                  <a href="#" className="text-teal-600 dark:text-teal-400 text-sm font-medium">View Dashboard →</a>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center mb-2">
                    <span className="bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 p-2 rounded-lg mr-3">
                      🎯
                    </span>
                    <span>ROI Calculator</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Measure campaign effectiveness and calculate your marketing return on investment.
                  </p>
                  <a href="#" className="text-teal-600 dark:text-teal-400 text-sm font-medium">View Tool →</a>
                </div>
              </div>
            )}

            {selectedCategory === 'automation' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center mb-2">
                    <span className="bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 p-2 rounded-lg mr-3">
                      🤖
                    </span>
                    <span>Social Media Automation</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Step-by-step guide to automating your social media posting and engagement.
                  </p>
                  <a href="#" className="text-teal-600 dark:text-teal-400 text-sm font-medium">View Guide →</a>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center mb-2">
                    <span className="bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 p-2 rounded-lg mr-3">
                      ✉️
                    </span>
                    <span>Email Workflow Templates</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Pre-built email sequences for onboarding, nurturing, and re-engagement.
                  </p>
                  <a href="#" className="text-teal-600 dark:text-teal-400 text-sm font-medium">View Templates →</a>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <a 
              href="/digital-marketing-resources-full"
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              View All Marketing Resources
            </a>
          </div>
        </div>
      )}

      {/* Consultation Content */}
      {activeTab === 'consultation' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Marketing Strategy Consultation</h2>
          
          <div className="mb-6 bg-teal-50 dark:bg-teal-900/30 p-4 rounded-lg border border-teal-100 dark:border-teal-800">
            <h3 className="font-semibold text-teal-700 dark:text-teal-300 mb-2">What's Included:</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              <li>60-minute strategy session with marketing experts</li>
              <li>Audit of your current digital presence</li>
              <li>Customized recommendations for your business</li>
              <li>Follow-up action plan with resources</li>
            </ul>
          </div>

          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-gray-200"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-gray-200"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="business-type" className="block text-gray-700 dark:text-gray-300 mb-1">Business Type</label>
              <select 
                id="business-type" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-gray-200"
                required
              >
                <option value="">Select your business type</option>
                <option value="ecommerce">E-commerce</option>
                <option value="service">Service Business</option>
                <option value="retail">Retail</option>
                <option value="b2b">B2B</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="focus-area" className="block text-gray-700 dark:text-gray-300 mb-1">Primary Focus Area</label>
              <select 
                id="focus-area" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-gray-200"
                required
              >
                <option value="">Select priority area</option>
                <option value="seo">SEO & Organic Growth</option>
                <option value="social">Social Media Marketing</option>
                <option value="ads">Paid Advertising</option>
                <option value="content">Content Marketing</option>
                <option value="analytics">Analytics & Optimization</option>
              </select>
            </div>

            <div>
              <label htmlFor="challenges" className="block text-gray-700 dark:text-gray-300 mb-1">Current Challenges</label>
              <textarea 
                id="challenges" 
                rows={3} 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="What marketing challenges are you facing?"
                required
              ></textarea>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
              >
                <span>Request Consultation</span>
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
            Marketing Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div className="flex items-start mb-3">
                <div className="bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 p-3 rounded-lg mr-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">E-commerce Growth</h3>
                  <p className="text-sm text-teal-600 dark:text-teal-400">Lagos, Nigeria</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Increased online sales by 220% in 6 months through SEO optimization and targeted social media automation.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div className="flex items-start mb-3">
                <div className="bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Service Business</h3>
                  <p className="text-sm text-teal-600 dark:text-teal-400">Nairobi, Kenya</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Reduced customer acquisition cost by 65% through analytics-driven ad optimization and email automation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Marketing Quick Wins</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-lg text-teal-600 dark:text-teal-400 mb-3">For SEO</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Optimize page titles and meta descriptions</li>
              <li>Improve page loading speed</li>
              <li>Create quality backlinks through guest posts</li>
              <li>Use long-tail keywords in your content</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-lg text-teal-600 dark:text-teal-400 mb-3">For Social Media</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Schedule posts for optimal times</li>
              <li>Use AI tools for content ideation</li>
              <li>Engage with your audience daily</li>
              <li>Analyze and double down on what works</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalMarketingPage;