
import { useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import Badge from "../../ui/Badge"
import StatsCube3D from "../../graphics/StatsCube3D"

const statsData = [
  {
    number: "25+",
    label: "AÑOS DE HISTORIA",
    subtext:
      "Formando líderes en ingeniería multimedia y producción interactiva de alto nivel.",
  },
  {
    number: "40+",
    label: "CONVENIOS GLOBALES",
    subtext:
      "Alianzas internacionales con instituciones y laboratorios de primer nivel.",
  },
  {
    number: "250+",
    label: "ESTUDIANTES ACTIVOS",
    subtext:
      "Talento joven creando experiencias interactivas, videojuegos, VFX y animación digital.",
  },
  {
    number: "15+",
    label: "SEMILLEROS Y GRUPOS",
    subtext:
      "Equipos multidisciplinarios de investigación aplicada en constante producción.",
  },
  {
    number: "7",
    label: "LABORATORIOS",
    subtext:
      "Espacios dotados con tecnología para captura de movimiento, renderizado y computación gráfica.",
  },
]

export default function ScrollStatsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  })

  // El cubo completa su recorrido antes de terminar
  // el scroll de toda la sección.
  const cubeProgress = useTransform(
    smoothProgress,
    [0.05, 0.78],
    [0, 1],
    { clamp: true },
  )

  const gridY = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", "20%"],
  )

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh] bg-neutral-950 text-white"
      style={{
        background:
          "radial-gradient(ellipse at 70% 35%, #0c2128 0%, #060d11 60%, #030608 100%)",
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Cuadrícula de fondo */}
        <motion.div
          style={{ y: gridY }}
          className="absolute inset-0 pointer-events-none opacity-25"
        >
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(var(--grid-color, rgba(50, 201, 204, 0.15)) 1px, transparent 1px),
                linear-gradient(90deg, var(--grid-color, rgba(50, 201, 204, 0.15)) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </motion.div>

        <div className="relative z-10 mx-auto grid h-full max-w-screen-xl grid-cols-1 items-center gap-8 px-6 py-12 md:grid-cols-2 lg:px-16">
          {/* Izquierda: estadísticas */}
          <div className="relative z-20 flex h-full flex-col justify-center py-10">
            <div className="mb-8">
              <div className="mb-4">
                <Badge variant="primary" pulse>
                  IMPACTO EN CIFRAS
                </Badge>
              </div>

              <h2 className="text-h3 md:text-h2 font-heading tracking-tight text-white">
                MÉTRICAS QUE MARCAN LA DIFERENCIA
              </h2>

              <p className="mt-4 max-w-lg text-b3 font-display leading-relaxed text-neutral-400">
                Conoce la trayectoria, las capacidades científicas
                y el alcance de nuestra comunidad.
              </p>
            </div>

            <div className="space-y-5">
              {statsData.map((stat, index) => (
                <motion.article
                  key={stat.label}
                  className="border-l-2 border-primary-400/50 pl-5"
                  style={{
                    opacity: useTransform(
                      smoothProgress,
                      [
                        Math.max(0, index / statsData.length - 0.1),
                        index / statsData.length + 0.1,
                        Math.min(1, index / statsData.length + 0.3),
                      ],
                      [0.4, 1, 0.65],
                    ),
                  }}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-3xl font-bold tracking-tight text-primary-400 md:text-4xl">
                      {stat.number}
                    </span>

                    <h3 className="text-sm font-heading tracking-wide text-white md:text-base">
                      {stat.label}
                    </h3>
                  </div>

                  <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-400">
                    {stat.subtext}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Derecha: escena 3D */}
          <div className="relative hidden h-[75vh] min-h-[400px] md:block">
            <div className="absolute inset-0 rounded-full bg-primary-400/5 blur-3xl" />

            <div className="sticky top-[12.5vh] h-[75vh] overflow-hidden">
              <StatsCube3D progress={cubeProgress.get()} />
            </div>

            <div className="pointer-events-none absolute bottom-4 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.3em] text-neutral-500">
                EXPLORANDO NUESTRA EVOLUCIÓN
              </span>
            </div>
          </div>
        </div>

        {/* Indicador inferior */}
        <div className="absolute bottom-5 left-6 right-6 z-20 flex items-center gap-4 lg:left-16 lg:right-16">
          <span className="text-xs tracking-widest text-neutral-500">
            SCROLL
          </span>

          <div className="h-px flex-1 overflow-hidden bg-neutral-800">
            <motion.div
              className="h-full origin-left bg-primary-400"
              style={{ scaleX: smoothProgress }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
