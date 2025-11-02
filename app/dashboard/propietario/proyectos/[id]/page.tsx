"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTranslations } from "@/i18n/i18nContext"
import type { Proyecto } from "@/types/proyecto.types"
import {
    ArrowRight,
    Battery,
    Briefcase,
    Building2,
    Calendar,
    CheckCircle2,
    Leaf,
    MapPin,
    MessageCircle,
    Ruler,
    Sun,
    Wind,
    Zap,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const getProjectTypeIcon = (tipo: string) => {
    switch (tipo?.toUpperCase()) {
        case "SOLAR_FOTOVOLTAICO":
        case "SOLAR":
            return <Sun className="h-5 w-5 text-yellow-500" />
        case "EOLICO":
        case "EÓLICO":
            return <Wind className="h-5 w-5 text-blue-500" />
        case "HIBRIDACION":
        case "HÍBRIDO":
            return <Zap className="h-5 w-5 text-purple-500" />
        case "ALMACENAMIENTO":
            return <Battery className="h-5 w-5 text-green-500" />
        case "HIDROGENO":
        case "BIOMETANO":
            return <Leaf className="h-5 w-5 text-emerald-500" />
        default:
            return <Building2 className="h-5 w-5 text-gray-500" />
    }
}

export default function ProyectoDetallePropietarioPage() {
    const { t } = useTranslations()
    const params = useParams()
    const proyectoId = params.id as string

    const [proyecto, setProyecto] = useState<Proyecto | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadProyecto = async () => {
            try {
                const token = localStorage.getItem("auth_token")
                if (!token) return

                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

                const response = await fetch(`${API_URL}/proyectos/${proyectoId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    setProyecto(data)
                }
            } catch (error) {
                console.error("Error loading proyecto:", error)
            } finally {
                setIsLoading(false)
            }
        }

        loadProyecto()
    }, [proyectoId])

    const getEstadoColor = (estado: string) => {
        switch (estado?.toUpperCase()) {
            case "ACTIVO":
            case "EN_DESARROLLO":
            case "EN_BUSQUEDA":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "PLANIFICACION":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case "COMPLETADO":
                return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
            case "PAUSADO":
            case "PENDIENTE_REVISION":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "CANCELADO":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            case "BORRADOR":
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        }
    }

    const getEstadoLabel = (estado: string) => {
        const key = estado?.toLowerCase().replace(/ /g, "_")
        return t?.owner?.projects?.detail?.states?.[key as keyof typeof t.owner.projects.detail.states] || estado
    }

    const getTipoLabel = (tipo: string) => {
        const key = tipo?.toLowerCase().replace(/_/g, "")
        return t?.owner?.projects?.detail?.types?.[key as keyof typeof t.owner.projects.detail.types] || tipo
    }

    return (
        <>
            <DashboardHeader
                title={proyecto?.titulo || t?.owner?.projects?.detail?.title || "Detalles del Proyecto"}
                breadcrumbs={[
                    { label: "Dashboard", href: "/dashboard/propietario" },
                    { label: t?.dashboard?.owner?.projects?.title || "Proyectos", href: "/dashboard/propietario/todos-proyectos" },
                    { label: proyecto?.titulo || t?.common?.viewDetails || "Detalles" },
                ]}
                userType="propietario"
            />

            <main className="space-y-6 p-6">
                {isLoading ? (
                    <div className="flex min-h-[50vh] items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="border-t-primary h-8 w-8 animate-spin rounded-full border-4 border-gray-300" />
                            <p className="text-muted-foreground text-sm">{t?.owner?.projects?.detail?.loading || "Cargando proyecto..."}</p>
                        </div>
                    </div>
                ) : proyecto ? (
                    <>
                        {/* Header Card con información principal y CTA destacado */}
                        <Card className="border-primary/20 from-primary/5 via-background to-accent/5 bg-gradient-to-br py-0">
                            {/* Decorative background - más sutil */}
                            <div className="bg-primary/5 absolute top-0 right-0 -z-0 h-64 w-64 rounded-full opacity-30 blur-3xl" />

                            <div className="relative z-10 p-6">
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                    {/* Información principal del proyecto */}
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-primary/10 ring-primary/20 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ring-2">
                                                {getProjectTypeIcon(proyecto.tipo)}
                                            </div>
                                            <div className="flex-1">
                                                <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{proyecto.titulo}</h1>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <Badge className={getEstadoColor(proyecto.estado)}>
                                                        {getEstadoLabel(proyecto.estado)}
                                                    </Badge>
                                                    <Badge variant="outline" className="gap-1">
                                                        <Briefcase className="h-3 w-3" />
                                                        {getTipoLabel(proyecto.tipo)}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>

                                        {proyecto.descripcion && (
                                            <div className="bg-background/50 rounded-lg border p-4">
                                                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                                    {proyecto.descripcion}
                                                </p>
                                            </div>
                                        )}

                                        {/* Información clave: Ubicación y Promotor */}
                                        <div className="flex flex-wrap gap-3">
                                            {proyecto.provincia && (
                                                <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 text-sm shadow-sm ring-1 ring-gray-200 dark:bg-gray-800/80 dark:ring-gray-700">
                                                    <MapPin className="text-primary h-4 w-4" />
                                                    <div>
                                                        <p className="text-muted-foreground text-xs">Ubicación</p>
                                                        <p className="font-semibold">
                                                            {proyecto.provincia}
                                                            {proyecto.comunidad && `, ${proyecto.comunidad}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 text-sm shadow-sm ring-1 ring-gray-200 dark:bg-gray-800/80 dark:ring-gray-700">
                                                <Briefcase className="text-secondary h-4 w-4" />
                                                <div>
                                                    <p className="text-muted-foreground text-xs">Promotor</p>
                                                    <p className="font-semibold">
                                                        {proyecto.promotor?.nombre || proyecto.promotor?.email || "Promotor"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA Card destacado - más compacto */}
                                    <Card className="from-primary to-primary/80 border-0 bg-gradient-to-br py-0 text-white shadow-xl lg:w-80">
                                        <div className="space-y-3 p-5">
                                            <div className="flex items-center gap-2">
                                                <div className="rounded-lg bg-white/20 p-1.5">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                </div>
                                                <h3 className="font-bold">
                                                    {t?.owner?.projects?.detail?.cta?.interested || "¿Te interesa este proyecto?"}
                                                </h3>
                                            </div>
                                            <p className="text-xs leading-relaxed text-white/90">
                                                {t?.owner?.projects?.detail?.cta?.interestedDesc ||
                                                    "Contacta con el promotor para obtener más información."}
                                            </p>
                                            <Button
                                                size="default"
                                                className="text-primary group w-full gap-2 bg-white font-semibold shadow-lg hover:bg-white/90"
                                            >
                                                <MessageCircle className="h-4 w-4" />
                                                {t?.owner?.projects?.detail?.cta?.contactButton || "Contactar al Promotor"}
                                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                            </Button>
                                            <p className="text-center text-xs text-white/70">
                                                {t?.owner?.projects?.detail?.cta?.responseTime || "Respuesta en menos de 24 horas"}
                                            </p>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </Card>

                        {/* Sección: Requisitos de Terreno (MÁS RELEVANTE para propietarios) */}
                        <Card className="group py-0 transition-all hover:shadow-lg">
                            <div className="p-6">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="bg-primary/10 group-hover:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                                        <Ruler className="text-primary h-5 w-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">
                                            {t?.owner?.projects?.detail?.sections?.landRequirements || "Requisitos del Terreno"}
                                        </h2>
                                        <p className="text-muted-foreground text-sm">
                                            {t?.owner?.projects?.detail?.sections?.landRequirementsDesc ||
                                                "Características necesarias para este proyecto"}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {/* Superficie Mínima - siempre visible */}
                                    <div className="space-y-1">
                                        <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                            <Ruler className="h-3.5 w-3.5" />
                                            {t?.owner?.projects?.detail?.fields?.minSurface || "Superficie Mínima"}
                                        </dt>
                                        <dd className="text-primary font-bold">{proyecto.superficieMinima} ha</dd>
                                    </div>

                                    {/* Superficie Máxima */}
                                    <div className="space-y-1">
                                        <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                            <Ruler className="h-3.5 w-3.5" />
                                            {t?.owner?.projects?.detail?.fields?.maxSurface || "Superficie Máxima"}
                                        </dt>
                                        <dd className="font-bold text-gray-900 dark:text-white">
                                            {proyecto.superficieMaxima
                                                ? `${proyecto.superficieMaxima} ha`
                                                : t?.owner?.projects?.detail?.fields?.notSpecified || "No especificada"}
                                        </dd>
                                    </div>

                                    {/* Superficie Buscada (Necesaria) */}
                                    <div className="space-y-1">
                                        <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                            <Ruler className="h-3.5 w-3.5" />
                                            {t?.owner?.projects?.detail?.fields?.neededSurface || "Superficie Buscada"}
                                        </dt>
                                        <dd className="font-bold text-green-600">
                                            {proyecto.superficieNecesaria
                                                ? `${proyecto.superficieNecesaria} ha`
                                                : t?.owner?.projects?.detail?.fields?.notSpecified || "No especificada"}
                                        </dd>
                                    </div>

                                    {/* Distancia Máxima a Red */}
                                    <div className="space-y-1">
                                        <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                            <Zap className="h-3.5 w-3.5" />
                                            {t?.owner?.projects?.detail?.fields?.maxDistanceGrid || "Distancia Máxima a Red"}
                                        </dt>
                                        <dd className="font-bold text-gray-900 dark:text-white">
                                            {proyecto.distanciaMaximaRed
                                                ? `${proyecto.distanciaMaximaRed} km`
                                                : t?.owner?.projects?.detail?.fields?.notSpecified || "No especificada"}
                                        </dd>
                                    </div>

                                    {/* Capacidad Subestación Mínima */}
                                    <div className="space-y-1">
                                        <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                            <Zap className="h-3.5 w-3.5" />
                                            {t?.owner?.projects?.detail?.fields?.minSubstationCapacity || "Capacidad Subestación Mínima"}
                                        </dt>
                                        <dd className="font-bold text-gray-900 dark:text-white">
                                            {proyecto.capacidadSubestacionMinima
                                                ? `${proyecto.capacidadSubestacionMinima} MVA`
                                                : t?.owner?.projects?.detail?.fields?.notSpecified || "No especificada"}
                                        </dd>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Sección: Detalles del Proyecto */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* Información Técnica */}
                            <Card className="group py-0 transition-all hover:shadow-lg">
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-primary/10 group-hover:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                                            <Building2 className="text-primary h-5 w-5" />
                                        </div>
                                        <h2 className="text-lg font-bold">{t?.owner?.projects?.detail?.sections?.technicalInfo || "Información Técnica"}</h2>
                                    </div>
                                    <div className="grid gap-4">
                                        <div className="space-y-1">
                                            <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                                {t?.owner?.projects?.detail?.fields?.projectType || "Tipo de Proyecto"}
                                            </dt>
                                            <dd className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-white">
                                                {getProjectTypeIcon(proyecto.tipo)}
                                                {getTipoLabel(proyecto.tipo)}
                                            </dd>
                                        </div>

                                        <div className="space-y-1">
                                            <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                                {t?.owner?.projects?.detail?.fields?.state || "Estado"}
                                            </dt>
                                            <dd>
                                                <Badge className={getEstadoColor(proyecto.estado)}>{getEstadoLabel(proyecto.estado)}</Badge>
                                            </dd>
                                        </div>

                                        {proyecto.potenciaObjetivo && (
                                            <div className="space-y-1">
                                                <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                                    {t?.owner?.projects?.detail?.fields?.targetPower || "Potencia Objetivo"}
                                                </dt>
                                                <dd className="text-primary font-bold">{proyecto.potenciaObjetivo} MW</dd>
                                            </div>
                                        )}

                                        {proyecto.presupuesto && (
                                            <div className="space-y-1">
                                                <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                                    {t?.owner?.projects?.detail?.fields?.budget || "Presupuesto"}
                                                </dt>
                                                <dd className="text-primary font-bold">€{proyecto.presupuesto.toLocaleString()}</dd>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>

                            {/* Ubicación */}
                            <Card className="group py-0 transition-all hover:shadow-lg">
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-secondary/10 group-hover:bg-secondary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                                            <MapPin className="text-secondary h-5 w-5" />
                                        </div>
                                        <h2 className="text-lg font-bold">{t?.owner?.projects?.detail?.sections?.locationInfo || "Ubicación"}</h2>
                                    </div>
                                    {!proyecto.ubicacion && !proyecto.provincia && !proyecto.comunidad ? (
                                        <div className="text-muted-foreground py-4 text-center">
                                            <MapPin className="mx-auto mb-2 h-6 w-6 opacity-50" />
                                            <p className="text-xs">{t?.owner?.projects?.detail?.fields?.noLocation || "No se ha especificado ubicación"}</p>
                                        </div>
                                    ) : (
                                        <div className="grid gap-4">
                                            {proyecto.ubicacion && (
                                                <div className="space-y-1">
                                                    <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                                        {t?.owner?.projects?.detail?.fields?.location || "Ubicación"}
                                                    </dt>
                                                    <dd className="font-bold text-gray-900 dark:text-white">{proyecto.ubicacion}</dd>
                                                </div>
                                            )}

                                            {proyecto.provincia && (
                                                <div className="space-y-1">
                                                    <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                                        {t?.owner?.projects?.detail?.fields?.province || "Provincia"}
                                                    </dt>
                                                    <dd className="font-bold text-gray-900 dark:text-white">{proyecto.provincia}</dd>
                                                </div>
                                            )}

                                            {proyecto.comunidad && (
                                                <div className="space-y-1">
                                                    <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                                        {t?.owner?.projects?.detail?.fields?.autonomousCommunity || "Comunidad Autónoma"}
                                                    </dt>
                                                    <dd className="font-bold text-gray-900 dark:text-white">{proyecto.comunidad}</dd>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Card>

                            {/* Fechas del Sistema */}
                            {proyecto.creadoEn && (
                                <Card className="group py-0 transition-all hover:shadow-lg">
                                    <div className="p-6">
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="bg-primary/10 group-hover:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                                                <Calendar className="text-primary h-5 w-5" />
                                            </div>
                                            <h2 className="text-lg font-bold">Registro</h2>
                                        </div>
                                        <div className="grid gap-4">
                                            <div className="space-y-1">
                                                <dt className="text-muted-foreground text-xs font-medium">Creado</dt>
                                                <dd className="font-bold text-gray-900 dark:text-white">
                                                    {new Date(proyecto.creadoEn).toLocaleDateString("es-ES", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </dd>
                                            </div>
                                            {proyecto.actualizadoEn && proyecto.actualizadoEn !== proyecto.creadoEn && (
                                                <div className="space-y-1">
                                                    <dt className="text-muted-foreground text-xs font-medium">Actualizado</dt>
                                                    <dd className="font-bold text-gray-900 dark:text-white">
                                                        {new Date(proyecto.actualizadoEn).toLocaleDateString("es-ES", {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        })}
                                                    </dd>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            )}
                        </div>

                        {/* CTA Final - Recordatorio para contactar */}
                        <Card className="border-primary/20 from-primary/5 via-background to-accent/5 bg-gradient-to-br py-0">
                            <div className="space-y-3 p-6 text-center">
                                <div className="bg-primary/10 ring-primary/20 inline-flex rounded-full p-3 ring-2">
                                    <MessageCircle className="text-primary h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="mb-2 text-xl font-bold">{t?.owner?.projects?.detail?.cta?.finalTitle || "¿Tienes un terreno adecuado?"}</h3>
                                    <p className="text-muted-foreground mx-auto max-w-xl text-sm">
                                        {t?.owner?.projects?.detail?.cta?.finalDesc || "Si tienes un terreno que cumple con los requisitos, no dudes en contactar al promotor o registrar tu terreno en nuestra plataforma."}
                                    </p>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                                    <Button className="min-w-[180px] gap-2">
                                        <MessageCircle className="h-4 w-4" />
                                        {t?.owner?.projects?.detail?.cta?.contactNow || "Contactar Ahora"}
                                    </Button>
                                    <Button variant="outline" className="min-w-[180px] gap-2" asChild>
                                        <Link href="/dashboard/propietario/mis-terrenos">
                                            <Ruler className="h-4 w-4" />
                                            {t?.owner?.projects?.detail?.cta?.viewMyLands || "Ver Mis Terrenos"}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </>
                ) : (
                    <Card className="p-12 py-0">
                        <div className="space-y-4 p-12 text-center">
                            <div className="bg-muted inline-flex rounded-full p-4">
                                <Briefcase className="text-muted-foreground h-12 w-12" />
                            </div>
                            <div>
                                <h3 className="mb-2 text-xl font-semibold">{t?.owner?.projects?.detail?.notFound || "Proyecto no encontrado"}</h3>
                                <p className="text-muted-foreground">{t?.owner?.projects?.detail?.notFoundDesc || "No se pudo cargar la información del proyecto"}</p>
                            </div>
                            <Link href="/dashboard/propietario/todos-proyectos">
                                <Button className="mt-4">{t?.owner?.projects?.detail?.viewAll || "Ver Todos los Proyectos"}</Button>
                            </Link>
                        </div>
                    </Card>
                )}
            </main>
        </>
    )
}
