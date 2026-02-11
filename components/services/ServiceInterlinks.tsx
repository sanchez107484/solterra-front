"use client"

import { ArrowRight, Building2, CheckCircle2, Shield, Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"

type ServiceKey = "marketplace" | "validacion" | "prospeccion"

interface ServiceInterlinkProps {
    /** Servicio actual (se excluye del listado) */
    currentService: ServiceKey
    /** Título de la sección (opcional) */
    title?: string
    /** Subtítulo de la sección (opcional) */
    subtitle?: string
    /** Fondo de la sección (opcional) */
    background?: "white" | "muted"
}

const SERVICES_DATA = {
    marketplace: {
        title: "Marketplace de Terrenos",
        description:
            "Accede a una cartera cualificada de terrenos pre-validados técnicamente, listos para proyectos solares y eólicos. Propietarios alineados, documentación verificada y matching inteligente.",
        href: "/servicios/marketplace-terrenos-renovables",
        icon: Building2,
        badge: {
            icon: TrendingUp,
            label: "Para Promotores",
            color: "secondary",
        },
        benefits: ["Terrenos pre-validados", "Ahorra tiempo en prospección", "Mayor tasa de cierre"],
        cta: "Explorar marketplace",
    },
    validacion: {
        title: "Validación Técnica Gratuita",
        description:
            "Descubre si tu terreno es viable para energía solar o eólica. Análisis completo de viabilidad técnica, regulatoria y económica. Sin coste, resultados en 48-72h.",
        href: "/servicios/validacion-tecnica-terreno",
        icon: Shield,
        badge: {
            icon: CheckCircle2,
            label: "Para Propietarios",
            color: "primary",
        },
        benefits: ["100% gratuito", "Resultados en 48-72h", "Informe detallado"],
        cta: "Validar mi terreno",
    },
    prospeccion: {
        title: "Búsqueda Personalizada",
        description:
            "Servicio premium de prospección en zona específica. Búsqueda activa con criterios a medida. Ideal para promotores con punto de conexión asegurado o necesidades muy concretas.",
        href: "/servicios/prospeccion-terrenos-demanda",
        icon: TrendingUp,
        badge: {
            icon: Sparkles,
            label: "Servicio Premium",
            color: "secondary",
        },
        benefits: ["Zona específica", "Criterios personalizados", "Success fee reducido"],
        cta: "Solicitar prospección",
    },
}

export default function ServiceInterlinks({
    currentService,
    title = "Otros Servicios",
    subtitle = "Explora nuestras otras soluciones para promotores y propietarios de terrenos renovables",
    background = "white",
}: ServiceInterlinkProps) {
    // Filtrar el servicio actual
    const otherServices = (Object.keys(SERVICES_DATA) as ServiceKey[]).filter((key) => key !== currentService)

    const bgClass = background === "white" ? "bg-white" : "bg-muted/30"

    return (
        <section className={`${bgClass} py-16 md:py-20`}>
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">{title}</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-lg">{subtitle}</p>
                </div>

                {/* Grid de servicios */}
                <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
                    {otherServices.map((serviceKey) => {
                        const service = SERVICES_DATA[serviceKey]
                        const IconComponent = service.icon
                        const BadgeIcon = service.badge.icon
                        const borderColor = service.badge.color === "primary" ? "border-primary/20" : "border-secondary/20"
                        const iconBg = service.badge.color === "primary" ? "bg-primary/20" : "bg-secondary/20"
                        const iconColor = service.badge.color === "primary" ? "text-primary" : "text-secondary-foreground"
                        const badgeBg = service.badge.color === "primary" ? "bg-primary/10" : "bg-secondary/10"
                        const badgeTextColor = service.badge.color === "primary" ? "text-primary" : "text-secondary-foreground"
                        const checkColor = service.badge.color === "primary" ? "text-primary" : "text-secondary-foreground"
                        const ctaColor = service.badge.color === "primary" ? "text-primary" : "text-secondary"
                        const circleBg = service.badge.color === "primary" ? "bg-primary/10" : "bg-secondary/10"

                        return (
                            <Link key={serviceKey} href={service.href} className="group flex h-full">
                                <div
                                    className={`group ${borderColor} relative flex h-full w-full flex-col overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-8 shadow-lg transition-all duration-300 ease-out hover:scale-[1.05] hover:shadow-2xl sm:p-10`}
                                >
                                    {/* Icon destacado */}
                                    <div className={`${iconBg} mb-6 inline-flex items-center justify-center rounded-2xl p-5`}>
                                        <IconComponent className={`${iconColor} h-12 w-12 transition-transform group-hover:scale-110`} />
                                    </div>

                                    {/* Badge */}
                                    <div
                                        className={`${badgeBg} ${badgeTextColor} mb-4 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold`}
                                    >
                                        <BadgeIcon className="h-3 w-3" />
                                        {service.badge.label}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-foreground mb-4 text-2xl leading-tight font-bold">{service.title}</h3>

                                    {/* Description */}
                                    <p className="text-muted-foreground mb-6 text-base leading-relaxed">{service.description}</p>

                                    {/* Benefits list */}
                                    <div className="mb-6 space-y-2">
                                        {service.benefits.map((benefit, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <CheckCircle2 className={`${checkColor} h-4 w-4 flex-shrink-0`} />
                                                <span className="text-foreground text-sm">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <div className={`${ctaColor} mt-auto flex items-center gap-2 text-base font-semibold`}>
                                        <span>{service.cta}</span>
                                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                                    </div>

                                    {/* Círculo decorativo */}
                                    <div
                                        className={`${circleBg} absolute right-0 bottom-0 h-24 w-24 rounded-tl-full transition-all group-hover:h-32 group-hover:w-32`}
                                        aria-hidden
                                    />
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
