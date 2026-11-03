import SectionHeader from "../../ui/SectionHeader"
import NewsStatCard from "../../ui/NewsStatCard"

import { useParallax } from "@/hooks/useParallax"

const newsStats = [
  {
    label: "Convocatorias abiertas",
    value: "2 activas",
    accent: "var(--color-primary-500)",
    backgroundColor: "var(--color-primary-alpha-50)",
    borderColor: "var(--color-primary-900)",
  },
  {
    label: "Logros recientes",
    value: "3 este semestre",
    accent: "var(--color-secondary-500)",
    backgroundColor: "var(--color-secondary-alpha-50)",
    borderColor: "var(--color-secondary-900)",
  },
  {
    label: "Publicaciones indexadas",
    value: "8 en 2025",
    accent: "var(--color-primary-500)",
    backgroundColor: "var(--color-primary-alpha-50)",
    borderColor: "var(--color-primary-900)",
  },
]

export default function NewsStatsSection() {
  const cardsRef = useParallax<HTMLDivElement>(0.08, "up")

  return (
    <section
      className="relative overflow-hidden py-20 theme-light grid-primary grid-bg section-transition"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--fg)",
        borderTop:
          "1px solid color-mix(in srgb, var(--color-primary-500) 20%, transparent)",
        borderBottom:
          "1px solid color-mix(in srgb, var(--color-primary-500) 20%, transparent)",
      }}
      aria-labelledby="news-stats-title"
    >
      <div className="relative z-10 mx-auto max-w-screen-xl px-2">

        <div
          ref={cardsRef}
          id="news-stats-title"
          className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3"
        >
          {newsStats.map((item, index) => (
            <NewsStatCard
              key={item.label}
              label={item.label}
              value={item.value}
              accent={item.accent}
              backgroundColor={item.backgroundColor}
              borderColor={item.borderColor}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
