import { useEffect } from "react"
import { createPortal } from "react-dom"

import { Bar } from "react-chartjs-2"

import type { ChartData, ChartOptions } from "chart.js"

import { motion } from "framer-motion"

interface MetricChartModalProps {
  title: string

  surface: string

  backdrop: string

  accent: string

  border: string

  text: string

  chartData: ChartData<"bar">

  chartOptions: ChartOptions<"bar">

  onClose: () => void
}

export default function MetricChartModal({
  title,

  surface,

  backdrop,

  accent,

  border,

  text,

  chartData,

  chartOptions,

  onClose,
}: MetricChartModalProps) {
  useEffect(() => {
    const scrollY = window.scrollY

    const previousBodyOverflow = document.body.style.overflow

    const previousBodyPosition = document.body.style.position

    const previousBodyTop = document.body.style.top

    const previousBodyWidth = document.body.style.width

    const previousHtmlOverflow = document.documentElement.style.overflow

    const previousHtmlScrollBehavior =
      document.documentElement.style.scrollBehavior

    document.documentElement.style.overflow = "hidden"

    document.documentElement.style.scrollBehavior = "auto"

    document.body.style.overflow = "hidden"

    document.body.style.position = "fixed"

    document.body.style.top = `-${scrollY}px`

    document.body.style.width = "100%"

    document.body.classList.add("video-modal-open")

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", closeOnEscape)

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow

      document.body.style.overflow = previousBodyOverflow

      document.body.style.position = previousBodyPosition

      document.body.style.top = previousBodyTop

      document.body.style.width = previousBodyWidth

      document.body.classList.remove("video-modal-open")

      window.scrollTo({ top: scrollY, left: 0, behavior: "auto" })

      document.documentElement.style.scrollBehavior = previousHtmlScrollBehavior

      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [onClose])

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm sm:p-8"
      style={{
        backgroundColor: `color-mix(in srgb, ${backdrop} 78%, black)`,
        backgroundImage: `linear-gradient(color-mix(in srgb, ${accent} 15%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, ${accent} 15%, transparent) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Gráfico ampliado de ${title}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-4xl rounded-xl border p-6 shadow-2xl sm:p-8"
        style={{ background: surface, borderColor: border }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border text-xl text-white shadow-lg transition-all duration-200 hover:scale-105"
          style={{
            background: `color-mix(in srgb, ${accent} 92%, black)`,
            borderColor: `color-mix(in srgb, ${accent} 60%, white)`,
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.35)",
          }}
          aria-label="Cerrar gráfico"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <p
          className="font-display text-xs tracking-[0.16em]"
          style={{ color: accent }}
        >
          MÉTRICA CIENTÍFICA
        </p>
        <h3
          className="mt-2 font-display text-2xl font-bold"
          style={{ color: text }}
        >
          {title}
        </h3>
        <p className="mt-1 font-display text-sm" style={{ color: text }}>
          Evolución histórica del indicador
        </p>
        <div className="mt-8 h-[22rem]">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}
