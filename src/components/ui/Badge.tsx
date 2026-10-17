import React from "react"

export type BadgeVariant = "primary" | "secondary" | "tertiary" | "green" | "red" | "yellow" | "neutral"

export interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  size?: "sm" | "md"
  className?: string
  pulse?: boolean
  outline?: boolean
}

const variantConfig: Record<BadgeVariant, {
  color: string
  bg: string
  border: string
}> = {
  primary: {
    color: "var(--color-primary-600)",
    bg: "var(--color-primary-alpha-10)",
    border: "var(--color-primary-300)",
  },
  secondary: {
    color: "var(--color-secondary-600)",
    bg: "var(--color-secondary-alpha-10)",
    border: "var(--color-secondary-300)",
  },
  tertiary: {
    color: "var(--color-tertiary-600)",
    bg: "var(--color-tertiary-alpha-10)",
    border: "var(--color-tertiary-300)",
  },
  green: {
    color: "var(--color-green-200)",
    bg: "var(--color-green-alpha-10)",
    border: "var(--color-green-100)",
  },
  red: {
    color: "var(--color-red-200)",
    bg: "var(--color-red-alpha-10)",
    border: "var(--color-red-100)",
  },
  yellow: {
    color: "var(--color-yellow-200)",
    bg: "var(--color-yellow-alpha-10)",
    border: "var(--color-yellow-100)",
  },
  neutral: {
    color: "var(--color-neutral-600)",
    bg: "var(--color-neutral-alpha-10)",
    border: "var(--color-neutral-300)",
  },
}

export default function Badge({
  variant = "primary",
  children,
  size = "md",
  className = "",
  pulse = false,
  outline = true,
}: BadgeProps) {
  const config = variantConfig[variant]

  const sizeClasses = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-[12px] px-3 py-1",
  }[size]

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-display tracking-widest uppercase select-none ${sizeClasses} ${className}`}
      style={{
        color: config.color,
        background: config.bg,
        border: outline ? `1px solid ${config.border}` : "none",
        borderRadius: "var(--radius-s)",
      }}
    >
      {pulse && (
        <span
          className="w-1.5 h-1.5 rounded-full animate-ping"
          style={{ background: config.color }}
        />
      )}
      {children}
    </span>
  )
}
