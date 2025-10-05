import { Card } from "@/components/ui/card"
import { Leaf, TrendingUp, Shield, Clock, MapPin, Users } from "lucide-react"
import type { translations } from "@/lib/i18n"

type Translations = typeof translations.es

export function SeccionBeneficios({ t }: { t: Translations }) {
  const beneficiosPropietarios = [
    {
      icon: TrendingUp,
      title: "Ingresos Pasivos",
      description: "Genera ingresos constantes arrendando tu terreno para proyectos renovables",
      color: "primary",
    },
    {
      icon: Leaf,
      title: "Impacto Sostenible",
      description: "Contribuye a la transición energética y al cuidado del medio ambiente",
      color: "primary",
    },
    {
      icon: Shield,
      title: "Proceso Seguro",
      description: "Verificación KYC y contratos legales que protegen tus intereses",
      color: "primary",
    },
  ]

  const beneficiosPromotores = [
    {
      icon: MapPin,
      title: "Terrenos Verificados",
      description: "Accede a terrenos pre-evaluados con datos geoespaciales precisos",
      color: "secondary",
    },
    {
      icon: Clock,
      title: "Ahorra Tiempo",
      description: "Encuentra terrenos ideales en minutos con nuestro algoritmo de matching",
      color: "secondary",
    },
    {
      icon: Users,
      title: "Conexión Directa",
      description: "Comunícate directamente con propietarios interesados en tu proyecto",
      color: "secondary",
    },
  ]

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">{t.benefits.title}</h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Conectamos propietarios y promotores para impulsar la energía renovable
          </p>
        </div>

        {/* Beneficios Propietarios */}
        <div className="mb-20">
          <h3 className="mb-8 text-center text-3xl font-bold text-primary">{t.benefits.landownerTitle}</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {beneficiosPropietarios.map((beneficio, index) => {
              const Icon = beneficio.icon
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-8 transition-all hover:scale-105 hover:border-primary hover:shadow-xl"
                >
                  <div className="mb-6 inline-flex rounded-2xl bg-primary/20 p-4">
                    <Icon className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                  </div>
                  <h4 className="mb-3 text-xl font-bold text-foreground">{beneficio.title}</h4>
                  <p className="text-muted-foreground">{beneficio.description}</p>
                  <div className="absolute bottom-0 right-0 h-24 w-24 rounded-tl-full bg-primary/10 transition-all group-hover:h-32 group-hover:w-32" />
                </Card>
              )
            })}
          </div>
        </div>

        {/* Beneficios Promotores */}
        <div>
          <h3 className="mb-8 text-center text-3xl font-bold text-secondary">{t.benefits.developerTitle}</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {beneficiosPromotores.map((beneficio, index) => {
              const Icon = beneficio.icon
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-secondary/20 bg-gradient-to-br from-secondary/5 to-transparent p-8 transition-all hover:scale-105 hover:border-secondary hover:shadow-xl"
                >
                  <div className="mb-6 inline-flex rounded-2xl bg-secondary/20 p-4">
                    <Icon className="h-8 w-8 text-secondary transition-transform group-hover:scale-110" />
                  </div>
                  <h4 className="mb-3 text-xl font-bold text-foreground">{beneficio.title}</h4>
                  <p className="text-muted-foreground">{beneficio.description}</p>
                  <div className="absolute bottom-0 right-0 h-24 w-24 rounded-tl-full bg-secondary/10 transition-all group-hover:h-32 group-hover:w-32" />
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
