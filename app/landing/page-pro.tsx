"use client"

import { HeroSection } from "@/components/landing/hero-section"
import StandardLayout from "@/components/layouts/StandardLayout"
import { FAQSchema } from "@/components/seo/faq-schema"
import dynamic from "next/dynamic"

// Lazy load below-the-fold components to improve FCP and LCP
const StatsSection = dynamic(() => import("@/components/landing/stats-section").then((mod) => mod.StatsSection), {
    ssr: true,
})
const SeccionBeneficios = dynamic(() => import("@/components/landing/seccion-beneficios").then((mod) => mod.SeccionBeneficios), {
    ssr: true,
})
const SeccionComoFuncionaSplit = dynamic(
    () => import("@/components/landing/seccion-como-funciona-split").then((mod) => mod.SeccionComoFuncionaSplit),
    {
        ssr: true,
    }
)
const FAQSection = dynamic(() => import("@/components/landing/faq-section").then((mod) => mod.FAQSection), {
    ssr: true,
})

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
