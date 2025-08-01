import HeroSection from '../components/home/HeroSection';
import ProblemSection from '../components/home/ProblemSection';
import SolutionShowcase from '../components/home/SolutionShowcase';
import SocialProof from '../components/home/SocialProof';
import PricingSection from '../components/home/PricingSection';
import CTASection from '../components/home/CTASection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionShowcase />
      <SocialProof />
      <PricingSection />
      <CTASection />
    </>
  );
};

export default HomePage;