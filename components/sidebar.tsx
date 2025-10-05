"use client"

import { Button } from "@/components/ui/button"
import { Leaf, Home, Info, Mail, Menu, X } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import type { translations } from "@/lib/i18n"
import { useState } from "react"
import Link from "next/link"

type Translations = typeof translations.es

export function Sidebar({ t }: { t: Translations }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar transition-transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 border-b border-sidebar-border p-6">
            <div className="rounded-xl bg-primary p-2.5 shadow-lg">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xl font-bold text-sidebar-foreground">Solterra</span>
              <p className="text-xs text-muted-foreground">Advisory</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
                onClick={() => setIsOpen(false)}
              >
                <Home className="h-5 w-5" />
                {t.nav.home}
              </Button>
            </Link>
            <Link href="/como-funciona">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
                onClick={() => setIsOpen(false)}
              >
                <Info className="h-5 w-5" />
                {t.nav.howItWorks}
              </Button>
            </Link>
            <Link href="/nosotros">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
                onClick={() => setIsOpen(false)}
              >
                <Info className="h-5 w-5" />
                {t.nav.about}
              </Button>
            </Link>
            <Link href="/contacto">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
                onClick={() => setIsOpen(false)}
              >
                <Mail className="h-5 w-5" />
                {t.nav.contact}
              </Button>
            </Link>
          </nav>

          {/* Bottom actions */}
          <div className="space-y-3 border-t border-sidebar-border p-4">
            <LanguageSwitcher />
            <Link href="/login/propietario" className="block">
              <Button variant="outline" className="w-full bg-transparent">
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/login/propietario" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90">Registrarse</Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
