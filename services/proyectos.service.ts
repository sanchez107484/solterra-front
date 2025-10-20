import api from "@/lib/api/client"

const PROYECTOS_ENDPOINT = "/proyectos"

export const proyectosService = {
    async getAll(params?: Record<string, any>) {
        const resp = await api.get(PROYECTOS_ENDPOINT, { params })
        return resp.data
    },

    async getById(id: string) {
        const resp = await api.get(`${PROYECTOS_ENDPOINT}/${id}`)
        return resp.data.data ?? resp.data
    },

    async create(payload: Record<string, any>) {
        const resp = await api.post(PROYECTOS_ENDPOINT, payload)
        return resp.data.data ?? resp.data
    },

    async update(id: string, payload: Record<string, any>) {
        const resp = await api.put(`${PROYECTOS_ENDPOINT}/${id}`, payload)
        return resp.data.data ?? resp.data
    },

    async delete(id: string) {
        const resp = await api.delete(`${PROYECTOS_ENDPOINT}/${id}`)
        return resp.data
    },
}

export default proyectosService
