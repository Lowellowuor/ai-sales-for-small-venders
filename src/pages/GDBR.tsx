import React, { useState } from 'react';
import { ShieldCheck, Globe, FileText, UserCheck, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const gdprResources = [
	{
		icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
		title: 'GDPR Compliance Guide',
		description:
			'Understand how we comply with the General Data Protection Regulation (GDPR) and what it means for your data rights.',
		link: '/downloads/gdpr-compliance-guide.pdf',
		fileType: 'PDF',
		details: 'GDPR summary · Compliance checklist · FAQs',
	},
	{
		icon: <UserCheck className="w-8 h-8 text-green-600" />,
		title: 'Your Data Rights',
		description:
			'Learn about your rights to access, correct, delete, and restrict the processing of your personal data under GDPR.',
		link: '/downloads/gdpr-data-rights.pdf',
		fileType: 'PDF',
		details: 'Access request · Data deletion · Restriction forms',
	},
	{
		icon: <FileText className="w-8 h-8 text-purple-600" />,
		title: 'Privacy Policy & Transparency',
		description:
			'Read our privacy policy in clear language, including how we collect, use, and protect your data.',
		link: '/downloads/privacy-policy-gdpr.pdf',
		fileType: 'PDF',
		details: 'Policy summary · Data usage · Security',
	},
	{
		icon: <Globe className="w-8 h-8 text-orange-500" />,
		title: 'International Data Transfers',
		description:
			'See how we handle cross-border data transfers in compliance with GDPR and other international laws.',
		link: '/downloads/gdpr-international-transfers.pdf',
		fileType: 'PDF',
		details: 'Standard contractual clauses · Safeguards · Global compliance',
	},
];

const GDPRCompliancePage: React.FC = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [submitted, setSubmitted] = useState(false);
	const [activeTab, setActiveTab] = useState<'gdpr' | 'contact' | null>(null);

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
				<h1 className="text-4xl font-bold text-center text-green-700 dark:text-green-300 mb-4">
					GDPR Compliance
				</h1>
				<p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
					Learn how PitchPoa AI protects your data and complies with the General Data Protection Regulation
					(GDPR).
				</p>
			</header>

			{/* Main Content Card */}
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
				<div className="p-6">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
						Our GDPR Commitment
					</h2>
					<p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
						We are dedicated to upholding the highest standards of data protection and privacy for all users, in
						line with European and global regulations.
					</p>
					<div className="grid md:grid-cols-2 gap-6 mb-6">
						<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
							<h3 className="font-medium text-lg text-green-700 dark:text-green-400 mb-2">
								GDPR Principles
							</h3>
							<ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
								<li>Lawful, fair, and transparent processing</li>
								<li>Purpose limitation and data minimization</li>
								<li>Accuracy and storage limitation</li>
								<li>Integrity and confidentiality</li>
							</ul>
						</div>
						<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
							<h3 className="font-medium text-lg text-green-700 dark:text-green-400 mb-2">
								Your Rights Under GDPR
							</h3>
							<ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
								<li>Access your personal data</li>
								<li>Request correction or deletion</li>
								<li>Object to or restrict processing</li>
								<li>Data portability</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* GDPR Details */}
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
				<div className="p-6">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
						GDPR Compliance Details
					</h2>
					<ol className="space-y-4">
						<li>
							<span className="font-bold text-green-700 dark:text-green-300">1. Data Collection:</span>
							<span className="text-gray-600 dark:text-gray-300 ml-2">
								We only collect data necessary for providing our services and improving your experience.
							</span>
						</li>
						<li>
							<span className="font-bold text-green-700 dark:text-green-300">2. Data Security:</span>
							<span className="text-gray-600 dark:text-gray-300 ml-2">
								Your data is protected with industry-standard security measures and encryption.
							</span>
						</li>
						<li>
							<span className="font-bold text-green-700 dark:text-green-300">3. Consent:</span>
							<span className="text-gray-600 dark:text-gray-300 ml-2">
								We obtain your consent before collecting or processing personal data, and you can withdraw
								consent at any time.
							</span>
						</li>
						<li>
							<span className="font-bold text-green-700 dark:text-green-300">4. International Transfers:</span>
							<span className="text-gray-600 dark:text-gray-300 ml-2">
								Data transfers outside the EU are protected by appropriate safeguards.
							</span>
						</li>
						<li>
							<span className="font-bold text-green-700 dark:text-green-300">5. Data Breach Notification:</span>
							<span className="text-gray-600 dark:text-gray-300 ml-2">
								We will notify affected users and authorities promptly in case of a data breach.
							</span>
						</li>
						<li>
							<span className="font-bold text-green-700 dark:text-green-300">6. Contact Us:</span>
							<span className="text-gray-600 dark:text-gray-300 ml-2">
								Email{' '}
								<a href="mailto:support@pitchpoa.com" className="text-green-700 underline">
									support@pitchpoa.com
								</a>{' '}
								for GDPR-related questions.
							</span>
						</li>
					</ol>
				</div>
			</div>

			{/* Resource CTA */}
			<div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-8 text-center mb-10">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
					Need Help With Your Data Rights?
				</h2>
				<p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
					Contact our data protection team or review the full GDPR compliance statement for more details.
				</p>
				<div className="flex flex-col sm:flex-row justify-center gap-4">
					<button
						onClick={() => setActiveTab('gdpr')}
						className="bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
					>
						View Full GDPR Statement
					</button>
					<button
						onClick={() => setActiveTab('contact')}
						className="border border-green-700 text-green-700 dark:text-green-300 dark:border-green-300 font-medium py-3 px-6 rounded-lg transition duration-200"
					>
						Contact Support
					</button>
				</div>
			</div>

			{/* GDPR Tab Content */}
			{activeTab === 'gdpr' && (
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 animate-fadeIn border border-gray-200 dark:border-gray-700">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
						Full GDPR Compliance Statement
					</h2>
					<p className="text-gray-700 dark:text-gray-200 mb-4">
						For the complete GDPR compliance statement, please visit our website or contact us for a copy.
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
								className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-700 focus:border-green-700 dark:bg-gray-700 dark:text-gray-200"
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
								className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-700 focus:border-green-700 dark:bg-gray-700 dark:text-gray-200"
								placeholder="your@email.com"
							/>
						</div>
						<div>
							<label
								htmlFor="gdpr-question"
								className="block text-gray-700 dark:text-gray-300 mb-1"
							>
								GDPR Question
							</label>
							<textarea
								id="gdpr-question"
								rows={4}
								className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-700 focus:border-green-700 dark:bg-gray-700 dark:text-gray-200"
								placeholder="Type your GDPR question here..."
							></textarea>
						</div>
						<div className="pt-2">
							<button
								type="submit"
								className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
							>
								Send Message
							</button>
						</div>
					</form>
				</div>
			)}

			{/* Call-to-action buttons */}
			<div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
				<button
					onClick={() => navigate('/')}
					className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
				>
					Back to Home
				</button>
				<a
					href="mailto:support@pitchpoa.com"
					className="flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-dark-700 text-blue-700 dark:text-blue-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
				>
					<Mail className="w-5 h-5 mr-2" />
					Contact Support
				</a>
			</div>
		</div>
	);
};

export default GDPRCompliancePage;