import type { Metadata } from "next";
import "./globals.css";
import { spaceGrotesk, inter } from "./fonts";
import ClientProviders from "@/helper/Providers";
import Script from "next/script";
import TrackingScripts from "@/components/TrackingScripts";

export const metadata: Metadata = {
  metadataBase: new URL("https://monarkfx.com"),
  title: "MonarkFX - Global Trading Excellence",
  description:
    "Empower your financial future with expert trading education in stocks, forex, and cryptocurrency.",
  verification: {
    google: "ag1Iza1649hS0a-56hUID2i8REiGVerKmH3ZxRLBhHM",
  },
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17830556034"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17830556034');
          `}
        </Script>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-53LW22LW');`}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-[var(--color-bg-primary)] text-[var(--color-text-mid)] font-body overflow-x-hidden`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-53LW22LW"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Global Tracking Scripts */}
        <TrackingScripts />

        <ClientProviders>{children}</ClientProviders>

        <div className="fixed inset-0 -z-50 bg-[var(--color-bg-primary)] pointer-events-none" />
        {/* SEO Plugin - Load from public folder */}
      </body>
    </html>
  );
}
