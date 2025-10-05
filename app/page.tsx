"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { SeccionHero } from "@/components/seccion-hero"
import { SeccionBeneficios } from "@/components/seccion-beneficios"
import { SeccionComoFunciona } from "@/components/seccion-como-funciona"
import { SeccionCTA } from "@/components/seccion-cta"
import { Footer } from "@/components/footer"
import { getTranslations, type Locale } from "@/lib/i18n"

export default function LandingPage() {
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
      <Sidebar t={t} />
      <main className="flex-1 lg:ml-64">
        <SeccionHero t={t} />
        <SeccionBeneficios t={t} />
        <SeccionComoFunciona t={t} />
        <SeccionCTA t={t} />
        <Footer t={t} />
      </main>
    </div>
  )
}
