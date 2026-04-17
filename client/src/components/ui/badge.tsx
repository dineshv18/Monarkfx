import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-[var(--radius-pill)] border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-red)]",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--color-primary-red)] text-[var(--color-white)] shadow-sm",
        secondary:
          "border border-[var(--color-border-gray)] bg-[var(--color-soft-gray)] text-[var(--color-text-mid)]",
        destructive:
          "border-transparent bg-[var(--color-dark-red)] text-[var(--color-white)]",
        outline: "border-[var(--color-border-gray)] bg-[var(--color-white)] text-[var(--color-dark-gray)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
