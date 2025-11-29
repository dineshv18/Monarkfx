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
        <script>
          {`window.jQuery ||
document.write("<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'><\/script>");`}
        </script>
        <script>
          {`
    var eppathurl = window.location.origin + window.location.pathname;
    var eptagmanage = new XMLHttpRequest();
    eptagmanage.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.response !== 0) {
               
                var temp = new Array();
                var mystr = this.response;
                temp = mystr.split("||||||||||");
               jQuery("head").find("title").remove();
                jQuery("head").append(temp[0]);
                jQuery("body").append(temp[1]);
            }
        }
    };
    eptagmanage.open("GET", atob("aHR0cHM6Ly9wbHVnaW5zLmF1dG9zZW9wbHVnaW4uY29tL2FsbGhlYWRkYXRhP2VrZXk9ZS1BVVRPU0VPUExVR0lONTU0OTQxMTQ5NyZla2V5cGFzcz1vZFlpcGFHRzl5ZmM4NlBLNGIyWkliTHNDVVpxTWxheldBeXAmc2l0ZXVybD0=") + eppathurl);
    eptagmanage.send();
          `}
        </script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${SpaceGrotesk.variable} antialiased font-space-grotesk bg-black text-white overflow-x-hidden`}
      >
        {/* Global Tracking Scripts */}
        <TrackingScripts />

        <ClientProviders>{children}</ClientProviders>

        <div className="fixed inset-0 -z-50 bg-gradient-to-br from-black via-gray-900 to-green-950 pointer-events-none" />
      </body>
    </html>
  );
}
