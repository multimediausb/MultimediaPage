import VideoReel from "../../graphics/VideoReel"
import Badge from "../../ui/Badge"

export default function NextEventVideoSection() {
  return (
    <section className="py-16">
      <div className="flex items-center gap-3 mb-4">
        <Badge variant="primary">CONTENIDO MULTIMEDIA</Badge>
        <span className="text-b4 font-display text-neutral-400">
          PRODUCCIÓN DESTACADA
        </span>
      </div>

      <h2
        className="text-h4 font-heading mb-8"
        style={{ color: "var(--color-neutral-900)" }}
      >
        Segunda Creación Colectiva
      </h2>

      <VideoReel
        videoId="0gQwwXwgSUs"
        title="Animación Digital Colectiva"
        description="Conoce la segunda creación colectiva del USB Medialab: animación digital con personajes icónicos al ritmo de 'Thrift Shop', desarrollada por estudiantes de Ingeniería Multimedia."
      />
    </section>
  )
}
