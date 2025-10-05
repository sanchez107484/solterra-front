import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Wind } from "lucide-react"
import type { translations } from "@/lib/i18n"

type Translations = typeof translations.es

export function Hero({ t }: { t: Translations }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/10 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Decorative icons */}
          <div className="mb-8 flex justify-center gap-8">
            <div className="rounded-full bg-primary/10 p-4">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
            <div className="rounded-full bg-accent/20 p-4">
              <Wind className="h-8 w-8 text-accent-foreground" />
            </div>
          </div>

          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {t.hero.title}
          </h1>

          <p className="mb-10 text-pretty text-lg text-muted-foreground md:text-xl lg:text-2xl">{t.hero.subtitle}</p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="group w-full bg-primary hover:bg-primary/90 sm:w-auto">
              {t.hero.ctaLandowner}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground sm:w-auto bg-transparent"
            >
              {t.hero.ctaDeveloper}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
    </section>
  )
}
