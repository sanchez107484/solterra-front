"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { TerrenoCard } from "@/components/dashboard/terreno-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { useTerrenos } from "@/hooks/useTerrenos"
import { useTranslations } from "@/i18n/i18nContext"
import { Calendar, Grid3x3, MapPin, MoveHorizontal, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface TerrenoConMatches {
    id: string
    titulo: string
    municipio: string
    provincia: string
    superficie: number
    estado: string
    matchCount: number
    matches: Array<{
        id: string
        titulo: string
        tipo: string
        potenciaObjetivo?: number
        provincia?: string
        compatibilidad: number
        estado: string
    }>
}

export default function DashboardPropietario() {
    const { t } = useTranslations()
    const [terrenosConMatches, setTerrenosConMatches] = useState<TerrenoConMatches[]>([])
    const [selectedTerrenoId, setSelectedTerrenoId] = useState<string | null>(null)
    const [isLoadingMatches, setIsLoadingMatches] = useState(false)
    const [viewMode, setViewMode] = useState<"horizontal" | "grid">("horizontal")

    const { terrenos, total, isLoading: terrenosLoading, fetchMine } = useTerrenos({ autoFetch: false })

    const hasTerrenos = terrenos.length > 0
    const selectedTerreno = terrenosConMatches.find((t) => t.id === selectedTerrenoId)

    useEffect(() => {
        fetchMine()
    }, [fetchMine])

    useEffect(() => {
        const loadMatches = async () => {
            if (!hasTerrenos) return

            setIsLoadingMatches(true)
            try {
                const token = localStorage.getItem("auth_token")
                if (!token) return

                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

                const matchesPromises = terrenos.map(async (terreno) => {
                    try {
                        const response = await fetch(`${API_URL}/matches/terreno/${terreno.id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                        })

                        if (response.ok) {
                            const matches = await response.json()

                            // Ordenar matches: activos primero, luego por fecha de creación descendente
                            const sortedMatches = (Array.isArray(matches) ? matches : [])
                                .sort((a, b) => {
                                    // Primero por estado (activos primero)
                                    if (a.estado === "ACEPTADO" && b.estado !== "ACEPTADO") return -1
                                    if (a.estado !== "ACEPTADO" && b.estado === "ACEPTADO") return 1

                                    // Luego por fecha de creación (más reciente primero)
                                    const dateA = new Date(a.creadoEn || a.createdAt || 0).getTime()
                                    const dateB = new Date(b.creadoEn || b.createdAt || 0).getTime()
                                    return dateB - dateA
                                })
                                .map((match) => ({
                                    id: match.proyecto?.id || match.proyectoId || "",
                                    titulo: match.proyecto?.titulo || "Proyecto sin título",
                                    tipo: match.proyecto?.tipo || "N/A",
                                    potenciaObjetivo: match.proyecto?.potenciaObjetivo,
                                    provincia: match.proyecto?.provincia,
                                    compatibilidad: match.scoreTotal || 0,
                                    estado: match.estado || "PENDIENTE",
                                }))

                            return {
                                id: terreno.id,
                                titulo: terreno.titulo || `${terreno.municipio}, ${terreno.provincia}`,
                                municipio: terreno.municipio,
                                provincia: terreno.provincia,
                                superficie: (terreno as any).superficie || 0,
                                estado: terreno.estado || "ACTIVO",
                                matchCount: sortedMatches.length,
                                matches: sortedMatches,
                            }
                        }
                        return {
                            id: terreno.id,
                            titulo: terreno.titulo || `${terreno.municipio}, ${terreno.provincia}`,
                            municipio: terreno.municipio,
                            provincia: terreno.provincia,
                            superficie: (terreno as any).superficie || 0,
                            estado: terreno.estado || "ACTIVO",
                            matchCount: 0,
                            matches: [],
                        }
                    } catch (error) {
                        console.error(`Error loading matches for terreno ${terreno.id}:`, error)
                        return {
                            id: terreno.id,
                            titulo: terreno.titulo || `${terreno.municipio}, ${terreno.provincia}`,
                            municipio: terreno.municipio,
                            provincia: terreno.provincia,
                            superficie: (terreno as any).superficie || 0,
                            estado: terreno.estado || "ACTIVO",
                            matchCount: 0,
                            matches: [],
                        }
                    }
                })

                const results = await Promise.all(matchesPromises)
                setTerrenosConMatches(results)

                if (results.length > 0 && !selectedTerrenoId) {
                    setSelectedTerrenoId(results[0].id)
                }
            } catch (error) {
                console.error("Error loading matches:", error)
            } finally {
                setIsLoadingMatches(false)
            }
        }

        loadMatches()
    }, [terrenos.length, hasTerrenos])

    const stats = {
        terrenosActivos: terrenos.filter((t) => String(t?.estado ?? "").toUpperCase() === "ACTIVO").length,
        totalMatches: terrenosConMatches.reduce((sum, t) => sum + t.matchCount, 0),
        hectareasTotales: terrenos.reduce((sum, t) => sum + (Number((t as any).superficie ?? (t as any).hectareas) || 0), 0),
        ingresosEstimados: terrenos.reduce((sum, t) => sum + (Number((t as any).superficie ?? (t as any).hectareas) || 0) * 2500, 0),
    }

    return (
        <>
            <DashboardHeader
                title={t?.dashboard?.owner?.title || "Dashboard Propietario"}
                breadcrumbs={[{ label: t?.dashboard?.breadcrumbs?.dashboard || "Dashboard" }]}
                actions={
                    <Link href="/dashboard/propietario/nuevo-terreno">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            {t?.dashboard?.owner?.addLand || "Añadir Terreno"}
                        </Button>
                    </Link>
                }
                userType="propietario"
            />

            <div className="p-6">
                {terrenosLoading ? (
                    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                            <p className="text-muted-foreground text-sm">
                                {t?.dashboard?.owner?.main?.loading || "Cargando tus terrenos..."}
                            </p>
                        </div>
                    </div>
                ) : !hasTerrenos ? (
                    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
                        <Empty className="max-w-2xl">
                            <EmptyHeader>
                                <EmptyMedia>
                                    <MapPin className="h-12 w-12" />
                                </EmptyMedia>
                                <EmptyTitle>{t?.dashboard?.empty?.owner?.title || "No tienes terrenos registrados"}</EmptyTitle>
                                <EmptyDescription>
                                    {t?.dashboard?.empty?.owner?.description ||
                                        "Añade tu primer terreno y empieza a recibir propuestas de promotores"}
                                </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <Link href="/dashboard/propietario/nuevo-terreno">
                                    <Button size="lg" className="gap-2">
                                        <Plus className="h-5 w-5" />
                                        {t?.dashboard?.empty?.owner?.addLand || "Añadir Terreno"}
                                    </Button>
                                </Link>
                                <div className="mt-8 grid grid-cols-3 gap-6 border-t pt-6">
                                    <div className="text-center">
                                        <div className="text-primary text-2xl font-bold">€2,500</div>
                                        <div className="text-muted-foreground text-xs">
                                            {t?.dashboard?.empty?.owner?.metrics?.avgIncomeLabel || "Ingreso medio/ha/año"}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-primary text-2xl font-bold">25 años</div>
                                        <div className="text-muted-foreground text-xs">
                                            {t?.dashboard?.empty?.owner?.metrics?.contractDurationLabel || "Duración contratos"}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-primary text-2xl font-bold">98%</div>
                                        <div className="text-muted-foreground text-xs">
                                            {t?.dashboard?.empty?.owner?.metrics?.successRateLabel || "Tasa de éxito"}
                                        </div>
                                    </div>
                                </div>
                            </EmptyContent>
                        </Empty>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-muted-foreground text-sm font-medium">
                                            {t?.dashboard?.owner?.stats?.activeLands || "Terrenos activos"}
                                        </p>
                                        <p className="text-3xl font-bold">{stats.terrenosActivos}</p>
                                        <p className="text-muted-foreground mt-1 text-xs">de {total} totales</p>
                                    </div>
                                    <div className="bg-primary/10 rounded-full p-3">
                                        <MapPin className="text-primary h-5 w-5" />
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-muted-foreground text-sm font-medium">Matches disponibles</p>
                                        <p className="text-3xl font-bold">{stats.totalMatches}</p>
                                        <p className="text-muted-foreground mt-1 text-xs">proyectos compatibles</p>
                                    </div>
                                    <div className="bg-secondary/10 rounded-full p-3">
                                        <TrendingUp className="text-secondary-foreground h-5 w-5" />
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-muted-foreground text-sm font-medium">
                                            {t?.dashboard?.owner?.stats?.totalHectares || "Hectáreas totales"}
                                        </p>
                                        <p className="text-3xl font-bold">{stats.hectareasTotales.toFixed(1)}</p>
                                        <p className="text-muted-foreground mt-1 text-xs">en {terrenos.length} ubicaciones</p>
                                    </div>
                                    <div className="bg-accent/10 rounded-full p-3">
                                        <MapPin className="text-accent h-5 w-5" />
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-muted-foreground text-sm font-medium">
                                            {t?.dashboard?.owner?.stats?.estimatedIncome || "Ingresos estimados"}
                                        </p>
                                        <p className="text-3xl font-bold">€{(stats.ingresosEstimados / 1000).toFixed(0)}K</p>
                                        <p className="text-muted-foreground mt-1 text-xs">
                                            {t?.dashboard?.owner?.stats?.perYear || "por año"}
                                        </p>
                                    </div>
                                    <div className="bg-primary/10 rounded-full p-3">
                                        <Calendar className="text-primary h-5 w-5" />
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div>
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-bold">
                                    {t?.dashboard?.owner?.main?.selectLand || "Selecciona un terreno para ver matches"}
                                </h2>
                                <div className="flex gap-2">
                                    <Button
                                        variant={viewMode === "horizontal" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setViewMode("horizontal")}
                                        className="gap-2"
                                    >
                                        <MoveHorizontal className="h-4 w-4" />
                                        {t?.dashboard?.owner?.main?.viewModes?.horizontal || "Vista horizontal"}
                                    </Button>
                                    <Button
                                        variant={viewMode === "grid" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setViewMode("grid")}
                                        className="gap-2"
                                    >
                                        <Grid3x3 className="h-4 w-4" />
                                        {t?.dashboard?.owner?.main?.viewModes?.grid || "Vista cuadrícula"}
                                    </Button>
                                </div>
                            </div>

                            {viewMode === "horizontal" ? (
                                <div className="relative">
                                    {/* Gradientes para indicar más contenido */}
                                    <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-8 bg-gradient-to-r from-white to-transparent dark:from-gray-950" />
                                    <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-8 bg-gradient-to-l from-white to-transparent dark:from-gray-950" />

                                    <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 overflow-x-auto overflow-y-visible">
                                        <div className="flex gap-4 px-1 py-2 pb-4">
                                            {terrenosConMatches.map((terreno) => (
                                                <div key={terreno.id} className="max-w-[320px] min-w-[320px] flex-shrink-0">
                                                    <TerrenoCard
                                                        terreno={terreno}
                                                        isSelected={selectedTerrenoId === terreno.id}
                                                        onClick={() => setSelectedTerrenoId(terreno.id)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {terrenosConMatches.map((terreno) => (
                                        <TerrenoCard
                                            key={terreno.id}
                                            terreno={terreno}
                                            isSelected={selectedTerrenoId === terreno.id}
                                            onClick={() => setSelectedTerrenoId(terreno.id)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {selectedTerreno && (
                            <div>
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold">
                                        {(t?.dashboard?.owner?.main?.matchesFor || "Matches para {land}").replace(
                                            "{land}",
                                            selectedTerreno.titulo
                                        )}
                                    </h2>
                                    <p className="text-muted-foreground text-sm">
                                        {(t?.dashboard?.owner?.main?.matchesFound || "{count} proyectos compatibles encontrados").replace(
                                            "{count}",
                                            selectedTerreno.matchCount.toString()
                                        )}
                                    </p>
                                </div>

                                {selectedTerreno.matches.length === 0 ? (
                                    <Card className="p-12">
                                        <Empty>
                                            <EmptyHeader>
                                                <EmptyMedia>
                                                    <TrendingUp className="h-12 w-12" />
                                                </EmptyMedia>
                                                <EmptyTitle>
                                                    {t?.dashboard?.owner?.main?.noMatches || "No hay matches disponibles"}
                                                </EmptyTitle>
                                                <EmptyDescription>
                                                    {t?.dashboard?.owner?.main?.noMatchesDesc ||
                                                        "Aún no hay proyectos compatibles con este terreno. Los promotores están revisando tu terreno constantemente."}
                                                </EmptyDescription>
                                            </EmptyHeader>
                                        </Empty>
                                    </Card>
                                ) : (
                                    <div className="relative">
                                        <div className="scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 flex gap-4 overflow-x-auto pb-4">
                                            {selectedTerreno.matches.map((match) => (
                                                <Card
                                                    key={match.id}
                                                    className="max-w-[320px] min-w-[320px] flex-shrink-0 cursor-pointer p-6 transition-shadow hover:shadow-lg"
                                                >
                                                    <div className="space-y-4">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <div className="min-w-0 flex-1">
                                                                <h3 className="mb-1 line-clamp-2 text-base font-semibold">
                                                                    {match.titulo}
                                                                </h3>
                                                                <p className="text-muted-foreground text-xs">
                                                                    {match.tipo?.replace(/_/g, " ")}
                                                                </p>
                                                            </div>
                                                            <div
                                                                className={`rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${
                                                                    match.estado === "ACEPTADO"
                                                                        ? "bg-green-100 text-green-700"
                                                                        : match.estado === "RECHAZADO"
                                                                          ? "bg-red-100 text-red-700"
                                                                          : "bg-yellow-100 text-yellow-700"
                                                                }`}
                                                            >
                                                                {match.estado === "ACEPTADO"
                                                                    ? t?.dashboard?.owner?.main?.matches?.active || "Activo"
                                                                    : match.estado === "RECHAZADO"
                                                                      ? t?.dashboard?.owner?.main?.matches?.rejected || "Rechazado"
                                                                      : t?.dashboard?.owner?.main?.matches?.pending || "Pendiente"}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            {match.potenciaObjetivo && (
                                                                <div className="flex items-center justify-between text-sm">
                                                                    <span className="text-muted-foreground">
                                                                        {t?.dashboard?.owner?.main?.matches?.power || "Potencia:"}
                                                                    </span>
                                                                    <span className="font-medium">{match.potenciaObjetivo} MW</span>
                                                                </div>
                                                            )}
                                                            {match.provincia && (
                                                                <div className="flex items-center justify-between text-sm">
                                                                    <span className="text-muted-foreground">
                                                                        {t?.dashboard?.owner?.main?.matches?.location || "Ubicación:"}
                                                                    </span>
                                                                    <span className="font-medium">{match.provincia}</span>
                                                                </div>
                                                            )}
                                                            <div className="flex items-center justify-between text-sm">
                                                                <span className="text-muted-foreground">
                                                                    {t?.dashboard?.owner?.main?.matches?.compatibility || "Compatibilidad:"}
                                                                </span>
                                                                <div className="flex items-center gap-2">
                                                                    <div className="h-2 w-20 overflow-hidden rounded-full bg-gray-200">
                                                                        <div
                                                                            className={`h-full ${
                                                                                match.compatibilidad >= 80
                                                                                    ? "bg-green-500"
                                                                                    : match.compatibilidad >= 60
                                                                                      ? "bg-yellow-500"
                                                                                      : "bg-orange-500"
                                                                            }`}
                                                                            style={{ width: `${match.compatibilidad}%` }}
                                                                        />
                                                                    </div>
                                                                    <span className="text-primary font-bold">{match.compatibilidad}%</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <Link href={`/dashboard/propietario/proyectos/${match.id}`}>
                                                            <Button className="w-full" size="sm">
                                                                {t?.dashboard?.owner?.main?.matches?.viewProject || "Ver proyecto"}
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
