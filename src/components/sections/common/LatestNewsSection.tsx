import { motion } from "framer-motion"

import noticias from "@/data/noticias.json"

import SectionHeader from "../../ui/SectionHeader"

import { useParallax } from "@/hooks/useParallax"

const tagColor: Record<string, string> = {
  NUEVO: "var(--color-primary-500)",
  LOGRO: "var(--color-secondary-500)",
  PUBLICACIÓN: "var(--color-tertiary-400)",
  ABIERTO: "var(--color-green-100)",
  ALIANZA: "var(--color-tertiary-300)",
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-CO", {
    day: "numeric",

    month: "short",

    year: "numeric",
  })

export default function LatestNewsSection() {
  const glowRef = useParallax<HTMLDivElement>(0.18, "up")
  const cardsRef = useParallax<HTMLDivElement>(0.1, "down")

  return (
    <section
      className="relative overflow-hidden py-24 theme-dark grid-secondary dark-grid-bg section-transition"
      style={{
        backgroundColor: "var(--bg)",

        color: "var(--fg)",

        borderBottom:
          "1px solid color-mix(in srgb, var(--color-secondary-500) 24%, transparent)",
      }}
      aria-labelledby="latest-news-title"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-secondary-500) 32%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-screen-xl px-6">
        <SectionHeader
          label="Actualidad"
          title="Últimas novedades"
          subtitle="Eventos, logros, convocatorias y publicaciones del Programa de Ingeniería Multimedia."
          accent="secondary"
        />

        <div
          ref={cardsRef}
          id="latest-news-title"
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {noticias.slice(0, 4).map((news, index) => {
            const accent = tagColor[news.tag] ?? "var(--color-primary-500)"

            return (
              <motion.article
                key={news.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="group overflow-hidden rounded-xl border transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background:
                    "color-mix(in srgb, var(--color-neutral-900) 88%, transparent)",
                  borderColor:
                    "color-mix(in srgb, var(--color-neutral-100) 10%, transparent)",
                  boxShadow:
                    "0 16px 35px color-mix(in srgb, var(--color-neutral-900) 18%, transparent)",
                }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={news.imagen}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent, color-mix(in srgb, var(--color-neutral-900) 72%, transparent))",
                    }}
                  />
                  <span
                    className="absolute left-4 top-4 rounded px-2 py-1 font-display text-[10px] tracking-[0.12em]"
                    style={{
                      background: accent,
                      color: "var(--color-primary-900)",
                    }}
                  >
                    {news.tag}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="font-display text-[10px] uppercase tracking-widest"
                      style={{ color: accent }}
                    >
                      {formatDate(news.fecha)}
                    </span>
                    <span className="font-display text-[10px] uppercase tracking-widest text-slate-500">
                      {news.categoria}
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-sm leading-relaxed text-[var(--color-neutral-100)]">
                    {news.titulo}
                  </h3>
                  <p className="mt-3 line-clamp-3 font-body text-sm leading-relaxed text-[var(--color-neutral-300)]">
                    {news.resumen}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
