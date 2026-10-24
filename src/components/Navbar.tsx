import { useState, useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import logoSrc from "@/imports/MediaShow.png"

const links = [
  { to: "/", label: "HOME" },
  { to: "/proyectos", label: "PROYECTOS" },
  { to: "/investigacion", label: "INVESTIGACIÓN" },
  { to: "/eventos", label: "EVENTOS" },
  { to: "/proximo-evento", label: "PRÓXIMO EVENTO" },
  { to: "/miembros", label: "MIEMBROS" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(10, 14, 20, 0.88)"
            : "rgba(10, 14, 20, 0.45)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? "1px solid rgba(50, 201, 204, 0.2)"
            : "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-7 relative flex items-center justify-center">
              <img
                src={logoSrc}
                alt="MediaShow Logo"
                className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                style={{ filter: "drop-shadow(0 0 6px rgba(50,201,204,0.4))" }}
              />
            </div>
            <span className="font-display font-bold text-sm tracking-widest text-white">
              MEDIA<span className="text-[var(--color-primary-500)]">_</span>SHOW
            </span>
          </NavLink>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className="relative px-3.5 py-1.5 font-display text-xs tracking-widest transition-colors duration-200"
                style={({ isActive }) => ({
                  color: isActive ? "var(--color-primary-400)" : "rgba(255, 255, 255, 0.75)",
                })}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                        style={{
                          background: "var(--color-primary-500)",
                          boxShadow: "0 0 8px var(--color-primary-500)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 35,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
          >
            <span
              className="w-5 h-0.5 bg-white transition-transform duration-200"
              style={{
                transform: open ? "translateY(5px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="w-5 h-0.5 bg-white transition-opacity duration-200"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="w-5 h-0.5 bg-white transition-transform duration-200"
              style={{
                transform: open ? "translateY(-5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 p-6 flex flex-col gap-4 lg:hidden border-b"
            style={{
              background: "rgba(10, 14, 20, 0.98)",
              backdropFilter: "blur(24px)",
              borderColor: "rgba(50, 201, 204, 0.2)",
            }}
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className="font-display text-sm tracking-widest py-2 px-3 rounded-lg"
                style={({ isActive }) => ({
                  color: isActive ? "var(--color-primary-400)" : "rgba(255, 255, 255, 0.8)",
                  background: isActive ? "rgba(50, 201, 204, 0.1)" : "transparent",
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
