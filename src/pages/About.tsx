import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import AnimatedCounter from '../components/AnimatedCounter'
import PageBanner from '../components/PageBanner'

const values = [
  { icon: '⚗️', title: 'Rigor Científico', desc: 'Cada afirmación respaldada por evidencia y metodología reproducible.' },
  { icon: '🤝', title: 'Colaboración', desc: 'La ciencia se hace en comunidad. Fomentamos alianzas locales e internacionales.' },
  { icon: '🌱', title: 'Sostenibilidad', desc: 'Investigación con impacto positivo para el medio ambiente y la sociedad.' },
  { icon: '🔓', title: 'Ciencia Abierta', desc: 'Comprometidos con el acceso libre al conocimiento y datos abiertos.' },
]

const timeline = [
  { year: '1998', text: 'Fundación del Centro de Investigación como unidad académica independiente.' },
  { year: '2004', text: 'Primera acreditación internacional y firma de convenio con MIT Media Lab.' },
  { year: '2010', text: 'Apertura del Laboratorio de Computación Científica y primer doctorado propio.' },
  { year: '2016', text: 'Incorporación al consorcio LATAM Research Alliance — 18 universidades.' },
  { year: '2020', text: 'Digitalización total de archivos y lanzamiento de plataforma open access.' },
  { year: '2024', text: 'Reconocimiento como Centro de Excelencia por el Consejo Nacional de Ciencia.' },
]

export default function About() {
  return (
    <div className="min-h-screen pb-20">
      <PageBanner
        image="https://images.unsplash.com/photo-1541178735493-479c1a27ed24?w=1600&h=600&fit=crop&auto=format"
        alt="Laboratorio universitario de investigación"
        label="Nosotros"
        title="Acerca del Centro"
        accent="var(--primary)"
      />
      <div className="max-w-screen-xl mx-auto px-6 pt-12">
        <SectionHeader
          label="Nosotros"
          title="Acerca del Centro"
          subtitle="Más de 25 años formando investigadores y generando conocimiento que impacta a la región."
          accent="primary"
        />

        {/* Mission / Vision */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {[
            { label: 'MISIÓN', color: 'var(--primary)', text: 'Producir conocimiento científico de excelencia mediante investigación interdisciplinaria, formar investigadores con visión crítica y comprometidos con el desarrollo sostenible de la sociedad.' },
            { label: 'VISIÓN', color: 'var(--accent)', text: 'Ser el centro de investigación de referencia en Latinoamérica al 2030, reconocido por su impacto científico, su vinculación con la sociedad y su compromiso con la ciencia abierta.' },
          ].map(({ label, color, text }) => (
            <div
              key={label}
              className="rounded-lg p-6"
              style={{ background: 'var(--surface)', border: `1px solid ${color}20` }}
            >
              <div
                className="font-display text-xs tracking-widest mb-3"
                style={{ color }}
              >
                {label}
              </div>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mt-16">
          <SectionHeader label="Valores" title="Lo Que Nos Define" accent="accent" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-lg p-5"
                style={{ background: 'var(--surface)', border: '1px solid rgba(245,158,11,0.1)' }}
              >
                <div className="text-2xl mb-3">{v.icon}</div>
                <h3 className="font-display text-sm font-semibold mb-2" style={{ color: 'var(--fg)' }}>{v.title}</h3>
                <p className="font-body text-xs leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-16">
          <SectionHeader label="Historia" title="Nuestra Trayectoria" accent="secondary" />
          <div className="mt-8 space-y-0">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-6 py-5"
                style={{ borderBottom: '1px solid rgba(14,154,147,0.08)' }}
              >
                <div
                  className="font-display font-bold text-sm w-12 shrink-0"
                  style={{ color: 'var(--primary)' }}
                >
                  {t.year}
                </div>
                <div className="w-px self-stretch shrink-0 relative">
                  <div className="absolute inset-0" style={{ background: 'rgba(14,154,147,0.2)' }} />
                  <div className="absolute top-1.5 -left-1 w-2 h-2 rounded-full" style={{ background: 'var(--primary)' }} />
                </div>
                <p className="font-body text-sm leading-relaxed pt-0.5" style={{ color: 'var(--fg-muted)' }}>
                  {t.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div
          className="mt-16 rounded-lg p-10 grid grid-cols-2 lg:grid-cols-4 gap-8"
          style={{ background: 'var(--surface)', border: '1px solid rgba(14,154,147,0.1)' }}
        >
          <AnimatedCounter value={25} label="Años de historia" suffix="+" accent="primary" />
          <AnimatedCounter value={40} label="Convenios internacionales" accent="secondary" />
          <AnimatedCounter value={15} label="Grupos de investigación" accent="accent" />
          <AnimatedCounter value={7} label="Laboratorios especializados" accent="primary" />
        </div>
      </div>
    </div>
  )
}
