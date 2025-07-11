import React from 'react';

const DigitalTransformationGuideInfoPage: React.FC = () => (
  <div className="pt-20 px-4 max-w-3xl mx-auto">
    <h1 className="text-4xl font-bold mb-6 text-purple-600 dark:text-purple-300">
      Digital Transformation Guide
    </h1>
    <p className="mb-4 text-lg text-gray-700 dark:text-gray-200">
      Upgrade your business with digital tools: e-commerce, mobile payments, CRM, and social media marketing. Stay competitive in today’s digital economy.
    </p>
    <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-200">
      <li>E-commerce guide</li>
      <li>CRM tools</li>
      <li>Mobile payments</li>
      <li>Social media tips</li>
      <li>Digital marketing strategies</li>
    </ul>
    <p className="mb-8 text-gray-600 dark:text-gray-400">
      For more resources, visit our <a href="/resources/business-growth" className="text-purple-600 underline">Business Growth Resources</a> page.
    </p>
  </div>
);

export default DigitalTransformationGuideInfoPage;