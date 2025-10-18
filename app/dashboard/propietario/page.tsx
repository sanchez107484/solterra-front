"use client"

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DataTableTerrenos, type Terreno } from "@/components/dashboard/data-table-terrenos"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { getTranslations, type Locale } from "@/lib/i18n"
import { Calendar, MapPin, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const terrenosData: Terreno[] = [
    {
        id: "1",
        ubicacion: "Badajoz, Extremadura",
        referencia: "TER-001",
        hectareas: 15.5,
        tipo: "Solar",
        estado: "Activo",
        interesados: 5,
    },
    {
        id: "2",
        ubicacion: "Albacete, Castilla-La Mancha",
        referencia: "TER-002",
        hectareas: 22.0,
        tipo: "Eólico",
        estado: "Activo",
        interesados: 4,
    },
    {
        id: "3",
        ubicacion: "Zaragoza, Aragón",
        referencia: "TER-003",
        hectareas: 7.7,
        tipo: "Solar",
        estado: "En revisión",
        interesados: 3,
    },
]

export default function DashboardPropietario() {
    const [hasTerrenos, setHasTerrenos] = useState(true)
    const [locale, setLocale] = useState<Locale>("es")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const saved = (localStorage.getItem("locale") as Locale) || "es"
        setLocale(saved)
    }, [])

    if (!mounted) return null

    const t = getTranslations(locale)

    return (
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
                    {!hasTerrenos ? (
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
                                            <p className="text-3xl font-bold">3</p>
                                            <p className="text-muted-foreground mt-1 text-xs">+1 este mes</p>
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
                                            <p className="text-3xl font-bold">12</p>
                                            <p className="text-muted-foreground mt-1 text-xs">+3 esta semana</p>
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
                                            <p className="text-3xl font-bold">45.2</p>
                                            <p className="text-muted-foreground mt-1 text-xs">En 3 ubicaciones</p>
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
                                            <p className="text-3xl font-bold">€113K</p>
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
                                    <DataTableTerrenos data={terrenosData} />
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
