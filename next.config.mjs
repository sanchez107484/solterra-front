/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    // Desactivar el indicador de DevTools en desarrollo
    devIndicators: {
        devIndicators: false,
    },
    // Allow specific dev origins (e.g. devices on the same LAN) to access _next/* resources.
    // This silences the cross-origin dev warning when you open the dev server from another device.
    experimental: {
        allowedDevOrigins: [
            // Common case: local machine IP with default Next dev port
            "http://192.168.100.162:3000",
            // Include bare IP in case a different port or proxy is used
            "http://192.168.100.162",
        ],
    },
    images: {
        unoptimized: true,
    },
}

export default nextConfig
