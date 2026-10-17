import { motion } from "framer-motion"
import Badge from "../../ui/Badge"

const programSchedule = [
  {
    time: "08:30 - 09:00",
    title: "Acreditación y Bienvenida",
    speaker: "Comité Organizador & Staff MediaLab",
    type: "registro",
    room: "Hall Principal Duns Scoto",
  },
  {
    time: "09:00 - 09:30",
    title: "Apertura Oficial Media Show 2026-2",
    speaker: "Dirección de Ingeniería Multimedia & Decanatura",
    type: "protocolo",
    room: "Auditorio Juan Anaya",
  },
  {
    time: "09:30 - 11:00",
    title: "Keynote: IA Generativa y Computación Gráfica en Producción",
    speaker: "Dr. Andrés Ramírez Torres (Especialista en Visión Computacional)",
    type: "keynote",
    room: "Auditorio Juan Anaya",
  },
  {
    time: "11:15 - 12:45",
    title: "Panel: El Futuro del Arte Interactivo y la Realidad Extendida",
    speaker: "Dra. Elena Rossi, Santiago Cruz (Ubisoft), Laura Gómez (Riot)",
    type: "panel",
    room: "Auditorio Juan Anaya",
  },
  {
    time: "13:00 - 14:15",
    title: "Almuerzo Libre & Muestra de Posters Interactivos",
    speaker: "Semilleros Animove, GameDev y StoryLab",
    type: "networking",
    room: "Plaza Central USB",
  },
  {
    time: "14:30 - 16:30",
    title: "Workshops en Simultáneo: Shaders en Tiempo Real & Motion Capture",
    speaker: "Investigadores Senior y Docentes del Laboratorio",
    type: "taller",
    room: "Labs 308 y Sala MoCap",
  },
  {
    time: "16:45 - 18:00",
    title: "Presentación de Proyectos Destacados y Premiación",
    speaker: "Jurados de la Industria & Profesores",
    type: "premiacion",
    room: "Auditorio Juan Anaya",
  },
  {
    time: "18:00 - 18:30",
    title: "Clausura y Cóctel de Networking",
    speaker: "Equipo Media Show",
    type: "clausura",
    room: "Terraza Ockham",
  },
]

export default function NextEventProgramSection() {
  return (
    <section className="py-16">
      <div className="flex items-center gap-3 mb-6">
        <Badge variant="primary">CRONOGRAMA</Badge>
        <span className="text-b4 font-display text-neutral-400">
          AGENDA DETALLADA
        </span>
      </div>

      <h2
        className="text-h4 font-heading mb-8"
        style={{ color: "var(--color-neutral-900)" }}
      >
        Programa del Día
      </h2>

      <div className="space-y-4">
        {programSchedule.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-neutral-50"
            style={{
              background: "var(--surface)",
              border: "var(--stroke-s) solid var(--color-neutral-200)",
              boxShadow: "var(--shadow-card-normal)",
            }}
          >
            <div className="flex items-start md:items-center gap-4">
              <div
                className="text-b2 font-heading px-3 py-1.5 rounded-lg shrink-0 text-center"
                style={{
                  background: "var(--color-neutral-100)",
                  color: "var(--color-secondary-600)",
                  border: "1px solid var(--color-neutral-200)",
                }}
              >
                {item.time}
              </div>

              <div>
                <h3
                  className="text-h6 font-heading mb-1 leading-snug"
                  style={{ color: "var(--color-neutral-900)" }}
                >
                  {item.title}
                </h3>
                <p className="text-b3 font-display text-neutral-500">
                  {item.speaker}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
              <span className="text-b4 font-display px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                📍 {item.room}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
