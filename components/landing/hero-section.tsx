"use client"

import { Button } from "@/components/ui/button"
import { useTranslations } from "@/i18n/i18nContext"
import { ArrowRight, ChevronDown, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export function HeroSection() {
    const [isVisible, setIsVisible] = useState(false)
    const { t } = useTranslations()

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const scrollToNextSection = () => {
        const nextSection = document.querySelector("section:nth-of-type(2)")
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-8 md:py-12">
            {/* Animated background gradient */}
            <div className="from-primary/10 via-secondary/5 to-accent/10 absolute inset-0 bg-gradient-to-br" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.15),transparent_50%)]" />

            {/* Floating particles effect - reducidas para mejor performance */}
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

            <div className="relative container mx-auto px-4 py-4">
                <div className="mx-auto max-w-6xl">
                    {/* Logo and Brand - más compacto */}
                    <div
                        className={`mb-4 flex flex-col items-center justify-center transition-all duration-1000 md:mb-6 ${
                            isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
                        }`}
                    >
                        <div className="relative transition-all duration-700 hover:scale-105">
                            <div className="from-primary/20 via-secondary/20 to-accent/20 absolute inset-0 animate-pulse rounded-full bg-gradient-to-br blur-2xl" />
                            <Image
                                src="/solterra-logo-grande.png"
                                alt="Solterra Advisory - Plataforma líder de conexión entre terrenos rurales y proyectos de energía renovable solar y eólica en España"
                                width={400}
                                height={400}
                                className="relative drop-shadow-2xl"
                                priority
                                fetchPriority="high"
                                sizes="(max-width: 768px) 300px, 400px"
                            />
                        </div>
                    </div>

                    <div
                        className={`text-center transition-all delay-300 duration-1000 ${
                            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                        }`}
                    >
                        <h1 className="text-foreground mb-3 text-3xl font-bold tracking-tight text-balance md:mb-4 md:text-4xl lg:text-5xl">
                            {t.hero?.title}
                        </h1>

                        <p className="text-muted-foreground mx-auto mb-6 max-w-2xl text-base text-pretty md:mb-8 md:text-lg lg:text-xl">
                            {t.hero?.subtitle}
                        </p>

                        {/* CTA Cards - más compactas */}
                        <div className="mx-auto mb-6 grid max-w-4xl gap-4 md:mb-8 md:grid-cols-2 md:gap-5">
                            {/* Propietario Card */}
                            <Link href="/login/propietario" className="group">
                                <div className="border-primary/20 from-primary/10 to-primary/5 hover:border-primary relative h-full overflow-hidden rounded-xl border-2 bg-gradient-to-br p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl md:rounded-2xl md:p-7">
                                    <div className="bg-primary/20 absolute top-3 right-3 rounded-full p-2.5 transition-transform duration-300 group-hover:scale-110 md:top-4 md:right-4 md:p-3">
                                        <Zap className="text-primary h-5 w-5 md:h-6 md:w-6" />
                                    </div>
                                    <div className="from-primary/0 to-primary/10 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    <h3 className="text-foreground relative z-10 mb-2 pr-12 text-xl font-bold md:mb-3 md:text-2xl">
                                        {t.hero?.ctaLandowner}
                                    </h3>
                                    <p className="text-muted-foreground relative z-10 mb-4 text-sm md:mb-5 md:text-base">
                                        {t.benefits?.landowners?.benefit1Desc}
                                    </p>
                                    <div className="text-muted-foreground relative z-10 mb-4 flex items-center text-xs md:mb-5 md:text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-primary inline-block h-1.5 w-1.5 animate-pulse rounded-full md:h-2 md:w-2"></span>
                                            <span className="font-medium">{t.hero?.cards?.landowner?.income}</span>
                                        </div>
                                    </div>
                                    <Button className="bg-primary hover:bg-primary/90 relative z-10 w-full transition-all group-hover:gap-3">
                                        <span className="text-sm md:text-base">{t.cta?.landowner}</span>
                                        <ArrowRight className="ml-2 h-4 w-4 transition-all group-hover:translate-x-1 md:h-5 md:w-5" />
                                    </Button>
                                </div>
                            </Link>

                            {/* Promotor Card */}
                            <Link href="/login/promotor" className="group">
                                <div className="border-secondary/20 from-secondary/10 to-secondary/5 hover:border-secondary relative h-full overflow-hidden rounded-xl border-2 bg-gradient-to-br p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl md:rounded-2xl md:p-7">
                                    <div className="bg-secondary/20 absolute top-3 right-3 rounded-full p-2.5 transition-transform duration-300 group-hover:scale-110 md:top-4 md:right-4 md:p-3">
                                        <Zap className="text-secondary-foreground h-5 w-5 md:h-6 md:w-6" />
                                    </div>
                                    <div className="from-secondary/0 to-secondary/10 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    <h3 className="text-foreground relative z-10 mb-2 pr-12 text-xl font-bold md:mb-3 md:text-2xl">
                                        {t.hero?.ctaDeveloper}
                                    </h3>
                                    <p className="text-muted-foreground relative z-10 mb-4 text-sm md:mb-5 md:text-base">
                                        {t.benefits?.developers?.benefit1Desc}
                                    </p>
                                    <div className="text-muted-foreground relative z-10 mb-4 flex items-center text-xs md:mb-5 md:text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-secondary inline-block h-1.5 w-1.5 animate-pulse rounded-full md:h-2 md:w-2"></span>
                                            <span className="font-medium">{t.hero?.cards?.developer?.lands}</span>
                                        </div>
                                    </div>
                                    <Button className="bg-secondary hover:bg-secondary/90 relative z-10 w-full transition-all group-hover:gap-3">
                                        <span className="text-sm md:text-base">{t.cta?.developer}</span>
                                        <ArrowRight className="ml-2 h-4 w-4 transition-all group-hover:translate-x-1 md:h-5 md:w-5" />
                                    </Button>
                                </div>
                            </Link>
                        </div>

                        {/* Trust badges - más compactos */}
                        <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-4 text-xs md:gap-6 md:text-sm">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary/20 flex h-7 w-7 items-center justify-center rounded-full md:h-8 md:w-8">
                                    <span className="text-primary text-xs font-bold md:text-sm">✓</span>
                                </div>
                                <span className="font-medium">{t.hero?.trustBadges?.kyc}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="bg-secondary/20 flex h-7 w-7 items-center justify-center rounded-full md:h-8 md:w-8">
                                    <span className="text-secondary text-xs font-bold md:text-sm">✓</span>
                                </div>
                                <span className="font-medium">{t.hero?.trustBadges?.contracts}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="bg-primary/20 flex h-7 w-7 items-center justify-center rounded-full md:h-8 md:w-8">
                                    <span className="text-primary text-xs font-bold md:text-sm">✓</span>
                                </div>
                                <span className="font-medium">{t.hero?.trustBadges?.support}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator - solo visible en desktop */}
            <button
                onClick={scrollToNextSection}
                className="hover:text-primary absolute bottom-4 left-1/2 hidden -translate-x-1/2 animate-bounce cursor-pointer transition-colors md:bottom-8 md:block"
                aria-label="Scroll to next section"
            >
                <ChevronDown className="text-muted-foreground hover:text-primary h-6 w-6 transition-colors md:h-8 md:w-8" />
            </button>

            {/* Decorative elements - sutiles */}
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
