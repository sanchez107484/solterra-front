"use client"

import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { Home, Info, Leaf, Mail, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useTranslations } from "../i18n/i18nContext"

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    const { t } = useTranslations()

    return (
        <>
            {/* Mobile menu button */}
            <Button
                variant="ghost"
                size="icon"
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                className="fixed top-4 left-4 z-50 lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {/* Sidebar */}
            <aside
                className={`border-sidebar-border bg-sidebar fixed top-0 left-0 z-40 h-screen w-64 border-r transition-transform lg:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="border-sidebar-border flex items-center gap-3 border-b p-6">
                        <div className="bg-primary rounded-xl p-2.5 shadow-lg">
                            <Leaf className="text-primary-foreground h-6 w-6" />
                        </div>
                        <div>
                            <span className="text-sidebar-foreground text-xl font-bold">Solterra</span>
                            <p className="text-muted-foreground text-xs">Advisory</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2 p-4">
                        <Link href="/">
                            <Button
                                variant="ghost"
                                className="text-sidebar-foreground hover:bg-sidebar-accent w-full justify-start gap-3"
                                onClick={() => setIsOpen(false)}
                            >
                                <Home className="h-5 w-5" />
                                {t.nav?.home}
                            </Button>
                        </Link>
                        <Link href="/nosotros">
                            <Button
                                variant="ghost"
                                className="text-sidebar-foreground hover:bg-sidebar-accent w-full justify-start gap-3"
                                onClick={() => setIsOpen(false)}
                            >
                                <Info className="h-5 w-5" />
                                {t.nav?.about}
                            </Button>
                        </Link>
                        <Link href="/contacto">
                            <Button
                                variant="ghost"
                                className="text-sidebar-foreground hover:bg-sidebar-accent w-full justify-start gap-3"
                                onClick={() => setIsOpen(false)}
                            >
                                <Mail className="h-5 w-5" />
                                {t.nav?.contact}
                            </Button>
                        </Link>
                    </nav>

                    {/* Bottom actions */}
                    <div className="border-sidebar-border space-y-3 border-t p-4">
                        <LanguageSwitcher />
                        <Link href="/login/propietario" className="block">
                            <Button variant="outline" className="w-full bg-transparent">
                                Iniciar sesión
                            </Button>
                        </Link>
                        <Link href="/login/propietario" className="block">
                            <Button className="bg-primary hover:bg-primary/90 w-full">Registrarse</Button>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)} />}
        </>
    )
}
