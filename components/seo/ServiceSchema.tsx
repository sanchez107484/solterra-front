interface ServiceSchemaProps {
    name: string
    description: string
    provider?: {
        name: string
        url: string
    }
    serviceType?: string
    areaServed?: string
    offers?: {
        price: string
        priceCurrency: string
        description?: string
    }
}

export function ServiceSchema({
    name,
    description,
    provider = {
        name: "Solterra Advisory",
        url: "https://solterra.es",
    },
    serviceType = "Professional Service",
    areaServed = "ES",
    offers,
}: ServiceSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        provider: {
            "@type": "Organization",
            name: provider.name,
            url: provider.url,
        },
        serviceType,
        areaServed: {
            "@type": "Country",
            name: areaServed,
        },
        ...(offers && {
            offers: {
                "@type": "Offer",
                price: offers.price,
                priceCurrency: offers.priceCurrency,
                ...(offers.description && { description: offers.description }),
            },
        }),
    }

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
