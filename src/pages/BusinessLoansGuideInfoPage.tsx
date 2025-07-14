import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BusinessLoansGuideInfoPage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const guideSections = [
    {
      title: 'Loan Application Checklist',
      summary: 'Essential documents and requirements for loan approval',
      content: `**1. Business Documentation**\n- Certified copies of business registration\n- 6 months bank statements\n- Tax compliance certificate\n\n**2. Financial Records**\n- 2 years audited financials (if available)\n- Current debt schedule\n- 12-month cash flow projection\n\n**3. Collateral Options**\n- Title deeds for property\n- Logbook for vehicles\n- Inventory list with valuations\n\n**Kenya Example:**\nMost banks require minimum 6 months operation history and KRA PIN certificate`
    },
    {
      title: 'Investor Pitch Templates',
      summary: 'Ready-to-use pitch structures for different funding stages',
      content: `**Seed Funding Pitch Structure**\n1. Problem: "60% of Kenyan SMEs struggle with [specific problem]"\n2. Solution: "Our [product] solves this by [unique approach]"\n3. Market: "KES X billion opportunity in [region]"\n4. Ask: "Seeking KES X for [specific use]"\n\n**Growth Stage Template**\n"Currently serving X customers with Y% monthly growth\nSeeking KES X to expand to [new markets]"\n\n**Local Adaptation:**\nInclude M-Pesa integration case studies for fintech pitches`
    },
    {
      title: 'Funding Sources Comparison',
      summary: 'Pros and cons of different financing options',
      content: `**1. Commercial Banks**\n- Pros: Lower interest rates\n- Cons: Strict requirements\n\n**2. Microfinance**\n- Pros: Easier qualification\n- Cons: Smaller loan amounts\n\n**3. SACCOs**\n- Pros: Community-based\n- Cons: Requires membership\n\n**4. Angel Investors**\n- Pros: Business mentorship\n- Cons: Equity requirement\n\n**Kenya Focus:**\nHighlight success rates with Kenya Women Finance Trust for female entrepreneurs`
    },
    {
      title: 'Credit Score Improvement',
      summary: 'Steps to build and maintain good business credit',
      content: `**1. Timely Payments**\n- Pay suppliers within terms\n- Meet all loan obligations\n\n**2. Credit Utilization**\n- Keep credit usage below 30% of limit\n\n**3. Credit Mix**\n- Combine different credit types (loans, credit cards)\n\n**4. Regular Monitoring**\n- Check CRB reports annually\n- Dispute any errors\n\n**Kenya Specific:**\nRegister with Metropol, TransUnion, or Creditinfo CRB`
    }
  ];

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <div className="pt-20 px-4 max-w-6xl mx-auto pb-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-300">
          Business Loans & Funding Guide
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Comprehensive strategies to access capital and grow your business in African markets
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Guide Highlights</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Step-by-step loan application process</li>
            <li>Investor pitch templates with local examples</li>
            <li>Comparison of African funding sources</li>
            <li>Credit building strategies</li>
            <li>Common financial mistakes to avoid</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Kenya Market Example</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p><strong>Bank Loan:</strong> "KCB requires 2 years operation history and collateral worth 120% of loan value"</p>
            <p><strong>SACCO Option:</strong> "Mwalimu SACCO offers business loans at 12% interest for members"</p>
            <p><strong>Government Fund:</strong> "Youth Enterprise Fund provides loans up to KES 500,000 for young entrepreneurs"</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Guide Sections Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guideSections.map((section, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => toggleSection(index)}
            >
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">{section.title}</h3>
                  <svg 
                    className={`w-5 h-5 transition-transform ${expandedSection === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-2">{section.summary}</p>
              </div>
              
              {expandedSection === index && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="prose dark:prose-invert max-w-none">
                    {section.content.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <button className="mt-4 text-green-600 dark:text-green-400 hover:underline text-sm font-medium">
                    Download This Section
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center bg-green-50 dark:bg-gray-800 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Get the Complete Business Funding Guide</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Includes all templates, lender comparisons, and African market success strategies
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
            Download Full Guide
          </button>
          <Link 
            to="/resources/business-growth" 
            className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-3 px-8 rounded-lg transition-colors border border-gray-300 dark:border-gray-600"
          >
            Business Growth Resources
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessLoansGuideInfoPage;