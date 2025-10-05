"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getTranslations, type Locale } from "@/lib/i18n"
import { UserPlus, FileText, Search, Handshake, CheckCircle, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function ComoFunciona() {
  const [locale, setLocale] = useState<Locale>("es")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLocale = localStorage.getItem("locale") as Locale
    if (savedLocale) {
      setLocale(savedLocale)
    }
  }, [])

  if (!mounted) {
    return null
  }

  const t = getTranslations(locale)

  return (
    <div className="flex min-h-screen">
      <Sidebar t={t} />
      <main className="flex-1 lg:ml-64">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-24 px-6">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Cómo funciona Solterra</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Conectamos propietarios de terrenos con promotores de energía renovable de forma simple, transparente y
              eficiente.
            </p>
          </div>
        </section>

        {/* Para Propietarios */}
        <section className="py-20 px-6 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-4">
                Para Propietarios
              </div>
              <h2 className="text-4xl font-bold mb-4">Monetiza tu terreno en 4 pasos</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Genera ingresos pasivos mientras contribuyes a un futuro sostenible
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border-2 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3 shrink-0">
                    <UserPlus className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-primary mb-2">PASO 1</div>
                    <h3 className="text-2xl font-bold mb-3">Regístrate gratis</h3>
                    <p className="text-muted-foreground">
                      Crea tu cuenta como propietario en menos de 2 minutos. Sin costes ni compromisos.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-2 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3 shrink-0">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-primary mb-2">PASO 2</div>
                    <h3 className="text-2xl font-bold mb-3">Lista tu terreno</h3>
                    <p className="text-muted-foreground">
                      Añade información sobre tu propiedad: ubicación, superficie, características. Nuestro equipo lo
                      verificará.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-2 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3 shrink-0">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-primary mb-2">PASO 3</div>
                    <h3 className="text-2xl font-bold mb-3">Recibe propuestas</h3>
                    <p className="text-muted-foreground">
                      Los promotores interesados contactarán contigo. Compara ofertas y elige la mejor opción.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-2 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3 shrink-0">
                    <Handshake className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-primary mb-2">PASO 4</div>
                    <h3 className="text-2xl font-bold mb-3">Cierra el acuerdo</h3>
                    <p className="text-muted-foreground">
                      Firma el contrato y comienza a generar ingresos pasivos durante 20-25 años.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <Link href="/login/propietario">
                <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90">
                  Comenzar como propietario
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Para Promotores */}
        <section className="py-20 px-6 bg-gradient-to-br from-secondary/5 to-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-semibold mb-4">
                Para Promotores
              </div>
              <h2 className="text-4xl font-bold mb-4">Encuentra terrenos ideales en 4 pasos</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Accede a una red de terrenos verificados y acelera tus proyectos
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border-2 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-secondary/10 p-3 shrink-0">
                    <UserPlus className="h-8 w-8 text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-secondary mb-2">PASO 1</div>
                    <h3 className="text-2xl font-bold mb-3">Regístrate como promotor</h3>
                    <p className="text-muted-foreground">
                      Crea tu perfil empresarial y accede a nuestra base de datos de terrenos disponibles.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-2 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-secondary/10 p-3 shrink-0">
                    <FileText className="h-8 w-8 text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-secondary mb-2">PASO 2</div>
                    <h3 className="text-2xl font-bold mb-3">Define tu proyecto</h3>
                    <p className="text-muted-foreground">
                      Especifica tipo de energía, capacidad, ubicación preferida y requisitos técnicos.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-2 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-secondary/10 p-3 shrink-0">
                    <TrendingUp className="h-8 w-8 text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-secondary mb-2">PASO 3</div>
                    <h3 className="text-2xl font-bold mb-3">Recibe matches</h3>
                    <p className="text-muted-foreground">
                      Nuestro algoritmo te mostrará terrenos compatibles con tu proyecto. Analiza y compara opciones.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-2 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-secondary/10 p-3 shrink-0">
                    <Handshake className="h-8 w-8 text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-secondary mb-2">PASO 4</div>
                    <h3 className="text-2xl font-bold mb-3">Contacta y negocia</h3>
                    <p className="text-muted-foreground">
                      Comunícate directamente con propietarios y cierra acuerdos de forma ágil y transparente.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <Link href="/login/promotor">
                <Button size="lg" className="h-14 px-8 text-lg bg-secondary hover:bg-secondary/90">
                  Comenzar como promotor
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-20 px-6 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Por qué elegir Solterra</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                La plataforma más completa para proyectos de energía renovable
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 text-center border-2">
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Verificación profesional</h3>
                <p className="text-muted-foreground">
                  Todos los terrenos y proyectos son verificados por nuestro equipo de expertos
                </p>
              </Card>

              <Card className="p-8 text-center border-2">
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Matching inteligente</h3>
                <p className="text-muted-foreground">
                  Algoritmo avanzado que conecta terrenos y proyectos compatibles automáticamente
                </p>
              </Card>

              <Card className="p-8 text-center border-2">
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Soporte continuo</h3>
                <p className="text-muted-foreground">
                  Asesoramiento técnico y legal durante todo el proceso de negociación
                </p>
              </Card>
            </div>
          </div>
        </section>

        <Footer t={t} />
      </main>
    </div>
  )
}
