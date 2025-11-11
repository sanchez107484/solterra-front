import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { cn } from "@/lib/utils"
import { LucideIcon, Plus } from "lucide-react"
import Link from "next/link"

interface EmptyStateMetric {
    value: string
    label: string
}

interface DashboardEmptyStateProps {
    icon: LucideIcon
    title: string
    description: string
    ctaText: string
    ctaHref: string
    metrics?: EmptyStateMetric[]
    variant?: "primary" | "secondary"
    className?: string
}

export function DashboardEmptyState({
    icon: Icon,
    title,
    description,
    ctaText,
    ctaHref,
    metrics = [],
    variant = "primary",
    className,
}: DashboardEmptyStateProps) {
    const colorClasses = {
        primary: "text-primary",
        secondary: "text-secondary",
    }

    return (
        <div className={cn("flex min-h-[calc(100vh-200px)] items-center justify-center", className)}>
            <Empty className="max-w-2xl">
                <EmptyHeader>
                    <EmptyMedia>
                        <Icon className="h-12 w-12" />
                    </EmptyMedia>
                    <EmptyTitle>{title}</EmptyTitle>
                    <EmptyDescription>{description}</EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Link href={ctaHref}>
                        <Button size="lg" className="gap-2">
                            <Plus className="h-5 w-5" />
                            {ctaText}
                        </Button>
                    </Link>
                    {metrics.length > 0 && (
                        <div className="mt-8 grid grid-cols-3 gap-6 border-t pt-6">
                            {metrics.map((metric, index) => (
                                <div key={index} className="text-center">
                                    <div className={cn("text-2xl font-bold", colorClasses[variant])}>{metric.value}</div>
                                    <div className="text-muted-foreground text-xs">{metric.label}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </EmptyContent>
            </Empty>
        </div>
    )
}
