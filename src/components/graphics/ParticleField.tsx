import { useCallback } from "react"

import Particles from "@tsparticles/react"

import { loadSlim } from "@tsparticles/slim"

import type { Engine } from "@tsparticles/engine"

export default function ParticleField() {
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={init}
      className="absolute inset-0 pointer-events-none"
      options={{
        fullScreen: false,

        background: { color: "transparent" },

        fpsLimit: 60,

        particles: {
          number: { value: 60, density: { enable: true } },

          color: { value: ["#0ea5e9", "#a855f7", "#f59e0b"] },

          shape: { type: "circle" },

          opacity: {
            value: { min: 0.1, max: 0.4 },

            animation: { enable: true, speed: 0.8, sync: false },
          },

          size: {
            value: { min: 1, max: 3 },

            animation: { enable: true, speed: 1.5, sync: false },
          },

          move: {
            enable: true,

            speed: 0.5,

            direction: "none",

            random: true,

            straight: false,

            outModes: { default: "out" },
          },

          links: {
            enable: true,

            distance: 140,

            color: "#0ea5e9",

            opacity: 0.08,

            width: 1,
          },
        },

        detectRetina: true,
      }}
    />
  )
}
