import { AuthModeToggleProps } from "@/type";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthModeToggle({
  authMode,
  setAuthMode,
}: AuthModeToggleProps) {
  return (
    <motion.div
      className="w-full text-center mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {authMode !== "login" ? (
        <button
          onClick={() => setAuthMode("login")}
          className="flex items-center justify-center gap-2 mx-auto text-[#737373] hover:text-red-400 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </button>
      ) : (
        <div className="space-y-4">
          <button
            onClick={() => setAuthMode("register")}
            className="text-[#737373] hover:text-red-400 transition-colors text-sm"
          >
            Need an account?{" "}
            <span className="text-red-500 font-medium">Register</span>
          </button>
          <div className="flex items-center justify-center gap-4 text-sm">
            <button
              onClick={() => setAuthMode("forgotPassword")}
              className="text-[#525252] hover:text-red-400 transition-colors"
            >
              Forgot Password?
            </button>
            <span className="text-zinc-800">|</span>
            <button
              onClick={() => setAuthMode("resendVerification")}
              className="text-[#525252] hover:text-red-400 transition-colors"
            >
              Resend Verification
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
