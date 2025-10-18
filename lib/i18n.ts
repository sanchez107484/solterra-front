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
        contact: {
            hero: {
                title: "Contacta con nosotros",
                subtitle: "Estamos aquí para ayudarte. Envíanos tu consulta y te responderemos lo antes posible.",
            },
            form: {
                title: "Envíanos un mensaje",
                nameLabel: "Nombre completo",
                namePlaceholder: "Juan Pérez",
                emailLabel: "Correo electrónico",
                emailPlaceholder: "tu@email.com",
                phoneLabel: "Teléfono (opcional)",
                phonePlaceholder: "+34 600 000 000",
                typeLabel: "Tipo de consulta",
                typeOptions: {
                    empty: "Selecciona una opción",
                    landowner: "Soy propietario de terreno",
                    developer: "Soy promotor de proyectos",
                    general: "Consulta general",
                    support: "Soporte técnico",
                },
                messageLabel: "Mensaje",
                messagePlaceholder: "Cuéntanos en qué podemos ayudarte...",
                submit: "Enviar mensaje",
            },
            info: {
                title: "Información de contacto",
                emailTitle: "Email",
                email: "info@solterradvisory.com",
                emailNote: "Respuesta en 24-48 horas",
                phoneTitle: "Teléfono",
                phone: "+34 900 000 000",
                phoneHours: "Lun-Vie: 9:00 - 18:00",
                officeTitle: "Oficina",
                officeAddress: "Calle Energía Renovable, 123",
                officeCity: "28001 Madrid, España",
                scheduleTitle: "Horario de atención",
                schedule: {
                    monFri: "Lunes - Viernes",
                    sat: "Sábado",
                    sun: "Domingo",
                    monFriHours: "9:00 - 18:00",
                    satHours: "10:00 - 14:00",
                    sunHours: "Cerrado",
                },
            },
        },
        about: {
            hero: {
                title: "Sobre Solterra Advisory",
                subtitle: "Impulsamos la transición energética conectando terrenos con proyectos de energía renovable",
            },
            mission: {
                badge: "Nuestra Misión",
                title: "Acelerar la transición hacia energías limpias",
                p1: "En Solterra Advisory creemos que la energía renovable es el futuro. Nuestra misión es facilitar el desarrollo de proyectos solares y eólicos conectando a propietarios de terrenos rurales con promotores especializados.",
                p2: "Eliminamos las barreras tradicionales del sector, haciendo que el proceso sea transparente, eficiente y beneficioso para todas las partes involucradas.",
            },
            values: {
                title: "Nuestros valores",
                transparency: {
                    title: "Transparencia",
                    desc: "Información clara y verificada en cada paso del proceso. Sin sorpresas ni costes ocultos.",
                },
                efficiency: {
                    title: "Eficiencia",
                    desc: "Tecnología avanzada que reduce tiempos y optimiza el matching entre terrenos y proyectos.",
                },
                sustainability: {
                    title: "Sostenibilidad",
                    desc: "Compromiso real con el medio ambiente y el desarrollo de energías limpias.",
                },
                ctaTitle: "Únete a la revolución energética",
                ctaSubtitle: "Forma parte del cambio hacia un futuro más sostenible y rentable",
                ctaOwner: "Soy propietario",
                ctaDeveloper: "Soy promotor",
            },
        },
        auth: {
            common: {
                back: "Volver al inicio",
                remember: "Recordarme",
            },
            promoter: {
                welcomeBack: "Bienvenido de nuevo",
                createAccount: "Crear cuenta",
                subtitleLogin: "Accede a tu cuenta de promotor",
                subtitleRegister: "Regístrate como promotor de proyectos",
                switchToRegister: "Regístrate",
                switchToLogin: "Inicia sesión",
                forgotPassword: "¿Olvidaste tu contraseña?",
                loginButton: "Iniciar sesión",
                registerButton: "Crear cuenta",
                accessAsOwner: "Acceder como propietario",
            },
            owner: {
                welcomeBack: "Bienvenido de nuevo",
                createAccount: "Crear cuenta",
                subtitleLogin: "Accede a tu cuenta de propietario",
                subtitleRegister: "Regístrate como propietario de terreno",
                switchToRegister: "Regístrate",
                switchToLogin: "Inicia sesión",
                forgotPassword: "¿Olvidaste tu contraseña?",
                loginButton: "Iniciar sesión",
                registerButton: "Crear cuenta",
                accessAsPromoter: "Acceder como promotor",
            },
        },
        dashboard: {
            header: {
                title: "Dashboard",
                manageProjects: "Gestiona tus proyectos",
                manageLands: "Gestiona tus terrenos",
                newProject: "Nuevo Proyecto",
                addLand: "Añadir Terreno",
            },
            empty: {
                promoter: {
                    title: "Encuentra terrenos para tus proyectos",
                    description:
                        "Añade tu primer proyecto y descubre terrenos ideales para desarrollar energía renovable. Conecta con propietarios y acelera el desarrollo de tus iniciativas sostenibles.",
                    addProject: "Añade tu primer proyecto",
                },
                owner: {
                    title: "Comienza a monetizar tu terreno",
                    description:
                        "Añade tu primer terreno y conecta con promotores de energía renovable interesados en tu propiedad. Genera ingresos pasivos mientras contribuyes a un futuro sostenible.",
                    addLand: "Añade tu primer terreno",
                },
            },
            stats: {
                projectsActive: "Proyectos Activos",
                landsCompatible: "Terrenos Compatibles",
                totalCapacity: "Capacidad Total",
                estimatedInvestment: "Inversión Estimada",
            },
            table: {
                yourProjects: "Tus Proyectos",
                yourLands: "Tus Terrenos",
                manageAndView: "Gestiona y visualiza el estado de tus propiedades",
            },
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

export function getTranslations(locale: Locale): any {
    return translations[locale] || translations[defaultLocale]
}
