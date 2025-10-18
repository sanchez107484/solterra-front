"use client"

import { Card } from "@/components/ui/card"
import { ChevronDown, HelpCircle } from "lucide-react"
import { useState } from "react"

interface FAQ {
    question: string
    answer: string
    category: "general" | "propietario" | "promotor"
}

const faqs: FAQ[] = [
    {
        question: "¿Cómo funciona Solterra Advisory?",
        answer: "Solterra es un marketplace que conecta propietarios de terrenos rurales con promotores de proyectos de energía renovable. Los propietarios publican sus terrenos con información geográfica y técnica, mientras que los promotores buscan terrenos que cumplan con sus requisitos. Nuestro algoritmo genera matches automáticos cuando hay compatibilidad.",
        category: "general",
    },
    {
        question: "¿Cuánto cuesta usar la plataforma?",
        answer: "Para propietarios, publicar terrenos es gratuito. Ofrecemos un plan de visibilidad premium por 50€/mes para destacar tu terreno. Para promotores, tenemos planes desde 50€/mes (hasta 5 contactos) hasta 150€/mes (ilimitado + API). Solo cobramos comisión cuando se firma una LOI exitosa.",
        category: "general",
    },
    {
        question: "¿Es seguro el proceso de negociación?",
        answer: "Sí, totalmente. Implementamos verificación KYC para todos los usuarios, todas las conversaciones quedan registradas con timestamp, ofrecemos plantillas legales verificadas (NDA, LOI) y contamos con asesoría legal especializada. Además, nuestro equipo revisa cada terreno antes de publicarlo.",
        category: "general",
    },
    {
        question: "¿Qué tipo de terrenos puedo listar?",
        answer: "Puedes listar cualquier terreno rústico o suelo no urbanizable apto para proyectos de energía renovable (solar, eólica, biomasa, etc.). Idealmente con más de 5 hectáreas, aunque evaluamos cada caso. El terreno debe tener acceso por carretera y estar libre de cargas que impidan el proyecto.",
        category: "propietario",
    },
    {
        question: "¿Cuánto puedo ganar con mi terreno?",
        answer: "El ingreso promedio es de €2,500/hectárea/año en proyectos solares, aunque varía según ubicación, tamaño, infraestructura cercana y tipo de proyecto. Los contratos típicos duran 25-30 años con revisiones anuales del IPC. Además, mantienes la propiedad del terreno.",
        category: "propietario",
    },
    {
        question: "¿Puedo seguir usando mi terreno para agricultura?",
        answer: "Depende del tipo de proyecto. Los proyectos agrovoltaicos permiten compatibilizar paneles solares con cultivos o pastoreo. En proyectos eólicos, solo se ocupa un pequeño porcentaje del terreno. Nuestros consultores te ayudan a evaluar la mejor opción para tu caso.",
        category: "propietario",
    },
    {
        question: "¿Cómo funciona el sistema de matching?",
        answer: "Nuestro algoritmo cruza criterios técnicos (potencia, superficie, recurso solar/eólico), geográficos (ubicación, distancia a red eléctrica) y legales (tipo de suelo, restricciones). Recibes notificaciones automáticas cuando un promotor busca terrenos compatibles con el tuyo.",
        category: "promotor",
    },
    {
        question: "¿Cuánto tiempo tarda en encontrar un terreno?",
        answer: "El 70% de nuestros promotores encuentran al menos 3 terrenos compatibles en las primeras 2 semanas. El tiempo hasta la firma de una LOI suele ser de 1-3 meses, dependiendo de la complejidad del proyecto y la negociación. Nuestro sistema de filtros avanzados acelera el proceso significativamente.",
        category: "promotor",
    },
    {
        question: "¿Qué documentación necesito como promotor?",
        answer: "Necesitas registro como empresa (CIF), información del proyecto (tipo, capacidad estimada, timeline), y opcionalmente documentos que acrediten experiencia previa. Todo se verifica en el proceso de KYC. Una vez aprobado, accedes inmediatamente al marketplace completo.",
        category: "promotor",
    },
]

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)
    const [activeCategory, setActiveCategory] = useState<"general" | "propietario" | "promotor" | "all">("all")

    const filteredFaqs = activeCategory === "all" ? faqs : faqs.filter((faq) => faq.category === activeCategory)

    return (
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <div className="bg-secondary/10 border-secondary/20 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2">
                        <HelpCircle className="text-secondary-foreground h-4 w-4" />
                        <span className="text-secondary-foreground text-sm font-semibold">Preguntas Frecuentes</span>
                    </div>
                    <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                        ¿Tienes <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">dudas?</span>
                    </h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                        Aquí encontrarás respuestas a las preguntas más comunes sobre nuestra plataforma
                    </p>
                </div>

                {/* Category filters */}
                <div className="mb-12 flex flex-wrap justify-center gap-3">
                    {[
                        { id: "all", label: "Todas" },
                        { id: "general", label: "General" },
                        { id: "propietario", label: "Propietarios" },
                        { id: "promotor", label: "Promotores" },
                    ].map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id as any)}
                            className={`rounded-full px-6 py-2 font-medium transition-all duration-300 ${
                                activeCategory === category.id
                                    ? "bg-primary text-primary-foreground scale-105 shadow-lg"
                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                            }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* FAQ List */}
                <div className="mx-auto max-w-3xl space-y-4">
                    {filteredFaqs.map((faq, index) => (
                        <Card
                            key={index}
                            className="hover:border-primary/50 overflow-hidden border-2 transition-all duration-300 hover:shadow-lg"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="group flex w-full items-center justify-between gap-4 p-6 text-left"
                            >
                                <div className="flex-1">
                                    <div className="mb-1 flex items-center gap-3">
                                        {faq.category !== "general" && (
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                                    faq.category === "propietario"
                                                        ? "bg-primary/10 text-primary"
                                                        : "bg-secondary/10 text-secondary-foreground"
                                                }`}
                                            >
                                                {faq.category === "propietario" ? "Propietario" : "Promotor"}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-foreground group-hover:text-primary text-lg font-bold transition-colors">
                                        {faq.question}
                                    </h3>
                                </div>
                                <ChevronDown
                                    className={`text-muted-foreground h-6 w-6 flex-shrink-0 transition-transform duration-300 ${
                                        openIndex === index ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ${
                                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                }`}
                            >
                                <div className="text-muted-foreground px-6 pb-6 leading-relaxed">{faq.answer}</div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-16 text-center">
                    <p className="text-muted-foreground mb-4">¿No encuentras respuesta a tu pregunta?</p>
                    <a
                        href="mailto:info@solterra.com"
                        className="text-primary inline-flex items-center gap-2 font-semibold hover:underline"
                    >
                        Contacta con nuestro equipo
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M7 7h10v10" />
                            <path d="M7 17 17 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}
