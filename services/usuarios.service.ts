import api from "@/lib/api/client"
import type { CreateUsuarioDTO, UpdateUsuarioDTO, UsuarioFilters } from "@/types/usuario.types"

const USUARIOS_ENDPOINT = "/usuarios"

export const usuariosService = {
    async getAll(params?: UsuarioFilters) {
        const resp = await api.get(USUARIOS_ENDPOINT, { params })
        return resp.data
    },

    async getById(id: string) {
        const resp = await api.get(`${USUARIOS_ENDPOINT}/${id}`)
        return resp.data.data ?? resp.data
    },

    async create(payload: CreateUsuarioDTO) {
        const resp = await api.post(USUARIOS_ENDPOINT, payload)
        return resp.data.data ?? resp.data
    },

    async update(id: string, payload: UpdateUsuarioDTO) {
        const resp = await api.put(`${USUARIOS_ENDPOINT}/${id}`, payload)
        return resp.data.data ?? resp.data
    },

    async remove(id: string) {
        const resp = await api.delete(`${USUARIOS_ENDPOINT}/${id}`)
        return resp.data
    },

    // alias por compatibilidad
    async delete(id: string) {
        return this.remove(id)
    },

    // Obtener usuarios asociados al usuario actual (si el backend expone /usuarios/mine)
    async getMine(params?: Record<string, any>) {
        const resp = await api.get(`${USUARIOS_ENDPOINT}/mine`, { params })
        return resp.data
    },
}

export default usuariosService
