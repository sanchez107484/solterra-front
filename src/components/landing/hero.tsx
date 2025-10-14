import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Wind } from "lucide-react"
import type { translations } from "@/src/lib/i18n"

type Translations = typeof translations.es

export function Hero({ t }: { t: Translations }) {
    return (
        <section className="from-primary/5 via-secondary/5 to-accent/10 relative overflow-hidden bg-gradient-to-br py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl text-center">
                    {/* Decorative icons */}
                    <div className="mb-8 flex justify-center gap-8">
                        <div className="bg-primary/10 rounded-full p-4">
                            <Leaf className="text-primary h-8 w-8" />
                        </div>
                        <div className="bg-accent/20 rounded-full p-4">
                            <Wind className="text-accent-foreground h-8 w-8" />
                        </div>
                    </div>

                    <h1 className="text-foreground mb-6 text-4xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl">
                        {t.hero.title}
                    </h1>

                    <p className="text-muted-foreground mb-10 text-lg text-pretty md:text-xl lg:text-2xl">{t.hero.subtitle}</p>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button size="lg" className="group bg-primary hover:bg-primary/90 w-full sm:w-auto">
                            {t.hero.ctaLandowner}
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground w-full bg-transparent sm:w-auto"
                        >
                            {t.hero.ctaDeveloper}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Decorative gradient orbs */}
            <div className="bg-primary/20 pointer-events-none absolute top-20 -left-20 h-64 w-64 rounded-full blur-3xl" />
            <div className="bg-secondary/20 pointer-events-none absolute -right-20 bottom-20 h-64 w-64 rounded-full blur-3xl" />
        </section>
    )
}
