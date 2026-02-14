"use client"

import { BadgeCheck, LucideIcon } from "lucide-react"

interface ServiceBenefitCardProps {
    /** Icono de Lucide React */
    icon: LucideIcon
    /** Título del servicio */
    title: string
    /** Descripción del servicio */
    description: string
    /** Texto del badge final */
    badgeText: string
    /** Tipo de usuario: "propietarios" o "promotores" */
    userType?: "propietarios" | "promotores"
}

export default function ServiceBenefitCard({
    icon: Icon,
    title,
    description,
    badgeText,
    userType = "propietarios",
}: ServiceBenefitCardProps) {
    const colorClasses = {
        border: userType === "propietarios" ? "border-primary/20" : "border-secondary/20",
        iconBg: userType === "propietarios" ? "bg-primary/20" : "bg-secondary/20",
        iconText: userType === "propietarios" ? "text-primary" : "text-secondary",
        badgeText: userType === "propietarios" ? "text-primary" : "text-secondary",
        circleBg: userType === "propietarios" ? "bg-primary/10" : "bg-secondary/10",
    }

    return (
        <div
            className={`group ${colorClasses.border} relative overflow-hidden rounded-xl border-2 bg-white p-8 shadow-lg transition-transform duration-200 ease-out hover:scale-[1.03]`}
        >
            <div className={`${colorClasses.iconBg} mb-4 inline-flex items-center gap-3 rounded-2xl p-3`}>
                <Icon className={`${colorClasses.iconText} h-6 w-6 transition-transform group-hover:scale-110`} />
            </div>
            <h3 className="text-foreground mb-3 text-xl font-bold">{title}</h3>
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{description}</p>
            <div className={`${colorClasses.badgeText} flex items-center gap-2 text-sm font-medium`}>
                <BadgeCheck className="h-4 w-4" />
                {badgeText}
            </div>
            <div
                className={`${colorClasses.circleBg} absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28`}
                aria-hidden
            />
        </div>
    )
}
