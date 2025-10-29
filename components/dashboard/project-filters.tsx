"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Search, X } from "lucide-react"
import { useState } from "react"

interface ProjectFiltersProps {
    searchTerm: string
    onSearchChange: (value: string) => void
    tipoFilter: string
    onTipoChange: (value: string) => void
    provinciaFilter: string
    onProvinciaChange: (value: string) => void
    estadoFilter?: string
    onEstadoChange?: (value: string) => void
    provincias: string[]
    onClearFilters: () => void
    translations: {
        searchPlaceholder: string
        allTypes: string
        allProvinces: string
        allStatuses?: string
        clearFilters: string
        types: {
            solar: string
            eolico: string
            hibrido: string
            almacenamiento: string
        }
        statuses?: {
            activo: string
            en_desarrollo: string
            pausado: string
        }
    }
    showEstadoFilter?: boolean
    className?: string
}

export function ProjectFilters({
    searchTerm,
    onSearchChange,
    tipoFilter,
    onTipoChange,
    provinciaFilter,
    onProvinciaChange,
    estadoFilter,
    onEstadoChange,
    provincias,
    onClearFilters,
    translations,
    showEstadoFilter = false,
    className = "",
}: ProjectFiltersProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    const hasActiveFilters =
        searchTerm || tipoFilter !== "TODOS" || provinciaFilter !== "TODOS" || (estadoFilter && estadoFilter !== "TODOS")

    return (
        <Card className={`mb-6 ${className}`}>
            <div className="p-6">
                {/* Barra de búsqueda principal */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="relative max-w-md flex-1">
                        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                        <Input
                            type="text"
                            placeholder={translations.searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant={isExpanded ? "default" : "outline"}
                            size="sm"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="gap-2"
                        >
                            <Filter className="h-4 w-4" />
                            Filtros
                            {hasActiveFilters && <span className="bg-primary flex h-2 w-2 rounded-full" />}
                        </Button>

                        {hasActiveFilters && (
                            <Button variant="ghost" size="sm" onClick={onClearFilters} className="gap-2">
                                <X className="h-4 w-4" />
                                {translations.clearFilters}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Filtros expandidos */}
                {isExpanded && (
                    <div className="mt-6 grid gap-4 border-t pt-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="tipo-filter" className="text-sm font-medium">
                                Tipo de proyecto
                            </Label>
                            <Select value={tipoFilter} onValueChange={onTipoChange}>
                                <SelectTrigger id="tipo-filter">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="TODOS">{translations.allTypes}</SelectItem>
                                    <SelectItem value="SOLAR">{translations.types.solar}</SelectItem>
                                    <SelectItem value="EOLICO">{translations.types.eolico}</SelectItem>
                                    <SelectItem value="HÍBRIDO">{translations.types.hibrido}</SelectItem>
                                    <SelectItem value="ALMACENAMIENTO">{translations.types.almacenamiento}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="provincia-filter" className="text-sm font-medium">
                                Provincia
                            </Label>
                            <Select value={provinciaFilter} onValueChange={onProvinciaChange}>
                                <SelectTrigger id="provincia-filter">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="TODOS">{translations.allProvinces}</SelectItem>
                                    {provincias.map((prov) => (
                                        <SelectItem key={prov} value={prov}>
                                            {prov}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {showEstadoFilter && estadoFilter && onEstadoChange && translations.allStatuses && translations.statuses && (
                            <div className="space-y-2">
                                <Label htmlFor="estado-filter" className="text-sm font-medium">
                                    Estado
                                </Label>
                                <Select value={estadoFilter} onValueChange={onEstadoChange}>
                                    <SelectTrigger id="estado-filter">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="TODOS">{translations.allStatuses}</SelectItem>
                                        <SelectItem value="ACTIVO">{translations.statuses.activo}</SelectItem>
                                        <SelectItem value="EN_DESARROLLO">{translations.statuses.en_desarrollo}</SelectItem>
                                        <SelectItem value="PAUSADO">{translations.statuses.pausado}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Card>
    )
}
