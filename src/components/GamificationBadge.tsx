import { motion } from 'framer-motion'
import { useState } from 'react'

interface Props {
  icon: string
  label: string
  description: string
  unlocked?: boolean
  xp?: number
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'
}

const rarityColor = { common: '#6b6358', rare: '#0e9a93', epic: '#2878b0', legendary: '#d6780a' }
const rarityGlow  = { common: 'rgba(107,99,88,0.25)', rare: 'rgba(14,154,147,0.35)', epic: 'rgba(40,120,176,0.35)', legendary: 'rgba(214,120,10,0.4)' }

export default function GamificationBadge({ icon, label, description, unlocked = false, xp = 0, rarity = 'common' }: Props) {
  const [hovered, setHovered] = useState(false)
  const color = rarityColor[rarity]

  return (
    <motion.div
      className="relative flex flex-col items-center cursor-default"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        animate={unlocked && hovered ? { scale: 1.12, rotate: [0, -3, 3, 0] } : { scale: 1, rotate: 0 }}
        transition={{ duration: 0.35 }}
        className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl relative"
        style={{
          background: unlocked ? `${color}15` : 'var(--surface-2)',
          border: `2px solid ${unlocked ? color : 'var(--surface-2)'}`,
          boxShadow: unlocked && hovered ? `0 0 20px ${rarityGlow[rarity]}` : 'none',
          filter: unlocked ? 'none' : 'grayscale(1) brightness(0.85)',
          opacity: unlocked ? 1 : 0.55,
        }}
      >
        {icon}
        {unlocked && (
          <div className="absolute inset-0 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)' }} />
        )}
        {!unlocked && (
          <div className="absolute inset-0 rounded-xl flex items-center justify-center text-sm" style={{ color: 'var(--fg-muted)' }}>
            🔒
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 4, scale: 0.92 }}
        animate={hovered ? { opacity: 1, y: -8, scale: 1 } : { opacity: 0, y: 4, scale: 0.92 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-full mb-2 z-20 pointer-events-none rounded-lg px-3 py-2 w-44 text-center"
        style={{ background: 'var(--surface)', border: `1px solid ${color}30`, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
      >
        <p className="font-display text-xs font-semibold mb-0.5" style={{ color }}>{label}</p>
        <p className="font-body text-xs" style={{ color: 'var(--fg-muted)' }}>{description}</p>
        {xp > 0 && <p className="font-display text-xs mt-1" style={{ color: '#d6780a' }}>+{xp} XP</p>}
        <span className="font-display uppercase" style={{ color: rarityColor[rarity], fontSize: '9px', letterSpacing: '0.1em' }}>
          {rarity}
        </span>
      </motion.div>

      <p className="font-display text-xs mt-2 text-center" style={{ color: unlocked ? color : 'var(--fg-muted)', fontSize: '10px' }}>
        {label}
      </p>
    </motion.div>
  )
}
