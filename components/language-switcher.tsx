"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTranslations } from "@/i18n/i18nContext"
import { Globe } from "lucide-react"

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
                    {t?.common?.languages?.es}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLocaleChange("en")} className={locale === "en" ? "font-bold" : ""}>
                    {t?.common?.languages?.en}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
