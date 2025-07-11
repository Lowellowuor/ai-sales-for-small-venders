import React from 'react';

const LossRiskManagementInfoPage: React.FC = () => (
  <div className="pt-20 px-4 max-w-3xl mx-auto">
    <h1 className="text-4xl font-bold mb-6 text-red-500 dark:text-red-300">
      Managing Loss & Risk Guide
    </h1>
    <p className="mb-4 text-lg text-gray-700 dark:text-gray-200">
      Identify, manage, and recover from business losses. This guide offers practical advice on risk assessment, insurance, fraud prevention, and building resilience for your business.
    </p>
    <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-200">
      <li>Risk checklist</li>
      <li>Insurance tips</li>
      <li>Fraud prevention</li>
      <li>Recovery plans</li>
      <li>Building business resilience</li>
    </ul>
    <p className="mb-8 text-gray-600 dark:text-gray-400">
      For more resources, visit our <a href="/resources/business-growth" className="text-red-500 underline">Business Growth Resources</a> page.
    </p>
  </div>
);

export default LossRiskManagementInfoPage;