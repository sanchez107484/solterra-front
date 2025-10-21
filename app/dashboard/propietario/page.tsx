"use client"

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DataTableTerrenos } from "@/components/dashboard/data-table-terrenos"
import ProtectedRoute from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { useTerrenos } from "@/hooks/useTerrenos"
import { useTranslations } from "@/i18n/i18nContext"
import { Calendar, MapPin, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"

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
                                                <p className="text-muted-foreground text-sm font-medium">Terrenos Activos</p>
                                                <p className="text-3xl font-bold">{stats.terrenosActivos}</p>
                                                <p className="text-muted-foreground mt-1 text-xs">de {total} totales</p>
                                            </div>
                                            <div className="bg-primary/10 rounded-full p-3">
                                                <MapPin className="text-primary h-5 w-5" />
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-sm font-medium">Promotores Interesados</p>
                                                <p className="text-3xl font-bold">{stats.totalInteresados}</p>
                                                <p className="text-muted-foreground mt-1 text-xs">en todos tus terrenos</p>
                                            </div>
                                            <div className="bg-secondary/10 rounded-full p-3">
                                                <TrendingUp className="text-secondary-foreground h-5 w-5" />
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-sm font-medium">Hectáreas Totales</p>
                                                <p className="text-3xl font-bold">{stats.hectareasTotales.toFixed(1)}</p>
                                                <p className="text-muted-foreground mt-1 text-xs">En {terrenos.length} ubicaciones</p>
                                            </div>
                                            <div className="bg-accent/10 rounded-full p-3">
                                                <MapPin className="text-accent h-5 w-5" />
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-sm font-medium">Ingresos Estimados</p>
                                                <p className="text-3xl font-bold">€{(stats.ingresosEstimados / 1000).toFixed(0)}K</p>
                                                <p className="text-muted-foreground mt-1 text-xs">Por año</p>
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
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    )
}
