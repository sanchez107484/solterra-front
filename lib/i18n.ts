export const locales = ["es", "en"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "es"

export const translations = {
    es: {
        nav: {
            home: "Inicio",
            howItWorks: "Cómo funciona",
            about: "Nosotros",
            contact: "Contacto",
        },
        hero: {
            title: "Conectamos terrenos con proyectos de energía renovable",
            subtitle: "La plataforma que une propietarios de terrenos rurales con desarrolladores de proyectos solares y eólicos",
            ctaLandowner: "Soy Propietario",
            ctaDeveloper: "Soy Promotor",
        },
        benefits: {
            title: "¿Por qué Solterra?",
            landowners: {
                title: "Para Propietarios",
                benefit1: "Monetiza tu terreno",
                benefit1Desc: "Genera ingresos pasivos con tu tierra",
                benefit2: "Proceso transparente",
                benefit2Desc: "Seguimiento completo de cada proyecto",
                benefit3: "Asesoría experta",
                benefit3Desc: "Te guiamos en cada paso del proceso",
            },
            developers: {
                title: "Para Promotores",
                benefit1: "Terrenos verificados",
                benefit1Desc: "Accede a propiedades con documentación validada",
                benefit2: "Análisis geoespacial",
                benefit2Desc: "Datos de irradiación, viento y conexión a red",
                benefit3: "Ahorra tiempo",
                benefit3Desc: "Encuentra el terreno ideal más rápido",
            },
        },
        howItWorks: {
            title: "Cómo funciona",
            step1: {
                title: "Regístrate",
                desc: "Crea tu cuenta como propietario o promotor",
            },
            step2: {
                title: "Publica o busca",
                desc: "Propietarios publican terrenos, promotores buscan ubicaciones",
            },
            step3: {
                title: "Conecta",
                desc: "Nuestro algoritmo encuentra los mejores matches",
            },
            step4: {
                title: "Desarrolla",
                desc: "Inicia tu proyecto de energía renovable",
            },
        },
        cta: {
            title: "¿Listo para comenzar?",
            subtitle: "Únete a la revolución de las energías renovables",
            landowner: "Registrarme como Propietario",
            developer: "Registrarme como Promotor",
        },
        footer: {
            description: "Conectando terrenos con el futuro de la energía renovable",
            company: "Empresa",
            about: "Nosotros",
            contact: "Contacto",
            legal: "Legal",
            privacy: "Privacidad",
            terms: "Términos",
            rights: "Todos los derechos reservados",
        },
    },
    en: {
        nav: {
            home: "Home",
            howItWorks: "How it works",
            about: "About",
            contact: "Contact",
        },
        hero: {
            title: "Connecting land with renewable energy projects",
            subtitle: "The platform that connects rural landowners with solar and wind project developers",
            ctaLandowner: "I'm a Landowner",
            ctaDeveloper: "I'm a Developer",
        },
        benefits: {
            title: "Why Solterra?",
            landowners: {
                title: "For Landowners",
                benefit1: "Monetize your land",
                benefit1Desc: "Generate passive income with your property",
                benefit2: "Transparent process",
                benefit2Desc: "Complete tracking of every project",
                benefit3: "Expert advisory",
                benefit3Desc: "We guide you through every step",
            },
            developers: {
                title: "For Developers",
                benefit1: "Verified land",
                benefit1Desc: "Access properties with validated documentation",
                benefit2: "Geospatial analysis",
                benefit2Desc: "Irradiation, wind, and grid connection data",
                benefit3: "Save time",
                benefit3Desc: "Find the ideal land faster",
            },
        },
        howItWorks: {
            title: "How it works",
            step1: {
                title: "Sign up",
                desc: "Create your account as landowner or developer",
            },
            step2: {
                title: "Post or search",
                desc: "Landowners post land, developers search locations",
            },
            step3: {
                title: "Connect",
                desc: "Our algorithm finds the best matches",
            },
            step4: {
                title: "Develop",
                desc: "Start your renewable energy project",
            },
        },
        cta: {
            title: "Ready to get started?",
            subtitle: "Join the renewable energy revolution",
            landowner: "Register as Landowner",
            developer: "Register as Developer",
        },
        footer: {
            description: "Connecting land with the future of renewable energy",
            company: "Company",
            about: "About",
            contact: "Contact",
            legal: "Legal",
            privacy: "Privacy",
            terms: "Terms",
            rights: "All rights reserved",
        },
    },
}

export function getTranslations(locale: Locale) {
    return translations[locale] || translations[defaultLocale]
}
