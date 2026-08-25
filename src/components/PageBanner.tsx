import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Props {
  image: string
  alt: string
  label: string
  title: string
  accent?: string
}

export default function PageBanner({
  image,
  alt,
  label,
  title,
  accent = 'var(--primary)',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Image moves up slower than scroll — classic parallax
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  // Text drifts up slightly and fades
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden mt-16"
      style={{ height: '35vh', minHeight: '180px', maxHeight: '320px' }}
    >
      {/* Parallax image layer */}
      <motion.div
        className="absolute inset-0 w-full will-change-transform"
        style={{ y, height: '140%', top: '-20%' }}
      >
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark scrim — stronger at bottom for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.72) 100%)',
        }}
      />

      {/* Tinted color wash from the accent */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${accent}22 0%, transparent 60%)`,
        }}
      />

      {/* Text */}
      <motion.div
        style={{ y: textY, opacity }}
        className="absolute inset-0 flex flex-col justify-end px-6 pb-7 max-w-screen-xl mx-auto left-0 right-0"
      >
        <span
          className="font-display text-xs tracking-[0.2em] mb-2 block"
          style={{ color: accent }}
        >
          {label.toUpperCase()}
        </span>
        <h1
          className="font-display font-bold text-3xl md:text-4xl leading-tight"
          style={{ color: '#fff', textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}
        >
          {title}
        </h1>
      </motion.div>

      {/* Bottom border accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          opacity: 0.6,
        }}
      />
    </div>
  )
}
