"use client"

import StandardLayout from "@/components/layouts/StandardLayout"
import { useTranslations } from "@/i18n/i18nContext"
import { ServiceCard } from "@/components/services/ServiceCard"
import { cn } from "@/lib/utils"
import Head from "next/head"
import { PageHero } from "@/components/shared/page-hero"

export default function ServiciosPage() {
    const t = useTranslations()

    const services = [
        {
            slug: "matching",
            title: (t as any)?.services?.list?.matching?.title || "Matching Inteligente",
            shortDesc: (t as any)?.services?.list?.matching?.shortDesc || "Conectamos terrenos ideales con proyectos renovables",
            benefits: (t as any)?.services?.list?.matching?.benefits || [],
            icon: "/icons/matching.svg",
            badge: "IA",
        },
        {
            slug: "asesoria-legal",
            title: (t as any)?.services?.list?.legal?.title || "Asesoría Legal y Técnica",
            shortDesc: (t as any)?.services?.list?.legal?.shortDesc || "Soporte experto en permisos y normativas",
            benefits: (t as any)?.services?.list?.legal?.benefits || [],
            icon: "/icons/legal.svg",
            badge: "Legal",
        },
        {
            slug: "analisis-datos",
            title: (t as any)?.services?.list?.analytics?.title || "Análisis de Datos Energéticos",
            shortDesc: (t as any)?.services?.list?.analytics?.shortDesc || "Evaluación técnica de potencial renovable",
            benefits: (t as any)?.services?.list?.analytics?.benefits || [],
            icon: "/icons/analytics.svg",
            badge: "Datos",
        },
        {
            slug: "gestion-proyectos",
            title: (t as any)?.services?.list?.management?.title || "Gestión Integral de Proyectos",
            shortDesc: (t as any)?.services?.list?.management?.shortDesc || "Acompañamiento completo del desarrollo",
            benefits: (t as any)?.services?.list?.management?.benefits || [],
            icon: "/icons/management.svg",
            badge: "Gestión",
        },
    ]

    return (
        <StandardLayout>
            <Head>
                <title>Sobre Solterra Advisory - Plataforma Líder en Energía Renovable | Solar y Eólica España</title>
                <meta
                    name="description"
                    content="Conectamos propietarios de terrenos rurales con promotores de energía renovable. Transparencia, eficiencia y sostenibilidad en proyectos solares y eólicos en España."
                />
                <meta
                    name="keywords"
                    content="energía renovable, terrenos solares, proyectos eólicos, plataforma energética, sostenibilidad, transición energética"
                />
            </Head>

            {/* Hero Section */}
            <PageHero
                title={(t as any)?.services?.title || "Nuestros Servicios"}
                subtitle={(t as any)?.services?.subtitle || "Soluciones integrales para energía renovable"}
            />

            <div className="bg-app-bg py-10 md:py-16">
                <div className="container mx-auto px-4">
                    {/* Grid de cards llamativo y moderno */}
                    <div className="relative">
                        {/* Fondo decorativo animado */}
                        <div className="from-primary/30 via-accent/20 to-secondary/30 animate-blob pointer-events-none absolute -top-24 left-1/2 z-0 h-96 w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-br opacity-70 blur-3xl" />
                        <div className="relative z-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {services.map((service, i) => (
                                <div
                                    key={service.slug}
                                    className={cn(
                                        "group transition-all duration-500 ease-out will-change-transform",
                                        "hover:z-20 hover:-translate-y-2 hover:scale-[1.045]",
                                        "[&>*]:hover:shadow-3xl [&>*]:shadow-2xl"
                                    )}
                                    style={{ animationDelay: `${i * 120}ms` }}
                                >
                                    <div className="border-primary/10 via-app-bg to-primary/5 relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br from-white/90 p-1">
                                        {/* Badge llamativo */}
                                        <span className="bg-primary/90 animate-fade-in-up absolute top-4 right-4 z-10 rounded-full px-3 py-1 text-xs font-bold text-white shadow-md">
                                            {service.badge}
                                        </span>
                                        <ServiceCard
                                            slug={service.slug}
                                            title={service.title}
                                            shortDesc={service.shortDesc}
                                            benefits={service.benefits}
                                            icon={service.icon}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </StandardLayout>
    )
}
