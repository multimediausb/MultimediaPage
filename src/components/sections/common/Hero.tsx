import { motion } from "framer-motion"
import HeroScene from "../../graphics/HeroScene"
import ParticleField from "../../graphics/ParticleField"
import Button from "../../ui/Button"
import { useParallax } from "@/hooks/useParallax"

export default function Hero() {
  const sceneRef = useParallax<HTMLDivElement>(0.2, "down")

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden theme-light accent-cyan grid-bg transition-colors duration-500"
      style={{
        background: "linear-gradient(180deg, #edfbf9 0%, #f6fcfb 60%, #f5f2ee 100%)",
        color: "var(--fg)",
      }}
    >
      <ParticleField />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center py-28">
        {/* Columna izquierda: identidad y contenido */}
        <div className="w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            {/* Tag / badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 border"
              style={{
                background: "rgba(14, 154, 147, 0.08)",
                borderColor: "rgba(14, 154, 147, 0.25)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[var(--color-primary-500)] animate-pulse" />
              <span className="font-display text-xs font-semibold text-[var(--color-primary-700)] tracking-widest">
                INGENIERÍA MULTIMEDIA USB
              </span>
            </div>

            {/* Título principal */}
            <h1
              className="w-full font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6"
              style={{ color: "var(--fg)" }}
            >
              CIENCIA QUE
              <br />
              <span
                style={{
                  color: "var(--primary)",
                  textShadow: "0 0 24px rgba(14,154,147,0.3)",
                }}
              >
                TRANSFORMA
              </span>
              <br />
              EL FUTURO
            </h1>

            {/* Descripción */}
            <p
              className="w-full font-body text-sm leading-relaxed mb-8 text-justify"
              style={{ color: "var(--fg-muted)" }}
            >
              Explora el ecosistema académico del Programa de Ingeniería
              Multimedia. Descubre proyectos, investigación y experiencias
              interactivas desarrolladas con{" "}
              <strong style={{ color: "var(--fg)" }}>
                nuevas tecnologías y gráficos mediante computadora
              </strong>
              , donde la creatividad y la innovación convergen para
              transformar ideas en soluciones digitales.
            </p>

            {/* Botones alineados horizontalmente */}
            <div className="flex items-center gap-3 w-full">
              <Button
                variant="primary"
                size="md"
                asLink
                href="/investigacion"
                className="w-full flex-1"
              >
                EXPLORAR INVESTIGACIÓN
              </Button>

              <Button
                variant="outline-primary"
                size="md"
                asLink
                href="/proyectos"
                className="w-full flex-1"
              >
                VER PROYECTOS
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Columna derecha: escena 3D existente con parallax y aura cyan */}
        <div ref={sceneRef} className="h-80 lg:h-[500px] relative">
          <div
            className="absolute inset-0 rounded-full pointer-events-none opacity-40 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(14,154,147,0.25) 0%, transparent 70%)",
            }}
          />
          <HeroScene />
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div
          className="h-6 w-px"
          style={{
            background:
              "linear-gradient(180deg, transparent, var(--primary))",
          }}
        />

        <div
          className="w-1 h-1 rounded-full"
          style={{ background: "var(--primary)" }}
        />
      </motion.div>
    </section>
  )
}
