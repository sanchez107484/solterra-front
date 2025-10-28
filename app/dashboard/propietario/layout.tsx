"use client"

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import ProtectedRoute from "@/components/protected-route"
import { ReactNode } from "react"

interface PropietarioLayoutProps {
    children: ReactNode
}

export default function PropietarioLayout({ children }: PropietarioLayoutProps) {
    return (
        <ProtectedRoute requiredRole="PROPIETARIO" redirectTo="/login/propietario">
            <div className="bg-background flex min-h-screen">
                {/* Sidebar - Fixed position */}
                <DashboardSidebar userType="propietario" />

                {/* Main Content Area */}
                <main className="ml-64 min-h-screen flex-1">
                    <div className="h-full">{children}</div>
                </main>
            </div>
        </ProtectedRoute>
    )
}
