import React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"

export type CardShadowType = "card" | "blue" | "orange" | "turquoise" | "orange-light" | "blue-light"

export interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode
  accentColor?: string
  accentTop?: boolean
  accentLeft?: boolean
  shadowType?: CardShadowType
  interactive?: boolean
  className?: string
  radius?: "m" | "l" | "xl" | "2xl" | "3xl"
}

interface ShadowPair {
  normal: string
  hover: string
}

const shadowMap: Record<CardShadowType, ShadowPair> = {
  card: {
    normal: "var(--shadow-card-normal)",
    hover: "var(--shadow-card-hover)",
  },
  blue: {
    normal: "var(--shadow-blue-normal)",
    hover: "var(--shadow-blue-hover)",
  },
  orange: {
    normal: "var(--shadow-orange-normal)",
    hover: "var(--shadow-orange-hover)",
  },
  turquoise: {
    normal: "var(--shadow-turquoise-normal-light)",
    hover: "var(--shadow-turquoise-hover-light)",
  },
  "orange-light": {
    normal: "var(--shadow-orange-normal-light)",
    hover: "var(--shadow-orange-hover-light)",
  },
  "blue-light": {
    normal: "var(--shadow-blue-normal-light)",
    hover: "var(--shadow-blue-hover-light)",
  },
}

export default function Card({
  children,
  accentColor,
  accentTop = false,
  accentLeft = false,
  shadowType = "card",
  interactive = false,
  className = "",
  radius = "2xl",
  ...props
}: CardProps) {
  const shadows = shadowMap[shadowType]

  const radiusVar = {
    m: "var(--radius-m)",
    l: "var(--radius-l)",
    xl: "var(--radius-xl)",
    "2xl": "var(--radius-2xl)",
    "3xl": "var(--radius-3xl)",
  }[radius]

  return (
    <motion.div
      whileHover={
        interactive
          ? {
              y: -4,
              boxShadow: shadows.hover,
              borderColor: accentColor
                ? `${accentColor}80`
                : "var(--color-primary-300)",
            }
          : undefined
      }
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={{
        background: "var(--surface)",
        border: `var(--stroke-s) solid var(--color-neutral-200)`,
        borderRadius: radiusVar,
        boxShadow: shadows.normal,
        position: "relative",
        overflow: "hidden",
        ...props.style,
      }}
      className={`transition-colors ${className}`}
      {...props}
    >
      {accentTop && accentColor && (
        <div
          className="h-1 w-full absolute top-0 left-0"
          style={{ background: accentColor }}
        />
      )}
      {accentLeft && accentColor && (
        <div
          className="w-1.5 h-full absolute top-0 left-0"
          style={{ background: accentColor }}
        />
      )}
      {children}
    </motion.div>
  )
}
