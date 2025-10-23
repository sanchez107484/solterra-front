"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { MatchCard } from "@/components/dashboard/match-card"
import { ProjectSummaryCard } from "@/components/dashboard/project-summary-card"
import ProtectedRoute from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { useTranslations } from "@/i18n/i18nContext"
import { ProyectoConMatches, TerrenoMatch } from "@/types/match.types"
import { Briefcase, Calendar, MapPin, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useProyectos } from "../../../hooks/useProyectos"

export default function DashboardPromotor() {
    const { t } = useTranslations()
    const [proyectosConMatches, setProyectosConMatches] = useState<ProyectoConMatches[]>([])
    const [isLoadingMatches, setIsLoadingMatches] = useState(false)
    const [topMatchesGlobal, setTopMatchesGlobal] = useState<TerrenoMatch[]>([])

    // Hook para cargar proyectos desde el backend
    const { proyectos, isLoading: proyectosLoading, fetchMine } = useProyectos({ autoFetch: false })

    // Filtrar proyectos activos (no CANCELADO ni COMPLETADO)
    const proyectosActivos =
        proyectos?.filter((p: any) => p.estado?.toUpperCase() !== "CANCELADO" && p.estado?.toUpperCase() !== "COMPLETADO") || []

    const hasProyectos = proyectos?.length > 0
    const hasProyectosActivos = proyectosActivos.length > 0
    const isSingleProject = proyectosActivos.length === 1

    // Cargar proyectos al montar
    useEffect(() => {
        fetchMine()
    }, [fetchMine])

    // Cargar matches para cada proyecto activo
    useEffect(() => {
        const loadMatches = async () => {
            if (!hasProyectosActivos) return

            setIsLoadingMatches(true)
            try {
                const token = localStorage.getItem("auth_token")
                if (!token) return

                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

                // Cargar matches para cada proyecto
                const matchesPromises = proyectosActivos.map(async (proyecto: any) => {
                    const response = await fetch(`${API_URL}/proyectos/${proyecto.id}/matches`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    })
                    if (response.ok) {
                        return await response.json()
                    }
                    return null
                })

                const results = await Promise.all(matchesPromises)
                const validResults = results.filter((r) => r !== null) as ProyectoConMatches[]
                setProyectosConMatches(validResults)

                // Extraer top 3 matches globales
                const allMatches = validResults.flatMap((p) => p.matches)
                const sorted = allMatches.sort((a, b) => b.compatibilidad - a.compatibilidad)
                setTopMatchesGlobal(sorted.slice(0, 3))
            } catch (error) {
                console.error("Error loading matches:", error)
            } finally {
                setIsLoadingMatches(false)
            }
        }

        loadMatches()
    }, [proyectosActivos.length, hasProyectosActivos])

    // Calcular estadísticas desde los datos reales
    const stats = {
        proyectosActivos: proyectosActivos.length,
        terrenosCompatibles: proyectosConMatches.reduce((sum, p) => sum + p.totalMatches, 0),
        capacidadTotal: proyectos?.reduce((sum: number, p: any) => sum + (p.potenciaObjetivo || 0), 0) || 0,
        inversionEstimada: proyectos?.reduce((sum: number, p: any) => sum + (p.presupuesto || 0), 0) || 0,
    }

    return (
        <ProtectedRoute requiredRole="PROMOTOR" redirectTo="/login/promotor">
            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
                <DashboardSidebar userType="promotor" />
                <div className="flex-1">
                    <DashboardHeader
                        title={t?.dashboard?.promoter?.title || "Dashboard"}
                        breadcrumbs={[{ label: t?.dashboard?.breadcrumbs?.dashboard || "Dashboard" }]}
                        actions={
                            <Link href="/dashboard/promotor/nuevo-proyecto">
                                <Button className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    {t?.dashboard?.promoter?.newProject}
                                </Button>
                            </Link>
                        }
                        userType="promotor"
                    />

                    {/* Content */}
                    <div className="p-6">
                        {proyectosLoading || isLoadingMatches ? (
                            <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                                    <p className="text-muted-foreground text-sm">
                                        {t?.dashboard?.promoter?.matches?.loading || "Cargando..."}
                                    </p>
                                </div>
                            </div>
                        ) : !hasProyectos ? (
                            <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
                                <Empty className="max-w-2xl">
                                    <EmptyHeader>
                                        <EmptyMedia>
                                            <Briefcase className="h-12 w-12" />
                                        </EmptyMedia>
                                        <EmptyTitle>{t?.dashboard?.promoter?.emptyTitle}</EmptyTitle>
                                        <EmptyDescription>{t?.dashboard?.promoter?.emptyDesc}</EmptyDescription>
                                    </EmptyHeader>
                                    <EmptyContent>
                                        <Link href="/dashboard/promotor/nuevo-proyecto">
                                            <Button size="lg" className="gap-2">
                                                <Plus className="h-5 w-5" />
                                                {t?.dashboard?.promoter?.emptyCta}
                                            </Button>
                                        </Link>
                                        <div className="mt-8 grid grid-cols-3 gap-6 border-t pt-6">
                                            <div className="text-center">
                                                <div className="text-secondary-foreground text-2xl font-bold">500+</div>
                                                <div className="text-muted-foreground text-xs">
                                                    {t?.dashboard?.promoter?.stats?.available}
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-secondary-foreground text-2xl font-bold">150MW</div>
                                                <div className="text-muted-foreground text-xs">
                                                    {t?.dashboard?.promoter?.stats?.capacity}
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-secondary-foreground text-2xl font-bold">95%</div>
                                                <div className="text-muted-foreground text-xs">{t?.dashboard?.promoter?.stats?.match}</div>
                                            </div>
                                        </div>
                                    </EmptyContent>
                                </Empty>
                            </div>
                        ) : isSingleProject ? (
                            /* ===== VISTA: UN SOLO PROYECTO ACTIVO ===== */
                            <div className="space-y-6">
                                {/* Resumen del proyecto único */}
                                <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 dark:border-blue-800 dark:from-blue-900/20 dark:to-purple-900/20">
                                    <div className="p-6">
                                        <div className="mb-4 flex items-center justify-between">
                                            <div>
                                                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                    {t?.dashboard?.promoter?.matches?.singleProject}
                                                </p>
                                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    {proyectosActivos[0]?.titulo}
                                                </h2>
                                                <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-300">
                                                    {proyectosActivos[0]?.potenciaObjetivo && (
                                                        <span className="flex items-center gap-1">
                                                            <TrendingUp className="h-4 w-4" />
                                                            {proyectosActivos[0].potenciaObjetivo} MW
                                                        </span>
                                                    )}
                                                    {proyectosActivos[0]?.provincia && (
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="h-4 w-4" />
                                                            {proyectosActivos[0].provincia}
                                                        </span>
                                                    )}
                                                    <span className="font-semibold text-blue-600">
                                                        {proyectosConMatches[0]?.totalMatches || 0}{" "}
                                                        {t?.dashboard?.promoter?.matches?.matchesFound?.split(" ")[1]}
                                                    </span>
                                                </div>
                                            </div>
                                            <Link href={`/dashboard/promotor/proyectos/${proyectosActivos[0]?.id}`}>
                                                <Button variant="outline">{t?.dashboard?.promoter?.matches?.projectDetails}</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>

                                {/* Top 5 matches del proyecto único */}
                                {proyectosConMatches[0]?.matches && proyectosConMatches[0].matches.length > 0 ? (
                                    <>
                                        <div>
                                            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                                                🌟 {t?.dashboard?.promoter?.matches?.topMatches}
                                            </h3>
                                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                                {proyectosConMatches[0].matches.slice(0, 5).map((match) => (
                                                    <MatchCard key={match.id} match={match} />
                                                ))}
                                            </div>
                                        </div>

                                        {proyectosConMatches[0].totalMatches > 5 && (
                                            <div className="flex justify-center">
                                                <Link href={`/dashboard/promotor/proyectos/${proyectosActivos[0]?.id}`}>
                                                    <Button size="lg" variant="outline">
                                                        {t?.dashboard?.promoter?.matches?.viewAll?.replace(
                                                            "matches",
                                                            `${proyectosConMatches[0].totalMatches} matches`
                                                        )}
                                                    </Button>
                                                </Link>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Card className="p-12">
                                        <div className="text-center">
                                            <Briefcase className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                            <h3 className="mb-2 text-lg font-semibold">{t?.dashboard?.promoter?.matches?.noMatches}</h3>
                                            <p className="text-muted-foreground text-sm">
                                                {t?.dashboard?.promoter?.matches?.noMatchesDesc}
                                            </p>
                                        </div>
                                    </Card>
                                )}
                            </div>
                        ) : (
                            /* ===== VISTA: MÚLTIPLES PROYECTOS ACTIVOS ===== */
                            <div className="space-y-6">
                                {/* Estadísticas generales */}
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <Card className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-sm font-medium">
                                                    {t?.dashboard?.promoter?.statsCard?.activeProjects}
                                                </p>
                                                <p className="text-3xl font-bold">{stats.proyectosActivos}</p>
                                                <p className="text-muted-foreground mt-1 text-xs">de {proyectos?.length || 0} totales</p>
                                            </div>
                                            <div className="bg-secondary/10 rounded-full p-3">
                                                <Briefcase className="text-secondary-foreground h-5 w-5" />
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-sm font-medium">
                                                    {t?.dashboard?.promoter?.statsCard?.compatibleLands}
                                                </p>
                                                <p className="text-3xl font-bold">{stats.terrenosCompatibles}</p>
                                                <p className="text-muted-foreground mt-1 text-xs">
                                                    {t?.dashboard?.promoter?.statsCard?.availableNow}
                                                </p>
                                            </div>
                                            <div className="bg-primary/10 rounded-full p-3">
                                                <MapPin className="text-primary h-5 w-5" />
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-sm font-medium">
                                                    {t?.dashboard?.promoter?.statsCard?.totalCapacity}
                                                </p>
                                                <p className="text-3xl font-bold">{stats.capacidadTotal} MW</p>
                                                <p className="text-muted-foreground mt-1 text-xs">
                                                    {t?.dashboard?.promoter?.statsCard?.planned}
                                                </p>
                                            </div>
                                            <div className="bg-accent/10 rounded-full p-3">
                                                <TrendingUp className="text-accent h-5 w-5" />
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-sm font-medium">
                                                    {t?.dashboard?.promoter?.statsCard?.estimatedInvestment}
                                                </p>
                                                <p className="text-3xl font-bold">€{(stats.inversionEstimada / 1000000).toFixed(0)}M</p>
                                                <p className="text-muted-foreground mt-1 text-xs">
                                                    {t?.dashboard?.promoter?.statsCard?.totalProjects}
                                                </p>
                                            </div>
                                            <div className="bg-secondary/10 rounded-full p-3">
                                                <Calendar className="text-secondary-foreground h-5 w-5" />
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                {/* Resumen de proyectos con matches */}
                                <div>
                                    <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                                        📊 {t?.dashboard?.promoter?.matches?.multipleProjects}
                                    </h3>
                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {proyectosConMatches.map((proyecto) => (
                                            <ProjectSummaryCard key={proyecto.id} proyecto={proyecto} />
                                        ))}
                                    </div>
                                </div>

                                {/* Top 3 matches globales (todos los proyectos) */}
                                {topMatchesGlobal.length > 0 && (
                                    <div>
                                        <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                                            🌟 {t?.dashboard?.promoter?.matches?.recentMatches} (
                                            {t?.dashboard?.promoter?.matches?.allProjects})
                                        </h3>
                                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                            {topMatchesGlobal.map((match) => (
                                                <MatchCard key={match.id} match={match} compact />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}
