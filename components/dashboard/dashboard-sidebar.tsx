"use client"

import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Briefcase, LayoutDashboard, Leaf, LogOut, MapPin, Settings, User, Zap } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "../../i18n/i18nContext"

interface DashboardSidebarProps {
    userType: "propietario" | "promotor"
}

export function DashboardSidebar({ userType }: DashboardSidebarProps) {
    const pathname = usePathname()
    const { t } = useTranslations()

    const isPropietario = userType === "propietario"
    const Icon = isPropietario ? Leaf : Zap
    const bgColor = isPropietario ? "bg-primary" : "bg-secondary"
    const textColor = isPropietario ? "text-primary" : "text-secondary-foreground"

    const navItems = isPropietario
        ? [
              { href: "/dashboard/propietario", label: "Dashboard", icon: LayoutDashboard },
              { href: "/dashboard/propietario/mis-terrenos", label: "Mis Terrenos", icon: MapPin },
              { href: "/dashboard/propietario/todos-proyectos", label: "Todos los Proyectos", icon: Briefcase },
              { href: "/dashboard/propietario/nuevo-terreno", label: "Añadir Terreno", icon: MapPin },
          ]
        : [
              { href: "/dashboard/promotor", label: "Dashboard", icon: LayoutDashboard },
              { href: "/dashboard/promotor/mis-proyectos", label: "Mis Proyectos", icon: Briefcase },
              { href: "/dashboard/promotor/nuevo-proyecto", label: "Nuevo Proyecto", icon: Briefcase },
              { href: "/dashboard/promotor/todos-terrenos", label: "Todos Terrenos", icon: MapPin },
          ]

    return (
        <aside className="bg-background fixed top-0 left-0 z-40 h-screen w-64 border-r">
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className="flex h-16 items-center gap-3 border-b px-6">
                    <Logo />
                    <div>
                        <span className="font-bold">Solterra</span>
                        <p className="text-muted-foreground text-xs capitalize">{userType}</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 p-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={cn("w-full justify-start gap-3", isActive && textColor)}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Button>
                            </Link>
                        )
                    })}
                </nav>

                <Separator />

                {/* User section */}
                <div className="space-y-1 p-4">
                    <Link href="/perfil">
                        <Button variant="ghost" className="w-full justify-start gap-3">
                            <User className="h-4 w-4" />
                            Mi Perfil
                        </Button>
                    </Link>
                    <Link href="/dashboard/configuracion">
                        <Button variant="ghost" className="w-full justify-start gap-3">
                            <Settings className="h-4 w-4" />
                            Configuración
                        </Button>
                    </Link>
                    <Separator className="my-2" />
                    <Link href="/">
                        <Button variant="ghost" className="text-destructive hover:text-destructive w-full justify-start gap-3">
                            <LogOut className="h-4 w-4" />
                            Cerrar Sesión
                        </Button>
                    </Link>
                </div>
            </div>
        </aside>
    )
}
