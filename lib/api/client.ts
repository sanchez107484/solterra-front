import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Para CORS con credenciales
})

// Interceptor: attach token if present
api.interceptors.request.use((config) => {
    try {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("auth_token")
            if (token && config.headers) {
                config.headers["Authorization"] = `Bearer ${token}`
            }
        }
    } catch (e) {
        // ignore in SSR
    }
    return config
})

export default api
