import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Card from "../../ui/Card"
import Badge from "../../ui/Badge"
import Button from "../../ui/Button"
import FilterPills from "../../ui/FilterPills"

interface EventItem {
  id: string
  title: string
  date: string
  location: string
  type: "conferencia" | "taller" | "panel" | "charla"
  speakers: string[]
  upcoming?: boolean
  description?: string
  registrationOpen?: boolean
}

const allEvents: EventItem[] = [
  {
    id: "1",
    title: "Media Show 2026-2: Tecnologías Inmersivas y Futuro Digital",
    date: "16 Sep 2026 — 9:00 AM",
    location: "Auditorio Juan Anaya, Universidad de San Buenaventura",
    type: "conferencia",
    speakers: ["Dr. Andrés Ramírez", "Dra. Elena Rossi"],
    upcoming: true,
    description:
      "El encuentro insignia del MediaLab donde convergen la inteligencia artificial, VFX y experiencias interactivas.",
    registrationOpen: true,
  },
  {
    id: "2",
    title: "Panel de Egresados: El Camino en la Industria Multimedia",
    date: "06 May 2026 — 3:00 PM",
    location: "Salón 308 Guillermo de Ockham",
    type: "panel",
    speakers: ["Laura Gómez (Riot)", "Santiago Cruz (Ubisoft)", "Carlos Ortiz"],
    upcoming: true,
    description:
      "Conecta con egresados destacados que lideran proyectos de videojuegos y posproducción en estudios internacionales.",
    registrationOpen: true,
  },
  {
    id: "3",
    title: "Digital Paint-Off USB 2026 — Challenge de Arte Digital",
    date: "06 May 2026 — 2:00 PM a 4:30 PM",
    location: "Laboratorio de Computación Gráfica",
    type: "taller",
    speakers: ["Equipo Animove", "Artistas Invitados"],
    upcoming: true,
    description:
      "Competencia en vivo de pintura digital y concept art con retroalimentación de jurados de la industria.",
    registrationOpen: true,
  },
  {
    id: "4",
    title: "Del Sonido Directo al Diseño Sonoro para Medios Audiovisuales",
    date: "18 Abr 2026 — 11:00 AM",
    location: "Auditorio Duns Scoto",
    type: "charla",
    speakers: ["Carlos Cabas (Diseñador Sonoro)"],
    upcoming: false,
    description:
      "Metodologías de captación acústica y microfonía en set para cine y producciones interactivas.",
  },
  {
    id: "5",
    title: "No Esperes a que Alguien Más Divulgue tu Ciencia",
    date: "25 Mar 2026 — 10:00 AM",
    location: "Salón 308 Guillermo de Ockham",
    type: "charla",
    speakers: ["Carlos Guarnizo — UniAndes"],
    upcoming: false,
    description:
      "Estrategias de comunicación transmedia para hacer accesible la producción investigativa a la comunidad.",
  },
  {
    id: "6",
    title: "Taller Práctico: Shaders en Tiempo Real con GLSL",
    date: "12 Feb 2026 — 3:00 PM",
    location: "Laboratorio GameDev",
    type: "taller",
    speakers: ["Semillero GameDev"],
    upcoming: false,
    description:
      "Programación de vertex y fragment shaders para efectos visuales estilizados y optimización en GPU.",
  },
]

export default function EventsGridSection() {
  const [selectedFilter, setSelectedFilter] = useState("todos")
  const [searchQuery, setSearchQuery] = useState("")

  const filterOptions = [
    { id: "todos", label: "TODOS", count: allEvents.length },
    {
      id: "conferencia",
      label: "CONFERENCIAS",
      count: allEvents.filter((e) => e.type === "conferencia").length,
    },
    {
      id: "taller",
      label: "TALLERES",
      count: allEvents.filter((e) => e.type === "taller").length,
    },
    {
      id: "panel",
      label: "PANELES",
      count: allEvents.filter((e) => e.type === "panel").length,
    },
    {
      id: "charla",
      label: "CHARLAS",
      count: allEvents.filter((e) => e.type === "charla").length,
    },
  ]

  const filteredEvents = allEvents.filter((e) => {
    const matchesFilter =
      selectedFilter === "todos" || e.type === selectedFilter
    const matchesSearch =
      searchQuery.trim() === "" ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.speakers.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    return matchesFilter && matchesSearch
  })

  return (
    <section id="events-catalog" className="py-20 max-w-screen-xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
        <FilterPills
          options={filterOptions}
          selectedId={selectedFilter}
          onSelect={setSelectedFilter}
          accentColor="var(--color-secondary-500)"
        />

        {/* Buscador estilizado */}
        <div className="relative min-w-[280px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por título, ponente o lugar..."
            className="w-full text-b3 font-display py-2.5 px-4 pr-10 rounded-full transition-all focus:outline-none"
            style={{
              background: "var(--surface)",
              border: "var(--stroke-s) solid var(--color-neutral-300)",
              color: "var(--color-neutral-900)",
            }}
          />
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none text-sm">
            🔍
          </span>
        </div>
      </div>

      {/* Grid de eventos */}
      <AnimatePresence mode="popLayout">
        {filteredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 rounded-2xl bg-neutral-100"
          >
            <p className="text-h6 font-heading text-neutral-600 mb-2">
              No se encontraron eventos coincidentes
            </p>
            <p className="text-b3 font-display text-neutral-500">
              Prueba cambiando los filtros de categoría o el término de
              búsqueda.
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const accentColor =
                event.type === "conferencia"
                  ? "var(--color-primary-500)"
                  : event.type === "panel"
                    ? "var(--color-secondary-500)"
                    : event.type === "taller"
                      ? "var(--color-tertiary-500)"
                      : "var(--color-green-200)"

              const shadowType =
                event.type === "conferencia"
                  ? "turquoise"
                  : event.type === "panel"
                    ? "orange"
                    : "blue"

              return (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    accentColor={accentColor}
                    accentTop
                    shadowType={shadowType}
                    interactive
                    className="p-6 h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <Badge
                          variant={
                            event.type === "conferencia"
                              ? "primary"
                              : event.type === "panel"
                                ? "secondary"
                                : event.type === "taller"
                                  ? "tertiary"
                                  : "green"
                          }
                          size="sm"
                        >
                          {event.type}
                        </Badge>
                        {event.upcoming && (
                          <Badge variant="secondary" size="sm" pulse>
                            PRÓXIMO
                          </Badge>
                        )}
                      </div>

                      <h3
                        className="text-h6 font-heading mb-3 line-clamp-2 leading-snug"
                        style={{ color: "var(--color-neutral-900)" }}
                      >
                        {event.title}
                      </h3>

                      {event.description && (
                        <p className="text-b3 font-body mb-4 text-neutral-600 line-clamp-2 leading-relaxed">
                          {event.description}
                        </p>
                      )}

                      <div className="space-y-2 text-b3 font-display mb-4">
                        <div className="flex items-center gap-2 text-neutral-600">
                          <span style={{ color: accentColor }}>📅</span>
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-start gap-2 text-neutral-600">
                          <span
                            style={{ color: accentColor }}
                            className="shrink-0 mt-0.5"
                          >
                            📍
                          </span>
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                      </div>

                      {event.speakers.length > 0 && (
                        <div className="pt-3 border-t border-neutral-200 mb-6">
                          <div className="text-[10px] font-display uppercase tracking-widest text-neutral-400 mb-2">
                            PONENTES / TALLERISTAS
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {event.speakers.map((s, idx) => (
                              <span
                                key={idx}
                                className="text-b4 font-display px-2 py-0.5 rounded bg-neutral-200/60 text-neutral-800"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-2">
                      {event.upcoming ? (
                        <Button
                          variant={
                            event.type === "panel" ? "secondary" : "primary"
                          }
                          size="sm"
                          className="w-full"
                          asLink
                          href="/proximo-evento"
                        >
                          DETALLES E INSCRIPCIÓN
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm" className="w-full">
                          EVENTO FINALIZADO
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
