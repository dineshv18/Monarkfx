import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purin | Next-Generation Trading Education",
  description:
    "Elevate your trading with institutional-grade strategies, expert mentorship, and cutting-edge market insights.",
  keywords: [
    "trading",
    "education",
    "institutional trading",
    "mentorship",
    "market analysis",
  ],
  openGraph: {
    title: "Purin | Next-Generation Trading Education",
    description:
      "Elevate your trading with institutional-grade strategies, expert mentorship, and cutting-edge market insights.",
    url: "https://purin.com",
    siteName: "Purin",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Purin Trading Education",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Purin | Next-Generation Trading Education",
    description:
      "Elevate your trading with institutional-grade strategies, expert mentorship, and cutting-edge market insights.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
