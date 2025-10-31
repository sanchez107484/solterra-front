import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.solterradvisory.com"

    // Páginas estáticas principales
    const routes = [
        "",
        "/nosotros",
        "/contacto",
        "/login/propietario",
        "/login/promotor",
        "/legal/aviso-legal",
        "/legal/privacidad",
        "/legal/cookies",
        "/legal/terminos",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : route.includes("/legal/") ? 0.5 : 0.8,
    }))

    return routes
}
