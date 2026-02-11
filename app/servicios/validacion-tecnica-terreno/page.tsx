"use client"

import StandardLayout from "@/components/layouts/StandardLayout"
import { ServiceSchema } from "@/components/seo/ServiceSchema"
import { FAQList } from "@/components/shared/faq-item"
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
                <title>¿Cuánto Vale tu Terreno para Placas Solares? | Evaluación 100% Gratuita</title>
                <meta
                    name="description"
                    content="Descubre GRATIS si tu terreno sirve para energía solar o eólica. Análisis técnico completo sin coste ni compromiso. Te decimos cuánto puedes ganar por arrendarlo o venderlo para proyectos renovables."
                />
                <meta
                    name="keywords"
                    content="cuanto pagan por arrendar terreno placas solares, como saber si mi terreno vale energia solar, evaluar terreno fotovoltaico gratis, cuanto vale mi terreno renovables, arrendar suelo placas solares precio"
                />
                <link rel="canonical" href="https://solterra.es/servicios/validacion-tecnica-terreno" />
            </Head>

            <ServiceSchema
                name="Validación Técnica de Terrenos para Proyectos de Energías Renovables"
                description="Servicio gratuito de validación técnica y curación de terrenos para proyectos solares, eólicos y BESS. Descubre si tu terreno es viable y cuánto puedes ganar por arrendarlo o venderlo. Análisis urbanístico, catastral y de viabilidad técnica sin coste ni compromiso."
                serviceType="Technical Validation and Land Assessment"
                areaServed="ES"
                offers={{
                    price: "0",
                    priceCurrency: "EUR",
                    description: "Validación técnica 100% gratuita sin compromiso. Solo cobras si decides cerrar un acuerdo.",
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
                        <div className="mb-6 flex flex-wrap justify-center gap-3">
                            <div className="bg-primary/10 border-primary/20 text-primary inline-flex items-center gap-2 rounded-full border-2 px-4 py-2">
                                <Landmark className="h-4 w-4" />
                                <span className="text-sm font-semibold">Para Propietarios</span>
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full border-2 border-green-500/30 bg-green-500/10 px-5 py-2 text-green-700">
                                <Sparkles className="h-5 w-5" />
                                <span className="text-base font-bold">100% GRATIS</span>
                            </div>
                        </div>

                        <h1 className="text-foreground mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                            Regístrate y Publica tu Terreno <span className="text-primary">GRATIS</span>
                        </h1>

                        <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-lg md:text-xl">
                            ¿Tienes un terreno para energía solar o eólica? Regístrate como propietario y publica tu terreno. Nosotros
                            hacemos la validación técnica antes de que aparezca en el marketplace. 100% gratuito.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/registro/propietario">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2 text-base">
                                    <Sparkles className="h-5 w-5" />
                                    Regístrate como propietario
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/contacto">
                                <Button size="lg" variant="outline" className="gap-2 text-base">
                                    Hablar con el equipo
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Signals */}
                        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary h-5 w-5" />
                                <span className="text-muted-foreground font-semibold">100% gratuito</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary h-5 w-5" />
                                <span className="text-muted-foreground font-semibold">Sin compromiso</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary h-5 w-5" />
                                <span className="text-muted-foreground font-semibold">Respuesta rápida</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Common Doubts Section */}
            <section className="from-background to-muted/30 bg-gradient-to-b py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
                            ¿Te Identificas con Alguna de Estas Situaciones?
                        </h2>
                        <p className="text-muted-foreground text-lg">Las dudas más comunes de propietarios de terreno rústico</p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-xl border-2 border-amber-500/20 bg-white p-6 shadow-sm">
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

                        <div className="rounded-xl border-2 border-amber-500/20 bg-white p-6 shadow-sm">
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

                        <div className="rounded-xl border-2 border-amber-500/20 bg-white p-6 shadow-sm">
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

                        <div className="rounded-xl border-2 border-amber-500/20 bg-white p-6 shadow-sm">
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

                        <div className="rounded-xl border-2 border-amber-500/20 bg-white p-6 shadow-sm">
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

                        <div className="rounded-xl border-2 border-amber-500/20 bg-white p-6 shadow-sm">
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
            <section className="from-muted/30 bg-gradient-to-b to-white py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">Qué Analizamos en la Validación</h2>
                        <p className="text-muted-foreground text-lg">Curación técnica exhaustiva para determinar viabilidad real</p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Analysis 1 */}
                        <div className="group border-primary/20 hover:border-primary/40 bg-background relative overflow-hidden rounded-xl border-2 p-8 shadow-lg transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-2xl">
                            <div className="bg-primary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <MapPin className="text-primary h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Ubicación y Accesos</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Análisis de distancia a red eléctrica, accesibilidad del terreno y viabilidad de la ubicación.
                            </p>
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
                            <div className="text-primary mt-4 flex items-center gap-2 text-sm font-medium">
                                <MapPin className="h-4 w-4" />
                                Localización estratégica
                            </div>
                            <div
                                className="bg-primary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Analysis 2 */}
                        <div className="group border-primary/20 hover:border-primary/40 bg-background relative overflow-hidden rounded-xl border-2 p-8 shadow-lg transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-2xl">
                            <div className="bg-primary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <FileSearch className="text-primary h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Análisis Urbanístico</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Verificación de clasificación del suelo, compatibilidad de usos y restricciones aplicables.
                            </p>
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
                            <div className="text-primary mt-4 flex items-center gap-2 text-sm font-medium">
                                <Shield className="h-4 w-4" />
                                Cumplimiento normativo
                            </div>
                            <div
                                className="bg-primary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Analysis 3 */}
                        <div className="group border-primary/20 hover:border-primary/40 bg-background relative overflow-hidden rounded-xl border-2 p-8 shadow-lg transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-2xl">
                            <div className="bg-primary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <Landmark className="text-primary h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Datos Catastrales</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Revisión de referencias catastrales, superficies y titularidad preliminar del terreno.
                            </p>
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
                            <div className="text-primary mt-4 flex items-center gap-2 text-sm font-medium">
                                <Landmark className="h-4 w-4" />
                                Datos verificados
                            </div>
                            <div
                                className="bg-primary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Analysis 4 */}
                        <div className="group border-primary/20 hover:border-primary/40 bg-background relative overflow-hidden rounded-xl border-2 p-8 shadow-lg transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-2xl">
                            <div className="bg-primary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <Zap className="text-primary h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Potencial Energético</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Estimación de recursos renovables, potencia instalable y tecnología más adecuada.
                            </p>
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
                            <div className="text-primary mt-4 flex items-center gap-2 text-sm font-medium">
                                <Zap className="h-4 w-4" />
                                Máximo rendimiento
                            </div>
                            <div
                                className="bg-primary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Analysis 5 */}
                        <div className="group border-primary/20 hover:border-primary/40 bg-background relative overflow-hidden rounded-xl border-2 p-8 shadow-lg transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-2xl">
                            <div className="bg-primary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <TrendingUp className="text-primary h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Viabilidad Económica</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Valoración orientativa, comparativa de mercado y modalidades de contratación disponibles.
                            </p>
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
                            <div className="text-primary mt-4 flex items-center gap-2 text-sm font-medium">
                                <TrendingUp className="h-4 w-4" />
                                Valor optimizado
                            </div>
                            <div
                                className="bg-primary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Analysis 6 */}
                        <div className="group border-primary/20 hover:border-primary/40 bg-background relative overflow-hidden rounded-xl border-2 p-8 shadow-lg transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-2xl">
                            <div className="bg-primary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <Shield className="text-primary h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Factores de Descarte</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Identificación de impedimentos técnicos, legales o económicos que descartan la viabilidad.
                            </p>
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
                            <div className="text-primary mt-4 flex items-center gap-2 text-sm font-medium">
                                <Shield className="h-4 w-4" />
                                Prevención de riesgos
                            </div>
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
                        <div className="group hover:border-primary rounded-xl border-2 border-transparent bg-white p-6 shadow-sm transition-all hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 shrink-0 rounded-xl p-3">
                                    <span className="text-primary text-2xl font-bold">1</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-foreground mb-2 text-xl font-bold">Regístrate como propietario</h3>
                                    <p className="text-muted-foreground mb-3">
                                        Crea tu cuenta de propietario en la plataforma. Completa tu perfil con tus datos básicos y acepta
                                        términos y condiciones.
                                    </p>
                                    <div className="bg-primary/5 flex items-center gap-2 rounded-lg p-3 text-sm">
                                        <Clock className="text-primary h-4 w-4" />
                                        <span>Tiempo: 3-5 minutos | 100% gratuito</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="group hover:border-primary rounded-xl border-2 border-transparent bg-white p-6 shadow-sm transition-all hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 shrink-0 rounded-xl p-3">
                                    <span className="text-primary text-2xl font-bold">2</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-foreground mb-2 text-xl font-bold">Publica tu terreno</h3>
                                    <p className="text-muted-foreground mb-3">
                                        Sube los datos de tu terreno: ubicación (referencia catastral), superficie, tipo de suelo, y
                                        documentación disponible. Puedes subir múltiples terrenos.
                                    </p>
                                    <div className="bg-primary/5 flex items-center gap-2 rounded-lg p-3 text-sm">
                                        <FileSearch className="text-primary h-4 w-4" />
                                        <span>Formulario sencillo y guiado</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="group hover:border-primary rounded-xl border-2 border-transparent bg-white p-6 shadow-sm transition-all hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 shrink-0 rounded-xl p-3">
                                    <span className="text-primary text-2xl font-bold">3</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-foreground mb-2 text-xl font-bold">Validamos y publicamos</h3>
                                    <p className="text-muted-foreground mb-3">
                                        Nuestro equipo técnico valida tu terreno: análisis urbanístico, distancia a red, orografía,
                                        viabilidad. Si es válido, lo publicamos en el marketplace. Te informamos del resultado.
                                    </p>
                                    <div className="bg-primary/5 flex items-center gap-2 rounded-lg p-3 text-sm">
                                        <CheckCircle2 className="text-primary h-4 w-4" />
                                        <span>Validación técnica gratuita antes de publicar</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/registro/propietario">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                                <Sparkles className="h-5 w-5" />
                                Regístrate y publica tu terreno
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className="from-muted/30 bg-gradient-to-b to-white py-16 md:py-24">
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

            {/* FAQ Section */}
            <section className="bg-muted/30 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <FAQList
                        title="Preguntas frecuentes"
                        categoryLabels={{ propietario: "Propietario" }}
                        faqs={[
                            {
                                question: "¿Cuánto pagan por arrendar un terreno para placas solares?",
                                answer: "Depende de múltiples factores: ubicación, proximidad a red eléctrica, potencia instalable, y tecnología. Normalmente entre 800€-3.000€/ha/año en arrendamiento, o venta desde 5.000€-15.000€/ha según viabilidad. La validación gratuita te dará un rango orientativo para tu terreno específico.",
                                category: "propietario",
                            },
                            {
                                question: "¿Cómo sé si mi terreno sirve para energía solar o eólica?",
                                answer: "Necesitas validación técnica que analice: distancia a puntos de conexión eléctrica (máximo 5-10 km viable), clasificación del suelo (rústico compatible), ausencia de zonas protegidas, orografía adecuada, y superficie mínima (5+ ha solar, 20+ ha eólico). Nuestra validación gratuita revisa todos estos criterios.",
                                category: "propietario",
                            },
                            {
                                question: "¿Registrarme y publicar mi terreno me obliga a algo?",
                                answer: "No. Registrarte y publicar tu terreno es 100% gratuito y sin compromiso. No firmas exclusivas, no hay cláusulas ocultas. Validamos tu terreno y, si es viable, lo publicamos en nuestro marketplace. Si eventualmente cierras un acuerdo con un promotor a través de nuestra plataforma, cobramos una comisión. Tú decides siempre.",
                                category: "propietario",
                            },
                            {
                                question: "¿Qué documentación necesito para publicar mi terreno?",
                                answer: "Para registrar tu terreno en la plataforma solo necesitamos: ubicación del terreno (municipio o referencia catastral) y superficie aproximada. Si el terreno pasa la validación técnica, después pediremos: nota simple registral, plano catastral actualizado, y escrituras de propiedad. Pero para empezar y que nuestro equipo haga la validación inicial, con los datos básicos es suficiente.",
                                category: "propietario",
                            },
                            {
                                question: "¿Cuánto tarda la validación técnica?",
                                answer: "Una vez que publicas tu terreno en la plataforma, nuestro equipo técnico realiza el análisis preliminar en pocos días hábiles. Te notificamos por email el resultado: si tu terreno es viable, lo publicamos en el marketplace. Si no es viable o necesita mejoras, te explicamos los motivos de forma clara y honesta.",
                                category: "propietario",
                            },
                            {
                                question: "¿Qué pasa si mi terreno NO es viable?",
                                answer: "Te lo decimos con total honestidad y explicamos los motivos: muy lejos de red, zona protegida, incompatibilidad urbanística, o inviabilidad económica. No tenemos incentivo para darte falsas esperanzas. Solo ganamos si tú cierras un acuerdo real, así que preferimos ser transparentes desde el principio.",
                                category: "propietario",
                            },
                        ]}
                    />
                </div>
            </section>

            {/* CTA Final */}
            <section className="from-primary/10 via-background to-primary/10 bg-gradient-to-r py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">Regístrate y Empieza a Ganar con tu Terreno</h2>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Plataforma 100% GRATUITA, sin compromiso. Publica tu terreno, nosotros lo validamos y conectamos con promotores.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/registro/propietario">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                                    <Sparkles className="h-5 w-5" />
                                    Regístrate y publica tu terreno
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/contacto">
                                <Button size="lg" variant="outline">
                                    ¿Tienes dudas? Contáctanos
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </StandardLayout>
    )
}
