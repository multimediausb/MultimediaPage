import { motion } from "framer-motion"

import type { NewsCardVariant } from "./NewsCard"

export interface EventCardProps {
  image: string

  imageAlt?: string

  title: string

  date: string

  location: string

  summary?: string

  index?: number

  variant?: NewsCardVariant
}

interface EventCardTheme {
  accent: string

  surface: string

  border: string

  text: string

  mutedText: string
}

const themes: Record<NewsCardVariant, EventCardTheme> = {
  "primary-dark": {
    accent: "var(--color-primary-500)",

    surface: "var(--color-primary-900)",

    border: "color-mix(in srgb, var(--color-primary-500) 34%, transparent)",

    text: "var(--color-neutral-100)",

    mutedText: "var(--color-neutral-300)",
  },

  "secondary-dark": {
    accent: "var(--color-secondary-500)",

    surface: "var(--color-secondary-900)",

    border: "color-mix(in srgb, var(--color-secondary-500) 34%, transparent)",

    text: "var(--color-neutral-100)",

    mutedText: "var(--color-neutral-300)",
  },

  "primary-light": {
    accent: "var(--color-primary-500)",

    surface: "#ffffff",

    border: "var(--color-primary-500)",

    text: "var(--color-primary-900)",

    mutedText: "var(--color-neutral-700)",
  },

  "secondary-light": {
    accent: "var(--color-secondary-500)",

    surface: "#ffffff",

    border: "var(--color-secondary-500)",

    text: "var(--color-secondary-900)",

    mutedText: "var(--color-neutral-700)",
  },
}

export default function EventCard({
  image,

  imageAlt = "",

  title,

  date,

  location,

  summary,

  index = 0,

  variant = "primary-light",
}: EventCardProps) {
  const theme = themes[variant]

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{
        y: -4,

        boxShadow: `0 8px 18px color-mix(in srgb, ${theme.accent} 18%, transparent)`,
      }}
      className="group grid min-h-36 overflow-hidden rounded-lg border transition-shadow duration-300 sm:grid-cols-[minmax(0,1fr)_8.375rem]"
      style={{
        background: theme.surface,

        borderColor: theme.border,

        boxShadow: "none",
      }}
    >
      <div className="flex min-w-0 flex-col justify-center gap-2 px-3 py-2">
        <div>
          <h3
            className="font-display text-base font-medium leading-tight"
            style={{ color: theme.text }}
          >
            {title}
          </h3>
          {summary && (
            <p
              className="line-clamp-2 font-display text-[9px] leading-3"
              style={{ color: theme.mutedText }}
            >
              {summary}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-start gap-1">
            <span className="mt-px shrink-0" style={{ color: theme.text }}>
              <ClockIcon />
            </span>
            <p
              className="font-display text-[9px] leading-3"
              style={{ color: theme.text }}
            >
              {date}
            </p>
          </div>
          <div className="flex items-start gap-1">
            <span className="mt-px shrink-0" style={{ color: theme.text }}>
              <LocationIcon />
            </span>
            <p
              className="line-clamp-2 font-display text-[9px] leading-3"
              style={{ color: theme.text }}
            >
              {location}
            </p>
          </div>
          <a
            href="/eventos"
            className="inline-flex px-2 py-1 font-display text-[9px] leading-3 transition-colors hover:underline"
            style={{ color: theme.accent }}
          >
            Enlace al proyecto
          </a>
        </div>
      </div>

      <div className="relative min-h-32 overflow-hidden sm:min-h-0">
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, ${theme.surface} 0%, transparent 36%)`,

            opacity: 0.45,
          }}
        />
      </div>
    </motion.article>
  )
}

function ClockIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l2.5 2" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
    </svg>
  )
}
