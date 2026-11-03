
import { motion } from "framer-motion"

export interface NewsStatCardProps {
  label: string
  value: string
  accent: string
  backgroundColor: string
  borderColor: string
}

export default function NewsStatCard({
  label,
  value,
  accent,
  backgroundColor,
  borderColor,
}: NewsStatCardProps) {
  const isSecondary = accent === "var(--color-secondary-500)"

  const textColor = isSecondary
    ? "var(--color-secondary-800)"
    : "var(--color-primary-800)"

  return (
    <motion.article
      whileHover={{
        scale: 1.03,
        boxShadow: "0 4px 9px rgba(6, 6, 6, 0.14)",
        transition: { duration: 0.22, ease: "easeOut" },
      }}
      className="relative flex min-h-48 flex-col items-center justify-center overflow-hidden rounded-2xl border px-7 py-8 text-center"
      style={{
        background: backgroundColor,
        borderColor,
        borderWidth: "var(--stroke-m)",
        boxShadow: "none",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Reflejo superior */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          opacity: 0.65,
        }}
      />

      {/* Iluminación ambiental */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full blur-3xl"
        style={{
          backgroundColor: accent,
          opacity: 0.1,
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center">
        <span
          className="font-display text-xs uppercase leading-6 tracking-[0.16em]"
          style={{
            color: textColor,
            opacity: 0.75,
          }}
        >
          {label}
        </span>

        <span
          className="mt-3 font-heading text-2xl uppercase leading-tight tracking-wide"
          style={{
            color: textColor,
            fontWeight: 400,
          }}
        >
          {value}
        </span>
      </div>

      {/* Borde luminoso inferior */}
      <div
        className="pointer-events-none absolute inset-x-10 bottom-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          opacity: 0.4,
        }}
      />
    </motion.article>
  )
}
