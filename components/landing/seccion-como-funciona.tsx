"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTranslations } from "@/i18n/i18nContext"
import { FileText, Handshake, Search, TrendingUp, UserPlus } from "lucide-react"
import Link from "next/link"

interface SeccionComoFuncionaProps {
    showCTA?: boolean
    compactMode?: boolean
}

export function SeccionComoFunciona({ showCTA = true, compactMode = false }: SeccionComoFuncionaProps) {
    const sectionPadding = compactMode ? "py-12" : "py-20"
    const titleSize = compactMode ? "text-3xl" : "text-4xl"
    const subtitleSize = compactMode ? "text-lg" : "text-xl"
    const { t } = useTranslations()

    return (
        <section className="py-20 md:py-12">
            <div className="text-center">
                <h2 className="text-foreground text-4xl font-bold md:text-5xl">¿Cómo Funciona?</h2>
                {/* <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                    Conectamos propietarios y promotores para impulsar la energía renovable
                </p> */}
            </div>
            {/* Para Propietarios */}
            <section className={`bg-background px-6 ${sectionPadding}`}>
                <div className="container mx-auto max-w-6xl">
                    <div className="mb-16 text-center">
                        <div className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold">
                            Para Propietarios
                        </div>
                        <h2 className={`mb-4 ${titleSize} font-bold`}>Monetiza tu terreno en 4 pasos</h2>
                        <p className={`text-muted-foreground mx-auto max-w-2xl ${subtitleSize}`}>
                            Genera ingresos pasivos mientras contribuyes a un futuro sostenible
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        <Card className="border-2 p-8 transition-shadow hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 shrink-0 rounded-xl p-3">
                                    <UserPlus className="text-primary h-8 w-8" />
                                </div>
                                <div>
                                    <div className="text-primary mb-2 text-sm font-semibold">PASO 1</div>
                                    <h3 className="mb-3 text-2xl font-bold">Regístrate gratis</h3>
                                    <p className="text-muted-foreground">
                                        Crea tu cuenta como propietario en menos de 2 minutos. Sin costes ni compromisos.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-2 p-8 transition-shadow hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 shrink-0 rounded-xl p-3">
                                    <FileText className="text-primary h-8 w-8" />
                                </div>
                                <div>
                                    <div className="text-primary mb-2 text-sm font-semibold">PASO 2</div>
                                    <h3 className="mb-3 text-2xl font-bold">Lista tu terreno</h3>
                                    <p className="text-muted-foreground">
                                        Añade información sobre tu propiedad: ubicación, superficie, características. Nuestro equipo lo
                                        verificará.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-2 p-8 transition-shadow hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 shrink-0 rounded-xl p-3">
                                    <Search className="text-primary h-8 w-8" />
                                </div>
                                <div>
                                    <div className="text-primary mb-2 text-sm font-semibold">PASO 3</div>
                                    <h3 className="mb-3 text-2xl font-bold">Recibe propuestas</h3>
                                    <p className="text-muted-foreground">
                                        Los promotores interesados contactarán contigo. Compara ofertas y elige la mejor opción.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-2 p-8 transition-shadow hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 shrink-0 rounded-xl p-3">
                                    <Handshake className="text-primary h-8 w-8" />
                                </div>
                                <div>
                                    <div className="text-primary mb-2 text-sm font-semibold">PASO 4</div>
                                    <h3 className="mb-3 text-2xl font-bold">Cierra el acuerdo</h3>
                                    <p className="text-muted-foreground">
                                        Firma el contrato y comienza a generar ingresos pasivos durante 20-25 años.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {showCTA && (
                        <div className="mt-12 text-center">
                            <Link href="/login/propietario">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 h-14 px-8 text-lg">
                                    Comenzar como propietario
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Para Promotores */}
            <section className={`from-secondary/5 to-background bg-gradient-to-br px-6 ${sectionPadding}`}>
                <div className="container mx-auto max-w-6xl">
                    <div className="mb-16 text-center">
                        <div className="bg-secondary/10 text-secondary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold">
                            Para Promotores
                        </div>
                        <h2 className={`mb-4 ${titleSize} font-bold`}>Encuentra terrenos ideales en 4 pasos</h2>
                        <p className={`text-muted-foreground mx-auto max-w-2xl ${subtitleSize}`}>
                            Accede a una red de terrenos verificados y acelera tus proyectos
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        <Card className="border-2 p-8 transition-shadow hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary/10 shrink-0 rounded-xl p-3">
                                    <UserPlus className="text-secondary h-8 w-8" />
                                </div>
                                <div>
                                    <div className="text-secondary mb-2 text-sm font-semibold">PASO 1</div>
                                    <h3 className="mb-3 text-2xl font-bold">Regístrate como promotor</h3>
                                    <p className="text-muted-foreground">
                                        Crea tu perfil empresarial y accede a nuestra base de datos de terrenos disponibles.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-2 p-8 transition-shadow hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary/10 shrink-0 rounded-xl p-3">
                                    <FileText className="text-secondary h-8 w-8" />
                                </div>
                                <div>
                                    <div className="text-secondary mb-2 text-sm font-semibold">PASO 2</div>
                                    <h3 className="mb-3 text-2xl font-bold">Define tu proyecto</h3>
                                    <p className="text-muted-foreground">
                                        Especifica tipo de energía, capacidad, ubicación preferida y requisitos técnicos.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-2 p-8 transition-shadow hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary/10 shrink-0 rounded-xl p-3">
                                    <TrendingUp className="text-secondary h-8 w-8" />
                                </div>
                                <div>
                                    <div className="text-secondary mb-2 text-sm font-semibold">PASO 3</div>
                                    <h3 className="mb-3 text-2xl font-bold">Recibe matches</h3>
                                    <p className="text-muted-foreground">
                                        Nuestro algoritmo te mostrará terrenos compatibles con tu proyecto. Analiza y compara opciones.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-2 p-8 transition-shadow hover:shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary/10 shrink-0 rounded-xl p-3">
                                    <Handshake className="text-secondary h-8 w-8" />
                                </div>
                                <div>
                                    <div className="text-secondary mb-2 text-sm font-semibold">PASO 4</div>
                                    <h3 className="mb-3 text-2xl font-bold">Contacta y negocia</h3>
                                    <p className="text-muted-foreground">
                                        Comunícate directamente con propietarios y cierra acuerdos de forma ágil y transparente.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {showCTA && (
                        <div className="mt-12 text-center">
                            <Link href="/login/promotor">
                                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary-foreground h-14 px-8 text-lg">
                                    Comenzar como promotor
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </section>
    )
}
