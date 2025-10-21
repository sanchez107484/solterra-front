import { Toaster } from "@/components/ui/toaster"
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
    icons: {
        icon: [
            { url: "/solterra-logo.svg", type: "image/svg+xml" },
            { url: "/placeholder-logo.png", type: "image/png", sizes: "32x32" },
        ],
        apple: [{ url: "/placeholder-logo.png", sizes: "180x180", type: "image/png" }],
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="es">
            <head>
                {/* Prefer SVG favicon, fallback to PNG. To add a .ico file, place `/favicon.ico` in `public/`. */}
                <link rel="icon" href="/solterra-logo.svg" type="image/svg+xml" />
                <link rel="icon" href="/placeholder-logo.png" sizes="32x32" />
                <link rel="apple-touch-icon" href="/placeholder-logo.png" />
            </head>
            <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
                <AuthProvider>
                    <I18nProvider>
                        <Suspense fallback={null}>
                            {children}
                            <Analytics />
                        </Suspense>
                        <Toaster />
                    </I18nProvider>
                </AuthProvider>
            </body>
        </html>
    )
}
