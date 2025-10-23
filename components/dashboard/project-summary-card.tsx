import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTranslations } from "@/i18n/i18nContext"
import { ArrowRight, Briefcase, MapPin, TrendingUp } from "lucide-react"
import Link from "next/link"

interface ProjectSummaryCardProps {
    proyecto: {
        id: string
        titulo: string
        tipo: string
        estado: string
        potenciaObjetivo?: number
        provincia?: string
        totalMatches: number
    }
}

export function ProjectSummaryCard({ proyecto }: ProjectSummaryCardProps) {
    const { t } = useTranslations()

    const getEstadoColor = (estado: string) => {
        switch (estado?.toUpperCase()) {
            case "ACTIVO":
            case "EN_DESARROLLO":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "COMPLETADO":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case "PAUSADO":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "CANCELADO":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        }
    }

    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg">
            <div className="p-6">
                {/* Header */}
                <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-blue-600" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{proyecto.titulo}</h3>
                        </div>
                        <Badge className={getEstadoColor(proyecto.estado)}>{proyecto.estado}</Badge>
                    </div>
                </div>

                {/* Info del proyecto */}
                <div className="mb-4 space-y-2">
                    {proyecto.potenciaObjetivo && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <TrendingUp className="h-4 w-4 flex-shrink-0 text-purple-500" />
                            <span>{proyecto.potenciaObjetivo} MW</span>
                        </div>
                    )}

                    {proyecto.provincia && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <MapPin className="h-4 w-4 flex-shrink-0 text-red-500" />
                            <span>{proyecto.provincia}</span>
                        </div>
                    )}
                </div>

                {/* Matches counter - destacado */}
                <div className="mb-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900/20 dark:to-purple-900/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {t?.dashboard?.promoter?.matches?.matchesFound?.replace("{count}", proyecto.totalMatches.toString())}
                            </p>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{proyecto.totalMatches}</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                            <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                </div>

                {/* Acción */}
                <Link href={`/dashboard/promotor/proyectos/${proyecto.id}`} className="block">
                    <Button variant="outline" size="sm" className="group w-full">
                        {t?.dashboard?.promoter?.matches?.viewAll}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </div>
        </Card>
    )
}
