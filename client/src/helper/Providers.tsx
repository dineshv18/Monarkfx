"use client";

import { Suspense } from "react";
import { GoogleAuthProvider } from "./GoogleAuthProvider";
import { AuthProvider } from "./AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={
      <div className="h-screen w-full flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading MonarkFX" />
      </div>
    }>
      <GoogleAuthProvider>
        <Suspense fallback={
          <div className="h-screen w-full flex items-center justify-center">
            <LoadingSpinner size="md" text="Authenticating" />
          </div>
        }>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </Suspense>
      </GoogleAuthProvider>
    </Suspense>
  );
}
