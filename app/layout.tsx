import { CookieBanner } from "@/components/cookie-banner"
import { StructuredData } from "@/components/seo/structured-data"
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
    metadataBase: new URL("https://www.solterradvisory.com"),
    title: {
        default: "Solterra Advisory - Conectamos terrenos con energía renovable",
        template: "%s | Solterra Advisory",
    },
    description:
        "Plataforma líder que conecta propietarios de terrenos rurales con promotores de proyectos de energía renovable (solar, eólica). Maximiza el valor de tu terreno o encuentra la ubicación perfecta para tu proyecto.",
    keywords: [
        "energía renovable",
        "terrenos rurales",
        "energía solar",
        "energía eólica",
        "proyectos fotovoltaicos",
        "alquiler terrenos energía",
        "promotores renovables",
        "inversión renovable",
        "transición energética",
        "PNIEC",
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
                alt: "Solterra Advisory - Energía Renovable",
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
            { url: "/solterra-logo2.svg", type: "image/svg+xml" },
            { url: "/placeholder-logo.png", type: "image/png", sizes: "32x32" },
        ],
        apple: [{ url: "/placeholder-logo.png", sizes: "180x180", type: "image/png" }],
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
                        </Suspense>
                        <Toaster />
                        <CookieBanner />
                    </I18nProvider>
                </AuthProvider>
            </body>
        </html>
    )
}
