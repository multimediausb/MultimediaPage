import { useEffect } from "react"
import HeroSection from "../components/sections/common/Hero"
import HomeVideoReelSection from "../components/sections/common/HomeVideoReelSection"
import ScrollStatsSection from "../components/sections/common/ScrollStatsSection"
import NewsStatsSection from "../components/sections/common/NewsStatsSection"
import LatestNewsSection from "../components/sections/common/LatestNewsSection"
import HomeEventsSection from "../components/sections/common/HomeEventsSection"
import ScientificProductionSection from "../components/sections/common/ScientificProductionSection"
import { scrollToTop } from "../hooks/useParallax"

export default function Home() {
  useEffect(() => {
    scrollToTop(true)
    const frameId = requestAnimationFrame(() => {
      scrollToTop(true)
    })
    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <div className="relative">
      {/* ── 1. Hero (Light + Cyan + Grid) ───────────────── */}
      <HeroSection />

      {/* ── 2. Cifras con cubo 3D interactivo ────────────── */}
      <ScrollStatsSection />

      {/* ── 3. Estadísticas de noticias (Light + Primary + Grid) ─ */}
      <NewsStatsSection />

      {/* ── 4. Últimas novedades (Dark + Secondary + Grid) ─────── */}
      <LatestNewsSection />

      {/* ── 5. Eventos principales (Light + Primary + Grid) ─ */}
      <HomeEventsSection />

      {/* ── 6. Producción científica (Dark + Primary + Grid) ─ */}
      <ScientificProductionSection />

      {/* ── 7. Video Reel (Light + Primary + Grid) ───── */}
      <HomeVideoReelSection />
    </div>
  )
}
