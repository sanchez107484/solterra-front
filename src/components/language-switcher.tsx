"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
import { useTranslations } from "@/src/i18n/i18nContext"

export function LanguageSwitcher() {
    const { t, locale, setLocale } = useTranslations()

    const handleLocaleChange = (newLocale: "es" | "en") => {
        setLocale(newLocale)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Globe className="h-5 w-5" />
                    <span className="sr-only">{t.cambiarIdioma}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleLocaleChange("es")} className={locale === "es" ? "font-bold" : ""}>
                    Español
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLocaleChange("en")} className={locale === "en" ? "font-bold" : ""}>
                    English
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
