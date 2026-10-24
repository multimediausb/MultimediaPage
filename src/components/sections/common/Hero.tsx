import { motion } from "framer-motion"
import HeroScene from "../../graphics/HeroScene"
import ParticleField from "../../graphics/ParticleField"
import Button from "../../ui/Button"
import { useParallax } from "@/hooks/useParallax"

export default function Hero() {
  const sceneRef = useParallax<HTMLDivElement>(0.2, "down")

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden theme-dark accent-cyan transition-colors duration-500"
      style={{
        background: "var(--bg)",
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
                  textShadow: "0 0 32px rgba(50,201,204,0.4)",
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

        {/* Columna derecha: escena 3D existente con parallax */}
        <div ref={sceneRef} className="h-80 lg:h-[500px] relative">
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
