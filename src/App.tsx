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
      <div className="min-h-screen relative flex flex-col" style={{ background: "var(--bg)" }}>
        {/* Ambient glow top */}
        <div
          className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(50,201,204,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
            zIndex: 0,
          }}
        />

        {/* Ambient glow bottom */}
        <div
          className="fixed bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(243,136,11,0.05) 0%, transparent 70%)",
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
          className="relative z-10 py-12 theme-dark"
          style={{
            background: "#070a0e",
            borderTop: "1px solid rgba(50,201,204,0.15)",
          }}
        >
          <div className="max-w-screen-xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src={logoSrc}
                alt="MediaShow Logo"
                className="h-8 w-auto object-contain"
                style={{ filter: "drop-shadow(0 0 6px rgba(50,201,204,0.3))" }}
              />
              <span className="font-display text-xs tracking-[0.2em] text-neutral-400">
                MEDIA<span className="text-[var(--color-primary-500)]">_</span>SHOW — INGENIERÍA MULTIMEDIA
              </span>
            </div>
            <p className="font-display text-xs tracking-widest text-neutral-500">
              © {new Date().getFullYear()} UNIVERSIDAD DE SAN BUENAVENTURA — MEDIALAB
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}
