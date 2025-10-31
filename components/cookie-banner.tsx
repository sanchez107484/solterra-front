"use client"

import { Button } from "@/components/ui/button"
import { Check, Cookie, Settings, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface CookieConsent {
    necessary: boolean
    analytics: boolean
    functional: boolean
    timestamp: number
}

export function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [preferences, setPreferences] = useState<CookieConsent>({
        necessary: true, // Siempre true (no se puede desactivar)
        analytics: false,
        functional: false,
        timestamp: Date.now(),
    })

    useEffect(() => {
        // Verificar si ya existe consentimiento
        const consent = localStorage.getItem("cookie_consent")
        if (!consent) {
            // Mostrar banner después de un pequeño delay
            setTimeout(() => setShowBanner(true), 1000)
        }
    }, [])

    const saveConsent = (consent: CookieConsent) => {
        localStorage.setItem("cookie_consent", JSON.stringify(consent))
        setShowBanner(false)
        setShowSettings(false)

        // Aquí puedes inicializar los servicios según el consentimiento
        if (consent.analytics) {
            // Inicializar Google Analytics
            console.log("Analytics habilitado")
        }
        if (consent.functional) {
            // Inicializar cookies funcionales
            console.log("Cookies funcionales habilitadas")
        }
    }

    const acceptAll = () => {
        const consent: CookieConsent = {
            necessary: true,
            analytics: true,
            functional: true,
            timestamp: Date.now(),
        }
        saveConsent(consent)
    }

    const acceptNecessary = () => {
        const consent: CookieConsent = {
            necessary: true,
            analytics: false,
            functional: false,
            timestamp: Date.now(),
        }
        saveConsent(consent)
    }

    const acceptCustom = () => {
        const consent: CookieConsent = {
            ...preferences,
            timestamp: Date.now(),
        }
        saveConsent(consent)
    }

    if (!showBanner) return null

    return (
        <>
            {/* Overlay oscuro cuando se muestran configuraciones */}
            {showSettings && <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm" onClick={() => setShowSettings(false)} />}

            {/* Banner principal */}
            <div className="animate-in slide-in-from-bottom fixed right-0 bottom-0 left-0 z-[9999] duration-500">
                <div className="border-t bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
                    {/* Banner simple */}
                    {!showSettings && (
                        <div className="container mx-auto px-4 py-6">
                            <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex flex-1 items-start gap-4">
                                    <div className="bg-primary/10 flex-shrink-0 rounded-full p-3">
                                        <Cookie className="text-primary h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                            Usamos cookies para mejorar tu experiencia
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Utilizamos cookies propias y de terceros para analizar el uso del sitio web y mostrarte
                                            publicidad relacionada con tus preferencias. Si continúas navegando, consideramos que aceptas su
                                            uso.{" "}
                                            <Link href="/legal/cookies" className="text-primary hover:underline">
                                                Más información
                                            </Link>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex w-full flex-wrap items-center gap-3 lg:w-auto lg:flex-nowrap">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowSettings(true)}
                                        className="w-full gap-2 lg:w-auto"
                                    >
                                        <Settings className="h-4 w-4" />
                                        Configurar
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={acceptNecessary} className="w-full lg:w-auto">
                                        Solo necesarias
                                    </Button>
                                    <Button onClick={acceptAll} size="sm" className="bg-primary hover:bg-primary/90 w-full lg:w-auto">
                                        <Check className="mr-2 h-4 w-4" />
                                        Aceptar todas
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Panel de configuración detallada */}
                    {showSettings && (
                        <div className="container mx-auto max-h-[80vh] overflow-y-auto px-4 py-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Configuración de Cookies</h3>
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                                Aquí puedes ver y controlar qué cookies utilizamos. Puedes obtener más información sobre cada categoría en
                                nuestra{" "}
                                <Link href="/legal/cookies" className="text-primary hover:underline">
                                    Política de Cookies
                                </Link>
                                .
                            </p>

                            <div className="space-y-4">
                                {/* Cookies necesarias */}
                                <div className="rounded-lg border bg-gray-50 p-4 dark:bg-gray-800/50">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="mb-2 flex items-center gap-2">
                                                <h4 className="font-semibold text-gray-900 dark:text-white">Cookies Necesarias</h4>
                                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                                    Siempre activas
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Estas cookies son esenciales para que el sitio web funcione correctamente. No se pueden
                                                desactivar.
                                            </p>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <div className="bg-primary flex h-6 w-11 cursor-not-allowed items-center rounded-full">
                                                <div className="h-5 w-5 translate-x-6 transform rounded-full bg-white shadow-md transition" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Cookies analíticas */}
                                <div className="rounded-lg border p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Cookies Analíticas</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Nos ayudan a entender cómo los visitantes interactúan con el sitio web, recopilando
                                                información de forma anónima.
                                            </p>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <button
                                                onClick={() => setPreferences({ ...preferences, analytics: !preferences.analytics })}
                                                className={`flex h-6 w-11 items-center rounded-full transition-colors ${
                                                    preferences.analytics ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                                                }`}
                                            >
                                                <div
                                                    className={`h-5 w-5 transform rounded-full bg-white shadow-md transition ${
                                                        preferences.analytics ? "translate-x-6" : "translate-x-1"
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Cookies funcionales */}
                                <div className="rounded-lg border p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Cookies Funcionales</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Permiten mejorar la funcionalidad y personalización del sitio, como recordar tus
                                                preferencias.
                                            </p>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <button
                                                onClick={() => setPreferences({ ...preferences, functional: !preferences.functional })}
                                                className={`flex h-6 w-11 items-center rounded-full transition-colors ${
                                                    preferences.functional ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                                                }`}
                                            >
                                                <div
                                                    className={`h-5 w-5 transform rounded-full bg-white shadow-md transition ${
                                                        preferences.functional ? "translate-x-6" : "translate-x-1"
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                                <Button variant="outline" onClick={acceptNecessary} className="w-full sm:w-auto">
                                    Solo necesarias
                                </Button>
                                <Button onClick={acceptCustom} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                                    Guardar preferencias
                                </Button>
                                <Button onClick={acceptAll} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                                    Aceptar todas
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
