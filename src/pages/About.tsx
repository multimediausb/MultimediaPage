import AboutHeroSection from "../components/sections/about/AboutHeroSection"
import MissionVisionSection from "../components/sections/about/MissionVisionSection"
import ValuesSection from "../components/sections/about/ValuesSection"
import TimelineSection from "../components/sections/about/TimelineSection"
import ScrollStatsSection from "../components/sections/common/ScrollStatsSection"

export default function About() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* 1. Hero Banner Oficial */}
      <AboutHeroSection />

      {/* 2. Misión y Visión */}
      <MissionVisionSection />

      {/* 3. Valores y Cultura */}
      <ValuesSection />

      {/* 4. Trayectoria e Hitos */}
      <TimelineSection />

      {/* 5. Sección de Estadísticas con Efecto de Scroll Interactivo (Amplitud y Parallax) */}
      <ScrollStatsSection
        title="25 AÑOS DE IMPACTO & TRAYECTORIA"
        tag="CIFRAS HISTÓRICAS"
      />
    </div>
  )
}
