import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { translations } from "@/lib/i18n"

type Translations = typeof translations.es

export function CTASection({ t }: { t: Translations }) {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary p-8 text-center md:p-12">
          <h2 className="mb-4 text-balance text-3xl font-bold text-primary-foreground md:text-5xl">{t.cta.title}</h2>
          <p className="mb-8 text-pretty text-lg text-primary-foreground/90 md:text-xl">{t.cta.subtitle}</p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" className="group w-full sm:w-auto">
              {t.cta.landowner}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary sm:w-auto"
            >
              {t.cta.developer}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
