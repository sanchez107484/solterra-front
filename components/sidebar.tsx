"use client"

import { LanguageSwitcher } from "@/components/language-switcher"
import Logo from "@/components/logo"
import { SidebarUserMenu } from "@/components/sidebar-user-menu"
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useAuth } from "@/contexts/AuthContext"
import { Home, Info, Mail, Menu, Settings, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useTranslations } from "../i18n/i18nContext"

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    const { t } = useTranslations()
    const { auth } = useAuth()
    const pathname = usePathname()

    return (
        <>
            {/* Mobile menu button */}
            <Button
                variant="ghost"
                size="icon"
                aria-label={isOpen ? t?.common?.closeMenu : t?.common?.openMenu}
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
                        <Logo />
                        <div>
                            <span className="text-sidebar-foreground text-xl font-bold">Solterra</span>
                            <p className="text-muted-foreground text-xs">Advisory</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2 p-4">
                        <Link href="/">
                            <Button
                                variant={pathname === "/" ? "sidebar-active" : "sidebar-hover"}
                                className="w-full justify-start gap-3"
                                onClick={() => setIsOpen(false)}
                            >
                                <Home className="h-5 w-5" />
                                {t.nav?.home}
                            </Button>
                        </Link>

                        {/* Menú de servicios profesional y consistente */}
                        <Link href="/servicios">
                            <Button
                                variant={pathname === "/servicios" ? "sidebar-active" : "sidebar-hover"}
                                className="w-full justify-start gap-3"
                            >
                                <Settings className="h-5 w-5" />
                                {t.nav?.services || "Servicios"}
                            </Button>
                        </Link>

                        <Link href="/nosotros">
                            <Button
                                variant={pathname === "/nosotros" ? "sidebar-active" : "sidebar-hover"}
                                className="w-full justify-start gap-3"
                                onClick={() => setIsOpen(false)}
                            >
                                <Info className="h-5 w-5" />
                                {t.nav?.about}
                            </Button>
                        </Link>
                        <Link href="/contacto">
                            <Button
                                variant={pathname === "/contacto" ? "sidebar-active" : "sidebar-hover"}
                                className="w-full justify-start gap-3"
                                onClick={() => setIsOpen(false)}
                            >
                                <Mail className="h-5 w-5" />
                                {t.nav?.contact}
                            </Button>
                        </Link>
                    </nav>

                    {/* Bottom actions */}
                    <div className="border-sidebar-border space-y-2 border-t p-4">
                        {auth.isAuthenticated && auth.user ? (
                            // Usuario autenticado: mostrar UserMenu
                            <SidebarUserMenu />
                        ) : (
                            // Usuario no autenticado: mostrar botones de login/registro
                            <>
                                <LanguageSwitcher />
                                <Link href="/login/propietario" className="block">
                                    <Button
                                        variant="sidebar-hover"
                                        className="border-primary/20 bg-background hover:border-primary/40 hover:bg-primary/5 w-full justify-center gap-2 border"
                                    >
                                        <span>{t?.common?.login}</span>
                                    </Button>
                                </Link>
                                <Link href="/registro/propietario" className="block">
                                    <Button className="from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 w-full justify-center gap-2 bg-gradient-to-r shadow-md transition-all duration-200 hover:shadow-lg">
                                        <span>{t?.common?.register}</span>
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)} />}
        </>
    )
}
