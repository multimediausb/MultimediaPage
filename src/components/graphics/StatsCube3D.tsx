import { useEffect, useRef } from "react"
import * as THREE from "three"

interface StatsCube3DProps {
  progressRef: { current: number }
  targetRefs: { current: (HTMLDivElement | null)[] }
}

// =========================================================
// CONFIGURACIÓN DEL MOVIMIENTO
// =========================================================

const MOTION_CONFIG = {
  // 0 = movimiento lineal, 1 = suavizado completo.
  // Recomendado: entre 0.35 y 0.65.
  easingStrength: 0.55,

  // Duración de cada fase dentro del progreso de una tarjeta.
  // La suma de las fases debe ser 1.
descendEnd: 0.0022,
contactStart: 0.0058,
contactEnd: 0.0072,
returnEnd: 0.0092,

  // Intensidad del giro y del escalado al contactar.
  contactRotation: 0.035,
  contactScale: 0.035,

  // Posición de reposo horizontal, como proporción del ancho.
  restPositionX: 0.29,

  // Separación respecto al borde derecho de la tarjeta.
  contactOffset: 5,
}

// =========================================================
// UTILIDADES DE MOVIMIENTO
// =========================================================

const clamp01 = (value: number) =>
  THREE.MathUtils.clamp(value, 0, 1)

const lerp = (
  start: number,
  end: number,
  amount: number,
) => THREE.MathUtils.lerp(start, end, amount)

// Suavizado gradual: empieza lento, acelera y desacelera al final.
const smoothStep = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

// Permite mezclar movimiento lineal y suavizado.
// Aumenta easingStrength para una transición más suave.
// Disminúyelo para que el movimiento responda más directamente.
const easeProgress = (value: number) => {
  const t = clamp01(value)
  const smooth = smoothStep(t)

  return THREE.MathUtils.lerp(
    t,
    smooth,
    clamp01(MOTION_CONFIG.easingStrength),
  )
}

const interpolate = (
  start: number,
  end: number,
  amount: number,
) => THREE.MathUtils.lerp(start, end, easeProgress(amount))

export default function StatsCube3D({
  progressRef,
  targetRefs,
}: StatsCube3DProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // =====================================================
    // ESCENA Y CÁMARA
    // =====================================================

    const scene = new THREE.Scene()

    const camera = new THREE.OrthographicCamera(
      -1,
      1,
      1,
      -1,
      1,
      2000,
    )

    camera.position.set(0, 0, 1000)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2),
    )
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace

    renderer.domElement.style.position = "absolute"
    renderer.domElement.style.inset = "0"
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    renderer.domElement.style.pointerEvents = "none"

    container.appendChild(renderer.domElement)

    // =====================================================
    // PRISMA
    // =====================================================

    const prismLength = 180
    const prismThickness = 16

    const geometry = new THREE.BoxGeometry(
      prismLength,
      prismThickness,
      prismThickness,
    )

    const material = new THREE.MeshStandardMaterial({
      color: 0x32c9cc,
      metalness: 0.45,
      roughness: 0.28,
      emissive: 0x073638,
      emissiveIntensity: 1.1,
    })

    const prism = new THREE.Mesh(geometry, material)
    scene.add(prism)

    // Bordes luminosos del prisma.
    const edgesGeometry = new THREE.EdgesGeometry(geometry)

    const edgesMaterial = new THREE.LineBasicMaterial({
      color: 0x8affff,
      transparent: true,
      opacity: 0.95,
    })

    const edges = new THREE.LineSegments(
      edgesGeometry,
      edgesMaterial,
    )

    prism.add(edges)

    // =====================================================
    // ILUMINACIÓN
    // =====================================================

    scene.add(new THREE.AmbientLight(0xffffff, 1.5))

    const keyLight = new THREE.PointLight(0x32c9cc, 35)
    keyLight.position.set(250, 200, 200)
    scene.add(keyLight)

    const fillLight = new THREE.PointLight(0x2f8dcf, 20)
    fillLight.position.set(-250, -150, 150)
    scene.add(fillLight)

    // =====================================================
    // REDIMENSIONAMIENTO
    // =====================================================

    let width = 0
    let height = 0

    const resize = () => {
      width = container.clientWidth
      height = container.clientHeight

      if (!width || !height) return

      camera.left = -width / 2
      camera.right = width / 2
      camera.top = height / 2
      camera.bottom = -height / 2

      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    // =====================================================
    // POSICIÓN DE REPOSO
    // =====================================================

    const restPosition = new THREE.Vector2(0, 0)

    const updateRestPosition = () => {
      restPosition.set(
        width * MOTION_CONFIG.restPositionX,
        0,
      )
    }

    updateRestPosition()

    // =====================================================
    // ANIMACIÓN SINCRONIZADA CON EL SCROLL
    // =====================================================

    let animationFrame = 0

    const animate = () => {
      animationFrame = requestAnimationFrame(animate)

      if (!width || !height) return

      updateRestPosition()

      const progress = clamp01(progressRef.current)
      const totalItems = targetRefs.current.length

      if (totalItems === 0) {
        renderer.render(scene, camera)
        return
      }

      const scaledProgress = progress * totalItems

      const index = Math.min(
        totalItems - 1,
        Math.floor(scaledProgress),
      )

      const localProgress =
        index === totalItems - 1 && progress >= 1
          ? 1
          : scaledProgress - index

      const target = targetRefs.current[index]

      let targetX = restPosition.x
      let targetY = restPosition.y

      // Calcula el punto de contacto usando la posición
      // actual de la tarjeta en pantalla.
      if (target) {
        const rect = target.getBoundingClientRect()

        if (rect.width > 0 && rect.height > 0) {
          const contactScreenX =
            rect.right +
            prismLength / 2 -
            MOTION_CONFIG.contactOffset

          targetX = contactScreenX - width / 2

          targetY =
            height / 2 -
            rect.top -
            rect.height / 2
        }
      }

      let x = restPosition.x
      let y = restPosition.y

      const {
        descendEnd,
        contactStart,
        contactEnd,
        returnEnd,
      } = MOTION_CONFIG

      // FASE 1: baja verticalmente hacia la tarjeta.
      if (localProgress < descendEnd) {
        const t = localProgress / descendEnd

        x = restPosition.x
        y = interpolate(
          restPosition.y,
          targetY,
          t,
        )
      }

      // FASE 2: se desplaza horizontalmente hasta contactar.
      else if (localProgress < contactStart) {
        const t =
          (localProgress - descendEnd) /
          (contactStart - descendEnd)

        x = interpolate(
          restPosition.x,
          targetX,
          t,
        )

        y = targetY
      }

      // FASE 3: mantiene el contacto con la tarjeta.
      else if (localProgress <= contactEnd) {
        x = targetX
        y = targetY
      }

      // FASE 4: regresa al centro.
      else if (localProgress < returnEnd) {
        const t =
          (localProgress - contactEnd) /
          (returnEnd - contactEnd)

        x = interpolate(
          targetX,
          restPosition.x,
          t,
        )

        y = interpolate(
          targetY,
          restPosition.y,
          t,
        )
      }

      // FASE 5: permanece en reposo hasta la siguiente tarjeta.
      else {
        x = restPosition.x
        y = restPosition.y
      }

      prism.position.set(x, y, 0)

      // Efecto sutil al tocar la tarjeta.
      const contactAmount =
        localProgress >= descendEnd &&
        localProgress <= contactEnd
          ? Math.sin(
              Math.PI *
                ((localProgress - descendEnd) /
                  (contactEnd - descendEnd)),
            )
          : 0

      prism.rotation.z =
        contactAmount * MOTION_CONFIG.contactRotation

      const scale =
        1 + contactAmount * MOTION_CONFIG.contactScale

      prism.scale.set(scale, scale, scale)

      renderer.render(scene, camera)
    }

    animate()

    // =====================================================
    // LIMPIEZA
    // =====================================================

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()

      geometry.dispose()
      material.dispose()
      edgesGeometry.dispose()
      edgesMaterial.dispose()
      renderer.dispose()

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [progressRef, targetRefs])

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    />
  )
}