"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Check, ChevronRight, Home, Leaf, MapPin, Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

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
        <div className="from-background via-primary/5 to-background min-h-screen bg-gradient-to-br">
            <header className="border-border/50 bg-background/95 sticky top-0 z-50 border-b shadow-sm backdrop-blur-lg">
                <div className="container mx-auto px-6 py-4">
                    <div className="mb-3 flex items-center justify-between">
                        <Link href="/dashboard/propietario" className="group flex items-center gap-3">
                            <div className="from-primary to-primary/80 rounded-xl bg-gradient-to-br p-2.5 shadow-lg transition-shadow group-hover:shadow-xl">
                                <Leaf className="text-primary-foreground h-6 w-6" />
                            </div>
                            <div>
                                <span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
                                    Solterra
                                </span>
                                <p className="text-muted-foreground text-xs">Advisory Marketplace</p>
                            </div>
                        </Link>
                        <Link href="/dashboard/propietario">
                            <Button variant="ghost" size="sm" className="hover:bg-primary/10 gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Volver al dashboard
                            </Button>
                        </Link>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                        <Home className="h-4 w-4" />
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/dashboard/propietario" className="hover:text-foreground transition-colors">
                            Dashboard
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-foreground font-medium">Nuevo Terreno</span>
                    </div>
                </div>
            </header>

            <main className="container mx-auto max-w-4xl px-6 py-12">
                {/* Progress indicator */}
                <div className="mb-12">
                    <div className="mb-4 flex items-center justify-between">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex flex-1 items-center">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                                        step >= s
                                            ? "bg-primary border-primary text-primary-foreground"
                                            : "border-muted-foreground/30 text-muted-foreground"
                                    }`}
                                >
                                    {step > s ? <Check className="h-5 w-5" /> : s}
                                </div>
                                {s < 3 && (
                                    <div
                                        className={`mx-2 h-1 flex-1 transition-all ${step > s ? "bg-primary" : "bg-muted-foreground/30"}`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className={step >= 1 ? "text-foreground font-medium" : "text-muted-foreground"}>Información básica</span>
                        <span className={step >= 2 ? "text-foreground font-medium" : "text-muted-foreground"}>Detalles técnicos</span>
                        <span className={step >= 3 ? "text-foreground font-medium" : "text-muted-foreground"}>Documentación</span>
                    </div>
                </div>

                <Card className="border-2 p-8 shadow-xl">
                    <form onSubmit={handleSubmit}>
                        {/* Step 1: Información básica */}
                        {step === 1 && (
                            <div className="space-y-6">
                                <div className="mb-8 text-center">
                                    <div className="bg-primary/10 mb-4 inline-flex rounded-2xl p-4">
                                        <MapPin className="text-primary h-10 w-10" />
                                    </div>
                                    <h2 className="mb-2 text-3xl font-bold">Información básica del terreno</h2>
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
                                            className={`rounded-xl border-2 p-6 text-left transition-all ${
                                                formData.tipo === "solar"
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border hover:border-primary/50"
                                            }`}
                                        >
                                            <div className="mb-1 font-semibold">Solar</div>
                                            <div className="text-muted-foreground text-sm">Paneles fotovoltaicos</div>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, tipo: "eolico" })}
                                            className={`rounded-xl border-2 p-6 text-left transition-all ${
                                                formData.tipo === "eolico"
                                                    ? "border-secondary bg-secondary/5"
                                                    : "border-border hover:border-secondary/50"
                                            }`}
                                        >
                                            <div className="mb-1 font-semibold">Eólico</div>
                                            <div className="text-muted-foreground text-sm">Aerogeneradores</div>
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

                                <Button type="button" onClick={nextStep} className="bg-primary hover:bg-primary/90 h-12 w-full">
                                    Continuar
                                </Button>
                            </div>
                        )}

                        {/* Step 2: Detalles técnicos */}
                        {step === 2 && (
                            <div className="space-y-6">
                                <div className="mb-8 text-center">
                                    <div className="bg-primary/10 mb-4 inline-flex rounded-2xl p-4">
                                        <MapPin className="text-primary h-10 w-10" />
                                    </div>
                                    <h2 className="mb-2 text-3xl font-bold">Detalles técnicos</h2>
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
                                    <p className="text-muted-foreground text-sm">Formato: latitud, longitud</p>
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
                                    <Button type="button" onClick={prevStep} variant="outline" className="h-12 flex-1 bg-transparent">
                                        Atrás
                                    </Button>
                                    <Button type="button" onClick={nextStep} className="bg-primary hover:bg-primary/90 h-12 flex-1">
                                        Continuar
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Documentación */}
                        {step === 3 && (
                            <div className="space-y-6">
                                <div className="mb-8 text-center">
                                    <div className="bg-primary/10 mb-4 inline-flex rounded-2xl p-4">
                                        <Upload className="text-primary h-10 w-10" />
                                    </div>
                                    <h2 className="mb-2 text-3xl font-bold">Documentación</h2>
                                    <p className="text-muted-foreground">Sube fotos y documentos de tu terreno</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="border-border hover:border-primary/50 cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors">
                                        <Upload className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                                        <p className="mb-2 font-medium">Fotos del terreno</p>
                                        <p className="text-muted-foreground mb-4 text-sm">
                                            Arrastra archivos aquí o haz clic para seleccionar
                                        </p>
                                        <Button type="button" variant="outline" size="sm">
                                            Seleccionar archivos
                                        </Button>
                                    </div>

                                    <div className="border-border hover:border-primary/50 cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors">
                                        <Upload className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                                        <p className="mb-2 font-medium">Documentos (opcional)</p>
                                        <p className="text-muted-foreground mb-4 text-sm">Escrituras, catastro, planos, etc.</p>
                                        <Button type="button" variant="outline" size="sm">
                                            Seleccionar archivos
                                        </Button>
                                    </div>
                                </div>

                                <div className="bg-primary/5 border-primary/20 rounded-xl border p-6">
                                    <h3 className="text-primary mb-2 font-semibold">Información importante</h3>
                                    <ul className="text-muted-foreground space-y-1 text-sm">
                                        <li>• Tu terreno será revisado por nuestro equipo antes de publicarse</li>
                                        <li>• Recibirás una notificación cuando esté activo</li>
                                        <li>• Los promotores interesados podrán contactarte directamente</li>
                                    </ul>
                                </div>

                                <div className="flex gap-4">
                                    <Button type="button" onClick={prevStep} variant="outline" className="h-12 flex-1 bg-transparent">
                                        Atrás
                                    </Button>
                                    <Button type="submit" className="bg-primary hover:bg-primary/90 h-12 flex-1">
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
