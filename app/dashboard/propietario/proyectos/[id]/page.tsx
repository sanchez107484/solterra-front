"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTranslations } from "@/i18n/i18nContext"
import { Battery, Briefcase, Building2, Calendar, Leaf, MapPin, MessageCircle, Sun, TrendingUp, Wind, Zap } from "lucide-react"
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

    const [proyecto, setProyecto] = useState<any>(null)
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
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "COMPLETADO":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case "PAUSADO":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "CANCELADO":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        }
    }

    return (
        <>
            <DashboardHeader
                title={proyecto?.titulo || "Detalle del Proyecto"}
                breadcrumbs={[
                    { label: t?.dashboard?.breadcrumbs?.dashboard || "Dashboard", href: "/dashboard/propietario" },
                    { label: "Proyectos", href: "/dashboard/propietario/todos-proyectos" },
                    { label: proyecto?.titulo || "Detalle" },
                ]}
                userType="propietario"
            />

            <main className="p-6">
                {isLoading ? (
                    <div className="flex min-h-[50vh] items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                            <p className="text-muted-foreground text-sm">Cargando proyecto...</p>
                        </div>
                    </div>
                ) : proyecto ? (
                    <div className="space-y-6">
                        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 dark:border-blue-800 dark:from-blue-900/20 dark:to-purple-900/20">
                            <div className="p-6">
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center gap-2">
                                            {getProjectTypeIcon(proyecto.tipo)}
                                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{proyecto.titulo}</h1>
                                        </div>
                                        <Badge className={getEstadoColor(proyecto.estado)}>{proyecto.estado}</Badge>
                                    </div>
                                    <Button className="gap-2">
                                        <MessageCircle className="h-4 w-4" />
                                        Contactar promotor
                                    </Button>
                                </div>

                                {proyecto.descripcion && <p className="mb-4 text-gray-600 dark:text-gray-300">{proyecto.descripcion}</p>}

                                <div className="grid gap-4 md:grid-cols-3">
                                    {proyecto.potenciaObjetivo && (
                                        <div className="flex items-center gap-2 rounded-lg bg-white/60 px-4 py-3 dark:bg-gray-800/60">
                                            <TrendingUp className="h-5 w-5 text-purple-500" />
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Potencia</p>
                                                <p className="font-semibold">{proyecto.potenciaObjetivo} MW</p>
                                            </div>
                                        </div>
                                    )}

                                    {proyecto.provincia && (
                                        <div className="flex items-center gap-2 rounded-lg bg-white/60 px-4 py-3 dark:bg-gray-800/60">
                                            <MapPin className="h-5 w-5 text-red-500" />
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Ubicación</p>
                                                <p className="font-semibold">{proyecto.provincia}</p>
                                            </div>
                                        </div>
                                    )}

                                    {proyecto.fechaInicio && (
                                        <div className="flex items-center gap-2 rounded-lg bg-white/60 px-4 py-3 dark:bg-gray-800/60">
                                            <Calendar className="h-5 w-5 text-blue-500" />
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Inicio</p>
                                                <p className="font-semibold">
                                                    {new Date(proyecto.fechaInicio).toLocaleDateString("es-ES")}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div className="border-b p-6">
                                <h2 className="text-xl font-bold">Detalles técnicos</h2>
                            </div>
                            <div className="p-6">
                                <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Tipo de proyecto</dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">{proyecto.tipo || "No especificado"}</dd>
                                    </div>
                                    {proyecto.presupuesto && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Presupuesto estimado</dt>
                                            <dd className="mt-1 text-sm font-semibold text-green-600">
                                                €{proyecto.presupuesto.toLocaleString()}
                                            </dd>
                                        </div>
                                    )}
                                    {proyecto.superficieRequerida && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Superficie requerida</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {proyecto.superficieRequerida} ha
                                            </dd>
                                        </div>
                                    )}
                                    {proyecto.plazoEjecucion && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Plazo de ejecución</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{proyecto.plazoEjecucion} meses</dd>
                                        </div>
                                    )}
                                </dl>
                            </div>
                        </Card>

                        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                            <div className="p-6">
                                <h3 className="mb-2 text-lg font-bold">¿Interesado en este proyecto?</h3>
                                <p className="text-muted-foreground mb-4 text-sm">
                                    Ponte en contacto con el promotor para conocer más detalles y evaluar la compatibilidad con tus terrenos
                                </p>
                                <Button size="lg" className="gap-2">
                                    <MessageCircle className="h-5 w-5" />
                                    Enviar mensaje
                                </Button>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <Card className="p-12">
                        <div className="text-center">
                            <Briefcase className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-semibold">Proyecto no encontrado</h3>
                            <p className="text-muted-foreground text-sm">No se pudo cargar la información del proyecto.</p>
                            <Link href="/dashboard/propietario/todos-proyectos">
                                <Button className="mt-4">Ver todos los proyectos</Button>
                            </Link>
                        </div>
                    </Card>
                )}
            </main>
        </>
    )
}
