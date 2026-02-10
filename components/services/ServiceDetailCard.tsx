"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowRight, LucideIcon } from "lucide-react"
import Link from "next/link"

interface ProcessStep {
    number: number
    text: string
}

interface ServiceDetailCardProps {
    icon: LucideIcon
    title: string
    description: string
    result: string
    process: string[]
    ctaPrimary?: string
    ctaPrimaryLink?: string
    ctaSecondary?: string
    ctaSecondaryLink?: string
    variant?: "primary" | "secondary"
}

export function ServiceDetailCard({
    icon: Icon,
    title,
    description,
    result,
    process,
    ctaPrimary,
    ctaPrimaryLink,
    ctaSecondary,
    ctaSecondaryLink,
    variant = "primary",
}: ServiceDetailCardProps) {
    const isPrimary = variant === "primary"
    const bgClass = isPrimary ? "bg-primary/10" : "bg-secondary/10"
    const textClass = isPrimary ? "text-primary" : "text-secondary"
    const numberBgClass = isPrimary ? "bg-primary" : "bg-secondary"

    return (
        <Card className="border-2 p-8 transition-shadow duration-300 hover:shadow-xl">
            <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={cn("shrink-0 rounded-xl p-3", bgClass)}>
                    <Icon className={cn("h-8 w-8", textClass)} />
                </div>

                <div className="flex-1 space-y-4">
                    {/* Title */}
                    <h3 className="text-foreground text-2xl font-bold">{title}</h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">{description}</p>

                    {/* Result */}
                    <div className={cn("inline-block rounded-lg px-4 py-2 text-sm font-semibold", bgClass, textClass)}>✓ {result}</div>

                    {/* Process Steps */}
                    {process && process.length > 0 && (
                        <div className="space-y-3 pt-2">
                            <p className="text-foreground text-sm font-semibold">Proceso:</p>
                            {process.map((step, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div
                                        className={cn(
                                            "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                                            numberBgClass
                                        )}
                                    >
                                        {idx + 1}
                                    </div>
                                    <span className="text-muted-foreground pt-0.5 text-sm">{step}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* CTAs */}
                    {(ctaPrimary || ctaSecondary) && (
                        <div className="flex flex-wrap gap-3 pt-4">
                            {ctaPrimary && ctaPrimaryLink && (
                                <Link href={ctaPrimaryLink}>
                                    <Button variant={isPrimary ? "default" : "secondary"} className="gap-2">
                                        {ctaPrimary}
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            )}
                            {ctaSecondary && ctaSecondaryLink && (
                                <Link href={ctaSecondaryLink}>
                                    <Button variant="outline" className="gap-2">
                                        {ctaSecondary}
                                    </Button>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}
