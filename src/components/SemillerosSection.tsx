import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Semillero {
  id: string
  nombre: string
  slogan: string
  descripcion: string
  enfoque: string[]
  icon: string
  color: string
  colorAlt: string
  areas: { label: string; icon: string }[]
  logros: string[]
  formUrl: string
}

const semilleros: Semillero[] = [
  {
    id: 'gamedev',
    nombre: 'GameDev',
    slogan: 'Donde el código se convierte en experiencia',
    descripcion:
      'Semillero de investigación orientado al desarrollo de videojuegos y experiencias de realidad extendida (XR). Exploramos mecánicas de juego, narrativas interactivas y entornos inmersivos como herramientas de comunicación, educación y arte digital.',
    enfoque: ['Videojuegos', 'Realidad Virtual', 'Realidad Aumentada', 'Realidad Mixta'],
    icon: '🎮',
    color: '#0e9a93',
    colorAlt: '#0c7a74',
    areas: [
      { label: 'Game Design', icon: '' },
      { label: 'Unity / Unreal', icon: '' },
      { label: 'XR Development', icon: '' },
      { label: 'Narrative Design', icon: '' },
    ],
    logros: [
      'Prototipo XR para entrenamiento médico',
      'Participación en Global Game Jam 2025',
      'Charla en Colombia Game Devs',
    ],
    formUrl: 'https://forms.office.com',
  },
  {
    id: 'animove',
    nombre: 'AniMove',
    slogan: 'Movimiento, forma y significado',
    descripcion:
      'Espacio de investigación-creación dedicado a la animación 2D y 3D como lenguaje artístico y comunicativo. Trabajamos desde la producción independiente hasta la animación aplicada a proyectos educativos, publicitarios y de patrimonio cultural.',
    enfoque: ['Animación 2D', 'Animación 3D', 'Motion Graphics', 'Stop Motion'],
    icon: '🎬',
    color: '#d6780a',
    colorAlt: '#b06208',
    areas: [
      { label: 'After Effects', icon: '' },
      { label: 'Blender / Maya', icon: '' },
      { label: 'Rigging & VFX', icon: '' },
      { label: 'Storytelling Visual', icon: '' },
    ],
    logros: [
      'Cortometraje seleccionado en festival nacional',
      'Proyecto de animación patrimonial con Mincultura',
      'Taller de motion en MediaShow 2025',
    ],
    formUrl: 'https://forms.office.com',
  },
  {
    id: 'storylab',
    nombre: 'StoryLab',
    slogan: 'Historias sin límites de pantalla',
    descripcion:
      'Laboratorio de narrativas audiovisuales inmersivas. Investigamos el video 360°, la producción transmedia y el streaming como ecosistemas narrativos. Creamos contenidos que rompen la barrera entre espectador y experiencia.',
    enfoque: ['Video 360°', 'Streaming', 'Transmedia', 'Documental Interactivo'],
    icon: '📡',
    color: '#2878b0',
    colorAlt: '#1e5f8e',
    areas: [
      { label: 'Video 360° / VR', icon: '' },
      { label: 'Live Streaming', icon: '' },
      { label: 'Documental', icon: '' },
      { label: 'Narrativa Transmedia', icon: '' },
    ],
    logros: [
      'Cobertura 360° de MediaShow 2025',
      'Capítulo en libro de comunicación digital USB',
      'Alianza con canal universitario nacional',
    ],
    formUrl: 'https://forms.office.com',
  },
]

export default function SemillerosSection() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div>
      {/* Header row */}
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-4 h-px" style={{ background: 'var(--secondary)' }} />
            <span className="font-display text-xs tracking-widest" style={{ color: 'var(--secondary)' }}>
              GRUPOS ACTIVOS
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl md:text-3xl" style={{ color: 'var(--fg)' }}>
            Semilleros de Investigación
          </h2>
          <p className="font-body text-sm mt-2 max-w-xl" style={{ color: 'var(--fg-muted)' }}>
            Grupos de investigación-creación donde estudiantes y docentes exploran las fronteras
            de las tecnologías audiovisuales e interactivas.
          </p>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid md:grid-cols-3 gap-5">
        {semilleros.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{ background: 'var(--surface)', border: `1px solid ${s.color}22` }}
          >
            {/* Color band */}
            <div
              className="h-1 w-full"
              style={{ background: `linear-gradient(90deg, ${s.color}, ${s.colorAlt})` }}
            />

            {/* Card body */}
            <div className="p-6 flex flex-col flex-1">
              {/* Icon + name */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: `${s.color}14`, border: `1px solid ${s.color}30` }}
                >
                  {s.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-base leading-none" style={{ color: s.color }}>
                    {s.nombre}
                  </h3>
                  <p className="font-body text-xs mt-0.5 leading-snug" style={{ color: 'var(--fg-muted)' }}>
                    {s.slogan}
                  </p>
                </div>
              </div>

              {/* Enfoque tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {s.enfoque.map((tag) => (
                  <span
                    key={tag}
                    className="font-display text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: `${s.color}10`,
                      color: s.color,
                      border: `1px solid ${s.color}25`,
                      fontSize: '10px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="font-body text-sm leading-relaxed mb-4" style={{ color: 'var(--fg-muted)' }}>
                {s.descripcion}
              </p>

              {/* Areas */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                {s.areas.map((a) => (
                  <div
                    key={a.label}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{ background: 'var(--surface-2)' }}
                  >
                    <span className="text-sm">{a.icon}</span>
                    <span className="font-display text-xs" style={{ color: 'var(--fg-muted)', fontSize: '10px' }}>
                      {a.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Logros — toggled */}
              <button
                onClick={() => setActive(active === s.id ? null : s.id)}
                className="flex items-center gap-2 font-display text-xs tracking-wider mb-3 transition-colors"
                style={{ color: s.color }}
              >
                <span
                  className="inline-block transition-transform duration-200"
                  style={{ transform: active === s.id ? 'rotate(90deg)' : 'rotate(0deg)' }}
                >
                  ▶
                </span>
                LOGROS RECIENTES
              </button>

              <AnimatePresence>
                {active === s.id && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden mb-4 space-y-1.5"
                  >
                    {s.logros.map((l) => (
                      <li key={l} className="flex items-start gap-2 font-body text-xs" style={{ color: 'var(--fg-muted)' }}>
                        <span className="mt-0.5 shrink-0" style={{ color: s.color }}>◎</span>
                        {l}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              {/* Spacer */}
              <div className="flex-1" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* General CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-8 rounded-2xl p-7 flex flex-col sm:flex-row items-center justify-between gap-6"
        style={{
          background: 'var(--surface)',
          border: '1px solid rgba(14,154,147,0.18)',
          boxShadow: '0 4px 24px rgba(14,154,147,0.06)',
        }}
      >
        <div className="text-center sm:text-left">
          <p className="font-display font-bold text-base" style={{ color: 'var(--fg)' }}>
            ¿Listo para unirte a un semillero?
          </p>
          <p className="font-body text-sm mt-1" style={{ color: 'var(--fg-muted)' }}>
            Abierto a estudiantes de <strong style={{ color: 'var(--fg)' }}>segundo semestre en adelante</strong>.
            Completa el formulario y el equipo se pondrá en contacto.
          </p>
        </div>

        <motion.a
          href="https://forms.office.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(14,154,147,0.35)' }}
          whileTap={{ scale: 0.97 }}
          className="shrink-0 flex items-center gap-2 font-display text-xs tracking-widest px-8 py-4 rounded-xl"
          style={{ background: 'var(--primary)', color: '#fff' }}
        >
          INSCRIBIRME A UN SEMILLERO
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </motion.a>
      </motion.div>
    </div>
  )
}
