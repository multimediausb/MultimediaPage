import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import noticias from "@/data/noticias.json"

import SectionHeader from "../../ui/SectionHeader"
import NewsCard from "../../ui/NewsCard"

import { useParallax } from "@/hooks/useParallax"

gsap.registerPlugin(ScrollTrigger)

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

export default function LatestNewsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const glowRef = useParallax<HTMLDivElement>(0.18, "up")

  useLayoutEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current
    const header = headerRef.current

    if (!section || !grid || !header) return

    const cards = Array.from(
      grid.querySelectorAll<HTMLElement>("[data-news-card]"),
    )

    if (!cards.length) return

    const ctx = gsap.context(() => {
      gsap.set(header, { autoAlpha: 0, y: -40 })
      gsap.set(cards, { autoAlpha: 0, x: 160 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.2}`,
          scrub: 0.65,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      timeline.to(header, {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      })

      cards.forEach((card, index) => {
        timeline.to(
          card,
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.35,
            ease: "power2.out",
          },
          index === 0 ? ">-0.12" : ">-0.08",
        )
      })

      timeline.to({}, { duration: 0.35 })
    }, section)

    const refreshFrame = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => {
      cancelAnimationFrame(refreshFrame)
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 theme-dark grid-secondary dark-grid-bg section-transition"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--fg)",
      }}
      aria-labelledby="latest-news-title"
    >
      {/* Aura decorativa con parallax */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -left-40 top-1/2 h-120 w-120 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-secondary-500) 32%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Contenido */}
      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <div ref={headerRef}>
          <SectionHeader
            label="Actualidad"
            title="Últimas novedades"
            subtitle="Eventos, logros, convocatorias y publicaciones del Programa de Ingeniería Multimedia."
            accent="secondary"
          />
        </div>

        {/* Tarjetas */}
        <div
          ref={gridRef}
          id="latest-news-title"
          className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {noticias.slice(0, 4).map((news, index) => (
            <div key={news.id} data-news-card className="min-w-0">
              <NewsCard
                image={news.imagen}
                tag={news.tag}
                date={formatDate(news.fecha)}
                category={news.categoria}
                title={news.titulo}
                summary={news.resumen}
                index={index}
                variant="secondary-dark"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
