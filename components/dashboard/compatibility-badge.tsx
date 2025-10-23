import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CompatibilityBadgeProps {
    score: number // 0-100
    className?: string
    showLabel?: boolean
}

export function CompatibilityBadge({ score, className, showLabel = true }: CompatibilityBadgeProps) {
    const getColorClasses = (value: number) => {
        if (value >= 80) {
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200"
        }
        if (value >= 60) {
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200"
        }
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200"
    }

    const getLabel = (value: number) => {
        if (value >= 80) return "Excelente"
        if (value >= 60) return "Bueno"
        return "Aceptable"
    }

    return (
        <Badge className={cn(getColorClasses(score), "font-semibold", className)}>
            {score}% {showLabel && `• ${getLabel(score)}`}
        </Badge>
    )
}
