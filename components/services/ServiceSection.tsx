"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ServiceSectionProps {
    title: string
    intro: string
    children: ReactNode
    variant?: "owners" | "developers"
    monetization?: string | { core?: string; secondary?: string; footer?: string }
}

export function ServiceSection({ title, intro, children, variant = "owners", monetization }: ServiceSectionProps) {
    const isOwner = variant === "owners"

    return (
        <section
            className={cn(
                "py-16 md:py-24",
                isOwner
                    ? "bg-gradient-to-br from-green-50 via-white to-green-50/30"
                    : "bg-gradient-to-br from-blue-50 via-white to-blue-50/30"
            )}
        >
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mx-auto mb-12 max-w-4xl text-center">
                    <div className="mb-4">
                        <span
                            className={cn(
                                "inline-block rounded-full px-4 py-2 text-sm font-semibold",
                                isOwner ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                            )}
                        >
                            {isOwner ? "Para Propietarios" : "Para Promotores"}
                        </span>
                    </div>
                    <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">{title}</h2>
                    <p className="text-lg leading-relaxed text-gray-600">{intro}</p>
                </div>

                {/* Services Grid */}
                <div className="mb-12 grid gap-8 md:grid-cols-3">{children}</div>

                {/* Monetization Info */}
                {monetization && (
                    <div
                        className={cn(
                            "mx-auto max-w-3xl rounded-2xl border-2 p-6 text-center",
                            isOwner ? "border-green-200 bg-green-50/50" : "border-blue-200 bg-blue-50/50"
                        )}
                    >
                        {typeof monetization === "string" ? (
                            <p className="text-sm leading-relaxed text-gray-700">💰 {monetization}</p>
                        ) : (
                            <div className="space-y-2 text-sm text-gray-700">
                                {monetization.core && <p className="font-semibold">{monetization.core}</p>}
                                {monetization.secondary && <p>{monetization.secondary}</p>}
                                {monetization.footer && <p className="mt-3 text-xs">{monetization.footer}</p>}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}
