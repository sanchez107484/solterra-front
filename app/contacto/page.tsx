"use client"

import type React from "react"

import { Footer } from "@/components/footer"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getTranslations, type Locale } from "@/lib/i18n"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { useEffect, useState } from "react"

export default function Contacto() {
    const [locale, setLocale] = useState<Locale>("es")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const savedLocale = localStorage.getItem("locale") as Locale
        if (savedLocale) {
            setLocale(savedLocale)
        }
    }, [])

    if (!mounted) {
        return null
    }

    const t = getTranslations(locale)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implementar envío de formulario
        alert("Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.")
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar t={t} />
            <main className="flex-1 lg:ml-64">
                {/* Hero Section */}
                <section className="from-primary/10 via-background to-secondary/10 relative bg-gradient-to-br px-6 py-24">
                    <div className="container mx-auto max-w-6xl text-center">
                        <h1 className="mb-6 text-5xl font-bold text-balance md:text-6xl">Contacta con nosotros</h1>
                        <p className="text-muted-foreground mx-auto max-w-3xl text-xl text-pretty">
                            Estamos aquí para ayudarte. Envíanos tu consulta y te responderemos lo antes posible.
                        </p>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="bg-background px-6 py-20">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid gap-12 md:grid-cols-2">
                            {/* Contact Form */}
                            <div>
                                <h2 className="mb-6 text-3xl font-bold">Envíanos un mensaje</h2>
                                <Card className="border-2 p-8">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="nombre">Nombre completo</Label>
                                            <Input id="nombre" placeholder="Juan Pérez" className="h-12" required />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Correo electrónico</Label>
                                            <Input id="email" type="email" placeholder="tu@email.com" className="h-12" required />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="telefono">Teléfono (opcional)</Label>
                                            <Input id="telefono" type="tel" placeholder="+34 600 000 000" className="h-12" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="tipo">Tipo de consulta</Label>
                                            <select
                                                id="tipo"
                                                className="border-input bg-background ring-offset-background focus-visible:ring-ring h-12 w-full rounded-md border px-3 text-base focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                                                required
                                            >
                                                <option value="">Selecciona una opción</option>
                                                <option value="propietario">Soy propietario de terreno</option>
                                                <option value="promotor">Soy promotor de proyectos</option>
                                                <option value="general">Consulta general</option>
                                                <option value="soporte">Soporte técnico</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="mensaje">Mensaje</Label>
                                            <Textarea
                                                id="mensaje"
                                                placeholder="Cuéntanos en qué podemos ayudarte..."
                                                className="min-h-32"
                                                required
                                            />
                                        </div>

                                        <Button type="submit" className="bg-primary hover:bg-primary/90 h-12 w-full gap-2">
                                            <Send className="h-5 w-5" />
                                            Enviar mensaje
                                        </Button>
                                    </form>
                                </Card>
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h2 className="mb-6 text-3xl font-bold">Información de contacto</h2>

                                <div className="space-y-6">
                                    <Card className="border-2 p-6 transition-shadow hover:shadow-lg">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-primary/10 shrink-0 rounded-xl p-3">
                                                <Mail className="text-primary h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="mb-1 font-semibold">Email</h3>
                                                <p className="text-muted-foreground">info@solterradvisory.com</p>
                                                <p className="text-muted-foreground mt-1 text-sm">Respuesta en 24-48 horas</p>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="border-2 p-6 transition-shadow hover:shadow-lg">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-secondary/10 shrink-0 rounded-xl p-3">
                                                <Phone className="text-secondary h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="mb-1 font-semibold">Teléfono</h3>
                                                <p className="text-muted-foreground">+34 900 000 000</p>
                                                <p className="text-muted-foreground mt-1 text-sm">Lun-Vie: 9:00 - 18:00</p>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="border-2 p-6 transition-shadow hover:shadow-lg">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-accent/10 shrink-0 rounded-xl p-3">
                                                <MapPin className="text-accent h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="mb-1 font-semibold">Oficina</h3>
                                                <p className="text-muted-foreground">Calle Energía Renovable, 123</p>
                                                <p className="text-muted-foreground">28001 Madrid, España</p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                <Card className="from-primary/5 to-secondary/5 mt-8 border-2 bg-gradient-to-br p-6">
                                    <h3 className="mb-3 font-bold">Horario de atención</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Lunes - Viernes</span>
                                            <span className="font-medium">9:00 - 18:00</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Sábado</span>
                                            <span className="font-medium">10:00 - 14:00</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Domingo</span>
                                            <span className="font-medium">Cerrado</span>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Preview */}
                <section className="from-primary/5 to-background bg-gradient-to-br px-6 py-20">
                    <div className="container mx-auto max-w-6xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold">Preguntas frecuentes</h2>
                            <p className="text-muted-foreground">Quizás encuentres tu respuesta aquí</p>
                        </div>

                        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
                            <Card className="border-2 p-6">
                                <h3 className="mb-2 font-bold">¿Cuánto cuesta usar Solterra?</h3>
                                <p className="text-muted-foreground text-sm">
                                    El registro y la publicación de terrenos es completamente gratuita. Solo cobramos una pequeña comisión
                                    cuando se cierra un acuerdo exitoso.
                                </p>
                            </Card>

                            <Card className="border-2 p-6">
                                <h3 className="mb-2 font-bold">¿Cuánto tiempo tarda el proceso?</h3>
                                <p className="text-muted-foreground text-sm">
                                    Desde que listas tu terreno hasta recibir las primeras propuestas suele pasar entre 1-2 semanas. El
                                    cierre del acuerdo depende de la negociación entre las partes.
                                </p>
                            </Card>

                            <Card className="border-2 p-6">
                                <h3 className="mb-2 font-bold">¿Verifican los terrenos y proyectos?</h3>
                                <p className="text-muted-foreground text-sm">
                                    Sí, nuestro equipo técnico verifica toda la información antes de publicarla en la plataforma para
                                    garantizar la calidad y veracidad de los datos.
                                </p>
                            </Card>

                            <Card className="border-2 p-6">
                                <h3 className="mb-2 font-bold">¿Ofrecen asesoramiento legal?</h3>
                                <p className="text-muted-foreground text-sm">
                                    Proporcionamos orientación general, pero recomendamos que ambas partes cuenten con asesoramiento legal
                                    independiente para la firma de contratos.
                                </p>
                            </Card>
                        </div>
                    </div>
                </section>

                <Footer t={t} />
            </main>
        </div>
    )
}
