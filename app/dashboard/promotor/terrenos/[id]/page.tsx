"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useTranslations } from "@/i18n/i18nContext"
import { cn } from "@/lib/utils"
import { terrenosService } from "@/services/terrenos.service"
import {
    AlertCircle,
    ArrowLeft,
    Building2,
    Calendar,
    CheckCircle2,
    Euro,
    Landmark,
    Mail,
    MapPin,
    Mountain,
    Ruler,
    TrendingUp,
    User,
    Wind,
    Zap,
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function TerrenoDetallePromotorPage() {
    const { t } = useTranslations()
    const params = useParams()
    const router = useRouter()
    const { toast } = useToast()
    const terrenoId = params.id as string

    const [terreno, setTerreno] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [contactSent, setContactSent] = useState(false)

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
    }, [terrenoId, toast])

    const handleContactOwner = () => {
        // Aquí iría la lógica para contactar al propietario
        // Por ahora solo mostramos un mensaje de éxito
        setContactSent(true)
        toast({
            title: "Solicitud enviada",
            description: "Hemos notificado al propietario sobre tu interés en este terreno.",
        })
    }

    const getStatusColor = (estado: string) => {
        switch (estado?.toUpperCase()) {
            case "ACTIVO":
                return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300"
            case "PENDIENTE_REVISION":
                return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300"
            case "ARRENDADO":
            case "VENDIDO":
                return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-300"
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

    if (isLoading) {
        return (
            <>
                <DashboardHeader
                    title="Detalles del Terreno"
                    subtitle="Cargando información..."
                    breadcrumbs={[
                        { label: "Dashboard", href: "/dashboard/promotor" },
                        { label: "Todos los Terrenos", href: "/dashboard/promotor/todos-terrenos" },
                        { label: "Detalles" },
                    ]}
                    userType="promotor"
                />
                <main className="p-6">
                    <Card className="p-12">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="border-t-secondary h-8 w-8 animate-spin rounded-full border-4 border-gray-300" />
                            <p className="text-muted-foreground text-sm">Cargando información del terreno...</p>
                        </div>
                    </Card>
                </main>
            </>
        )
    }

    if (!terreno) {
        return (
            <>
                <DashboardHeader
                    title="Terreno no encontrado"
                    subtitle="El terreno que buscas no existe o no tienes permisos para verlo"
                    breadcrumbs={[
                        { label: "Dashboard", href: "/dashboard/promotor" },
                        { label: "Todos los Terrenos", href: "/dashboard/promotor/todos-terrenos" },
                        { label: "Error" },
                    ]}
                    userType="promotor"
                />
                <main className="p-6">
                    <Card className="p-12">
                        <div className="text-center">
                            <AlertCircle className="text-destructive mx-auto mb-4 h-12 w-12" />
                            <h3 className="mb-2 text-lg font-semibold">Terreno no encontrado</h3>
                            <p className="text-muted-foreground mb-6 text-sm">El terreno que buscas no existe o ha sido eliminado.</p>
                            <Link href="/dashboard/promotor/todos-terrenos">
                                <Button variant="secondary">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Volver a Terrenos
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </main>
            </>
        )
    }

    return (
        <>
            <DashboardHeader
                title={terreno.titulo || "Detalle del Terreno"}
                subtitle="Información completa del terreno"
                breadcrumbs={[
                    { label: "Dashboard", href: "/dashboard/promotor" },
                    { label: "Todos los Terrenos", href: "/dashboard/promotor/todos-terrenos" },
                    { label: terreno.titulo || "Detalle" },
                ]}
                userType="promotor"
            />

            <main className="space-y-6 p-6">
                {/* Hero Section - Destacado con precio y CTA */}
                <Card className="border-secondary/20 shadow-md">
                    <CardContent className="p-8">
                        <div className="grid gap-6 lg:grid-cols-2">
                            {/* Left side - Información principal */}
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="from-secondary to-secondary/80 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg">
                                        <Landmark className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="mb-2 flex flex-wrap items-center gap-2">
                                            <h1 className="text-3xl font-bold">{terreno.titulo}</h1>
                                            <Badge className={cn("text-sm", getStatusColor(terreno.estado))}>
                                                {getStatusLabel(terreno.estado)}
                                            </Badge>
                                        </div>
                                        {terreno.provincia && terreno.municipio && (
                                            <p className="text-muted-foreground flex items-center gap-2 text-lg">
                                                <MapPin className="h-5 w-5" />
                                                {terreno.municipio}, {terreno.provincia}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Descripción */}
                                {terreno.descripcion && (
                                    <div className="bg-muted/30 rounded-lg p-4">
                                        <p className="text-foreground leading-relaxed">{terreno.descripcion}</p>
                                    </div>
                                )}

                                {/* Características destacadas */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-background rounded-lg border p-4">
                                        <div className="text-secondary mb-2 flex items-center gap-2">
                                            <Ruler className="h-5 w-5" />
                                            <span className="text-sm font-medium">Superficie</span>
                                        </div>
                                        <p className="text-2xl font-bold">{terreno.superficie ? `${terreno.superficie} ha` : "N/A"}</p>
                                    </div>
                                    <div className="bg-background rounded-lg border p-4">
                                        <div className="text-secondary mb-2 flex items-center gap-2">
                                            <Mountain className="h-5 w-5" />
                                            <span className="text-sm font-medium">Tipo de Suelo</span>
                                        </div>
                                        <p className="text-lg font-bold">{terreno.tipoSuelo || "No especificado"}</p>
                                    </div>
                                </div>

                                {/* Quick features */}
                                <div className="flex flex-wrap gap-2">
                                    {terreno.accesoCarretera && (
                                        <Badge variant="secondary" className="gap-1 px-3 py-1">
                                            <CheckCircle2 className="h-3 w-3" />
                                            Acceso Carretera
                                        </Badge>
                                    )}
                                    {terreno.suministroElectrico && (
                                        <Badge variant="secondary" className="gap-1 px-3 py-1">
                                            <Zap className="h-3 w-3" />
                                            Suministro Eléctrico
                                        </Badge>
                                    )}
                                    {terreno.suministroAgua && (
                                        <Badge variant="secondary" className="gap-1 px-3 py-1">
                                            <CheckCircle2 className="h-3 w-3" />
                                            Suministro Agua
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {/* Right side - Precio y CTA Principal */}
                            <div className="flex flex-col justify-center space-y-6">
                                {/* Precio destacado */}
                                <div className="bg-background rounded-lg border p-6">
                                    <div className="mb-4 flex items-center gap-2">
                                        <TrendingUp className="text-secondary h-5 w-5" />
                                        <span className="text-muted-foreground text-sm font-medium">Precio del Terreno</span>
                                    </div>
                                    <div className="mb-2">
                                        <div className="from-secondary to-secondary/80 bg-gradient-to-r bg-clip-text text-4xl font-extrabold text-transparent">
                                            {terreno.precioVenta
                                                ? new Intl.NumberFormat("es-ES", {
                                                      style: "currency",
                                                      currency: "EUR",
                                                      minimumFractionDigits: 0,
                                                      maximumFractionDigits: 0,
                                                  }).format(terreno.precioVenta)
                                                : "Consultar"}
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground mb-4 text-sm">
                                        {terreno.disponibilidad === "VENTA"
                                            ? "Precio de venta"
                                            : terreno.disponibilidad === "ARRENDAMIENTO"
                                              ? "Disponible para arrendamiento"
                                              : terreno.disponibilidad === "AMBOS"
                                                ? "Venta o Arrendamiento"
                                                : "Precio no especificado"}
                                    </p>

                                    {/* CTA Principal */}
                                    {terreno.estado === "ACTIVO" && (
                                        <div className="space-y-3">
                                            {!contactSent ? (
                                                <>
                                                    <Button
                                                        onClick={handleContactOwner}
                                                        className="bg-secondary hover:bg-secondary/90 w-full"
                                                    >
                                                        <Mail className="mr-2 h-4 w-4" />
                                                        Contactar al Propietario
                                                    </Button>
                                                    <p className="text-muted-foreground text-center text-xs">
                                                        Respuesta en menos de 24 horas
                                                    </p>
                                                </>
                                            ) : (
                                                <div className="border-secondary/30 bg-secondary/5 rounded-lg border p-4 text-center">
                                                    <CheckCircle2 className="text-secondary mx-auto mb-2 h-6 w-6" />
                                                    <p className="text-secondary font-semibold">¡Solicitud Enviada!</p>
                                                    <p className="text-muted-foreground text-sm">
                                                        El propietario recibirá tu mensaje pronto
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Columna izquierda - Información detallada (2 cols) */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Información Comercial */}
                        <Card className="border-secondary/20 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Euro className="text-secondary h-5 w-5" />
                                    Detalles Comerciales
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {/* Precio de venta */}
                                    <div className="bg-background rounded-lg border p-4">
                                        <Label className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
                                            <TrendingUp className="h-4 w-4" />
                                            Precio de Venta
                                        </Label>
                                        <p className="text-2xl font-bold text-green-600">
                                            {terreno.precioVenta
                                                ? new Intl.NumberFormat("es-ES", {
                                                      style: "currency",
                                                      currency: "EUR",
                                                      minimumFractionDigits: 0,
                                                  }).format(terreno.precioVenta)
                                                : "Consultar"}
                                        </p>
                                    </div>

                                    {/* Disponibilidad */}
                                    <div className="bg-background rounded-lg border p-4">
                                        <Label className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
                                            <CheckCircle2 className="h-4 w-4" />
                                            Disponibilidad
                                        </Label>
                                        <p className="text-lg font-semibold">
                                            {terreno.disponibilidad === "VENTA"
                                                ? "En Venta"
                                                : terreno.disponibilidad === "ARRENDAMIENTO"
                                                  ? "En Arrendamiento"
                                                  : terreno.disponibilidad === "AMBOS"
                                                    ? "Venta y Arrendamiento"
                                                    : "No especificado"}
                                        </p>
                                    </div>

                                    {/* Renta de arrendamiento si aplica */}
                                    {terreno.disponibilidad !== "VENTA" && terreno.rentaArrendamiento && (
                                        <>
                                            <div className="bg-background rounded-lg border p-4">
                                                <Label className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
                                                    <Euro className="h-4 w-4" />
                                                    Renta Anual
                                                </Label>
                                                <p className="text-xl font-bold text-blue-600">
                                                    {new Intl.NumberFormat("es-ES", {
                                                        style: "currency",
                                                        currency: "EUR",
                                                        minimumFractionDigits: 0,
                                                    }).format(terreno.rentaArrendamiento)}
                                                </p>
                                            </div>

                                            <div className="bg-background rounded-lg border p-4">
                                                <Label className="text-muted-foreground mb-2 text-sm">Duración Arrendamiento</Label>
                                                <p className="text-lg font-semibold">
                                                    {terreno.duracionArrendamiento ? `${terreno.duracionArrendamiento} años` : "A negociar"}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Características Técnicas */}
                        <Card className="border-secondary/20 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Mountain className="text-secondary h-5 w-5" />
                                    Características Técnicas
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <InfoCard
                                        icon={Ruler}
                                        label="Superficie"
                                        value={terreno.superficie ? `${terreno.superficie} ha` : "N/A"}
                                    />
                                    <InfoCard icon={Mountain} label="Tipo de Suelo" value={terreno.tipoSuelo || "No especificado"} />
                                    <InfoCard
                                        icon={Building2}
                                        label="Clasificación"
                                        value={terreno.clasificacionCatastral || "No especificada"}
                                    />
                                    <InfoCard icon={Building2} label="Ref. Catastral" value={terreno.referenciaCatastral || "N/A"} />
                                    <InfoCard
                                        icon={Mountain}
                                        label="Pendiente Media"
                                        value={terreno.pendienteMedia ? `${terreno.pendienteMedia}%` : "N/A"}
                                    />
                                    <InfoCard icon={Wind} label="Orientación" value={terreno.orientacion || "No especificada"} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Infraestructura */}
                        <Card className="border-secondary/20 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Zap className="text-secondary h-5 w-5" />
                                    Infraestructura Disponible
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <FeatureCard label="Acceso por Carretera" available={terreno.accesoCarretera} icon={CheckCircle2} />
                                    <FeatureCard label="Suministro Eléctrico" available={terreno.suministroElectrico} icon={Zap} />
                                    <FeatureCard label="Suministro de Agua" available={terreno.suministroAgua} icon={CheckCircle2} />
                                    <InfoCard
                                        icon={Zap}
                                        label="Distancia a Red"
                                        value={terreno.distanciaRedElectrica ? `${terreno.distanciaRedElectrica} m` : "No especificada"}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Columna derecha - Sidebar con información complementaria */}
                    <div className="space-y-6">
                        {/* Información del Propietario */}
                        <Card className="border-secondary/20 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <User className="text-secondary h-5 w-5" />
                                    Propietario
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-3">
                                    <Avatar className="border-secondary/30 h-12 w-12 border-2">
                                        <AvatarImage src={terreno.propietario?.avatar} />
                                        <AvatarFallback className="bg-secondary/10 text-secondary font-semibold">
                                            {terreno.propietario?.nombre
                                                ?.split(" ")
                                                .map((n: string) => n[0])
                                                .join("")
                                                .slice(0, 2)
                                                .toUpperCase() || "??"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{terreno.propietario?.nombre || "No especificado"}</p>
                                        <Badge variant="outline" className="text-xs">
                                            Propietario Verificado
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Ubicación */}
                        <Card className="border-secondary/20 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <MapPin className="text-secondary h-5 w-5" />
                                    Ubicación Geográfica
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div>
                                        <Label className="text-muted-foreground text-xs">Provincia</Label>
                                        <p className="font-medium">{terreno.provincia || "No especificada"}</p>
                                    </div>
                                    <Separator />
                                    <div>
                                        <Label className="text-muted-foreground text-xs">Municipio</Label>
                                        <p className="font-medium">{terreno.municipio || "No especificado"}</p>
                                    </div>
                                    <Separator />
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-muted-foreground text-xs">Latitud</Label>
                                            <p className="text-sm font-medium">{terreno.latitud || "N/A"}</p>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground text-xs">Longitud</Label>
                                            <p className="text-sm font-medium">{terreno.longitud || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Fechas de Publicación */}
                        <Card className="border-secondary/20 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Calendar className="text-secondary h-4 w-4" />
                                    Información de Publicación
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Publicado:</span>
                                        <span className="font-medium">
                                            {terreno.creadoEn ? new Date(terreno.creadoEn).toLocaleDateString("es-ES") : "-"}
                                        </span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Actualizado:</span>
                                        <span className="font-medium">
                                            {terreno.actualizadoEn ? new Date(terreno.actualizadoEn).toLocaleDateString("es-ES") : "-"}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* CTA Final - Sección de conversión inferior */}
                {/* CTA Final - Sección de conversión inferior */}
                {terreno.estado === "ACTIVO" && !contactSent && (
                    <Card className="border-secondary/20 mt-8 shadow-sm">
                        <CardContent className="p-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <h2 className="mb-3 text-2xl font-bold">¿Interesado en este terreno?</h2>
                                <p className="text-muted-foreground mb-6">
                                    Contacta con el propietario a través de nuestra plataforma y obtén más información sobre esta
                                    oportunidad.
                                </p>

                                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                                    <Button onClick={handleContactOwner} className="bg-secondary hover:bg-secondary/90 w-full sm:w-auto">
                                        <Mail className="mr-2 h-4 w-4" />
                                        Solicitar Información
                                    </Button>

                                    <Button variant="outline" className="w-full sm:w-auto" onClick={() => window.history.back()}>
                                        Ver Más Terrenos
                                    </Button>
                                </div>

                                <p className="text-muted-foreground mt-4 text-xs">Respuesta en menos de 24 horas</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Mensaje de contacto enviado */}
                {contactSent && (
                    <Card className="mt-8 border-2 border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20">
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="mb-1 font-semibold text-green-900 dark:text-green-100">¡Mensaje enviado con éxito!</h3>
                                <p className="text-sm text-green-700 dark:text-green-300">
                                    El propietario ha recibido tu solicitud de información y te contactará pronto.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>
        </>
    )
}

// ===== Componentes Auxiliares =====

// Tarjeta de información pequeña
interface InfoCardProps {
    icon: any
    label: string
    value: string
    compact?: boolean
}

function InfoCard({ icon: Icon, label, value, compact = false }: InfoCardProps) {
    if (compact) {
        return (
            <div className="flex items-start gap-2">
                <Icon className="text-secondary mt-0.5 h-4 w-4 flex-shrink-0" />
                <div className="flex-1">
                    <Label className="text-muted-foreground text-xs">{label}</Label>
                    <p className="text-foreground text-sm font-medium">{value}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-muted/30 rounded-lg border p-4">
            <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-medium">
                <Icon className="h-4 w-4" />
                <span>{label}</span>
            </div>
            <p className="text-foreground text-sm font-semibold">{value}</p>
        </div>
    )
}

// Tarjeta de característica booleana
interface FeatureCardProps {
    label: string
    available: boolean
    icon: any
}

function FeatureCard({ label, available, icon: Icon }: FeatureCardProps) {
    return (
        <div
            className={cn(
                "rounded-lg border p-4 transition-colors",
                available ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20" : "bg-muted/30 border-muted"
            )}
        >
            <div className="flex items-center gap-2">
                <Icon className={cn("h-5 w-5", available ? "text-green-600 dark:text-green-400" : "text-muted-foreground")} />
                <span className={cn("text-sm font-medium", available ? "text-green-900 dark:text-green-100" : "text-muted-foreground")}>
                    {label}
                </span>
            </div>
            <p className="text-muted-foreground mt-1 text-xs">{available ? "Disponible" : "No disponible"}</p>
        </div>
    )
}
