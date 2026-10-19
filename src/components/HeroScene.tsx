
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import MODEL_PATH from "../assets/Models/Canon_AT-1.fbx";

// Colores del wireframe
const OUTLINE_COLORS = {
  primary: 0x32c9cc, // Cian
  accent: 0xf3880b,  // Naranja
};

const OUTLINE_OPACITY = 0.9;
const MODEL_SIZE = 4;

// true: todas las aristas de la triangulación
// false: solo aristas marcadas
const FULL_WIREFRAME = true;
const EDGE_ANGLE_THRESHOLD = 20;

// Mostrar el sólido detrás de las líneas
const SHOW_SOLID = false;

// Asignación manual de colores por nombre de Mesh
// Las piezas que no estén en esta lista usarán el cian.
const MESH_COLORS: Record<string, number> = {
  "#CAM0001_Body": OUTLINE_COLORS.primary,
  "#CAM0001_Battery_Check": OUTLINE_COLORS.accent,
  "#CAM0001_Film_Advance": OUTLINE_COLORS.accent,
  "#CAM0001_Shutter_Speed": OUTLINE_COLORS.accent,
  "#CAM0001_Shutter": OUTLINE_COLORS.accent,
  "#CAM0001_Spool": OUTLINE_COLORS.accent,
};

// Diagnóstico de la jerarquía del FBX
const DEBUG_LOG_NAMES = true;

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    if (!width || !height) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Escena y cámara
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      width / height,
      0.1,
      100
    );

    camera.position.z = 5;

    // Iluminación
    scene.add(new THREE.AmbientLight(0xffffff, 2));

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(3, 5, 5);
    scene.add(light);

    // Grupo que controla la rotación del modelo
    const modelRoot = new THREE.Group();
    scene.add(modelRoot);

    let model: THREE.Group | null = null;

    const wireframeMaterials = new Set<THREE.Material>();
    const wireframeGeometries = new Set<THREE.BufferGeometry>();

    // Material fantasma para el sólido
    const ghostMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: SHOW_SOLID ? 0.35 : 0,
      depthWrite: SHOW_SOLID,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    // Material principal: cian
    const primaryLineMaterial = new THREE.LineBasicMaterial({
      color: OUTLINE_COLORS.primary,
      transparent: true,
      opacity: OUTLINE_OPACITY,
      depthTest: true,
      depthWrite: false,
      toneMapped: false,
    });

    // Material de acento: naranja
    const accentLineMaterial = new THREE.LineBasicMaterial({
      color: OUTLINE_COLORS.accent,
      transparent: true,
      opacity: OUTLINE_OPACITY,
      depthTest: true,
      depthWrite: false,
      toneMapped: false,
    });

    wireframeMaterials.add(primaryLineMaterial);
    wireframeMaterials.add(accentLineMaterial);

    // Seleccionar material por el nombre exacto de la pieza
    const pickLineMaterial = (
      mesh: THREE.Mesh
    ): THREE.LineBasicMaterial => {
      const color = MESH_COLORS[mesh.name];

      if (color === OUTLINE_COLORS.accent) {
        return accentLineMaterial;
      }

      return primaryLineMaterial;
    };

    const loader = new FBXLoader();

    loader.load(
      MODEL_PATH,
      (fbx) => {
        model = fbx;

        // Centrar y escalar el modelo sin modificar la cámara
        const box = new THREE.Box3().setFromObject(fbx);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDimension = Math.max(
          size.x,
          size.y,
          size.z
        );

        const scaleFactor =
          maxDimension > 0 ? MODEL_SIZE / maxDimension : 1;

        fbx.scale.setScalar(scaleFactor);
        fbx.position.sub(
          center.clone().multiplyScalar(scaleFactor)
        );

        // -----------------------------------------------
        // DIAGNÓSTICO DE LA ESTRUCTURA DEL FBX
        // -----------------------------------------------

        const meshes: THREE.Mesh[] = [];

        let totalObjects = 0;
        let totalGroups = 0;

        console.group("Canon_AT-1 | Diagnóstico del FBX");

        fbx.traverse((object) => {
          totalObjects++;

          if (object instanceof THREE.Group) {
            totalGroups++;
          }

          if (object instanceof THREE.Mesh) {
            meshes.push(object);
          }

          if (DEBUG_LOG_NAMES) {
            const mesh =
              object instanceof THREE.Mesh ? object : null;

            console.log({
              tipo: object.type,
              nombre: object.name || "(sin nombre)",
              padre: object.parent?.name || "(raíz)",
              hijosDirectos: object.children.length,
              esMesh: Boolean(mesh),
              geometria: mesh?.geometry.type,
              vertices:
                mesh?.geometry.attributes.position?.count ?? 0,
              triangulos: mesh
                ? mesh.geometry.index
                  ? mesh.geometry.index.count / 3
                  : (mesh.geometry.attributes.position?.count ?? 0) / 3
                : undefined,
            });
          }
        });

        console.log("Resumen de la jerarquía:", {
          objetosTotales: totalObjects,
          grupos: totalGroups,
          meshes: meshes.length,
          coloresDisponibles: Object.keys(OUTLINE_COLORS).length,
        });

        console.table(
          meshes.map((mesh, index) => {
            const meshBox = new THREE.Box3().setFromObject(mesh);
            const meshSize = meshBox.getSize(
              new THREE.Vector3()
            );

            const material = pickLineMaterial(mesh);

            return {
              indice: index,
              nombre: mesh.name || `Mesh_${index}`,
              padre: mesh.parent?.name || "(raíz)",
              hijos: mesh.children.length,
              vertices:
                mesh.geometry.attributes.position?.count ?? 0,
              ancho: Number(meshSize.x.toFixed(3)),
              alto: Number(meshSize.y.toFixed(3)),
              profundidad: Number(meshSize.z.toFixed(3)),
              color: `#${material.color.getHexString()}`,
              asignacion: MESH_COLORS[mesh.name]
                ? "Personalizado"
                : "Color principal por defecto",
            };
          })
        );

        console.groupEnd();

        // -----------------------------------------------
        // CREAR EL WIREFRAME DE CADA MESH
        // -----------------------------------------------

        meshes.forEach((mesh, index) => {
          const lineGeometry = FULL_WIREFRAME
            ? new THREE.WireframeGeometry(mesh.geometry)
            : new THREE.EdgesGeometry(
                mesh.geometry,
                EDGE_ANGLE_THRESHOLD
              );

          wireframeGeometries.add(lineGeometry);

          const lineMaterial = pickLineMaterial(mesh);

          console.log(
            `[Wireframe ${index}]`,
            mesh.name || `Mesh_${index}`,
            `Color: #${lineMaterial.color.getHexString()}`
          );

          const lines = new THREE.LineSegments(
            lineGeometry,
            lineMaterial
          );

          lines.name = `Wireframe_${mesh.name || index}`;
          lines.renderOrder = 1;

          // Hereda la transformación de la malla
          mesh.add(lines);

          // Guardar material original para la limpieza
          mesh.userData.originalMaterial = mesh.material;

          // Ocultar el sólido si SHOW_SOLID es false
          mesh.material = ghostMaterial;
        });

        console.info(
          `Wireframe generado: ${meshes.length} mallas procesadas.`
        );

        modelRoot.add(fbx);
      },
      undefined,
      (error) => {
        console.error("Error al cargar el FBX:", error);
      }
    );

    // Seguimiento del mouse
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = mount.getBoundingClientRect();

      if (!rect.width || !rect.height) return;

      mouseX =
        ((event.clientX - rect.left) / rect.width - 0.5) * 2;

      mouseY =
        ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    mount.addEventListener("mousemove", onMouseMove);

    // Resize
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;

      if (!w || !h) return;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    // Animación
    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const targetY = mouseX * 0.6;
      const targetX = mouseY * 0.3;

      modelRoot.rotation.y +=
        (targetY - modelRoot.rotation.y) * 0.05;

      modelRoot.rotation.x +=
        (targetX - modelRoot.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Limpieza
    return () => {
      cancelAnimationFrame(frameId);

      mount.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      scene.remove(modelRoot);

      wireframeGeometries.forEach((geometry) => {
        geometry.dispose();
      });

      wireframeMaterials.forEach((material) => {
        material.dispose();
      });

      ghostMaterial.dispose();

      if (model) {
        const geometries = new Set<THREE.BufferGeometry>();
        const materials = new Set<THREE.Material>();

        model.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;

          geometries.add(object.geometry);

          const original = object.userData.originalMaterial;

          if (original) {
            (Array.isArray(original) ? original : [original])
              .forEach((material) => {
                materials.add(material);
              });
          }
        });

        geometries.forEach((geometry) => {
          geometry.dispose();
        });

        materials.forEach((material) => {
          material.dispose();
        }); 
      }

      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
