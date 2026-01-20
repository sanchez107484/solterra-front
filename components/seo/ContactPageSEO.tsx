import Head from "next/head"

export default function ContactPageSEO() {
    return (
        <Head>
            {/* Meta tags principales */}
            <title>Contacto Solterra Advisory | Plataforma de Energía Renovable Solar y Eólica en España</title>
            <meta
                name="description"
                content="Contacta con Solterra Advisory, plataforma líder para arrendamiento de terrenos solares y eólicos. Conectamos propietarios con promotores de energía renovable en toda España. Respuesta garantizada en 24 horas. Email: info@solterradvisory.com"
            />
            <meta
                name="keywords"
                content="contacto solterra advisory, arrendamiento terrenos solares españa, energía renovable consultas, proyectos eólicos terrenos, plataforma energía solar, matching propietarios promotores, alquiler terreno solar, contacto energía renovable, asesoría energía limpia españa"
            />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://solterradvisory.com/contacto" />
            <meta property="og:title" content="Contacto Solterra Advisory - Plataforma de Energía Renovable" />
            <meta
                property="og:description"
                content="Contacta con Solterra Advisory para conectar terrenos con proyectos de energía solar y eólica. Respuesta en 24h."
            />
            <meta property="og:site_name" content="Solterra Advisory" />
            <meta property="og:locale" content="es_ES" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content="https://solterradvisory.com/contacto" />
            <meta name="twitter:title" content="Contacto Solterra Advisory - Energía Renovable" />
            <meta
                name="twitter:description"
                content="Contacta con Solterra Advisory para conectar terrenos con proyectos de energía solar y eólica en España."
            />

            {/* SEO adicional */}
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="author" content="Solterra Advisory" />
            <meta name="geo.region" content="ES" />
            <meta name="geo.placename" content="España" />
            <link rel="canonical" href="https://solterradvisory.com/contacto" />

            {/* Structured Data - Organization Contact Point */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ContactPage",
                        "@id": "https://solterradvisory.com/contacto",
                        url: "https://solterradvisory.com/contacto",
                        name: "Contacto Solterra Advisory",
                        description:
                            "Página de contacto de Solterra Advisory, plataforma líder para conectar propietarios de terrenos con promotores de energía renovable solar y eólica en España.",
                        mainEntity: {
                            "@type": "Organization",
                            name: "Solterra Advisory",
                            url: "https://solterradvisory.com",
                            logo: "https://solterradvisory.com/solterra-logo.png",
                            contactPoint: [
                                {
                                    "@type": "ContactPoint",
                                    telephone: "+34-900-000-000",
                                    email: "info@solterradvisory.com",
                                    contactType: "customer service",
                                    areaServed: "ES",
                                    availableLanguage: ["Spanish", "English"],
                                    hoursAvailable: {
                                        "@type": "OpeningHoursSpecification",
                                        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                                        opens: "09:00",
                                        closes: "18:00",
                                    },
                                },
                                {
                                    "@type": "ContactPoint",
                                    contactType: "sales",
                                    email: "info@solterradvisory.com",
                                    areaServed: "ES",
                                    availableLanguage: ["Spanish", "English"],
                                },
                            ],
                            sameAs: ["https://linkedin.com/company/solterra-advisory"],
                            areaServed: {
                                "@type": "Country",
                                name: "España",
                            },
                        },
                    }),
                }}
            />

            {/* Structured Data - BreadcrumbList */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            {
                                "@type": "ListItem",
                                position: 1,
                                name: "Inicio",
                                item: "https://solterradvisory.com",
                            },
                            {
                                "@type": "ListItem",
                                position: 2,
                                name: "Contacto",
                                item: "https://solterradvisory.com/contacto",
                            },
                        ],
                    }),
                }}
            />
        </Head>
    )
}
