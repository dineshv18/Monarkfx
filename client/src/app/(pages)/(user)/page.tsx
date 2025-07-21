import FeaturedCourses from "../_components/FeaturedCourses";
import HeroSection from "../_components/HeroSectionProps";
import Scroll from "../_components/HorizontalScroll";
import TestimonialCarousel from "../_components/TestimonialCarousel";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCourses sectionType="trending" />
      <FeaturedCourses sectionType="featured" />
      <FeaturedCourses sectionType="bestseller" />
      <FeaturedCourses sectionType="popular" />
      <FeaturedCourses sectionType="free" />
      <TestimonialCarousel />
      <Scroll />
    </>
  );
}
