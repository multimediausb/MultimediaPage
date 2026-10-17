import { useState } from "react"

import { motion } from "framer-motion"

interface Props {
  videoId?: string

  title?: string

  description?: string
}

export default function VideoReel({
  videoId = "0gQwwXwgSUs",

  title = "MediaShow en Acción",

  description = "Conoce el trabajo del Programa de Ingeniería Multimedia — proyectos, investigaciones y experiencias interactivas que definen la frontera entre tecnología y creatividad.",
}: Props) {
  const [playing, setPlaying] = useState(false)

  const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`

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

      <div className="relative grid lg:grid-cols-2 gap-10 items-center">
        {/* Video side */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            aspectRatio: "16/9",

            background: "#000",

            border: "1px solid var(--surface-2)",

            boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
          }}
        >
          {playing ? (
            <iframe
              src={embedUrl}
              title={title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              {/* Thumbnail */}
              <img
                src={thumbUrl}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to hqdefault if maxresdefault not available

                  ;(e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                }}
              />

              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{ background: "rgba(0,0,0,0.35)" }}
              />

              {/* Play button */}
              <motion.button
                onClick={() => setPlaying(true)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                aria-label="Reproducir video"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "var(--secondary)",

                    boxShadow: "0 0 32px rgba(214,120,10,0.5)",
                  }}
                >
                  {/* Triangle play icon */}
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

              {/* Duration badge */}
              <div
                className="absolute bottom-3 right-3 font-display text-xs px-2 py-0.5 rounded"
                style={{
                  background: "rgba(0,0,0,0.6)",

                  color: "#fff",

                  backdropFilter: "blur(4px)",
                }}
              >
                YouTube
              </div>
            </>
          )}
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-4 h-px"
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
            className="font-display font-bold text-2xl md:text-3xl leading-tight mb-4"
            style={{ color: "var(--fg)" }}
          >
            {title}
          </h2>

          <p
            className="font-body text-sm leading-relaxed mb-6"
            style={{ color: "var(--fg-muted)" }}
          >
            {description}
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              { icon: "", label: "Proyectos estudiantiles" },

              { icon: "", label: "Investigación aplicada" },

              { icon: "", label: "Innovación tecnológica" },
            ].map((tag) => (
              <span
                key={tag.label}
                className="flex items-center gap-2 font-display text-xs px-3 py-1.5 rounded-full"
                style={{
                  background: "var(--surface)",

                  border: "1px solid var(--surface-2)",

                  color: "var(--fg-muted)",
                }}
              >
                {tag.icon} {tag.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
