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
        className="text-[var(--color-text-mid)] text-xs tracking-wide uppercase block"
      >
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-mid)]">
          {icon}
        </span>
        <input
          id={id}
          type={showPasswordToggle && showPassword ? "text" : type}
          className={`w-full pl-10 ${showPasswordToggle ? "pr-10" : "pr-4"} py-3 bg-white border border-[var(--color-border-gray)] rounded-[var(--radius-button)] text-[var(--color-dark-gray)] placeholder-[var(--color-text-mid)] focus:outline-none focus:border-[var(--color-primary-red)] focus:ring-2 focus:ring-[rgba(232,185,35,0.18)] transition-all`}
          {...register(name, validationRules)}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-mid)] hover:text-[var(--color-primary-red)] transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {errors[name] && (
        <p className="text-[var(--color-primary-red)] text-xs">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
