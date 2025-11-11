"use client"

import type React from "react"

import { StatsCard } from "@/components/dashboard"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import ProtectedRoute from "@/components/protected-route"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAppData } from "@/hooks/useAppData"
import { useProyectos } from "@/hooks/useProyectos"
import { useTranslations } from "@/i18n/i18nContext"
import { useErrorHandler } from "@/lib/error-handler"
import type { CreateProyectoDTO, TipoProyecto } from "@/types/proyecto.types"
import {
    AlertCircle,
    ArrowLeft,
    Battery,
    Briefcase,
    Check,
    CheckCircle,
    ChevronRight,
    Euro,
    Layers,
    Loader2,
    MapPin,
    Sun,
    Wind,
    Zap,
    Zap as ZapIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Mapeo de tipos de UI a API
const tipoProyectoMap: Record<string, TipoProyecto> = {
    Solar: "SOLAR_FOTOVOLTAICO",
    Eólico: "EOLICO",
    Hibridación: "HIBRIDACION",
    Almacenamiento: "ALMACENAMIENTO",
    Hidrógeno: "HIDROGENO",
    Biometano: "BIOMETANO",
}

export default function NuevoProyecto() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const { createProyecto, isLoading } = useProyectos({
        autoFetch: false,
        withErrorHandling: true,
    })
    const { provincias, loadProvincias } = useAppData()
    const { handleError, showSuccess } = useErrorHandler()
    const { t } = useTranslations()
    const { toast } = useToast()

    const [formData, setFormData] = useState({
        titulo: "",
        tipo: "SOLAR_FOTOVOLTAICO" as TipoProyecto,
        descripcion: "",
        presupuesto: "",
        potenciaObjetivo: "",
        superficieMinima: "",
        superficieMaxima: "",
        distanciaMaximaRed: "",
        capacidadSubestacionMinima: "",
        ubicacion: "",
        provincia: "",
        comunidad: "",
    })

    const [validationErrors, setValidationErrors] = useState<string[]>([])

    useEffect(() => {
        loadProvincias()
    }, [loadProvincias])

    const validate = (): string[] => {
        const errors: string[] = []

        if (!formData.titulo.trim()) {
            errors.push("El título del proyecto es obligatorio")
        }

        if (!formData.tipo) {
            errors.push("Debes seleccionar un tipo de proyecto")
        }

        const superficie = parseFloat(formData.superficieMinima)
        if (!formData.superficieMinima || isNaN(superficie) || superficie <= 0) {
            errors.push("La superficie mínima debe ser mayor a 0 hectáreas")
        }

        if (formData.presupuesto && (isNaN(parseFloat(formData.presupuesto)) || parseFloat(formData.presupuesto) <= 0)) {
            errors.push("El presupuesto debe ser un número válido mayor a 0")
        }

        if (formData.potenciaObjetivo && (isNaN(parseFloat(formData.potenciaObjetivo)) || parseFloat(formData.potenciaObjetivo) <= 0)) {
            errors.push("La potencia objetivo debe ser un número válido mayor a 0")
        }

        return errors
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validar formulario
        const errors = validate()
        if (errors.length > 0) {
            setValidationErrors(errors)
            window.scrollTo({ top: 0, behavior: "smooth" })
            return
        }

        setValidationErrors([])

        try {
            const proyectoData: CreateProyectoDTO = {
                titulo: formData.titulo,
                tipo: formData.tipo,
                superficieMinima: parseFloat(formData.superficieMinima),
                descripcion: formData.descripcion || undefined,
                presupuesto: formData.presupuesto ? parseFloat(formData.presupuesto) : undefined,
                potenciaObjetivo: formData.potenciaObjetivo ? parseFloat(formData.potenciaObjetivo) : undefined,
                superficieMaxima: formData.superficieMaxima ? parseFloat(formData.superficieMaxima) : undefined,
                distanciaMaximaRed: formData.distanciaMaximaRed ? parseFloat(formData.distanciaMaximaRed) : undefined,
                capacidadSubestacionMinima: formData.capacidadSubestacionMinima
                    ? parseFloat(formData.capacidadSubestacionMinima)
                    : undefined,
                ubicacion: formData.ubicacion || undefined,
                provincia: formData.provincia || undefined,
                comunidad: formData.comunidad || undefined,
            }

            await createProyecto(proyectoData)

            // El servicio con error handling automático ya muestra el mensaje de éxito
            router.push("/dashboard/promotor")
        } catch (error) {
            // El error ya está manejado por el servicio
            console.error("Error al crear proyecto:", error)
        }
    }

    const validateStep = (currentStep: number): string[] => {
        const errors: string[] = []

        if (currentStep === 1) {
            // Validación del paso 1: Información del Proyecto
            if (!formData.titulo.trim()) {
                errors.push("El título del proyecto es obligatorio")
            }
            if (!formData.tipo) {
                errors.push("El tipo de proyecto es obligatorio")
            }
            if (!formData.potenciaObjetivo || parseFloat(formData.potenciaObjetivo) <= 0) {
                errors.push("La potencia objetivo debe ser mayor a 0 MW")
            }
        } else if (currentStep === 2) {
            // Validación del paso 2: Ubicación y Requisitos
            if (!formData.provincia.trim()) {
                errors.push("La provincia es obligatoria")
            }
            if (!formData.superficieMinima || parseFloat(formData.superficieMinima) <= 0) {
                errors.push("La superficie mínima debe ser mayor a 0 hectáreas")
            }
            if (!formData.presupuesto || parseFloat(formData.presupuesto) <= 0) {
                errors.push("El presupuesto debe ser mayor a 0")
            }
        } else if (currentStep === 3) {
            // Validación del paso 3: Detalles Técnicos y Financieros
            if (formData.distanciaMaximaRed && parseFloat(formData.distanciaMaximaRed) < 0) {
                errors.push("La distancia máxima a red debe ser un número positivo")
            }
            if (formData.capacidadSubestacionMinima && parseFloat(formData.capacidadSubestacionMinima) < 0) {
                errors.push("La capacidad de subestación debe ser un número positivo")
            }
        }

        return errors
    }

    const nextStep = () => {
        const stepErrors = validateStep(step)
        if (stepErrors.length > 0) {
            setValidationErrors(stepErrors)
            toast({
                title: "Campos obligatorios",
                description: "Por favor, completa todos los campos obligatorios antes de continuar",
                variant: "destructive",
            })
            return
        }

        setValidationErrors([])
        setStep(step + 1)
    }

    const prevStep = () => {
        setValidationErrors([])
        setStep(step - 1)
    }

    const getStepIcon = (stepNumber: number) => {
        switch (stepNumber) {
            case 1:
                return <Briefcase className="h-5 w-5" />
            case 2:
                return <MapPin className="h-5 w-5" />
            case 3:
                return <CheckCircle className="h-5 w-5" />
            default:
                return stepNumber
        }
    }

    const getTipoIcon = (tipo: TipoProyecto) => {
        switch (tipo) {
            case "SOLAR_FOTOVOLTAICO":
                return <Sun className="h-6 w-6" />
            case "EOLICO":
                return <Wind className="h-6 w-6" />
            case "HIBRIDACION":
                return <Layers className="h-6 w-6" />
            case "ALMACENAMIENTO":
                return <Battery className="h-6 w-6" />
            case "HIDROGENO":
                return <ZapIcon className="h-6 w-6" />
            case "BIOMETANO":
                return <Zap className="h-6 w-6" />
            default:
                return <Briefcase className="h-6 w-6" />
        }
    }

    const getTipoLabel = (tipo: TipoProyecto) => {
        const labels = {
            SOLAR_FOTOVOLTAICO: "Solar Fotovoltaico",
            EOLICO: "Eólico",
            HIBRIDACION: "Hibridación",
            ALMACENAMIENTO: "Almacenamiento",
            HIDROGENO: "Hidrógeno Verde",
            BIOMETANO: "Biometano",
        }
        return labels[tipo] || tipo
    }

    const getTipoDescription = (tipo: TipoProyecto) => {
        const descriptions = {
            SOLAR_FOTOVOLTAICO: "Generación de energía mediante paneles solares",
            EOLICO: "Generación de energía mediante aerogeneradores",
            HIBRIDACION: "Combinación de tecnologías renovables",
            ALMACENAMIENTO: "Sistemas de almacenamiento de energía",
            HIDROGENO: "Producción de hidrógeno verde",
            BIOMETANO: "Producción de biometano renovable",
        }
        return descriptions[tipo] || ""
    }

    return (
        <ProtectedRoute requiredRole="PROMOTOR" redirectTo="/login/promotor">
            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
                <DashboardSidebar userType="promotor" />
                <div className="flex-1">
                    <DashboardHeader
                        title="Nuevo Proyecto"
                        breadcrumbs={[
                            { label: t?.dashboard?.breadcrumbs?.dashboard || "Dashboard", href: "/dashboard/promotor" },
                            { label: t?.dashboard?.breadcrumbs?.newProject || "Nuevo Proyecto" },
                        ]}
                        userType="promotor"
                    />

                    <div className="from-background via-secondary/5 to-background bg-gradient-to-br">
                        <main className="container mx-auto max-w-4xl px-6 py-12">
                            {/* Información útil para el usuario */}
                            <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <StatsCard
                                    icon={ZapIcon}
                                    title="Guía de Potencia"
                                    value="1-50"
                                    subtitle="MW recomendados"
                                    variant="secondary"
                                />
                                <StatsCard
                                    icon={Euro}
                                    title="Inversión Típica"
                                    value="0.8-1.2M"
                                    subtitle="€ por MW instalado"
                                    variant="primary"
                                />
                                <StatsCard
                                    icon={Layers}
                                    title="Superficie Típica"
                                    value="2-3"
                                    subtitle="ha por MW solar"
                                    variant="secondary"
                                />
                                <StatsCard
                                    icon={MapPin}
                                    title="Paso Actual"
                                    value={`${step}/3`}
                                    subtitle="Progreso del formulario"
                                    variant="primary"
                                />
                            </div>
                            {/* Progress indicator */}
                            <div className="mb-12">
                                <div className="relative mb-6">
                                    <div className="flex items-center justify-between">
                                        {[1, 2, 3].map((s) => (
                                            <div key={s} className="relative z-10 flex flex-col items-center">
                                                <div
                                                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                                                        step >= s
                                                            ? "bg-secondary border-secondary text-secondary-foreground shadow-lg"
                                                            : "border-muted-foreground/30 text-muted-foreground bg-background"
                                                    }`}
                                                >
                                                    {step > s ? <Check className="h-6 w-6" /> : getStepIcon(s)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Línea de conexión que se ajusta exactamente a los textos */}
                                    <div className="absolute top-6 right-0 left-0 flex">
                                        <div className="flex-1"></div>
                                        <div
                                            className={`h-2 rounded-full transition-all duration-300 ${
                                                step > 1 ? "bg-secondary shadow-sm" : "bg-muted-foreground/20"
                                            }`}
                                            style={{ width: "calc(50% - 3rem)" }}
                                        />
                                        <div className="w-12"></div>
                                        <div
                                            className={`h-2 rounded-full transition-all duration-300 ${
                                                step > 2 ? "bg-secondary shadow-sm" : "bg-muted-foreground/20"
                                            }`}
                                            style={{ width: "calc(50% - 3rem)" }}
                                        />
                                        <div className="flex-1"></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-center text-sm font-medium">
                                    <div className={step >= 1 ? "text-secondary" : "text-muted-foreground"}>Información del Proyecto</div>
                                    <div className={step >= 2 ? "text-secondary" : "text-muted-foreground"}>Ubicación y Requisitos</div>
                                    <div className={step >= 3 ? "text-secondary" : "text-muted-foreground"}>Detalles Técnicos</div>
                                </div>
                            </div>

                            <Card className="from-background to-background/80 border-2 bg-gradient-to-br shadow-2xl backdrop-blur-sm">
                                <div className="p-8">
                                    {/* Validation Errors */}
                                    {validationErrors.length > 0 && (
                                        <div className="mb-6 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-red-50/50 p-6">
                                            <div className="flex items-start gap-3">
                                                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                                                <div>
                                                    <p className="mb-2 font-semibold text-red-800">
                                                        Por favor, corrige los siguientes errores:
                                                    </p>
                                                    <ul className="space-y-1 text-sm text-red-700">
                                                        {validationErrors.map((error, i) => (
                                                            <li key={i} className="flex items-center gap-2">
                                                                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                                                {error}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit}>
                                        {/* Step 1: Información del proyecto */}
                                        {step === 1 && (
                                            <div className="space-y-8">
                                                <div className="text-center">
                                                    <div className="bg-secondary/10 mb-6 inline-flex rounded-3xl p-6">
                                                        <Briefcase className="text-secondary h-12 w-12" />
                                                    </div>
                                                    <h2 className="from-secondary to-secondary/70 mb-3 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
                                                        Información del Proyecto
                                                    </h2>
                                                    <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                                                        Comencemos con los datos básicos de tu proyecto de energías renovables
                                                    </p>
                                                </div>

                                                <div className="space-y-6">
                                                    <div className="space-y-3">
                                                        <Label htmlFor="titulo" className="text-base font-semibold">
                                                            Nombre del Proyecto *
                                                        </Label>
                                                        <Input
                                                            id="titulo"
                                                            placeholder="Ej: Planta Solar Extremadura Norte"
                                                            className="focus:border-secondary h-14 border-2 text-lg transition-colors"
                                                            value={formData.titulo}
                                                            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                                            required
                                                        />
                                                        <p className="text-muted-foreground text-sm">
                                                            Dale un nombre descriptivo que identifique claramente tu proyecto
                                                        </p>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <Label className="text-base font-semibold">Tipo de Proyecto *</Label>
                                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                            {Object.entries({
                                                                SOLAR_FOTOVOLTAICO: "SOLAR_FOTOVOLTAICO",
                                                                EOLICO: "EOLICO",
                                                                HIBRIDACION: "HIBRIDACION",
                                                                ALMACENAMIENTO: "ALMACENAMIENTO",
                                                                HIDROGENO: "HIDROGENO",
                                                                BIOMETANO: "BIOMETANO",
                                                            } as const).map(([key, value]) => (
                                                                <button
                                                                    key={key}
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setFormData({ ...formData, tipo: value as TipoProyecto })
                                                                    }
                                                                    className={`relative rounded-2xl border-2 p-6 text-left transition-all duration-300 hover:scale-105 ${
                                                                        formData.tipo === value
                                                                            ? "border-secondary bg-secondary/10 ring-secondary/20 shadow-lg ring-2"
                                                                            : "border-border hover:border-secondary/50 hover:bg-secondary/5"
                                                                    }`}
                                                                >
                                                                    <div className="flex items-start gap-4">
                                                                        <div
                                                                            className={`rounded-xl p-3 ${
                                                                                formData.tipo === value
                                                                                    ? "bg-secondary text-secondary-foreground"
                                                                                    : "bg-muted text-muted-foreground"
                                                                            }`}
                                                                        >
                                                                            {getTipoIcon(value as TipoProyecto)}
                                                                        </div>
                                                                        <div className="flex-1">
                                                                            <div className="mb-2 text-lg font-bold">
                                                                                {getTipoLabel(value as TipoProyecto)}
                                                                            </div>
                                                                            <div className="text-muted-foreground text-sm">
                                                                                {getTipoDescription(value as TipoProyecto)}
                                                                            </div>
                                                                        </div>
                                                                        {formData.tipo === value && (
                                                                            <CheckCircle className="text-secondary h-6 w-6" />
                                                                        )}
                                                                    </div>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label htmlFor="superficieMinima" className="text-base font-semibold">
                                                            Superficie Mínima Requerida (hectáreas) *
                                                        </Label>
                                                        <Input
                                                            id="superficieMinima"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Ej: 50"
                                                            className="focus:border-secondary h-14 border-2 text-lg transition-colors"
                                                            value={formData.superficieMinima}
                                                            onChange={(e) => setFormData({ ...formData, superficieMinima: e.target.value })}
                                                            required
                                                        />
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label
                                                            htmlFor="potenciaObjetivo"
                                                            className="flex items-center gap-2 text-base font-semibold"
                                                        >
                                                            <Zap className="h-4 w-4" />
                                                            Potencia Objetivo (MW) *
                                                        </Label>
                                                        <Input
                                                            id="potenciaObjetivo"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Ej: 50"
                                                            className="focus:border-secondary h-14 border-2 text-lg transition-colors"
                                                            value={formData.potenciaObjetivo}
                                                            onChange={(e) => setFormData({ ...formData, potenciaObjetivo: e.target.value })}
                                                            required
                                                        />
                                                        <p className="text-muted-foreground text-sm">
                                                            Potencia instalada que planeas desarrollar
                                                        </p>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label htmlFor="descripcion" className="text-base font-semibold">
                                                            Descripción del Proyecto
                                                        </Label>
                                                        <Textarea
                                                            id="descripcion"
                                                            placeholder="Describe los objetivos, características especiales y beneficios de tu proyecto..."
                                                            className="focus:border-secondary min-h-32 resize-none border-2 text-base transition-colors"
                                                            value={formData.descripcion}
                                                            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                                        />
                                                    </div>
                                                </div>

                                                <Button
                                                    type="button"
                                                    onClick={nextStep}
                                                    className="bg-secondary hover:bg-secondary/90 h-14 w-full text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                                                >
                                                    Continuar
                                                    <ChevronRight className="ml-2 h-5 w-5" />
                                                </Button>
                                            </div>
                                        )}

                                        {/* Step 2: Ubicación y Requisitos */}
                                        {step === 2 && (
                                            <div className="space-y-8">
                                                <div className="text-center">
                                                    <div className="bg-secondary/10 mb-6 inline-flex rounded-3xl p-6">
                                                        <MapPin className="text-secondary h-12 w-12" />
                                                    </div>
                                                    <h2 className="from-secondary to-secondary/70 mb-3 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
                                                        Ubicación y Requisitos
                                                    </h2>
                                                    <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                                                        Define la ubicación preferida y los requisitos técnicos del terreno
                                                    </p>
                                                </div>

                                                <div className="space-y-6">
                                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                        <div className="space-y-3">
                                                            <Label htmlFor="provincia" className="text-base font-semibold">
                                                                Provincia Preferida
                                                            </Label>
                                                            <Select
                                                                value={formData.provincia}
                                                                onValueChange={(value) => setFormData({ ...formData, provincia: value })}
                                                            >
                                                                <SelectTrigger className="focus:border-secondary h-14 border-2 text-lg">
                                                                    <SelectValue placeholder="Selecciona una provincia" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {provincias.map((provincia) => (
                                                                        <SelectItem key={provincia} value={provincia}>
                                                                            {provincia}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        <div className="space-y-3">
                                                            <Label htmlFor="comunidad" className="text-base font-semibold">
                                                                Comunidad Autónoma
                                                            </Label>
                                                            <Input
                                                                id="comunidad"
                                                                placeholder="Ej: Extremadura"
                                                                className="focus:border-secondary h-14 border-2 text-lg transition-colors"
                                                                value={formData.comunidad}
                                                                onChange={(e) => setFormData({ ...formData, comunidad: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label htmlFor="ubicacion" className="text-base font-semibold">
                                                            Ubicación Específica
                                                        </Label>
                                                        <Input
                                                            id="ubicacion"
                                                            placeholder="Ej: Municipios cercanos a Badajoz, zonas industriales..."
                                                            className="focus:border-secondary h-14 border-2 text-lg transition-colors"
                                                            value={formData.ubicacion}
                                                            onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                                                        />
                                                        <p className="text-muted-foreground text-sm">
                                                            Especifica la zona geográfica o municipios de interés
                                                        </p>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label
                                                            htmlFor="presupuesto"
                                                            className="flex items-center gap-2 text-base font-semibold"
                                                        >
                                                            <Euro className="h-4 w-4" />
                                                            Presupuesto Estimado (€) *
                                                        </Label>
                                                        <Input
                                                            id="presupuesto"
                                                            type="number"
                                                            placeholder="Ej: 50000000"
                                                            className="focus:border-secondary h-14 border-2 text-lg transition-colors"
                                                            value={formData.presupuesto}
                                                            onChange={(e) => setFormData({ ...formData, presupuesto: e.target.value })}
                                                            required
                                                        />
                                                        <p className="text-muted-foreground text-sm">
                                                            Inversión total estimada para el proyecto
                                                        </p>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                        <div className="space-y-3">
                                                            <Label htmlFor="distanciaMaximaRed" className="text-base font-semibold">
                                                                Distancia Máxima a Red (km)
                                                            </Label>
                                                            <Input
                                                                id="distanciaMaximaRed"
                                                                type="number"
                                                                step="0.1"
                                                                placeholder="Ej: 5"
                                                                className="focus:border-secondary h-14 border-2 text-lg transition-colors"
                                                                value={formData.distanciaMaximaRed}
                                                                onChange={(e) =>
                                                                    setFormData({ ...formData, distanciaMaximaRed: e.target.value })
                                                                }
                                                            />
                                                        </div>

                                                        <div className="space-y-3">
                                                            <Label htmlFor="capacidadSubestacionMinima" className="text-base font-semibold">
                                                                Capacidad Mínima Subestación (MVA)
                                                            </Label>
                                                            <Input
                                                                id="capacidadSubestacionMinima"
                                                                type="number"
                                                                step="0.1"
                                                                placeholder="Ej: 100"
                                                                className="focus:border-secondary h-14 border-2 text-lg transition-colors"
                                                                value={formData.capacidadSubestacionMinima}
                                                                onChange={(e) =>
                                                                    setFormData({ ...formData, capacidadSubestacionMinima: e.target.value })
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex gap-4">
                                                    <Button
                                                        type="button"
                                                        onClick={prevStep}
                                                        variant="outline"
                                                        className="hover:bg-secondary/5 h-14 flex-1 border-2 text-lg font-semibold"
                                                    >
                                                        <ArrowLeft className="mr-2 h-5 w-5" />
                                                        Atrás
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        onClick={nextStep}
                                                        className="bg-secondary hover:bg-secondary/90 h-14 flex-1 text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                                                    >
                                                        Continuar
                                                        <ChevronRight className="ml-2 h-5 w-5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 3: Detalles Técnicos */}
                                        {step === 3 && (
                                            <div className="space-y-8">
                                                <div className="text-center">
                                                    <div className="bg-secondary/10 mb-6 inline-flex rounded-3xl p-6">
                                                        <CheckCircle className="text-secondary h-12 w-12" />
                                                    </div>
                                                    <h2 className="from-secondary to-secondary/70 mb-3 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
                                                        Detalles Técnicos y Financieros
                                                    </h2>
                                                    <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                                                        Completa la información técnica y presupuestaria del proyecto
                                                    </p>
                                                </div>

                                                <div className="space-y-6">
                                                    <div className="space-y-3">
                                                        <Label htmlFor="superficieMaxima" className="text-base font-semibold">
                                                            Superficie Máxima (hectáreas)
                                                        </Label>
                                                        <Input
                                                            id="superficieMaxima"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Ej: 200"
                                                            className="focus:border-secondary h-14 border-2 text-lg transition-colors"
                                                            value={formData.superficieMaxima}
                                                            onChange={(e) => setFormData({ ...formData, superficieMaxima: e.target.value })}
                                                        />
                                                        <p className="text-muted-foreground text-sm">
                                                            Superficie máxima que está dispuesto a utilizar (opcional)
                                                        </p>
                                                    </div>

                                                    <div className="from-secondary/5 to-secondary/10 border-secondary/20 rounded-2xl border-2 bg-gradient-to-r p-8">
                                                        <h3 className="text-secondary mb-4 flex items-center gap-2 text-xl font-bold">
                                                            <CheckCircle className="h-6 w-6" />
                                                            Próximos Pasos
                                                        </h3>
                                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                            <div className="space-y-3">
                                                                <div className="flex items-start gap-3">
                                                                    <Badge variant="secondary" className="mt-1">
                                                                        1
                                                                    </Badge>
                                                                    <p className="text-sm">Tu proyecto será revisado por nuestro equipo</p>
                                                                </div>
                                                                <div className="flex items-start gap-3">
                                                                    <Badge variant="secondary" className="mt-1">
                                                                        2
                                                                    </Badge>
                                                                    <p className="text-sm">
                                                                        Buscaremos terrenos compatibles en nuestra base de datos
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-3">
                                                                <div className="flex items-start gap-3">
                                                                    <Badge variant="secondary" className="mt-1">
                                                                        3
                                                                    </Badge>
                                                                    <p className="text-sm">
                                                                        Te notificaremos cuando encontremos coincidencias
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-start gap-3">
                                                                    <Badge variant="secondary" className="mt-1">
                                                                        4
                                                                    </Badge>
                                                                    <p className="text-sm">
                                                                        Podrás contactar directamente con los propietarios
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex gap-4">
                                                    <Button
                                                        type="button"
                                                        onClick={prevStep}
                                                        variant="outline"
                                                        className="hover:bg-secondary/5 h-14 flex-1 border-2 text-lg font-semibold"
                                                    >
                                                        <ArrowLeft className="mr-2 h-5 w-5" />
                                                        Atrás
                                                    </Button>
                                                    <Button
                                                        type="submit"
                                                        className="bg-secondary hover:bg-secondary/90 h-14 flex-1 gap-2 text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                                                        disabled={isLoading}
                                                    >
                                                        {isLoading ? (
                                                            <>
                                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                                Creando Proyecto...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <CheckCircle className="h-5 w-5" />
                                                                Crear Proyecto
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </Card>
                        </main>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}
