import { motion } from "framer-motion"

import SectionHeader from "../../ui/SectionHeader"

import { useParallax } from "@/hooks/useParallax"

const events = [
  {
    title: "Reunión de semilleros",

    date: "18 SEP 2026",

    type: "ENCUENTRO",

    accent: "var(--color-primary-500)",
  },

  {
    title: "Workshop de creación digital",

    date: "02 OCT 2026",

    type: "TALLER",

    accent: "var(--color-tertiary-500)",
  },

  {
    title: "Convocatoria MediaLab",

    date: "15 OCT 2026",

    type: "CONVOCATORIA",

    accent: "var(--color-secondary-500)",
  },

  {
    title: "Muestra de proyectos multimedia",

    date: "27 NOV 2026",

    type: "MUESTRA",

    accent: "var(--color-primary-500)",
  },
]

export default function HomeEventsSection() {
  const visualRef = useParallax<HTMLDivElement>(0.16, "down")
  const eventsRef = useParallax<HTMLDivElement>(0.08, "up")

  return (
    <section
      className="relative overflow-hidden py-24 theme-light grid-tertiary grid-bg section-transition"
      style={{
        backgroundColor: "var(--bg)",

        color: "var(--fg)",

        borderTop:
          "1px solid color-mix(in srgb, var(--color-tertiary-500) 20%, transparent)",
        borderBottom:
          "1px solid color-mix(in srgb, var(--color-tertiary-500) 20%, transparent)",
      }}
      aria-labelledby="home-events-title"
    >
      <div
        ref={visualRef}
        className="pointer-events-none absolute -right-36 top-20 h-112 w-md rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-tertiary-500) 35%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeader
          label="Agenda"
          title="Eventos principales"
          subtitle="Conoce nuestros eventos más importantes y cómo unirte a ellos."
          accent="primary"
          align="center"
        />

        <div
          ref={eventsRef}
          id="home-events-title"
          className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2"
        >
          {events.map((event, index) => (
            <motion.article
              key={event.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className="group flex min-h-28 items-center justify-between gap-5 overflow-hidden rounded-xl border p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1"
              style={{
                background:
                  "color-mix(in srgb, var(--color-neutral-100) 75%, transparent)",
                borderColor:
                  "color-mix(in srgb, var(--color-tertiary-500) 30%, transparent)",
              }}
            >
              <div>
                <span
                  className="font-display text-[10px] tracking-[0.16em]"
                  style={{ color: event.accent }}
                >
                  {event.type}
                </span>
                <h3 className="mt-2 font-heading text-sm leading-relaxed text-(--fg)">
                  {event.title}
                </h3>
                <p className="mt-2 font-display text-[10px] tracking-widest text-(--fg-muted)">
                  {event.date}
                </p>
              </div>
              <span
                className="shrink-0 rounded border px-3 py-2 font-display text-[10px] tracking-widest transition-colors duration-300 group-hover:text-white"
                style={{
                  borderColor: event.accent,

                  color: event.accent,
                }}
              >
                VER MÁS
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
