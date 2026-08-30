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
      {/* 1. Hook — headline + one-line credibility */}
      <HeroIntro />

      {/* 2. Visual hook — hero slider / gallery */}
      <HeroSection />

      {/* 3. Instant proof numbers */}
      <StatsSection />


      {/* 4. THE PRODUCT — "Choose Your Market" */}
      <CoursesSection />

      {/* 5. Pricing straight after — no hunting for cost */}
      <PricingPreview />

      {/* 6. Best-value combo — the upsell right where price is on their mind */}
      <BundleOffer />



      {/* 8. Who runs it — brand story */}
      <AboutSection />

      {/* 9. Social proof — real student reviews close the doubt */}
      <TestimonialsSection />

      {/* 7. Why us over any other institute — differentiators, ISO badge */}
      <WhyChooseUs />

      {/* <MentorshipSection /> */}

      {/* 10. Final push to enroll */}
      <CTASection />
      <div className="h-24 md:hidden" />
    </>
  );
}
