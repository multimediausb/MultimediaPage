import { motion } from "framer-motion"

import SectionHeader from "../../ui/SectionHeader"

import { useParallax } from "@/hooks/useParallax"

const newsStats = [
  {
    label: "Convocatorias abiertas",

    value: "2 activas",

    accent: "var(--color-secondary-500)",
  },

  {
    label: "Logros recientes",

    value: "3 este semestre",

    accent: "var(--color-primary-500)",
  },

  {
    label: "Publicaciones indexadas",

    value: "8 en 2025",

    accent: "var(--color-tertiary-500)",
  },
]

export default function NewsStatsSection() {
  const accentRef = useParallax<HTMLDivElement>(0.12, "down")
  const cardsRef = useParallax<HTMLDivElement>(0.08, "up")

  return (
    <section
      className="relative overflow-hidden py-20 theme-light grid-primary grid-bg section-transition"
      style={{
        backgroundColor: "var(--bg)",

        color: "var(--fg)",

        borderTop:
          "1px solid color-mix(in srgb, var(--color-primary-500) 20%, transparent)",
        borderBottom:
          "1px solid color-mix(in srgb, var(--color-primary-500) 20%, transparent)",
      }}
      aria-labelledby="news-stats-title"
    >
      <div
        ref={accentRef}
        className="pointer-events-none absolute -right-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-primary-500) 45%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-screen-xl px-6">
        <SectionHeader
          label="Panorama"
          title="La comunidad en movimiento"
          subtitle="Convocatorias, reconocimientos y producción académica que mantienen activo nuestro ecosistema."
          accent="primary"
          align="center"
        />

        <div
          ref={cardsRef}
          id="news-stats-title"
          className="mx-auto mt-10 flex max-w-5xl flex-col items-stretch justify-center gap-5 md:flex-row"
        >
          {newsStats.map((item, index) => (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group relative flex min-h-36 flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border px-6 py-7 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1"
              style={{
                background:
                  "color-mix(in srgb, var(--color-neutral-100) 72%, transparent)",
                borderColor:
                  "color-mix(in srgb, var(--color-primary-500) 35%, transparent)",
                boxShadow:
                  "0 12px 30px color-mix(in srgb, var(--color-primary-900) 12%, transparent)",
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1 transition-all duration-300 group-hover:h-1.5"
                style={{ background: item.accent }}
              />
              <span
                className="font-display text-xs uppercase tracking-[0.16em]"
                style={{ color: item.accent }}
              >
                {item.label}
              </span>
              <strong
                className="mt-3 font-heading text-lg"
                style={{ color: "var(--fg)" }}
              >
                {item.value}
              </strong>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
