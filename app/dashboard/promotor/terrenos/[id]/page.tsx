"use client"

import { StatsCard } from "@/components/dashboard"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useTranslations } from "@/i18n/i18nContext"
import { cn } from "@/lib/utils"
import { terrenosService } from "@/services/terrenos.service"
import {
    Activity,
    ArrowRight,
    Building2,
    CheckCircle2,
    Euro,
    Landmark,
    MapPin,
    MessageCircle,
    Mountain,
    Ruler,
    Wind,
    Zap,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const getLandTypeIcon = (tipoSuelo: string) => {
    switch (tipoSuelo?.toUpperCase()) {
        case "AGRICOLA":
        case "AGRÍCOLA":
            return <Mountain className="h-5 w-5 text-green-500" />
        case "RUSTICO":
        case "RÚSTICO":
            return <Mountain className="text-brown-500 h-5 w-5" />
        case "FORESTAL":
            return <Mountain className="h-5 w-5 text-emerald-500" />
        case "PASTO":
        case "PASTOREO":
            return <Mountain className="h-5 w-5 text-lime-500" />
        default:
            return <Landmark className="h-5 w-5 text-gray-500" />
    }
}

export default function TerrenoDetallePromotorPage() {
    const { t } = useTranslations()
    const params = useParams()
    const { toast } = useToast()
    const terrenoId = params.id as string

    const [terreno, setTerreno] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadTerreno = async () => {
            try {
                const data = await terrenosService.getById(terrenoId)
                setTerreno(data)
            } catch (error: any) {
                console.error("Error loading terreno:", error)
                toast({
                    title: "Error",
                    description: error.message || "No se pudo cargar la información del terreno",
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        }

        loadTerreno()
    }, [terrenoId, toast, t])

    const handleContactOwner = () => {
        toast({
            title: "Solicitud enviada",
            description: "Hemos notificado al propietario sobre tu interés en este terreno.",
        })
    }

    const getStatusColor = (estado: string) => {
        switch (estado?.toUpperCase()) {
            case "ACTIVO":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "PENDIENTE_REVISION":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "ARRENDADO":
            case "VENDIDO":
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        }
    }

    const getStatusLabel = (estado: string) => {
        switch (estado?.toUpperCase()) {
            case "ACTIVO":
                return "Activo"
            case "PENDIENTE_REVISION":
                return "Pendiente Revisión"
            case "ARRENDADO":
                return "Arrendado"
            case "VENDIDO":
                return "Vendido"
            default:
                return estado || "Desconocido"
        }
    }

    const getDisponibilidadLabel = (disponibilidad: string) => {
        switch (disponibilidad?.toUpperCase()) {
            case "VENTA":
                return "En Venta"
            case "ARRENDAMIENTO":
                return "Para Arrendamiento"
            case "AMBOS":
                return "Venta o Arrendamiento"
            default:
                return disponibilidad || "Por confirmar"
        }
    }

    const getTipoSueloLabel = (tipoSuelo: string) => {
        switch (tipoSuelo?.toUpperCase()) {
            case "AGRICOLA":
                return "Agrícola"
            case "INDUSTRIAL":
                return "Industrial"
            case "RUSTICO":
                return "Rústico"
            case "URBANO":
                return "Urbano"
            case "FORESTAL":
                return "Forestal"
            default:
                return tipoSuelo || "No especificado"
        }
    }

    return (
        <>
            <DashboardHeader
                title={terreno?.titulo || "Detalles del Terreno"}
                breadcrumbs={[
                    { label: "Dashboard", href: "/dashboard/promotor" },
                    { label: "Terrenos", href: "/dashboard/promotor/todos-terrenos" },
                    { label: terreno?.titulo || "Detalles" },
                ]}
                userType="promotor"
            />

            <main className="space-y-6 p-6">
                {isLoading ? (
                    <div className="flex min-h-[50vh] items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="border-t-secondary h-8 w-8 animate-spin rounded-full border-4 border-gray-300" />
                            <p className="text-muted-foreground text-sm">Cargando terreno...</p>
                        </div>
                    </div>
                ) : terreno ? (
                    <>
                        {/* Estadísticas del Terreno */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <StatsCard
                                icon={Ruler}
                                title="Superficie"
                                value={terreno.superficie ? `${terreno.superficie}` : "0"}
                                subtitle={terreno.superficie ? "hectáreas disponibles" : "No especificado"}
                                variant="secondary"
                            />
                            <StatsCard
                                icon={Euro}
                                title="Precio"
                                value={
                                    terreno.precioVenta
                                        ? new Intl.NumberFormat("es-ES", {
                                              style: "currency",
                                              currency: "EUR",
                                              minimumFractionDigits: 0,
                                              maximumFractionDigits: 0,
                                              notation: "compact",
                                          }).format(terreno.precioVenta)
                                        : "Consultar"
                                }
                                subtitle={getDisponibilidadLabel(terreno.disponibilidad)}
                                variant="primary"
                            />
                            <StatsCard
                                icon={Mountain}
                                title="Tipo de Suelo"
                                value={getTipoSueloLabel(terreno.tipoSuelo)}
                                subtitle="Clasificación del terreno"
                                variant="secondary"
                            />
                            <StatsCard
                                icon={CheckCircle2}
                                title="Estado"
                                value={getStatusLabel(terreno.estado)}
                                subtitle="Disponibilidad actual"
                                variant="primary"
                            />
                        </div>

                        {/* Header Card con información principal y CTA destacado */}
                        <Card className="border-secondary/20 from-secondary/5 via-background to-accent/5 bg-gradient-to-br py-0">
                            {/* Decorative background - más sutil */}
                            <div className="bg-secondary/5 absolute top-0 right-0 -z-0 h-64 w-64 rounded-full opacity-30 blur-3xl" />

                            <div className="relative z-10 p-6">
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                    {/* Información principal del terreno */}
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-secondary/10 ring-secondary/20 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ring-2">
                                                {getLandTypeIcon(terreno.tipoSuelo)}
                                            </div>
                                            <div className="flex-1">
                                                <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{terreno.titulo}</h1>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <Badge className={getStatusColor(terreno.estado)}>
                                                        {getStatusLabel(terreno.estado)}
                                                    </Badge>
                                                    {terreno.superficie && (
                                                        <Badge variant="outline" className="gap-1">
                                                            <Ruler className="h-3 w-3" />
                                                            {terreno.superficie} ha
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {terreno.descripcion && (
                                            <div className="bg-background/50 rounded-lg border p-4">
                                                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                                    {terreno.descripcion}
                                                </p>
                                            </div>
                                        )}

                                        {/* Información clave: Ubicación y Propietario */}
                                        <div className="flex flex-wrap gap-3">
                                            {terreno.provincia && (
                                                <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 text-sm shadow-sm ring-1 ring-gray-200 dark:bg-gray-800/80 dark:ring-gray-700">
                                                    <MapPin className="text-secondary h-4 w-4" />
                                                    <div>
                                                        <span className="font-medium">
                                                            {terreno.municipio ? `${terreno.municipio}, ` : ""}
                                                            {terreno.provincia}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 text-sm shadow-sm ring-1 ring-gray-200 dark:bg-gray-800/80 dark:ring-gray-700">
                                                <Activity className="text-secondary h-4 w-4" />
                                                <div>
                                                    <span className="text-xs text-gray-500">Disponibilidad</span>
                                                    <div className="font-medium">{getDisponibilidadLabel(terreno.disponibilidad)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA Card destacado - más compacto */}
                                    <Card className="from-secondary to-secondary/80 border-0 bg-gradient-to-br py-0 text-white shadow-xl lg:w-80">
                                        <div className="space-y-3 p-5">
                                            <div className="flex items-center gap-2">
                                                <div className="rounded-lg bg-white/20 p-1.5">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                </div>
                                                <h3 className="font-bold">¿Te interesa este terreno?</h3>
                                            </div>
                                            <p className="text-xs leading-relaxed text-white/90">
                                                Contacta con el propietario para obtener más información y negociar las condiciones.
                                            </p>
                                            <Button
                                                size="default"
                                                onClick={handleContactOwner}
                                                className="text-secondary group w-full gap-2 bg-white font-semibold shadow-lg hover:bg-white/90"
                                            >
                                                <MessageCircle className="h-4 w-4" />
                                                Contactar al Propietario
                                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                            </Button>
                                            <p className="text-center text-xs text-white/70">Respuesta en menos de 24 horas</p>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </Card>

                        {/* Sección: Características del Terreno (MÁS RELEVANTE para promotores) */}
                        <Card className="group py-0 transition-all hover:shadow-lg">
                            <div className="p-6">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="bg-secondary/10 group-hover:bg-secondary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                                        <Mountain className="text-secondary h-5 w-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">Características del Terreno</h2>
                                        <p className="text-muted-foreground text-sm">Información técnica y física del terreno</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {/* Superficie - siempre visible */}
                                    <div className="space-y-1">
                                        <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                            <Ruler className="h-3.5 w-3.5" />
                                            Superficie
                                        </dt>
                                        <dd className="text-secondary font-bold">{terreno.superficie} ha</dd>
                                    </div>

                                    {/* Tipo de Suelo */}
                                    <div className="space-y-1">
                                        <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                            <Mountain className="h-3.5 w-3.5" />
                                            Tipo de Suelo
                                        </dt>
                                        <dd className="font-bold text-gray-900 dark:text-white">{getTipoSueloLabel(terreno.tipoSuelo)}</dd>
                                    </div>

                                    {/* Clasificación Catastral */}
                                    <div className="space-y-1">
                                        <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                            <Building2 className="h-3.5 w-3.5" />
                                            Clasificación
                                        </dt>
                                        <dd className="font-bold text-green-600">{terreno.clasificacionCatastral || "No especificada"}</dd>
                                    </div>

                                    {/* Pendiente Media */}
                                    <div className="space-y-1">
                                        <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                            <Mountain className="h-3.5 w-3.5" />
                                            Pendiente Media
                                        </dt>
                                        <dd className="font-bold text-gray-900 dark:text-white">
                                            {terreno.pendienteMedia ? `${terreno.pendienteMedia}%` : "No especificada"}
                                        </dd>
                                    </div>

                                    {/* Orientación */}
                                    <div className="space-y-1">
                                        <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                            <Wind className="h-3.5 w-3.5" />
                                            Orientación
                                        </dt>
                                        <dd className="font-bold text-gray-900 dark:text-white">
                                            {terreno.orientacion || "No especificada"}
                                        </dd>
                                    </div>

                                    {/* Distancia a Red Eléctrica */}
                                    <div className="space-y-1">
                                        <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                            <Zap className="h-3.5 w-3.5" />
                                            Distancia a Red
                                        </dt>
                                        <dd className="font-bold text-gray-900 dark:text-white">
                                            {terreno.distanciaRedElectrica ? `${terreno.distanciaRedElectrica} m` : "No especificada"}
                                        </dd>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Sección: Detalles del Terreno */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* Información Comercial */}
                            <Card className="group py-0 transition-all hover:shadow-lg">
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-secondary/10 group-hover:bg-secondary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                                            <Euro className="text-secondary h-5 w-5" />
                                        </div>
                                        <h2 className="text-lg font-bold">Información Comercial</h2>
                                    </div>
                                    <div className="grid gap-4">
                                        <div className="space-y-1">
                                            <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                                Disponibilidad
                                            </dt>
                                            <dd className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-white">
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                {getDisponibilidadLabel(terreno.disponibilidad)}
                                            </dd>
                                        </div>

                                        <div className="space-y-1">
                                            <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">Estado</dt>
                                            <dd>
                                                <Badge className={getStatusColor(terreno.estado)}>{getStatusLabel(terreno.estado)}</Badge>
                                            </dd>
                                        </div>

                                        {terreno.precioVenta && (
                                            <div className="space-y-1">
                                                <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                                    Precio de Venta
                                                </dt>
                                                <dd className="text-secondary font-bold">
                                                    {new Intl.NumberFormat("es-ES", {
                                                        style: "currency",
                                                        currency: "EUR",
                                                        minimumFractionDigits: 0,
                                                    }).format(terreno.precioVenta)}
                                                </dd>
                                            </div>
                                        )}

                                        {terreno.rentaArrendamiento && (
                                            <div className="space-y-1">
                                                <dt className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                                                    Renta Arrendamiento
                                                </dt>
                                                <dd className="text-secondary font-bold">
                                                    {new Intl.NumberFormat("es-ES", {
                                                        style: "currency",
                                                        currency: "EUR",
                                                        minimumFractionDigits: 0,
                                                    }).format(terreno.rentaArrendamiento)}{" "}
                                                    / año
                                                </dd>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>

                            {/* Infraestructura Disponible */}
                            <Card className="group py-0 transition-all hover:shadow-lg">
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-primary/10 group-hover:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                                            <Zap className="text-primary h-5 w-5" />
                                        </div>
                                        <h2 className="text-lg font-bold">Infraestructura</h2>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between rounded-lg border p-3">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2
                                                    className={cn("h-4 w-4", terreno.accesoCarretera ? "text-green-500" : "text-gray-400")}
                                                />
                                                <span className="text-sm font-medium">Acceso por Carretera</span>
                                            </div>
                                            <Badge variant={terreno.accesoCarretera ? "default" : "secondary"} className="text-xs">
                                                {terreno.accesoCarretera ? "Sí" : "No"}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center justify-between rounded-lg border p-3">
                                            <div className="flex items-center gap-2">
                                                <Zap
                                                    className={cn(
                                                        "h-4 w-4",
                                                        terreno.suministroElectrico ? "text-green-500" : "text-gray-400"
                                                    )}
                                                />
                                                <span className="text-sm font-medium">Suministro Eléctrico</span>
                                            </div>
                                            <Badge variant={terreno.suministroElectrico ? "default" : "secondary"} className="text-xs">
                                                {terreno.suministroElectrico ? "Sí" : "No"}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center justify-between rounded-lg border p-3">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2
                                                    className={cn("h-4 w-4", terreno.suministroAgua ? "text-green-500" : "text-gray-400")}
                                                />
                                                <span className="text-sm font-medium">Suministro de Agua</span>
                                            </div>
                                            <Badge variant={terreno.suministroAgua ? "default" : "secondary"} className="text-xs">
                                                {terreno.suministroAgua ? "Sí" : "No"}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Ubicación y Datos Catastrales */}
                            <Card className="group py-0 transition-all hover:shadow-lg">
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-secondary/10 group-hover:bg-secondary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                                            <MapPin className="text-secondary h-5 w-5" />
                                        </div>
                                        <h2 className="text-lg font-bold">Ubicación</h2>
                                    </div>
                                    {!terreno.provincia && !terreno.municipio ? (
                                        <div className="text-muted-foreground py-4 text-center">
                                            <MapPin className="mx-auto mb-2 h-6 w-6 opacity-50" />
                                            <p className="text-xs">No se ha especificado ubicación</p>
                                        </div>
                                    ) : (
                                        <div className="grid gap-4">
                                            {terreno.provincia && (
                                                <div className="space-y-1">
                                                    <dt className="text-muted-foreground text-xs font-medium">Provincia</dt>
                                                    <dd className="font-medium">{terreno.provincia}</dd>
                                                </div>
                                            )}

                                            {terreno.municipio && (
                                                <div className="space-y-1">
                                                    <dt className="text-muted-foreground text-xs font-medium">Municipio</dt>
                                                    <dd className="font-medium">{terreno.municipio}</dd>
                                                </div>
                                            )}

                                            {terreno.referenciaCatastral && (
                                                <div className="space-y-1">
                                                    <dt className="text-muted-foreground text-xs font-medium">Ref. Catastral</dt>
                                                    <dd className="font-mono text-xs text-gray-600">{terreno.referenciaCatastral}</dd>
                                                </div>
                                            )}

                                            {(terreno.latitud || terreno.longitud) && (
                                                <div className="space-y-1">
                                                    <dt className="text-muted-foreground text-xs font-medium">Coordenadas</dt>
                                                    <dd className="font-mono text-xs text-gray-600">
                                                        {terreno.latitud}, {terreno.longitud}
                                                    </dd>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>

                        {/* CTA Final - Recordatorio para contactar */}
                        <Card className="border-secondary/20 from-secondary/5 via-background to-accent/5 bg-gradient-to-br py-0">
                            <div className="space-y-3 p-6 text-center">
                                <div className="bg-secondary/10 ring-secondary/20 inline-flex rounded-full p-3 ring-2">
                                    <MessageCircle className="text-secondary h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="mb-2 text-xl font-bold">¿Es perfecto para tu proyecto?</h3>
                                    <p className="text-muted-foreground mx-auto max-w-xl text-sm">
                                        Si este terreno cumple con los requisitos de tu proyecto, no dudes en contactar al propietario para
                                        iniciar las negociaciones.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                                    <Button onClick={handleContactOwner} className="bg-secondary hover:bg-secondary/90 min-w-[180px] gap-2">
                                        <MessageCircle className="h-4 w-4" />
                                        Contactar Ahora
                                    </Button>
                                    <Button variant="outline" className="min-w-[180px] gap-2" asChild>
                                        <Link href="/dashboard/promotor/todos-terrenos">
                                            <Landmark className="h-4 w-4" />
                                            Ver Más Terrenos
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
                                <Landmark className="text-muted-foreground h-12 w-12" />
                            </div>
                            <div>
                                <h3 className="mb-2 text-xl font-semibold">Terreno no encontrado</h3>
                                <p className="text-muted-foreground">No se pudo cargar la información del terreno</p>
                            </div>
                            <Link href="/dashboard/promotor/todos-terrenos">
                                <Button className="mt-4">Ver Todos los Terrenos</Button>
                            </Link>
                        </div>
                    </Card>
                )}
            </main>
        </>
    )
}
