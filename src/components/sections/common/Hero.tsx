import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion"
import { useRef, useState } from "react"
import HeroScene from "../../graphics/HeroScene"
import ParticleField from "../../graphics/ParticleField"
import Button from "../../ui/Button"
import { useParallax } from "@/hooks/useParallax"

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const sceneRef = useParallax<HTMLDivElement>(0.2, "down")
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  const [progressValue, setProgressValue] = useState(0)

  useMotionValueEvent(progress, "change", (value) => {
    setProgressValue(Math.round(value * 100))
  })

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden theme-light grid-primary grid-bg section-transition"
        style={{
          backgroundColor: "var(--color-neutral-100)",
          color: "var(--fg)",
        }}
      >
        <ParticleField />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-28 lg:grid-cols-2 lg:gap-16">
          {/* Columna izquierda: identidad y contenido */}
          <div className="mx-auto w-full max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              {/* Tag / badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 border"
                style={{
                  background:
                    "color-mix(in srgb, var(--color-primary-500) 8%, transparent)",
                  borderColor:
                    "color-mix(in srgb, var(--color-primary-500) 25%, transparent)",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                <span className="font-display text-xs font-semibold text-primary-700 tracking-widest">
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
                    textShadow:
                      "0 0 24px color-mix(in srgb, var(--color-primary-500) 30%, transparent)",
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
          <div
            ref={sceneRef}
            className="relative mx-auto h-80 w-full max-w-xl lg:h-125"
          >
            <div
              className="absolute inset-0 rounded-full pointer-events-none opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--color-primary-500) 25%, transparent) 0%, transparent 70%)",
              }}
            />
            <HeroScene interactionRef={heroRef} />
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

      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-70 h-1.5"
        role="progressbar"
        aria-label="Progreso de la página"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressValue}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "color-mix(in srgb, var(--color-neutral-900) 18%, transparent)",
          }}
        />
        <motion.div
          className="relative h-full origin-left"
          style={{
            scaleX: progress,
            background: "var(--color-primary-500)",
            boxShadow:
              "0 0 10px color-mix(in srgb, var(--color-primary-500) 65%, transparent)",
          }}
        />
      </div>
    </>
  )
}
