"use client"

import { Footer } from "@/components/footer"
import { SeccionBeneficios } from "@/components/seccion-beneficios"
import { SeccionComoFunciona } from "@/components/seccion-como-funciona"
import { SeccionCTA } from "@/components/seccion-cta"
import { SeccionHero } from "@/components/seccion-hero"
import { Sidebar } from "@/components/sidebar"

export default function LandingPage() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 lg:ml-64">
                <SeccionHero />
                <SeccionBeneficios />
                <SeccionComoFunciona />
                <SeccionCTA />
                <Footer />
            </main>
        </div>
    )
}
