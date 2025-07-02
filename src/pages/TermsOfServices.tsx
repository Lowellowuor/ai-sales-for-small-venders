import { useRef, useState } from "react";
import { ShieldCheck, ChevronDown, ChevronUp, Mail, FileDown, ArrowUpRight, ListOrdered } from "lucide-react";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: (
      <p>
        By accessing or using PitchPoa AI, you agree to these Terms of Service and our Privacy Policy.
      </p>
    ),
  },
  {
    id: "use",
    title: "2. Use of Service",
    content: (
      <ul className="list-disc pl-6">
        <li>You must be at least 18 years old or have parental consent.</li>
        <li>Do not misuse our services or attempt to access them using unauthorized means.</li>
        <li>Respect intellectual property and do not copy or distribute content without permission.</li>
      </ul>
    ),
  },
  {
    id: "user-content",
    title: "3. User Content",
    content: (
      <ul className="list-disc pl-6">
        <li>You are responsible for the content you upload or share.</li>
        <li>Do not post unlawful, harmful, or offensive material.</li>
      </ul>
    ),
  },
  {
    id: "termination",
    title: "4. Termination",
    content: (
      <p>
        We may suspend or terminate your access if you violate these terms.
      </p>
    ),
  },
  {
    id: "disclaimer",
    title: "5. Disclaimer",
    content: (
      <p>
        Our services are provided “as is” without warranties of any kind.
      </p>
    ),
  },
  {
    id: "liability",
    title: "6. Limitation of Liability",
    content: (
      <p>
        PitchPoa AI is not liable for any indirect, incidental, or consequential damages.
      </p>
    ),
  },
  {
    id: "changes",
    title: "7. Changes to Terms",
    content: (
      <p>
        We may update these Terms of Service at any time. Continued use of the service means you accept the new terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "8. Contact Us",
    content: (
      <p>
        For questions, contact us at{" "}
        <a href="mailto:support@pitchpoa.com" className="text-primary-600 underline">
          support@pitchpoa.com
        </a>
        .
      </p>
    ),
  },
];

const TermsOfServicePage = () => {
  const [openSection, setOpenSection] = useState<string | null>(sections[0].id);
  const [accepted, setAccepted] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleScrollTo = (id: string) => {
    const ref = sectionRefs.current[id];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpenSection(id);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-20 px-4 bg-white dark:bg-dark-900 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="flex items-center mb-6">
        <ShieldCheck className="w-10 h-10 text-primary-600 dark:text-primary-400 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
      </div>
      <p className="mb-4 text-gray-700 dark:text-gray-300">Effective Date: July 1, 2025</p>
      <div className="flex justify-center mb-8">
        <img
          src="https://illustrations.popsy.co/gray/contract.svg"
          alt="Terms illustration"
          className="w-40 h-40"
        />
      </div>

      {/* Table of Contents */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <div className="flex items-center gap-2">
            <ListOrdered className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Table of Contents</h2>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Last Updated: July 1, 2025</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            className="text-xs px-3 py-1 rounded bg-primary-50 dark:bg-dark-800 text-primary-700 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-dark-700 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to Top
          </button>
          <a
            href="/terms-of-service.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1 rounded bg-primary-50 dark:bg-dark-800 text-primary-700 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-dark-700 transition-colors flex items-center"
            download
          >
            <FileDown className="w-4 h-4 mr-1" />
            Download PDF
          </a>
          <button
            className="text-xs px-3 py-1 rounded bg-primary-50 dark:bg-dark-800 text-primary-700 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-dark-700 transition-colors flex items-center"
            onClick={() => window.print()}
          >
            <ArrowUpRight className="w-4 h-4 mr-1" />
            Print
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sections.map((section, idx) => (
            <button
              key={section.id}
              className="flex items-center w-full p-3 rounded-lg bg-gray-50 dark:bg-dark-800 hover:bg-primary-50 dark:hover:bg-dark-700 transition-colors shadow group text-left"
              onClick={() => handleScrollTo(section.id)}
              aria-label={`Go to ${section.title}`}
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-dark-700 text-primary-600 dark:text-primary-400 font-bold mr-3">
                {idx + 1}
              </span>
              <span className="font-medium text-gray-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400">
                {section.title.replace(/^\d+\.\s/, '')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Accordion Sections */}
      <div>
        {sections.map((section) => (
          <div
            key={section.id}
            ref={(el) => (sectionRefs.current[section.id] = el)}
            className="mb-6 border-b border-gray-200 dark:border-dark-700 pb-4"
          >
            <button
              className="flex items-center w-full text-left text-xl font-semibold text-gray-900 dark:text-white focus:outline-none"
              onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
              aria-expanded={openSection === section.id}
              aria-controls={`section-${section.id}`}
            >
              <span>{section.title}</span>
              {openSection === section.id ? (
                <ChevronUp className="w-5 h-5 ml-2" />
              ) : (
                <ChevronDown className="w-5 h-5 ml-2" />
              )}
            </button>
            {openSection === section.id && (
              <div
                id={`section-${section.id}`}
                className="mt-2 text-gray-700 dark:text-gray-300 transition-all"
              >
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Accept Terms Button */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          onClick={() => setAccepted(true)}
          disabled={accepted}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            accepted
              ? "bg-green-500 text-white cursor-not-allowed"
              : "bg-primary-600 hover:bg-primary-700 text-white"
          }`}
        >
          {accepted ? "Terms Accepted" : "Accept Terms"}
        </button>
        <a
          href="mailto:support@pitchpoa.com"
          className="flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-dark-700 text-primary-600 dark:text-primary-400 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
        >
          <Mail className="w-5 h-5 mr-2" />
          Contact Support
        </a>
      </div>
      {accepted && (
        <div className="mt-4 text-green-600 dark:text-green-400 font-semibold">
          Thank you for accepting our Terms of Service!
        </div>
      )}
    </div>
  );
};

export default TermsOfServicePage;