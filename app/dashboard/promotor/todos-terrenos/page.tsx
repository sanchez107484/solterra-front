"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import ProtectedRoute from "@/components/protected-route"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useTerrenos } from "@/hooks/useTerrenos"
import { useTranslations } from "@/i18n/i18nContext"
import type { Terreno } from "@/types/terreno.types"
import { Calendar, Euro, Eye, Filter, Landmark, MapPin, MessageCircle, Ruler, Search, TrendingUp, Users } from "lucide-react"
import { useEffect, useState } from "react"

type FilterState = {
    search: string
    estado: string | "all"
    provincia: string | "all"
    superficieMin: string
    superficieMax: string
    precioMin: string
    precioMax: string
    sortBy: "titulo" | "creadoEn" | "superficie" | "precioVenta"
    sortOrder: "asc" | "desc"
}

export default function TodosTerrenosPage() {
    const { fetchTerrenos, terrenos, isLoading } = useTerrenos({ autoFetch: true })
    const { t } = useTranslations()

    // Estado para filtros y búsqueda
    const [filters, setFilters] = useState<FilterState>({
        search: "",
        estado: "all",
        provincia: "all",
        superficieMin: "",
        superficieMax: "",
        precioMin: "",
        precioMax: "",
        sortBy: "creadoEn",
        sortOrder: "desc",
    })

    // Estado para estadísticas
    const [stats, setStats] = useState({
        total: 0,
        disponibles: 0,
        promedioSuperficie: 0,
        promedioPrecios: 0,
    })

    useEffect(() => {
        calculateStats()
    }, [terrenos])

    const calculateStats = () => {
        const total = terrenos?.length || 0
        const disponibles = terrenos?.filter((t) => t.estado === "ACTIVO")?.length || 0
        const promedioSuperficie = terrenos?.length > 0 ? terrenos.reduce((sum, t) => sum + (t.superficie || 0), 0) / terrenos.length : 0
        const promedioPrecios = terrenos?.length > 0 ? terrenos.reduce((sum, t) => sum + (t.precioVenta || 0), 0) / terrenos.length : 0

        setStats({
            total,
            disponibles,
            promedioSuperficie,
            promedioPrecios,
        })
    }

    const filteredTerrenos =
        terrenos?.filter((terreno) => {
            const matchesSearch =
                !filters.search ||
                terreno.titulo.toLowerCase().includes(filters.search.toLowerCase()) ||
                terreno.descripcion?.toLowerCase().includes(filters.search.toLowerCase()) ||
                terreno.direccion?.toLowerCase().includes(filters.search.toLowerCase())

            const matchesEstado = filters.estado === "all" || terreno.estado === filters.estado
            const matchesProvincia = filters.provincia === "all" || terreno.provincia === filters.provincia

            const superficieNum = terreno.superficie || 0
            const matchesSuperficieMin = !filters.superficieMin || superficieNum >= parseFloat(filters.superficieMin)
            const matchesSuperficieMax = !filters.superficieMax || superficieNum <= parseFloat(filters.superficieMax)

            const precioNum = terreno.precioVenta || 0
            const matchesPrecioMin = !filters.precioMin || precioNum >= parseFloat(filters.precioMin)
            const matchesPrecioMax = !filters.precioMax || precioNum <= parseFloat(filters.precioMax)

            return (
                matchesSearch &&
                matchesEstado &&
                matchesProvincia &&
                matchesSuperficieMin &&
                matchesSuperficieMax &&
                matchesPrecioMin &&
                matchesPrecioMax
            )
        }) || []

    const sortedTerrenos = [...filteredTerrenos].sort((a, b) => {
        const direction = filters.sortOrder === "asc" ? 1 : -1

        switch (filters.sortBy) {
            case "titulo":
                return a.titulo.localeCompare(b.titulo) * direction
            case "superficie":
                return ((a.superficie || 0) - (b.superficie || 0)) * direction
            case "precioVenta":
                return ((a.precioVenta || 0) - (b.precioVenta || 0)) * direction
            case "creadoEn":
            default:
                const dateA = a.creadoEn ? new Date(a.creadoEn).getTime() : 0
                const dateB = b.creadoEn ? new Date(b.creadoEn).getTime() : 0
                return (dateA - dateB) * direction
        }
    })

    const getEstadoBadgeVariant = (estado: string) => {
        const variants: Record<string, any> = {
            ACTIVO: "default",
            VENDIDO: "destructive",
            PENDIENTE: "secondary",
            RESERVADO: "outline",
        }

        return variants[estado] || "secondary"
    }

    const handleContactar = (terreno: Terreno) => {
        // Aquí se implementaría la lógica para contactar al propietario
        alert(`Contactar propietario del terreno: ${terreno.titulo}`)
    }

    return (
        <ProtectedRoute requiredRole="PROMOTOR" redirectTo="/login/promotor">
            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
                <DashboardSidebar userType="promotor" />
                <div className="flex-1">
                    <DashboardHeader
                        title="Todos los Terrenos"
                        breadcrumbs={[
                            { label: t?.dashboard?.breadcrumbs?.dashboard || "Dashboard", href: "/dashboard/promotor" },
                            { label: t?.dashboard?.breadcrumbs?.allLands || "Todos los Terrenos" },
                        ]}
                        userType="promotor"
                    />

                    <div className="container mx-auto space-y-8 p-6">
                        {/* Estadísticas */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Terrenos</CardTitle>
                                    <Landmark className="text-muted-foreground h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.total}</div>
                                    <p className="text-muted-foreground text-xs">Terrenos disponibles</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
                                    <TrendingUp className="text-muted-foreground h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.disponibles}</div>
                                    <p className="text-muted-foreground text-xs">En estado activo</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Superficie Promedio</CardTitle>
                                    <Ruler className="text-muted-foreground h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.promedioSuperficie.toFixed(1)} ha</div>
                                    <p className="text-muted-foreground text-xs">Hectáreas promedio</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Precio Promedio</CardTitle>
                                    <Euro className="text-muted-foreground h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {new Intl.NumberFormat("es-ES", {
                                            style: "currency",
                                            currency: "EUR",
                                            maximumFractionDigits: 0,
                                        }).format(stats.promedioPrecios)}
                                    </div>
                                    <p className="text-muted-foreground text-xs">Precio promedio</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Filtros y búsqueda */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Filter className="h-5 w-5" />
                                    Filtros de Búsqueda
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <div className="space-y-2">
                                        <Label>Buscar</Label>
                                        <div className="relative">
                                            <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                                            <Input
                                                placeholder="Buscar terrenos..."
                                                value={filters.search}
                                                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                                                className="pl-8"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Estado</Label>
                                        <Select
                                            value={filters.estado}
                                            onValueChange={(value) => setFilters((prev) => ({ ...prev, estado: value }))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Todos</SelectItem>
                                                <SelectItem value="ACTIVO">Activo</SelectItem>
                                                <SelectItem value="VENDIDO">Vendido</SelectItem>
                                                <SelectItem value="PENDIENTE">Pendiente</SelectItem>
                                                <SelectItem value="RESERVADO">Reservado</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Provincia</Label>
                                        <Select
                                            value={filters.provincia}
                                            onValueChange={(value) => setFilters((prev) => ({ ...prev, provincia: value }))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Todas</SelectItem>
                                                <SelectItem value="Madrid">Madrid</SelectItem>
                                                <SelectItem value="Barcelona">Barcelona</SelectItem>
                                                <SelectItem value="Valencia">Valencia</SelectItem>
                                                <SelectItem value="Sevilla">Sevilla</SelectItem>
                                                <SelectItem value="Zaragoza">Zaragoza</SelectItem>
                                                <SelectItem value="Málaga">Málaga</SelectItem>
                                                <SelectItem value="Murcia">Murcia</SelectItem>
                                                <SelectItem value="Palma">Palma</SelectItem>
                                                <SelectItem value="Las Palmas">Las Palmas</SelectItem>
                                                <SelectItem value="Bilbao">Bilbao</SelectItem>
                                                <SelectItem value="Alicante">Alicante</SelectItem>
                                                <SelectItem value="Córdoba">Córdoba</SelectItem>
                                                <SelectItem value="Valladolid">Valladolid</SelectItem>
                                                <SelectItem value="Vigo">Vigo</SelectItem>
                                                <SelectItem value="Gijón">Gijón</SelectItem>
                                                <SelectItem value="Hospitalet">Hospitalet</SelectItem>
                                                <SelectItem value="Vitoria">Vitoria</SelectItem>
                                                <SelectItem value="A Coruña">A Coruña</SelectItem>
                                                <SelectItem value="Elche">Elche</SelectItem>
                                                <SelectItem value="Granada">Granada</SelectItem>
                                                <SelectItem value="Oviedo">Oviedo</SelectItem>
                                                <SelectItem value="Badalona">Badalona</SelectItem>
                                                <SelectItem value="Cartagena">Cartagena</SelectItem>
                                                <SelectItem value="Terrassa">Terrassa</SelectItem>
                                                <SelectItem value="Jerez">Jerez</SelectItem>
                                                <SelectItem value="Sabadell">Sabadell</SelectItem>
                                                <SelectItem value="Móstoles">Móstoles</SelectItem>
                                                <SelectItem value="Santa Cruz">Santa Cruz</SelectItem>
                                                <SelectItem value="Pamplona">Pamplona</SelectItem>
                                                <SelectItem value="Almería">Almería</SelectItem>
                                                <SelectItem value="Alcalá de Henares">Alcalá de Henares</SelectItem>
                                                <SelectItem value="Fuenlabrada">Fuenlabrada</SelectItem>
                                                <SelectItem value="Leganés">Leganés</SelectItem>
                                                <SelectItem value="Santander">Santander</SelectItem>
                                                <SelectItem value="Burgos">Burgos</SelectItem>
                                                <SelectItem value="Castellón">Castellón</SelectItem>
                                                <SelectItem value="Getafe">Getafe</SelectItem>
                                                <SelectItem value="Albacete">Albacete</SelectItem>
                                                <SelectItem value="Alcorcón">Alcorcón</SelectItem>
                                                <SelectItem value="Logroño">Logroño</SelectItem>
                                                <SelectItem value="Badajoz">Badajoz</SelectItem>
                                                <SelectItem value="Salamanca">Salamanca</SelectItem>
                                                <SelectItem value="Huelva">Huelva</SelectItem>
                                                <SelectItem value="Marbella">Marbella</SelectItem>
                                                <SelectItem value="Tarragona">Tarragona</SelectItem>
                                                <SelectItem value="León">León</SelectItem>
                                                <SelectItem value="Cádiz">Cádiz</SelectItem>
                                                <SelectItem value="Dos Hermanas">Dos Hermanas</SelectItem>
                                                <SelectItem value="Parla">Parla</SelectItem>
                                                <SelectItem value="Torrejón">Torrejón</SelectItem>
                                                <SelectItem value="Mataró">Mataró</SelectItem>
                                                <SelectItem value="Santa Coloma">Santa Coloma</SelectItem>
                                                <SelectItem value="Alcobendas">Alcobendas</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Ordenar por</Label>
                                        <Select
                                            value={filters.sortBy}
                                            onValueChange={(value: "titulo" | "creadoEn" | "superficie" | "precioVenta") =>
                                                setFilters((prev) => ({ ...prev, sortBy: value }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="titulo">Título</SelectItem>
                                                <SelectItem value="creadoEn">Fecha</SelectItem>
                                                <SelectItem value="superficie">Superficie</SelectItem>
                                                <SelectItem value="precioVenta">Precio</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <div className="space-y-2">
                                        <Label>Superficie Mínima (ha)</Label>
                                        <Input
                                            type="number"
                                            placeholder="Ej: 10"
                                            value={filters.superficieMin}
                                            onChange={(e) => setFilters((prev) => ({ ...prev, superficieMin: e.target.value }))}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Superficie Máxima (ha)</Label>
                                        <Input
                                            type="number"
                                            placeholder="Ej: 100"
                                            value={filters.superficieMax}
                                            onChange={(e) => setFilters((prev) => ({ ...prev, superficieMax: e.target.value }))}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Precio Mínimo (€)</Label>
                                        <Input
                                            type="number"
                                            placeholder="Ej: 50000"
                                            value={filters.precioMin}
                                            onChange={(e) => setFilters((prev) => ({ ...prev, precioMin: e.target.value }))}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Precio Máximo (€)</Label>
                                        <Input
                                            type="number"
                                            placeholder="Ej: 500000"
                                            value={filters.precioMax}
                                            onChange={(e) => setFilters((prev) => ({ ...prev, precioMax: e.target.value }))}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Lista de terrenos */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>Terrenos Disponibles</span>
                                    <span className="text-muted-foreground text-sm font-normal">
                                        {sortedTerrenos.length} terrenos encontrados
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <div className="flex items-center justify-center py-8">
                                        <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
                                    </div>
                                ) : sortedTerrenos.length === 0 ? (
                                    <div className="py-8 text-center">
                                        <Landmark className="text-muted-foreground mx-auto h-12 w-12" />
                                        <h3 className="text-muted-foreground mt-2 text-sm font-medium">No se encontraron terrenos</h3>
                                        <p className="text-muted-foreground mt-1 text-sm">
                                            Ajusta los filtros para encontrar terrenos que se adapten a tus necesidades
                                        </p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Terreno</TableHead>
                                                    <TableHead>Estado</TableHead>
                                                    <TableHead>Ubicación</TableHead>
                                                    <TableHead>Superficie</TableHead>
                                                    <TableHead>Precio</TableHead>
                                                    <TableHead>Propietario</TableHead>
                                                    <TableHead>Fecha</TableHead>
                                                    <TableHead className="w-[100px]">Acciones</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {sortedTerrenos.map((terreno) => (
                                                    <TableRow key={terreno.id}>
                                                        <TableCell>
                                                            <div>
                                                                <div className="font-medium">{terreno.titulo}</div>
                                                                {terreno.descripcion && (
                                                                    <div className="text-muted-foreground max-w-[200px] truncate text-sm">
                                                                        {terreno.descripcion}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant={getEstadoBadgeVariant(terreno.estado)}>{terreno.estado}</Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-1">
                                                                <MapPin className="text-muted-foreground h-3 w-3" />
                                                                <span className="text-sm">
                                                                    {terreno.direccion || terreno.provincia || "-"}
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <span className="text-sm">{terreno.superficie} ha</span>
                                                        </TableCell>
                                                        <TableCell>
                                                            {terreno.precioVenta ? (
                                                                <span className="font-medium">
                                                                    {new Intl.NumberFormat("es-ES", {
                                                                        style: "currency",
                                                                        currency: "EUR",
                                                                        maximumFractionDigits: 0,
                                                                    }).format(terreno.precioVenta)}
                                                                </span>
                                                            ) : (
                                                                <span className="text-muted-foreground">-</span>
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-1">
                                                                <Users className="text-muted-foreground h-3 w-3" />
                                                                <span className="text-sm">Contactar propietario</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="text-muted-foreground h-3 w-3" />
                                                                <span className="text-sm">
                                                                    {terreno.creadoEn
                                                                        ? new Date(terreno.creadoEn).toLocaleDateString("es-ES")
                                                                        : "-"}
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-1">
                                                                <Button variant="ghost" size="sm" title="Ver detalles">
                                                                    <Eye className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleContactar(terreno)}
                                                                    title="Contactar propietario"
                                                                >
                                                                    <MessageCircle className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}
