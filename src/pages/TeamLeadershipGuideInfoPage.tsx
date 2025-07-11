import React from 'react';

const TeamLeadershipGuideInfoPage: React.FC = () => (
  <div className="pt-20 px-4 max-w-3xl mx-auto">
    <h1 className="text-4xl font-bold mb-6 text-orange-500 dark:text-orange-300">
      Building Teams & Leadership Guide
    </h1>
    <p className="mb-4 text-lg text-gray-700 dark:text-gray-200">
      Learn how to hire, train, and retain top talent. This guide helps you develop leadership skills, create a positive culture, and manage remote or hybrid teams for business growth.
    </p>
    <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-200">
      <li>Hiring templates</li>
      <li>Leadership tips</li>
      <li>Team management strategies</li>
      <li>Culture building</li>
      <li>Remote and hybrid team management</li>
    </ul>
    <p className="mb-8 text-gray-600 dark:text-gray-400">
      For more resources, visit our <a href="/resources/business-growth" className="text-orange-500 underline">Business Growth Resources</a> page.
    </p>
  </div>
);

export default TeamLeadershipGuideInfoPage;