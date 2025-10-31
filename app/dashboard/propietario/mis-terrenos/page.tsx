"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { useTerrenos } from "@/hooks/useTerrenos"
import { useTranslations } from "@/i18n/i18nContext"
import { Calendar, CheckCheck, Euro, Eye, Filter, Grid3x3, Landmark, List, MapPin, Ruler, Search, ShieldCheck, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

type ViewMode = "list" | "grid"

const getTerrenoStateColor = (estado: string) => {
    switch (estado?.toUpperCase()) {
        case "ACTIVO":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        case "VENDIDO":
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        case "PAUSADO":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
        case "BORRADOR":
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
        case "PENDIENTE_REVISION":
            return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
}

const getTerrenoStateLabel = (estado: string | undefined, t: any) => {
    console.log("Estado terreno:", estado)

    const states = t?.dashboard?.owner?.terrenos?.states || {}
    const fallback = t?.common?.none || "N/A"

    switch (estado?.toUpperCase()) {
        case "ACTIVO":
            return states.activo || fallback
        case "VENDIDO":
            return states.vendido || fallback
        case "PAUSADO":
            return states.pausado || fallback
        case "BORRADOR":
            return states.borrador || fallback
        case "PENDIENTE_REVISION":
            return states.pendienteRevision || fallback
        default:
            return fallback
    }
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)
}

export default function MisTerrenosPage() {
    const { t } = useTranslations()
    const { terrenos, fetchMine, isLoading } = useTerrenos({ autoFetch: false })
    const [viewMode, setViewMode] = useState<ViewMode>("list")
    const [searchQuery, setSearchQuery] = useState("")
    const [estadoFilter, setEstadoFilter] = useState<string>("TODOS")

    useEffect(() => {
        fetchMine()
    }, [fetchMine])

    // Filtrar terrenos
    const terrenosFiltrados = useMemo(() => {
        if (!terrenos) return []

        return terrenos.filter((terreno) => {
            // Filtro por búsqueda
            const matchesSearch =
                searchQuery === "" ||
                terreno.titulo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                terreno.municipio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                terreno.descripcion?.toLowerCase().includes(searchQuery.toLowerCase())

            // Filtro por estado
            const matchesEstado = estadoFilter === "TODOS" || terreno.estado === estadoFilter

            return matchesSearch && matchesEstado
        })
    }, [terrenos, searchQuery, estadoFilter])

    // Calcular estadísticas (basadas en terrenos filtrados)
    const totalTerrenos = terrenosFiltrados?.length || 0
    const terrenosActivos = terrenosFiltrados?.filter((t) => t.estado === "ACTIVO").length || 0
    const terrenosVendidos = terrenosFiltrados?.filter((t) => t.estado === "VENDIDO").length || 0
    const valorTotal = terrenosFiltrados?.reduce((sum, t) => sum + (t.precioVenta || 0), 0) || 0

    return (
        <>
            <DashboardHeader
                title={t?.dashboard?.owner?.terrenos?.title}
                breadcrumbs={[
                    { label: t?.dashboard?.breadcrumbs?.dashboard, href: "/dashboard/propietario" },
                    { label: t?.dashboard?.owner?.terrenos?.title },
                ]}
                userType="propietario"
            />
            <main className="mx-auto max-w-[1600px] p-6">
                {/* Estadísticas */}
                <div className="space-y-8">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="p-6 transition-all hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">
                                        {t?.dashboard?.owner?.terrenos?.stats?.total}
                                    </p>
                                    <p className="mt-2 text-3xl font-bold">{totalTerrenos}</p>
                                </div>
                                <div className="bg-primary/10 rounded-full p-3">
                                    <MapPin className="text-primary h-6 w-6" />
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 transition-all hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">
                                        {t?.dashboard?.owner?.terrenos?.stats?.active}
                                    </p>
                                    <p className="mt-2 text-3xl font-bold">{terrenosActivos}</p>
                                </div>
                                <div className="bg-secondary/10 rounded-full p-3">
                                    <ShieldCheck className="text-secondary h-6 w-6" />
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 transition-all hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">
                                        {t?.dashboard?.owner?.terrenos?.stats?.sold}
                                    </p>
                                    <p className="mt-2 text-3xl font-bold">{terrenosVendidos}</p>
                                </div>
                                <div className="bg-primary/10 rounded-full p-3">
                                    <CheckCheck className="text-primary h-6 w-6" />
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 transition-all hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">
                                        {t?.dashboard?.owner?.terrenos?.stats?.totalValue}
                                    </p>
                                    <p className="mt-2 text-3xl font-bold">{formatCurrency(valorTotal)}</p>
                                </div>
                                <div className="bg-secondary/10 rounded-full p-3">
                                    <Euro className="text-secondary h-6 w-6" />
                                </div>
                            </div>
                        </Card>
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
                                    placeholder="Buscar por título, municipio o descripción..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="focus:ring-primary w-full rounded-lg border py-2 pr-10 pl-10 focus:ring-2 focus:outline-none"
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
                                    {["TODOS", "ACTIVO", "VENDIDO", "PAUSADO", "BORRADOR", "PENDIENTE_REVISION"].map((estado) => (
                                        <button
                                            key={estado}
                                            onClick={() => setEstadoFilter(estado)}
                                            className={`rounded-full px-3 py-1 text-sm transition-colors ${
                                                estadoFilter === estado
                                                    ? "bg-primary text-white"
                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                        >
                                            {estado === "TODOS"
                                                ? "Todos"
                                                : estado.charAt(0) + estado.slice(1).toLowerCase().replace("_", " ")}
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
                                    viewMode === "list" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                                title="Vista de lista"
                            >
                                <List className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`rounded-lg p-2 transition-colors ${
                                    viewMode === "grid" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                                title="Vista de cuadrícula"
                            >
                                <Grid3x3 className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Lista de terrenos */}
                    {isLoading ? (
                        <div className="py-12 text-center">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-gray-600">{t?.common?.loading}</p>
                        </div>
                    ) : !terrenos || terrenos.length === 0 ? (
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia>
                                    <Landmark className="h-16 w-16 text-gray-400" />
                                </EmptyMedia>
                                <EmptyTitle>{t?.dashboard?.owner?.terrenos?.empty?.title}</EmptyTitle>
                                <EmptyDescription>{t?.dashboard?.owner?.terrenos?.empty?.description}</EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <Link href="/dashboard/propietario/nuevo-terreno">
                                    <Button>{t?.dashboard?.owner?.terrenos?.empty?.action}</Button>
                                </Link>
                            </EmptyContent>
                        </Empty>
                    ) : terrenosFiltrados.length === 0 ? (
                        <div className="py-12 text-center">
                            <Filter className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-4 text-lg font-medium text-gray-600">No se encontraron terrenos</p>
                            <p className="mt-1 text-sm text-gray-500">Intenta ajustar los filtros de búsqueda</p>
                            <button
                                onClick={() => {
                                    setSearchQuery("")
                                    setEstadoFilter("TODOS")
                                }}
                                className="text-primary mt-4 hover:underline"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    ) : viewMode === "list" ? (
                        // Vista Lista (horizontal)
                        <div className="space-y-4">
                            {terrenosFiltrados.map((terreno) => (
                                <Card
                                    key={terreno.id}
                                    className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:from-slate-900 dark:to-slate-800/50"
                                >
                                    <div className="flex items-center gap-6 p-6">
                                        {/* Sección izquierda: Título y badges */}
                                        <div className="flex min-w-0 flex-1 flex-col gap-3">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="mb-2 truncate text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                        {terreno.titulo}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <Badge className={`${getTerrenoStateColor(terreno.estado)} shadow-sm`}>
                                                            {getTerrenoStateLabel(terreno.estado, t)}
                                                        </Badge>
                                                        {(terreno.matchCount ??
                                                            (Array.isArray(terreno.matches) ? terreno.matches.length : 0)) > 0 && (
                                                            <div className="bg-accent/90 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                                                                <CheckCheck className="h-3 w-3" />
                                                                <span>
                                                                    {terreno.matchCount ??
                                                                        (Array.isArray(terreno.matches) ? terreno.matches.length : 0)}{" "}
                                                                    matches
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Grid de información compacto */}
                                            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                                <div className="bg-primary/5 group-hover:bg-primary/10 flex items-center gap-2 rounded-lg px-3 py-2 transition-colors">
                                                    <div className="bg-primary/10 rounded-full p-1.5">
                                                        <MapPin className="text-primary h-3.5 w-3.5" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-xs font-medium text-gray-500 dark:text-gray-400">
                                                            Ubicación
                                                        </p>
                                                        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                                                            {terreno.municipio}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="bg-secondary/5 group-hover:bg-secondary/10 flex items-center gap-2 rounded-lg px-3 py-2 transition-colors">
                                                    <div className="bg-secondary/10 rounded-full p-1.5">
                                                        <Ruler className="text-secondary h-3.5 w-3.5" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-xs font-medium text-gray-500 dark:text-gray-400">
                                                            Superficie
                                                        </p>
                                                        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                                                            {terreno.superficie?.toLocaleString()} ha
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="from-primary/10 to-accent/10 flex items-center gap-2 rounded-lg bg-gradient-to-r px-3 py-2">
                                                    <div className="rounded-full bg-white/60 p-1.5 dark:bg-slate-800/60">
                                                        <Euro className="text-primary dark:text-accent h-3.5 w-3.5" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-xs font-medium text-gray-600 dark:text-gray-400">
                                                            Precio
                                                        </p>
                                                        <p className="text-primary dark:text-accent truncate text-sm font-bold">
                                                            {terreno.precioVenta ? formatCurrency(terreno.precioVenta) : "Sin especificar"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 dark:bg-slate-800/50">
                                                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-xs font-medium text-gray-500 dark:text-gray-400">
                                                            Creado
                                                        </p>
                                                        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                                                            {new Date(terreno.creadoEn).toLocaleDateString("es-ES", {
                                                                day: "numeric",
                                                                month: "short",
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Descripción opcional */}
                                            {terreno.descripcion && (
                                                <p className="line-clamp-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                                    {terreno.descripcion}
                                                </p>
                                            )}
                                        </div>

                                        {/* CTA a la derecha */}
                                        <div className="flex-shrink-0">
                                            <Link href={`/dashboard/propietario/mis-terrenos/${terreno.id}`}>
                                                <Button
                                                    variant="default"
                                                    size="default"
                                                    className="from-primary to-accent hover:shadow-primary/20 bg-gradient-to-r font-semibold shadow-md transition-all duration-300 hover:shadow-lg"
                                                >
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    {t?.common?.viewDetails}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Efecto de brillo en hover */}
                                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                        <div className="from-primary/5 via-accent/5 absolute inset-0 bg-gradient-to-r to-transparent" />
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        // Vista Grid (vertical)
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                            {terrenosFiltrados.map((terreno) => (
                                <Card
                                    key={terreno.id}
                                    className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:from-slate-900 dark:to-slate-800/50"
                                >
                                    <div className="p-6">
                                        {/* Título prominente */}
                                        <div className="mb-4 flex items-start justify-between gap-4">
                                            <div className="min-w-0 flex-1">
                                                <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                    {terreno.titulo}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <Badge className={`${getTerrenoStateColor(terreno.estado)} shadow-sm`}>
                                                        {getTerrenoStateLabel(terreno.estado, t)}
                                                    </Badge>
                                                    {(terreno.matchCount ?? (Array.isArray(terreno.matches) ? terreno.matches.length : 0)) >
                                                        0 && (
                                                        <div className="bg-accent/90 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                                                            <CheckCheck className="h-3 w-3" />
                                                            <span>
                                                                {terreno.matchCount ??
                                                                    (Array.isArray(terreno.matches) ? terreno.matches.length : 0)}{" "}
                                                                matches
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Grid de información clave con iconos destacados */}
                                        <div className="mb-5 grid grid-cols-2 gap-3">
                                            <div className="bg-primary/5 group-hover:bg-primary/10 flex items-center gap-2 rounded-lg p-3 transition-colors">
                                                <div className="bg-primary/10 rounded-full p-2">
                                                    <MapPin className="text-primary h-4 w-4" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-xs font-medium text-gray-500 dark:text-gray-400">
                                                        Ubicación
                                                    </p>
                                                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                                                        {terreno.municipio}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="bg-secondary/5 group-hover:bg-secondary/10 flex items-center gap-2 rounded-lg p-3 transition-colors">
                                                <div className="bg-secondary/10 rounded-full p-2">
                                                    <Ruler className="text-secondary h-4 w-4" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-xs font-medium text-gray-500 dark:text-gray-400">
                                                        Superficie
                                                    </p>
                                                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                                                        {terreno.superficie?.toLocaleString()} ha
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Precio destacado - siempre visible */}
                                        <div className="from-primary/10 to-accent/10 mb-4 rounded-xl bg-gradient-to-r p-4 shadow-inner">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Precio de venta</p>
                                                    <p className="text-primary dark:text-accent mt-1 text-2xl font-bold">
                                                        {terreno.precioVenta ? formatCurrency(terreno.precioVenta) : "Sin especificar"}
                                                    </p>
                                                </div>
                                                <div className="rounded-full bg-white/80 p-3 shadow-sm dark:bg-slate-800/80">
                                                    <Euro className="text-primary dark:text-accent h-6 w-6" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Descripción con fade */}
                                        {terreno.descripcion && (
                                            <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                                {terreno.descripcion}
                                            </p>
                                        )}

                                        {/* Metadata secundaria */}
                                        <div className="mb-4 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span>Creado el {new Date(terreno.creadoEn).toLocaleDateString()}</span>
                                        </div>

                                        {/* CTA mejorado */}
                                        <Link href={`/dashboard/propietario/mis-terrenos/${terreno.id}`} className="block">
                                            <Button
                                                variant="default"
                                                size="sm"
                                                className="from-primary to-accent hover:shadow-primary/20 w-full bg-gradient-to-r font-semibold shadow-md transition-all duration-300 hover:shadow-lg"
                                            >
                                                <Eye className="mr-2 h-4 w-4" />
                                                {t?.common?.viewDetails}
                                            </Button>
                                        </Link>
                                    </div>

                                    {/* Efecto de brillo en hover */}
                                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                        <div className="from-primary/5 via-accent/5 absolute inset-0 bg-gradient-to-r to-transparent" />
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
