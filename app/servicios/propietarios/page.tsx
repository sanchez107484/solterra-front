"use client"

import StandardLayout from "@/components/layouts/StandardLayout"
import { ServiceSchema } from "@/components/seo/ServiceSchema"
import ProcessStepCard from "@/components/services/ProcessStepCard"
import ServiceBenefitCard from "@/components/services/ServiceBenefitCard"
import ServicesShowcase from "@/components/services/ServicesShowcase"
import ValueCard from "@/components/services/ValueCard"
import { FAQList } from "@/components/shared/faq-item"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Clock, Euro, FileCheck, Handshake, Landmark, Search, Shield, TrendingUp, Users, Zap } from "lucide-react"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ServiciosPropietariosPage() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <StandardLayout>
            <Head>
                <title>Vender o Alquilar Terreno para Placas Solares y Parques Eólicos | Solterra</title>
                <meta
                    name="description"
                    content="Descubre cuánto vale tu terreno para energía solar o eólica. Validación técnica gratuita y exhaustiva, conexión con promotores verificados y acompañamiento legal. Sin coste hasta el cierre."
                />
                <meta
                    name="keywords"
                    content="vender terreno placas solares, alquilar terreno energía solar, valoración terreno fotovoltaico, cuánto pagan por terreno renovables, arrendamiento suelo eólico"
                />
                <link rel="canonical" href="https://solterra.es/servicios/propietarios" />
            </Head>

            <ServiceSchema
                name="Servicios para Propietarios de Terrenos Rústicos - Energía Renovable"
                description="Validación técnica gratuita de terrenos para proyectos de energía solar y eólica. Conectamos propietarios con promotores verificados. Acompañamiento legal completo desde la valoración hasta el cierre del contrato de arrendamiento o compraventa."
                serviceType="Land Validation, Valuation and Real Estate Advisory for Renewable Energy"
                areaServed="ES"
                offers={{
                    price: "0",
                    priceCurrency: "EUR",
                    description: "Sin coste hasta que se cierra el acuerdo de arrendamiento o compraventa",
                }}
            />

            {/* Hero Section */}
            <section className="from-primary/10 via-primary/5 to-background relative overflow-hidden bg-gradient-to-br py-20 md:py-32">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(89,165,44,0.1),transparent_50%)]" />
                <div className="relative container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        {/* Badge */}
                        <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
                            <Landmark className="h-4 w-4" />
                            Para Propietarios de Terrenos Rústicos
                        </div>

                        {/* Main Title - H1 SEO optimizado */}
                        <h1 className="text-foreground mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                            ¿Cuánto vale tu terreno para energía solar o eólica?
                        </h1>

                        {/* Subtitle */}
                        <p className="text-muted-foreground mb-8 text-lg md:text-xl">
                            Regístrate en nuestro marketplace, da de alta tu terreno y recibe una validación técnica exhaustiva gratuita.
                            Conectamos propietarios con promotores verificados. Sin coste hasta que firmes.
                        </p>

                        {/* Value Props compactas */}
                        <div className="mb-8 flex flex-wrap justify-center gap-6 text-sm md:text-base">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary h-5 w-5 flex-shrink-0" />
                                <span className="text-foreground font-medium">100% Gratuito</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary h-5 w-5 flex-shrink-0" />
                                <span className="text-foreground font-medium">Validación exhaustiva</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary h-5 w-5 flex-shrink-0" />
                                <span className="text-foreground font-medium">Sin exclusivas opacas</span>
                            </div>
                        </div>

                        {/* CTA Principal */}
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contacto">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 group gap-2 text-base">
                                    <Shield className="h-5 w-5" />
                                    Validar mi terreno gratis
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link href="/servicios/validacion-tecnica-terreno">
                                <Button size="lg" variant="outline" className="gap-2 text-base">
                                    <FileCheck className="h-5 w-5" />
                                    Cómo funciona la validación
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección: Cómo Funciona (Paso a Paso) */}
            <section className="from-background to-primary/5 bg-gradient-to-b py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
                            Cómo vender o alquilar tu terreno para renovables
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Proceso transparente y sin complicaciones. Solo pagas comisión cuando cierres el contrato de arrendamiento o
                            compraventa.
                        </p>
                    </div>

                    {/* Proceso en 4 pasos - Cards horizontales */}
                    <div className="mx-auto max-w-5xl space-y-6">
                        <ProcessStepCard
                            stepNumber={1}
                            title="Regístrate y da de alta tu terreno"
                            description="Crea tu cuenta como propietario en nuestro marketplace y publica tu terreno con datos básicos: ubicación, superficie y referencia catastral. El proceso es rápido y sencillo."
                            icon={Search}
                            userType="propietarios"
                        />

                        <ProcessStepCard
                            stepNumber={2}
                            title="Validación técnica exhaustiva gratuita"
                            description="Analizamos en profundidad la viabilidad solar/eólica, distancia a subestaciones, topografía, regulación urbanística y limitaciones ambientales. Recibirás un informe detallado por correo electrónico con valoración de mercado."
                            icon={FileCheck}
                            userType="propietarios"
                        />

                        <ProcessStepCard
                            stepNumber={3}
                            title="Te conectamos con promotores verificados"
                            description="Si tu terreno es viable, lo presentamos a promotores de energía solar y eólica interesados en tu zona. Actuamos como intermediarios profesionales para facilitar el proceso y proteger tus intereses."
                            icon={Users}
                            userType="propietarios"
                        />

                        <ProcessStepCard
                            stepNumber={4}
                            title="Intermediación profesional hasta el cierre"
                            description="Coordinamos con todas las partes (promotor, notario, asesores), facilitamos la negociación de condiciones y te acompañamos hasta la firma. Solo cobramos comisión cuando tú cobres."
                            icon={Handshake}
                            userType="propietarios"
                        />
                    </div>
                </div>
            </section>

            {/* Sección: Servicios Incluidos (Cards estilo beneficios) */}
            <section className="bg-primary/5 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
                            Todo lo que incluye nuestro servicio para propietarios
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Desde la primera consulta hasta la firma del contrato, te acompañamos en cada paso sin coste inicial.
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <ServiceBenefitCard
                            icon={Shield}
                            title="Validación técnica completa"
                            description="Análisis de viabilidad solar/eólica, distancia a red eléctrica, topografía, normativa urbanística y limitaciones ambientales."
                            badgeText="100% Gratuito"
                            userType="propietarios"
                        />

                        <ServiceBenefitCard
                            icon={TrendingUp}
                            title="Valoración real de mercado"
                            description="Estimación realista de ingresos por arrendamiento o precio de venta basada en proyectos comparables y condiciones actuales del mercado renovable."
                            badgeText="Datos reales"
                            userType="propietarios"
                        />

                        <ServiceBenefitCard
                            icon={Users}
                            title="Matching con promotores"
                            description="Conexión con promotores verificados interesados en tu zona a través de nuestra intermediación profesional. Facilitamos el contacto y gestionamos el proceso para proteger tus intereses."
                            badgeText="Transparente"
                            userType="propietarios"
                        />

                        <ServiceBenefitCard
                            icon={Handshake}
                            title="Negociación y asesoramiento"
                            description="Te acompañamos en la negociación de condiciones: duración del contrato, precio, garantías, cláusulas de rescisión y obligaciones de ambas partes."
                            badgeText="Expertos"
                            userType="propietarios"
                        />

                        <ServiceBenefitCard
                            icon={FileCheck}
                            title="Análisis de propuestas contractuales"
                            description="Revisamos junto contigo las propuestas de los promotores, identificamos puntos críticos y te sugerimos aspectos a negociar. Recomendamos asesoramiento jurídico independiente para la firma final."
                            badgeText="Acompañamiento experto"
                            userType="propietarios"
                        />

                        <ServiceBenefitCard
                            icon={Zap}
                            title="Seguimiento hasta el cierre"
                            description="Coordinación con todas las partes (promotor, notario, registro) hasta la firma definitiva. Solo cobramos cuando tú cobres."
                            badgeText="Sin riesgo"
                            userType="propietarios"
                        />
                    </div>
                </div>
            </section>

            {/* Sección: Por Qué Elegirnos (Valores estilo nosotros) */}
            <section className="from-background to-primary/5 bg-gradient-to-b py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">Por qué confiar tu terreno a Solterra</h2>
                        <p className="text-muted-foreground text-lg">
                            No somos intermediarios tradicionales. Nuestro modelo solo funciona cuando tú cierras tu acuerdo.
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
                        <ValueCard
                            icon={Euro}
                            title="Sin coste inicial"
                            description="0€ hasta que firmes el contrato. Solo cobramos comisión cuando tú cobres tu primer pago del promotor. Intereses completamente alineados."
                            bottomText="Sin riesgo para ti"
                            userType="propietarios"
                        />

                        <ValueCard
                            icon={Shield}
                            title="Total transparencia"
                            description="Sin exclusivas opacas ni cláusulas leoninas. Sabes en todo momento qué promotores están interesados y las condiciones que ofrecen."
                            bottomText="Control total"
                            userType="propietarios"
                        />

                        <ValueCard
                            icon={Clock}
                            title="Rapidez y eficiencia"
                            description="Validación técnica exhaustiva y profesional. Conexión inmediata con promotores que buscan activamente en tu zona."
                            bottomText="Ahorra tiempo"
                            userType="propietarios"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Final Section */}
            <section className="from-primary/10 via-background to-primary/10 bg-gradient-to-r py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-foreground mb-6 text-3xl font-bold md:text-4xl">
                            ¿Quieres saber si tu terreno es rentable para renovables?
                        </h2>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Validación técnica exhaustiva y gratuita. Sin compromiso, sin coste hasta que cierres. Descubre el valor real de
                            tu terreno.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contacto">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2 text-base">
                                    <Shield className="h-5 w-5" />
                                    Validar mi terreno ahora
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/servicios/validacion-tecnica-terreno">
                                <Button size="lg" variant="outline" className="gap-2 text-base">
                                    <FileCheck className="h-5 w-5" />
                                    Más info sobre validación técnica
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interlinks a otros servicios */}
            <ServicesShowcase
                title="Nuestros servicios para el sector renovable"
                subtitle="Conectamos propietarios de terrenos rústicos con promotores de energía renovable"
                background="white"
            />

            {/* FAQ */}
            <section className="bg-primary/5 py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl">
                        <FAQList
                            faqs={[
                                {
                                    question: "¿Cómo registro mi terreno en el marketplace?",
                                    answer: "El proceso es muy sencillo: crea tu cuenta como propietario, completa el formulario con los datos de tu terreno (ubicación, superficie, referencia catastral) y nosotros nos encargamos del resto. Realizaremos la validación técnica exhaustiva y te enviaremos un informe completo por email.",
                                },
                                {
                                    question: "¿Cuánto pagan por arrendar un terreno para placas solares?",
                                    answer: "Depende de la ubicación, tamaño y viabilidad técnica. En general, el arrendamiento oscila entre 1.000€ y 3.000€ por hectárea y año en proyectos solares. En eólicos puede ser mayor. Te proporcionamos una valoración realista tras la validación técnica.",
                                },
                                {
                                    question: "¿Qué requisitos debe cumplir mi terreno?",
                                    answer: "Mínimo 1-2 hectáreas, suelo rústico o agrícola, proximidad razonable a red eléctrica (generalmente <10km a subestación), sin restricciones ambientales graves. La validación técnica determina la viabilidad exacta de tu terreno.",
                                },
                                {
                                    question: "¿Cuándo empiezo a cobrar?",
                                    answer: 'Depende del acuerdo con el promotor. Lo habitual es un pago inicial al firmar el contrato de arrendamiento ("prima de firma"), seguido de pagos anuales una vez el parque esté operativo. Los contratos suelen ser de 25-30 años con revisión anual según IPC.',
                                },
                            ]}
                        />
                    </div>
                </div>
            </section>
        </StandardLayout>
    )
}
