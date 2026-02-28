import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.solterradvisory.com"

    const staticRoutes = ["", "/nosotros", "/contacto", "/legal/aviso-legal", "/legal/privacidad", "/legal/cookies", "/legal/terminos"]

    const serviciosRoutes = [
        "/servicios/marketplace-terrenos-renovables",
        "/servicios/promotores",
        "/servicios/propietarios",
        "/servicios/prospeccion-terrenos-demanda",
        "/servicios/validacion-tecnica-terreno",
    ]

    const allRoutes = [...staticRoutes, ...serviciosRoutes]

    return allRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route.startsWith("/servicios/") ? "weekly" : route.includes("/legal/") ? "yearly" : "monthly",
        priority: route === "" ? 1 : route.startsWith("/servicios/") ? 0.9 : route.includes("/legal/") ? 0.3 : 0.8,
    }))
}
