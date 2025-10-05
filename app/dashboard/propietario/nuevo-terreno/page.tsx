"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Leaf, ArrowLeft, MapPin, Upload, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NuevoTerreno() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    nombre: "",
    provincia: "",
    municipio: "",
    hectareas: "",
    tipo: "solar",
    descripcion: "",
    coordenadas: "",
    acceso: "",
    suministro: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Guardar en base de datos
    router.push("/dashboard/propietario")
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/propietario" className="flex items-center gap-3">
              <div className="rounded-xl bg-primary p-2 shadow-lg">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold">Solterra</span>
                <p className="text-xs text-muted-foreground">Añadir terreno</p>
              </div>
            </Link>
          </div>
          <Link href="/dashboard/propietario">
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
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-muted-foreground/30 text-muted-foreground"
                  }`}
                >
                  {step > s ? <Check className="h-5 w-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${step > s ? "bg-primary" : "bg-muted-foreground/30"}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm">
            <span className={step >= 1 ? "text-foreground font-medium" : "text-muted-foreground"}>
              Información básica
            </span>
            <span className={step >= 2 ? "text-foreground font-medium" : "text-muted-foreground"}>
              Detalles técnicos
            </span>
            <span className={step >= 3 ? "text-foreground font-medium" : "text-muted-foreground"}>Documentación</span>
          </div>
        </div>

        <Card className="p-8 shadow-xl border-2">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Información básica */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-flex rounded-2xl bg-primary/10 p-4 mb-4">
                    <MapPin className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Información básica del terreno</h2>
                  <p className="text-muted-foreground">Cuéntanos sobre tu propiedad</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre del terreno</Label>
                  <Input
                    id="nombre"
                    placeholder="Ej: Finca Los Olivos"
                    className="h-12"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="provincia">Provincia</Label>
                    <Input
                      id="provincia"
                      placeholder="Ej: Badajoz"
                      className="h-12"
                      value={formData.provincia}
                      onChange={(e) => setFormData({ ...formData, provincia: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="municipio">Municipio</Label>
                    <Input
                      id="municipio"
                      placeholder="Ej: Mérida"
                      className="h-12"
                      value={formData.municipio}
                      onChange={(e) => setFormData({ ...formData, municipio: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hectareas">Superficie (hectáreas)</Label>
                  <Input
                    id="hectareas"
                    type="number"
                    step="0.1"
                    placeholder="Ej: 15.5"
                    className="h-12"
                    value={formData.hectareas}
                    onChange={(e) => setFormData({ ...formData, hectareas: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tipo de proyecto preferido</Label>
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
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    placeholder="Describe las características principales de tu terreno..."
                    className="min-h-32"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  />
                </div>

                <Button type="button" onClick={nextStep} className="w-full h-12 bg-primary hover:bg-primary/90">
                  Continuar
                </Button>
              </div>
            )}

            {/* Step 2: Detalles técnicos */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-flex rounded-2xl bg-primary/10 p-4 mb-4">
                    <MapPin className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Detalles técnicos</h2>
                  <p className="text-muted-foreground">Información adicional sobre el terreno</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coordenadas">Coordenadas GPS (opcional)</Label>
                  <Input
                    id="coordenadas"
                    placeholder="Ej: 38.9167, -6.3333"
                    className="h-12"
                    value={formData.coordenadas}
                    onChange={(e) => setFormData({ ...formData, coordenadas: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground">Formato: latitud, longitud</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="acceso">Acceso al terreno</Label>
                  <Textarea
                    id="acceso"
                    placeholder="Describe cómo se accede al terreno (carretera, camino rural, etc.)"
                    className="min-h-24"
                    value={formData.acceso}
                    onChange={(e) => setFormData({ ...formData, acceso: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="suministro">Suministro eléctrico cercano</Label>
                  <Textarea
                    id="suministro"
                    placeholder="Indica si hay líneas eléctricas cercanas y a qué distancia aproximada"
                    className="min-h-24"
                    value={formData.suministro}
                    onChange={(e) => setFormData({ ...formData, suministro: e.target.value })}
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="button" onClick={prevStep} variant="outline" className="flex-1 h-12 bg-transparent">
                    Atrás
                  </Button>
                  <Button type="button" onClick={nextStep} className="flex-1 h-12 bg-primary hover:bg-primary/90">
                    Continuar
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Documentación */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-flex rounded-2xl bg-primary/10 p-4 mb-4">
                    <Upload className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Documentación</h2>
                  <p className="text-muted-foreground">Sube fotos y documentos de tu terreno</p>
                </div>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-medium mb-2">Fotos del terreno</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Arrastra archivos aquí o haz clic para seleccionar
                    </p>
                    <Button type="button" variant="outline" size="sm">
                      Seleccionar archivos
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-medium mb-2">Documentos (opcional)</p>
                    <p className="text-sm text-muted-foreground mb-4">Escrituras, catastro, planos, etc.</p>
                    <Button type="button" variant="outline" size="sm">
                      Seleccionar archivos
                    </Button>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                  <h3 className="font-semibold mb-2 text-primary">Información importante</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Tu terreno será revisado por nuestro equipo antes de publicarse</li>
                    <li>• Recibirás una notificación cuando esté activo</li>
                    <li>• Los promotores interesados podrán contactarte directamente</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button type="button" onClick={prevStep} variant="outline" className="flex-1 h-12 bg-transparent">
                    Atrás
                  </Button>
                  <Button type="submit" className="flex-1 h-12 bg-primary hover:bg-primary/90">
                    Publicar terreno
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
