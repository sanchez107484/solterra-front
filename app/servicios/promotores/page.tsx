"use client"

import StandardLayout from "@/components/layouts/StandardLayout"
import { ServiceSchema } from "@/components/seo/ServiceSchema"
import { PainPointsList } from "@/components/services/PainPointsList"
import { ServiceDetailCard } from "@/components/services/ServiceDetailCard"
import { ServiceSectionHeader } from "@/components/services/ServiceSectionHeader"
import { PageHero } from "@/components/shared/page-hero"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/i18n/i18nContext"
import { FileCheck, TrendingUp, Zap } from "lucide-react"
import Head from "next/head"
import Link from "next/link"

export default function ServiciosPromotoresPage() {
    const t = useTranslations()
    const services = t as any

    const serviceIcons = [Zap, TrendingUp, FileCheck]

    return (
        <StandardLayout>
            <Head>
                <title>{services?.services?.seo?.developers?.title || "Servicios para Promotores | Solterra"}</title>
                <meta
                    name="description"
                    content={
                        services?.services?.seo?.developers?.description ||
                        "Pipeline cualificado de terrenos para proyectos solares y eólicos"
                    }
                />
                <meta
                    name="keywords"
                    content={
                        services?.services?.seo?.developers?.keywords || "terrenos renovables, pipeline fotovoltaica, prospección suelo"
                    }
                />
                <link rel="canonical" href="https://solterra.es/servicios/promotores" />
            </Head>

            <ServiceSchema
                name="Pipeline Cualificado de Terrenos para Promotores"
                description="Acceso a terrenos pre-validados para proyectos de energía solar y eólica con conexión directa al propietario"
                serviceType="Land Prospection and Pipeline Development"
                areaServed="ES"
            />

            {/* Hero */}
            <PageHero
                title={services?.services?.developers?.title || "No vendemos datos de dudosa procedencia"}
                subtitle="Te damos pipeline cualificado, con validación técnica y acceso directo al propietario"
            />

            {/* Main Section */}
            <section className="from-secondary/5 via-background to-secondary/5 bg-gradient-to-br py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <ServiceSectionHeader
                        badge={services?.services?.developers?.badge || "Para Promotores"}
                        title={services?.services?.developers?.subtitle || "Pipeline real, no Excel de brokers"}
                        intro={services?.services?.developers?.intro}
                        trustSignal={services?.services?.developers?.trustSignal}
                        variant="secondary"
                        className="mb-16"
                    />

                    {/* Pain Points */}
                    {services?.services?.developers?.painPoints && (
                        <div className="mx-auto mb-16 max-w-4xl">
                            <h3 className="text-foreground mb-8 text-center text-2xl font-bold">
                                ¿Reconoces estos problemas en tu día a día?
                            </h3>
                            <PainPointsList points={services.services.developers.painPoints} variant="secondary" />
                        </div>
                    )}

                    {/* Services */}
                    <div className="mx-auto max-w-5xl space-y-8">
                        <h3 className="text-foreground mb-12 text-center text-3xl font-bold">Soluciones que aceleran tu pipeline</h3>

                        {services?.services?.developers?.services?.map((service: any, idx: number) => (
                            <ServiceDetailCard
                                key={service.id}
                                icon={serviceIcons[idx] || Zap}
                                title={service.title}
                                description={service.description}
                                result={service.result}
                                process={service.process}
                                ctaPrimary={service.ctaPrimary}
                                ctaPrimaryLink={service.ctaPrimaryLink}
                                ctaSecondary={service.ctaSecondary}
                                ctaSecondaryLink={service.ctaSecondaryLink}
                                variant="secondary"
                            />
                        ))}
                    </div>

                    {/* Pricing Section */}
                    {services?.services?.developers?.pricing && (
                        <div className="mx-auto mt-16 max-w-4xl">
                            <div className="from-secondary/10 to-secondary/5 border-secondary/30 rounded-2xl border-2 bg-gradient-to-br p-8 shadow-xl md:p-12">
                                <div className="mb-8 text-center">
                                    <h3 className="text-foreground mb-2 text-2xl font-bold md:text-3xl">
                                        {services.services.developers.pricing.title}
                                    </h3>
                                    <p className="text-muted-foreground">{services.services.developers.pricing.subtitle}</p>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    {services.services.developers.pricing.options.map((option: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className="bg-background border-secondary/20 hover:border-secondary/40 rounded-xl border-2 p-6 transition-all"
                                        >
                                            <div className="text-secondary mb-2 text-sm font-semibold uppercase">{option.model}</div>
                                            <div className="text-foreground mb-3 text-3xl font-bold">{option.price}</div>
                                            <p className="text-muted-foreground mb-4 text-sm">{option.description}</p>
                                            <ul className="space-y-2">
                                                {option.includes.map((item: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm">
                                                        <span className="text-secondary mt-0.5">✓</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-muted-foreground mt-6 text-center text-xs">
                                    {services.services.developers.pricing.note}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Trust Signals */}
                    <div className="mx-auto mt-16 max-w-4xl">
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="bg-secondary/5 border-secondary/20 rounded-xl border-2 p-6 text-center">
                                <div className="text-secondary mb-2 text-3xl font-bold">72h</div>
                                <p className="text-muted-foreground text-sm">De solicitud a acceso</p>
                            </div>
                            <div className="bg-secondary/5 border-secondary/20 rounded-xl border-2 p-6 text-center">
                                <div className="text-secondary mb-2 text-3xl font-bold">100%</div>
                                <p className="text-muted-foreground text-sm">Suelo pre-validado técnicamente</p>
                            </div>
                            <div className="bg-secondary/5 border-secondary/20 rounded-xl border-2 p-6 text-center">
                                <div className="text-secondary mb-2 text-3xl font-bold">Directo</div>
                                <p className="text-muted-foreground text-sm">Sin intermediarios en negociación</p>
                            </div>
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="mt-16 space-y-6 text-center">
                        <h3 className="text-foreground text-2xl font-bold md:text-3xl">¿Quieres pipeline cualificado hoy?</h3>
                        <p className="text-muted-foreground mx-auto max-w-2xl">
                            Regístrate como promotor y accede a terrenos pre-validados en 72h
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/registro/promotor">
                                <Button size="lg" variant="secondary" className="gap-2">
                                    Crear cuenta de promotor
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
