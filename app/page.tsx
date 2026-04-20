import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/HeroSection";
import FeatureSection from "@/components/landing/FeatureSection";
import StartSection from "@/components/landing/StartSection";
import { Metadata } from "next";
import PreviewSection from "@/components/landing/PreviewSection";
import FlowSection from "@/components/landing/FlowSection";

export const metadata: Metadata = {
  title: "홈",
  description: "개인 건강 기록을 관리하는 대시보드 서비스 소개 페이지",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <LandingHeader />
      <HeroSection />
      <PreviewSection />
      <FeatureSection />
      <FlowSection />
      <StartSection />
    </main>
  );
}
