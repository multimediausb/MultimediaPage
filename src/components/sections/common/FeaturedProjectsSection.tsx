import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SectionHeader from "@/components/SectionHeader"
import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"
import Card from "@/components/ui/Card"
import { useParallax } from "@/hooks/useParallax"

const categories = ["Todos", "Realidad Virtual", "Videojuegos", "VFX & Animación", "Transmedia"]

const projects = [
  {
    id: "p1",
    title: "Montes de María: Territorios que Renacen",
    category: "Realidad Virtual",
    year: "2025",
    description:
      "Experiencia inmersiva en RV desarrollada para reconstruir relatos de resiliencia comunitaria mediante fotogrametría y audio espacial 3D.",
    tags: ["VR", "Fotogrametría", "Audio 3D", "Unreal Engine"],
    accent: "var(--color-primary-500)",
    stats: "98% Inmersión",
  },
  {
    id: "p2",
    title: "Corrientes de Memoria: Amazonas Transmedia",
    category: "Transmedia",
    year: "2024",
    description:
      "Plataforma interactiva que combina entornos 3D en tiempo real, web inmersiva y archivo audiovisual del río Amazonas.",
    tags: ["WebXR", "Three.js", "Narrativa Interactivas"],
    accent: "var(--color-secondary-500)",
    stats: "Premio Doc 2024",
  },
  {
    id: "p3",
    title: "Cyber-Flora: Simulación Procedural",
    category: "VFX & Animación",
    year: "2025",
    description:
      "Generación de ecosistemas visuales procedurales mediante shaders GLSL y computación de partículas aceleradas por GPU.",
    tags: ["GLSL", "Procedural", "VFX", "GPU Compute"],
    accent: "var(--color-tertiary-500)",
    stats: "60 FPS WebGL",
  },
  {
    id: "p4",
    title: "Chronos Descent: Roguelike 2.5D",
    category: "Videojuegos",
    year: "2025",
    description:
      "Videojuego experimental de acción táctica con rendering isométrico estilizado e iluminación volumétrica en Unity.",
    tags: ["Unity", "Game Design", "Pixel Art 3D"],
    accent: "var(--color-secondary-500)",
    stats: "Alpha Jugable",
  },
]

export default function FeaturedProjectsSection() {
  const [selectedCat, setSelectedCat] = useState("Todos")
  const parallaxRef = useParallax<HTMLDivElement>(0.15, "down")

  const filtered = selectedCat === "Todos"
    ? projects
    : projects.filter((p) => p.category === selectedCat)

  return (
    <section
      className="relative py-24 theme-dark accent-blue transition-colors duration-500 overflow-hidden"
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        borderTop: "1px solid rgba(47, 141, 207, 0.15)",
        borderBottom: "1px solid rgba(47, 141, 207, 0.15)",
      }}
    >
      {/* Background ambient lighting */}
      <div
        ref={parallaxRef}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(47,141,207,0.3) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            label="Prototipado & Portafolio"
            title="Proyectos Destacados"
            subtitle="Desarrollos de alto impacto en entornos inmersivos, computación visual y experiencias interactivas."
            accent="accent"
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = cat === selectedCat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className="font-display text-xs px-3.5 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    background: active ? "var(--color-tertiary-500)" : "rgba(255,255,255,0.06)",
                    color: active ? "#ffffff" : "var(--fg-muted)",
                    border: active ? "1px solid var(--color-tertiary-400)" : "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((proj) => (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  interactive
                  accentTop
                  accentColor={proj.accent}
                  shadowType="blue"
                  className="h-full p-7 flex flex-col justify-between"
                  style={{
                    background: "var(--surface)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="tertiary" size="sm">
                        {proj.category}
                      </Badge>
                      <span className="font-display text-xs" style={{ color: "var(--fg-muted)" }}>
                        {proj.year} — {proj.stats}
                      </span>
                    </div>

                    <h3
                      className="font-heading text-lg md:text-xl font-bold mb-3 tracking-wide"
                      style={{ color: "var(--fg)" }}
                    >
                      {proj.title}
                    </h3>

                    <p
                      className="font-body text-sm leading-relaxed mb-6"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {proj.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {proj.tags.map((t) => (
                        <span
                          key={t}
                          className="font-display text-[10px] px-2 py-0.5 rounded"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            color: "var(--fg-muted)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <Button
                      variant="outline-tertiary"
                      size="sm"
                      asLink
                      href="/proyectos"
                      className="w-full"
                    >
                      EXPLORAR DETALLE
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
