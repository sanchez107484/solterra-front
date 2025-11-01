"use client"

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import ProtectedRoute from "@/components/protected-route"
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext"
import { ReactNode } from "react"

interface PropietarioLayoutProps {
    children: ReactNode
}

function PropietarioLayoutContent({ children }: PropietarioLayoutProps) {
    const { isCollapsed } = useSidebar()

    return (
        <div className="bg-background flex min-h-screen">
            {/* Sidebar - Fixed position */}
            <DashboardSidebar userType="propietario" />

            {/* Main Content Area */}
            <main className={`min-h-screen flex-1 transition-all duration-300 ease-in-out ${isCollapsed ? "ml-16" : "ml-64"}`}>
                <div className="h-full">{children}</div>
            </main>
        </div>
    )
}

export default function PropietarioLayout({ children }: PropietarioLayoutProps) {
    return (
        <ProtectedRoute requiredRole="PROPIETARIO" redirectTo="/login/propietario">
            <SidebarProvider>
                <PropietarioLayoutContent>{children}</PropietarioLayoutContent>
            </SidebarProvider>
        </ProtectedRoute>
    )
}
