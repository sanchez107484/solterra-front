import { Card } from "@/components/ui/card"
import { UserPlus, FileText, Search, Handshake } from "lucide-react"
import type { translations } from "@/lib/i18n"

type Translations = typeof translations.es

export function SeccionComoFunciona({ t }: { t: Translations }) {
  const pasos = [
    {
      icon: UserPlus,
      number: "01",
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Description,
      color: "primary",
    },
    {
      icon: FileText,
      number: "02",
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Description,
      color: "secondary",
    },
    {
      icon: Search,
      number: "03",
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Description,
      color: "accent",
    },
    {
      icon: Handshake,
      number: "04",
      title: t.howItWorks.step4Title,
      description: t.howItWorks.step4Description,
      color: "primary",
    },
  ]

  return (
    <section className="bg-muted/30 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">{t.howItWorks.title}</h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">Un proceso simple y transparente en 4 pasos</p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 bg-gradient-to-b from-primary via-secondary to-primary md:block" />

          <div className="space-y-12">
            {pasos.map((paso, index) => {
              const Icon = paso.icon
              const isEven = index % 2 === 0

              return (
                <div
                  key={index}
                  className={`flex items-center gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <Card className="group relative overflow-hidden border-2 p-8 transition-all hover:scale-105 hover:shadow-2xl">
                      <div className={`mb-4 flex items-center gap-4 ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}>
                        <span className="text-6xl font-bold text-primary/20">{paso.number}</span>
                        <div className={`rounded-2xl bg-${paso.color}/20 p-4`}>
                          <Icon className={`h-8 w-8 text-${paso.color}`} />
                        </div>
                      </div>
                      <h3 className="mb-3 text-2xl font-bold text-foreground">{paso.title}</h3>
                      <p className="text-lg text-muted-foreground">{paso.description}</p>
                    </Card>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:block">
                    <div className={`h-6 w-6 rounded-full border-4 border-background bg-${paso.color} shadow-lg`} />
                  </div>

                  {/* Spacer */}
                  <div className="hidden flex-1 md:block" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
