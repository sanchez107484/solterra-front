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

    // Obtener perfil del usuario actual
    async getProfile() {
        const resp = await api.get(`${USUARIOS_ENDPOINT}/me`)
        return resp.data.data ?? resp.data
    },

    // Actualizar perfil del usuario actual
    async updateProfile(payload: UpdateUsuarioDTO) {
        const resp = await api.patch(`${USUARIOS_ENDPOINT}/me`, payload)
        return resp.data.data ?? resp.data
    },

    // Cambiar contraseña
    async changePassword(currentPassword: string, newPassword: string) {
        const resp = await api.patch(`${USUARIOS_ENDPOINT}/me/password`, {
            currentPassword,
            newPassword,
        })
        return resp.data
    },

    // Subir avatar
    async uploadAvatar(file: File) {
        const formData = new FormData()
        formData.append("avatar", file)
        const resp = await api.post(`${USUARIOS_ENDPOINT}/me/avatar`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        return resp.data.data ?? resp.data
    },

    // Obtener estadísticas del usuario
    async getStats() {
        const resp = await api.get(`${USUARIOS_ENDPOINT}/me/stats`)
        return resp.data.data ?? resp.data
    },
}

export default usuariosService
