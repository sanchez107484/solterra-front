import { AuthProvider } from "@/contexts/AuthContext"
import { I18nProvider } from "@/i18n/i18nContext"
import { Analytics } from "@vercel/analytics/next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import type React from "react"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
    title: "Solterra Advisory - Conectamos terrenos con energía renovable",
    description: "Plataforma que une propietarios de terrenos rurales con desarrolladores de proyectos energéticos renovables.",
    generator: "v0.app",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="es">
            <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
                <AuthProvider>
                    <I18nProvider>
                        <Suspense fallback={null}>
                            {children}
                            <Analytics />
                        </Suspense>
                    </I18nProvider>
                </AuthProvider>
            </body>
        </html>
    )
}
