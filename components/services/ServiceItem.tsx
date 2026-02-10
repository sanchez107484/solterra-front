"use client"

import { cn } from "@/lib/utils"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface ServiceItemProps {
    title: string
    description: string
    result: string
    process: string[]
    ctaPrimary?: string
    ctaSecondary?: string
    ctaPrimaryLink?: string
    ctaSecondaryLink?: string
    variant?: "owners" | "developers"
    icon?: React.ReactNode
}

export function ServiceItem({
    title,
    description,
    result,
    process,
    ctaPrimary,
    ctaSecondary,
    ctaPrimaryLink = "#",
    ctaSecondaryLink = "#",
    variant = "owners",
    icon,
}: ServiceItemProps) {
    const isOwner = variant === "owners"

    return (
        <div className="group relative h-full">
            <div
                className={cn(
                    "h-full rounded-2xl border-2 bg-white p-6 shadow-lg transition-all duration-300",
                    "hover:-translate-y-1 hover:shadow-2xl",
                    isOwner ? "border-green-100 hover:border-green-300" : "border-blue-100 hover:border-blue-300"
                )}
            >
                {/* Icon */}
                {icon && (
                    <div
                        className={cn(
                            "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl",
                            isOwner ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                        )}
                    >
                        {icon}
                    </div>
                )}

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold text-gray-900">{title}</h3>

                {/* Description */}
                <p className="mb-4 text-sm text-gray-600">{description}</p>

                {/* Result Badge */}
                <div
                    className={cn(
                        "mb-4 rounded-lg p-3 text-sm font-medium",
                        isOwner ? "bg-green-50 text-green-800" : "bg-blue-50 text-blue-800"
                    )}
                >
                    ✓ {result}
                </div>

                {/* Process List */}
                {process && process.length > 0 && (
                    <div className="mb-6 space-y-2">
                        {process.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                <CheckCircle2
                                    className={cn("mt-0.5 h-4 w-4 flex-shrink-0", isOwner ? "text-green-500" : "text-blue-500")}
                                />
                                <span>{step}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* CTAs */}
                <div className="mt-auto space-y-2">
                    {ctaPrimary && (
                        <Link
                            href={ctaPrimaryLink}
                            className={cn(
                                "block w-full rounded-lg py-3 text-center text-sm font-semibold transition-all",
                                "hover:shadow-md",
                                isOwner ? "bg-green-600 text-white hover:bg-green-700" : "bg-blue-600 text-white hover:bg-blue-700"
                            )}
                        >
                            {ctaPrimary}
                        </Link>
                    )}
                    {ctaSecondary && (
                        <Link
                            href={ctaSecondaryLink}
                            className={cn(
                                "flex w-full items-center justify-center gap-2 rounded-lg py-3 text-center text-sm font-medium transition-all",
                                "border-2",
                                isOwner
                                    ? "border-green-200 text-green-700 hover:bg-green-50"
                                    : "border-blue-200 text-blue-700 hover:bg-blue-50"
                            )}
                        >
                            {ctaSecondary}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}
