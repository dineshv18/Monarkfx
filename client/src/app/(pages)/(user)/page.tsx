"use client";

import HeroIntro from "../_components/homepage/HeroIntro";
import HeroSection from "../_components/homepage/HeroSection";
import StatsSection from "../_components/homepage/StatsSection";
import AboutSection from "../_components/homepage/AboutSection";
import WhyChooseUs from "../_components/homepage/WhyChooseUs";
// import MentorshipSection from "../_components/homepage/MentorshipSection";
import CoursesSection from "../_components/homepage/CoursesSection";
import PricingPreview from "../_components/homepage/PricingPreview";
import BundleOffer from "../_components/homepage/BundleOffer";
import TestimonialsSection from "../_components/homepage/TestimonialsSection";
import CTASection from "../_components/homepage/CTASection";

export default function Home() {
  return (
    <>
      <HeroIntro />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <WhyChooseUs />
      {/* <MentorshipSection /> */}
      <CoursesSection />
      <PricingPreview />
      <BundleOffer />
      <TestimonialsSection />
      <CTASection />
      <div className="h-24 md:hidden" />
    </>
  );
}
