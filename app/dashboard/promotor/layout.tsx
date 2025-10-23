import { PromotorSidebar } from "@/components/dashboard/promotor-sidebar"
import { ReactNode } from "react"

interface PromotorLayoutProps {
    children: ReactNode
}

export default function PromotorLayout({ children }: PromotorLayoutProps) {
    return (
        <div className="bg-background flex min-h-screen">
            {/* Sidebar - Fixed position */}
            <PromotorSidebar />

            {/* Main Content Area */}
            <main className="ml-64 min-h-screen flex-1">
                <div className="h-full">{children}</div>
            </main>
        </div>
    )
}
