"use client"

import { cn } from "@/lib/utils"

interface ServiceSectionHeaderProps {
    badge: string
    title: string
    subtitle?: string
    intro?: string
    trustSignal?: string
    variant?: "primary" | "secondary"
    className?: string
}

export function ServiceSectionHeader({
    badge,
    title,
    subtitle,
    intro,
    trustSignal,
    variant = "primary",
    className,
}: ServiceSectionHeaderProps) {
    const isPrimary = variant === "primary"
    const badgeBgClass = isPrimary ? "bg-primary/10" : "bg-secondary/10"
    const badgeTextClass = isPrimary ? "text-primary" : "text-secondary"
    const trustBgClass = isPrimary ? "bg-primary/5" : "bg-secondary/5"
    const trustBorderClass = isPrimary ? "border-primary/20" : "border-secondary/20"

    return (
        <div className={cn("space-y-6 text-center", className)}>
            {/* Badge */}
            <div className="flex justify-center">
                <span
                    className={cn(
                        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
                        badgeBgClass,
                        badgeTextClass
                    )}
                >
                    {badge}
                </span>
            </div>

            {/* Title */}
            <h2 className="text-foreground mx-auto max-w-4xl text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">{title}</h2>

            {/* Subtitle */}
            {subtitle && <p className="text-muted-foreground mx-auto max-w-3xl text-lg font-medium md:text-xl">{subtitle}</p>}

            {/* Intro */}
            {intro && <p className="text-muted-foreground mx-auto max-w-3xl text-base leading-relaxed md:text-lg">{intro}</p>}

            {/* Trust Signal */}
            {trustSignal && (
                <div
                    className={cn(
                        "inline-block rounded-lg border-2 px-6 py-3 text-sm font-semibold",
                        trustBgClass,
                        trustBorderClass,
                        badgeTextClass
                    )}
                >
                    ✓ {trustSignal}
                </div>
            )}
        </div>
    )
}
