"use client"

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import ProtectedRoute from "@/components/protected-route"
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext"
import { ReactNode } from "react"

interface PromotorLayoutProps {
    children: ReactNode
}

function PromotorLayoutContent({ children }: PromotorLayoutProps) {
    const { isCollapsed } = useSidebar()

    return (
        <div className="bg-background flex min-h-screen">
            {/* Sidebar - Fixed position */}
            <DashboardSidebar userType="promotor" />

            {/* Main Content Area */}
            <main className={`min-h-screen flex-1 transition-all duration-300 ease-in-out ${isCollapsed ? "ml-16" : "ml-64"}`}>
                <div className="h-full">{children}</div>
            </main>
        </div>
    )
}

export default function PromotorLayout({ children }: PromotorLayoutProps) {
    return (
        <ProtectedRoute requiredRole="PROMOTOR" redirectTo="/login/promotor">
            <SidebarProvider>
                <PromotorLayoutContent>{children}</PromotorLayoutContent>
            </SidebarProvider>
        </ProtectedRoute>
    )
}
