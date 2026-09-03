import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-[var(--radius-button)] border border-[var(--color-border-gray)] bg-[var(--color-white)] px-3 py-2 text-base text-[var(--color-dark-gray)] shadow-none placeholder:text-[var(--color-text-mid)] focus-visible:outline-none focus-visible:border-[var(--color-primary-red)] focus-visible:ring-2 focus-visible:ring-[rgba(232,185,35,0.18)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
