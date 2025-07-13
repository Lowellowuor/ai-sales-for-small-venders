import React from 'react';

const SalesScriptTemplatesInfoPage: React.FC = () => (
  <div className="pt-20 px-4 max-w-3xl mx-auto">
    <h1 className="text-4xl font-bold mb-6 text-green-600 dark:text-green-300">
      Sales Script Templates
    </h1>
    <p className="mb-4 text-lg text-gray-700 dark:text-gray-200">
      Editable scripts for 15 industries, perfect for phone, WhatsApp, or in-person sales. Tailored for African markets and easy to customize for your business needs.
    </p>
    <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-200">
      <li>Industry-specific sales scripts</li>
      <li>Templates for greetings, pitching, objection handling, and closing</li>
      <li>Adaptable for different customer types and situations</li>
      <li>Easy to copy, edit, and use in daily sales</li>
    </ul>
    <p className="mb-8 text-gray-600 dark:text-gray-400">
      For the full template, sign up for a free trial!
    </p>
    <p className="mb-8 text-gray-600 dark:text-gray-400">
      For more sales resources, visit our <a href="/resources/sales-training" className="text-green-600 underline">Sales Training Resources</a> page.
    </p>
  </div>
);

export default SalesScriptTemplatesInfoPage;