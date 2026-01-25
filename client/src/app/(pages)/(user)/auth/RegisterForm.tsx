import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { User, Mail, Lock, Loader2 } from "lucide-react";
import InputField from "./InputField";
import axios from "axios";
import { RegisterFormProps, RegisterInputs } from "@/type";
import { useState } from "react";
import GoogleButton from "./GoogleButton";
import { motion } from "framer-motion";

export default function RegisterForm({
  handleLoading,
  handleRegistrationSuccess,
}: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    setIsLoading(true);
    handleLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
        data
      );

      toast.success(
        "Registration successful! Please check your email to verify your account."
      );
      handleRegistrationSuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Registration failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
      handleLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <InputField<RegisterInputs>
        id="register-name"
        type="text"
        label="Name"
        icon={<User className="h-4 w-4 text-zinc-500" />}
        register={register}
        name="name"
        errors={errors}
        validationRules={{
          required: "Name is required",
          minLength: {
            value: 2,
            message: "Name must be at least 2 characters",
          },
        }}
      />
      <InputField<RegisterInputs>
        id="register-email"
        type="email"
        label="Email"
        icon={<Mail className="h-4 w-4 text-zinc-500" />}
        register={register}
        name="email"
        errors={errors}
        validationRules={{
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Invalid email address",
          },
        }}
      />
      <InputField<RegisterInputs>
        id="register-password"
        type="password"
        label="Password"
        icon={<Lock className="h-4 w-4 text-zinc-500" />}
        register={register}
        name="password"
        errors={errors}
        validationRules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
          validate: {
            hasUpperCase: (value: string) =>
              /[A-Z]/.test(value) ||
              "Password must contain at least one uppercase letter",
            hasLowerCase: (value: string) =>
              /[a-z]/.test(value) ||
              "Password must contain at least one lowercase letter",
            hasNumber: (value: string) =>
              /\d/.test(value) || "Password must contain at least one number",
            hasSpecialChar: (value: string) =>
              /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
              "Password must contain at least one special character",
          },
        }}
        showPasswordToggle
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
        style={{
          background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)",
        }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Please wait...</span>
          </div>
        ) : (
          "Create Account"
        )}
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-zinc-800" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-[#0a0a0a] text-[#525252] text-xs">
            Or continue with
          </span>
        </div>
      </div>

      <GoogleButton mode="register" />
    </motion.form>
  );
}
