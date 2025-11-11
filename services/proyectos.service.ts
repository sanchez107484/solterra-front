import api from "@/lib/api/client"
import type { ApiResponse, BulkDeleteRequest, BulkDeleteResponse, PaginatedResponse, ProyectoFilters } from "@/types/api.types"
import type { CreateProyectoDTO, EstadoProyecto, Proyecto, TipoProyecto, UpdateProyectoDTO } from "@/types/proyecto.types"

const PROYECTOS_ENDPOINT = "/proyectos"

export const proyectosService = {
    /**
     * Obtener todos los proyectos con filtros y paginación
     */
    async getAll(filters?: ProyectoFilters): Promise<PaginatedResponse<Proyecto>> {
        const response = await api.get<PaginatedResponse<Proyecto>>(PROYECTOS_ENDPOINT, {
            params: filters,
        })
        return response.data
    },

    /**
     * Obtener un proyecto por ID
     */
    async getById(id: string): Promise<Proyecto> {
        const response = await api.get<ApiResponse<Proyecto>>(`${PROYECTOS_ENDPOINT}/${id}`)
        return response.data.data || response.data
    },

    /**
     * Crear un nuevo proyecto
     */
    async create(payload: CreateProyectoDTO): Promise<Proyecto> {
        const response = await api.post<ApiResponse<Proyecto>>(PROYECTOS_ENDPOINT, payload)
        return response.data.data || response.data
    },

    /**
     * Actualizar un proyecto existente
     */
    async update(id: string, payload: UpdateProyectoDTO): Promise<Proyecto> {
        const response = await api.patch<ApiResponse<Proyecto>>(`${PROYECTOS_ENDPOINT}/${id}`, payload)
        return response.data.data || response.data
    },

    /**
     * Eliminar un proyecto
     */
    async delete(id: string): Promise<void> {
        await api.delete(`${PROYECTOS_ENDPOINT}/${id}`)
    },

    /**
     * Obtener proyectos del usuario actual (para promotores)
     */
    async getMine(filters?: Omit<ProyectoFilters, "promotorId">): Promise<PaginatedResponse<Proyecto>> {
        const response = await api.get<PaginatedResponse<Proyecto>>(`${PROYECTOS_ENDPOINT}/me`, {
            params: filters,
        })
        return response.data
    },

    /**
     * Obtener proyectos del usuario actual con matches (para promotores)
     */
    async getMineWithMatches(): Promise<any[]> {
        const response = await api.get<any[]>(`${PROYECTOS_ENDPOINT}/me-with-matches`)
        return response.data
    },

    /**
     * Cambiar estado de un proyecto
     */
    async updateStatus(id: string, estado: EstadoProyecto): Promise<Proyecto> {
        return this.update(id, { estado })
    },

    /**
     * Obtener estadísticas de proyectos
     */
    async getStats(): Promise<{
        total: number
        porTipo: Record<TipoProyecto, number>
        porEstado: Record<EstadoProyecto, number>
    }> {
        const response = await api.get<ApiResponse<any>>(`${PROYECTOS_ENDPOINT}/stats`)
        return response.data.data || response.data
    },

    /**
     * Eliminar múltiples proyectos
     */
    async bulkDelete(ids: string[]): Promise<BulkDeleteResponse> {
        const response = await api.post<ApiResponse<BulkDeleteResponse>>(`${PROYECTOS_ENDPOINT}/bulk-delete`, { ids } as BulkDeleteRequest)
        return response.data.data || response.data
    },

    /**
     * Duplicar un proyecto
     */
    async duplicate(id: string, newTitle?: string): Promise<Proyecto> {
        const response = await api.post<ApiResponse<Proyecto>>(`${PROYECTOS_ENDPOINT}/${id}/duplicate`, { titulo: newTitle })
        return response.data.data || response.data
    },

    /**
     * Buscar proyectos por texto
     */
    async search(query: string, filters?: Omit<ProyectoFilters, "search">): Promise<PaginatedResponse<Proyecto>> {
        const response = await api.get<PaginatedResponse<Proyecto>>(`${PROYECTOS_ENDPOINT}/search`, {
            params: { search: query, ...filters },
        })
        return response.data
    },

    /**
     * Obtener tipos de proyecto disponibles
     */
    async getTipos(): Promise<TipoProyecto[]> {
        const response = await api.get<ApiResponse<TipoProyecto[]>>(`${PROYECTOS_ENDPOINT}/tipos`)
        return response.data.data || response.data
    },

    /**
     * Obtener estados de proyecto disponibles
     */
    async getEstados(): Promise<EstadoProyecto[]> {
        const response = await api.get<ApiResponse<EstadoProyecto[]>>(`${PROYECTOS_ENDPOINT}/estados`)
        return response.data.data || response.data
    },
}

export default proyectosService
