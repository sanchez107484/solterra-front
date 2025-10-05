"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Leaf, Plus, MapPin, TrendingUp, Calendar } from "lucide-react"
import Link from "next/link"

export default function DashboardPropietario() {
  const [hasTerrenos, setHasTerrenos] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="rounded-xl bg-primary p-2 shadow-lg">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold">Solterra</span>
                <p className="text-xs text-muted-foreground">Propietario</p>
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
        {!hasTerrenos ? (
          // Estado vacío
          <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <Card className="max-w-2xl w-full p-12 text-center shadow-2xl border-2">
              <div className="inline-flex rounded-full bg-primary/10 p-6 mb-6">
                <MapPin className="h-16 w-16 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-4 text-balance">Comienza a monetizar tu terreno</h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Añade tu primer terreno y conecta con promotores de energía renovable interesados en tu propiedad.
              </p>
              <Link href="/dashboard/propietario/nuevo-terreno">
                <Button size="lg" className="h-14 px-8 text-lg gap-2 bg-primary hover:bg-primary/90">
                  <Plus className="h-5 w-5" />
                  Añade tu primer terreno
                </Button>
              </Link>
              <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t">
                <div>
                  <div className="text-3xl font-bold text-primary">€2,500</div>
                  <div className="text-sm text-muted-foreground">Ingreso promedio/ha/año</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">25 años</div>
                  <div className="text-sm text-muted-foreground">Duración típica contrato</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Tasa de éxito</div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          // Dashboard con datos
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Mis Terrenos</h1>
                <p className="text-muted-foreground">Gestiona tus propiedades y visualiza estadísticas</p>
              </div>
              <Link href="/dashboard/propietario/nuevo-terreno">
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                  <Plus className="h-5 w-5" />
                  Añadir terreno
                </Button>
              </Link>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 border-2 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Terrenos activos</span>
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl font-bold">3</div>
              </Card>
              <Card className="p-6 border-2 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Interesados</span>
                  <TrendingUp className="h-5 w-5 text-secondary" />
                </div>
                <div className="text-3xl font-bold">12</div>
              </Card>
              <Card className="p-6 border-2 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Hectáreas totales</span>
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div className="text-3xl font-bold">45.2</div>
              </Card>
              <Card className="p-6 border-2 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Ingresos estimados</span>
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl font-bold">€113K</div>
              </Card>
            </div>

            {/* Tabla de terrenos */}
            <Card className="border-2">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">Tus terrenos</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-semibold">Ubicación</th>
                      <th className="text-left p-4 font-semibold">Hectáreas</th>
                      <th className="text-left p-4 font-semibold">Tipo</th>
                      <th className="text-left p-4 font-semibold">Estado</th>
                      <th className="text-left p-4 font-semibold">Interesados</th>
                      <th className="text-left p-4 font-semibold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="font-medium">Badajoz, Extremadura</div>
                        <div className="text-sm text-muted-foreground">Ref: TER-001</div>
                      </td>
                      <td className="p-4">15.5 ha</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          Solar
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm font-medium">
                          Activo
                        </span>
                      </td>
                      <td className="p-4">5 promotores</td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm">
                          Ver detalles
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-t hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="font-medium">Albacete, Castilla-La Mancha</div>
                        <div className="text-sm text-muted-foreground">Ref: TER-002</div>
                      </td>
                      <td className="p-4">22.0 ha</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                          Eólico
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm font-medium">
                          Activo
                        </span>
                      </td>
                      <td className="p-4">4 promotores</td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm">
                          Ver detalles
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-t hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="font-medium">Zaragoza, Aragón</div>
                        <div className="text-sm text-muted-foreground">Ref: TER-003</div>
                      </td>
                      <td className="p-4">7.7 ha</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          Solar
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 text-sm font-medium">
                          En revisión
                        </span>
                      </td>
                      <td className="p-4">3 promotores</td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm">
                          Ver detalles
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
