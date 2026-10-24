import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Badge from "../../ui/Badge"
import StatsCube3D from "../../graphics/StatsCube3D"

gsap.registerPlugin(ScrollTrigger)

const statsData = [
  { number: "25+", label: "AÑOS DE HISTORIA" },
  { number: "40+", label: "CONVENIOS GLOBALES" },
  { number: "250+", label: "ESTUDIANTES ACTIVOS" },
  { number: "15+", label: "SEMILLEROS Y GRUPOS" },
  { number: "25+", label: "AÑOS DE HISTORIA" },
  { number: "40+", label: "CONVENIOS GLOBALES" },
  { number: "250+", label: "ESTUDIANTES ACTIVOS" },
  { number: "15+", label: "SEMILLEROS Y GRUPOS" },
]

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const lerp = (start: number, end: number, amount: number) =>
  start + (end - start) * clamp(amount, 0, 1)

const smoothStep = (value: number) => {
  const t = clamp(value, 0, 1)
  return t * t * (3 - 2 * t)
}

export default function ScrollStatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentViewportRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)

  const progressRef = useRef(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const contentOffsetRef = useRef(0)

  const [activeIndex, setActiveIndex] = useState(-1)
  const [activatedIndex, setActivatedIndex] = useState(-1)
  const [contentOffset, setContentOffset] = useState(0)
  const [sectionHeight, setSectionHeight] = useState("100vh")

  const itemCount = statsData.length

  // Permite el desplazamiento cuando el contenido no cabe en pantalla.
  const hasParallax = true

  // =========================================================
  // MEDICIÓN AUTOMÁTICA DEL CONTENIDO Y ALTURA DE LA SECCIÓN
  // =========================================================

  useLayoutEffect(() => {
    const section = sectionRef.current
    const viewport = contentViewportRef.current
    const content = contentRef.current
    const heading = headingRef.current
    const metrics = metricsRef.current

    if (!section || !viewport || !content || !heading || !metrics) {
      return
    }

    let resizeFrame = 0

    const measureLayout = () => {
      const viewportHeight = window.innerHeight

      // Altura natural del contenido: encabezado, métricas y espacios.
      const contentHeight = content.scrollHeight

      // Distancia real necesaria para recorrer el contenido.
      const scrollableContent = Math.max(
        0,
        contentHeight - viewportHeight,
      )

      /*
       * Se asigna un tramo de scroll por métrica a partir del
       * desplazamiento real necesario, no de una constante por item.
       *
       * El mínimo permite que cada métrica tenga un intervalo de
       * animación utilizable, incluso si el contenido cabe en pantalla.
       */
      const minimumTravel = viewportHeight * 0.7
      const totalTravel = Math.max(
        minimumTravel * Math.max(itemCount, 1),
        scrollableContent + viewportHeight * 0.5,
      )

      setSectionHeight(`${viewportHeight + totalTravel}px`)
    }

    const scheduleMeasure = () => {
      cancelAnimationFrame(resizeFrame)

      resizeFrame = requestAnimationFrame(() => {
        measureLayout()
        ScrollTrigger.refresh()
      })
    }

    const observer = new ResizeObserver(scheduleMeasure)

    observer.observe(viewport)
    observer.observe(content)
    observer.observe(heading)
    observer.observe(metrics)

    window.addEventListener("resize", scheduleMeasure)

    measureLayout()

    return () => {
      cancelAnimationFrame(resizeFrame)
      observer.disconnect()
      window.removeEventListener("resize", scheduleMeasure)
    }
  }, [itemCount])

  // =========================================================
  // SCROLL Y SINCRONIZACIÓN DE MÉTRICAS
  // =========================================================

  useEffect(() => {
    const section = sectionRef.current
    const viewport = contentViewportRef.current
    const content = contentRef.current

    if (!section || !viewport || !content || itemCount === 0) {
      return
    }

    let maxOffset = 0

    const measureContent = () => {
      maxOffset = Math.max(
        0,
        content.scrollHeight - viewport.clientHeight,
      )
    }

    const updateOffset = (nextOffset: number) => {
      const safeOffset = clamp(nextOffset, 0, maxOffset)

      if (Math.abs(contentOffsetRef.current - safeOffset) < 0.5) {
        return
      }

      contentOffsetRef.current = safeOffset

      setContentOffset((previous) =>
        Math.abs(previous - safeOffset) < 0.5
          ? previous
          : safeOffset,
      )
    }

    measureContent()

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const progress = self.progress
          progressRef.current = progress

          const scaledProgress = progress * itemCount

          const index = Math.min(
            itemCount - 1,
            Math.floor(scaledProgress),
          )

          const localProgress =
            progress >= 1 ? 1 : scaledProgress - index

          const viewportRect = viewport.getBoundingClientRect()
          const viewportCenter =
            viewportRect.top + viewportRect.height / 2

          const currentOffset = contentOffsetRef.current

          const anchors = itemRefs.current
            .slice(0, itemCount)
            .map((element) => {
              if (!element) return 0

              const rect = element.getBoundingClientRect()

              const originalCenter =
                rect.top + rect.height / 2 + currentOffset

              return clamp(
                originalCenter - viewportCenter,
                0,
                maxOffset,
              )
            })

          const currentAnchor = anchors[index] ?? 0
          const nextAnchor =
            anchors[Math.min(index + 1, itemCount - 1)] ??
            currentAnchor

          /*
           * El bloque final contiene hasta las últimas tres métricas.
           * Con pocas métricas, el índice nunca será negativo.
           */
          const finalBlockIndex = Math.max(0, itemCount - 3)
          const finalBlockAnchor = anchors[finalBlockIndex] ?? 0

          let nextOffset = 0

          if (index >= finalBlockIndex) {
            nextOffset = finalBlockAnchor
          } else if (index === 0 && localProgress < 0.62) {
            nextOffset = lerp(
              0,
              currentAnchor,
              smoothStep(localProgress / 0.62),
            )
          } else if (localProgress <= 0.72) {
            nextOffset = currentAnchor
          } else {
            nextOffset = lerp(
              currentAnchor,
              nextAnchor,
              smoothStep((localProgress - 0.72) / 0.28),
            )
          }

          updateOffset(nextOffset)

          // Activación progresiva de las tarjetas.
          const isActivated = localProgress >= 0.22

          const nextActivatedIndex =
            progress >= 1
              ? itemCount - 1
              : isActivated
                ? index
                : index - 1

          setActivatedIndex((previous) =>
            previous === nextActivatedIndex
              ? previous
              : nextActivatedIndex,
          )

          // Contacto del prisma con la métrica actual.
          const isTouching =
            localProgress >= 0.62 &&
            localProgress <= 0.72

          const nextActiveIndex = isTouching ? index : -1

          setActiveIndex((previous) =>
            previous === nextActiveIndex
              ? previous
              : nextActiveIndex,
          )
        },

        onRefresh: measureContent,
      })
    }, section)

    const observer = new ResizeObserver(() => {
      measureContent()
      ScrollTrigger.refresh()
    })

    observer.observe(viewport)
    observer.observe(content)

    const refreshFrame = requestAnimationFrame(() => {
      measureContent()
      ScrollTrigger.refresh()
    })

    return () => {
      cancelAnimationFrame(refreshFrame)
      observer.disconnect()
      ctx.revert()

      progressRef.current = 0
      contentOffsetRef.current = 0
    }
  }, [itemCount])

  return (
    <section
      ref={sectionRef}
      className="relative bg-neutral-950 text-white"
      style={{
        height: sectionHeight,
        background:
          "radial-gradient(ellipse at 70% 35%, #0c2128 0%, #060d11 60%, #030608 100%)",
      }}
      aria-label="Estadísticas generales del programa"
    >
      <div className="sticky top-0 isolate h-screen overflow-hidden">
        {/* Fondo cuadriculado */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-25"
          aria-hidden="true"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(50, 201, 204, 0.15) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(50, 201, 204, 0.15) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Aura del prisma */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 75% 50%, rgba(50,201,204,0.09), transparent 45%)",
          }}
        />

        {/* Escena 3D */}
        <StatsCube3D
          progressRef={progressRef}
          targetRefs={itemRefs}
        />

        {/* Composición principal */}
        <div className="relative z-20 mx-auto grid h-full max-w-screen-xl grid-cols-1 px-5 sm:px-6 md:grid-cols-2 md:gap-8 lg:px-16">
          {/* Viewport de métricas */}
          <div
            ref={contentViewportRef}
            className="relative flex h-full min-h-0 min-w-0 flex-col justify-start overflow-hidden"
          >
            <motion.div
              ref={contentRef}
              className="w-full shrink-0 py-16"
              style={{
                y: -contentOffset,
                willChange: "transform",
              }}
            >
              {/* Encabezado */}
              <div ref={headingRef} className="mb-7">
                <div className="mb-4">
                  <Badge variant="primary" pulse>
                    IMPACTO EN CIFRAS
                  </Badge>
                </div>

                <h2 className="max-w-xl font-heading text-3xl font-bold leading-tight tracking-tight text-white lg:text-4xl">
                  MÉTRICAS QUE MARCAN LA DIFERENCIA
                </h2>

                <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-400">
                  Conoce la trayectoria, las capacidades científicas
                  y el alcance de nuestra comunidad.
                </p>
              </div>

              {/* Indicadores */}
              <div
                ref={metricsRef}
                className="space-y-3 sm:space-y-4"
              >
                {statsData.map((stat, index) => {
                  const isActive = activeIndex === index
                  const isActivated = index <= activatedIndex

                  return (
                    <motion.article
                      key={stat.label}
                      ref={(element) => {
                        itemRefs.current[index] = element
                      }}
                      animate={{
                        opacity: isActivated ? 1 : 0.3,
                        x: isActive ? 8 : 0,
                        scale: isActive ? 1.015 : 1,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="relative w-full max-w-[430px] overflow-hidden rounded-r-md border-l-[5px] px-4 py-3 sm:px-5 sm:py-4"
                      style={{
                        background: isActive
                          ? "rgba(50, 201, 204, 0.22)"
                          : isActivated
                            ? "rgba(24, 35, 39, 0.92)"
                            : "rgba(10, 17, 20, 0.65)",

                        borderLeftColor: isActive
                          ? "#8affff"
                          : isActivated
                            ? "rgba(50, 201, 204, 0.65)"
                            : "rgba(100, 116, 120, 0.2)",

                        boxShadow: isActive
                          ? "0 0 28px rgba(50,201,204,0.28)"
                          : "none",

                        filter: isActivated
                          ? "none"
                          : "saturate(0.35)",
                      }}
                      aria-current={isActive ? "step" : undefined}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className="shrink-0 font-heading text-2xl font-bold tracking-tight sm:text-3xl"
                          style={{
                            color: isActive
                              ? "#8affff"
                              : isActivated
                                ? "#32c9cc"
                                : "#526368",
                          }}
                        >
                          {stat.number}
                        </span>

                        <h3
                          className={`min-w-0 break-words font-heading text-xs font-semibold tracking-wide sm:text-sm md:text-base ${
                            isActivated
                              ? "text-white"
                              : "text-neutral-600"
                          }`}
                        >
                          {stat.label}
                        </h3>
                      </div>
                    </motion.article>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Columna derecha reservada para el prisma */}
          <div className="pointer-events-none hidden h-full md:block" />
        </div>
      </div>
    </section>
  )
}