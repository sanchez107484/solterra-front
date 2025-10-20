// types/proyecto.types.ts
// Versión limpia y única de los tipos de Proyecto, generada a partir del schema.prisma.

export type TipoProyecto = "SOLAR_FOTOVOLTAICO" | "EOLICO" | "HIBRIDACION" | "ALMACENAMIENTO" | "HIDROGENO" | "BIOMETANO"

export type EstadoProyecto =
    | "BORRADOR"
    | "PENDIENTE_REVISION"
    | "EN_BUSQUEDA"
    | "PLANIFICACION"
    | "EN_DESARROLLO"
    | "ACTIVO"
    | "PAUSADO"
    | "CANCELADO"
    | "COMPLETADO"

export interface Proyecto {
    id: string
    titulo: string
    descripcion?: string | null
    tipo: TipoProyecto
    estado: EstadoProyecto

    presupuesto?: number | null

    potenciaObjetivo?: number | null // potencia_objetivo (MW)
    superficieMinima: number // superficie_minima (hectáreas)
    superficieMaxima?: number | null
    superficieNecesaria?: number | null
    distanciaMaximaRed?: number | null // dist_max_red (km)
    capacidadSubestacionMinima?: number | null // capacidad_subestacion_min

    ubicacion?: string | null
    provincia?: string | null
    comunidad?: string | null

    creadoEn?: string
    actualizadoEn?: string

    promotorId: string
}

export interface CreateProyectoDTO {
    titulo: string
    tipo: TipoProyecto
    superficieMinima: number

    descripcion?: string
    presupuesto?: number
    potenciaObjetivo?: number
    superficieMaxima?: number
    superficieNecesaria?: number
    distanciaMaximaRed?: number
    capacidadSubestacionMinima?: number
    ubicacion?: string
    provincia?: string
    comunidad?: string
}

export interface UpdateProyectoDTO extends Partial<CreateProyectoDTO> {
    estado?: EstadoProyecto
}
