"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getTranslations, type Locale } from "@/lib/i18n"
import { Mail, Phone, MapPin, Send } from "lucide-react"

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
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-24 px-6">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Contacta con nosotros</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Estamos aquí para ayudarte. Envíanos tu consulta y te responderemos lo antes posible.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-6 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Envíanos un mensaje</h2>
                <Card className="p-8 border-2">
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
                        className="w-full h-12 rounded-md border border-input bg-background px-3 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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

                    <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 gap-2">
                      <Send className="h-5 w-5" />
                      Enviar mensaje
                    </Button>
                  </form>
                </Card>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Información de contacto</h2>

                <div className="space-y-6">
                  <Card className="p-6 border-2 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl bg-primary/10 p-3 shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <p className="text-muted-foreground">info@solterradvisory.com</p>
                        <p className="text-sm text-muted-foreground mt-1">Respuesta en 24-48 horas</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border-2 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl bg-secondary/10 p-3 shrink-0">
                        <Phone className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Teléfono</h3>
                        <p className="text-muted-foreground">+34 900 000 000</p>
                        <p className="text-sm text-muted-foreground mt-1">Lun-Vie: 9:00 - 18:00</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border-2 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl bg-accent/10 p-3 shrink-0">
                        <MapPin className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Oficina</h3>
                        <p className="text-muted-foreground">Calle Energía Renovable, 123</p>
                        <p className="text-muted-foreground">28001 Madrid, España</p>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="mt-8 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-2">
                  <h3 className="font-bold mb-3">Horario de atención</h3>
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
        <section className="py-20 px-6 bg-gradient-to-br from-primary/5 to-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Preguntas frecuentes</h2>
              <p className="text-muted-foreground">Quizás encuentres tu respuesta aquí</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="p-6 border-2">
                <h3 className="font-bold mb-2">¿Cuánto cuesta usar Solterra?</h3>
                <p className="text-sm text-muted-foreground">
                  El registro y la publicación de terrenos es completamente gratuita. Solo cobramos una pequeña comisión
                  cuando se cierra un acuerdo exitoso.
                </p>
              </Card>

              <Card className="p-6 border-2">
                <h3 className="font-bold mb-2">¿Cuánto tiempo tarda el proceso?</h3>
                <p className="text-sm text-muted-foreground">
                  Desde que listas tu terreno hasta recibir las primeras propuestas suele pasar entre 1-2 semanas. El
                  cierre del acuerdo depende de la negociación entre las partes.
                </p>
              </Card>

              <Card className="p-6 border-2">
                <h3 className="font-bold mb-2">¿Verifican los terrenos y proyectos?</h3>
                <p className="text-sm text-muted-foreground">
                  Sí, nuestro equipo técnico verifica toda la información antes de publicarla en la plataforma para
                  garantizar la calidad y veracidad de los datos.
                </p>
              </Card>

              <Card className="p-6 border-2">
                <h3 className="font-bold mb-2">¿Ofrecen asesoramiento legal?</h3>
                <p className="text-sm text-muted-foreground">
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
