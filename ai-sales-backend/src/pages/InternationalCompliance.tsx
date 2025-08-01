import { Globe, Gavel, Shield, FileText, Award } from 'lucide-react';

const InternationalCompliance = () => {
  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Globe className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">International Compliance</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Review our compliance with global privacy regulations and cross-border service standards.
        </p>
      </div>

      {/* Global Standards */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-600" /> Global Standards Compliance
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow border-l-4 border-blue-500">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Data Protection Regulations</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span> <strong>GDPR</strong> (EU): Full compliance including Data Processing Agreements
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span> <strong>Kenya DPA</strong>: Registered with the Office of the Data Protection Commissioner
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span> <strong>CCPA</strong> (California): Consumer rights implementation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span> <strong>Nigeria NDPR</strong>: Compliance with national data protection requirements
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow border-l-4 border-green-500">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Industry Standards</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span> <strong>ISO 27001</strong>: Information security management
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span> <strong>PCI DSS</strong>: Secure payment processing
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span> <strong>SOC 2 Type II</strong>: Audited data protection controls
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span> <strong>CBPR</strong> (Cross-Border Privacy Rules) certification
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cross-Border Data Transfers */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Cross-Border Data Protection</h2>
        
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow overflow-hidden">
          <div className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Our Approach</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We use Standard Contractual Clauses (SCCs) and implement supplementary measures for all international data transfers, with regional data storage options where available.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="border border-gray-200 dark:border-dark-700 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">EU Data</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Stored in Frankfurt, Germany with EU-based processing
                </p>
              </div>
              <div className="border border-gray-200 dark:border-dark-700 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">East Africa</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Primary storage in Nairobi, Kenya with local backup
                </p>
              </div>
              <div className="border border-gray-200 dark:border-dark-700 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Other Regions</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Choose preferred location during onboarding
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dispute Resolution */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Gavel className="w-6 h-6 text-blue-600" /> Dispute Resolution
        </h2>

        <div className="space-y-6">
          <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Step-by-Step Process</h3>
            <ol className="list-decimal pl-5 space-y-3 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Initial Contact</strong>: Email compliance@pitchpoa.com within 30 days of issue
              </li>
              <li>
                <strong>Investigation</strong>: Our team responds within 10 business days
              </li>
              <li>
                <strong>Resolution Proposal</strong>: We suggest remedies based on findings
              </li>
              <li>
                <strong>Mediation</strong>: If unresolved, we engage neutral third-party mediation
              </li>
              <li>
                <strong>Binding Arbitration</strong>: As last resort under Nairobi Centre for International Arbitration rules
              </li>
            </ol>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Regulatory Authorities</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span> Kenya: Office of the Data Protection Commissioner
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span> EU: Relevant national DPAs
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span> UK: Information Commissioner's Office
                </li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Timeframes</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span> Acknowledgement: 2 business days
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span> Initial resolution: 15 business days
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span> Complex cases: Up to 45 days
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-blue-600" /> Certifications & Memberships
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Current Certifications</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span> ISO/IEC 27001:2022 certified
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span> Kenya Data Protection Registration No. DPR/XXXX/2023
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span> PCI DSS Level 1 Service Provider
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span> Cloud Security Alliance STAR member
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Verification</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  View our certification badges:
                </p>
                <button className="bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2">
                  <FileText className="w-4 h-4" /> View Certificates
                </button>
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Verify our Kenya DPA registration:
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Verify Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternationalCompliance;