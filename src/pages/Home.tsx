import { motion } from "framer-motion"

import HeroScene from "../components/HeroScene"
import ParticleField from "../components/ParticleField"
import StatsChart from "../components/StatsChart"

import SectionHeader from "../components/SectionHeader"
import NewsCarousel from "../components/NewsCarousel"
import VideoReel from "../components/VideoReel"
import ScrollStatsSection from "../components/sections/common/ScrollStatsSection"
import Button from "../components/ui/Button"
import logoSrc from "@/imports/MediaShow.png"

export default function Home() {
  return (
    <div className="relative">
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden grid-bg">
        <ParticleField />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center py-28">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo + label */}
              <div className="flex items-center gap-4 mb-8">
                <img
                  src={logoSrc}
                  alt="MediaShow"
                  className="h-12 w-auto object-contain"
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(14,154,147,0.4))",
                  }}
                />
                <div
                  className="h-px flex-1 max-w-24"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(14,154,147,0.6), transparent)",
                  }}
                />
                <span
                  className="font-display text-xs tracking-widest"
                  style={{ color: "var(--primary)" }}
                >
                  MEDIASHOW
                </span>
              </div>

              <h1
                className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6"
                style={{ color: "var(--fg)" }}
              >
                CIENCIA QUE
                <br />
                <span
                  style={{
                    color: "var(--primary)",
                    textShadow: "0 0 32px rgba(14,154,147,0.35)",
                  }}
                >
                  TRANSFORMA
                </span>
                <br />
                EL FUTURO
              </h1>

              <p
                className="font-body text-sm leading-relaxed mb-8 max-w-md"
                style={{ color: "var(--fg-muted)" }}
              >
                Explora el ecosistema académico del Programa de Ingeniería
                Multimedia. Descubre proyectos, investigación y experiencias
                interactivas desarrolladas con{" "}
                <strong style={{ color: "var(--fg)" }}>
                  nuevas tecnologías y gráficos mediante computadora
                </strong>
                , donde la creatividad y la innovación convergen para
                transformar ideas en soluciones digitales.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  asLink
                  href="/investigacion"
                >
                  EXPLORAR INVESTIGACIÓN
                </Button>
                <Button
                  variant="outline-primary"
                  size="lg"
                  asLink
                  href="/about"
                >
                  ÚNETE AL EQUIPO
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-80 lg:h-[480px] relative"
          >
            <HeroScene />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div
            className="h-6 w-px"
            style={{
              background:
                "linear-gradient(180deg, transparent, var(--primary))",
            }}
          />
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: "var(--primary)" }}
          />
        </motion.div>
      </section>

      {/* ── Stats con efecto de scroll interactivo ──────── */}
      <ScrollStatsSection
        title="NUESTRO IMPACTO EN CIFRAS"
        tag="MÉTRICAS DEL PROGRAMA"
      />

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
