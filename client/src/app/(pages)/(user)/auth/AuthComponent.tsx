"use client";

import { useState } from "react";
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
    login: "Welcome Back",
    register: "Create Account",
    forgotPassword: "Reset Password",
    resendVerification: "Verify Email",
  }[mode] || "");

  const getCardDescription = (mode: AuthMode): string =>
  ({
    login: "Access your student portal",
    register: "Start your learning journey",
    forgotPassword: "We'll help you reset your password",
    resendVerification: "Verify your email to continue",
  }[mode] || "");

  return (
    <div className="bg-[#0a0a0a] border border-zinc-900 rounded-xl p-6 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1
          className="text-2xl font-bold text-white mb-2"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {getCardTitle(authMode)}
        </h1>
        <p className="text-[#525252] text-sm">
          {getCardDescription(authMode)}
        </p>
      </motion.div>

      {/* Form Content */}
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
    </div>
  );
}
