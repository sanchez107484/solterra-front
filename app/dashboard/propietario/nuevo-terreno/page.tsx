"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useTerrenos } from "@/hooks/useTerrenos"
import { useTranslations } from "@/i18n/i18nContext"
import type { CreateTerrenoDTO, DisponibilidadTerreno, TipoSuelo, TipoTerreno } from "@/types/terreno.types"
import { ArrowLeft, Check, ChevronRight, Home, Leaf, Loader2, MapPin, Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NuevoTerreno() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [error, setError] = useState<string | null>(null)
    const { createTerreno, isLoading } = useTerrenos({ autoFetch: false })
    const { t } = useTranslations()

    const [formData, setFormData] = useState({
        ubicacion: "",
        provincia: "",
        municipio: "",
        hectareas: "",
        tipo: "Solar" as TipoTerreno,
        disponibilidad: "AMBOS",
        descripcion: "",
        lat: "",
        lng: "",
    })

    const [validationErrors, setValidationErrors] = useState<string[]>([])

    const validate = (): string[] => {
        const errs: string[] = []
        if (!formData.provincia.trim()) errs.push("La provincia es obligatoria.")
        if (!formData.municipio.trim()) errs.push("El municipio es obligatorio.")
        const hect = Number(formData.hectareas)
        if (!formData.hectareas || isNaN(hect) || hect <= 0) errs.push("Introduce una superficie válida (hectáreas > 0).")
        if (formData.lat && isNaN(Number(formData.lat))) errs.push("Latitud inválida.")
        if (formData.lng && isNaN(Number(formData.lng))) errs.push("Longitud inválida.")
        if (formData.lat) {
            const lat = Number(formData.lat)
            if (lat < -90 || lat > 90) errs.push("La latitud debe estar entre -90 y 90.")
        }
        if (formData.lng) {
            const lng = Number(formData.lng)
            if (lng < -180 || lng > 180) errs.push("La longitud debe estar entre -180 y 180.")
        }
        return errs
    }

    // Reglas de mapeo (implementadas más abajo):
    // - tipo: "Solar" | "Eólico" | "Otro"
    // - si superficie >= 5 ha -> TipoSuelo.NO_URBANIZABLE (proyectos de escala)
    // - si superficie < 5 ha -> TipoSuelo.RUSTICO_COMUN
    // - "Otro" -> RUSTICO_COMUN por defecto
    // Disponibilidad por defecto según tipo (regla simple):
    // - Solar / Eólico -> AMBOS
    // - Otro -> VENTA

    const mapTipoToTipoSuelo = (tipo: TipoTerreno, superficieHect?: number) => {
        if (tipo === "Otro") return "RUSTICO_COMUN" as unknown as TipoSuelo
        if (superficieHect && superficieHect >= 5) return "NO_URBANIZABLE" as unknown as TipoSuelo
        return "RUSTICO_COMUN" as unknown as TipoSuelo
    }

    const mapTipoToDisponibilidad = (tipo: TipoTerreno) => {
        if (tipo === "Otro") return "VENTA" as unknown as DisponibilidadTerreno
        return "AMBOS" as unknown as DisponibilidadTerreno
    }

    const showValidation = (errs: string[]) => {
        setValidationErrors(errs)
        if (errs.length > 0) {
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    const clearValidation = () => setValidationErrors([])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        // validación
        const errs = validate()
        if (errs.length > 0) {
            showValidation(errs)
            return
        }
        clearValidation()

        try {
            const superficie = Number(formData.hectareas)
            const tipoSuelo = mapTipoToTipoSuelo(formData.tipo, superficie)
            const disponibilidad = (formData.disponibilidad as string)
                ? (formData.disponibilidad as unknown as DisponibilidadTerreno)
                : mapTipoToDisponibilidad(formData.tipo)

            // Mapear formulario al DTO esperado por el backend
            const payload: CreateTerrenoDTO = {
                titulo: formData.ubicacion || `${formData.municipio}, ${formData.provincia}`,
                descripcion: formData.descripcion || null,
                direccion: formData.ubicacion || `${formData.municipio}, ${formData.provincia}`,
                municipio: formData.municipio || "",
                provincia: formData.provincia || "",
                codigoPostal: "",
                latitud: formData.lat ? parseFloat(formData.lat) : 0,
                longitud: formData.lng ? parseFloat(formData.lng) : 0,
                poligonoGeoJson: null,

                superficie: superficie,
                tipoSuelo,
                referenciaCatastral: null,

                disponibilidad,
                precioVenta: null,
                precioArrendamiento: null,

                orientacion: null,
                pendiente: null,
                distanciaRed: null,
                potencialSolar: null,
                potencialEolico: null,

                distanciaSubestacion: null,
                nombreSubestacion: null,
                capacidadSubestacion: null,

                servidumbres: null,
                restriccionesAmbientales: null,
                zonasProtegidas: false,
            }

            // Crear terreno en el backend (CreateTerrenoDTO)
            await createTerreno(payload)

            // Redirigir al dashboard con mensaje de éxito
            router.push("/dashboard/propietario?success=terreno-creado")
        } catch (err: any) {
            console.error("Error al crear terreno:", err)
            setError(err.message || "Error al crear el terreno. Por favor, inténtalo de nuevo.")
        }
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
                        <span className={step >= 1 ? "text-foreground font-medium" : "text-muted-foreground"}>
                            {t?.dashboard?.forms?.basicInfo}
                        </span>
                        <span className={step >= 2 ? "text-foreground font-medium" : "text-muted-foreground"}>
                            {t?.dashboard?.forms?.technicalDetails}
                        </span>
                        <span className={step >= 3 ? "text-foreground font-medium" : "text-muted-foreground"}>
                            {t?.dashboard?.forms?.documentation}
                        </span>
                    </div>
                </div>

                <Card className="border-2 p-8 shadow-xl">
                    {validationErrors.length > 0 && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
                            <p className="font-medium">Errores en el formulario</p>
                            <ul className="mt-2 list-disc pl-5 text-sm">
                                {validationErrors.map((ve, i) => (
                                    <li key={i}>{ve}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
                            <p className="font-medium">Error</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div className="space-y-6">
                                <div className="mb-8 text-center">
                                    <div className="bg-primary/10 mb-4 inline-flex rounded-2xl p-4">
                                        <MapPin className="text-primary h-10 w-10" />
                                    </div>
                                    <h2 className="mb-2 text-3xl font-bold">{t?.dashboard?.forms?.landBasicTitle}</h2>
                                    <p className="text-muted-foreground">{t?.dashboard?.forms?.landBasicSubtitle}</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ubicacion">{t?.dashboard?.forms?.labels?.landName}</Label>
                                    <Input
                                        id="ubicacion"
                                        placeholder={t?.dashboard?.forms?.examples?.landName}
                                        className="h-12"
                                        value={formData.ubicacion}
                                        onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                                    />
                                    <p className="text-muted-foreground text-xs">
                                        Opcional: nombre descriptivo para identificar el terreno
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="provincia">{t?.dashboard?.forms?.labels?.province}</Label>
                                        <Input
                                            id="provincia"
                                            placeholder={t?.dashboard?.forms?.examples?.province}
                                            className="h-12"
                                            value={formData.provincia}
                                            onChange={(e) => setFormData({ ...formData, provincia: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="municipio">{t?.dashboard?.forms?.labels?.municipality}</Label>
                                        <Input
                                            id="municipio"
                                            placeholder={t?.dashboard?.forms?.examples?.municipality}
                                            className="h-12"
                                            value={formData.municipio}
                                            onChange={(e) => setFormData({ ...formData, municipio: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="hectareas">{t?.dashboard?.forms?.labels?.hectares}</Label>
                                    <Input
                                        id="hectareas"
                                        type="number"
                                        step="0.1"
                                        placeholder={t?.dashboard?.forms?.examples?.hectares}
                                        className="h-12"
                                        value={formData.hectareas}
                                        onChange={(e) => setFormData({ ...formData, hectareas: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>{t?.dashboard?.forms?.labels?.preferredProject}</Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, tipo: "Solar" })}
                                            className={`rounded-xl border-2 p-6 text-left transition-all ${formData.tipo === "Solar" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                                        >
                                            <div className="mb-1 font-semibold">{t?.forms?.examples?.solar}</div>
                                            <div className="text-muted-foreground text-sm">{t?.forms?.examples?.solarDesc}</div>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, tipo: "Eólico" })}
                                            className={`rounded-xl border-2 p-6 text-left transition-all ${formData.tipo === "Eólico" ? "border-secondary bg-secondary/5" : "border-border hover:border-secondary/50"}`}
                                        >
                                            <div className="mb-1 font-semibold">{t?.forms?.examples?.wind}</div>
                                            <div className="text-muted-foreground text-sm">{t?.forms?.examples?.windDesc}</div>
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="disponibilidad">Disponibilidad</Label>
                                    <select
                                        id="disponibilidad"
                                        className="w-full rounded-md border px-3 py-2"
                                        value={(formData as any).disponibilidad}
                                        onChange={(e) => setFormData({ ...formData, disponibilidad: e.target.value })}
                                    >
                                        <option value="VENTA">Venta</option>
                                        <option value="ARRENDAMIENTO">Arrendamiento</option>
                                        <option value="DERECHO_SUPERFICIE">Derecho superficie</option>
                                        <option value="AMBOS">Ambos</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="descripcion">{t?.dashboard?.forms?.labels?.description}</Label>
                                    <Textarea
                                        id="descripcion"
                                        placeholder={t?.dashboard?.forms?.examples?.landDescription}
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
                                    <h2 className="mb-2 text-3xl font-bold">{t?.dashboard?.forms?.technicalTitle}</h2>
                                    <p className="text-muted-foreground">{t?.dashboard?.forms?.technicalSubtitle}</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="lat">{t?.dashboard?.forms?.labels?.coordinates}</Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            id="lat"
                                            type="number"
                                            step="any"
                                            placeholder="Latitud (ej: 40.4168)"
                                            className="h-12"
                                            value={formData.lat}
                                            onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                                        />
                                        <Input
                                            id="lng"
                                            type="number"
                                            step="any"
                                            placeholder="Longitud (ej: -3.7038)"
                                            className="h-12"
                                            value={formData.lng}
                                            onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                                        />
                                    </div>
                                    <p className="text-muted-foreground text-xs">Opcional: coordenadas GPS del terreno</p>
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
                                    <h2 className="mb-2 text-3xl font-bold">{t?.dashboard?.forms?.docsTitle}</h2>
                                    <p className="text-muted-foreground">{t?.dashboard?.forms?.docsSubtitle}</p>
                                </div>

                                <div className="space-y-4">
                                    <Label>{t?.dashboard?.forms?.labels?.uploadFiles}</Label>
                                    <div className="flex gap-4">
                                        <input type="file" />
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <Button variant="outline" type="button" onClick={prevStep} className="h-12">
                                        {t?.common?.back}
                                    </Button>
                                    <Button type="submit" className="bg-primary h-12 gap-2" disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Creando...
                                            </>
                                        ) : (
                                            t?.common?.submit
                                        )}
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
