"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useProyectos } from "@/hooks/useProyectos"
import { useTranslations } from "@/i18n/i18nContext"
import { ArrowUpDown, Battery, Building2, Euro, Eye, Filter, Leaf, MapPin, Search, Sun, TrendingUp, Wind, X, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

const getProjectTypeIcon = (tipo: string) => {
    switch (tipo?.toUpperCase()) {
        case "SOLAR_FOTOVOLTAICO":
        case "SOLAR":
            return <Sun className="h-4 w-4" />
        case "EOLICO":
        case "EÓLICO":
            return <Wind className="h-4 w-4" />
        case "HIBRIDACION":
        case "HÍBRIDO":
            return <Zap className="h-4 w-4" />
        case "ALMACENAMIENTO":
            return <Battery className="h-4 w-4" />
        case "HIDROGENO":
        case "BIOMETANO":
            return <Leaf className="h-4 w-4" />
        default:
            return <Building2 className="h-4 w-4" />
    }
}

const getProjectTypeLabel = (tipo: string) => {
    switch (tipo?.toUpperCase()) {
        case "SOLAR_FOTOVOLTAICO":
        case "SOLAR":
            return "Solar Fotovoltaico"
        case "EOLICO":
        case "EÓLICO":
            return "Eólico"
        case "HIBRIDACION":
        case "HÍBRIDO":
            return "Hibridación"
        case "ALMACENAMIENTO":
            return "Almacenamiento"
        case "HIDROGENO":
            return "Hidrógeno Verde"
        case "BIOMETANO":
            return "Biometano"
        default:
            return tipo || "Otro"
    }
}

const getStatusColor = (estado: string) => {
    switch (estado?.toUpperCase()) {
        case "ACTIVO":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        case "EN_DESARROLLO":
            return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
        case "PAUSADO":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
        case "COMPLETADO":
            return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
        case "EN_BUSQUEDA":
            return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
}

const getStatusLabel = (estado: string) => {
    switch (estado?.toUpperCase()) {
        case "ACTIVO":
            return "Activo"
        case "EN_DESARROLLO":
            return "En Desarrollo"
        case "PAUSADO":
            return "Pausado"
        case "COMPLETADO":
            return "Completado"
        case "EN_BUSQUEDA":
            return "En Búsqueda"
        default:
            return estado || "Desconocido"
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

export default function TodosProyectosPage() {
    const { t } = useTranslations()
    const { proyectos, isLoading } = useProyectos({ autoFetch: true })

    // Filter states
    const [searchTerm, setSearchTerm] = useState("")
    const [tipoFilter, setTipoFilter] = useState<string>("all")
    const [provinciaFilter, setProvinciaFilter] = useState<string>("all")
    const [estadoFilter, setEstadoFilter] = useState<string>("all")
    const [potenciaMin, setPotenciaMin] = useState<string>("")
    const [potenciaMax, setPotenciaMax] = useState<string>("")
    const [presupuestoMin, setPresupuestoMin] = useState<string>("")
    const [presupuestoMax, setPresupuestoMax] = useState<string>("")

    // Sorting & pagination
    const [sortBy, setSortBy] = useState<string>("creadoEn")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    // Extract unique values for filters
    const uniqueProvincias = useMemo(() => {
        if (!proyectos || !Array.isArray(proyectos)) return []
        const provincias = new Set(proyectos.map((p) => p.provincia).filter(Boolean))
        return Array.from(provincias).sort()
    }, [proyectos])

    const uniqueTipos = useMemo(() => {
        if (!proyectos || !Array.isArray(proyectos)) return []
        const tipos = new Set(proyectos.map((p) => p.tipo).filter(Boolean))
        return Array.from(tipos).sort()
    }, [proyectos])

    // Filtered and sorted data
    const filteredProyectos = useMemo(() => {
        if (!proyectos || !Array.isArray(proyectos)) return []
        let filtered = proyectos

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(
                (p) =>
                    p.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.provincia?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Tipo filter
        if (tipoFilter !== "all") {
            filtered = filtered.filter((p) => p.tipo === tipoFilter)
        }

        // Provincia filter
        if (provinciaFilter !== "all") {
            filtered = filtered.filter((p) => p.provincia === provinciaFilter)
        }

        // Estado filter
        if (estadoFilter !== "all") {
            filtered = filtered.filter((p) => p.estado === estadoFilter)
        }

        // Potencia range
        if (potenciaMin) {
            filtered = filtered.filter((p) => (p.potenciaObjetivo || 0) >= parseFloat(potenciaMin))
        }
        if (potenciaMax) {
            filtered = filtered.filter((p) => (p.potenciaObjetivo || 0) <= parseFloat(potenciaMax))
        }

        // Presupuesto range
        if (presupuestoMin) {
            filtered = filtered.filter((p) => (p.presupuesto || 0) >= parseFloat(presupuestoMin))
        }
        if (presupuestoMax) {
            filtered = filtered.filter((p) => (p.presupuesto || 0) <= parseFloat(presupuestoMax))
        }

        // Sorting
        filtered.sort((a, b) => {
            let aVal: any, bVal: any

            switch (sortBy) {
                case "titulo":
                    aVal = a.titulo || ""
                    bVal = b.titulo || ""
                    break
                case "tipo":
                    aVal = a.tipo || ""
                    bVal = b.tipo || ""
                    break
                case "potenciaObjetivo":
                    aVal = a.potenciaObjetivo || 0
                    bVal = b.potenciaObjetivo || 0
                    break
                case "presupuesto":
                    aVal = a.presupuesto || 0
                    bVal = b.presupuesto || 0
                    break
                case "creadoEn":
                default:
                    aVal = new Date(a.creadoEn || 0).getTime()
                    bVal = new Date(b.creadoEn || 0).getTime()
                    break
            }

            if (typeof aVal === "string") {
                return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
            } else {
                return sortOrder === "asc" ? aVal - bVal : bVal - aVal
            }
        })

        return filtered
    }, [
        proyectos,
        searchTerm,
        tipoFilter,
        provinciaFilter,
        estadoFilter,
        potenciaMin,
        potenciaMax,
        presupuestoMin,
        presupuestoMax,
        sortBy,
        sortOrder,
    ])

    // Pagination
    const totalPages = Math.ceil(filteredProyectos.length / itemsPerPage)
    const paginatedProyectos = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return filteredProyectos.slice(startIndex, startIndex + itemsPerPage)
    }, [filteredProyectos, currentPage])

    // Summary stats
    const stats = useMemo(() => {
        return {
            total: filteredProyectos.length,
            activos: filteredProyectos.filter((p) => p.estado === "ACTIVO").length,
            potenciaTotal: filteredProyectos.reduce((sum, p) => sum + (p.potenciaObjetivo || 0), 0),
            inversionPromedio:
                filteredProyectos.length > 0
                    ? filteredProyectos.reduce((sum, p) => sum + (p.presupuesto || 0), 0) / filteredProyectos.length
                    : 0,
        }
    }, [filteredProyectos])

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        } else {
            setSortBy(column)
            setSortOrder("asc")
        }
    }

    const clearFilters = () => {
        setSearchTerm("")
        setTipoFilter("all")
        setProvinciaFilter("all")
        setEstadoFilter("all")
        setPotenciaMin("")
        setPotenciaMax("")
        setPresupuestoMin("")
        setPresupuestoMax("")
        setCurrentPage(1)
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, tipoFilter, provinciaFilter, estadoFilter, potenciaMin, potenciaMax, presupuestoMin, presupuestoMax])

    return (
        <>
            <DashboardHeader
                title="Todos los Proyectos"
                breadcrumbs={[
                    {
                        label: t?.dashboard?.breadcrumbs?.dashboard || "Dashboard",
                        href: "/dashboard/propietario",
                    },
                    { label: "Todos los Proyectos" },
                ]}
                userType="propietario"
            />
            <main className="flex-1 p-6">
                {/* Summary Stats */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Proyectos</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                            </div>
                            <Building2 className="h-8 w-8 text-blue-600" />
                        </div>
                    </Card>

                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Activos</p>
                                <p className="text-2xl font-bold text-green-600">{stats.activos}</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-600" />
                        </div>
                    </Card>

                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Potencia Total</p>
                                <p className="text-2xl font-bold text-yellow-600">{stats.potenciaTotal.toFixed(0)} MW</p>
                            </div>
                            <Zap className="h-8 w-8 text-yellow-600" />
                        </div>
                    </Card>

                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Inversión Promedio</p>
                                <p className="text-2xl font-bold text-purple-600">€{(stats.inversionPromedio / 1000000).toFixed(1)}M</p>
                            </div>
                            <Euro className="h-8 w-8 text-purple-600" />
                        </div>
                    </Card>
                </div>

                {/* Filters Section */}
                <Card className="mb-6 p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5 text-gray-600" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filtros</h2>
                        </div>
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-600 hover:text-gray-900">
                            <X className="mr-1 h-4 w-4" />
                            Limpiar
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {/* Search */}
                        <div className="lg:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Buscar</label>
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Título, descripción, provincia..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Tipo */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de Proyecto</label>
                            <Select value={tipoFilter} onValueChange={setTipoFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Todos" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    {uniqueTipos.map((tipo) => (
                                        <SelectItem key={tipo} value={tipo}>
                                            {getProjectTypeLabel(tipo)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Provincia */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Provincia</label>
                            <Select value={provinciaFilter} onValueChange={setProvinciaFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Todas" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas</SelectItem>
                                    {uniqueProvincias.map((prov) => (
                                        <SelectItem key={prov || "unknown"} value={prov || ""}>
                                            {prov}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Estado */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
                            <Select value={estadoFilter} onValueChange={setEstadoFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Todos" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    <SelectItem value="ACTIVO">Activo</SelectItem>
                                    <SelectItem value="EN_DESARROLLO">En Desarrollo</SelectItem>
                                    <SelectItem value="EN_BUSQUEDA">En Búsqueda</SelectItem>
                                    <SelectItem value="PAUSADO">Pausado</SelectItem>
                                    <SelectItem value="COMPLETADO">Completado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Potencia Min */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Potencia Mín (MW)</label>
                            <Input
                                type="number"
                                placeholder="Ej: 10"
                                value={potenciaMin}
                                onChange={(e) => setPotenciaMin(e.target.value)}
                            />
                        </div>

                        {/* Potencia Max */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Potencia Máx (MW)</label>
                            <Input
                                type="number"
                                placeholder="Ej: 100"
                                value={potenciaMax}
                                onChange={(e) => setPotenciaMax(e.target.value)}
                            />
                        </div>

                        {/* Presupuesto Min */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Presupuesto Mín (€)</label>
                            <Input
                                type="number"
                                placeholder="Ej: 1000000"
                                value={presupuestoMin}
                                onChange={(e) => setPresupuestoMin(e.target.value)}
                            />
                        </div>

                        {/* Presupuesto Max */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Presupuesto Máx (€)</label>
                            <Input
                                type="number"
                                placeholder="Ej: 50000000"
                                value={presupuestoMax}
                                onChange={(e) => setPresupuestoMax(e.target.value)}
                            />
                        </div>
                    </div>
                </Card>

                {/* Table Section */}
                <Card>
                    {isLoading ? (
                        <div className="py-12 text-center">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-gray-600">{t?.common?.loading || "Cargando..."}</p>
                        </div>
                    ) : filteredProyectos.length === 0 ? (
                        <div className="py-12 text-center">
                            <Building2 className="mx-auto h-16 w-16 text-gray-400" />
                            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No se encontraron proyectos</h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Intenta ajustar los filtros para ver más resultados
                            </p>
                        </div>
                    ) : (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead
                                            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                                            onClick={() => handleSort("titulo")}
                                        >
                                            <div className="flex items-center gap-1">
                                                Título
                                                <ArrowUpDown className="h-4 w-4" />
                                            </div>
                                        </TableHead>
                                        <TableHead
                                            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                                            onClick={() => handleSort("tipo")}
                                        >
                                            <div className="flex items-center gap-1">
                                                Tipo
                                                <ArrowUpDown className="h-4 w-4" />
                                            </div>
                                        </TableHead>
                                        <TableHead
                                            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                                            onClick={() => handleSort("potenciaObjetivo")}
                                        >
                                            <div className="flex items-center gap-1">
                                                Potencia
                                                <ArrowUpDown className="h-4 w-4" />
                                            </div>
                                        </TableHead>
                                        <TableHead>Ubicación</TableHead>
                                        <TableHead
                                            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                                            onClick={() => handleSort("presupuesto")}
                                        >
                                            <div className="flex items-center gap-1">
                                                Presupuesto
                                                <ArrowUpDown className="h-4 w-4" />
                                            </div>
                                        </TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead>Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedProyectos.map((proyecto) => (
                                        <TableRow key={proyecto.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    {getProjectTypeIcon(proyecto.tipo)}
                                                    {proyecto.titulo}
                                                </div>
                                            </TableCell>
                                            <TableCell>{getProjectTypeLabel(proyecto.tipo)}</TableCell>
                                            <TableCell>{proyecto.potenciaObjetivo ? `${proyecto.potenciaObjetivo} MW` : "-"}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 text-sm">
                                                    <MapPin className="h-3 w-3 text-gray-400" />
                                                    {proyecto.provincia || "-"}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {proyecto.presupuesto ? `€${(proyecto.presupuesto / 1000000).toFixed(1)}M` : "-"}
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(proyecto.estado)}>{getStatusLabel(proyecto.estado)}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/dashboard/propietario/proyectos/${proyecto.id}`}>
                                                    <Button variant="ghost" size="sm" className="h-8">
                                                        <Eye className="mr-1 h-4 w-4" />
                                                        Ver detalles
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between border-t px-6 py-4">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Mostrando {(currentPage - 1) * itemsPerPage + 1} -{" "}
                                        {Math.min(currentPage * itemsPerPage, filteredProyectos.length)} de {filteredProyectos.length}{" "}
                                        proyectos
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                        >
                                            Anterior
                                        </Button>
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                <Button
                                                    key={page}
                                                    variant={currentPage === page ? "default" : "ghost"}
                                                    size="sm"
                                                    onClick={() => setCurrentPage(page)}
                                                    className="h-8 w-8 p-0"
                                                >
                                                    {page}
                                                </Button>
                                            ))}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                        >
                                            Siguiente
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </Card>
            </main>
        </>
    )
}
