"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MatchesTable } from "@/components/dashboard/matches-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTranslations } from "@/i18n/i18nContext"
import {
    AlertTriangle,
    Building2,
    Compass,
    Euro,
    FileText,
    MapPin,
    MapPinned,
    Mountain,
    Pencil,
    Ruler,
    Shield,
    Wind,
    Zap,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function TerrenoDetallePage() {
    const { t } = useTranslations()
    const params = useParams()
    const terrenoId = params.id as string

    const [terreno, setTerreno] = useState<any>(null)
    const [matches, setMatches] = useState<any[]>([])
    const [isLoadingMatches, setIsLoadingMatches] = useState(false)
    const [isLoadingTerreno, setIsLoadingTerreno] = useState(true)

    useEffect(() => {
        const loadTerreno = async () => {
            try {
                const token = localStorage.getItem("auth_token")
                if (!token) return

                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

                const response = await fetch(`${API_URL}/terrenos/${terrenoId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    setTerreno(data)
                }
            } catch (error) {
                console.error("Error loading terreno:", error)
            } finally {
                setIsLoadingTerreno(false)
            }
        }

        loadTerreno()
    }, [terrenoId])

    useEffect(() => {
        const loadMatches = async () => {
            if (!terrenoId) return

            setIsLoadingMatches(true)
            try {
                const token = localStorage.getItem("auth_token")
                if (!token) return

                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

                // Usar el endpoint correcto del módulo Matches
                const response = await fetch(`${API_URL}/matches/terreno/${terrenoId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    console.log("Matches response:", data)

                    // Transformar los datos del backend al formato esperado por MatchesTable
                    const transformedMatches = Array.isArray(data)
                        ? data.map((match: any) => ({
                              id: match.proyecto?.id || match.id,
                              titulo: match.proyecto?.titulo || "",
                              tipo: match.proyecto?.tipo || "",
                              potenciaObjetivo: match.proyecto?.potenciaObjetivo,
                              provincia: match.proyecto?.provincia,
                              compatibilidad: match.scoreTotal || 0,
                              estado: match.proyecto?.estado || match.estado,
                          }))
                        : []

                    setMatches(transformedMatches)
                }
            } catch (error) {
                console.error("Error loading matches:", error)
            } finally {
                setIsLoadingMatches(false)
            }
        }

        loadMatches()
    }, [terrenoId])

    const getEstadoColor = (estado: string) => {
        switch (estado?.toUpperCase()) {
            case "ACTIVO":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "PAUSADO":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "PENDIENTE_REVISION":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case "ARRENDADO":
            case "VENDIDO":
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        }
    }

    return (
        <>
            <DashboardHeader
                title={terreno?.titulo || t?.dashboard?.owner?.terrenos?.terrain?.title}
                breadcrumbs={[
                    { label: t?.dashboard?.breadcrumbs?.dashboard, href: "/dashboard/propietario" },
                    { label: t?.dashboard?.owner?.terrenos?.title, href: "/dashboard/propietario/mis-terrenos" },
                    { label: terreno?.titulo || t?.dashboard?.breadcrumbs?.landDetail },
                ]}
                userType="propietario"
            />

            <main className="p-6">
                {isLoadingTerreno ? (
                    <div className="flex min-h-[50vh] items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                            <p className="text-muted-foreground text-sm">{t?.dashboard?.owner?.terrenos?.terrain?.loading}</p>
                        </div>
                    </div>
                ) : terreno ? (
                    <div className="space-y-6">
                        {/* Header Card con título y estado */}
                        <Card className="border-primary/20 from-primary/5 via-background to-accent/5 bg-gradient-to-br py-0">
                            <div className="p-6">
                                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                    <div className="flex-1">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                                                <MapPin className="text-primary h-6 w-6" />
                                            </div>
                                            <div>
                                                <h1 className="text-foreground text-2xl font-bold md:text-3xl">{terreno.titulo}</h1>
                                                <p className="text-muted-foreground text-sm">ID: {terreno.id?.slice(0, 8)}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Badge className={getEstadoColor(terreno.estado)}>{terreno.estado}</Badge>
                                            {terreno.disponibilidad && (
                                                <Badge variant="outline" className="border-primary/30 text-primary">
                                                    {terreno.disponibilidad}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <Link href={`/dashboard/propietario/mis-terrenos/${terrenoId}/editar`}>
                                        <Button className="gap-2 shadow-md">
                                            <Pencil className="h-4 w-4" />
                                            {t?.dashboard?.owner?.table?.edit}
                                        </Button>
                                    </Link>
                                </div>

                                {terreno.descripcion && (
                                    <div className="bg-background/50 mt-4 rounded-lg border p-4">
                                        <p className="text-foreground/80 leading-relaxed">{terreno.descripcion}</p>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Grid de información principal */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* Ubicación */}
                            <Card className="group py-0 transition-all hover:shadow-lg">
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-primary/10 group-hover:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                                            <MapPinned className="text-primary h-5 w-5" />
                                        </div>
                                        <h3 className="text-foreground text-lg font-semibold">
                                            {t?.dashboard?.owner?.terrenos?.terrain?.sections?.location}
                                        </h3>
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <div>
                                            <p className="text-muted-foreground mb-1">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.labels?.address}
                                            </p>
                                            <p className="text-foreground font-medium">{terreno.direccion}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <p className="text-muted-foreground mb-1">
                                                    {t?.dashboard?.owner?.terrenos?.terrain?.labels?.municipality}
                                                </p>
                                                <p className="text-foreground font-medium">{terreno.municipio}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground mb-1">
                                                    {t?.dashboard?.owner?.terrenos?.terrain?.labels?.province}
                                                </p>
                                                <p className="text-foreground font-medium">{terreno.provincia}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground mb-1">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.labels?.postalCode}
                                            </p>
                                            <p className="text-foreground font-medium">{terreno.codigoPostal}</p>
                                        </div>
                                        {terreno.latitud && terreno.longitud && (
                                            <div>
                                                <p className="text-muted-foreground mb-1">
                                                    {t?.dashboard?.owner?.terrenos?.terrain?.labels?.coordinates}
                                                </p>
                                                <p className="text-foreground font-medium">
                                                    {terreno.latitud.toFixed(6)}, {terreno.longitud.toFixed(6)}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>

                            {/* Características del Terreno */}
                            <Card className="group py-0 transition-all hover:shadow-lg">
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-accent/10 group-hover:bg-accent/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                                            <Ruler className="text-accent h-5 w-5" />
                                        </div>
                                        <h3 className="text-foreground text-lg font-semibold">
                                            {t?.dashboard?.owner?.terrenos?.terrain?.sections?.characteristics}
                                        </h3>
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <div className="bg-primary/5 border-primary/10 rounded-lg border p-3">
                                            <p className="text-muted-foreground mb-1">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.labels?.surface}
                                            </p>
                                            <p className="text-primary text-xl font-bold">{terreno.superficie} ha</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground mb-1">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.labels?.soilType}
                                            </p>
                                            <p className="text-foreground font-medium">{terreno.tipoSuelo?.replace(/_/g, " ")}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground mb-1">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.labels?.cadastralRef}
                                            </p>
                                            <p className="text-foreground font-medium">
                                                {terreno.referenciaCatastral || t?.dashboard?.owner?.terrenos?.terrain?.values?.noInfo}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Información Económica */}
                            <Card className="group py-0 transition-all hover:shadow-lg">
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-secondary/10 group-hover:bg-secondary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                                            <Euro className="text-secondary h-5 w-5" />
                                        </div>
                                        <h3 className="text-foreground text-lg font-semibold">
                                            {t?.dashboard?.owner?.terrenos?.terrain?.sections?.economic}
                                        </h3>
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <div>
                                            <p className="text-muted-foreground mb-1">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.labels?.availability}
                                            </p>
                                            <p className="text-foreground font-medium">{terreno.disponibilidad?.replace(/_/g, " ")}</p>
                                        </div>
                                        {terreno.precioVenta && (
                                            <div className="bg-secondary/5 border-secondary/10 rounded-lg border p-3">
                                                <p className="text-muted-foreground mb-1">
                                                    {t?.dashboard?.owner?.terrenos?.terrain?.labels?.salePrice}
                                                </p>
                                                <p className="text-secondary text-lg font-bold">
                                                    {new Intl.NumberFormat("es-ES", {
                                                        style: "currency",
                                                        currency: "EUR",
                                                    }).format(terreno.precioVenta)}
                                                </p>
                                            </div>
                                        )}
                                        {terreno.precioArrendamiento && (
                                            <div className="bg-secondary/5 border-secondary/10 rounded-lg border p-3">
                                                <p className="text-muted-foreground mb-1">
                                                    {t?.dashboard?.owner?.terrenos?.terrain?.labels?.rentPrice}
                                                </p>
                                                <p className="text-secondary text-lg font-bold">
                                                    {new Intl.NumberFormat("es-ES", {
                                                        style: "currency",
                                                        currency: "EUR",
                                                    }).format(terreno.precioArrendamiento)}
                                                    <span className="text-muted-foreground text-xs font-normal">
                                                        {t?.dashboard?.owner?.terrenos?.terrain?.values?.perYear}
                                                    </span>
                                                </p>
                                            </div>
                                        )}
                                        {!terreno.precioVenta && !terreno.precioArrendamiento && (
                                            <p className="text-muted-foreground italic">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.values?.noPrice}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Sección de Topografía y Orientación */}
                        <Card className="py-0">
                            <div className="border-border border-b p-6">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                                        <Mountain className="text-primary h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-foreground text-lg font-semibold">
                                            {t?.dashboard?.owner?.terrenos?.terrain?.sections?.topography}
                                        </h3>
                                        <p className="text-muted-foreground text-sm">
                                            {t?.dashboard?.owner?.terrenos?.terrain?.sections?.topographyDesc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-4 p-6 md:grid-cols-3">
                                <div className="flex items-start gap-3">
                                    <div className="bg-accent/10 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
                                        <Compass className="text-accent h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground mb-1 text-sm">
                                            {t?.dashboard?.owner?.terrenos?.terrain?.labels?.orientation}
                                        </p>
                                        <p className="text-foreground font-medium">
                                            {terreno.orientacion || t?.dashboard?.owner?.terrenos?.terrain?.values?.notSpecifiedFem}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-accent/10 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
                                        <Mountain className="text-accent h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground mb-1 text-sm">
                                            {t?.dashboard?.owner?.terrenos?.terrain?.labels?.slope}
                                        </p>
                                        <p className="text-foreground font-medium">
                                            {terreno.pendiente
                                                ? `${terreno.pendiente}%`
                                                : t?.dashboard?.owner?.terrenos?.terrain?.values?.notSpecifiedFem}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-accent/10 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
                                        <Zap className="text-accent h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground mb-1 text-sm">
                                            {t?.dashboard?.owner?.terrenos?.terrain?.labels?.gridDistance}
                                        </p>
                                        <p className="text-foreground font-medium">
                                            {terreno.distanciaRed
                                                ? `${terreno.distanciaRed} km`
                                                : t?.dashboard?.owner?.terrenos?.terrain?.values?.notSpecifiedFem}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Potencial Energético */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card className="group py-0 transition-all hover:shadow-lg">
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10 transition-colors group-hover:bg-yellow-500/20">
                                            <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                                        </div>
                                        <h3 className="text-foreground text-lg font-semibold">
                                            {t?.dashboard?.owner?.terrenos?.terrain?.sections?.solarPotential}
                                        </h3>
                                    </div>
                                    {terreno.potencialSolar ? (
                                        <div className="space-y-3">
                                            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
                                                <p className="text-muted-foreground mb-2 text-sm">
                                                    {t?.dashboard?.owner?.terrenos?.terrain?.labels?.estimatedCapacity}
                                                </p>
                                                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                                    {terreno.potencialSolar} MW
                                                </p>
                                            </div>
                                            <div className="bg-muted/50 h-3 overflow-hidden rounded-full">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
                                                    style={{ width: `${Math.min((terreno.potencialSolar / 50) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground italic">
                                            {t?.dashboard?.owner?.terrenos?.terrain?.values?.notCalculated}
                                        </p>
                                    )}
                                </div>
                            </Card>

                            <Card className="group py-0 transition-all hover:shadow-lg">
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 transition-colors group-hover:bg-blue-500/20">
                                            <Wind className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <h3 className="text-foreground text-lg font-semibold">
                                            {t?.dashboard?.owner?.terrenos?.terrain?.sections?.windPotential}
                                        </h3>
                                    </div>
                                    {terreno.potencialEolico ? (
                                        <div className="space-y-3">
                                            <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
                                                <p className="text-muted-foreground mb-2 text-sm">
                                                    {t?.dashboard?.owner?.terrenos?.terrain?.labels?.estimatedCapacity}
                                                </p>
                                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                    {terreno.potencialEolico} MW
                                                </p>
                                            </div>
                                            <div className="bg-muted/50 h-3 overflow-hidden rounded-full">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                                                    style={{ width: `${Math.min((terreno.potencialEolico / 100) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground italic">
                                            {t?.dashboard?.owner?.terrenos?.terrain?.values?.notCalculated}
                                        </p>
                                    )}
                                </div>
                            </Card>
                        </div>

                        {/* Infraestructura Eléctrica */}
                        {(terreno.distanciaSubestacion || terreno.nombreSubestacion || terreno.capacidadSubestacion) && (
                            <Card className="py-0">
                                <div className="border-border border-b p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                                            <Building2 className="text-primary h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-foreground text-lg font-semibold">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.sections?.electricInfra}
                                            </h3>
                                            <p className="text-muted-foreground text-sm">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.sections?.electricInfraDesc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-4 p-6 md:grid-cols-3">
                                    {terreno.nombreSubestacion && (
                                        <div>
                                            <p className="text-muted-foreground mb-1 text-sm">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.labels?.substation}
                                            </p>
                                            <p className="text-foreground font-medium">{terreno.nombreSubestacion}</p>
                                        </div>
                                    )}
                                    {terreno.distanciaSubestacion && (
                                        <div>
                                            <p className="text-muted-foreground mb-1 text-sm">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.labels?.distance}
                                            </p>
                                            <p className="text-foreground font-medium">{terreno.distanciaSubestacion} km</p>
                                        </div>
                                    )}
                                    {terreno.capacidadSubestacion && (
                                        <div>
                                            <p className="text-muted-foreground mb-1 text-sm">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.labels?.capacity}
                                            </p>
                                            <p className="text-foreground font-medium">{terreno.capacidadSubestacion} MVA</p>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        )}

                        {/* Restricciones y Consideraciones */}
                        {(terreno.servidumbres || terreno.restriccionesAmbientales || terreno.zonasProtegidas !== null) && (
                            <Card className="border-amber-200 py-0 dark:border-amber-800">
                                <div className="border-border bg-amber-50/50 p-6 dark:bg-amber-900/10">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                                            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-foreground text-lg font-semibold">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.sections?.restrictions}
                                            </h3>
                                            <p className="text-muted-foreground text-sm">
                                                {t?.dashboard?.owner?.terrenos?.terrain?.sections?.restrictionsDesc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4 p-6">
                                    {terreno.zonasProtegidas !== null && (
                                        <div className="flex items-start gap-3">
                                            <Shield className="text-muted-foreground mt-1 h-5 w-5 flex-shrink-0" />
                                            <div>
                                                <p className="text-foreground mb-1 font-medium">
                                                    {t?.dashboard?.owner?.terrenos?.terrain?.labels?.protectedAreas}
                                                </p>
                                                <p
                                                    className={
                                                        terreno.zonasProtegidas ? "text-amber-600 dark:text-amber-400" : "text-primary"
                                                    }
                                                >
                                                    {terreno.zonasProtegidas
                                                        ? t?.dashboard?.owner?.terrenos?.terrain?.values?.hasProtectedAreas
                                                        : t?.dashboard?.owner?.terrenos?.terrain?.values?.noProtectedAreas}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {terreno.servidumbres && (
                                        <div className="flex items-start gap-3">
                                            <FileText className="text-muted-foreground mt-1 h-5 w-5 flex-shrink-0" />
                                            <div>
                                                <p className="text-foreground mb-1 font-medium">
                                                    {t?.dashboard?.owner?.terrenos?.terrain?.labels?.easements}
                                                </p>
                                                <p className="text-muted-foreground text-sm">{terreno.servidumbres}</p>
                                            </div>
                                        </div>
                                    )}
                                    {terreno.restriccionesAmbientales && (
                                        <div className="flex items-start gap-3">
                                            <AlertTriangle className="text-muted-foreground mt-1 h-5 w-5 flex-shrink-0" />
                                            <div>
                                                <p className="text-foreground mb-1 font-medium">
                                                    {t?.dashboard?.owner?.terrenos?.terrain?.labels?.environmentalRestrictions}
                                                </p>
                                                <p className="text-muted-foreground text-sm">{terreno.restriccionesAmbientales}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        )}

                        {/* Matches */}
                        <div>
                            <div className="mb-4">
                                <h2 className="text-foreground mb-2 text-2xl font-bold">
                                    {t?.dashboard?.owner?.terrenos?.terrain?.compatibleTitle}
                                </h2>
                                <p className="text-muted-foreground">
                                    {t?.dashboard?.owner?.terrenos?.terrain?.matchesFound?.replace("{count}", String(matches.length))}
                                </p>
                            </div>
                            <MatchesTable matches={matches} isLoading={isLoadingMatches} />
                        </div>
                    </div>
                ) : (
                    <Card className="p-12 py-0">
                        <div className="text-center">
                            <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-semibold">{t?.dashboard?.owner?.terrenos?.terrain?.notFound?.title}</h3>
                            <p className="text-muted-foreground text-sm">{t?.dashboard?.owner?.terrenos?.terrain?.notFound?.desc}</p>
                            <Link href="/dashboard/propietario">
                                <Button className="mt-4">{t?.common?.backToDashboard}</Button>
                            </Link>
                        </div>
                    </Card>
                )}
            </main>
        </>
    )
}
