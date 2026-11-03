import { useRef } from "react"

import VideoReel from "../../graphics/VideoReel"
import SectionHeader from "../../ui/SectionHeader"

export default function HomeVideoReelSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const centerVideoSection = () => {
    sectionRef.current?.scrollIntoView({
      behavior: "auto",
      block: "center",
    })
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 theme-light grid-primary grid-bg section-transition"
      style={{
        backgroundColor: "var(--bg)",

        color: "var(--fg)",
      }}
      aria-labelledby="home-video-reel-title"
    >
      <div
        className="pointer-events-none absolute -right-36 top-1/4 h-104 w-104 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-primary-500) 32%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeader
          label="Producción Audiovisual"
          title="Creación Colectiva"
          subtitle="Espacio donde estudiantes de Ingeniería Multimedia integran animación digital, arte técnico y narrativa."
          accent="primary"
          align="center"
        />
        <div className="mt-8">
          <VideoReel
            videoId="0gQwwXwgSUs"
            title="Segunda Creación Colectiva"
            description="Conoce la segunda creación colectiva del USB Medialab. En esta edición los estudiantes presentan una animación digital demostrando sus habilidades en animación 2D/3D, lip-sync y posproducción sonora."
            onOpen={centerVideoSection}
          />
        </div>
      </div>
    </section>
  )
}
