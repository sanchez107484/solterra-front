import type { Metadata } from "next"

/**
 * Metadata específica optimizada para la landing page / homepage
 * Mejora el SEO con título y descripción más específicos y orientados a conversión
 */
export const landingMetadata: Metadata = {
    title: "Solterra Advisory - Conecta tu Terreno con Energía Renovable | Solar y Eólica",
    description:
        "¿Tienes un terreno rural? Conéctalo con promotores de energía solar y eólica. Genera ingresos pasivos, contribuye a la transición energética y maximiza el valor de tu propiedad. Plataforma líder en España.",
    keywords: [
        // Keywords principales (long-tail y específicas)
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
        "terrenos energía solar",
        "parques solares",
        "aerogeneradores terreno",
        "transición energética",
        "PNIEC 2030",
        "energía verde",
        "sostenibilidad",
    ],
    openGraph: {
        title: "Solterra Advisory - Conecta tu Terreno con Energía Renovable",
        description:
            "Plataforma líder que conecta propietarios de terrenos rurales con promotores de proyectos de energía solar y eólica. Genera ingresos pasivos con tu terreno.",
        type: "website",
        locale: "es_ES",
        url: "https://www.solterradvisory.com",
        siteName: "Solterra Advisory",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Solterra Advisory - Conecta terrenos con energía solar y eólica",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Conecta tu Terreno con Energía Renovable | Solterra Advisory",
        description: "Genera ingresos pasivos con tu terreno rural. Conéctalo con promotores de energía solar y eólica en España.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "https://www.solterradvisory.com",
        languages: {
            "es-ES": "https://www.solterradvisory.com",
            "en-US": "https://www.solterradvisory.com/en",
        },
    },
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
}
