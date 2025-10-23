"use client"

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DataTableTerrenos } from "@/components/dashboard/data-table-terrenos"
import ProtectedRoute from "@/components/protected-route"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { useProyectos } from "@/hooks/useProyectos"
import { useTerrenos } from "@/hooks/useTerrenos"
import { useTranslations } from "@/i18n/i18nContext"
import { ArrowRight, Battery, Building2, Calendar, Leaf, MapPin, Plus, Sun, TrendingUp, Wind, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

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
            return "Solar"
        case "EOLICO":
        case "EÓLICO":
            return "Eólico"
        case "HIBRIDACION":
        case "HÍBRIDO":
            return "Híbrido"
        case "ALMACENAMIENTO":
            return "Almacenamiento"
        case "HIDROGENO":
            return "Hidrógeno"
        case "BIOMETANO":
            return "Biometano"
        default:
            return tipo || "Otro"
    }
}

export default function DashboardPropietario() {
    const { t } = useTranslations()

    // Hook para cargar terrenos desde el backend
    const {
        terrenos,
        total,
        isLoading: terrenosLoading,
        fetchMine,
    } = useTerrenos({
        autoFetch: false,
    })

    // Hook para cargar proyectos disponibles
    const {
        proyectos,
        isLoading: proyectosLoading,
        fetchProyectos,
    } = useProyectos({
        autoFetch: false,
        withErrorHandling: true,
    })

    useEffect(() => {
        fetchMine()
        fetchProyectos()
    }, [fetchMine, fetchProyectos])

    // Calcular estadísticas desde los datos reales (robusto frente a campos faltantes / distintas claves)
    const stats = {
        terrenosActivos: terrenos.filter((t) => String(t?.estado ?? "").toUpperCase() === "ACTIVO").length,
        totalInteresados: terrenos.reduce((sum, t) => sum + (Number((t as any).interesados) || 0), 0),
        hectareasTotales: terrenos.reduce((sum, t) => sum + (Number((t as any).superficie ?? (t as any).hectareas) || 0), 0),
        ingresosEstimados: terrenos.reduce((sum, t) => sum + (Number((t as any).superficie ?? (t as any).hectareas) || 0) * 2500, 0),
    }

    const hasTerrenos = terrenos.length > 0

    // Mapear los terrenos del backend al shape que espera la tabla del dashboard
    const mappedTerrenos = terrenos.map((t) => {
        const hectareas = Number((t as any).superficie ?? (t as any).hectareas) || 0

        const tipo = (t as any).tipo
            ? String((t as any).tipo)
            : t.tipoSuelo
              ? // heurística simple: el frontend usa etiquetas legibles
                t.tipoSuelo === "NO_URBANIZABLE"
                  ? "Híbrido"
                  : "Solar"
              : "Otro"

        const estadoRaw = String(t?.estado ?? "").toUpperCase()
        const estado =
            estadoRaw === "ACTIVO"
                ? "Activo"
                : estadoRaw === "PAUSADO"
                  ? "Pausado"
                  : estadoRaw === "PENDIENTE_REVISION"
                    ? "En revisión"
                    : estadoRaw === "RECHAZADO" || estadoRaw === "VENDIDO"
                      ? "No disponible"
                      : String(t?.estado ?? "")

        return {
            id: t.id,
            ubicacion: t.titulo || t.direccion || `${t.municipio}, ${t.provincia}`,
            referencia: (t as any).referenciaCatastral ?? t.referenciaCatastral ?? t.id,
            hectareas,
            tipo: tipo as any,
            estado: estado as any,
            interesados: Number((t as any).interesados) || 0,
        }
    })

    return (
        <ProtectedRoute requiredRole="PROPIETARIO" redirectTo="/login/propietario">
            <div className="bg-background flex min-h-screen">
                <DashboardSidebar userType="propietario" />

                <main className="ml-64 flex-1">
                    {/* Header */}
                    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 border-b backdrop-blur">
                        <div className="flex h-16 items-center justify-between px-8">
                            <div>
                                <h1 className="text-2xl font-bold">{t?.dashboard?.owner?.title}</h1>
                                <p className="text-muted-foreground text-sm">{t?.dashboard?.owner?.subtitle}</p>
                            </div>
                            <Link href="/dashboard/propietario/nuevo-terreno">
                                <Button className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    {t?.dashboard?.owner?.addLand}
                                </Button>
                            </Link>
                        </div>
                    </header>

                    <div className="p-8">
                        {terrenosLoading ? (
                            <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                                    <p className="text-muted-foreground text-sm">Cargando tus terrenos...</p>
                                </div>
                            </div>
                        ) : !hasTerrenos ? (
                            <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
                                <Empty className="max-w-2xl">
                                    <EmptyHeader>
                                        <EmptyMedia>
                                            <MapPin className="h-12 w-12" />
                                        </EmptyMedia>
                                        <EmptyTitle>{t?.dashboard?.empty?.owner?.title}</EmptyTitle>
                                        <EmptyDescription>{t?.dashboard?.empty?.owner?.description}</EmptyDescription>
                                    </EmptyHeader>
                                    <EmptyContent>
                                        <Link href="/dashboard/propietario/nuevo-terreno">
                                            <Button size="lg" className="gap-2">
                                                <Plus className="h-5 w-5" />
                                                {t?.dashboard?.empty?.owner?.addLand}
                                            </Button>
                                        </Link>
                                        <div className="mt-8 grid grid-cols-3 gap-6 border-t pt-6">
                                            <div className="text-center">
                                                <div className="text-primary text-2xl font-bold">€2,500</div>
                                                <div className="text-muted-foreground text-xs">
                                                    {t?.dashboard?.empty?.owner?.metrics?.avgIncomeLabel}
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-primary text-2xl font-bold">25 años</div>
                                                <div className="text-muted-foreground text-xs">
                                                    {t?.dashboard?.empty?.owner?.metrics?.contractDurationLabel}
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-primary text-2xl font-bold">98%</div>
                                                <div className="text-muted-foreground text-xs">
                                                    {t?.dashboard?.empty?.owner?.metrics?.successRateLabel}
                                                </div>
                                            </div>
                                        </div>
                                    </EmptyContent>
                                </Empty>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Estadísticas */}
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <Card className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-sm font-medium">
                                                    {t?.dashboard?.owner?.stats?.activeLands}
                                                </p>
                                                <p className="text-3xl font-bold">{stats.terrenosActivos}</p>
                                                <p className="text-muted-foreground mt-1 text-xs">
                                                    {t?.dashboard?.owner?.stats?.totalActiveLands?.replace("{total}", String(total))}
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
                                                    {t?.dashboard?.owner?.stats?.interestedPromoters}
                                                </p>
                                                <p className="text-3xl font-bold">{stats.totalInteresados}</p>
                                                <p className="text-muted-foreground mt-1 text-xs">{t?.dashboard?.owner?.stats?.allLands}</p>
                                            </div>
                                            <div className="bg-secondary/10 rounded-full p-3">
                                                <TrendingUp className="text-secondary-foreground h-5 w-5" />
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-sm font-medium">
                                                    {t?.dashboard?.owner?.stats?.totalHectares}
                                                </p>
                                                <p className="text-3xl font-bold">{stats.hectareasTotales.toFixed(1)}</p>
                                                <p className="text-muted-foreground mt-1 text-xs">
                                                    {t?.dashboard?.owner?.stats?.multipleLocations?.replace(
                                                        "{count}",
                                                        String(terrenos.length)
                                                    )}
                                                </p>
                                            </div>
                                            <div className="bg-accent/10 rounded-full p-3">
                                                <MapPin className="text-accent h-5 w-5" />
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-sm font-medium">
                                                    {t?.dashboard?.owner?.stats?.estimatedIncome}
                                                </p>
                                                <p className="text-3xl font-bold">€{(stats.ingresosEstimados / 1000).toFixed(0)}K</p>
                                                <p className="text-muted-foreground mt-1 text-xs">{t?.dashboard?.owner?.stats?.perYear}</p>
                                            </div>
                                            <div className="bg-primary/10 rounded-full p-3">
                                                <Calendar className="text-primary h-5 w-5" />
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                {/* Tabla de terrenos */}
                                <Card>
                                    <div className="border-b p-6">
                                        <h2 className="text-xl font-bold">{t?.dashboard?.owner?.yourLands}</h2>
                                        <p className="text-muted-foreground text-sm">{t?.dashboard?.owner?.manageAndView}</p>
                                    </div>
                                    <div className="p-6">
                                        <DataTableTerrenos data={mappedTerrenos} />
                                    </div>
                                </Card>

                                {/* Proyectos disponibles */}
                                <Card>
                                    <div className="border-b p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h2 className="text-xl font-bold">{t?.dashboard?.owner?.availableProjects}</h2>
                                                <p className="text-muted-foreground text-sm">
                                                    {t?.dashboard?.owner?.availableProjectsSubtitle}
                                                </p>
                                            </div>
                                            <Link href="/dashboard/propietario/mis-proyectos">
                                                <Button variant="outline" className="gap-2">
                                                    {t?.dashboard?.owner?.viewAllProjects}
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        {proyectosLoading ? (
                                            <div className="flex items-center justify-center py-12">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                                                    <p className="text-muted-foreground text-sm">Cargando proyectos...</p>
                                                </div>
                                            </div>
                                        ) : !proyectos || proyectos.length === 0 ? (
                                            <div className="py-12 text-center">
                                                <Building2 className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                                                <h3 className="mb-2 text-lg font-medium">No hay proyectos disponibles</h3>
                                                <p className="text-muted-foreground text-sm">
                                                    Los promotores están añadiendo nuevos proyectos constantemente.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="grid gap-4">
                                                {proyectos?.slice(0, 3).map((proyecto) => (
                                                    <Card key={proyecto.id} className="border transition-shadow hover:shadow-md">
                                                        <div className="p-4">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex flex-1 items-center gap-3">
                                                                    <div className="bg-primary/10 rounded-lg p-2">
                                                                        {getProjectTypeIcon(proyecto.tipo)}
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <h3 className="line-clamp-1 font-semibold">{proyecto.titulo}</h3>
                                                                        <div className="text-muted-foreground mt-1 flex items-center gap-4 text-sm">
                                                                            <span>{getProjectTypeLabel(proyecto.tipo)}</span>
                                                                            <span>{proyecto.potenciaObjetivo} MW</span>
                                                                            <span>{proyecto.provincia || "Ubicación flexible"}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="border-green-200 bg-green-50 text-green-700"
                                                                    >
                                                                        Alta compatibilidad
                                                                    </Badge>
                                                                    <Button size="sm" variant="outline">
                                                                        {t?.dashboard?.owner?.projects?.contact}
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                ))}
                                            </div>
                                        )}
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
