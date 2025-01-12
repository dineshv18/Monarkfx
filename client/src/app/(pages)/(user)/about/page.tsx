import { HeroSection } from "../../_components/HeroSectionProps";

export default function AboutPage() {
  return (
    <HeroSection
      smallText="About Us"
      title="Know more about us."
      variant="page"
      image={{
        src: "/b1.png",
        alt: "Instructor teaching",
      }}
    />
  );
}
