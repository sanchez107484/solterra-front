import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "../../i18n/i18nContext"

export function SeccionCTA() {
    const { t } = useTranslations()
    return (
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4">
                <Card className="border-primary/20 from-primary/10 via-secondary/5 to-accent/10 relative overflow-hidden border-2 bg-gradient-to-br p-12 shadow-2xl md:p-16">
                    {/* Decorative elements */}
                    <div className="bg-primary/20 absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl" />
                    <div className="bg-secondary/30 absolute -bottom-20 -left-20 h-64 w-64 rounded-full shadow-2xl blur-3xl" />

                    <div className="relative mx-auto max-w-3xl text-center">
                        <div className="bg-accent/30 mb-6 inline-flex rounded-full px-6 py-2">
                            <Sparkles className="text-accent-foreground mr-2 h-5 w-5" />
                            <span className="text-accent-foreground font-semibold">Únete a la revolución energética</span>
                        </div>

                        <h2 className="text-foreground mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">{t.cta?.title}</h2>

                        <p className="text-muted-foreground mb-10 text-xl md:text-2xl">{t.cta?.subtitle}</p>

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link href="/login/propietario">
                                <Button size="lg" className="group bg-primary hover:bg-primary/90 w-full sm:w-auto">
                                    {t.cta?.landowner}
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link href="/login/promotor">
                                <Button size="lg" className="group bg-secondary hover:bg-secondary/90 w-full sm:w-auto">
                                    {t.cta?.developer}
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
