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
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Check if scrolled past top threshold
      if (currentScrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
        setVisible(true)
        setLastScrollY(currentScrollY)
        return
      }

      // If mobile drawer is open, keep navbar visible
      if (open) {
        setVisible(true)
        setLastScrollY(currentScrollY)
        return
      }

      // Detect scroll direction:
      // Scrolling down -> hide navbar
      // Scrolling up -> show navbar with 100% white background
      if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 4) {
        setVisible(false)
      } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 4) {
        setVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, open])

  // Close mobile drawer on route navigation
  useEffect(() => {
    setOpen(false)
  }, [location])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          background: scrolled ? "#ffffff" : "transparent",
          boxShadow: scrolled ? "0 2px 14px rgba(0, 0, 0, 0.06)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(0, 0, 0, 0.08)"
            : "1px solid transparent",
          transition: "transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
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
                style={{ filter: "drop-shadow(0 0 6px rgba(14,154,147,0.3))" }}
              />
            </div>
            <span className="font-display font-bold text-sm tracking-widest text-[#1a1714]">
              MEDIA<span className="text-[var(--color-primary-600)]">_</span>SHOW
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
                  color: isActive
                    ? "var(--color-primary-600)"
                    : "rgba(26, 23, 20, 0.75)",
                  fontWeight: isActive ? 600 : 400,
                })}
              >
                {({ isActive }) => (
                  <>
                    <span className="hover:text-[var(--color-primary-600)] transition-colors duration-200">
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                        style={{
                          background: "var(--color-primary-600)",
                          boxShadow: "0 0 8px rgba(14, 154, 147, 0.4)",
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

          {/* Hamburger (Mobile) */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
          >
            <span
              className="w-5 h-0.5 bg-[#1a1714] transition-transform duration-200"
              style={{
                transform: open ? "translateY(5px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="w-5 h-0.5 bg-[#1a1714] transition-opacity duration-200"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="w-5 h-0.5 bg-[#1a1714] transition-transform duration-200"
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
            className="fixed inset-x-0 top-16 z-40 p-6 flex flex-col gap-3 lg:hidden border-b bg-white shadow-xl"
            style={{
              borderColor: "rgba(0, 0, 0, 0.08)",
            }}
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className="font-display text-sm tracking-widest py-2.5 px-3 rounded-lg transition-colors"
                style={({ isActive }) => ({
                  color: isActive ? "var(--color-primary-600)" : "#1a1714",
                  background: isActive ? "rgba(14, 154, 147, 0.08)" : "transparent",
                  fontWeight: isActive ? 600 : 400,
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
