import { motion } from "framer-motion"
import StatsChart from "../components/graphics/StatsChart"
import HeroSection from "../components/sections/common/Hero"
import SectionHeader from "../components/SectionHeader"
import NewsCarousel from "../components/NewsCarousel"
import VideoReel from "../components/graphics/VideoReel"
import ScrollStatsSection from "../components/sections/common/ScrollStatsSection"
import FeaturedProjectsSection from "../components/sections/common/FeaturedProjectsSection"
import HomeNextEventCTA from "../components/sections/common/HomeNextEventCTA"

export default function Home() {
  return (
    <div className="relative">
      {/* ── 1. Hero (Dark + Cyan) ───────────────────────── */}
      <HeroSection />

      {/* ── 2. Cifras con cubo 3D interactivo ────────────── */}
      <ScrollStatsSection />

      {/* ── 3. Noticias + Carrusel (Light + Orange) ──────── */}
      <section
        className="py-24 theme-light accent-orange transition-colors duration-500"
        style={{
          background: "var(--bg)",
          color: "var(--fg)",
          borderTop: "1px solid rgba(214,120,10,0.12)",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left — header + categorías */}
            <div>
              <SectionHeader
                label="Noticias"
                title="Últimas Novedades"
                subtitle="Eventos, convocatorias y publicaciones oficiales del Programa de Ingeniería Multimedia."
                accent="secondary"
              />
              <div className="mt-8 space-y-3">
                {[
                  {
                    label: "Convocatorias de Semilleros",
                    value: "2 activas",
                    color: "var(--color-secondary-600)",
                  },
                  {
                    label: "Hitos y Reconocimientos",
                    value: "3 este semestre",
                    color: "var(--color-primary-600)",
                  },
                  {
                    label: "Publicaciones Indexadas",
                    value: "8 en 2025",
                    color: "var(--color-tertiary-600)",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between px-5 py-3.5 rounded-xl border"
                    style={{
                      background: "var(--surface)",
                      borderColor: "var(--color-neutral-200)",
                    }}
                  >
                    <span
                      className="font-body text-sm font-medium"
                      style={{ color: "var(--fg)" }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="font-display text-xs px-2.5 py-0.5 rounded-full"
                      style={{
                        background: `${item.color}15`,
                        color: item.color,
                        border: `1px solid ${item.color}35`,
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

      {/* ── 4. Proyectos Destacados (Dark + Blue) ────────── */}
      <FeaturedProjectsSection />

      {/* ── 5. Producción Científica (Light + Cyan) ──────── */}
      <section
        className="py-24 theme-light accent-cyan transition-colors duration-500"
        style={{
          background: "var(--bg)",
          color: "var(--fg)",
          borderTop: "1px solid rgba(14,154,147,0.12)",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-6">
          <SectionHeader
            label="Métricas"
            title="Producción Científica"
            subtitle="Evolución de publicaciones y proyectos de investigación desde 2019."
            accent="primary"
          />
          <div className="mt-10 p-6 rounded-2xl border" style={{ background: "var(--surface)", borderColor: "var(--color-neutral-200)" }}>
            <StatsChart />
          </div>
        </div>
      </section>

      {/* ── 6. Video Reel (Dark + Orange) ───────────────── */}
      <section
        className="py-24 theme-dark accent-orange transition-colors duration-500"
        style={{
          background: "var(--bg)",
          color: "var(--fg)",
          borderTop: "1px solid rgba(243,136,11,0.15)",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-6">
          <SectionHeader
            label="Producción Audiovisual"
            title="Creación Colectiva"
            subtitle="Espacio donde estudiantes de Ingeniería Multimedia integran animación digital, arte técnico y narrativa."
            accent="secondary"
          />
          <div className="mt-8">
            <VideoReel
              videoId="0gQwwXwgSUs"
              title="Segunda Creación Colectiva"
              description="Conoce la segunda creación colectiva del USB Medialab. En esta edición los estudiantes presentan una animación digital demostrando sus habilidades en animación 2D/3D, lip-sync y posproducción sonora."
            />
          </div>
        </div>
      </section>

      {/* ── 7. Call To Action Próximo Evento (Light + Orange) ── */}
      <HomeNextEventCTA />
    </div>
  )
}
