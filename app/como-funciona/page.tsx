"use client"

import { FooterSection } from "@/components/footer-section"
import { SeccionComoFunciona } from "@/components/landing/seccion-como-funciona"
import { Sidebar } from "@/components/sidebar"
import Head from "next/head"

export default function ComoFunciona() {
    return (
        <div className="flex min-h-screen">
            <Head>
                <title>Cómo funciona - Solterra Advisory</title>
            </Head>
            <Sidebar />
            <main className="flex-1 lg:ml-64">
                {/* Hero Section */}
                <section className="from-primary/10 via-background to-secondary/10 relative bg-gradient-to-br px-6 py-24">
                    <div className="container mx-auto max-w-6xl text-center">
                        <h1 className="mb-6 text-5xl font-bold text-balance md:text-6xl">Cómo funciona Solterra</h1>
                        <p className="text-muted-foreground mx-auto max-w-3xl text-xl text-pretty">
                            Conectamos propietarios de terrenos con promotores de energía renovable de forma simple, transparente y
                            eficiente.
                        </p>
                    </div>
                </section>

                {/* Componente reutilizable con las tres secciones */}
                <SeccionComoFunciona showCTA={true} compactMode={false} />

                <FooterSection />
            </main>
        </div>
    )
}
