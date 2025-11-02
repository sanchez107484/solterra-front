import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Usuario } from "@/types/usuario.types"

interface UserAvatarProps {
    user: Usuario
    size?: "sm" | "md" | "lg"
    showBadge?: boolean
    className?: string
}

/**
 * Avatar de usuario con foto de perfil o iniciales
 * Muestra badge de tipo de usuario (propietario/promotor)
 */
export function UserAvatar({ user, size = "md", showBadge = true, className }: UserAvatarProps) {
    // Generar iniciales del nombre
    const getInitials = (name: string) => {
        const parts = name.trim().split(" ")
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
        }
        return name.substring(0, 2).toUpperCase()
    }

    const initials = getInitials(user.nombre || user.email) // Tamaños
    const sizeClasses = {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
    }

    // Colores de fondo según rol (usando colores de tema primary/secondary)
    const fallbackBgClass = user.rol === "PROPIETARIO" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"

    return (
        <div className="relative inline-block">
            <Avatar className={cn(sizeClasses[size], className)}>
                <AvatarImage src={user.avatar || undefined} alt={`Avatar de ${user.nombre || user.email}`} />
                <AvatarFallback className={cn("font-bold", fallbackBgClass)}>{initials}</AvatarFallback>
            </Avatar>

            {/* Badge de tipo de usuario - sin icono */}
            {showBadge && (
                <div
                    className={cn(
                        "border-background absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2",
                        user.rol === "PROPIETARIO" ? "bg-primary" : "bg-secondary"
                    )}
                    title={user.rol === "PROPIETARIO" ? "Propietario" : "Promotor"}
                />
            )}
        </div>
    )
}
