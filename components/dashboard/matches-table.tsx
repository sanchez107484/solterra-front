"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Battery, Building2, Eye, Leaf, MessageCircle, Sun, Wind, Zap } from "lucide-react"
import Link from "next/link"
import { CompatibilityBadge } from "./compatibility-badge"

interface ProyectoMatch {
    id: string
    titulo: string
    tipo: string
    potenciaObjetivo?: number
    provincia?: string
    compatibilidad: number
    estado: string
}

interface MatchesTableProps {
    matches: ProyectoMatch[]
    isLoading?: boolean
    emptyMessage?: string
}

const getProjectTypeIcon = (tipo: string) => {
    switch (tipo?.toUpperCase()) {
        case "SOLAR_FOTOVOLTAICO":
        case "SOLAR":
            return <Sun className="h-4 w-4 text-yellow-500" />
        case "EOLICO":
        case "EÓLICO":
            return <Wind className="h-4 w-4 text-blue-500" />
        case "HIBRIDACION":
        case "HÍBRIDO":
            return <Zap className="h-4 w-4 text-purple-500" />
        case "ALMACENAMIENTO":
            return <Battery className="h-4 w-4 text-green-500" />
        case "HIDROGENO":
        case "BIOMETANO":
            return <Leaf className="h-4 w-4 text-emerald-500" />
        default:
            return <Building2 className="h-4 w-4 text-gray-500" />
    }
}

const getProjectTypeLabel = (tipo: string) => {
    switch (tipo?.toUpperCase()) {
        case "SOLAR_FOTOVOLTAICO":
        case "SOLAR":
            return "Solar"
        case "EOLICO":
        case "EÓLICO":
            return "Eólico"
        case "HIBRIDACION":
        case "HÍBRIDO":
            return "Híbrido"
        case "ALMACENAMIENTO":
            return "Almacenamiento"
        case "HIDROGENO":
            return "Hidrógeno"
        case "BIOMETANO":
            return "Biometano"
        default:
            return tipo || "Otro"
    }
}

export function MatchesTable({ matches, isLoading = false, emptyMessage = "No hay matches disponibles" }: MatchesTableProps) {
    if (isLoading) {
        return (
            <Card className="p-6">
                <div className="flex items-center justify-center py-12">
                    <div className="flex flex-col items-center gap-4">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                        <p className="text-muted-foreground text-sm">Cargando matches...</p>
                    </div>
                </div>
            </Card>
        )
    }

    if (!matches || matches.length === 0) {
        return (
            <Card className="p-6">
                <div className="py-12 text-center">
                    <Building2 className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                    <h3 className="mb-2 text-lg font-medium">{emptyMessage}</h3>
                    <p className="text-muted-foreground text-sm">
                        Estamos analizando constantemente nuevos proyectos que puedan encajar con tu terreno.
                    </p>
                </div>
            </Card>
        )
    }

    return (
        <Card>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Proyecto</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Potencia</TableHead>
                            <TableHead>Ubicación</TableHead>
                            <TableHead>Compatibilidad</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {matches.map((match) => (
                            <TableRow key={match.id} className="hover:bg-muted/50">
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {getProjectTypeIcon(match.tipo)}
                                        <div>
                                            <div className="font-medium">{match.titulo}</div>
                                            <div className="text-muted-foreground text-xs">{match.estado}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">{getProjectTypeLabel(match.tipo)}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm font-medium">
                                        {match.potenciaObjetivo ? `${match.potenciaObjetivo} MW` : "-"}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">{match.provincia || "Flexible"}</span>
                                </TableCell>
                                <TableCell>
                                    <CompatibilityBadge score={match.compatibilidad} />
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/dashboard/propietario/proyectos/${match.id}`}>
                                            <Button size="sm" variant="outline" className="gap-1.5">
                                                <Eye className="h-3.5 w-3.5" />
                                                Ver
                                            </Button>
                                        </Link>
                                        <Button size="sm" variant="default" className="gap-1.5">
                                            <MessageCircle className="h-3.5 w-3.5" />
                                            Contactar
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
}
