"use client"

import ProtectedRoute from "@/components/protected-route"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { useProyectos } from "@/hooks/useProyectos"
import type { EstadoProyecto, Proyecto, TipoProyecto } from "@/types/proyecto.types"
import { Building2, Calendar, Edit, Euro, Filter, FolderPlus, MapPin, Plus, Search, Trash2, TrendingUp, Users } from "lucide-react"
import { useEffect, useState } from "react"

type FilterState = {
    search: string
    estado: EstadoProyecto | "all"
    tipo: TipoProyecto | "all"
    sortBy: "titulo" | "creadoEn" | "presupuesto"
    sortOrder: "asc" | "desc"
}

export default function MisProyectosPage() {
    const { fetchMine, proyectos, isLoading, createProyecto, updateProyecto, deleteProyecto } = useProyectos()

    // Estado para filtros y búsqueda
    const [filters, setFilters] = useState<FilterState>({
        search: "",
        estado: "all",
        tipo: "all",
        sortBy: "creadoEn",
        sortOrder: "desc",
    })

    // Estado para estadísticas
    const [stats, setStats] = useState({
        total: 0,
        activos: 0,
        completados: 0,
        presupuestoTotal: 0,
    })

    // Estado para modal de proyecto
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedProyecto, setSelectedProyecto] = useState<Proyecto | null>(null)
    const [formData, setFormData] = useState({
        titulo: "",
        descripcion: "",
        tipo: "" as TipoProyecto,
        presupuesto: "",
        ubicacion: "",
        estado: "BORRADOR" as EstadoProyecto,
        superficieMinima: "",
    })

    useEffect(() => {
        loadProyectos()
    }, [])

    useEffect(() => {
        calculateStats()
    }, [proyectos])

    const loadProyectos = async () => {
        try {
            await fetchMine()
        } catch (error) {
            console.error("Error cargando proyectos:", error)
        }
    }

    const calculateStats = () => {
        const total = proyectos?.length || 0
        const activos =
            proyectos?.filter((p) =>
                ["BORRADOR", "PENDIENTE_REVISION", "EN_BUSQUEDA", "PLANIFICACION", "EN_DESARROLLO", "ACTIVO"].includes(p.estado)
            )?.length || 0
        const completados = proyectos?.filter((p) => p.estado === "COMPLETADO")?.length || 0
        const presupuestoTotal = proyectos?.reduce((sum, p) => sum + (p.presupuesto || 0), 0) || 0

        setStats({
            total,
            activos,
            completados,
            presupuestoTotal,
        })
    }

    const filteredProyectos =
        proyectos?.filter((proyecto) => {
            const matchesSearch =
                !filters.search ||
                proyecto.titulo.toLowerCase().includes(filters.search.toLowerCase()) ||
                proyecto.descripcion?.toLowerCase().includes(filters.search.toLowerCase()) ||
                proyecto.ubicacion?.toLowerCase().includes(filters.search.toLowerCase())

            const matchesEstado = filters.estado === "all" || proyecto.estado === filters.estado
            const matchesTipo = filters.tipo === "all" || proyecto.tipo === filters.tipo

            return matchesSearch && matchesEstado && matchesTipo
        }) || []

    const sortedProyectos = [...filteredProyectos].sort((a, b) => {
        const direction = filters.sortOrder === "asc" ? 1 : -1

        switch (filters.sortBy) {
            case "titulo":
                return a.titulo.localeCompare(b.titulo) * direction
            case "presupuesto":
                return ((a.presupuesto || 0) - (b.presupuesto || 0)) * direction
            case "creadoEn":
            default:
                const dateA = a.creadoEn ? new Date(a.creadoEn).getTime() : 0
                const dateB = b.creadoEn ? new Date(b.creadoEn).getTime() : 0
                return (dateA - dateB) * direction
        }
    })

    const handleCreateProject = () => {
        setSelectedProyecto(null)
        setFormData({
            titulo: "",
            descripcion: "",
            tipo: "" as TipoProyecto,
            presupuesto: "",
            ubicacion: "",
            estado: "BORRADOR",
            superficieMinima: "",
        })
        setIsModalOpen(true)
    }

    const handleEditProject = (proyecto: Proyecto) => {
        setSelectedProyecto(proyecto)
        setFormData({
            titulo: proyecto.titulo,
            descripcion: proyecto.descripcion || "",
            tipo: proyecto.tipo,
            presupuesto: proyecto.presupuesto?.toString() || "",
            ubicacion: proyecto.ubicacion || "",
            estado: proyecto.estado,
            superficieMinima: proyecto.superficieMinima?.toString() || "",
        })
        setIsModalOpen(true)
    }

    const handleSubmitProject = async () => {
        if (!formData.titulo || !formData.tipo || !formData.superficieMinima) {
            alert("Por favor completa los campos obligatorios")
            return
        }

        try {
            const payload = {
                titulo: formData.titulo,
                descripcion: formData.descripcion || undefined,
                tipo: formData.tipo as TipoProyecto,
                presupuesto: formData.presupuesto ? parseFloat(formData.presupuesto) : undefined,
                ubicacion: formData.ubicacion || undefined,
                estado: formData.estado as EstadoProyecto,
                superficieMinima: parseFloat(formData.superficieMinima),
            }

            if (selectedProyecto) {
                await updateProyecto(selectedProyecto.id, payload)
            } else {
                await createProyecto(payload)
            }

            setIsModalOpen(false)
            await loadProyectos()
        } catch (error) {
            console.error("Error al guardar proyecto:", error)
            alert("Error al guardar el proyecto")
        }
    }

    const handleDeleteProject = async (proyecto: Proyecto) => {
        if (confirm(`¿Estás seguro de que quieres eliminar el proyecto "${proyecto.titulo}"?`)) {
            try {
                await deleteProyecto(proyecto.id)
                await loadProyectos()
            } catch (error) {
                console.error("Error al eliminar proyecto:", error)
                alert("Error al eliminar el proyecto")
            }
        }
    }

    const getEstadoBadgeVariant = (estado: EstadoProyecto) => {
        const variants: Record<EstadoProyecto, any> = {
            BORRADOR: "secondary",
            PENDIENTE_REVISION: "default",
            EN_BUSQUEDA: "default",
            PLANIFICACION: "secondary",
            EN_DESARROLLO: "default",
            ACTIVO: "default",
            PAUSADO: "outline",
            CANCELADO: "destructive",
            COMPLETADO: "default",
        }

        return variants[estado] || "secondary"
    }

    const getTipoBadgeVariant = (tipo: TipoProyecto) => {
        const variants: Record<TipoProyecto, any> = {
            SOLAR_FOTOVOLTAICO: "default",
            EOLICO: "secondary",
            HIBRIDACION: "destructive",
            ALMACENAMIENTO: "outline",
            HIDROGENO: "default",
            BIOMETANO: "secondary",
        }

        return variants[tipo] || "default"
    }

    return (
        <ProtectedRoute requiredRole="PROMOTOR" redirectTo="/login/promotor">
            <div className="container mx-auto space-y-8 p-6">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Mis Proyectos</h1>
                        <p className="text-muted-foreground">Gestiona todos tus proyectos energéticos</p>
                    </div>
                    <Button onClick={handleCreateProject} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Nuevo Proyecto
                    </Button>
                </div>

                {/* Estadísticas */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Proyectos</CardTitle>
                            <Building2 className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-muted-foreground text-xs">Proyectos creados</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Proyectos Activos</CardTitle>
                            <TrendingUp className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.activos}</div>
                            <p className="text-muted-foreground text-xs">En desarrollo</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Completados</CardTitle>
                            <Users className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.completados}</div>
                            <p className="text-muted-foreground text-xs">Proyectos finalizados</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Presupuesto Total</CardTitle>
                            <Euro className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {new Intl.NumberFormat("es-ES", {
                                    style: "currency",
                                    currency: "EUR",
                                    maximumFractionDigits: 0,
                                }).format(stats.presupuestoTotal)}
                            </div>
                            <p className="text-muted-foreground text-xs">Valor total</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filtros y búsqueda */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Filtros
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                            <div className="space-y-2">
                                <Label>Buscar</Label>
                                <div className="relative">
                                    <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                                    <Input
                                        placeholder="Buscar proyectos..."
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
                                    onValueChange={(value: EstadoProyecto | "all") => setFilters((prev) => ({ ...prev, estado: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Todos</SelectItem>
                                        <SelectItem value="BORRADOR">Borrador</SelectItem>
                                        <SelectItem value="PLANIFICACION">Planificación</SelectItem>
                                        <SelectItem value="EN_DESARROLLO">En Desarrollo</SelectItem>
                                        <SelectItem value="ACTIVO">Activo</SelectItem>
                                        <SelectItem value="COMPLETADO">Completado</SelectItem>
                                        <SelectItem value="CANCELADO">Cancelado</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Tipo</Label>
                                <Select
                                    value={filters.tipo}
                                    onValueChange={(value: TipoProyecto | "all") => setFilters((prev) => ({ ...prev, tipo: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Todos</SelectItem>
                                        <SelectItem value="SOLAR_FOTOVOLTAICO">Solar Fotovoltaico</SelectItem>
                                        <SelectItem value="EOLICO">Eólico</SelectItem>
                                        <SelectItem value="HIBRIDACION">Hibridación</SelectItem>
                                        <SelectItem value="ALMACENAMIENTO">Almacenamiento</SelectItem>
                                        <SelectItem value="HIDROGENO">Hidrógeno</SelectItem>
                                        <SelectItem value="BIOMETANO">Biometano</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Ordenar por</Label>
                                <Select
                                    value={filters.sortBy}
                                    onValueChange={(value: "titulo" | "creadoEn" | "presupuesto") =>
                                        setFilters((prev) => ({ ...prev, sortBy: value }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="titulo">Nombre</SelectItem>
                                        <SelectItem value="creadoEn">Fecha</SelectItem>
                                        <SelectItem value="presupuesto">Presupuesto</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Orden</Label>
                                <Select
                                    value={filters.sortOrder}
                                    onValueChange={(value: "asc" | "desc") => setFilters((prev) => ({ ...prev, sortOrder: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="desc">Descendente</SelectItem>
                                        <SelectItem value="asc">Ascendente</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Lista de proyectos */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Lista de Proyectos</span>
                            <span className="text-muted-foreground text-sm font-normal">{sortedProyectos.length} proyectos</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
                            </div>
                        ) : sortedProyectos.length === 0 ? (
                            <div className="py-8 text-center">
                                <FolderPlus className="text-muted-foreground mx-auto h-12 w-12" />
                                <h3 className="text-muted-foreground mt-2 text-sm font-medium">No tienes proyectos</h3>
                                <p className="text-muted-foreground mt-1 text-sm">Comienza creando tu primer proyecto energético</p>
                                <div className="mt-6">
                                    <Button onClick={handleCreateProject} className="gap-2">
                                        <Plus className="h-4 w-4" />
                                        Crear Primer Proyecto
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Proyecto</TableHead>
                                            <TableHead>Tipo</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead>Ubicación</TableHead>
                                            <TableHead>Superficie</TableHead>
                                            <TableHead>Presupuesto</TableHead>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead className="w-[100px]">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sortedProyectos.map((proyecto) => (
                                            <TableRow key={proyecto.id}>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">{proyecto.titulo}</div>
                                                        {proyecto.descripcion && (
                                                            <div className="text-muted-foreground max-w-[200px] truncate text-sm">
                                                                {proyecto.descripcion}
                                                            </div>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={getTipoBadgeVariant(proyecto.tipo)}>
                                                        {proyecto.tipo.replace(/_/g, " ")}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={getEstadoBadgeVariant(proyecto.estado)}>
                                                        {proyecto.estado.replace(/_/g, " ")}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="text-muted-foreground h-3 w-3" />
                                                        <span className="text-sm">{proyecto.ubicacion || "-"}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-sm">{proyecto.superficieMinima} ha</span>
                                                </TableCell>
                                                <TableCell>
                                                    {proyecto.presupuesto ? (
                                                        <span className="font-medium">
                                                            {new Intl.NumberFormat("es-ES", {
                                                                style: "currency",
                                                                currency: "EUR",
                                                                maximumFractionDigits: 0,
                                                            }).format(proyecto.presupuesto)}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted-foreground">-</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="text-muted-foreground h-3 w-3" />
                                                        <span className="text-sm">
                                                            {proyecto.creadoEn
                                                                ? new Date(proyecto.creadoEn).toLocaleDateString("es-ES")
                                                                : "-"}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1">
                                                        <Button variant="ghost" size="sm" onClick={() => handleEditProject(proyecto)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" onClick={() => handleDeleteProject(proyecto)}>
                                                            <Trash2 className="h-4 w-4" />
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

                {/* Modal para crear/editar proyecto */}
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{selectedProyecto ? "Editar Proyecto" : "Crear Nuevo Proyecto"}</DialogTitle>
                            <DialogDescription>
                                {selectedProyecto
                                    ? "Modifica los datos del proyecto"
                                    : "Completa la información para crear un nuevo proyecto"}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Título del Proyecto *</Label>
                                    <Input
                                        value={formData.titulo}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, titulo: e.target.value }))}
                                        placeholder="Ej: Parque Solar Madrid"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Superficie Mínima (ha) *</Label>
                                    <Input
                                        type="number"
                                        value={formData.superficieMinima}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, superficieMinima: e.target.value }))}
                                        placeholder="Ej: 50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Descripción</Label>
                                <Textarea
                                    value={formData.descripcion}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, descripcion: e.target.value }))}
                                    placeholder="Describe tu proyecto..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Tipo de Proyecto *</Label>
                                    <Select
                                        value={formData.tipo}
                                        onValueChange={(value: TipoProyecto) => setFormData((prev) => ({ ...prev, tipo: value }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="SOLAR_FOTOVOLTAICO">Solar Fotovoltaico</SelectItem>
                                            <SelectItem value="EOLICO">Eólico</SelectItem>
                                            <SelectItem value="HIBRIDACION">Hibridación</SelectItem>
                                            <SelectItem value="ALMACENAMIENTO">Almacenamiento</SelectItem>
                                            <SelectItem value="HIDROGENO">Hidrógeno</SelectItem>
                                            <SelectItem value="BIOMETANO">Biometano</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Estado</Label>
                                    <Select
                                        value={formData.estado}
                                        onValueChange={(value: EstadoProyecto) => setFormData((prev) => ({ ...prev, estado: value }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="BORRADOR">Borrador</SelectItem>
                                            <SelectItem value="PLANIFICACION">Planificación</SelectItem>
                                            <SelectItem value="EN_DESARROLLO">En Desarrollo</SelectItem>
                                            <SelectItem value="ACTIVO">Activo</SelectItem>
                                            <SelectItem value="COMPLETADO">Completado</SelectItem>
                                            <SelectItem value="CANCELADO">Cancelado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Ubicación</Label>
                                    <Input
                                        value={formData.ubicacion}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, ubicacion: e.target.value }))}
                                        placeholder="Ciudad, Provincia"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Presupuesto (€)</Label>
                                    <Input
                                        type="number"
                                        value={formData.presupuesto}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, presupuesto: e.target.value }))}
                                        placeholder="Ej: 1000000"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                                Cancelar
                            </Button>
                            <Button onClick={handleSubmitProject}>{selectedProyecto ? "Actualizar" : "Crear Proyecto"}</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </ProtectedRoute>
    )
}
