import { motion } from "framer-motion"
import CountdownTimer from "@/components/ui/CountdownTimer"
import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"
import Card from "@/components/ui/Card"

export default function HomeNextEventCTA() {
  // Target date for next flagship event: September 16, 2026 09:00 AM
  const targetDate = new Date("2026-09-16T09:00:00")

  return (
    <section
      className="relative py-24 theme-light accent-orange grid-bg transition-colors duration-500 overflow-hidden"
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        borderTop: "1px solid rgba(214,120,10,0.15)",
      }}
    >
      <div className="relative z-10 max-w-screen-xl mx-auto px-6">
        <Card
          accentLeft
          accentColor="var(--color-secondary-500)"
          shadowType="orange-light"
          radius="3xl"
          className="p-8 md:p-14 border border-[var(--color-neutral-200)]"
          style={{ background: "var(--surface)" }}
        >
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" pulse>
                  PRÓXIMO ENCUENTRO
                </Badge>
                <span className="font-display text-xs" style={{ color: "var(--fg-muted)" }}>
                  EDICIÓN 2026-2
                </span>
              </div>

              <h2
                className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4"
                style={{ color: "var(--fg)" }}
              >
                MEDIA SHOW: TECNOLOGÍAS INMERSIVAS Y FUTURO DIGITAL
              </h2>

              <p
                className="font-body text-sm md:text-base leading-relaxed mb-8 max-w-xl"
                style={{ color: "var(--fg-muted)" }}
              >
                Tres días de ponencias magistrales, talleres interactivos y muestras de videojuegos, animación y cómputo visual de vanguardia.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  asLink
                  href="/proximo-evento"
                >
                  REGÍSTRATE AHORA
                </Button>

                <Button
                  variant="outline-secondary"
                  size="lg"
                  asLink
                  href="/eventos"
                >
                  AGENDA COMPLETA
                </Button>
              </div>
            </div>

            {/* Right Countdown */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
              <div
                className="w-full max-w-sm p-6 rounded-2xl border"
                style={{
                  background: "var(--surface-2)",
                  borderColor: "rgba(214,120,10,0.2)",
                }}
              >
                <div className="text-center mb-4">
                  <span className="font-display text-xs tracking-widest text-[var(--color-secondary-600)] font-semibold">
                    INICIO DEL EVENTO EN
                  </span>
                </div>
                <CountdownTimer targetDate={targetDate} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
