"use client";

import HeroSection from "../_components/homepage/HeroSection";
import StatsSection from "../_components/homepage/StatsSection";
import AboutSection from "../_components/homepage/AboutSection";
// import CoursesSection from "../_components/homepage/CoursesSection";
import BundleOffer from "../_components/homepage/BundleOffer";
import PricingPreview from "../_components/homepage/PricingPreview";
import WhyChooseUs from "../_components/homepage/WhyChooseUs";
import MentorshipSection from "../_components/homepage/MentorshipSection";
import TestimonialsSection from "../_components/homepage/TestimonialsSection";
import CTASection from "../_components/homepage/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      {/* <CoursesSection /> */}
      <BundleOffer />
      <PricingPreview />
      <WhyChooseUs />
      <MentorshipSection />
      <TestimonialsSection />
      <CTASection />
      {/* Bottom padding for mobile navigation */}
      <div className="h-24 md:hidden" />
    </>
  );
}
