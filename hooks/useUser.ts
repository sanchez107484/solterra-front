import { authService } from "@/services/auth.service"
import { Usuario } from "@/types/usuario.types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function useUser() {
    const [user, setUser] = useState<Usuario | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    const loadUser = async () => {
        try {
            setIsLoading(true)

            // Primero intentar cargar desde localStorage
            const cachedUser = localStorage.getItem("user")
            if (cachedUser) {
                const parsedUser = JSON.parse(cachedUser)
                setUser(parsedUser)
            }

            // Verificar si hay token
            const token = authService.getToken()
            if (!token) {
                setUser(null)
                setIsLoading(false)
                return
            }

            // Cargar datos frescos del backend
            const userData = await authService.getProfile()

            // Guardar en localStorage para uso posterior
            localStorage.setItem("user", JSON.stringify(userData))
            setUser(userData)
        } catch (error) {
            console.error("Error loading user profile:", error)

            // Si hay error 401, limpiar sesión
            if ((error as any)?.response?.status === 401) {
                authService.removeToken()
                localStorage.removeItem("user")
                setUser(null)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const refreshUser = async () => {
        await loadUser()
    }

    const logout = (userType: "promotor" | "propietario" = "promotor") => {
        authService.removeToken()
        localStorage.removeItem("user")
        setUser(null)
        router.push(`/login/${userType}`)
    }

    useEffect(() => {
        loadUser()
    }, [])

    return {
        user,
        isLoading,
        refreshUser,
        logout,
    }
}
