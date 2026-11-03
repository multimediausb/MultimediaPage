import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import SectionHeader from "../../ui/SectionHeader"
import MetricChartCard from "../../ui/MetricChartCard"
import Button from "../../ui/Button"

gsap.registerPlugin(ScrollTrigger)

const scientificMetrics = [
  {
    title: "Publicaciones",
    value: "24",
    accent: "primary" as const,
    data: [4, 7, 9, 12, 16, 20],
  },
  {
    title: "Proyectos activos",
    value: "12",
    accent: "secondary" as const,
    data: [3, 6, 9, 12, 17, 20],
  },
  {
    title: "Grupos de investigación",
    value: "06",
    accent: "tertiary" as const,
    data: [4, 7, 10, 12, 16, 20],
  },
]

export default function ScientificProductionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  const centerSection = () => {
    sectionRef.current?.scrollIntoView({
      behavior: "auto",
      block: "center",
    })
  }

  useLayoutEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const cardsContainer = cardsRef.current
    const button = buttonRef.current
    const visual = visualRef.current

    if (!section || !header || !cardsContainer || !button || !visual) {
      return
    }

    const cards = Array.from(
      cardsContainer.querySelectorAll<HTMLElement>("[data-metric-card]"),
    )

    if (!cards.length) return

    // Orden inverso: derecha hacia izquierda
    const reversedCards = [...cards].reverse()

    const context = gsap.context(() => {
      // Estados iniciales: sección completamente vacía
      gsap.set(header, {
        autoAlpha: 0,
        y: -40,
      })

      gsap.set(cards, {
        autoAlpha: 0,
        x: 50,
      })

      gsap.set(button, {
        autoAlpha: 0,
        y: 35,
      })

      gsap.set(visual, {
        y: 80,
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

      // Parallax del fondo decorativo durante el recorrido fijado.
      timeline.to(
        visual,
        {
          y: -80,
          duration: 2.4,
          ease: "none",
        },
        0,
      )

      // 1. Section Header: arriba hacia abajo
      timeline.to(
        header,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        0.3,
      )

      // 2. Metric Cards: derecha hacia izquierda
      reversedCards.forEach((card, index) => {
        timeline.to(
          card,
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          0.85 + index * 0.16,
        )
      })

      // 3. Botón: abajo hacia arriba
      timeline.to(
        button,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        1.65,
      )

      // Pausa al finalizar la secuencia
      timeline.to({}, { duration: 0.4 })
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
      data-progress-section="Producción científica"
      data-progress-color="var(--color-primary-500)"
      data-progress-duration="2.4"
      className="relative overflow-hidden py-24 theme-dark grid-primary dark-grid-bg section-transition"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--fg)",
        borderTop:
          "1px solid color-mix(in srgb, var(--color-primary-500) 24%, transparent)",
      }}
      aria-labelledby="scientific-production-title"
    >
      {/* Elemento decorativo con parallax */}
      <div
        ref={visualRef}
        className="pointer-events-none absolute -left-40 top-1/3 h-120 w-120 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-primary-500) 30%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div ref={headerRef}>
          <SectionHeader
            label="Métricas"
            title="Producción científica"
            subtitle="Evolución de publicaciones y proyectos de investigación desde 2019."
            accent="primary"
            align="center"
          />
        </div>

        {/* Metric Cards */}
        <div
          ref={cardsRef}
          id="scientific-production-title"
          className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-3"
        >
          {scientificMetrics.map((metric) => (
            <div key={metric.title} data-metric-card className="min-w-0">
              <MetricChartCard
                title={metric.title}
                value={metric.value}
                accent={metric.accent}
                data={metric.data}
                onOpen={centerSection}
              />
            </div>
          ))}
        </div>

        {/* Botón */}
        <div ref={buttonRef} className="mt-8 text-center">
          <Button variant="primary" size="md" asLink href="/investigacion">
            VER LAS JUNTAS
          </Button>
        </div>
      </div>
    </section>
  )
}
