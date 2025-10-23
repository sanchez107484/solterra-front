import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTranslations } from "@/i18n/i18nContext"
import { TerrenoMatch } from "@/types/match.types"
import { Euro, Eye, MapPin, MessageCircle, Ruler, Wind, Zap } from "lucide-react"
import Link from "next/link"
import { CompatibilityBadge } from "./compatibility-badge"

interface MatchCardProps {
    match: TerrenoMatch
    compact?: boolean
}

export function MatchCard({ match, compact = false }: MatchCardProps) {
    const { t } = useTranslations()

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg">
            <div className="p-6">
                {/* Header con compatibilidad */}
                <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{match.titulo}</h3>
                        <CompatibilityBadge score={match.compatibilidad} />
                    </div>
                </div>

                {/* Información principal */}
                <div className="mb-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span>
                            {match.municipio}, {match.provincia}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Ruler className="h-4 w-4 flex-shrink-0" />
                        <span>{match.superficie?.toLocaleString()} ha</span>
                    </div>

                    {(match.precioVenta || match.precioArrendamiento) && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <Euro className="h-4 w-4 flex-shrink-0" />
                            <div className="flex flex-wrap gap-2">
                                {match.precioVenta && (
                                    <span className="font-semibold text-green-600">
                                        {t?.dashboard?.promoter?.matches?.forSale}: {formatCurrency(match.precioVenta)}
                                    </span>
                                )}
                                {match.precioArrendamiento && (
                                    <span className="font-semibold text-blue-600">
                                        {t?.dashboard?.promoter?.matches?.forRent}: {formatCurrency(match.precioArrendamiento)}/año
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Características técnicas */}
                    {!compact && (
                        <div className="mt-3 flex flex-wrap gap-3 border-t pt-3">
                            {match.potencialSolar && (
                                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                    <Zap className="h-3.5 w-3.5 text-yellow-500" />
                                    <span>{match.potencialSolar.toFixed(0)} kWh/m²/año</span>
                                </div>
                            )}
                            {match.potencialEolico && (
                                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                    <Wind className="h-3.5 w-3.5 text-blue-500" />
                                    <span>{match.potencialEolico.toFixed(1)} m/s</span>
                                </div>
                            )}
                            {match.distanciaRed && (
                                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                    <MapPin className="h-3.5 w-3.5 text-purple-500" />
                                    <span>{match.distanciaRed.toFixed(1)} km a red</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Descripción */}
                {!compact && match.descripcion && (
                    <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">{match.descripcion}</p>
                )}

                {/* Acciones */}
                <div className="flex gap-2 border-t pt-4">
                    <Link href={`/dashboard/promotor/terrenos/${match.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                            <Eye className="mr-2 h-4 w-4" />
                            {t?.dashboard?.promoter?.matches?.viewDetails}
                        </Button>
                    </Link>
                    <Button variant="default" size="sm">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {t?.dashboard?.promoter?.matches?.contactOwner}
                    </Button>
                </div>
            </div>
        </Card>
    )
}
