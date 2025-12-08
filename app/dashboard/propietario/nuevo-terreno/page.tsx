"use client"

import type React from "react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CustomSelect } from "@/components/ui/custom-select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAppData } from "@/hooks/useAppData"
import { useTerrenos } from "@/hooks/useTerrenos"
import { useTranslations } from "@/i18n/i18nContext"
import { trackFormStep, trackTerrenoCreated, trackFormError } from "@/lib/analytics"
import { useErrorHandler } from "@/lib/error-handler"
import { getComunidadesAutonomas, getComunidadFromProvincia, getProvinciasFromComunidad } from "@/lib/provincias-data"
import { CreateTerrenoDTO, DisponibilidadTerreno, Orientacion, TipoSuelo } from "@/types/terreno.types"
import {
    AlertCircle,
    ArrowLeft,
    Check,
    CheckCircle,
    ChevronRight,
    Compass,
    Euro,
    Leaf,
    Loader2,
    MapPin,
    Mountain,
    Navigation,
    TreePine,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

export default function NuevoTerreno() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const { createTerreno, isLoading } = useTerrenos({
        autoFetch: false,
        withErrorHandling: true,
    })
    const { provincias, loadProvincias, validateCoordinates } = useAppData()
    const { handleError, showSuccess } = useErrorHandler()
    const { t } = useTranslations()
    const { toast } = useToast()

    // Refs para campos del formulario
    const tituloRef = useRef<HTMLInputElement>(null)
    const superficieRef = useRef<HTMLInputElement>(null)
    const referenciaCatastralRef = useRef<HTMLInputElement>(null)
    const poligonoRef = useRef<HTMLInputElement>(null)
    const parcelaRef = useRef<HTMLInputElement>(null)
    const pendienteRef = useRef<HTMLInputElement>(null)
    const precioVentaRef = useRef<HTMLInputElement>(null)
    const precioArrendamientoRef = useRef<HTMLInputElement>(null)

    const [formData, setFormData] = useState({
        titulo: "", // Campo oculto, se generará automáticamente
        descripcion: "",
        direccion: "", // Campo oculto
        municipio: "",
        provincia: "",
        comunidad: "",
        codigoPostal: "", // Campo oculto
        superficie: "",
        tipoSuelo: "RUSTICO_COMUN" as TipoSuelo,
        referenciaCatastral: "",
        poligono: "",
        parcela: "",
        disponibilidad: "AMBOS" as DisponibilidadTerreno,
        precioVenta: "",
        precioArrendamiento: "",
        orientacion: "" as Orientacion | "",
        pendiente: "",
        distanciaRed: "",
        potencialSolar: "",
        potencialEolico: "",
        servidumbres: "",
        restriccionesAmbientales: "",
        zonasProtegidas: false,
        tieneRestriccionesAmbientales: false,
    })

    const [validationErrors, setValidationErrors] = useState<string[]>([])
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

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

    const validateStep = (currentStep: number): { errors: string[]; fieldErrors: Record<string, string> } => {
        const errors: string[] = []
        const newFieldErrors: Record<string, string> = {}

        if (currentStep === 1) {
            // Validación del paso 1: Información Básica
            if (!formData.comunidad.trim()) {
                const errorMsg = "La comunidad autónoma es obligatoria"
                errors.push(errorMsg)
                newFieldErrors.comunidad = errorMsg
            }
            if (!formData.provincia.trim()) {
                const errorMsg = t?.owner?.validation?.requiredProvince
                errors.push(errorMsg)
                newFieldErrors.provincia = errorMsg
            }
            if (!formData.municipio.trim()) {
                const errorMsg = t?.owner?.validation?.requiredMunicipio
                errors.push(errorMsg)
                newFieldErrors.municipio = errorMsg
            }
            const superficie = parseFloat(formData.superficie)
            if (!formData.superficie || isNaN(superficie) || superficie <= 0) {
                const errorMsg = t?.owner?.validation?.superficiePositive
                errors.push(errorMsg)
                newFieldErrors.superficie = errorMsg
            }
            if (!formData.tipoSuelo) {
                const errorMsg = t?.owner?.validation?.tipoSueloRequired
                errors.push(errorMsg)
                newFieldErrors.tipoSuelo = errorMsg
            }
            // Validación de campos catastrales obligatorios
            if (!formData.referenciaCatastral || formData.referenciaCatastral.trim() === "") {
                const errorMsg = "La referencia catastral es obligatoria"
                errors.push(errorMsg)
                newFieldErrors.referenciaCatastral = errorMsg
            }
            if (!formData.poligono || formData.poligono.trim() === "") {
                const errorMsg = "El polígono es obligatorio"
                errors.push(errorMsg)
                newFieldErrors.poligono = errorMsg
            }
            if (!formData.parcela || formData.parcela.trim() === "") {
                const errorMsg = "La parcela es obligatoria"
                errors.push(errorMsg)
                newFieldErrors.parcela = errorMsg
            }
        } else if (currentStep === 2) {
            // Validación del paso 2: Precio y disponibilidad
            if (!formData.disponibilidad) {
                const errorMsg = t?.owner?.validation?.disponibilidadRequired
                errors.push(errorMsg)
                newFieldErrors.disponibilidad = errorMsg
            }
            // Validar precio de venta (obligatorio si disponibilidad es VENTA o AMBOS)
            if (formData.disponibilidad === "VENTA" || formData.disponibilidad === "AMBOS") {
                if (!formData.precioVenta || formData.precioVenta.trim() === "") {
                    const errorMsg = "El precio de venta es obligatorio"
                    errors.push(errorMsg)
                    newFieldErrors.precioVenta = errorMsg
                } else if (isNaN(parseFloat(formData.precioVenta)) || parseFloat(formData.precioVenta) <= 0) {
                    const errorMsg = t?.owner?.validation?.precioVentaInvalid
                    errors.push(errorMsg)
                    newFieldErrors.precioVenta = errorMsg
                }
            }
            // Validar precio de arrendamiento (obligatorio si disponibilidad es ARRENDAMIENTO o AMBOS)
            if (formData.disponibilidad === "ARRENDAMIENTO" || formData.disponibilidad === "AMBOS") {
                if (!formData.precioArrendamiento || formData.precioArrendamiento.trim() === "") {
                    const errorMsg = "El precio de arrendamiento es obligatorio"
                    errors.push(errorMsg)
                    newFieldErrors.precioArrendamiento = errorMsg
                } else if (isNaN(parseFloat(formData.precioArrendamiento)) || parseFloat(formData.precioArrendamiento) <= 0) {
                    const errorMsg = t?.owner?.validation?.precioArrendamientoInvalid
                    errors.push(errorMsg)
                    newFieldErrors.precioArrendamiento = errorMsg
                }
            }
        }

        return { errors, fieldErrors: newFieldErrors }
    }

    // Función para hacer scroll al primer campo con error
    const scrollToFirstError = () => {
        const refMap: Record<string, React.RefObject<HTMLInputElement | null>> = {
            titulo: tituloRef,
            superficie: superficieRef,
            referenciaCatastral: referenciaCatastralRef,
            poligono: poligonoRef,
            parcela: parcelaRef,
            pendiente: pendienteRef,
            precioVenta: precioVentaRef,
            precioArrendamiento: precioArrendamientoRef,
        }

        for (const fieldName in fieldErrors) {
            const ref = refMap[fieldName]
            if (ref?.current) {
                ref.current.scrollIntoView({ behavior: "smooth", block: "center" })
                ref.current.focus()
                break
            }
        }
    }

    const validate = (): { errors: string[]; fieldErrors: Record<string, string> } => {
        const errors: string[] = []
        const newFieldErrors: Record<string, string> = {}

        if (!formData.comunidad.trim()) {
            const errorMsg = "La comunidad autónoma es obligatoria"
            errors.push(errorMsg)
            newFieldErrors.comunidad = errorMsg
        }

        if (!formData.municipio.trim()) {
            const errorMsg = t?.owner?.validation?.requiredMunicipio
            errors.push(errorMsg)
            newFieldErrors.municipio = errorMsg
        }

        if (!formData.provincia.trim()) {
            const errorMsg = t?.owner?.validation?.requiredProvince
            errors.push(errorMsg)
            newFieldErrors.provincia = errorMsg
        }

        const superficie = parseFloat(formData.superficie)
        if (!formData.superficie || isNaN(superficie) || superficie <= 0) {
            const errorMsg = t?.owner?.validation?.superficiePositive
            errors.push(errorMsg)
            newFieldErrors.superficie = errorMsg
        }

        // Validación de campos catastrales obligatorios
        if (!formData.referenciaCatastral || formData.referenciaCatastral.trim() === "") {
            const errorMsg = "La referencia catastral es obligatoria"
            errors.push(errorMsg)
            newFieldErrors.referenciaCatastral = errorMsg
        }
        if (!formData.poligono || formData.poligono.trim() === "") {
            const errorMsg = "El polígono es obligatorio"
            errors.push(errorMsg)
            newFieldErrors.poligono = errorMsg
        }
        if (!formData.parcela || formData.parcela.trim() === "") {
            const errorMsg = "La parcela es obligatoria"
            errors.push(errorMsg)
            newFieldErrors.parcela = errorMsg
        }

        // Validación de precios según disponibilidad
        if (formData.disponibilidad === "VENTA" || formData.disponibilidad === "AMBOS") {
            if (!formData.precioVenta || formData.precioVenta.trim() === "") {
                const errorMsg = "El precio de venta es obligatorio"
                errors.push(errorMsg)
                newFieldErrors.precioVenta = errorMsg
            } else if (isNaN(parseFloat(formData.precioVenta)) || parseFloat(formData.precioVenta) <= 0) {
                const errorMsg = t?.owner?.validation?.precioVentaInvalid
                errors.push(errorMsg)
                newFieldErrors.precioVenta = errorMsg
            }
        }

        if (formData.disponibilidad === "ARRENDAMIENTO" || formData.disponibilidad === "AMBOS") {
            if (!formData.precioArrendamiento || formData.precioArrendamiento.trim() === "") {
                const errorMsg = "El precio de arrendamiento es obligatorio"
                errors.push(errorMsg)
                newFieldErrors.precioArrendamiento = errorMsg
            } else if (isNaN(parseFloat(formData.precioArrendamiento)) || parseFloat(formData.precioArrendamiento) <= 0) {
                const errorMsg = t?.owner?.validation?.precioArrendamientoInvalid
                errors.push(errorMsg)
                newFieldErrors.precioArrendamiento = errorMsg
            }
        }

        return { errors, fieldErrors: newFieldErrors }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validar formulario
        const { errors, fieldErrors: newFieldErrors } = validate()
        if (errors.length > 0) {
            setValidationErrors(errors)
            setFieldErrors(newFieldErrors)
            toast({
                title: t?.owner?.toast?.validationTitle,
                description: `${errors.length} ${errors.length === 1 ? "campo requiere" : "campos requieren"} tu atención`,
                variant: "destructive",
            })
            // Pequeño delay para que el DOM se actualice antes del scroll
            setTimeout(() => {
                scrollToFirstError()
            }, 100)
            return
        }

        setValidationErrors([])
        setFieldErrors({})

        try {
            // Generar título automáticamente: "Terreno en {municipio}, {provincia}"
            const tituloGenerado = `Terreno en ${formData.municipio}, ${formData.provincia}`

            // Usar municipio como dirección si está vacía
            const direccionFinal = formData.direccion || formData.municipio

            const terrenoData: CreateTerrenoDTO = {
                titulo: tituloGenerado,
                descripcion: formData.descripcion || undefined,
                direccion: direccionFinal,
                municipio: formData.municipio,
                provincia: formData.provincia,
                comunidad: formData.comunidad,
                codigoPostal: formData.codigoPostal || "00000",
                superficie: parseFloat(formData.superficie),
                tipoSuelo: formData.tipoSuelo,
                referenciaCatastral: formData.referenciaCatastral,
                poligono: formData.poligono,
                parcela: formData.parcela,
                disponibilidad: formData.disponibilidad,
                precioVenta: formData.precioVenta ? parseFloat(formData.precioVenta) : undefined,
                precioArrendamiento: formData.precioArrendamiento ? parseFloat(formData.precioArrendamiento) : undefined,
                orientacion: formData.orientacion || undefined,
                pendiente: formData.pendiente ? parseFloat(formData.pendiente) : undefined,
                distanciaRed: formData.distanciaRed ? parseFloat(formData.distanciaRed) : undefined,
                potencialSolar: formData.potencialSolar ? parseFloat(formData.potencialSolar) : undefined,
                potencialEolico: formData.potencialEolico ? parseFloat(formData.potencialEolico) : undefined,
                servidumbres: formData.servidumbres || undefined,
                restriccionesAmbientales: formData.tieneRestriccionesAmbientales ? formData.restriccionesAmbientales : undefined,
            }

            await createTerreno(terrenoData)

            // Tracking: terreno creado exitosamente
            trackTerrenoCreated({
                tipoSuelo: formData.tipoSuelo,
                superficie: parseFloat(formData.superficie),
                provincia: formData.provincia,
                municipio: formData.municipio,
            })

            // El servicio con error handling automático ya muestra el mensaje de éxito
            router.push("/dashboard/propietario")
        } catch (error) {
            // El error ya está manejado por el servicio
            console.error("Error al crear terreno:", error)
        }
    }

    const nextStep = () => {
        const { errors: stepErrors, fieldErrors: newFieldErrors } = validateStep(step)
        if (stepErrors.length > 0) {
            setValidationErrors(stepErrors)
            setFieldErrors(newFieldErrors)
            toast({
                title: t?.owner?.toast?.validationTitle,
                description: `${stepErrors.length} ${stepErrors.length === 1 ? "campo requiere" : "campos requieren"} tu atención`,
                variant: "destructive",
            })

            // Tracking: errores de validación
            if (Object.keys(newFieldErrors).length > 0) {
                const firstError = Object.keys(newFieldErrors)[0]
                trackFormError("nuevo-terreno", firstError)
            }

            // Pequeño delay para que el DOM se actualice antes del scroll
            setTimeout(() => {
                scrollToFirstError()
            }, 100)
            return
        }

        setValidationErrors([])
        setFieldErrors({})

        // Tracking: paso completado exitosamente
        trackFormStep("nuevo-terreno", step)

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
                return <MapPin className="h-5 w-5" />
            case 2:
                return <CheckCircle className="h-5 w-5" />
            default:
                return stepNumber
        }
    }

    const getTipoSueloIcon = (tipo: TipoSuelo) => {
        switch (tipo) {
            case "RUSTICO_COMUN":
                return <TreePine className="h-6 w-6" />
            case "RUSTICO_PROTECCION":
                return <Leaf className="h-6 w-6" />
            case "NO_URBANIZABLE":
                return <Mountain className="h-6 w-6" />
            case "SECANO":
                return <TreePine className="h-6 w-6" />
            case "REGADIO":
                return <TreePine className="h-6 w-6" />
            case "ERIAL":
                return <Mountain className="h-6 w-6" />
            default:
                return <TreePine className="h-6 w-6" />
        }
    }

    const getTipoSueloLabel = (tipo: TipoSuelo) => {
        return t?.owner?.newLand?.tipoSuelo?.labels?.[tipo] ?? tipo
    }

    const getTipoSueloDescription = (tipo: TipoSuelo) => {
        return t?.owner?.newLand?.tipoSuelo?.descriptions?.[tipo] ?? ""
    }

    const getDisponibilidadIcon = (disp: DisponibilidadTerreno) => {
        switch (disp) {
            case "VENTA":
                return <Euro className="h-5 w-5" />
            case "ARRENDAMIENTO":
                return <Navigation className="h-5 w-5" />
            case "DERECHO_SUPERFICIE":
                return <Compass className="h-5 w-5" />
            case "AMBOS":
                return <CheckCircle className="h-5 w-5" />
            default:
                return <Euro className="h-5 w-5" />
        }
    }

    return (
        <>
            <DashboardHeader
                title={t?.owner?.newLand?.title}
                breadcrumbs={[
                    { label: t?.dashboard?.breadcrumbs?.dashboard, href: "/dashboard/propietario" },
                    { label: t?.owner?.newLand?.title },
                ]}
                userType="propietario"
            />
            <div className="from-background via-primary/5 to-background min-h-screen bg-gradient-to-br">
                <main className="container mx-auto max-w-4xl px-6 py-12">
                    {/* Progress indicator */}
                    <div className="mb-12">
                        <div className="relative">
                            {/* Línea de fondo completa */}
                            <div className="bg-muted-foreground/20 absolute top-8 right-0 left-0 h-1 rounded-full" />

                            {/* Línea de progreso animada */}
                            <div
                                className="from-primary via-primary to-primary/80 shadow-primary/30 absolute top-8 left-0 h-1 rounded-full bg-gradient-to-r shadow-lg transition-all duration-500 ease-in-out"
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
                                                    ? "bg-primary border-primary text-primary-foreground shadow-primary/50 scale-110 shadow-2xl"
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
                                                    step >= s ? "text-primary" : "text-muted-foreground"
                                                }`}
                                            >
                                                {s === 1
                                                    ? t?.owner?.newLand?.steps?.info || "Información del Terreno"
                                                    : t?.owner?.newLand?.steps?.price || "Disponibilidad y Precio"}
                                            </p>
                                            <p
                                                className={`mt-1 text-xs transition-colors duration-300 ${
                                                    step >= s ? "text-primary/70" : "text-muted-foreground/60"
                                                }`}
                                            >
                                                {s === 1 ? "Ubicación y características" : "Condiciones comerciales"}
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
                                            <p className="mb-2 font-semibold text-red-800">{t?.owner?.validation?.header}</p>
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
                                {/* Step 1: Información Básica */}
                                {step === 1 && (
                                    <div className="space-y-8">
                                        <div className="text-center">
                                            <div className="bg-primary/10 mb-6 inline-flex rounded-3xl p-6">
                                                <MapPin className="text-primary h-12 w-12" />
                                            </div>
                                            <h2 className="from-primary to-primary/70 mb-3 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
                                                {t?.owner?.newLand?.sections?.infoTitle}
                                            </h2>
                                            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                                                {t?.owner?.newLand?.sections?.infoSubtitle}
                                            </p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                <div className="space-y-3">
                                                    <Label htmlFor="comunidad" className="text-base font-semibold">
                                                        Comunidad Autónoma *
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
                                                        variant="primary"
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
                                                        {t?.owner?.newLand?.fields?.province} *
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
                                                        variant="primary"
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
                                                <Label htmlFor="municipio" className="text-base font-semibold">
                                                    {t?.owner?.newLand?.fields?.municipality} *
                                                </Label>
                                                <Input
                                                    id="municipio"
                                                    placeholder={t?.owner?.newLand?.placeholders?.municipio}
                                                    className={`focus:border-primary h-14 border-2 text-lg transition-colors ${
                                                        fieldErrors.municipio ? "border-red-500" : ""
                                                    }`}
                                                    value={formData.municipio}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, municipio: e.target.value })
                                                        if (fieldErrors.municipio) {
                                                            const newFieldErrors = { ...fieldErrors }
                                                            delete newFieldErrors.municipio
                                                            setFieldErrors(newFieldErrors)
                                                        }
                                                    }}
                                                    required
                                                />
                                                {fieldErrors.municipio && (
                                                    <p className="flex items-center gap-2 text-sm text-red-600">
                                                        <AlertCircle className="h-4 w-4" />
                                                        {fieldErrors.municipio}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-3">
                                                <Label htmlFor="superficie" className="text-base font-semibold">
                                                    {t?.owner?.newLand?.fields?.surface} *
                                                </Label>
                                                <Input
                                                    ref={superficieRef}
                                                    id="superficie"
                                                    type="number"
                                                    step="0.1"
                                                    placeholder={t?.owner?.newLand?.placeholders?.superficie}
                                                    className={`focus:border-primary h-14 border-2 text-lg transition-colors ${
                                                        fieldErrors.superficie ? "border-red-500" : ""
                                                    }`}
                                                    value={formData.superficie}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, superficie: e.target.value })
                                                        if (fieldErrors.superficie) {
                                                            const newFieldErrors = { ...fieldErrors }
                                                            delete newFieldErrors.superficie
                                                            setFieldErrors(newFieldErrors)
                                                        }
                                                    }}
                                                    required
                                                />
                                                {fieldErrors.superficie && (
                                                    <p className="flex items-center gap-2 text-sm text-red-600">
                                                        <AlertCircle className="h-4 w-4" />
                                                        {fieldErrors.superficie}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                                <div className="space-y-3">
                                                    <Label htmlFor="referenciaCatastral" className="text-base font-semibold">
                                                        {t?.owner?.newLand?.fields?.cadastralRef} *
                                                    </Label>
                                                    <Input
                                                        ref={referenciaCatastralRef}
                                                        id="referenciaCatastral"
                                                        placeholder={t?.owner?.newLand?.placeholders?.referenciaCatastral}
                                                        className={`focus:border-primary h-14 border-2 text-lg transition-colors ${
                                                            fieldErrors.referenciaCatastral ? "border-red-500" : ""
                                                        }`}
                                                        value={formData.referenciaCatastral}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, referenciaCatastral: e.target.value })
                                                            if (fieldErrors.referenciaCatastral) {
                                                                const newFieldErrors = { ...fieldErrors }
                                                                delete newFieldErrors.referenciaCatastral
                                                                setFieldErrors(newFieldErrors)
                                                            }
                                                        }}
                                                        required
                                                    />
                                                    {fieldErrors.referenciaCatastral && (
                                                        <p className="flex items-center gap-2 text-sm text-red-600">
                                                            <AlertCircle className="h-4 w-4" />
                                                            {fieldErrors.referenciaCatastral}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="space-y-3">
                                                    <Label htmlFor="poligono" className="text-base font-semibold">
                                                        {t?.owner?.newLand?.fields?.polygon} *
                                                    </Label>
                                                    <Input
                                                        ref={poligonoRef}
                                                        id="poligono"
                                                        placeholder={t?.owner?.newLand?.placeholders?.poligono}
                                                        className={`focus:border-primary h-14 border-2 text-lg transition-colors ${
                                                            fieldErrors.poligono ? "border-red-500" : ""
                                                        }`}
                                                        value={formData.poligono}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, poligono: e.target.value })
                                                            if (fieldErrors.poligono) {
                                                                const newFieldErrors = { ...fieldErrors }
                                                                delete newFieldErrors.poligono
                                                                setFieldErrors(newFieldErrors)
                                                            }
                                                        }}
                                                        required
                                                    />
                                                    {fieldErrors.poligono && (
                                                        <p className="flex items-center gap-2 text-sm text-red-600">
                                                            <AlertCircle className="h-4 w-4" />
                                                            {fieldErrors.poligono}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="space-y-3">
                                                    <Label htmlFor="parcela" className="text-base font-semibold">
                                                        {t?.owner?.newLand?.fields?.parcel} *
                                                    </Label>
                                                    <Input
                                                        ref={parcelaRef}
                                                        id="parcela"
                                                        placeholder={t?.owner?.newLand?.placeholders?.parcela}
                                                        className={`focus:border-primary h-14 border-2 text-lg transition-colors ${
                                                            fieldErrors.parcela ? "border-red-500" : ""
                                                        }`}
                                                        value={formData.parcela}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, parcela: e.target.value })
                                                            if (fieldErrors.parcela) {
                                                                const newFieldErrors = { ...fieldErrors }
                                                                delete newFieldErrors.parcela
                                                                setFieldErrors(newFieldErrors)
                                                            }
                                                        }}
                                                        required
                                                    />
                                                    {fieldErrors.parcela && (
                                                        <p className="flex items-center gap-2 text-sm text-red-600">
                                                            <AlertCircle className="h-4 w-4" />
                                                            {fieldErrors.parcela}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <Label className="text-base font-semibold">{t?.owner?.newLand?.fields?.soilType} *</Label>
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    {Object.values(TipoSuelo).map((tipo) => (
                                                        <button
                                                            key={tipo}
                                                            type="button"
                                                            onClick={() => setFormData({ ...formData, tipoSuelo: tipo })}
                                                            className={`relative rounded-2xl border-2 p-6 text-left transition-all duration-300 hover:scale-105 ${
                                                                formData.tipoSuelo === tipo
                                                                    ? "border-primary bg-primary/10 ring-primary/20 shadow-lg ring-2"
                                                                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                                                            }`}
                                                        >
                                                            <div className="flex items-start gap-4">
                                                                <div
                                                                    className={`rounded-xl p-3 ${
                                                                        formData.tipoSuelo === tipo
                                                                            ? "bg-primary text-primary-foreground"
                                                                            : "bg-muted text-muted-foreground"
                                                                    }`}
                                                                >
                                                                    {getTipoSueloIcon(tipo)}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="mb-2 text-lg font-bold">{getTipoSueloLabel(tipo)}</div>
                                                                    <div className="text-muted-foreground text-sm">
                                                                        {getTipoSueloDescription(tipo)}
                                                                    </div>
                                                                </div>
                                                                {formData.tipoSuelo === tipo && (
                                                                    <CheckCircle className="text-primary h-6 w-6" />
                                                                )}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <Label htmlFor="descripcion" className="text-base font-semibold">
                                                    {t?.owner?.newLand?.fields?.description}
                                                </Label>
                                                <Textarea
                                                    id="descripcion"
                                                    placeholder={t?.owner?.newLand?.placeholders?.descripcion}
                                                    className="focus:border-primary min-h-32 resize-none border-2 text-base transition-colors"
                                                    value={formData.descripcion}
                                                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                                />
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center space-x-3">
                                                    <input
                                                        type="checkbox"
                                                        id="tieneRestriccionesAmbientales"
                                                        checked={formData.tieneRestriccionesAmbientales}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                tieneRestriccionesAmbientales: e.target.checked,
                                                                restriccionesAmbientales: e.target.checked
                                                                    ? formData.restriccionesAmbientales
                                                                    : "",
                                                            })
                                                        }
                                                        className="text-primary focus:ring-primary h-5 w-5 rounded border-gray-300 bg-gray-100 focus:ring-2"
                                                    />
                                                    <Label htmlFor="tieneRestriccionesAmbientales" className="text-base font-medium">
                                                        {t?.owner?.newLand?.fields?.hasEnvRestrictions}
                                                    </Label>
                                                </div>

                                                {formData.tieneRestriccionesAmbientales && (
                                                    <div className="space-y-3">
                                                        <Label htmlFor="restriccionesAmbientales" className="text-base font-semibold">
                                                            {t?.owner?.newLand?.fields?.envRestrictions}
                                                        </Label>
                                                        <Textarea
                                                            id="restriccionesAmbientales"
                                                            placeholder={t?.owner?.newLand?.placeholders?.restriccionesAmbientales}
                                                            className="focus:border-primary min-h-24 resize-none border-2 text-base transition-colors"
                                                            value={formData.restriccionesAmbientales}
                                                            onChange={(e) =>
                                                                setFormData({ ...formData, restriccionesAmbientales: e.target.value })
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            className="bg-primary hover:bg-primary/90 h-14 w-full text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                                        >
                                            {t?.common?.continue}
                                            <ChevronRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </div>
                                )}

                                {/* Step 2: Precio y Disponibilidad */}
                                {step === 2 && (
                                    <div className="space-y-8">
                                        <div className="text-center">
                                            <div className="bg-primary/10 mb-6 inline-flex rounded-3xl p-6">
                                                <CheckCircle className="text-primary h-12 w-12" />
                                            </div>
                                            <h2 className="from-primary to-primary/70 mb-3 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
                                                {t?.owner?.newLand?.sections?.priceTitle}
                                            </h2>
                                            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                                                {t?.owner?.newLand?.sections?.priceSubtitle}
                                            </p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <Label className="text-base font-semibold">Tipo de Disponibilidad *</Label>
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    {Object.values(DisponibilidadTerreno).map((disp) => (
                                                        <button
                                                            key={disp}
                                                            type="button"
                                                            onClick={() => setFormData({ ...formData, disponibilidad: disp })}
                                                            className={`relative rounded-2xl border-2 p-6 text-left transition-all duration-300 hover:scale-105 ${
                                                                formData.disponibilidad === disp
                                                                    ? "border-primary bg-primary/10 ring-primary/20 shadow-lg ring-2"
                                                                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <div
                                                                    className={`rounded-xl p-3 ${
                                                                        formData.disponibilidad === disp
                                                                            ? "bg-primary text-primary-foreground"
                                                                            : "bg-muted text-muted-foreground"
                                                                    }`}
                                                                >
                                                                    {getDisponibilidadIcon(disp)}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="mb-1 text-lg font-bold">
                                                                        {t?.owner?.newLand?.availability?.labels?.[disp]}
                                                                    </div>
                                                                    <div className="text-muted-foreground text-sm">
                                                                        {t?.owner?.newLand?.availability?.descriptions?.[disp]}
                                                                    </div>
                                                                </div>
                                                                {formData.disponibilidad === disp && (
                                                                    <CheckCircle className="text-primary h-6 w-6" />
                                                                )}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {(formData.disponibilidad === "VENTA" || formData.disponibilidad === "AMBOS") && (
                                                <div className="space-y-3">
                                                    <Label
                                                        htmlFor="precioVenta"
                                                        className="flex items-center gap-2 text-base font-semibold"
                                                    >
                                                        {t?.owner?.newLand?.fields?.salePrice}
                                                    </Label>
                                                    <Input
                                                        ref={precioVentaRef}
                                                        id="precioVenta"
                                                        type="number"
                                                        placeholder={t?.owner?.newLand?.placeholders?.precioVenta}
                                                        className={`focus:border-primary h-14 border-2 text-lg transition-colors ${
                                                            fieldErrors.precioVenta ? "border-red-500" : ""
                                                        }`}
                                                        value={formData.precioVenta}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, precioVenta: e.target.value })
                                                            if (fieldErrors.precioVenta) {
                                                                const newFieldErrors = { ...fieldErrors }
                                                                delete newFieldErrors.precioVenta
                                                                setFieldErrors(newFieldErrors)
                                                            }
                                                        }}
                                                    />
                                                    {fieldErrors.precioVenta ? (
                                                        <p className="flex items-center gap-2 text-sm text-red-600">
                                                            <AlertCircle className="h-4 w-4" />
                                                            {fieldErrors.precioVenta}
                                                        </p>
                                                    ) : (
                                                        <p className="text-muted-foreground text-sm">
                                                            {t?.owner?.newLand?.hints?.priceSale}
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            {(formData.disponibilidad === "ARRENDAMIENTO" || formData.disponibilidad === "AMBOS") && (
                                                <div className="space-y-3">
                                                    <Label
                                                        htmlFor="precioArrendamiento"
                                                        className="flex items-center gap-2 text-base font-semibold"
                                                    >
                                                        {t?.owner?.newLand?.fields?.rentPrice}
                                                    </Label>
                                                    <Input
                                                        ref={precioArrendamientoRef}
                                                        id="precioArrendamiento"
                                                        type="number"
                                                        placeholder={t?.owner?.newLand?.placeholders?.precioArrendamiento}
                                                        className={`focus:border-primary h-14 border-2 text-lg transition-colors ${
                                                            fieldErrors.precioArrendamiento ? "border-red-500" : ""
                                                        }`}
                                                        value={formData.precioArrendamiento}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, precioArrendamiento: e.target.value })
                                                            if (fieldErrors.precioArrendamiento) {
                                                                const newFieldErrors = { ...fieldErrors }
                                                                delete newFieldErrors.precioArrendamiento
                                                                setFieldErrors(newFieldErrors)
                                                            }
                                                        }}
                                                    />
                                                    {fieldErrors.precioArrendamiento ? (
                                                        <p className="flex items-center gap-2 text-sm text-red-600">
                                                            <AlertCircle className="h-4 w-4" />
                                                            {fieldErrors.precioArrendamiento}
                                                        </p>
                                                    ) : (
                                                        <p className="text-muted-foreground text-sm">
                                                            {t?.owner?.newLand?.hints?.priceRent}
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            <div className="space-y-3">
                                                <Label htmlFor="servidumbres" className="text-base font-semibold">
                                                    {t?.owner?.newLand?.fields?.easements}
                                                </Label>
                                                <Textarea
                                                    id="servidumbres"
                                                    placeholder={t?.owner?.newLand?.placeholders?.servidumbres}
                                                    className="focus:border-primary min-h-24 resize-none border-2 text-base transition-colors"
                                                    value={formData.servidumbres}
                                                    onChange={(e) => setFormData({ ...formData, servidumbres: e.target.value })}
                                                />
                                            </div>

                                            <div className="from-primary/5 to-primary/10 border-primary/20 rounded-2xl border-2 bg-gradient-to-r p-8">
                                                <h3 className="text-primary mb-4 flex items-center gap-2 text-xl font-bold">
                                                    <CheckCircle className="h-6 w-6" />
                                                    {t?.owner?.newLand?.nextSteps?.title}
                                                </h3>
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    <div className="space-y-3">
                                                        <div className="flex items-start gap-3">
                                                            <Badge variant="default" className="mt-1">
                                                                1
                                                            </Badge>
                                                            <p className="text-sm">{t?.owner?.newLand?.nextSteps?.step1}</p>
                                                        </div>
                                                        <div className="flex items-start gap-3">
                                                            <Badge variant="default" className="mt-1">
                                                                2
                                                            </Badge>
                                                            <p className="text-sm">{t?.owner?.newLand?.nextSteps?.step2}</p>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div className="flex items-start gap-3">
                                                            <Badge variant="default" className="mt-1">
                                                                3
                                                            </Badge>
                                                            <p className="text-sm">{t?.owner?.newLand?.nextSteps?.step3}</p>
                                                        </div>
                                                        <div className="flex items-start gap-3">
                                                            <Badge variant="default" className="mt-1">
                                                                4
                                                            </Badge>
                                                            <p className="text-sm">{t?.owner?.newLand?.nextSteps?.step4}</p>
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
                                                className="hover:bg-primary/5 h-14 flex-1 border-2 text-lg font-semibold"
                                            >
                                                <ArrowLeft className="mr-2 h-5 w-5" />
                                                {t?.common?.back}
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="bg-primary hover:bg-primary/90 h-14 flex-1 gap-2 text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="h-5 w-5 animate-spin" />
                                                        {t?.owner?.newLand?.buttons?.creating}
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle className="h-5 w-5" />
                                                        {t?.owner?.newLand?.buttons?.publish}
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
        </>
    )
}
