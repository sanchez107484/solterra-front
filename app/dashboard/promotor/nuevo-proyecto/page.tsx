"use client"

import type React from "react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import ProtectedRoute from "@/components/protected-route"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CustomSelect } from "@/components/ui/custom-select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAppData } from "@/hooks/useAppData"
import { useProyectos } from "@/hooks/useProyectos"
import { useTranslations } from "@/i18n/i18nContext"
import { useErrorHandler } from "@/lib/error-handler"
import { getComunidadesAutonomas, getComunidadFromProvincia, getProvinciasFromComunidad } from "@/lib/provincias-data"
import type { CreateProyectoDTO, TipoProyecto } from "@/types/proyecto.types"
import {
    AlertCircle,
    ArrowLeft,
    Battery,
    Briefcase,
    Check,
    CheckCircle,
    ChevronRight,
    Layers,
    Loader2,
    Sun,
    Wind,
    Zap,
    Zap as ZapIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

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
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    // Referencias a los campos para scroll automático
    const tituloRef = useRef<HTMLInputElement>(null)
    const potenciaObjetivoRef = useRef<HTMLInputElement>(null)
    const superficieMinimaRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        loadProvincias()
    }, [loadProvincias])

    // Calcular provincias disponibles según la comunidad seleccionada
    const provinciasDisponibles = useMemo(() => {
        if (formData.comunidad) {
            return getProvinciasFromComunidad(formData.comunidad)
        }
        return provincias
    }, [formData.comunidad, provincias])

    // Handler para cambio de comunidad autónoma
    const handleComunidadChange = (comunidad: string) => {
        setFormData({
            ...formData,
            comunidad,
            provincia: "", // Limpiar provincia al cambiar comunidad
        })
    }

    // Handler para cambio de provincia
    const handleProvinciaChange = (provincia: string) => {
        const comunidad = getComunidadFromProvincia(provincia)
        setFormData({
            ...formData,
            provincia,
            comunidad: comunidad || formData.comunidad, // Autocompletar comunidad
        })
    }

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

    const validateStep = (currentStep: number): { errors: string[]; fieldErrors: Record<string, string> } => {
        const errors: string[] = []
        const fieldErrors: Record<string, string> = {}

        if (currentStep === 1) {
            // Validación del paso 1: Información del Proyecto
            if (!formData.titulo.trim()) {
                errors.push("El título del proyecto es obligatorio")
                fieldErrors.titulo = "Este campo es obligatorio"
            }
            if (!formData.tipo) {
                errors.push("El tipo de proyecto es obligatorio")
                fieldErrors.tipo = "Debes seleccionar un tipo de proyecto"
            }
            if (!formData.potenciaObjetivo || parseFloat(formData.potenciaObjetivo) <= 0) {
                errors.push("La potencia objetivo debe ser mayor a 0 MW")
                fieldErrors.potenciaObjetivo = "Debe ser mayor a 0 MW"
            }
            if (!formData.superficieMinima || parseFloat(formData.superficieMinima) <= 0) {
                errors.push("La superficie mínima debe ser mayor a 0 hectáreas")
                fieldErrors.superficieMinima = "Debe ser mayor a 0 hectáreas"
            }
        }

        return { errors, fieldErrors }
    }

    const scrollToFirstError = () => {
        // Intentar hacer scroll al primer campo con error
        if (fieldErrors.titulo && tituloRef.current) {
            tituloRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
            tituloRef.current.focus()
        } else if (fieldErrors.potenciaObjetivo && potenciaObjetivoRef.current) {
            potenciaObjetivoRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
            potenciaObjetivoRef.current.focus()
        } else if (fieldErrors.superficieMinima && superficieMinimaRef.current) {
            superficieMinimaRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
            superficieMinimaRef.current.focus()
        }
    }

    const nextStep = () => {
        const { errors, fieldErrors: newFieldErrors } = validateStep(step)
        if (errors.length > 0) {
            setValidationErrors(errors)
            setFieldErrors(newFieldErrors)
            toast({
                title: "Campos obligatorios",
                description: `Hay ${errors.length} campo${errors.length > 1 ? "s" : ""} que necesita${errors.length > 1 ? "n" : ""} tu atención`,
                variant: "destructive",
            })
            // Hacer scroll al primer campo con error
            setTimeout(() => scrollToFirstError(), 100)
            return
        }

        setValidationErrors([])
        setFieldErrors({})
        setStep(step + 1)
    }

    const prevStep = () => {
        setValidationErrors([])
        setFieldErrors({})
        setStep(step - 1)
    }

    const getStepIcon = (stepNumber: number) => {
        switch (stepNumber) {
            case 1:
                return <Briefcase className="h-5 w-5" />
            case 2:
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
                            {/* Progress indicator */}
                            <div className="mb-12">
                                <div className="relative">
                                    {/* Línea de fondo completa */}
                                    <div className="bg-muted-foreground/20 absolute top-8 right-0 left-0 h-1 rounded-full" />

                                    {/* Línea de progreso animada */}
                                    <div
                                        className="from-secondary via-secondary to-secondary/80 shadow-secondary/30 absolute top-8 left-0 h-1 rounded-full bg-gradient-to-r shadow-lg transition-all duration-500 ease-in-out"
                                        style={{
                                            width: step === 1 ? "0%" : "100%",
                                        }}
                                    />

                                    {/* Steps */}
                                    <div className="relative flex items-start justify-between">
                                        {[1, 2].map((s) => (
                                            <div key={s} className="flex flex-col items-center" style={{ width: "50%" }}>
                                                {/* Círculo del paso */}
                                                <div
                                                    className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 transition-all duration-500 ${
                                                        step >= s
                                                            ? "bg-secondary border-secondary text-secondary-foreground shadow-secondary/50 scale-110 shadow-2xl"
                                                            : "border-muted-foreground/30 text-muted-foreground bg-background shadow-md"
                                                    }`}
                                                >
                                                    {step > s ? (
                                                        <Check className="animate-in zoom-in h-7 w-7 duration-300" />
                                                    ) : (
                                                        <div className="transition-transform duration-300">{getStepIcon(s)}</div>
                                                    )}
                                                </div>

                                                {/* Texto del paso */}
                                                <div className="mt-4 px-2 text-center">
                                                    <p
                                                        className={`text-sm font-bold transition-colors duration-300 ${
                                                            step >= s ? "text-secondary" : "text-muted-foreground"
                                                        }`}
                                                    >
                                                        {s === 1 ? "Información del Proyecto" : "Ubicación y Requisitos"}
                                                    </p>
                                                    <p
                                                        className={`mt-1 text-xs transition-colors duration-300 ${
                                                            step >= s ? "text-secondary/70" : "text-muted-foreground/60"
                                                        }`}
                                                    >
                                                        {s === 1 ? "Datos básicos del proyecto" : "Requisitos técnicos"}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
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
                                                            ref={tituloRef}
                                                            id="titulo"
                                                            placeholder="Ej: Planta Solar Extremadura Norte"
                                                            className={`focus:border-secondary h-14 border-2 text-lg transition-colors ${
                                                                fieldErrors.titulo ? "border-red-500 focus:border-red-500" : ""
                                                            }`}
                                                            value={formData.titulo}
                                                            onChange={(e) => {
                                                                setFormData({ ...formData, titulo: e.target.value })
                                                                if (fieldErrors.titulo) {
                                                                    const newErrors = { ...fieldErrors }
                                                                    delete newErrors.titulo
                                                                    setFieldErrors(newErrors)
                                                                }
                                                            }}
                                                            required
                                                        />
                                                        {fieldErrors.titulo && (
                                                            <p className="flex items-center gap-1 text-sm font-medium text-red-600">
                                                                <AlertCircle className="h-4 w-4" />
                                                                {fieldErrors.titulo}
                                                            </p>
                                                        )}
                                                        {!fieldErrors.titulo && (
                                                            <p className="text-muted-foreground text-sm">
                                                                Dale un nombre descriptivo que identifique claramente tu proyecto
                                                            </p>
                                                        )}
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
                                                            ref={superficieMinimaRef}
                                                            id="superficieMinima"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Ej: 50"
                                                            className={`focus:border-secondary h-14 border-2 text-lg transition-colors ${
                                                                fieldErrors.superficieMinima ? "border-red-500 focus:border-red-500" : ""
                                                            }`}
                                                            value={formData.superficieMinima}
                                                            onChange={(e) => {
                                                                setFormData({ ...formData, superficieMinima: e.target.value })
                                                                if (fieldErrors.superficieMinima) {
                                                                    const newErrors = { ...fieldErrors }
                                                                    delete newErrors.superficieMinima
                                                                    setFieldErrors(newErrors)
                                                                }
                                                            }}
                                                            required
                                                        />
                                                        {fieldErrors.superficieMinima && (
                                                            <p className="flex items-center gap-1 text-sm font-medium text-red-600">
                                                                <AlertCircle className="h-4 w-4" />
                                                                {fieldErrors.superficieMinima}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label htmlFor="superficieMaxima" className="text-base font-semibold">
                                                            Superficie Máxima (hectáreas) (Opcional)
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

                                                    <div className="space-y-3">
                                                        <Label
                                                            htmlFor="potenciaObjetivo"
                                                            className="flex items-center gap-2 text-base font-semibold"
                                                        >
                                                            <Zap className="h-4 w-4" />
                                                            Potencia Nominal (MWn) *
                                                        </Label>
                                                        <Input
                                                            ref={potenciaObjetivoRef}
                                                            id="potenciaObjetivo"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Ej: 50"
                                                            className={`focus:border-secondary h-14 border-2 text-lg transition-colors ${
                                                                fieldErrors.potenciaObjetivo ? "border-red-500 focus:border-red-500" : ""
                                                            }`}
                                                            value={formData.potenciaObjetivo}
                                                            onChange={(e) => {
                                                                setFormData({ ...formData, potenciaObjetivo: e.target.value })
                                                                if (fieldErrors.potenciaObjetivo) {
                                                                    const newErrors = { ...fieldErrors }
                                                                    delete newErrors.potenciaObjetivo
                                                                    setFieldErrors(newErrors)
                                                                }
                                                            }}
                                                            required
                                                        />
                                                        {fieldErrors.potenciaObjetivo && (
                                                            <p className="flex items-center gap-1 text-sm font-medium text-red-600">
                                                                <AlertCircle className="h-4 w-4" />
                                                                {fieldErrors.potenciaObjetivo}
                                                            </p>
                                                        )}
                                                        {!fieldErrors.potenciaObjetivo && (
                                                            <p className="text-muted-foreground text-sm">
                                                                Potencia instalada que planeas desarrollar
                                                            </p>
                                                        )}
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
                                                        <CheckCircle className="text-secondary h-12 w-12" />
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
                                                            <Label htmlFor="comunidad" className="text-base font-semibold">
                                                                Comunidad Autónoma
                                                            </Label>
                                                            <CustomSelect
                                                                value={formData.comunidad}
                                                                onValueChange={(value) => {
                                                                    handleComunidadChange(value)
                                                                    if (fieldErrors.comunidad) {
                                                                        const newFieldErrors = { ...fieldErrors }
                                                                        delete newFieldErrors.comunidad
                                                                        setFieldErrors(newFieldErrors)
                                                                    }
                                                                }}
                                                                placeholder="Selecciona una comunidad"
                                                                options={getComunidadesAutonomas().map((comunidad) => ({
                                                                    value: comunidad,
                                                                    label: comunidad,
                                                                }))}
                                                                variant="secondary"
                                                                error={!!fieldErrors.comunidad}
                                                            />
                                                            {fieldErrors.comunidad && (
                                                                <p className="flex items-center gap-2 text-sm text-red-600">
                                                                    <AlertCircle className="h-4 w-4" />
                                                                    {fieldErrors.comunidad}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div className="space-y-3">
                                                            <Label htmlFor="provincia" className="text-base font-semibold">
                                                                Provincia
                                                            </Label>
                                                            <CustomSelect
                                                                value={formData.provincia}
                                                                onValueChange={(value) => {
                                                                    handleProvinciaChange(value)
                                                                    if (fieldErrors.provincia) {
                                                                        const newFieldErrors = { ...fieldErrors }
                                                                        delete newFieldErrors.provincia
                                                                        setFieldErrors(newFieldErrors)
                                                                    }
                                                                }}
                                                                placeholder={
                                                                    formData.comunidad
                                                                        ? "Selecciona una provincia"
                                                                        : "Primero selecciona una comunidad"
                                                                }
                                                                options={provinciasDisponibles.map((provincia) => ({
                                                                    value: provincia,
                                                                    label: provincia,
                                                                }))}
                                                                variant="secondary"
                                                                disabled={!formData.comunidad && provinciasDisponibles.length === 0}
                                                                error={!!fieldErrors.provincia}
                                                            />
                                                            {fieldErrors.provincia && (
                                                                <p className="flex items-center gap-2 text-sm text-red-600">
                                                                    <AlertCircle className="h-4 w-4" />
                                                                    {fieldErrors.provincia}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label htmlFor="ubicacion" className="text-base font-semibold">
                                                            Términos municipales
                                                        </Label>
                                                        <Input
                                                            id="ubicacion"
                                                            placeholder="Ej: Azagra, San Adrián, Andosilla..."
                                                            className="focus:border-secondary h-14 border-2 text-lg transition-colors"
                                                            value={formData.ubicacion}
                                                            onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                                                        />
                                                        <p className="text-muted-foreground text-sm">
                                                            Especifica la zona geográfica o municipios de interés
                                                        </p>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                        <div className="space-y-3">
                                                            <Label
                                                                htmlFor="presupuesto"
                                                                className="flex items-center gap-2 text-base font-semibold"
                                                            >
                                                                Presupuesto Estimado (€/ha)
                                                            </Label>
                                                            <Input
                                                                id="presupuesto"
                                                                type="number"
                                                                placeholder="Ej: 2.000"
                                                                className="focus:border-secondary h-14 border-2 text-lg transition-colors"
                                                                value={formData.presupuesto}
                                                                onChange={(e) => setFormData({ ...formData, presupuesto: e.target.value })}
                                                            />
                                                            <p className="text-muted-foreground text-sm">
                                                                Inversión estimada por hectárea para el proyecto
                                                            </p>
                                                        </div>

                                                        <div className="space-y-3">
                                                            <Label htmlFor="distanciaMaximaRed" className="text-base font-semibold">
                                                                Distancia Máxima a Punto de Conexión (m)
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
                                                                    <p className="text-sm">Podrás comenzar el proceso de negociación</p>
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
