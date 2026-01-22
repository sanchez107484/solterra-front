"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTranslations } from "@/i18n/i18nContext"
import { ArrowRight, CheckCircle, Clock, TrendingUp, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ServiceCardProps {
    slug: string
    title: string
    shortDesc: string
    benefits: string[]
    icon?: string
}

export function ServiceCard({ slug, title, shortDesc, benefits, icon }: ServiceCardProps) {
    const { t } = useTranslations()

    return (
        <Card className="group h-full overflow-hidden border-2 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-4 flex items-center gap-3">
                {icon && (
                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                        <Image src={icon} alt={title} width={24} height={24} />
                    </div>
                )}
                <h3 className="text-foreground text-xl font-bold">{title}</h3>
            </div>

            <p className="text-muted-foreground mb-4">{shortDesc}</p>

            <ul className="mb-6 space-y-2">
                {benefits.slice(0, 3).map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="text-primary h-4 w-4" />
                        <span>{benefit}</span>
                    </li>
                ))}
            </ul>

            <Link href={`/servicios/${slug}`}>
                <Button className="w-full group-hover:gap-2">
                    <span>{(t as any)?.services?.cta || "Ver Detalles"}</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>
        </Card>
    )
}

export function ServiceHero({ title, subtitle, backgroundImage }: { title: string; subtitle: string; backgroundImage?: string }) {
    return (
        <section className="relative py-16 md:py-24">
            {backgroundImage && (
                <div className="absolute inset-0">
                    <Image src={backgroundImage} alt="" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
            )}
            <div className="relative container mx-auto px-4 text-center">
                <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">{title}</h1>
                <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">{subtitle}</p>
            </div>
        </section>
    )
}

export function ServiceStats() {
    const stats = [
        { icon: Users, value: "500+", label: "Terrenos Conectados" },
        { icon: TrendingUp, value: "95%", label: "Tasa de Éxito" },
        { icon: Clock, value: "2 Semanas", label: "Tiempo Promedio" },
    ]

    return (
        <section className="bg-muted/50 py-12">
            <div className="container mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-3">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="bg-primary/10 mb-2 inline-flex rounded-full p-3">
                                <stat.icon className="text-primary h-6 w-6" />
                            </div>
                            <div className="text-foreground text-3xl font-bold">{stat.value}</div>
                            <div className="text-muted-foreground">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
