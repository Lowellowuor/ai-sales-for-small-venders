import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SalesScriptTemplatesInfoPage: React.FC = () => {
  const [expandedScript, setExpandedScript] = useState<number | null>(null);

  const industryScripts = [
    {
      name: 'Agriculture',
      description: 'Boost crop yields with persuasive pitches for seeds and fertilizers',
      content: `**Opening:** "Hello [Farmer's Name], I'm [Your Name] from [Company]. We help farmers increase yields by 40% with our premium seeds."\n\n**Pitch:** "Many farmers struggle with low yields. Our drought-resistant seeds have helped [Farm Name] harvest [X] more bags per acre last season."\n\n**Close:** "Can I schedule a demo at your farm this week?"`
    },
    {
      name: 'Solar Energy',
      description: 'Sell solar solutions with cost-saving arguments',
      content: `**Opening:** "Hello [Name], does your business lose money during power outages?"\n\n**Pitch:** "Our solar systems provide 24/7 power at 60% lower cost than generators. [Business Name] recovered their investment in 8 months."\n\n**Close:** "We offer free installation estimates. When can our engineer visit?"`
    },
    {
      name: 'FinTech',
      description: 'Convert mobile money agents and digital banking clients',
      content: `**Opening:** "Hi [Agent Name], are you looking to increase your mobile money profits?"\n\n**Pitch:** "Our platform helps agents like you earn 25% more through [features]. [Agent X] grew their business by KES 50,000/month."\n\n**Close:** "Can I show you how it works via WhatsApp demo?"`
    },
    // Add remaining 12 industries with similar content structure
    {
      name: 'Healthcare',
      description: 'Pitch medical supplies and services effectively',
      content: `**Opening:** "Dr. [Name], are you currently facing any challenges with medical supplies?"\n\n**Pitch:** "We provide WHO-approved equipment at 15% below market rates with next-day delivery. [Clinic Y] saved KES 200,000 last quarter."\n\n**Close:** "Shall I send our catalog to your email?"`
    }
  ];

  const toggleScript = (index: number) => {
    setExpandedScript(expandedScript === index ? null : index);
  };

  return (
    <div className="pt-20 px-4 max-w-6xl mx-auto pb-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-green-600 dark:text-green-300">
          Professional Sales Script Templates
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Ready-to-use scripts for 15 industries, optimized for African markets
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Standard Framework Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Standard Sales Framework</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-2 text-green-600 dark:text-green-400">Opening (15-30 sec)</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Warm greeting with personalization</li>
                <li>Clear identification of your company</li>
                <li>Permission question</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2 text-green-600 dark:text-green-400">Value Proposition (60 sec)</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Identify specific pain points</li>
                <li>Present your solution clearly</li>
                <li>Include social proof and metrics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Kenya Example Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Kenya Market Example</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p><strong>Greeting:</strong> "Habari [Name]? This is [Your Name] from [Company]."</p>
            <p><strong>Pitch:</strong> "We help businesses in [Location] solve [problem]. For example, [Local Business] increased sales by 40%."</p>
            <p><strong>Close:</strong> "We're offering a special deal this month. Can I send details?"</p>
          </div>
        </div>
      </div>

      {/* Industry Scripts Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Industry-Specific Scripts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industryScripts.map((industry, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => toggleScript(index)}
            >
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">{industry.name}</h3>
                  <svg 
                    className={`w-5 h-5 transition-transform ${expandedScript === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-2">{industry.description}</p>
              </div>
              
              {expandedScript === index && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="prose dark:prose-invert max-w-none">
                    {industry.content.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <button className="mt-4 text-green-600 dark:text-green-400 hover:underline text-sm font-medium">
                    Copy Script to Clipboard
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-green-50 dark:bg-gray-800 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Get Complete Script Library</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Access all 15 professional sales scripts with customizable templates for each industry.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
            Download Full Package
          </button>
          <Link 
            to="/resources/sales-training" 
            className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-3 px-8 rounded-lg transition-colors border border-gray-300 dark:border-gray-600"
          >
            Sales Training Resources
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SalesScriptTemplatesInfoPage;