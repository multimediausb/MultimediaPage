import { useEffect, useRef, useState } from "react"

import { useInView } from "framer-motion"

interface Props {
  value: number

  label: string

  prefix?: string

  suffix?: string

  accent?: "primary" | "secondary" | "accent"

  duration?: number
}

const accentMap = {
  primary: "#0e9a93",
  secondary: "#d6780a",
  accent: "#2878b0",
}

export default function AnimatedCounter({
  value,
  label,
  prefix = "",
  suffix = "",
  accent = "primary",
  duration = 1800,
}: Props) {
  const [count, setCount] = useState(0)

  const ref = useRef<HTMLDivElement>(null)

  const inView = useInView(ref, { once: true, margin: "-60px" })

  const color = accentMap[accent]

  useEffect(() => {
    if (!inView) return

    let start: number

    const step = (timestamp: number) => {
      if (!start) start = timestamp

      const progress = Math.min((timestamp - start) / duration, 1)

      const eased = 1 - Math.pow(1 - progress, 3)

      setCount(Math.floor(eased * value))

      if (progress < 1) requestAnimationFrame(step)
      else setCount(value)
    }

    requestAnimationFrame(step)
  }, [inView, value, duration])

  return (
    <div ref={ref} className="text-center">
      <div
        className="font-display font-bold text-3xl tracking-tight"
        style={{ color }}
      >
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <p
        className="font-display text-xs tracking-widest mt-1"
        style={{ color: "var(--fg-muted)" }}
      >
        {label.toUpperCase()}
      </p>
    </div>
  )
}
