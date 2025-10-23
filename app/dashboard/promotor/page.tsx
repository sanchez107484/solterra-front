"use client"

import { DataTableProyectos } from "@/components/dashboard/data-table-proyectos"
import ProtectedRoute from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { useTranslations } from "@/i18n/i18nContext"
import { Briefcase, Calendar, MapPin, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useProyectos } from "../../../hooks/useProyectos"

export default function DashboardPromotor() {
    const { t } = useTranslations()

    // Hook para cargar proyectos desde el backend
    const {
        proyectos,
        total,
        isLoading: proyectosLoading,
        fetchMine,
    } = useProyectos({
        autoFetch: false,
    })

    // Calcular estadísticas desde los datos reales
    const stats = {
        proyectosActivos: proyectos?.filter((p: any) => p.estado === "Activo" || p.estado === "En desarrollo")?.length || 0,
        terrenosCompatibles: proyectos?.reduce((sum: number, p: any) => sum + (p.terrenosCompatibles || 0), 0) || 0,
        capacidadTotal: proyectos?.reduce((sum: number, p: any) => sum + (p.capacidad || 0), 0) || 0,
        inversionEstimada: proyectos?.reduce((sum: number, p: any) => sum + (p.inversionEstimada || 0), 0) || 0,
    }

    const hasProyectos = proyectos?.length > 0

    return (
        <ProtectedRoute requiredRole="PROMOTOR" redirectTo="/login/promotor">
            <div className="h-full">
                {/* Header */}
                <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 border-b backdrop-blur">
                    <div className="flex h-16 items-center justify-between px-6">
                        <div>
                            <h1 className="text-2xl font-bold">{t?.dashboard?.promoter?.title}</h1>
                            <p className="text-muted-foreground text-sm">{t?.dashboard?.promoter?.subtitle}</p>
                        </div>
                        <Link href="/dashboard/promotor/nuevo-proyecto">
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                {t?.dashboard?.promoter?.newProject}
                            </Button>
                        </Link>
                    </div>
                </header>

                {/* Content */}
                <div className="p-6">
                    {proyectosLoading ? (
                        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
                            <div className="flex flex-col items-center gap-4">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                                <p className="text-muted-foreground text-sm">Cargando tus proyectos...</p>
                            </div>
                        </div>
                    ) : !hasProyectos ? (
                        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
                            <Empty className="max-w-2xl">
                                <EmptyHeader>
                                    <EmptyMedia>
                                        <Briefcase className="h-12 w-12" />
                                    </EmptyMedia>
                                    <EmptyTitle>{t?.dashboard?.promoter?.emptyTitle}</EmptyTitle>
                                    <EmptyDescription>{t?.dashboard?.promoter?.emptyDesc}</EmptyDescription>
                                </EmptyHeader>
                                <EmptyContent>
                                    <Link href="/dashboard/promotor/nuevo-proyecto">
                                        <Button size="lg" className="gap-2">
                                            <Plus className="h-5 w-5" />
                                            {t?.dashboard?.promoter?.emptyCta}
                                        </Button>
                                    </Link>
                                    <div className="mt-8 grid grid-cols-3 gap-6 border-t pt-6">
                                        <div className="text-center">
                                            <div className="text-secondary-foreground text-2xl font-bold">500+</div>
                                            <div className="text-muted-foreground text-xs">{t?.dashboard?.promoter?.stats?.available}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-secondary-foreground text-2xl font-bold">150MW</div>
                                            <div className="text-muted-foreground text-xs">{t?.dashboard?.promoter?.stats?.capacity}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-secondary-foreground text-2xl font-bold">95%</div>
                                            <div className="text-muted-foreground text-xs">{t?.dashboard?.promoter?.stats?.match}</div>
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
                                                {t?.dashboard?.promoter?.statsCard?.activeProjects}
                                            </p>
                                            <p className="text-3xl font-bold">{stats.proyectosActivos}</p>
                                            <p className="text-muted-foreground mt-1 text-xs">de {proyectos?.length || 0} totales</p>
                                        </div>
                                        <div className="bg-secondary/10 rounded-full p-3">
                                            <Briefcase className="text-secondary-foreground h-5 w-5" />
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-muted-foreground text-sm font-medium">
                                                {t?.dashboard?.promoter?.statsCard?.compatibleLands}
                                            </p>
                                            <p className="text-3xl font-bold">{stats.terrenosCompatibles}</p>
                                            <p className="text-muted-foreground mt-1 text-xs">
                                                {t?.dashboard?.promoter?.statsCard?.availableNow}
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
                                                {t?.dashboard?.promoter?.statsCard?.totalCapacity}
                                            </p>
                                            <p className="text-3xl font-bold">{stats.capacidadTotal} MW</p>
                                            <p className="text-muted-foreground mt-1 text-xs">
                                                {t?.dashboard?.promoter?.statsCard?.planned}
                                            </p>
                                        </div>
                                        <div className="bg-accent/10 rounded-full p-3">
                                            <TrendingUp className="text-accent h-5 w-5" />
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-muted-foreground text-sm font-medium">
                                                {t?.dashboard?.promoter?.statsCard?.estimatedInvestment}
                                            </p>
                                            <p className="text-3xl font-bold">€{(stats.inversionEstimada / 1000000).toFixed(0)}M</p>
                                            <p className="text-muted-foreground mt-1 text-xs">
                                                {t?.dashboard?.promoter?.statsCard?.totalProjects}
                                            </p>
                                        </div>
                                        <div className="bg-secondary/10 rounded-full p-3">
                                            <Calendar className="text-secondary-foreground h-5 w-5" />
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            {/* Tabla de proyectos */}
                            <Card>
                                <div className="border-b p-6">
                                    <h2 className="text-xl font-bold">{t?.dashboard?.promoter?.yourProjects}</h2>
                                    <p className="text-muted-foreground text-sm">{t?.dashboard?.promoter?.manageAndFind}</p>
                                </div>
                                <div className="p-6">
                                    <DataTableProyectos
                                        data={proyectos.map((p: any) => ({
                                            ...p,
                                            referencia: p.id, // Temporal: usar ID como referencia si no existe
                                            terrenos: p.terrenosCompatibles || 0,
                                        }))}
                                    />
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    )
}
