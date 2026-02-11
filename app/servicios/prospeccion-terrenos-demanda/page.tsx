"use client"

import StandardLayout from "@/components/layouts/StandardLayout"
import { ServiceSchema } from "@/components/seo/ServiceSchema"
import { FAQList } from "@/components/shared/faq-item"
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
                <title>Búsqueda Personalizada de Terrenos para Energía Solar | Servicio Premium</title>
                <meta
                    name="description"
                    content="Servicio premium de búsqueda personalizada de terrenos para proyectos renovables. Prospección intensiva en zona específica con criterios a medida. Ideal para promotores con punto de conexión asegurado o necesidades muy concretas. Solicita propuesta personalizada."
                />
                <meta
                    name="keywords"
                    content="buscar terrenos proyectos solares, prospeccion suelo renovables, encontrar terreno especifico energia solar, sourcing terrenos demanda, busqueda personalizada suelo fotovoltaico"
                />
                <link rel="canonical" href="https://solterra.es/servicios/prospeccion-terrenos-demanda" />
            </Head>

            <ServiceSchema
                name="Búsqueda Personalizada de Terrenos para Proyectos Renovables"
                description="Servicio premium de prospección intensiva en zona específica para proyectos solares, eólicos y BESS. Búsqueda personalizada fuera de nuestra base de datos con criterios a medida. Ideal para promotores con punto de conexión asegurado, requisitos muy específicos, o necesidad de confidencialidad crítica."
                serviceType="Land Sourcing and Prospection Service"
                areaServed="ES"
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
                            Búsqueda <span className="text-secondary-foreground">Personalizada</span> de Terrenos
                        </h1>

                        <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-lg md:text-xl">
                            ¿Necesitas suelo en una zona específica que no está en nuestro marketplace? Activamos prospección intensiva con
                            criterios a medida. Servicio premium para promotores con requisitos muy concretos.
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
                                <span className="text-muted-foreground">Servicio por fases</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-secondary-foreground h-5 w-5" />
                                <span className="text-muted-foreground">Success fee reducido</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* When to Use Section */}
            <section className="from-background to-muted/30 bg-gradient-to-b py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">¿Cuándo Solicitar Prospección Mandatada?</h2>
                        <p className="text-muted-foreground text-lg">Este servicio es ideal para casos específicos de búsqueda avanzada</p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="group border-secondary/20 hover:border-secondary/40 bg-background relative overflow-hidden rounded-xl border-2 p-8 shadow-lg transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-2xl">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <MapPin className="text-secondary-foreground h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Zona Estratégica Específica</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Necesitas suelo en un nudo concreto o área sin presencia en nuestro marketplace. Prospección intensiva en
                                zona objetivo.
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Búsqueda en área específica</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Punto de conexión definido</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Prospección intensiva</span>
                                </li>
                            </ul>
                            <div className="text-secondary-foreground mt-4 flex items-center gap-2 text-sm font-medium">
                                <MapPin className="h-4 w-4" />
                                Ubicación precisa
                            </div>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        <div className="group border-secondary/20 hover:border-secondary/40 bg-background relative overflow-hidden rounded-xl border-2 p-8 shadow-lg transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-2xl">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <Zap className="text-secondary-foreground h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Requisitos Muy Específicos</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Criterios técnicos muy concretos: potencia mínima, distancia máxima a SET, orografía específica.
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Potencia objetivo definida</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Distancia máxima a SET</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Características específicas</span>
                                </li>
                            </ul>
                            <div className="text-secondary-foreground mt-4 flex items-center gap-2 text-sm font-medium">
                                <Zap className="h-4 w-4" />A medida
                            </div>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        <div className="group border-secondary/20 hover:border-secondary/40 bg-background relative overflow-hidden rounded-xl border-2 p-8 shadow-lg transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-2xl">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <Target className="text-secondary-foreground h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Proyecto en Fase Avanzada</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Ya tienes punto de conexión asegurado o autorización administrativa previa. Necesitas suelo urgente.
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Conexión asegurada</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Autorización en marcha</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Búsqueda prioritaria</span>
                                </li>
                            </ul>
                            <div className="text-secondary-foreground mt-4 flex items-center gap-2 text-sm font-medium">
                                <Target className="h-4 w-4" />
                                Alta urgencia
                            </div>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        <div className="group border-secondary/20 hover:border-secondary/40 bg-background relative overflow-hidden rounded-xl border-2 p-8 shadow-lg transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-2xl">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <Users className="text-secondary-foreground h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Pack Multi-Propietario</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Necesitas agregar múltiples terrenos contiguos en área definida para alcanzar potencia objetivo.
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Terrenos contiguos</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Agregación de superficies</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Gestión múltiple</span>
                                </li>
                            </ul>
                            <div className="text-secondary-foreground mt-4 flex items-center gap-2 text-sm font-medium">
                                <Users className="h-4 w-4" />
                                Proyecto complejo
                            </div>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        <div className="group border-secondary/20 hover:border-secondary/40 bg-background relative overflow-hidden rounded-xl border-2 p-8 shadow-lg transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-2xl">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <TrendingUp className="text-secondary-foreground h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Ampliación de Proyecto</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Ya tienes un proyecto en marcha y quieres ampliar potencia. Buscamos suelo adicional cercano compatible.
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Proyecto existente</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Suelo cercano</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Ampliación de potencia</span>
                                </li>
                            </ul>
                            <div className="text-secondary-foreground mt-4 flex items-center gap-2 text-sm font-medium">
                                <TrendingUp className="h-4 w-4" />
                                Escalabilidad
                            </div>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        <div className="group border-secondary/20 hover:border-secondary/40 bg-background relative overflow-hidden rounded-xl border-2 p-8 shadow-lg transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-2xl">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <Shield className="text-secondary-foreground h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Confidencialidad Crítica</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Requieres discreción absoluta por estrategia competitiva o posición de mercado. Prospección con NDA
                                reforzado.
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Máxima discreción</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>NDA reforzado</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Estrategia protegida</span>
                                </li>
                            </ul>
                            <div className="text-secondary-foreground mt-4 flex items-center gap-2 text-sm font-medium">
                                <Shield className="h-4 w-4" />
                                Total confidencialidad
                            </div>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="bg-muted/30 py-16 md:py-24">
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
                                            <p className="text-xl font-bold">Consultar</p>
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
                                    <h3 className="text-foreground mb-2 text-xl font-bold">Búsqueda Intensiva y Validación</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Prospección activa en la zona: identificación de parcelas, contacto con propietarios, validación
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
            <section className="from-background to-muted/30 bg-gradient-to-b py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">Comparativa de Modelos</h2>
                        <p className="text-muted-foreground text-lg">Elige el servicio que mejor se adapte a tu necesidad</p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
                        {/* Marketplace Standard */}
                        <div className="border-secondary/30 rounded-xl border-2 bg-white p-8 shadow-sm">
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
                                    <span className="text-sm">Modelo success-based</span>
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
                                <div className="text-foreground mb-2 text-3xl font-bold">Consultar</div>
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
                                    <span className="text-sm">Success fee reducido</span>
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
            <section className="bg-muted/30 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <FAQList
                        title="Preguntas frecuentes"
                        categoryLabels={{ promotor: "Promotor" }}
                        faqs={[
                            {
                                question: "¿Cuándo es mejor la prospección personalizada vs el marketplace estándar?",
                                answer: "Usa marketplace estándar si tienes flexibilidad de zona y quieres acceso inmediato a oportunidades ya validadas. Opta por prospección personalizada si necesitas zona específica (ej: nudo concreto con conexión asegurada), criterios muy particulares (potencia mínima, distancia máxima a SET, tipo de propiedad), o confidencialidad crítica. La prospección requiere inversión inicial, pero te garantiza búsqueda dedicada.",
                                category: "promotor",
                            },
                            {
                                question: "¿Cuánto cuesta el servicio de prospección personalizada?",
                                answer: "El modelo es por fases: LOI inicial (commitment fee), fees por fase de prospección según complejidad de la zona, y success fee reducido (1-2%) si llegamos a cierre. El commitment fee y fees de fase son 100% imputables al success fee final. Te damos propuesta personalizada tras evaluar tu briefing técnico.",
                                category: "promotor",
                            },
                            {
                                question: "¿El commitment fee es reembolsable?",
                                answer: "No es reembolsable si decides no continuar. Sin embargo, es 100% imputable a los fees finales si llegamos a cierre. Cubre los costes de activación intensiva: workshop de definición, análisis preliminar de zona, y plan de prospección. Demuestra compromiso serio de ambas partes y protege tu inversión en due diligence posterior.",
                                category: "promotor",
                            },
                            {
                                question: "¿Qué pasa si no encontráis terrenos en la zona solicitada?",
                                answer: "Hacemos un análisis preliminar antes de aceptar el mandato. Si consideramos que la zona es muy complicada o tiene probabilidad baja de éxito, te lo indicamos desde el principio y te sugerimos alternativas. En prospección realizamos búsqueda intensiva (contacto directo con propietarios, revisión catastral exhaustiva), pero no garantizamos resultado - por eso el success fee es reducido al 1-2% vs 4-10% del marketplace estándar.",
                                category: "promotor",
                            },
                            {
                                question: "¿Por qué el success fee es más bajo que en marketplace estándar?",
                                answer: "En prospección personalizada tú asumes más riesgo inicial (LOI + fees por fase) y defines criterios muy ajustados, lo que reduce nuestra incertidumbre y esfuerzo de matching. El marketplace estándar requiere inversión previa masiva en curación sin garantía de encaje con promotores, por eso el success fee es mayor (4-10%). Aquí tú pagas el sourcing activo, nosotros cobramos menos en el cierre.",
                                category: "promotor",
                            },
                            {
                                question: "¿Cuánto tiempo toma una prospección personalizada?",
                                answer: "Fase 1 (Briefing y LOI): 1-2 semanas. Fase 2 (Prospección intensiva): 4-8 semanas según complejidad de la zona y criterios. Fase 3 (Due diligence y cierre): 6-12 semanas si activas una oportunidad. Total desde inicio hasta cierre: normalmente 3-5 meses. Es más lento que marketplace estándar, pero diseñado para casos donde el terreno correcto no existe en bases de datos públicas.",
                                category: "promotor",
                            },
                        ]}
                    />
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
