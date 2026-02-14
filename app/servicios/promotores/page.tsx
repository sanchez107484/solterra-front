"use client"

import StandardLayout from "@/components/layouts/StandardLayout"
import { ServiceSchema } from "@/components/seo/ServiceSchema"
import ProcessStepCard from "@/components/services/ProcessStepCard"
import ServiceBenefitCard from "@/components/services/ServiceBenefitCard"
import ServicesShowcase from "@/components/services/ServicesShowcase"
import ValueCard from "@/components/services/ValueCard"
import { FAQList } from "@/components/shared/faq-item"
import { Button } from "@/components/ui/button"
import {
    ArrowRight,
    BadgeCheck,
    Building2,
    CheckCircle2,
    Clock,
    FileSearch,
    Filter,
    Handshake,
    MapPin,
    Package,
    Search,
    Shield,
    Target,
    Users,
    Zap,
} from "lucide-react"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ServiciosPromotoresPage() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <StandardLayout>
            <Head>
                <title>Pipeline de Terrenos para Energía Solar y Eólica en España | Solterra</title>
                <meta
                    name="description"
                    content="Acceso inmediato a marketplace de terrenos pre-validados para proyectos fotovoltaicos y eólicos. Packs estratégicos, intermediación profesional, control de calidad exhaustivo. Ahorra meses en desarrollo."
                />
                <meta
                    name="keywords"
                    content="pipeline terrenos renovables españa, terrenos energía solar promotores, prospección suelo fotovoltaico, cartera terrenos eólicos, origination solar"
                />
                <link rel="canonical" href="https://solterra.es/servicios/promotores" />
            </Head>

            <ServiceSchema
                name="Servicios para Promotores de Energía Renovable - Pipeline y Prospección"
                description="Marketplace de terrenos pre-validados para proyectos solares y eólicos. Acceso inmediato a cartera cualificada con intermediación profesional. Packs estratégicos de terrenos y prospección personalizada. Solo aparecen terrenos de calidad con control exhaustivo."
                serviceType="Land Pipeline, Marketplace and Custom Prospection for Renewable Energy Developers"
                areaServed="ES"
            />

            {/* Hero Section */}
            <section className="from-secondary/10 via-secondary/5 to-background relative overflow-hidden bg-gradient-to-br py-20 md:py-32">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(209,154,18,0.1),transparent_50%)]" />
                <div className="relative container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        {/* Badge */}
                        <div className="bg-secondary/10 text-secondary-foreground mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
                            <Building2 className="h-4 w-4" />
                            Para Promotores y Desarrolladores
                        </div>

                        {/* Main Title - H1 SEO optimizado */}
                        <h1 className="text-foreground mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                            Pipeline de terrenos pre-validados para proyectos renovables
                        </h1>

                        {/* Subtitle */}
                        <p className="text-muted-foreground mb-8 text-lg md:text-xl">
                            Acceso inmediato a cartera cualificada de terrenos para energía solar y eólica. Intermediación profesional,
                            packs estratégicos de terrenos, propietarios alineados. Ahorra meses en prospección y desarrollo.
                        </p>

                        {/* Value Props compactas */}
                        <div className="mb-8 flex flex-wrap justify-center gap-6 text-sm md:text-base">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-secondary-foreground h-5 w-5 flex-shrink-0" />
                                <span className="text-foreground font-medium">Terrenos pre-validados</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-secondary-foreground h-5 w-5 flex-shrink-0" />
                                <span className="text-foreground font-medium">Propietarios comprometidos</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-secondary-foreground h-5 w-5 flex-shrink-0" />
                                <span className="text-foreground font-medium">Solo pagas al cierre</span>
                            </div>
                        </div>

                        {/* CTA Principal */}
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/registro/promotor">
                                <Button
                                    size="lg"
                                    className="bg-secondary hover:bg-secondary/90 group text-secondary-foreground gap-2 text-base"
                                >
                                    <Building2 className="h-5 w-5" />
                                    Acceder al marketplace
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link href="/servicios/marketplace-terrenos-renovables">
                                <Button size="lg" variant="outline" className="gap-2 text-base">
                                    <FileSearch className="h-5 w-5" />
                                    Cómo funciona el marketplace
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección: Cómo Funciona */}
            <section className="from-background to-muted/30 bg-gradient-to-b py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
                            Cómo acceder a terrenos cualificados para tu pipeline
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Proceso ágil y transparente. Solo pagas comisión cuando cierres el acuerdo con el propietario.
                        </p>
                    </div>

                    {/* Proceso en 4 pasos - Cards horizontales */}
                    <div className="mx-auto max-w-5xl space-y-6">
                        <ProcessStepCard
                            stepNumber={1}
                            title="Regístrate como promotor"
                            description="Completa el formulario de registro con información de tu empresa, proyectos activos y zonas de interés."
                            icon={Users}
                            userType="promotores"
                        />

                        <ProcessStepCard
                            stepNumber={2}
                            title="Explora terrenos pre-validados en el marketplace"
                            description="Accede a fichas técnicas completas: ubicación, superficie, distancia a subestación, viabilidad solar/eólica, regulación urbanística y datos del propietario."
                            icon={Search}
                            userType="promotores"
                        />

                        <ProcessStepCard
                            stepNumber={3}
                            title="Solicita acceso a través de nuestro equipo"
                            description="Si el terreno encaja en tu estrategia, solicita acceso. Solterra actúa como intermediario profesional entre promotor y propietario, gestionando la comunicación y facilitando el proceso para ambas partes."
                            icon={Handshake}
                            userType="promotores"
                        />

                        <ProcessStepCard
                            stepNumber={4}
                            title="Negociamos y coordinamos el cierre"
                            description="Solterra coordina la negociación entre ambas partes, asegura condiciones justas y gestiona todo el proceso hasta la firma. Solo pagas comisión cuando se formalice el contrato."
                            icon={BadgeCheck}
                            userType="promotores"
                        />
                    </div>
                </div>
            </section>

            {/* Sección: Servicios Incluidos */}
            <section className="from-muted/30 to-background bg-gradient-to-b py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
                            Qué incluye nuestro servicio para promotores
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Todo lo que necesitas para acelerar tu pipeline de desarrollo y reducir costes de prospección.
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <ServiceBenefitCard
                            icon={Shield}
                            title="Validación técnica completada"
                            description="Todos los terrenos han pasado análisis de viabilidad: distancia a red, topografía, normativa urbanística, limitaciones ambientales y recurso solar/eólico."
                            badgeText="Pre-filtrado"
                            userType="promotores"
                        />

                        <ServiceBenefitCard
                            icon={Users}
                            title="Propietarios alineados"
                            description="Los propietarios ya conocen el proceso, han expresado interés activo en arrendar/vender, y tienen expectativas realistas de mercado."
                            badgeText="Mayor cierre"
                            userType="promotores"
                        />

                        <ServiceBenefitCard
                            icon={FileSearch}
                            title="Fichas técnicas completas"
                            description="Ubicación exacta, superficie, referencia catastral, distancia a subestaciones, topografía, puntos de evacuación cercanos y restricciones conocidas."
                            badgeText="Información completa"
                            userType="promotores"
                        />

                        <ServiceBenefitCard
                            icon={Package}
                            title="Opciones flexibles de superficie"
                            description="Si tienes necesidades específicas de superficie o ubicación, podemos identificar terrenos complementarios en la misma zona. Facilitamos la coordinación de negociaciones cuando tiene sentido agrupar parcelas próximas."
                            badgeText="Soluciones adaptadas"
                            userType="promotores"
                        />

                        <ServiceBenefitCard
                            icon={MapPin}
                            title="Actualizaciones regulares"
                            description="El marketplace se actualiza continuamente con nuevos terrenos validados. Recibe notificaciones cuando aparezcan oportunidades en tus zonas de interés."
                            badgeText="Pipeline activo"
                            userType="promotores"
                        />

                        <ServiceBenefitCard
                            icon={Handshake}
                            title="Intermediación profesional"
                            description="Solterra actúa como intermediario entre promotor y propietario, coordinando comunicaciones, gestionando expectativas y facilitando acuerdos justos para ambas partes."
                            badgeText="Gestión profesional"
                            userType="promotores"
                        />

                        <ServiceBenefitCard
                            icon={Shield}
                            title="Control de calidad exhaustivo"
                            description="Solo aparecen terrenos de calidad. Revisamos cada terreno antes de publicarlo en el marketplace: validación técnica, documentación del propietario y viabilidad real del proyecto."
                            badgeText="Filtro riguroso"
                            userType="promotores"
                        />

                        <ServiceBenefitCard
                            icon={Zap}
                            title="Acceso inmediato al marketplace"
                            description="Una vez registrado y verificado, accedes inmediatamente a todos los terrenos disponibles. Sin esperas innecesarias para empezar a explorar oportunidades."
                            badgeText="Ágil y eficiente"
                            userType="promotores"
                        />
                    </div>
                </div>
            </section>

            {/* Sección: Por Qué Elegirnos */}
            <section className="from-background to-muted/30 bg-gradient-to-b py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">Por qué usar Solterra para tu pipeline</h2>
                        <p className="text-muted-foreground text-lg">
                            No somos brokers tradicionales. Nuestro modelo funciona solo cuando tú cierras.
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
                        <ValueCard
                            icon={Filter}
                            title="Calidad sobre cantidad"
                            description="No te inundamos con Excel de dudosa procedencia. Cada terreno está validado técnicamente y con propietario comprometido."
                            bottomText="Pipeline real"
                            userType="promotores"
                        />

                        <ValueCard
                            icon={Target}
                            title="Modelo orientado a cierre"
                            description="Solo cobramos comisión cuando cierres el acuerdo con el propietario. Nuestros intereses están completamente alineados con tu éxito."
                            bottomText="Sin riesgo"
                            userType="promotores"
                        />

                        <ValueCard
                            icon={Clock}
                            title="Acceso inmediato"
                            description="Regístrate hoy y accede al marketplace de forma inmediata. Sin esperas, sin burocracia innecesaria."
                            bottomText="Ágil"
                            userType="promotores"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="from-muted/30 via-background to-muted/30 bg-gradient-to-r py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-foreground mb-6 text-3xl font-bold md:text-4xl">
                            ¿Listo para acelerar tu pipeline de desarrollo?
                        </h2>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Regístrate como promotor y accede inmediatamente a terrenos pre-validados. Solo pagas comisión cuando cierres.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/registro/promotor">
                                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 text-base">
                                    <Building2 className="h-5 w-5" />
                                    Crear cuenta de promotor
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/contacto">
                                <Button size="lg" variant="outline" className="gap-2 text-base">
                                    <Users className="h-5 w-5" />
                                    Hablar con el equipo
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interlinks a otros servicios */}
            <ServicesShowcase
                title="Nuestros servicios para el sector renovable"
                subtitle="Soluciones integrales desde la validación de terrenos hasta el marketplace y prospección personalizada"
                background="white"
            />

            {/* FAQ con componente */}
            <section className="bg-muted/30 py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl">
                        <FAQList
                            title="Preguntas frecuentes"
                            categoryLabels={{ promotor: "Promotor" }}
                            faqs={[
                                {
                                    question: "¿Cuánto cuesta acceder al marketplace?",
                                    answer: "El acceso al marketplace es gratuito. Solo pagas comisión cuando cierres un acuerdo con el propietario. El modelo de comisión se acuerda previamente y suele ser un % sobre el valor del contrato de arrendamiento o compraventa.",
                                    category: "promotor",
                                },
                                {
                                    question: "¿Los terrenos están en exclusiva?",
                                    answer: "No. Los propietarios pueden estar en contacto con varios promotores. El primero que cierre condiciones con el propietario se queda con el terreno. Esto incentiva la agilidad y seriedad en las negociaciones.",
                                    category: "promotor",
                                },
                                {
                                    question: "¿Qué son los packs estratégicos de terrenos?",
                                    answer: "Agrupamos terrenos cercanos para alcanzar las hectáreas que necesitas. Por ejemplo, si buscas 10 ha y tenemos 3 terrenos de 5+3+2 ha en la misma zona, te los ofrecemos como pack. Simplifica la negociación y reduce el riesgo de proyectos fragmentados.",
                                    category: "promotor",
                                },
                                {
                                    question: "¿Cómo funciona la intermediación de Solterra?",
                                    answer: "Actuamos como intermediario profesional entre promotor y propietario. Gestionamos toda la comunicación, coordinamos visitas, facilitamos la negociación y acompañamos hasta el cierre. No hay negociación directa - nosotros gestionamos expectativas y facilitamos acuerdos justos para ambas partes.",
                                    category: "promotor",
                                },
                                {
                                    question: "¿Ofrecen prospección personalizada?",
                                    answer: "Sí. Si buscas terrenos en zona específica que no está en el marketplace, ofrecemos servicio de prospección a demanda. Contacta con el equipo para más información sobre plazos y condiciones.",
                                    category: "promotor",
                                },
                            ]}
                        />
                    </div>
                </div>
            </section>
        </StandardLayout>
    )
}
