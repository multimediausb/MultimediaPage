import { useCallback, useMemo, useState } from "react"

import { Bar } from "react-chartjs-2"

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js"

import { motion } from "framer-motion"

import MetricChartModal from "./MetricChartModal"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

export type MetricChartAccent = "primary" | "secondary" | "tertiary"

interface MetricChartCardProps {
  title: string

  value: string

  accent: MetricChartAccent

  data: number[]

  labels?: string[]

  onOpen?: () => void
}

const themeMap: Record<MetricChartAccent, {
  accent: string
  backdrop: string
  surface: string
  border: string
  text: string
}> = {
  primary: {
    accent: "#48c8ca",

    backdrop: "var(--color-primary-900)",

    surface: "#073334",

    border: "rgba(72, 200, 202, 0.28)",

    text: "#d8ffff",
  },

  secondary: {
    accent: "#f6a43b",

    backdrop: "var(--color-secondary-900)",

    surface: "#3d2100",

    border: "rgba(246, 164, 59, 0.3)",

    text: "#fff0d6",
  },

  tertiary: {
    accent: "#58a4d8",

    backdrop: "var(--color-tertiary-900)",

    surface: "#082537",

    border: "rgba(88, 164, 216, 0.3)",

    text: "#e1f1ff",
  },
}

export default function MetricChartCard({
  title,

  value,

  accent,

  data,

  labels = ["2019", "2020", "2021", "2022", "2023", "2024"],

  onOpen,
}: MetricChartCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const theme = themeMap[accent]

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const chartData = useMemo<ChartData<"bar">>(
    () => ({
      labels,

      datasets: [
        {
          data,

          backgroundColor: theme.accent,

          borderRadius: 0,

          borderSkipped: false,

          barPercentage: 0.78,

          categoryPercentage: 0.82,
        },
      ],
    }),

    [data, labels, theme.accent],
  )

  const chartOptions = useMemo<ChartOptions<"bar">>(
    () => ({
      responsive: true,

      maintainAspectRatio: false,

      animation: { duration: 450 },

      plugins: {
        legend: { display: false },

        tooltip: {
          displayColors: false,

          backgroundColor: theme.surface,

          titleColor: theme.text,

          bodyColor: theme.text,

          borderColor: theme.border,

          borderWidth: 1,

          padding: 10,
        },
      },

      scales: {
        x: {
          grid: { display: false },

          ticks: { color: "rgba(255,255,255,0.65)", font: { size: 10 } },

          border: { display: false },
        },

        y: {
          beginAtZero: true,

          grid: { color: "rgba(255,255,255,0.12)" },

          ticks: { color: "rgba(255,255,255,0.65)", font: { size: 10 } },

          border: { display: false },
        },
      },
    }),

    [theme.border, theme.surface, theme.text],
  )

  return (
    <>
      <motion.button
        type="button"
        onClick={() => {
          onOpen?.()
          setIsOpen(true)
        }}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="group relative flex min-h-52 w-full flex-col overflow-hidden rounded-lg border p-3 text-left shadow-sm transition-shadow duration-300 hover:shadow-lg"
        style={{
          background: theme.surface,

          borderColor: theme.border,

          boxShadow: `0 2px 10px ${theme.border}`,
        }}
        aria-label={`Ver gráfico de ${title}`}
      >
        <span
          className="font-display text-[10px] tracking-[0.12em]"
          style={{ color: theme.accent }}
        >
          {title}
        </span>
        <strong
          className="mt-2 font-display text-xl leading-tight"
          style={{ color: theme.text }}
        >
          {value}
        </strong>
        <div className="mt-auto h-24">
          <Bar
            data={chartData}
            options={{
              ...chartOptions,
              plugins: { legend: { display: false } },
            }}
          />
        </div>
        <span
          className="absolute right-3 top-3 text-sm opacity-70 transition-opacity group-hover:opacity-100"
          style={{ color: theme.accent }}
          aria-hidden="true"
        >
          ↗
        </span>
      </motion.button>

      {isOpen && (
        <MetricChartModal
          title={title}
          surface={theme.surface}
          backdrop={theme.backdrop}
          accent={theme.accent}
          border={theme.border}
          text={theme.text}
          chartData={chartData}
          chartOptions={chartOptions}
          onClose={handleClose}
        />
      )}
    </>
  )
}
