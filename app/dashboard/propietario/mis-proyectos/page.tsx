"use client"

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import ProtectedRoute from "@/components/protected-route"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { useProyectos } from "@/hooks/useProyectos"
import { useTranslations } from "@/i18n/i18nContext"
import { ArrowLeft, Battery, Building2, Calendar, Euro, Leaf, MapPin, MessageCircle, Sun, TrendingUp, Wind, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

const getProjectTypeIcon = (tipo: string) => {
    switch (tipo?.toUpperCase()) {
        case "SOLAR_FOTOVOLTAICO":
        case "SOLAR":
            return <Sun className="h-5 w-5" />
        case "EOLICO":
        case "EÓLICO":
            return <Wind className="h-5 w-5" />
        case "HIBRIDACION":
        case "HÍBRIDO":
            return <Zap className="h-5 w-5" />
        case "ALMACENAMIENTO":
            return <Battery className="h-5 w-5" />
        case "HIDROGENO":
        case "BIOMETANO":
            return <Leaf className="h-5 w-5" />
        default:
            return <Building2 className="h-5 w-5" />
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
            return "bg-green-100 text-green-800 border-green-200"
        case "EN_DESARROLLO":
            return "bg-blue-100 text-blue-800 border-blue-200"
        case "PAUSADO":
            return "bg-yellow-100 text-yellow-800 border-yellow-200"
        case "COMPLETADO":
            return "bg-purple-100 text-purple-800 border-purple-200"
        default:
            return "bg-gray-100 text-gray-800 border-gray-200"
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
        default:
            return estado || "Desconocido"
    }
}

export default function MisProyectosPage() {
    const { t } = useTranslations()

    // Estados para filtros
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedType, setSelectedType] = useState<string>("all")
    const [selectedStatus, setSelectedStatus] = useState<string>("all")

    // Hook para cargar proyectos del usuario actual
    const { proyectos, pagination, isLoading, fetchMine } = useProyectos({
        autoFetch: false,
        withErrorHandling: true,
    })

    useEffect(() => {
        // Cargar los proyectos del usuario
        fetchMine()
    }, [fetchMine])

    // Estadísticas calculadas
    const stats = useMemo(() => {
        const total = proyectos?.length || 0
        const activos = proyectos?.filter((p) => p.estado?.toUpperCase() === "ACTIVO")?.length || 0
        const enDesarrollo = proyectos?.filter((p) => p.estado?.toUpperCase() === "EN_DESARROLLO")?.length || 0
        const completados = proyectos?.filter((p) => p.estado?.toUpperCase() === "COMPLETADO")?.length || 0
        const totalCapacity = proyectos?.reduce((sum, p) => sum + (parseFloat(String(p.potenciaObjetivo || 0)) || 0), 0) || 0
        const avgBudget =
            proyectos?.length > 0
                ? proyectos.reduce((sum, p) => sum + (parseFloat(String(p.presupuesto || 0)) || 0), 0) / proyectos.length
                : 0

        return {
            total,
            activos,
            enDesarrollo,
            completados,
            totalCapacity,
            avgBudget,
        }
    }, [proyectos])

    // Filtros aplicados
    const filteredProyectos = useMemo(() => {
        return (
            proyectos?.filter((proyecto) => {
                const matchesSearch =
                    !searchTerm ||
                    proyecto.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    proyecto.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    proyecto.ubicacion?.toLowerCase().includes(searchTerm.toLowerCase())

                const matchesType = selectedType === "all" || proyecto.tipo === selectedType
                const matchesStatus = selectedStatus === "all" || proyecto.estado === selectedStatus

                return matchesSearch && matchesType && matchesStatus
            }) || []
        )
    }, [proyectos, searchTerm, selectedType, selectedStatus])

    // Calcular estadísticas
    const hasProjects = proyectos?.length > 0

    return (
        <ProtectedRoute requiredRole="PROPIETARIO" redirectTo="/login/propietario">
            <div className="bg-background flex min-h-screen">
                <DashboardSidebar userType="propietario" />

                <main className="ml-64 flex-1">
                    {/* Header */}
                    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 border-b backdrop-blur">
                        <div className="flex h-16 items-center justify-between px-8">
                            <div className="flex items-center gap-4">
                                <Link href="/dashboard/propietario">
                                    <Button variant="ghost" size="sm" className="gap-2">
                                        <ArrowLeft className="h-4 w-4" />
                                        {t?.common?.back}
                                    </Button>
                                </Link>
                                <div>
                                    <h1 className="text-2xl font-bold">{t?.dashboard?.owner?.myProjects}</h1>
                                    <p className="text-muted-foreground text-sm">{t?.dashboard?.owner?.myProjectsSubtitle}</p>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="p-8">
                        {isLoading ? (
                            <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                                    <p className="text-muted-foreground text-sm">Cargando proyectos...</p>
                                </div>
                            </div>
                        ) : !hasProjects ? (
                            <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
                                <Empty className="max-w-2xl">
                                    <EmptyHeader>
                                        <EmptyMedia>
                                            <Building2 className="h-12 w-12" />
                                        </EmptyMedia>
                                        <EmptyTitle>No hay proyectos disponibles</EmptyTitle>
                                        <EmptyDescription>
                                            Aún no hay proyectos de energía renovable en la plataforma. Los promotores están añadiendo
                                            nuevos proyectos constantemente.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                    <EmptyContent>
                                        <Link href="/dashboard/propietario">
                                            <Button size="lg" className="gap-2">
                                                <ArrowLeft className="h-5 w-5" />
                                                Volver al dashboard
                                            </Button>
                                        </Link>
                                    </EmptyContent>
                                </Empty>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {/* Estadísticas */}
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <Card className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-sm font-medium">Total Proyectos</p>
                                                <p className="text-3xl font-bold">{stats.total}</p>
                                                <p className="text-muted-foreground mt-1 text-xs">En la plataforma</p>
                                            </div>
                                            <div className="bg-primary/10 rounded-full p-3">
                                                <Building2 className="text-primary h-5 w-5" />
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-sm font-medium">Proyectos Activos</p>
                                                <p className="text-3xl font-bold">{stats.activos}</p>
                                                <p className="text-muted-foreground mt-1 text-xs">Buscando terrenos</p>
                                            </div>
                                            <div className="rounded-full bg-green-500/10 p-3">
                                                <TrendingUp className="h-5 w-5 text-green-600" />
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-sm font-medium">Capacidad Total</p>
                                                <p className="text-3xl font-bold">{stats.totalCapacity.toFixed(0)}</p>
                                                <p className="text-muted-foreground mt-1 text-xs">MW planificados</p>
                                            </div>
                                            <div className="rounded-full bg-yellow-500/10 p-3">
                                                <Zap className="h-5 w-5 text-yellow-600" />
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-sm font-medium">Inversión Promedio</p>
                                                <p className="text-3xl font-bold">€{(stats.avgBudget / 1000000).toFixed(1)}M</p>
                                                <p className="text-muted-foreground mt-1 text-xs">Por proyecto</p>
                                            </div>
                                            <div className="rounded-full bg-blue-500/10 p-3">
                                                <Euro className="h-5 w-5 text-blue-600" />
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                {/* Lista de proyectos */}
                                <Card>
                                    <div className="border-b p-6">
                                        <h2 className="text-xl font-bold">Proyectos de Energía Renovable</h2>
                                        <p className="text-muted-foreground text-sm">
                                            Explora los proyectos disponibles que podrían estar interesados en tus terrenos
                                        </p>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid gap-6">
                                            {proyectos.map((proyecto) => (
                                                <Card key={proyecto.id} className="transition-shadow hover:shadow-md">
                                                    <div className="p-6">
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex flex-1 items-start gap-4">
                                                                <div className="bg-primary/10 rounded-xl p-3">
                                                                    {getProjectTypeIcon(proyecto.tipo)}
                                                                </div>
                                                                <div className="flex-1 space-y-3">
                                                                    <div>
                                                                        <h3 className="mb-1 text-lg font-semibold">{proyecto.titulo}</h3>
                                                                        <p className="text-muted-foreground line-clamp-2 text-sm">
                                                                            {proyecto.descripcion || "Proyecto de energía renovable"}
                                                                        </p>
                                                                    </div>

                                                                    <div className="flex flex-wrap gap-4 text-sm">
                                                                        <div className="flex items-center gap-1">
                                                                            <Building2 className="text-muted-foreground h-4 w-4" />
                                                                            <span className="font-medium">
                                                                                {getProjectTypeLabel(proyecto.tipo)}
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex items-center gap-1">
                                                                            <Zap className="text-muted-foreground h-4 w-4" />
                                                                            <span>{proyecto.potenciaObjetivo} MW</span>
                                                                        </div>
                                                                        <div className="flex items-center gap-1">
                                                                            <Euro className="text-muted-foreground h-4 w-4" />
                                                                            <span>
                                                                                €
                                                                                {(
                                                                                    parseFloat(String(proyecto.presupuesto || 0)) / 1000000
                                                                                ).toFixed(1)}
                                                                                M
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex items-center gap-1">
                                                                            <MapPin className="text-muted-foreground h-4 w-4" />
                                                                            <span>{proyecto.provincia || "Ubicación flexible"}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex items-center gap-3">
                                                                        <Badge
                                                                            variant="outline"
                                                                            className={getStatusColor(proyecto.estado)}
                                                                        >
                                                                            {getStatusLabel(proyecto.estado)}
                                                                        </Badge>
                                                                        <div className="flex items-center gap-1">
                                                                            <Calendar className="text-muted-foreground h-4 w-4" />
                                                                            <span className="text-muted-foreground text-xs">
                                                                                Actualizado{" "}
                                                                                {proyecto.actualizadoEn
                                                                                    ? new Date(proyecto.actualizadoEn).toLocaleDateString()
                                                                                    : "Fecha desconocida"}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="ml-4 flex flex-col gap-2">
                                                                <Button size="sm" className="gap-2">
                                                                    <MessageCircle className="h-4 w-4" />
                                                                    {t?.dashboard?.owner?.projects?.contact}
                                                                </Button>
                                                                <Button variant="outline" size="sm" className="gap-2">
                                                                    {t?.dashboard?.owner?.projects?.viewDetails}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    )
}
