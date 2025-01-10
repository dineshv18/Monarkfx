import { HeroSection } from "../../_components/HeroSectionProps";

export default function AboutPage() {
  return (
    <HeroSection
      smallText="Our instructors"
      title="We help best performance."
      variant="page"
      image={{
        src: "/b1.png",
        alt: "Instructor teaching",
      }}
    />
  );
}
