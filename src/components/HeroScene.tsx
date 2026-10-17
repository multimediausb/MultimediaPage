import { useRef, useEffect } from "react"

import * as THREE from "three"

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current

    if (!mount) return

    const w = mount.clientWidth

    const h = mount.clientHeight

    // Renderer

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(w, h)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    renderer.setClearColor(0x000000, 0)

    mount.appendChild(renderer.domElement)

    // Scene & camera

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100)

    camera.position.z = 5

    // Outer wireframe icosahedron

    const icoGeo = new THREE.IcosahedronGeometry(1.6, 1)

    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x1ab5ad,

      wireframe: true,

      transparent: true,

      opacity: 0.28,
    })

    const ico = new THREE.Mesh(icoGeo, icoMat)

    scene.add(ico)

    // Inner solid icosahedron — orange tint from logo diamond

    const innerGeo = new THREE.IcosahedronGeometry(0.9, 0)

    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xe8870c,

      wireframe: true,

      transparent: true,

      opacity: 0.4,
    })

    const inner = new THREE.Mesh(innerGeo, innerMat)

    scene.add(inner)

    // Orbiting particles

    const particleCount = 200

    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2

      const phi = Math.acos(2 * Math.random() - 1)

      const r = 1.6 + Math.random() * 1.2

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)

      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)

      positions[i * 3 + 2] = r * Math.cos(phi)
    }

    const pGeo = new THREE.BufferGeometry()

    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    const pMat = new THREE.PointsMaterial({
      color: 0x1ab5ad,

      size: 0.035,

      transparent: true,

      opacity: 0.7,
    })

    const points = new THREE.Points(pGeo, pMat)

    scene.add(points)

    // Accent ring

    const ringGeo = new THREE.TorusGeometry(2.2, 0.008, 2, 80)

    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x3a8fc7,

      transparent: true,

      opacity: 0.5,
    })

    const ring = new THREE.Mesh(ringGeo, ringMat)

    ring.rotation.x = Math.PI / 3

    scene.add(ring)

    // Mouse parallax

    let mouseX = 0

    let mouseY = 0

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2

      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener("mousemove", onMouse)

    // Resize

    const onResize = () => {
      const nw = mount.clientWidth

      const nh = mount.clientHeight

      camera.aspect = nw / nh

      camera.updateProjectionMatrix()

      renderer.setSize(nw, nh)
    }

    window.addEventListener("resize", onResize)

    // Animate

    let frame: number

    const timer = new THREE.Timer()

    const animate = () => {
      frame = requestAnimationFrame(animate)

      timer.update()

      const t = timer.getElapsed()

      ico.rotation.y = t * 0.18

      ico.rotation.x = t * 0.09

      inner.rotation.y = -t * 0.28

      inner.rotation.z = t * 0.12

      points.rotation.y = t * 0.06

      ring.rotation.z = t * 0.04

      // Parallax

      scene.rotation.x += (mouseY * 0.15 - scene.rotation.x) * 0.05

      scene.rotation.y += (mouseX * 0.15 - scene.rotation.y) * 0.05

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(frame)

      window.removeEventListener("mousemove", onMouse)

      window.removeEventListener("resize", onResize)

      renderer.dispose()

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}
