import React from 'react';

const SalesPitchGuideInfoPage: React.FC = () => (
  <div className="pt-20 px-4 max-w-3xl mx-auto">
    <h1 className="text-4xl font-bold mb-6 text-primary-700 dark:text-primary-300">
      Complete Sales Pitch Guide
    </h1>
    <p className="mb-4 text-lg text-gray-700 dark:text-gray-200">
      The Complete Sales Pitch Guide is designed for African entrepreneurs and vendors who want to master persuasive selling. This guide covers:
    </p>
    <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-200">
      <li>Step-by-step pitch structure</li>
      <li>Objection handling techniques</li>
      <li>Closing strategies tailored for African markets</li>
      <li>Real-world examples and case studies</li>
      <li>18 pages of actionable content</li>
    </ul>
    <p className="mb-8 text-gray-600 dark:text-gray-400">
      Use this guide to improve your sales conversations, close more deals, and grow your business. For more resources, visit our <a href="/resources/sales-training" className="text-primary-600 underline">Sales Training Resources</a> page.
    </p>
  </div>
);

export default SalesPitchGuideInfoPage;