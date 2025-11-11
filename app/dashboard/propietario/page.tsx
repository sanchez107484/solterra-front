"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardEmptyState } from "@/components/dashboard/empty-state"
import { StatsCard } from "@/components/dashboard/stats-card"
import { TerrenoCard } from "@/components/dashboard/terreno-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { useTerrenos } from "@/hooks/useTerrenos"
import { useTranslations } from "@/i18n/i18nContext"
import { BookCheck, ChevronLeft, ChevronRight, Euro, Grid3x3, MapPin, MoveHorizontal, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

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
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

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

                // Hacer una sola petición batch al backend para evitar N+1 requests
                if (!token) {
                    setIsLoadingMatches(false)
                    return
                }

                try {
                    const resp = await fetch(`${API_URL}/terrenos/me-with-matches`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    })

                    if (resp.ok) {
                        const body = await resp.json()
                        // body.data should be an array of terrenos with matches embedded
                        const results = (body?.data || []).map((terreno: any) => ({
                            id: terreno.id,
                            titulo: terreno.titulo || `${terreno.municipio}, ${terreno.provincia}`,
                            municipio: terreno.municipio,
                            provincia: terreno.provincia,
                            superficie: (terreno as any).superficie || 0,
                            estado: terreno.estado || "ACTIVO",
                            matchCount: terreno.matchCount ?? (Array.isArray(terreno.matches) ? terreno.matches.length : 0),
                            matches: Array.isArray(terreno.matches)
                                ? terreno.matches.map((m: any) => ({
                                      id: m.proyecto?.id || m.proyectoId || "",
                                      titulo: m.proyecto?.titulo || (t?.common?.untitledProject ?? ""),
                                      tipo: m.proyecto?.tipo || (t?.common?.na ?? ""),
                                      potenciaObjetivo: m.proyecto?.potenciaObjetivo,
                                      provincia: m.proyecto?.provincia,
                                      compatibilidad: m.scoreTotal || 0,
                                      estado: m.estado || "PENDIENTE",
                                  }))
                                : [],
                        }))

                        setTerrenosConMatches(results)

                        if (results.length > 0 && !selectedTerrenoId) {
                            setSelectedTerrenoId(results[0].id)
                        }
                    } else {
                        console.error("Batch matches request failed", resp.statusText)
                    }
                } catch (err) {
                    console.error("Error fetching batch matches:", err)
                }
            } catch (error) {
                console.error("Error loading matches:", error)
            } finally {
                setIsLoadingMatches(false)
            }
        }

        loadMatches()
    }, [terrenos.length, hasTerrenos])

    // Función para verificar si se puede hacer scroll
    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    // Función para hacer scroll suave
    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 380 // ancho de la tarjeta + gap
            const newScrollLeft =
                direction === "left"
                    ? scrollContainerRef.current.scrollLeft - scrollAmount
                    : scrollContainerRef.current.scrollLeft + scrollAmount

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth",
            })
        }
    }

    // Verificar scroll al montar y cuando cambia el contenido
    useEffect(() => {
        checkScroll()
        const container = scrollContainerRef.current
        if (container) {
            container.addEventListener("scroll", checkScroll)
            window.addEventListener("resize", checkScroll)
            return () => {
                container.removeEventListener("scroll", checkScroll)
                window.removeEventListener("resize", checkScroll)
            }
        }
    }, [terrenosConMatches, viewMode])

    const stats = {
        terrenosActivos: terrenos.filter((t) => String(t?.estado ?? "").toUpperCase() === "ACTIVO").length,
        totalMatches: terrenosConMatches.reduce((sum, t) => sum + t.matchCount, 0),
        hectareasTotales: terrenos.reduce(
            (sum, terrain) => sum + (Number((terrain as any).superficie ?? (terrain as any).hectareas) || 0),
            0
        ),
        ingresosEstimados: terrenos.reduce(
            (sum, terrain) => sum + (Number((terrain as any).superficie ?? (terrain as any).hectareas) || 0) * 2500,
            0
        ),
    }

    return (
        <>
            <DashboardHeader
                title={t?.dashboard?.owner?.title}
                breadcrumbs={[{ label: t?.dashboard?.breadcrumbs?.dashboard }]}
                actions={
                    <Link href="/dashboard/propietario/nuevo-terreno">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            {t?.dashboard?.owner?.addLand}
                        </Button>
                    </Link>
                }
                userType="propietario"
            />

            <div className="mx-auto max-w-[1600px] p-6">
                {terrenosLoading ? (
                    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                            <p className="text-muted-foreground text-sm">{t?.dashboard?.owner?.main?.loading}</p>
                        </div>
                    </div>
                ) : !hasTerrenos ? (
                    <DashboardEmptyState
                        icon={MapPin}
                        title={t?.dashboard?.empty?.owner?.title || "No tienes terrenos aún"}
                        description={
                            t?.dashboard?.empty?.owner?.description || "Añade tu primer terreno para empezar a buscar proyectos compatibles"
                        }
                        ctaText={t?.dashboard?.empty?.owner?.addLand || "Añadir terreno"}
                        ctaHref="/dashboard/propietario/nuevo-terreno"
                        variant="primary"
                        metrics={[
                            {
                                value: t?.dashboard?.empty?.owner?.metrics?.avgIncomeValue || "€2,500/ha",
                                label: t?.dashboard?.empty?.owner?.metrics?.avgIncomeLabel || "Ingresos promedio",
                            },
                            {
                                value: t?.dashboard?.empty?.owner?.metrics?.contractDurationValue || "25 años",
                                label: t?.dashboard?.empty?.owner?.metrics?.contractDurationLabel || "Duración contrato",
                            },
                            {
                                value: t?.dashboard?.empty?.owner?.metrics?.successRateValue || "89%",
                                label: t?.dashboard?.empty?.owner?.metrics?.successRateLabel || "Tasa de éxito",
                            },
                        ]}
                    />
                ) : (
                    <div className="space-y-8">
                        {/* Stats Cards */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <StatsCard
                                title={t?.dashboard?.owner?.stats?.activeLands || "Terrenos Activos"}
                                value={String(stats.terrenosActivos)}
                                subtitle={t?.dashboard?.owner?.stats?.totalActiveLands?.replace("{total}", String(total))}
                                icon={MapPin}
                                variant="primary"
                            />
                            <StatsCard
                                title={t?.dashboard?.owner?.stats?.matchesLabel || "Matches"}
                                value={String(stats.totalMatches)}
                                subtitle={t?.dashboard?.owner?.stats?.matchesSubtitle}
                                icon={TrendingUp}
                                variant="secondary"
                            />
                            <StatsCard
                                title={t?.dashboard?.owner?.stats?.totalHectares || "Hectáreas Totales"}
                                value={`${stats.hectareasTotales.toFixed(1)}`}
                                subtitle={t?.dashboard?.owner?.stats?.multipleLocations?.replace("{count}", String(terrenos.length))}
                                icon={BookCheck}
                                variant="primary"
                            />
                            <StatsCard
                                title={t?.dashboard?.owner?.stats?.estimatedIncome || "Ingresos Estimados"}
                                value={`€${(stats.ingresosEstimados / 1000).toFixed(0)}K`}
                                subtitle={t?.dashboard?.owner?.stats?.perYear}
                                icon={Euro}
                                variant="secondary"
                            />
                        </div>

                        {/* Sección de Terrenos */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold">{t?.dashboard?.owner?.main?.selectLand}</h2>
                                    <p className="text-muted-foreground mt-1 text-sm">{t?.dashboard?.owner?.main?.selectLandDesc}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant={viewMode === "horizontal" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setViewMode("horizontal")}
                                        className="gap-2"
                                    >
                                        <MoveHorizontal className="h-4 w-4" />
                                        {t?.dashboard?.owner?.main?.viewModes?.horizontal}
                                    </Button>
                                    <Button
                                        variant={viewMode === "grid" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setViewMode("grid")}
                                        className="gap-2"
                                    >
                                        <Grid3x3 className="h-4 w-4" />
                                        {t?.dashboard?.owner?.main?.viewModes?.grid}
                                    </Button>
                                </div>
                            </div>

                            {viewMode === "horizontal" ? (
                                <div className="group relative">
                                    {/* Botón scroll izquierda */}
                                    {canScrollLeft && (
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="absolute top-1/2 left-0 z-20 h-10 w-10 -translate-y-1/2 rounded-full bg-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hover:bg-gray-50"
                                            onClick={() => scroll("left")}
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </Button>
                                    )}

                                    {/* Botón scroll derecha */}
                                    {canScrollRight && (
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="absolute top-1/2 right-0 z-20 h-10 w-10 -translate-y-1/2 rounded-full bg-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hover:bg-gray-50"
                                            onClick={() => scroll("right")}
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </Button>
                                    )}

                                    {/* Gradientes sutiles */}
                                    {canScrollLeft && (
                                        <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r to-transparent" />
                                    )}
                                    {canScrollRight && (
                                        <div className="from-background pointer-events-none absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l to-transparent" />
                                    )}

                                    {/* Container con scroll */}
                                    <div
                                        ref={scrollContainerRef}
                                        className="scrollbar-hide overflow-x-auto overflow-y-visible py-2"
                                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                                    >
                                        <div className="flex gap-4 px-1">
                                            {terrenosConMatches.map((terreno) => (
                                                <div key={terreno.id} className="w-[360px] flex-shrink-0">
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

                        {/* Sección de Matches */}
                        {selectedTerreno && (
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        {t?.dashboard?.owner?.main?.matchesFor?.replace("{land}", selectedTerreno?.titulo ?? "")}
                                    </h2>
                                    <p className="text-muted-foreground mt-1 text-sm">
                                        {t?.dashboard?.owner?.main?.matchesFound
                                            ?.replace("{count}", selectedTerreno?.matchCount?.toString() ?? "")
                                            ?.replace("{land}", selectedTerreno?.titulo ?? "")}
                                    </p>
                                </div>

                                {(selectedTerreno?.matches?.length ?? 0) === 0 ? (
                                    <Card className="p-12">
                                        <Empty>
                                            <EmptyHeader>
                                                <EmptyMedia>
                                                    <TrendingUp className="h-12 w-12" />
                                                </EmptyMedia>
                                                <EmptyTitle>{t?.dashboard?.owner?.main?.noMatches}</EmptyTitle>
                                                <EmptyDescription>{t?.dashboard?.owner?.main?.noMatchesDesc}</EmptyDescription>
                                            </EmptyHeader>
                                        </Empty>
                                    </Card>
                                ) : (
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                        {selectedTerreno?.matches?.map((match) => (
                                            <Card
                                                key={match.id}
                                                className="cursor-pointer p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                                            >
                                                <div className="space-y-4">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="min-w-0 flex-1">
                                                            <h3 className="mb-1 line-clamp-2 text-base font-semibold">
                                                                {match.titulo || t?.common?.untitledProject}
                                                            </h3>
                                                            <p className="text-muted-foreground text-xs">
                                                                {match.tipo ? match.tipo.replace(/_/g, " ") : t?.common?.na}
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
                                                                ? t?.dashboard?.owner?.main?.matches?.active
                                                                : match.estado === "RECHAZADO"
                                                                  ? t?.dashboard?.owner?.main?.matches?.rejected
                                                                  : t?.dashboard?.owner?.main?.matches?.pending}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3">
                                                        {match.potenciaObjetivo && (
                                                            <div className="flex items-center justify-between text-sm">
                                                                <span className="text-muted-foreground">
                                                                    {t?.dashboard?.owner?.main?.matches?.power}
                                                                </span>
                                                                <span className="font-semibold">{match.potenciaObjetivo} MW</span>
                                                            </div>
                                                        )}
                                                        {match.provincia && (
                                                            <div className="flex items-center justify-between text-sm">
                                                                <span className="text-muted-foreground">
                                                                    {t?.dashboard?.owner?.main?.matches?.location}
                                                                </span>
                                                                <span className="font-semibold">{match.provincia}</span>
                                                            </div>
                                                        )}
                                                        <div className="space-y-2">
                                                            <div className="flex items-center justify-between text-sm">
                                                                <span className="text-muted-foreground">
                                                                    {t?.dashboard?.owner?.main?.matches?.compatibility}
                                                                </span>
                                                                <span className="text-primary font-bold">{match.compatibilidad}%</span>
                                                            </div>
                                                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                                                <div
                                                                    className={`h-full transition-all ${
                                                                        match.compatibilidad >= 80
                                                                            ? "bg-green-500"
                                                                            : match.compatibilidad >= 60
                                                                              ? "bg-yellow-500"
                                                                              : "bg-orange-500"
                                                                    }`}
                                                                    style={{ width: `${match.compatibilidad}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Link href={`/dashboard/propietario/proyectos/${match.id}`}>
                                                        <Button className="w-full" size="sm">
                                                            {t?.dashboard?.owner?.main?.matches?.viewProject}
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </>
    )
}
