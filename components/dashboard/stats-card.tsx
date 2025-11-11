import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
    title: string
    value: string
    subtitle?: string
    icon: LucideIcon
    variant?: "primary" | "secondary"
    className?: string
}

export function StatsCard({ title, value, subtitle, icon: Icon, variant = "primary", className }: StatsCardProps) {
    const colorClasses = {
        primary: {
            iconBg: "bg-primary/10",
            iconColor: "text-primary",
            valueColor: "text-primary",
        },
        secondary: {
            iconBg: "bg-secondary/10",
            iconColor: "text-secondary",
            valueColor: "text-secondary",
        },
    }

    const colors = colorClasses[variant]

    return (
        <Card className={cn("p-6 transition-all hover:shadow-md", className)}>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <p className="text-sm font-medium">{title}</p>
                    <p className={cn("text-2xl font-bold")}>{value}</p>
                    {subtitle && <p className="text-muted-foreground text-xs">{subtitle}</p>}
                </div>
                <div className={cn("rounded-lg p-3", colors.iconBg)}>
                    <Icon className={cn("h-5 w-5", colors.iconColor)} />
                </div>
            </div>
        </Card>
    )
}
