"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useProyectos } from "@/hooks/useProyectos"
import { useTranslations } from "@/i18n/i18nContext"
import { mapTipoUIToAPI } from "@/lib/mappers/proyecto"
import { ArrowLeft, Briefcase, Check, ChevronRight, Home, Loader2, Zap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NuevoProyecto() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [error, setError] = useState<string | null>(null)
    const { createProyecto, isLoading } = useProyectos({ autoFetch: false })
    const { t } = useTranslations()

    const [formData, setFormData] = useState({
        nombre: "",
        // valor legible en UI; se mapeará a enum API al enviar
        tipo: "Solar",
        capacidad: "",
        descripcion: "",
        provincias: "",
        inversionEstimada: "",
        fechaInicio: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            // Preparar datos para el backend
            const proyectoData = {
                titulo: formData.nombre,
                nombre: formData.nombre,
                // mapear el valor legible de la UI al enum esperado por la API
                tipo: mapTipoUIToAPI(formData.tipo as unknown as string),
                capacidad: parseFloat(formData.capacidad),
                superficieMinima: 0, // Valor por defecto, se puede ajustar según necesidades
                descripcion: formData.descripcion || undefined,
                provincias: formData.provincias ? formData.provincias.split(",").map((p) => p.trim()) : undefined,
                inversionEstimada: formData.inversionEstimada ? parseFloat(formData.inversionEstimada) : undefined,
                fechaInicio: formData.fechaInicio || undefined,
            }

            // Crear proyecto en el backend
            await createProyecto(proyectoData)

            // Redirigir al dashboard con mensaje de éxito
            router.push("/dashboard/promotor?success=proyecto-creado")
        } catch (err: any) {
            console.error("Error al crear proyecto:", err)
            setError(err.message || "Error al crear el proyecto. Por favor, inténtalo de nuevo.")
        }
    }

    const nextStep = () => setStep(step + 1)
    const prevStep = () => setStep(step - 1)

    return (
        <div className="from-background via-secondary/5 to-background min-h-screen bg-gradient-to-br">
            {/* Header */}
            <header className="border-border/50 bg-background/95 sticky top-0 z-50 border-b shadow-sm backdrop-blur-lg">
                <div className="container mx-auto px-6 py-4">
                    <div className="mb-3 flex items-center justify-between">
                        <Link href="/dashboard/promotor" className="group flex items-center gap-3">
                            <div className="from-secondary to-secondary/80 rounded-xl bg-gradient-to-br p-2.5 shadow-lg transition-shadow group-hover:shadow-xl">
                                <Zap className="text-secondary-foreground h-6 w-6" />
                            </div>
                            <div>
                                <span className="from-secondary to-secondary/70 bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
                                    Solterra
                                </span>
                                <p className="text-muted-foreground text-xs">{t?.common?.marketplace}</p>
                            </div>
                        </Link>
                        <Link href="/dashboard/promotor">
                            <Button variant="ghost" size="sm" className="hover:bg-secondary/10 gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                {t?.common?.backToDashboard}
                            </Button>
                        </Link>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                        <Home className="h-4 w-4" />
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/dashboard/promotor" className="hover:text-foreground transition-colors">
                            {t?.dashboard?.promoter?.dashboard}
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-foreground font-medium">{t?.dashboard?.promoter?.newProject}</span>
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
                                            ? "bg-secondary border-secondary text-secondary-foreground"
                                            : "border-muted-foreground/30 text-muted-foreground"
                                    }`}
                                >
                                    {step > s ? <Check className="h-5 w-5" /> : s}
                                </div>
                                {s < 3 && (
                                    <div
                                        className={`mx-2 h-1 flex-1 transition-all ${step > s ? "bg-secondary" : "bg-muted-foreground/30"}`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className={step >= 1 ? "text-foreground font-medium" : "text-muted-foreground"}>
                            {t?.forms?.projectInfoTitle}
                        </span>
                        <span className={step >= 2 ? "text-foreground font-medium" : "text-muted-foreground"}>
                            {t?.forms?.requirementsTitle}
                        </span>
                        <span className={step >= 3 ? "text-foreground font-medium" : "text-muted-foreground"}>
                            {t?.forms?.additionalDetailsTitle}
                        </span>
                    </div>
                </div>

                <Card className="border-2 p-8 shadow-xl">
                    {error && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
                            <p className="font-medium">Error</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Step 1: Información del proyecto */}
                        {step === 1 && (
                            <div className="space-y-6">
                                <div className="mb-8 text-center">
                                    <div className="bg-secondary/10 mb-4 inline-flex rounded-2xl p-4">
                                        <Briefcase className="text-secondary h-10 w-10" />
                                    </div>
                                    <h2 className="mb-2 text-3xl font-bold">{t?.forms?.projectInfoTitle}</h2>
                                    <p className="text-muted-foreground">{t?.forms?.projectInfoSubtitle}</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nombre">{t?.forms?.labels?.projectName}</Label>
                                    <Input
                                        id="nombre"
                                        placeholder={t?.forms?.examples?.projectName}
                                        className="h-12"
                                        value={formData.nombre}
                                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>{t?.forms?.labels?.projectType}</Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, tipo: "Solar" })}
                                            className={`rounded-xl border-2 p-6 text-left transition-all ${
                                                formData.tipo === "Solar"
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border hover:border-primary/50"
                                            }`}
                                        >
                                            <div className="mb-1 font-semibold">{t?.forms?.examples?.solar}</div>
                                            <div className="text-muted-foreground text-sm">{t?.forms?.examples?.solarDesc}</div>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, tipo: "Eólico" })}
                                            className={`rounded-xl border-2 p-6 text-left transition-all ${
                                                formData.tipo === "Eólico"
                                                    ? "border-secondary bg-secondary/5"
                                                    : "border-border hover:border-secondary/50"
                                            }`}
                                        >
                                            <div className="mb-1 font-semibold">{t?.forms?.examples?.wind}</div>
                                            <div className="text-muted-foreground text-sm">{t?.forms?.examples?.windDesc}</div>
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="capacidad">{t?.forms?.labels?.capacity}</Label>
                                    <Input
                                        id="capacidad"
                                        type="number"
                                        step="0.1"
                                        placeholder={t?.forms?.examples?.capacity}
                                        className="h-12"
                                        value={formData.capacidad}
                                        onChange={(e) => setFormData({ ...formData, capacidad: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="descripcion">{t?.forms?.labels?.description}</Label>
                                    <Textarea
                                        id="descripcion"
                                        placeholder={t?.forms?.examples?.projectDescription}
                                        className="min-h-32"
                                        value={formData.descripcion}
                                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                    />
                                </div>

                                <Button type="button" onClick={nextStep} className="bg-secondary hover:bg-secondary/90 h-12 w-full">
                                    {t?.common?.continue}
                                </Button>
                            </div>
                        )}

                        {/* Step 2: Requisitos del terreno */}
                        {step === 2 && (
                            <div className="space-y-6">
                                <div className="mb-8 text-center">
                                    <div className="bg-secondary/10 mb-4 inline-flex rounded-2xl p-4">
                                        <Briefcase className="text-secondary h-10 w-10" />
                                    </div>
                                    <h2 className="mb-2 text-3xl font-bold">{t?.forms?.requirementsTitle}</h2>
                                    <p className="text-muted-foreground">{t?.forms?.requirementsSubtitle}</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="provincias">{t?.forms?.labels?.provinces}</Label>
                                    <Input
                                        id="provincias"
                                        placeholder={t?.forms?.examples?.provinces}
                                        className="h-12"
                                        value={formData.provincias}
                                        onChange={(e) => setFormData({ ...formData, provincias: e.target.value })}
                                    />
                                    <p className="text-muted-foreground text-sm">
                                        Separa las provincias con comas (ej: Badajoz, Cáceres, Toledo)
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <Button type="button" onClick={prevStep} variant="outline" className="h-12 flex-1 bg-transparent">
                                        {t?.common?.back}
                                    </Button>
                                    <Button type="button" onClick={nextStep} className="bg-secondary hover:bg-secondary/90 h-12 flex-1">
                                        {t?.common?.continue}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Detalles adicionales */}
                        {step === 3 && (
                            <div className="space-y-6">
                                <div className="mb-8 text-center">
                                    <div className="bg-secondary/10 mb-4 inline-flex rounded-2xl p-4">
                                        <Briefcase className="text-secondary h-10 w-10" />
                                    </div>
                                    <h2 className="mb-2 text-3xl font-bold">{t?.forms?.additionalDetailsTitle}</h2>
                                    <p className="text-muted-foreground">{t?.forms?.additionalDetailsSubtitle}</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="inversionEstimada">{t?.forms?.labels?.budget}</Label>
                                    <Input
                                        id="inversionEstimada"
                                        type="number"
                                        placeholder="5000000"
                                        className="h-12"
                                        value={formData.inversionEstimada}
                                        onChange={(e) => setFormData({ ...formData, inversionEstimada: e.target.value })}
                                    />
                                    <p className="text-muted-foreground text-sm">Inversión estimada en euros (opcional)</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="fechaInicio">{t?.forms?.labels?.timeline}</Label>
                                    <Input
                                        id="fechaInicio"
                                        type="date"
                                        className="h-12"
                                        value={formData.fechaInicio}
                                        onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                                    />
                                    <p className="text-muted-foreground text-sm">Fecha estimada de inicio del proyecto (opcional)</p>
                                </div>

                                <div className="bg-secondary/5 border-secondary/20 rounded-xl border p-6">
                                    <h3 className="text-secondary mb-2 font-semibold">{t?.forms?.nextStepsTitle}</h3>
                                    <ul className="text-muted-foreground space-y-1 text-sm">
                                        <li>{t?.forms?.nextSteps?.step1}</li>
                                        <li>{t?.forms?.nextSteps?.step2}</li>
                                        <li>{t?.forms?.nextSteps?.step3}</li>
                                        <li>{t?.forms?.nextSteps?.step4}</li>
                                    </ul>
                                </div>

                                <div className="flex gap-4">
                                    <Button type="button" onClick={prevStep} variant="outline" className="h-12 flex-1 bg-transparent">
                                        {t?.common?.back}
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-secondary hover:bg-secondary/90 h-12 flex-1 gap-2"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Creando...
                                            </>
                                        ) : (
                                            t?.common?.createProject || "Crear Proyecto"
                                        )}
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
