"use client"

import { LucideIcon } from "lucide-react"

interface ProcessStepCardProps {
    /** Número del paso (1, 2, 3, 4...) */
    stepNumber: number
    /** Título del paso */
    title: string
    /** Descripción del paso */
    description: string
    /** Icono de Lucide React */
    icon: LucideIcon
    /** Tipo de usuario: "propietarios" o "promotores" */
    userType?: "propietarios" | "promotores"
}

export default function ProcessStepCard({ stepNumber, title, description, icon: Icon, userType = "propietarios" }: ProcessStepCardProps) {
    const colorClasses = {
        border: userType === "propietarios" ? "border-primary/20 hover:border-primary/40" : "border-secondary/20 hover:border-secondary/40",
        numberBg: userType === "propietarios" ? "bg-primary/10" : "bg-secondary/10",
        numberText: userType === "propietarios" ? "text-primary" : "text-secondary",
        iconText: userType === "propietarios" ? "text-primary" : "text-secondary",
    }

    return (
        <div
            className={`group ${colorClasses.border} flex flex-col gap-6 rounded-xl border-2 bg-white p-6 shadow-sm transition-all hover:shadow-lg md:flex-row md:items-center md:p-8`}
        >
            <div
                className={`${colorClasses.numberBg} ${colorClasses.numberText} flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-2xl font-bold md:h-20 md:w-20 md:text-3xl`}
            >
                {stepNumber}
            </div>
            <div className="flex-1">
                <h3 className="text-foreground mb-2 text-xl font-bold md:text-2xl">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{description}</p>
            </div>
            <Icon className={`${colorClasses.iconText} h-10 w-10 flex-shrink-0 opacity-60 transition-opacity group-hover:opacity-100`} />
        </div>
    )
}
