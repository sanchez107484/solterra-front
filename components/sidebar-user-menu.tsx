"use client"

import { LogoutConfirmationModal } from "@/components/modals/logout-confirmation-modal"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/ui/user-avatar"
import { useAuth } from "@/contexts/AuthContext"
import { useTranslations } from "@/i18n/i18nContext"
import { ChevronDown, Globe, Home, LogOut, Settings, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

/**
 * UserMenu para el sidebar de la landing
 * Muestra avatar + dropdown con opciones de usuario
 * Incluye acceso rápido al dashboard, perfil, idioma y logout
 */
export function SidebarUserMenu() {
    const { t, locale, setLocale } = useTranslations()
    const router = useRouter()
    const { auth, logout } = useAuth()
    const user = auth.user
    const [open, setOpen] = useState(false)
    const [showLogoutModal, setShowLogoutModal] = useState(false)

    if (!user) return null

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

    const handleGoToDashboard = () => {
        const dashboardPath = user.rol === "PROPIETARIO" ? "/dashboard/propietario" : "/dashboard/promotor"
        router.push(dashboardPath)
        setOpen(false)
    }

    const handleGoToProfile = () => {
        router.push("/perfil")
        setOpen(false)
    }

    // Nombre completo o email
    const displayName = user.nombre ? `${user.nombre} ${user.apellidos || ""}`.trim() : user.email
    const userTypeLabel = user.rol === "PROPIETARIO" ? "Propietario" : "Promotor"

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hover:bg-accent h-auto w-full justify-start gap-3 px-3 py-2">
                    <UserAvatar user={user} size="md" showBadge={true} />
                    <div className="flex flex-1 flex-col items-start overflow-hidden text-left">
                        <span className="text-foreground truncate text-sm font-medium">{displayName}</span>
                        <span className="text-muted-foreground truncate text-xs">{userTypeLabel}</span>
                    </div>
                    <ChevronDown className="text-muted-foreground h-4 w-4 transition-transform duration-200" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64">
                {/* Header con info del usuario */}
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm leading-none font-medium">{displayName}</p>
                        <p className="text-muted-foreground text-xs leading-none">{user.email}</p>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* Ir al Dashboard */}
                <DropdownMenuItem onClick={handleGoToDashboard} className="cursor-pointer">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Mi Dashboard</span>
                </DropdownMenuItem>

                {/* Ir al Perfil */}
                <DropdownMenuItem onClick={handleGoToProfile} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Mi Perfil</span>
                </DropdownMenuItem>

                {/* Configuración (opcional - puedes comentar si no existe aún) */}
                <DropdownMenuItem disabled className="cursor-not-allowed opacity-50">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                    <span className="text-muted-foreground ml-auto text-xs">(Próximamente)</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Cambio de idioma */}
                <div className="px-2 py-1.5">
                    <p className="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-medium">
                        <Globe className="h-3 w-3" />
                        Idioma
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant={locale === "es" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setLocale("es")}
                            className="flex-1 text-xs"
                        >
                            🇪🇸 Español
                        </Button>
                        <Button
                            variant={locale === "en" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setLocale("en")}
                            className="flex-1 text-xs"
                        >
                            🇬🇧 English
                        </Button>
                    </div>
                </div>

                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
            <LogoutConfirmationModal open={showLogoutModal} onConfirm={confirmLogout} onCancel={cancelLogout} />
        </DropdownMenu>
    )
}
