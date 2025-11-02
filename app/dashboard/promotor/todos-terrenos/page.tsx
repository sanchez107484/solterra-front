"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useTerrenos } from "@/hooks/useTerrenos"
import { useTranslations } from "@/i18n/i18nContext"
import { ArrowUpDown, Eye, Landmark, MapPin, Ruler, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

const getStatusColor = (estado: string) => {
    switch (estado?.toUpperCase()) {
        case "ACTIVO":
            return "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300"
        case "PENDIENTE_REVISION":
            return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300"
        case "ARRENDADO":
        case "VENDIDO":
            return "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
        default:
            return "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300"
    }
}

const getStatusLabel = (estado: string, t: any) => {
    switch (estado?.toUpperCase()) {
        case "ACTIVO":
            return t?.dashboard?.promoter?.terrenos?.allTerrains?.status?.activo || "Activo"
        case "PENDIENTE_REVISION":
            return t?.dashboard?.promoter?.terrenos?.allTerrains?.status?.pendiente || "Pendiente Revisión"
        case "ARRENDADO":
            return t?.dashboard?.promoter?.terrenos?.allTerrains?.status?.arrendado || "Arrendado"
        case "VENDIDO":
            return t?.dashboard?.promoter?.terrenos?.allTerrains?.status?.vendido || "Vendido"
        default:
            return estado || "Desconocido"
    }
}

type SortField = "titulo" | "superficie" | "provincia" | "estado" | "precioVenta" | "creadoEn"
type SortOrder = "asc" | "desc"

export default function TodosTerrenosPage() {
    const { t } = useTranslations()
    const { terrenos, isLoading, fetchTerrenos } = useTerrenos({ autoFetch: false })

    const [searchTerm, setSearchTerm] = useState("")
    const [provinciaFilter, setProvinciaFilter] = useState<string>("TODOS")
    const [estadoFilter, setEstadoFilter] = useState<string>("TODOS")
    const [sortField, setSortField] = useState<SortField>("creadoEn")
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc")

    useEffect(() => {
        fetchTerrenos()
    }, [fetchTerrenos])

    // El backend ya filtra por estado ACTIVO
    const terrenosActivos = terrenos || []

    const filteredAndSortedTerrenos = useMemo(() => {
        let filtered = terrenosActivos

        // Aplicar filtros
        if (searchTerm) {
            filtered = filtered.filter(
                (t: any) =>
                    t.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    t.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    t.provincia?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    t.propietario?.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (provinciaFilter !== "TODOS") {
            filtered = filtered.filter((t: any) => t.provincia === provinciaFilter)
        }

        if (estadoFilter !== "TODOS") {
            filtered = filtered.filter((t: any) => t.estado?.toUpperCase() === estadoFilter)
        }

        // Aplicar ordenamiento
        const sorted = [...filtered].sort((a: any, b: any) => {
            let aValue = a[sortField]
            let bValue = b[sortField]

            // Manejo especial para campos anidados
            if (sortField === "creadoEn") {
                aValue = new Date(aValue).getTime()
                bValue = new Date(bValue).getTime()
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
    }, [terrenosActivos, searchTerm, provinciaFilter, estadoFilter, sortField, sortOrder])

    const provincias = Array.from(new Set(terrenosActivos.map((t: any) => t.provincia).filter(Boolean)))

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
                title={t?.dashboard?.promoter?.terrenos?.allTerrains?.title || "Terrenos Disponibles"}
                subtitle={t?.dashboard?.promoter?.terrenos?.allTerrains?.subtitle || "Explora terrenos para proyectos de energía renovable"}
                breadcrumbs={[
                    { label: t?.dashboard?.breadcrumbs?.dashboard || "Dashboard", href: "/dashboard/promotor" },
                    { label: t?.dashboard?.promoter?.terrenos?.allTerrains?.title || "Terrenos disponibles" },
                ]}
                userType="promotor"
            />

            <main className="p-6">
                {/* Filtros inline */}
                <Card className="border-secondary/20 mb-6 p-0">
                    <div className="border-secondary/10 border-b p-4">
                        <div className="flex items-center gap-2">
                            <Landmark className="text-secondary h-5 w-5" />
                            <h3 className="font-semibold">
                                {t?.dashboard?.promoter?.terrenos?.allTerrains?.filters?.title || "Filtros de búsqueda"}
                            </h3>
                        </div>
                        <p className="text-muted-foreground mt-1 text-sm">
                            {t?.dashboard?.promoter?.terrenos?.allTerrains?.filters?.subtitle ||
                                "Refina tu búsqueda para encontrar terrenos específicos"}
                        </p>
                    </div>
                    <div className="space-y-4 p-4">
                        <div className="grid gap-4 md:grid-cols-3">
                            {/* Búsqueda */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    {t?.dashboard?.promoter?.terrenos?.allTerrains?.filters?.search || "Buscar"}
                                </label>
                                <Input
                                    placeholder={
                                        t?.dashboard?.promoter?.terrenos?.allTerrains?.filters?.searchPlaceholder || "Buscar terreno..."
                                    }
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="border-secondary/20"
                                />
                            </div>

                            {/* Provincia */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    {t?.dashboard?.promoter?.terrenos?.allTerrains?.filters?.province || "Provincia"}
                                </label>
                                <Select value={provinciaFilter} onValueChange={setProvinciaFilter}>
                                    <SelectTrigger className="border-secondary/20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="TODOS">
                                            {t?.dashboard?.promoter?.terrenos?.allTerrains?.filters?.allProvinces || "Todas las provincias"}
                                        </SelectItem>
                                        {provincias.sort().map((provincia) => (
                                            <SelectItem key={provincia} value={provincia}>
                                                {provincia}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Estado */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    {t?.dashboard?.promoter?.terrenos?.allTerrains?.filters?.status || "Estado"}
                                </label>
                                <Select value={estadoFilter} onValueChange={setEstadoFilter}>
                                    <SelectTrigger className="border-secondary/20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="TODOS">
                                            {t?.dashboard?.promoter?.terrenos?.allTerrains?.filters?.allStatuses || "Todos los estados"}
                                        </SelectItem>
                                        <SelectItem value="ACTIVO">
                                            {t?.dashboard?.promoter?.terrenos?.allTerrains?.status?.activo || "Activo"}
                                        </SelectItem>
                                        <SelectItem value="PENDIENTE_REVISION">
                                            {t?.dashboard?.promoter?.terrenos?.allTerrains?.status?.pendiente || "Pendiente Revisión"}
                                        </SelectItem>
                                        <SelectItem value="ARRENDADO">
                                            {t?.dashboard?.promoter?.terrenos?.allTerrains?.status?.arrendado || "Arrendado"}
                                        </SelectItem>
                                        <SelectItem value="VENDIDO">
                                            {t?.dashboard?.promoter?.terrenos?.allTerrains?.status?.vendido || "Vendido"}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Botón limpiar filtros */}
                        {(searchTerm || provinciaFilter !== "TODOS" || estadoFilter !== "TODOS") && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleClearFilters}
                                className="border-secondary/20 text-secondary gap-2"
                            >
                                <X className="h-3.5 w-3.5" />
                                {t?.dashboard?.promoter?.terrenos?.allTerrains?.filters?.clearFilters || "Limpiar filtros"}
                            </Button>
                        )}
                    </div>
                </Card>

                {/* Contador de resultados */}
                <div className="text-muted-foreground mb-4 text-sm">
                    {`Mostrando ${filteredAndSortedTerrenos.length} de ${terrenosActivos.length} terrenos`}
                </div>

                {isLoading ? (
                    <Card className="p-12">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="border-t-secondary h-8 w-8 animate-spin rounded-full border-4 border-gray-300" />
                            <p className="text-muted-foreground text-sm">Cargando terrenos...</p>
                        </div>
                    </Card>
                ) : filteredAndSortedTerrenos.length > 0 ? (
                    <Card className="overflow-hidden p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="from-secondary/5 via-accent/5 hover:from-secondary/10 hover:via-accent/10 h-14 bg-gradient-to-r to-transparent">
                                        <TableHead className="min-w-[250px] px-4">
                                            <div className="flex items-center gap-1">
                                                Terreno
                                                <SortIcon field="titulo" />
                                            </div>
                                        </TableHead>
                                        <TableHead className="px-4">
                                            <div className="flex items-center gap-1">
                                                Superficie
                                                <SortIcon field="superficie" />
                                            </div>
                                        </TableHead>
                                        <TableHead className="px-4">
                                            <div className="flex items-center gap-1">
                                                Ubicación
                                                <SortIcon field="provincia" />
                                            </div>
                                        </TableHead>
                                        <TableHead className="px-4">
                                            <div className="flex items-center gap-1">
                                                Precio
                                                <SortIcon field="precioVenta" />
                                            </div>
                                        </TableHead>
                                        <TableHead className="px-4">
                                            <div className="flex items-center gap-1">
                                                Estado
                                                <SortIcon field="estado" />
                                            </div>
                                        </TableHead>
                                        <TableHead className="px-4 text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredAndSortedTerrenos.map((terreno: any) => (
                                        <TableRow key={terreno.id} className="hover:bg-muted/50 h-20">
                                            <TableCell className="px-4 py-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="from-secondary/10 to-accent/10 flex-shrink-0 rounded-lg bg-gradient-to-br p-2">
                                                        <Landmark className="text-secondary h-4 w-4" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="text-foreground font-medium">{terreno.titulo}</div>
                                                        {terreno.descripcion && (
                                                            <div className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                                                                {terreno.descripcion}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                {terreno.superficie ? (
                                                    <div className="flex items-center gap-1.5 text-sm">
                                                        <div className="rounded-full bg-green-100 p-1 dark:bg-green-900/30">
                                                            <Ruler className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                        </div>
                                                        <span className="font-medium">{terreno.superficie}</span>
                                                        <span className="text-muted-foreground">ha</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground text-sm">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                {terreno.provincia ? (
                                                    <div className="flex items-center gap-1.5 text-sm">
                                                        <div className="rounded-full bg-red-100 p-1 dark:bg-red-900/30">
                                                            <MapPin className="h-3 w-3 text-red-600 dark:text-red-400" />
                                                        </div>
                                                        <span className="font-medium">{terreno.provincia}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground text-sm">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                {terreno.precioVenta ? (
                                                    <span className="text-sm font-medium">
                                                        {new Intl.NumberFormat("es-ES", {
                                                            style: "currency",
                                                            currency: "EUR",
                                                            minimumFractionDigits: 0,
                                                        }).format(terreno.precioVenta)}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground text-sm">Sin especificar</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                <Badge className={`${getStatusColor(terreno.estado)}`}>
                                                    {getStatusLabel(terreno.estado, t)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="px-4 py-4 text-right">
                                                <Link href={`/dashboard/promotor/terrenos/${terreno.id}`}>
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        className="bg-secondary hover:bg-secondary/90 gap-2"
                                                    >
                                                        <Eye className="h-3.5 w-3.5" />
                                                        Ver detalles
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
                            <Landmark className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                            <h3 className="mb-2 text-lg font-semibold">No se encontraron terrenos</h3>
                            <p className="text-muted-foreground text-sm">
                                {searchTerm || provinciaFilter !== "TODOS" || estadoFilter !== "TODOS"
                                    ? "Intenta ajustar los filtros de búsqueda"
                                    : "No hay terrenos disponibles en este momento"}
                            </p>
                        </div>
                    </Card>
                )}
            </main>
        </>
    )
}
