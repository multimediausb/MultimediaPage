import { motion } from 'framer-motion'

interface Props {
  platform: string
  handle: string
  followers: string
  description: string
  icon: string
  url?: string
  color?: string
}

export default function MediaCard({ platform, handle, followers, description, icon, url, color = '#0e9a93' }: Props) {
  return (
    <motion.a
      href={url ?? '#'}
      target={url ? '_blank' : undefined}
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02, boxShadow: `0 8px 28px ${color}18` }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.18 }}
      className="rounded-xl p-5 block relative overflow-hidden"
      style={{ background: 'var(--surface)', border: `1px solid ${color}20` }}
    >
      <div
        className="absolute top-0 left-0 w-full h-0.5"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
          style={{ background: `${color}12`, border: `1px solid ${color}22` }}
        >
          {icon}
        </div>
        <span className="font-display text-xs" style={{ color: 'var(--fg-muted)' }}>
          {followers} seguidores
        </span>
      </div>
      <h3 className="font-display font-semibold text-sm mb-0.5" style={{ color }}>{platform}</h3>
      <p className="font-display text-xs mb-3" style={{ color: 'var(--fg-muted)' }}>@{handle}</p>
      <p className="font-body text-sm" style={{ color: 'var(--fg-muted)' }}>{description}</p>
    </motion.a>
  )
}
