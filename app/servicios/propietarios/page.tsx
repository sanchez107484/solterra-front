"use client"

import StandardLayout from "@/components/layouts/StandardLayout"
import { ServiceSchema } from "@/components/seo/ServiceSchema"
import { PainPointsList } from "@/components/services/PainPointsList"
import { ServiceDetailCard } from "@/components/services/ServiceDetailCard"
import { ServiceSectionHeader } from "@/components/services/ServiceSectionHeader"
import { PageHero } from "@/components/shared/page-hero"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/i18n/i18nContext"
import { Handshake, Layers, Shield } from "lucide-react"
import Head from "next/head"
import Link from "next/link"

export default function ServiciosPropietariosPage() {
    const t = useTranslations()
    const services = t as any

    const serviceIcons = [Shield, Layers, Handshake]

    return (
        <StandardLayout>
            <Head>
                <title>{services?.services?.seo?.owners?.title || "Servicios para Propietarios | Solterra"}</title>
                <meta
                    name="description"
                    content={services?.services?.seo?.owners?.description || "Validación técnica gratuita de terrenos para renovables"}
                />
                <meta
                    name="keywords"
                    content={services?.services?.seo?.owners?.keywords || "vender terreno renovables, valor suelo fotovoltaico"}
                />
                <link rel="canonical" href="https://solterra.es/servicios/propietarios" />
            </Head>

            <ServiceSchema
                name="Validación Técnica de Terrenos para Propietarios"
                description="Validación técnica gratuita de terrenos para proyectos de energía solar y eólica, con conexión directa a promotores sin intermediarios"
                serviceType="Land Validation and Real Estate Advisory"
                areaServed="ES"
                offers={{
                    price: "0",
                    priceCurrency: "EUR",
                    description: "Validación técnica gratuita hasta cierre de acuerdo",
                }}
            />

            {/* Hero */}
            <PageHero
                title={services?.services?.owners?.title || "No vendemos tu suelo"}
                subtitle="Lo validamos técnicamente y lo conectamos con promotores serios"
            />

            {/* Main Section */}
            <section className="from-primary/5 via-background to-primary/5 bg-gradient-to-br py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <ServiceSectionHeader
                        badge={services?.services?.owners?.badge || "Para Propietarios"}
                        title={services?.services?.owners?.subtitle || "Sin brokers, sin intermediarios opacos"}
                        intro={services?.services?.owners?.intro}
                        trustSignal={services?.services?.owners?.trustSignal}
                        variant="primary"
                        className="mb-16"
                    />

                    {/* Pain Points */}
                    {services?.services?.owners?.painPoints && (
                        <div className="mx-auto mb-16 max-w-4xl">
                            <h3 className="text-foreground mb-8 text-center text-2xl font-bold">
                                ¿Te identificas con alguna de estas situaciones?
                            </h3>
                            <PainPointsList points={services.services.owners.painPoints} variant="primary" />
                        </div>
                    )}

                    {/* Services */}
                    <div className="mx-auto max-w-5xl space-y-8">
                        <h3 className="text-foreground mb-12 text-center text-3xl font-bold">Así te ayudamos</h3>

                        {services?.services?.owners?.services?.map((service: any, idx: number) => (
                            <ServiceDetailCard
                                key={service.id}
                                icon={serviceIcons[idx] || Shield}
                                title={service.title}
                                description={service.description}
                                result={service.result}
                                process={service.process}
                                ctaPrimary={service.ctaPrimary}
                                ctaPrimaryLink={service.ctaPrimaryLink}
                                ctaSecondary={service.ctaSecondary}
                                ctaSecondaryLink={service.ctaSecondaryLink}
                                variant="primary"
                            />
                        ))}
                    </div>

                    {/* Trust Signals */}
                    <div className="mx-auto mt-16 max-w-4xl">
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="bg-primary/5 border-primary/20 rounded-xl border-2 p-6 text-center">
                                <div className="text-primary mb-2 text-3xl font-bold">48h</div>
                                <p className="text-muted-foreground text-sm">Tiempo medio de validación</p>
                            </div>
                            <div className="bg-primary/5 border-primary/20 rounded-xl border-2 p-6 text-center">
                                <div className="text-primary mb-2 text-3xl font-bold">0€</div>
                                <p className="text-muted-foreground text-sm">Hasta que se cierra el acuerdo</p>
                            </div>
                            <div className="bg-primary/5 border-primary/20 rounded-xl border-2 p-6 text-center">
                                <div className="text-primary mb-2 text-3xl font-bold">100%</div>
                                <p className="text-muted-foreground text-sm">Transparente y sin exclusivas opacas</p>
                            </div>
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="mt-16 space-y-6 text-center">
                        <h3 className="text-foreground text-2xl font-bold md:text-3xl">¿Listo para validar tu terreno?</h3>
                        <p className="text-muted-foreground mx-auto max-w-2xl">
                            Contáctanos y uno de nuestros expertos evaluará tu terreno sin compromiso
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contacto">
                                <Button size="lg" className="gap-2">
                                    Evaluar mi terreno gratis
                                </Button>
                            </Link>
                            <Link href="/servicios">
                                <Button size="lg" variant="outline">
                                    Ver todos los servicios
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </StandardLayout>
    )
}
