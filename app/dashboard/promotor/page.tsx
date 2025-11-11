"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardEmptyState } from "@/components/dashboard/empty-state"
import { ProyectoCard } from "@/components/dashboard/proyecto-card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { useProyectos } from "@/hooks/useProyectos"
import { useTranslations } from "@/i18n/i18nContext"
import { Briefcase, ChevronLeft, ChevronRight, Euro, Grid3x3, MoveHorizontal, Plus, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

interface ProyectoConMatches {
    id: string
    titulo: string
    tipo: string
    potenciaObjetivo: number
    provincia: string
    estado: string
    matchCount: number
    matches: Array<{
        id: string
        titulo: string
        municipio: string
        provincia: string
        superficie: number
        compatibilidad: number
        estado: string
    }>
}

export default function DashboardPromotor() {
    const { t } = useTranslations()
    const [proyectosConMatches, setProyectosConMatches] = useState<ProyectoConMatches[]>([])
    const [selectedProyectoId, setSelectedProyectoId] = useState<string | null>(null)
    const [isLoadingMatches, setIsLoadingMatches] = useState(false)
    const [viewMode, setViewMode] = useState<"horizontal" | "grid">("horizontal")
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const { proyectos, total, isLoading: proyectosLoading, fetchMine } = useProyectos({ autoFetch: false })

    const hasProyectos = proyectos.length > 0
    const selectedProyecto = proyectosConMatches.find((p) => p.id === selectedProyectoId)

    useEffect(() => {
        fetchMine()
    }, [fetchMine])

    useEffect(() => {
        const loadMatches = async () => {
            if (!hasProyectos || proyectos.length === 0) {
                setProyectosConMatches([])
                setSelectedProyectoId(null)
                return
            }

            setIsLoadingMatches(true)
            try {
                const token = localStorage.getItem("auth_token")
                if (!token) {
                    console.error("No authentication token found")
                    setIsLoadingMatches(false)
                    return
                }

                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

                const resp = await fetch(`${API_URL}/proyectos/me-with-matches`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

                if (!resp.ok) {
                    throw new Error(`Failed to fetch projects: ${resp.status} ${resp.statusText}`)
                }

                const data = await resp.json()

                // Mapear la respuesta del backend al formato esperado por el frontend
                const results: ProyectoConMatches[] = Array.isArray(data)
                    ? data.map((proyecto: any) => ({
                          id: proyecto.id,
                          titulo: proyecto.titulo || t?.common?.untitledProject || "Proyecto sin título",
                          tipo: proyecto.tipo || "SOLAR_FOTOVOLTAICA",
                          potenciaObjetivo: proyecto.potenciaObjetivo || 0,
                          provincia: proyecto.provincia || "",
                          estado: proyecto.estado || "BORRADOR",
                          matchCount: proyecto.matchCount || 0,
                          matches: Array.isArray(proyecto.matches)
                              ? proyecto.matches.map((match: any) => ({
                                    id: match.terreno?.id || match.terrenoId || "",
                                    titulo:
                                        match.terreno?.titulo ||
                                        `${match.terreno?.municipio || ""}, ${match.terreno?.provincia || ""}`.trim() ||
                                        "Terreno sin título",
                                    municipio: match.terreno?.municipio || "",
                                    provincia: match.terreno?.provincia || "",
                                    superficie: match.terreno?.superficie || 0,
                                    compatibilidad: Math.round(match.scoreTotal || 0),
                                    estado: match.estado || "PENDIENTE",
                                }))
                              : [],
                      }))
                    : []

                setProyectosConMatches(results)

                // Seleccionar automáticamente el primer proyecto si no hay ninguno seleccionado
                if (results.length > 0 && !selectedProyectoId) {
                    setSelectedProyectoId(results[0].id)
                }
            } catch (error) {
                console.error("Error loading projects with matches:", error)

                // En caso de error, mostrar proyectos sin matches como fallback
                const fallbackResults: ProyectoConMatches[] = proyectos.map((proyecto: any) => ({
                    id: proyecto.id,
                    titulo: proyecto.titulo || t?.common?.untitledProject || "Proyecto sin título",
                    tipo: proyecto.tipo || "SOLAR_FOTOVOLTAICA",
                    potenciaObjetivo: proyecto.potenciaObjetivo || 0,
                    provincia: proyecto.provincia || "",
                    estado: proyecto.estado || "BORRADOR",
                    matchCount: 0,
                    matches: [],
                }))
                setProyectosConMatches(fallbackResults)
            } finally {
                setIsLoadingMatches(false)
            }
        }

        loadMatches()
    }, [proyectos.length, hasProyectos, t])

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
    }, [proyectosConMatches, viewMode])

    const stats = {
        proyectosActivos: proyectos.filter((p: any) => String(p?.estado ?? "").toUpperCase() === "ACTIVO").length,
        totalMatches: proyectosConMatches.reduce((sum: number, p: ProyectoConMatches) => sum + p.matchCount, 0),
        potenciaTotal: proyectos.reduce((sum: number, p: any) => sum + (Number(p.potenciaObjetivo) || 0), 0),
        inversionEstimada: proyectos.reduce((sum: number, p: any) => sum + (Number(p.presupuesto) || 0), 0),
    }

    return (
        <>
            <DashboardHeader
                title={t?.dashboard?.promoter?.title}
                breadcrumbs={[{ label: t?.dashboard?.breadcrumbs?.dashboard }]}
                actions={
                    <Link href="/dashboard/promotor/nuevo-proyecto">
                        <Button className="bg-secondary hover:bg-secondary/90 gap-2">
                            <Plus className="h-4 w-4" />
                            {t?.sidebar?.promoter?.addProject}
                        </Button>
                    </Link>
                }
                userType="promotor"
            />

            <div className="mx-auto max-w-[1600px] p-6">
                {proyectosLoading ? (
                    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-orange-600" />
                            <p className="text-muted-foreground text-sm">{t?.dashboard?.promoter?.main?.loading}</p>
                        </div>
                    </div>
                ) : !hasProyectos ? (
                    <DashboardEmptyState
                        icon={Briefcase}
                        title={t?.dashboard?.empty?.promoter?.title || "No tienes proyectos aún"}
                        description={
                            t?.dashboard?.empty?.promoter?.description ||
                            "Crea tu primer proyecto para empezar a buscar terrenos compatibles"
                        }
                        ctaText={t?.dashboard?.empty?.promoter?.addProject || "Añadir proyecto"}
                        ctaHref="/dashboard/promotor/nuevo-proyecto"
                        variant="secondary"
                        metrics={[
                            {
                                value: t?.dashboard?.empty?.promoter?.metrics?.availableLandsValue || "500+",
                                label: t?.dashboard?.empty?.promoter?.metrics?.availableLandsLabel || "Terrenos disponibles",
                            },
                            {
                                value: t?.dashboard?.empty?.promoter?.metrics?.avgMatchValue || "73%",
                                label: t?.dashboard?.empty?.promoter?.metrics?.avgMatchLabel || "Tasa de matches",
                            },
                            {
                                value: t?.dashboard?.empty?.promoter?.metrics?.avgTimeValue || "6 meses",
                                label: t?.dashboard?.empty?.promoter?.metrics?.avgTimeLabel || "Tiempo promedio",
                            },
                        ]}
                    />
                ) : (
                    <div className="space-y-8">
                        {/* Stats Cards */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <StatsCard
                                title={t?.dashboard?.promoter?.stats?.activeProjects || "Proyectos Activos"}
                                value={String(stats.proyectosActivos)}
                                subtitle={t?.dashboard?.promoter?.stats?.totalActiveProjects?.replace("{total}", String(total))}
                                icon={Briefcase}
                                variant="secondary"
                            />
                            <StatsCard
                                title={t?.dashboard?.promoter?.stats?.matchesLabel || "Matches"}
                                value={String(stats.totalMatches)}
                                subtitle={t?.dashboard?.promoter?.stats?.matchesSubtitle}
                                icon={TrendingUp}
                                variant="primary"
                            />
                            <StatsCard
                                title={t?.dashboard?.promoter?.stats?.totalPower || "Potencia Total"}
                                value={`${stats.potenciaTotal.toFixed(1)} MW`}
                                subtitle={t?.dashboard?.promoter?.stats?.multipleProjects?.replace("{count}", String(proyectos.length))}
                                icon={Zap}
                                variant="secondary"
                            />
                            <StatsCard
                                title={t?.dashboard?.promoter?.stats?.estimatedInvestment || "Inversión Estimada"}
                                value={`€${(stats.inversionEstimada / 1000000).toFixed(1)}M`}
                                subtitle={t?.dashboard?.promoter?.stats?.totalCapital}
                                icon={Euro}
                                variant="primary"
                            />
                        </div>

                        {/* Sección de Proyectos */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold">{t?.dashboard?.promoter?.main?.selectProject}</h2>
                                    <p className="text-muted-foreground mt-1 text-sm">{t?.dashboard?.promoter?.main?.selectProjectDesc}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant={viewMode === "horizontal" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setViewMode("horizontal")}
                                        className={`gap-2 ${viewMode === "horizontal" ? "bg-secondary hover:bg-secondary/90 text-white" : "border-secondary/20 hover:bg-secondary/10"}`}
                                    >
                                        <MoveHorizontal className="h-4 w-4" />
                                        {t?.dashboard?.promoter?.main?.viewModes?.horizontal}
                                    </Button>
                                    <Button
                                        variant={viewMode === "grid" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setViewMode("grid")}
                                        className={`gap-2 ${viewMode === "grid" ? "bg-secondary hover:bg-secondary/90 text-white" : "border-secondary/20 hover:bg-secondary/10"}`}
                                    >
                                        <Grid3x3 className="h-4 w-4" />
                                        {t?.dashboard?.promoter?.main?.viewModes?.grid}
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
                                            {proyectosConMatches.map((proyecto) => (
                                                <div key={proyecto.id} className="w-[360px] flex-shrink-0">
                                                    <ProyectoCard
                                                        proyecto={proyecto}
                                                        isSelected={selectedProyectoId === proyecto.id}
                                                        onClick={() => setSelectedProyectoId(proyecto.id)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="grid justify-items-center gap-4"
                                    style={{ gridTemplateColumns: "repeat(auto-fill, 360px)" }}
                                >
                                    {proyectosConMatches.map((proyecto) => (
                                        <div key={proyecto.id} className="w-[360px]">
                                            <ProyectoCard
                                                proyecto={proyecto}
                                                isSelected={selectedProyectoId === proyecto.id}
                                                onClick={() => setSelectedProyectoId(proyecto.id)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sección de Matches - Terrenos compatibles */}
                        {selectedProyecto && (
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        {t?.dashboard?.promoter?.main?.matchesFor?.replace("{project}", selectedProyecto?.titulo ?? "")}
                                    </h2>
                                    <p className="text-muted-foreground mt-1 text-sm">
                                        {t?.dashboard?.promoter?.main?.matchesFound
                                            ?.replace("{count}", selectedProyecto?.matchCount?.toString() ?? "")
                                            ?.replace("{project}", selectedProyecto?.titulo ?? "")}
                                    </p>
                                </div>

                                {(selectedProyecto?.matches?.length ?? 0) === 0 ? (
                                    <Card className="p-12">
                                        <Empty>
                                            <EmptyHeader>
                                                <EmptyMedia>
                                                    <TrendingUp className="h-12 w-12" />
                                                </EmptyMedia>
                                                <EmptyTitle>{t?.dashboard?.promoter?.main?.noMatches}</EmptyTitle>
                                                <EmptyDescription>{t?.dashboard?.promoter?.main?.noMatchesDesc}</EmptyDescription>
                                            </EmptyHeader>
                                        </Empty>
                                    </Card>
                                ) : (
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                        {selectedProyecto?.matches?.map((match) => (
                                            <Card
                                                key={match.id}
                                                className="cursor-pointer p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                                            >
                                                <div className="space-y-4">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="min-w-0 flex-1">
                                                            <h3 className="mb-1 line-clamp-2 text-base font-semibold">
                                                                {match.titulo || "Terreno sin título"}
                                                            </h3>
                                                            <p className="text-muted-foreground text-xs">
                                                                {match.municipio}, {match.provincia}
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
                                                                ? t?.dashboard?.promoter?.main?.matches?.active
                                                                : match.estado === "RECHAZADO"
                                                                  ? t?.dashboard?.promoter?.main?.matches?.rejected
                                                                  : t?.dashboard?.promoter?.main?.matches?.pending}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3">
                                                        {match.superficie && (
                                                            <div className="flex items-center justify-between text-sm">
                                                                <span className="text-muted-foreground">
                                                                    {t?.dashboard?.promoter?.main?.matches?.surface}
                                                                </span>
                                                                <span className="font-semibold">{match.superficie} ha</span>
                                                            </div>
                                                        )}
                                                        {match.provincia && (
                                                            <div className="flex items-center justify-between text-sm">
                                                                <span className="text-muted-foreground">
                                                                    {t?.dashboard?.promoter?.main?.matches?.location}
                                                                </span>
                                                                <span className="font-semibold">{match.provincia}</span>
                                                            </div>
                                                        )}
                                                        <div className="space-y-2">
                                                            <div className="flex items-center justify-between text-sm">
                                                                <span className="text-muted-foreground">
                                                                    {t?.dashboard?.promoter?.main?.matches?.compatibility}
                                                                </span>
                                                                <span className="text-secondary font-bold">{match.compatibilidad}%</span>
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

                                                    <Link href={`/dashboard/promotor/terrenos/${match.id}`}>
                                                        <Button className="bg-secondary hover:bg-secondary/90 w-full" size="sm">
                                                            {t?.dashboard?.promoter?.main?.matches?.viewLand}
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
