"use client"

import Logo from "@/components/logo"
import { LogoutConfirmationModal } from "@/components/modals/logout-confirmation-modal"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/contexts/AuthContext"
import { useSidebar } from "@/contexts/SidebarContext"
import { useTranslations } from "@/i18n/i18nContext"
import { cn } from "@/lib/utils"
import {
    Briefcase,
    ChevronLeft,
    ChevronRight,
    CirclePlus,
    Globe,
    Home,
    LayoutDashboard,
    Leaf,
    LogOut,
    MapPin,
    Settings,
    User,
    Zap,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

interface DashboardSidebarProps {
    userType: "propietario" | "promotor"
}

export function DashboardSidebar({ userType }: DashboardSidebarProps) {
    const pathname = usePathname()
    const { t, locale, setLocale } = useTranslations()
    const { logout } = useAuth()
    const router = useRouter()
    const { isCollapsed, setIsCollapsed } = useSidebar()
    const [showLogoutModal, setShowLogoutModal] = useState(false)

    const isPropietario = userType === "propietario"
    const Icon = isPropietario ? Leaf : Zap
    const bgColor = isPropietario ? "bg-primary" : "bg-secondary"
    const textColor = isPropietario ? "text-primary" : "text-secondary-foreground"

    const navItems = isPropietario
        ? [
              { href: "/dashboard/propietario", label: t?.sidebar?.navigation?.dashboard || "Dashboard", icon: LayoutDashboard },
              { href: "/dashboard/propietario/mis-terrenos", label: t?.sidebar?.navigation?.myLands || "Mis Terrenos", icon: MapPin },
              {
                  href: "/dashboard/propietario/todos-proyectos",
                  label: t?.sidebar?.navigation?.allProjects || "Todos los Proyectos",
                  icon: Briefcase,
              },
              {
                  href: "/dashboard/propietario/nuevo-terreno",
                  label: t?.sidebar?.navigation?.addLand || "Añadir Terreno",
                  icon: CirclePlus,
              },
          ]
        : [
              { href: "/dashboard/promotor", label: t?.sidebar?.navigation?.dashboard || "Dashboard", icon: LayoutDashboard },
              { href: "/dashboard/promotor/mis-proyectos", label: t?.sidebar?.navigation?.myProjects || "Mis Proyectos", icon: Briefcase },
              {
                  href: "/dashboard/promotor/todos-terrenos",
                  label: t?.sidebar?.navigation?.allLands || "Todos los Terrenos",
                  icon: MapPin,
              },
              {
                  href: "/dashboard/promotor/nuevo-proyecto",
                  label: t?.sidebar?.navigation?.addProject || "Añadir Proyecto",
                  icon: CirclePlus,
              },
          ]

    const handleLogout = async () => {
        setShowLogoutModal(true)
    }

    const confirmLogout = async () => {
        setShowLogoutModal(false)
        await logout()
        router.push("/")
    }

    const cancelLogout = () => {
        setShowLogoutModal(false)
    }

    return (
        <aside
            className={cn(
                "bg-background fixed top-0 left-0 z-40 h-screen border-r transition-all duration-300 ease-in-out",
                isCollapsed ? "w-16" : "w-64"
            )}
        >
            <div className="flex h-full flex-col">
                {/* Logo y Toggle */}
                <div className="flex h-16 items-center border-b px-4">
                    {!isCollapsed ? (
                        <>
                            <div className="flex flex-1 items-center gap-3">
                                <Logo size={30} />
                                <div>
                                    <span className="font-bold">Solterra</span>
                                    <p className="text-muted-foreground text-xs capitalize">{userType}</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className="h-8 w-8 flex-shrink-0"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                        </>
                    ) : (
                        <div className="flex w-full items-center justify-center">
                            <Logo size={25} className="ml-4 h-6 w-6" />
                            <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="mr-2 h-4 w-4">
                                <ChevronRight className="h-3. w-3.5" />
                            </Button>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 p-2">
                    <TooltipProvider>
                        {navItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Tooltip key={item.href} delayDuration={300}>
                                    <TooltipTrigger asChild>
                                        <Link href={item.href}>
                                            <Button
                                                variant={
                                                    isActive
                                                        ? isPropietario
                                                            ? "sidebar-active"
                                                            : "sidebar-active-secondary"
                                                        : isPropietario
                                                          ? "sidebar-hover"
                                                          : "sidebar-hover-secondary"
                                                }
                                                className={cn(
                                                    "w-full transition-all duration-200",
                                                    isCollapsed ? "justify-center px-2" : "justify-start gap-3 px-3"
                                                )}
                                            >
                                                <item.icon className="h-4 w-4 flex-shrink-0" />
                                                {!isCollapsed && <span className="truncate">{item.label}</span>}
                                            </Button>
                                        </Link>
                                    </TooltipTrigger>
                                    {isCollapsed && (
                                        <TooltipContent side="right">
                                            <p>{item.label}</p>
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                            )
                        })}
                    </TooltipProvider>
                </nav>

                <Separator />

                {/* User section */}
                <div className="space-y-1 p-2">
                    <TooltipProvider>
                        {/* Volver al inicio */}
                        <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                                <Link href="/">
                                    <Button
                                        variant={
                                            pathname === "/"
                                                ? isPropietario
                                                    ? "sidebar-active"
                                                    : "sidebar-active-secondary"
                                                : isPropietario
                                                  ? "sidebar-hover"
                                                  : "sidebar-hover-secondary"
                                        }
                                        className={cn(
                                            "w-full transition-all duration-200",
                                            isCollapsed ? "justify-center px-2" : "justify-start gap-3 px-3"
                                        )}
                                    >
                                        <Home className="h-4 w-4 flex-shrink-0" />
                                        {!isCollapsed && (
                                            <span className="truncate">{t?.sidebar?.navigation?.backToHome || "Volver al inicio"}</span>
                                        )}
                                    </Button>
                                </Link>
                            </TooltipTrigger>
                            {isCollapsed && (
                                <TooltipContent side="right">
                                    <p>{t?.sidebar?.navigation?.backToHome || "Volver al inicio"}</p>
                                </TooltipContent>
                            )}
                        </Tooltip>

                        {/* Mi Perfil */}
                        <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                                <Link href="/perfil">
                                    <Button
                                        variant={
                                            pathname === "/perfil"
                                                ? isPropietario
                                                    ? "sidebar-active"
                                                    : "sidebar-active-secondary"
                                                : isPropietario
                                                  ? "sidebar-hover"
                                                  : "sidebar-hover-secondary"
                                        }
                                        className={cn(
                                            "w-full transition-all duration-200",
                                            isCollapsed ? "justify-center px-2" : "justify-start gap-3 px-3"
                                        )}
                                    >
                                        <User className="h-4 w-4 flex-shrink-0" />
                                        {!isCollapsed && (
                                            <span className="truncate">{t?.sidebar?.navigation?.myProfile || "Mi Perfil"}</span>
                                        )}
                                    </Button>
                                </Link>
                            </TooltipTrigger>
                            {isCollapsed && (
                                <TooltipContent side="right">
                                    <p>{t?.sidebar?.navigation?.myProfile || "Mi Perfil"}</p>
                                </TooltipContent>
                            )}
                        </Tooltip>

                        {/* Configuración */}
                        <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                                <Link href="/dashboard/configuracion">
                                    <Button
                                        variant={
                                            pathname === "/dashboard/configuracion"
                                                ? isPropietario
                                                    ? "sidebar-active"
                                                    : "sidebar-active-secondary"
                                                : isPropietario
                                                  ? "sidebar-hover"
                                                  : "sidebar-hover-secondary"
                                        }
                                        className={cn(
                                            "w-full transition-all duration-200",
                                            isCollapsed ? "justify-center px-2" : "justify-start gap-3 px-3"
                                        )}
                                    >
                                        <Settings className="h-4 w-4 flex-shrink-0" />
                                        {!isCollapsed && (
                                            <span className="truncate">{t?.sidebar?.navigation?.configuration || "Configuración"}</span>
                                        )}
                                    </Button>
                                </Link>
                            </TooltipTrigger>
                            {isCollapsed && (
                                <TooltipContent side="right">
                                    <p>{t?.sidebar?.navigation?.configuration || "Configuración"}</p>
                                </TooltipContent>
                            )}
                        </Tooltip>

                        <Separator className="my-2" />

                        {/* Cambio de idioma */}
                        {!isCollapsed ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant={isPropietario ? "sidebar-hover" : "sidebar-hover-secondary"}
                                        className="w-full justify-start gap-3 px-3"
                                    >
                                        <Globe className="h-4 w-4 flex-shrink-0" />
                                        <span className="truncate">{t?.sidebar?.navigation?.language || "Idioma"}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setLocale("es")} className={locale === "es" ? "font-bold" : ""}>
                                        🇪🇸 Español
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setLocale("en")} className={locale === "en" ? "font-bold" : ""}>
                                        🇬🇧 English
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Tooltip delayDuration={300}>
                                <DropdownMenu>
                                    <TooltipTrigger asChild>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant={isPropietario ? "sidebar-hover" : "sidebar-hover-secondary"}
                                                className="w-full justify-center px-2"
                                            >
                                                <Globe className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                    </TooltipTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => setLocale("es")} className={locale === "es" ? "font-bold" : ""}>
                                            🇪🇸 Español
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setLocale("en")} className={locale === "en" ? "font-bold" : ""}>
                                            🇬🇧 English
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <TooltipContent side="right">
                                    <p>{t?.sidebar?.navigation?.language || "Idioma"}</p>
                                </TooltipContent>
                            </Tooltip>
                        )}

                        <Separator className="my-2" />

                        {/* Cerrar Sesión */}
                        <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={handleLogout}
                                    variant={isPropietario ? "sidebar-hover" : "sidebar-hover-secondary"}
                                    className={cn(
                                        "text-destructive hover:text-destructive w-full transition-all duration-200",
                                        isCollapsed ? "justify-center px-2" : "justify-start gap-3 px-3"
                                    )}
                                >
                                    <LogOut className="h-4 w-4 flex-shrink-0" />
                                    {!isCollapsed && <span className="truncate">{t?.sidebar?.navigation?.logout || "Cerrar Sesión"}</span>}
                                </Button>
                            </TooltipTrigger>
                            {isCollapsed && (
                                <TooltipContent side="right">
                                    <p>{t?.sidebar?.navigation?.logout || "Cerrar Sesión"}</p>
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            <LogoutConfirmationModal open={showLogoutModal} onConfirm={confirmLogout} onCancel={cancelLogout} />
        </aside>
    )
}
