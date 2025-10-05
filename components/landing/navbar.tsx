"use client"

import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import type { translations } from "@/lib/i18n"

type Translations = typeof translations.es

export function Navbar({ t }: { t: Translations }) {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary p-1.5">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">Solterra</span>
        </div>

        {/* Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {t.nav.home}
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {t.nav.howItWorks}
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {t.nav.about}
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {t.nav.contact}
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button variant="ghost" size="sm">
            Iniciar sesión
          </Button>
          <Button size="sm" className="hidden bg-primary hover:bg-primary/90 sm:inline-flex">
            Registrarse
          </Button>
        </div>
      </div>
    </nav>
  )
}
