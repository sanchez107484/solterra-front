"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { useTerrenos } from "@/hooks/useTerrenos"
import { useTranslations } from "@/i18n/i18nContext"
import { Calendar, CheckCheck, Euro, Eye, Landmark, MapPin, MessageCircle, Ruler, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

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

    useEffect(() => {
        fetchMine()
    }, [fetchMine])

    // Calcular estadísticas
    const totalTerrenos = terrenos?.length || 0
    const terrenosActivos = terrenos?.filter((t) => t.estado === "ACTIVO").length || 0
    const terrenosVendidos = terrenos?.filter((t) => t.estado === "VENDIDO").length || 0
    const valorTotal = terrenos?.reduce((sum, t) => sum + (t.precioVenta || 0), 0) || 0

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
                    ) : (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                            {terrenos.map((terreno) => (
                                <Card key={terreno.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                                    <div className="p-6">
                                        {/* Header con estado */}
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                                    {terreno.titulo}
                                                </h3>
                                                <Badge className={getTerrenoStateColor(terreno.estado)}>
                                                    {getTerrenoStateLabel(terreno.estado, t)}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Información principal */}
                                        <div className="mb-4 space-y-3">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                <MapPin className="h-4 w-4" />
                                                <span>
                                                    {terreno.direccion}, {terreno.municipio}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                <Ruler className="h-4 w-4" />
                                                <span>{terreno.superficie?.toLocaleString()} ha</span>
                                            </div>

                                            {terreno.precioVenta && (
                                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                    <Euro className="h-4 w-4" />
                                                    <span className="font-semibold text-green-600">
                                                        {formatCurrency(terreno.precioVenta)}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    {t?.dashboard?.owner?.terrenos?.created}:{" "}
                                                    {new Date(terreno.creadoEn).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Descripción */}
                                        {terreno.descripcion && (
                                            <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                                                {terreno.descripcion}
                                            </p>
                                        )}

                                        {/* Acciones */}
                                        <div className="flex gap-2 border-t pt-4">
                                            <Link href={`/dashboard/propietario/mis-terrenos/${terreno.id}`} className="flex-1">
                                                <Button variant="outline" size="sm" className="w-full">
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    {t?.common?.view}
                                                </Button>
                                            </Link>
                                            <Button variant="outline" size="sm">
                                                <MessageCircle className="mr-2 h-4 w-4" />
                                                {t?.dashboard?.owner?.terrenos?.contact}
                                            </Button>
                                        </div>
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
