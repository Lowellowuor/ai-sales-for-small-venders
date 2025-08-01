import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SalesPitchGuideInfoPage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const guideSections = [
    {
      title: 'Pitch Structure Framework',
      summary: 'Master the 5-step persuasive pitch formula',
      content: `**1. Attention-Grabbing Opener** (15 sec)\n"Did you know [shocking statistic] about [industry]?"\n\n**2. Pain Point Identification**\n"Many [target customers] struggle with [specific problem]..."\n\n**3. Solution Presentation**\n"Our [product] solves this by [key benefits]"\n\n**4. Social Proof**\n"[Similar business] achieved [results] in [timeframe]"\n\n**5. Clear Call-to-Action**\n"Let's [next step] on [timeline]"`
    },
    {
      title: 'Objection Handling',
      summary: 'Techniques to overcome common objections',
      content: `**"It's too expensive"**\n"I understand. Many clients initially think that, until they see it pays for itself in [timeframe]. [Example] recovered their investment in just [X] days."\n\n**"I need to think about it"**\n"Of course! What specific concerns would you like to think through? Maybe I can help clarify now."\n\n**"We already have a supplier"**\n"That's great! Many of our clients initially kept their old supplier as backup while trying us. Would a small trial order make sense?"`
    },
    {
      title: 'Closing Techniques',
      summary: 'African-market specific closing strategies',
      content: `**Alternative Choice Close**\n"Would you prefer the [Option A] package or [Option B]?"\n\n**Timeline Close**\n"We have a special price if we start by [date]. Shall I reserve your spot?"\n\n**Testimonial Close**\n"[Similar business] felt hesitant too, but after seeing [results], they wished they started sooner. Can we begin with [small commitment]?"`
    },
    {
      title: 'Case Studies',
      summary: 'Real African business success stories',
      content: `**Nairobi Retailer**\nIncreased daily sales by 35% using our pitch framework\n\n**Lagos Solar Startup**\nClosed 8/10 demo appointments with our objection handling techniques\n\n**Johannesburg Consultant**\nDoubled conversion rate by implementing our closing strategies`
    }
  ];

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <div className="pt-20 px-4 max-w-6xl mx-auto pb-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-primary-700 dark:text-primary-300">
          Complete Sales Pitch Guide
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Master persuasive selling with our 18-page guide tailored for African markets
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Guide Highlights</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Step-by-step pitch structures</li>
            <li>Cultural adaptation techniques</li>
            <li>Price negotiation frameworks</li>
            <li>WhatsApp/phone/in-person variations</li>
            <li>18 pages of actionable content</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Kenya Market Example</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p><strong>Opener:</strong> "Habari [Name]? Nairobi businesses are losing 30% of customers to [problem]. Did you experience this?"</p>
            <p><strong>Pitch:</strong> "Our solution helps shops like yours keep customers longer. [Shop in Kawangware] increased repeat sales by 40%."</p>
            <p><strong>Close:</strong> "We can implement this by Friday. Should I reserve your spot?"</p>
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
                  <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400">{section.title}</h3>
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
                  <button className="mt-4 text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium">
                    Copy This Section
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center bg-primary-50 dark:bg-gray-800 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Get the Complete 18-Page Guide</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Includes all frameworks, African market adaptations, and downloadable templates
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
            Download Full Guide
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

export default SalesPitchGuideInfoPage;