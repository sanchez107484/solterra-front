import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { MapPin, Ruler } from "lucide-react"

interface TerrenoCardProps {
    terreno: {
        id: string
        titulo: string
        municipio: string
        provincia: string
        superficie: number
        estado: string
        matchCount?: number
    }
    isSelected?: boolean
    onClick?: () => void
}

export function TerrenoCard({ terreno, isSelected = false, onClick }: TerrenoCardProps) {
    const getEstadoColor = (estado: string) => {
        switch (estado?.toUpperCase()) {
            case "ACTIVO":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "PAUSADO":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "PENDIENTE_REVISION":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case "ARRENDADO":
            case "VENDIDO":
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        }
    }

    return (
        <Card
            className={`cursor-pointer overflow-hidden transition-all hover:shadow-lg ${isSelected ? "ring-primary ring-2" : ""}`}
            onClick={onClick}
        >
            <div className="p-4">
                {/* Header */}
                <div className="mb-3 flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                        <h3 className="truncate text-base font-semibold text-gray-900 dark:text-white">{terreno.titulo}</h3>
                        <Badge className={`mt-1.5 ${getEstadoColor(terreno.estado)}`}>{terreno.estado}</Badge>
                    </div>
                </div>

                {/* Info del terreno */}
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-red-500" />
                        <span className="truncate">
                            {terreno.municipio}, {terreno.provincia}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Ruler className="h-3.5 w-3.5 flex-shrink-0 text-purple-500" />
                        <span>{terreno.superficie.toLocaleString()} ha</span>
                    </div>
                </div>

                {/* Match counter */}
                {terreno.matchCount !== undefined && (
                    <div className="mt-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-2.5 dark:from-blue-900/20 dark:to-purple-900/20">
                        <p className="text-center text-sm font-medium text-blue-600 dark:text-blue-400">
                            {terreno.matchCount} {terreno.matchCount === 1 ? "match disponible" : "matches disponibles"}
                        </p>
                    </div>
                )}
            </div>
        </Card>
    )
}
