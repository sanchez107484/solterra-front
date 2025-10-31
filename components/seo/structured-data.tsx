export function StructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Solterra Advisory",
        url: "https://www.solterradvisory.com",
        logo: "https://www.solterradvisory.com/solterra-logo2.svg",
        description: "Plataforma líder que conecta propietarios de terrenos rurales con promotores de proyectos de energía renovable",
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "Customer Service",
            email: "info@solterra.es",
            availableLanguage: ["Spanish", "English"],
        },
        sameAs: ["https://www.linkedin.com/company/solterra-advisory"],
    }

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Renewable Energy Project Matchmaking",
        provider: {
            "@type": "Organization",
            name: "Solterra Advisory",
        },
        areaServed: {
            "@type": "Country",
            name: "Spain",
        },
        description:
            "Conectamos propietarios de terrenos rurales con promotores de energía solar, eólica y otros proyectos renovables. Due diligence profesional y matchmaking inteligente.",
        offers: [
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Listado de terrenos para energía renovable",
                    description: "Publica tu terreno y recibe ofertas de promotores cualificados",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Búsqueda de terrenos para proyectos renovables",
                    description: "Encuentra terrenos ideales para tus proyectos de energía renovable",
                },
            },
        ],
    }

    const webSiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Solterra Advisory",
        url: "https://www.solterradvisory.com",
        potentialAction: {
            "@type": "SearchAction",
            target: "https://www.solterradvisory.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
        },
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
        </>
    )
}
