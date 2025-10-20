"use client"

import type React from "react"

import { FooterSection } from "@/components/footer-section"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useTranslations } from "@/i18n/i18nContext"
import { Mail, MapPin, Phone, Send } from "lucide-react"

export default function Contacto() {
    const { t } = useTranslations()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implementar envío de formulario
        alert("Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.")
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 lg:ml-64">
                {/* Hero Section */}
                <section className="from-primary/10 via-background to-secondary/10 relative bg-gradient-to-br px-6 py-24">
                    <div className="container mx-auto max-w-6xl text-center">
                        <h1 className="mb-6 text-5xl font-bold text-balance md:text-6xl">{t?.contact?.hero?.title}</h1>
                        <p className="text-muted-foreground mx-auto max-w-3xl text-xl text-pretty">{t?.contact?.hero?.subtitle}</p>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="bg-background px-6 py-20">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid gap-12 md:grid-cols-2">
                            {/* Contact Form */}
                            <div>
                                <h2 className="mb-6 text-3xl font-bold">{t?.contact?.form?.title}</h2>
                                <Card className="border-2 p-8">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="nombre">{t?.contact?.form?.nameLabel}</Label>
                                            <Input id="nombre" placeholder={t?.contact?.form?.namePlaceholder} className="h-12" required />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">{t?.contact?.form?.emailLabel}</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder={t?.contact?.form?.emailPlaceholder}
                                                className="h-12"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="telefono">{t?.contact?.form?.phoneLabel}</Label>
                                            <Input
                                                id="telefono"
                                                type="tel"
                                                placeholder={t?.contact?.form?.phonePlaceholder}
                                                className="h-12"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="tipo">{t?.contact?.form?.typeLabel}</Label>
                                            <select
                                                id="tipo"
                                                className="border-input bg-background ring-offset-background focus-visible:ring-ring h-12 w-full rounded-md border px-3 text-base focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                                                required
                                            >
                                                <option value="">{t?.contact?.form?.typeOptions?.empty}</option>
                                                <option value="propietario">{t?.contact?.form?.typeOptions?.landowner}</option>
                                                <option value="promotor">{t?.contact?.form?.typeOptions?.developer}</option>
                                                <option value="general">{t?.contact?.form?.typeOptions?.general}</option>
                                                <option value="soporte">{t?.contact?.form?.typeOptions?.support}</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="mensaje">{t?.contact?.form?.messageLabel}</Label>
                                            <Textarea
                                                id="mensaje"
                                                placeholder={t?.contact?.form?.messagePlaceholder}
                                                className="min-h-32"
                                                required
                                            />
                                        </div>

                                        <Button type="submit" className="bg-primary hover:bg-primary/90 h-12 w-full gap-2">
                                            <Send className="h-5 w-5" />
                                            {t?.contact?.form?.submit}
                                        </Button>
                                    </form>
                                </Card>
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h2 className="mb-6 text-3xl font-bold">{t?.contact?.info?.title}</h2>

                                <div className="space-y-6">
                                    <Card className="border-2 p-6 transition-shadow hover:shadow-lg">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-primary/10 shrink-0 rounded-xl p-3">
                                                <Mail className="text-primary h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="mb-1 font-semibold">{t?.contact?.info?.emailTitle}</h3>
                                                <p className="text-muted-foreground">{t?.contact?.info?.email}</p>
                                                <p className="text-muted-foreground mt-1 text-sm">{t?.contact?.info?.emailNote}</p>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="border-2 p-6 transition-shadow hover:shadow-lg">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-secondary/10 shrink-0 rounded-xl p-3">
                                                <Phone className="text-secondary h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="mb-1 font-semibold">{t?.contact?.info?.phoneTitle}</h3>
                                                <p className="text-muted-foreground">{t?.contact?.info?.phone}</p>
                                                <p className="text-muted-foreground mt-1 text-sm">{t?.contact?.info?.phoneHours}</p>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="border-2 p-6 transition-shadow hover:shadow-lg">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-accent/10 shrink-0 rounded-xl p-3">
                                                <MapPin className="text-accent h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="mb-1 font-semibold">{t?.contact?.info?.officeTitle}</h3>
                                                <p className="text-muted-foreground">{t?.contact?.info?.officeAddress}</p>
                                                <p className="text-muted-foreground">{t?.contact?.info?.officeCity}</p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                <Card className="from-primary/5 to-secondary/5 mt-8 border-2 bg-gradient-to-br p-6">
                                    <h3 className="mb-3 font-bold">{t?.contact?.info?.scheduleTitle}</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">{t?.contact?.info?.schedule?.monFri}</span>
                                            <span className="font-medium">{t?.contact?.info?.schedule?.monFriHours}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">{t?.contact?.info?.schedule?.sat}</span>
                                            <span className="font-medium">{t?.contact?.info?.schedule?.satHours}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">{t?.contact?.info?.schedule?.sun}</span>
                                            <span className="font-medium">{t?.contact?.info?.schedule?.sunHours}</span>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                <FooterSection />
            </main>
        </div>
    )
}
