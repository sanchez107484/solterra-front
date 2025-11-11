import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Eye, MapPin } from "lucide-react"
import Link from "next/link"

interface Match {
    id: string
    titulo: string
    tipo?: string
    potenciaObjetivo?: number
    provincia?: string
    municipio?: string
    superficie?: number
    compatibilidad: number
    estado: string
}

interface MatchesSectionProps {
    title: string
    subtitle: string
    matches: Match[]
    isLoading: boolean
    selectedItemTitle?: string
    basePath: string // e.g., "/dashboard/promotor/terrenos" or "/dashboard/propietario/proyectos"
    variant?: "primary" | "secondary"
    className?: string
}

export function MatchesSection({
    title,
    subtitle,
    matches,
    isLoading,
    selectedItemTitle,
    basePath,
    variant = "primary",
    className,
}: MatchesSectionProps) {
    const colorClasses = {
        primary: {
            accent: "text-primary",
            bg: "bg-primary/5",
            border: "border-primary/20",
        },
        secondary: {
            accent: "text-secondary",
            bg: "bg-secondary/5",
            border: "border-secondary/20",
        },
    }

    const colors = colorClasses[variant]

    const getCompatibilityColor = (score: number) => {
        if (score >= 80) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        if (score >= 60) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    }

    const getStatusColor = (estado: string) => {
        switch (estado?.toUpperCase()) {
            case "ACTIVO":
            case "ACTIVE":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "PENDIENTE":
            case "PENDING":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "RECHAZADO":
            case "REJECTED":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
        }
    }

    if (isLoading) {
        return (
            <Card className={cn("p-6", className)}>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-muted-foreground text-sm">{subtitle}</p>
                </div>
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="h-20 rounded-lg bg-gray-200 dark:bg-gray-800" />
                        </div>
                    ))}
                </div>
            </Card>
        )
    }

    return (
        <Card className={cn("p-6", className)}>
            <div className="mb-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-muted-foreground text-sm">
                    {selectedItemTitle ? subtitle.replace("{item}", selectedItemTitle) : subtitle}
                </p>
            </div>

            {matches.length === 0 ? (
                <div className="py-12 text-center">
                    <MapPin className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                    <h4 className="mb-2 text-lg font-medium">No hay matches disponibles</h4>
                    <p className="text-muted-foreground text-sm">
                        {selectedItemTitle
                            ? `Aún no hay elementos compatibles con ${selectedItemTitle}`
                            : "Selecciona un elemento para ver matches compatibles"}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {matches.map((match) => (
                        <div key={match.id} className={cn("hover:bg-muted/50 rounded-lg border p-4 transition-colors", colors.border)}>
                            <div className="flex items-start justify-between">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-1">
                                            <h4 className="font-medium">{match.titulo}</h4>
                                            <div className="text-muted-foreground mt-1 flex flex-wrap gap-2 text-sm">
                                                {match.tipo && <span>{match.tipo}</span>}
                                                {match.potenciaObjetivo && <span>• {match.potenciaObjetivo} MW</span>}
                                                {match.superficie && <span>• {match.superficie} ha</span>}
                                                {(match.provincia || match.municipio) && (
                                                    <span>
                                                        • {match.municipio ? `${match.municipio}, ` : ""}
                                                        {match.provincia}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Badge className={getCompatibilityColor(match.compatibilidad)}>
                                                {match.compatibilidad}% compatible
                                            </Badge>
                                            <Badge className={getStatusColor(match.estado)}>{match.estado}</Badge>
                                        </div>
                                    </div>
                                </div>
                                <Link href={`${basePath}/${match.id}`}>
                                    <Button variant="outline" size="sm" className="ml-4 gap-2">
                                        <Eye className="h-3.5 w-3.5" />
                                        Ver detalles
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    )
}
