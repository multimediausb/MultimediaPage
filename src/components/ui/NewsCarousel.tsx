import { useState, useEffect, useCallback } from "react"

import { motion, AnimatePresence } from "framer-motion"

import noticias from "@/data/noticias.json"

const tagColor: Record<string, string> = {
  NUEVO: "#0e9a93",

  LOGRO: "#d6780a",

  PUBLICACIÓN: "#2878b0",

  ABIERTO: "#2e9e6a",

  ALIANZA: "#7c5cbf",
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

export default function NewsCarousel() {
  const [current, setCurrent] = useState(0)

  const [direction, setDirection] = useState(1)

  const [paused, setPaused] = useState(false)

  const total = noticias.length

  const go = useCallback(
    (index: number, dir: number) => {
      setDirection(dir)

      setCurrent((index + total) % total)
    },
    [total],
  )

  const next = useCallback(() => go(current + 1, 1), [current, go])

  const prev = useCallback(() => go(current - 1, -1), [current, go])

  useEffect(() => {
    if (paused) return

    const id = setInterval(next, 5000)

    return () => clearInterval(id)
  }, [paused, next])

  const item = noticias[current]

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),

    center: { x: 0, opacity: 1 },

    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  }

  return (
    <div
      className="rounded-2xl overflow-hidden relative"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--surface-2)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Image area */}
      <div className="relative h-56 md:h-72 overflow-hidden bg-gray-100">
        <AnimatePresence custom={direction} mode="wait">
          <motion.img
            key={item.id}
            src={item.imagen}
            alt={item.titulo}
            className="absolute inset-0 w-full h-full object-cover"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(0,0,0,0.55) 0%, transparent 60%)",
          }}
        />

        {/* Tag */}
        <div className="absolute top-4 left-4">
          <span
            className="font-display text-xs px-3 py-1 rounded-full"
            style={{
              background: tagColor[item.tag] ?? "#0e9a93",

              color: "#fff",

              fontSize: "10px",

              letterSpacing: "0.1em",
            }}
          >
            {item.tag}
          </span>
        </div>

        {/* Category */}
        <div className="absolute bottom-4 left-4">
          <span
            className="font-display text-xs tracking-widest"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            {item.categoria}
          </span>
        </div>

        {/* Nav arrows */}
        {[
          { fn: prev, label: "←", side: "left-3" },

          { fn: next, label: "→", side: "right-3" },
        ].map(({ fn, label, side }) => (
          <button
            key={label}
            onClick={fn}
            className={`absolute top-1/2 -translate-y-1/2 ${side} w-8 h-8 rounded-full flex items-center justify-center font-display text-sm transition-opacity duration-200 opacity-60 hover:opacity-100`}
            style={{
              background: "rgba(0,0,0,0.4)",
              color: "#fff",
              backdropFilter: "blur(4px)",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-5">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={item.id + "-content"}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <p
              className="font-display text-xs mb-2"
              style={{ color: "var(--fg-muted)" }}
            >
              {formatDate(item.fecha)}
            </p>
            <h3
              className="font-body font-semibold text-base leading-snug mb-2"
              style={{ color: "var(--fg)" }}
            >
              {item.titulo}
            </h3>
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "var(--fg-muted)" }}
            >
              {item.resumen}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex items-center gap-1.5 mt-4">
          {noticias.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "20px" : "6px",

                height: "6px",

                background:
                  i === current ? "var(--primary)" : "var(--surface-2)",
              }}
            />
          ))}
          <span
            className="ml-auto font-display text-xs"
            style={{ color: "var(--fg-muted)" }}
          >
            {current + 1} / {total}
          </span>
        </div>
      </div>
    </div>
  )
}
