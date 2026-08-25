import { motion } from 'framer-motion'

interface Props {
  id: string
  title: string
  area: string
  lead: string
  year: number
  status: 'activo' | 'concluido' | 'en-revision'
  tags: string[]
}

const statusColor: Record<Props['status'], string> = {
  activo: '#0e9a93',
  concluido: '#2878b0',
  'en-revision': '#d6780a',
}

export default function ResearchCard({ id, title, area, lead, year, status, tags }: Props) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(14,154,147,0.12)' }}
      transition={{ duration: 0.2 }}
      className="relative rounded-xl p-5 cursor-default overflow-hidden"
      style={{ background: 'var(--surface)', border: '1px solid var(--surface-2)' }}
    >
      <div
        className="absolute top-0 right-0 w-16 h-16 opacity-20"
        style={{ background: `radial-gradient(circle at top right, ${statusColor[status]}, transparent 70%)` }}
      />

      <div className="flex items-start justify-between mb-3">
        <span className="font-display text-xs tracking-widest" style={{ color: 'var(--fg-muted)' }}>
          #{id}
        </span>
        <span
          className="font-display text-xs px-2 py-0.5 rounded-full"
          style={{
            color: statusColor[status],
            background: `${statusColor[status]}18`,
            border: `1px solid ${statusColor[status]}40`,
          }}
        >
          {status.toUpperCase()}
        </span>
      </div>

      <h3 className="font-body font-semibold text-sm mb-1 leading-snug" style={{ color: 'var(--fg)' }}>
        {title}
      </h3>
      <p className="font-display text-xs mb-3" style={{ color: 'var(--primary)' }}>
        {area}
      </p>

      <div className="flex items-center justify-between text-xs font-display" style={{ color: 'var(--fg-muted)' }}>
        <span>{lead}</span>
        <span>{year}</span>
      </div>

      <div className="flex flex-wrap gap-1 mt-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-display text-xs px-2 py-0.5 rounded"
            style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid rgba(40,120,176,0.2)' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
