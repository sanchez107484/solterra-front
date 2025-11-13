"use client"

import { MatchesSection, StatsCard } from "@/components/dashboard"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useUnsavedChanges } from "@/hooks/use-unsaved-changes"
import { useTranslations } from "@/i18n/i18nContext"
import { proyectosService } from "@/services/proyectos.service"
import type { EstadoProyecto, Proyecto, TipoProyecto } from "@/types/proyecto.types"
import {
    Activity,
    AlertCircle,
    ArrowRight,
    Building2,
    Calendar,
    CheckCircle2,
    Edit,
    Euro,
    MapPin,
    Radio,
    Ruler,
    Save,
    Target,
    Wind,
    X,
    Zap,
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Funciones helper para iconos y etiquetas
function getProjectTypeIcon(tipo?: string) {
    switch (tipo?.toUpperCase()) {
        case "SOLAR_FOTOVOLTAICO":
            return <Zap className="h-4 w-4" />
        case "EOLICO":
            return <Wind className="h-4 w-4" />
        case "HIBRIDACION":
            return <Activity className="h-4 w-4" />
        case "ALMACENAMIENTO":
            return <Building2 className="h-4 w-4" />
        case "HIDROGENO":
            return <Zap className="h-4 w-4" />
        case "BIOMETANO":
            return <Activity className="h-4 w-4" />
        default:
            return <Target className="h-4 w-4" />
    }
}

function getStatusColor(estado?: string) {
    switch (estado?.toUpperCase()) {
        case "ACTIVO":
            return "bg-emerald-500"
        case "COMPLETADO":
            return "bg-blue-500"
        case "PAUSADO":
            return "bg-yellow-500"
        case "BORRADOR":
            return "bg-gray-500"
        case "CANCELADO":
            return "bg-red-500"
        case "PENDIENTE_REVISION":
        case "EN_BUSQUEDA":
        case "PLANIFICACION":
        case "EN_DESARROLLO":
            return "bg-orange-500"
        default:
            return "bg-gray-500"
    }
}

export default function ProyectoDetallePage() {
    const { t } = useTranslations()
    const params = useParams()
    const router = useRouter()
    const { toast } = useToast()
    const proyectoId = params.id as string

    const [proyecto, setProyecto] = useState<any>(null)
    const [matches, setMatches] = useState<any[]>([])
    const [isLoadingMatches, setIsLoadingMatches] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [editedData, setEditedData] = useState<Partial<Proyecto>>({})
    const [isSaving, setIsSaving] = useState(false)

    // Detectar si hay cambios sin guardar
    const hasUnsavedChanges =
        isEditing &&
        Object.keys(editedData).some((key) => editedData[key as keyof typeof editedData] !== proyecto?.[key as keyof typeof proyecto])

    // Usar el hook de protección contra cambios sin guardar
    const { allowNavigation } = useUnsavedChanges(
        hasUnsavedChanges,
        "Tienes cambios sin guardar. ¿Estás seguro de que deseas salir? Se perderán todos los cambios."
    )

    useEffect(() => {
        const loadProyecto = async () => {
            try {
                const token = localStorage.getItem("auth_token")
                if (!token) return

                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

                const response = await fetch(`${API_URL}/proyectos/${proyectoId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    setProyecto(data)
                }
            } catch (error: any) {
                console.error("Error loading proyecto:", error)
                toast({
                    title: "Error",
                    description: error.message || "No se pudo cargar la información del proyecto",
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        }

        loadProyecto()
    }, [proyectoId, toast])

    useEffect(() => {
        const loadMatches = async () => {
            if (!proyectoId) return

            setIsLoadingMatches(true)
            try {
                const token = localStorage.getItem("auth_token")
                if (!token) return

                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

                // Usar el endpoint correcto del módulo Matches
                const response = await fetch(`${API_URL}/matches/proyecto/${proyectoId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    console.log("Matches response:", data)

                    // Transformar los datos del backend al formato esperado por MatchesTable
                    const transformedMatches = Array.isArray(data)
                        ? data.map((match: any) => ({
                              id: match.terreno?.id || match.id,
                              titulo: match.terreno?.titulo || "",
                              provincia: match.terreno?.provincia,
                              superficie: match.terreno?.superficie,
                              compatibilidad: match.scoreTotal || 0,
                              estado: match.terreno?.estado || match.estado,
                          }))
                        : []

                    setMatches(transformedMatches)
                }
            } catch (error) {
                console.error("Error loading matches:", error)
            } finally {
                setIsLoadingMatches(false)
            }
        }

        loadMatches()
    }, [proyectoId])

    const handleUpdateProject = () => {
        toast({
            title: "Proyecto actualizado",
            description: "El proyecto se ha actualizado correctamente.",
        })
    }

    const getEstadoColor = (estado: string) => {
        switch (estado?.toUpperCase()) {
            case "ACTIVO":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "COMPLETADO":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case "PAUSADO":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "BORRADOR":
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
            case "CANCELADO":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            case "PENDIENTE_REVISION":
            case "EN_BUSQUEDA":
            case "PLANIFICACION":
            case "EN_DESARROLLO":
                return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
        }
    }

    const getEstadoLabel = (estado?: string) => {
        switch (estado?.toUpperCase()) {
            case "ACTIVO":
                return "Activo"
            case "COMPLETADO":
                return "Completado"
            case "PAUSADO":
                return "Pausado"
            case "BORRADOR":
                return "Borrador"
            case "CANCELADO":
                return "Cancelado"
            case "PENDIENTE_REVISION":
                return "Pendiente Revisión"
            case "EN_BUSQUEDA":
                return "En Búsqueda"
            case "PLANIFICACION":
                return "Planificación"
            case "EN_DESARROLLO":
                return "En Desarrollo"
            default:
                return estado || "Sin estado"
        }
    }

    const getTipoProyectoLabel = (tipo?: string) => {
        switch (tipo?.toUpperCase()) {
            case "SOLAR_FOTOVOLTAICO":
                return "Solar Fotovoltaico"
            case "EOLICO":
                return "Eólico"
            case "HIBRIDACION":
                return "Hibridación"
            case "ALMACENAMIENTO":
                return "Almacenamiento"
            case "HIDROGENO":
                return "Hidrógeno"
            case "BIOMETANO":
                return "Biometano"
            default:
                return tipo || "No especificado"
        }
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            notation: "compact",
        }).format(amount)
    }

    const handleEdit = () => {
        // Solo copiar campos editables
        const editableFields = {
            titulo: proyecto.titulo,
            descripcion: proyecto.descripcion,
            tipo: proyecto.tipo,
            estado: proyecto.estado,
            presupuesto: proyecto.presupuesto,
            potenciaObjetivo: proyecto.potenciaObjetivo,
            superficieMinima: proyecto.superficieMinima,
            superficieMaxima: proyecto.superficieMaxima,
            superficieNecesaria: proyecto.superficieNecesaria,
            distanciaMaximaRed: proyecto.distanciaMaximaRed,
            capacidadSubestacionMinima: proyecto.capacidadSubestacionMinima,
            ubicacion: proyecto.ubicacion,
            provincia: proyecto.provincia,
            comunidad: proyecto.comunidad,
        }
        setEditedData(editableFields)
        setIsEditing(true)
    }

    const handleCancel = () => {
        // Verificar si hay cambios antes de cancelar
        const hasChanges = Object.keys(editedData).some(
            (key) => editedData[key as keyof typeof editedData] !== proyecto[key as keyof typeof proyecto]
        )

        if (hasChanges) {
            const confirmed = window.confirm("¿Estás seguro de que deseas cancelar? Se perderán todos los cambios no guardados.")
            if (!confirmed) return
        }

        setEditedData({})
        setIsEditing(false)
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            // Filtrar solo los campos que han cambiado
            const changedFields: any = {}
            Object.keys(editedData).forEach((key) => {
                const fieldKey = key as keyof typeof editedData
                if (editedData[fieldKey] !== proyecto[fieldKey]) {
                    changedFields[fieldKey] = editedData[fieldKey]
                }
            })

            console.log("Saving proyecto with changed fields:", changedFields)
            console.log("Proyecto ID:", proyectoId)

            if (Object.keys(changedFields).length === 0) {
                toast({
                    title: "Sin cambios",
                    description: "No se han detectado cambios para guardar",
                })
                setIsEditing(false)
                return
            }

            const updated = await proyectosService.update(proyectoId, changedFields)
            console.log("Updated proyecto:", updated)

            setProyecto(updated)
            setIsEditing(false)
            setEditedData({})
            allowNavigation() // Permitir navegación después de guardar exitosamente
            toast({
                title: "Guardado",
                description: "Los cambios se han guardado correctamente",
            })
        } catch (error: any) {
            console.error("Error saving proyecto:", error)
            console.error("Error response:", error?.response)
            console.error("Error data:", error?.response?.data)
            console.error("Error message:", error?.message)

            const errorMessage = error?.response?.data?.message || error?.message || "No se pudieron guardar los cambios"

            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            })
        } finally {
            setIsSaving(false)
        }
    }

    const handleFieldChange = (field: keyof Proyecto, value: any) => {
        setEditedData((prev) => ({ ...prev, [field]: value }))
    }

    // Componente helper para campos editables
    const EditableField = ({ label, children, isEditing: editing }: { label: string; children: React.ReactNode; isEditing: boolean }) => (
        <div>
            <Label className="text-muted-foreground text-xs">{label}</Label>
            {children}
        </div>
    )

    // Componente helper para campos de solo lectura
    const ReadOnlyField = ({ label, value }: { label: string; value: string }) => (
        <div className="group relative">
            <Label className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <span className="text-lg">🔒</span>
                {label}
                <span className="text-muted-foreground text-[10px] italic">(Solo lectura)</span>
            </Label>
            <p className="bg-muted/30 text-muted-foreground mt-1 rounded border border-dashed px-2 py-1.5 font-medium">{value}</p>
        </div>
    )

    return (
        <>
            <DashboardHeader
                title={proyecto?.titulo || "Detalles del Proyecto"}
                breadcrumbs={[
                    { label: "Dashboard", href: "/dashboard/promotor" },
                    { label: "Mis Proyectos", href: "/dashboard/promotor/mis-proyectos" },
                    { label: proyecto?.titulo || "Detalles del Proyecto" },
                ]}
                userType="promotor"
            />

            <main className="space-y-6 p-6">
                {isLoading ? (
                    <div className="flex min-h-[50vh] items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="border-t-secondary h-8 w-8 animate-spin rounded-full border-4 border-gray-300" />
                            <p className="text-muted-foreground text-sm">Cargando proyecto...</p>
                        </div>
                    </div>
                ) : proyecto ? (
                    <>
                        {/* Banner de Modo Edición */}
                        {isEditing && (
                            <div className="animate-in fade-in slide-in-from-top-2 border-secondary bg-secondary/10 flex items-center gap-3 rounded-lg border-2 p-4 duration-300">
                                <Edit className="text-secondary h-5 w-5" />
                                <div className="flex-1">
                                    <p className="text-secondary font-semibold">Modo de edición activado</p>
                                    <p className="text-secondary/80 text-sm">Realiza los cambios necesarios y guarda para confirmarlos</p>
                                </div>
                                {(() => {
                                    const changedFieldsCount = Object.keys(editedData).filter(
                                        (key) => editedData[key as keyof typeof editedData] !== proyecto[key as keyof typeof proyecto]
                                    ).length
                                    return changedFieldsCount > 0 ? (
                                        <Badge variant="secondary" className="bg-secondary text-white">
                                            {changedFieldsCount} cambio{changedFieldsCount !== 1 ? "s" : ""}
                                        </Badge>
                                    ) : null
                                })()}
                            </div>
                        )}

                        {/* Estadísticas del Proyecto */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <StatsCard
                                icon={Zap}
                                title="Potencia"
                                value={proyecto.potenciaObjetivo ? `${proyecto.potenciaObjetivo}` : "0"}
                                subtitle={proyecto.potenciaObjetivo ? "MW objetivo" : "No especificado"}
                                variant="secondary"
                            />
                            <StatsCard
                                icon={Euro}
                                title="Presupuesto"
                                value={proyecto.presupuesto ? formatCurrency(proyecto.presupuesto) : "Consultar"}
                                subtitle="Inversión estimada"
                                variant="primary"
                            />
                            <StatsCard
                                icon={Ruler}
                                title="Superficie"
                                value={
                                    proyecto.superficieNecesaria
                                        ? `${proyecto.superficieNecesaria}`
                                        : proyecto.superficieMinima
                                          ? `${proyecto.superficieMinima}+`
                                          : "0"
                                }
                                subtitle={
                                    proyecto.superficieNecesaria
                                        ? "ha necesarias"
                                        : proyecto.superficieMinima
                                          ? "ha mínimas"
                                          : "No especificado"
                                }
                                variant="secondary"
                            />
                            <StatsCard
                                icon={CheckCircle2}
                                title="Estado"
                                value={getEstadoLabel(proyecto.estado)}
                                subtitle="Estado actual"
                                variant="primary"
                            />
                        </div>

                        {/* Header Card con información principal y CTA destacado */}
                        <Card className="border-secondary/20 from-secondary/5 via-background to-accent/5 bg-gradient-to-br py-0">
                            {/* Decorative background - más sutil */}
                            <div className="bg-secondary/5 absolute top-0 right-0 -z-0 h-64 w-64 rounded-full opacity-30 blur-3xl" />

                            <div className="relative z-10 p-6">
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                    {/* Información principal del proyecto */}
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-secondary/10 ring-secondary/20 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ring-2">
                                                {getProjectTypeIcon(proyecto.tipo)}
                                            </div>
                                            <div className="flex-1">
                                                {isEditing ? (
                                                    <div className="space-y-2">
                                                        <Label className="text-secondary font-semibold">Título del Proyecto</Label>
                                                        <Input
                                                            value={editedData.titulo ?? proyecto.titulo}
                                                            onChange={(e) => handleFieldChange("titulo", e.target.value)}
                                                            className="text-lg font-bold"
                                                        />
                                                    </div>
                                                ) : (
                                                    <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                                                        {proyecto.titulo}
                                                    </h1>
                                                )}

                                                <div className="flex flex-wrap items-center gap-2">
                                                    {isEditing ? (
                                                        <div className="space-y-2">
                                                            <Label className="text-secondary font-semibold">Estado del Proyecto</Label>
                                                            <Select
                                                                value={editedData.estado ?? proyecto.estado}
                                                                onValueChange={(value) =>
                                                                    handleFieldChange("estado", value as EstadoProyecto)
                                                                }
                                                            >
                                                                <SelectTrigger className="w-[200px]">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="BORRADOR">Borrador</SelectItem>
                                                                    <SelectItem value="PENDIENTE_REVISION">Pendiente Revisión</SelectItem>
                                                                    <SelectItem value="EN_BUSQUEDA">En Búsqueda</SelectItem>
                                                                    <SelectItem value="PLANIFICACION">Planificación</SelectItem>
                                                                    <SelectItem value="EN_DESARROLLO">En Desarrollo</SelectItem>
                                                                    <SelectItem value="ACTIVO">Activo</SelectItem>
                                                                    <SelectItem value="PAUSADO">Pausado</SelectItem>
                                                                    <SelectItem value="CANCELADO">Cancelado</SelectItem>
                                                                    <SelectItem value="COMPLETADO">Completado</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    ) : (
                                                        <Badge className={getEstadoColor(proyecto.estado)}>
                                                            {getEstadoLabel(proyecto.estado)}
                                                        </Badge>
                                                    )}

                                                    {proyecto.potenciaObjetivo && (
                                                        <Badge variant="outline" className="gap-1">
                                                            <Zap className="h-3 w-3" />
                                                            {proyecto.potenciaObjetivo} MW
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {isEditing ? (
                                            <div className="space-y-2">
                                                <Label className="text-secondary font-semibold">Descripción del Proyecto</Label>
                                                <Textarea
                                                    value={editedData.descripcion ?? proyecto.descripcion ?? ""}
                                                    onChange={(e) => handleFieldChange("descripcion", e.target.value)}
                                                    rows={3}
                                                    className="bg-background/50 rounded-lg border"
                                                />
                                            </div>
                                        ) : (
                                            proyecto.descripcion && (
                                                <div className="bg-background/50 rounded-lg border p-4">
                                                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                                        {proyecto.descripcion}
                                                    </p>
                                                </div>
                                            )
                                        )}

                                        {/* Información clave: Ubicación y Tipo */}
                                        <div className="flex flex-wrap gap-3">
                                            {(proyecto.ubicacion || proyecto.provincia) && (
                                                <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 text-sm shadow-sm ring-1 ring-gray-200 dark:bg-gray-800/80 dark:ring-gray-700">
                                                    <MapPin className="text-primary h-4 w-4" />
                                                    <div>
                                                        <span className="font-medium">{proyecto.ubicacion || proyecto.provincia}</span>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 text-sm shadow-sm ring-1 ring-gray-200 dark:bg-gray-800/80 dark:ring-gray-700">
                                                <Building2 className="text-secondary h-4 w-4" />
                                                <div>
                                                    <span className="text-xs text-gray-500">Tipo de Proyecto</span>
                                                    <div className="font-medium">{getTipoProyectoLabel(proyecto.tipo)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA Card destacado */}
                                    <Card className="from-secondary to-secondary/80 border-0 bg-gradient-to-br py-0 text-white shadow-xl lg:w-80">
                                        <div className="space-y-3 p-5">
                                            <div className="flex items-center gap-2">
                                                <div className="rounded-lg bg-white/20 p-1.5">
                                                    {!isEditing ? <Edit className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                                                </div>
                                                <h3 className="font-bold">{!isEditing ? "Gestiona tu proyecto" : "Guarda los cambios"}</h3>
                                            </div>
                                            <p className="text-xs leading-relaxed text-white/90">
                                                {!isEditing
                                                    ? "Edita la información del proyecto o revisa los terrenos compatibles encontrados."
                                                    : "Revisa los cambios realizados antes de confirmar."}
                                            </p>

                                            {!isEditing ? (
                                                <Button
                                                    onClick={handleEdit}
                                                    className="text-secondary group w-full gap-2 bg-white font-semibold shadow-lg hover:bg-white/90"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                    Editar Proyecto
                                                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                                </Button>
                                            ) : (
                                                <div className="space-y-2">
                                                    <Button
                                                        onClick={handleSave}
                                                        disabled={isSaving}
                                                        className="text-secondary group w-full gap-2 bg-white font-semibold shadow-lg hover:bg-white/90"
                                                    >
                                                        {isSaving ? (
                                                            <>
                                                                <div className="border-secondary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                                                                Guardando...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Save className="h-4 w-4" />
                                                                Guardar Cambios
                                                                <CheckCircle2 className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                                                            </>
                                                        )}
                                                    </Button>
                                                    <Button
                                                        onClick={handleCancel}
                                                        variant="outline"
                                                        disabled={isSaving}
                                                        className="w-full gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20"
                                                    >
                                                        <X className="h-4 w-4" />
                                                        Cancelar
                                                    </Button>
                                                </div>
                                            )}
                                            <p className="text-center text-xs text-white/70">
                                                {matches.length > 0
                                                    ? `${matches.length} terrenos compatibles`
                                                    : "Buscando terrenos compatibles"}
                                            </p>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </Card>

                        {/* Sección: Información del Proyecto */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* Tipo y Características */}
                            <Card
                                className={`group py-0 transition-all hover:shadow-lg ${isEditing ? "border-secondary/50 bg-secondary/5 border-2" : ""}`}
                            >
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-secondary/10 group-hover:bg-secondary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                                            <Building2 className="text-secondary h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold">Tipo de Proyecto</h2>
                                            <p className="text-muted-foreground text-sm">Tecnología y características</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {isEditing ? (
                                            <div className="space-y-2">
                                                <Label className="text-secondary flex items-center gap-2 font-semibold">
                                                    <Edit className="h-3 w-3" />
                                                    Tipo de Tecnología
                                                </Label>
                                                <Select
                                                    value={editedData.tipo ?? proyecto.tipo}
                                                    onValueChange={(value) => handleFieldChange("tipo", value as TipoProyecto)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="SOLAR_FOTOVOLTAICO">Solar Fotovoltaico</SelectItem>
                                                        <SelectItem value="EOLICO">Eólico</SelectItem>
                                                        <SelectItem value="HIBRIDACION">Hibridación</SelectItem>
                                                        <SelectItem value="ALMACENAMIENTO">Almacenamiento</SelectItem>
                                                        <SelectItem value="HIDROGENO">Hidrógeno</SelectItem>
                                                        <SelectItem value="BIOMETANO">Biometano</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        ) : (
                                            <div className="space-y-1">
                                                <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                                    <Building2 className="h-3.5 w-3.5" />
                                                    Tipo de Tecnología
                                                </dt>
                                                <dd className="text-secondary font-bold">{getTipoProyectoLabel(proyecto.tipo)}</dd>
                                            </div>
                                        )}

                                        {isEditing ? (
                                            <div className="space-y-2">
                                                <Label className="text-secondary flex items-center gap-2 font-semibold">
                                                    <Edit className="h-3 w-3" />
                                                    Potencia Objetivo (MW)
                                                </Label>
                                                <Input
                                                    type="number"
                                                    step="0.1"
                                                    value={editedData.potenciaObjetivo ?? proyecto.potenciaObjetivo ?? ""}
                                                    onChange={(e) =>
                                                        handleFieldChange(
                                                            "potenciaObjetivo",
                                                            e.target.value ? parseFloat(e.target.value) : null
                                                        )
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <div className="space-y-1">
                                                <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                                    <Zap className="h-3.5 w-3.5" />
                                                    Potencia Objetivo
                                                </dt>
                                                <dd className="font-bold text-gray-900 dark:text-white">
                                                    {proyecto.potenciaObjetivo ? `${proyecto.potenciaObjetivo} MW` : "No especificado"}
                                                </dd>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>

                            {/* Presupuesto e Inversión */}
                            <Card
                                className={`group py-0 transition-all hover:shadow-lg ${isEditing ? "border-secondary/50 bg-secondary/5 border-2" : ""}`}
                            >
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-primary/10 group-hover:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                                            <Euro className="text-primary h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold">Presupuesto</h2>
                                            <p className="text-muted-foreground text-sm">Inversión requerida</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {isEditing ? (
                                            <div className="space-y-2">
                                                <Label className="text-secondary flex items-center gap-2 font-semibold">
                                                    <Edit className="h-3 w-3" />
                                                    Presupuesto Total (€)
                                                </Label>
                                                <Input
                                                    type="number"
                                                    value={editedData.presupuesto ?? proyecto.presupuesto ?? ""}
                                                    onChange={(e) =>
                                                        handleFieldChange("presupuesto", e.target.value ? parseFloat(e.target.value) : null)
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <div className="space-y-1">
                                                <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                                    <Euro className="h-3.5 w-3.5" />
                                                    Inversión Total
                                                </dt>
                                                <dd className="text-secondary font-bold">
                                                    {proyecto.presupuesto ? formatCurrency(proyecto.presupuesto) : "No especificado"}
                                                </dd>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>

                            {/* Superficie Requerida */}
                            <Card
                                className={`group py-0 transition-all hover:shadow-lg ${isEditing ? "border-secondary/50 bg-secondary/5 border-2" : ""}`}
                            >
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-secondary/10 group-hover:bg-secondary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                                            <Ruler className="text-secondary h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold">Superficie</h2>
                                            <p className="text-muted-foreground text-sm">Requerimientos de terreno</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {isEditing ? (
                                            <>
                                                <div className="space-y-2">
                                                    <Label className="text-secondary flex items-center gap-2 font-semibold">
                                                        <Edit className="h-3 w-3" />
                                                        Superficie Mínima (ha)
                                                    </Label>
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        value={editedData.superficieMinima ?? proyecto.superficieMinima ?? ""}
                                                        onChange={(e) =>
                                                            handleFieldChange(
                                                                "superficieMinima",
                                                                e.target.value ? parseFloat(e.target.value) : 0
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-secondary flex items-center gap-2 font-semibold">
                                                        <Edit className="h-3 w-3" />
                                                        Superficie Necesaria (ha)
                                                    </Label>
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        value={editedData.superficieNecesaria ?? proyecto.superficieNecesaria ?? ""}
                                                        onChange={(e) =>
                                                            handleFieldChange(
                                                                "superficieNecesaria",
                                                                e.target.value ? parseFloat(e.target.value) : null
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="space-y-1">
                                                    <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                                        <Ruler className="h-3.5 w-3.5" />
                                                        Superficie Mínima
                                                    </dt>
                                                    <dd className="font-bold text-gray-900 dark:text-white">
                                                        {proyecto.superficieMinima ? `${proyecto.superficieMinima} ha` : "No especificado"}
                                                    </dd>
                                                </div>
                                                {proyecto.superficieNecesaria && (
                                                    <div className="space-y-1">
                                                        <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                                            <Target className="h-3.5 w-3.5" />
                                                            Superficie Necesaria
                                                        </dt>
                                                        <dd className="text-secondary font-bold">{proyecto.superficieNecesaria} ha</dd>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Ubicación e Infraestructura */}
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Ubicación */}
                            <Card
                                className={`group py-0 transition-all hover:shadow-lg ${isEditing ? "border-secondary/50 bg-secondary/5 border-2" : ""}`}
                            >
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-primary/10 group-hover:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                                            <MapPin className="text-primary h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold">Ubicación</h2>
                                            <p className="text-muted-foreground text-sm">Localización preferida</p>
                                        </div>
                                    </div>
                                    <div className="grid gap-4">
                                        {isEditing ? (
                                            <>
                                                <div className="space-y-2">
                                                    <Label className="text-secondary flex items-center gap-2 font-semibold">
                                                        <Edit className="h-3 w-3" />
                                                        Ubicación
                                                    </Label>
                                                    <Input
                                                        value={editedData.ubicacion ?? proyecto.ubicacion ?? ""}
                                                        onChange={(e) => handleFieldChange("ubicacion", e.target.value)}
                                                        placeholder="Ej: Madrid"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-secondary flex items-center gap-2 font-semibold">
                                                        <Edit className="h-3 w-3" />
                                                        Provincia
                                                    </Label>
                                                    <Input
                                                        value={editedData.provincia ?? proyecto.provincia ?? ""}
                                                        onChange={(e) => handleFieldChange("provincia", e.target.value)}
                                                        placeholder="Ej: Madrid"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-secondary flex items-center gap-2 font-semibold">
                                                        <Edit className="h-3 w-3" />
                                                        Comunidad Autónoma
                                                    </Label>
                                                    <Input
                                                        value={editedData.comunidad ?? proyecto.comunidad ?? ""}
                                                        onChange={(e) => handleFieldChange("comunidad", e.target.value)}
                                                        placeholder="Ej: Comunidad de Madrid"
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="space-y-1">
                                                    <dt className="text-muted-foreground text-xs font-medium">Ubicación</dt>
                                                    <dd className="font-medium">{proyecto.ubicacion || "No especificado"}</dd>
                                                </div>
                                                <div className="space-y-1">
                                                    <dt className="text-muted-foreground text-xs font-medium">Provincia</dt>
                                                    <dd className="font-medium">{proyecto.provincia || "No especificado"}</dd>
                                                </div>
                                                <div className="space-y-1">
                                                    <dt className="text-muted-foreground text-xs font-medium">Comunidad Autónoma</dt>
                                                    <dd className="font-medium">{proyecto.comunidad || "No especificado"}</dd>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Card>

                            {/* Infraestructura Eléctrica */}
                            <Card
                                className={`group py-0 transition-all hover:shadow-lg ${isEditing ? "border-secondary/50 bg-secondary/5 border-2" : ""}`}
                            >
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-secondary/10 group-hover:bg-secondary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                                            <Radio className="text-secondary h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold">Infraestructura</h2>
                                            <p className="text-muted-foreground text-sm">Requisitos técnicos</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {isEditing ? (
                                            <>
                                                <div className="space-y-2">
                                                    <Label className="text-secondary flex items-center gap-2 font-semibold">
                                                        <Edit className="h-3 w-3" />
                                                        Distancia Máxima a Red (km)
                                                    </Label>
                                                    <Input
                                                        type="number"
                                                        step="0.1"
                                                        value={editedData.distanciaMaximaRed ?? proyecto.distanciaMaximaRed ?? ""}
                                                        onChange={(e) =>
                                                            handleFieldChange(
                                                                "distanciaMaximaRed",
                                                                e.target.value ? parseFloat(e.target.value) : null
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-secondary flex items-center gap-2 font-semibold">
                                                        <Edit className="h-3 w-3" />
                                                        Capacidad Subestación Mín. (MVA)
                                                    </Label>
                                                    <Input
                                                        type="number"
                                                        step="0.1"
                                                        value={
                                                            editedData.capacidadSubestacionMinima ??
                                                            proyecto.capacidadSubestacionMinima ??
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            handleFieldChange(
                                                                "capacidadSubestacionMinima",
                                                                e.target.value ? parseFloat(e.target.value) : null
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="space-y-1">
                                                    <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                                        <Radio className="h-3.5 w-3.5" />
                                                        Distancia Máxima a Red
                                                    </dt>
                                                    <dd className="font-bold text-gray-900 dark:text-white">
                                                        {proyecto.distanciaMaximaRed
                                                            ? `${proyecto.distanciaMaximaRed} km`
                                                            : "No especificado"}
                                                    </dd>
                                                </div>
                                                <div className="space-y-1">
                                                    <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                                        <Zap className="h-3.5 w-3.5" />
                                                        Capacidad Subestación Mín.
                                                    </dt>
                                                    <dd className="font-bold text-gray-900 dark:text-white">
                                                        {proyecto.capacidadSubestacionMinima
                                                            ? `${proyecto.capacidadSubestacionMinima} MVA`
                                                            : "No especificado"}
                                                    </dd>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Información del Sistema - Solo Lectura */}
                        <Card className="group py-0 transition-all hover:shadow-lg">
                            <div className="p-6">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 transition-colors group-hover:bg-gray-200 dark:bg-gray-800 dark:group-hover:bg-gray-700">
                                        <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold">Información del Sistema</h2>
                                        <p className="text-muted-foreground text-sm">Datos de solo lectura</p>
                                    </div>
                                </div>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="group relative">
                                        <Label className="text-muted-foreground flex items-center gap-1.5 text-xs">
                                            <span className="text-lg">🔒</span>
                                            ID del Proyecto
                                            <span className="text-muted-foreground text-[10px] italic">(Solo lectura)</span>
                                        </Label>
                                        <p className="bg-muted/30 text-muted-foreground mt-1 rounded border border-dashed px-2 py-1.5 font-medium">
                                            {proyecto.id}
                                        </p>
                                    </div>
                                    <div className="group relative">
                                        <Label className="text-muted-foreground flex items-center gap-1.5 text-xs">
                                            <span className="text-lg">🔒</span>
                                            Fecha de Creación
                                            <span className="text-muted-foreground text-[10px] italic">(Solo lectura)</span>
                                        </Label>
                                        <p className="bg-muted/30 text-muted-foreground mt-1 rounded border border-dashed px-2 py-1.5 font-medium">
                                            {proyecto.creadoEn ? new Date(proyecto.creadoEn).toLocaleDateString("es-ES") : "No disponible"}
                                        </p>
                                    </div>
                                    <div className="group relative">
                                        <Label className="text-muted-foreground flex items-center gap-1.5 text-xs">
                                            <span className="text-lg">🔒</span>
                                            Última Actualización
                                            <span className="text-muted-foreground text-[10px] italic">(Solo lectura)</span>
                                        </Label>
                                        <p className="bg-muted/30 text-muted-foreground mt-1 rounded border border-dashed px-2 py-1.5 font-medium">
                                            {proyecto.actualizadoEn
                                                ? new Date(proyecto.actualizadoEn).toLocaleDateString("es-ES")
                                                : "No disponible"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Terrenos Compatibles */}
                        <MatchesSection
                            title="Terrenos Compatibles"
                            subtitle="Terrenos que mejor se adaptan a este proyecto"
                            matches={matches}
                            isLoading={isLoadingMatches}
                            selectedItemTitle={proyecto?.titulo}
                            basePath="/dashboard/promotor/terrenos"
                            variant="secondary"
                        />

                        {/* Información de ayuda cuando está en modo edición */}
                        {isEditing && (
                            <div className="border-secondary/20 bg-secondary/5 flex items-start gap-3 rounded-lg border p-4">
                                <AlertCircle className="text-secondary mt-0.5 h-5 w-5 flex-shrink-0" />
                                <div className="text-sm">
                                    <p className="text-secondary font-semibold">Consejos para editar:</p>
                                    <ul className="text-secondary/80 mt-2 list-inside list-disc space-y-1">
                                        <li>Los campos marcados con 🔒 son de solo lectura y no pueden ser modificados</li>
                                        <li>Todos los cambios deben ser guardados para aplicarse</li>
                                        <li>Puedes cancelar en cualquier momento para descartar los cambios</li>
                                        <li>Los campos editables tienen un icono de lápiz y fondo destacado</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Banner de Modo Edición */}
                        {isEditing && (
                            <div className="animate-in fade-in slide-in-from-top-2 border-secondary bg-secondary/10 flex items-center gap-3 rounded-lg border-2 p-4 duration-300">
                                <Edit className="text-secondary h-5 w-5" />
                                <div className="flex-1">
                                    <p className="text-secondary font-semibold">Modo de edición activado</p>
                                    <p className="text-secondary/80 text-sm">Realiza los cambios necesarios y guarda para confirmarlos</p>
                                </div>
                                {(() => {
                                    const changedFieldsCount = Object.keys(editedData).filter(
                                        (key) => editedData[key as keyof typeof editedData] !== proyecto[key as keyof typeof proyecto]
                                    ).length
                                    return changedFieldsCount > 0 ? (
                                        <Badge variant="secondary" className="bg-secondary text-white">
                                            {changedFieldsCount} cambio{changedFieldsCount !== 1 ? "s" : ""}
                                        </Badge>
                                    ) : null
                                })()}
                            </div>
                        )}
                    </>
                ) : (
                    <Card className="p-12 py-0">
                        <CardContent className="flex flex-col items-center gap-4 text-center">
                            <AlertCircle className="text-muted-foreground h-12 w-12" />
                            <div>
                                <h3 className="text-lg font-semibold">Proyecto no encontrado</h3>
                                <p className="text-muted-foreground mt-1 text-sm">No se pudo cargar la información del proyecto</p>
                            </div>
                            <Button onClick={() => router.push("/dashboard/promotor/mis-proyectos")} variant="outline">
                                Volver a Mis Proyectos
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </main>
        </>
    )
}
