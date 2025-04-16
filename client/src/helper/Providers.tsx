"use client";

import { Suspense, useEffect } from "react";
import { GoogleAuthProvider } from "./GoogleAuthProvider";
import { AuthProvider } from "./AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Mouse detection effect for custom cursor
function useMouseDetection() {
  useEffect(() => {
    function handleFirstMouseMove() {
      document.documentElement.classList.add("using-mouse");
      window.removeEventListener("mousemove", handleFirstMouseMove);
    }

    window.addEventListener("mousemove", handleFirstMouseMove);

    // Handle touch devices
    function handleTouchStart() {
      document.documentElement.classList.remove("using-mouse");
      window.removeEventListener("touchstart", handleTouchStart);
    }

    window.addEventListener("touchstart", handleTouchStart);

    return () => {
      window.removeEventListener("mousemove", handleFirstMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);
}

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useMouseDetection();

  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading MonarkFX" />
        </div>
      }
    >
      <GoogleAuthProvider>
        <Suspense
          fallback={
            <div className="h-screen w-full flex items-center justify-center">
              <LoadingSpinner size="md" text="Authenticating" />
            </div>
          }
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </Suspense>
      </GoogleAuthProvider>
    </Suspense>
  );
}
