"use client";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WorksSection from "@/components/WorksSection";
import BlogSection from "@/components/BlogSection";
import LabsSection from "@/components/LabsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-white">
      {/* 상단 고정 헤더 */}
      <Header />
      {/* Hero/인트로 섹션 */}
      <HeroSection />
      {/* About(대표) 섹션 */}
      <AboutSection />
      {/* Works(최근 6개) 섹션 */}
      <WorksSection />
      {/* Blog(최근 6개) 섹션 */}
      <BlogSection />
      {/* Labs(대표) 섹션 */}
      <LabsSection />
      {/* Contact(버튼) 섹션 */}
      <ContactSection />
      {/* 하단 푸터 */}
      <Footer />
    </div>
  );
}