"use client"

import type React from "react"
import { useState } from "react"

import StandardLayout from "@/components/layouts/StandardLayout"
import ContactPageSEO from "@/components/seo/ContactPageSEO"
import { PageHero } from "@/components/shared/page-hero"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useTranslations } from "@/i18n/i18nContext"
import { Clock, Mail, Send } from "lucide-react"

export default function Contacto() {
    const { t } = useTranslations()
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const data = {
            nombre: formData.get("nombre"),
            email: formData.get("email"),
            telefono: formData.get("telefono"),
            tipo: formData.get("tipo"),
            mensaje: formData.get("mensaje"),
        }

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Error al enviar el mensaje")
            }

            toast({
                title: t?.contact?.form?.success || "¡Mensaje enviado!",
                description: t?.contact?.form?.successDesc || "Nos pondremos en contacto contigo pronto.",
            })

            // Reset form
            e.currentTarget.reset()
        } catch (error) {
            toast({
                title: t?.contact?.form?.error || "Error al enviar",
                description: t?.contact?.form?.errorDesc || "Por favor, intenta de nuevo.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <StandardLayout>
            <ContactPageSEO />

            {/* Hero Section */}
            <PageHero title={t?.contact?.hero?.title || "Contacto"} subtitle={t?.contact?.hero?.subtitle || "Estamos aquí para ayudarte"} />

            {/* Contact Section */}
            <section className="bg-background relative px-6 py-24">
                {/* Fondo decorativo */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="from-primary/5 via-secondary/5 to-accent/5 absolute inset-0 bg-gradient-to-br" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,197,94,0.08),transparent_40%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.08),transparent_40%)]" />
                </div>

                <div className="relative container mx-auto max-w-7xl">
                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Contact Form - Lado izquierdo */}
                        <div className="flex flex-col">
                            <h2 className="mb-6 text-3xl font-bold">{t?.contact?.form?.title || "Envíanos un mensaje"}</h2>

                            <Card className="border-2 bg-white p-8 shadow-lg">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="nombre">{t?.contact?.form?.nameLabel || "Nombre completo"}</Label>
                                            <Input
                                                id="nombre"
                                                name="nombre"
                                                placeholder={t?.contact?.form?.namePlaceholder || "Juan Pérez"}
                                                className="h-12"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">{t?.contact?.form?.emailLabel || "Email"}</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder={t?.contact?.form?.emailPlaceholder || "tu@email.com"}
                                                className="h-12"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="telefono">{t?.contact?.form?.phoneLabel || "Teléfono"}</Label>
                                            <Input
                                                id="telefono"
                                                name="telefono"
                                                type="tel"
                                                placeholder={t?.contact?.form?.phonePlaceholder || "+34 600 000 000"}
                                                className="h-12"
                                                disabled={isSubmitting}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="tipo">{t?.contact?.form?.typeLabel || "Tipo de consulta"}</Label>
                                            <select
                                                id="tipo"
                                                name="tipo"
                                                className="border-input bg-background ring-offset-background focus-visible:ring-ring h-12 w-full rounded-md border px-3 text-base focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                required
                                                disabled={isSubmitting}
                                            >
                                                <option value="">{t?.contact?.form?.typeOptions?.empty || "Selecciona una opción"}</option>
                                                <option value="propietario">
                                                    {t?.contact?.form?.typeOptions?.landowner || "Soy propietario de terreno"}
                                                </option>
                                                <option value="promotor">
                                                    {t?.contact?.form?.typeOptions?.developer || "Soy promotor de proyectos"}
                                                </option>
                                                <option value="general">
                                                    {t?.contact?.form?.typeOptions?.general || "Consulta general"}
                                                </option>
                                                <option value="soporte">
                                                    {t?.contact?.form?.typeOptions?.support || "Soporte técnico"}
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="mensaje">{t?.contact?.form?.messageLabel || "Mensaje"}</Label>
                                        <Textarea
                                            id="mensaje"
                                            name="mensaje"
                                            placeholder={t?.contact?.form?.messagePlaceholder || "Cuéntanos en qué podemos ayudarte..."}
                                            className="min-h-40 resize-none"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="bg-primary hover:bg-primary/90 h-14 w-full gap-2 text-lg font-semibold shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
                                        disabled={isSubmitting}
                                    >
                                        <Send className="h-5 w-5" />
                                        {isSubmitting
                                            ? t?.contact?.form?.sending || "Enviando..."
                                            : t?.contact?.form?.submit || "Enviar mensaje"}
                                    </Button>
                                </form>
                            </Card>
                        </div>

                        {/* Contact Info - Lado derecho */}
                        <div className="flex flex-col gap-6">
                            <h2 className="mb-2 text-3xl font-bold">{t?.contact?.info?.title || "Información de contacto"}</h2>

                            {/* Email Card */}
                            <Card className="group border-2 bg-white p-6 shadow-lg transition-all hover:shadow-xl">
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 shrink-0 rounded-xl p-3 transition-all group-hover:scale-110">
                                        <Mail className="text-primary h-8 w-8" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="mb-1 text-xl font-bold">{t?.contact?.info?.emailTitle || "Email"}</h3>
                                        <a
                                            href={`mailto:${t?.contact?.info?.email || "info@solterraadvisory.com"}`}
                                            className="text-primary mb-2 block text-lg font-semibold transition-colors hover:underline"
                                        >
                                            {t?.contact?.info?.email || "info@solterraadvisory.com"}
                                        </a>
                                        <p className="text-muted-foreground flex items-center gap-2 text-sm">
                                            <Clock className="h-4 w-4" />
                                            {t?.contact?.info?.emailNote || "Respuesta en 24 horas"}
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            {/* Availability Card */}
                            <Card className="group border-2 bg-white p-6 shadow-lg transition-all hover:shadow-xl">
                                <div className="flex items-start gap-4">
                                    <div className="bg-secondary/10 shrink-0 rounded-xl p-3 transition-all group-hover:scale-110">
                                        <Clock className="text-secondary h-8 w-8" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="mb-2 text-xl font-bold">{t?.contact?.info?.availability || "Disponibilidad"}</h3>
                                        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                            {t?.contact?.info?.availabilityDesc ||
                                                "Nuestro equipo está disponible para resolver tus dudas sobre proyectos de energía renovable."}
                                        </p>

                                        {/* Horario compacto */}
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground">
                                                    {t?.contact?.info?.schedule?.monFri || "Lunes - Viernes"}
                                                </span>
                                                <span className="text-primary font-semibold">
                                                    {t?.contact?.info?.schedule?.monFriHours || "9:00 - 18:00"}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground">{t?.contact?.info?.schedule?.sat || "Sábado"}</span>
                                                <span className="text-primary font-semibold">
                                                    {t?.contact?.info?.schedule?.satHours || "10:00 - 14:00"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Sección SEO con contenido rico */}
                    {/* <div className="mt-16 rounded-2xl border-2 bg-white p-8 shadow-lg">
                        <h2 className="mb-6 text-2xl font-bold">¿Por qué contactar con Solterra Advisory?</h2>

                        <div className="grid gap-8 md:grid-cols-2">
                            <div>
                                <h3 className="text-primary mb-3 text-lg font-semibold">Para Propietarios de Terrenos</h3>
                                <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                                    Si eres propietario de terreno rural en España y quieres generar ingresos pasivos mediante el
                                    arrendamiento para proyectos de energía solar fotovoltaica o eólica, contacta con nosotros. Te ayudamos
                                    a:
                                </p>
                                <ul className="text-muted-foreground space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Valorar el potencial de tu terreno para energía renovable</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Conectar con promotores verificados de proyectos solares y eólicos</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Negociar contratos de arrendamiento justos y rentables</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Entender el proceso completo de desarrollo de parques solares y eólicos</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-secondary mb-3 text-lg font-semibold">Para Promotores de Proyectos</h3>
                                <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                                    Si eres promotor o desarrollador de proyectos de energía renovable y buscas terrenos adecuados para
                                    instalaciones solares fotovoltaicas, parques eólicos o plantas de energía limpia, contáctanos para:
                                </p>
                                <ul className="text-muted-foreground space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary mt-1">•</span>
                                        <span>Acceder a nuestra base de datos de terrenos verificados en toda España</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary mt-1">•</span>
                                        <span>Filtrar terrenos por ubicación, superficie, orientación y acceso a red eléctrica</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary mt-1">•</span>
                                        <span>Contactar directamente con propietarios interesados en arrendar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary mt-1">•</span>
                                        <span>Optimizar el tiempo de búsqueda y análisis de ubicaciones viables</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="from-primary/5 to-secondary/5 mt-8 rounded-xl bg-gradient-to-r p-6">
                            <h3 className="mb-3 text-lg font-semibold">Nuestra Cobertura en España</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Solterra Advisory opera en toda España, conectando terrenos rurales con proyectos de energía renovable en
                                Andalucía, Castilla y León, Castilla-La Mancha, Extremadura, Aragón, Comunidad Valenciana, Murcia, Galicia y
                                todas las comunidades autónomas. Especializados en identificar ubicaciones óptimas para instalaciones
                                solares fotovoltaicas y parques eólicos según irradiación solar, velocidad del viento, orografía del terreno
                                y proximidad a subestaciones eléctricas.
                            </p>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-muted-foreground text-sm">
                                <strong className="text-foreground">Email:</strong>{" "}
                                <a href="mailto:info@solterraadvisory.com" className="text-primary hover:underline">
                                    info@solterraadvisory.com
                                </a>{" "}
                                | <strong className="text-foreground">Horario:</strong> Lunes a Viernes 9:00-18:00, Sábados 10:00-14:00 |{" "}
                                <strong className="text-foreground">Tiempo de respuesta:</strong> Menos de 24 horas
                            </p>
                        </div>
                    </div> */}
                </div>
            </section>
        </StandardLayout>
    )
}
