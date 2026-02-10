"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CheckCircle2, LucideIcon } from "lucide-react"

interface ServiceCardProps {
    icon: LucideIcon
    title: string
    shortDesc: string
    painPoint?: string
    result: string
    benefits: string[]
    variant?: "primary" | "secondary"
    className?: string
}

export function ServiceCard({
    icon: Icon,
    title,
    shortDesc,
    painPoint,
    result,
    benefits,
    variant = "primary",
    className,
}: ServiceCardProps) {
    const isPrimary = variant === "primary"
    const colorClass = isPrimary ? "primary" : "secondary"
    const bgClass = isPrimary ? "bg-primary/10" : "bg-secondary/10"
    const textClass = isPrimary ? "text-primary" : "text-secondary"
    const borderClass = isPrimary ? "border-primary/20 hover:border-primary/40" : "border-secondary/20 hover:border-secondary/40"

    return (
        <Card
            className={cn(
                "group relative overflow-hidden border-2 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
                borderClass,
                className
            )}
        >
            {/* Gradient hover effect */}
            <div
                className={cn(
                    "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                    isPrimary ? "from-primary/5 bg-gradient-to-br to-transparent" : "from-secondary/5 bg-gradient-to-br to-transparent"
                )}
            />

            {/* Content */}
            <div className="relative z-10 space-y-4">
                {/* Icon */}
                <div className={cn("inline-flex rounded-xl p-3", bgClass)}>
                    <Icon className={cn("h-7 w-7", textClass)} />
                </div>

                {/* Title */}
                <h3 className="text-foreground text-xl font-bold">{title}</h3>

                {/* Short Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">{shortDesc}</p>

                {/* Pain Point (optional) */}
                {painPoint && (
                    <div className={cn("rounded-lg p-3 text-sm italic", isPrimary ? "bg-primary/5" : "bg-secondary/5")}>{painPoint}</div>
                )}

                {/* Result Badge */}
                <div className={cn("rounded-lg p-3 text-sm font-medium", bgClass, textClass)}>✓ {result}</div>

                {/* Benefits */}
                <div className="space-y-2 pt-2">
                    {benefits.slice(0, 4).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className={cn("mt-0.5 h-4 w-4 flex-shrink-0", textClass)} />
                            <span className="text-foreground text-sm">{benefit}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Decorative corner */}
            <div
                className={cn(
                    "absolute right-0 bottom-0 h-20 w-20 rounded-tl-full transition-all group-hover:h-28 group-hover:w-28",
                    isPrimary ? "bg-primary/10" : "bg-secondary/10"
                )}
                aria-hidden="true"
            />
        </Card>
    )
}
