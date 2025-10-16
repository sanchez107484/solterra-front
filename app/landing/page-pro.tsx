"use client"

import { FAQSectionPro } from "@/components/landing-pro/faq-section"
import { FooterSectionPro } from "@/components/landing-pro/footer-section"
import { HeroSectionPro } from "@/components/landing-pro/hero-section"
import { StatsSectionPro } from "@/components/landing-pro/stats-section"
import { TestimonialsSectionPro } from "@/components/landing-pro/testimonials-section"
import { SeccionBeneficios } from "@/components/seccion-beneficios"
import { SeccionComoFunciona } from "@/components/seccion-como-funciona"
import { SeccionCTA } from "@/components/seccion-cta"
import { Sidebar } from "@/components/sidebar"
import { getTranslations, type Locale } from "@/lib/i18n"
import { useEffect, useState } from "react"

export default function LandingPagePro() {
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

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 lg:ml-64">
                <HeroSectionPro />
                <StatsSectionPro />
                <SeccionBeneficios />
                <SeccionComoFunciona />
                <TestimonialsSectionPro />
                <FAQSectionPro />
                <SeccionCTA />
                <FooterSectionPro />
            </main>
        </div>
    )
}
