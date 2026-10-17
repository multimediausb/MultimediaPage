import { motion } from "framer-motion"

export interface FilterOption {
  id: string
  label: string
  count?: number
}

export interface FilterPillsProps {
  options: FilterOption[]
  selectedId: string
  onSelect: (id: string) => void
  accentColor?: string
  className?: string
}

export default function FilterPills({
  options,
  selectedId,
  onSelect,
  accentColor = "var(--color-primary-500)",
  className = "",
}: FilterPillsProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {options.map((option) => {
        const isSelected = option.id === selectedId

        return (
          <motion.button
            key={option.id}
            onClick={() => onSelect(option.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="font-heading text-[12px] tracking-wider uppercase px-4 py-2 rounded-full transition-all flex items-center gap-2 cursor-pointer select-none"
            style={{
              background: isSelected ? accentColor : "var(--surface)",
              color: isSelected
                ? "var(--color-neutral-900)"
                : "var(--color-neutral-600)",
              border: `var(--stroke-s) solid ${
                isSelected ? accentColor : "var(--color-neutral-200)"
              }`,
              boxShadow: isSelected
                ? "var(--shadow-turquoise-normal-light)"
                : "none",
            }}
          >
            <span>{option.label}</span>
            {typeof option.count === "number" && (
              <span
                className="text-[10px] px-1.5 py-0.2 rounded-full font-display font-semibold"
                style={{
                  background: isSelected
                    ? "rgba(0,0,0,0.18)"
                    : "var(--color-neutral-200)",
                  color: isSelected ? "#000" : "var(--color-neutral-700)",
                }}
              >
                {option.count}
              </span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
