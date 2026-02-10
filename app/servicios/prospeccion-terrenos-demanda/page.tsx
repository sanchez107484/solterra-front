"use client"

import StandardLayout from "@/components/layouts/StandardLayout"
import { ServiceSchema } from "@/components/seo/ServiceSchema"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Clock, FileText, MapPin, Search, Shield, Sparkles, Target, TrendingUp, Users, Zap } from "lucide-react"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ProspeccionDemandaPage() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <StandardLayout>
            <Head>
                <title>Prospección de Terrenos a Demanda | Búsqueda Mandatada Renovables</title>
                <meta
                    name="description"
                    content="Servicio de prospección mandatada de terrenos para proyectos renovables. Búsqueda personalizada fuera de nuestra base de datos con modelo por fases y éxito."
                />
                <meta
                    name="keywords"
                    content="prospeccion terrenos renovables, buscar suelo fotovoltaico, prospección mandatada solar, sourcing terrenos energia, busqueda terrenos demanda"
                />
                <link rel="canonical" href="https://solterra.es/servicios/prospeccion-terrenos-demanda" />
            </Head>

            <ServiceSchema
                name="Prospección de Terrenos a Demanda para Proyectos Renovables"
                description="Servicio de búsqueda mandatada de terrenos específicos para proyectos solares, eólicos y BESS. Prospección personalizada fuera de nuestra base de datos existente."
                serviceType="Land Sourcing and Prospection Service"
                areaServed="ES"
                offers={{
                    price: "900",
                    priceCurrency: "EUR",
                    description: "Modelo por fases: LOI 900€ + fees por activación exitosa + 1-2% success fee según complejidad",
                }}
            />

            {/* Hero Section */}
            <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden py-12 md:py-16">
                <div className="via-background from-secondary/10 to-secondary/5 absolute inset-0 bg-gradient-to-br" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.15),transparent_50%)]" />

                <div className="relative container mx-auto px-4">
                    <div
                        className={`mx-auto max-w-5xl text-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                    >
                        <div className="mb-6 flex justify-center">
                            <div className="border-secondary/20 bg-secondary/10 text-secondary-foreground inline-flex items-center gap-2 rounded-full border-2 px-4 py-2">
                                <Target className="h-4 w-4" />
                                <span className="text-sm font-semibold">Servicio Premium</span>
                            </div>
                        </div>

                        <h1 className="text-foreground mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                            Prospección <span className="text-secondary-foreground">Mandatada</span> de Terrenos
                        </h1>

                        <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-lg md:text-xl">
                            ¿Necesitas suelo en una zona específica que no está en nuestro marketplace? Activamos búsqueda personalizada con
                            prospección intensiva y curación técnica.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contacto">
                                <Button size="lg" className="bg-secondary-foreground hover:bg-secondary/90 gap-2 text-base">
                                    <Sparkles className="h-5 w-5" />
                                    Solicitar prospección
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/servicios/marketplace-terrenos-renovables">
                                <Button size="lg" variant="outline" className="gap-2 text-base">
                                    Ver marketplace estándar
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Signals */}
                        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-secondary-foreground h-5 w-5" />
                                <span className="text-muted-foreground">Prospección fuera de BD existente</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-secondary-foreground h-5 w-5" />
                                <span className="text-muted-foreground">Modelo por fases con LOI</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-secondary-foreground h-5 w-5" />
                                <span className="text-muted-foreground">Success fee reducido 1-2%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* When to Use Section */}
            <section className="bg-muted/30 py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">¿Cuándo Solicitar Prospección Mandatada?</h2>
                        <p className="text-muted-foreground text-lg">Este servicio es ideal para casos específicos de búsqueda avanzada</p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="group border-secondary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-6 shadow-sm transition-transform duration-200 ease-out hover:scale-[1.03] sm:p-8">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-2 sm:p-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/0">
                                    <MapPin className="text-secondary-foreground h-5 w-5 transition-transform group-hover:scale-110" />
                                </div>
                                <h3 className="text-foreground m-0 text-base leading-tight font-semibold">Zona Estratégica Específica</h3>
                            </div>
                            <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                                Necesitas suelo en un nudo concreto o área sin presencia en nuestro marketplace. Prospección intensiva en la
                                zona objetivo.
                            </p>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        <div className="group border-secondary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-6 shadow-sm transition-transform duration-200 ease-out hover:scale-[1.03] sm:p-8">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-2 sm:p-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/0">
                                    <Zap className="text-secondary-foreground h-5 w-5 transition-transform group-hover:scale-110" />
                                </div>
                                <h3 className="text-foreground m-0 text-base leading-tight font-semibold">Requisitos Muy Específicos</h3>
                            </div>
                            <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                                Criterios técnicos muy concretos: potencia mínima, distancia máxima a SET, orografía específica, tipo de
                                propiedad.
                            </p>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        <div className="group border-secondary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-6 shadow-sm transition-transform duration-200 ease-out hover:scale-[1.03] sm:p-8">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-2 sm:p-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/0">
                                    <Target className="text-secondary-foreground h-5 w-5 transition-transform group-hover:scale-110" />
                                </div>
                                <h3 className="text-foreground m-0 text-base leading-tight font-semibold">Proyecto en Fase Avanzada</h3>
                            </div>
                            <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                                Ya tienes punto de conexión asegurado o autorización administrativa previa. Necesitas el suelo de forma
                                urgente.
                            </p>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        <div className="group border-secondary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-6 shadow-sm transition-transform duration-200 ease-out hover:scale-[1.03] sm:p-8">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-2 sm:p-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/0">
                                    <Users className="text-secondary-foreground h-5 w-5 transition-transform group-hover:scale-110" />
                                </div>
                                <h3 className="text-foreground m-0 text-base leading-tight font-semibold">Pack Multi-Propietario</h3>
                            </div>
                            <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                                Necesitas agregar múltiples terrenos contiguos o en área definida para alcanzar la potencia objetivo del
                                proyecto.
                            </p>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        <div className="group border-secondary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-6 shadow-sm transition-transform duration-200 ease-out hover:scale-[1.03] sm:p-8">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-2 sm:p-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/0">
                                    <TrendingUp className="text-secondary-foreground h-5 w-5 transition-transform group-hover:scale-110" />
                                </div>
                                <h3 className="text-foreground m-0 text-base leading-tight font-semibold">Ampliación de Proyecto</h3>
                            </div>
                            <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                                Ya tienes un proyecto en marcha y quieres ampliar potencia. Buscamos suelo adicional cercano compatible con
                                el desarrollo existente.
                            </p>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        <div className="group border-secondary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-6 shadow-sm transition-transform duration-200 ease-out hover:scale-[1.03] sm:p-8">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-2 sm:p-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/0">
                                    <Shield className="text-secondary-foreground h-5 w-5 transition-transform group-hover:scale-110" />
                                </div>
                                <h3 className="text-foreground m-0 text-base leading-tight font-semibold">Confidencialidad Crítica</h3>
                            </div>
                            <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                                Requieres discreción absoluta por estrategia competitiva o posición de mercado. Prospección con NDA
                                reforzado.
                            </p>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">Cómo Funciona la Prospección Mandatada</h2>
                        <p className="text-muted-foreground text-lg">Proceso estructurado por fases con compromiso mutuo</p>
                    </div>

                    <div className="mx-auto max-w-5xl space-y-6">
                        {/* Phase 1 */}
                        <div className="bg-background group hover:border-secondary rounded-xl border-2 border-transparent p-6 transition-all hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary/10 shrink-0 rounded-xl p-3">
                                    <span className="text-secondary-foreground text-2xl font-bold">1</span>
                                </div>
                                <div className="flex-1">
                                    <div className="bg-secondary/10 text-secondary-foreground mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
                                        <FileText className="h-3 w-3" />
                                        Fase Inicial
                                    </div>
                                    <h3 className="text-foreground mb-2 text-xl font-bold">Briefing Técnico y Firma de LOI</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Reunión de scoping: defines zona, criterios técnicos, potencia objetivo, calendario. Firmamos LOI
                                        con commitment fee para activar prospección.
                                    </p>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="bg-secondary/5 rounded-lg p-4">
                                            <p className="mb-2 text-sm font-semibold">Qué incluye:</p>
                                            <ul className="space-y-1 text-sm">
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                                    <span>Workshop de definición</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                                    <span>Análisis preliminar de zona</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                                    <span>Plan de prospección</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="border-secondary/30 bg-secondary/5 rounded-lg border-2 p-4">
                                            <p className="text-secondary-foreground mb-2 text-sm font-semibold">Inversión:</p>
                                            <p className="text-2xl font-bold">900€</p>
                                            <p className="text-muted-foreground text-xs">Commitment fee (100% imputable)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Phase 2 */}
                        <div className="bg-background group hover:border-secondary rounded-xl border-2 border-transparent p-6 transition-all hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary/10 shrink-0 rounded-xl p-3">
                                    <span className="text-secondary-foreground text-2xl font-bold">2</span>
                                </div>
                                <div className="flex-1">
                                    <div className="bg-secondary/10 text-secondary-foreground mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
                                        <Search className="h-3 w-3" />
                                        Fase de Prospección
                                    </div>
                                    <h3 className="text-foreground mb-2 text-xl font-bold">Búsqueda Intensiva y Curación</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Prospección activa en la zona: identificación de parcelas, contacto con propietarios, curación
                                        técnica preliminar, estructuración de oportunidades viables.
                                    </p>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="bg-secondary/5 rounded-lg p-4">
                                            <p className="mb-2 text-sm font-semibold">Actividades:</p>
                                            <ul className="space-y-1 text-sm">
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                                    <span>Identificación catastral</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                                    <span>Contacto con propietarios</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                                    <span>Validación técnica preliminar</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                                    <span>Presentación de oportunidades</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="bg-secondary/5 rounded-lg p-4">
                                            <div className="mb-3 flex items-center gap-2">
                                                <Clock className="text-secondary-foreground h-4 w-4" />
                                                <p className="text-sm font-semibold">Duración:</p>
                                            </div>
                                            <p className="text-muted-foreground text-sm">4-8 semanas según complejidad de la zona</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Phase 3 */}
                        <div className="bg-background group hover:border-secondary rounded-xl border-2 border-transparent p-6 transition-all hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary/10 shrink-0 rounded-xl p-3">
                                    <span className="text-secondary-foreground text-2xl font-bold">3</span>
                                </div>
                                <div className="flex-1">
                                    <div className="bg-secondary/10 text-secondary-foreground mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
                                        <Target className="h-3 w-3" />
                                        Fase de Activación
                                    </div>
                                    <h3 className="text-foreground mb-2 text-xl font-bold">Selección y Activación de Oportunidad</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Presentamos las oportunidades identificadas. Si decides avanzar con alguna, activamos due diligence
                                        completa y acompañamiento hasta cierre.
                                    </p>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="bg-secondary/5 rounded-lg p-4">
                                            <p className="mb-2 text-sm font-semibold">Qué incluye:</p>
                                            <ul className="space-y-1 text-sm">
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                                    <span>Due diligence exhaustiva</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                                    <span>Negociación con propietario</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                                    <span>Estructuración de acuerdo</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                                    <span>Acompañamiento hasta firma</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="border-secondary/30 bg-secondary/5 rounded-lg border-2 p-4">
                                            <p className="text-secondary-foreground mb-2 text-sm font-semibold">Fees por activación:</p>
                                            <p className="mb-2 text-sm">Varía según complejidad</p>
                                            <p className="text-muted-foreground text-xs">+ Success fee reducido 1-2% al cierre</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Comparison */}
            <section className="bg-muted/30 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">Comparativa de Modelos</h2>
                        <p className="text-muted-foreground text-lg">Elige el servicio que mejor se adapte a tu necesidad</p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
                        {/* Marketplace Standard */}
                        <div className="bg-background border-secondary/30 rounded-xl border-2 p-8">
                            <div className="mb-6 text-center">
                                <h3 className="text-foreground mb-2 text-2xl font-bold">Marketplace Estándar</h3>
                                <p className="text-muted-foreground text-sm">Terrenos de nuestra base de datos existente</p>
                            </div>
                            <div className="mb-6 text-center">
                                <div className="text-foreground mb-2 text-4xl font-bold">0€</div>
                                <p className="text-muted-foreground text-sm">Acceso sin coste</p>
                            </div>
                            <ul className="mb-6 space-y-3">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary mt-0.5 h-5 w-5 shrink-0" />
                                    <span className="text-sm">Acceso inmediato al pipeline</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary mt-0.5 h-5 w-5 shrink-0" />
                                    <span className="text-sm">Terrenos pre-validados disponibles</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary mt-0.5 h-5 w-5 shrink-0" />
                                    <span className="text-sm">Matching asistido</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary mt-0.5 h-5 w-5 shrink-0" />
                                    <span className="text-sm">Success fee: 4% (estándar) | 7-10% (complejas)</span>
                                </li>
                            </ul>
                            <Link href="/servicios/marketplace-terrenos-renovables" className="block">
                                <Button variant="outline" className="w-full">
                                    Ver marketplace
                                </Button>
                            </Link>
                        </div>

                        {/* Prospección Mandatada */}
                        <div className="border-secondary/30 from-secondary/10 to-secondary/5 rounded-xl border-2 bg-gradient-to-br p-8 shadow-xl">
                            <div className="mb-4 flex justify-center">
                                <span className="bg-secondary-foreground rounded-full px-3 py-1 text-xs font-semibold text-white">
                                    Premium
                                </span>
                            </div>
                            <div className="mb-6 text-center">
                                <h3 className="text-foreground mb-2 text-2xl font-bold">Prospección Mandatada</h3>
                                <p className="text-muted-foreground text-sm">Búsqueda personalizada fuera de BD</p>
                            </div>
                            <div className="mb-6 text-center">
                                <div className="text-foreground mb-2 text-4xl font-bold">900€</div>
                                <p className="text-muted-foreground text-sm">LOI + Fees por fase</p>
                            </div>
                            <ul className="mb-6 space-y-3">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-5 w-5 shrink-0" />
                                    <span className="text-sm">Búsqueda en zona específica</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-5 w-5 shrink-0" />
                                    <span className="text-sm">Criterios personalizados</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-5 w-5 shrink-0" />
                                    <span className="text-sm">Prospección intensiva activa</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-5 w-5 shrink-0" />
                                    <span className="text-sm">Success fee reducido: 1-2%</span>
                                </li>
                            </ul>
                            <Link href="/contacto" className="block">
                                <Button className="bg-secondary-foreground hover:bg-secondary/90 w-full">Solicitar prospección</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold">Preguntas Frecuentes</h2>
                    </div>

                    <div className="mx-auto max-w-3xl space-y-4">
                        <details className="bg-background group rounded-xl border-2 p-6">
                            <summary className="text-foreground cursor-pointer text-lg font-bold">
                                ¿Cuándo es mejor la prospección mandatada vs el marketplace estándar?
                            </summary>
                            <p className="text-muted-foreground mt-4 text-sm">
                                Usa marketplace estándar si tienes flexibilidad de zona y quieres acceso inmediato a oportunidades ya
                                validadas. Opta por prospección mandatada si necesitas zona específica (ej: nudo concreto con conexión
                                asegurada) o criterios muy particulares que requieren búsqueda activa fuera de nuestra BD.
                            </p>
                        </details>

                        <details className="bg-background group rounded-xl border-2 p-6">
                            <summary className="text-foreground cursor-pointer text-lg font-bold">
                                ¿El commitment fee de 900€ es reembolsable?
                            </summary>
                            <p className="text-muted-foreground mt-4 text-sm">
                                No es reembolsable si decides no continuar. Sin embargo, es 100% imputable a los fees finales si llegamos a
                                cierre. Cubre los costes de activación intensiva y el coste de oportunidad de dedicación exclusiva a tu
                                búsqueda.
                            </p>
                        </details>

                        <details className="bg-background group rounded-xl border-2 p-6">
                            <summary className="text-foreground cursor-pointer text-lg font-bold">
                                ¿Qué pasa si no encontráis terrenos en la zona?
                            </summary>
                            <p className="text-muted-foreground mt-4 text-sm">
                                Hacemos un análisis preliminar antes de aceptar el mandato. Si consideramos que la zona es muy complicada o
                                tiene probabilidad baja, te lo indicamos desde el principio. En prospección realizamos búsqueda intensiva,
                                pero no garantizamos resultado (por eso el success fee es reducido al 1-2%).
                            </p>
                        </details>

                        <details className="bg-background group rounded-xl border-2 p-6">
                            <summary className="text-foreground cursor-pointer text-lg font-bold">
                                ¿Por qué el success fee es más bajo que en marketplace estándar?
                            </summary>
                            <p className="text-muted-foreground mt-4 text-sm">
                                En prospección mandatada tú asumes más riesgo inicial (LOI + fees por fase) y defines criterios muy
                                ajustados, lo que reduce nuestra incertidumbre. El marketplace estándar requiere inversión previa en
                                curación masiva sin garantía de que encaje con algún promotor, por eso el success fee es mayor (4-10%).
                            </p>
                        </details>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="via-background from-secondary/10 to-secondary/10 bg-gradient-to-r py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">¿Necesitas prospección en zona específica?</h2>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Hablamos contigo para entender tus requisitos y evaluar la viabilidad de la búsqueda
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contacto">
                                <Button size="lg" className="bg-secondary-foreground hover:bg-secondary/90 gap-2">
                                    <Target className="h-5 w-5" />
                                    Solicitar prospección mandatada
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/registro/promotor">
                                <Button size="lg" variant="outline">
                                    O accede al marketplace estándar
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </StandardLayout>
    )
}
