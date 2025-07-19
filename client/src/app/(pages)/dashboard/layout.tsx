import type { Metadata } from "next";
import React from "react";
import { Sidenav } from "./_components/SideNav";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/helper/AuthContext";

export const metadata: Metadata = {
  title:
    "Dashboard | MonarkFX - Global Trading Excellence | Indian Classical Music Institute",
  description:
    "Join MonarkFX - Global Trading Excellence - A premier institute dedicated to teaching Indian classical flute (bansuri), traditional music education, and cultural arts. Experience authentic guru-shishya parampara with expert mentorship.",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-black font-plus-jakarta-sans">
        {/* Background Pattern */}
        <div className="fixed inset-0 opacity-5 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-3xl animate-pulse"
            style={{
              animation: "pulse 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl animate-pulse"
            style={{
              animation: "pulse 10s ease-in-out infinite 1s",
            }}
          />
        </div>

        <Sidenav />
        <main className="md:pl-60 pt-4 md:pt-0 relative z-10">
          <div className="container mx-auto p-4 md:p-8 text-white">
            {children}
          </div>
          <Toaster />
        </main>
      </div>
    </AuthProvider>
  );
};

export default Layout;
