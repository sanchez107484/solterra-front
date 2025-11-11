"use client"

import { StatsCard } from "@/components/dashboard"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProjectFilters } from "@/components/dashboard/project-filters"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useProyectos } from "@/hooks/useProyectos"
import { useTranslations } from "@/i18n/i18nContext"
import { ArrowUpDown, Battery, Briefcase, Building2, Eye, Leaf, MapPin, Sun, TrendingUp, Wind, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

const getProjectTypeIcon = (tipo: string) => {
    const iconClass = "h-4 w-4"
    switch (tipo?.toUpperCase()) {
        case "SOLAR_FOTOVOLTAICO":
        case "SOLAR":
            return <Sun className={`${iconClass} text-yellow-500`} />
        case "EOLICO":
        case "EÓLICO":
            return <Wind className={`${iconClass} text-blue-500`} />
        case "HIBRIDACION":
        case "HÍBRIDO":
            return <Zap className={`${iconClass} text-purple-500`} />
        case "ALMACENAMIENTO":
            return <Battery className={`${iconClass} text-green-500`} />
        case "HIDROGENO":
        case "BIOMETANO":
            return <Leaf className={`${iconClass} text-emerald-500`} />
        default:
            return <Building2 className={`${iconClass} text-gray-500`} />
    }
}

const getProjectTypeLabel = (tipo: string, t: any) => {
    const typeKey = tipo?.toUpperCase().replace("_", "")
    switch (typeKey) {
        case "SOLARFOTOVOLTAICO":
        case "SOLAR":
            return t?.dashboard?.owner?.projects?.allProjects?.types?.solar || "Solar"
        case "EOLICO":
            return t?.dashboard?.owner?.projects?.allProjects?.types?.eolico || "Eólico"
        case "HIBRIDACION":
        case "HÍBRIDO":
            return t?.dashboard?.owner?.projects?.allProjects?.types?.hibrido || "Híbrido"
        case "ALMACENAMIENTO":
            return t?.dashboard?.owner?.projects?.allProjects?.types?.almacenamiento || "Almacenamiento"
        case "HIDROGENO":
            return t?.dashboard?.owner?.projects?.allProjects?.types?.hidrogeno || "Hidrógeno"
        case "BIOMETANO":
            return t?.dashboard?.owner?.projects?.allProjects?.types?.biometano || "Biometano"
        default:
            return t?.dashboard?.owner?.projects?.allProjects?.types?.otro || tipo || "Otro"
    }
}

const getStatusColor = (estado: string) => {
    switch (estado?.toUpperCase()) {
        case "ACTIVO":
            return "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300"
        case "EN_DESARROLLO":
            return "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
        case "PAUSADO":
            return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300"
        case "COMPLETADO":
            return "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-300"
        case "EN_BUSQUEDA":
            return "bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-900 dark:text-orange-300"
        default:
            return "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300"
    }
}

const getStatusLabel = (estado: string, t: any) => {
    const statusKey = estado?.toUpperCase()
    switch (statusKey) {
        case "ACTIVO":
            return t?.dashboard?.owner?.projects?.allProjects?.status?.activo || "Activo"
        case "EN_DESARROLLO":
            return t?.dashboard?.owner?.projects?.allProjects?.status?.en_desarrollo || "En Desarrollo"
        case "PAUSADO":
            return t?.dashboard?.owner?.projects?.allProjects?.status?.pausado || "Pausado"
        case "COMPLETADO":
            return t?.dashboard?.owner?.projects?.allProjects?.status?.completado || "Completado"
        case "EN_BUSQUEDA":
            return t?.dashboard?.owner?.projects?.allProjects?.status?.en_busqueda || "En Búsqueda"
        default:
            return estado || "Desconocido"
    }
}

type SortField = "titulo" | "tipo" | "potenciaObjetivo" | "provincia" | "estado" | "promotor" | "creadoEn"
type SortOrder = "asc" | "desc"

export default function TodosProyectosPage() {
    const { t } = useTranslations()
    const { proyectos, isLoading, fetchProyectos } = useProyectos({ autoFetch: false })

    const [searchTerm, setSearchTerm] = useState("")
    const [tipoFilter, setTipoFilter] = useState<string>("TODOS")
    const [provinciaFilter, setProvinciaFilter] = useState<string>("TODOS")
    const [estadoFilter, setEstadoFilter] = useState<string>("TODOS")
    const [sortField, setSortField] = useState<SortField>("creadoEn")
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc")

    useEffect(() => {
        fetchProyectos()
    }, [fetchProyectos])

    // El backend ya filtra por estado ACTIVO, no necesitamos filtrar aquí
    const proyectosActivos = proyectos || []

    console.log("DEBUG - proyectos desde hook:", proyectos)
    console.log("DEBUG - proyectosActivos:", proyectosActivos)
    console.log("DEBUG - isLoading:", isLoading)

    const filteredAndSortedProyectos = useMemo(() => {
        let filtered = proyectosActivos

        // Aplicar filtros
        if (searchTerm) {
            filtered = filtered.filter(
                (p: any) =>
                    p.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.provincia?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.promotor?.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (tipoFilter !== "TODOS") {
            filtered = filtered.filter((p: any) => p.tipo?.toUpperCase() === tipoFilter)
        }

        if (provinciaFilter !== "TODOS") {
            filtered = filtered.filter((p: any) => p.provincia === provinciaFilter)
        }

        if (estadoFilter !== "TODOS") {
            filtered = filtered.filter((p: any) => p.estado?.toUpperCase() === estadoFilter)
        }

        // Aplicar ordenamiento
        const sorted = [...filtered].sort((a: any, b: any) => {
            let aValue = a[sortField]
            let bValue = b[sortField]

            // Manejo especial para campos anidados
            if (sortField === "creadoEn") {
                aValue = new Date(aValue).getTime()
                bValue = new Date(bValue).getTime()
            } else if (sortField === "promotor") {
                aValue = a.promotor?.nombre || a.promotor?.email || ""
                bValue = b.promotor?.nombre || b.promotor?.email || ""
            }

            if (aValue === null || aValue === undefined) return 1
            if (bValue === null || bValue === undefined) return -1

            if (typeof aValue === "string") {
                aValue = aValue.toLowerCase()
                bValue = bValue.toLowerCase()
            }

            if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
            if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
            return 0
        })

        return sorted
    }, [proyectosActivos, searchTerm, tipoFilter, provinciaFilter, estadoFilter, sortField, sortOrder])

    const provincias = Array.from(new Set(proyectosActivos.map((p: any) => p.provincia).filter(Boolean)))

    // Cálculos estadísticos
    const totalProyectos = proyectosActivos.length
    const potenciaTotal = proyectosActivos.reduce((sum: number, proyecto: any) => sum + (proyecto.potenciaObjetivo || 0), 0)
    const proyectosActivos_ = proyectosActivos.filter((p: any) => p.estado?.toUpperCase() === "ACTIVO").length
    const totalProvincias = provincias.length

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortOrder("asc")
        }
    }

    const handleClearFilters = () => {
        setSearchTerm("")
        setTipoFilter("TODOS")
        setProvinciaFilter("TODOS")
        setEstadoFilter("TODOS")
    }

    const SortIcon = ({ field }: { field: SortField }) => (
        <Button variant="ghost" size="sm" className="h-8 gap-1 px-2" onClick={() => handleSort(field)}>
            <ArrowUpDown className="h-3 w-3" />
            {sortField === field && <span className="text-xs">({sortOrder === "asc" ? "↑" : "↓"})</span>}
        </Button>
    )

    return (
        <>
            <DashboardHeader
                title={t?.dashboard?.owner?.projects?.allProjects?.title || "Proyectos Disponibles"}
                subtitle={t?.dashboard?.owner?.projects?.allProjects?.subtitle || "Explora proyectos de energía renovable"}
                breadcrumbs={[
                    { label: t?.dashboard?.breadcrumbs?.dashboard || "Dashboard", href: "/dashboard/propietario" },
                    { label: t?.dashboard?.owner?.projects?.allProjects?.title || "Proyectos disponibles" },
                ]}
                userType="propietario"
            />

            <main className="p-6">
                {/* Estadísticas generales */}
                <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        icon={Briefcase}
                        title="Total Proyectos"
                        value={totalProyectos.toString()}
                        subtitle="Disponibles en plataforma"
                        variant="primary"
                    />
                    <StatsCard
                        icon={Zap}
                        title="Potencia Total"
                        value={`${Math.round(potenciaTotal)}`}
                        subtitle="MW en desarrollo"
                        variant="secondary"
                    />
                    <StatsCard
                        icon={MapPin}
                        title="Provincias"
                        value={totalProvincias.toString()}
                        subtitle="Ubicaciones disponibles"
                        variant="primary"
                    />
                    <StatsCard
                        icon={TrendingUp}
                        title="Mostrando"
                        value={filteredAndSortedProyectos.length.toString()}
                        subtitle="Proyectos filtrados"
                        variant="secondary"
                    />
                </div>

                <ProjectFilters
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    tipoFilter={tipoFilter}
                    onTipoChange={setTipoFilter}
                    provinciaFilter={provinciaFilter}
                    onProvinciaChange={setProvinciaFilter}
                    estadoFilter={estadoFilter}
                    onEstadoChange={setEstadoFilter}
                    provincias={provincias}
                    onClearFilters={handleClearFilters}
                    showEstadoFilter={true}
                    translations={{
                        searchPlaceholder: t?.dashboard?.owner?.projects?.allProjects?.searchPlaceholder || "Buscar...",
                        allTypes: t?.dashboard?.owner?.projects?.allProjects?.filters?.allTypes || "Todos los tipos",
                        allProvinces: t?.dashboard?.owner?.projects?.allProjects?.filters?.allProvinces || "Todas las provincias",
                        allStatuses: t?.dashboard?.owner?.projects?.allProjects?.filters?.allStatuses || "Todos los estados",
                        clearFilters: t?.dashboard?.owner?.projects?.allProjects?.filters?.clearFilters || "Limpiar filtros",
                        moreFilters: t?.dashboard?.owner?.projects?.allProjects?.filters?.moreFilters || "Más filtros",
                        filterTitle: t?.dashboard?.owner?.projects?.allProjects?.filters?.title || "Filtros de búsqueda",
                        filterSubtitle:
                            t?.dashboard?.owner?.projects?.allProjects?.filters?.subtitle ||
                            "Refina tu búsqueda para encontrar proyectos específicos",
                        projectTypeLabel: t?.dashboard?.owner?.projects?.allProjects?.filters?.projectTypeLabel || "Tipo de proyecto",
                        provinceLabel: t?.dashboard?.owner?.projects?.allProjects?.filters?.provinceLabel || "Provincia",
                        statusLabel: t?.dashboard?.owner?.projects?.allProjects?.filters?.statusLabel || "Estado",
                        types: {
                            solar: t?.dashboard?.owner?.projects?.allProjects?.types?.solar || "Solar",
                            eolico: t?.dashboard?.owner?.projects?.allProjects?.types?.eolico || "Eólico",
                            hibrido: t?.dashboard?.owner?.projects?.allProjects?.types?.hibrido || "Híbrido",
                            almacenamiento: t?.dashboard?.owner?.projects?.allProjects?.types?.almacenamiento || "Almacenamiento",
                        },
                        statuses: {
                            activo: t?.dashboard?.owner?.projects?.allProjects?.status?.activo || "Activo",
                            en_desarrollo: t?.dashboard?.owner?.projects?.allProjects?.status?.en_desarrollo || "En Desarrollo",
                            pausado: t?.dashboard?.owner?.projects?.allProjects?.status?.pausado || "Pausado",
                        },
                    }}
                />

                {/* Contador de resultados */}
                <div className="text-muted-foreground mb-4 text-sm">
                    {t?.dashboard?.owner?.projects?.allProjects?.table?.showing
                        ?.replace("{count}", filteredAndSortedProyectos.length.toString())
                        .replace("{total}", proyectosActivos.length.toString()) ||
                        `Mostrando ${filteredAndSortedProyectos.length} de ${proyectosActivos.length} proyectos`}
                </div>

                {isLoading ? (
                    <Card className="p-12">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="border-t-primary h-8 w-8 animate-spin rounded-full border-4 border-gray-300" />
                            <p className="text-muted-foreground text-sm">
                                {t?.dashboard?.owner?.projects?.allProjects?.table?.loading || "Cargando proyectos..."}
                            </p>
                        </div>
                    </Card>
                ) : filteredAndSortedProyectos.length > 0 ? (
                    <Card className="overflow-hidden p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="from-primary/5 via-accent/5 hover:from-primary/10 hover:via-accent/10 h-14 bg-gradient-to-r to-transparent">
                                        <TableHead className="min-w-[250px] px-4">
                                            <div className="flex items-center gap-1">
                                                {t?.dashboard?.owner?.projects?.allProjects?.table?.project || "Proyecto"}
                                                <SortIcon field="titulo" />
                                            </div>
                                        </TableHead>
                                        <TableHead className="px-4">
                                            <div className="flex items-center gap-1">
                                                {t?.dashboard?.owner?.projects?.allProjects?.table?.type || "Tipo"}
                                                <SortIcon field="tipo" />
                                            </div>
                                        </TableHead>
                                        <TableHead className="px-4">
                                            <div className="flex items-center gap-1">
                                                {t?.dashboard?.owner?.projects?.allProjects?.table?.power || "Potencia"}
                                                <SortIcon field="potenciaObjetivo" />
                                            </div>
                                        </TableHead>
                                        <TableHead className="px-4">
                                            <div className="flex items-center gap-1">
                                                {t?.dashboard?.owner?.projects?.allProjects?.table?.location || "Ubicación"}
                                                <SortIcon field="provincia" />
                                            </div>
                                        </TableHead>
                                        <TableHead className="px-4">
                                            <div className="flex items-center gap-1">
                                                {t?.dashboard?.owner?.projects?.allProjects?.table?.status || "Estado"}
                                                <SortIcon field="estado" />
                                            </div>
                                        </TableHead>
                                        <TableHead className="px-4">
                                            <div className="flex items-center gap-1">
                                                {t?.dashboard?.owner?.projects?.allProjects?.table?.promoter || "Promotor"}
                                                <SortIcon field="promotor" />
                                            </div>
                                        </TableHead>
                                        <TableHead className="px-4 text-right">
                                            {t?.dashboard?.owner?.projects?.allProjects?.table?.actions || "Acciones"}
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredAndSortedProyectos.map((proyecto: any) => (
                                        <TableRow key={proyecto.id} className="hover:bg-muted/50 h-20">
                                            <TableCell className="px-4 py-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="from-primary/10 to-accent/10 flex-shrink-0 rounded-lg bg-gradient-to-br p-2">
                                                        {getProjectTypeIcon(proyecto.tipo)}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="text-foreground font-medium">{proyecto.titulo}</div>
                                                        {proyecto.descripcion && (
                                                            <div className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                                                                {proyecto.descripcion}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium">{getProjectTypeLabel(proyecto.tipo, t)}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                {proyecto.potenciaObjetivo ? (
                                                    <div className="flex items-center gap-1.5 text-sm">
                                                        <div className="rounded-full bg-purple-100 p-1 dark:bg-purple-900/30">
                                                            <TrendingUp className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                                                        </div>
                                                        <span className="font-medium">{proyecto.potenciaObjetivo}</span>
                                                        <span className="text-muted-foreground">MW</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground text-sm">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                {proyecto.provincia ? (
                                                    <div className="flex items-center gap-1.5 text-sm">
                                                        <div className="rounded-full bg-red-100 p-1 dark:bg-red-900/30">
                                                            <MapPin className="h-3 w-3 text-red-600 dark:text-red-400" />
                                                        </div>
                                                        <span className="font-medium">{proyecto.provincia}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground text-sm">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                <Badge className={`${getStatusColor(proyecto.estado)}`}>
                                                    {getStatusLabel(proyecto.estado, t)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <div className="rounded-full bg-blue-100 p-1 dark:bg-blue-900/30">
                                                        <Briefcase className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                                    </div>
                                                    <span className="truncate font-medium">
                                                        {proyecto.promotor?.nombre || proyecto.promotor?.email || "-"}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-4 text-right">
                                                <Link href={`/dashboard/propietario/proyectos/${proyecto.id}`}>
                                                    <Button variant="default" size="sm" className="gap-2">
                                                        <Eye className="h-3.5 w-3.5" />
                                                        {t?.dashboard?.owner?.projects?.viewDetails || "Ver detalles"}
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                ) : (
                    <Card className="p-12">
                        <div className="text-center">
                            <Briefcase className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                            <h3 className="mb-2 text-lg font-semibold">
                                {t?.dashboard?.owner?.projects?.allProjects?.table?.noResults || "No se encontraron proyectos"}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                {searchTerm || tipoFilter !== "TODOS" || provinciaFilter !== "TODOS" || estadoFilter !== "TODOS"
                                    ? t?.dashboard?.owner?.projects?.allProjects?.table?.noResultsDesc ||
                                      "Intenta ajustar los filtros de búsqueda"
                                    : "No hay proyectos disponibles en este momento"}
                            </p>
                        </div>
                    </Card>
                )}
            </main>
        </>
    )
}
