import { motion } from "framer-motion"

export type NewsCardVariant = "primary-dark" | "secondary-dark" | "primary-light" | "secondary-light"

export interface NewsCardProps {
  image: string

  imageAlt?: string

  tag: string

  date: string

  category: string

  title: string

  summary: string

  index?: number

  variant?: NewsCardVariant
}

interface NewsCardTheme {
  accent: string

  surface: string

  border: string

  text: string

  mutedText: string

  tagText: string
  overlay: string
  hoverShadow?: string
}

const themes: Record<NewsCardVariant, NewsCardTheme> = {
  "primary-dark": {
    accent: "var(--color-primary-500)",

    surface: "var(--color-primary-900)",

    border: "color-mix(in srgb, var(--color-primary-500) 32%, transparent)",

    text: "var(--color-neutral-100)",

    mutedText: "var(--color-neutral-300)",

    tagText: "var(--color-primary-900)",

    overlay:
      "linear-gradient(180deg, transparent, color-mix(in srgb, var(--color-primary-900) 78%, transparent))",
    hoverShadow:
      "0 5px 12px color-mix(in srgb, var(--color-primary-500) 18%, transparent)",
  },

  "secondary-dark": {
    accent: "var(--color-secondary-500)",

    surface: "var(--color-secondary-900)",

    border: "color-mix(in srgb, var(--color-secondary-500) 34%, transparent)",

    text: "var(--color-neutral-100)",

    mutedText: "var(--color-neutral-300)",

    tagText: "var(--color-secondary-900)",

    overlay:
      "linear-gradient(180deg, transparent, color-mix(in srgb, var(--color-secondary-900) 78%, transparent))",
    hoverShadow:
      "0 5px 12px color-mix(in srgb, var(--color-secondary-500) 18%, transparent)",
  },

  "primary-light": {
    accent: "var(--color-primary-500)",
    surface: "#ffffff",
    border: "var(--color-primary-500)",

    text: "var(--color-primary-900)",

    mutedText: "var(--color-neutral-700)",

    tagText: "var(--color-neutral-100)",

    overlay:
      "linear-gradient(180deg, transparent, color-mix(in srgb, var(--color-primary-900) 64%, transparent))",
    hoverShadow:
      "0 5px 12px color-mix(in srgb, var(--color-primary-500) 18%, transparent)",
  },

  "secondary-light": {
    accent: "var(--color-secondary-500)",
    surface: "#ffffff",
    border: "var(--color-secondary-500)",

    text: "var(--color-secondary-900)",

    mutedText: "var(--color-neutral-700)",

    tagText: "var(--color-neutral-100)",

    overlay:
      "linear-gradient(180deg, transparent, color-mix(in srgb, var(--color-secondary-900) 64%, transparent))",
    hoverShadow:
      "0 5px 12px color-mix(in srgb, var(--color-secondary-500) 18%, transparent)",
  },
}

export default function NewsCard({
  image,

  imageAlt = "",

  tag,

  date,

  category,

  title,

  summary,

  index = 0,

  variant = "primary-dark",
}: NewsCardProps) {
  const theme = themes[variant]

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
whileHover={{
  y: -4,
  ...(theme.hoverShadow ? { boxShadow: theme.hoverShadow } : {}),
  transition: {
    duration: 0.15,
    ease: "easeOut",
  },
}}
      className="group overflow-hidden rounded-xl border transition-shadow duration-300"
      style={{
        background: theme.surface,

        borderColor: theme.border,

        boxShadow: "none",
      }}
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{ background: theme.overlay }}
        />
        <span
          className="absolute left-4 top-4 rounded px-2 py-1 font-display text-[10px] tracking-[0.12em]"
          style={{
            background: theme.accent,

            color: theme.tagText,
          }}
        >
          {tag}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span
            className="font-display text-[10px] uppercase tracking-widest"
            style={{ color: theme.accent }}
          >
            {date}
          </span>
          <span
            className="font-display text-[10px] uppercase tracking-widest"
            style={{ color: theme.mutedText }}
          >
            {category}
          </span>
        </div>
        <h3
          className="mt-4 font-heading text-sm leading-relaxed"
          style={{ color: theme.text }}
        >
          {title}
        </h3>
        <p
          className="mt-3 line-clamp-3 font-body text-sm leading-relaxed"
          style={{ color: theme.mutedText }}
        >
          {summary}
        </p>
      </div>
    </motion.article>
  )
}
