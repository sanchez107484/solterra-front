import api from "@/lib/api/client"
import type { LoginDTO, RegisterDTO, Usuario } from "@/types/usuario.types"

const AUTH_ENDPOINT = "/auth"

export interface AuthResponse {
    user: {
        id: string
        email: string
        nombre?: string | null
        rol: "PROPIETARIO" | "PROMOTOR" | "ADMIN"
    }
    token: string // El backend devuelve "token", no "access_token"
}

export const authService = {
    async register(payload: RegisterDTO): Promise<AuthResponse> {
        const resp = await api.post(`${AUTH_ENDPOINT}/register`, payload)
        return resp.data
    },

    async login(payload: LoginDTO): Promise<AuthResponse> {
        const resp = await api.post(`${AUTH_ENDPOINT}/login`, payload)
        return resp.data
    },

    async getProfile(): Promise<Usuario> {
        const resp = await api.get(`${AUTH_ENDPOINT}/profile`)
        return resp.data
    },

    // Helpers locales (no llaman al backend)
    saveToken(token: string): void {
        if (typeof window !== "undefined") {
            localStorage.setItem("auth_token", token)
        }
    },

    getToken(): string | null {
        if (typeof window !== "undefined") {
            return localStorage.getItem("auth_token")
        }
        return null
    },

    removeToken(): void {
        if (typeof window !== "undefined") {
            localStorage.removeItem("auth_token")
        }
    },

    logout(): void {
        this.removeToken()
    },
}

export default authService
