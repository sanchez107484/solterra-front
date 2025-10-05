import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Wind, Sun, Zap } from "lucide-react"
import type { translations } from "@/lib/i18n"
import Link from "next/link"

type Translations = typeof translations.es

export function SeccionHero({ t }: { t: Translations }) {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.15),transparent_50%)]" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          {/* Decorative icons grid */}
          <div className="mb-12 flex justify-center gap-6">
            <div className="group rounded-2xl bg-primary/20 p-4 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-primary/30">
              <Leaf className="h-10 w-10 text-primary transition-transform group-hover:rotate-12" />
            </div>
            <div className="group rounded-2xl bg-secondary/20 p-4 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-secondary/30">
              <Wind className="h-10 w-10 text-secondary transition-transform group-hover:rotate-12" />
            </div>
            <div className="group rounded-2xl bg-accent/30 p-4 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-accent/40">
              <Sun className="h-10 w-10 text-accent-foreground transition-transform group-hover:rotate-12" />
            </div>
            <div className="group rounded-2xl bg-primary/20 p-4 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-primary/30">
              <Zap className="h-10 w-10 text-primary transition-transform group-hover:rotate-12" />
            </div>
          </div>

          <div className="text-center">
            <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {t.hero.title}
            </h1>

            <p className="mb-12 text-pretty text-xl text-muted-foreground md:text-2xl lg:text-3xl">{t.hero.subtitle}</p>

            {/* CTA Cards */}
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {/* Propietario Card */}
              <Link href="/login/propietario">
                <div className="group relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-8 shadow-xl transition-all hover:scale-105 hover:border-primary hover:shadow-2xl">
                  <div className="absolute right-4 top-4 rounded-full bg-primary/20 p-3">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-foreground">{t.hero.ctaLandowner}</h3>
                  <p className="mb-6 text-muted-foreground">Monetiza tu terreno con proyectos de energía renovable</p>
                  <Button className="w-full bg-primary hover:bg-primary/90 group-hover:gap-3">
                    Comenzar
                    <ArrowRight className="ml-2 h-5 w-5 transition-all group-hover:translate-x-1" />
                  </Button>
                </div>
              </Link>

              {/* Promotor Card */}
              <Link href="/login/promotor">
                <div className="group relative overflow-hidden rounded-2xl border-2 border-secondary/20 bg-gradient-to-br from-secondary/10 to-secondary/5 p-8 shadow-xl transition-all hover:scale-105 hover:border-secondary hover:shadow-2xl">
                  <div className="absolute right-4 top-4 rounded-full bg-secondary/20 p-3">
                    <Zap className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-foreground">{t.hero.ctaDeveloper}</h3>
                  <p className="mb-6 text-muted-foreground">Encuentra terrenos ideales para tus proyectos renovables</p>
                  <Button className="w-full bg-secondary hover:bg-secondary/90 group-hover:gap-3">
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
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
    </section>
  )
}
