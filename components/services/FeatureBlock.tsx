"use client"

import { cn } from "@/lib/utils"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface FeatureBlockProps {
    title: string
    description: string
    result: string
    benefits?: string[]
    process?: string[]
    ctaPrimary?: string
    ctaPrimaryLink?: string
    pricing?: string
    variant?: "packs" | "prospection"
}

export function FeatureBlock({
    title,
    description,
    result,
    benefits,
    process,
    ctaPrimary,
    ctaPrimaryLink = "#",
    pricing,
    variant = "packs",
}: FeatureBlockProps) {
    const isPacks = variant === "packs"

    return (
        <section
            className={cn("py-16", isPacks ? "bg-gradient-to-r from-purple-50 to-pink-50" : "bg-gradient-to-r from-orange-50 to-yellow-50")}
        >
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                    <div className="rounded-3xl border-2 border-gray-100 bg-white p-8 shadow-xl md:p-12">
                        {/* Badge */}
                        <div className="mb-6">
                            <span
                                className={cn(
                                    "inline-block rounded-full px-4 py-2 text-sm font-semibold",
                                    isPacks ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700"
                                )}
                            >
                                {isPacks ? "Servicio Premium" : "Servicio Mandatado"}
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{title}</h3>

                        {/* Description */}
                        <p className="mb-6 text-lg text-gray-600">{description}</p>

                        {/* Result Badge */}
                        <div
                            className={cn(
                                "mb-8 inline-block rounded-xl px-6 py-3 text-base font-semibold",
                                isPacks ? "bg-purple-50 text-purple-800" : "bg-orange-50 text-orange-800"
                            )}
                        >
                            ✓ {result}
                        </div>

                        {/* Benefits or Process */}
                        <div className="mb-8 grid gap-8 md:grid-cols-2">
                            {benefits && benefits.length > 0 && (
                                <div>
                                    <h4 className="mb-4 text-lg font-semibold text-gray-900">Beneficios</h4>
                                    <ul className="space-y-3">
                                        {benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <CheckCircle2
                                                    className={cn(
                                                        "mt-0.5 h-5 w-5 flex-shrink-0",
                                                        isPacks ? "text-purple-500" : "text-orange-500"
                                                    )}
                                                />
                                                <span className="text-gray-700">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {process && process.length > 0 && (
                                <div>
                                    <h4 className="mb-4 text-lg font-semibold text-gray-900">Proceso</h4>
                                    <ul className="space-y-3">
                                        {process.map((step, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <div
                                                    className={cn(
                                                        "mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                                                        isPacks ? "bg-purple-500" : "bg-orange-500"
                                                    )}
                                                >
                                                    {idx + 1}
                                                </div>
                                                <span className="text-gray-700">{step}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Pricing */}
                        {pricing && (
                            <div className={cn("mb-6 rounded-xl p-4 text-center", isPacks ? "bg-purple-50" : "bg-orange-50")}>
                                <p className="text-sm font-medium text-gray-700">💰 {pricing}</p>
                            </div>
                        )}

                        {/* CTA */}
                        {ctaPrimary && (
                            <div className="text-center">
                                <Link
                                    href={ctaPrimaryLink}
                                    className={cn(
                                        "inline-block rounded-lg px-8 py-4 text-base font-semibold text-white transition-all hover:shadow-lg",
                                        isPacks ? "bg-purple-600 hover:bg-purple-700" : "bg-orange-600 hover:bg-orange-700"
                                    )}
                                >
                                    {ctaPrimary}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
