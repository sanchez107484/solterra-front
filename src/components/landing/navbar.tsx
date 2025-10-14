"use client"

import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import type { translations } from "@/src/lib/i18n"

type Translations = typeof translations.es

export function Navbar({ t }: { t: Translations }) {
    return (
        <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="bg-primary rounded-lg p-1.5">
                        <Leaf className="text-primary-foreground h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold">Solterra</span>
                </div>

                {/* Navigation */}
                <div className="hidden items-center gap-6 md:flex">
                    <a href="#" className="text-muted-foreground hover:text-foreground text-sm font-medium">
                        {t.nav.home}
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-foreground text-sm font-medium">
                        {t.nav.howItWorks}
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-foreground text-sm font-medium">
                        {t.nav.about}
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-foreground text-sm font-medium">
                        {t.nav.contact}
                    </a>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <Button variant="ghost" size="sm">
                        Iniciar sesión
                    </Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 hidden sm:inline-flex">
                        Registrarse
                    </Button>
                </div>
            </div>
        </nav>
    )
}
