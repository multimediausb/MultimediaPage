import NextEventHeroSection from "../components/sections/proximo-evento/NextEventHeroSection"
import NextEventProgramSection from "../components/sections/proximo-evento/NextEventProgramSection"
import NextEventRegistrationSection from "../components/sections/proximo-evento/NextEventRegistrationSection"
import NextEventSpeakersSection from "../components/sections/proximo-evento/NextEventSpeakersSection"
import NextEventVideoSection from "../components/sections/proximo-evento/NextEventVideoSection"

export default function ProximoEvento() {
  return (
    <div className="min-h-screen bg-[var(--bg)] pb-24">
      {/* 1. Hero con Cuenta Regresiva y Call to Action Principal */}
      <NextEventHeroSection />

      <div className="max-w-screen-xl mx-auto px-6 pt-12">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Columna Izquierda: Video Reel, Cronograma y Ponentes */}
          <div className="lg:col-span-8 space-y-12">
            {/* Reel y Showcase de Video */}
            <NextEventVideoSection />

            {/* Cronograma / Programa del Día */}
            <NextEventProgramSection />

            {/* Conferencistas Invitados */}
            <NextEventSpeakersSection />
          </div>

          {/* Columna Derecha: Tarjeta Sticky de Inscripción y Requerimientos */}
          <div className="lg:col-span-4">
            <NextEventRegistrationSection />
          </div>
        </div>
      </div>
    </div>
  )
}
