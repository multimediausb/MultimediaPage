import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import MemberCard from '../components/MemberCard'
import PageBanner from '../components/PageBanner'

const categories = ['todos', 'docente', 'egresado', 'estudiante'] as const
type Cat = typeof categories[number]

const members = [
  { name: 'Roy vega aragon', role: 'Director Multimedia', category: 'docente' as const, specialty: 'Fotogrametria', publications:  0 },
  { name: 'Jose Ricardo castiblanco', role: 'Docente Multimedia', category: 'docente' as const, specialty: 'Ilustracion y pubcidad', publications:  0 },
  { name: 'Andrea Tijaro', role: 'Docente Multimedia', category: 'docente' as const, specialty: 'Investigacion', publications:  0 },
  { name: 'Juan diego gonzales', role: 'Docente Multimedia', category: 'docente' as const, specialty: 'Modelado animacion 3D', publications:  0 },
  { name: 'Angierick paola Vanegas', role: 'Docente Multimedia', category: 'docente' as const, specialty: 'Game Developer', publications:  0 },
  { name: 'Sergio reyes', role: 'Docente Multimedia', category: 'docente' as const, specialty: 'Backend Developer', publications:  0 },
  { name: 'Miguelangel vazques', role: 'Docente Multimedia', category: 'docente' as const, specialty: 'Modelado animacion 3D', publications:  0 },
  { name: 'Sebastian gutierrez', role: 'Docente Multimedia', category: 'docente' as const, specialty: 'Experience  Developer', publications: 0 },
]

export default function Miembros() {
  const [active, setActive] = useState<Cat>('todos')
  const filtered = active === 'todos' ? members : members.filter((m) => m.category === active)

  const catColor: Record<Cat, string> = {
    todos: 'var(--primary)',
    docente: 'var(--primary)',
    egresado: '#a855f7',
    estudiante: '#f59e0b',
  }

  return (
    <div className="min-h-screen pb-20">
      <PageBanner
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=600&fit=crop&auto=format"
        alt="Equipo de investigadores trabajando en colaboración"
        label="Comunidad"
        title="Nuestros Miembros"
        accent="var(--secondary)"
      />
      <div className="max-w-screen-xl mx-auto px-6 pt-12">
        <SectionHeader
          label=""
          title=""
          subtitle="Docentes, egresados y estudiantes que conforman el capital humano del Centro de Investigación."
          accent="secondary"
        />

        {/* Filters */}
        <div className="flex gap-2 mt-8 mb-10 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className="font-display text-xs tracking-widest px-4 py-2 rounded transition-all duration-200 capitalize"
              style={{
                background: active === c ? catColor[c] : `${catColor[c]}10`,
                color: active === c ? 'var(--bg)' : catColor[c],
                border: `1px solid ${active === c ? catColor[c] : `${catColor[c]}30`}`,
              }}
            >
              {c === 'todos' ? 'TODOS' : c.toUpperCase() + 'S'}
            </button>
          ))}
        </div>

        <motion.div layout className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((m, i) => (
            <motion.div
              key={m.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <MemberCard {...m} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
