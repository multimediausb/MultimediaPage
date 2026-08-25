import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import PageBanner from '../components/PageBanner'
import VideoReel from '../components/VideoReel'
import pdfSrc from '@/imports/Media_Show_2023-1.pdf'

const TARGET = new Date('2026-09-16T09:00:00')

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now())
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }
  const [t, setT] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

const schedule = [
  { time: '09:00', title: 'Apertura y bienvenida', speaker: 'Dirección del Centro' },
  { time: '09:30', title: 'Keynote: IA Generativa en Investigación', speaker: 'Dr. Andrés Ramírez Torres' },
  { time: '11:00', title: 'Panel: Ética y regulación de sistemas inteligentes', speaker: 'Mesa redonda — 4 panelistas' },
  { time: '13:00', title: 'Almuerzo de networking', speaker: '' },
  { time: '14:30', title: 'Presentación de proyectos estudiantiles', speaker: 'Grupos de investigación junior' },
  { time: '16:00', title: 'Workshop: Implementación de modelos en producción', speaker: 'Dra. Yoshua Bengio (virtual)' },
  { time: '18:00', title: 'Clausura y reconocimientos', speaker: 'Dirección del Centro' },
]

export default function ProximoEvento() {
  const { days, hours, minutes, seconds } = useCountdown(TARGET)

  return (
    <div className="min-h-screen pb-20">
      <PageBanner
        image="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&h=600&fit=crop&auto=format"
        alt="Próximo evento académico"
        label="Próximo Evento"
        title="Simposio Internacional de IA Aplicada"
        accent="#f59e0b"
      />
      <div className="max-w-screen-xl mx-auto px-6 pt-12">
        <SectionHeader
          label="Próximo Evento"
          title="Media Show 2026-2: XXXXX"
          subtitle="16 de Septiembre 2026 — Univercidad San buenaventiura Bogota, Colombia"
          accent="accent"
        />

        {/* Countdown */}
        <div className="mt-12 grid grid-cols-4 gap-4 max-w-lg">
          {[
            { value: days, label: 'DÍAS' },
            { value: hours, label: 'HORAS' },
            { value: minutes, label: 'MIN' },
            { value: seconds, label: 'SEG' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="rounded-lg p-4 text-center"
              style={{ background: 'var(--surface)', border: '1px solid rgba(245,158,11,0.2)' }}
            >
              <motion.div
                key={value}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-display font-bold text-3xl"
                style={{ color: '#f59e0b', textShadow: '0 0 20px rgba(245,158,11,0.4)' }}
              >
                {String(value).padStart(2, '0')}
              </motion.div>
              <div className="font-display text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        
        {/* ── Video Reel ─────────────────────────────────── */}
      <section className="py-16" style={{ borderTop: '1px solid rgba(14,154,147,0.08)' }}>
        <div className="max-w-screen-xl mx-auto px-6">
          <VideoReel
            videoId="0gQwwXwgSUs"
            title="Segunda Creación Colectiva"
            description="Ya puedes conocer la segunda creación colectiva del USB Medialab, un espacio donde los estudiantes de Ingeniería Multimedia desarrollan contenido multimedia innovador. En esta edición presentan una animación digital con reconocidos personajes de Cartoon Network bailando y cantando la canción “Thrift Shop”, demostrando su creatividad, talento y habilidades en producción audiovisual."
          />
        </div>
      </section>

        {/* Event info */}
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm tracking-widest mb-6" style={{ color: 'var(--primary)' }}>
              PROGRAMA DEL DÍA
            </h3>
            <div className="space-y-0">
              <h6 className="font-display text-sm tracking-widest mb-6" style={{ color: 'var(--secondary)' }}>
              Proximamente
            </h6>
              {schedule.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-4 py-4 relative"
                  style={{ borderBottom: '1px solid rgba(14,154,147,0.08)' }}
                >
                  <div
                    className="font-display text-xs w-12 shrink-0 pt-0.5"
                    style={{ color: '#f59e0b' }}
                  >
                    {item.time}
                  </div>
                  <div className="w-px self-stretch shrink-0" style={{ background: 'rgba(14,154,147,0.2)' }} />
                  <div>
                    <p className="font-body text-sm" style={{ color: 'var(--fg)' }}>{item.title}</p>
                    {item.speaker && (
                      <p className="font-display text-xs mt-0.5" style={{ color: 'var(--fg-muted)' }}>{item.speaker}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Register */}
          <div
            className="rounded-lg p-6 h-fit sticky top-24"
            style={{ background: 'var(--surface)', border: '1px solid rgba(245,158,11,0.2)' }}
          >
            <h3 className="font-display text-sm tracking-widest mb-4" style={{ color: '#f59e0b' }}>
              INSCRIPCIÓN
            </h3>
            <div className="space-y-3 mb-6">
              {[
                { label: 'Modalidad', value: 'Presencial + Virtual' },
                { label: 'Cupos', value: '200 presenciales' },
                { label: 'Costo', value: 'Gratuito — previa inscripción' },
                { label: 'Idioma', value: 'Español / Inglés' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-display text-xs" style={{ color: 'var(--fg-muted)' }}>{label}</p>
                  <p className="font-body text-sm" style={{ color: 'var(--fg)' }}>{value}</p>
                </div>
              ))}
            </div>

              <div className="space-y-3 mb-6">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(245,158,11,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="w-full font-display text-xs tracking-widest py-3 rounded"
              style={{ background: 'var(--secondary)', color: 'var(--bg)' }}
            >
              INSCRIBIRME AHORA
            </motion.button>
            
            <motion.a
              href={pdfSrc}
              download="Media_Show_2023-1.pdf"
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(245,158,11,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="w-full font-display text-xs tracking-widest py-3 rounded flex items-center justify-center gap-2"
              style={{ border: '2px solid var(--secondary)', color: 'var(--secondary)', textDecoration: 'none' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              REQUERIMIENTOS
            </motion.a>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
