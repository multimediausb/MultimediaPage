import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import MediaCard from '../components/MediaCard'
import PageBanner from '../components/PageBanner'

const medios = [
  { platform: 'YouTube', handle: 'researchcenter', followers: '12.4K', description: 'Conferencias, seminarios y tutoriales en video. Contenido científico de libre acceso para la comunidad académica.', icon: '▶', color: '#ef4444' },
  { platform: 'X / Twitter', handle: 'RC_Investigacion', followers: '8.2K', description: 'Noticias, convocatorias y publicaciones en tiempo real. Seguimiento de la agenda científica regional.', icon: '✕', color: 'var(--fg)' },
  { platform: 'LinkedIn', handle: 'research-center', followers: '5.7K', description: 'Red profesional para egresados, docentes y aliados estratégicos. Oportunidades laborales y colaboraciones.', icon: 'in', color: 'var(--primary)' },
  { platform: 'Instagram', handle: 'rc.investigacion', followers: '4.1K', description: 'Behind the scenes de la investigación, vida en laboratorio y divulgación visual del quehacer científico.', icon: '◉', color: 'var(--accent)' },
  { platform: 'Podcast', handle: 'Ciencia en Frecuencia', followers: '2.9K', description: 'Episodios semanales sobre frontera del conocimiento, entrevistas con investigadores y debate de ideas.', icon: '🎙', color: '#f59e0b' },
  { platform: 'Newsletter', handle: 'RC Digest', followers: '6.3K', description: 'Boletín quincenal con artículos destacados, convocatorias, noticias del centro y recursos para investigadores.', icon: '✉', color: '#10b981' },
]

const stats = [
  { value: '39,600+', label: 'Seguidores totales', color: 'var(--primary)' },
  { value: '280+', label: 'Videos publicados', color: 'var(--accent)' },
  { value: '52', label: 'Episodios de podcast', color: '#f59e0b' },
  { value: '200K+', label: 'Impresiones mensuales', color: '#10b981' },
]

export default function Medios() {
  return (
    <div className="min-h-screen pb-20">
      <PageBanner
        image="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1600&h=600&fit=crop&auto=format"
        alt="Estudio de grabación y medios digitales"
        label="Difusión"
        title="Nuestros Medios"
        accent="var(--primary)"
      />
      <div className="max-w-screen-xl mx-auto px-6 pt-12">
        <SectionHeader
          label="Difusión"
          title="Nuestros Medios"
          subtitle="Plataformas y canales a través de los cuales compartimos el conocimiento con la sociedad."
          accent="primary"
        />

        {/* Reach stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="rounded-lg p-4 text-center"
              style={{ background: 'var(--surface)', border: `1px solid ${s.color}20` }}
            >
              <div className="font-display font-bold text-2xl" style={{ color: s.color }}>
                {s.value}
              </div>
              <p className="font-display text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>
                {s.label.toUpperCase()}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Media cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-10">
          {medios.map((m, i) => (
            <motion.div
              key={m.platform}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <MediaCard {...m} />
            </motion.div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 rounded-lg p-8 grid md:grid-cols-2 gap-8 items-center"
          style={{ background: 'var(--surface)', border: '1px solid rgba(14,154,147,0.15)' }}
        >
          <div>
            <h3 className="font-display font-bold text-lg mb-2" style={{ color: 'var(--fg)' }}>
              Suscríbete al RC Digest
            </h3>
            <p className="font-body text-sm" style={{ color: 'var(--fg-muted)' }}>
              Recibe cada dos semanas lo mejor de la investigación del centro directamente en tu correo.
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 rounded px-4 py-3 text-sm font-body outline-none"
              style={{
                background: 'var(--surface-2)',
                border: '1px solid rgba(14,154,147,0.2)',
                color: 'var(--fg)',
              }}
            />
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(14,154,147,0.3)' }}
              whileTap={{ scale: 0.96 }}
              className="font-display text-xs tracking-widest px-5 py-3 rounded shrink-0"
              style={{ background: 'var(--primary)', color: 'var(--bg)' }}
            >
              SUSCRIBIR
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
