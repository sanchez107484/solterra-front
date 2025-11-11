"use client"

import { DashboardEmptyState, StatsCard } from "@/components/dashboard"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useProyectos } from "@/hooks/useProyectos"
import { useTranslations } from "@/i18n/i18nContext"
import { Briefcase, Calendar, CheckCheck, Euro, Filter, Grid3x3, Layers, List, MapPin, Search, ShieldCheck, X, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

type ViewMode = "list" | "grid"

const getProyectoStateColor = (estado: string) => {
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
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
}

const getProyectoStateLabel = (estado: string | undefined, t: any) => {
    const states = t?.dashboard?.promoter?.proyectos?.states || {}
    const fallback = t?.common?.none || "N/A"

    switch (estado?.toUpperCase()) {
        case "ACTIVO":
            return states.activo || fallback
        case "COMPLETADO":
            return states.completado || fallback
        case "PAUSADO":
            return states.pausado || fallback
        case "BORRADOR":
            return states.borrador || fallback
        case "CANCELADO":
            return states.cancelado || fallback
        default:
            return fallback
    }
}

const getTipoLabel = (tipo: string | undefined, t: any) => {
    const tipos = t?.dashboard?.promoter?.proyectos?.tipos || {}
    return tipos[tipo || ""] || tipo || "N/A"
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)
}

export default function MisProyectosPage() {
    const { t } = useTranslations()
    const { proyectos, fetchMine, isLoading } = useProyectos({ autoFetch: false })
    const [viewMode, setViewMode] = useState<ViewMode>("list")
    const [searchQuery, setSearchQuery] = useState("")
    const [estadoFilter, setEstadoFilter] = useState<string>("TODOS")

    useEffect(() => {
        fetchMine()
    }, [fetchMine])

    // Filtrar proyectos
    const proyectosFiltrados = useMemo(() => {
        if (!proyectos) return []

        return proyectos.filter((proyecto) => {
            // Filtro por búsqueda
            const matchesSearch =
                searchQuery === "" ||
                proyecto.titulo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                proyecto.tipo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                proyecto.descripcion?.toLowerCase().includes(searchQuery.toLowerCase())

            // Filtro por estado
            const matchesEstado = estadoFilter === "TODOS" || proyecto.estado === estadoFilter

            return matchesSearch && matchesEstado
        })
    }, [proyectos, searchQuery, estadoFilter])

    // Calcular estadísticas
    const totalProyectos = proyectosFiltrados?.length || 0
    const proyectosActivos = proyectosFiltrados?.filter((p) => p.estado === "ACTIVO").length || 0
    const proyectosCompletados = proyectosFiltrados?.filter((p) => p.estado === "COMPLETADO").length || 0
    const presupuestoTotal = proyectosFiltrados?.reduce((sum, p) => sum + (p.presupuesto || 0), 0) || 0

    return (
        <>
            <DashboardHeader
                title={t?.dashboard?.promoter?.proyectos?.title}
                breadcrumbs={[
                    { label: t?.dashboard?.breadcrumbs?.dashboard, href: "/dashboard/promotor" },
                    { label: t?.dashboard?.promoter?.proyectos?.title },
                ]}
                userType="promotor"
            />
            <main className="mx-auto max-w-[1600px] p-6">
                {/* Estadísticas */}
                <div className="space-y-8">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <StatsCard
                            title={t?.dashboard?.promoter?.proyectos?.stats?.total || "Total Proyectos"}
                            value={String(totalProyectos)}
                            subtitle={t?.dashboard?.promoter?.proyectos?.stats?.totalDesc}
                            icon={Briefcase}
                            variant="secondary"
                        />
                        <StatsCard
                            title={t?.dashboard?.promoter?.proyectos?.stats?.active || "Proyectos Activos"}
                            value={String(proyectosActivos)}
                            subtitle={t?.dashboard?.promoter?.proyectos?.stats?.activeDesc}
                            icon={ShieldCheck}
                            variant="primary"
                        />
                        <StatsCard
                            title={t?.dashboard?.promoter?.proyectos?.stats?.completed || "Completados"}
                            value={String(proyectosCompletados)}
                            subtitle={t?.dashboard?.promoter?.proyectos?.stats?.completedDesc}
                            icon={CheckCheck}
                            variant="secondary"
                        />
                        <StatsCard
                            title={t?.dashboard?.promoter?.proyectos?.stats?.totalValue || "Presupuesto Total"}
                            value={formatCurrency(presupuestoTotal)}
                            subtitle={t?.dashboard?.promoter?.proyectos?.stats?.totalValueDesc}
                            icon={Euro}
                            variant="primary"
                        />
                    </div>

                    {/* Controles de filtros y vista */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Filtros */}
                        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                            {/* Búsqueda */}
                            <div className="relative max-w-md flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder={t?.dashboard?.promoter?.proyectos?.filters?.search}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="focus:ring-secondary w-full rounded-lg border py-2 pr-10 pl-10 focus:ring-2 focus:outline-none"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            {/* Filtro de estado */}
                            <div className="flex flex-wrap items-center gap-2">
                                <Filter className="h-4 w-4 text-gray-500" />
                                <div className="flex gap-2">
                                    {["TODOS", "ACTIVO", "COMPLETADO", "PAUSADO", "BORRADOR", "CANCELADO"].map((estado) => (
                                        <button
                                            key={estado}
                                            onClick={() => setEstadoFilter(estado)}
                                            className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                                                estadoFilter === estado
                                                    ? "bg-secondary text-white"
                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                        >
                                            {estado === "TODOS"
                                                ? t?.dashboard?.promoter?.proyectos?.filters?.allStates
                                                : getProyectoStateLabel(estado, t)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Toggle de vista */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setViewMode("list")}
                                className={`rounded-lg p-2 transition-colors ${
                                    viewMode === "list" ? "bg-secondary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                                title={t?.dashboard?.promoter?.proyectos?.filters?.listView}
                            >
                                <List className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`rounded-lg p-2 transition-colors ${
                                    viewMode === "grid" ? "bg-secondary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                                title={t?.dashboard?.promoter?.proyectos?.filters?.gridView}
                            >
                                <Grid3x3 className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Lista de proyectos */}
                    {isLoading ? (
                        <div className="py-12 text-center">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-orange-600"></div>
                            <p className="mt-2 text-gray-600">{t?.common?.loading}</p>
                        </div>
                    ) : !proyectos || proyectos.length === 0 ? (
                        <DashboardEmptyState
                            icon={Briefcase}
                            title={t?.dashboard?.promoter?.proyectos?.empty?.title || "No tienes proyectos aún"}
                            description={
                                t?.dashboard?.promoter?.proyectos?.empty?.description ||
                                "Crea tu primer proyecto para empezar a buscar terrenos compatibles"
                            }
                            ctaText={t?.dashboard?.promoter?.proyectos?.empty?.cta || "Crear primer proyecto"}
                            ctaHref="/dashboard/promotor/nuevo-proyecto"
                            variant="secondary"
                        />
                    ) : proyectosFiltrados.length === 0 ? (
                        <div className="py-12 text-center">
                            <Filter className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-4 text-lg font-medium text-gray-600">
                                {t?.dashboard?.promoter?.proyectos?.filters?.noResults}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">{t?.dashboard?.promoter?.proyectos?.filters?.noResultsDesc}</p>
                            <button
                                onClick={() => {
                                    setSearchQuery("")
                                    setEstadoFilter("TODOS")
                                }}
                                className="text-secondary mt-4 hover:underline"
                            >
                                {t?.dashboard?.promoter?.proyectos?.filters?.clearFilters}
                            </button>
                        </div>
                    ) : viewMode === "list" ? (
                        // Vista Lista (horizontal)
                        <div className="space-y-4">
                            {proyectosFiltrados.map((proyecto) => (
                                <Card
                                    key={proyecto.id}
                                    className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:from-slate-900 dark:to-slate-800/50"
                                >
                                    <div className="flex items-center gap-6 p-6">
                                        {/* Contenido principal */}
                                        <div className="flex min-w-0 flex-1 flex-col gap-3">
                                            {/* Título y estado */}
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="truncate text-xl font-bold text-gray-900 dark:text-white">
                                                        {proyecto.titulo}
                                                    </h3>
                                                    <p className="text-secondary mt-1 text-sm font-medium">
                                                        {getTipoLabel(proyecto.tipo, t)}
                                                    </p>
                                                </div>
                                                <Badge className={getProyectoStateColor(proyecto.estado)}>
                                                    {getProyectoStateLabel(proyecto.estado, t)}
                                                </Badge>
                                            </div>

                                            {/* Descripción si existe */}
                                            {proyecto.descripcion && (
                                                <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                                                    {proyecto.descripcion}
                                                </p>
                                            )}

                                            {/* Información del proyecto */}
                                            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-secondary/10 flex h-9 w-9 items-center justify-center rounded-lg">
                                                        <Zap className="text-secondary h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">
                                                            {t?.dashboard?.promoter?.proyectos?.labels?.power}
                                                        </p>
                                                        <p className="font-semibold">{proyecto.potenciaObjetivo || "N/A"} MW</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <div className="bg-secondary/10 flex h-9 w-9 items-center justify-center rounded-lg">
                                                        <Layers className="text-secondary h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Superficie Mín.</p>
                                                        <p className="font-semibold">{proyecto.superficieMinima} ha</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <div className="bg-secondary/10 flex h-9 w-9 items-center justify-center rounded-lg">
                                                        <MapPin className="text-secondary h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">
                                                            {t?.dashboard?.promoter?.proyectos?.labels?.location}
                                                        </p>
                                                        <p className="font-semibold">{proyecto.provincia || "N/A"}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <div className="bg-secondary/10 flex h-9 w-9 items-center justify-center rounded-lg">
                                                        <Euro className="text-secondary h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">
                                                            {t?.dashboard?.promoter?.proyectos?.labels?.budget}
                                                        </p>
                                                        <p className="font-semibold">
                                                            {proyecto.presupuesto ? formatCurrency(proyecto.presupuesto) : "N/A"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <div className="bg-secondary/10 flex h-9 w-9 items-center justify-center rounded-lg">
                                                        <ShieldCheck className="text-secondary h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">
                                                            {t?.dashboard?.promoter?.proyectos?.labels?.matches}
                                                        </p>
                                                        <p className="font-semibold">0 terrenos</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Fecha de creación */}
                                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                <Calendar className="h-3.5 w-3.5" />
                                                <span>
                                                    {t?.dashboard?.promoter?.proyectos?.labels?.createdAt}{" "}
                                                    {proyecto.creadoEn ? new Date(proyecto.creadoEn).toLocaleDateString("es-ES") : "N/A"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Botón de acción */}
                                        <div className="flex-shrink-0">
                                            <Link href={`/dashboard/promotor/proyectos/${proyecto.id}`}>
                                                <Button className="bg-secondary hover:bg-secondary/90 whitespace-nowrap">
                                                    {t?.dashboard?.promoter?.proyectos?.labels?.viewDetails}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Efecto de brillo en hover */}
                                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                        <div className="from-secondary/5 via-secondary/10 absolute inset-0 bg-gradient-to-r to-transparent" />
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        // Vista Grid (vertical)
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                            {proyectosFiltrados.map((proyecto) => (
                                <Card
                                    key={proyecto.id}
                                    className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:from-slate-900 dark:to-slate-800/50"
                                >
                                    <div className="p-6">
                                        {/* Header */}
                                        <div className="mb-4 flex items-start justify-between gap-4">
                                            <div className="min-w-0 flex-1">
                                                <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 dark:text-white">
                                                    {proyecto.titulo}
                                                </h3>
                                                <p className="text-secondary truncate text-sm font-medium">
                                                    {getTipoLabel(proyecto.tipo, t)}
                                                </p>
                                            </div>
                                            <Badge className={getProyectoStateColor(proyecto.estado)}>
                                                {getProyectoStateLabel(proyecto.estado, t)}
                                            </Badge>
                                        </div>

                                        {/* Información principal */}
                                        <div className="mb-5 grid grid-cols-2 gap-3">
                                            <div className="flex items-center gap-2">
                                                <div className="bg-secondary/10 flex h-8 w-8 items-center justify-center rounded-lg">
                                                    <Zap className="text-secondary h-3.5 w-3.5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">
                                                        {t?.dashboard?.promoter?.proyectos?.labels?.power}
                                                    </p>
                                                    <p className="text-sm font-semibold">{proyecto.potenciaObjetivo} MW</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <div className="bg-secondary/10 flex h-8 w-8 items-center justify-center rounded-lg">
                                                    <MapPin className="text-secondary h-3.5 w-3.5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">
                                                        {t?.dashboard?.promoter?.proyectos?.labels?.location}
                                                    </p>
                                                    <p className="truncate text-sm font-semibold">{proyecto.provincia || "N/A"}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Presupuesto destacado */}
                                        <div className="from-secondary/10 to-secondary/5 mb-4 rounded-xl bg-gradient-to-r p-4 shadow-inner">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                                        {t?.dashboard?.promoter?.proyectos?.labels?.budget}
                                                    </p>
                                                    <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                                                        {proyecto.presupuesto ? formatCurrency(proyecto.presupuesto) : "N/A"}
                                                    </p>
                                                </div>
                                                <Euro className="text-secondary h-8 w-8 opacity-50" />
                                            </div>
                                        </div>

                                        {/* Fecha de creación */}
                                        <div className="mb-4 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span>
                                                {t?.dashboard?.promoter?.proyectos?.labels?.createdAt}{" "}
                                                {proyecto.creadoEn ? new Date(proyecto.creadoEn).toLocaleDateString("es-ES") : "N/A"}
                                            </span>
                                        </div>

                                        {/* Botón de acción */}
                                        <Link href={`/dashboard/promotor/proyectos/${proyecto.id}`} className="block">
                                            <Button className="bg-secondary hover:bg-secondary/90 w-full">
                                                {t?.dashboard?.promoter?.proyectos?.labels?.viewDetails}
                                            </Button>
                                        </Link>
                                    </div>

                                    {/* Efecto de brillo en hover */}
                                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                        <div className="from-secondary/5 via-secondary/10 absolute inset-0 bg-gradient-to-r to-transparent" />
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}
