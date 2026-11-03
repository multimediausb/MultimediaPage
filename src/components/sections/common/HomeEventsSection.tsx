import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Button from "../../ui/Button"
import EventCard from "../../ui/EventCard"
import SectionHeader from "../../ui/SectionHeader"

import { useParallax } from "@/hooks/useParallax"

gsap.registerPlugin(ScrollTrigger)

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

  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const eventsGridRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const moreButtonRef = useRef<HTMLDivElement>(null)

  const transitionOverlayRef = useRef<HTMLDivElement>(null)
  const transitionGridRef = useRef<HTMLDivElement>(null)

  const visualRef = useParallax<HTMLDivElement>(0.16, "down")
  const eventsRef = useParallax<HTMLDivElement>(0.08, "up")

  useLayoutEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const eventsGrid = eventsGridRef.current
    const buttons = buttonsRef.current
    const moreButton = moreButtonRef.current
    const transitionOverlay = transitionOverlayRef.current
    const transitionGrid = transitionGridRef.current

    if (
      !section ||
      !header ||
      !eventsGrid ||
      !buttons ||
      !moreButton ||
      !transitionOverlay ||
      !transitionGrid
    ) {
      return
    }

    const cards = Array.from(
      eventsGrid.querySelectorAll<HTMLElement>("[data-event-card]"),
    )

    const filterButtons = Array.from(
      buttons.querySelectorAll<HTMLElement>("[data-event-filter]"),
    )

    if (!cards.length || !filterButtons.length) {
      return
    }

    const context = gsap.context(() => {
      // Estado inicial
      gsap.set(header, {
        autoAlpha: 0,
        y: -40,
      })

      gsap.set(filterButtons, {
        autoAlpha: 0,
        x: 40,
      })

      gsap.set(cards, {
        autoAlpha: 0,
        x: -50,
      })

      gsap.set(moreButton, {
        autoAlpha: 0,
        y: 35,
      })

      gsap.set([transitionOverlay, transitionGrid], {
        opacity: 1,
      })

      // Timeline principal
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.4}`,
          scrub: 0.7,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // 1. Transición de color y cuadrícula
      timeline.to(
        [transitionOverlay, transitionGrid],
        {
          opacity: 0,
          duration: 0.28,
          ease: "none",
        },
        0.12,
      )

      // 2. Section Header: arriba hacia abajo
      timeline.to(
        header,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        0.48,
      )

      // 3. Botones: derecha hacia izquierda
      filterButtons.forEach((button, index) => {
        timeline.to(
          button,
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.24,
            ease: "power2.out",
          },
          0.85 + index * 0.09,
        )
      })

      // 4. Event Cards: izquierda hacia derecha
      cards.forEach((card, index) => {
        timeline.to(
          card,
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.28,
            ease: "power2.out",
          },
          1.35 + index * 0.12,
        )
      })

      // 5. Botón VER MÁS: abajo hacia arriba
      timeline.to(
        moreButton,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.28,
          ease: "power2.out",
        },
        2.05,
      )

      // Tiempo adicional al finalizar
      timeline.to({}, { duration: 0.35 })
    }, section)

    const refreshFrame = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => {
      cancelAnimationFrame(refreshFrame)
      context.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      data-progress-section="Eventos"
      data-progress-color="var(--color-secondary-500)"
      data-progress-duration="2.4"
      className="relative overflow-hidden py-24 theme-light grid-secondary grid-bg section-transition"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--fg)",
        borderTop: "none",
        borderBottom: "none",
      }}
      aria-labelledby="home-events-title"
    >
      {/* Transición de color */}
      <div
        ref={transitionOverlayRef}
        className="pointer-events-none absolute inset-0 z-0 bg-secondary-900"
        aria-hidden="true"
      />

      <div
        ref={transitionGridRef}
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--color-secondary-500) 15%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-secondary-500) 15%, transparent) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Elemento decorativo con parallax */}
      <div
        ref={visualRef}
        className="pointer-events-none absolute -right-36 top-20 h-112 w-md rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-tertiary-500) 35%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div ref={headerRef} className="flex justify-end">
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
            {/* Event Cards */}
            <div
              ref={(element) => {
                eventsRef.current = element
                eventsGridRef.current = element
              }}
              id="home-events-title"
              className="grid gap-5 md:grid-cols-2"
            >
              {events.map((event, index) => (
                <div key={event.title} data-event-card>
                  <EventCard
                    image={event.image}
                    imageAlt={event.title}
                    title={event.title}
                    date={event.date}
                    location="Universidad de San Buenaventura"
                    summary="Conoce los detalles, horarios y formas de participar en este evento."
                    index={index}
                    variant={event.variant}
                  />
                </div>
              ))}
            </div>

            {/* Filtros */}
            <div
              ref={buttonsRef}
              className="flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 lg:flex-col lg:justify-center"
            >
              {[
                { id: "reunion", label: "Reunión" },
                { id: "workshop", label: "Workshop" },
                { id: "convocatoria", label: "Convocatoria" },
              ].map((filter) => (
                <div
                  key={filter.id}
                  data-event-filter
                  className="w-full max-w-52"
                >
                  <Button
                    variant={
                      selectedEventFilter === filter.id
                        ? "primary-active"
                        : "primary"
                    }
                    size="md"
                    className="w-full"
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
                </div>
              ))}
            </div>
          </div>

          {/* Ver más */}
          <div
            ref={moreButtonRef}
            className="mt-5 flex justify-center lg:justify-end lg:pr-2"
          >
            <Button variant="secondary" size="lg" asLink href="/eventos">
              VER MÁS
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
