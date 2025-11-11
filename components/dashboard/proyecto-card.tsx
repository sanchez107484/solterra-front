import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, MapPin, Zap } from "lucide-react"
import Link from "next/link"
import type { MouseEventHandler } from "react"

interface ProyectoCardProps {
    proyecto: {
        id: string
        titulo: string
        tipo: string
        potenciaObjetivo: number
        provincia: string
        estado: string
        matchCount: number
    }
    isSelected?: boolean
    onClick?: MouseEventHandler<HTMLDivElement>
}

export function ProyectoCard({ proyecto, isSelected = false, onClick }: ProyectoCardProps) {
    const getEstadoColor = (estado: string) => {
        switch (estado?.toUpperCase()) {
            case "ACTIVO":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "BORRADOR":
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
            case "COMPLETADO":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case "PAUSADO":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        }
    }

    const getTipoLabel = (tipo: string) => {
        const tipos: Record<string, string> = {
            SOLAR_FOTOVOLTAICA: "Solar Fotovoltaica",
            EOLICA: "Eólica",
            HIDROELECTRICA: "Hidroeléctrica",
            BIOMASA: "Biomasa",
            GEOTERMICA: "Geotérmica",
        }
        return tipos[tipo] || tipo
    }

    const getTipoColor = (tipo: string) => {
        switch (tipo?.toUpperCase()) {
            case "SOLAR_FOTOVOLTAICA":
                return "text-secondary dark:text-secondary"
            case "EOLICA":
                return "text-secondary dark:text-secondary"
            case "HIDROELECTRICA":
                return "text-secondary dark:text-secondary"
            case "BIOMASA":
                return "text-secondary dark:text-secondary"
            case "GEOTERMICA":
                return "text-secondary dark:text-secondary"
            default:
                return "text-secondary dark:text-secondary"
        }
    }

    return (
        <Card
            className={`relative h-full w-full cursor-pointer overflow-hidden transition-all hover:shadow-lg ${isSelected ? "ring-secondary ring-2" : ""}`}
            onClick={onClick}
        >
            {/* Botón ver detalles - esquina superior derecha */}
            <Link
                href={`/dashboard/promotor/proyectos/${proyecto.id}`}
                onClick={(e) => e.stopPropagation()}
                className="absolute top-3 right-3 z-10"
            >
                <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-secondary border-secondary/20 hover:border-secondary dark:hover:bg-secondary dark:border-secondary/30 h-9 w-9 rounded-full border-2 bg-white shadow-md transition-all duration-200 hover:text-white hover:shadow-lg dark:bg-gray-900"
                >
                    <Eye className="h-4 w-4" />
                </Button>
            </Link>

            <div className="p-4">
                {/* Header */}
                <div className="mb-3 flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                        <h3 className="truncate text-base font-semibold text-gray-900 dark:text-white">{proyecto.titulo}</h3>
                        <Badge className={`mt-1.5 ${getEstadoColor(proyecto.estado)}`}>{proyecto.estado}</Badge>
                    </div>
                </div>

                {/* Tipo de proyecto */}
                <div className="mb-3">
                    <p className={`text-sm font-medium`}>{getTipoLabel(proyecto.tipo)}</p>
                </div>

                {/* Info del proyecto */}
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Zap className={`text-secondary dark:text-secondary h-3.5 w-3.5 flex-shrink-0`} />
                        <span>{proyecto.potenciaObjetivo.toLocaleString()} MW</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="text-primary h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">{proyecto.provincia}</span>
                    </div>
                </div>

                {/* Match counter */}
                {proyecto.matchCount > 0 ? (
                    <div className="bg-secondary/10 dark:bg-secondary/20 mt-3 rounded-lg p-2.5">
                        <p className="text-secondary dark:text-secondary text-center text-sm font-medium">
                            {proyecto.matchCount} {proyecto.matchCount === 1 ? "terreno compatible" : "terrenos compatibles"}
                        </p>
                    </div>
                ) : (
                    <div className="mt-3 rounded-lg bg-gray-100 p-2.5 dark:bg-gray-800">
                        <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">Sin terrenos compatibles</p>
                    </div>
                )}
            </div>
        </Card>
    )
}
