import React from "react";
import { HeroSection } from "../../_components/HeroSectionProps";

const Instructors = () => {
  return (
    <>
      <HeroSection
        smallText="Instructors"
        title="Meet our instructors."
        variant="page"
        image={{
          src: "/b1.png",
          alt: "Instructor teaching",
        }}
      />
    </>
  );
};

export default Instructors;
