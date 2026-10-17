import { motion } from "framer-motion"
import Card from "../../ui/Card"
import Badge from "../../ui/Badge"

export default function MissionVisionSection() {
  const pillars = [
    {
      label: "MISIÓN",
      title: "Investigación & Impacto Social",
      color: "var(--color-primary-500)",
      shadow: "turquoise" as const,
      text: "Producir conocimiento científico y tecnológico de excelencia mediante investigación interdisciplinaria, formando profesionales e investigadores con pensamiento crítico y compromiso con el desarrollo sostenible de la sociedad.",
      points: [
        "Desarrollo de nuevas tecnologías interactivas.",
        "Formación integral de ingenieros multimedia.",
        "Transferencia de conocimiento a la industria y comunidad.",
      ],
    },
    {
      label: "VISIÓN",
      title: "Liderazgo en Latinoamérica al 2030",
      color: "var(--color-tertiary-500)",
      shadow: "blue" as const,
      text: "Consolidarnos como el centro de investigación y divulgación de referencia en tecnologías multimedia y ciencias de la computación en la región, reconocido por su innovación, sus alianzas globales y su impulso a la ciencia abierta.",
      points: [
        "Acreditaciones internacionales y convenios de doble titulación.",
        "Publicaciones de alto impacto y patentes activas.",
        "Ecosistema de laboratorios abiertos de vanguardia.",
      ],
    },
  ]

  return (
    <section className="py-20 max-w-screen-xl mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <Badge variant="primary">PROPÓSITO INSTITUCIONAL</Badge>
        <h2
          className="text-h3 md:text-h2 font-heading mt-3 mb-4"
          style={{ color: "var(--color-neutral-900)" }}
        >
          Misión y Visión
        </h2>
        <p
          className="text-b2 font-display"
          style={{ color: "var(--color-neutral-600)" }}
        >
          Los pilares estratégicos que guían cada línea de investigación,
          proyecto de grado y evento desarrollado por el laboratorio.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {pillars.map((pillar, index) => (
          <motion.div
            key={pillar.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
          >
            <Card
              accentColor={pillar.color}
              accentLeft
              shadowType={pillar.shadow}
              interactive
              className="p-8 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-h6 font-heading tracking-widest"
                    style={{ color: pillar.color }}
                  >
                    {pillar.label}
                  </span>
                  <div
                    className="h-px flex-1"
                    style={{ background: `${pillar.color}40` }}
                  />
                </div>

                <h3
                  className="text-h5 font-heading mb-4"
                  style={{ color: "var(--color-neutral-900)" }}
                >
                  {pillar.title}
                </h3>

                <p
                  className="text-b2 font-body leading-relaxed mb-6"
                  style={{ color: "var(--color-neutral-600)" }}
                >
                  {pillar.text}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-neutral-200">
                  {pillar.points.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: pillar.color }}
                      />
                      <span
                        className="text-b3 font-display"
                        style={{ color: "var(--color-neutral-700)" }}
                      >
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
