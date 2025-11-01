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
                <Button variant="sidebar-hover" className="w-full justify-start gap-3">
                    <Globe className="h-5 w-5" />
                    <span>{t?.sidebar?.navigation?.language || "Idioma"}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleLocaleChange("es")} className={locale === "es" ? "font-bold" : ""}>
                    🇪🇸 {t?.common?.languages?.es || "Español"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLocaleChange("en")} className={locale === "en" ? "font-bold" : ""}>
                    🇬🇧 {t?.common?.languages?.en || "English"}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
