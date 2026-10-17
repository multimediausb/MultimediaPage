import { motion } from "framer-motion"
import CountdownTimer from "../../ui/CountdownTimer"
import Button from "../../ui/Button"
import Badge from "../../ui/Badge"
import pdfSrc from "@/imports/Media_Show_2023-1.pdf"

const TARGET_EVENT_DATE = new Date("2026-09-16T09:00:00")

export default function NextEventHeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-950 text-white py-20 lg:py-28">
      {/* Background visual con imagen de alta calidad */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1800&h=800&fit=crop&auto=format"
          alt="Media Show Simposio y Evento Inmersivo"
          className="w-full h-full object-cover object-center filter brightness-40"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(30, 20, 2, 0.94) 0%, rgba(6, 6, 6, 0.88) 50%, rgba(10, 40, 40, 0.8) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-secondary-400) 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        {/* Info principal del evento */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary" pulse>
              EVENTO DESTACADO
            </Badge>
            <span className="text-b4 font-display text-neutral-400">
              EDICIÓN 2026 - 2
            </span>
          </div>

          <h1 className="text-h2 md:text-h1 font-heading text-white mb-4 leading-tight">
            MEDIA SHOW{" "}
            <span style={{ color: "var(--color-secondary-400)" }}>2026-2</span>
          </h1>

          <p className="text-h6 font-heading text-primary-300 mb-6">
            Tecnologías Inmersivas, Inteligencia Artificial & Computación Visual
          </p>

          <p className="text-b1 font-display text-neutral-300 leading-relaxed mb-6 max-w-xl">
            16 de Septiembre 2026 • 9:00 AM • Universidad de San Buenaventura,
            Auditorio Juan Anaya (Bogotá, Colombia). Entrada libre previa
            inscripción.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                const el = document.getElementById("registration-section")
                el?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              INSCRIBIRME AHORA
            </Button>
            <Button
              variant="outline-secondary"
              size="lg"
              asLink
              href={pdfSrc}
              download="Media_Show_Requerimientos.pdf"
              leftIcon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              }
            >
              REQUERIMIENTOS
            </Button>
          </div>
        </motion.div>

        {/* Cronómetro regresivo con tarjeta estilizada */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5 flex flex-col items-start lg:items-end"
        >
          <div
            className="w-full max-w-md p-6 rounded-2xl backdrop-blur-xl border border-secondary-400/40"
            style={{
              background: "rgba(18, 12, 4, 0.75)",
              boxShadow: "var(--shadow-orange-hover-light)",
            }}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-secondary-500/20">
              <span className="text-b4 font-display uppercase tracking-widest text-secondary-400">
                CUENTA REGRESIVA
              </span>
              <span className="text-b4 font-display text-neutral-400">
                16 SEPT 2026
              </span>
            </div>

            <CountdownTimer
              targetDate={TARGET_EVENT_DATE}
              accentColor="var(--color-secondary-400)"
            />

            <p className="text-b4 font-display text-neutral-400 text-center mt-4">
              ¡Asegura tu cupo antes de que se agoten las 200 plazas
              presenciales!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
