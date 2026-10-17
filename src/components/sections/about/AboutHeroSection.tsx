import { motion } from "framer-motion"
import Button from "../../ui/Button"
import Badge from "../../ui/Badge"

export default function AboutHeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-950 text-white min-h-[460px] flex items-center">
      {/* Background image con overlay temático */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541178735493-479c1a27ed24?w=1800&h=800&fit=crop&auto=format"
          alt="Laboratorio universitario de investigación"
          className="w-full h-full object-cover object-center filter brightness-50"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(10, 40, 40, 0.92) 0%, rgba(6, 6, 6, 0.82) 50%, rgba(30, 27, 2, 0.75) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-primary-400) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="primary" pulse>
              Laboratorio de Medios
            </Badge>
            <span className="text-b4 font-display text-neutral-400">
              USB BOGOTÁ
            </span>
          </div>

          <h1 className="text-h2 md:text-h1 font-heading text-white mb-6 leading-tight">
            ACERCA DEL{" "}
            <span style={{ color: "var(--color-primary-400)" }}>CENTRO</span>
          </h1>

          <p className="text-b1 font-display text-neutral-300 leading-relaxed mb-8 max-w-2xl">
            Más de 25 años impulsando la formación de investigadores, el
            desarrollo de tecnología interactiva y la divulgación del
            conocimiento científico que transforma la industria multimedia en
            Latinoamérica.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                const el = document.getElementById("timeline-section")
                el?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              NUESTRA TRAYECTORIA
            </Button>
            <Button
              variant="outline-secondary"
              size="md"
              asLink
              href="/miembros"
            >
              CONOCER AL EQUIPO
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
