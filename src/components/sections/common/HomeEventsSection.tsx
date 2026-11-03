import { useState } from "react"

import Button from "../../ui/Button"
import EventCard from "../../ui/EventCard"
import SectionHeader from "../../ui/SectionHeader"

import { useParallax } from "@/hooks/useParallax"

const events = [
  {
    title: "Reunión de semilleros",

    date: "18 SEP 2026",

    type: "ENCUENTRO",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop&auto=format",
    variant: "primary-light" as const,
  },

  {
    title: "Workshop de creación digital",

    date: "02 OCT 2026",

    type: "TALLER",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop&auto=format",
    variant: "secondary-light" as const,
  },

  {
    title: "Convocatoria MediaLab",

    date: "15 OCT 2026",

    type: "CONVOCATORIA",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop&auto=format",
    variant: "primary-light" as const,
  },

  {
    title: "Muestra de proyectos multimedia",

    date: "27 NOV 2026",

    type: "MUESTRA",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&h=600&fit=crop&auto=format",
    variant: "secondary-light" as const,
  },
]

export default function HomeEventsSection() {
  const [selectedEventFilter, setSelectedEventFilter] = useState("reunion")
  const visualRef = useParallax<HTMLDivElement>(0.16, "down")
  const eventsRef = useParallax<HTMLDivElement>(0.08, "up")

  return (
    <section
      className="relative overflow-hidden py-24 theme-light grid-secondary grid-bg section-transition"
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
        <div className="flex justify-end">
          <div className="w-full lg:max-w-3xl">
            <SectionHeader
              label="Agenda"
              title="Eventos principales"
              subtitle="Conoce nuestros eventos más importantes y cómo unirte a ellos."
              accent="secondary"
              align="right"
            />
          </div>
        </div>

        <div className="relative mx-auto mt-8 max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_12rem]">
            <div
              ref={eventsRef}
              id="home-events-title"
              className="grid gap-5 md:grid-cols-2"
            >
              {events.map((event, index) => (
                <EventCard
                  key={event.title}
                  image={event.image}
                  imageAlt={event.title}
                  title={event.title}
                  date={event.date}
                  location="Universidad de San Buenaventura"
                  summary="Conoce los detalles, horarios y formas de participar en este evento."
                  index={index}
                  variant={event.variant}
                />
              ))}
            </div>

            <div className="flex flex-row flex-wrap items-center justify-center gap-3 lg:flex-col lg:justify-center">
              {[
                { id: "reunion", label: "Reunión" },
                { id: "workshop", label: "Workshop" },
                { id: "convocatoria", label: "Convocatoria" },
              ].map((filter) => (
                <Button
                  key={`${filter.id}-${
                    selectedEventFilter === filter.id ? "active" : "default"
                  }`}
                  variant={
                    selectedEventFilter === filter.id
                      ? "primary-active"
                      : "primary"
                  }
                  size="md"
                  className="w-full max-w-52"
                  truncateText={false}
                  aria-pressed={selectedEventFilter === filter.id}
                  onClick={() => setSelectedEventFilter(filter.id)}
                  rightIcon={
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="8" />
                      <path d="M12 8v4l2.5 2" />
                    </svg>
                  }
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex justify-center lg:justify-end lg:pr-2">
            <Button variant="secondary" size="lg" asLink href="/eventos">
              VER MÁS
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
