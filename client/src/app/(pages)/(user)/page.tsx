import FeaturedCourses from "../_components/FeaturedCourses";
import HeroSection from "../_components/HeroSectionProps";
import Scroll from "../_components/HorizontalScroll";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCourses sectionType="trending" />
      <Scroll />
    </>
  );
}
