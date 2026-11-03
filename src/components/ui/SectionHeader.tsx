import { motion, useInView } from "framer-motion"

import { useRef } from "react"

interface Props {
  label: string

  title: string

  subtitle?: string

  accent?: "primary" | "secondary" | "accent"

  align?: "left" | "center" | "right"
}

const accentMap = {
  primary: "var(--color-primary-600)",
  secondary: "var(--color-secondary-600)",
  accent: "var(--color-tertiary-600)",
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  accent = "primary",
  align = "left",
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const inView = useInView(ref, { once: true, margin: "-40px" })

  const color = accentMap[accent]

  const centered = align === "center"
  const rightAligned = align === "right"

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={centered ? "text-center" : rightAligned ? "text-right" : ""}
    >
      <div
        className={`mb-3 flex items-center gap-3 ${
          centered ? "justify-center" : rightAligned ? "justify-end" : ""
        }`}
      >
        <div className="w-4 h-px" style={{ background: color }} />
        <span
          className="font-display text-xs tracking-widest"
          style={{ color }}
        >
          {label.toUpperCase()}
        </span>
        {!rightAligned && (
          <div
            className="h-px max-w-16 flex-1"
            style={{
              background: `linear-gradient(90deg, ${color}40, transparent)`,
            }}
          />
        )}
      </div>
      <h2
        className="font-display font-bold text-2xl md:text-3xl leading-tight mb-3"
        style={{ color: "var(--fg)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="font-body text-sm max-w-2xl leading-relaxed"
          style={{
            color: "var(--fg-muted)",
            margin: centered
              ? "0 auto"
              : rightAligned
                ? "0 0 0 auto"
                : undefined,
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
