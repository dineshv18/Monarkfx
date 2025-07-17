"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResendVerificationForm from "./ResendVerificationForm";
import RegistrationSuccessMessage from "./RegistrationSuccessMessage";
import AuthModeToggle from "./AuthModeToggle";
import { AuthMode } from "@/type";
import { motion, AnimatePresence } from "framer-motion";

interface AuthComponentProps {
  courseSlug?: string;
}

export default function AuthComponent({ courseSlug }: AuthComponentProps) {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleLoading = (isLoading: boolean) => setLoading(isLoading);
  const handleRegistrationSuccess = () => setRegistrationSuccess(true);

  const getCardTitle = (mode: AuthMode): string =>
  ({
    login: "Welcome to Monark FX",
    register: "Join Monark FX",
    forgotPassword: "Reset Your Password",
    resendVerification: "Verify Your Email",
  }[mode] || "");

  const getCardDescription = (mode: AuthMode): string =>
  ({
    login: "Access your trading journey",
    register: "Start your trading journey today",
    forgotPassword: "We'll help you reset your password",
    resendVerification: "Verify your email to continue",
  }[mode] || "");

  return (
    <Card className=" shadow-xl bg-black/40 backdrop-blur-md border border-zinc-800/50">
      <CardHeader className="space-y-2 pb-6 text-white/90">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardTitle className="text-2xl md:text-3xl font-bold text-green-500">
            {getCardTitle(authMode)}
          </CardTitle>
          <CardDescription className="text-gray-400 mt-2">
            {getCardDescription(authMode)}
          </CardDescription>
        </motion.div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={authMode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {registrationSuccess ? (
              <RegistrationSuccessMessage />
            ) : (
              <>
                {authMode === "login" && (
                  <LoginForm
                    handleLoading={handleLoading}
                    setAuthMode={setAuthMode}
                    courseSlug={courseSlug}
                  />
                )}
                {authMode === "register" && (
                  <RegisterForm
                    handleLoading={handleLoading}
                    handleRegistrationSuccess={handleRegistrationSuccess}
                    courseSlug={courseSlug}
                  />
                )}
                {authMode === "forgotPassword" && (
                  <ForgotPasswordForm
                    handleLoading={handleLoading}
                    setAuthMode={setAuthMode}
                  />
                )}
                {authMode === "resendVerification" && (
                  <ResendVerificationForm
                    handleLoading={handleLoading}
                    setAuthMode={setAuthMode}
                  />
                )}
                <AuthModeToggle authMode={authMode} setAuthMode={setAuthMode} />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
