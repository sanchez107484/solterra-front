"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { getTranslations, Translations } from "./index"
import { defaultLocale, Locale } from "./config"

interface I18nContextProps {
    locale: Locale
    t: Translations
    setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined)

export const I18nProvider = ({ children }: { children: ReactNode }) => {
    const [locale, setLocale] = useState<Locale>(defaultLocale)
    const [t, setTranslations] = useState<Translations>({} as Translations)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        // Cargar idioma desde localStorage
        const saved = localStorage.getItem("locale") as Locale
        if (saved) setLocale(saved)
        setMounted(true)
    }, [])

    useEffect(() => {
        getTranslations(locale).then(setTranslations)
        localStorage.setItem("locale", locale)
    }, [locale])

    if (!mounted) return null

    return <I18nContext.Provider value={{ locale, t, setLocale }}>{children}</I18nContext.Provider>
}

export const useTranslations = () => {
    const context = useContext(I18nContext)
    if (!context) throw new Error("useTranslations debe usarse dentro de I18nProvider")
    return context
}
