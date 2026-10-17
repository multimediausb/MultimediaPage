import { motion } from "framer-motion"

interface Props {
  title: string

  date: string

  location: string

  type: "conferencia" | "seminario" | "taller" | "congreso"

  speakers?: string[]

  upcoming?: boolean
}

const typeColor: Record<Props["type"], string> = {
  conferencia: "#0e9a93",

  seminario: "#2878b0",

  taller: "#d6780a",

  congreso: "#2e9e6a",
}

export default function EventCard({
  title,
  date,
  location,
  type,
  speakers = [],
  upcoming,
}: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.18 }}
      className="rounded-xl overflow-hidden"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--surface-2)",
      }}
    >
      <div className="h-0.5 w-full" style={{ background: typeColor[type] }} />

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="font-display text-xs px-2 py-0.5 rounded"
            style={{
              color: typeColor[type],

              background: `${typeColor[type]}15`,

              border: `1px solid ${typeColor[type]}30`,
            }}
          >
            {type.toUpperCase()}
          </span>
          {upcoming && (
            <span
              className="font-display text-xs px-2 py-0.5 rounded-full animate-pulse"
              style={{
                color: "#d6780a",
                background: "rgba(214,120,10,0.1)",
                border: "1px solid rgba(214,120,10,0.3)",
              }}
            >
              PRÓXIMO
            </span>
          )}
        </div>

        <h3
          className="font-body font-semibold text-sm mb-3 leading-snug"
          style={{ color: "var(--fg)" }}
        >
          {title}
        </h3>

        <div
          className="space-y-1.5 font-display text-xs"
          style={{ color: "var(--fg-muted)" }}
        >
          <div className="flex items-center gap-2">
            <span style={{ color: "var(--primary)" }}>◎</span>
            {date}
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: "var(--secondary)" }}>◎</span>
            {location}
          </div>
        </div>

        {speakers.length > 0 && (
          <div
            className="mt-3 pt-3"
            style={{ borderTop: "1px solid var(--surface-2)" }}
          >
            <p
              className="font-display text-xs mb-2"
              style={{ color: "var(--fg-muted)" }}
            >
              PONENTES
            </p>
            <div className="flex flex-wrap gap-1">
              {speakers.map((s) => (
                <span
                  key={s}
                  className="font-display text-xs px-2 py-0.5 rounded"
                  style={{ background: "var(--surface-2)", color: "var(--fg)" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
