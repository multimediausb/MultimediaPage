import { useRef, useEffect, type RefObject } from "react"
import * as THREE from "three"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js"
import MODEL_PATH from "../../assets/Models/Camera Sony XDCAM 4K.fbx"
import BODY_COLOR_MAP_PATH from "../../assets/texturas/Extra/Camera_Tela_BaseColor.png"
import BODY_HEIGHT_MAP_PATH from "../../assets/texturas/Extra/Camera_Tela_Height.png"
import BODY_METALNESS_MAP_PATH from "../../assets/texturas/Extra/Camera_Tela_Metallic.png"
import BODY_NORMAL_MAP_PATH from "../../assets/texturas/Extra/Camera_Tela_Normal.png"
import BODY_ROUGHNESS_MAP_PATH from "../../assets/texturas/Extra/Camera_Tela_Roughness.png"
import ZOOM1_COLOR_MAP_PATH from "../../assets/texturas/Zoom1/Camera_Zoom1_BaseColor.png"
import ZOOM1_HEIGHT_MAP_PATH from "../../assets/texturas/Zoom1/Camera_Zoom1_Height.png"
import ZOOM1_METALNESS_MAP_PATH from "../../assets/texturas/Zoom1/Camera_Zoom1_Metallic.png"
import ZOOM1_NORMAL_MAP_PATH from "../../assets/texturas/Zoom1/Camera_Zoom1_Normal.png"
import ZOOM1_ROUGHNESS_MAP_PATH from "../../assets/texturas/Zoom1/Camera_Zoom1_Roughness.png"
import ZOOM2_COLOR_MAP_PATH from "../../assets/texturas/Zoom2/Camera_Zoom2_BaseColor.png"
import ZOOM2_HEIGHT_MAP_PATH from "../../assets/texturas/Zoom2/Camera_Zoom2_Height.png"
import ZOOM2_METALNESS_MAP_PATH from "../../assets/texturas/Zoom2/Camera_Zoom2_Metallic.png"
import ZOOM2_NORMAL_MAP_PATH from "../../assets/texturas/Zoom2/Camera_Zoom2_Normal.png"
import ZOOM2_ROUGHNESS_MAP_PATH from "../../assets/texturas/Zoom2/Camera_Zoom2_Roughness.png"

const MODEL_SIZE = 4
const MODEL_OFFSET_X = -0.35
const MODEL_OFFSET_Y = 0.25
const MODEL_BASE_ROTATION_Y = -0.35

// Mostrar el sólido texturizado
const SHOW_SOLID = true

// Diagnóstico de la jerarquía del FBX
const DEBUG_LOG_NAMES = false

interface HeroSceneProps {
  interactionRef?: RefObject<HTMLElement | null>
}

interface TextureSet {
  colorMap: THREE.Texture
  heightMap?: THREE.Texture
  metalnessMap?: THREE.Texture
  normalMap?: THREE.Texture
  opacityMap?: THREE.Texture
  roughnessMap?: THREE.Texture
}

export default function HeroScene({ interactionRef }: HeroSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    const interactionTarget = interactionRef?.current ?? mount
    if (!mount || !interactionTarget) return

    const width = mount.clientWidth
    const height = mount.clientHeight

    if (!width || !height) return

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })

    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Escena y cámara
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)

    camera.position.z = 5

    // Iluminación
    scene.add(new THREE.AmbientLight(0xffffff, 2))

    const light = new THREE.DirectionalLight(0xffffff, 2)
    light.position.set(3, 5, 5)
    scene.add(light)

    // Grupo que controla la rotación del modelo
    const modelRoot = new THREE.Group()
    modelRoot.position.set(MODEL_OFFSET_X, MODEL_OFFSET_Y, 0)
    modelRoot.rotation.y = MODEL_BASE_ROTATION_Y
    scene.add(modelRoot)

    let model: THREE.Group | null = null

    const texturedMaterials = new Set<THREE.MeshStandardMaterial>()

    const textureLoader = new THREE.TextureLoader()
    const loadTexture = (path: string) => {
      const texture = textureLoader.load(
        path,
        undefined,
        undefined,
        (error) => {
          console.error(`Error al cargar la textura ${path}:`, error)
        },
      )
      texture.flipY = false
      return texture
    }

    const bodyColorMap = loadTexture(BODY_COLOR_MAP_PATH)
    bodyColorMap.colorSpace = THREE.SRGBColorSpace
    const bodyTextureSet: TextureSet = {
      colorMap: bodyColorMap,
      heightMap: loadTexture(BODY_HEIGHT_MAP_PATH),
      metalnessMap: loadTexture(BODY_METALNESS_MAP_PATH),
      normalMap: loadTexture(BODY_NORMAL_MAP_PATH),
      roughnessMap: loadTexture(BODY_ROUGHNESS_MAP_PATH),
    }

    const createWheelTextureSet = (
      colorPath: string,
      heightPath: string,
      metalnessPath: string,
      normalPath: string,
      roughnessPath: string,
    ): TextureSet => {
      const colorMap = loadTexture(colorPath)
      colorMap.colorSpace = THREE.SRGBColorSpace

      return {
        colorMap,
        heightMap: loadTexture(heightPath),
        metalnessMap: loadTexture(metalnessPath),
        normalMap: loadTexture(normalPath),
        roughnessMap: loadTexture(roughnessPath),
      }
    }

    const zoom1TextureSet = createWheelTextureSet(
      ZOOM1_COLOR_MAP_PATH,
      ZOOM1_HEIGHT_MAP_PATH,
      ZOOM1_METALNESS_MAP_PATH,
      ZOOM1_NORMAL_MAP_PATH,
      ZOOM1_ROUGHNESS_MAP_PATH,
    )
    const zoom2TextureSet = createWheelTextureSet(
      ZOOM2_COLOR_MAP_PATH,
      ZOOM2_HEIGHT_MAP_PATH,
      ZOOM2_METALNESS_MAP_PATH,
      ZOOM2_NORMAL_MAP_PATH,
      ZOOM2_ROUGHNESS_MAP_PATH,
    )

    const textureSets = [bodyTextureSet, zoom1TextureSet, zoom2TextureSet]

    const getTextureSetForMesh = (mesh: THREE.Mesh) => {
      const names: string[] = []
      let current: THREE.Object3D | null = mesh

      while (current) {
        names.push(current.name.toLowerCase())
        current = current.parent
      }

      const hierarchyName = names.join(" ")

      if (/\bzoom[_\s-]*2\b/.test(hierarchyName)) {
        return zoom2TextureSet
      }

      if (/\bzoom[_\s-]*1\b/.test(hierarchyName)) {
        return zoom1TextureSet
      }

      return bodyTextureSet
    }

    const createTexturedMaterial = (textureSet: TextureSet) => {
      const material = new THREE.MeshStandardMaterial({
        map: textureSet.colorMap,
        displacementMap: textureSet.heightMap,
        metalnessMap: textureSet.metalnessMap,
        normalMap: textureSet.normalMap,
        roughnessMap: textureSet.roughnessMap,
        alphaMap: textureSet.opacityMap,
        metalness: 0.85,
        roughness: 0.45,
        transparent: Boolean(textureSet.opacityMap),
        opacity: SHOW_SOLID ? 1 : 0,
        alphaTest: textureSet.opacityMap ? 0.02 : 0,
        depthWrite: SHOW_SOLID,
        displacementScale: textureSet.heightMap ? 0.02 : 0,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      })

      texturedMaterials.add(material)
      return material
    }

    const loader = new FBXLoader()

    loader.load(
      MODEL_PATH,
      (fbx) => {
        model = fbx

        // Centrar y escalar el modelo sin modificar la cámara
        const box = new THREE.Box3().setFromObject(fbx)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())

        const maxDimension = Math.max(size.x, size.y, size.z)

        const scaleFactor = maxDimension > 0 ? MODEL_SIZE / maxDimension : 1

        fbx.scale.setScalar(scaleFactor)
        fbx.position.sub(center.clone().multiplyScalar(scaleFactor))

        // -----------------------------------------------
        // DIAGNÓSTICO DE LA ESTRUCTURA DEL FBX
        // -----------------------------------------------

        const meshes: THREE.Mesh[] = []

        let totalObjects = 0
        let totalGroups = 0

        console.group("Camera Sony XDCAM 4K | Diagnóstico del FBX")

        fbx.traverse((object) => {
          totalObjects++

          if (object instanceof THREE.Group) {
            totalGroups++
          }

          if (object instanceof THREE.Mesh) {
            meshes.push(object)
          }

          if (DEBUG_LOG_NAMES) {
            const mesh = object instanceof THREE.Mesh ? object : null

            console.log({
              tipo: object.type,
              nombre: object.name || "(sin nombre)",
              padre: object.parent?.name || "(raíz)",
              hijosDirectos: object.children.length,
              esMesh: Boolean(mesh),
              geometria: mesh?.geometry.type,
              vertices: mesh?.geometry.attributes.position?.count ?? 0,
              triangulos: mesh
                ? mesh.geometry.index
                  ? mesh.geometry.index.count / 3
                  : (mesh.geometry.attributes.position?.count ?? 0) / 3
                : undefined,
            })
          }
        })

        console.log("Resumen de la jerarquía:", {
          objetosTotales: totalObjects,
          grupos: totalGroups,
          meshes: meshes.length,
        })

        console.table(
          meshes.map((mesh, index) => {
            const meshBox = new THREE.Box3().setFromObject(mesh)
            const meshSize = meshBox.getSize(new THREE.Vector3())

            return {
              indice: index,
              nombre: mesh.name || `Mesh_${index}`,
              padre: mesh.parent?.name || "(raíz)",
              hijos: mesh.children.length,
              vertices: mesh.geometry.attributes.position?.count ?? 0,
              ancho: Number(meshSize.x.toFixed(3)),
              alto: Number(meshSize.y.toFixed(3)),
              profundidad: Number(meshSize.z.toFixed(3)),
            }
          }),
        )

        console.groupEnd()

        meshes.forEach((mesh) => {
          // Guardar material original para la limpieza
          mesh.userData.originalMaterial = mesh.material

          mesh.material = createTexturedMaterial(getTextureSetForMesh(mesh))
        })

        modelRoot.add(fbx)
      },
      undefined,
      (error) => {
        console.error("Error al cargar el FBX:", error)
      },
    )

    // Seguimiento del mouse
    let mouseX = 0
    let mouseY = 0

    const onMouseMove = (event: MouseEvent) => {
      const rect = interactionTarget.getBoundingClientRect()

      if (!rect.width || !rect.height) return

      mouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 2

      mouseY = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }

    interactionTarget.addEventListener("mousemove", onMouseMove)

    // Resize
    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight

      if (!w || !h) return

      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener("resize", onResize)

    // Animación
    let frameId = 0

    const animate = () => {
      frameId = requestAnimationFrame(animate)

      const targetY = MODEL_BASE_ROTATION_Y + mouseX * 0.75
      const targetX = mouseY * 0.3

      modelRoot.rotation.y += (targetY - modelRoot.rotation.y) * 0.05

      modelRoot.rotation.x += (targetX - modelRoot.rotation.x) * 0.05

      renderer.render(scene, camera)
    }

    animate()

    // Limpieza
    return () => {
      cancelAnimationFrame(frameId)

      interactionTarget.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", onResize)

      scene.remove(modelRoot)

      texturedMaterials.forEach((material) => {
        material.dispose()
      })

      textureSets.forEach((textureSet) => {
        Object.values(textureSet).forEach((texture) => texture.dispose())
      })

      if (model) {
        const geometries = new Set<THREE.BufferGeometry>()
        const materials = new Set<THREE.Material>()

        model.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return

          geometries.add(object.geometry)

          const original = object.userData.originalMaterial

          if (original) {
            ;(Array.isArray(original) ? original : [original]).forEach(
              (material) => {
                materials.add(material)
              },
            )
          }
        })

        geometries.forEach((geometry) => {
          geometry.dispose()
        })

        materials.forEach((material) => {
          material.dispose()
        })
      }

      renderer.dispose()

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}
