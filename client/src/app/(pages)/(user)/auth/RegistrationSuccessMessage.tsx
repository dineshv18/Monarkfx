import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function RegistrationSuccessMessage() {
  return (
    <motion.div
      className="text-center space-y-6 p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-red-950/30 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-red-500" />
        </div>
      </motion.div>

      <div className="space-y-3">
        <h3
          className="text-xl font-semibold text-white"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Registration Successful
        </h3>
        <p className="text-[#737373] text-sm">
          Please check your email to verify your account
        </p>
      </div>
    </motion.div>
  );
}
