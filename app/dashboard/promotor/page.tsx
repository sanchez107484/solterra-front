"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Zap, Plus, Briefcase, TrendingUp, MapPin, Calendar } from "lucide-react"
import Link from "next/link"

export default function DashboardPromotor() {
  const [hasProyectos, setHasProyectos] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="rounded-xl bg-secondary p-2 shadow-lg">
                <Zap className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold">Solterra</span>
                <p className="text-xs text-muted-foreground">Promotor</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Mi perfil
            </Button>
            <Button variant="ghost" size="sm">
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {!hasProyectos ? (
          // Estado vacío
          <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <Card className="max-w-2xl w-full p-12 text-center shadow-2xl border-2">
              <div className="inline-flex rounded-full bg-secondary/10 p-6 mb-6">
                <Briefcase className="h-16 w-16 text-secondary" />
              </div>
              <h1 className="text-4xl font-bold mb-4 text-balance">Encuentra terrenos para tus proyectos</h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Añade tu primer proyecto y descubre terrenos ideales para desarrollar energía renovable.
              </p>
              <Link href="/dashboard/promotor/nuevo-proyecto">
                <Button size="lg" className="h-14 px-8 text-lg gap-2 bg-secondary hover:bg-secondary/90">
                  <Plus className="h-5 w-5" />
                  Añade tu primer proyecto
                </Button>
              </Link>
              <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t">
                <div>
                  <div className="text-3xl font-bold text-secondary">500+</div>
                  <div className="text-sm text-muted-foreground">Terrenos disponibles</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary">150MW</div>
                  <div className="text-sm text-muted-foreground">Capacidad total</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary">95%</div>
                  <div className="text-sm text-muted-foreground">Match exitoso</div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          // Dashboard con datos
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Mis Proyectos</h1>
                <p className="text-muted-foreground">Gestiona tus proyectos y encuentra terrenos ideales</p>
              </div>
              <Link href="/dashboard/promotor/nuevo-proyecto">
                <Button size="lg" className="gap-2 bg-secondary hover:bg-secondary/90">
                  <Plus className="h-5 w-5" />
                  Nuevo proyecto
                </Button>
              </Link>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 border-2 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Proyectos activos</span>
                  <Briefcase className="h-5 w-5 text-secondary" />
                </div>
                <div className="text-3xl font-bold">2</div>
              </Card>
              <Card className="p-6 border-2 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Terrenos compatibles</span>
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl font-bold">18</div>
              </Card>
              <Card className="p-6 border-2 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Capacidad total</span>
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <div className="text-3xl font-bold">35 MW</div>
              </Card>
              <Card className="p-6 border-2 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Inversión estimada</span>
                  <Calendar className="h-5 w-5 text-secondary" />
                </div>
                <div className="text-3xl font-bold">€28M</div>
              </Card>
            </div>

            {/* Tabla de proyectos */}
            <Card className="border-2">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">Tus proyectos</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-semibold">Proyecto</th>
                      <th className="text-left p-4 font-semibold">Tipo</th>
                      <th className="text-left p-4 font-semibold">Capacidad</th>
                      <th className="text-left p-4 font-semibold">Estado</th>
                      <th className="text-left p-4 font-semibold">Terrenos compatibles</th>
                      <th className="text-left p-4 font-semibold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="font-medium">Parque Solar Extremadura</div>
                        <div className="text-sm text-muted-foreground">Ref: PRO-001</div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          Solar
                        </span>
                      </td>
                      <td className="p-4">20 MW</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm font-medium">
                          Activo
                        </span>
                      </td>
                      <td className="p-4">12 terrenos</td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm">
                          Ver matches
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-t hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="font-medium">Eólico Aragón Norte</div>
                        <div className="text-sm text-muted-foreground">Ref: PRO-002</div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                          Eólico
                        </span>
                      </td>
                      <td className="p-4">15 MW</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 text-sm font-medium">
                          En búsqueda
                        </span>
                      </td>
                      <td className="p-4">6 terrenos</td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm">
                          Ver matches
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
