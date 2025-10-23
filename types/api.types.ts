/**
 * Tipos comunes para las respuestas de la API
 */

export interface ApiResponse<T = any> {
    data: T
    message?: string
    success?: boolean
}

export interface PaginatedResponse<T = any> {
    data: T[]
    pagination: {
        page: number
        perPage: number
        total: number
        totalPages: number
        hasNext: boolean
        hasPrev: boolean
    }
}

export interface ApiError {
    message: string
    statusCode: number
    error?: string
    details?: any
}

export interface QueryParams {
    page?: number
    perPage?: number
    sortBy?: string
    sortOrder?: "asc" | "desc"
    search?: string
}

// Filtros específicos para proyectos
export interface ProyectoFilters extends QueryParams {
    tipo?: string
    estado?: string
    provincia?: string
    comunidad?: string
    presupuestoMin?: number
    presupuestoMax?: number
    superficieMinimaMin?: number
    superficieMinimaMax?: number
}

// Para operaciones de bulk
export interface BulkDeleteRequest {
    ids: string[]
}

export interface BulkDeleteResponse {
    deleted: number
    failed: string[]
}
