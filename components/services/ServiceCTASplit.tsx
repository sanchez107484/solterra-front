"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface ServiceCTASplitProps {
    ownersTitle: string
    ownersDesc: string
    ownersCTA: string
    ownersLink: string
    developersTitle: string
    developersDesc: string
    developersCTA: string
    developersLink: string
    tagline?: string
}

export function ServiceCTASplit({
    ownersTitle,
    ownersDesc,
    ownersCTA,
    ownersLink,
    developersTitle,
    developersDesc,
    developersCTA,
    developersLink,
    tagline,
}: ServiceCTASplitProps) {
    return (
        <section className="from-foreground/95 to-foreground bg-gradient-to-br py-16 md:py-24">
            <div className="container mx-auto px-4">
                {/* Tagline */}
                {tagline && (
                    <div className="mb-12 text-center">
                        <p className="mx-auto max-w-3xl text-lg leading-relaxed font-semibold text-white md:text-xl">{tagline}</p>
                    </div>
                )}

                {/* Split CTAs */}
                <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8">
                    {/* Propietarios */}
                    <div className="group from-primary to-primary/90 relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 shadow-2xl transition-all hover:scale-[1.02]">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 transition-opacity group-hover:opacity-100" />

                        <div className="relative z-10 space-y-6">
                            <div>
                                <h3 className="mb-3 text-2xl font-bold text-white md:text-3xl">{ownersTitle}</h3>
                                <p className="leading-relaxed text-white/90">{ownersDesc}</p>
                            </div>

                            <Link href={ownersLink}>
                                <Button size="lg" className="text-primary w-full bg-white font-semibold shadow-lg hover:bg-white/90">
                                    {ownersCTA}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Promotores */}
                    <div className="group from-secondary to-secondary/90 relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 shadow-2xl transition-all hover:scale-[1.02]">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 transition-opacity group-hover:opacity-100" />

                        <div className="relative z-10 space-y-6">
                            <div>
                                <h3 className="mb-3 text-2xl font-bold text-white md:text-3xl">{developersTitle}</h3>
                                <p className="leading-relaxed text-white/90">{developersDesc}</p>
                            </div>

                            <Link href={developersLink}>
                                <Button
                                    size="lg"
                                    className="text-secondary-foreground w-full bg-white font-semibold shadow-lg hover:bg-white/90"
                                >
                                    {developersCTA}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
