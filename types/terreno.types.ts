/**
 * Tipos para el dominio de Terrenos - DEFINITIVO (alineado con el schema Prisma del backend)
 * Generado a partir del attachment proporcionado por el usuario.
 */

// Enums exactamente como en Prisma
export enum TipoSuelo {
    RUSTICO_COMUN = "RUSTICO_COMUN",
    RUSTICO_PROTECCION = "RUSTICO_PROTECCION",
    NO_URBANIZABLE = "NO_URBANIZABLE",
    SECANO = "SECANO",
    REGADIO = "REGADIO",
    ERIAL = "ERIAL",
}

export enum DisponibilidadTerreno {
    VENTA = "VENTA",
    ARRENDAMIENTO = "ARRENDAMIENTO",
    DERECHO_SUPERFICIE = "DERECHO_SUPERFICIE",
    AMBOS = "AMBOS",
}

export enum EstadoTerreno {
    BORRADOR = "BORRADOR",
    PENDIENTE_REVISION = "PENDIENTE_REVISION",
    ACTIVO = "ACTIVO",
    PAUSADO = "PAUSADO",
    RECHAZADO = "RECHAZADO",
    VENDIDO = "VENDIDO",
}

export enum Orientacion {
    NORTE = "NORTE",
    SUR = "SUR",
    ESTE = "ESTE",
    OESTE = "OESTE",
    NORESTE = "NORESTE",
    NOROESTE = "NOROESTE",
    SURESTE = "SURESTE",
    SUROESTE = "SUROESTE",
}

// Tipo de terreno en el frontend (opcional, mapeo UX)
export type TipoTerreno = "Solar" | "Eólico" | "Otro"

// Modelo principal - coincide con Prisma (nombres exactamente iguales)
export interface Terreno {
    id: string
    propietarioId: string
    titulo: string
    descripcion?: string | null
    direccion: string
    municipio: string
    provincia: string
    codigoPostal: string
    poligonoGeoJson?: string | null

    superficie: number
    tipoSuelo: TipoSuelo
    referenciaCatastral: string
    poligono: string
    parcela: string

    disponibilidad: DisponibilidadTerreno
    precioVenta?: number | null
    precioArrendamiento?: number | null

    orientacion?: Orientacion | null
    pendiente?: number | null
    distanciaRed?: number | null
    potencialSolar?: number | null
    potencialEolico?: number | null

    distanciaSubestacion?: number | null
    nombreSubestacion?: string | null
    capacidadSubestacion?: number | null

    servidumbres?: string | null
    restriccionesAmbientales?: string | null
    zonasProtegidas?: boolean | null

    estado: EstadoTerreno
    creadoEn: string
    actualizadoEn: string
    eliminadoEn?: string | null
    // Match info (puede ser añadido por backend cuando el usuario es propietario)
    matchCount?: number | null
    matches?: any[] | null
}

export interface CreateTerrenoDTO {
    titulo: string
    descripcion?: string | null
    direccion: string
    municipio: string
    provincia: string
    comunidad: string
    codigoPostal: string
    poligonoGeoJson?: string | null

    superficie: number
    tipoSuelo: TipoSuelo
    referenciaCatastral: string
    poligono: string
    parcela: string

    disponibilidad: DisponibilidadTerreno
    precioVenta?: number | null
    precioArrendamiento?: number | null

    orientacion?: Orientacion | null
    pendiente?: number | null
    distanciaRed?: number | null
    potencialSolar?: number | null
    potencialEolico?: number | null

    servidumbres?: string | null
    restriccionesAmbientales?: string | null
    // Nota: zonasProtegidas, distanciaSubestacion, nombreSubestacion, capacidadSubestacion
    // no están en el DTO del backend actual
}

export interface UpdateTerrenoDTO extends Partial<CreateTerrenoDTO> {
    estado?: EstadoTerreno | null
}

export interface TerrenoFilters {
    tipoSuelo?: TipoSuelo
    estado?: EstadoTerreno
    provincia?: string
    municipio?: string
    disponibilidad?: DisponibilidadTerreno
    superficieMin?: number
    superficieMax?: number
    precioVentaMax?: number
    precioArrendamientoMax?: number
    potencialSolarMin?: number
    potencialEolicoMin?: number
    distanciaRedMax?: number
    zonasProtegidas?: boolean
}
