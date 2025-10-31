import api from "@/lib/api/client"
import type { ApiResponse } from "@/types/api.types"

const MATCHES_ENDPOINT = "/matches"

export const matchesService = {
    /**
     * Obtener matches agrupados por terreno (acepta array de terrenoIds en body)
     * Espera la forma que devuelve el backend: Array<{ terrenoId: string; matches: any[] }>
     */
    async getMatchesByTerrenos(terrenoIds: string[]) {
        const response = await api.post<ApiResponse<any>>(`${MATCHES_ENDPOINT}/terrenos`, { terrenoIds })
        return response.data.data || response.data
    },

    /**
     * Obtener matches para un solo terreno
     */
    async getMatchesByTerreno(terrenoId: string) {
        const response = await api.get<ApiResponse<any>>(`${MATCHES_ENDPOINT}/${terrenoId}`)
        return response.data.data || response.data
    },
}

export default matchesService
