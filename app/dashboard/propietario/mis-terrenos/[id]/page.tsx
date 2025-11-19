"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MatchesTable } from "@/components/dashboard/matches-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useUnsavedChanges } from "@/hooks/use-unsaved-changes"
import { useTranslations } from "@/i18n/i18nContext"
import { terrenosService } from "@/services/terrenos.service"
import type { DisponibilidadTerreno, Terreno, TipoSuelo } from "@/types/terreno.types"
import {
    AlertTriangle,
    Building2,
    Euro,
    FileText,
    MapPin,
    MapPinned,
    Mountain,
    Pencil,
    Ruler,
    Save,
    Shield,
    Wind,
    X,
    Zap,
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function TerrenoDetallePage() {
    const { t } = useTranslations()
    const params = useParams()
    const router = useRouter()
    const { toast } = useToast()
    const terrenoId = params.id as string

    const [terreno, setTerreno] = useState<any>(null)
    const [matches, setMatches] = useState<any[]>([])
    const [isLoadingMatches, setIsLoadingMatches] = useState(false)
    const [isLoadingTerreno, setIsLoadingTerreno] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [editedData, setEditedData] = useState<Partial<Terreno>>({})
    const [isSaving, setIsSaving] = useState(false)

    // Detectar si hay cambios sin guardar
    const hasUnsavedChanges =
        isEditing &&
        Object.keys(editedData).some((key) => editedData[key as keyof typeof editedData] !== terreno?.[key as keyof typeof terreno])

    // Usar el hook de protección contra cambios sin guardar
    const { allowNavigation } = useUnsavedChanges(
        hasUnsavedChanges,
        t?.dashboard?.owner?.terrenos?.terrain?.messages?.unsavedChanges ||
            "Tienes cambios sin guardar. ¿Estás seguro de que deseas salir? Se perderán todos los cambios."
    )

    useEffect(() => {
        const loadTerreno = async () => {
            try {
                const token = localStorage.getItem("auth_token")
                if (!token) return

                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

                const response = await fetch(`${API_URL}/terrenos/${terrenoId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    setTerreno(data)
                }
            } catch (error) {
                console.error("Error loading terreno:", error)
            } finally {
                setIsLoadingTerreno(false)
            }
        }

        loadTerreno()
    }, [terrenoId])

    useEffect(() => {
        const loadMatches = async () => {
            if (!terrenoId) return

            setIsLoadingMatches(true)
            try {
                const token = localStorage.getItem("auth_token")
                if (!token) return

                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

                // Usar el endpoint correcto del módulo Matches
                const response = await fetch(`${API_URL}/matches/terreno/${terrenoId}`, {
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
                              id: match.proyecto?.id || match.id,
                              titulo: match.proyecto?.titulo || "",
                              tipo: match.proyecto?.tipo || "",
                              potenciaObjetivo: match.proyecto?.potenciaObjetivo,
                              provincia: match.proyecto?.provincia,
                              compatibilidad: match.scoreTotal || 0,
                              estado: match.proyecto?.estado || match.estado,
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
    }, [terrenoId])

    const getEstadoColor = (estado: string) => {
        switch (estado?.toUpperCase()) {
            case "ACTIVO":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "PAUSADO":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "PENDIENTE_REVISION":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case "ARRENDADO":
            case "VENDIDO":
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        }
    }

    const handleEdit = () => {
        // Solo copiar campos editables
        const editableFields = {
            titulo: terreno.titulo,
            descripcion: terreno.descripcion,
            direccion: terreno.direccion,
            municipio: terreno.municipio,
            provincia: terreno.provincia,
            codigoPostal: terreno.codigoPostal,
            latitud: terreno.latitud,
            longitud: terreno.longitud,
            superficie: terreno.superficie,
            tipoSuelo: terreno.tipoSuelo,
            referenciaCatastral: terreno.referenciaCatastral,
            disponibilidad: terreno.disponibilidad,
            precioVenta: terreno.precioVenta,
            precioArrendamiento: terreno.precioArrendamiento,
            servidumbres: terreno.servidumbres,
            restriccionesAmbientales: terreno.restriccionesAmbientales,
            zonasProtegidas: terreno.zonasProtegidas,
        }
        setEditedData(editableFields)
        setIsEditing(true)
    }

    const handleCancel = () => {
        // Verificar si hay cambios antes de cancelar
        const hasChanges = Object.keys(editedData).some(
            (key) => editedData[key as keyof typeof editedData] !== terreno[key as keyof typeof terreno]
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
                if (editedData[fieldKey] !== terreno[fieldKey]) {
                    changedFields[fieldKey] = editedData[fieldKey]
                }
            })

            console.log("Saving terreno with changed fields:", changedFields)
            console.log("Terreno ID:", terrenoId)

            if (Object.keys(changedFields).length === 0) {
                toast({
                    title: "Sin cambios",
                    description: "No se han detectado cambios para guardar",
                })
                setIsEditing(false)
                return
            }

            const updated = await terrenosService.update(terrenoId, changedFields)
            console.log("Updated terreno:", updated)

            setTerreno(updated)
            setIsEditing(false)
            setEditedData({})
            allowNavigation() // Permitir navegación después de guardar exitosamente
            toast({
                title: t?.dashboard?.owner?.terrenos?.terrain?.messages?.saved || "Guardado",
                description: t?.dashboard?.owner?.terrenos?.terrain?.messages?.savedSuccess || "Los cambios se han guardado correctamente",
            })
        } catch (error: any) {
            console.error("Error saving terreno:", error)
            console.error("Error response:", error?.response)
            console.error("Error data:", error?.response?.data)
            console.error("Error message:", error?.message)

            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                t?.dashboard?.owner?.terrenos?.terrain?.messages?.saveError ||
                "No se pudieron guardar los cambios"

            toast({
                title: t?.dashboard?.owner?.terrenos?.terrain?.messages?.error || "Error",
                description: errorMessage,
                variant: "destructive",
            })
        } finally {
            setIsSaving(false)
        }
    }

    const handleFieldChange = (field: keyof Terreno, value: any) => {
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
                title={terreno?.titulo || t?.dashboard?.owner?.terrenos?.terrain?.title}
                breadcrumbs={[
                    { label: t?.dashboard?.breadcrumbs?.dashboard, href: "/dashboard/propietario" },
                    { label: t?.dashboard?.owner?.terrenos?.title, href: "/dashboard/propietario/mis-terrenos" },
                    { label: terreno?.titulo || t?.dashboard?.breadcrumbs?.landDetail },
                ]}
                userType="propietario"
            />

            <main className="p-6">
                {isLoadingTerreno ? (
                    <div className="flex min-h-[50vh] items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                            <p className="text-muted-foreground text-sm">{t?.dashboard?.owner?.terrenos?.terrain?.loading}</p>
                        </div>
                    </div>
                ) : terreno ? (
                    <div className="space-y-6">
                        {/* Banner de Modo Edición */}
                        {isEditing && (
                            <div className="animate-in fade-in slide-in-from-top-2 border-primary bg-primary/10 flex items-center gap-3 rounded-lg border-2 p-4 duration-300">
                                <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full">
                                    <Pencil className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-primary text-base font-semibold">Modo Edición Activo</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Los campos editables están resaltados. Los campos con{" "}
                                        <span className="text-muted-foreground font-medium">candado 🔒</span> son de solo lectura.
                                    </p>
                                </div>
                                {(() => {
                                    const changedCount = Object.keys(editedData).filter(
                                        (key) => editedData[key as keyof typeof editedData] !== terreno[key as keyof typeof terreno]
                                    ).length
                                    return changedCount > 0 ? (
                                        <Badge variant="secondary" className="text-sm">
                                            {changedCount} {changedCount === 1 ? "cambio" : "cambios"}
                                        </Badge>
                                    ) : null
                                })()}
                            </div>
                        )}

                        {/* Header Card con título y estado */}
                        <Card className="border-primary/20 from-primary/5 via-background to-accent/5 bg-gradient-to-br py-0">
                            <div className="p-6">
                                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                    <div className="flex-1">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                                                <MapPin className="text-primary h-6 w-6" />
                                            </div>
                                            <div className="flex-1">
                                                {isEditing ? (
                                                    <Input
                                                        value={editedData.titulo || ""}
                                                        onChange={(e) => handleFieldChange("titulo", e.target.value)}
                                                        className="bg-primary/5 border-primary/50 focus:border-primary text-2xl font-bold transition-all duration-200 md:text-3xl"
                                                        placeholder={t?.dashboard?.owner?.terrenos?.terrain?.labels?.title}
                                                    />
                                                ) : (
                                                    <h1 className="text-foreground text-2xl font-bold md:text-3xl">{terreno.titulo}</h1>
                                                )}
                                                <p className="text-muted-foreground text-sm">ID: {terreno.id?.slice(0, 8)}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Badge className={getEstadoColor(terreno.estado)}>{terreno.estado}</Badge>
                                            {terreno.disponibilidad && (
                                                <Badge variant="outline" className="border-primary/30 text-primary">
                                                    {terreno.disponibilidad}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    {isEditing ? (
                                        <div className="flex gap-2">
                                            <Button onClick={handleSave} disabled={isSaving} className="gap-2 shadow-md">
                                                <Save className="h-4 w-4" />
                                                {isSaving
                                                    ? t?.dashboard?.owner?.terrenos?.terrain?.actions?.saving || "Guardando..."
                                                    : t?.dashboard?.owner?.terrenos?.terrain?.actions?.save || "Guardar"}
                                            </Button>
                                            <Button onClick={handleCancel} variant="outline" className="gap-2">
                                                <X className="h-4 w-4" />
                                                {t?.dashboard?.owner?.terrenos?.terrain?.actions?.cancel || "Cancelar"}
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button onClick={handleEdit} className="gap-2 shadow-md">
                                            <Pencil className="h-4 w-4" />
                                            {t?.dashboard?.owner?.terrenos?.terrain?.actions?.edit || t?.dashboard?.owner?.table?.edit}
                                        </Button>
                                    )}
                                </div>

                                {isEditing ? (
                                    <div className="mt-4">
                                        <Label htmlFor="descripcion" className="text-muted-foreground text-sm">
                                            {t?.dashboard?.owner?.terrenos?.terrain?.labels?.description || "Descripción"}
                                        </Label>
                                        <Textarea
                                            id="descripcion"
                                            value={editedData.descripcion || ""}
                                            onChange={(e) => handleFieldChange("descripcion", e.target.value)}
                                            className="bg-primary/5 border-primary/50 focus:border-primary mt-2 min-h-[100px] transition-all duration-200"
                                            placeholder={t?.dashboard?.owner?.terrenos?.terrain?.labels?.description || "Descripción"}
                                        />
                                    </div>
                                ) : (
                                    terreno.descripcion && (
                                        <div className="bg-background/50 mt-4 rounded-lg border p-4">
                                            <p className="text-foreground/80 leading-relaxed">{terreno.descripcion}</p>
                                        </div>
                                    )
                                )}
                            </div>
                        </Card>

                        {/* Grid de información principal */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* Ubicación */}
                            <Card className="group py-0 transition-all hover:shadow-lg">
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-primary/10 group-hover:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                                            <MapPinned className="text-primary h-5 w-5" />
                                        </div>
                                        <h3 className="text-foreground text-lg font-semibold">
                                            {t?.dashboard?.owner?.terrenos?.terrain?.sections?.location}
                                        </h3>
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <EditableField
                                            label={t?.dashboard?.owner?.terrenos?.terrain?.labels?.address || "Dirección"}
                                            isEditing={isEditing}
                                        >
                                            {isEditing ? (
                                                <Input
                                                    value={editedData.direccion || ""}
                                                    onChange={(e) => handleFieldChange("direccion", e.target.value)}
                                                    className="bg-primary/5 border-primary/50 focus:border-primary mt-1 transition-all duration-200"
                                                />
                                            ) : (
                                                <p className="text-foreground mt-1 font-medium">{terreno.direccion}</p>
                                            )}
                                        </EditableField>
                                        <div className="grid grid-cols-2 gap-3">
                                            <EditableField
                                                label={t?.dashboard?.owner?.terrenos?.terrain?.labels?.municipality || "Municipio"}
                                                isEditing={isEditing}
                                            >
                                                {isEditing ? (
                                                    <Input
                                                        value={editedData.municipio || ""}
                                                        onChange={(e) => handleFieldChange("municipio", e.target.value)}
                                                        className="bg-primary/5 border-primary/50 focus:border-primary mt-1 transition-all duration-200"
                                                    />
                                                ) : (
                                                    <p className="text-foreground mt-1 font-medium">{terreno.municipio}</p>
                                                )}
                                            </EditableField>
                                            <EditableField
                                                label={t?.dashboard?.owner?.terrenos?.terrain?.labels?.province || "Provincia"}
                                                isEditing={isEditing}
                                            >
                                                {isEditing ? (
                                                    <Input
                                                        value={editedData.provincia || ""}
                                                        onChange={(e) => handleFieldChange("provincia", e.target.value)}
                                                        className="bg-primary/5 border-primary/50 focus:border-primary mt-1 transition-all duration-200"
                                                    />
                                                ) : (
                                                    <p className="text-foreground mt-1 font-medium">{terreno.provincia}</p>
                                                )}
                                            </EditableField>
                                        </div>
                                        <EditableField
                                            label={t?.dashboard?.owner?.terrenos?.terrain?.labels?.postalCode || "Código Postal"}
                                            isEditing={isEditing}
                                        >
                                            {isEditing ? (
                                                <Input
                                                    value={editedData.codigoPostal || ""}
                                                    onChange={(e) => handleFieldChange("codigoPostal", e.target.value)}
                                                    className="bg-primary/5 border-primary/50 focus:border-primary mt-1 transition-all duration-200"
                                                />
                                            ) : (
                                                <p className="text-foreground mt-1 font-medium">{terreno.codigoPostal}</p>
                                            )}
                                        </EditableField>
                                    </div>
                                </div>
                            </Card>

                            {/* Características del Terreno */}
                            <Card className="group py-0 transition-all hover:shadow-lg">
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-accent/10 group-hover:bg-accent/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                                            <Ruler className="text-accent h-5 w-5" />
                                        </div>
                                        <h3 className="text-foreground text-lg font-semibold">
                                            {t?.dashboard?.owner?.terrenos?.terrain?.sections?.characteristics}
                                        </h3>
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <div className="bg-primary/5 border-primary/10 rounded-lg border p-3">
                                            <Label className="text-muted-foreground text-xs">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.labels?.surface}
                                            </Label>
                                            {isEditing ? (
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    value={editedData.superficie || ""}
                                                    onChange={(e) => handleFieldChange("superficie", parseFloat(e.target.value))}
                                                    className="bg-primary/5 border-primary/50 focus:border-primary text-primary mt-1 text-xl font-bold"
                                                />
                                            ) : (
                                                <p className="text-primary mt-1 text-xl font-bold">{terreno.superficie} ha</p>
                                            )}
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground text-xs">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.labels?.soilType}
                                            </Label>
                                            {isEditing ? (
                                                <Select
                                                    value={editedData.tipoSuelo || terreno.tipoSuelo}
                                                    onValueChange={(value) => handleFieldChange("tipoSuelo", value as TipoSuelo)}
                                                >
                                                    <SelectTrigger className="bg-primary/5 border-primary/50 focus:border-primary mt-1">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="RUSTICO_COMUN">Rústico Común</SelectItem>
                                                        <SelectItem value="RUSTICO_PROTECCION">Rústico Protección</SelectItem>
                                                        <SelectItem value="NO_URBANIZABLE">No Urbanizable</SelectItem>
                                                        <SelectItem value="URBANIZABLE">Urbanizable</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <p className="text-foreground mt-1 font-medium">{terreno.tipoSuelo?.replace(/_/g, " ")}</p>
                                            )}
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground text-xs">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.labels?.cadastralRef}
                                            </Label>
                                            {isEditing ? (
                                                <Input
                                                    value={editedData.referenciaCatastral || ""}
                                                    onChange={(e) => handleFieldChange("referenciaCatastral", e.target.value)}
                                                    className="bg-primary/5 border-primary/50 focus:border-primary mt-1"
                                                    placeholder={t?.dashboard?.owner?.terrenos?.terrain?.values?.noInfo}
                                                />
                                            ) : (
                                                <p className="text-foreground mt-1 font-medium">
                                                    {terreno.referenciaCatastral || t?.dashboard?.owner?.terrenos?.terrain?.values?.noInfo}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Información Económica */}
                            <Card className="group py-0 transition-all hover:shadow-lg">
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-secondary/10 group-hover:bg-secondary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                                            <Euro className="text-secondary h-5 w-5" />
                                        </div>
                                        <h3 className="text-foreground text-lg font-semibold">
                                            {t?.dashboard?.owner?.terrenos?.terrain?.sections?.economic}
                                        </h3>
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <div>
                                            <Label className="text-muted-foreground text-xs">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.labels?.availability}
                                            </Label>
                                            {isEditing ? (
                                                <Select
                                                    value={editedData.disponibilidad || terreno.disponibilidad}
                                                    onValueChange={(value) =>
                                                        handleFieldChange("disponibilidad", value as DisponibilidadTerreno)
                                                    }
                                                >
                                                    <SelectTrigger className="bg-primary/5 border-primary/50 focus:border-primary mt-1">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="VENTA">Venta</SelectItem>
                                                        <SelectItem value="ARRENDAMIENTO">Arrendamiento</SelectItem>
                                                        <SelectItem value="DERECHO_SUPERFICIE">Derecho de Superficie</SelectItem>
                                                        <SelectItem value="AMBOS">Ambos</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <p className="text-foreground mt-1 font-medium">
                                                    {terreno.disponibilidad?.replace(/_/g, " ")}
                                                </p>
                                            )}
                                        </div>
                                        <div className="bg-secondary/5 border-secondary/10 rounded-lg border p-3">
                                            <Label className="text-muted-foreground text-xs">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.labels?.salePrice}
                                            </Label>
                                            {isEditing ? (
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    value={editedData.precioVenta ?? ""}
                                                    onChange={(e) =>
                                                        handleFieldChange("precioVenta", e.target.value ? parseFloat(e.target.value) : null)
                                                    }
                                                    className="bg-primary/5 border-primary/50 focus:border-primary text-secondary mt-1 text-lg font-bold"
                                                    placeholder="0.00"
                                                />
                                            ) : terreno.precioVenta ? (
                                                <p className="text-secondary mt-1 text-lg font-bold">
                                                    {new Intl.NumberFormat("es-ES", {
                                                        style: "currency",
                                                        currency: "EUR",
                                                    }).format(terreno.precioVenta)}
                                                </p>
                                            ) : (
                                                <p className="text-muted-foreground mt-1 italic">
                                                    {t?.dashboard?.owner?.terrenos?.terrain?.values?.noPrice}
                                                </p>
                                            )}
                                        </div>
                                        <div className="bg-secondary/5 border-secondary/10 rounded-lg border p-3">
                                            <Label className="text-muted-foreground text-xs">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.labels?.rentPrice}
                                            </Label>
                                            {isEditing ? (
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    value={editedData.precioArrendamiento ?? ""}
                                                    onChange={(e) =>
                                                        handleFieldChange(
                                                            "precioArrendamiento",
                                                            e.target.value ? parseFloat(e.target.value) : null
                                                        )
                                                    }
                                                    className="bg-primary/5 border-primary/50 focus:border-primary text-secondary mt-1 text-lg font-bold"
                                                    placeholder="0.00"
                                                />
                                            ) : terreno.precioArrendamiento ? (
                                                <p className="text-secondary mt-1 text-lg font-bold">
                                                    {new Intl.NumberFormat("es-ES", {
                                                        style: "currency",
                                                        currency: "EUR",
                                                    }).format(terreno.precioArrendamiento)}
                                                    <span className="text-muted-foreground text-xs font-normal">
                                                        {" "}
                                                        {t?.dashboard?.owner?.terrenos?.terrain?.values?.perYear}
                                                    </span>
                                                </p>
                                            ) : (
                                                <p className="text-muted-foreground mt-1 italic">
                                                    {t?.dashboard?.owner?.terrenos?.terrain?.values?.noPrice}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Sección de Topografía y Orientación */}
                        <Card className={`py-0 ${isEditing ? "border-muted/50 bg-muted/10 border-2" : ""}`}>
                            <div className="border-border border-b p-6">
                                <div className="flex items-center gap-3">
                                    <div className="bg-muted/50 flex h-10 w-10 items-center justify-center rounded-lg">
                                        <Mountain className="text-muted-foreground h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-foreground text-lg font-semibold">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.sections?.topography}
                                            </h3>
                                            {isEditing && (
                                                <Badge variant="outline" className="border-muted-foreground/30 text-xs">
                                                    🔒 Gestionado por Solterra
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-muted-foreground text-sm">
                                            {isEditing
                                                ? "Estos campos son calculados automáticamente y no pueden editarse"
                                                : t?.dashboard?.owner?.terrenos?.terrain?.sections?.topographyDesc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-4 p-6 md:grid-cols-3">
                                <ReadOnlyField
                                    label={t?.dashboard?.owner?.terrenos?.terrain?.labels?.orientation || "Orientación"}
                                    value={terreno.orientacion || t?.dashboard?.owner?.terrenos?.terrain?.values?.notSpecifiedFem || "N/A"}
                                />
                                <ReadOnlyField
                                    label={t?.dashboard?.owner?.terrenos?.terrain?.labels?.slope || "Pendiente"}
                                    value={
                                        terreno.pendiente
                                            ? `${terreno.pendiente}%`
                                            : t?.dashboard?.owner?.terrenos?.terrain?.values?.notSpecifiedFem || "N/A"
                                    }
                                />
                                <ReadOnlyField
                                    label={t?.dashboard?.owner?.terrenos?.terrain?.labels?.gridDistance || "Distancia a Red"}
                                    value={
                                        terreno.distanciaRed
                                            ? `${terreno.distanciaRed} km`
                                            : t?.dashboard?.owner?.terrenos?.terrain?.values?.notSpecifiedFem || "N/A"
                                    }
                                />
                            </div>
                        </Card>

                        {/* Potencial Energético */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card
                                className={`group py-0 transition-all hover:shadow-lg ${isEditing ? "border-muted/50 bg-muted/10 border-2" : ""}`}
                            >
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10 transition-colors group-hover:bg-yellow-500/20">
                                            <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-foreground text-lg font-semibold">
                                                    {t?.dashboard?.owner?.terrenos?.terrain?.sections?.solarPotential}
                                                </h3>
                                                {isEditing && <span className="text-muted-foreground text-xs">🔒</span>}
                                            </div>
                                        </div>
                                    </div>
                                    {terreno.potencialSolar ? (
                                        <div className="space-y-3">
                                            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
                                                <p className="text-muted-foreground mb-2 text-sm">
                                                    {t?.dashboard?.owner?.terrenos?.terrain?.labels?.estimatedCapacity}
                                                </p>
                                                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                                    {terreno.potencialSolar} MW
                                                </p>
                                            </div>
                                            <div className="bg-muted/50 h-3 overflow-hidden rounded-full">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
                                                    style={{ width: `${Math.min((terreno.potencialSolar / 50) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground italic">
                                            {t?.dashboard?.owner?.terrenos?.terrain?.values?.notCalculated}
                                        </p>
                                    )}
                                </div>
                            </Card>

                            <Card
                                className={`group py-0 transition-all hover:shadow-lg ${isEditing ? "border-muted/50 bg-muted/10 border-2" : ""}`}
                            >
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 transition-colors group-hover:bg-blue-500/20">
                                            <Wind className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-foreground text-lg font-semibold">
                                                    {t?.dashboard?.owner?.terrenos?.terrain?.sections?.windPotential}
                                                </h3>
                                                {isEditing && <span className="text-muted-foreground text-xs">🔒</span>}
                                            </div>
                                        </div>
                                    </div>
                                    {terreno.potencialEolico ? (
                                        <div className="space-y-3">
                                            <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
                                                <p className="text-muted-foreground mb-2 text-sm">
                                                    {t?.dashboard?.owner?.terrenos?.terrain?.labels?.estimatedCapacity}
                                                </p>
                                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                    {terreno.potencialEolico} MW
                                                </p>
                                            </div>
                                            <div className="bg-muted/50 h-3 overflow-hidden rounded-full">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                                                    style={{ width: `${Math.min((terreno.potencialEolico / 100) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground italic">
                                            {t?.dashboard?.owner?.terrenos?.terrain?.values?.notCalculated}
                                        </p>
                                    )}
                                </div>
                            </Card>
                        </div>

                        {/* Infraestructura Eléctrica */}
                        {(terreno.distanciaSubestacion || terreno.nombreSubestacion || terreno.capacidadSubestacion) && (
                            <Card className="py-0">
                                <div className="border-border border-b p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                                            <Building2 className="text-primary h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-foreground text-lg font-semibold">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.sections?.electricInfra}
                                            </h3>
                                            <p className="text-muted-foreground text-sm">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.sections?.electricInfraDesc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-4 p-6 md:grid-cols-3">
                                    {terreno.nombreSubestacion && (
                                        <div>
                                            <p className="text-muted-foreground mb-1 text-sm">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.labels?.substation}
                                            </p>
                                            <p className="text-foreground font-medium">{terreno.nombreSubestacion}</p>
                                        </div>
                                    )}
                                    {terreno.distanciaSubestacion && (
                                        <div>
                                            <p className="text-muted-foreground mb-1 text-sm">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.labels?.distance}
                                            </p>
                                            <p className="text-foreground font-medium">{terreno.distanciaSubestacion} km</p>
                                        </div>
                                    )}
                                    {terreno.capacidadSubestacion && (
                                        <div>
                                            <p className="text-muted-foreground mb-1 text-sm">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.labels?.capacity}
                                            </p>
                                            <p className="text-foreground font-medium">{terreno.capacidadSubestacion} MVA</p>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        )}

                        {/* Restricciones y Consideraciones */}
                        {(terreno.servidumbres || terreno.restriccionesAmbientales || terreno.zonasProtegidas !== null || isEditing) && (
                            <Card className="border-amber-200 py-0 dark:border-amber-800">
                                <div className="border-border bg-amber-50/50 p-6 dark:bg-amber-900/10">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                                            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-foreground text-lg font-semibold">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.sections?.restrictions}
                                            </h3>
                                            <p className="text-muted-foreground text-sm">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.sections?.restrictionsDesc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4 p-6">
                                    <div className="flex items-start gap-3">
                                        <Shield className="text-muted-foreground mt-1 h-5 w-5 flex-shrink-0" />
                                        <div className="flex-1">
                                            <Label className="text-foreground mb-1 font-medium">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.labels?.protectedAreas}
                                            </Label>
                                            {isEditing ? (
                                                <Select
                                                    value={
                                                        editedData.zonasProtegidas !== undefined
                                                            ? editedData.zonasProtegidas
                                                                ? "true"
                                                                : "false"
                                                            : terreno.zonasProtegidas !== null
                                                              ? terreno.zonasProtegidas
                                                                  ? "true"
                                                                  : "false"
                                                              : undefined
                                                    }
                                                    onValueChange={(value) => handleFieldChange("zonasProtegidas", value === "true")}
                                                >
                                                    <SelectTrigger className="mt-1">
                                                        <SelectValue placeholder="Seleccionar..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="false">
                                                            {t?.dashboard?.owner?.terrenos?.terrain?.values?.noProtectedAreas}
                                                        </SelectItem>
                                                        <SelectItem value="true">
                                                            {t?.dashboard?.owner?.terrenos?.terrain?.values?.hasProtectedAreas}
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <p
                                                    className={
                                                        terreno.zonasProtegidas ? "text-amber-600 dark:text-amber-400" : "text-primary"
                                                    }
                                                >
                                                    {terreno.zonasProtegidas
                                                        ? t?.dashboard?.owner?.terrenos?.terrain?.values?.hasProtectedAreas
                                                        : t?.dashboard?.owner?.terrenos?.terrain?.values?.noProtectedAreas}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <FileText className="text-muted-foreground mt-1 h-5 w-5 flex-shrink-0" />
                                        <div className="flex-1">
                                            <Label className="text-foreground mb-1 font-medium">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.labels?.easements}
                                            </Label>
                                            {isEditing ? (
                                                <Textarea
                                                    value={editedData.servidumbres ?? ""}
                                                    onChange={(e) => handleFieldChange("servidumbres", e.target.value || null)}
                                                    className="mt-1"
                                                    placeholder="Ej: Servidumbre de paso, líneas eléctricas..."
                                                />
                                            ) : terreno.servidumbres ? (
                                                <p className="text-muted-foreground mt-1 text-sm">{terreno.servidumbres}</p>
                                            ) : (
                                                <p className="text-muted-foreground mt-1 text-sm italic">Sin servidumbres registradas</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="text-muted-foreground mt-1 h-5 w-5 flex-shrink-0" />
                                        <div className="flex-1">
                                            <Label className="text-foreground mb-1 font-medium">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.labels?.environmentalRestrictions}
                                            </Label>
                                            {isEditing ? (
                                                <Textarea
                                                    value={editedData.restriccionesAmbientales ?? ""}
                                                    onChange={(e) => handleFieldChange("restriccionesAmbientales", e.target.value || null)}
                                                    className="mt-1"
                                                    placeholder="Ej: Protección de fauna, zonas de recarga de acuíferos..."
                                                />
                                            ) : terreno.restriccionesAmbientales ? (
                                                <p className="text-muted-foreground mt-1 text-sm">{terreno.restriccionesAmbientales}</p>
                                            ) : (
                                                <p className="text-muted-foreground mt-1 text-sm italic">
                                                    Sin restricciones ambientales registradas
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Matches */}
                        <div>
                            <div className="mb-4">
                                <h2 className="text-foreground mb-2 text-2xl font-bold">
                                    {t?.dashboard?.owner?.terrenos?.terrain?.compatibleTitle}
                                </h2>
                                <p className="text-muted-foreground">
                                    {t?.dashboard?.owner?.terrenos?.terrain?.matchesFound?.replace("{count}", String(matches.length))}
                                </p>
                            </div>
                            <MatchesTable matches={matches} isLoading={isLoadingMatches} />
                        </div>
                    </div>
                ) : (
                    <Card className="p-12 py-0">
                        <div className="text-center">
                            <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-semibold">{t?.dashboard?.owner?.terrenos?.terrain?.notFound?.title}</h3>
                            <p className="text-muted-foreground text-sm">{t?.dashboard?.owner?.terrenos?.terrain?.notFound?.desc}</p>
                            <Link href="/dashboard/propietario">
                                <Button className="mt-4">{t?.common?.backToDashboard}</Button>
                            </Link>
                        </div>
                    </Card>
                )}
            </main>
        </>
    )
}
