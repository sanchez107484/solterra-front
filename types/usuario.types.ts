/**
 * types/usuario.types.ts
 * Tipos de Usuario alineados con schema.prisma proporcionado.
 */

export type RolUsuario = "PROPIETARIO" | "PROMOTOR" | "ADMIN"

export type PlanTipo = "FREE" | "PRO" | "ENTERPRISE"

export interface Usuario {
    id: string
    email: string
    password?: string // sólo para DTOs/creación, no incluir en respuestas públicas
    nombre?: string | null
    apellidos?: string | null
    rol: RolUsuario
    telefono?: string | null
    empresa?: string | null
    avatar?: string | null
    verificado?: boolean
    activo?: boolean
    planActual?: PlanTipo
    planActivoHasta?: string | null

    // Auditoría
    ultimoAcceso?: string | null
    creadoEn?: string
    actualizadoEn?: string
    eliminadoEn?: string | null
}

export interface RegisterDTO {
    email: string
    password: string
    nombre?: string
    apellidos?: string
    rol?: RolUsuario
}

export interface LoginDTO {
    email: string
    password: string
}

export default Usuario
