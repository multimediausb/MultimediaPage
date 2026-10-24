import { useState } from "react"

import { motion } from "framer-motion"

import SectionHeader from "../components/SectionHeader"

import ResearchCard from "../components/ResearchCard"

import StatsChart from "../components/graphics/StatsChart"

import PageBanner from "../components/PageBanner"

import SemillerosSection from "../components/sections/investigacion/SemillerosSection"

const filters = ["todos", "activo", "concluido", "en-revision"]

const projects = [
  {
    id: "INV-001",
    title: "Proyecto Armada Montes de María: Territorios que Renacen",
    area: "Memoria Histórica y Tecnología Social",
    lead: "Armada Nacional & Univ. San Buenaventura(Sede Bogotá)",
    year: 2025,
    status: "activo" as const,
    tags: [
      "Memoria Histórica",
      "Realidad Virtual",
      "Inteligencia Artificial",
      "Resiliencia",
    ],
  },

  {
    id: "INV-002",
    title: "Proyecto Corrientes de Memoria: Narrativa Transmedia del Amazonas",
    area: "Memoria Histórica y Narrativas Transmedia",
    lead: "Armada de Colombia & Univ. San Buenaventura (Sede Bogotá)",
    year: 2024,
    status: "concluido" as const,
    tags: ["Videojuegos", "Realidad Virtual", "Amazonas", "Memoria Histórica"],
  },

  {
    id: "INV-003",
    title: "Infancias Que resisten",
    area: "Crosmedia",
    lead: "Universidad de San Buenaventura",
    year: 2025,
    status: "activo" as const,
    tags: ["Proyeccion Social", "Producción Multimedia"],
  },

  {
    id: "INV-004",
    title: "Renovaland",
    area: "Videojuegos",
    lead: "Universidad de San Buenaventura",
    year: 2024,
    status: "concluido" as const,
    tags: ["Proyeccion Social", "Videojuegos"],
  },

  {
    id: "INV-005",
    title: "MediaShow 2024",
    area: "Arte Digital y Producción Multimedia",
    lead: "Universidad de San Buenaventura",
    year: 2024,
    status: "concluido" as const,
    tags: ["Arte Digital", "Producción Multimedia"],
  },

  {
    id: "INV-006",
    title: "Proyecto RA Andes",
    area: "Realidad Aumentada e Innovación Social",
    lead: "Universidad de los Andes y Universidad de San Buenaventura",
    year: 2026,
    status: "activo" as const,
    tags: [
      "RV",
      "Experiencias Inmersivas",
      "Narrativa Digital",
      "Innovación Social",
    ],
  },
]

export default function Investigacion() {
  const [active, setActive] = useState("todos")

  const filtered =
    active === "todos" ? projects : projects.filter((p) => p.status === active)

  return (
    <div className="min-h-screen pb-20">
      <PageBanner
        image="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1600&h=600&fit=crop&auto=format"
        alt="Laboratorio científico con microscopios"
        label="Investigación"
        title="Proyectos en Curso"
        accent="var(--primary)"
      />
      <div className="max-w-screen-xl mx-auto px-6 pt-12">
        <SectionHeader
          label=""
          title=""
          subtitle="Iniciativas de investigación científica que posicionan al centro en la vanguardia del conocimiento."
          accent="primary"
        />

        {/* Filters */}
        <div className="flex gap-2 mt-8 mb-10 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="font-display text-xs tracking-widest px-4 py-2 rounded transition-all duration-200"
              style={{
                background:
                  active === f ? "var(--primary)" : "rgba(14,154,147,0.08)",

                color: active === f ? "var(--bg)" : "var(--fg-muted)",

                border: `1px solid ${
                  active === f ? "var(--primary)" : "rgba(14,154,147,0.15)"
                }`,
              }}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              layout
            >
              <ResearchCard {...p} />
            </motion.div>
          ))}
        </motion.div>

        {/* Semilleros */}
        <div
          className="mt-16 pt-16"
          style={{ borderTop: "1px solid rgba(14,154,147,0.1)" }}
        >
          <SemillerosSection />
        </div>

        <div className="mt-16">
          <StatsChart title="Evolución de Publicaciones" />
        </div>
      </div>
    </div>
  )
}
