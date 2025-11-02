"use client"

import ProtectedRoute from "@/components/protected-route"
import { SidebarProvider } from "@/contexts/SidebarContext"
import { ReactNode } from "react"

interface PerfilLayoutProps {
    children: ReactNode
}

export default function PerfilLayout({ children }: PerfilLayoutProps) {
    return (
        <ProtectedRoute requiredRole={["PROPIETARIO", "PROMOTOR", "ADMIN"]} redirectTo="/login">
            <SidebarProvider>{children}</SidebarProvider>
        </ProtectedRoute>
    )
}
