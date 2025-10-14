"use client"

import { Sidebar } from "@/src/components/sidebar"
import { Footer } from "@/src/components/footer"
import { SeccionHero } from "@/src/components/seccion-hero"
import { SeccionBeneficios } from "@/src/components/seccion-beneficios"
import { SeccionComoFunciona } from "@/src/components/seccion-como-funciona"
import { SeccionCTA } from "@/src/components/seccion-cta"
import { useTranslations } from "@/src/i18n/i18nContext"

export default function LandingPage() {
    const { t } = useTranslations()

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 lg:ml-64">
                <SeccionHero />
                <SeccionBeneficios />
                <SeccionComoFunciona />
                <SeccionCTA />
                <Footer />
            </main>
        </div>
    )
}
