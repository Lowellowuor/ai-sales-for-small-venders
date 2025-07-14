import React, { useState } from 'react';
import { Cookie, FileText, ShieldCheck, Globe, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const cookieResources = [
	{
		icon: <Cookie className="w-8 h-8 text-yellow-600" />,
		title: 'Cookie Policy Explained',
		description:
			'Understand what cookies are, how we use them, and how you can manage your preferences. Download our easy-to-read cookie policy.',
		link: '/downloads/cookie-policy-guide.pdf',
		fileType: 'PDF',
		details: 'Cookie types · Usage · Preferences',
	},
	{
		icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
		title: 'Privacy & Data Protection',
		description:
			'Learn how cookies relate to your privacy and how we protect your personal data in compliance with GDPR and other regulations.',
		link: '/downloads/cookie-privacy-guide.pdf',
		fileType: 'PDF',
		details: 'GDPR · Data protection · Security',
	},
	{
		icon: <Globe className="w-8 h-8 text-green-600" />,
		title: 'International Compliance',
		description:
			'See how our cookie practices comply with international standards and cross-border data regulations.',
		link: '/downloads/cookie-international-compliance.pdf',
		fileType: 'PDF',
		details: 'Global standards · Consent · Transfers',
	},
];

const CookiePolicyPage = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [submitted, setSubmitted] = useState(false);
	const [activeTab, setActiveTab] = useState<'policy' | 'contact' | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Here you would send the form data to your backend or API
		setSubmitted(true);
	};

	return (
		<div className="pt-20 px-4 max-w-3xl mx-auto pb-12">
			{/* Header Section */}
			<header className="mb-10">
				<h1 className="text-4xl font-bold text-center text-yellow-600 dark:text-yellow-300 mb-4">
					Cookie Policy
				</h1>
				<p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
					Learn how PitchPoa AI uses cookies and similar technologies to improve your experience.
				</p>
			</header>

			{/* Main Content Card */}
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
				<div className="p-6">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
						Why We Use Cookies
					</h2>
					<p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
						Cookies help us personalize your experience, analyze site usage, and enhance security. You can
						control your cookie preferences at any time.
					</p>
					<div className="grid md:grid-cols-2 gap-6 mb-6">
						<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
							<h3 className="font-medium text-lg text-yellow-600 dark:text-yellow-400 mb-2">
								Types of Cookies
							</h3>
							<ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
								<li>Essential cookies for site functionality</li>
								<li>Analytics cookies for usage insights</li>
								<li>Preference cookies for saved settings</li>
								<li>Security cookies for fraud prevention</li>
							</ul>
						</div>
						<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
							<h3 className="font-medium text-lg text-yellow-600 dark:text-yellow-400 mb-2">
								Your Choices
							</h3>
							<ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
								<li>Accept or decline non-essential cookies</li>
								<li>Change preferences anytime</li>
								<li>Learn more about cookies in your browser settings</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* Policy Details */}
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
				<div className="p-6">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
						Cookie Policy Details
					</h2>
					<ol className="space-y-4">
						<li>
							<span className="font-bold text-yellow-600 dark:text-yellow-300">1. What Are Cookies?</span>
							<span className="text-gray-600 dark:text-gray-300 ml-2">
								Cookies are small text files stored on your device to help websites remember information
								about you.
							</span>
						</li>
						<li>
							<span className="font-bold text-yellow-600 dark:text-yellow-300">2. How We Use Cookies</span>
							<span className="text-gray-600 dark:text-gray-300 ml-2">
								We use cookies to keep you logged in, remember your preferences, and analyze site
								traffic.
							</span>
						</li>
						<li>
							<span className="font-bold text-yellow-600 dark:text-yellow-300">3. Managing Cookies</span>
							<span className="text-gray-600 dark:text-gray-300 ml-2">
								You can manage or delete cookies in your browser settings. Some features may not work if
								you disable essential cookies.
							</span>
						</li>
						<li>
							<span className="font-bold text-yellow-600 dark:text-yellow-300">4. Third-Party Cookies</span>
							<span className="text-gray-600 dark:text-gray-300 ml-2">
								We may use third-party services (like analytics) that set their own cookies. Review
								their policies for details.
							</span>
						</li>
						<li>
							<span className="font-bold text-yellow-600 dark:text-yellow-300">5. Updates to This Policy</span>
							<span className="text-gray-600 dark:text-gray-300 ml-2">
								We may update our cookie policy. Check this page for the latest information.
							</span>
						</li>
						<li>
							<span className="font-bold text-yellow-600 dark:text-yellow-300">6. Contact Us</span>
							<span className="text-gray-600 dark:text-gray-300 ml-2">
								Email{' '}
								<a
									href="mailto:support@pitchpoa.com"
									className="text-yellow-600 underline"
								>
									support@pitchpoa.com
								</a>{' '}
								for cookie questions.
							</span>
						</li>
					</ol>
				</div>
			</div>

			{/* Resource CTA */}
			<div className="bg-gradient-to-r from-yellow-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-8 text-center mb-10">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
					Manage Your Cookie Preferences
				</h2>
				<p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
					You can update your cookie settings at any time for more control over your data.
				</p>
				<div className="flex flex-col sm:flex-row justify-center gap-4">
					<button
						onClick={() => setActiveTab('policy')}
						className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
					>
						View Full Cookie Policy
					</button>
					<button
						onClick={() => setActiveTab('contact')}
						className="border border-yellow-600 text-yellow-600 dark:text-yellow-300 dark:border-yellow-300 font-medium py-3 px-6 rounded-lg transition duration-200"
					>
						Contact Support
					</button>
				</div>
			</div>

			{/* Policy Tab Content */}
			{activeTab === 'policy' && (
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
						Full Cookie Policy
					</h2>
					<p className="text-gray-700 dark:text-gray-200 mb-4">
						For the complete cookie policy, please visit our website or contact us for a copy.
					</p>
				</div>
			)}

			{/* Contact Tab Content */}
			{activeTab === 'contact' && (
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
						Contact Support
					</h2>
					<form className="space-y-4">
						<div>
							<label
								htmlFor="name"
								className="block text-gray-700 dark:text-gray-300 mb-1"
							>
								Full Name
							</label>
							<input
								type="text"
								id="name"
								className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-yellow-600 focus:border-yellow-600 dark:bg-gray-700 dark:text-gray-200"
								placeholder="Your name"
							/>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-gray-700 dark:text-gray-300 mb-1"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-yellow-600 focus:border-yellow-600 dark:bg-gray-700 dark:text-gray-200"
								placeholder="your@email.com"
							/>
						</div>
						<div>
							<label
								htmlFor="cookie-question"
								className="block text-gray-700 dark:text-gray-300 mb-1"
							>
								Cookie Question
							</label>
							<textarea
								id="cookie-question"
								rows={4}
								className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-yellow-600 focus:border-yellow-600 dark:bg-gray-700 dark:text-gray-200"
								placeholder="Type your cookie question here..."
							></textarea>
						</div>
						<div className="pt-2">
							<button
								type="submit"
								className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
							>
								Send Message
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default CookiePolicyPage;