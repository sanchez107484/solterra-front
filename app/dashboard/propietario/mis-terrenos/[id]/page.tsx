"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MatchesTable } from "@/components/dashboard/matches-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTranslations } from "@/i18n/i18nContext"
import { MapPin, Pencil, Ruler } from "lucide-react"
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

                const response = await fetch(`${API_URL}/terrenos/${terrenoId}/matches`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    setMatches(data.matches || [])
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
                title={terreno?.titulo || "Detalle del Terreno"}
                breadcrumbs={[
                    { label: t?.dashboard?.breadcrumbs?.dashboard || "Dashboard", href: "/dashboard/propietario" },
                    { label: "Mis terrenos", href: "/dashboard/propietario/mis-terrenos" },
                    { label: terreno?.titulo || "Detalle" },
                ]}
                userType="propietario"
            />

            <main className="p-6">
                {isLoadingTerreno ? (
                    <div className="flex min-h-[50vh] items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                            <p className="text-muted-foreground text-sm">Cargando terreno...</p>
                        </div>
                    </div>
                ) : terreno ? (
                    <div className="space-y-6">
                        {/* Información del terreno */}
                        <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50 dark:border-green-800 dark:from-green-900/20 dark:to-blue-900/20">
                            <div className="p-6">
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center gap-2">
                                            <MapPin className="h-6 w-6 text-green-600" />
                                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{terreno.titulo}</h1>
                                        </div>
                                        <Badge className={getEstadoColor(terreno.estado)}>{terreno.estado}</Badge>
                                    </div>
                                    <Link href={`/dashboard/propietario/mis-terrenos/${terrenoId}/editar`}>
                                        <Button variant="outline" className="gap-2">
                                            <Pencil className="h-4 w-4" />
                                            Editar
                                        </Button>
                                    </Link>
                                </div>

                                {terreno.descripcion && <p className="mb-4 text-gray-600 dark:text-gray-300">{terreno.descripcion}</p>}

                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="flex items-center gap-2 rounded-lg bg-white/60 px-4 py-3 dark:bg-gray-800/60">
                                        <MapPin className="h-5 w-5 text-red-500" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Ubicación</p>
                                            <p className="font-semibold">
                                                {terreno.municipio}, {terreno.provincia}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 rounded-lg bg-white/60 px-4 py-3 dark:bg-gray-800/60">
                                        <Ruler className="h-5 w-5 text-purple-500" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Superficie</p>
                                            <p className="font-semibold">{terreno.superficie || 0} ha</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 rounded-lg bg-white/60 px-4 py-3 dark:bg-gray-800/60">
                                        <MapPin className="h-5 w-5 text-blue-500" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Tipo de suelo</p>
                                            <p className="font-semibold">{terreno.tipoSuelo || "No especificado"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Matches */}
                        <div>
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold">Proyectos compatibles</h2>
                                    <p className="text-muted-foreground text-sm">
                                        {matches.length} proyectos encontrados que pueden encajar con tu terreno
                                    </p>
                                </div>
                            </div>
                            <MatchesTable matches={matches} isLoading={isLoadingMatches} />
                        </div>
                    </div>
                ) : (
                    <Card className="p-12">
                        <div className="text-center">
                            <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-semibold">Terreno no encontrado</h3>
                            <p className="text-muted-foreground text-sm">No se pudo cargar la información del terreno.</p>
                            <Link href="/dashboard/propietario">
                                <Button className="mt-4">Volver al dashboard</Button>
                            </Link>
                        </div>
                    </Card>
                )}
            </main>
        </>
    )
}
