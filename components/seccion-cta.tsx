import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Sparkles } from "lucide-react"
import type { translations } from "@/lib/i18n"
import Link from "next/link"

type Translations = typeof translations.es

export function SeccionCTA({ t }: { t: Translations }) {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 p-12 shadow-2xl md:p-16">
          {/* Decorative elements */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex rounded-full bg-accent/30 px-6 py-2">
              <Sparkles className="mr-2 h-5 w-5 text-accent-foreground" />
              <span className="font-semibold text-accent-foreground">Únete a la revolución energética</span>
            </div>

            <h2 className="mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">{t.cta.title}</h2>

            <p className="mb-10 text-xl text-muted-foreground md:text-2xl">{t.cta.subtitle}</p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/login/propietario">
                <Button size="lg" className="group w-full bg-primary hover:bg-primary/90 sm:w-auto">
                  {t.cta.ctaLandowner}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/login/promotor">
                <Button size="lg" className="group w-full bg-secondary hover:bg-secondary/90 sm:w-auto">
                  {t.cta.ctaDeveloper}
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
