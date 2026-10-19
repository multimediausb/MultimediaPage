
import { motion } from "framer-motion"

import HeroScene from "../../HeroScene"
import ParticleField from "../../ParticleField"
import Button from "../../ui/Button"
import logoSrc from "@/imports/MediaShow.png"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grid-bg">
      <ParticleField />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center py-28">
        {/* Columna izquierda: identidad y contenido */}

<div className="w-full max-w-lg">
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="w-full"
  >
    {/* Título principal */}
    <h1
      className="w-full font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6"
      style={{ color: "var(--fg)" }}
    >
      CIENCIA QUE
      <br />
      <span
        style={{
          color: "var(--primary)",
          textShadow: "0 0 32px rgba(14,154,147,0.35)",
        }}
      >
        TRANSFORMA
      </span>
      <br />
      EL FUTURO
    </h1>

    {/* Descripción */}
    <p
      className="w-full font-body text-sm leading-relaxed mb-8 text-justify"
      style={{ color: "var(--fg-muted)" }}
    >
      Explora el ecosistema académico del Programa de Ingeniería
      Multimedia. Descubre proyectos, investigación y experiencias
      interactivas desarrolladas con{" "}
      <strong style={{ color: "var(--fg)" }}>
        nuevas tecnologías y gráficos mediante computadora
      </strong>
      , donde la creatividad y la innovación convergen para
      transformar ideas en soluciones digitales.
    </p>

    {/* Botones alineados horizontalmente */}
    <div className="flex items-center gap-3 w-full">
      <Button
        variant="primary"
        size="md"
        asLink
        href="/investigacion"
        className="w-full flex-1"
      >
        EXPLORAR INVESTIGACIÓN
      </Button>

      <Button
        variant="outline-primary"
        size="md"
        asLink
        href="/about"
        className="w-full flex-1"
      >
        ÚNETE AL EQUIPO
      </Button>
    </div>
  </motion.div>
</div>

        {/* Columna derecha: escena 3D existente */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-80 lg:h-[500px] relative"
        >
          <HeroScene />
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div
          className="h-6 w-px"
          style={{
            background:
              "linear-gradient(180deg, transparent, var(--primary))",
          }}
        />

        <div
          className="w-1 h-1 rounded-full"
          style={{ background: "var(--primary)" }}
        />
      </motion.div>
    </section>
  )
}
