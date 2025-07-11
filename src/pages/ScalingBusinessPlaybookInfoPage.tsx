import React from 'react';

const ScalingBusinessPlaybookInfoPage: React.FC = () => (
  <div className="pt-20 px-4 max-w-3xl mx-auto">
    <h1 className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-300">
      Scaling Your Business Playbook
    </h1>
    <p className="mb-4 text-lg text-gray-700 dark:text-gray-200">
      Step-by-step playbooks for scaling operations, hiring, expanding to new markets, and automating processes. Includes checklists, growth metrics, and digital transformation tips.
    </p>
    <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-200">
      <li>Scaling checklist</li>
      <li>Hiring guide</li>
      <li>Automation tools</li>
      <li>Growth metrics</li>
      <li>Market expansion strategies</li>
    </ul>
    <p className="mb-8 text-gray-600 dark:text-gray-400">
      For more resources, visit our <a href="/resources/business-growth" className="text-blue-600 underline">Business Growth Resources</a> page.
    </p>
  </div>
);

export default ScalingBusinessPlaybookInfoPage;