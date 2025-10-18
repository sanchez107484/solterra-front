"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, Handshake, Search, UserPlus } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "../../i18n/i18nContext"

interface SplitProps {
    showCTA?: boolean
    compactMode?: boolean
}

export function SeccionComoFuncionaSplit({ showCTA = true, compactMode = false }: SplitProps) {
    const sectionPadding = compactMode ? "py-8" : "py-16"
    const titleSize = compactMode ? "text-2xl" : "text-3xl"
    const subtitleSize = compactMode ? "text-base" : "text-lg"
    const { t } = useTranslations()

    const propietarios = [
        {
            icon: UserPlus,
            step: "PASO 1",
            title: "Regístrate gratis",
            description: "Crea tu cuenta como propietario en menos de 2 minutos. Sin costes ni compromisos.",
        },
        {
            icon: FileText,
            step: "PASO 2",
            title: "Lista tu terreno",
            description: "Añade información sobre tu propiedad: ubicación, superficie, características.",
        },
        {
            icon: Search,
            step: "PASO 3",
            title: "Recibe propuestas",
            description: "Los promotores interesados contactarán contigo. Compara ofertas y elige la mejor opción.",
        },
        {
            icon: Handshake,
            step: "PASO 4",
            title: "Cierra el acuerdo",
            description: "Firma el contrato y comienza a generar ingresos pasivos durante 20-25 años.",
        },
    ]

    const promotores = [
        {
            icon: UserPlus,
            step: "PASO 1",
            title: "Regístrate como promotor",
            description: "Crea tu perfil empresarial y accede a nuestra base de datos de terrenos disponibles.",
        },
        {
            icon: FileText,
            step: "PASO 2",
            title: "Define tu proyecto",
            description: "Especifica tipo de energía, capacidad, ubicación preferida y requisitos técnicos.",
        },
        {
            icon: Search,
            step: "PASO 3",
            title: "Recibe matches",
            description: "Nuestro algoritmo te mostrará terrenos compatibles con tu proyecto. Analiza y compara opciones.",
        },
        {
            icon: Handshake,
            step: "PASO 4",
            title: "Contacta y negocia",
            description: "Comunícate directamente con propietarios y cierra acuerdos de forma ágil y transparente.",
        },
    ]

    return (
        <section className={`bg-background px-4 ${sectionPadding}`}>
            <div className="container mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                    <h2 className={`mb-4 ${titleSize} font-bold`}>{t.howItWorks?.title}</h2>
                    <p className={`text-muted-foreground mx-auto max-w-2xl ${subtitleSize}`}>{t.howItWorks?.quick?.subtitle}</p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* Izquierda: Propietarios */}
                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold">
                                {t.howItWorks?.landowners?.title}
                            </div>
                        </div>

                        <div className="space-y-6">
                            {propietarios.map((p, i) => {
                                const Icon = p.icon
                                return (
                                    <Card key={i} className="border-2 p-6 transition-shadow hover:shadow-lg">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-primary/10 shrink-0 rounded-lg p-3">
                                                <Icon className="text-primary h-6 w-6" />
                                            </div>
                                            <div>
                                                <div className="text-primary mb-1 text-sm font-semibold">{p.step}</div>
                                                <h4 className="mb-2 text-lg font-semibold">{p.title}</h4>
                                                <p className="text-muted-foreground text-sm">{p.description}</p>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })}

                            {showCTA && (
                                <div className="mt-4 text-center">
                                    <Link href="/login/propietario">
                                        <Button className="bg-primary hover:bg-primary/90 h-12 px-6">{t.cta?.landowner}</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Derecha: Promotores */}
                    <div>
                        <div className="mb-6 flex items-center justify-end gap-3 md:justify-start">
                            <div className="bg-secondary/10 text-secondary inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold">
                                {t.howItWorks?.developers?.title}
                            </div>
                        </div>

                        <div className="space-y-6">
                            {promotores.map((p, i) => {
                                const Icon = p.icon
                                return (
                                    <Card key={i} className="border-2 p-6 transition-shadow hover:shadow-lg">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-secondary/10 shrink-0 rounded-lg p-3">
                                                <Icon className="text-secondary h-6 w-6" />
                                            </div>
                                            <div>
                                                <div className="text-secondary mb-1 text-sm font-semibold">{p.step}</div>
                                                <h4 className="mb-2 text-lg font-semibold">{p.title}</h4>
                                                <p className="text-muted-foreground text-sm">{p.description}</p>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })}

                            {showCTA && (
                                <div className="mt-4 text-center md:text-right">
                                    <Link href="/login/promotor">
                                        <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 px-6">
                                            {t.cta?.developer}
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
