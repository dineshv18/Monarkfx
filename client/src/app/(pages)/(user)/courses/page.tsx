import React from "react";
import { HeroSection } from "../../_components/HeroSectionProps";

const Course = () => {
  return (
    <>
      <HeroSection
        smallText="All Courses"
        title="Explore our courses."
        variant="page"
        image={{
          src: "/b1.png",
          alt: "Courses",
        }}
      />
    </>
  );
};

export default Course;
