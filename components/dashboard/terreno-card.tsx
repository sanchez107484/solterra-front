import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, MapPin, Ruler } from "lucide-react"
import Link from "next/link"

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
            className={`relative h-full w-full cursor-pointer overflow-hidden transition-all hover:shadow-lg ${isSelected ? "ring-primary ring-2" : ""}`}
            onClick={onClick}
        >
            {/* Botón ver detalles - esquina superior derecha */}
            <Link
                href={`/dashboard/propietario/mis-terrenos/${terreno.id}`}
                onClick={(e) => e.stopPropagation()}
                className="absolute top-3 right-3 z-10"
            >
                <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-primary border-primary/20 hover:border-primary dark:hover:bg-primary dark:border-primary/30 h-9 w-9 rounded-full border-2 bg-white shadow-md transition-all duration-200 hover:text-white hover:shadow-lg dark:bg-gray-900"
                >
                    <Eye className="h-4 w-4" />
                </Button>
            </Link>

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
                {terreno.matchCount !== undefined && terreno.matchCount > 0 ? (
                    <div className="bg-primary/10 dark:bg-primary/20 mt-3 rounded-lg p-2.5">
                        <p className="text-primary dark:text-primary text-center text-sm font-medium">
                            {terreno.matchCount} {terreno.matchCount === 1 ? "match disponible" : "matches disponibles"}
                        </p>
                    </div>
                ) : (
                    <div className="mt-3 rounded-lg bg-gray-100 p-2.5 dark:bg-gray-800">
                        <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">Sin proyectos compatibles</p>
                    </div>
                )}
            </div>
        </Card>
    )
}
