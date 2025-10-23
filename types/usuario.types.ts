/**
 * Tipos para Usuario (frontend)
 * Hechos para seguir el patrón del backend. Ajusta si tu API difiere.
 */

export type RolUsuario = "PROPIETARIO" | "PROMOTOR" | "ADMIN"

export type PlanTipo = "FREE" | "PRO" | "ENTERPRISE"

export interface Usuario {
    id: string
    email: string
    password?: string // sólo para DTOs/creación, no debe enviarse en responses públicas
    nombre?: string | null
    apellidos?: string | null
    rol?: RolUsuario
    telefono?: string | null
    empresa?: string | null
    avatar?: string | null
    verificado?: boolean
    activo?: boolean
    planActual?: PlanTipo | null
    planActivoHasta?: string | null

    // Auditoría / timestamps
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
    telefono?: string
    empresa?: string
    rol?: RolUsuario
}

export interface LoginDTO {
    email: string
    password: string
}

export type CreateUsuarioDTO = RegisterDTO
export type UpdateUsuarioDTO = Partial<CreateUsuarioDTO>

export interface UsuarioFilters {
    q?: string
    rol?: RolUsuario
    page?: number
    perPage?: number
}
