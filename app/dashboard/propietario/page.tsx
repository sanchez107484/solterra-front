"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MatchesTable } from "@/components/dashboard/matches-table"
import { TerrenoCard } from "@/components/dashboard/terreno-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { useTerrenos } from "@/hooks/useTerrenos"
import { useTranslations } from "@/i18n/i18nContext"
import { Calendar, MapPin, Plus, TrendingUp } from "lucide-react"
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
                        const response = await fetch(`${API_URL}/terrenos/${terreno.id}/matches`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                        })
                        if (response.ok) {
                            const data = await response.json()
                            return {
                                id: terreno.id,
                                titulo: terreno.titulo || `${terreno.municipio}, ${terreno.provincia}`,
                                municipio: terreno.municipio,
                                provincia: terreno.provincia,
                                superficie: (terreno as any).superficie || 0,
                                estado: terreno.estado || "ACTIVO",
                                matchCount: data.totalMatches || 0,
                                matches: data.matches || [],
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
                            <p className="text-muted-foreground text-sm">Cargando tus terrenos...</p>
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
                            <h2 className="mb-4 text-xl font-bold">Selecciona un terreno para ver matches</h2>
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
                        </div>

                        {selectedTerreno && (
                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold">Matches para {selectedTerreno.titulo}</h2>
                                        <p className="text-muted-foreground text-sm">
                                            {selectedTerreno.matchCount} proyectos compatibles encontrados
                                        </p>
                                    </div>
                                    <Link href={`/dashboard/propietario/mis-terrenos/${selectedTerreno.id}`}>
                                        <Button variant="outline">Ver detalles del terreno</Button>
                                    </Link>
                                </div>
                                <MatchesTable matches={selectedTerreno.matches} isLoading={isLoadingMatches} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
