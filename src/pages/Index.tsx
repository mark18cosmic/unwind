import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturedGuesthouses from "@/components/landing/FeaturedGuesthouses";
import GiftCardSection from "@/components/landing/GiftCardSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <FeaturedGuesthouses />
      <GiftCardSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
