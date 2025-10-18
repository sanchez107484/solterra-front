"use client"

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { SeccionComoFunciona } from "@/components/landing/seccion-como-funciona"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getTranslations, type Locale } from "@/lib/i18n"
import { BookOpen, HelpCircle } from "lucide-react"
import { useEffect, useState } from "react"

export default function DashboardAyuda() {
    const [locale, setLocale] = useState<Locale>("es")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const saved = (localStorage.getItem("locale") as Locale) || "es"
        setLocale(saved)
    }, [])

    if (!mounted) return null

    const t = getTranslations(locale)

    return (
        <div className="bg-background flex min-h-screen">
            <DashboardSidebar userType="propietario" />

            <main className="ml-64 flex-1">
                {/* Header */}
                <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 border-b backdrop-blur">
                    <div className="flex h-16 items-center justify-between px-8">
                        <div>
                            <h1 className="text-2xl font-bold">{t?.dashboard?.help?.title}</h1>
                            <p className="text-muted-foreground text-sm">{t?.dashboard?.help?.subtitle}</p>
                        </div>
                        <Button variant="outline" className="gap-2">
                            <HelpCircle className="h-4 w-4" />
                            {t?.dashboard?.help?.contactSupport}
                        </Button>
                    </div>
                </header>

                {/* Intro Card */}
                <div className="px-8 py-6">
                    <Card className="border-primary/20 from-primary/5 bg-gradient-to-br to-transparent p-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 shrink-0 rounded-xl p-3">
                                <BookOpen className="text-primary h-8 w-8" />
                            </div>
                            <div>
                                <h2 className="mb-2 text-2xl font-bold">{t?.dashboard?.help?.firstTimeTitle}</h2>
                                <p className="text-muted-foreground text-lg">{t?.dashboard?.help?.firstTimeDescOwner}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Componente SeccionComoFunciona en modo compacto sin CTAs */}
                <SeccionComoFunciona showCTA={false} compactMode={true} />
            </main>
        </div>
    )
}
