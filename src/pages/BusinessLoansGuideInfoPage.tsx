import React from 'react';

const BusinessLoansGuideInfoPage: React.FC = () => (
  <div className="pt-20 px-4 max-w-3xl mx-auto">
    <h1 className="text-4xl font-bold mb-6 text-green-700 dark:text-green-300">
      Business Loans & Funding Guide
    </h1>
    <p className="mb-4 text-lg text-gray-700 dark:text-gray-200">
      Learn how to access business loans, pitch to investors, and leverage microfinance. This guide helps you prepare your business for funding, understand credit, and avoid common loan mistakes.
    </p>
    <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-200">
      <li>Loan checklist</li>
      <li>Investor pitch templates</li>
      <li>Funding sources</li>
      <li>Credit basics</li>
      <li>Common mistakes to avoid</li>
    </ul>
    <p className="mb-8 text-gray-600 dark:text-gray-400">
      For more resources, visit our <a href="/resources/business-growth" className="text-green-600 underline">Business Growth Resources</a> page.
    </p>
  </div>
);

export default BusinessLoansGuideInfoPage;