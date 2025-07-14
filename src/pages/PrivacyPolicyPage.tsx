import React, { useState } from 'react';
import { FileText, ShieldCheck, Users, Globe, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const privacyResources = [
	{
		icon: <FileText className="w-8 h-8 text-blue-600" />,
		title: 'Privacy Policy Overview',
		description:
			'A clear summary of our privacy practices, including data collection, usage, and user rights.',
		link: '/downloads/privacy-policy-guide.pdf',
		fileType: 'PDF',
		details: 'Plain language · Policy summary · FAQs',
	},
	{
		icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
		title: 'Data Protection Standards',
		description:
			'See how we protect your data and ensure a safe environment for all users. Includes reporting and enforcement procedures.',
		link: '/downloads/data-protection-guide.pdf',
		fileType: 'PDF',
		details: 'Reporting · Enforcement · Safety tips',
	},
	{
		icon: <Globe className="w-8 h-8 text-orange-500" />,
		title: 'International Compliance',
		description:
			'Review our compliance with global privacy regulations and cross-border service standards.',
		link: '/downloads/international-privacy.pdf',
		fileType: 'PDF',
		details: 'Global standards · Dispute resolution · Certifications',
	},
	{
		icon: <Users className="w-8 h-8 text-pink-500" />,
		title: 'Community Guidelines',
		description:
			'Learn about our community standards, anti-abuse policies, and how to contribute positively.',
		link: '/downloads/community-guidelines.pdf',
		fileType: 'PDF',
		details: 'Community rules · Anti-abuse · Positive engagement',
	},
];

const PrivacyPolicyPage = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [submitted, setSubmitted] = useState(false);
	const [activeTab, setActiveTab] = useState<'policy' | 'contact' | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
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
				<h1 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-300 mb-4">
					Privacy Policy
				</h1>
				<p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
					Learn how we collect, use, and protect your personal information at
					PitchPoa AI.
				</p>
			</header>

			{/* Main Content Card */}
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
				<div className="p-6">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
						Our Commitment to Your Privacy
					</h2>
					<p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
						We value your trust and are committed to safeguarding your data. Our
						privacy policy explains what information we collect, how we use it, and
						your rights as a user.
					</p>
					<div className="grid md:grid-cols-2 gap-6 mb-6">
						<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
							<h3 className="font-medium text-lg text-blue-600 dark:text-blue-400 mb-2">
								Key Principles
							</h3>
							<ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
								<li>Transparency in data collection</li>
								<li>Secure storage and processing</li>
								<li>No sale of personal data</li>
								<li>User control over information</li>
							</ul>
						</div>
						<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
							<h3 className="font-medium text-lg text-blue-600 dark:text-blue-400 mb-2">
								Your Rights
							</h3>
							<ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
								<li>Access your data</li>
								<li>Request corrections or deletion</li>
								<li>Opt out of communications</li>
								<li>Report privacy concerns</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* Policy Details */}
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
				<div className="p-6">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
						Privacy Policy Details
					</h2>
					<ol className="space-y-4">
						<li>
							<span className="font-bold text-blue-600 dark:text-blue-300">
								1. Information Collection:
							</span>
							<span className="text-gray-600 dark:text-gray-300 ml-2">
								We collect personal information you provide (name, email, etc.) and
								usage data. Cookies and similar technologies may be used for
								analytics and security.
							</span>
						</li>
						<li>
							<span className="font-bold text-blue-600 dark:text-blue-300">
								2. Use of Information:
							</span>
							<span className="text-gray-600 dark:text-gray-300 ml-2">
								Your data helps us provide, improve, and secure our services. We may
								use it to communicate updates, support, and offers.
							</span>
						</li>
						<li>
							<span className="font-bold text-blue-600 dark:text-blue-300">
								3. Data Protection:
							</span>
							<span className="text-gray-600 dark:text-gray-300 ml-2">
								We use industry-standard security measures. Only authorized staff can
								access your data.
							</span>
						</li>
						<li>
							<span className="font-bold text-blue-600 dark:text-blue-300">
								4. International Compliance:
							</span>
							<span className="text-gray-600 dark:text-gray-300 ml-2">
								We comply with GDPR and other global privacy regulations.
							</span>
						</li>
						<li>
							<span className="font-bold text-blue-600 dark:text-blue-300">
								5. Community Guidelines:
							</span>
							<span className="text-gray-600 dark:text-gray-300 ml-2">
								Users must follow our standards for safe and positive engagement.
							</span>
						</li>
						<li>
							<span className="font-bold text-blue-600 dark:text-blue-300">
								6. Changes to Policy:
							</span>
							<span className="text-gray-600 dark:text-gray-300 ml-2">
								We may update this policy. Continued use means you accept changes.
							</span>
						</li>
						<li>
							<span className="font-bold text-blue-600 dark:text-blue-300">
								7. Contact Us:
							</span>
							<span className="text-gray-600 dark:text-gray-300 ml-2">
								Email{' '}
								<a
									href="mailto:support@pitchpoa.com"
									className="text-blue-600 underline"
								>
									support@pitchpoa.com
								</a>{' '}
								for privacy questions.
							</span>
						</li>
					</ol>
				</div>
			</div>

			{/* Resource CTA */}
			<div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-8 text-center mb-10">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
					Need More Information?
				</h2>
				<p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
					Contact our privacy team or review our full policy for details.
				</p>
				<div className="flex flex-col sm:flex-row justify-center gap-4">
					<button
						onClick={() => setActiveTab('policy')}
						className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
					>
						View Full Policy
					</button>
					<button
						onClick={() => setActiveTab('contact')}
						className="border border-blue-600 text-blue-600 dark:text-blue-300 dark:border-blue-300 font-medium py-3 px-6 rounded-lg transition duration-200"
					>
						Contact Privacy Team
					</button>
				</div>
			</div>

			{/* Policy Tab Content */}
			{activeTab === 'policy' && (
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
						Full Privacy Policy
					</h2>
					<p className="text-gray-700 dark:text-gray-200 mb-4">
						For the complete privacy policy, please visit our website or contact us
						for a copy.
					</p>
				</div>
			)}

			{/* Contact Tab Content */}
			{activeTab === 'contact' && (
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
						Contact Privacy Team
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
								className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-600 focus:border-blue-600 dark:bg-gray-700 dark:text-gray-200"
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
								className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-600 focus:border-blue-600 dark:bg-gray-700 dark:text-gray-200"
								placeholder="your@email.com"
							/>
						</div>
						<div>
							<label
								htmlFor="privacy-question"
								className="block text-gray-700 dark:text-gray-300 mb-1"
							>
								Privacy Question
							</label>
							<textarea
								id="privacy-question"
								rows={4}
								className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-600 focus:border-blue-600 dark:bg-gray-700 dark:text-gray-200"
								placeholder="Type your privacy question here..."
							></textarea>
						</div>
						<div className="pt-2">
							<button
								type="submit"
								className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
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

export default PrivacyPolicyPage;