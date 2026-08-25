import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logoSrc from '@/imports/MediaShow.png'

const links = [
  { to: '/', label: 'HOME' },
  //{to: '/about', label: 'ABOUT' },
  { to: '/investigacion', label: 'INVESTIGACIÓN' },
  { to: '/eventos', label: 'EVENTOS' },
  { to: '/proximo-evento', label: 'PRÓXIMO EVENTO' },
  //{ to: '/servicios', label: 'SERVICIOS' },
  { to: '/miembros', label: 'MIEMBROS' },
  //{ to: '/medios', label: 'MEDIOS' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(245,242,238,0.94)'
            : 'rgba(245,242,238,0)',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(14,154,147,0.15)'
            : '1px solid transparent',
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
                style={{ filter: 'drop-shadow(0 0 6px rgba(26,181,173,0.4))' }}
              />
            </div>
            <span
              className="font-display font-semibold text-xs tracking-[0.18em] hidden sm:block"
              style={{ color: 'var(--fg)' }}
            >
              MEDIA<span style={{ color: 'var(--primary)' }}>_</span>SHOW
            </span>
          </NavLink>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className="relative px-3 py-1.5 font-display text-xs tracking-widest transition-colors duration-200"
                style={({ isActive }) => ({
                  color: isActive ? 'var(--primary)' : 'var(--fg-muted)',
                })}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 right-0 h-px"
                        style={{
                          background: 'var(--primary)',
                          boxShadow: '0 0 6px var(--primary)',
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
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
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block w-5 h-px"
                style={{ background: 'var(--primary)' }}
                animate={
                  open
                    ? i === 0 ? { rotate: 45, y: 6 }
                    : i === 1 ? { opacity: 0 }
                    : { rotate: -45, y: -6 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                transition={{ duration: 0.2 }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden"
            style={{
              background: 'rgba(245,242,238,0.98)',
              borderBottom: '1px solid rgba(14,154,147,0.15)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className="flex items-center gap-3 px-8 py-4 font-display text-xs tracking-widest border-b transition-colors duration-150"
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--primary)' : 'var(--fg-muted)',
                    borderColor: 'rgba(14,154,147,0.1)',
                  })}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span
                          className="w-1 h-1 rounded-full shrink-0"
                          style={{ background: 'var(--primary)' }}
                        />
                      )}
                      {link.label}
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
