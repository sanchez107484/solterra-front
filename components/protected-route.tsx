"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
    children: React.ReactNode
    requiredRole?: "PROPIETARIO" | "PROMOTOR" | "ADMIN"
    redirectTo?: string
}

export function ProtectedRoute({ children, requiredRole, redirectTo }: ProtectedRouteProps) {
    const { auth } = useAuth()
    const router = useRouter()

    useEffect(() => {
        // Esperar a que termine de cargar
        if (auth.isLoading) return

        // Si no está autenticado
        if (!auth.isAuthenticated) {
            // Si se especifica redirectTo (páginas del dashboard), usar ese destino
            // Si no se especifica redirectTo, ir al home (comportamiento por defecto)
            const destination = redirectTo || "/"
            router.push(destination)
            return
        }

        // Si requiere un rol específico y no lo tiene, redirigir
        if (requiredRole && auth.user?.rol !== requiredRole) {
            // Redirigir a su dashboard correcto o a home
            const userDashboard =
                auth.user?.rol === "PROPIETARIO" ? "/dashboard/propietario" : auth.user?.rol === "PROMOTOR" ? "/dashboard/promotor" : "/"
            router.push(userDashboard)
        }
    }, [auth.isAuthenticated, auth.isLoading, auth.user?.rol, requiredRole, redirectTo, router])

    // Mostrar loading mientras carga
    if (auth.isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                    <p className="text-muted-foreground mt-4">Cargando...</p>
                </div>
            </div>
        )
    }

    // No mostrar nada si no está autenticado (se está redirigiendo)
    if (!auth.isAuthenticated) {
        return null
    }

    // Si requiere rol y no lo tiene, no mostrar (se está redirigiendo)
    if (requiredRole && auth.user?.rol !== requiredRole) {
        return null
    }

    return <>{children}</>
}

export default ProtectedRoute
