"use client"

import { FAQSection } from "@/components/landing/faq-section"
import { HeroSection } from "@/components/landing/hero-section"
import { SeccionBeneficios } from "@/components/landing/seccion-beneficios"
import { SeccionComoFuncionaSplit } from "@/components/landing/seccion-como-funciona-split"
import { StatsSection } from "@/components/landing/stats-section"
import StandardLayout from "@/components/layouts/StandardLayout"
import { FAQSchema } from "@/components/seo/faq-schema"

export default function LandingPage() {
    return (
        <>
            <FAQSchema />
            <StandardLayout>
                <HeroSection />
                <StatsSection />
                <SeccionBeneficios />
                <SeccionComoFuncionaSplit showCTA={true} compactMode={false} />
                {/* <SeccionComoFunciona showCTA={true} compactMode={false} /> */}
                {/* <SeccionComoFunciona /> */}
                {/* <TestimonialsSection /> */}
                <FAQSection />
            </StandardLayout>
        </>
    )
}
