import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import ServiceCard from '../components/ServiceCard'
import PageBanner from '../components/PageBanner'

const services = [
  { icon: '🔬', title: 'Laboratorios Especializados', description: 'Acceso a laboratorios de última generación equipados con tecnología de vanguardia para proyectos de investigación avanzada.', accent: 'primary' as const },
  { icon: '📊', title: 'Análisis de Datos', description: 'Consultoría estadística y de ciencia de datos para proyectos académicos, institucionales y del sector privado.', accent: 'secondary' as const },
  { icon: '📚', title: 'Biblioteca Digital', description: 'Acceso a más de 50,000 publicaciones científicas internacionales, bases de datos Scopus, Web of Science y Springer.', accent: 'accent' as const },
  { icon: '🧩', title: 'Mentoría Científica', description: 'Programa de acompañamiento para tesistas, investigadores jóvenes y profesionales que buscan transición hacia la investigación.', accent: 'primary' as const },
  { icon: '🌐', title: 'Vinculación Internacional', description: 'Red de colaboración con 40+ universidades y centros de investigación de Latinoamérica, Europa y Asia.', accent: 'secondary' as const },
  { icon: '💡', title: 'Transferencia Tecnológica', description: 'Gestión de propiedad intelectual, patentes y vinculación con el sector productivo para comercializar innovaciones.', accent: 'accent' as const },
  { icon: '🎓', title: 'Formación Continua', description: 'Cursos, diplomados y talleres en metodología de investigación, escritura científica y herramientas computacionales.', accent: 'primary' as const },
  { icon: '📡', title: 'Publicación y Difusión', description: 'Apoyo editorial para publicar en revistas indexadas y difusión de resultados en medios especializados y de divulgación.', accent: 'secondary' as const },
]

export default function Servicios() {
  return (
    <div className="min-h-screen pb-20">
      <PageBanner
        image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&h=600&fit=crop&auto=format"
        alt="Servicios tecnológicos y laboratorios"
        label="Servicios"
        title="¿Qué Ofrecemos?"
        accent="var(--accent)"
      />
      <div className="max-w-screen-xl mx-auto px-6 pt-12">
        <SectionHeader
          label="Servicios"
          title="¿Qué Ofrecemos?"
          subtitle="Recursos, infraestructura y soporte especializado para potenciar la actividad científica de nuestra comunidad."
          accent="secondary"
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-10">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <ServiceCard {...s} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 rounded-lg p-8 text-center"
          style={{ background: 'var(--surface)', border: '1px solid rgba(40,120,176,0.2)' }}
        >
          <h2 className="font-display font-bold text-xl mb-3" style={{ color: 'var(--fg)' }}>
            ¿Necesitas un servicio específico?
          </h2>
          <p className="font-body text-sm mb-6" style={{ color: 'var(--fg-muted)' }}>
            Contáctanos para explorar cómo podemos apoyar tu proyecto de investigación.
          </p>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(40,120,176,0.3)' }}
            whileTap={{ scale: 0.96 }}
            className="font-display text-xs tracking-widest px-8 py-3 rounded"
            style={{ background: '#a855f7', color: '#fff' }}
          >
            CONTACTAR AL EQUIPO
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
