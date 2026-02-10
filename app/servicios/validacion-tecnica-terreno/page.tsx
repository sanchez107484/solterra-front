"use client"

import StandardLayout from "@/components/layouts/StandardLayout"
import { ServiceSchema } from "@/components/seo/ServiceSchema"
import { Button } from "@/components/ui/button"
import {
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    Clock,
    FileSearch,
    Landmark,
    MapPin,
    Shield,
    Sparkles,
    TrendingUp,
    Users,
    Zap,
} from "lucide-react"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ValidacionTecnicaTerrenoPage() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <StandardLayout>
            <Head>
                <title>Validación Técnica de Terrenos Renovables | Evaluación Gratuita Solar y Eólica</title>
                <meta
                    name="description"
                    content="Validación técnica gratuita de terrenos para proyectos de energía solar y eólica. Descubre si tu terreno es viable para renovables en 48-72h."
                />
                <meta
                    name="keywords"
                    content="validacion tecnica terreno solar, evaluar terreno fotovoltaico, mi terreno sirve placas solares, valorar suelo renovables, terreno viable energia solar"
                />
                <link rel="canonical" href="https://solterra.es/servicios/validacion-tecnica-terreno" />
            </Head>

            <ServiceSchema
                name="Validación Técnica de Terrenos para Proyectos de Energías Renovables"
                description="Servicio gratuito de validación técnica y curación de terrenos para proyectos solares, eólicos y BESS. Análisis urbanístico, catastral y de viabilidad técnica."
                serviceType="Technical Validation and Land Assessment"
                areaServed="ES"
                offers={{
                    price: "0",
                    priceCurrency: "EUR",
                    description: "Validación técnica 100% gratuita hasta que se cierra un acuerdo con promotor",
                }}
            />

            {/* Hero Section */}
            <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden py-12 md:py-16">
                <div className="from-primary/10 via-background to-primary/5 absolute inset-0 bg-gradient-to-br" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(89,165,44,0.15),transparent_50%)]" />

                <div className="relative container mx-auto px-4">
                    <div
                        className={`mx-auto max-w-5xl text-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                    >
                        <div className="mb-6 flex justify-center">
                            <div className="bg-primary/10 border-primary/20 text-primary inline-flex items-center gap-2 rounded-full border-2 px-4 py-2">
                                <Landmark className="h-4 w-4" />
                                <span className="text-sm font-semibold">Para Propietarios</span>
                            </div>
                        </div>

                        <h1 className="text-foreground mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                            ¿Tu Terreno Sirve para <span className="text-primary">Energía Renovable</span>?
                        </h1>

                        <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-lg md:text-xl">
                            Validación técnica gratuita en 48-72h. Descubre si tu terreno es viable para proyectos solares, eólicos o BESS
                            sin coste ni compromiso.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contacto">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2 text-base">
                                    <Sparkles className="h-5 w-5" />
                                    Validar mi terreno gratis
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/registro/propietario">
                                <Button size="lg" variant="outline" className="gap-2 text-base">
                                    Crear cuenta propietario
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Signals */}
                        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary h-5 w-5" />
                                <span className="text-muted-foreground">100% gratuito</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary h-5 w-5" />
                                <span className="text-muted-foreground">Sin compromiso</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary h-5 w-5" />
                                <span className="text-muted-foreground">Respuesta en 48-72h</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Common Doubts Section */}
            <section className="bg-muted/30 py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
                            ¿Te Identificas con Alguna de Estas Situaciones?
                        </h2>
                        <p className="text-muted-foreground text-lg">Las dudas más comunes de propietarios de terreno rústico</p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-background rounded-xl border-2 border-amber-500/20 p-6">
                            <div className="mb-4 flex items-start gap-3">
                                <AlertCircle className="mt-1 h-6 w-6 shrink-0 text-amber-600" />
                                <div>
                                    <h3 className="text-foreground mb-2 text-lg font-bold">No sé si mi suelo vale</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Tienes terreno rústico y te preguntas si podría servir para energía solar o eólica, pero no sabes
                                        por dónde empezar.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-background rounded-xl border-2 border-amber-500/20 p-6">
                            <div className="mb-4 flex items-start gap-3">
                                <AlertCircle className="mt-1 h-6 w-6 shrink-0 text-amber-600" />
                                <div>
                                    <h3 className="text-foreground mb-2 text-lg font-bold">Me llaman brokers constantemente</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Recibes llamadas de intermediarios con ofertas que no entiendes bien y no sabes si son fiables.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-background rounded-xl border-2 border-amber-500/20 p-6">
                            <div className="mb-4 flex items-start gap-3">
                                <AlertCircle className="mt-1 h-6 w-6 shrink-0 text-amber-600" />
                                <div>
                                    <h3 className="text-foreground mb-2 text-lg font-bold">Me prometen cifras irreales</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Te dan valoraciones muy optimistas sin haber visto el terreno ni analizado su viabilidad técnica.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-background rounded-xl border-2 border-amber-500/20 p-6">
                            <div className="mb-4 flex items-start gap-3">
                                <AlertCircle className="mt-1 h-6 w-6 shrink-0 text-amber-600" />
                                <div>
                                    <h3 className="text-foreground mb-2 text-lg font-bold">Firmé algo y no sé qué</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Firmaste un papel con cláusulas que no entiendes bien y ahora tienes dudas sobre lo que pactaste.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-background rounded-xl border-2 border-amber-500/20 p-6">
                            <div className="mb-4 flex items-start gap-3">
                                <AlertCircle className="mt-1 h-6 w-6 shrink-0 text-amber-600" />
                                <div>
                                    <h3 className="text-foreground mb-2 text-lg font-bold">Miedo a perder valor</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Temes equivocarte y aceptar una oferta muy por debajo del valor real o con condiciones abusivas.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-background rounded-xl border-2 border-amber-500/20 p-6">
                            <div className="mb-4 flex items-start gap-3">
                                <AlertCircle className="mt-1 h-6 w-6 shrink-0 text-amber-600" />
                                <div>
                                    <h3 className="text-foreground mb-2 text-lg font-bold">No quiero problemas legales</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Te preocupa la parte jurídica: qué documentos necesitas, si el terreno está limpio, restricciones.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Analyze Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">Qué Analizamos en la Validación</h2>
                        <p className="text-muted-foreground text-lg">Curación técnica exhaustiva para determinar viabilidad real</p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Analysis 1 */}
                        <div className="group border-primary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-6 shadow-sm transition-transform duration-200 ease-out hover:scale-[1.03] sm:p-8">
                            <div className="bg-primary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-2 sm:p-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/0">
                                    <MapPin className="text-primary h-5 w-5 transition-transform group-hover:scale-110" />
                                </div>
                                <h3 className="text-foreground m-0 text-base leading-tight font-semibold">Ubicación y Accesos</h3>
                            </div>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Distancia a puntos de conexión</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Accesibilidad del terreno</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Orografía y pendientes</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Zonas restringidas cercanas</span>
                                </li>
                            </ul>
                            <div
                                className="bg-primary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Analysis 2 */}
                        <div className="group border-primary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-6 shadow-sm transition-transform duration-200 ease-out hover:scale-[1.03] sm:p-8">
                            <div className="bg-primary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-2 sm:p-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/0">
                                    <FileSearch className="text-primary h-5 w-5 transition-transform group-hover:scale-110" />
                                </div>
                                <h3 className="text-foreground m-0 text-base leading-tight font-semibold">Análisis Urbanístico</h3>
                            </div>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Clasificación del suelo</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Compatibilidad de usos</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Restricciones municipales</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Espacios protegidos</span>
                                </li>
                            </ul>
                            <div
                                className="bg-primary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Analysis 3 */}
                        <div className="group border-primary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-6 shadow-sm transition-transform duration-200 ease-out hover:scale-[1.03] sm:p-8">
                            <div className="bg-primary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-2 sm:p-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/0">
                                    <Landmark className="text-primary h-5 w-5 transition-transform group-hover:scale-110" />
                                </div>
                                <h3 className="text-foreground m-0 text-base leading-tight font-semibold">Datos Catastrales</h3>
                            </div>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Referencias catastrales</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Superficie real disponible</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Titularidad preliminar</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Cargas visibles</span>
                                </li>
                            </ul>
                            <div
                                className="bg-primary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Analysis 4 */}
                        <div className="group border-primary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-6 shadow-sm transition-transform duration-200 ease-out hover:scale-[1.03] sm:p-8">
                            <div className="bg-primary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-2 sm:p-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/0">
                                    <Zap className="text-primary h-5 w-5 transition-transform group-hover:scale-110" />
                                </div>
                                <h3 className="text-foreground m-0 text-base leading-tight font-semibold">Potencial Energético</h3>
                            </div>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Irradiación solar (si aplica)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Recurso eólico (si aplica)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Potencia instalable estimada</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Tecnología óptima</span>
                                </li>
                            </ul>
                            <div
                                className="bg-primary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Analysis 5 */}
                        <div className="group border-primary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-6 shadow-sm transition-transform duration-200 ease-out hover:scale-[1.03] sm:p-8">
                            <div className="bg-primary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-2 sm:p-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/0">
                                    <TrendingUp className="text-primary h-5 w-5 transition-transform group-hover:scale-110" />
                                </div>
                                <h3 className="text-foreground m-0 text-base leading-tight font-semibold">Viabilidad Económica</h3>
                            </div>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Rango de valoración orientativa</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Comparativa de mercado</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Modalidades posibles (arrendamiento/venta)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Atractivo para promotores</span>
                                </li>
                            </ul>
                            <div
                                className="bg-primary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Analysis 6 */}
                        <div className="group border-primary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-6 shadow-sm transition-transform duration-200 ease-out hover:scale-[1.03] sm:p-8">
                            <div className="bg-primary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-2 sm:p-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/0">
                                    <Shield className="text-primary h-5 w-5 transition-transform group-hover:scale-110" />
                                </div>
                                <h3 className="text-foreground m-0 text-base leading-tight font-semibold">Factores de Descarte</h3>
                            </div>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Impedimentos técnicos graves</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Restricciones ambientales</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Incompatibilidad urbanística</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Inviabilidad económica clara</span>
                                </li>
                            </ul>
                            <div
                                className="bg-primary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
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
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">Cómo Funciona</h2>
                        <p className="text-muted-foreground text-lg">De solicitud a informe en 3 pasos simples</p>
                    </div>

                    <div className="mx-auto max-w-4xl space-y-6">
                        {/* Step 1 */}
                        <div className="bg-background group hover:border-primary rounded-xl border-2 border-transparent p-6 transition-all hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 shrink-0 rounded-xl p-3">
                                    <span className="text-primary text-2xl font-bold">1</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-foreground mb-2 text-xl font-bold">Solicita la validación</h3>
                                    <p className="text-muted-foreground mb-3">
                                        Rellena el formulario con datos básicos de tu terreno: ubicación (municipio o referencia catastral),
                                        superficie aproximada, y tus datos de contacto.
                                    </p>
                                    <div className="bg-primary/5 flex items-center gap-2 rounded-lg p-3 text-sm">
                                        <Clock className="text-primary h-4 w-4" />
                                        <span>Tiempo: 3-5 minutos | 100% gratuito</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-background group hover:border-primary rounded-xl border-2 border-transparent p-6 transition-all hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 shrink-0 rounded-xl p-3">
                                    <span className="text-primary text-2xl font-bold">2</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-foreground mb-2 text-xl font-bold">Analizamos tu terreno</h3>
                                    <p className="text-muted-foreground mb-3">
                                        Nuestro equipo técnico realiza la curación: análisis urbanístico, catastral, distancia a red,
                                        orografía, y potencial energético. Sin moverte de casa.
                                    </p>
                                    <div className="bg-primary/5 flex items-center gap-2 rounded-lg p-3 text-sm">
                                        <FileSearch className="text-primary h-4 w-4" />
                                        <span>Análisis exhaustivo en 48-72h hábiles</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-background group hover:border-primary rounded-xl border-2 border-transparent p-6 transition-all hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 shrink-0 rounded-xl p-3">
                                    <span className="text-primary text-2xl font-bold">3</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-foreground mb-2 text-xl font-bold">Recibes el informe</h3>
                                    <p className="text-muted-foreground mb-3">
                                        Te enviamos el informe de validación: si es viable, te explicamos potencial y próximos pasos. Si no
                                        es viable, te explicamos por qué de forma clara y honesta.
                                    </p>
                                    <div className="bg-primary/5 flex items-center gap-2 rounded-lg p-3 text-sm">
                                        <CheckCircle2 className="text-primary h-4 w-4" />
                                        <span>Informe claro sin tecnicismos complejos</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/contacto">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                                <Sparkles className="h-5 w-5" />
                                Validar mi terreno ahora
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">Posibles Resultados de la Validación</h2>
                        <p className="text-muted-foreground text-lg">Qué puedes esperar según el análisis de tu terreno</p>
                    </div>

                    <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
                        {/* Result 1 - Viable */}
                        <div className="bg-background rounded-xl border-2 border-green-500/30 p-6">
                            <div className="mb-4 inline-flex rounded-full bg-green-500/10 p-3">
                                <CheckCircle2 className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Terreno Viable</h3>
                            <p className="text-muted-foreground mb-4 text-sm">
                                Tu terreno cumple los criterios técnicos y urbanísticos. Tiene potencial real para proyecto renovable.
                            </p>
                            <div className="rounded-lg bg-green-500/5 p-4">
                                <p className="mb-2 text-sm font-semibold">Próximos pasos:</p>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <ArrowRight className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                        <span>Activamos en marketplace</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ArrowRight className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                        <span>Matching con promotores</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ArrowRight className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                        <span>Te acompañamos al cierre</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Result 2 - Condicionado */}
                        <div className="bg-background rounded-xl border-2 border-amber-500/30 p-6">
                            <div className="mb-4 inline-flex rounded-full bg-amber-500/10 p-3">
                                <AlertCircle className="h-8 w-8 text-amber-600" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Viable con Condiciones</h3>
                            <p className="text-muted-foreground mb-4 text-sm">
                                El terreno puede funcionar si se resuelven ciertos aspectos: documentación, servidumbres, gestión conjunta
                                con vecinos, etc.
                            </p>
                            <div className="rounded-lg bg-amber-500/5 p-4">
                                <p className="mb-2 text-sm font-semibold">Próximos pasos:</p>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <ArrowRight className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                        <span>Identificamos obstáculos</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ArrowRight className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                        <span>Plan de estructuración</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ArrowRight className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                        <span>Apoyo en resolución</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Result 3 - No Viable */}
                        <div className="bg-background rounded-xl border-2 border-red-500/30 p-6">
                            <div className="mb-4 inline-flex rounded-full bg-red-500/10 p-3">
                                <AlertCircle className="h-8 w-8 text-red-600" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Terreno No Viable</h3>
                            <p className="text-muted-foreground mb-4 text-sm">
                                El terreno tiene impedimentos graves: muy lejos de red, zona protegida, incompatibilidad urbanística, o
                                inviabilidad económica.
                            </p>
                            <div className="rounded-lg bg-red-500/5 p-4">
                                <p className="mb-2 text-sm font-semibold">Qué hacemos:</p>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <ArrowRight className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                        <span>Explicación clara del motivo</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ArrowRight className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                        <span>Honestidad total</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ArrowRight className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                        <span>Sin falsas expectativas</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Trust Us Section */}
            <section className="bg-muted/30 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">¿Por Qué Confiar en Nuestra Validación?</h2>
                    </div>

                    <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
                        <div className="bg-background rounded-xl border-2 p-6">
                            <div className="mb-4 flex items-start gap-3">
                                <div className="bg-primary/10 shrink-0 rounded-full p-2">
                                    <Shield className="text-primary h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-foreground mb-2 text-lg font-bold">Intereses alineados</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Solo ganamos si tú cierras un acuerdo. No tenemos incentivo para darte falsas esperanzas. Si tu
                                        terreno no vale, te lo decimos.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-background rounded-xl border-2 p-6">
                            <div className="mb-4 flex items-start gap-3">
                                <div className="bg-primary/10 shrink-0 rounded-full p-2">
                                    <Users className="text-primary h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-foreground mb-2 text-lg font-bold">Equipo técnico experto</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Ingenieros y técnicos con experiencia en desarrollo renovable. Conocemos qué buscan los promotores
                                        porque trabajamos con ellos.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-background rounded-xl border-2 p-6">
                            <div className="mb-4 flex items-start gap-3">
                                <div className="bg-primary/10 shrink-0 rounded-full p-2">
                                    <CheckCircle2 className="text-primary h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-foreground mb-2 text-lg font-bold">Sin exclusivas opacas</h3>
                                    <p className="text-muted-foreground text-sm">
                                        La validación no te ata a nada. No hay exclusivas automáticas ni cláusulas ocultas. Tú decides
                                        siempre.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-background rounded-xl border-2 p-6">
                            <div className="mb-4 flex items-start gap-3">
                                <div className="bg-primary/10 shrink-0 rounded-full p-2">
                                    <TrendingUp className="text-primary h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-foreground mb-2 text-lg font-bold">Transparencia total</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Te explicamos el análisis con lenguaje claro, sin tecnicismos innecesarios. Informe visual y
                                        comprensible.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="from-primary/10 via-background to-primary/10 bg-gradient-to-r py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
                            ¿Listo para Descubrir el Potencial de tu Terreno?
                        </h2>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Validación técnica 100% gratuita, sin compromiso. Respuesta en 48-72h.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contacto">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                                    <Sparkles className="h-5 w-5" />
                                    Solicitar validación gratuita
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/registro/propietario">
                                <Button size="lg" variant="outline">
                                    Crear cuenta propietario
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </StandardLayout>
    )
}
