import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Sun, Wind, Zap } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "../i18n/i18nContext"

export function SeccionHero() {
    const { t } = useTranslations()
    return (
        <section className="relative overflow-hidden py-20 md:py-32">
            {/* Animated background gradient */}
            <div className="from-primary/70 via-secondary/50 to-accent/50 absolute inset-0 bg-gradient-to-br" />

            <div className="relative container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                    {/* Decorative icons grid */}
                    <div className="mb-12 flex justify-center gap-6">
                        <div className="group bg-primary/20 hover:bg-primary/30 rounded-2xl p-4 shadow-lg backdrop-blur-sm transition-all hover:scale-110">
                            <Leaf className="text-primary h-10 w-10 transition-transform group-hover:rotate-12" />
                        </div>
                        <div className="group bg-secondary/20 hover:bg-secondary/30 rounded-2xl p-4 shadow-lg backdrop-blur-sm transition-all hover:scale-110">
                            <Sun className="text-secondary h-10 w-10 transition-transform group-hover:rotate-12" />
                        </div>

                        <div className="group bg-primary/20 hover:bg-primary/30 rounded-2xl p-4 shadow-lg backdrop-blur-sm transition-all hover:scale-110">
                            <Wind className="text-secondary h-10 w-10 transition-transform group-hover:rotate-12" />
                        </div>
                        <div className="group bg-secondary/20 hover:bg-secondary/30 rounded-2xl p-4 shadow-lg backdrop-blur-sm transition-all hover:scale-110">
                            <Zap className="text-primary h-10 w-10 transition-transform group-hover:rotate-12" />
                        </div>
                    </div>

                    <div className="text-center">
                        <h1 className="text-foreground mb-6 text-5xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl">
                            {t.hero?.title}
                        </h1>

                        <p className="text-muted-foreground mb-12 text-xl text-pretty md:text-2xl lg:text-3xl">{t.hero?.subtitle}</p>

                        {/* CTA Cards */}
                        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
                            {/* Propietario Card */}
                            <Link href="/login/propietario">
                                <div className="group border-primary/20 from-primary/10 to-primary/5 hover:border-primary relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br p-8 shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
                                    <div className="bg-primary/20 absolute top-4 right-4 rounded-full p-3">
                                        <Leaf className="text-primary h-6 w-6" />
                                    </div>
                                    <h3 className="text-foreground mb-3 text-2xl font-bold">{t.hero?.ctaLandowner}</h3>
                                    <p className="text-muted-foreground mb-6">Monetiza tu terreno con proyectos de energía renovable</p>
                                    <Button className="bg-primary hover:bg-primary/90 w-full group-hover:gap-3">
                                        Comenzar
                                        <ArrowRight className="ml-2 h-5 w-5 transition-all group-hover:translate-x-1" />
                                    </Button>
                                </div>
                            </Link>

                            {/* Promotor Card */}
                            <Link href="/login/promotor">
                                <div className="group border-secondary/20 from-secondary/10 to-secondary/5 hover:border-secondary relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br p-8 shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
                                    <div className="bg-secondary/20 absolute top-4 right-4 rounded-full p-3">
                                        <Zap className="text-secondary h-6 w-6" />
                                    </div>
                                    <h3 className="text-foreground mb-3 text-2xl font-bold">{t.hero?.ctaDeveloper}</h3>
                                    <p className="text-muted-foreground mb-6">Encuentra terrenos ideales para tus proyectos renovables</p>
                                    <Button className="bg-secondary hover:bg-secondary/90 w-full group-hover:gap-3">
                                        Explorar
                                        <ArrowRight className="ml-2 h-5 w-5 transition-all group-hover:translate-x-1" />
                                    </Button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="bg-primary/20 pointer-events-none absolute top-20 -left-32 h-96 w-96 rounded-full blur-3xl" />
            <div className="bg-secondary/20 pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full blur-3xl" />
        </section>
    )
}
