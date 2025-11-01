"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"
import { useTranslations } from "@/i18n/i18nContext"
import { ChevronDown, Globe, Home, LogOut, Settings, User } from "lucide-react"
import { useRouter } from "next/navigation"

interface UserMenuProps {
    userType: "promotor" | "propietario"
}

export function UserMenu({ userType }: UserMenuProps) {
    const { t, locale, setLocale } = useTranslations()
    const router = useRouter()
    const { auth, logout } = useAuth()
    const user = auth.user

    const handleLogout = () => {
        logout()
    }

    const getAvatarUrl = (avatarPath: string | null | undefined) => {
        console.log("Getting avatar URL for path:", avatarPath)

        if (!avatarPath) return undefined

        // Si ya es una URL completa, devolverla tal como está
        if (avatarPath.startsWith("http://") || avatarPath.startsWith("https://")) {
            return avatarPath
        }

        // Construir URL completa usando la URL base del backend
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"
        const baseUrl = API_URL.replace("/api/v1", "")
        const fullUrl = `${baseUrl}${avatarPath.startsWith("/") ? "" : "/"}${avatarPath}`

        console.log("Avatar debugging:", {
            originalPath: avatarPath,
            API_URL,
            baseUrl,
            fullUrl,
        })

        return fullUrl
    }

    const getInitials = (name?: string | null, email?: string | null) => {
        if (name) {
            const parts = name.split(" ")
            return parts
                .map((p) => p[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)
        }
        if (email) {
            return email.slice(0, 2).toUpperCase()
        }
        return "U"
    }

    const getRoleBadgeColor = (rol: string) => {
        switch (rol?.toUpperCase()) {
            case "PROMOTOR":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case "PROPIETARIO":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "ADMIN":
                return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        }
    }

    // Color de fondo del avatar según rol
    const getAvatarFallbackColor = (rol?: string) => {
        return rol === "PROPIETARIO" ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/90"
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={getAvatarUrl(user?.avatar)} alt={user?.nombre || user?.email} />
                        <AvatarFallback className={`font-semibold text-white ${getAvatarFallbackColor(user?.rol)}`}>
                            {getInitials(user?.nombre, user?.email)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden text-left md:block">
                        <p className="text-sm font-medium">{user?.nombre || user?.email}</p>
                        {user?.rol && <Badge className={`text-xs ${getRoleBadgeColor(user.rol)}`}>{user.rol}</Badge>}
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm leading-none font-medium">{user?.nombre || "Usuario"}</p>
                        <p className="text-muted-foreground text-xs leading-none">{user?.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Volver al Home */}
                <DropdownMenuItem onClick={() => router.push("/")} className="cursor-pointer">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Volver al inicio</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => router.push("/perfil")} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>{t?.common?.myProfile}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/configuracion")} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{t?.common?.settings}</span>
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
                            🇪🇸 ES
                        </Button>
                        <Button
                            variant={locale === "en" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setLocale("en")}
                            className="flex-1 text-xs"
                        >
                            🇬🇧 EN
                        </Button>
                    </div>
                </div>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t?.common?.logout}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
