import { motion } from "framer-motion"

interface Props {
  icon: string

  title: string

  description: string

  accent?: "primary" | "secondary" | "accent"
}

const accentMap = {
  primary: "#0e9a93",
  secondary: "#d6780a",
  accent: "#2878b0",
}

export default function ServiceCard({
  icon,
  title,
  description,
  accent = "primary",
}: Props) {
  const color = accentMap[accent]

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: `0 8px 28px ${color}18` }}
      transition={{ duration: 0.2 }}
      className="rounded-xl p-6 relative overflow-hidden group cursor-default"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--surface-2)",
      }}
    >
      <div
        className="absolute bottom-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `${color}0a`, filter: "blur(24px)" }}
      />
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-4"
        style={{ background: `${color}12`, border: `1px solid ${color}25` }}
      >
        {icon}
      </div>
      <h3
        className="font-body font-semibold text-sm mb-2"
        style={{ color: "var(--fg)" }}
      >
        {title}
      </h3>
      <p
        className="font-body text-sm leading-relaxed"
        style={{ color: "var(--fg-muted)" }}
      >
        {description}
      </p>
      <div
        className="mt-4 font-display text-xs flex items-center gap-1 group-hover:gap-2 transition-all duration-200"
        style={{ color }}
      >
        EXPLORAR <span>→</span>
      </div>
    </motion.div>
  )
}
