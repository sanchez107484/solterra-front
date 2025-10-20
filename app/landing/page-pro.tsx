"use client"

import { FooterSection } from "@/components/footer-section"
import { FAQSection } from "@/components/landing/faq-section"
import { HeroSection } from "@/components/landing/hero-section"
import { SeccionBeneficios } from "@/components/landing/seccion-beneficios"
import { SeccionComoFunciona } from "@/components/landing/seccion-como-funciona"
import { SeccionComoFuncionaSplit } from "@/components/landing/seccion-como-funciona-split"
import { SeccionCTA } from "@/components/landing/seccion-cta"
import { StatsSection } from "@/components/landing/stats-section"
import { Sidebar } from "@/components/sidebar"

export default function LandingPage() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 lg:ml-64">
                <HeroSection />
                <StatsSection />
                <SeccionBeneficios />
                <SeccionComoFuncionaSplit showCTA={true} compactMode={false} />
                <SeccionComoFunciona showCTA={true} compactMode={false} />

                {/* <SeccionComoFunciona />
                 */}
                {/* <TestimonialsSection /> */}
                <FAQSection />
                <SeccionCTA />
                <FooterSection />
            </main>
        </div>
    )
}
