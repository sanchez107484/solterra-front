"use client"

import { useEffect, useState } from "react"

interface PageHeroProps {
    title: string
    subtitle?: string
    badge?: string
}

export function PageHero({ title, subtitle, badge }: PageHeroProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <section className="relative flex min-h-[30vh] items-center justify-center overflow-hidden py-12 md:py-16">
            {/* Animated background gradient */}
            <div className="from-primary/10 via-secondary/5 to-accent/10 absolute inset-0 bg-gradient-to-br" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.15),transparent_50%)]" />

            {/* Floating particles effect */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-primary/20 animate-float absolute h-1.5 w-1.5 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${10 + Math.random() * 10}s`,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative container mx-auto px-4 md:px-6">
                <div
                    className={`mx-auto max-w-4xl text-center transition-all duration-1000 ${
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                >
                    {badge && (
                        <div className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold md:text-base">
                            {badge}
                        </div>
                    )}
                    <h1 className="text-foreground mb-4 text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">{title}</h1>
                    {subtitle && <p className="text-muted-foreground mx-auto max-w-3xl text-lg text-pretty md:text-xl">{subtitle}</p>}
                </div>
            </div>

            {/* Decorative elements */}
            <div className="bg-primary/10 pointer-events-none absolute top-10 -left-20 h-64 w-64 rounded-full blur-3xl md:top-20 md:-left-32 md:h-96 md:w-96" />
            <div className="bg-secondary/10 pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full blur-3xl md:-right-32 md:bottom-20 md:h-96 md:w-96" />

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
                .animate-float {
                    animation: float linear infinite;
                }
            `}</style>
        </section>
    )
}
