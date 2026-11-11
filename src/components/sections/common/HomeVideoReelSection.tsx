import { useLayoutEffect, useRef } from "react"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import VideoReel from "../../graphics/VideoReel"
import SectionHeader from "../../ui/SectionHeader"

gsap.registerPlugin(ScrollTrigger)

export default function HomeVideoReelSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const transitionOverlayRef = useRef<HTMLDivElement>(null)
  const transitionGridRef = useRef<HTMLDivElement>(null)

  const centerVideoSection = () => {
    sectionRef.current?.scrollIntoView({
      behavior: "auto",
      block: "center",
    })
  }

  useLayoutEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const video = videoRef.current
    const visual = visualRef.current
    const transitionOverlay = transitionOverlayRef.current
    const transitionGrid = transitionGridRef.current

    if (
      !section ||
      !header ||
      !video ||
      !visual ||
      !transitionOverlay ||
      !transitionGrid
    ) {
      return
    }

    const context = gsap.context(() => {
      // Estados iniciales
      gsap.set(header, {
        autoAlpha: 0,
        y: 48,
      })

      gsap.set(video, {
        autoAlpha: 0,
        y: 72,
      })

      gsap.set(visual, {
        y: 80,
      })

      gsap.set([transitionOverlay, transitionGrid], {
        opacity: 1,
      })

      // Timeline principal
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.5}`,
          scrub: 0.7,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // 1. Transición de dark a light y cambio de grilla.
      timeline.to(
        [transitionOverlay, transitionGrid],
        {
          opacity: 0,
          duration: 0.32,
          ease: "none",
        },
        0.12,
      )

      // 2. Parallax del elemento decorativo.
      timeline.to(
        visual,
        {
          y: -80,
          duration: 1.9,
          ease: "none",
        },
        0,
      )

      // 3. Entrada del encabezado desde abajo.
      timeline.to(
        header,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        0.48,
      )

      // 4. Entrada del video desde abajo.
      timeline.to(
        video,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.36,
          ease: "power2.out",
        },
        0.85,
      )

      // Pausa final para mantener el contenido visible.
      timeline.to({}, { duration: 0.15 })
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
      data-progress-section="Demo Reel"
      data-progress-color="var(--color-primary-500)"
      data-progress-duration="2.5"
      className="relative overflow-hidden py-24 theme-light grid-primary grid-bg section-transition"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--fg)",
        borderTop: "none",
        borderBottom: "none",
      }}
      aria-labelledby="home-video-reel-title"
    >
      <div
        ref={transitionOverlayRef}
        className="pointer-events-none absolute inset-0 z-0 bg-primary-900"
        aria-hidden="true"
      />

      <div
        ref={transitionGridRef}
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--color-primary-500) 15%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-primary-500) 15%, transparent) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Elemento decorativo con parallax */}
      <div
        ref={visualRef}
        className="pointer-events-none absolute -right-36 top-1/4 h-104 w-104 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-primary-500) 32%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto -translate-y-3 max-w-7xl px-4 sm:-translate-y-6 sm:px-6">
        {/* Section Header */}
        <div ref={headerRef}>
          <SectionHeader
            label="Producción Audiovisual"
            title="Creación Colectiva"
            subtitle="Espacio donde estudiantes de Ingeniería Multimedia integran animación digital, arte técnico y narrativa."
            accent="primary"
            align="center"
          />
        </div>

        {/* Video Reel */}
        <div ref={videoRef} className="mx-auto mt-3 max-w-3xl">
          <VideoReel
            videoId="0gQwwXwgSUs"
            title="Segunda Creación Colectiva"
            description="Conoce la segunda creación colectiva del USB Medialab. En esta edición los estudiantes presentan una animación digital demostrando sus habilidades en animación 2D/3D, lip-sync y posproducción sonora."
            onOpen={centerVideoSection}
            showDetails={false}
          />
        </div>
      </div>
    </section>
  )
}
