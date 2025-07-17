"use client";

import { Suspense, useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
;

function VerifyEmailContent() {
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<"success" | "error" | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const verificationRef = useRef(false);

  const verifyEmail = useCallback(async () => {
    // Skip if already verified or verifying
    if (verificationRef.current || isVerifying) return;

    const token = searchParams.get("token");
    const id = searchParams.get("id");

    if (!token || !id) {
      setLoading(false);
      setVerificationStatus("error");
      toast.error("Invalid verification link");
      return;
    }

    try {
      setIsVerifying(true);
      verificationRef.current = true;

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/verify-email`,
        { token, id },
        { withCredentials: true }
      );

      if (response.data.success) {
        // Set cookies in frontend
        const { accessToken } = response.data.data;
        Cookies.set("accessToken", accessToken, { expires: 7 });

        setVerificationStatus("success");
        toast.success("Email verified and logged in successfully!");

        const userRole = response.data.data.user.role;
        const redirectPath = userRole === "ADMIN" ? "/dashboard" : "/user-profile";

        setTimeout(() => {
          router.push(redirectPath);
        }, 1300);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      setVerificationStatus("error");
      toast.error(
        axiosError.response?.data?.message ||
        "An error occurred during email verification"
      );
    } finally {
      setLoading(false);
      setIsVerifying(false);
    }
  }, [searchParams, router, isVerifying]);

  useEffect(() => {
    let mounted = true;

    if (mounted && !verificationRef.current) {
      verifyEmail();
    }

    return () => {
      mounted = false;
    };
  }, [verifyEmail]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-950 via-black to-zinc-950 p-4">
      <Card className="w-full max-w-md bg-zinc-900/50 border border-green-500/20 shadow-xl hover:shadow-green-500/5 transition-all duration-300 backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center pb-6 border-b border-green-500/20">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Email Verification
          </CardTitle>
          <CardDescription className="text-zinc-400 text-base">
            {loading
              ? "Verifying your email address..."
              : verificationStatus === "success"
                ? "Great! Your verification is complete"
                : "Oops! Verification encountered an issue"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-6 pt-6">
          {loading ? (
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl animate-pulse"></div>
              <Loader2 className="h-12 w-12 animate-spin text-green-400 relative z-10" />
            </div>
          ) : verificationStatus === "success" ? (
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl"></div>
                <CheckCircle2 className="h-16 w-16 text-green-400 mx-auto relative z-10" />
              </div>
              <p className="text-green-400 font-medium text-lg">
                Your email has been verified successfully!
              </p>
              <p className="text-zinc-500">Redirecting you to dashboard...</p>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl"></div>
                <XCircle className="h-16 w-16 text-green-400 mx-auto relative z-10" />
              </div>
              <p className="text-green-400 font-medium text-lg">
                Email verification failed
              </p>
              <Button
                onClick={() => router.push("/auth")}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium px-8 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
              >
                Go to Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-950 via-black to-zinc-950">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl animate-pulse"></div>
            <Loader2 className="h-12 w-12 animate-spin text-green-400 relative z-10" />
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
