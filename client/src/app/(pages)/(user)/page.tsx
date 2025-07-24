"use client";
import FeaturedCourses from "../_components/FeaturedCourses";
import HeroSection from "../_components/HeroSectionProps";
import Scroll from "../_components/HorizontalScroll";
import TestimonialCarousel from "../_components/TestimonialCarousel";
import HomeCategoryGrid from "../_components/HomeCategoryGrid";
import { Card, CardContent } from "@/components/ui/card";
import { LogoCarousel } from "../_components/LogoCarousel";
import Headtext from "../_components/head-text";
import LiveCoursesSection from "../_components/LiveCoursesSection";
import UttamNagarOfficeCTA from "../_components/UttamNagarOfficeCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCourses sectionType="trending" />
      <FeaturedCourses sectionType="featured" />
      <Card className="rounded-none border-none bg-gray-960">
        <CardContent className="pt-6">
          <Headtext text="Our Partners" className="text-center" />
          <LogoCarousel />
        </CardContent>
      </Card>
      <FeaturedCourses sectionType="bestseller" />
      <HomeCategoryGrid />
      <FeaturedCourses sectionType="popular" />
      <UttamNagarOfficeCTA />
      <LiveCoursesSection />
      <FeaturedCourses sectionType="free" />
      <TestimonialCarousel />
      <Scroll />
      {/* Bottom padding for mobile navigation */}
      <div className="h-24 md:hidden" />
    </>
  );
}
