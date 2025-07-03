import { TrendingUp, Users, DollarSign, PiggyBank, Scale, AlertTriangle } from 'lucide-react';

const growthStories = [
  // ...existing stories...
];



const businessGrowthResources = [
  {
    icon: <DollarSign className="w-8 h-8 text-green-600" />,
    title: "Business Loans & Funding",
    description: "Learn how to access business loans, pitch to investors, and leverage microfinance. Our guides help you prepare your business for funding, understand credit, and avoid common loan mistakes.",
    link: "/downloads/business-loans-guide.pdf",
    fileType: "PDF",
    details: "Loan checklist · Investor pitch templates · Funding sources"
  },
  {
    icon: <PiggyBank className="w-8 h-8 text-pink-500" />,
    title: "Smart Savings & Investment",
    description: "Discover savings plans for entrepreneurs, emergency funds, and how to reinvest profits for sustainable growth. Includes digital savings tools, group savings (chamas), and investment basics.",
    link: "/downloads/savings-strategies.pdf",
    fileType: "PDF",
    details: "Savings planner · Chama guide · Digital tools"
  },
  {
    icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
    title: "Managing Loss & Risk",
    description: "Identify, manage, and recover from business losses. Get practical advice on risk assessment, insurance, fraud prevention, and building resilience for your business.",
    link: "/downloads/loss-risk-management.pdf",
    fileType: "PDF",
    details: "Risk checklist · Insurance tips · Recovery plans"
  },
  {
    icon: <Scale className="w-8 h-8 text-blue-600" />,
    title: "Scaling Your Business",
    description: "Step-by-step playbooks for scaling operations, hiring, expanding to new markets, and automating processes. Includes checklists, growth metrics, and digital transformation tips.",
    link: "/downloads/scaling-business-playbook.pdf",
    fileType: "PDF",
    details: "Scaling checklist · Hiring guide · Automation tools"
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
    title: "Digital Transformation",
    description: "Upgrade your business with digital tools: e-commerce, mobile payments, CRM, and social media marketing. Stay competitive in today’s digital economy.",
    link: "/downloads/digital-transformation-guide.pdf",
    fileType: "PDF",
    details: "E-commerce guide · CRM tools · Social media tips"
  },
  {
    icon: <Users className="w-8 h-8 text-orange-500" />,
    title: "Building Teams & Leadership",
    description: "Learn how to hire, train, and retain top talent. Develop leadership skills, create a positive culture, and manage remote or hybrid teams for growth.",
    link: "/downloads/team-leadership-guide.pdf",
    fileType: "PDF",
    details: "Hiring templates · Leadership tips · Team management"
  }
];

const BusinessGrowthPage = () => (
  <div className="pt-20 px-4 max-w-7xl mx-auto">
    {/* Hero Section */}
    <section className="py-16 bg-gradient-to-br from-green-700 to-green-400 text-white rounded-2xl mb-12 shadow-lg">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Business Growth Resources</h1>
        <p className="mb-8 text-lg md:text-xl text-white/90">
          Everything you need to grow, fund, and scale your business in Africa—loans, savings, risk management, scaling, digital transformation, and more.
        </p>
        <a
          href="#growth-resources"
          className="inline-block bg-white text-green-700 font-semibold px-8 py-4 rounded-lg shadow hover:bg-gray-100 transition-colors"
        >
          Explore Growth Resources
        </a>
      </div>
    </section>

    {/* Growth Resources Section */}
    <section id="growth-resources" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Essential Business Growth Resources
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {businessGrowthResources.map((res, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 flex flex-col transition hover:shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-4">{res.icon}
              <span className="text-xl font-semibold text-green-700 dark:text-green-300">{res.title}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-200 mb-4">{res.description}</p>
            <a
              href={res.link}
              download
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow w-max"
            >
              <DollarSign className="w-5 h-5" /> Download {res.fileType}
            </a>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{res.details}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Featured Stories */}
    {/* ...existing stories and case studies sections remain unchanged... */}
    {/* CTA Section */}
    <section className="mt-16 text-center">
      <div className="inline-block bg-primary-600 dark:bg-primary-500 text-white px-8 py-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
        <h3 className="text-2xl font-bold mb-2">Ready to write your success story?</h3>
        <p className="mb-4">Join our community for exclusive resources, live training, and support from fellow entrepreneurs.</p>
        <button
          className="bg-white text-primary-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition-colors"
          onClick={() => alert('Join Community!')}
        >
          Join Now
        </button>
      </div>
    </section>
  </div>
);

export default BusinessGrowthPage;
