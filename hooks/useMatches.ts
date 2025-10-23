import { ProyectoConMatches } from "@/types/match.types"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

interface UseMatchesOptions {
    proyectoId?: string
    autoFetch?: boolean
}

export function useMatches(options: UseMatchesOptions = {}) {
    const { proyectoId, autoFetch = true } = options
    const router = useRouter()

    const [data, setData] = useState<ProyectoConMatches | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchMatches = useCallback(
        async (id?: string) => {
            const targetId = id || proyectoId
            if (!targetId) {
                setError("No se proporcionó un ID de proyecto")
                return
            }

            // Verificar que estamos en el cliente
            if (typeof window === "undefined") {
                console.warn("useMatches: No se puede ejecutar en el servidor")
                return
            }

            setIsLoading(true)
            setError(null)

            try {
                const token = localStorage.getItem("auth_token")
                if (!token) {
                    throw new Error("No hay token de autenticación. Por favor, inicia sesión nuevamente.")
                }

                const response = await fetch(`${API_URL}/proyectos/${targetId}/matches`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

                if (!response.ok) {
                    if (response.status === 401) {
                        // Sesión expirada - limpiar token y redirigir
                        localStorage.removeItem("auth_token")
                        localStorage.removeItem("user")
                        setError("Sesión expirada. Redirigiendo al login...")
                        setTimeout(() => {
                            router.push("/login/promotor")
                        }, 1500)
                        return
                    }
                    throw new Error(`Error ${response.status}: ${response.statusText}`)
                }

                const result = await response.json()
                setData(result)
            } catch (err) {
                const message = err instanceof Error ? err.message : "Error al cargar matches"
                setError(message)
                console.error("Error fetching matches:", err)
            } finally {
                setIsLoading(false)
            }
        },
        [proyectoId, router]
    )

    useEffect(() => {
        if (autoFetch && proyectoId) {
            fetchMatches()
        }
    }, [autoFetch, proyectoId, fetchMatches])

    return {
        data,
        matches: data?.matches || [],
        totalMatches: data?.totalMatches || 0,
        proyecto: data,
        isLoading,
        error,
        fetchMatches,
        refetch: fetchMatches,
    }
}
