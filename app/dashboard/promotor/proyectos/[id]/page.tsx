"use client"

import { MatchesSection, StatsCard } from "@/components/dashboard"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useUnsavedChanges } from "@/hooks/use-unsaved-changes"
import { useTranslations } from "@/i18n/i18nContext"
import { proyectosService } from "@/services/proyectos.service"
import type { EstadoProyecto, Proyecto, TipoProyecto } from "@/types/proyecto.types"
import { AlertCircle, Building2, Calendar, Edit, Euro, Layers, MapPin, Radio, Ruler, Save, X, Zap } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProyectoDetallePage() {
    const { t } = useTranslations()
    const params = useParams()
    const router = useRouter()
    const { toast } = useToast()
    const proyectoId = params.id as string

    const [proyecto, setProyecto] = useState<any>(null)
    const [matches, setMatches] = useState<any[]>([])
    const [isLoadingMatches, setIsLoadingMatches] = useState(false)
    const [isLoadingProyecto, setIsLoadingProyecto] = useState(true)
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
            } catch (error) {
                console.error("Error loading proyecto:", error)
            } finally {
                setIsLoadingProyecto(false)
            }
        }

        loadProyecto()
    }, [proyectoId])

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

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

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

            <main className="p-6">
                {isLoadingProyecto ? (
                    <div className="flex min-h-[50vh] items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-orange-600" />
                            <p className="text-muted-foreground">Cargando proyecto...</p>
                        </div>
                    </div>
                ) : proyecto ? (
                    <div className="space-y-6">
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
                        {proyecto && (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <StatsCard
                                    icon={Zap}
                                    title="Potencia"
                                    value={proyecto.potenciaObjetivo ? `${proyecto.potenciaObjetivo}` : "0"}
                                    subtitle={proyecto.potenciaObjetivo ? "MW" : "No especificado"}
                                    variant="secondary"
                                />
                                <StatsCard
                                    icon={Euro}
                                    title="Presupuesto"
                                    value={proyecto.presupuesto ? formatCurrency(proyecto.presupuesto) : "No especificado"}
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
                                    variant="primary"
                                />
                                <StatsCard
                                    icon={Building2}
                                    title="Estado"
                                    value={proyecto.estado?.replace(/_/g, " ") || "Sin estado"}
                                    subtitle="Estado actual"
                                    variant="secondary"
                                />
                            </div>
                        )}

                        {/* Header Card */}
                        <Card className="border-secondary/20 from-secondary/5 via-background to-secondary/5 bg-gradient-to-br py-0">
                            <CardHeader className="space-y-4">
                                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                    <div className="flex-1 space-y-3">
                                        {isEditing ? (
                                            <EditableField label="Título del Proyecto" isEditing={isEditing}>
                                                <Input
                                                    value={editedData.titulo || ""}
                                                    onChange={(e) => handleFieldChange("titulo", e.target.value)}
                                                    className="mt-1 text-2xl font-bold"
                                                />
                                            </EditableField>
                                        ) : (
                                            <CardTitle className="text-3xl">{proyecto.titulo}</CardTitle>
                                        )}

                                        {isEditing ? (
                                            <EditableField label="Descripción" isEditing={isEditing}>
                                                <Textarea
                                                    value={editedData.descripcion || ""}
                                                    onChange={(e) => handleFieldChange("descripcion", e.target.value)}
                                                    className="mt-1"
                                                    rows={3}
                                                />
                                            </EditableField>
                                        ) : (
                                            proyecto.descripcion && (
                                                <p className="text-muted-foreground text-base">{proyecto.descripcion}</p>
                                            )
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-3 md:items-end">
                                        {isEditing ? (
                                            <EditableField label="Estado" isEditing={isEditing}>
                                                <Select
                                                    value={editedData.estado || proyecto.estado}
                                                    onValueChange={(value) => handleFieldChange("estado", value as EstadoProyecto)}
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
                                            </EditableField>
                                        ) : (
                                            <Badge className={getEstadoColor(proyecto.estado)} variant="secondary">
                                                {proyecto.estado?.replace(/_/g, " ")}
                                            </Badge>
                                        )}

                                        {!isEditing ? (
                                            <Button onClick={handleEdit} variant="outline" className="gap-2">
                                                <Edit className="h-4 w-4" />
                                                Editar Proyecto
                                            </Button>
                                        ) : (
                                            <div className="flex gap-2">
                                                <Button onClick={handleCancel} variant="outline" className="gap-2" disabled={isSaving}>
                                                    <X className="h-4 w-4" />
                                                    Cancelar
                                                </Button>
                                                <Button
                                                    onClick={handleSave}
                                                    className="bg-secondary hover:bg-secondary/90 gap-2"
                                                    disabled={isSaving}
                                                >
                                                    {isSaving ? (
                                                        <>
                                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                            Guardando...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Save className="h-4 w-4" />
                                                            Guardar Cambios
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Grid de información principal */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* Tipo de Proyecto */}
                            <Card className={`py-0 ${isEditing ? "border-secondary/50 bg-secondary/5 border-2" : ""}`}>
                                <CardHeader>
                                    <CardTitle className="text-secondary flex items-center gap-2">
                                        <Building2 className="h-5 w-5" />
                                        Tipo de Proyecto
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {isEditing ? (
                                        <EditableField label="Tipo" isEditing={isEditing}>
                                            <Select
                                                value={editedData.tipo || proyecto.tipo}
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
                                        </EditableField>
                                    ) : (
                                        <div>
                                            <Label className="text-muted-foreground text-xs">Tipo</Label>
                                            <p className="mt-1 text-lg font-semibold">{proyecto.tipo?.replace(/_/g, " ")}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Potencia Objetivo */}
                            <Card className={`py-0 ${isEditing ? "border-secondary/50 bg-secondary/5 border-2" : ""}`}>
                                <CardHeader>
                                    <CardTitle className="text-secondary flex items-center gap-2">
                                        <Zap className="h-5 w-5" />
                                        Potencia Objetivo
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {isEditing ? (
                                        <EditableField label="Potencia (MW)" isEditing={isEditing}>
                                            <Input
                                                type="number"
                                                step="0.1"
                                                value={editedData.potenciaObjetivo ?? ""}
                                                onChange={(e) =>
                                                    handleFieldChange(
                                                        "potenciaObjetivo",
                                                        e.target.value ? parseFloat(e.target.value) : null
                                                    )
                                                }
                                                className="mt-1"
                                            />
                                        </EditableField>
                                    ) : (
                                        <div>
                                            <Label className="text-muted-foreground text-xs">Potencia</Label>
                                            <p className="mt-1 text-lg font-semibold">
                                                {proyecto.potenciaObjetivo ? `${proyecto.potenciaObjetivo} MW` : "No especificado"}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Presupuesto */}
                            <Card className={`py-0 ${isEditing ? "border-secondary/50 bg-secondary/5 border-2" : ""}`}>
                                <CardHeader>
                                    <CardTitle className="text-secondary flex items-center gap-2">
                                        <Euro className="h-5 w-5" />
                                        Presupuesto
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {isEditing ? (
                                        <EditableField label="Presupuesto (€)" isEditing={isEditing}>
                                            <Input
                                                type="number"
                                                value={editedData.presupuesto ?? ""}
                                                onChange={(e) =>
                                                    handleFieldChange("presupuesto", e.target.value ? parseFloat(e.target.value) : null)
                                                }
                                                className="mt-1"
                                            />
                                        </EditableField>
                                    ) : (
                                        <div>
                                            <Label className="text-muted-foreground text-xs">Presupuesto</Label>
                                            <p className="mt-1 text-lg font-semibold">
                                                {proyecto.presupuesto ? formatCurrency(proyecto.presupuesto) : "No especificado"}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Ubicación */}
                        <Card className={`py-0 ${isEditing ? "border-secondary/50 bg-secondary/5 border-2" : ""}`}>
                            <CardHeader>
                                <CardTitle className="text-secondary flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    Ubicación
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-3">
                                {isEditing ? (
                                    <>
                                        <EditableField label="Ubicación" isEditing={isEditing}>
                                            <Input
                                                value={editedData.ubicacion || ""}
                                                onChange={(e) => handleFieldChange("ubicacion", e.target.value)}
                                                className="mt-1"
                                                placeholder="Ej: Madrid"
                                            />
                                        </EditableField>
                                        <EditableField label="Provincia" isEditing={isEditing}>
                                            <Input
                                                value={editedData.provincia || ""}
                                                onChange={(e) => handleFieldChange("provincia", e.target.value)}
                                                className="mt-1"
                                                placeholder="Ej: Madrid"
                                            />
                                        </EditableField>
                                        <EditableField label="Comunidad Autónoma" isEditing={isEditing}>
                                            <Input
                                                value={editedData.comunidad || ""}
                                                onChange={(e) => handleFieldChange("comunidad", e.target.value)}
                                                className="mt-1"
                                                placeholder="Ej: Comunidad de Madrid"
                                            />
                                        </EditableField>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <Label className="text-muted-foreground text-xs">Ubicación</Label>
                                            <p className="mt-1 font-medium">{proyecto.ubicacion || "No especificado"}</p>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground text-xs">Provincia</Label>
                                            <p className="mt-1 font-medium">{proyecto.provincia || "No especificado"}</p>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground text-xs">Comunidad Autónoma</Label>
                                            <p className="mt-1 font-medium">{proyecto.comunidad || "No especificado"}</p>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* Requisitos de Superficie */}
                        <Card className={`py-0 ${isEditing ? "border-secondary/50 bg-secondary/5 border-2" : ""}`}>
                            <CardHeader>
                                <CardTitle className="text-secondary flex items-center gap-2">
                                    <Layers className="h-5 w-5" />
                                    Requisitos de Superficie
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-3">
                                {isEditing ? (
                                    <>
                                        <EditableField label="Superficie Mínima (ha)" isEditing={isEditing}>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                value={editedData.superficieMinima ?? ""}
                                                onChange={(e) =>
                                                    handleFieldChange("superficieMinima", e.target.value ? parseFloat(e.target.value) : 0)
                                                }
                                                className="mt-1"
                                            />
                                        </EditableField>
                                        <EditableField label="Superficie Máxima (ha)" isEditing={isEditing}>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                value={editedData.superficieMaxima ?? ""}
                                                onChange={(e) =>
                                                    handleFieldChange(
                                                        "superficieMaxima",
                                                        e.target.value ? parseFloat(e.target.value) : null
                                                    )
                                                }
                                                className="mt-1"
                                            />
                                        </EditableField>
                                        <EditableField label="Superficie Necesaria (ha)" isEditing={isEditing}>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                value={editedData.superficieNecesaria ?? ""}
                                                onChange={(e) =>
                                                    handleFieldChange(
                                                        "superficieNecesaria",
                                                        e.target.value ? parseFloat(e.target.value) : null
                                                    )
                                                }
                                                className="mt-1"
                                            />
                                        </EditableField>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <Label className="text-muted-foreground text-xs">Superficie Mínima</Label>
                                            <p className="mt-1 font-medium">{proyecto.superficieMinima} ha</p>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground text-xs">Superficie Máxima</Label>
                                            <p className="mt-1 font-medium">
                                                {proyecto.superficieMaxima ? `${proyecto.superficieMaxima} ha` : "No especificado"}
                                            </p>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground text-xs">Superficie Necesaria</Label>
                                            <p className="mt-1 font-medium">
                                                {proyecto.superficieNecesaria ? `${proyecto.superficieNecesaria} ha` : "No especificado"}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* Infraestructura Eléctrica */}
                        <Card className={`py-0 ${isEditing ? "border-secondary/50 bg-secondary/5 border-2" : ""}`}>
                            <CardHeader>
                                <CardTitle className="text-secondary flex items-center gap-2">
                                    <Radio className="h-5 w-5" />
                                    Infraestructura Eléctrica
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                {isEditing ? (
                                    <>
                                        <EditableField label="Distancia Máxima a Red (km)" isEditing={isEditing}>
                                            <Input
                                                type="number"
                                                step="0.1"
                                                value={editedData.distanciaMaximaRed ?? ""}
                                                onChange={(e) =>
                                                    handleFieldChange(
                                                        "distanciaMaximaRed",
                                                        e.target.value ? parseFloat(e.target.value) : null
                                                    )
                                                }
                                                className="mt-1"
                                            />
                                        </EditableField>
                                        <EditableField label="Capacidad Subestación Mínima (MVA)" isEditing={isEditing}>
                                            <Input
                                                type="number"
                                                step="0.1"
                                                value={editedData.capacidadSubestacionMinima ?? ""}
                                                onChange={(e) =>
                                                    handleFieldChange(
                                                        "capacidadSubestacionMinima",
                                                        e.target.value ? parseFloat(e.target.value) : null
                                                    )
                                                }
                                                className="mt-1"
                                            />
                                        </EditableField>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <Label className="text-muted-foreground text-xs">Distancia Máxima a Red</Label>
                                            <p className="mt-1 font-medium">
                                                {proyecto.distanciaMaximaRed ? `${proyecto.distanciaMaximaRed} km` : "No especificado"}
                                            </p>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground text-xs">Capacidad Subestación Mínima</Label>
                                            <p className="mt-1 font-medium">
                                                {proyecto.capacidadSubestacionMinima
                                                    ? `${proyecto.capacidadSubestacionMinima} MVA`
                                                    : "No especificado"}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* Información del Sistema */}
                        <Card className="py-0">
                            <CardHeader>
                                <CardTitle className="text-secondary flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Información del Sistema
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-3">
                                <ReadOnlyField label="ID del Proyecto" value={proyecto.id} />
                                <ReadOnlyField
                                    label="Fecha de Creación"
                                    value={proyecto.creadoEn ? new Date(proyecto.creadoEn).toLocaleDateString("es-ES") : "No disponible"}
                                />
                                <ReadOnlyField
                                    label="Última Actualización"
                                    value={
                                        proyecto.actualizadoEn
                                            ? new Date(proyecto.actualizadoEn).toLocaleDateString("es-ES")
                                            : "No disponible"
                                    }
                                />
                            </CardContent>
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
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
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
