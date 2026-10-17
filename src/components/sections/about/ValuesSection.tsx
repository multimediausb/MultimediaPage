import { motion } from "framer-motion"
import Card from "../../ui/Card"
import Badge from "../../ui/Badge"

const values = [
  {
    icon: "⚗️",
    title: "Rigor Científico",
    desc: "Cada afirmación e innovación está respaldada por metodología reproducible y evidencia empírica rigurosa.",
    accent: "primary" as const,
    color: "var(--color-primary-500)",
    shadow: "turquoise" as const,
  },
  {
    icon: "🤝",
    title: "Colaboración",
    desc: "La ciencia y la creatividad se potencian en comunidad. Fomentamos alianzas académicas, estudiantiles e interinstitucionales.",
    accent: "secondary" as const,
    color: "var(--color-secondary-500)",
    shadow: "orange" as const,
  },
  {
    icon: "🌱",
    title: "Sostenibilidad",
    desc: "Investigamos e implementamos tecnologías con sentido ético, responsabilidad ambiental y pertinencia comunitaria.",
    accent: "tertiary" as const,
    color: "var(--color-tertiary-500)",
    shadow: "blue" as const,
  },
  {
    icon: "🔓",
    title: "Ciencia Abierta",
    desc: "Creemos firmemente en el acceso democrático al conocimiento, código abierto, divulgación masiva y datos abiertos.",
    accent: "primary" as const,
    color: "var(--color-primary-600)",
    shadow: "card" as const,
  },
]

export default function ValuesSection() {
  return (
    <section className="py-20 bg-neutral-100/50">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <Badge variant="secondary">CULTURA & PRINCIPIOS</Badge>
            <h2
              className="text-h3 md:text-h2 font-heading mt-3 mb-2"
              style={{ color: "var(--color-neutral-900)" }}
            >
              Lo Que Nos Define
            </h2>
            <p
              className="text-b2 font-display max-w-xl"
              style={{ color: "var(--color-neutral-600)" }}
            >
              Nuestros valores son la base que impulsa el trabajo conjunto entre
              docentes, estudiantes e industria.
            </p>
          </div>
          <span className="text-b4 font-display uppercase tracking-widest text-neutral-400">
            Valores institucionales
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <Card
                accentColor={v.color}
                accentTop
                shadowType={v.shadow}
                interactive
                className="p-6 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 bg-neutral-100 border border-neutral-200">
                    {v.icon}
                  </div>
                  <h3
                    className="text-h6 font-heading mb-2.5"
                    style={{ color: "var(--color-neutral-900)" }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="text-b3 font-body leading-relaxed"
                    style={{ color: "var(--color-neutral-600)" }}
                  >
                    {v.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between">
                  <span className="text-[10px] font-display uppercase tracking-widest text-neutral-400">
                    Principio 0{i + 1}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: v.color }}
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
