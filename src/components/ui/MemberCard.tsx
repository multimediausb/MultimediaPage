import { motion } from "framer-motion"

interface Props {
  name: string

  role: string

  category: "docente" | "egresado" | "estudiante"

  specialty: string

  avatar?: string

  publications?: number
}

const catColor: Record<Props["category"], string> = {
  docente: "#0e9a93",

  egresado: "#2878b0",

  estudiante: "#d6780a",
}

const catLabel: Record<Props["category"], string> = {
  docente: "DOCENTE",

  egresado: "EGRESADO",

  estudiante: "ESTUDIANTE",
}

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")

export default function MemberCard({
  name,
  role,
  category,
  specialty,
  avatar,
  publications,
}: Props) {
  const color = catColor[category]

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18 }}
      className="rounded-xl p-4 text-center relative overflow-hidden"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--surface-2)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-16 opacity-30"
        style={{
          background: `linear-gradient(180deg, ${color}20, transparent)`,
        }}
      />
      <div
        className="relative mx-auto mb-3 w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-lg"
        style={{
          background: avatar ? "transparent" : `${color}15`,

          border: `2px solid ${color}40`,

          color,
        }}
      >
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          initials(name)
        )}
      </div>

      <span
        className="font-display text-xs px-2 py-0.5 rounded-full"
        style={{
          color,
          background: `${color}12`,
          border: `1px solid ${color}30`,
        }}
      >
        {catLabel[category]}
      </span>

      <h3
        className="font-body font-semibold text-sm mt-2 mb-0.5"
        style={{ color: "var(--fg)" }}
      >
        {name}
      </h3>
      <p
        className="font-display text-xs mb-1"
        style={{ color: "var(--primary)" }}
      >
        {role}
      </p>
      <p className="font-body text-xs" style={{ color: "var(--fg-muted)" }}>
        {specialty}
      </p>

      {publications != null && (
        <div
          className="mt-3 pt-3 font-display text-xs"
          style={{
            borderTop: "1px solid var(--surface-2)",
            color: "var(--fg-muted)",
          }}
        >
          <span style={{ color: "var(--fg)", fontWeight: 600 }}>
            {publications}
          </span>{" "}
          publicaciones
        </div>
      )}
    </motion.div>
  )
}
