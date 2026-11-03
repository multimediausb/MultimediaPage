import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import NewsStatCard from "../../ui/NewsStatCard"

gsap.registerPlugin(ScrollTrigger)

const newsStats = [
  {
    label: "Convocatorias abiertas",
    value: "2 activas",
    accent: "var(--color-primary-500)",
    backgroundColor: "var(--color-primary-alpha-50)",
    borderColor: "var(--color-primary-900)",
  },
  {
    label: "Logros recientes",
    value: "3 este semestre",
    accent: "var(--color-secondary-500)",
    backgroundColor: "var(--color-secondary-alpha-50)",
    borderColor: "var(--color-secondary-900)",
  },
  {
    label: "Publicaciones indexadas",
    value: "8 en 2025",
    accent: "var(--color-primary-500)",
    backgroundColor: "var(--color-primary-alpha-50)",
    borderColor: "var(--color-primary-900)",
  },
]

export default function NewsStatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const darkOverlayRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    const section = sectionRef.current
    const darkOverlay = darkOverlayRef.current
    const grid = gridRef.current

    if (!section || !darkOverlay || !grid) return

    const cards = cardRefs.current.filter(
      (card): card is HTMLDivElement => card !== null,
    )

    if (cards.length !== 3) return

    const ctx = gsap.context(() => {
      // Estado inicial de las tarjetas
      gsap.set(cards[0], {
        x: "-100vw",
        opacity: 0,
      })

      gsap.set(cards[1], {
        y: "100vh",
        opacity: 0,
      })

      gsap.set(cards[2], {
        x: "100vw",
        opacity: 0,
      })

      // Estado inicial del fondo
      gsap.set([darkOverlay, grid], {
        opacity: 1,
      })

      // Recorrido completo del parallax
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 3}`,
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          // Marca cuando toda la secuencia termina
          onUpdate: (self) => {
            section.dataset.progressComplete =
              self.progress >= 1 ? "true" : "false"
          },
        },
      })

      // El fondo oscuro permanece antes de comenzar la transición
      timeline.to(
        [darkOverlay, grid],
        {
          opacity: 0,
          duration: 0.25,
          ease: "none",
        },
        0.15,
      )

      // Primera tarjeta: entrada desde la izquierda
      timeline.to(
        cards[0],
        {
          x: 0,
          opacity: 1,
          duration: 0.25,
          ease: "none",
        },
        0.15,
      )

      // Segunda tarjeta: entrada desde abajo
      timeline.to(
        cards[1],
        {
          y: 0,
          opacity: 1,
          duration: 0.25,
          ease: "none",
        },
        0.38,
      )

      // Tercera tarjeta: entrada desde la derecha
      timeline.to(
        cards[2],
        {
          x: 0,
          opacity: 1,
          duration: 0.25,
          ease: "none",
        },
        0.61,
      )

      // Pausa final: mantener las tres tarjetas juntas
      timeline.to({}, {
        duration: 0.3,
      })

      // Marca de finalización después de toda la secuencia
      timeline.call(() => {
        section.dataset.progressComplete = "true"
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-progress-section="Cifras del programa"
      data-progress-color="var(--color-primary-500)"
      data-progress-duration="3"
      data-progress-ratio="0.741"
      data-progress-complete="false"
      className="relative flex min-h-screen items-center overflow-hidden theme-light grid-primary grid-bg section-transition"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--fg)",
        borderTop: "none",
        borderBottom: "none",
      }}
      aria-label="Estadísticas de noticias"
    >
      {/* Fondo oscuro de transición */}
      <div
        ref={darkOverlayRef}
        className="pointer-events-none absolute inset-0 z-0 bg-primary-900"
        aria-hidden="true"
      />

      {/* Malla tecnológica */}
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--color-primary-500) 15%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-primary-500) 15%, transparent) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Contenido */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-2">
        <div
          id="news-stats-title"
          className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3"
        >
          {newsStats.map((item, index) => (
            <div
              key={item.label}
              ref={(element) => {
                cardRefs.current[index] = element
              }}
              className="will-change-transform"
            >
              <NewsStatCard
                label={item.label}
                value={item.value}
                accent={item.accent}
                backgroundColor={item.backgroundColor}
                borderColor={item.borderColor}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
