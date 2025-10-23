import api from "@/lib/api/client"
import type { ApiResponse, BulkDeleteRequest, BulkDeleteResponse, PaginatedResponse } from "@/types/api.types"
import type {
    CreateTerrenoDTO,
    DisponibilidadTerreno,
    EstadoTerreno,
    Orientacion,
    Terreno,
    TerrenoFilters,
    TipoSuelo,
    UpdateTerrenoDTO,
} from "@/types/terreno.types"

const TERRENOS_ENDPOINT = "/terrenos"

export const terrenosService = {
    /**
     * Obtener todos los terrenos con filtros y paginación
     */
    async getAll(filters?: TerrenoFilters): Promise<PaginatedResponse<Terreno>> {
        const response = await api.get<PaginatedResponse<Terreno>>(TERRENOS_ENDPOINT, {
            params: filters,
        })
        return response.data
    },

    /**
     * Obtener un terreno por ID
     */
    async getById(id: string): Promise<Terreno> {
        const response = await api.get<ApiResponse<Terreno>>(`${TERRENOS_ENDPOINT}/${id}`)
        return response.data.data || response.data
    },

    /**
     * Crear un nuevo terreno
     */
    async create(payload: CreateTerrenoDTO): Promise<Terreno> {
        const response = await api.post<ApiResponse<Terreno>>(TERRENOS_ENDPOINT, payload)
        return response.data.data || response.data
    },

    /**
     * Actualizar un terreno existente
     */
    async update(id: string, payload: UpdateTerrenoDTO): Promise<Terreno> {
        const response = await api.patch<ApiResponse<Terreno>>(`${TERRENOS_ENDPOINT}/${id}`, payload)
        return response.data.data || response.data
    },

    /**
     * Eliminar un terreno (soft delete)
     */
    async remove(id: string): Promise<void> {
        await api.delete(`${TERRENOS_ENDPOINT}/${id}`)
    },

    /**
     * Alias para remove (compatibilidad)
     */
    async delete(id: string): Promise<void> {
        return this.remove(id)
    },

    /**
     * Obtener terrenos del usuario actual (para propietarios)
     */
    async getMine(filters?: Omit<TerrenoFilters, "propietarioId">): Promise<PaginatedResponse<Terreno>> {
        const response = await api.get<PaginatedResponse<Terreno>>(`${TERRENOS_ENDPOINT}/me`, {
            params: filters,
        })
        return response.data
    },

    /**
     * Cambiar estado de un terreno
     */
    async updateStatus(id: string, estado: EstadoTerreno): Promise<Terreno> {
        return this.update(id, { estado })
    },

    /**
     * Buscar terrenos por ubicación (radio en km)
     */
    async searchByLocation(
        latitud: number,
        longitud: number,
        radio: number,
        filters?: TerrenoFilters
    ): Promise<PaginatedResponse<Terreno>> {
        const response = await api.get<PaginatedResponse<Terreno>>(`${TERRENOS_ENDPOINT}/near`, {
            params: { latitud, longitud, radio, ...filters },
        })
        return response.data
    },

    /**
     * Obtener terrenos compatibles con un proyecto
     */
    async getCompatibleWithProject(proyectoId: string, filters?: TerrenoFilters): Promise<PaginatedResponse<Terreno>> {
        const response = await api.get<PaginatedResponse<Terreno>>(`${TERRENOS_ENDPOINT}/compatible/${proyectoId}`, { params: filters })
        return response.data
    },

    /**
     * Obtener estadísticas de terrenos
     */
    async getStats(): Promise<{
        total: number
        porTipoSuelo: Record<TipoSuelo, number>
        porEstado: Record<EstadoTerreno, number>
        porDisponibilidad: Record<DisponibilidadTerreno, number>
        superficieTotal: number
        precioPromedio: {
            venta: number
            arrendamiento: number
        }
    }> {
        const response = await api.get<ApiResponse<any>>(`${TERRENOS_ENDPOINT}/stats`)
        return response.data.data || response.data
    },

    /**
     * Eliminar múltiples terrenos
     */
    async bulkDelete(ids: string[]): Promise<BulkDeleteResponse> {
        const response = await api.post<ApiResponse<BulkDeleteResponse>>(`${TERRENOS_ENDPOINT}/bulk-delete`, { ids } as BulkDeleteRequest)
        return response.data.data || response.data
    },

    /**
     * Actualizar múltiples terrenos
     */
    async bulkUpdate(ids: string[], payload: UpdateTerrenoDTO): Promise<{ updated: number; failed: string[] }> {
        const response = await api.patch<ApiResponse<any>>(`${TERRENOS_ENDPOINT}/bulk-update`, { ids, ...payload })
        return response.data.data || response.data
    },

    /**
     * Duplicar un terreno
     */
    async duplicate(id: string, newTitle?: string): Promise<Terreno> {
        const response = await api.post<ApiResponse<Terreno>>(`${TERRENOS_ENDPOINT}/${id}/duplicate`, { titulo: newTitle })
        return response.data.data || response.data
    },

    /**
     * Buscar terrenos por texto
     */
    async search(query: string, filters?: Omit<TerrenoFilters, "search">): Promise<PaginatedResponse<Terreno>> {
        const response = await api.get<PaginatedResponse<Terreno>>(`${TERRENOS_ENDPOINT}/search`, {
            params: { search: query, ...filters },
        })
        return response.data
    },

    /**
     * Obtener provincias disponibles
     */
    async getProvincias(): Promise<string[]> {
        const response = await api.get<ApiResponse<string[]>>(`${TERRENOS_ENDPOINT}/provincias`)
        return response.data.data || response.data
    },

    /**
     * Obtener municipios de una provincia
     */
    async getMunicipios(provincia: string): Promise<string[]> {
        const response = await api.get<ApiResponse<string[]>>(`${TERRENOS_ENDPOINT}/municipios`, {
            params: { provincia },
        })
        return response.data.data || response.data
    },

    /**
     * Validar coordenadas geográficas
     */
    async validateCoordinates(
        latitud: number,
        longitud: number
    ): Promise<{
        valid: boolean
        municipio?: string
        provincia?: string
        codigoPostal?: string
    }> {
        const response = await api.post<ApiResponse<any>>(`${TERRENOS_ENDPOINT}/validate-coordinates`, {
            latitud,
            longitud,
        })
        return response.data.data || response.data
    },

    /**
     * Calcular distancia a la red eléctrica más cercana
     */
    async calculateDistanceToGrid(
        latitud: number,
        longitud: number
    ): Promise<{
        distancia: number
        subestacionMasCercana?: string
        capacidadSubestacion?: number
    }> {
        const response = await api.post<ApiResponse<any>>(`${TERRENOS_ENDPOINT}/distance-to-grid`, {
            latitud,
            longitud,
        })
        return response.data.data || response.data
    },

    /**
     * Obtener potencial solar/eólico de una ubicación
     */
    async calculateRenewablePotential(
        latitud: number,
        longitud: number
    ): Promise<{
        potencialSolar: number
        potencialEolico: number
        orientacionOptima: Orientacion
    }> {
        const response = await api.post<ApiResponse<any>>(`${TERRENOS_ENDPOINT}/renewable-potential`, {
            latitud,
            longitud,
        })
        return response.data.data || response.data
    },
}

export default terrenosService
