const HelpCenterPage = () => (
  <div className="max-w-3xl mx-auto py-20 px-4">
    <h1 className="text-3xl font-bold mb-6">Help Centre</h1>
    <p className="mb-4 text-gray-700">
      Welcome to the Help Centre! How can we assist you today?
    </p>

    {/* FAQ Section */}
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
      <ul className="space-y-4">
        <li>
          <strong>How do I start a free trial?</strong>
          <p>Click the "Start Free Trial" button on the homepage or pricing section. You’ll be guided through a quick signup process.</p>
        </li>
        <li>
          <strong>What is PitchPoa AI?</strong>
          <p>PitchPoa AI is an AI-powered sales coaching platform that helps vendors and teams improve their sales pitches, communication, and customer engagement using real-time feedback and multilingual support.</p>
        </li>
        <li>
          <strong>How do I contact support?</strong>
          <p>You can reach our support team via the contact form below or email us at <a href="mailto:support@pitchpoa.com" className="text-primary-600 underline">support@pitchpoa.com</a>.</p>
        </li>
        <li>
          <strong>Is my data secure?</strong>
          <p>Yes. We are ISO 27001 certified and SOC 2 compliant. Your data is encrypted and handled with the highest security standards.</p>
        </li>
        <li>
          <strong>Which payment methods are supported?</strong>
          <p>We support M-Pesa, credit cards, and other flexible payment options.</p>
        </li>
      </ul>
    </div>

    {/* Contact Form */}
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Your Email</label>
          <input type="email" className="w-full border rounded px-3 py-2" placeholder="you@example.com" required />
        </div>
        <div>
          <label className="block mb-1 font-medium">How can we help?</label>
          <textarea className="w-full border rounded px-3 py-2" rows={4} placeholder="Describe your issue or question..." required />
        </div>
        <button type="submit" className="bg-primary-500 text-white px-6 py-2 rounded hover:bg-primary-600 transition-colors">
          Submit
        </button>
      </form>
    </div>

    {/* Additional Resources */}
    <div>
      <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>
          <a href="/privacy" className="text-primary-600 underline">Privacy Policy</a>
        </li>
        <li>
          <a href="/terms" className="text-primary-600 underline">Terms of Service</a>
        </li>
        <li>
          <a href="/pricing" className="text-primary-600 underline">Pricing & Plans</a>
        </li>
        <li>
          <a href="/demo" className="text-primary-600 underline">Interactive Demo</a>
        </li>
      </ul>
    </div>
  </div>
);

export default HelpCenterPage;