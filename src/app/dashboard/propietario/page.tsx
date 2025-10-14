"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { MapPin, Plus, TrendingUp, Calendar } from "lucide-react"
import Link from "next/link"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DataTableTerrenos, type Terreno } from "@/components/data-table-terrenos"

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

    return (
        <div className="bg-background flex min-h-screen">
            <DashboardSidebar userType="propietario" />

            <main className="ml-64 flex-1">
                {/* Header */}
                <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 border-b backdrop-blur">
                    <div className="flex h-16 items-center justify-between px-8">
                        <div>
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                            <p className="text-muted-foreground text-sm">Gestiona tus terrenos</p>
                        </div>
                        <Link href="/dashboard/propietario/nuevo-terreno">
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                Añadir Terreno
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
                                    <EmptyTitle>Comienza a monetizar tu terreno</EmptyTitle>
                                    <EmptyDescription>
                                        Añade tu primer terreno y conecta con promotores de energía renovable interesados en tu propiedad.
                                        Genera ingresos pasivos mientras contribuyes a un futuro sostenible.
                                    </EmptyDescription>
                                </EmptyHeader>
                                <EmptyContent>
                                    <Link href="/dashboard/propietario/nuevo-terreno">
                                        <Button size="lg" className="gap-2">
                                            <Plus className="h-5 w-5" />
                                            Añade tu primer terreno
                                        </Button>
                                    </Link>
                                    <div className="mt-8 grid grid-cols-3 gap-6 border-t pt-6">
                                        <div className="text-center">
                                            <div className="text-primary text-2xl font-bold">€2,500</div>
                                            <div className="text-muted-foreground text-xs">Ingreso promedio/ha/año</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-primary text-2xl font-bold">25 años</div>
                                            <div className="text-muted-foreground text-xs">Duración típica contrato</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-primary text-2xl font-bold">98%</div>
                                            <div className="text-muted-foreground text-xs">Tasa de éxito</div>
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
                                            <TrendingUp className="text-secondary h-5 w-5" />
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
                                    <h2 className="text-xl font-bold">Tus Terrenos</h2>
                                    <p className="text-muted-foreground text-sm">Gestiona y visualiza el estado de tus propiedades</p>
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
