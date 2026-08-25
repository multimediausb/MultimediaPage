import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import EventCard from '../components/EventCard'
import PageBanner from '../components/PageBanner'

const events = [
  { title: 'Panel de Egresados 2026 - 1', date: '06 May 2026 — 3:00 PM', location: 'Universidad de San Buenaventura, Salón 308 Guillermo de Ockham', type: 'conferencia' as const, speakers: ['Egresados'] },
  { title: 'Media Show 2026 - 1 XXXXXXX', date: '06 May 2026 — 9:00 AM — Colombia, Bogota', location: 'Universidad de San Buenaventura, Salón 308 Guillermo de Ockham', type: 'conferencia' as const, speakers: ['1XXXXX','2XXXXX','3XXXXX','4XXXXX'] },
  { title: 'Panel de Egresados 2025 - 1', date: '06 May 2026 — 3:00 PM', location: 'Universidad de San Buenaventura, Salón 308 Guillermo de Ockham', type: 'conferencia' as const, speakers: ['Egresados'] },
  { title: 'Media Show 2025 - 1 XXXXXXX', date: '06 May 2026 — 9:00 AM — Colombia, Bogota', location: 'Universidad de San Buenaventura, Salón 308 Guillermo de Ockham', type: 'conferencia' as const, speakers: ['1XXXXX','2XXXXX','3XXXXX','4XXXXX'] },
  { title: 'Media Show 2024 - 2 XXXXXXX', date: '06 May 2026 — 9:00 AM — Colombia, Bogota', location: 'Universidad de San Buenaventura, Salón 308 Guillermo de Ockham', type: 'conferencia' as const, speakers: ['1XXXXX','2XXXXX','3XXXXX','4XXXXX'] },
  { title: 'Media Show 2024 - 1 XXXXXXX', date: '06 May 2026 — 9:00 AM — Colombia, Bogota', location: 'Universidad de San Buenaventura, Salón 308 Guillermo de Ockham', type: 'conferencia' as const, speakers: ['1XXXXX','2XXXXX','3XXXXX','4XXXXX'] },
]

/*const  events = [
  { title: 'Panel de Egresados: Conecta con quienes ya están viviendo el camino que tú estás comenzando', date: '06 May 2026 — 3:00 PM', location: 'Universidad de San Buenaventura, Salón 308 Guillermo de Ockham', type: 'charla' as const, speakers: ['Egresados'] },
  { title: 'No Esperes a que alguien mas Divulgue tu ciencia', date: '06 May 2026 — 11:00 AM', location: 'Universidad de San Buenaventura, Auditorio Juan Anaya 1er piso Duns Scoto', type: 'conferencia' as const, speakers: ['Carlos Guarnizo — UniAndes'] },
  { title: 'Del sonido directo al diseño sonoro para medios audiovisuales', date: '06 May 2026 — 3:00 PM', location: 'Universidad de San Buenaventura, Auditorio Juan Anaya 1er piso Duns Scoto', type: 'conferencia' as const, speakers: ['Carlos Cabas'] },
  { title: 'Buscando Inspiracion En la Nostalgia', date: '06 May 2026 — 11:00 AM', location: 'Universidad de San Buenaventura, Salón 308 Guillermo de Ockham', type: 'charla' as const, speakers: ['Danny Gonzales'] },
  { title: 'Digital Paint-Off USB 2026 — Challenge Digital', date: '06 May 2026 — 2:00 PM a 3:00 PM', location: 'Universidad de San Buenaventura, Salón 308 Guillermo de Ockham', type: 'taller' as const, speakers: [XXXXXX] },
]
*/
export default function Eventos() {
  return (
    <div className="min-h-screen pb-20">
      <PageBanner
        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&h=600&fit=crop&auto=format"
        alt="Auditorio con conferencia académica"
        label="Agenda"
        title="Eventos Académicos"
        accent="var(--secondary)"
      />
      <div className="max-w-screen-xl mx-auto px-6 pt-12">
        <SectionHeader
          label="Eventos pasados"
          title="Donde impactamos"
          subtitle="Conoce las conferencias, seminarios, talleres y congresos organizados por el Centro de Investigación y Divulgación, donde compartimos el trabajo, la innovación y el impacto de los ingenieros multimedia."
          accent="secondary"
        />

        {/* Timeline marker */}
        <div className="flex items-center gap-4 mt-10 mb-8">
          <div className="h-px flex-1" style={{ background: 'rgba(14,154,147,0.1)' }} />
          <span className="font-display text-xs tracking-widest" style={{ color: 'var(--fg-muted)' }}>
            2020 — PRÓXIMOS
          </span>
          <div className="h-px flex-1" style={{ background: 'rgba(14,154,147,0.1)' }} />
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {events.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <EventCard {...e} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
