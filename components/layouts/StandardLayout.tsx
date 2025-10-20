"use client"

import { FooterSection } from "@/components/footer-section"
import { SeccionCTA } from "@/components/seccion-cta"
import { Sidebar } from "@/components/sidebar"
import React from "react"

type Props = {
    children: React.ReactNode
}

export default function StandardLayout({ children }: Props) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 lg:ml-64">
                {children}
                <SeccionCTA />
                <FooterSection />
            </main>
        </div>
    )
}
