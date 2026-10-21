import { useEffect, useRef } from "react"
import * as THREE from "three"

interface StatsCube3DProps {
  progress: number
}

export default function StatsCube3D({
  progress,
}: StatsCube3DProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const cubeRef = useRef<THREE.Mesh | null>(null)
  const progressRef = useRef(progress)

  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      40,
      1,
      0.1,
      100,
    )
    camera.position.set(0, 0, 7)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2),
    )
    renderer.setSize(
      container.clientWidth,
      container.clientHeight,
    )
    renderer.setClearColor(0x000000, 0)

    renderer.outputColorSpace = THREE.SRGBColorSpace

    container.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(1.8, 1.8, 1.8)

    const material = new THREE.MeshStandardMaterial({
      color: 0x32c9cc,
      metalness: 0.45,
      roughness: 0.25,
      emissive: 0x073638,
      emissiveIntensity: 0.7,
    })

    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    cubeRef.current = cube

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry),
      new THREE.LineBasicMaterial({
        color: 0x8affff,
        transparent: true,
        opacity: 0.9,
      }),
    )

    cube.add(edges)

    scene.add(new THREE.AmbientLight(0xffffff, 1.5))

    const keyLight = new THREE.PointLight(0x32c9cc, 35)
    keyLight.position.set(3, 3, 4)
    scene.add(keyLight)

    const fillLight = new THREE.PointLight(0x2f8dcf, 20)
    fillLight.position.set(-3, -2, 2)
    scene.add(fillLight)

    const resizeObserver = new ResizeObserver(() => {
      const width = container.clientWidth
      const height = container.clientHeight

      if (!width || !height) return

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    })

    resizeObserver.observe(container)

    let animationFrame = 0

    const animate = () => {
      animationFrame = requestAnimationFrame(animate)

      const currentCube = cubeRef.current
      if (!currentCube) return

      const p = THREE.MathUtils.clamp(
        progressRef.current,
        0,
        1,
      )

      // Rotación continua.
      currentCube.rotation.x += 0.003
      currentCube.rotation.y += 0.006

      // Movimiento vertical controlado por el scroll.
      // Se limita al rango definido, sin excederlo.
      currentCube.position.y = THREE.MathUtils.lerp(
        1.4,
        -1.4,
        p,
      )

      // Desplazamiento lateral sutil.
      currentCube.position.x = Math.sin(p * Math.PI) * 0.25

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()

      geometry.dispose()
      material.dispose()
      edges.geometry.dispose()
      ;(edges.material as THREE.Material).dispose()

      scene.traverse((object) => {
        if (object instanceof THREE.Light) {
          object.dispose?.()
        }
      })

      renderer.dispose()

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

      cubeRef.current = null
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="h-full w-full"
      aria-label="Cubo tridimensional animado"
    />
  )
}
