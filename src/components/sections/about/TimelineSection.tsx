import { motion } from "framer-motion"
import Badge from "../../ui/Badge"

const timelineEvents = [
  {
    year: "1998",
    title: "Fundación del Centro de Investigación",
    text: "Nace como unidad académica independiente para articular la computación gráfica y el desarrollo audiovisual.",
    accent: "var(--color-primary-500)",
  },
  {
    year: "2004",
    title: "Acreditación y Convenio MIT Media Lab",
    text: "Primera acreditación internacional de alta calidad y firma del histórico convenio de intercambio académico.",
    accent: "var(--color-secondary-500)",
  },
  {
    year: "2010",
    title: "Laboratorio de Computación Científica",
    text: "Inauguración de la infraestructura dedicada a simulación gráfica, renderizado de alto rendimiento y primer doctorado.",
    accent: "var(--color-tertiary-500)",
  },
  {
    year: "2016",
    title: "Alianza LATAM Research Alliance",
    text: "Incorporación oficial a la red de 18 universidades líderes para el desarrollo de proyectos multimedia interregionales.",
    accent: "var(--color-primary-500)",
  },
  {
    year: "2020",
    title: "Ecosistema Digital y Open Access",
    text: "Transformación digital completa de los repositorios de producción científica y plataforma abierta de proyectos estudiantiles.",
    accent: "var(--color-secondary-500)",
  },
  {
    year: "2024",
    title: "Centro de Excelencia Nacional",
    text: "Máximo reconocimiento otorgado por el Consejo Nacional de Ciencia y Tecnología en mérito a su producción e innovación.",
    accent: "var(--color-tertiary-500)",
  },
]

export default function TimelineSection() {
  return (
    <section
      id="timeline-section"
      className="py-24 max-w-screen-xl mx-auto px-6"
    >
      <div className="text-center max-w-2xl mx-auto mb-16">
        <Badge variant="tertiary">LÍNEA DE TIEMPO</Badge>
        <h2
          className="text-h3 md:text-h2 font-heading mt-3 mb-4"
          style={{ color: "var(--color-neutral-900)" }}
        >
          Nuestra Trayectoria
        </h2>
        <p
          className="text-b2 font-display"
          style={{ color: "var(--color-neutral-600)" }}
        >
          Un recorrido continuo de hitos, innovación y crecimiento a lo largo de
          más de dos décadas.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Línea vertical central/lateral */}
        <div
          className="absolute top-2 bottom-2 left-6 md:left-1/2 -translate-x-1/2 w-0.5"
          style={{
            background:
              "linear-gradient(180deg, var(--color-primary-400), var(--color-secondary-400), var(--color-tertiary-400))",
          }}
        />

        <div className="space-y-12">
          {timelineEvents.map((item, index) => {
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Contenido de la tarjeta de hito */}
                <div
                  className={`w-full md:w-[calc(50%-2rem)] pl-14 md:pl-0 ${
                    isEven ? "md:text-left md:pl-8" : "md:text-right md:pr-8"
                  }`}
                >
                  <div
                    className="p-6 rounded-2xl transition-all hover:scale-[1.01]"
                    style={{
                      background: "var(--surface)",
                      border: "var(--stroke-s) solid var(--color-neutral-200)",
                      boxShadow: "var(--shadow-card-normal)",
                    }}
                  >
                    <div
                      className={`flex items-center gap-2 mb-2 ${
                        isEven ? "md:justify-start" : "md:justify-end"
                      }`}
                    >
                      <span
                        className="text-h4 font-heading"
                        style={{ color: item.accent }}
                      >
                        {item.year}
                      </span>
                    </div>

                    <h3 className="text-h6 font-heading mb-2 text-neutral-900">
                      {item.title}
                    </h3>

                    <p className="text-b3 font-body text-neutral-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>

                {/* Nodo / Punto en la línea de tiempo */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 flex items-center justify-center">
                  <div
                    className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shadow-md"
                    style={{ background: item.accent }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
