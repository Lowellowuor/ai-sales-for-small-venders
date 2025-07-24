
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext'; 
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import DemoPage from './pages/DemoPage';
import PricingPage from './pages/PricingPage';
import ResourcesPage from './pages/ResourcesPage';
import Footer from './components/Footer';
import HelpCenterPage from './pages/HelpCenterPage';
import ViewPage from './pages/ViewPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from "./pages/TermsOfServices"; 
import CookiePolicy from './pages/CookiePolicy'; 
import GDBR from './pages/GDBR'; 
import SalesTrainingPage from './pages/SalesTrainingPage';
import WhatsAppTipsPage from './pages/WhatsAppTipsPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import BusinessGrowthPage from './pages/BusinessGrowthPage';
import AITechnologyPage from './pages/AITechnologyPage';
import ApiDocumentationPage from './pages/ApiDocumentationPage';
import CommunityForumPage from './pages/CommunityForumPage';
import ContactSupportPage from './pages/ContactSupportPage';
import TrainingVideosPage from './pages/TrainingVideosPage';
import SalesPitchGuideInfoPage from './pages/SalesPitchGuideInfoPage';
import WhatsAppSalesGuideInfoPage from './pages/WhatsAppSalesGuideInfoPage';
import BusinessLoansGuideInfoPage from './pages/BusinessLoansGuideInfoPage';
import SavingsStrategiesInfoPage from './pages/SavingsStrategiesInfoPage';
import LossRiskManagementInfoPage from './pages/LossRiskManagementInfoPage';
import ScalingBusinessPlaybookInfoPage from './pages/ScalingBusinessPlaybookInfoPage';
import DigitalTransformationGuideInfoPage from './pages/DigitalTransformationGuideInfoPage';
import TeamLeadershipGuideInfoPage from './pages/TeamLeadershipGuideInfoPage';
import WhatsAppMessageTemplatesInfoPage from './pages/WhatsAppMessageTemplatesInfoPage';
import SalesScriptTemplatesInfoPage from './pages/SalesScriptTemplatesInfoPage';
import BuildingTechTeamsPage from './pages/BuildingTechTeams';
import CybersecurityEssentials from './pages/CybersecurityEssentials';
import DigitalMarketingAndAnalytics from './pages/DigitalMarketingAndAnalytics';
import CloudToolsAndDigitalPlatforms from './pages/CloudTools&DigitalPlatforms';
import AIforBusinessGrowth from './pages/AIforBusinessGrowth';
import CommunityGuidelines from './pages/CommunityGuidelines';
import InternationalCompliance from './pages/InternationalCompliance';
import SafetyAndSecurityStandards from './pages/SafetyAndSecurityStandards';
import UserRightsAndResponsibilities from './pages/UserRightsAndResponsibilities';
import TermsofServiceExplained from './pages/TermsofServiceExplained';
import CookiePolicyExplained from './pages/CookiePolicyExplained';
import PrivacyAndDataProtection from './pages/PrivacyAndDataProtection';
import PrivacyPolicyGuide from './pages/PrivacyPolicyGuide';
import DataSecurityMeasures from './pages/DataSecurityMeasures';
import InternationalDataTransfers from './pages/InternationalDataTransfers';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import GDPRComplianceGuide from './pages/GDPRComplianceGuide';
import YourDataRights from './pages/YourDataRights';

function App() {
  return (
    <ThemeProvider>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Navigation />
          <main>
            <WhatsAppFloatingButton />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/demo" element={<DemoPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/success-stories" element={<SuccessStoriesPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/resources/sales-training" element={<SalesTrainingPage />} />
              <Route path="/resources/whatsapp-tips" element={<WhatsAppTipsPage />} />
              <Route path="/resources/business-growth" element={<BusinessGrowthPage />} />
              <Route path="/resources/ai-technology" element={<AITechnologyPage />} />
              <Route path="/view" element={<ViewPage />} />
              <Route path="/help" element={<HelpCenterPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/gdpr" element={<GDBR />} />
              <Route path="/help-center" element={<HelpCenterPage />} />
              <Route path="/api-documentation" element={<ApiDocumentationPage />} />
              <Route path="/community-forum" element={<CommunityForumPage />} />
          
              <Route path="/contact-support" element={<ContactSupportPage />} />
              <Route path="/training-videos" element={<TrainingVideosPage />} />
              <Route path="/resources/sales-pitch-guide-info" element={<SalesPitchGuideInfoPage />} />
              <Route path="/resources/whatsapp-sales-guide-info" element={<WhatsAppSalesGuideInfoPage />} />
              <Route path="/resources/business-loans-guide-info" element={<BusinessLoansGuideInfoPage />} />
              <Route path="/resources/savings-strategies-info" element={<SavingsStrategiesInfoPage />} />
              <Route path="/resources/loss-risk-management-info" element={<LossRiskManagementInfoPage />} />
              <Route path="/resources/scaling-business-playbook-info" element={<ScalingBusinessPlaybookInfoPage />} />
              <Route path="/resources/digital-transformation-guide-info" element={<DigitalTransformationGuideInfoPage />} />
              <Route path="/resources/team-leadership-guide-info" element={<TeamLeadershipGuideInfoPage />} />
              <Route path="/resources/whatsapp-message-templates-info" element={<WhatsAppMessageTemplatesInfoPage />} />
              <Route path="/resources/sales-script-templates-info" element={<SalesScriptTemplatesInfoPage />} />
              <Route path="/resources/building-tech-teams" element={<BuildingTechTeamsPage />} />
              <Route path="/resources/cybersecurity-essentials" element={<CybersecurityEssentials />} />
              <Route path="/resources/digital-marketing-and-analytics" element={<DigitalMarketingAndAnalytics />} />
              <Route path="/resources/cloud-tools-and-digital-platforms" element={<CloudToolsAndDigitalPlatforms />} />
              <Route path="/resources/ai-for-business-growth" element={<AIforBusinessGrowth />} />
              <Route path="/community-guidelines" element={<CommunityGuidelines />} />
              <Route path="/international-compliance" element={<InternationalCompliance />} />
              <Route path="/safety-and-security-standards" element={<SafetyAndSecurityStandards />} />
              <Route path="/user-rights-and-responsibilities" element={<UserRightsAndResponsibilities />} />
              <Route path="/terms-of-service-explained" element={<TermsofServiceExplained />} />
              <Route path="/cookie-policy-explained" element={<CookiePolicyExplained />} />
              <Route path="/privacy-and-data-protection" element={<PrivacyAndDataProtection />} />
              <Route path="/privacy-policy-guide" element={<PrivacyPolicyGuide />} />
              <Route path="/data-security-measures" element={<DataSecurityMeasures />} />
              <Route path="/international-data-transfers" element={<InternationalDataTransfers />} />
              <Route path="/gdpr-compliance-guide" element={<GDPRComplianceGuide />} />
              <Route path="/your-data-rights" element={<YourDataRights />} />

              {/* Nested Routes for Privacy Policy Guide */}
             
              
              {/* Nested Routes for Terms of Service Explained */}

              {/* Nested Routes */}
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404 - Page Not Found</h1>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                    The page you are looking for does not exist.
                  </p>
                  <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                    Go to Home Page
                  </Link>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
