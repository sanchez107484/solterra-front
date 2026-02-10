"use client"

import StandardLayout from "@/components/layouts/StandardLayout"
import { ServiceSchema } from "@/components/seo/ServiceSchema"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/i18n/i18nContext"
import { ArrowRight, Building2, CheckCircle2, Handshake, Landmark, Shield, Sparkles, Target, TrendingUp, Zap } from "lucide-react"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ServiciosPage() {
    const [isVisible, setIsVisible] = useState(false)
    const t = useTranslations()
    const services = t as any

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <StandardLayout>
            <Head>
                <title>{services?.services?.seo?.main?.title || "Servicios Solterra | Terrenos Renovables España"}</title>
                <meta
                    name="description"
                    content={
                        services?.services?.seo?.main?.description ||
                        "Validación técnica de terrenos y pipeline pre-filtrado para proyectos renovables"
                    }
                />
                <meta
                    name="keywords"
                    content={services?.services?.seo?.main?.keywords || "servicios terrenos renovables, validación suelo fotovoltaico"}
                />
                <link rel="canonical" href="https://solterra.es/servicios" />
            </Head>

            <ServiceSchema
                name="Servicios de Validación y Conexión de Terrenos para Energías Renovables"
                description="Marketplace tecnológico que estructura oportunidades de suelo para renovables con curación experta y modelo 100% orientado a cierre"
                serviceType="Real Estate and Renewable Energy Advisory"
                areaServed="ES"
            />

            {/* Hero Section - Rediseñado */}
            <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden py-12 md:py-16">
                {/* Animated background gradient */}
                <div className="from-primary/10 via-secondary/5 to-accent/10 absolute inset-0 bg-gradient-to-br" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.15),transparent_50%)]" />

                {/* Floating particles effect */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-primary/20 absolute h-2 w-2 rounded-full opacity-40"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 2}s`,
                            }}
                        />
                    ))}
                </div>

                <div className="relative container mx-auto px-4">
                    <div
                        className={`mx-auto max-w-6xl text-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                    >
                        {/* Badge */}
                        <div className="mb-6 flex justify-center">
                            <div className="bg-primary/10 border-primary/20 text-primary inline-flex items-center gap-2 rounded-full border-2 px-4 py-2">
                                <Sparkles className="h-4 w-4" />
                                <span className="text-sm font-semibold">Servicios Especializados</span>
                            </div>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-foreground mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                            {services?.services?.hero?.title || "Estructuramos terrenos, no los vendemos"}
                        </h1>

                        <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-lg md:text-xl lg:text-2xl">
                            {services?.services?.hero?.subtitle || "Conectamos propietarios y promotores con transparencia"}
                        </p>

                        {/* Value Proposition */}
                        <div className="from-primary/5 via-background to-secondary/5 mb-12 rounded-2xl border-2 border-white/10 bg-gradient-to-r p-6 shadow-xl backdrop-blur-sm">
                            <p className="text-foreground text-lg font-semibold md:text-xl">
                                {services?.services?.tagline ||
                                    "No vendemos terrenos. Los estructuramos para que lleguen solo a promotores serios."}
                            </p>
                        </div>

                        {/* Main Service Cards */}
                        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
                            {/* Propietarios Card */}
                            <Link href="/servicios/propietarios" className="group">
                                <div className="border-primary/30 from-primary/10 to-primary/5 hover:border-primary relative h-full overflow-hidden rounded-2xl border-2 bg-gradient-to-br p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                    {/* Decorative icon */}
                                    <div className="bg-primary/20 absolute top-6 right-6 rounded-full p-4">
                                        <Landmark className="text-primary h-8 w-8" />
                                    </div>

                                    {/* Gradient overlay on hover */}
                                    <div className="from-primary/0 to-primary/20 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                    <div className="relative z-10">
                                        {/* Badge */}
                                        <div className="bg-primary/20 text-primary mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
                                            <Shield className="h-3 w-3" />
                                            Para Propietarios
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-foreground mb-4 pr-12 text-2xl font-bold md:text-3xl">
                                            {services?.services?.owners?.title || "No vendemos tu suelo"}
                                        </h2>

                                        {/* Description */}
                                        <p className="text-muted-foreground mb-6 text-base">
                                            {services?.services?.owners?.subtitle ||
                                                "Lo validamos técnicamente y lo conectamos con promotores serios"}
                                        </p>

                                        {/* Benefits */}
                                        <div className="mb-6 space-y-2">
                                            <div className="flex items-start gap-2">
                                                <CheckCircle2 className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                                                <span className="text-foreground text-sm">Validación técnica 100% gratuita en 48-72h</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <CheckCircle2 className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                                                <span className="text-foreground text-sm">Conexión directa con promotores verificados</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <CheckCircle2 className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                                                <span className="text-foreground text-sm">Sin coste hasta que firmes el acuerdo</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <CheckCircle2 className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                                                <span className="text-foreground text-sm">Acompañamiento legal y negociación</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <CheckCircle2 className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                                                <span className="text-foreground text-sm">Valoración real de mercado</span>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <Button className="bg-primary hover:bg-primary/90 w-full transition-all group-hover:gap-3">
                                            Ver servicios para propietarios
                                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </div>
                                </div>
                            </Link>

                            {/* Promotores Card */}
                            <Link href="/servicios/promotores" className="group">
                                <div className="border-secondary/30 from-secondary/10 to-secondary/5 hover:border-secondary relative h-full overflow-hidden rounded-2xl border-2 bg-gradient-to-br p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                    {/* Decorative icon */}
                                    <div className="bg-secondary/20 absolute top-6 right-6 rounded-full p-4">
                                        <Building2 className="text-secondary-foreground h-8 w-8" />
                                    </div>

                                    {/* Gradient overlay on hover */}
                                    <div className="from-secondary/0 to-secondary/20 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                    <div className="relative z-10">
                                        {/* Badge */}
                                        <div className="bg-secondary/20 text-secondary-foreground mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
                                            <TrendingUp className="h-3 w-3" />
                                            Para Promotores
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-foreground mb-4 pr-12 text-2xl font-bold md:text-3xl">
                                            {services?.services?.developers?.title || "Oportunidades estructuradas"}
                                        </h2>

                                        {/* Description */}
                                        <p className="text-muted-foreground mb-6 text-base">
                                            {services?.services?.developers?.subtitle || "Pipeline cualificado de terrenos pre-validados"}
                                        </p>

                                        {/* Benefits */}
                                        <div className="mb-6 space-y-2">
                                            <div className="flex items-start gap-2">
                                                <CheckCircle2 className="text-secondary-foreground mt-0.5 h-5 w-5 flex-shrink-0" />
                                                <span className="text-foreground text-sm">Terrenos pre-validados técnicamente</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <CheckCircle2 className="text-secondary-foreground mt-0.5 h-5 w-5 flex-shrink-0" />
                                                <span className="text-foreground text-sm">Propietarios alineados y comprometidos</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <CheckCircle2 className="text-secondary-foreground mt-0.5 h-5 w-5 flex-shrink-0" />
                                                <span className="text-foreground text-sm">Ahorra semanas en prospección</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <CheckCircle2 className="text-secondary-foreground mt-0.5 h-5 w-5 flex-shrink-0" />
                                                <span className="text-foreground text-sm">Modelo 100% orientado a cierre</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <CheckCircle2 className="text-secondary-foreground mt-0.5 h-5 w-5 flex-shrink-0" />
                                                <span className="text-foreground text-sm">Solo pagas cuando cierras</span>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <Button className="bg-secondary hover:bg-secondary/90 w-full transition-all group-hover:gap-3">
                                            Ver servicios para promotores
                                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section - Fondo Blanco */}
            <section className="bg-background py-16 md:py-24">
                <div className="container mx-auto px-4">
                    {/* Quick Links to Specific Services */}
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
                            Servicios de Terrenos para Energía Solar y Eólica en España
                        </h2>
                        <p className="text-muted-foreground mb-4 text-lg">
                            Conectamos propietarios de terrenos rústicos con promotores de energía renovable. Validación técnica gratuita,
                            pipeline pre-filtrado y acompañamiento hasta el cierre del acuerdo.
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
                        <Link href="/servicios/marketplace-terrenos-renovables" className="group flex h-full">
                            <div className="group border-secondary/20 relative flex h-full w-full flex-col overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-8 shadow-lg transition-all duration-300 ease-out hover:scale-[1.05] hover:shadow-2xl sm:p-10">
                                {/* Icon destacado */}
                                <div className="bg-secondary/20 mb-6 inline-flex items-center justify-center rounded-2xl p-5">
                                    <Building2 className="text-secondary-foreground h-12 w-12 transition-transform group-hover:scale-110" />
                                </div>

                                {/* Badge */}
                                <div className="bg-secondary/10 text-secondary-foreground mb-4 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
                                    <TrendingUp className="h-3 w-3" />
                                    Para Promotores
                                </div>

                                {/* Title */}
                                <h3 className="text-foreground mb-4 text-2xl leading-tight font-bold">Marketplace de Terrenos</h3>

                                {/* Description */}
                                <p className="text-muted-foreground mb-6 text-base leading-relaxed">
                                    Accede a una cartera cualificada de terrenos pre-validados técnicamente, listos para proyectos solares y
                                    eólicos. Propietarios alineados, documentación verificada y matching inteligente.
                                </p>

                                {/* Benefits list */}
                                <div className="mb-6 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="text-secondary-foreground h-4 w-4 flex-shrink-0" />
                                        <span className="text-foreground text-sm">Terrenos pre-validados</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="text-secondary-foreground h-4 w-4 flex-shrink-0" />
                                        <span className="text-foreground text-sm">Ahorra tiempo en prospección</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="text-secondary-foreground h-4 w-4 flex-shrink-0" />
                                        <span className="text-foreground text-sm">Mayor tasa de cierre</span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="text-secondary mt-auto flex items-center gap-2 text-base font-semibold">
                                    <span>Explorar marketplace</span>
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                                </div>

                                <div
                                    className="bg-secondary/10 absolute right-0 bottom-0 h-24 w-24 rounded-tl-full transition-all group-hover:h-32 group-hover:w-32"
                                    aria-hidden
                                />
                            </div>
                        </Link>

                        <Link href="/servicios/validacion-tecnica-terreno" className="group flex h-full">
                            <div className="group border-primary/20 relative flex h-full w-full flex-col overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-8 shadow-lg transition-all duration-300 ease-out hover:scale-[1.05] hover:shadow-2xl sm:p-10">
                                {/* Icon destacado */}
                                <div className="bg-primary/20 mb-6 inline-flex items-center justify-center rounded-2xl p-5">
                                    <Shield className="text-primary h-12 w-12 transition-transform group-hover:scale-110" />
                                </div>

                                {/* Badge */}
                                <div className="bg-primary/10 text-primary mb-4 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Para Propietarios
                                </div>

                                {/* Title */}
                                <h3 className="text-foreground mb-4 text-2xl leading-tight font-bold">Validación Técnica Gratuita</h3>

                                {/* Description */}
                                <p className="text-muted-foreground mb-6 text-base leading-relaxed">
                                    Descubre si tu terreno es viable para energía solar o eólica. Análisis completo de viabilidad técnica,
                                    regulatoria y económica. Sin coste, resultados en 48-72h.
                                </p>

                                {/* Benefits list */}
                                <div className="mb-6 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="text-primary h-4 w-4 flex-shrink-0" />
                                        <span className="text-foreground text-sm">100% gratuito</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="text-primary h-4 w-4 flex-shrink-0" />
                                        <span className="text-foreground text-sm">Resultados en 48-72h</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="text-primary h-4 w-4 flex-shrink-0" />
                                        <span className="text-foreground text-sm">Informe detallado</span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="text-primary mt-auto flex items-center gap-2 text-base font-semibold">
                                    <span>Validar mi terreno</span>
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                                </div>

                                <div
                                    className="bg-primary/10 absolute right-0 bottom-0 h-24 w-24 rounded-tl-full transition-all group-hover:h-32 group-hover:w-32"
                                    aria-hidden
                                />
                            </div>
                        </Link>

                        <Link href="/servicios/prospeccion-terrenos-demanda" className="group flex h-full">
                            <div className="group border-secondary/20 relative flex h-full w-full flex-col overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-8 shadow-lg transition-all duration-300 ease-out hover:scale-[1.05] hover:shadow-2xl sm:p-10">
                                {/* Icon destacado */}
                                <div className="bg-secondary/20 mb-6 inline-flex items-center justify-center rounded-2xl p-5">
                                    <TrendingUp className="text-secondary-foreground h-12 w-12 transition-transform group-hover:scale-110" />
                                </div>

                                {/* Badge */}
                                <div className="bg-secondary/10 text-secondary-foreground mb-4 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
                                    <Target className="h-3 w-3" />
                                    Premium
                                </div>

                                {/* Title */}
                                <h3 className="text-foreground mb-4 text-2xl leading-tight font-bold">Prospección a Demanda</h3>

                                {/* Description */}
                                <p className="text-muted-foreground mb-6 text-base leading-relaxed">
                                    Búsqueda personalizada de terrenos en zonas específicas según tus criterios técnicos y estratégicos.
                                    Servicio premium con dedicación exclusiva a tu proyecto.
                                </p>

                                {/* Benefits list */}
                                <div className="mb-6 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="text-secondary-foreground h-4 w-4 flex-shrink-0" />
                                        <span className="text-foreground text-sm">100% personalizado</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="text-secondary-foreground h-4 w-4 flex-shrink-0" />
                                        <span className="text-foreground text-sm">Zonas estratégicas</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="text-secondary-foreground h-4 w-4 flex-shrink-0" />
                                        <span className="text-foreground text-sm">Dedicación exclusiva</span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="text-secondary mt-auto flex items-center gap-2 text-base font-semibold">
                                    <span>Solicitar prospección</span>
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                                </div>

                                <div
                                    className="bg-secondary/10 absolute right-0 bottom-0 h-24 w-24 rounded-tl-full transition-all group-hover:h-32 group-hover:w-32"
                                    aria-hidden
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Benefits Section - Por Qué Solterra */}
            <section className="bg-muted/30 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mt-16 mb-12 max-w-3xl text-center">
                        <h3 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
                            Por Qué Solterra es Líder en Terrenos Renovables
                        </h3>
                        <p className="text-muted-foreground text-lg">
                            Nuestro modelo de intermediación inteligente garantiza transparencia, eficiencia y resultados reales para
                            propietarios y promotores
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
                        {/* Feature 1 */}
                        <div className="group bg-background relative overflow-hidden rounded-xl border-2 p-8 text-center shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
                            <div className="from-primary/0 to-primary/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                                <div className="bg-primary/10 ring-primary/20 group-hover:ring-primary/40 mx-auto mb-6 w-fit rounded-full p-4 ring-4 transition-all group-hover:scale-110">
                                    <Shield className="text-primary h-10 w-10" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold">100% Orientado a Cierre</h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    Solo ganamos cuando tú cierras. Intermediación inteligente con curación experta y matching tecnológico.
                                </p>
                                <div className="text-primary flex items-center justify-center gap-2 text-sm font-semibold">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span>Intereses alineados</span>
                                </div>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="group bg-background relative overflow-hidden rounded-xl border-2 p-8 text-center shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
                            <div className="from-secondary/0 to-secondary/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                                <div className="bg-secondary/10 ring-secondary/20 group-hover:ring-secondary/40 mx-auto mb-6 w-fit rounded-full p-4 ring-4 transition-all group-hover:scale-110">
                                    <Zap className="text-secondary-foreground h-10 w-10" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold">Tecnología Avanzada</h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    Validación técnica automatizada y algoritmos de matching para conectar la oferta y demanda perfecta.
                                </p>
                                <div className="text-secondary flex items-center justify-center gap-2 text-sm font-semibold">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span>Innovación continua</span>
                                </div>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="group bg-background relative overflow-hidden rounded-xl border-2 p-8 text-center shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
                            <div className="from-primary/0 to-primary/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                                <div className="bg-primary/10 ring-primary/20 group-hover:ring-primary/40 mx-auto mb-6 w-fit rounded-full p-4 ring-4 transition-all group-hover:scale-110">
                                    <Handshake className="text-primary h-10 w-10" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold">Transparencia Total</h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    Nuestro modelo de negocio solo funciona si tú cierras. Estamos alineados con tu éxito.
                                </p>
                                <div className="text-primary flex items-center justify-center gap-2 text-sm font-semibold">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span>Sin costes ocultos</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </StandardLayout>
    )
}
