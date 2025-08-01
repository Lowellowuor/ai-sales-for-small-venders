import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
import PitchPracticePage from './pages/PitchPracticePage'; 
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SalesDashboardPage from './pages/SalesDashboardPage';
import ExpenseDashboardPage from './pages/ExpenseDashboardPage';
import SalesScriptGeneratorPage from './pages/SalesScriptGeneratorPage';
import CustomerDashboardPage from './pages/CustomerDashboardPage';
import MpesaAnalysisPage from './pages/MpesaAnalysisPage';
import InventoryDashboardPage from './pages/InventoryDashboardPage';
import SupplierDashboardPage from './pages/SupplierDashboardPage';
import MarketingCampaignsPage from './pages/MarketingCampaignsPage';
import BusinessAnalyticsPage from './pages/BusinessAnalyticsPage';


function App() {
  return (
    <ThemeProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        {/* Main container div for the whole application */}
        {/* Applied 'animated-gradient-background' for light mode effect */}
        {/* For dark mode, we override the background with a solid dark color and add blobs */}
        <div className="relative min-h-screen flex flex-col animated-gradient-background dark:bg-gray-900 transition-colors duration-300 overflow-hidden"> {/* Added overflow-hidden to prevent blob overflow */}
          
          {/* Dark Mode Light Effects - Blobs */}
          {/* These blobs are hidden by default and become visible only in dark mode via CSS */}
          <div className="dark-mode-blob dark-mode-blob-1"></div>
          <div className="dark-mode-blob dark-mode-blob-2"></div>
          <div className="dark-mode-blob dark-mode-blob-3"></div>

          {/* Navigation Bar (fixed at top, handled by Navigation component itself) */}
          <Navigation />

          {/* Main Content Area */}
          {/* Background set to semi-transparent to let the animated background (light mode) or blobs (dark mode) show */}
          <main className="flex-grow pt-16 pb-24 bg-white/80 dark:bg-gray-900/70"> {/* Slightly more transparent in dark mode */}
            {/* WhatsApp Floating Button - positioned relative to the viewport, above other content */}
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
              <Route path="/pitch-practice" element={<PitchPracticePage />} /> 
              <Route path="/signup" element={<SignUpPage />} /> 
              <Route path="/login" element={<LoginPage />} /> 
              <Route path="/sales-dashboard" element={<SalesDashboardPage />} />
              <Route path="/expense-dashboard" element={<ExpenseDashboardPage />} />
              <Route path="/sales-script-generator" element={<SalesScriptGeneratorPage />} />
              <Route  path="/customers" element={<CustomerDashboardPage />} />
              <Route path="/mpesa-analysis" element={<MpesaAnalysisPage />} />
              <Route path="/inventory" element={<InventoryDashboardPage />} />
              <Route path="/suppliers" element={<SupplierDashboardPage />} />
              <Route path="/marketing-campaigns" element={<MarketingCampaignsPage />} />
              <Route path="/business-analytics" element={<BusinessAnalyticsPage />} />


              
              {/* Add more routes as needed */}  

              {/* Catch-all route for 404 */}
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

          {/* Content Reflection Overlay */}
          {/* This div creates the fading effect at the bottom of the screen */}
          <div className="fixed bottom-0 left-0 right-0 h-24 z-40 pointer-events-none">
            {/*
              The gradient will fade from transparent at the top to the page's
              background color at the bottom.
              Adjust colors to match your theme (bg-white for light, bg-gray-900 for dark).
            */}
            <div className="absolute inset-0 bg-gradient-to-t
                            from-white via-white/80 to-transparent
                            dark:from-gray-900 dark:via-gray-900/80 dark:to-transparent">
            </div>
          </div>

          {/* Footer Component */}
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
