"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

function VerifyEmailContent() {
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<"success" | "error" | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      const id = searchParams.get("id");

      if (!token || !id) {
        toast.error("Invalid verification link");
        setLoading(false);
        setVerificationStatus("error");
        return;
      }

      try {
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/verify-email`,
          {
            token,
            id,
          }
        );

        if (result.status !== 200) {
          throw new Error("Email verification failed: " + result.data.message);
        }

        setVerificationStatus("success");
        toast.success("Email verified successfully!");
        setTimeout(() => router.push("/"), 800);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "An error occurred during email verification"
        );
        setVerificationStatus("error");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, router]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-red-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border border-red-100 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Email Verification
            </CardTitle>
            <p className="text-sm text-gray-600">
              {loading ? "Verifying your email..." : "Email verification status"}
            </p>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-6 p-6">
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="h-12 w-12 text-red-600" />
              </motion.div>
            ) : verificationStatus === "success" ? (
              <motion.div
                className="text-center space-y-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="h-16 w-16 text-red-600 mx-auto" />
                <p className="text-lg font-semibold text-gray-900">
                  Email verified successfully!
                </p>
                <p className="text-sm text-gray-600">Redirecting you to login...</p>
              </motion.div>
            ) : (
              <motion.div
                className="text-center space-y-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <XCircle className="h-16 w-16 text-red-600 mx-auto" />
                <p className="text-lg font-semibold text-gray-900">
                  Email verification failed
                </p>
                <Button
                  onClick={() => router.push("/auth")}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded-lg transition-colors"
                >
                  Back to Login
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-red-600" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}