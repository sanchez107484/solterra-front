"use client"

import StandardLayout from "@/components/layouts/StandardLayout"
import { ServiceSchema } from "@/components/seo/ServiceSchema"
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
            <section className="bg-background py-16 md:py-24">
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
                        {/* Paso 1 */}
                        <div className="group border-secondary/20 hover:border-secondary/40 to-secondary/5 flex flex-col gap-6 rounded-xl border-2 bg-gradient-to-br from-transparent p-6 shadow-sm transition-all hover:shadow-lg md:flex-row md:items-center md:p-8">
                            <div className="bg-secondary/10 text-secondary-foreground flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-2xl font-bold md:h-20 md:w-20 md:text-3xl">
                                1
                            </div>
                            <div className="flex-1">
                                <h3 className="text-foreground mb-2 text-xl font-bold md:text-2xl">Regístrate como promotor</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Completa el formulario de registro con información de tu empresa, proyectos activos y zonas de interés.
                                    Verificación en 24-48h.
                                </p>
                            </div>
                            <Users className="text-secondary-foreground h-10 w-10 flex-shrink-0 opacity-60 transition-opacity group-hover:opacity-100" />
                        </div>

                        {/* Paso 2 */}
                        <div className="group border-secondary/20 hover:border-secondary/40 to-secondary/5 flex flex-col gap-6 rounded-xl border-2 bg-gradient-to-br from-transparent p-6 shadow-sm transition-all hover:shadow-lg md:flex-row md:items-center md:p-8">
                            <div className="bg-secondary/10 text-secondary-foreground flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-2xl font-bold md:h-20 md:w-20 md:text-3xl">
                                2
                            </div>
                            <div className="flex-1">
                                <h3 className="text-foreground mb-2 text-xl font-bold md:text-2xl">
                                    Explora terrenos pre-validados en el marketplace
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Accede a fichas técnicas completas: ubicación, superficie, distancia a subestación, viabilidad
                                    solar/eólica, regulación urbanística y datos del propietario.
                                </p>
                            </div>
                            <Search className="text-secondary-foreground h-10 w-10 flex-shrink-0 opacity-60 transition-opacity group-hover:opacity-100" />
                        </div>

                        {/* Paso 3 */}
                        <div className="group border-secondary/20 hover:border-secondary/40 to-secondary/5 flex flex-col gap-6 rounded-xl border-2 bg-gradient-to-br from-transparent p-6 shadow-sm transition-all hover:shadow-lg md:flex-row md:items-center md:p-8">
                            <div className="bg-secondary/10 text-secondary-foreground flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-2xl font-bold md:h-20 md:w-20 md:text-3xl">
                                3
                            </div>
                            <div className="flex-1">
                                <h3 className="text-foreground mb-2 text-xl font-bold md:text-2xl">
                                    Solicita acceso a través de nuestro equipo
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Si el terreno encaja en tu estrategia, solicita acceso. Solterra actúa como intermediario profesional
                                    entre promotor y propietario, gestionando la comunicación y facilitando el proceso para ambas partes.
                                </p>
                            </div>
                            <Handshake className="text-secondary-foreground h-10 w-10 flex-shrink-0 opacity-60 transition-opacity group-hover:opacity-100" />
                        </div>

                        {/* Paso 4 */}
                        <div className="group border-secondary/20 hover:border-secondary/40 to-secondary/5 flex flex-col gap-6 rounded-xl border-2 bg-gradient-to-br from-transparent p-6 shadow-sm transition-all hover:shadow-lg md:flex-row md:items-center md:p-8">
                            <div className="bg-secondary/10 text-secondary-foreground flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-2xl font-bold md:h-20 md:w-20 md:text-3xl">
                                4
                            </div>
                            <div className="flex-1">
                                <h3 className="text-foreground mb-2 text-xl font-bold md:text-2xl">Negociamos y coordinamos el cierre</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Solterra coordina la negociación entre ambas partes, asegura condiciones justas y gestiona todo el
                                    proceso hasta la firma. Solo pagas comisión cuando se formalice el contrato.
                                </p>
                            </div>
                            <BadgeCheck className="text-secondary-foreground h-10 w-10 flex-shrink-0 opacity-60 transition-opacity group-hover:opacity-100" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección: Servicios Incluidos */}
            <section className="bg-muted/30 py-16 md:py-24">
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
                        {/* Servicio 1 */}
                        <div className="group border-secondary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-8 shadow-lg transition-transform duration-200 ease-out hover:scale-[1.03]">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <Shield className="text-secondary-foreground h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Validación técnica completada</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Todos los terrenos han pasado análisis de viabilidad: distancia a red, topografía, normativa urbanística,
                                limitaciones ambientales y recurso solar/eólico.
                            </p>
                            <div className="text-secondary-foreground flex items-center gap-2 text-sm font-medium">
                                <BadgeCheck className="h-4 w-4" />
                                Pre-filtrado
                            </div>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Servicio 2 */}
                        <div className="group border-secondary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-8 shadow-lg transition-transform duration-200 ease-out hover:scale-[1.03]">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <Users className="text-secondary-foreground h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Propietarios alineados</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Los propietarios ya conocen el proceso, han expresado interés activo en arrendar/vender, y tienen
                                expectativas realistas de mercado.
                            </p>
                            <div className="text-secondary-foreground flex items-center gap-2 text-sm font-medium">
                                <BadgeCheck className="h-4 w-4" />
                                Mayor cierre
                            </div>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Servicio 3 */}
                        <div className="group border-secondary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-8 shadow-lg transition-transform duration-200 ease-out hover:scale-[1.03]">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <FileSearch className="text-secondary-foreground h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Fichas técnicas completas</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Ubicación exacta, superficie, referencia catastral, distancia a subestaciones, topografía, puntos de
                                evacuación cercanos y restricciones conocidas.
                            </p>
                            <div className="text-secondary-foreground flex items-center gap-2 text-sm font-medium">
                                <BadgeCheck className="h-4 w-4" />
                                Información completa
                            </div>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Servicio 4 - Nuevo: Packs estratégicos */}
                        <div className="group border-secondary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-8 shadow-lg transition-transform duration-200 ease-out hover:scale-[1.03]">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <Package className="text-secondary-foreground h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Packs estratégicos de terrenos</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Agrupamos terrenos cercanos en packs para alcanzar la superficie objetivo. Si buscas 10 ha y tenemos 3
                                terrenos de 5, 3 y 2 ha en la misma zona, te los ofrecemos juntos para maximizar tus opciones de cierre.
                            </p>
                            <div className="text-secondary-foreground flex items-center gap-2 text-sm font-medium">
                                <BadgeCheck className="h-4 w-4" />
                                Estrategia optimizada
                            </div>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Servicio 5 */}
                        <div className="group border-secondary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-8 shadow-lg transition-transform duration-200 ease-out hover:scale-[1.03]">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <MapPin className="text-secondary-foreground h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Prospección personalizada</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                ¿Buscas terrenos en zona específica? Servicio de prospección a demanda en tu área estratégica con validación
                                técnica incluida.
                            </p>
                            <div className="text-secondary-foreground flex items-center gap-2 text-sm font-medium">
                                <BadgeCheck className="h-4 w-4" />A medida
                            </div>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Servicio 6 */}
                        <div className="group border-secondary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-8 shadow-lg transition-transform duration-200 ease-out hover:scale-[1.03]">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <Handshake className="text-secondary-foreground h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Intermediación profesional</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Solterra actúa como intermediario entre promotor y propietario, coordinando comunicaciones, gestionando
                                expectativas y facilitando acuerdos justos para ambas partes.
                            </p>
                            <div className="text-secondary-foreground flex items-center gap-2 text-sm font-medium">
                                <BadgeCheck className="h-4 w-4" />
                                Gestión profesional
                            </div>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Servicio 7 */}
                        <div className="group border-secondary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-8 shadow-lg transition-transform duration-200 ease-out hover:scale-[1.03]">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <Shield className="text-secondary-foreground h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Control de calidad exhaustivo</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Solo aparecen terrenos de calidad. Revisamos cada terreno antes de publicarlo en el marketplace: validación
                                técnica, documentación del propietario y viabilidad real del proyecto.
                            </p>
                            <div className="text-secondary-foreground flex items-center gap-2 text-sm font-medium">
                                <BadgeCheck className="h-4 w-4" />
                                Filtro riguroso
                            </div>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>

                        {/* Servicio 8 */}
                        <div className="group border-secondary/20 relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-transparent to-transparent p-8 shadow-lg transition-transform duration-200 ease-out hover:scale-[1.03]">
                            <div className="bg-secondary/20 mb-4 inline-flex items-center gap-3 rounded-2xl p-3">
                                <Zap className="text-secondary-foreground h-6 w-6 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-foreground mb-3 text-xl font-bold">Acceso inmediato al marketplace</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Una vez registrado y verificado, accedes inmediatamente a todos los terrenos disponibles. Sin esperas
                                innecesarias para empezar a explorar oportunidades.
                            </p>
                            <div className="text-secondary-foreground flex items-center gap-2 text-sm font-medium">
                                <BadgeCheck className="h-4 w-4" />
                                Ágil y eficiente
                            </div>
                            <div
                                className="bg-secondary/10 absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28"
                                aria-hidden
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección: Por Qué Elegirnos */}
            <section className="bg-background py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">Por qué usar Solterra para tu pipeline</h2>
                        <p className="text-muted-foreground text-lg">
                            No somos brokers tradicionales. Nuestro modelo funciona solo cuando tú cierras.
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
                        {/* Valor 1 */}
                        <div className="group bg-background relative overflow-hidden rounded-xl border-2 p-8 text-center shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
                            <div className="from-secondary/0 to-secondary/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                                <div className="bg-secondary/10 ring-secondary/20 group-hover:ring-secondary/40 mx-auto mb-6 w-fit rounded-full p-4 ring-4 transition-all group-hover:scale-110">
                                    <Filter className="text-secondary-foreground h-10 w-10" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold">Calidad sobre cantidad</h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    No te inundamos con Excel de dudosa procedencia. Cada terreno está validado técnicamente y con
                                    propietario comprometido.
                                </p>
                                <div className="text-secondary-foreground flex items-center justify-center gap-2 text-sm font-semibold">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span>Pipeline real</span>
                                </div>
                            </div>
                        </div>

                        {/* Valor 2 */}
                        <div className="group bg-background relative overflow-hidden rounded-xl border-2 p-8 text-center shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
                            <div className="from-secondary/0 to-secondary/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                                <div className="bg-secondary/10 ring-secondary/20 group-hover:ring-secondary/40 mx-auto mb-6 w-fit rounded-full p-4 ring-4 transition-all group-hover:scale-110">
                                    <Target className="text-secondary-foreground h-10 w-10" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold">Modelo orientado a cierre</h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    Solo cobramos comisión cuando cierres el acuerdo con el propietario. Nuestros intereses están
                                    completamente alineados con tu éxito.
                                </p>
                                <div className="text-secondary-foreground flex items-center justify-center gap-2 text-sm font-semibold">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span>Sin riesgo</span>
                                </div>
                            </div>
                        </div>

                        {/* Valor 3 */}
                        <div className="group bg-background relative overflow-hidden rounded-xl border-2 p-8 text-center shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
                            <div className="from-secondary/0 to-secondary/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                                <div className="bg-secondary/10 ring-secondary/20 group-hover:ring-secondary/40 mx-auto mb-6 w-fit rounded-full p-4 ring-4 transition-all group-hover:scale-110">
                                    <Clock className="text-secondary-foreground h-10 w-10" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold">Acceso inmediato</h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    Regístrate hoy y accede al marketplace de forma inmediata. Sin esperas, sin burocracia innecesaria.
                                </p>
                                <div className="text-secondary-foreground flex items-center justify-center gap-2 text-sm font-semibold">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span>Ágil</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección: Stats */}
            <section className="from-secondary/5 to-background bg-gradient-to-br py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
                        <div className="border-secondary/20 rounded-xl border-2 bg-white p-8 text-center shadow-sm">
                            <div className="text-secondary-foreground mb-3 text-4xl font-bold">Inmediato</div>
                            <p className="text-muted-foreground text-sm font-medium">Acceso al marketplace tras registro</p>
                        </div>
                        <div className="border-secondary/20 rounded-xl border-2 bg-white p-8 text-center shadow-sm">
                            <div className="text-secondary-foreground mb-3 text-4xl font-bold">100%</div>
                            <p className="text-muted-foreground text-sm font-medium">Terrenos con validación técnica completada</p>
                        </div>
                        <div className="border-secondary/20 rounded-xl border-2 bg-white p-8 text-center shadow-sm">
                            <div className="text-secondary-foreground mb-3 text-4xl font-bold">Profesional</div>
                            <p className="text-muted-foreground text-sm font-medium">Intermediación experta en cada operación</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="from-secondary/10 via-background to-secondary/10 bg-gradient-to-r py-16 md:py-24">
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

                        {/* FAQ con componente */}
                        <div className="mt-12">
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
                </div>
            </section>
        </StandardLayout>
    )
}
