import React from "react";
import { HeroSection } from "../../_components/HeroSectionProps";

const Testimonial = () => {
  return (
    <>
      <HeroSection
        smallText="Our Students"
        title="What our students say."
        variant="page"
        image={{
          src: "/b1.png",
          alt: "Students",
        }}
      />
    </>
  );
};

export default Testimonial;
