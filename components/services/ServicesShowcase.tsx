"use client"

import { ArrowRight, Building2, CheckCircle2, Shield, Target, TrendingUp } from "lucide-react"
import Link from "next/link"

interface ServicesShowcaseProps {
    /** Título de la sección */
    title?: string
    /** Subtítulo descriptivo */
    subtitle?: string
    /** Fondo de la sección */
    background?: string
}

export default function ServicesShowcase({
    title = "Servicios de Terrenos para Energía Solar y Eólica en España",
    subtitle = "Conectamos propietarios de terrenos rústicos con promotores de energía renovable. Validación técnica gratuita, pipeline pre-filtrado y acompañamiento hasta el cierre del acuerdo.",
    background = "muted",
}: ServicesShowcaseProps) {
    const bgClass =
        background === "white"
            ? "bg-white"
            : background === "muted/30"
              ? "bg-muted/30"
              : background === "primary/5"
                ? "bg-primary/5"
                : background
    return (
        <section className={`${bgClass} py-16 md:py-24`}>
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">{title}</h2>
                    <p className="text-muted-foreground mb-4 text-lg">{subtitle}</p>
                </div>

                {/* Grid de servicios */}
                <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
                    {/* Marketplace */}
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

                    {/* Validación */}
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

                    {/* Prospección */}
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
    )
}
