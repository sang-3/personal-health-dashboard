import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/HeroSection";
import FeatureSection from "@/components/landing/FeatureSection";
import StartSection from "@/components/landing/StartSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <LandingHeader />
      <HeroSection />
      <FeatureSection />
      <StartSection />
    </main>
  );
}
