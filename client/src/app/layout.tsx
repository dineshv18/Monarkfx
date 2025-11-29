import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import ClientProviders from "@/helper/Providers";
import Script from "next/script";
import TrackingScripts from "@/components/TrackingScripts";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const SpaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MonarkFX - Global Trading Excellence",
  description:
    "Empower your financial future with expert trading education in stocks, forex, and cryptocurrency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${SpaceGrotesk.variable} antialiased font-space-grotesk overflow-x-hidden`}
      >
        {/* Global Tracking Scripts */}
        <TrackingScripts />

        <ClientProviders>{children}</ClientProviders>

        <div className="fixed inset-0 -z-50 bg-gradient-to-br from-black via-gray-900 to-green-950 pointer-events-none" />
        {/* SEO Plugin - Load from public folder */}
        <Script
          src="/seo-plugin.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
