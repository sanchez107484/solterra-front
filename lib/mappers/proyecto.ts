// lib/mappers/proyecto.ts
import type { TipoProyecto } from "@/types/proyecto.types"

export const UI_TO_API_TIPO: Record<string, TipoProyecto> = {
    Solar: "SOLAR_FOTOVOLTAICO",
    Eólico: "EOLICO",
    Híbrido: "HIBRIDACION",
}

export const API_TO_UI_TIPO: Record<TipoProyecto, string> = Object.fromEntries(
    Object.entries(UI_TO_API_TIPO).map(([k, v]) => [v, k])
) as Record<TipoProyecto, string>

export function mapTipoUIToAPI(tipo: string): TipoProyecto {
    return UI_TO_API_TIPO[tipo] ?? (tipo as TipoProyecto)
}

export function mapTipoAPIToUI(tipo: TipoProyecto | string) {
    return (API_TO_UI_TIPO as Record<string, string>)[tipo] ?? tipo
}
