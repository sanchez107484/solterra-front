"use client"

import { Card } from "@/components/ui/card"
import { useTranslations } from "@/i18n/i18nContext"
import { Calendar, Euro, MapPin, TrendingUp } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface Stat {
    icon: any
    value: number
    suffix: string
    prefix?: string
    label: string
    color: string
    description: string
}

export function AnimatedNumber({
    value,
    duration = 2000,
    prefix = "",
    suffix = "",
}: {
    value: number
    duration?: number
    prefix?: string
    suffix?: string
}) {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 }
        )

        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!isVisible) return

        let startTime: number
        let animationFrame: number

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)

            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            setCount(Math.floor(easeOutQuart * value))

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            } else {
                setCount(value)
            }
        }

        animationFrame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrame)
    }, [isVisible, value, duration])

    return (
        <div ref={ref} className="text-5xl font-bold md:text-6xl">
            {prefix}
            {count.toLocaleString("es-ES")}
            {suffix}
        </div>
    )
}

export function StatsSection() {
    const { t } = useTranslations()

    const stats: Stat[] = [
        {
            icon: TrendingUp,
            value: 81,
            suffix: "%",
            label: t.stats?.cards?.renewable?.label,
            color: "primary",
            description: t.stats?.cards?.renewable?.description,
        },
        {
            icon: MapPin,
            value: 500,
            suffix: "+",
            label: t.stats?.cards?.lands?.label,
            color: "secondary",
            description: t.stats?.cards?.lands?.description,
        },
        {
            icon: Euro,
            value: 2500,
            suffix: "",
            prefix: "€",
            label: t.stats?.cards?.income?.label,
            color: "primary",
            description: t.stats?.cards?.income?.description,
        },
        {
            icon: Calendar,
            value: 25,
            suffix: t.stats?.cards?.duration?.suffix,
            label: t.stats?.cards?.duration?.label,
            color: "secondary",
            description: t.stats?.cards?.duration?.description,
        },
    ]

    return (
        <section className="from-background to-muted/30 bg-gradient-to-b py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <div className="bg-primary/10 border-primary/20 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2">
                        <TrendingUp className="text-primary h-4 w-4" />
                        <span className="text-primary text-sm font-semibold">{t.stats?.impactLabel}</span>
                    </div>

                    <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                        {t.stats?.title}{" "}
                        <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
                            {t.stats?.titleHighlight}
                        </span>{" "}
                        {t.stats?.titleEnd}
                    </h2>

                    <p className="text-muted-foreground mx-auto max-w-2xl text-xl">{t.stats?.sourceNote}</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <Card
                                key={index}
                                className={`group relative overflow-hidden border-2 p-8 border-${stat.color}/20 bg-gradient-to-br from-${stat.color}/5 to-transparent transition-all duration-300 hover:scale-105 hover:border-${stat.color} hover:shadow-2xl`}
                            >
                                {/* Background gradient on hover */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br from-${stat.color}/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                                />

                                {/* Icon */}
                                <div
                                    className={`inline-flex rounded-2xl bg-${stat.color}/20 relative z-10 mb-6 p-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
                                >
                                    <Icon className={`h-8 w-8 text-${stat.color}`} />
                                </div>

                                {/* Number */}
                                <div className={`text-${stat.color} relative z-10 mb-4`}>
                                    <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                                </div>

                                {/* Label */}
                                <h3 className="text-foreground relative z-10 mb-2 text-lg font-bold">{stat.label}</h3>

                                {/* Description */}
                                <p className="text-muted-foreground relative z-10 text-sm">{stat.description}</p>

                                {/* Decorative corner */}
                                <div
                                    className={`absolute right-0 bottom-0 h-24 w-24 rounded-tl-full bg-${stat.color}/10 transition-all duration-300 group-hover:h-32 group-hover:w-32`}
                                />
                            </Card>
                        )
                    })}
                </div>

                {/* Additional info */}
                <div className="mt-16 text-center">
                    <p className="text-muted-foreground mx-auto max-w-3xl">{t.stats?.sourceNote}</p>
                </div>
            </div>
        </section>
    )
}
