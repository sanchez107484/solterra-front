"use client"

import { BadgePill } from "@/components/ui/badge-pill"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, Handshake, Search, UserPlus } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "../../i18n/i18nContext"

interface SplitProps {
    showCTA?: boolean
    compactMode?: boolean
}

export function SeccionComoFuncionaSplit({ showCTA = true, compactMode = false }: SplitProps) {
    const sectionPadding = compactMode ? "py-12" : "py-20"
    const titleSize = compactMode ? "text-3xl" : "text-4xl md:text-5xl"
    const subtitleSize = compactMode ? "text-base" : "text-xl"
    const { t } = useTranslations()

    const iconMap = [UserPlus, FileText, Search, Handshake]

    const propietarios = [
        t.howItWorks?.howItWorksSplit?.landowners?.step1,
        t.howItWorks?.howItWorksSplit?.landowners?.step2,
        t.howItWorks?.howItWorksSplit?.landowners?.step3,
        t.howItWorks?.howItWorksSplit?.landowners?.step4,
    ]

    const promotores = [
        t.howItWorks?.howItWorksSplit?.developers?.step1,
        t.howItWorks?.howItWorksSplit?.developers?.step2,
        t.howItWorks?.howItWorksSplit?.developers?.step3,
        t.howItWorks?.howItWorksSplit?.developers?.step4,
    ]

    return (
        <section className={`from-background via-muted/20 to-background bg-gradient-to-b px-4 ${sectionPadding}`}>
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className={`mb-6 font-bold tracking-tight ${titleSize}`}>{t.howItWorks?.title}</h2>
                    <p className={`text-muted-foreground mx-auto max-w-3xl ${subtitleSize}`}>{t.howItWorks?.quick?.subtitle}</p>
                </div>

                {/* Two Column Grid */}
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Izquierda: Propietarios */}
                    {/* Izquierda: Propietarios */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <div className="flex items-center justify-center lg:justify-start">
                            <BadgePill variant="primary">{t.howItWorks?.landowners?.title}</BadgePill>
                        </div>

                        {/* Steps */}
                        <div className="space-y-6">
                            {propietarios.map((step, i) => {
                                const Icon = iconMap[i]
                                if (!step) return null
                                return (
                                    <Card
                                        key={i}
                                        className="group bg-card hover:border-primary/50 relative overflow-hidden border-2 p-6 transition-all duration-300 hover:shadow-xl"
                                    >
                                        {/* Gradient Background on Hover */}
                                        <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                        <div className="relative flex items-start gap-5">
                                            {/* Icon */}
                                            <div className="from-primary/10 to-primary/5 ring-primary/10 flex-shrink-0 rounded-xl bg-gradient-to-br p-4 ring-1 transition-transform duration-300 group-hover:scale-110">
                                                <Icon className="text-primary h-7 w-7" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 space-y-2">
                                                <div className="bg-primary/10 text-primary mb-2 inline-block rounded-md px-3 py-1 text-xs font-bold">
                                                    {step.step}
                                                </div>
                                                <h4 className="text-foreground text-xl font-bold">{step.title}</h4>
                                                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })}
                        </div>

                        {/* CTA Button */}
                        {showCTA && (
                            <div className="flex justify-center pt-4 lg:justify-start">
                                <Link href="/login/propietario" className="w-full sm:w-auto">
                                    <Button
                                        size="lg"
                                        className="from-primary to-primary/90 h-14 w-full bg-gradient-to-r px-8 text-base font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:w-auto"
                                    >
                                        {t.cta?.landowner}
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Derecha: Promotores */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <div className="flex items-center justify-center lg:justify-start">
                            <BadgePill variant="secondary">{t.howItWorks?.developers?.title}</BadgePill>
                        </div>

                        {/* Steps */}
                        <div className="space-y-6">
                            {promotores.map((step, i) => {
                                const Icon = iconMap[i]
                                if (!step) return null
                                return (
                                    <Card
                                        key={i}
                                        className="group bg-card hover:border-secondary/50 relative overflow-hidden border-2 p-6 transition-all duration-300 hover:shadow-xl"
                                    >
                                        {/* Gradient Background on Hover */}
                                        <div className="from-secondary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                        <div className="relative flex items-start gap-5">
                                            {/* Icon */}
                                            <div className="from-secondary/10 to-secondary/5 ring-secondary/10 flex-shrink-0 rounded-xl bg-gradient-to-br p-4 ring-1 transition-transform duration-300 group-hover:scale-110">
                                                <Icon className="text-secondary h-7 w-7" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 space-y-2">
                                                <div className="bg-secondary/10 text-secondary mb-2 inline-block rounded-md px-3 py-1 text-xs font-bold">
                                                    {step.step}
                                                </div>
                                                <h4 className="text-foreground text-xl font-bold">{step.title}</h4>
                                                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })}
                        </div>

                        {/* CTA Button */}
                        {showCTA && (
                            <div className="flex justify-center pt-4 lg:justify-start">
                                <Link href="/login/promotor" className="w-full sm:w-auto">
                                    <Button
                                        size="lg"
                                        className="from-secondary to-secondary/90 h-14 w-full bg-gradient-to-r px-8 text-base font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:w-auto"
                                    >
                                        {t.cta?.developer}
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
