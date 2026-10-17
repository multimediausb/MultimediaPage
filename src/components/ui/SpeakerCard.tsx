import { motion } from "framer-motion"
import Card from "./Card"
import Badge from "./Badge"
import Button from "./Button"

export interface SpeakerCardProps {
  name: string
  role: string
  institution?: string
  topic?: string
  image: string
  badgeText?: string
  accent?: "primary" | "secondary" | "tertiary"
  className?: string
  onDetailsClick?: () => void
}

export default function SpeakerCard({
  name,
  role,
  institution,
  topic,
  image,
  badgeText = "KEYNOTE SPEAKER",
  accent = "secondary",
  className = "",
  onDetailsClick,
}: SpeakerCardProps) {
  const accentColor = {
    primary: "var(--color-primary-500)",
    secondary: "var(--color-secondary-500)",
    tertiary: "var(--color-tertiary-500)",
  }[accent]

  const shadowType = {
    primary: "turquoise" as const,
    secondary: "orange" as const,
    tertiary: "blue" as const,
  }[accent]

  return (
    <Card
      accentColor={accentColor}
      accentTop
      shadowType={shadowType}
      interactive
      className={`max-w-sm flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.35 }}
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, transparent 40%, rgba(6,6,6,0.85) 100%)`,
            }}
          />
          <div className="absolute top-3 left-3">
            <Badge variant={accent}>{badgeText}</Badge>
          </div>
        </div>

        <div className="p-5">
          <h3
            className="text-h6 font-heading mb-1"
            style={{ color: "var(--color-neutral-900)" }}
          >
            {name}
          </h3>
          <p
            className="text-b3 font-display mb-3"
            style={{ color: accentColor }}
          >
            {role} {institution && `— ${institution}`}
          </p>

          {topic && (
            <div
              className="p-3 rounded-lg mb-4"
              style={{
                background: "var(--color-neutral-100)",
                border: "1px solid var(--color-neutral-200)",
              }}
            >
              <div
                className="text-[10px] uppercase font-display tracking-wider mb-1"
                style={{ color: "var(--color-neutral-500)" }}
              >
                Charla / Ponencia
              </div>
              <p
                className="text-b2 font-body font-medium leading-snug line-clamp-2"
                style={{ color: "var(--color-neutral-800)" }}
              >
                {topic}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 pb-5 pt-0">
        <Button
          variant={
            accent === "primary"
              ? "primary"
              : accent === "secondary"
                ? "secondary"
                : "tertiary"
          }
          size="sm"
          className="w-full"
          onClick={onDetailsClick}
        >
          VER PERFIL
        </Button>
      </div>
    </Card>
  )
}
