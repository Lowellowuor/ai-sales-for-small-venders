import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import CommunityForumPage   from './pages/CommunityForumPage';
import ContactSupportPage  from './pages/ContactSupportPage';
import TrainingVideosPage from './pages/TrainingVideosPage';
import SalesPitchGuideInfoPage from './pages/SalesPitchGuideInfoPage';
import WhatsAppSalesGuideInfoPage from './pages/WhatsAppSalesGuideInfoPage';
import BusinessLoansGuideInfoPage from './pages/BusinessLoansGuideInfoPage';
import SavingsStrategiesInfoPage from './pages/SavingsStrategiesInfoPage';
import LossRiskManagementInfoPage from './pages/LossRiskManagementInfoPage';
import ScalingBusinessPlaybookInfoPage from './pages/ScalingBusinessPlaybookInfoPage';
import DigitalTransformationGuideInfoPage from './pages/DigitalTransformationGuideInfoPage';
import TeamLeadershipGuideInfoPage from './pages/TeamLeadershipGuideInfoPage';
function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors duration-300">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/demo" element={<DemoPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/success-stories" element={<SuccessStoriesPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/resources/sales-training" element={<SalesTrainingPage />} />
              <Route path="/resources/whatsapp-tips" element={<WhatsAppTipsPage />} />
              <Route path="/resources/success-stories" element={<SuccessStoriesPage />} />
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
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;