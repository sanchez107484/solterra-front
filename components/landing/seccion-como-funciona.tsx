"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTranslations } from "@/i18n/i18nContext"
import { FileText, Handshake, Search, TrendingUp, UserPlus } from "lucide-react"
import Link from "next/link"

interface SeccionComoFunciona2Props {
    showCTA?: boolean
    compactMode?: boolean
}

export function SeccionComoFunciona({ showCTA = true, compactMode = false }: SeccionComoFunciona2Props) {
    const sectionPadding = compactMode ? "py-12" : "py-20"
    const titleSize = compactMode ? "text-3xl" : "text-4xl"
    const subtitleSize = compactMode ? "text-lg" : "text-xl"
    const { t } = useTranslations()

    return (
        <section className="py-20 md:py-12">
            <div className="text-center">
                <h2 className="text-foreground text-4xl font-bold md:text-5xl">{t.howItWorks?.title}</h2>
            </div>

            {/* Para Propietarios */}
            <section className={`bg-background px-6 ${sectionPadding}`}>
                <div className="container mx-auto max-w-6xl">
                    <div className="mb-16 text-center">
                        <div className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold">
                            {t.howItWorks?.landowners?.title}
                        </div>
                        <h2 className={`mb-4 ${titleSize} font-bold`}>{t.howItWorks?.landowners?.subtitle}</h2>
                        <p className={`text-muted-foreground mx-auto max-w-2xl ${subtitleSize}`}>
                            {t.howItWorks?.howItWorksSplit?.landowners?.step1?.description}
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        <Card className="border-2 p-8 transition-shadow hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 shrink-0 rounded-xl p-3">
                                    <UserPlus className="text-primary h-8 w-8" />
                                </div>
                                <div>
                                    <div className="text-primary mb-2 text-sm font-semibold">
                                        {t.howItWorks?.howItWorksSplit?.landowners?.step1?.step}
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold">{t.howItWorks?.howItWorksSplit?.landowners?.step1?.title}</h3>
                                    <p className="text-muted-foreground">{t.howItWorks?.howItWorksSplit?.landowners?.step1?.description}</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-2 p-8 transition-shadow hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 shrink-0 rounded-xl p-3">
                                    <FileText className="text-primary h-8 w-8" />
                                </div>
                                <div>
                                    <div className="text-primary mb-2 text-sm font-semibold">
                                        {t.howItWorks?.howItWorksSplit?.landowners?.step2?.step}
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold">{t.howItWorks?.howItWorksSplit?.landowners?.step2?.title}</h3>
                                    <p className="text-muted-foreground">{t.howItWorks?.howItWorksSplit?.landowners?.step2?.description}</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-2 p-8 transition-shadow hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 shrink-0 rounded-xl p-3">
                                    <Search className="text-primary h-8 w-8" />
                                </div>
                                <div>
                                    <div className="text-primary mb-2 text-sm font-semibold">
                                        {t.howItWorks?.howItWorksSplit?.landowners?.step3?.step}
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold">{t.howItWorks?.howItWorksSplit?.landowners?.step3?.title}</h3>
                                    <p className="text-muted-foreground">{t.howItWorks?.howItWorksSplit?.landowners?.step3?.description}</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-2 p-8 transition-shadow hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 shrink-0 rounded-xl p-3">
                                    <Handshake className="text-primary h-8 w-8" />
                                </div>
                                <div>
                                    <div className="text-primary mb-2 text-sm font-semibold">
                                        {t.howItWorks?.howItWorksSplit?.landowners?.step4?.step}
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold">{t.howItWorks?.howItWorksSplit?.landowners?.step4?.title}</h3>
                                    <p className="text-muted-foreground">{t.howItWorks?.howItWorksSplit?.landowners?.step4?.description}</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {showCTA && (
                        <div className="mt-12 text-center">
                            <Link href="/login/propietario">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 h-14 px-8 text-lg">
                                    {t.cta?.landowner}
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Para Promotores */}
            <section className={`from-secondary/5 to-background bg-gradient-to-br px-6 ${sectionPadding}`}>
                <div className="container mx-auto max-w-6xl">
                    <div className="mb-16 text-center">
                        <div className="bg-secondary/10 text-secondary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold">
                            {t.howItWorks?.developers?.title}
                        </div>
                        <h2 className={`mb-4 ${titleSize} font-bold`}>{t.howItWorks?.developers?.subtitle}</h2>
                        <p className={`text-muted-foreground mx-auto max-w-2xl ${subtitleSize}`}>
                            {t.howItWorks?.howItWorksSplit?.developers?.step1?.description}
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        <Card className="border-2 p-8 transition-shadow hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary/10 shrink-0 rounded-xl p-3">
                                    <UserPlus className="text-secondary h-8 w-8" />
                                </div>
                                <div>
                                    <div className="text-secondary mb-2 text-sm font-semibold">
                                        {t.howItWorks?.howItWorksSplit?.developers?.step1?.step}
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold">{t.howItWorks?.howItWorksSplit?.developers?.step1?.title}</h3>
                                    <p className="text-muted-foreground">{t.howItWorks?.howItWorksSplit?.developers?.step1?.description}</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-2 p-8 transition-shadow hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary/10 shrink-0 rounded-xl p-3">
                                    <FileText className="text-secondary h-8 w-8" />
                                </div>
                                <div>
                                    <div className="text-secondary mb-2 text-sm font-semibold">
                                        {t.howItWorks?.howItWorksSplit?.developers?.step2?.step}
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold">{t.howItWorks?.howItWorksSplit?.developers?.step2?.title}</h3>
                                    <p className="text-muted-foreground">{t.howItWorks?.howItWorksSplit?.developers?.step2?.description}</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-2 p-8 transition-shadow hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary/10 shrink-0 rounded-xl p-3">
                                    <TrendingUp className="text-secondary h-8 w-8" />
                                </div>
                                <div>
                                    <div className="text-secondary mb-2 text-sm font-semibold">
                                        {t.howItWorks?.howItWorksSplit?.developers?.step3?.step}
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold">{t.howItWorks?.howItWorksSplit?.developers?.step3?.title}</h3>
                                    <p className="text-muted-foreground">{t.howItWorks?.howItWorksSplit?.developers?.step3?.description}</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-2 p-8 transition-shadow hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary/10 shrink-0 rounded-xl p-3">
                                    <Handshake className="text-secondary h-8 w-8" />
                                </div>
                                <div>
                                    <div className="text-secondary mb-2 text-sm font-semibold">
                                        {t.howItWorks?.howItWorksSplit?.developers?.step4?.step}
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold">{t.howItWorks?.howItWorksSplit?.developers?.step4?.title}</h3>
                                    <p className="text-muted-foreground">{t.howItWorks?.howItWorksSplit?.developers?.step4?.description}</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {showCTA && (
                        <div className="mt-12 text-center">
                            <Link href="/login/promotor">
                                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary-foreground h-14 px-8 text-lg">
                                    {t.cta?.developer}
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </section>
    )
}

export default SeccionComoFunciona
