"use client"

import { Card } from "@/components/ui/card"
import { useTranslations } from "@/i18n/i18nContext"
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

export function TestimonialsSection() {
    const { t } = useTranslations()
    const testimonials: Testimonial[] = t?.testimonials?.items ?? []
    return (
        <section className="bg-muted/30 py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <div className="bg-accent/20 border-accent/30 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2">
                        <Star className="text-accent-foreground fill-accent-foreground h-4 w-4" />
                        <span className="text-accent-foreground text-sm font-semibold">{t.testimonials?.title}</span>
                    </div>
                    <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                        {t.testimonials?.title}{" "}
                        <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
                            {t.testimonials?.subtitle}
                        </span>
                    </h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-xl">{t.testimonials?.subtitle}</p>
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
                                <div className="text-xs">{t.testimonials?.trust?.rating}</div>
                            </div>
                        </div>
                        <div className="bg-border h-8 w-px" />
                        <div className="text-center">
                            <div className="text-secondary-foreground text-2xl font-bold">98%</div>
                            <div className="text-xs">{t.testimonials?.trust?.satisfaction}</div>
                        </div>
                        <div className="bg-border h-8 w-px" />
                        <div className="text-center">
                            <div className="text-accent-foreground text-2xl font-bold">€2M+</div>
                            <div className="text-xs">{t.testimonials?.trust?.contracts}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
