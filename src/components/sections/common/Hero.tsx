import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"
import HeroScene from "../../graphics/HeroScene"
import ParticleField from "../../graphics/ParticleField"
import Button from "../../ui/Button"
import { useParallax } from "@/hooks/useParallax"

interface ProgressMarker {
  label: string
  progress: number
  target: number
  color: string
}

const getDocumentTop = (element: HTMLElement) => {
  let top = 0
  let current: HTMLElement | null = element

  while (current) {
    top += current.offsetTop
    current = current.offsetParent as HTMLElement | null
  }

  return top
}

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
  const [progressMarkers, setProgressMarkers] = useState<ProgressMarker[]>([])
  const progressMarkersRef = useRef<ProgressMarker[]>([])
  const [progressColor, setProgressColor] = useState("var(--color-primary-500)")

  useMotionValueEvent(progress, "change", (value) => {
    setProgressValue(Math.round(value * 100))

    const activeMarker = progressMarkersRef.current.find(
      (marker) => value * 100 <= marker.progress,
    )

    setProgressColor(activeMarker?.color ?? "var(--color-primary-500)")
  })

  useEffect(() => {
    let updateFrame = 0
    let settleFrame = 0

    const updateMarkers = () => {
      cancelAnimationFrame(updateFrame)

      updateFrame = requestAnimationFrame(() => {
        const maxScroll = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          1,
        )
        const sections = Array.from(
          document.querySelectorAll<HTMLElement>("[data-progress-section]"),
        )

        const markers = sections.map((section) => {
          const duration = Number(section.dataset.progressDuration ?? "0")
          const sectionStart = getDocumentTop(section)
          const anchorSection = section.dataset.progressAfter
            ? sections.find(
                (candidate) =>
                  candidate.dataset.progressSection ===
                  section.dataset.progressAfter,
              )
            : undefined
          const anchorStart = anchorSection
            ? getDocumentTop(anchorSection)
            : sectionStart
          const anchorHeight = anchorSection?.offsetHeight ?? 0
          const ratio = Math.min(
            Math.max(Number(section.dataset.progressRatio ?? "1"), 0),
            1,
          )
          const endOffset = Math.max(
            Number(section.dataset.progressEndOffset ?? "0"),
            0,
          )
          const target =
            section.dataset.progressPoint === "start"
              ? sectionStart
              : anchorSection
                ? anchorStart + anchorHeight - endOffset
                : section.dataset.progressEnd === "section"
                  ? sectionStart +
                    (section.offsetHeight - window.innerHeight) * ratio -
                    endOffset
                  : sectionStart + duration * window.innerHeight * ratio
          const clampedTarget = Math.min(Math.max(target, 0), maxScroll)

          return {
            label: section.dataset.progressSection ?? "Sección",
            progress:
              section.dataset.progressPoint === "start"
                ? Math.max((clampedTarget / maxScroll) * 100, 1)
                : (clampedTarget / maxScroll) * 100,
            target: clampedTarget,
            color: section.dataset.progressColor ?? "var(--color-primary-500)",
          }
        })

        progressMarkersRef.current = markers
        setProgressMarkers(markers)

        const currentProgress = window.scrollY / maxScroll
        const activeMarker = markers.find(
          (marker) => currentProgress * 100 <= marker.progress,
        )

        setProgressColor(activeMarker?.color ?? "var(--color-primary-500)")
      })
    }

    updateMarkers()
    settleFrame = requestAnimationFrame(() => {
      settleFrame = requestAnimationFrame(updateMarkers)
    })
    window.addEventListener("resize", updateMarkers)

    return () => {
      cancelAnimationFrame(updateFrame)
      cancelAnimationFrame(settleFrame)
      window.removeEventListener("resize", updateMarkers)
    }
  }, [])

  return (
    <>
      <section
        ref={heroRef}
        data-progress-section="Banner inicial"
        data-progress-point="start"
        data-progress-color="var(--color-primary-500)"
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
              "color-mix(in srgb, var(--color-neutral-900) 50%, transparent)",
          }}
        />
        <motion.div
          className="absolute inset-y-0 left-0 h-full w-full origin-left transition-colors duration-300"
          style={{
            scaleX: progress,
            background: progressColor,
            boxShadow: `0 0 10px color-mix(in srgb, ${progressColor} 65%, transparent)`,
          }}
        />
        {progressMarkers.map((marker, index) => (
          <button
            key={marker.label}
            type="button"
            className="group pointer-events-auto absolute top-1/2 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
            style={{ left: `${marker.progress}%` }}
            onClick={() => {
              window.scrollTo({
                top: marker.target,
                left: 0,
                behavior: "smooth",
              })
            }}
            onKeyDown={(event) => {
              if (event.key !== "Enter" && event.key !== " ") {
                return
              }

              event.preventDefault()
              window.scrollTo({
                top: marker.target,
                left: 0,
                behavior: "smooth",
              })
            }}
            aria-label={`Ir al final de ${marker.label}`}
          >
            <span
              className="h-2 w-2 rounded-full border border-white shadow-[0_0_0_2px_rgba(10,40,40,0.35)] transition-transform duration-200 hover:scale-150"
              style={{ background: marker.color }}
            />
            <span
              className={`pointer-events-none absolute bottom-6 hidden whitespace-nowrap rounded bg-primary-900 px-2 py-1 font-display text-[10px] tracking-wide text-white shadow-lg group-hover:block ${
                index === 0 ? "left-0" : "left-1/2 -translate-x-1/2"
              }`}
            >
              {marker.label}
            </span>
          </button>
        ))}
      </div>
    </>
  )
}
