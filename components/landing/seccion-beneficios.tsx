import { Card } from "@/components/ui/card"
import { Clock, Leaf, MapPin, Shield, TrendingUp, Users } from "lucide-react"
import { useTranslations } from "../../i18n/i18nContext"

export function SeccionBeneficios() {
    const { t } = useTranslations()
    const beneficiosPropietarios = [
        {
            icon: TrendingUp,
            title: t.benefits?.landowners?.benefit1,
            description: t.benefits?.landowners?.benefit1Desc2,
            color: "primary",
        },
        {
            icon: Leaf,
            title: t.benefits?.landowners?.benefit2,
            description: t.benefits?.landowners?.benefit2Desc,
            color: "primary",
        },
        {
            icon: Shield,
            title: t.benefits?.landowners?.benefit3,
            description: t.benefits?.landowners?.benefit3Desc,
            color: "primary",
        },
    ]

    const beneficiosPromotores = [
        {
            icon: MapPin,
            title: t.benefits?.developers?.benefit1,
            description: t.benefits?.developers?.benefit1Desc2,
            color: "secondary",
        },
        {
            icon: Clock,
            title: t.benefits?.developers?.benefit2,
            description: t.benefits?.developers?.benefit2Desc,
            color: "secondary",
        },
        {
            icon: Users,
            title: t.benefits?.developers?.benefit3,
            description: t.benefits?.developers?.benefit3Desc,
            color: "secondary",
        },
    ]

    return (
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">{t.benefits?.title}</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-xl">{t.benefits?.subtitle}</p>
                </div>

                {/* Beneficios Propietarios */}
                <div className="mb-20">
                    <h3 className="text-primary mb-8 text-center text-3xl font-bold">{t.benefits?.landowners?.title}</h3>
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {beneficiosPropietarios.map((beneficio, index) => {
                            const Icon = beneficio.icon
                            const isPrimary = beneficio.color === "primary"
                            const bgClass = isPrimary ? "bg-primary/20" : "bg-secondary/20"
                            const accent = isPrimary ? "primary" : "secondary"
                            return (
                                <Card
                                    key={index}
                                    tabIndex={0}
                                    role="group"
                                    aria-labelledby={`beneficio-propietario-${index}`}
                                    className={`group relative overflow-hidden p-6 transition-transform duration-200 ease-out hover:scale-[1.03] focus:outline-none focus-visible:ring sm:p-8 focus-visible:ring-${accent}/30 border ${isPrimary ? "border-primary/20" : "border-primary/0"} bg-gradient-to-br from-transparent to-transparent shadow-sm`}
                                >
                                    <div className={`${bgClass} mb-4 inline-flex items-center gap-3 rounded-2xl p-2 sm:p-3`}>
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/0">
                                            <Icon
                                                className={`h-5 w-5 text-${accent} transition-transform group-hover:scale-110`}
                                                aria-hidden
                                            />
                                        </div>
                                        <h4
                                            id={`beneficio-propietario-${index}`}
                                            className="text-foreground m-0 text-base leading-tight font-semibold"
                                        >
                                            {beneficio.title}
                                        </h4>
                                    </div>
                                    <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">{beneficio.description}</p>
                                    <div
                                        className={`absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28 bg-${accent}/10`}
                                        aria-hidden
                                    />
                                </Card>
                            )
                        })}
                    </div>
                </div>

                {/* Beneficios Promotores */}
                <div>
                    <h3 className="text-secondary mb-8 text-center text-3xl font-bold">{t.benefits?.developers?.title}</h3>
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {beneficiosPromotores.map((beneficio, index) => {
                            const Icon = beneficio.icon
                            const isPrimary = beneficio.color === "primary"
                            const bgClass = isPrimary ? "bg-primary/20" : "bg-secondary/20"
                            const accent = isPrimary ? "primary" : "secondary"
                            return (
                                <Card
                                    key={index}
                                    tabIndex={0}
                                    role="group"
                                    aria-labelledby={`beneficio-promotor-${index}`}
                                    className={`group relative overflow-hidden p-6 transition-transform duration-200 ease-out hover:scale-[1.03] focus:outline-none focus-visible:ring sm:p-8 focus-visible:ring-${accent}/30 border ${isPrimary ? "border-primary/20" : "border-secondary/20"} bg-gradient-to-br from-transparent to-transparent shadow-sm`}
                                >
                                    <div className={`${bgClass} mb-4 inline-flex items-center gap-3 rounded-2xl p-2 sm:p-3`}>
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/0">
                                            <Icon
                                                className={`h-5 w-5 text-${accent}-foreground transition-transform group-hover:scale-110`}
                                                aria-hidden
                                            />
                                        </div>
                                        <h4
                                            id={`beneficio-promotor-${index}`}
                                            className="text-foreground m-0 text-base leading-tight font-semibold"
                                        >
                                            {beneficio.title}
                                        </h4>
                                    </div>
                                    <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">{beneficio.description}</p>
                                    <div
                                        className={`absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28 bg-${accent}/10`}
                                        aria-hidden
                                    />
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
