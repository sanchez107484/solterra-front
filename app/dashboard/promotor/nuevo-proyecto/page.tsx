"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Zap, ArrowLeft, Briefcase, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NuevoProyecto() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    tipo: "solar",
    capacidad: "",
    descripcion: "",
    provincias: "",
    hectareasMin: "",
    hectareasMax: "",
    presupuesto: "",
    timeline: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Guardar en base de datos
    router.push("/dashboard/promotor")
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/promotor" className="flex items-center gap-3">
              <div className="rounded-xl bg-secondary p-2 shadow-lg">
                <Zap className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold">Solterra</span>
                <p className="text-xs text-muted-foreground">Nuevo proyecto</p>
              </div>
            </Link>
          </div>
          <Link href="/dashboard/promotor">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Progress indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    step >= s
                      ? "bg-secondary border-secondary text-secondary-foreground"
                      : "border-muted-foreground/30 text-muted-foreground"
                  }`}
                >
                  {step > s ? <Check className="h-5 w-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${step > s ? "bg-secondary" : "bg-muted-foreground/30"}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm">
            <span className={step >= 1 ? "text-foreground font-medium" : "text-muted-foreground"}>
              Información del proyecto
            </span>
            <span className={step >= 2 ? "text-foreground font-medium" : "text-muted-foreground"}>
              Requisitos del terreno
            </span>
            <span className={step >= 3 ? "text-foreground font-medium" : "text-muted-foreground"}>
              Detalles adicionales
            </span>
          </div>
        </div>

        <Card className="p-8 shadow-xl border-2">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Información del proyecto */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-flex rounded-2xl bg-secondary/10 p-4 mb-4">
                    <Briefcase className="h-10 w-10 text-secondary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Información del proyecto</h2>
                  <p className="text-muted-foreground">Cuéntanos sobre tu proyecto renovable</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre del proyecto</Label>
                  <Input
                    id="nombre"
                    placeholder="Ej: Parque Solar Extremadura"
                    className="h-12"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa promotora</Label>
                  <Input
                    id="empresa"
                    placeholder="Ej: Energías Renovables S.L."
                    className="h-12"
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tipo de proyecto</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, tipo: "solar" })}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        formData.tipo === "solar"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="font-semibold mb-1">Solar</div>
                      <div className="text-sm text-muted-foreground">Paneles fotovoltaicos</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, tipo: "eolico" })}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        formData.tipo === "eolico"
                          ? "border-secondary bg-secondary/5"
                          : "border-border hover:border-secondary/50"
                      }`}
                    >
                      <div className="font-semibold mb-1">Eólico</div>
                      <div className="text-sm text-muted-foreground">Aerogeneradores</div>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacidad">Capacidad estimada (MW)</Label>
                  <Input
                    id="capacidad"
                    type="number"
                    step="0.1"
                    placeholder="Ej: 20"
                    className="h-12"
                    value={formData.capacidad}
                    onChange={(e) => setFormData({ ...formData, capacidad: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción del proyecto</Label>
                  <Textarea
                    id="descripcion"
                    placeholder="Describe los objetivos y características principales de tu proyecto..."
                    className="min-h-32"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  />
                </div>

                <Button type="button" onClick={nextStep} className="w-full h-12 bg-secondary hover:bg-secondary/90">
                  Continuar
                </Button>
              </div>
            )}

            {/* Step 2: Requisitos del terreno */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-flex rounded-2xl bg-secondary/10 p-4 mb-4">
                    <Briefcase className="h-10 w-10 text-secondary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Requisitos del terreno</h2>
                  <p className="text-muted-foreground">Define qué tipo de terreno necesitas</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="provincias">Provincias de interés</Label>
                  <Input
                    id="provincias"
                    placeholder="Ej: Badajoz, Cáceres, Albacete"
                    className="h-12"
                    value={formData.provincias}
                    onChange={(e) => setFormData({ ...formData, provincias: e.target.value })}
                    required
                  />
                  <p className="text-sm text-muted-foreground">Separa múltiples provincias con comas</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hectareasMin">Hectáreas mínimas</Label>
                    <Input
                      id="hectareasMin"
                      type="number"
                      step="0.1"
                      placeholder="Ej: 10"
                      className="h-12"
                      value={formData.hectareasMin}
                      onChange={(e) => setFormData({ ...formData, hectareasMin: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hectareasMax">Hectáreas máximas</Label>
                    <Input
                      id="hectareasMax"
                      type="number"
                      step="0.1"
                      placeholder="Ej: 50"
                      className="h-12"
                      value={formData.hectareasMax}
                      onChange={(e) => setFormData({ ...formData, hectareasMax: e.target.value })}
                    />
                  </div>
                </div>

                <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-6">
                  <h3 className="font-semibold mb-3">Características deseables del terreno</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-input" />
                      <span className="text-sm">Acceso por carretera asfaltada</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-input" />
                      <span className="text-sm">Suministro eléctrico cercano</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-input" />
                      <span className="text-sm">Terreno llano o con poca pendiente</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-input" />
                      <span className="text-sm">Sin restricciones urbanísticas</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" onClick={prevStep} variant="outline" className="flex-1 h-12 bg-transparent">
                    Atrás
                  </Button>
                  <Button type="button" onClick={nextStep} className="flex-1 h-12 bg-secondary hover:bg-secondary/90">
                    Continuar
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Detalles adicionales */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-flex rounded-2xl bg-secondary/10 p-4 mb-4">
                    <Briefcase className="h-10 w-10 text-secondary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Detalles adicionales</h2>
                  <p className="text-muted-foreground">Información sobre presupuesto y timeline</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="presupuesto">Presupuesto estimado (€)</Label>
                  <Input
                    id="presupuesto"
                    type="number"
                    placeholder="Ej: 15000000"
                    className="h-12"
                    value={formData.presupuesto}
                    onChange={(e) => setFormData({ ...formData, presupuesto: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground">Esta información es privada y solo orientativa</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline del proyecto</Label>
                  <Textarea
                    id="timeline"
                    placeholder="Describe las fases y plazos estimados del proyecto..."
                    className="min-h-24"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  />
                </div>

                <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-6">
                  <h3 className="font-semibold mb-2 text-secondary">Próximos pasos</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Tu proyecto será revisado por nuestro equipo</li>
                    <li>• Recibirás matches con terrenos compatibles</li>
                    <li>• Podrás contactar directamente con los propietarios</li>
                    <li>• Accederás a herramientas de análisis y comparación</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button type="button" onClick={prevStep} variant="outline" className="flex-1 h-12 bg-transparent">
                    Atrás
                  </Button>
                  <Button type="submit" className="flex-1 h-12 bg-secondary hover:bg-secondary/90">
                    Crear proyecto
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Card>
      </main>
    </div>
  )
}
