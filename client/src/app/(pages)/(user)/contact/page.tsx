import React from "react";
import { HeroSection } from "../../_components/HeroSectionProps";
import ContactPage from "./ContactPage";

const Contact = () => {
  return (
    <>
      <HeroSection
        smallText="Contact Us"
        title="Get in touch with us."
        variant="page"
        image={{
          src: "/b1.png",
          alt: "Contact us",
        }}
      />
      <ContactPage />
    </>
  );
};

export default Contact;
