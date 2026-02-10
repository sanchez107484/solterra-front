"use client"

import { cn } from "@/lib/utils"
import { AlertCircle } from "lucide-react"

interface PainPointsListProps {
    points: string[]
    variant?: "primary" | "secondary"
    className?: string
}

export function PainPointsList({ points, variant = "primary", className }: PainPointsListProps) {
    const isPrimary = variant === "primary"
    const bgClass = isPrimary ? "bg-primary/5" : "bg-secondary/5"
    const borderClass = isPrimary ? "border-primary/20" : "border-secondary/20"
    const iconClass = isPrimary ? "text-primary" : "text-secondary"

    return (
        <div className={cn("space-y-3", className)}>
            {points.map((point, idx) => (
                <div
                    key={idx}
                    className={cn("hover:bg-muted/50 flex items-start gap-3 rounded-lg border p-4 transition-colors", bgClass, borderClass)}
                >
                    <AlertCircle className={cn("mt-0.5 h-5 w-5 flex-shrink-0", iconClass)} />
                    <span className="text-foreground text-sm font-medium">{point}</span>
                </div>
            ))}
        </div>
    )
}
