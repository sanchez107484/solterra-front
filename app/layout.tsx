import { CookieBanner } from "@/components/cookie-banner"
import { StructuredData } from "@/components/seo/structured-data"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/AuthContext"
import { I18nProvider } from "@/i18n/i18nContext"
import Analytics from "@/components/Analytics"
import { Analytics as VercelAnalytics } from "@vercel/analytics/next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import type React from "react"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
    metadataBase: new URL("https://www.solterradvisory.com"),
    title: {
        default: "Solterra Advisory - Conecta tu Terreno con Energía Renovable | Solar y Eólica",
        template: "%s | Solterra Advisory",
    },
    description:
        "¿Tienes un terreno rural? Conéctalo con promotores de energía solar y eólica. Genera ingresos pasivos, contribuye a la transición energética y maximiza el valor de tu propiedad. Plataforma líder en España.",
    keywords: [
        // Keywords principales long-tail (búsquedas reales de usuarios)
        "alquilar terreno para placas solares",
        "alquiler terreno energía solar",
        "terreno para parque eólico",
        "arrendar terreno energía renovable",
        "cuánto pagan por alquilar terreno solar",
        "promotores energía solar España",
        "proyecto fotovoltaico terreno",
        "ingresos pasivos terreno rural",
        "valorar terreno energía renovable",
        // Keywords secundarias
        "energía renovable España",
        "terrenos rurales",
        "energía solar",
        "energía eólica",
        "proyectos fotovoltaicos",
        "parques solares",
        "aerogeneradores terreno",
        "transición energética",
        "PNIEC 2030",
        "energía verde",
        "sostenibilidad",
    ],
    authors: [{ name: "Solterra Advisory" }],
    creator: "Solterra Advisory",
    publisher: "Solterra Advisory",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "es_ES",
        url: "https://www.solterradvisory.com",
        siteName: "Solterra Advisory",
        title: "Solterra Advisory - Conectamos terrenos con energía renovable",
        description:
            "Plataforma líder que conecta propietarios de terrenos rurales con promotores de proyectos de energía renovable. Maximiza el valor de tu terreno.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Solterra Advisory - Conecta tu terreno con energía renovable",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Solterra Advisory - Conectamos terrenos con energía renovable",
        description: "Plataforma que conecta propietarios de terrenos con promotores de energía renovable",
        images: ["/og-image.png"],
    },
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "48x48" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
        ],
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    alternates: {
        canonical: "https://www.solterradvisory.com",
        languages: {
            "es-ES": "https://www.solterradvisory.com",
            "en-US": "https://www.solterradvisory.com/en",
        },
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
                <link rel="icon" href="/solterra-logo2.svg" type="image/svg+xml" />
                <link rel="icon" href="/placeholder-logo.png" sizes="32x32" />
                <link rel="apple-touch-icon" href="/placeholder-logo.png" />
                <StructuredData />
            </head>
            <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
                <AuthProvider>
                    <I18nProvider>
                        <Suspense fallback={null}>
                            {children}
                            <Analytics />
                            <VercelAnalytics />
                        </Suspense>
                        <Toaster />
                        <CookieBanner />
                    </I18nProvider>
                </AuthProvider>
            </body>
        </html>
    )
}
