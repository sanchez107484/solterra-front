import type { ApiError, ApiResponse } from "@/types/api.types"
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

// Crear instancia de axios
export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    timeout: 10000, // 10 segundos timeout
})

// Request interceptor: agregar token de autenticación
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        try {
            if (typeof window !== "undefined") {
                const token = localStorage.getItem("auth_token")
                if (token && config.headers) {
                    config.headers["Authorization"] = `Bearer ${token}`
                }
            }
        } catch (error) {
            // Ignorar errores en SSR
            console.warn("Error accessing localStorage:", error)
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor: manejo de errores y refresh de tokens
api.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        // Normalizar respuesta exitosa
        return response
    },
    async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

        // Error 401: Token expirado
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                // Intentar refrescar el token
                const refreshToken = localStorage.getItem("refresh_token")
                if (refreshToken) {
                    const refreshResponse = await axios.post(`${API_URL}/auth/refresh`, {
                        refreshToken,
                    })

                    const { data } = refreshResponse.data
                    localStorage.setItem("auth_token", data.accessToken)

                    if (data.refreshToken) {
                        localStorage.setItem("refresh_token", data.refreshToken)
                    }

                    // Reintentar la petición original
                    if (originalRequest.headers) {
                        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`
                    }
                    return api(originalRequest)
                }
            } catch (refreshError) {
                // Error al refrescar: limpiar tokens y redirigir al login
                localStorage.removeItem("auth_token")
                localStorage.removeItem("refresh_token")

                if (typeof window !== "undefined") {
                    window.location.href = "/login"
                }
            }
        }

        // Crear error normalizado
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message || "Error desconocido",
            statusCode: error.response?.status || 500,
            error: error.response?.data?.error,
            details: error.response?.data?.details,
        }

        // Logging de errores en desarrollo (solo errores importantes)
        if (process.env.NODE_ENV === "development") {
            const status = error.response?.status
            const url = error.config?.url || ""

            // No loguear errores esperados:
            // - 401/403 en general (autenticación)
            // - Cualquier error en /profile (intento de carga automática)
            const isAuthError = status === 401 || status === 403
            const isProfileCheck = url.includes("/profile")

            // Solo loguear si hay información real de error
            const hasErrorInfo = url || status || error.response?.data || error.message

            if (!isAuthError && !isProfileCheck && hasErrorInfo) {
                console.error("API Error:", {
                    url: error.config?.url,
                    method: error.config?.method,
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                })
            }
        }

        return Promise.reject(apiError)
    }
)

export default api
