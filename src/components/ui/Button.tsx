import React from "react"
import { motion, type HTMLMotionProps, type Variants } from "framer-motion"

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "outline-primary" | "outline-secondary" | "outline-tertiary" | "ghost"

export type ButtonSize = "sm" | "md" | "lg" | "xl"

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children: React.ReactNode
  className?: string
  asLink?: boolean
  href?: string
  download?: string
  target?: string
  showCornerFrame?: boolean
  onClick?: React.MouseEventHandler<HTMLElement>
}

// Configuración de los 4 tamaños oficiales
interface SizeConfig {
  fontSize: string
  padding: string
  gap: string
  cornerLength: number
  cornerThickness: number
  frameGap: number
  pressShrink: number
}

const sizeMap: Record<ButtonSize, SizeConfig> = {
  sm: {
    fontSize: "11px",
    padding: "6px 14px",
    gap: "6px",
    cornerLength: 6,
    cornerThickness: 1.5,
    frameGap: 3,
    pressShrink: 2,
  },
  md: {
    fontSize: "13px",
    padding: "9px 20px",
    gap: "8px",
    cornerLength: 8,
    cornerThickness: 2,
    frameGap: 4,
    pressShrink: 2.5,
  },
  lg: {
    fontSize: "15px",
    padding: "12px 26px",
    gap: "10px",
    cornerLength: 10,
    cornerThickness: 2,
    frameGap: 5,
    pressShrink: 3,
  },
  xl: {
    fontSize: "17px",
    padding: "16px 34px",
    gap: "12px",
    cornerLength: 12,
    cornerThickness: 2.5,
    frameGap: 6,
    pressShrink: 3.5,
  },
}

// Configuración de colores para cada variante (Enabled vs Hover más oscuro del sistema)
interface VariantColorConfig {
  innerBg: string
  innerText: string
  innerBorder: string
  cornerColor: string
  hoverInnerBg: string
  hoverInnerText: string
  hoverInnerBorder: string
  hoverCornerColor: string
  hoverShadow: string
}

const variantColorMap: Record<ButtonVariant, VariantColorConfig> = {
  primary: {
    innerBg: "var(--color-primary-500)",
    innerText: "var(--color-neutral-900)",
    innerBorder: "var(--color-primary-400)",
    cornerColor: "var(--color-primary-500)",
    // Al hacer hover cambia a tono más oscuro del sistema de diseño (Primary 700 / 800)
    hoverInnerBg: "var(--color-primary-700)",
    hoverInnerText: "var(--color-primary-100)",
    hoverInnerBorder: "var(--color-primary-500)",
    hoverCornerColor: "var(--color-primary-300)",
    hoverShadow: "var(--shadow-turquoise-hover-light)",
  },
  secondary: {
    innerBg: "var(--color-secondary-500)",
    innerText: "var(--color-neutral-900)",
    innerBorder: "var(--color-secondary-400)",
    cornerColor: "var(--color-secondary-500)",
    // Al hacer hover cambia a tono más oscuro del sistema de diseño (Secondary 700 / 800)
    hoverInnerBg: "var(--color-secondary-700)",
    hoverInnerText: "var(--color-secondary-100)",
    hoverInnerBorder: "var(--color-secondary-500)",
    hoverCornerColor: "var(--color-secondary-300)",
    hoverShadow: "var(--shadow-orange-hover-light)",
  },
  tertiary: {
    innerBg: "var(--color-tertiary-500)",
    innerText: "#ffffff",
    innerBorder: "var(--color-tertiary-400)",
    cornerColor: "var(--color-tertiary-500)",
    // Al hacer hover cambia a tono más oscuro (Tertiary 700 / 800)
    hoverInnerBg: "var(--color-tertiary-700)",
    hoverInnerText: "var(--color-tertiary-100)",
    hoverInnerBorder: "var(--color-tertiary-500)",
    hoverCornerColor: "var(--color-tertiary-300)",
    hoverShadow: "var(--shadow-blue-hover-light)",
  },
  "outline-primary": {
    innerBg: "transparent",
    innerText: "var(--color-primary-500)",
    innerBorder: "var(--color-primary-500)",
    cornerColor: "var(--color-primary-400)",
    // Al hacer hover cambia a tono más oscuro del sistema (Primary 900)
    hoverInnerBg: "var(--color-primary-900)",
    hoverInnerText: "var(--color-primary-200)",
    hoverInnerBorder: "var(--color-primary-400)",
    hoverCornerColor: "var(--color-primary-300)",
    hoverShadow: "var(--shadow-turquoise-hover-light)",
  },
  "outline-secondary": {
    innerBg: "transparent",
    innerText: "var(--color-secondary-500)",
    innerBorder: "var(--color-secondary-500)",
    cornerColor: "var(--color-secondary-400)",
    // Al hacer hover cambia a tono más oscuro del sistema (Secondary 900)
    hoverInnerBg: "var(--color-secondary-900)",
    hoverInnerText: "var(--color-secondary-200)",
    hoverInnerBorder: "var(--color-secondary-400)",
    hoverCornerColor: "var(--color-secondary-300)",
    hoverShadow: "var(--shadow-orange-hover-light)",
  },
  "outline-tertiary": {
    innerBg: "transparent",
    innerText: "var(--color-tertiary-500)",
    innerBorder: "var(--color-tertiary-500)",
    cornerColor: "var(--color-tertiary-400)",
    // Al hacer hover cambia a tono más oscuro del sistema (Tertiary 900)
    hoverInnerBg: "var(--color-tertiary-900)",
    hoverInnerText: "var(--color-tertiary-200)",
    hoverInnerBorder: "var(--color-tertiary-400)",
    hoverCornerColor: "var(--color-tertiary-300)",
    hoverShadow: "var(--shadow-blue-hover-light)",
  },
  ghost: {
    innerBg: "transparent",
    innerText: "var(--color-neutral-400)",
    innerBorder: "transparent",
    cornerColor: "var(--color-neutral-400)",
    hoverInnerBg: "var(--color-neutral-800)",
    hoverInnerText: "var(--color-neutral-100)",
    hoverInnerBorder: "var(--color-neutral-700)",
    hoverCornerColor: "var(--color-neutral-300)",
    hoverShadow: "none",
  },
}

export default function Button({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  children,
  className = "",
  asLink = false,
  href,
  download,
  target,
  showCornerFrame = true,
  onClick,
  ...props
}: ButtonProps) {
  const cfg = sizeMap[size]
  const colors = variantColorMap[variant]

  // Variantes de animación para las esquinas del marco cuando se presiona (se achica)
const cornerVariants: Variants = {
  idle: {
    x: 0,
    y: 0,
    borderColor: colors.cornerColor,
    transition: { duration: 0.18, ease: "easeOut" },
  },
  hover: {
    x: 0,
    y: 0,
    borderColor: colors.hoverCornerColor,
    transition: { duration: 0.18, ease: "easeOut" },
  },
  pressed: (direction: "tl" | "tr" | "bl" | "br") => {
    const shrink = cfg.pressShrink;

    const deltaMap = {
      tl: { x: shrink, y: shrink },
      tr: { x: -shrink, y: shrink },
      bl: { x: shrink, y: -shrink },
      br: { x: -shrink, y: -shrink },
    };

    return {
      ...deltaMap[direction],
      borderColor: colors.hoverCornerColor,
      transition: { duration: 0.1, ease: "easeInOut" },
    };
  },
};
  // Variantes del contenedor interno del botón (cambia a color más oscuro en hover y se achica al presionar)
const innerButtonVariants: Variants = {
  idle: {
    scale: 1,
    backgroundColor: colors.innerBg,
    color: colors.innerText,
    borderColor: colors.innerBorder,
    boxShadow: "none",
    transition: { duration: 0.2, ease: "easeOut" },
  },
  hover: {
    scale: 1,
    backgroundColor: colors.hoverInnerBg,
    color: colors.hoverInnerText,
    borderColor: colors.hoverInnerBorder,
    boxShadow: colors.hoverShadow,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  pressed: {
    scale: 1,
    backgroundColor: colors.hoverInnerBg,
    color: colors.hoverInnerText,
    borderColor: colors.hoverInnerBorder,
    boxShadow: colors.hoverShadow,
    transition: { duration: 0.1, ease: "easeInOut" },
  },
};

  const isFullWidth = className.includes("w-full")

  // Contenido interno del botón
  const buttonContent = (
    <>
      {showCornerFrame && (
        <span
          className="absolute inset-0 pointer-events-none select-none"
          style={{ padding: `${cfg.frameGap}px` }}
        >
          {/* Esquina superior izquierda ┌ */}
          <motion.span
            custom="tl"
            variants={cornerVariants}
            className="absolute"
            style={{
              top: 0,
              left: 0,
              width: `${cfg.cornerLength}px`,
              height: `${cfg.cornerLength}px`,
              borderTopWidth: `${cfg.cornerThickness}px`,
              borderLeftWidth: `${cfg.cornerThickness}px`,
              borderStyle: "solid",
            }}
          />
          {/* Esquina superior derecha ┐ */}
          <motion.span
            custom="tr"
            variants={cornerVariants}
            className="absolute"
            style={{
              top: 0,
              right: 0,
              width: `${cfg.cornerLength}px`,
              height: `${cfg.cornerLength}px`,
              borderTopWidth: `${cfg.cornerThickness}px`,
              borderRightWidth: `${cfg.cornerThickness}px`,
              borderStyle: "solid",
            }}
          />
          {/* Esquina inferior izquierda └ */}
          <motion.span
            custom="bl"
            variants={cornerVariants}
            className="absolute"
            style={{
              bottom: 0,
              left: 0,
              width: `${cfg.cornerLength}px`,
              height: `${cfg.cornerLength}px`,
              borderBottomWidth: `${cfg.cornerThickness}px`,
              borderLeftWidth: `${cfg.cornerThickness}px`,
              borderStyle: "solid",
            }}
          />
          {/* Esquina inferior derecha ┘ */}
          <motion.span
            custom="br"
            variants={cornerVariants}
            className="absolute"
            style={{
              bottom: 0,
              right: 0,
              width: `${cfg.cornerLength}px`,
              height: `${cfg.cornerLength}px`,
              borderBottomWidth: `${cfg.cornerThickness}px`,
              borderRightWidth: `${cfg.cornerThickness}px`,
              borderStyle: "solid",
            }}
          />
        </span>
      )}

      {/* Contenedor central interno separado del marco */}
      <motion.span
        variants={innerButtonVariants}
        className={`relative inline-flex items-center justify-center font-heading select-none ${
          isFullWidth ? "w-full" : ""
        }`}
        style={{
          padding: cfg.padding,
          fontSize: cfg.fontSize,
          gap: cfg.gap,
          borderRadius: "var(--radius-m)",
          borderWidth: "1.5px",
          borderStyle: "solid",
          letterSpacing: "0.08em",
          lineHeight: 1.2,
        }}
      >
        {leftIcon && (
          <span className="inline-flex shrink-0 items-center justify-center">
            {leftIcon}
          </span>
        )}
        <span className="truncate">{children}</span>
        {rightIcon && (
          <span className="inline-flex shrink-0 items-center justify-center">
            {rightIcon}
          </span>
        )}
      </motion.span>
    </>
  )

  // Wrapper externo: marco relativo que alberga el contenedor y las esquinas
  const wrapperStyle: React.CSSProperties = {
    padding: showCornerFrame ? `${cfg.frameGap + 2}px` : "0px",
    display: isFullWidth ? "flex" : "inline-flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    background: "transparent",
    border: "none",
    outline: "none",
  }

  if (asLink && href) {
    return (
      <motion.a
        href={href}
        download={download}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        initial="idle"
        whileHover="hover"
        whileTap="pressed"
        style={wrapperStyle}
        onClick={onClick as any}
        className={`group no-underline ${
          isFullWidth ? "w-full" : ""
        } ${className}`}
      >
        {buttonContent}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={props.type || "button"}
      initial="idle"
      whileHover="hover"
      whileTap="pressed"
      style={wrapperStyle}
      onClick={onClick}
      className={`group ${isFullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {buttonContent}
    </motion.button>
  )
}
