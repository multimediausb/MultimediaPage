import { motion } from "framer-motion"
import Button from "../../ui/Button"
import Badge from "../../ui/Badge"

export default function EventsHeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-950 text-white min-h-[440px] flex items-center">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1800&h=800&fit=crop&auto=format"
          alt="Auditorio de conferencias y eventos académicos"
          className="w-full h-full object-cover object-center filter brightness-40"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(30, 20, 2, 0.92) 0%, rgba(6, 6, 6, 0.85) 50%, rgba(10, 40, 40, 0.75) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-secondary-400) 1px, transparent 0)`,
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
            <Badge variant="secondary" pulse>
              Agenda Académica
            </Badge>
            <span className="text-b4 font-display text-neutral-400">
              MEDIASHOW & CONFERENCIAS
            </span>
          </div>

          <h1 className="text-h2 md:text-h1 font-heading text-white mb-6 leading-tight">
            EVENTOS{" "}
            <span style={{ color: "var(--color-secondary-400)" }}>
              ACADÉMICOS
            </span>
          </h1>

          <p className="text-b1 font-display text-neutral-300 leading-relaxed mb-8 max-w-2xl">
            Descubre los espacios donde convergen la ciencia, el arte y la
            ingeniería multimedia. Conferencias magistrales, talleres prácticos,
            desafíos de arte digital y paneles con la industria.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" size="md" asLink href="/proximo-evento">
              VER PRÓXIMO EVENTO
            </Button>
            <Button
              variant="outline-secondary"
              size="md"
              onClick={() => {
                const el = document.getElementById("events-catalog")
                el?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              EXPLORAR CATÁLOGO
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
