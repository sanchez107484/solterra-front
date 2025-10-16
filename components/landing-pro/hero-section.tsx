"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, Leaf, Sun, Wind, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function HeroSectionPro() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
            {/* Animated background gradient */}
            <div className="from-primary/10 via-secondary/5 to-accent/10 absolute inset-0 bg-gradient-to-br" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.15),transparent_50%)]" />

            {/* Floating particles effect */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-primary/20 animate-float absolute h-2 w-2 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${10 + Math.random() * 10}s`,
                        }}
                    />
                ))}
            </div>

            <div className="relative container mx-auto px-4 py-20 md:py-32">
                <div className="mx-auto max-w-5xl">
                    {/* Decorative icons grid */}
                    <div
                        className={`mb-12 flex justify-center gap-6 transition-all duration-1000 ${
                            isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
                        }`}
                    >
                        {[
                            { Icon: Leaf, color: "primary", delay: "0ms" },
                            { Icon: Wind, color: "secondary", delay: "100ms" },
                            { Icon: Sun, color: "accent", delay: "200ms" },
                            { Icon: Zap, color: "primary", delay: "300ms" },
                        ].map(({ Icon, color, delay }, index) => (
                            <div
                                key={index}
                                className={`group rounded-2xl bg-${color}/20 p-4 shadow-lg backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:bg-${color}/30 hover:shadow-2xl`}
                                style={{ transitionDelay: delay }}
                            >
                                <Icon className={`h-10 w-10 text-${color} transition-transform duration-300 group-hover:rotate-12`} />
                            </div>
                        ))}
                    </div>

                    <div
                        className={`text-center transition-all delay-300 duration-1000 ${
                            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                        }`}
                    >
                        {/* Badge */}
                        <div className="bg-primary/10 border-primary/20 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2">
                            <Zap className="text-primary h-4 w-4 animate-pulse" />
                            <span className="text-primary text-sm font-semibold">81% energía renovable para 2030</span>
                        </div>

                        <h1 className="text-foreground mb-6 text-5xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl">
                            Conectamos{" "}
                            <span className="from-primary via-secondary to-primary animate-gradient bg-gradient-to-r bg-clip-text text-transparent">
                                terrenos
                            </span>{" "}
                            con el futuro de la{" "}
                            <span className="from-secondary via-accent to-secondary animate-gradient bg-gradient-to-r bg-clip-text text-transparent">
                                energía renovable
                            </span>
                        </h1>

                        <p className="text-muted-foreground mx-auto mb-12 max-w-3xl text-xl text-pretty md:text-2xl lg:text-3xl">
                            El marketplace que une propietarios de terrenos rurales con promotores de proyectos solares y eólicos.
                            <span className="text-muted-foreground/80 mt-2 block text-lg md:text-xl">Seguro, transparente y rentable.</span>
                        </p>

                        {/* CTA Cards */}
                        <div className="mx-auto mb-12 grid max-w-4xl gap-6 md:grid-cols-2">
                            {/* Propietario Card */}
                            <Link href="/login/propietario" className="group">
                                <div className="border-primary/20 from-primary/10 to-primary/5 hover:border-primary relative h-full overflow-hidden rounded-2xl border-2 bg-gradient-to-br p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                    <div className="bg-primary/20 absolute top-4 right-4 rounded-full p-3 transition-transform duration-300 group-hover:scale-110">
                                        <Leaf className="text-primary h-6 w-6" />
                                    </div>
                                    <div className="from-primary/0 to-primary/10 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    <h3 className="text-foreground relative z-10 mb-3 text-2xl font-bold">Soy propietario</h3>
                                    <p className="text-muted-foreground relative z-10 mb-6">
                                        Monetiza tu terreno con proyectos de energía renovable
                                    </p>
                                    <div className="text-muted-foreground relative z-10 mb-6 flex items-center text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                                            <span>€2,500/ha/año promedio</span>
                                        </div>
                                    </div>
                                    <Button className="bg-primary hover:bg-primary/90 relative z-10 w-full transition-all group-hover:gap-3">
                                        Comenzar
                                        <ArrowRight className="ml-2 h-5 w-5 transition-all group-hover:translate-x-1" />
                                    </Button>
                                </div>
                            </Link>

                            {/* Promotor Card */}
                            <Link href="/login/promotor" className="group">
                                <div className="border-secondary/20 from-secondary/10 to-secondary/5 hover:border-secondary relative h-full overflow-hidden rounded-2xl border-2 bg-gradient-to-br p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                    <div className="bg-secondary/20 absolute top-4 right-4 rounded-full p-3 transition-transform duration-300 group-hover:scale-110">
                                        <Zap className="text-secondary h-6 w-6" />
                                    </div>
                                    <div className="from-secondary/0 to-secondary/10 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    <h3 className="text-foreground relative z-10 mb-3 text-2xl font-bold">Soy promotor</h3>
                                    <p className="text-muted-foreground relative z-10 mb-6">
                                        Encuentra terrenos ideales para tus proyectos renovables
                                    </p>
                                    <div className="text-muted-foreground relative z-10 mb-6 flex items-center text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-blue-500"></span>
                                            <span>500+ terrenos disponibles</span>
                                        </div>
                                    </div>
                                    <Button className="bg-secondary hover:bg-secondary/90 relative z-10 w-full transition-all group-hover:gap-3">
                                        Explorar
                                        <ArrowRight className="ml-2 h-5 w-5 transition-all group-hover:translate-x-1" />
                                    </Button>
                                </div>
                            </Link>
                        </div>

                        {/* Trust badges */}
                        <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                                    <span className="font-bold text-green-600">✓</span>
                                </div>
                                <span>Verificación KYC</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
                                    <span className="font-bold text-blue-600">✓</span>
                                </div>
                                <span>Contratos seguros</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20">
                                    <span className="font-bold text-amber-600">✓</span>
                                </div>
                                <span>Soporte 24/7</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <ChevronDown className="text-muted-foreground h-8 w-8" />
            </div>

            {/* Decorative elements */}
            <div className="bg-primary/20 pointer-events-none absolute top-20 -left-32 h-96 w-96 rounded-full blur-3xl" />
            <div className="bg-secondary/20 pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full blur-3xl" />

            <style jsx>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0) translateX(0);
                    }
                    25% {
                        transform: translateY(-20px) translateX(10px);
                    }
                    50% {
                        transform: translateY(-10px) translateX(-10px);
                    }
                    75% {
                        transform: translateY(-30px) translateX(5px);
                    }
                }
                @keyframes gradient {
                    0%,
                    100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }
                .animate-float {
                    animation: float linear infinite;
                }
                .animate-gradient {
                    background-size: 200% auto;
                    animation: gradient 6s ease infinite;
                }
            `}</style>
        </section>
    )
}
