import type { LucideIcon } from "lucide-react"
import { CheckCircle2 } from "lucide-react"

/**
 * Props para el componente ValueCard
 */
interface ValueCardProps {
    /** Icono principal del card */
    icon: LucideIcon
    /** Título del valor o beneficio */
    title: string
    /** Descripción detallada del valor */
    description: string
    /** Texto destacado en la parte inferior con checkmark */
    bottomText: string
    /** Tipo de usuario para determinar los colores del card */
    userType?: "propietarios" | "promotores"
}

/**
 * Card de valor/confianza para mostrar beneficios de usar Solterra
 * Se adapta al tipo de usuario (propietarios o promotores) con colores apropiados
 */
export default function ValueCard({ icon: Icon, title, description, bottomText, userType = "propietarios" }: ValueCardProps) {
    // Mapeo de colores según el tipo de usuario
    const colorClasses = {
        gradientFrom: userType === "propietarios" ? "from-primary/0" : "from-secondary/0",
        gradientTo: userType === "propietarios" ? "to-primary/5" : "to-secondary/5",
        iconBg: userType === "propietarios" ? "bg-primary/10" : "bg-secondary/10",
        ringBase: userType === "propietarios" ? "ring-primary/20" : "ring-secondary/20",
        ringHover: userType === "propietarios" ? "group-hover:ring-primary/40" : "group-hover:ring-secondary/40",
        iconText: userType === "propietarios" ? "text-primary" : "text-secondary-foreground",
        bottomTextColor: userType === "propietarios" ? "text-primary" : "text-secondary-foreground",
    }

    return (
        <div className="group bg-background relative overflow-hidden rounded-xl border-2 p-8 text-center shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
            {/* Gradient de fondo con efecto hover */}
            <div
                className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradientFrom} ${colorClasses.gradientTo} opacity-0 transition-opacity group-hover:opacity-100`}
            />

            {/* Contenido del card */}
            <div className="relative">
                {/* Contenedor del icono con anillo */}
                <div
                    className={`${colorClasses.iconBg} ${colorClasses.ringBase} ${colorClasses.ringHover} mx-auto mb-6 w-fit rounded-full p-4 ring-4 transition-all group-hover:scale-110`}
                >
                    <Icon className={`${colorClasses.iconText} h-10 w-10`} />
                </div>

                {/* Título */}
                <h3 className="mb-4 text-2xl font-bold">{title}</h3>

                {/* Descripción */}
                <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

                {/* Texto destacado con checkmark */}
                <div className={`${colorClasses.bottomTextColor} flex items-center justify-center gap-2 text-sm font-semibold`}>
                    <CheckCircle2 className="h-5 w-5" />
                    <span>{bottomText}</span>
                </div>
            </div>
        </div>
    )
}
