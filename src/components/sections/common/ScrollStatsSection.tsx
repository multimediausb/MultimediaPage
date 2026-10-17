import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Button from "../../ui/Button"
import Badge from "../../ui/Badge"

interface StatItem {
  number: string
  label: string
  subtext: string
  category: "trayectoria" | "global" | "comunidad" | "investigacion" | "tecnologia"
  accent: "primary" | "secondary" | "tertiary"
}

const statsData: StatItem[] = [
  {
    number: "25+",
    label: "AÑOS DE HISTORIA",
    subtext:
      "Formando líderes en ingeniería multimedia y producción interactiva de alto nivel.",
    category: "trayectoria",
    accent: "primary",
  },
  {
    number: "40+",
    label: "CONVENIOS GLOBALES",
    subtext:
      "Alianzas internacionales con instituciones y laboratorios de primer nivel como el MIT Media Lab.",
    category: "global",
    accent: "secondary",
  },
  {
    number: "250+",
    label: "ESTUDIANTES ACTIVOS",
    subtext:
      "Talento joven creando experiencias interactivas, videojuegos, VFX y animación digital.",
    category: "comunidad",
    accent: "tertiary",
  },
  {
    number: "15+",
    label: "SEMILLEROS & GRUPOS",
    subtext:
      "Equipos multidisciplinarios de investigación aplicada en constante producción.",
    category: "investigacion",
    accent: "primary",
  },
  {
    number: "7",
    label: "LABORATORIOS TOP",
    subtext:
      "Espacios dotados con hardware de captura de movimiento, renderizado y computación gráfica.",
    category: "tecnologia",
    accent: "secondary",
  },
]

export default function ScrollStatsSection({
  title = "MÉTRICAS QUE MARCAN LA DIFERENCIA",
  tag = "IMPACTO EN CIFRAS",
}: {
  title?: string
  tag?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Suavizado de la animación de scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  })

  // Transformaciones para el título y cabecera
  const headerScale = useTransform(smoothProgress, [0, 0.25], [0.92, 1.05])
  const headerOpacity = useTransform(
    smoothProgress,
    [0, 0.15, 0.85, 1],
    [0.3, 1, 1, 0.4],
  )

  // Desplazamiento horizontal de las tarjetas con efecto parallax
  const xTranslation = useTransform(smoothProgress, [0.1, 0.85], [
    "18%",
    "-75%",
  ])
  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "30%"])
  const glowScale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.3, 0.9])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[260vh] bg-neutral-950 text-white select-none"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #0c2128 0%, #060d11 60%, #030608 100%)",
      }}
    >
      {/* Contenedor Fijo (Sticky Viewport) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-12 px-6 lg:px-16 z-10">
        {/* Fondo decorativo con rejilla y brillo con movimiento por scroll */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 pointer-events-none opacity-20"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(50, 201, 204, 0.15) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(50, 201, 204, 0.15) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </motion.div>

        {/* Ambient Glows interactivos */}
        <motion.div
          style={{ scale: glowScale }}
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none blur-[120px]"
          animate={{
            background: [
              "radial-gradient(circle, rgba(50, 201, 204, 0.25) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(243, 136, 11, 0.22) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(47, 141, 207, 0.25) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Header superior del Scroll Section */}
        <motion.div
          style={{ scale: headerScale, opacity: headerOpacity }}
          className="relative z-20 max-w-screen-xl mx-auto w-full text-center"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-primary-400" />
            <Badge variant="primary" pulse>
              {tag}
            </Badge>
            <span className="w-8 h-px bg-primary-400" />
          </div>
          <h2 className="text-h3 md:text-h2 font-heading tracking-tight text-white mb-2">
            {title}
          </h2>
          <p className="text-b3 font-display text-neutral-400 max-w-xl mx-auto">
            Desliza para explorar la evolución, capacidades científicas y
            proyección de nuestra comunidad.
          </p>
        </motion.div>

        {/* Carrusel interactivo guiado por Scroll (Horizontal Movement) */}
        <div className="relative z-20 w-full overflow-hidden my-auto py-6">
          <motion.div
            style={{ x: xTranslation }}
            className="flex gap-8 items-center w-max pl-8"
          >
            {statsData.map((stat, index) => {
              const borderAccent =
                stat.accent === "primary"
                  ? "var(--color-primary-400)"
                  : stat.accent === "secondary"
                    ? "var(--color-secondary-400)"
                    : "var(--color-tertiary-400)"

              const shadowAccent =
                stat.accent === "primary"
                  ? "var(--shadow-turquoise-normal-light)"
                  : stat.accent === "secondary"
                    ? "var(--shadow-orange-normal-light)"
                    : "var(--shadow-blue-normal-light)"

              return (
                <div
                  key={index}
                  className="w-[340px] md:w-[420px] rounded-2xl p-8 backdrop-blur-xl transition-all duration-300 relative group"
                  style={{
                    background: "rgba(10, 24, 28, 0.75)",
                    border: `1.5px solid ${borderAccent}`,
                    boxShadow: shadowAccent,
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-b4 font-display px-3 py-1 rounded-full uppercase tracking-wider"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        color: borderAccent,
                        border: `1px solid ${borderAccent}40`,
                      }}
                    >
                      {stat.category}
                    </span>
                    <span className="text-b4 font-display text-neutral-500">
                      0{index + 1} / 0{statsData.length}
                    </span>
                  </div>

                  <div
                    className="text-h1 font-heading text-5xl md:text-6xl font-bold mb-4 tracking-tight"
                    style={{
                      color: borderAccent,
                      textShadow: `0 0 28px ${borderAccent}60`,
                    }}
                  >
                    {stat.number}
                  </div>

                  <h3 className="text-h5 font-heading text-white mb-3">
                    {stat.label}
                  </h3>

                  <p className="text-b2 font-display text-neutral-300 leading-relaxed mb-6">
                    {stat.subtext}
                  </p>

                  <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: borderAccent,
                        width: `${((index + 1) / statsData.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* Footer y Barra de Progreso del Scroll */}
        <div className="relative z-20 max-w-screen-xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-800/60">
          <div className="flex items-center gap-3">
            <span className="text-b4 font-display text-neutral-400 uppercase tracking-widest">
              PROGRESO DE DESPLAZAMIENTO
            </span>
            <div className="w-36 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary-400 rounded-full"
                style={{ scaleX: smoothProgress, transformOrigin: "0%" }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-b4 font-display text-neutral-500 hidden sm:inline">
              Scroll interactivo activo
            </span>
            <Button
              variant="outline-primary"
              size="sm"
              asLink
              href="/investigacion"
            >
              EXPLORAR SEMILLEROS
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
