"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DataTableProyectos, type Proyecto } from "@/components/data-table-proyectos"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Briefcase, Calendar, MapPin, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const proyectosData: Proyecto[] = [
    {
        id: "1",
        nombre: "Parque Solar Extremadura",
        referencia: "PRO-001",
        tipo: "Solar",
        capacidad: 20,
        estado: "Activo",
        terrenos: 12,
    },
    {
        id: "2",
        nombre: "Eólico Aragón Norte",
        referencia: "PRO-002",
        tipo: "Eólico",
        capacidad: 15,
        estado: "En búsqueda",
        terrenos: 6,
    },
]

export default function DashboardPromotor() {
    const [hasProyectos, setHasProyectos] = useState(true)

    return (
        <div className="bg-background flex min-h-screen">
            <DashboardSidebar userType="promotor" />

            <main className="ml-64 flex-1">
                {/* Header */}
                <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 border-b backdrop-blur">
                    <div className="flex h-16 items-center justify-between px-8">
                        <div>
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                            <p className="text-muted-foreground text-sm">Gestiona tus proyectos</p>
                        </div>
                        <Link href="/dashboard/promotor/nuevo-proyecto">
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                Nuevo Proyecto
                            </Button>
                        </Link>
                    </div>
                </header>

                <div className="p-8">
                    {!hasProyectos ? (
                        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
                            <Empty className="max-w-2xl">
                                <EmptyHeader>
                                    <EmptyMedia>
                                        <Briefcase className="h-12 w-12" />
                                    </EmptyMedia>
                                    <EmptyTitle>Encuentra terrenos para tus proyectos</EmptyTitle>
                                    <EmptyDescription>
                                        Añade tu primer proyecto y descubre terrenos ideales para desarrollar energía renovable. Conecta con
                                        propietarios y acelera el desarrollo de tus iniciativas sostenibles.
                                    </EmptyDescription>
                                </EmptyHeader>
                                <EmptyContent>
                                    <Link href="/dashboard/promotor/nuevo-proyecto">
                                        <Button size="lg" className="gap-2">
                                            <Plus className="h-5 w-5" />
                                            Añade tu primer proyecto
                                        </Button>
                                    </Link>
                                    <div className="mt-8 grid grid-cols-3 gap-6 border-t pt-6">
                                        <div className="text-center">
                                            <div className="text-secondary-foreground text-2xl font-bold">500+</div>
                                            <div className="text-muted-foreground text-xs">Terrenos disponibles</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-secondary-foreground text-2xl font-bold">150MW</div>
                                            <div className="text-muted-foreground text-xs">Capacidad total</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-secondary-foreground text-2xl font-bold">95%</div>
                                            <div className="text-muted-foreground text-xs">Match exitoso</div>
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
                                            <p className="text-muted-foreground text-sm font-medium">Proyectos Activos</p>
                                            <p className="text-3xl font-bold">2</p>
                                            <p className="text-muted-foreground mt-1 text-xs">En desarrollo</p>
                                        </div>
                                        <div className="bg-secondary/10 rounded-full p-3">
                                            <Briefcase className="text-secondary-foreground h-5 w-5" />
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-muted-foreground text-sm font-medium">Terrenos Compatibles</p>
                                            <p className="text-3xl font-bold">18</p>
                                            <p className="text-muted-foreground mt-1 text-xs">Disponibles ahora</p>
                                        </div>
                                        <div className="bg-primary/10 rounded-full p-3">
                                            <MapPin className="text-primary h-5 w-5" />
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-muted-foreground text-sm font-medium">Capacidad Total</p>
                                            <p className="text-3xl font-bold">35 MW</p>
                                            <p className="text-muted-foreground mt-1 text-xs">Planificada</p>
                                        </div>
                                        <div className="bg-accent/10 rounded-full p-3">
                                            <TrendingUp className="text-accent h-5 w-5" />
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-muted-foreground text-sm font-medium">Inversión Estimada</p>
                                            <p className="text-3xl font-bold">€28M</p>
                                            <p className="text-muted-foreground mt-1 text-xs">Total proyectos</p>
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
                                    <h2 className="text-xl font-bold">Tus Proyectos</h2>
                                    <p className="text-muted-foreground text-sm">Gestiona tus proyectos y encuentra terrenos compatibles</p>
                                </div>
                                <div className="p-6">
                                    <DataTableProyectos data={proyectosData} />
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
