"use client"

import StandardLayout from "@/components/layouts/StandardLayout"
import { Card } from "@/components/ui/card"
import { useTranslations } from "@/i18n/i18nContext"
import { Award, Leaf, Target, TrendingUp, Users } from "lucide-react"
import Head from "next/head"

export default function Nosotros() {
    const { t } = useTranslations()

    return (
        <StandardLayout>
            <Head>
                <title>{t?.about?.hero?.title}</title>
            </Head>

            {/* Hero Section */}
            <section className="from-primary/10 via-background to-secondary/10 relative bg-gradient-to-br px-6 py-24">
                <div className="container mx-auto max-w-6xl text-center">
                    <h1 className="mb-6 text-5xl font-bold text-balance md:text-6xl">{t?.about?.hero?.title}</h1>
                    <p className="text-muted-foreground mx-auto max-w-3xl text-xl text-pretty">{t?.about?.hero?.subtitle}</p>
                </div>
            </section>

            {/* Misión */}
            <section className="bg-background px-6 py-20">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid items-center gap-12 md:grid-cols-2">
                        <div>
                            <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold">
                                {t?.about?.mission?.badge}
                            </div>
                            <h2 className="mb-6 text-4xl font-bold">{t?.about?.mission?.title}</h2>
                            <p className="text-muted-foreground mb-6 text-lg">{t?.about?.mission?.p1}</p>
                            <p className="text-muted-foreground text-lg">{t?.about?.mission?.p2}</p>
                        </div>

                        <Card className="from-primary/5 to-secondary/5 border-2 bg-gradient-to-br p-8">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 shrink-0 rounded-xl p-3">
                                        <Target className="text-primary h-8 w-8" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-xl font-bold">{t?.about?.values?.transparency?.title}</h3>
                                        <p className="text-muted-foreground">{t?.about?.values?.transparency?.desc}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-secondary/10 shrink-0 rounded-xl p-3">
                                        <Leaf className="text-secondary-foreground h-8 w-8" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-xl font-bold">{t?.about?.values?.efficiency?.title}</h3>
                                        <p className="text-muted-foreground">{t?.about?.values?.efficiency?.desc}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-accent/10 shrink-0 rounded-xl p-3">
                                        <Users className="text-accent h-8 w-8" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-xl font-bold">{t?.about?.values?.sustainability?.title}</h3>
                                        <p className="text-muted-foreground">{t?.about?.values?.sustainability?.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Valores */}
            <section className="from-primary/5 to-background bg-gradient-to-br px-6 py-20">
                <div className="container mx-auto max-w-6xl">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-4xl font-bold">{t?.about?.values?.title}</h2>
                        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">{t?.about?.values?.subtitle}</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <Card className="border-2 p-8 text-center transition-shadow hover:shadow-xl">
                            <div className="bg-primary/10 mx-auto mb-6 w-fit rounded-full p-4">
                                <Award className="text-primary h-10 w-10" />
                            </div>
                            <h3 className="mb-4 text-2xl font-bold">{t?.about?.values?.transparency?.title}</h3>
                            <p className="text-muted-foreground">{t?.about?.values?.transparency?.desc}</p>
                        </Card>

                        <Card className="border-2 p-8 text-center transition-shadow hover:shadow-xl">
                            <div className="bg-secondary/10 mx-auto mb-6 w-fit rounded-full p-4">
                                <TrendingUp className="text-secondary-foreground h-10 w-10" />
                            </div>
                            <h3 className="mb-4 text-2xl font-bold">{t?.about?.values?.efficiency?.title}</h3>
                            <p className="text-muted-foreground">{t?.about?.values?.efficiency?.desc}</p>
                        </Card>

                        <Card className="border-2 p-8 text-center transition-shadow hover:shadow-xl">
                            <div className="bg-accent/10 mx-auto mb-6 w-fit rounded-full p-4">
                                <Leaf className="text-accent h-10 w-10" />
                            </div>
                            <h3 className="mb-4 text-2xl font-bold">{t?.about?.values?.sustainability?.title}</h3>
                            <p className="text-muted-foreground">{t?.about?.values?.sustainability?.desc}</p>
                        </Card>
                    </div>
                </div>
            </section>
        </StandardLayout>
    )
}
