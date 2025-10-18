"use client"

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { SeccionComoFunciona } from "@/components/landing/seccion-como-funciona"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getTranslations, type Locale } from "@/lib/i18n"
import { BookOpen, HelpCircle } from "lucide-react"
import { useEffect, useState } from "react"

export default function DashboardAyudaPromotor() {
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
            <DashboardSidebar userType="promotor" />

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
                    <Card className="border-secondary/20 from-secondary/5 bg-gradient-to-br to-transparent p-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-secondary/10 shrink-0 rounded-xl p-3">
                                <BookOpen className="text-secondary-foreground h-8 w-8" />
                            </div>
                            <div>
                                <h2 className="mb-2 text-2xl font-bold">{t?.dashboard?.help?.firstTimeTitle}</h2>
                                <p className="text-muted-foreground text-lg">{t?.dashboard?.help?.firstTimeDesc}</p>
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
