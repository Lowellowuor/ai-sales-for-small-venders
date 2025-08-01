import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const WhatsAppMessageTemplatesInfoPage: React.FC = () => {
  const [expandedTemplate, setExpandedTemplate] = useState<number | null>(null);

  const templateCategories = [
    {
      name: 'Greetings & Introductions',
      description: 'Professional yet friendly opening messages',
      templates: [
        {
          title: 'First Contact Template',
          content: `*Hello [Name],* 👋\n\nThis is [Your Name] from [Company]. We help [target audience] like you [solve problem].\n\nFor example, we recently helped [Client Name] achieve [result]. Would you have 1 minute to hear how we could help you too?`
        },
        {
          title: 'Warm Introduction',
          content: `*Good [morning/afternoon] [Name],* 🌞\n\n[Referrer Name] suggested I reach out to you about [specific solution]. We've helped similar businesses in [location] [achieve result].\n\nWould you be open to a quick chat this week?`
        }
      ]
    },
    {
      name: 'Follow-Up Messages',
      description: 'Polite yet persistent follow-up templates',
      templates: [
        {
          title: 'Gentle Follow-Up',
          content: `*Hi [Name],* 🤗\n\nJust following up on my previous message about [offer]. Did you have any questions I can answer?\n\nWe're offering [special incentive] until [date] if you'd like to take advantage.`
        },
        {
          title: 'Value-Add Follow-Up',
          content: `*Hello [Name],* 👋\n\nI wanted to share this quick tip that helped [similar client]: [valuable tip].\n\nBy the way, were you able to review my earlier message about [solution]? I'm happy to answer any questions.`
        }
      ]
    },
    {
      name: 'Promotional Offers',
      description: 'Effective sales promotion messages',
      templates: [
        {
          title: 'Limited-Time Offer',
          content: `*🚨 Special Offer Just for You!* 🚨\n\n[Name], until [date], we're offering [discount/details] on [product].\n\nThis has helped clients like [example] achieve [result].\n\nReply "YES" to claim your discount!`
        },
        {
          title: 'Exclusive VIP Offer',
          content: `*[Name], Exclusive Invitation!* 💎\n\nAs a valued contact, you qualify for our [offer name] with [benefits].\n\nOnly available until [date] for our top clients.\n\nShall I reserve your spot?`
        }
      ]
    },
    {
      name: 'Closing Scripts',
      description: 'Conversation-enders that get results',
      templates: [
        {
          title: 'Direct Close',
          content: `*Great news, [Name]!* 🎉\n\nTo confirm your order, please send [amount] via [payment method] to [details].\n\nI'll immediately process your [product/service] and send confirmation.`
        },
        {
          title: 'Alternative Choice Close',
          content: `*[Name], would you prefer:*\n\nOption A: [Package 1 details]\nOR\nOption B: [Package 2 details]?\n\nBoth are great choices - which works better for you?`
        }
      ]
    }
  ];

  const toggleTemplate = (index: number) => {
    setExpandedTemplate(expandedTemplate === index ? null : index);
  };

  return (
    <div className="pt-20 px-4 max-w-6xl mx-auto pb-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-blue-600 dark:text-blue-300">
          WhatsApp Sales Message Templates
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Ready-to-use templates optimized for African markets across different sales scenarios
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Template Features</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Cultural adaptations for African markets</li>
            <li>Mobile-friendly formatting</li>
            <li>Emoji-enhanced for engagement</li>
            <li>Easy copy-paste functionality</li>
            <li>Industry-specific variations</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Kenya Market Example</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p><strong>Greeting:</strong> "Habari [Name]? This is [Your Name] from [Company]. We help Nairobi businesses like yours [solve problem]."</p>
            <p><strong>Promotion:</strong> "🚀 Until Friday, get 15% off when you pay via M-Pesa to [number]"</p>
            <p><strong>Closing:</strong> "To confirm your order, reply with 'YES' and we'll dispatch today!"</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Template Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templateCategories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div 
                className="p-6 cursor-pointer"
                onClick={() => toggleTemplate(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{category.name}</h3>
                  <svg 
                    className={`w-5 h-5 transition-transform ${expandedTemplate === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-2">{category.description}</p>
              </div>
              
              {expandedTemplate === index && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-200 dark:border-gray-700">
                  {category.templates.map((template, templateIndex) => (
                    <div key={templateIndex} className="mb-6 last:mb-0">
                      <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">{template.title}</h4>
                      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                        <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-300">{template.content}</pre>
                        <button className="mt-3 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                          Copy Template
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center bg-blue-50 dark:bg-gray-800 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Get Our Complete WhatsApp Template Library</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Access 100+ customizable templates for all industries and sales scenarios
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
            Download All Templates
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

export default WhatsAppMessageTemplatesInfoPage;