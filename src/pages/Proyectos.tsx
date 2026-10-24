import PageBanner from "../components/ui/PageBanner"
import SectionHeader from "../components/ui/SectionHeader"

export default function Proyectos() {
  return (
    <div className="min-h-screen pb-20">
      <PageBanner
        image="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&h=600&fit=crop&auto=format"
        alt="Proyectos multimedia creativos"
        label="Proyectos"
        title="Nuestros Proyectos"
        accent="var(--accent)"
      />
      <div className="max-w-screen-xl mx-auto px-6 pt-12">
        <SectionHeader
          label="Proyectos"
          title="Trabajos Destacados"
          subtitle="Producciones, desarrollos y creaciones del Programa de Ingeniería Multimedia."
          accent="accent"
        />
        <p className="font-body text-sm mt-8" style={{ color: "var(--fg-muted)" }}>
          Próximamente: catálogo completo de proyectos estudiantiles y de investigación.
        </p>
      </div>
    </div>
  )
}
