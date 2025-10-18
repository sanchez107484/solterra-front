"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getTranslations, type Locale } from "@/lib/i18n"
import { ArrowLeft, Check, ChevronRight, Home, Leaf, MapPin, Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function NuevoTerreno() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        nombre: "",
        provincia: "",
        municipio: "",
        hectareas: "",
        tipo: "solar",
        descripcion: "",
        coordenadas: "",
        acceso: "",
        suministro: "",
    })

    const [locale, setLocale] = useState<Locale>("es")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const saved = (localStorage.getItem("locale") as Locale) || "es"
        setLocale(saved)
    }, [])

    if (!mounted) return null

    const t = getTranslations(locale)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: save
        router.push("/dashboard/propietario")
    }

    const nextStep = () => setStep((s) => s + 1)
    const prevStep = () => setStep((s) => s - 1)

    return (
        <div className="from-background via-primary/5 to-background min-h-screen bg-gradient-to-br">
            <header className="border-border/50 bg-background/95 sticky top-0 z-50 border-b shadow-sm backdrop-blur-lg">
                <div className="container mx-auto px-6 py-4">
                    <div className="mb-3 flex items-center justify-between">
                        <Link href="/dashboard/propietario" className="group flex items-center gap-3">
                            <div className="from-primary to-primary/80 rounded-xl bg-gradient-to-br p-2.5 shadow-lg transition-shadow group-hover:shadow-xl">
                                <Leaf className="text-primary-foreground h-6 w-6" />
                            </div>
                            <div>
                                <span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
                                    Solterra
                                </span>
                                <p className="text-muted-foreground text-xs">{t?.dashboard?.owner?.marketplace}</p>
                            </div>
                        </Link>
                        <Link href="/dashboard/propietario">
                            <Button variant="ghost" size="sm" className="hover:bg-primary/10 gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                {t?.common?.backToDashboard}
                            </Button>
                        </Link>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                        <Home className="h-4 w-4" />
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/dashboard/propietario" className="hover:text-foreground transition-colors">
                            {t?.dashboard?.owner?.dashboard}
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-foreground font-medium">{t?.dashboard?.owner?.newLand}</span>
                    </div>
                </div>
            </header>

            <main className="container mx-auto max-w-4xl px-6 py-12">
                <div className="mb-12">
                    <div className="mb-4 flex items-center justify-between">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex flex-1 items-center">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${step >= s ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30 text-muted-foreground"}`}
                                >
                                    {step > s ? <Check className="h-5 w-5" /> : s}
                                </div>
                                {s < 3 && (
                                    <div
                                        className={`mx-2 h-1 flex-1 transition-all ${step > s ? "bg-primary" : "bg-muted-foreground/30"}`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className={step >= 1 ? "text-foreground font-medium" : "text-muted-foreground"}>{t?.forms?.basicInfo}</span>
                        <span className={step >= 2 ? "text-foreground font-medium" : "text-muted-foreground"}>
                            {t?.forms?.technicalDetails}
                        </span>
                        <span className={step >= 3 ? "text-foreground font-medium" : "text-muted-foreground"}>
                            {t?.forms?.documentation}
                        </span>
                    </div>
                </div>

                <Card className="border-2 p-8 shadow-xl">
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div className="space-y-6">
                                <div className="mb-8 text-center">
                                    <div className="bg-primary/10 mb-4 inline-flex rounded-2xl p-4">
                                        <MapPin className="text-primary h-10 w-10" />
                                    </div>
                                    <h2 className="mb-2 text-3xl font-bold">{t?.forms?.landBasicTitle}</h2>
                                    <p className="text-muted-foreground">{t?.forms?.landBasicSubtitle}</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nombre">{t?.forms?.labels?.landName}</Label>
                                    <Input
                                        id="nombre"
                                        placeholder={t?.forms?.examples?.landName}
                                        className="h-12"
                                        value={formData.nombre}
                                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="provincia">{t?.forms?.labels?.province}</Label>
                                        <Input
                                            id="provincia"
                                            placeholder={t?.forms?.examples?.province}
                                            className="h-12"
                                            value={formData.provincia}
                                            onChange={(e) => setFormData({ ...formData, provincia: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="municipio">{t?.forms?.labels?.municipality}</Label>
                                        <Input
                                            id="municipio"
                                            placeholder={t?.forms?.examples?.municipality}
                                            className="h-12"
                                            value={formData.municipio}
                                            onChange={(e) => setFormData({ ...formData, municipio: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="hectareas">{t?.forms?.labels?.hectares}</Label>
                                    <Input
                                        id="hectareas"
                                        type="number"
                                        step="0.1"
                                        placeholder={t?.forms?.examples?.hectares}
                                        className="h-12"
                                        value={formData.hectareas}
                                        onChange={(e) => setFormData({ ...formData, hectareas: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>{t?.forms?.labels?.preferredProject}</Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, tipo: "solar" })}
                                            className={`rounded-xl border-2 p-6 text-left transition-all ${formData.tipo === "solar" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                                        >
                                            <div className="mb-1 font-semibold">{t?.forms?.examples?.solar}</div>
                                            <div className="text-muted-foreground text-sm">{t?.forms?.examples?.solarDesc}</div>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, tipo: "eolico" })}
                                            className={`rounded-xl border-2 p-6 text-left transition-all ${formData.tipo === "eolico" ? "border-secondary bg-secondary/5" : "border-border hover:border-secondary/50"}`}
                                        >
                                            <div className="mb-1 font-semibold">{t?.forms?.examples?.wind}</div>
                                            <div className="text-muted-foreground text-sm">{t?.forms?.examples?.windDesc}</div>
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="descripcion">{t?.forms?.labels?.description}</Label>
                                    <Textarea
                                        id="descripcion"
                                        placeholder={t?.forms?.examples?.landDescription}
                                        className="min-h-32"
                                        value={formData.descripcion}
                                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                    />
                                </div>

                                <Button type="button" onClick={nextStep} className="bg-primary hover:bg-primary/90 h-12 w-full">
                                    {t?.common?.continue}
                                </Button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <div className="mb-8 text-center">
                                    <div className="bg-primary/10 mb-4 inline-flex rounded-2xl p-4">
                                        <MapPin className="text-primary h-10 w-10" />
                                    </div>
                                    <h2 className="mb-2 text-3xl font-bold">{t?.forms?.technicalTitle}</h2>
                                    <p className="text-muted-foreground">{t?.forms?.technicalSubtitle}</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="coordenadas">{t?.forms?.labels?.coordinates}</Label>
                                    <Input
                                        id="coordenadas"
                                        placeholder={t?.forms?.examples?.coordinates}
                                        className="h-12"
                                        value={formData.coordenadas}
                                        onChange={(e) => setFormData({ ...formData, coordenadas: e.target.value })}
                                    />
                                </div>

                                <div className="flex justify-between">
                                    <Button variant="outline" type="button" onClick={prevStep} className="h-12">
                                        {t?.common?.back}
                                    </Button>
                                    <Button type="button" onClick={nextStep} className="bg-primary h-12">
                                        {t?.common?.continue}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6">
                                <div className="mb-8 text-center">
                                    <div className="bg-primary/10 mb-4 inline-flex rounded-2xl p-4">
                                        <Upload className="text-primary h-10 w-10" />
                                    </div>
                                    <h2 className="mb-2 text-3xl font-bold">{t?.forms?.docsTitle}</h2>
                                    <p className="text-muted-foreground">{t?.forms?.docsSubtitle}</p>
                                </div>

                                <div className="space-y-4">
                                    <Label>{t?.forms?.labels?.uploadFiles}</Label>
                                    <div className="flex gap-4">
                                        <input type="file" />
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <Button variant="outline" type="button" onClick={prevStep} className="h-12">
                                        {t?.common?.back}
                                    </Button>
                                    <Button type="submit" className="bg-primary h-12">
                                        {t?.common?.submit}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>
                </Card>
            </main>
        </div>
    )
}
