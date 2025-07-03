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
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;