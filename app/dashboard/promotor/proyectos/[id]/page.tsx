"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { MatchCard } from "@/components/dashboard/match-card"
import ProtectedRoute from "@/components/protected-route"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useMatches } from "@/hooks/useMatches"
import { useTranslations } from "@/i18n/i18nContext"
import { Briefcase, Filter, MapPin, Search, TrendingUp } from "lucide-react"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"

export default function ProyectoDetallePage() {
    const { t } = useTranslations()
    const params = useParams()
    const proyectoId = params.id as string

    const { proyecto, matches, totalMatches, isLoading, error } = useMatches({
        proyectoId,
        autoFetch: true,
    })

    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState<"compatibility" | "surface" | "price">("compatibility")

    // Filtrar y ordenar matches
    const filteredMatches = useMemo(() => {
        let filtered = matches

        // Buscar por término
        if (searchTerm) {
            filtered = filtered.filter(
                (m) =>
                    m.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    m.municipio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    m.provincia.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Ordenar
        filtered = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case "compatibility":
                    return b.compatibilidad - a.compatibilidad
                case "surface":
                    return b.superficie - a.superficie
                case "price":
                    return (b.precioVenta || 0) - (a.precioVenta || 0)
                default:
                    return 0
            }
        })

        return filtered
    }, [matches, searchTerm, sortBy])

    const getEstadoColor = (estado: string) => {
        switch (estado?.toUpperCase()) {
            case "ACTIVO":
            case "EN_DESARROLLO":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "COMPLETADO":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case "PAUSADO":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "CANCELADO":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        }
    }

    return (
        <ProtectedRoute requiredRole="PROMOTOR" redirectTo="/login/promotor">
            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
                <DashboardSidebar userType="promotor" />
                <div className="flex-1">
                    <DashboardHeader
                        title={proyecto?.titulo || t?.dashboard?.breadcrumbs?.projectDetail || "Proyecto"}
                        breadcrumbs={[
                            { label: t?.dashboard?.breadcrumbs?.dashboard || "Dashboard", href: "/dashboard/promotor" },
                            { label: t?.dashboard?.breadcrumbs?.projects || "Proyectos", href: "/dashboard/promotor" },
                            { label: proyecto?.titulo || t?.dashboard?.breadcrumbs?.projectDetail || "Proyecto" },
                        ]}
                        userType="promotor"
                    />

                    <main className="p-6">
                        <div className="mb-6">
                            {isLoading ? (
                                <div className="py-8">
                                    <div className="h-8 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
                                </div>
                            ) : error ? (
                                <Card className="border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
                                    <p className="text-red-800 dark:text-red-300">{error}</p>
                                </Card>
                            ) : proyecto ? (
                                <>
                                    {/* Información del proyecto */}
                                    <Card className="mb-6 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 dark:border-blue-800 dark:from-blue-900/20 dark:to-purple-900/20">
                                        <div className="p-6">
                                            <div className="mb-4 flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="mb-2 flex items-center gap-2">
                                                        <Briefcase className="h-6 w-6 text-blue-600" />
                                                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                                            {proyecto.titulo}
                                                        </h1>
                                                    </div>
                                                    <Badge className={getEstadoColor(proyecto.estado)}>{proyecto.estado}</Badge>
                                                </div>
                                            </div>

                                            {proyecto.descripcion && (
                                                <p className="mb-4 text-gray-600 dark:text-gray-300">{proyecto.descripcion}</p>
                                            )}

                                            <div className="flex flex-wrap gap-4">
                                                {proyecto.potenciaObjetivo && (
                                                    <div className="flex items-center gap-2 rounded-lg bg-white/60 px-4 py-2 dark:bg-gray-800/60">
                                                        <TrendingUp className="h-5 w-5 text-purple-500" />
                                                        <span className="font-semibold">{proyecto.potenciaObjetivo} MW</span>
                                                    </div>
                                                )}
                                                {proyecto.provincia && (
                                                    <div className="flex items-center gap-2 rounded-lg bg-white/60 px-4 py-2 dark:bg-gray-800/60">
                                                        <MapPin className="h-5 w-5 text-red-500" />
                                                        <span className="font-semibold">{proyecto.provincia}</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2 rounded-lg bg-white/60 px-4 py-2 dark:bg-gray-800/60">
                                                    <Briefcase className="h-5 w-5 text-blue-500" />
                                                    <span className="font-semibold">
                                                        {totalMatches} {t?.dashboard?.promoter?.matches?.matchesFound?.split(" ")[1]}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Controles de búsqueda y filtros */}
                                    <Card className="mb-6">
                                        <div className="p-6">
                                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                                {/* Búsqueda */}
                                                <div className="relative max-w-md flex-1">
                                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        placeholder="Buscar por ubicación o título..."
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                        className="w-full rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800"
                                                    />
                                                </div>

                                                {/* Ordenar */}
                                                <div className="flex items-center gap-2">
                                                    <Filter className="h-4 w-4 text-gray-400" />
                                                    <select
                                                        value={sortBy}
                                                        onChange={(e) => setSortBy(e.target.value as any)}
                                                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800"
                                                    >
                                                        <option value="compatibility">Mejor compatibilidad</option>
                                                        <option value="surface">Mayor superficie</option>
                                                        <option value="price">Mayor precio</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                                <p>
                                                    Mostrando {filteredMatches.length} de {totalMatches} matches
                                                </p>
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Lista de matches */}
                                    {filteredMatches.length > 0 ? (
                                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                            {filteredMatches.map((match) => (
                                                <MatchCard key={match.id} match={match} />
                                            ))}
                                        </div>
                                    ) : (
                                        <Card className="p-12">
                                            <div className="text-center">
                                                <Briefcase className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                                <h3 className="mb-2 text-lg font-semibold">{t?.dashboard?.promoter?.matches?.noMatches}</h3>
                                                <p className="text-muted-foreground text-sm">
                                                    {searchTerm
                                                        ? "No se encontraron matches con esos criterios de búsqueda"
                                                        : t?.dashboard?.promoter?.matches?.noMatchesDesc}
                                                </p>
                                            </div>
                                        </Card>
                                    )}
                                </>
                            ) : null}
                        </div>
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    )
}
