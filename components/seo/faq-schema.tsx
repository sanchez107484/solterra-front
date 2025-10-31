"use client"

import Script from "next/script"

/**
 * Schema.org FAQPage para mejorar el SEO de la landing
 * Aparece en los resultados de búsqueda de Google como "Preguntas frecuentes"
 * y puede expandirse directamente en los resultados (Rich Snippets)
 */
export function FAQSchema() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "¿Cómo funciona Solterra Advisory?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Solterra es un marketplace que conecta propietarios de terrenos rurales con promotores de proyectos de energía renovable. Los propietarios publican sus terrenos con información geográfica y técnica, mientras que los promotores buscan terrenos que cumplan con sus requisitos. Nuestro algoritmo genera matches automáticos cuando hay compatibilidad.",
                },
            },
            {
                "@type": "Question",
                name: "¿Cuánto cuesta usar la plataforma?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Para propietarios, publicar terrenos es gratuito. Ofrecemos un plan de visibilidad premium por 50€/mes para destacar tu terreno. Para promotores, tenemos planes desde 50€/mes (hasta 5 contactos) hasta 150€/mes (ilimitado + API). Solo cobramos comisión cuando se firma una LOI exitosa.",
                },
            },
            {
                "@type": "Question",
                name: "¿Qué tipo de terrenos puedo listar?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Puedes listar cualquier terreno rústico o suelo no urbanizable apto para proyectos de energía renovable (solar, eólica, biomasa, etc.). Idealmente con más de 5 hectáreas, aunque evaluamos cada caso. El terreno debe tener acceso por carretera y estar libre de cargas que impidan el proyecto.",
                },
            },
            {
                "@type": "Question",
                name: "¿Cuánto puedo ganar con mi terreno?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "El ingreso promedio es de €2,500/hectárea/año en proyectos solares, aunque varía según ubicación, tamaño, infraestructura cercana y tipo de proyecto. Los contratos típicos duran 25-30 años con revisiones anuales del IPC. Además, mantienes la propiedad del terreno.",
                },
            },
            {
                "@type": "Question",
                name: "¿Cómo funciona el sistema de matching?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Nuestro algoritmo cruza criterios técnicos (potencia, superficie, recurso solar/eólico), geográficos (ubicación, distancia a red eléctrica) y legales (tipo de suelo, restricciones). Recibes notificaciones automáticas cuando un promotor busca terrenos compatibles con el tuyo.",
                },
            },
            {
                "@type": "Question",
                name: "¿Cuánto tiempo tarda en encontrar un terreno?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "El 70% de nuestros promotores encuentran al menos 3 terrenos compatibles en las primeras 2 semanas. El tiempo hasta la firma de una LOI suele ser de 1-3 meses, dependiendo de la complejidad del proyecto y la negociación. Nuestro sistema de filtros avanzados acelera el proceso significativamente.",
                },
            },
        ],
    }

    return <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
}
