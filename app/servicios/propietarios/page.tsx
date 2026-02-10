"use client"

import StandardLayout from "@/components/layouts/StandardLayout"
import { ServiceSchema } from "@/components/seo/ServiceSchema"
import { FAQList } from "@/components/shared/faq-item"
import { Button } from "@/components/ui/button"
import {
    ArrowRight,
    BadgeCheck,
    CheckCircle2,
    Clock,
    Euro,
    FileCheck,
    Handshake,
    Landmark,
    Search,
    Shield,
    TrendingUp,
    Users,
    Zap,
} from "lucide-react"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ServiciosPropietariosPage() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <StandardLayout>
            <Head>
                <title>Vender o Alquilar Terreno para Placas Solares y Parques Eólicos | Solterra</title>
                <meta
                    name="description"
                    content="Descubre cuánto vale tu terreno para energía solar o eólica. Validación técnica gratuita y exhaustiva, conexión con promotores verificados y acompañamiento legal. Sin coste hasta el cierre."
                />
                <meta
                    name="keywords"
                    content="vender terreno placas solares, alquilar terreno energía solar, valoración terreno fotovoltaico, cuánto pagan por terreno renovables, arrendamiento suelo eólico"
                />
                <link rel="canonical" href="https://solterra.es/servicios/propietarios" />
            </Head>

            <ServiceSchema
                name="Servicios para Propietarios de Terrenos Rústicos - Energía Renovable"
                description="Validación técnica gratuita de terrenos para proyectos de energía solar y eólica. Conectamos propietarios con promotores verificados. Acompañamiento legal completo desde la valoración hasta el cierre del contrato de arrendamiento o compraventa."
                serviceType="Land Validation, Valuation and Real Estate Advisory for Renewable Energy"
                areaServed="ES"
                offers={{
                    price: "0",
                    priceCurrency: "EUR",
                    description: "Sin coste hasta que se cierra el acuerdo de arrendamiento o compraventa",
                }}
            />

            {/* Hero Section */}
            <section className="from-primary/10 via-primary/5 to-background relative overflow-hidden bg-gradient-to-br py-20 md:py-32">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(89,165,44,0.1),transparent_50%)]" />
                <div className="relative container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        {/* Badge */}
                        <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
                            <Landmark className="h-4 w-4" />
                            Para Propietarios de Terrenos Rústicos
                        </div>

                        {/* Main Title - H1 SEO optimizado */}
                        <h1 className="text-foreground mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                            ¿Cuánto Vale Tu Terreno para Energía Solar o Eólica?
                        </h1>

                        {/* Subtitle */}
                        <p className="text-muted-foreground mb-8 text-lg md:text-xl">
                            Regístrate en nuestro marketplace, da de alta tu terreno y recibe una validación técnica exhaustiva gratuita.
                            Conectamos propietarios con promotores verificados. Sin coste hasta que firmes.
                        </p>

                        {/* Value Props compactas */}
                        <div className="mb-8 flex flex-wrap justify-center gap-6 text-sm md:text-base">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary h-5 w-5 flex-shrink-0" />
                                <span className="text-foreground font-medium">100% Gratuito</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary h-5 w-5 flex-shrink-0" />
                                <span className="text-foreground font-medium">Validación exhaustiva</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary h-5 w-5 flex-shrink-0" />
                                <span className="text-foreground font-medium">Sin exclusivas opacas</span>
                            </div>
                        </div>

                        {/* CTA Principal */}
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contacto">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 group gap-2 text-base">
                                    <Shield className="h-5 w-5" />
                                    Validar mi terreno gratis
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link href="/servicios/validacion-tecnica-terreno">
                                <Button size="lg" variant="outline" className="gap-2 text-base">
                                    <FileCheck className="h-5 w-5" />
                                    Cómo funciona la validación
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección: Cómo Funciona (Paso a Paso) */}
            <section className="bg-background py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
                            Cómo vender o alquilar tu terreno para renovables
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Proceso transparente y sin complicaciones. Solo pagas comisión cuando cierres el contrato de arrendamiento o
                            compraventa.
                        </p>
                    </div>

                    {/* Proceso en 4 pasos - Cards horizontales */}
                    <div className="mx-auto max-w-5xl space-y-6">
                        {/* Paso 1 */}
                        <div className="group border-primary/20 hover:border-primary/40 to-primary/5 flex flex-col gap-6 rounded-xl border-2 bg-gradient-to-br from-transparent p-6 shadow-sm transition-all hover:shadow-lg md:flex-row md:items-center md:p-8">
                            <div className="bg-primary/10 text-primary flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-2xl font-bold md:h-20 md:w-20 md:text-3xl">
                                1
                            </div>
                            <div className="flex-1">
                                <h3 className="text-foreground mb-2 text-xl font-bold md:text-2xl">Regístrate y da de alta tu terreno</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Crea tu cuenta como propietario en nuestro marketplace y publica tu terreno con datos básicos:
                                    ubicación, superficie y referencia catastral. El proceso es rápido y sencillo.
                                </p>
                            </div>
                            <Search className="text-primary h-10 w-10 flex-shrink-0 opacity-60 transition-opacity group-hover:opacity-100" />
                        </div>

                        {/* Paso 2 */}
                        <div className="group border-primary/20 hover:border-primary/40 to-primary/5 flex flex-col gap-6 rounded-xl border-2 bg-gradient-to-br from-transparent p-6 shadow-sm transition-all hover:shadow-lg md:flex-row md:items-center md:p-8">
                            <div className="bg-primary/10 text-primary flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-2xl font-bold md:h-20 md:w-20 md:text-3xl">
                                2
                            </div>
                            <div className="flex-1">
                                <h3 className="text-foreground mb-2 text-xl font-bold md:text-2xl">
                                    Validación técnica exhaustiva gratuita
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Analizamos en profundidad la viabilidad solar/eólica, distancia a subestaciones, topografía, regulación
                                    urbanística y limitaciones ambientales. Recibirás un informe detallado por correo electrónico con
                                    valoración de mercado.
                                </p>
                            </div>
                            <FileCheck className="text-primary h-10 w-10 flex-shrink-0 opacity-60 transition-opacity group-hover:opacity-100" />
                        </div>

                        {/* Paso 3 */}
                        <div className="group border-primary/20 hover:border-primary/40 to-primary/5 flex flex-col gap-6 rounded-xl border-2 bg-gradient-to-br from-transparent p-6 shadow-sm transition-all hover:shadow-lg md:flex-row md:items-center md:p-8">
                            <div className="bg-primary/10 text-primary flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-2xl font-bold md:h-20 md:w-20 md:text-3xl">
                                3
                            </div>
                            <div className="flex-1">
                                <h3 className="text-foreground mb-2 text-xl font-bold md:text-2xl">
                                    Te conectamos con promotores verificados
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Si tu terreno es viable, lo presentamos a promotores de energía solar y eólica interesados en tu zona.
                                    Actuamos como intermediarios profesionales para facilitar el proceso y proteger tus intereses.
                                </p>
                            </div>
                            <Users className="text-primary h-10 w-10 flex-shrink-0 opacity-60 transition-opacity group-hover:opacity-100" />
                        </div>

                        {/* Paso 4 */}
                        <div className="group border-primary/20 hover:border-primary/40 to-primary/5 flex flex-col gap-6 rounded-xl border-2 bg-gradient-to-br from-transparent p-6 shadow-sm transition-all hover:shadow-lg md:flex-row md:items-center md:p-8">
                            <div className="bg-primary/10 text-primary flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-2xl font-bold md:h-20 md:w-20 md:text-3xl">
                                4
                            </div>
                            <div className="flex-1">
                                <h3 className="text-foreground mb-2 text-xl font-bold md:text-2xl">Acompañamiento legal hasta el cierre</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Negociamos condiciones, revisamos contratos de arrendamiento o compraventa, y te acompañamos hasta la
                                    firma. Solo cobramos comisión cuando tú cobres.
                                </p>
                            </div>
                            <Handshake className="text-primary h-10 w-10 flex-shrink-0 opacity-60 transition-opacity group-hover:opacity-100" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección: Servicios Incluidos (Cards estilo beneficios) */}
            <section className="bg-muted/30 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
                            Todo lo que incluye nuestro servicio para propietarios
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Desde la primera consulta hasta la firma del contrato, te acompañamos en cada paso sin coste inicial.
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Servicio 1 */}
                        <div className="group border-primary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-8 shadow-lg transition-transform duration-200 ease-out hover:scale-[1.03]">
                            <div className="bg-primary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <Shield className="text-primary h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Validación técnica completa</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Análisis de viabilidad solar/eólica, distancia a red eléctrica, topografía, normativa urbanística y
                                limitaciones ambientales.
                            </p>
                            <div className="text-primary flex items-center gap-2 text-sm font-medium">
                                <BadgeCheck className="h-4 w-4" />
                                100% Gratuito
                            </div>
                            <div
                                className="bg-primary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Servicio 2 */}
                        <div className="group border-primary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-8 shadow-lg transition-transform duration-200 ease-out hover:scale-[1.03]">
                            <div className="bg-primary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <TrendingUp className="text-primary h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Valoración real de mercado</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Estimación realista de ingresos por arrendamiento o precio de venta basada en proyectos comparables y
                                condiciones actuales del mercado renovable.
                            </p>
                            <div className="text-primary flex items-center gap-2 text-sm font-medium">
                                <BadgeCheck className="h-4 w-4" />
                                Datos reales
                            </div>
                            <div
                                className="bg-primary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Servicio 3 */}
                        <div className="group border-primary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-8 shadow-lg transition-transform duration-200 ease-out hover:scale-[1.03]">
                            <div className="bg-primary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <Users className="text-primary h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Matching con promotores</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Conexión con promotores verificados interesados en tu zona a través de nuestra intermediación profesional.
                                Facilitamos el contacto y gestionamos el proceso para proteger tus intereses.
                            </p>
                            <div className="text-primary flex items-center gap-2 text-sm font-medium">
                                <BadgeCheck className="h-4 w-4" />
                                Transparente
                            </div>
                            <div
                                className="bg-primary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Servicio 4 */}
                        <div className="group border-primary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-8 shadow-lg transition-transform duration-200 ease-out hover:scale-[1.03]">
                            <div className="bg-primary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <Handshake className="text-primary h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Negociación y asesoramiento</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Te acompañamos en la negociación de condiciones: duración del contrato, precio, garantías, cláusulas de
                                rescisión y obligaciones de ambas partes.
                            </p>
                            <div className="text-primary flex items-center gap-2 text-sm font-medium">
                                <BadgeCheck className="h-4 w-4" />
                                Expertos
                            </div>
                            <div
                                className="bg-primary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Servicio 5 */}
                        <div className="group border-primary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-8 shadow-lg transition-transform duration-200 ease-out hover:scale-[1.03]">
                            <div className="bg-primary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <FileCheck className="text-primary h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Revisión legal de contratos</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Revisión exhaustiva de contratos de arrendamiento o compraventa para proteger tus intereses y evitar
                                cláusulas abusivas o poco claras.
                            </p>
                            <div className="text-primary flex items-center gap-2 text-sm font-medium">
                                <BadgeCheck className="h-4 w-4" />
                                Seguridad jurídica
                            </div>
                            <div
                                className="bg-primary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Servicio 6 */}
                        <div className="group border-primary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-8 shadow-lg transition-transform duration-200 ease-out hover:scale-[1.03]">
                            <div className="bg-primary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <Zap className="text-primary h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Seguimiento hasta el cierre</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Coordinación con todas las partes (promotor, notario, registro) hasta la firma definitiva. Solo cobramos
                                cuando tú cobres.
                            </p>
                            <div className="text-primary flex items-center gap-2 text-sm font-medium">
                                <BadgeCheck className="h-4 w-4" />
                                Sin riesgo
                            </div>
                            <div
                                className="bg-primary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección: Por Qué Elegirnos (Valores estilo nosotros) */}
            <section className="bg-background py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">Por qué confiar tu terreno a Solterra</h2>
                        <p className="text-muted-foreground text-lg">
                            No somos intermediarios tradicionales. Nuestro modelo solo funciona cuando tú cierras tu acuerdo.
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
                        {/* Valor 1 */}
                        <div className="group bg-background relative overflow-hidden rounded-xl border-2 p-8 text-center shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
                            <div className="from-primary/0 to-primary/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                                <div className="bg-primary/10 ring-primary/20 group-hover:ring-primary/40 mx-auto mb-6 w-fit rounded-full p-4 ring-4 transition-all group-hover:scale-110">
                                    <Euro className="text-primary h-10 w-10" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold">Sin coste inicial</h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    0€ hasta que firmes el contrato. Solo cobramos comisión cuando tú cobres tu primer pago del promotor.
                                    Intereses completamente alineados.
                                </p>
                                <div className="text-primary flex items-center justify-center gap-2 text-sm font-semibold">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span>Sin riesgo para ti</span>
                                </div>
                            </div>
                        </div>

                        {/* Valor 2 */}
                        <div className="group bg-background relative overflow-hidden rounded-xl border-2 p-8 text-center shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
                            <div className="from-primary/0 to-primary/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                                <div className="bg-primary/10 ring-primary/20 group-hover:ring-primary/40 mx-auto mb-6 w-fit rounded-full p-4 ring-4 transition-all group-hover:scale-110">
                                    <Shield className="text-primary h-10 w-10" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold">Total transparencia</h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    Sin exclusivas opacas ni cláusulas leoninas. Sabes en todo momento qué promotores están interesados y
                                    las condiciones que ofrecen.
                                </p>
                                <div className="text-primary flex items-center justify-center gap-2 text-sm font-semibold">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span>Control total</span>
                                </div>
                            </div>
                        </div>

                        {/* Valor 3 */}
                        <div className="group bg-background relative overflow-hidden rounded-xl border-2 p-8 text-center shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
                            <div className="from-primary/0 to-primary/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                                <div className="bg-primary/10 ring-primary/20 group-hover:ring-primary/40 mx-auto mb-6 w-fit rounded-full p-4 ring-4 transition-all group-hover:scale-110">
                                    <Clock className="text-primary h-10 w-10" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold">Rapidez y eficiencia</h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    Validación técnica exhaustiva y profesional. Conexión inmediata con promotores que buscan activamente en
                                    tu zona.
                                </p>
                                <div className="text-primary flex items-center justify-center gap-2 text-sm font-semibold">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span>Ahorra tiempo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección: Stats / Trust Signals */}
            <section className="from-primary/5 to-background bg-gradient-to-br py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
                        <div className="border-primary/20 rounded-xl border-2 bg-white p-8 text-center shadow-sm">
                            <div className="text-primary mb-3 text-4xl font-bold">Exhaustiva</div>
                            <p className="text-muted-foreground text-sm font-medium">Validación técnica completa y detallada</p>
                        </div>
                        <div className="border-primary/20 rounded-xl border-2 bg-white p-8 text-center shadow-sm">
                            <div className="text-primary mb-3 text-4xl font-bold">0€</div>
                            <p className="text-muted-foreground text-sm font-medium">Hasta que firmes tu contrato</p>
                        </div>
                        <div className="border-primary/20 rounded-xl border-2 bg-white p-8 text-center shadow-sm">
                            <div className="text-primary mb-3 text-4xl font-bold">100%</div>
                            <p className="text-muted-foreground text-sm font-medium">Transparencia, sin exclusivas abusivas</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final Section */}
            <section className="from-primary/10 via-background to-primary/10 bg-gradient-to-r py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-foreground mb-6 text-3xl font-bold md:text-4xl">
                            ¿Quieres saber si tu terreno es rentable para renovables?
                        </h2>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Validación técnica exhaustiva y gratuita. Sin compromiso, sin coste hasta que cierres. Descubre el valor real de
                            tu terreno.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contacto">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2 text-base">
                                    <Shield className="h-5 w-5" />
                                    Validar mi terreno ahora
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/servicios/validacion-tecnica-terreno">
                                <Button size="lg" variant="outline" className="gap-2 text-base">
                                    <FileCheck className="h-5 w-5" />
                                    Más info sobre validación técnica
                                </Button>
                            </Link>
                        </div>

                        {/* FAQ */}
                        <FAQList
                            faqs={[
                                {
                                    question: "¿Cómo registro mi terreno en el marketplace?",
                                    answer: "El proceso es muy sencillo: crea tu cuenta como propietario, completa el formulario con los datos de tu terreno (ubicación, superficie, referencia catastral) y nosotros nos encargamos del resto. Realizaremos la validación técnica exhaustiva y te enviaremos un informe completo por email.",
                                },
                                {
                                    question: "¿Cuánto pagan por arrendar un terreno para placas solares?",
                                    answer: "Depende de la ubicación, tamaño y viabilidad técnica. En general, el arrendamiento oscila entre 1.000€ y 3.000€ por hectárea y año en proyectos solares. En eólicos puede ser mayor. Te proporcionamos una valoración realista tras la validación técnica.",
                                },
                                {
                                    question: "¿Qué requisitos debe cumplir mi terreno?",
                                    answer: "Mínimo 1-2 hectáreas, suelo rústico o agrícola, proximidad razonable a red eléctrica (generalmente <10km a subestación), sin restricciones ambientales graves. La validación técnica determina la viabilidad exacta de tu terreno.",
                                },
                                {
                                    question: "¿Cuándo empiezo a cobrar?",
                                    answer: 'Depende del acuerdo con el promotor. Lo habitual es un pago inicial al firmar el contrato de arrendamiento ("prima de firma"), seguido de pagos anuales una vez el parque esté operativo. Los contratos suelen ser de 25-30 años con revisión anual según IPC.',
                                },
                            ]}
                        />
                    </div>
                </div>
            </section>
        </StandardLayout>
    )
}
