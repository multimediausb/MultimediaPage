import { motion } from "framer-motion"


import StatsChart from "../components/StatsChart"
import HeroSection from "../components/sections/common/Hero"

import SectionHeader from "../components/SectionHeader"
import NewsCarousel from "../components/NewsCarousel"
import VideoReel from "../components/VideoReel"
import ScrollStatsSection from "../components/sections/common/ScrollStatsSection"


export default function Home() {
  return (
    <div className="relative">
      {/* ── Hero ───────────────────────────────────────── */}
      <HeroSection />
      {/* ── Stats con efecto de scroll interactivo ──────── */}
      <ScrollStatsSection />

      {/* ── Noticias + Carrusel ────────────────────────── */}
      <section
        className="py-16"
        style={{ borderTop: "1px solid rgba(14,154,147,0.08)" }}
      >
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Left — header + descripción */}
            <div>
              <SectionHeader
                label="Noticias"
                title="Últimas Novedades"
                subtitle="Eventos, logros, convocatorias y publicaciones del Programa de Ingeniería Multimedia."
                accent="primary"
              />
              <div className="mt-8 space-y-3">
                {/* Mini list of categories */}
                {[
                  {
                    icon: "",
                    label: "Convocatorias abiertas",
                    value: "2 activas",
                    color: "#2e9e6a",
                  },

                  {
                    icon: "",
                    label: "Logros recientes",
                    value: "3 este semestre",
                    color: "#d6780a",
                  },

                  {
                    icon: "",
                    label: "Publicaciones indexadas",
                    value: "8 en 2025",
                    color: "#2878b0",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--surface-2)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <span
                        className="font-body text-sm"
                        style={{ color: "var(--fg)" }}
                      >
                        {item.label}
                      </span>
                    </div>
                    <span
                      className="font-display text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: `${item.color}15`,
                        color: item.color,
                        border: `1px solid ${item.color}30`,
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
            >
              <NewsCarousel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Produccion investigaccion ──────────────────────────────────────── */}
      <section
        className="py-16"
        style={{ borderTop: "1px solid rgba(14,154,147,0.08)" }}
      >
        <div className="max-w-screen-xl mx-auto px-6">
          <SectionHeader
            label="Métricas"
            title="Producción Científica"
            subtitle="Evolución de publicaciones y proyectos de investigación desde 2019."
            accent="primary"
          />
          <div className="mt-8">
            <StatsChart />
          </div>
        </div>
      </section>

      {/* ── Video Reel ─────────────────────────────────── */}
      <section
        className="py-16"
        style={{ borderTop: "1px solid rgba(14,154,147,0.08)" }}
      >
        <div className="max-w-screen-xl mx-auto px-6">
          <VideoReel
            videoId="0gQwwXwgSUs"
            title="Segunda Creación Colectiva"
            description="Ya puedes conocer la segunda creación colectiva del USB Medialab, un espacio donde los estudiantes de Ingeniería Multimedia desarrollan contenido multimedia innovador. En esta edición presentan una animación digital con reconocidos personajes de Cartoon Network bailando y cantando la canción “Thrift Shop”, demostrando su creatividad, talento y habilidades en producción audiovisual."
          />
        </div>
      </section>

      {/* ── insignias ───────────────────────────────── */}
      {/*<section className="py-16" style={{ borderTop: '1px solid rgba(14,154,147,0.08)' }}>
        <div className="max-w-screen-xl mx-auto px-6">
          <SectionHeader
            label="Logros"
            title="Insignias del Centro"
            subtitle="Reconocimientos por hitos científicos e impacto académico."
            accent="accent"
          />
          <div className="mt-10 flex flex-wrap gap-8">
            {badges.map((b) => (
              <GamificationBadge key={b.label} {...b} />
            ))}
          </div>
        </div>
      </section>*/}
    </div>
  )
}


