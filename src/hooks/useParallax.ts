import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

let globalLenis: Lenis | null = null

export function getLenis() {
  return globalLenis
}

export function scrollToTop(immediate = true) {
  if (typeof window !== "undefined") {
    if (globalLenis) {
      globalLenis.scrollTo(0, { immediate })
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: immediate ? ("instant" as ScrollBehavior) : "smooth",
    })
  }
}

/**
 * Hook to initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
 */
export function useSmoothScroll() {
  useEffect(() => {
    // Disable automatic browser scroll restoration so page restarts at top
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    })

    globalLenis = lenis
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    lenis.on("scroll", ScrollTrigger.update)

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    // Ensure initial scroll position starts at top on landing page reload
    if (window.location.pathname === "/") {
      scrollToTop(true)
    }

    return () => {
      lenis.destroy()
      if (globalLenis === lenis) {
        globalLenis = null
      }
      gsap.ticker.remove(tickerCallback)
    }
  }, [])
}

/**
 * Hook to create a parallax effect on a DOM element using GSAP ScrollTrigger
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.3,
  direction: "up" | "down" = "up"
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const distance = 100 * speed * (direction === "up" ? -1 : 1)

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: distance,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [speed, direction])

  return ref
}
