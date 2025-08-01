import React from 'react';
import { BookOpen, Code, Server, Zap, Link as LinkIcon } from 'lucide-react';

const ApiDocumentationPage: React.FC = () => {
  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-700 to-blue-400 text-white rounded-2xl mb-12 shadow-lg">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">API Documentation</h1>
          <p className="mb-6 text-lg md:text-xl text-white/90">
            Integrate with PitchPoa AI using our robust and secure API. Automate workflows, connect your apps, and unlock new business possibilities.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">API Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="#authentication"
            className="flex items-center bg-white dark:bg-dark-800 rounded-xl shadow p-5 hover:shadow-lg transition"
          >
            <Zap className="w-6 h-6 text-blue-600 mr-3" />
            <span className="font-semibold text-blue-700 dark:text-blue-300">Authentication</span>
          </a>
          <a
            href="#endpoints"
            className="flex items-center bg-white dark:bg-dark-800 rounded-xl shadow p-5 hover:shadow-lg transition"
          >
            <Server className="w-6 h-6 text-green-600 mr-3" />
            <span className="font-semibold text-green-700 dark:text-green-300">API Endpoints</span>
          </a>
          <a
            href="#examples"
            className="flex items-center bg-white dark:bg-dark-800 rounded-xl shadow p-5 hover:shadow-lg transition"
          >
            <Code className="w-6 h-6 text-purple-600 mr-3" />
            <span className="font-semibold text-purple-700 dark:text-purple-300">Code Examples</span>
          </a>
          <a
            href="#webhooks"
            className="flex items-center bg-white dark:bg-dark-800 rounded-xl shadow p-5 hover:shadow-lg transition"
          >
            <LinkIcon className="w-6 h-6 text-orange-600 mr-3" />
            <span className="font-semibold text-orange-700 dark:text-orange-300">Webhooks</span>
          </a>
        </div>
      </section>

      {/* Authentication */}
      <section id="authentication" className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Authentication</h2>
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow p-6">
          <p className="text-gray-700 dark:text-gray-200 mb-2">
            All API requests require authentication using an API key. You can generate and manage your API keys in your account dashboard.
          </p>
          <pre className="bg-gray-100 dark:bg-dark-700 rounded p-4 text-sm overflow-x-auto mb-2">
            <code>
{`Authorization: Bearer YOUR_API_KEY`}
            </code>
          </pre>
          <p className="text-gray-600 dark:text-gray-400 text-xs">
            Never share your API key publicly. Keep it secure.
          </p>
        </div>
      </section>

      {/* API Endpoints */}
      <section id="endpoints" className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">API Endpoints</h2>
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow p-6">
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200 space-y-2">
            <li>
              <span className="font-semibold">GET /api/v1/users</span> – Retrieve a list of users.
            </li>
            <li>
              <span className="font-semibold">POST /api/v1/messages</span> – Send a message via WhatsApp integration.
            </li>
            <li>
              <span className="font-semibold">GET /api/v1/analytics</span> – Fetch analytics and reporting data.
            </li>
            <li>
              <span className="font-semibold">POST /api/v1/webhooks</span> – Register a webhook endpoint.
            </li>
          </ul>
        </div>
      </section>

      {/* Code Examples */}
      <section id="examples" className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Code Examples</h2>
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow p-6">
          <p className="mb-2 text-gray-700 dark:text-gray-200">Example: Send a WhatsApp message</p>
          <pre className="bg-gray-100 dark:bg-dark-700 rounded p-4 text-sm overflow-x-auto mb-2">
            <code>
{`curl -X POST https://api.pitchpoa.ai/v1/messages \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+254700123456",
    "message": "Hello from PitchPoa AI!"
  }'`}
            </code>
          </pre>
          <p className="mb-2 text-gray-700 dark:text-gray-200">Example: Fetch analytics</p>
          <pre className="bg-gray-100 dark:bg-dark-700 rounded p-4 text-sm overflow-x-auto">
            <code>
{`curl -X GET https://api.pitchpoa.ai/v1/analytics \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
            </code>
          </pre>
        </div>
      </section>

      {/* Webhooks */}
      <section id="webhooks" className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Webhooks</h2>
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow p-6">
          <p className="text-gray-700 dark:text-gray-200 mb-2">
            Use webhooks to receive real-time notifications about important events (e.g., new messages, user signups).
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200 space-y-2 mb-2">
            <li>Register your webhook endpoint via <span className="font-semibold">POST /api/v1/webhooks</span></li>
            <li>We will send a POST request to your endpoint when an event occurs.</li>
          </ul>
          <pre className="bg-gray-100 dark:bg-dark-700 rounded p-4 text-sm overflow-x-auto">
            <code>
{`{
  "event": "message.sent",
  "data": {
    "to": "+254700123456",
    "message": "Hello from PitchPoa AI!"
  }
}`}
            </code>
          </pre>
        </div>
      </section>

      {/* Support & More */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Need More Help?</h2>
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow p-6">
          <p className="text-gray-700 dark:text-gray-200 mb-2">
            For full API reference, SDKs, and advanced integration guides, visit our <a href="https://developer.pitchpoa.ai" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-300 underline">Developer Portal</a>.
          </p>
          <p className="text-gray-700 dark:text-gray-200">
            For technical support, contact us at <a href="mailto:support@pitchpoa.com" className="text-blue-700 dark:text-blue-300 underline">support@pitchpoa.com</a>.
          </p>
        </div>
      </section>
    </div>
  );
};

export
    default ApiDocumentationPage;