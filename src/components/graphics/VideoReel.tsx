import { useEffect, useState } from "react"

import { motion } from "framer-motion"
import { createPortal } from "react-dom"

interface Props {
  videoId?: string
  title?: string
  description?: string
  onOpen?: () => void
  showDetails?: boolean
}

export default function VideoReel({
  videoId = "0gQwwXwgSUs",
  title = "MediaShow en Acción",
  description = "Conoce el trabajo del Programa de Ingeniería Multimedia — proyectos, investigaciones y experiencias interactivas que definen la frontera entre tecnología y creatividad.",
  onOpen,
  showDetails = true,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`

  useEffect(() => {
    if (!isOpen) {
      return
    }

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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
      document.body.style.position = previousBodyPosition
      document.body.style.top = previousBodyTop
      document.body.style.width = previousBodyWidth
      document.body.classList.remove("video-modal-open")
      window.scrollTo({ top: scrollY, left: 0, behavior: "auto" })
      document.documentElement.style.scrollBehavior = previousHtmlScrollBehavior
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className="relative">
      {/* Decorative background accent */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-30 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(14,154,147,0.08) 0%, rgba(214,120,10,0.08) 100%)",
        }}
      />

      <div
        className={`relative ${
          showDetails ? "grid items-center gap-10 lg:grid-cols-2" : ""
        }`}
      >
        {/* Video side */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className={`relative overflow-hidden rounded-2xl ${
            showDetails ? "" : "mx-auto w-full"
          }`}
          style={{
            aspectRatio: "16/9",
            background: "#000",
            border: "1px solid var(--surface-2)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
          }}
        >
          <img
            src={thumbUrl}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
            }}
          />

          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.35)" }}
          />

          <motion.button
            onClick={() => {
              onOpen?.()
              setIsOpen(true)
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            aria-label="Abrir video"
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                background: "var(--secondary)",
                boxShadow: "0 0 32px rgba(214,120,10,0.5)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span
              className="font-display text-xs tracking-widest"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              VER AHORA
            </span>
          </motion.button>

          <div
            className="absolute bottom-3 right-3 rounded px-2 py-0.5 font-display text-xs"
            style={{
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              backdropFilter: "blur(4px)",
            }}
          >
            YouTube
          </div>
        </motion.div>

        {showDetails && (
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div
                className="h-px w-4"
                style={{ background: "var(--secondary)" }}
              />
              <span
                className="font-display text-xs tracking-widest"
                style={{ color: "var(--secondary)" }}
              >
                VIDEO REEL
              </span>
            </div>

            <h2
              className="mb-4 font-display text-2xl font-bold leading-tight md:text-3xl"
              style={{ color: "var(--fg)" }}
            >
              {title}
            </h2>

            <p
              className="mb-6 font-body text-sm leading-relaxed"
              style={{ color: "var(--fg-muted)" }}
            >
              {description}
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                "Proyectos estudiantiles",
                "Investigación aplicada",
                "Innovación tecnológica",
              ].map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-2 rounded-full px-3 py-1.5 font-display text-xs"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--surface-2)",
                    color: "var(--fg-muted)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {createPortal(
        <motion.div
          initial={false}
          animate={{
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "auto" : "none",
          }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false)
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 20 }}
            animate={{
              scale: isOpen ? 1 : 0.88,
              opacity: isOpen ? 1 : 0,
              y: isOpen ? 0 : 20,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-6xl overflow-hidden rounded-xl border border-white/15 bg-black shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border text-xl text-white shadow-lg transition-all duration-200 hover:scale-105"
              style={{
                background:
                  "color-mix(in srgb, var(--color-primary-500) 92%, black)",
                borderColor:
                  "color-mix(in srgb, var(--color-primary-300) 60%, white)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.35)",
              }}
              aria-label="Cerrar video"
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
            <div className="aspect-video">
              {isOpen && (
                <iframe
                  src={embedUrl}
                  title={title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </motion.div>
        </motion.div>,
        document.body,
      )}
    </div>
  )
}
