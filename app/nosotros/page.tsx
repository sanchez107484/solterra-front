"use client"

import StandardLayout from "@/components/layouts/StandardLayout"
import { PageHero } from "@/components/shared/page-hero"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTranslations } from "@/i18n/i18nContext"
import { Award, Building2, CheckCircle2, Leaf, Lightbulb, Shield, Sparkles, Target, TrendingUp, Users } from "lucide-react"
import Head from "next/head"
import Link from "next/link"

export default function Nosotros() {
    const { t } = useTranslations()

    return (
        <StandardLayout>
            <Head>
                <title>Sobre Solterra Advisory - Plataforma Líder en Energía Renovable | Solar y Eólica España</title>
                <meta
                    name="description"
                    content="Conectamos propietarios de terrenos rurales con promotores de energía renovable. Transparencia, eficiencia y sostenibilidad en proyectos solares y eólicos en España."
                />
                <meta
                    name="keywords"
                    content="energía renovable, terrenos solares, proyectos eólicos, plataforma energética, sostenibilidad, transición energética"
                />
            </Head>

            {/* Hero Section */}
            <PageHero
                title={t?.about?.hero?.title || "Sobre Solterra Advisory"}
                subtitle={
                    t?.about?.hero?.subtitle || "Impulsamos la transición energética conectando terrenos con proyectos de energía renovable"
                }
            />

            {/* Misión */}
            <section className="bg-background px-6 py-20">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div className="order-2 lg:order-1">
                            <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
                                <Sparkles className="h-4 w-4" />
                                {t?.about?.mission?.badge || "Nuestra Misión"}
                            </div>
                            <h2 className="mb-6 text-4xl leading-tight font-bold md:text-5xl">
                                {t?.about?.mission?.title || "Acelerar la transición hacia energías limpias"}
                            </h2>
                            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                                {t?.about?.mission?.p1 ||
                                    "En Solterra Advisory creemos que la energía renovable es el futuro. Nuestra misión es facilitar el desarrollo de proyectos solares y eólicos conectando a propietarios de terrenos rurales con promotores especializados."}
                            </p>
                            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                                {t?.about?.mission?.p2 ||
                                    "Eliminamos las barreras tradicionales del sector, haciendo que el proceso sea transparente, eficiente y beneficioso para todas las partes involucradas."}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link href="/login/propietario">
                                    <Button size="lg" className="gap-2">
                                        <Leaf className="h-5 w-5" />
                                        {t?.about?.mission?.ownerButton || "Soy Propietario"}
                                    </Button>
                                </Link>
                                <Link href="/login/promotor">
                                    <Button size="lg" variant="outline" className="gap-2">
                                        <Building2 className="h-5 w-5" />
                                        {t?.about?.mission?.promoterButton || "Soy Promotor"}
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <Card className="from-primary/5 via-secondary/5 to-accent/5 group relative order-1 overflow-hidden border-2 bg-gradient-to-br p-8 shadow-xl transition-all hover:shadow-2xl lg:order-2">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.1),transparent_50%)]" />
                            <div className="relative space-y-2">
                                <h3 className="mb-6 text-center text-2xl font-bold">
                                    {t?.about?.mission?.principles?.title || "Principios que nos guían"}
                                </h3>
                                <div className="flex items-start gap-4 transition-transform hover:translate-x-2">
                                    <div className="bg-primary/10 ring-primary/10 shrink-0 rounded-xl p-3 shadow-lg ring-2">
                                        <Target className="text-primary h-8 w-8" />
                                    </div>
                                    <div>
                                        <h4 className="mb-2 text-xl font-bold">
                                            {t?.about?.mission?.principles?.accessibility?.title || "Accesibilidad"}
                                        </h4>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {t?.about?.mission?.principles?.accessibility?.desc ||
                                                "Democratizamos el acceso a proyectos de energía renovable para todos los propietarios."}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 transition-transform hover:translate-x-2">
                                    <div className="bg-secondary/10 ring-secondary/10 shrink-0 rounded-xl p-3 shadow-lg ring-2">
                                        <Lightbulb className="text-secondary h-8 w-8" />
                                    </div>
                                    <div>
                                        <h4 className="mb-2 text-xl font-bold">
                                            {t?.about?.mission?.principles?.innovation?.title || "Innovación"}
                                        </h4>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {t?.about?.mission?.principles?.innovation?.desc ||
                                                "Desarrollamos tecnología de matching inteligente que conecta terrenos con proyectos ideales."}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 transition-transform hover:translate-x-2">
                                    <div className="bg-accent/10 ring-accent/10 shrink-0 rounded-xl p-3 shadow-lg ring-2">
                                        <Shield className="text-accent h-8 w-8" />
                                    </div>
                                    <div>
                                        <h4 className="mb-2 text-xl font-bold">
                                            {t?.about?.mission?.principles?.impact?.title || "Impacto positivo"}
                                        </h4>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {t?.about?.mission?.principles?.impact?.desc ||
                                                "Cada proyecto contribuye al desarrollo económico rural y a los objetivos climáticos de España."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Valores */}
            <section className="from-primary/5 via-background to-secondary/5 bg-gradient-to-br px-6 py-20">
                <div className="container mx-auto max-w-6xl">
                    <div className="mb-16 text-center">
                        <div className="bg-primary/10 text-primary mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
                            <Award className="h-4 w-4" />
                            {t?.about?.values?.badge || "Por qué elegirnos"}
                        </div>
                        <h2 className="mb-4 text-4xl font-bold md:text-5xl">{t?.about?.values?.title || "Nuestros valores"}</h2>
                        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                            {t?.about?.values?.subtitle || "Comprometidos con la excelencia y la sostenibilidad"}
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <Card className="group bg-background relative overflow-hidden border-2 p-8 text-center shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
                            <div className="from-primary/0 to-primary/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                                <div className="bg-primary/10 ring-primary/20 group-hover:ring-primary/40 mx-auto mb-6 w-fit rounded-full p-4 ring-4 transition-all group-hover:scale-110">
                                    <Award className="text-primary h-10 w-10" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold">{t?.about?.values?.trust?.title || "Confianza"}</h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {t?.about?.values?.trust?.desc ||
                                        "Construimos relaciones duraderas basadas en la honestidad y la transparencia en cada interacción."}
                                </p>
                                <div className="text-primary flex items-center justify-center gap-2 text-sm font-semibold">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span>{t?.about?.values?.trust?.badge || "Relaciones sólidas"}</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="group bg-background relative overflow-hidden border-2 p-8 text-center shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
                            <div className="from-secondary/0 to-secondary/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                                <div className="bg-secondary/10 ring-secondary/20 group-hover:ring-secondary/40 mx-auto mb-6 w-fit rounded-full p-4 ring-4 transition-all group-hover:scale-110">
                                    <TrendingUp className="text-secondary h-10 w-10" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold">{t?.about?.values?.excellence?.title || "Excelencia"}</h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {t?.about?.values?.excellence?.desc ||
                                        "Buscamos la mejora continua en cada aspecto de nuestro servicio y plataforma."}
                                </p>
                                <div className="text-secondary flex items-center justify-center gap-2 text-sm font-semibold">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span>{t?.about?.values?.excellence?.badge || "Calidad superior"}</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="group bg-background relative overflow-hidden border-2 p-8 text-center shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
                            <div className="from-accent/0 to-accent/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                                <div className="bg-accent/10 ring-accent/20 group-hover:ring-accent/40 mx-auto mb-6 w-fit rounded-full p-4 ring-4 transition-all group-hover:scale-110">
                                    <Users className="text-accent h-10 w-10" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold">{t?.about?.values?.collaboration?.title || "Colaboración"}</h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {t?.about?.values?.collaboration?.desc ||
                                        "Creemos en el trabajo conjunto entre todas las partes para lograr el máximo impacto."}
                                </p>
                                <div className="text-accent flex items-center justify-center gap-2 text-sm font-semibold">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span>{t?.about?.values?.collaboration?.badge || "Juntos crecemos"}</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
        </StandardLayout>
    )
}
