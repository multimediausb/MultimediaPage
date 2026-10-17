import EventsHeroSection from "../components/sections/eventos/EventsHeroSection"
import EventsGridSection from "../components/sections/eventos/EventsGridSection"

export default function Eventos() {
  return (
    <div className="min-h-screen bg-[var(--bg)] pb-20">
      {/* 1. Hero Banner Oficial de Eventos */}
      <EventsHeroSection />

      {/* 2. Catálogo Interactivo con Filtros por Píldoras, Buscador y Tarjetas */}
      <EventsGridSection />
    </div>
  )
}
