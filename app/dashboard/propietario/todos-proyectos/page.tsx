"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useProyectos } from "@/hooks/useProyectos"
import { useTranslations } from "@/i18n/i18nContext"
import { Battery, Briefcase, Building2, Eye, Leaf, MapPin, Search, Sun, TrendingUp, Wind, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

const getProjectTypeIcon = (tipo: string) => {
    const iconClass = "h-5 w-5"
    switch (tipo?.toUpperCase()) {
        case "SOLAR_FOTOVOLTAICO":
        case "SOLAR":
            return <Sun className={`${iconClass} text-yellow-500`} />
        case "EOLICO":
        case "EÓLICO":
            return <Wind className={`${iconClass} text-blue-500`} />
        case "HIBRIDACION":
        case "HÍBRIDO":
            return <Zap className={`${iconClass} text-purple-500`} />
        case "ALMACENAMIENTO":
            return <Battery className={`${iconClass} text-green-500`} />
        case "HIDROGENO":
        case "BIOMETANO":
            return <Leaf className={`${iconClass} text-emerald-500`} />
        default:
            return <Building2 className={`${iconClass} text-gray-500`} />
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

export default function TodosProyectosPage() {
    const { t } = useTranslations()
    const { proyectos, isLoading, fetchProyectos } = useProyectos({ autoFetch: false })

    const [searchTerm, setSearchTerm] = useState("")
    const [tipoFilter, setTipoFilter] = useState<string>("TODOS")
    const [provinciaFilter, setProvinciaFilter] = useState<string>("TODOS")

    useEffect(() => {
        fetchProyectos()
    }, [fetchProyectos])

    const proyectosActivos =
        proyectos?.filter((p: any) => p.estado?.toUpperCase() === "ACTIVO" || p.estado?.toUpperCase() === "EN_DESARROLLO") || []

    const filteredProyectos = useMemo(() => {
        let filtered = proyectosActivos

        if (searchTerm) {
            filtered = filtered.filter(
                (p: any) =>
                    p.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.provincia?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (tipoFilter !== "TODOS") {
            filtered = filtered.filter((p: any) => p.tipo?.toUpperCase() === tipoFilter)
        }

        if (provinciaFilter !== "TODOS") {
            filtered = filtered.filter((p: any) => p.provincia === provinciaFilter)
        }

        return filtered
    }, [proyectosActivos, searchTerm, tipoFilter, provinciaFilter])

    const provincias = Array.from(new Set(proyectosActivos.map((p: any) => p.provincia).filter(Boolean)))

    return (
        <>
            <DashboardHeader
                title="Proyectos disponibles"
                breadcrumbs={[
                    { label: t?.dashboard?.breadcrumbs?.dashboard || "Dashboard", href: "/dashboard/propietario" },
                    { label: "Proyectos disponibles" },
                ]}
                userType="propietario"
            />

            <main className="p-6">
                <Card className="mb-6">
                    <div className="p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="relative max-w-md flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre, descripción o ubicación..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800"
                                />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <select
                                    value={tipoFilter}
                                    onChange={(e) => setTipoFilter(e.target.value)}
                                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800"
                                >
                                    <option value="TODOS">Todos los tipos</option>
                                    <option value="SOLAR">Solar</option>
                                    <option value="EOLICO">Eólico</option>
                                    <option value="HÍBRIDO">Híbrido</option>
                                    <option value="ALMACENAMIENTO">Almacenamiento</option>
                                </select>

                                <select
                                    value={provinciaFilter}
                                    onChange={(e) => setProvinciaFilter(e.target.value)}
                                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800"
                                >
                                    <option value="TODOS">Todas las provincias</option>
                                    {provincias.map((prov) => (
                                        <option key={prov} value={prov}>
                                            {prov}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            Mostrando {filteredProyectos.length} de {proyectosActivos.length} proyectos
                        </div>
                    </div>
                </Card>

                {isLoading ? (
                    <div className="flex min-h-[50vh] items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                            <p className="text-muted-foreground text-sm">Cargando proyectos...</p>
                        </div>
                    </div>
                ) : filteredProyectos.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredProyectos.map((proyecto: any) => (
                            <Card key={proyecto.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                                <div className="p-6">
                                    <div className="mb-4 flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="mb-2 flex items-center gap-2">
                                                {getProjectTypeIcon(proyecto.tipo)}
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{proyecto.titulo}</h3>
                                            </div>
                                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                                {proyecto.estado}
                                            </Badge>
                                        </div>
                                    </div>

                                    {proyecto.descripcion && (
                                        <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">{proyecto.descripcion}</p>
                                    )}

                                    <div className="mb-4 space-y-2">
                                        {proyecto.potenciaObjetivo && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                <TrendingUp className="h-4 w-4 flex-shrink-0 text-purple-500" />
                                                <span>{proyecto.potenciaObjetivo} MW</span>
                                            </div>
                                        )}

                                        {proyecto.provincia && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                <MapPin className="h-4 w-4 flex-shrink-0 text-red-500" />
                                                <span>{proyecto.provincia}</span>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                            <Briefcase className="h-4 w-4 flex-shrink-0 text-blue-500" />
                                            <span>{getProjectTypeLabel(proyecto.tipo)}</span>
                                        </div>
                                    </div>

                                    <Link href={`/dashboard/propietario/proyectos/${proyecto.id}`} className="block">
                                        <Button variant="outline" size="sm" className="w-full gap-2">
                                            <Eye className="h-4 w-4" />
                                            Ver detalles
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="p-12">
                        <div className="text-center">
                            <Briefcase className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-semibold">No se encontraron proyectos</h3>
                            <p className="text-muted-foreground text-sm">
                                {searchTerm || tipoFilter !== "TODOS" || provinciaFilter !== "TODOS"
                                    ? "Intenta ajustar los filtros de búsqueda"
                                    : "No hay proyectos disponibles en este momento"}
                            </p>
                        </div>
                    </Card>
                )}
            </main>
        </>
    )
}
