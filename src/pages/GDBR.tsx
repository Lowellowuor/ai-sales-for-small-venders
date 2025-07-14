import React from 'react';

const GDPRCompliancePage: React.FC = () => {
  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-12">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-center text-pink-500 dark:text-pink-300 mb-4">
          GDPR Compliance
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Our Commitment to Data Protection
        </p>
      </header>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            General Data Protection Regulation (GDPR)
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            We comply with the EU General Data Protection Regulation (GDPR) regarding the collection, use, and retention of personal data from European Union member countries.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">1. Lawful Basis for Processing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We process personal data only when we have a lawful basis, including:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Contractual necessity for service delivery</li>
                <li>Consent for specific purposes</li>
                <li>Legitimate interests that don't override your rights</li>
                <li>Legal compliance obligations</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">2. Data Subject Rights</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Under GDPR, EU residents have specific rights regarding their personal data:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-pink-500 dark:text-pink-400 mb-1">Right to Access</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Request a copy of your personal data we hold.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-pink-500 dark:text-pink-400 mb-1">Right to Rectification</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Correct inaccurate or incomplete data.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-pink-500 dark:text-pink-400 mb-1">Right to Erasure</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Request deletion of your data ("right to be forgotten").
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-pink-500 dark:text-pink-400 mb-1">Right to Restriction</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Limit how we use your data in certain circumstances.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-pink-500 dark:text-pink-400 mb-1">Right to Data Portability</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Receive your data in a structured, commonly used format.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-pink-500 dark:text-pink-400 mb-1">Right to Object</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Object to certain types of processing.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">3. Data Transfers</h3>
              <p className="text-gray-600 dark:text-gray-300">
                When transferring data outside the EU, we implement appropriate safeguards such as:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                <li>EU Standard Contractual Clauses</li>
                <li>Adequacy decisions for recipient countries</li>
                <li>Other approved transfer mechanisms</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">4. Data Protection Measures</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We implement comprehensive security measures including:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Data minimization and pseudonymization</li>
                <li>Regular security assessments</li>
                <li>Staff training on data protection</li>
                <li>Incident response procedures</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">5. Data Protection Officer</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We have appointed a Data Protection Officer (DPO) to oversee compliance with GDPR:
                <br />
                <span className="font-medium">dpo@pitch-poa.com</span>
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">6. Exercising Your Rights</h3>
              <p className="text-gray-600 dark:text-gray-300">
                To exercise your GDPR rights, please contact us at <span className="font-medium">privacy@pitch-poa.com</span>. We will respond within one month of receiving your request.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-pink-500 dark:text-pink-400 mb-2">7. Complaints</h3>
              <p className="text-gray-600 dark:text-gray-300">
                If you have concerns about our data practices, you may lodge a complaint with your local data protection authority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GDPRCompliancePage;