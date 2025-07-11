import React from 'react';

const SavingsStrategiesInfoPage: React.FC = () => (
  <div className="pt-20 px-4 max-w-3xl mx-auto">
    <h1 className="text-4xl font-bold mb-6 text-pink-500 dark:text-pink-300">
      Smart Savings & Investment Guide
    </h1>
    <p className="mb-4 text-lg text-gray-700 dark:text-gray-200">
      Discover savings plans for entrepreneurs, emergency funds, and how to reinvest profits for sustainable growth. This guide includes digital savings tools, group savings (chamas), and investment basics.
    </p>
    <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-200">
      <li>Savings planner</li>
      <li>Chama guide</li>
      <li>Digital savings tools</li>
      <li>Investment basics</li>
      <li>Emergency fund strategies</li>
    </ul>
    <p className="mb-8 text-gray-600 dark:text-gray-400">
      For more resources, visit our <a href="/resources/business-growth" className="text-pink-500 underline">Business Growth Resources</a> page.
    </p>
  </div>
);

export default SavingsStrategiesInfoPage;