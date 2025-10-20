import api from "@/lib/api/client"
import type { CreateTerrenoDTO, TerrenoFilters, UpdateTerrenoDTO } from "@/types/terreno.types"

const TERRENOS_ENDPOINT = "/terrenos"

export const terrenosService = {
    /**
     * Devuelve la respuesta completa esperada por el frontend: { data: Terreno[], pagination }
     */
    async getAll(params?: Partial<TerrenoFilters>) {
        const resp = await api.get(TERRENOS_ENDPOINT, { params })
        return resp.data // forward full payload (assume backend: { data, pagination })
    },

    async getById(id: string) {
        const resp = await api.get(`${TERRENOS_ENDPOINT}/${id}`)
        return resp.data.data ?? resp.data
    },

    async create(payload: CreateTerrenoDTO) {
        const resp = await api.post(TERRENOS_ENDPOINT, payload)
        return resp.data.data ?? resp.data
    },

    async update(id: string, payload: UpdateTerrenoDTO) {
        const resp = await api.put(`${TERRENOS_ENDPOINT}/${id}`, payload)
        return resp.data.data ?? resp.data
    },

    async remove(id: string) {
        const resp = await api.delete(`${TERRENOS_ENDPOINT}/${id}`)
        return resp.data
    },

    // alias usado por código antiguo
    async delete(id: string) {
        return this.remove(id)
    },

    // Obtener terrenos del usuario actual (endpoint asumido)
    async getMine(params?: { page?: number; perPage?: number }) {
        const resp = await api.get(`${TERRENOS_ENDPOINT}/mine`, { params })
        return resp.data // { data, pagination }
    },
}

export default terrenosService
