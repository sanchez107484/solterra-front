/** @type {import('next').NextConfig} */
import path from "path"

const nextConfig = {
    // En producción, NO ignorar errores de ESLint y TypeScript
    eslint: {
        // Permitir builds solo en desarrollo con errores de lint
        ignoreDuringBuilds: process.env.NODE_ENV === "development",
    },
    typescript: {
        // Permitir builds solo en desarrollo con errores de TS
        ignoreBuildErrors: process.env.NODE_ENV === "development",
    },

    // Optimización de imágenes habilitada en producción
    images: {
        // En desarrollo puedes usar unoptimized: true para rapidez
        unoptimized: process.env.NODE_ENV === "development",
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },

    // Headers de seguridad para producción
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-DNS-Prefetch-Control",
                        value: "on",
                    },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                ],
            },
        ]
    },

    // Configuración de desarrollo (solo aplica en modo dev)
    ...(process.env.NODE_ENV === "development" && {
        devIndicators: {
            appIsrStatus: false,
        },
        experimental: {
            allowedDevOrigins: ["http://192.168.100.162:3000", "http://192.168.100.162"],
        },
    }),
}

export default nextConfig

// Ensure webpack resolves '@' to project root — helpful for Linux builds on Vercel
// This makes imports like '@/components/ui/button' reliably resolve regardless of
// case-sensitivity or environment differences.
nextConfig.webpack = function (config) {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
        ...(config.resolve.alias || {}),
        "@": path.resolve(process.cwd()),
    }
    return config
}
