import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const WhatsAppSalesGuideInfoPage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const guideSections = [
    {
      title: 'First Message Framework',
      summary: 'How to craft the perfect opening message',
      content: `**1. Personalized Greeting**\n"Hello [Name], I hope you're doing well! This is [Your Name] from [Business]."\n\n**2. Context Setting**\n"I noticed [relevant observation about their business/need]..."\n\n**3. Value Proposition**\n"We've helped similar businesses [achieve result] by [your solution]"\n\n**4. Gentle CTA**\n"Would you have 2 minutes to hear how this could work for you?"\n\n**Example (Kenya):**\n"Habari [Name]? We help Nairobi shops like yours boost WhatsApp sales by 30%. [Shop Name] increased orders by 15% last month. Can I share how?"`
    },
    {
      title: 'Trust-Building Techniques',
      summary: 'Proven methods to establish credibility',
      content: `**1. Social Proof**\nShare testimonials: "[Customer] increased sales by 40% using our method"\n\n**2. Product Proof**\nSend short videos (15-30 sec) showing your product in action\n\n**3. Responsiveness**\nReply within 1 hour during business hours\n\n**4. Local References**\n"Here's what [Local Business] said about us..."\n\n**African Adaptation:**\nUse voice notes for personal connection (culturally preferred in many regions)`
    },
    {
      title: 'Closing Strategies',
      summary: 'How to seal the deal on WhatsApp',
      content: `**1. Limited Offer Close**\n"This 20% discount is only valid until Friday at 5pm"\n\n**2. Question Close**\n"Would you prefer the [Product A] or [Product B] package?"\n\n**3. Payment Options**\n"Would M-Pesa or bank transfer work better for you?"\n\n**4. Urgency Creator**\n"Only 3 items left at this price - should I reserve one for you?"\n\n**Kenya Example:**\n"I can dispatch today if we confirm by 2pm via M-Pesa to [number]"`
    },
    {
      title: 'Message Templates',
      summary: 'Ready-to-use templates for different scenarios',
      content: `**Follow-Up Template**\n"Hi [Name], just following up on my previous message. Did you have any questions about [offer]?"\n\n**Objection Response**\n"I understand budget is tight. Many clients start with our [affordable option] at just [price]"\n\n**Closing Template**\n"Great! To confirm your [product], please send [amount] to [payment details]. I'll send tracking immediately"\n\n**African Adaptation:**\nInclude local language greetings (e.g., "Habari" in Swahili)`
    }
  ];

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <div className="pt-20 px-4 max-w-6xl mx-auto pb-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-300">
          WhatsApp Sales Success Guide
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Master WhatsApp selling with our 12-page guide combining global best practices and African market insights
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Guide Highlights</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Complete WhatsApp sales funnel strategies</li>
            <li>Cultural adaptations for African markets</li>
            <li>Visual selling techniques (images/videos)</li>
            <li>Response rate optimization</li>
            <li>12 pages of actionable content</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Kenya Market Example</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p><strong>Opening:</strong> "Habari [Name]? We help Nairobi businesses increase WhatsApp sales like [Client] who grew by 35% last month."</p>
            <p><strong>Engagement:</strong> "Here's a 20-second video showing how it works → [link]"</p>
            <p><strong>Closing:</strong> "This offer ends tonight at 10pm. Reply 'YES' to lock in the discount via M-Pesa."</p>
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
                    Copy Template
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center bg-green-50 dark:bg-gray-800 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Get the Complete 12-Page WhatsApp Guide</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Includes all message templates, African market adaptations, and visual selling techniques
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
            Download Full Guide
          </button>
          <Link 
            to="/resources/whatsapp-tips" 
            className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-3 px-8 rounded-lg transition-colors border border-gray-300 dark:border-gray-600"
          >
            WhatsApp Sales Tips
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppSalesGuideInfoPage;