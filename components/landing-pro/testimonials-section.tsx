"use client"

import { Card } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"

interface Testimonial {
    name: string
    role: string
    company: string
    location: string
    image: string
    rating: number
    text: string
    result: string
}

const testimonials: Testimonial[] = [
    {
        name: "Juan García",
        role: "Propietario",
        company: "Finca Los Olivos",
        location: "Badajoz, Extremadura",
        image: "/placeholder-user-1.jpg",
        rating: 5,
        text: "Gracias a Solterra conseguí arrendar mis 15 hectáreas a un promotor serio. El proceso fue transparente y ahora tengo ingresos fijos durante 25 años sin preocuparme del mantenimiento.",
        result: "€37,500/año en ingresos pasivos",
    },
    {
        name: "María Rodríguez",
        role: "Directora de Desarrollo",
        company: "Energías Renovables SL",
        location: "Valladolid, Castilla y León",
        image: "/placeholder-user-2.jpg",
        rating: 5,
        text: "La plataforma nos ahorró 6 meses de prospección. Encontramos 3 terrenos ideales para nuestros proyectos solares en menos de un mes. El sistema de matching es muy preciso.",
        result: "60 MW en desarrollo en 3 meses",
    },
    {
        name: "Carlos Martínez",
        role: "Presidente",
        company: "Cooperativa Agraria Navarra",
        location: "Tudela, Navarra",
        image: "/placeholder-user-3.jpg",
        rating: 5,
        text: "Representamos a 45 socios con terrenos. Solterra nos ayudó a negociar contratos justos y a entender todas las implicaciones legales. Ahora todos están generando ingresos adicionales.",
        result: "120 hectáreas optimizadas",
    },
]

export function TestimonialsSectionPro() {
    return (
        <section className="bg-muted/30 py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <div className="bg-accent/20 border-accent/30 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2">
                        <Star className="text-accent-foreground fill-accent-foreground h-4 w-4" />
                        <span className="text-accent-foreground text-sm font-semibold">Casos de Éxito</span>
                    </div>
                    <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                        Lo que dicen{" "}
                        <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">nuestros clientes</span>
                    </h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                        Historias reales de propietarios y promotores que ya están transformando el sector energético
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={index}
                            className="group hover:border-primary/50 bg-background relative overflow-hidden border-2 p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            {/* Quote icon */}
                            <div className="absolute top-4 right-4 opacity-10 transition-opacity group-hover:opacity-20">
                                <Quote className="text-primary h-24 w-24" />
                            </div>

                            {/* Rating */}
                            <div className="relative z-10 mb-6 flex gap-1">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="text-accent-foreground fill-accent-foreground h-5 w-5" />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-foreground relative z-10 mb-6 leading-relaxed">{testimonial.text}</p>

                            {/* Result badge */}
                            <div className="bg-primary/10 border-primary/20 relative z-10 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2">
                                <span className="text-primary text-sm font-semibold">{testimonial.result}</span>
                            </div>

                            {/* Author */}
                            <div className="relative z-10 flex items-center gap-4 border-t pt-6">
                                <div className="from-primary to-secondary flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-lg font-bold text-white">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-foreground font-bold">{testimonial.name}</div>
                                    <div className="text-muted-foreground text-sm">
                                        {testimonial.role} · {testimonial.company}
                                    </div>
                                    <div className="text-muted-foreground text-xs">{testimonial.location}</div>
                                </div>
                            </div>

                            {/* Gradient overlay on hover */}
                            <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </Card>
                    ))}
                </div>

                {/* Trust indicators */}
                <div className="mt-16 text-center">
                    <div className="text-muted-foreground inline-flex flex-wrap items-center justify-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="text-primary text-3xl font-bold">4.9</div>
                            <div className="text-left">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="text-accent-foreground fill-accent-foreground h-4 w-4" />
                                    ))}
                                </div>
                                <div className="text-xs">+200 valoraciones</div>
                            </div>
                        </div>
                        <div className="bg-border h-8 w-px" />
                        <div className="text-center">
                            <div className="text-secondary text-2xl font-bold">98%</div>
                            <div className="text-xs">Satisfacción</div>
                        </div>
                        <div className="bg-border h-8 w-px" />
                        <div className="text-center">
                            <div className="text-accent-foreground text-2xl font-bold">€2M+</div>
                            <div className="text-xs">En contratos</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
