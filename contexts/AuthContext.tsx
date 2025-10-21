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

            try {
                const user = await authService.getProfile()
                setAuth({ user, token, isLoading: false, isAuthenticated: true })
            } catch (error) {
                // Token inválido o expirado
                authService.removeToken()
                setAuth({ user: null, token: null, isLoading: false, isAuthenticated: false })
            }
        }

        initAuth()
    }, [])

    const login = useCallback(async (credentials: LoginDTO) => {
        const { user, token } = await authService.login(credentials)
        authService.saveToken(token)
        setAuth({ user, token, isLoading: false, isAuthenticated: true })
    }, [])

    const register = useCallback(async (data: RegisterDTO) => {
        const { user, token } = await authService.register(data)
        authService.saveToken(token)
        setAuth({ user, token, isLoading: false, isAuthenticated: true })
    }, [])

    const logout = useCallback(() => {
        authService.logout()
        setAuth({ user: null, token: null, isLoading: false, isAuthenticated: false })
    }, [])

    const refreshUser = useCallback(async () => {
        const token = authService.getToken()
        if (!token) return

        try {
            const user = await authService.getProfile()
            setAuth((prev) => ({ ...prev, user, isAuthenticated: true }))
        } catch (error) {
            logout()
        }
    }, [logout])

    return <AuthContext.Provider value={{ auth, login, register, logout, refreshUser }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
