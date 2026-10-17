import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export interface CountdownTimerProps {
  targetDate: Date
  accentColor?: string
  className?: string
}

export default function CountdownTimer({
  targetDate,
  accentColor = "var(--color-secondary-500)",
  className = "",
}: CountdownTimerProps) {
  const calculateTimeLeft = () => {
    const diff = Math.max(0, targetDate.getTime() - Date.now())
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const timeBlocks = [
    { value: timeLeft.days, label: "DÍAS" },
    { value: timeLeft.hours, label: "HORAS" },
    { value: timeLeft.minutes, label: "MIN" },
    { value: timeLeft.seconds, label: "SEG" },
  ]

  return (
    <div className={`grid grid-cols-4 gap-3 sm:gap-4 max-w-lg ${className}`}>
      {timeBlocks.map(({ value, label }) => (
        <div
          key={label}
          className="text-center p-3 sm:p-4 rounded-xl relative overflow-hidden"
          style={{
            background: "var(--surface)",
            border: `var(--stroke-s) solid var(--color-neutral-200)`,
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-card-normal)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: accentColor }}
          />
          <motion.div
            key={value}
            initial={{ y: -6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-h4 sm:text-h3 font-heading leading-none mb-1.5"
            style={{
              color: accentColor,
              textShadow: "0 0 16px var(--color-secondary-alpha-50)",
            }}
          >
            {String(value).padStart(2, "0")}
          </motion.div>
          <div
            className="text-b4 font-display uppercase tracking-widest"
            style={{ color: "var(--color-neutral-500)" }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  )
}
