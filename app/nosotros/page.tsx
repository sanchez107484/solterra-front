"use client"

import { Footer } from "@/components/footer"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getTranslations, type Locale } from "@/lib/i18n"
import { Award, Globe, Leaf, Target, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

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
                <section className="from-primary/10 via-background to-secondary/10 relative bg-gradient-to-br px-6 py-24">
                    <div className="container mx-auto max-w-6xl text-center">
                        <h1 className="mb-6 text-5xl font-bold text-balance md:text-6xl">Sobre Solterra Advisory</h1>
                        <p className="text-muted-foreground mx-auto max-w-3xl text-xl text-pretty">
                            Impulsamos la transición energética conectando terrenos con proyectos de energía renovable
                        </p>
                    </div>
                </section>

                {/* Misión */}
                <section className="bg-background px-6 py-20">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid items-center gap-12 md:grid-cols-2">
                            <div>
                                <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold">
                                    Nuestra Misión
                                </div>
                                <h2 className="mb-6 text-4xl font-bold">Acelerar la transición hacia energías limpias</h2>
                                <p className="text-muted-foreground mb-6 text-lg">
                                    En Solterra Advisory creemos que la energía renovable es el futuro. Nuestra misión es facilitar el
                                    desarrollo de proyectos solares y eólicos conectando a propietarios de terrenos rurales con promotores
                                    especializados.
                                </p>
                                <p className="text-muted-foreground text-lg">
                                    Eliminamos las barreras tradicionales del sector, haciendo que el proceso sea transparente, eficiente y
                                    beneficioso para todas las partes involucradas.
                                </p>
                            </div>
                            <Card className="from-primary/5 to-secondary/5 border-2 bg-gradient-to-br p-8">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 shrink-0 rounded-xl p-3">
                                            <Target className="text-primary h-8 w-8" />
                                        </div>
                                        <div>
                                            <h3 className="mb-2 text-xl font-bold">Visión clara</h3>
                                            <p className="text-muted-foreground">
                                                Ser la plataforma líder en España para proyectos de energía renovable
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-secondary/10 shrink-0 rounded-xl p-3">
                                            <Leaf className="text-secondary h-8 w-8" />
                                        </div>
                                        <div>
                                            <h3 className="mb-2 text-xl font-bold">Compromiso sostenible</h3>
                                            <p className="text-muted-foreground">
                                                Contribuir activamente a la reducción de emisiones de CO₂
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-accent/10 shrink-0 rounded-xl p-3">
                                            <Users className="text-accent h-8 w-8" />
                                        </div>
                                        <div>
                                            <h3 className="mb-2 text-xl font-bold">Impacto social</h3>
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
                <section className="from-primary/5 to-background bg-gradient-to-br px-6 py-20">
                    <div className="container mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-4xl font-bold">Nuestros valores</h2>
                            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                                Los principios que guían cada decisión que tomamos
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            <Card className="border-2 p-8 text-center transition-shadow hover:shadow-xl">
                                <div className="bg-primary/10 mx-auto mb-6 w-fit rounded-full p-4">
                                    <Award className="text-primary h-10 w-10" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold">Transparencia</h3>
                                <p className="text-muted-foreground">
                                    Información clara y verificada en cada paso del proceso. Sin sorpresas ni costes ocultos.
                                </p>
                            </Card>

                            <Card className="border-2 p-8 text-center transition-shadow hover:shadow-xl">
                                <div className="bg-secondary/10 mx-auto mb-6 w-fit rounded-full p-4">
                                    <TrendingUp className="text-secondary h-10 w-10" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold">Eficiencia</h3>
                                <p className="text-muted-foreground">
                                    Tecnología avanzada que reduce tiempos y optimiza el matching entre terrenos y proyectos.
                                </p>
                            </Card>

                            <Card className="border-2 p-8 text-center transition-shadow hover:shadow-xl">
                                <div className="bg-accent/10 mx-auto mb-6 w-fit rounded-full p-4">
                                    <Leaf className="text-accent h-10 w-10" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold">Sostenibilidad</h3>
                                <p className="text-muted-foreground">
                                    Compromiso real con el medio ambiente y el desarrollo de energías limpias.
                                </p>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Estadísticas */}
                <section className="bg-background px-6 py-20">
                    <div className="container mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-4xl font-bold">Nuestro impacto</h2>
                            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                                Cifras que demuestran nuestro compromiso con la energía renovable
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-4">
                            <Card className="border-2 p-8 text-center">
                                <div className="text-primary mb-2 text-5xl font-bold">500+</div>
                                <div className="text-muted-foreground">Terrenos listados</div>
                            </Card>
                            <Card className="border-2 p-8 text-center">
                                <div className="text-secondary mb-2 text-5xl font-bold">300+</div>
                                <div className="text-muted-foreground">Promotores activos</div>
                            </Card>
                            <Card className="border-2 p-8 text-center">
                                <div className="text-accent mb-2 text-5xl font-bold">150MW</div>
                                <div className="text-muted-foreground">En desarrollo</div>
                            </Card>
                            <Card className="border-2 p-8 text-center">
                                <div className="text-primary mb-2 text-5xl font-bold">€2M+</div>
                                <div className="text-muted-foreground">En contratos</div>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="from-primary via-primary/90 to-secondary bg-gradient-to-br px-6 py-20">
                    <div className="text-primary-foreground container mx-auto max-w-4xl text-center">
                        <Globe className="mx-auto mb-6 h-16 w-16 opacity-90" />
                        <h2 className="mb-6 text-4xl font-bold">Únete a la revolución energética</h2>
                        <p className="mb-8 text-xl opacity-90">Forma parte del cambio hacia un futuro más sostenible y rentable</p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Link href="/login/propietario">
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="bg-background text-foreground hover:bg-background/90 h-14 px-8 text-lg"
                                >
                                    Soy propietario
                                </Button>
                            </Link>
                            <Link href="/login/promotor">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 h-14 border-2 bg-transparent px-8 text-lg"
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
