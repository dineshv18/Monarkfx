// Dashboard Sidebar
export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

// HeroSectionProps Dot AnimatedDots
export interface Dot {
  id: number;
  x: number;
  y: number;
}

// HeroSectionProps HeroSection
export interface HeroSectionProps {
  smallText?: string;
  title: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
  backgroundColor?: string;
  buttons?: React.ReactNode;
  stats?: Array<{
    number: string;
    label: string;
    endValue: number;
  }>;
  className?: string;
  variant?: "home" | "page";
}
// custom button component
export interface CustomButtonProps {
  primaryText: string;
  secondaryText: string;
  icon?: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "filled" | "outlined";
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
}

//  MobileMenu
export interface MobileMenuProps {
  menuItems: { name: string; href: string }[];
  onClose: () => void;
}

//  course cards component
export interface Course {
  id: string;
  title: string;
  category: "DEVELOPMENT" | "DESIGN" | "CLOUD";
  instructor: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  lessons: number;
  students: number;
}

export type Category = "All" | "DEVELOPMENT" | "DESIGN" | "CLOUD";
