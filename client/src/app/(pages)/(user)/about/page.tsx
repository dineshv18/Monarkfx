import { HeroSection } from "../../_components/HeroSectionProps";
import AboutPage from "./AboutPage";

export default function About() {
  return (
    <>
      <HeroSection
        smallText="About Us"
        title="Know more about us."
        variant="page"
        image={{
          src: "/b1.png",
          alt: "About us",
        }}
      />
      <AboutPage/>
    </>
  );
}
