import React from 'react';

const WhatsAppMessageTemplatesInfoPage: React.FC = () => (
  <div className="pt-20 px-4 max-w-3xl mx-auto">
    <h1 className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-300">
      WhatsApp Sales Message Templates
    </h1>
    <p className="mb-4 text-lg text-gray-700 dark:text-gray-200">
      Ready-to-use message templates for greetings, follow-ups, promotions, and closing sales. Adapted for different industries and customer types. Easily copy, edit, and use these scripts to boost your WhatsApp sales conversations.
    </p>
    <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-200">
      <li>Greetings and introductions</li>
      <li>Follow-up messages</li>
      <li>Promotional offers</li>
      <li>Closing sales scripts</li>
      <li>Industry-specific and customer-type templates</li>
    </ul>
    <p className="mb-8 text-gray-600 dark:text-gray-400">
      For the full template, sign up for a free trial!
    </p>
    <p className="mb-8 text-gray-600 dark:text-gray-400">
      For more WhatsApp sales resources, visit our <a href="/resources/whatsapp-tips" className="text-blue-600 underline">WhatsApp Sales Tips</a> page.
    </p>
  </div>
);

export default WhatsAppMessageTemplatesInfoPage;