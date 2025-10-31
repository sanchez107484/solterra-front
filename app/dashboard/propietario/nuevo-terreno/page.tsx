"use client"

import type React from "react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAppData } from "@/hooks/useAppData"
import { useTerrenos } from "@/hooks/useTerrenos"
import { useTranslations } from "@/i18n/i18nContext"
import { useErrorHandler } from "@/lib/error-handler"
import { CreateTerrenoDTO, DisponibilidadTerreno, Orientacion, TipoSuelo } from "@/types/terreno.types"
import {
    AlertCircle,
    ArrowLeft,
    Building,
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
import { useEffect, useState } from "react"

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

    const [formData, setFormData] = useState({
        titulo: "",
        descripcion: "",
        direccion: "",
        municipio: "",
        provincia: "",
        codigoPostal: "",
        latitud: "",
        longitud: "",
        superficie: "",
        tipoSuelo: "RUSTICO_COMUN" as TipoSuelo,
        referenciaCatastral: "",
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
    })

    const [validationErrors, setValidationErrors] = useState<string[]>([])

    useEffect(() => {
        loadProvincias()
    }, [loadProvincias])

    const validateStep = (currentStep: number): string[] => {
        const errors: string[] = []

        if (currentStep === 1) {
            // Validación del paso 1: Información Básica
            if (!formData.titulo.trim()) {
                errors.push(t?.owner?.validation?.requiredName)
            }
            if (!formData.provincia.trim()) {
                errors.push(t?.owner?.validation?.requiredProvince)
            }
            if (!formData.municipio.trim()) {
                errors.push(t?.owner?.validation?.requiredMunicipio)
            }
            const superficie = parseFloat(formData.superficie)
            if (!formData.superficie || isNaN(superficie) || superficie <= 0) {
                errors.push(t?.owner?.validation?.superficiePositive)
            }
            if (!formData.tipoSuelo) {
                errors.push(t?.owner?.validation?.tipoSueloRequired)
            }
        } else if (currentStep === 2) {
            // Validación del paso 2: Detalles Técnicos (todos opcionales, pero validar formato si se llenan)
            if (
                formData.latitud &&
                (isNaN(parseFloat(formData.latitud)) || parseFloat(formData.latitud) < -90 || parseFloat(formData.latitud) > 90)
            ) {
                errors.push(t?.owner?.validation?.latRange)
            }
            if (
                formData.longitud &&
                (isNaN(parseFloat(formData.longitud)) || parseFloat(formData.longitud) < -180 || parseFloat(formData.longitud) > 180)
            ) {
                errors.push(t?.owner?.validation?.lngRange)
            }
            if (formData.pendiente && (isNaN(parseFloat(formData.pendiente)) || parseFloat(formData.pendiente) < 0)) {
                errors.push(t?.owner?.validation?.pendienteInvalid)
            }
        } else if (currentStep === 3) {
            // Validación del paso 3: Precio y Características
            if (!formData.disponibilidad) {
                errors.push(t?.owner?.validation?.disponibilidadRequired)
            }
            if ((formData.disponibilidad === "VENTA" || formData.disponibilidad === "AMBOS") && formData.precioVenta) {
                if (isNaN(parseFloat(formData.precioVenta)) || parseFloat(formData.precioVenta) <= 0) {
                    errors.push(t?.owner?.validation?.precioVentaInvalid)
                }
            }
            if ((formData.disponibilidad === "ARRENDAMIENTO" || formData.disponibilidad === "AMBOS") && formData.precioArrendamiento) {
                if (isNaN(parseFloat(formData.precioArrendamiento)) || parseFloat(formData.precioArrendamiento) <= 0) {
                    errors.push(t?.owner?.validation?.precioArrendamientoInvalid)
                }
            }
        }

        return errors
    }

    const validate = (): string[] => {
        const errors: string[] = []

        if (!formData.titulo.trim()) {
            errors.push(t?.owner?.validation?.requiredName)
        }

        if (!formData.municipio.trim()) {
            errors.push(t?.owner?.validation?.requiredMunicipio)
        }

        if (!formData.provincia.trim()) {
            errors.push(t?.owner?.validation?.requiredProvince)
        }

        const superficie = parseFloat(formData.superficie)
        if (!formData.superficie || isNaN(superficie) || superficie <= 0) {
            errors.push(t?.owner?.validation?.superficiePositive)
        }

        if (
            formData.latitud &&
            (isNaN(parseFloat(formData.latitud)) || parseFloat(formData.latitud) < -90 || parseFloat(formData.latitud) > 90)
        ) {
            errors.push(t?.owner?.validation?.latRange)
        }

        if (
            formData.longitud &&
            (isNaN(parseFloat(formData.longitud)) || parseFloat(formData.longitud) < -180 || parseFloat(formData.longitud) > 180)
        ) {
            errors.push(t?.owner?.validation?.lngRange)
        }

        if (formData.precioVenta && (isNaN(parseFloat(formData.precioVenta)) || parseFloat(formData.precioVenta) <= 0)) {
            errors.push(t?.owner?.validation?.precioVentaInvalid)
        }

        if (
            formData.precioArrendamiento &&
            (isNaN(parseFloat(formData.precioArrendamiento)) || parseFloat(formData.precioArrendamiento) <= 0)
        ) {
            errors.push(t?.owner?.validation?.precioArrendamientoInvalid)
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
            // Validar que las coordenadas sean válidas si se proporcionan
            const lat = formData.latitud ? parseFloat(formData.latitud) : null
            const lng = formData.longitud ? parseFloat(formData.longitud) : null

            // Si no hay coordenadas válidas, usar coordenadas por defecto para España
            const latitudFinal = lat && !isNaN(lat) ? lat : 40.4168
            const longitudFinal = lng && !isNaN(lng) ? lng : -3.7038

            const terrenoData: CreateTerrenoDTO = {
                titulo: formData.titulo,
                descripcion: formData.descripcion || undefined,
                direccion: formData.direccion || formData.municipio,
                municipio: formData.municipio,
                provincia: formData.provincia,
                codigoPostal: formData.codigoPostal || "00000",
                latitud: latitudFinal,
                longitud: longitudFinal,
                superficie: parseFloat(formData.superficie),
                tipoSuelo: formData.tipoSuelo,
                referenciaCatastral: formData.referenciaCatastral || undefined,
                disponibilidad: formData.disponibilidad,
                precioVenta: formData.precioVenta ? parseFloat(formData.precioVenta) : undefined,
                precioArrendamiento: formData.precioArrendamiento ? parseFloat(formData.precioArrendamiento) : undefined,
                orientacion: formData.orientacion || undefined,
                pendiente: formData.pendiente ? parseFloat(formData.pendiente) : undefined,
                distanciaRed: formData.distanciaRed ? parseFloat(formData.distanciaRed) : undefined,
                potencialSolar: formData.potencialSolar ? parseFloat(formData.potencialSolar) : undefined,
                potencialEolico: formData.potencialEolico ? parseFloat(formData.potencialEolico) : undefined,
                servidumbres: formData.servidumbres || undefined,
                restriccionesAmbientales: formData.restriccionesAmbientales || undefined,
                // Nota: zonasProtegidas no está en el DTO del backend, lo removemos
            }

            await createTerreno(terrenoData)

            // El servicio con error handling automático ya muestra el mensaje de éxito
            router.push("/dashboard/propietario")
        } catch (error) {
            // El error ya está manejado por el servicio
            console.error("Error al crear terreno:", error)
        }
    }

    const nextStep = () => {
        const stepErrors = validateStep(step)
        if (stepErrors.length > 0) {
            setValidationErrors(stepErrors)
            toast({
                title: t?.owner?.toast?.validationTitle,
                description: t?.owner?.toast?.validationDesc,
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
                return <MapPin className="h-5 w-5" />
            case 2:
                return <Mountain className="h-5 w-5" />
            case 3:
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
            case "URBANIZABLE":
                return <Building className="h-6 w-6" />
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
                        <div className="relative mb-6">
                            <div className="flex items-center justify-between">
                                {[1, 2, 3].map((s) => (
                                    <div key={s} className="relative z-10 flex flex-col items-center">
                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                                                step >= s
                                                    ? "bg-primary border-primary text-primary-foreground shadow-lg"
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
                                        step > 1 ? "bg-primary shadow-sm" : "bg-muted-foreground/20"
                                    }`}
                                    style={{ width: "calc(50% - 3rem)" }}
                                />
                                <div className="w-12"></div>
                                <div
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        step > 2 ? "bg-primary shadow-sm" : "bg-muted-foreground/20"
                                    }`}
                                    style={{ width: "calc(50% - 3rem)" }}
                                />
                                <div className="flex-1"></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center text-sm font-medium">
                            <div className={step >= 1 ? "text-primary" : "text-muted-foreground"}>{t?.owner?.newLand?.steps?.info}</div>
                            <div className={step >= 2 ? "text-primary" : "text-muted-foreground"}>
                                {t?.owner?.newLand?.steps?.technical}
                            </div>
                            <div className={step >= 3 ? "text-primary" : "text-muted-foreground"}>{t?.owner?.newLand?.steps?.price}</div>
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
                                            <div className="space-y-3">
                                                <Label htmlFor="titulo" className="text-base font-semibold">
                                                    {t?.owner?.newLand?.fields?.title} *
                                                </Label>
                                                <Input
                                                    id="titulo"
                                                    placeholder={t?.owner?.newLand?.placeholders?.titulo}
                                                    className="focus:border-primary h-14 border-2 text-lg transition-colors"
                                                    value={formData.titulo}
                                                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                                    required
                                                />
                                                <p className="text-muted-foreground text-sm">{t?.owner?.newLand?.hints?.titleHint}</p>
                                            </div>

                                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                <div className="space-y-3">
                                                    <Label htmlFor="provincia" className="text-base font-semibold">
                                                        {t?.owner?.newLand?.fields?.province} *
                                                    </Label>
                                                    <Select
                                                        value={formData.provincia}
                                                        onValueChange={(value) => setFormData({ ...formData, provincia: value })}
                                                    >
                                                        <SelectTrigger className="focus:border-primary h-14 border-2 text-lg">
                                                            <SelectValue placeholder={t?.owner?.newLand?.placeholders?.provincia} />
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
                                                    <Label htmlFor="municipio" className="text-base font-semibold">
                                                        {t?.owner?.newLand?.fields?.municipality} *
                                                    </Label>
                                                    <Input
                                                        id="municipio"
                                                        placeholder={t?.owner?.newLand?.placeholders?.municipio}
                                                        className="focus:border-primary h-14 border-2 text-lg transition-colors"
                                                        value={formData.municipio}
                                                        onChange={(e) => setFormData({ ...formData, municipio: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                <div className="space-y-3">
                                                    <Label htmlFor="superficie" className="text-base font-semibold">
                                                        {t?.owner?.newLand?.fields?.surface} *
                                                    </Label>
                                                    <Input
                                                        id="superficie"
                                                        type="number"
                                                        step="0.1"
                                                        placeholder={t?.owner?.newLand?.placeholders?.superficie}
                                                        className="focus:border-primary h-14 border-2 text-lg transition-colors"
                                                        value={formData.superficie}
                                                        onChange={(e) => setFormData({ ...formData, superficie: e.target.value })}
                                                        required
                                                    />
                                                </div>

                                                <div className="space-y-3">
                                                    <Label htmlFor="codigoPostal" className="text-base font-semibold">
                                                        {t?.owner?.newLand?.fields?.postalCode}
                                                    </Label>
                                                    <Input
                                                        id="codigoPostal"
                                                        placeholder={t?.owner?.newLand?.placeholders?.codigoPostal}
                                                        className="focus:border-primary h-14 border-2 text-lg transition-colors"
                                                        value={formData.codigoPostal}
                                                        onChange={(e) => setFormData({ ...formData, codigoPostal: e.target.value })}
                                                    />
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
                                                <Label htmlFor="direccion" className="text-base font-semibold">
                                                    {t?.owner?.newLand?.fields?.address}
                                                </Label>
                                                <Input
                                                    id="direccion"
                                                    placeholder={t?.owner?.newLand?.placeholders?.direccion}
                                                    className="focus:border-primary h-14 border-2 text-lg transition-colors"
                                                    value={formData.direccion}
                                                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                                                />
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

                                {/* Step 2: Detalles Técnicos */}
                                {step === 2 && (
                                    <div className="space-y-8">
                                        <div className="text-center">
                                            <div className="bg-primary/10 mb-6 inline-flex rounded-3xl p-6">
                                                <Mountain className="text-primary h-12 w-12" />
                                            </div>
                                            <h2 className="from-primary to-primary/70 mb-3 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
                                                {t?.owner?.newLand?.sections?.technicalTitle}
                                            </h2>
                                            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                                                {t?.owner?.newLand?.sections?.technicalSubtitle}
                                            </p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <Label className="flex items-center gap-2 text-base font-semibold">
                                                    <MapPin className="h-5 w-5" />
                                                    {t?.owner?.newLand?.sections?.coordinatesTitle}
                                                </Label>
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="latitud" className="text-muted-foreground text-sm">
                                                            {t?.owner?.newLand?.fields?.latitude}
                                                        </Label>
                                                        <Input
                                                            id="latitud"
                                                            type="number"
                                                            step="any"
                                                            placeholder={t?.owner?.newLand?.placeholders?.latitud}
                                                            className="focus:border-primary h-12 border-2 text-lg transition-colors"
                                                            value={formData.latitud}
                                                            onChange={(e) => setFormData({ ...formData, latitud: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="longitud" className="text-muted-foreground text-sm">
                                                            {t?.owner?.newLand?.fields?.longitude}
                                                        </Label>
                                                        <Input
                                                            id="longitud"
                                                            type="number"
                                                            step="any"
                                                            placeholder={t?.owner?.newLand?.placeholders?.longitud}
                                                            className="focus:border-primary h-12 border-2 text-lg transition-colors"
                                                            value={formData.longitud}
                                                            onChange={(e) => setFormData({ ...formData, longitud: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <p className="text-muted-foreground text-sm">{t?.owner?.newLand?.hints?.coordinates}</p>
                                            </div>

                                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                <div className="space-y-3">
                                                    <Label htmlFor="orientacion" className="text-base font-semibold">
                                                        {t?.owner?.newLand?.fields?.orientation}
                                                    </Label>
                                                    <Select
                                                        value={formData.orientacion}
                                                        onValueChange={(value) =>
                                                            setFormData({ ...formData, orientacion: value as Orientacion })
                                                        }
                                                    >
                                                        <SelectTrigger className="focus:border-primary h-12 border-2">
                                                            <SelectValue placeholder={t?.owner?.newLand?.placeholders?.orientacion} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="SUR">{t?.owner?.newLand?.orientations?.SUR}</SelectItem>
                                                            <SelectItem value="NORTE">{t?.owner?.newLand?.orientations?.NORTE}</SelectItem>
                                                            <SelectItem value="ESTE">{t?.owner?.newLand?.orientations?.ESTE}</SelectItem>
                                                            <SelectItem value="OESTE">{t?.owner?.newLand?.orientations?.OESTE}</SelectItem>
                                                            <SelectItem value="SURESTE">
                                                                {t?.owner?.newLand?.orientations?.SURESTE}
                                                            </SelectItem>
                                                            <SelectItem value="SUROESTE">
                                                                {t?.owner?.newLand?.orientations?.SUROESTE}
                                                            </SelectItem>
                                                            <SelectItem value="NORESTE">
                                                                {t?.owner?.newLand?.orientations?.NORESTE}
                                                            </SelectItem>
                                                            <SelectItem value="NOROESTE">
                                                                {t?.owner?.newLand?.orientations?.NOROESTE}
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-3">
                                                    <Label htmlFor="pendiente" className="text-base font-semibold">
                                                        {t?.owner?.newLand?.fields?.slope}
                                                    </Label>
                                                    <Input
                                                        id="pendiente"
                                                        type="number"
                                                        step="0.1"
                                                        placeholder={t?.owner?.newLand?.placeholders?.pendiente}
                                                        className="focus:border-primary h-12 border-2 text-lg transition-colors"
                                                        value={formData.pendiente}
                                                        onChange={(e) => setFormData({ ...formData, pendiente: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                <div className="space-y-3">
                                                    <Label htmlFor="distanciaRed" className="text-base font-semibold">
                                                        {t?.owner?.newLand?.fields?.gridDistance}
                                                    </Label>
                                                    <Input
                                                        id="distanciaRed"
                                                        type="number"
                                                        step="0.1"
                                                        placeholder={t?.owner?.newLand?.placeholders?.distanciaRed}
                                                        className="focus:border-primary h-12 border-2 text-lg transition-colors"
                                                        value={formData.distanciaRed}
                                                        onChange={(e) => setFormData({ ...formData, distanciaRed: e.target.value })}
                                                    />
                                                </div>

                                                <div className="space-y-3">
                                                    <Label htmlFor="referenciaCatastral" className="text-base font-semibold">
                                                        {t?.owner?.newLand?.fields?.cadastralRef}
                                                    </Label>
                                                    <Input
                                                        id="referenciaCatastral"
                                                        placeholder={t?.owner?.newLand?.placeholders?.referenciaCatastral}
                                                        className="focus:border-primary h-12 border-2 text-lg transition-colors"
                                                        value={formData.referenciaCatastral}
                                                        onChange={(e) => setFormData({ ...formData, referenciaCatastral: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                <div className="space-y-3">
                                                    <Label htmlFor="potencialSolar" className="text-base font-semibold">
                                                        {t?.owner?.newLand?.fields?.solarPotential}
                                                    </Label>
                                                    <Input
                                                        id="potencialSolar"
                                                        type="number"
                                                        step="0.1"
                                                        placeholder={t?.owner?.newLand?.placeholders?.potencialSolar}
                                                        className="focus:border-primary h-12 border-2 text-lg transition-colors"
                                                        value={formData.potencialSolar}
                                                        onChange={(e) => setFormData({ ...formData, potencialSolar: e.target.value })}
                                                    />
                                                </div>

                                                <div className="space-y-3">
                                                    <Label htmlFor="potencialEolico" className="text-base font-semibold">
                                                        {t?.owner?.newLand?.fields?.windPotential}
                                                    </Label>
                                                    <Input
                                                        id="potencialEolico"
                                                        type="number"
                                                        step="0.1"
                                                        placeholder={t?.owner?.newLand?.placeholders?.potencialEolico}
                                                        className="focus:border-primary h-12 border-2 text-lg transition-colors"
                                                        value={formData.potencialEolico}
                                                        onChange={(e) => setFormData({ ...formData, potencialEolico: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <Label htmlFor="restriccionesAmbientales" className="text-base font-semibold">
                                                    Restricciones Ambientales
                                                </Label>
                                                <Textarea
                                                    id="restriccionesAmbientales"
                                                    placeholder={t?.owner?.newLand?.placeholders?.restriccionesAmbientales}
                                                    className="focus:border-primary min-h-24 resize-none border-2 text-base transition-colors"
                                                    value={formData.restriccionesAmbientales}
                                                    onChange={(e) => setFormData({ ...formData, restriccionesAmbientales: e.target.value })}
                                                />
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <input
                                                    type="checkbox"
                                                    id="zonasProtegidas"
                                                    checked={formData.zonasProtegidas}
                                                    onChange={(e) => setFormData({ ...formData, zonasProtegidas: e.target.checked })}
                                                    className="text-primary focus:ring-primary h-5 w-5 rounded border-gray-300 bg-gray-100 focus:ring-2"
                                                />
                                                <Label htmlFor="zonasProtegidas" className="text-base font-medium">
                                                    {t?.owner?.newLand?.protectedAreaLabel}
                                                </Label>
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
                                                type="button"
                                                onClick={nextStep}
                                                className="bg-primary hover:bg-primary/90 h-14 flex-1 text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                                            >
                                                {t?.common?.continue}
                                                <ChevronRight className="ml-2 h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Precio y Características */}
                                {step === 3 && (
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
                                                        <Euro className="h-5 w-5" />
                                                        {t?.owner?.newLand?.fields?.salePrice}
                                                    </Label>
                                                    <Input
                                                        id="precioVenta"
                                                        type="number"
                                                        placeholder={t?.owner?.newLand?.placeholders?.precioVenta}
                                                        className="focus:border-primary h-14 border-2 text-lg transition-colors"
                                                        value={formData.precioVenta}
                                                        onChange={(e) => setFormData({ ...formData, precioVenta: e.target.value })}
                                                    />
                                                    <p className="text-muted-foreground text-sm">{t?.owner?.newLand?.hints?.priceSale}</p>
                                                </div>
                                            )}

                                            {(formData.disponibilidad === "ARRENDAMIENTO" || formData.disponibilidad === "AMBOS") && (
                                                <div className="space-y-3">
                                                    <Label
                                                        htmlFor="precioArrendamiento"
                                                        className="flex items-center gap-2 text-base font-semibold"
                                                    >
                                                        <Euro className="h-5 w-5" />
                                                        {t?.owner?.newLand?.fields?.rentPrice}
                                                    </Label>
                                                    <Input
                                                        id="precioArrendamiento"
                                                        type="number"
                                                        placeholder={t?.owner?.newLand?.placeholders?.precioArrendamiento}
                                                        className="focus:border-primary h-14 border-2 text-lg transition-colors"
                                                        value={formData.precioArrendamiento}
                                                        onChange={(e) => setFormData({ ...formData, precioArrendamiento: e.target.value })}
                                                    />
                                                    <p className="text-muted-foreground text-sm">{t?.owner?.newLand?.hints?.priceRent}</p>
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
