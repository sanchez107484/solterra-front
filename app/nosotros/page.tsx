"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getTranslations, type Locale } from "@/lib/i18n"
import { Target, Users, Leaf, TrendingUp, Award, Globe } from "lucide-react"
import Link from "next/link"

export default function Nosotros() {
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Sobre Solterra Advisory</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Impulsamos la transición energética conectando terrenos con proyectos de energía renovable
            </p>
          </div>
        </section>

        {/* Misión */}
        <section className="py-20 px-6 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-6">
                  Nuestra Misión
                </div>
                <h2 className="text-4xl font-bold mb-6">Acelerar la transición hacia energías limpias</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  En Solterra Advisory creemos que la energía renovable es el futuro. Nuestra misión es facilitar el
                  desarrollo de proyectos solares y eólicos conectando a propietarios de terrenos rurales con promotores
                  especializados.
                </p>
                <p className="text-lg text-muted-foreground">
                  Eliminamos las barreras tradicionales del sector, haciendo que el proceso sea transparente, eficiente
                  y beneficioso para todas las partes involucradas.
                </p>
              </div>
              <Card className="p-8 border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-primary/10 p-3 shrink-0">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Visión clara</h3>
                      <p className="text-muted-foreground">
                        Ser la plataforma líder en España para proyectos de energía renovable
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-secondary/10 p-3 shrink-0">
                      <Leaf className="h-8 w-8 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Compromiso sostenible</h3>
                      <p className="text-muted-foreground">Contribuir activamente a la reducción de emisiones de CO₂</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-accent/10 p-3 shrink-0">
                      <Users className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Impacto social</h3>
                      <p className="text-muted-foreground">
                        Generar oportunidades económicas en zonas rurales de España
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-20 px-6 bg-gradient-to-br from-primary/5 to-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Nuestros valores</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Los principios que guían cada decisión que tomamos
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 text-center border-2 hover:shadow-xl transition-shadow">
                <div className="rounded-full bg-primary/10 p-4 w-fit mx-auto mb-6">
                  <Award className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Transparencia</h3>
                <p className="text-muted-foreground">
                  Información clara y verificada en cada paso del proceso. Sin sorpresas ni costes ocultos.
                </p>
              </Card>

              <Card className="p-8 text-center border-2 hover:shadow-xl transition-shadow">
                <div className="rounded-full bg-secondary/10 p-4 w-fit mx-auto mb-6">
                  <TrendingUp className="h-10 w-10 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Eficiencia</h3>
                <p className="text-muted-foreground">
                  Tecnología avanzada que reduce tiempos y optimiza el matching entre terrenos y proyectos.
                </p>
              </Card>

              <Card className="p-8 text-center border-2 hover:shadow-xl transition-shadow">
                <div className="rounded-full bg-accent/10 p-4 w-fit mx-auto mb-6">
                  <Leaf className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Sostenibilidad</h3>
                <p className="text-muted-foreground">
                  Compromiso real con el medio ambiente y el desarrollo de energías limpias.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Estadísticas */}
        <section className="py-20 px-6 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Nuestro impacto</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Cifras que demuestran nuestro compromiso con la energía renovable
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <Card className="p-8 text-center border-2">
                <div className="text-5xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Terrenos listados</div>
              </Card>
              <Card className="p-8 text-center border-2">
                <div className="text-5xl font-bold text-secondary mb-2">300+</div>
                <div className="text-muted-foreground">Promotores activos</div>
              </Card>
              <Card className="p-8 text-center border-2">
                <div className="text-5xl font-bold text-accent mb-2">150MW</div>
                <div className="text-muted-foreground">En desarrollo</div>
              </Card>
              <Card className="p-8 text-center border-2">
                <div className="text-5xl font-bold text-primary mb-2">€2M+</div>
                <div className="text-muted-foreground">En contratos</div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-gradient-to-br from-primary via-primary/90 to-secondary">
          <div className="container mx-auto max-w-4xl text-center text-primary-foreground">
            <Globe className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold mb-6">Únete a la revolución energética</h2>
            <p className="text-xl mb-8 opacity-90">Forma parte del cambio hacia un futuro más sostenible y rentable</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login/propietario">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-14 px-8 text-lg bg-background text-foreground hover:bg-background/90"
                >
                  Soy propietario
                </Button>
              </Link>
              <Link href="/login/promotor">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                >
                  Soy promotor
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer t={t} />
      </main>
    </div>
  )
}
