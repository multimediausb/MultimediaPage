import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import Navbar from "./components/ui/Navbar"
import Home from "./pages/Home"
import Investigacion from "./pages/Investigacion"
import Eventos from "./pages/Eventos"
import ProximoEvento from "./pages/ProximoEvento"
import Miembros from "./pages/Miembros"
import Proyectos from "./pages/Proyectos"
import logoSrc from "@/imports/MediaShow.png"
import { useSmoothScroll } from "./hooks/useParallax"

function SmoothScrollProvider() {
  useSmoothScroll()
  return null
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}

function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/proyectos"
          element={
            <PageTransition>
              <Proyectos />
            </PageTransition>
          }
        />
        <Route
          path="/investigacion"
          element={
            <PageTransition>
              <Investigacion />
            </PageTransition>
          }
        />
        <Route
          path="/eventos"
          element={
            <PageTransition>
              <Eventos />
            </PageTransition>
          }
        />
        <Route
          path="/proximo-evento"
          element={
            <PageTransition>
              <ProximoEvento />
            </PageTransition>
          }
        />
        <Route
          path="/miembros"
          element={
            <PageTransition>
              <Miembros />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider />
      <div
        className="min-h-screen relative flex flex-col"
        style={{ background: "var(--bg)" }}
      >
        {/* Ambient glow top */}
        <div
          className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(50,201,204,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
            zIndex: 0,
          }}
        />

        {/* Ambient glow bottom */}
        <div
          className="fixed bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(243,136,11,0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
            zIndex: 0,
          }}
        />

        <Navbar />

        <main className="relative z-10 flex-grow">
          <AppRoutes />
        </main>

        {/* Footer */}
        <footer
          className="relative z-10 dark-grid-bg py-12 theme-dark grid-secondary section-transition"
          style={{
            backgroundColor: "var(--color-secondary-900)",
            borderTop:
              "1px solid color-mix(in srgb, var(--color-secondary-500) 30%, transparent)",
          }}
        >
          <div className="mx-auto max-w-screen-xl px-6">
            <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(4,1fr)] md:gap-8">
              <div className="flex items-start justify-center md:justify-start">
                <img
                  src={logoSrc}
                  alt="MediaShow Logo"
                  className="h-16 w-auto object-contain"
                  style={{
                    filter:
                      "drop-shadow(0 0 6px color-mix(in srgb, var(--color-primary-500) 30%, transparent))",
                  }}
                />
              </div>

              {[
                {
                  title: "Contacto",
                  links: [
                    "Información",
                    "Información",
                    "Información",
                    "Información",
                  ],
                },
                {
                  title: "Menu Principal",
                  links: [
                    "Información",
                    "Información",
                    "Información",
                    "Información",
                  ],
                },
                {
                  title: "Noticias",
                  links: [
                    "Información",
                    "Información",
                    "Información",
                    "Información",
                  ],
                },
                {
                  title: "Semilleros",
                  links: [
                    "Información",
                    "Información",
                    "Información",
                    "Información",
                  ],
                },
              ].map((column) => (
                <div key={column.title}>
                  <h2 className="font-heading text-base text-[var(--color-neutral-100)]">
                    {column.title}
                  </h2>
                  <ul className="mt-5 space-y-4">
                    {column.links.map((link, index) => (
                      <li key={`${column.title}-${index}`}>
                        <a
                          href="#"
                          className="font-display text-xs text-[var(--color-secondary-200)] transition-colors duration-200 hover:text-[var(--color-secondary-100)]"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div
              className="mt-14 border-t pt-12 text-center"
              style={{
                borderColor:
                  "color-mix(in srgb, var(--color-secondary-200) 70%, transparent)",
              }}
            >
              <p className="font-display text-xs tracking-wide text-[var(--color-secondary-500)]">
                © {new Date().getFullYear()} MEDIASHOW — TODOS LOS DERECHOS
                RESERVADOS
              </p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}
