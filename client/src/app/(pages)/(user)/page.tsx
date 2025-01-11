import { ThumbsUp, Youtube } from "lucide-react";
import CustomButton from "../_components/CustomButton";
import { HeroSection } from "../_components/HeroSectionProps";
import Link from "next/link";
import LearningLanding from "../_components/LearningLanding";
import CourseListing from "../_components/courses/course-list";

export default function Home() {
  return (
    <>
      <HeroSection
        title="Best online platform for education."
        description="Online courses from the world's leading experts. Join 17 million learners today."
        variant="home"
        image={{
          src: "/b1.png",
          alt: "Hero image",
        }}
        buttons={
          <>
            <CustomButton
              primaryText="Get Started"
              secondaryText="Learn More"
              icon={<ThumbsUp size={20} />}
              className="!px-6 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors w-[200px]"
            />
            <Link
              href="/about"
              className="group flex items-center justify-center text-white gap-1
              hover:text-white/90 transition-all duration-300 relative
              hover:-translate-x-2"
            >
              <Youtube
                size={20}
                className="transform transition-all duration-300 
                group-hover:translate-x-[-2px]"
              />
              <span>How it works</span>
            </Link>
          </>
        }
        stats={[
          { number: "260+", label: "Tutors", endValue: 260 },
          { number: "0000+", label: "Students", endValue: 9000 },
          { number: "000+", label: "Courses", endValue: 500 },
        ]}
      />
      <LearningLanding />
      <main className="min-h-screen bg-[#F3F8F8] px-5 py-10">
        <CourseListing />
      </main>
    </>
  );
}
