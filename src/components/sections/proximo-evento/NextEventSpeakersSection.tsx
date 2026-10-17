import { motion } from "framer-motion"
import SpeakerCard from "../../ui/SpeakerCard"
import Badge from "../../ui/Badge"

const keynoteSpeakers = [
  {
    name: "Dr. Andrés Ramírez Torres",
    role: "Líder de Investigación en IA",
    institution: "Universidad de San Buenaventura",
    topic:
      "Modelos Generativos en Tiempo Real aplicados a Gráficos por Computador y Producción Virtual.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop&auto=format",
    badgeText: "KEYNOTE SPEAKER",
    accent: "secondary" as const,
  },
  {
    name: "Dra. Elena Rossi",
    role: "Directora de Experiencias XR",
    institution: "LATAM Digital Lab",
    topic:
      "El Futuro del Arte Inmersivo, Espacios Hápticos y Nuevos Formatos Narrativos en la Era Cuántica.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&auto=format",
    badgeText: "INVITADA INTERNACIONAL",
    accent: "primary" as const,
  },
]

export default function NextEventSpeakersSection() {
  return (
    <section className="py-16">
      <div className="flex items-center gap-3 mb-4">
        <Badge variant="secondary">PONENTES DESTACADOS</Badge>
        <span className="text-b4 font-display text-neutral-400">
          GUEST EXPERTS
        </span>
      </div>

      <h2
        className="text-h4 font-heading mb-8"
        style={{ color: "var(--color-neutral-900)" }}
      >
        Conferencistas Magistrales
      </h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {keynoteSpeakers.map((speaker, index) => (
          <motion.div
            key={speaker.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: index * 0.1 }}
          >
            <SpeakerCard {...speaker} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
