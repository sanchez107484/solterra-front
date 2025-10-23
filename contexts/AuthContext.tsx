"use client"
import authService from "@/services/auth.service"
import type { LoginDTO, RegisterDTO, Usuario } from "@/types/usuario.types"
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"

type AuthState = {
    user: Usuario | null
    token: string | null
    isLoading: boolean
    isAuthenticated: boolean
}

type AuthContextType = {
    auth: AuthState
    login: (credentials: LoginDTO) => Promise<void>
    register: (data: RegisterDTO) => Promise<void>
    logout: () => void
    refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    auth: { user: null, token: null, isLoading: true, isAuthenticated: false },
    login: async () => {},
    register: async () => {},
    logout: () => {},
    refreshUser: async () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<AuthState>({
        user: null,
        token: null,
        isLoading: true,
        isAuthenticated: false,
    })

    // Cargar usuario al montar si hay token
    useEffect(() => {
        const initAuth = async () => {
            const token = authService.getToken()
            if (!token) {
                setAuth({ user: null, token: null, isLoading: false, isAuthenticated: false })
                return
            }

            // Intentar cargar usuario desde localStorage primero
            let cachedUser: Usuario | null = null
            if (typeof window !== "undefined") {
                const userStr = localStorage.getItem("user")
                if (userStr) {
                    try {
                        cachedUser = JSON.parse(userStr)
                        // Establecer usuario del cache inmediatamente
                        setAuth({ user: cachedUser, token, isLoading: false, isAuthenticated: true })
                    } catch (e) {
                        console.error("Error parsing cached user:", e)
                    }
                }
            }

            // Luego intentar refrescar desde la API en background
            try {
                const user = await authService.getProfile()
                // Guardar usuario actualizado en localStorage
                console.log("USUARIO: ", user)

                if (typeof window !== "undefined") {
                    localStorage.setItem("user", JSON.stringify(user))
                }
                setAuth({ user, token, isLoading: false, isAuthenticated: true })
            } catch (error) {
                // Si hay usuario en cache, mantenerlo aunque falle la API
                if (cachedUser) {
                    console.warn("API unavailable, using cached user data")
                    // Ya establecimos el usuario del cache arriba
                    return
                }
                // Si no hay cache y falla la API, limpiar todo
                authService.removeToken()
                if (typeof window !== "undefined") {
                    localStorage.removeItem("user")
                }
                setAuth({ user: null, token: null, isLoading: false, isAuthenticated: false })
            }
        }

        initAuth()
    }, [])

    const login = useCallback(async (credentials: LoginDTO) => {
        const { user, token } = await authService.login(credentials)
        authService.saveToken(token)
        // Guardar usuario en localStorage
        if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(user))
        }
        setAuth({ user, token, isLoading: false, isAuthenticated: true })
    }, [])

    const register = useCallback(async (data: RegisterDTO) => {
        const { user, token } = await authService.register(data)
        authService.saveToken(token)
        // Guardar usuario en localStorage
        if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(user))
        }
        setAuth({ user, token, isLoading: false, isAuthenticated: true })
    }, [])

    const logout = useCallback(() => {
        authService.logout()
        // Limpiar usuario de localStorage
        if (typeof window !== "undefined") {
            localStorage.removeItem("user")
        }
        setAuth({ user: null, token: null, isLoading: false, isAuthenticated: false })
    }, [])

    const refreshUser = useCallback(async () => {
        const token = authService.getToken()
        if (!token) return

        try {
            const user = await authService.getProfile()
            // Actualizar usuario en localStorage
            if (typeof window !== "undefined") {
                localStorage.setItem("user", JSON.stringify(user))
            }
            setAuth((prev) => ({ ...prev, user, isAuthenticated: true }))
        } catch (error) {
            logout()
        }
    }, [logout])

    return <AuthContext.Provider value={{ auth, login, register, logout, refreshUser }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
