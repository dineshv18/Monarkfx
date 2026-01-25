import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Path, UseFormRegister, FieldErrors } from "react-hook-form";

export type InputFieldProps<T extends Record<string, unknown>> = {
  id: string;
  type: string;
  label: string;
  icon: React.ReactNode;
  register: UseFormRegister<T>;
  name: Path<T>;
  errors: FieldErrors<T>;
  validationRules?: Record<string, unknown>;
  showPasswordToggle?: boolean;
};

export default function InputField<T extends Record<string, unknown>>({
  id,
  type,
  label,
  icon,
  register,
  name,
  errors,
  validationRules,
  showPasswordToggle,
}: InputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-[#525252] text-xs tracking-wide uppercase block"
      >
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500">
          {icon}
        </span>
        <input
          id={id}
          type={showPasswordToggle && showPassword ? "text" : type}
          className={`w-full pl-10 ${showPasswordToggle ? "pr-10" : "pr-4"} py-3 bg-transparent border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-red-700 transition-colors`}
          {...register(name, validationRules)}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-xs">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
