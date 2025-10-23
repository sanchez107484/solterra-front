export interface TerrenoMatch {
    id: string
    titulo: string
    descripcion?: string
    direccion: string
    municipio: string
    provincia: string
    superficie: number
    precioVenta?: number
    precioArrendamiento?: number
    estado: string
    disponibilidad: string

    // Scoring
    compatibilidad: number // 0-100

    // Datos adicionales
    distanciaRed?: number
    potencialSolar?: number
    potencialEolico?: number

    // Fechas
    creadoEn: string

    // Propietario (datos mínimos)
    propietario: {
        id: string
        nombre?: string
        email: string
    }
}

export interface ProyectoConMatches {
    id: string
    titulo: string
    descripcion?: string
    tipo: string
    estado: string
    potenciaObjetivo?: number
    provincia?: string
    comunidad?: string
    totalMatches: number
    matches: TerrenoMatch[]
}
