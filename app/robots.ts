import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "Googlebot",
                allow: "/",
            },
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/dashboard/", "/perfil/", "/api/"],
            },
        ],
        sitemap: "https://www.solterradvisory.com/sitemap.xml",
    }
}
