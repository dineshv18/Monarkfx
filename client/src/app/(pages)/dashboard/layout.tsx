"use client";

import React from "react";
import { Sidenav } from "./_components/SideNav";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/helper/AuthContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-black font-plus-jakarta-sans">
        {/* Add CSS for grid pattern */}
        <style jsx global>{`
          .bg-dot-pattern {
            background-image: radial-gradient(circle, #cccccc 1px, white 1px);
            background-size: 20px 20px;
          }

          .bg-grid-pattern {
            background-image: linear-gradient(
                to right,
                rgba(34, 197, 94, 0.1) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(34, 197, 94, 0.1) 1px,
                transparent 1px
              );
            background-size: 20px 20px;
          }
        `}</style>

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
