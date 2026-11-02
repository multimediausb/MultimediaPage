import HeroSection from "../components/sections/common/Hero"
import SectionHeader from "../components/ui/SectionHeader"
import VideoReel from "../components/graphics/VideoReel"
import ScrollStatsSection from "../components/sections/common/ScrollStatsSection"
import NewsStatsSection from "../components/sections/common/NewsStatsSection"
import LatestNewsSection from "../components/sections/common/LatestNewsSection"
import HomeEventsSection from "../components/sections/common/HomeEventsSection"
import { useParallax } from "@/hooks/useParallax"

const scientificMetrics = [
  { title: "Publicaciones", value: "24", accent: "var(--color-primary-500)" },
  {
    title: "Proyectos activos",
    value: "12",
    accent: "var(--color-secondary-500)",
  },
  {
    title: "Grupos de investigación",
    value: "06",
    accent: "var(--color-tertiary-400)",
  },
]

function ScientificProductionSection() {
  const visualRef = useParallax<HTMLDivElement>(0.14, "up")

  return (
    <section
      className="relative overflow-hidden py-24 theme-dark grid-primary dark-grid-bg section-transition"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--fg)",
        borderTop:
          "1px solid color-mix(in srgb, var(--color-primary-500) 24%, transparent)",
      }}
      aria-labelledby="scientific-production-title"
    >
      <div
        ref={visualRef}
        className="pointer-events-none absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-primary-500) 30%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-screen-xl px-6">
        <SectionHeader
          label="Métricas"
          title="Producción científica"
          subtitle="Evolución de publicaciones y proyectos de investigación desde 2019."
          accent="primary"
          align="center"
        />
        <div
          id="scientific-production-title"
          className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-3"
        >
          {scientificMetrics.map((metric, index) => (
            <div
              key={metric.title}
              className="relative overflow-hidden rounded-xl border p-6"
              style={{
                background:
                  "color-mix(in srgb, var(--color-neutral-900) 82%, transparent)",
                borderColor:
                  "color-mix(in srgb, var(--color-primary-500) 35%, transparent)",
              }}
            >
              <span
                className="font-display text-[10px] uppercase tracking-[0.16em]"
                style={{ color: metric.accent }}
              >
                {metric.title}
              </span>
              <div className="mt-5 flex items-end justify-between gap-3">
                <strong className="font-heading text-2xl text-[var(--color-neutral-100)]">
                  {metric.value}
                </strong>
                <div className="flex h-12 items-end gap-1">
                  {[0.35, 0.5, 0.65, 0.8, 1].map((height) => (
                    <span
                      key={height}
                      className="w-2 rounded-t-sm"
                      style={{
                        height: `${height * (26 + index * 6)}px`,
                        background: metric.accent,
                        opacity: 0.45 + height * 0.45,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href="/investigacion"
            className="inline-flex border px-5 py-2.5 font-display text-xs tracking-widest transition-colors duration-300 hover:bg-[var(--color-primary-500)] hover:text-white"
            style={{
              borderColor: "var(--color-primary-500)",
              color: "var(--color-primary-300)",
            }}
          >
            VER LAS JUNTAS
          </a>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const videoVisualRef = useParallax<HTMLDivElement>(0.12, "down")

  return (
    <div className="relative">
      {/* ── 1. Hero (Light + Cyan + Grid) ───────────────── */}
      <HeroSection />

      {/* ── 2. Cifras con cubo 3D interactivo ────────────── */}
      <ScrollStatsSection />

      {/* ── 3. Estadísticas de noticias (Light + Primary + Grid) ─ */}
      <NewsStatsSection />

      {/* ── 4. Últimas novedades (Dark + Secondary + Grid) ─────── */}
      <LatestNewsSection />

      {/* ── 5. Eventos principales (Light + Primary + Grid) ─ */}
      <HomeEventsSection />

      {/* ── 6. Producción científica (Dark + Primary + Grid) ─ */}
      <ScientificProductionSection />

      {/* ── 7. Video Reel (Light + Secondary + Grid) ───── */}
      <section
        className="relative overflow-hidden py-24 theme-light grid-secondary grid-bg section-transition"
        style={{
          backgroundColor: "var(--bg)",
          color: "var(--fg)",
          borderTop:
            "1px solid color-mix(in srgb, var(--color-secondary-500) 22%, transparent)",
        }}
      >
        <div
          ref={videoVisualRef}
          className="pointer-events-none absolute -right-36 top-1/4 h-[26rem] w-[26rem] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-secondary-500) 32%, transparent) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
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
    </div>
  )
}
