import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"

import { AnimatePresence, motion } from "framer-motion"

import Navbar from "./components/Navbar"

import Home from "./pages/Home"

import Investigacion from "./pages/Investigacion"

import Eventos from "./pages/Eventos"

import ProximoEvento from "./pages/ProximoEvento"

import Miembros from "./pages/Miembros"

import Proyectos from "./pages/Proyectos"

import logoSrc from "@/imports/MediaShow.png"

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
        <Route
          path="/proyectos"
          element={
            <PageTransition>
              <Proyectos />
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
      <div
        className="min-h-screen grid-bg relative"
        style={{ background: "var(--bg)" }}
      >
        {/* Ambient glow — teal top-right */}
        <div
          className="fixed top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(14,154,147,0.08) 0%, transparent 70%)",

            filter: "blur(48px)",
          }}
        />
        {/* Ambient glow — orange bottom-left */}
        <div
          className="fixed bottom-0 left-0 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(214,120,10,0.07) 0%, transparent 70%)",

            filter: "blur(48px)",
          }}
        />

        <Navbar />

        <main className="relative z-10">
          <AppRoutes />
        </main>

        {/* Footer */}
        <footer
          className="relative z-10 mt-auto py-10"
          style={{ borderTop: "1px solid rgba(14,154,147,0.15)" }}
        >
          <div className="max-w-screen-xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={logoSrc}
                alt="MediaShow Logo"
                className="h-8 w-auto object-contain"
                style={{ filter: "drop-shadow(0 0 4px rgba(26,181,173,0.3))" }}
              />
              <span
                className="font-display text-xs tracking-[0.18em]"
                style={{ color: "var(--fg-muted)" }}
              >
                MEDIA<span style={{ color: "var(--primary)" }}>_</span>SHOW
              </span>
            </div>
            <p
              className="font-display text-xs tracking-widest"
              style={{ color: "var(--fg-muted)", opacity: 0.6 }}
            >
              © 2025 MEDIASHOW — TODOS LOS DERECHOS RESERVADOS
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}
