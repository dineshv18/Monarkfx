import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials | Purin",
  description:
    "Hear from our community of successful traders and students who have transformed their trading with our expert guidance.",
  keywords: [
    "testimonials",
    "success stories",
    "trading results",
    "trading education",
    "student reviews",
  ],
  openGraph: {
    title: "Testimonials | Purin",
    description:
      "Hear from our community of successful traders and students who have transformed their trading with our expert guidance.",
    url: "https://purin.com/testimonials",
    siteName: "Purin",
    images: [
      {
        url: "/testimonials-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Purin Trader Testimonials",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Testimonials | Purin",
    description:
      "Hear from our community of successful traders and students who have transformed their trading with our expert guidance.",
    images: ["/testimonials-twitter-image.jpg"],
  },
};
