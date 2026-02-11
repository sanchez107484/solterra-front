"use client"

import StandardLayout from "@/components/layouts/StandardLayout"
import { ServiceSchema } from "@/components/seo/ServiceSchema"
import ServiceInterlinks from "@/components/services/ServiceInterlinks"
import { FAQList } from "@/components/shared/faq-item"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, CheckCircle2, Clock, Filter, Handshake, Search, Shield, Sparkles, TrendingUp, Zap } from "lucide-react"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function MarketplaceRenovablesPage() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <StandardLayout>
            <Head>
                <title>Marketplace de Terrenos para Energía Solar y Eólica | Suelo Pre-Validado</title>
                <meta
                    name="description"
                    content="Accede a terrenos pre-validados para proyectos solares y eólicos en toda España. Sin coste de acceso, modelo success-based. Marketplace con validación técnica previa que conecta promotores con propietarios de suelo renovable."
                />
                <meta
                    name="keywords"
                    content="marketplace terrenos renovables, comprar terrenos energia solar, encontrar suelo fotovoltaico, terrenos placas solares españa, plataforma proyectos renovables, suelo pre-validado solar"
                />
                <link rel="canonical" href="https://solterra.es/servicios/marketplace-terrenos-renovables" />
            </Head>

            <ServiceSchema
                name="Marketplace de Terrenos para Energías Renovables"
                description="Plataforma tecnológica que conecta promotores con terrenos pre-validados para proyectos solares, eólicos y BESS. Validación técnica previa, matching asistido e intermediación profesional hasta el cierre. Sin coste de acceso, modelo 100% orientado a resultados."
                serviceType="Technology Platform and Real Estate Marketplace"
                areaServed="ES"
                offers={{
                    price: "0",
                    priceCurrency: "EUR",
                    description: "Sin coste de acceso. Modelo success-based: solo pagas cuando cierras un acuerdo.",
                }}
            />

            {/* Hero Section */}
            <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden py-12 md:py-16">
                <div className="from-secondary/10 via-background to-secondary/5 absolute inset-0 bg-gradient-to-br" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(209,154,18,0.15),transparent_50%)]" />

                <div className="relative container mx-auto px-4">
                    <div
                        className={`mx-auto max-w-5xl text-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                    >
                        <div className="mb-6 flex justify-center">
                            <div className="bg-secondary/10 border-secondary/20 text-secondary-foreground inline-flex items-center gap-2 rounded-full border-2 px-4 py-2">
                                <Building2 className="h-4 w-4" />
                                <span className="text-sm font-semibold">Para Promotores</span>
                            </div>
                        </div>

                        <h1 className="text-foreground mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                            Marketplace de Terrenos para <span className="text-secondary">Energía Solar y Eólica</span>
                        </h1>

                        <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-lg md:text-xl">
                            Accede a suelo pre-validado para proyectos renovables en toda España. Validación técnica previa, sin coste de
                            acceso. Solo pagas cuando cierras.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/registro/promotor">
                                <Button size="lg" className="bg-secondary hover:bg-secondary/90 gap-2 text-base">
                                    <Sparkles className="h-5 w-5" />
                                    Solicitar acceso al marketplace
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/contacto">
                                <Button size="lg" variant="outline" className="gap-2 text-base">
                                    Hablar con un experto
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Signals */}
                        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-secondary-foreground h-5 w-5" />
                                <span className="text-muted-foreground">Sin coste de acceso</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-secondary-foreground h-5 w-5" />
                                <span className="text-muted-foreground">Modelo 100% success-based</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-secondary-foreground h-5 w-5" />
                                <span className="text-muted-foreground">Validación técnica y legal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pain Points Section */}
            <section className="from-background to-muted/30 bg-gradient-to-b py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">¿Te suena familiar?</h2>
                        <p className="text-muted-foreground text-lg">Los problemas más comunes de promotores en prospección de suelo</p>
                    </div>

                    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
                        <div className="rounded-xl border-2 border-red-500/20 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-start gap-3">
                                <div className="shrink-0 rounded-full bg-red-500/10 p-2">
                                    <span className="text-xl font-bold text-red-500">✗</span>
                                </div>
                                <div>
                                    <h3 className="text-foreground mb-2 text-lg font-bold">80% del pipeline no sirve</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Recibes listas interminables de terrenos sin filtro técnico. La mayoría no cumplen requisitos
                                        mínimos.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border-2 border-red-500/20 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-start gap-3">
                                <div className="shrink-0 rounded-full bg-red-500/10 p-2">
                                    <span className="text-xl font-bold text-red-500">✗</span>
                                </div>
                                <div>
                                    <h3 className="text-foreground mb-2 text-lg font-bold">Tiempo perdido en inviables</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Tu equipo técnico dedica semanas a analizar suelo que debió descartarse desde el principio.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border-2 border-red-500/20 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-start gap-3">
                                <div className="shrink-0 rounded-full bg-red-500/10 p-2">
                                    <span className="text-xl font-bold text-red-500">✗</span>
                                </div>
                                <div>
                                    <h3 className="text-foreground mb-2 text-lg font-bold">Propietarios desordenados</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Documentación incompleta, expectativas irreales, múltiples ofertas simultáneas sin estructura.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border-2 border-red-500/20 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-start gap-3">
                                <div className="shrink-0 rounded-full bg-red-500/10 p-2">
                                    <span className="text-xl font-bold text-red-500">✗</span>
                                </div>
                                <div>
                                    <h3 className="text-foreground mb-2 text-lg font-bold">Brokers sin calidad</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Excel con datos de Google Maps, sin validación técnica, sin gestión de propietario.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section className="bg-muted/30 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">Nuestra solución: Validación + Tecnología</h2>
                        <p className="text-muted-foreground text-lg">
                            Marketplace con filtro técnico experto. Solo te mostramos oportunidades defendibles.
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
                        {/* Feature 1 */}
                        <div className="group border-secondary/20 hover:border-secondary/40 bg-background relative overflow-hidden rounded-xl border-2 p-8 shadow-lg transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-2xl">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <Filter className="text-secondary-foreground h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Validación técnica previa</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Análisis urbanístico, distancia a red, orografía, catastro. Solo activamos suelo con potencial real.
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Filtrado técnico exhaustivo</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Revisión legal preliminar</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Descarte de inviables</span>
                                </li>
                            </ul>
                            <div className="text-secondary-foreground mt-4 flex items-center gap-2 text-sm font-medium">
                                <Shield className="h-4 w-4" />
                                Calidad garantizada
                            </div>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Feature 2 */}
                        <div className="group border-secondary/20 hover:border-secondary/40 bg-background relative overflow-hidden rounded-xl border-2 p-8 shadow-lg transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-2xl">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <Search className="text-secondary-foreground h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Matching asistido</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Algoritmo que conecta tus criterios (tecnología, potencia, localización) con las oportunidades más
                                relevantes.
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Filtros personalizables</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Notificaciones automáticas</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Priorización inteligente</span>
                                </li>
                            </ul>
                            <div className="text-secondary-foreground mt-4 flex items-center gap-2 text-sm font-medium">
                                <Zap className="h-4 w-4" />
                                Ahorra tiempo
                            </div>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Feature 3 */}
                        <div className="group border-secondary/20 hover:border-secondary/40 bg-background relative overflow-hidden rounded-xl border-2 p-8 shadow-lg transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-2xl">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <Handshake className="text-secondary-foreground h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Acompañamiento al cierre</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Gestión activa de propietarios, negociación estructurada, documentación ordenada hasta la firma.
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Propietarios alineados</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Exclusividad temporal</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Soporte hasta firma</span>
                                </li>
                            </ul>
                            <div className="text-secondary-foreground mt-4 flex items-center gap-2 text-sm font-medium">
                                <TrendingUp className="h-4 w-4" />
                                Mayor éxito
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
            <section className="from-background to-muted/30 bg-gradient-to-b py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">Cómo Funciona</h2>
                        <p className="text-muted-foreground text-lg">De registro a cierre en 4 pasos</p>
                    </div>

                    <div className="mx-auto max-w-4xl space-y-6">
                        {/* Step 1 */}
                        <div className="group hover:border-secondary rounded-xl border-2 border-transparent bg-white p-6 shadow-sm transition-all hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary/10 shrink-0 rounded-xl p-3">
                                    <span className="text-secondary text-2xl font-bold">1</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-foreground mb-2 text-xl font-bold">Regístrate en la plataforma</h3>
                                    <p className="text-muted-foreground mb-3">
                                        Crea tu cuenta de promotor y configura tus criterios: tecnología, potencia objetivo, comunidades
                                        autónomas de interés.
                                    </p>
                                    <div className="bg-secondary/5 flex items-center gap-2 rounded-lg p-3 text-sm">
                                        <Clock className="text-secondary-foreground h-4 w-4" />
                                        <span>Tiempo estimado: 5 minutos | Sin coste</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="group hover:border-secondary rounded-xl border-2 border-transparent bg-white p-6 shadow-sm transition-all hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary/10 shrink-0 rounded-xl p-3">
                                    <span className="text-secondary text-2xl font-bold">2</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-foreground mb-2 text-xl font-bold">Accede al pipeline validado</h3>
                                    <p className="text-muted-foreground mb-3">
                                        Explora oportunidades pre-validadas con ficha técnica completa: ubicación, superficie, distancia a
                                        red, expectativa económica del propietario.
                                    </p>
                                    <div className="bg-secondary/5 flex items-center gap-2 rounded-lg p-3 text-sm">
                                        <TrendingUp className="text-secondary-foreground h-4 w-4" />
                                        <span>Pipeline actualizado semanalmente</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="group hover:border-secondary rounded-xl border-2 border-transparent bg-white p-6 shadow-sm transition-all hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary/10 shrink-0 rounded-xl p-3">
                                    <span className="text-secondary text-2xl font-bold">3</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-foreground mb-2 text-xl font-bold">Solicita exclusividad temporal</h3>
                                    <p className="text-muted-foreground mb-3">
                                        ¿Te interesa una oportunidad? Firma LOI con commitment fee (100% imputable al success fee) y trabaja
                                        en exclusiva durante 30 días.
                                    </p>
                                    <div className="bg-secondary/5 flex items-center gap-2 rounded-lg p-3 text-sm">
                                        <Shield className="text-secondary-foreground h-4 w-4" />
                                        <span>Commitment fee orientativo: 900€ (imputable)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="group hover:border-secondary rounded-xl border-2 border-transparent bg-white p-6 shadow-sm transition-all hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary/10 shrink-0 rounded-xl p-3">
                                    <span className="text-secondary text-2xl font-bold">4</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-foreground mb-2 text-xl font-bold">Cierra el acuerdo de terreno</h3>
                                    <p className="text-muted-foreground mb-3">
                                        Te acompañamos hasta la firma: gestión de propietario, negociación, documentación. Solo cobramos
                                        cuando se firma el contrato.
                                    </p>
                                    <div className="bg-secondary/5 flex items-center gap-2 rounded-lg p-3 text-sm">
                                        <Handshake className="text-secondary-foreground h-4 w-4" />
                                        <span>Modelo success-based: solo pagas si cierras</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="bg-white py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl">
                        <div className="from-secondary/10 to-secondary/5 border-secondary/30 rounded-2xl border-2 bg-gradient-to-br p-8 md:p-12">
                            <div className="mb-8 text-center">
                                <h2 className="text-foreground mb-4 text-3xl font-bold">Modelo 100% Orientado a Éxito</h2>
                                <p className="text-muted-foreground text-lg">Solo cobramos cuando tú cierras el acuerdo</p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="bg-background rounded-xl p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-secondary/20 rounded-full p-2">
                                            <Zap className="text-secondary-foreground h-5 w-5" />
                                        </div>
                                        <h3 className="text-foreground text-lg font-bold">Sin Coste de Acceso</h3>
                                    </div>
                                    <p className="text-muted-foreground mb-4 text-sm">Explora el marketplace sin pagar nada</p>
                                    <div className="mb-4">
                                        <span className="text-foreground text-4xl font-bold">0€</span>
                                        <span className="text-muted-foreground ml-2">para registrarte</span>
                                    </div>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                            <span>Acceso completo al marketplace</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                            <span>Fichas técnicas detalladas</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                            <span>Matching asistido</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-background rounded-xl p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-secondary/20 rounded-full p-2">
                                            <TrendingUp className="text-secondary-foreground h-5 w-5" />
                                        </div>
                                        <h3 className="text-foreground text-lg font-bold">Modelo Success-Based</h3>
                                    </div>
                                    <p className="text-muted-foreground mb-4 text-sm">Comisión solo cuando cierras</p>
                                    <div className="mb-4">
                                        <span className="text-foreground text-4xl font-bold">Solo éxito</span>
                                    </div>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                            <span>Validación técnica incluida</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                            <span>Intermediación profesional</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                            <span>Acompañamiento hasta firma</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-secondary/10 mt-6 rounded-xl p-4 text-center">
                                <p className="text-foreground text-sm font-semibold">
                                    💡 Nuestros intereses están 100% alineados con tu éxito. Solo ganamos si tú ganas.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Not a Traditional Broker */}
            <section className="from-background to-muted/30 bg-gradient-to-b py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">¿Por qué NO somos un broker tradicional?</h2>
                        <p className="text-muted-foreground text-lg">
                            La diferencia está en la validación previa, la tecnología y el acompañamiento
                        </p>
                    </div>

                    <div className="mx-auto max-w-5xl">
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Traditional Broker */}
                            <div className="rounded-xl border-2 border-red-500/30 bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="rounded-full bg-red-500/10 p-2">
                                        <span className="text-xl font-bold text-red-500">✗</span>
                                    </div>
                                    <h3 className="text-foreground text-xl font-bold">Broker Tradicional</h3>
                                </div>
                                <ul className="space-y-3 text-sm">
                                    <li className="text-muted-foreground">Excel con datos de Google Maps sin validar</li>
                                    <li className="text-muted-foreground">Pipeline inflado: 80% no sirve realmente</li>
                                    <li className="text-muted-foreground">Sin validación técnica previa</li>
                                    <li className="text-muted-foreground">Propietarios sin alinear (expectativas irreales)</li>
                                    <li className="text-muted-foreground">Te dan la lista y desaparecen</li>
                                    <li className="text-muted-foreground">Cobran por adelantado o exclusivas largas</li>
                                </ul>
                            </div>

                            {/* Solterra */}
                            <div className="rounded-xl border-2 border-green-500/30 bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="rounded-full bg-green-500/10 p-2">
                                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                                    </div>
                                    <h3 className="text-foreground text-xl font-bold">Marketplace Solterra</h3>
                                </div>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                        <span>Validación técnica y legal antes de publicar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                        <span>Pipeline de calidad: solo oportunidades defendibles</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                        <span>Análisis urbanístico, distancia a red, viabilidad</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                        <span>Propietarios gestionados y con expectativas realistas</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                        <span>Intermediación activa hasta el cierre</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="text-secondary-foreground mt-0.5 h-4 w-4 shrink-0" />
                                        <span>Sin coste hasta que cierres</span>
                                    </li>
                                </ul>
                            </div>
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
                                question: "¿Cuánto cuesta acceder al marketplace?",
                                answer: "El acceso al marketplace es 100% gratuito. Puedes registrarte, explorar terrenos disponibles y ver fichas técnicas completas sin pagar nada. Solo cobramos una comisión cuando cierres un acuerdo de arrendamiento o compraventa con el propietario. Nuestro modelo es success-based: tus intereses y los nuestros están alineados.",
                                category: "promotor",
                            },
                            {
                                question: "¿Los terrenos están en exclusiva?",
                                answer: "No. Los propietarios pueden estar en contacto con varios promotores simultáneamente. Cuando manifiestas interés serio en una oportunidad, puedes solicitar exclusividad temporal (normalmente 30 días) firmando LOI con commitment fee. Esto incentiva la agilidad y seriedad en las negociaciones.",
                                category: "promotor",
                            },
                            {
                                question: "¿Qué incluye la validación técnica previa?",
                                answer: "Antes de publicar cualquier terreno en el marketplace, realizamos: análisis urbanístico (clasificación del suelo, compatibilidad de usos), distancia a puntos de conexión eléctrica, orografía y accesos, revisión catastral, identificación de zonas protegidas, y viabilidad económica preliminar. Solo activamos terrenos con potencial real.",
                                category: "promotor",
                            },
                            {
                                question: "¿Cómo funciona la intermediación?",
                                answer: "Actuamos como intermediario profesional entre promotor y propietario. Gestionamos toda la comunicación, coordinamos visitas al terreno, facilitamos la negociación con criterios de mercado, preparamos documentación necesaria, y acompañamos hasta la firma del contrato. No es un simple marketplace de anuncios: hay gestión activa.",
                                category: "promotor",
                            },
                            {
                                question: "¿Qué es el commitment fee y para qué sirve?",
                                answer: "Cuando quieres trabajar en exclusiva temporal sobre una oportunidad específica, firmas una LOI (Letter of Intent) con un commitment fee (normalmente 900€). Este fee demuestra seriedad de tu parte y es 100% imputable a la comisión final si cierras el acuerdo. Si no cierras durante el periodo de exclusividad, no se devuelve, pero protege tu inversión en due diligence.",
                                category: "promotor",
                            },
                            {
                                question: "¿Cuánto tiempo toma cerrar un acuerdo de terreno?",
                                answer: "Depende de la complejidad: operaciones simples (1 propietario, documentación clara) pueden cerrarse en 4-8 semanas. Operaciones complejas (múltiples propietarios, problemas registrales, negociación difícil) pueden tardar 3-6 meses. El marketplace te da acceso inmediato, pero el cierre depende de due diligence, negociación y gestión legal.",
                                category: "promotor",
                            },
                        ]}
                    />
                </div>
            </section>

            {/* Otros Servicios - Interlinking */}
            <ServiceInterlinks
                currentService="marketplace"
                title="Otros Servicios"
                subtitle="Explora nuestras soluciones complementarias para desarrolladores de proyectos renovables"
                background="white"
            />

            {/* CTA Final */}
            <section className="from-secondary/10 via-background to-secondary/10 bg-gradient-to-r py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">¿Listo para acceder al pipeline curado?</h2>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Regístrate sin coste y empieza a explorar oportunidades de suelo pre-validado
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/registro/promotor">
                                <Button size="lg" className="bg-secondary hover:bg-secondary/90 gap-2">
                                    <Building2 className="h-5 w-5" />
                                    Solicitar acceso ahora
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/contacto">
                                <Button size="lg" variant="outline">
                                    Hablar con el equipo
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </StandardLayout>
    )
}
