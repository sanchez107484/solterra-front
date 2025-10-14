import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, FileCheck, Headphones, MapPin, Clock } from "lucide-react"
import type { translations } from "@/src/lib/i18n"

type Translations = typeof translations.es

export function Benefits({ t }: { t: Translations }) {
    return (
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4">
                <h2 className="mb-16 text-center text-3xl font-bold tracking-tight text-balance md:text-5xl">{t.benefits.title}</h2>

                <div className="grid gap-12 lg:grid-cols-2">
                    {/* For Landowners */}
                    <div>
                        <h3 className="text-primary mb-8 text-2xl font-semibold md:text-3xl">{t.benefits.landowners.title}</h3>
                        <div className="space-y-6">
                            <Card className="border-primary/20 transition-shadow hover:shadow-lg">
                                <CardHeader>
                                    <div className="mb-2 flex items-center gap-3">
                                        <div className="bg-primary/10 rounded-lg p-2">
                                            <DollarSign className="text-primary h-6 w-6" />
                                        </div>
                                        <CardTitle>{t.benefits.landowners.benefit1}</CardTitle>
                                    </div>
                                    <CardDescription className="text-base">{t.benefits.landowners.benefit1Desc}</CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="border-primary/20 transition-shadow hover:shadow-lg">
                                <CardHeader>
                                    <div className="mb-2 flex items-center gap-3">
                                        <div className="bg-primary/10 rounded-lg p-2">
                                            <FileCheck className="text-primary h-6 w-6" />
                                        </div>
                                        <CardTitle>{t.benefits.landowners.benefit2}</CardTitle>
                                    </div>
                                    <CardDescription className="text-base">{t.benefits.landowners.benefit2Desc}</CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="border-primary/20 transition-shadow hover:shadow-lg">
                                <CardHeader>
                                    <div className="mb-2 flex items-center gap-3">
                                        <div className="bg-primary/10 rounded-lg p-2">
                                            <Headphones className="text-primary h-6 w-6" />
                                        </div>
                                        <CardTitle>{t.benefits.landowners.benefit3}</CardTitle>
                                    </div>
                                    <CardDescription className="text-base">{t.benefits.landowners.benefit3Desc}</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>

                    {/* For Developers */}
                    <div>
                        <h3 className="text-secondary mb-8 text-2xl font-semibold md:text-3xl">{t.benefits.developers.title}</h3>
                        <div className="space-y-6">
                            <Card className="border-secondary/20 transition-shadow hover:shadow-lg">
                                <CardHeader>
                                    <div className="mb-2 flex items-center gap-3">
                                        <div className="bg-secondary/10 rounded-lg p-2">
                                            <FileCheck className="text-secondary h-6 w-6" />
                                        </div>
                                        <CardTitle>{t.benefits.developers.benefit1}</CardTitle>
                                    </div>
                                    <CardDescription className="text-base">{t.benefits.developers.benefit1Desc}</CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="border-secondary/20 transition-shadow hover:shadow-lg">
                                <CardHeader>
                                    <div className="mb-2 flex items-center gap-3">
                                        <div className="bg-secondary/10 rounded-lg p-2">
                                            <MapPin className="text-secondary h-6 w-6" />
                                        </div>
                                        <CardTitle>{t.benefits.developers.benefit2}</CardTitle>
                                    </div>
                                    <CardDescription className="text-base">{t.benefits.developers.benefit2Desc}</CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="border-secondary/20 transition-shadow hover:shadow-lg">
                                <CardHeader>
                                    <div className="mb-2 flex items-center gap-3">
                                        <div className="bg-secondary/10 rounded-lg p-2">
                                            <Clock className="text-secondary h-6 w-6" />
                                        </div>
                                        <CardTitle>{t.benefits.developers.benefit3}</CardTitle>
                                    </div>
                                    <CardDescription className="text-base">{t.benefits.developers.benefit3Desc}</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
