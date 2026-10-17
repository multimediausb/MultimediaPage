import { useState } from "react"
import Card from "../../ui/Card"
import Button from "../../ui/Button"
import Badge from "../../ui/Badge"
import pdfSrc from "@/imports/Media_Show_2023-1.pdf"

export default function NextEventRegistrationSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "estudiante",
    attendance: "presencial",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return
    setSubmitted(true)
  }

  return (
    <div id="registration-section" className="sticky top-24">
      <Card
        accentColor="var(--color-secondary-500)"
        accentTop
        shadowType="orange"
        className="p-6 md:p-8"
      >
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" pulse>
            INSCRIPCIÓN ABIERTA
          </Badge>
          <span className="text-b4 font-display text-neutral-500">
            CUPOS LIMITADOS
          </span>
        </div>

        <h3
          className="text-h5 font-heading mb-4"
          style={{ color: "var(--color-neutral-900)" }}
        >
          Registro Oficial
        </h3>

        {/* Detalles clave */}
        <div className="space-y-3 mb-6 pb-6 border-b border-neutral-200">
          {[
            { label: "Modalidad", value: "Presencial + Transmisión Online" },
            {
              label: "Cupos presenciales",
              value: "200 asistentes (Quedan 34)",
            },
            { label: "Inversión", value: "Gratuito — Previa confirmación" },
            {
              label: "Certificación",
              value: "Constancia de asistencia digital",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-baseline gap-2"
            >
              <span className="text-b4 font-display text-neutral-500">
                {item.label}:
              </span>
              <span className="text-b3 font-display font-medium text-neutral-900 text-right">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <span className="text-3xl mb-2 block">🎉</span>
            <h4 className="text-h6 font-heading text-emerald-800 mb-2">
              ¡Pre-inscripción Exitosa!
            </h4>
            <p className="text-b3 font-display text-emerald-700 leading-relaxed mb-4">
              Hemos enviado las instrucciones y el acceso al correo:{" "}
              <strong>{formData.email}</strong>.
            </p>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setSubmitted(false)}
            >
              REGISTRAR OTRO ASISTENTE
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-b4 font-display uppercase tracking-wider text-neutral-700 mb-1.5">
                Nombre Completo *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Ej. Camila Morales"
                className="w-full text-b3 font-display py-2.5 px-3.5 rounded-lg border border-neutral-300 focus:outline-none focus:border-secondary-500"
              />
            </div>

            <div>
              <label className="block text-b4 font-display uppercase tracking-wider text-neutral-700 mb-1.5">
                Correo Electrónico *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="camila@correo.com"
                className="w-full text-b3 font-display py-2.5 px-3.5 rounded-lg border border-neutral-300 focus:outline-none focus:border-secondary-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-b4 font-display uppercase tracking-wider text-neutral-700 mb-1.5">
                  Rol
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full text-b3 font-display py-2.5 px-2.5 rounded-lg border border-neutral-300 bg-white focus:outline-none"
                >
                  <option value="estudiante">Estudiante</option>
                  <option value="egresado">Egresado</option>
                  <option value="docente">Docente</option>
                  <option value="profesional">Profesional externo</option>
                </select>
              </div>

              <div>
                <label className="block text-b4 font-display uppercase tracking-wider text-neutral-700 mb-1.5">
                  Asistencia
                </label>
                <select
                  value={formData.attendance}
                  onChange={(e) =>
                    setFormData({ ...formData, attendance: e.target.value })
                  }
                  className="w-full text-b3 font-display py-2.5 px-2.5 rounded-lg border border-neutral-300 bg-white focus:outline-none"
                >
                  <option value="presencial">Presencial (USB)</option>
                  <option value="virtual">Virtual (Streaming)</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              variant="secondary"
              size="md"
              className="w-full mt-2"
            >
              CONFIRMAR MI CUPO
            </Button>
          </form>
        )}

        <div className="pt-4 border-t border-neutral-200">
          <Button
            variant="outline-secondary"
            size="sm"
            asLink
            href={pdfSrc}
            download="Media_Show_2023-1.pdf"
            className="w-full"
            leftIcon={
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            }
          >
            DESCARGAR REQUERIMIENTOS (PDF)
          </Button>
        </div>
      </Card>
    </div>
  )
}
