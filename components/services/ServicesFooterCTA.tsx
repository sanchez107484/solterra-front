"use client"

import Link from "next/link"

interface ServicesFooterCTAProps {
    ownersPrimary: string
    ownersSecondary: string
    developersPrimary: string
    developersSecondary: string
    tagline: string
}

export function ServicesFooterCTA({
    ownersPrimary,
    ownersSecondary,
    developersPrimary,
    developersSecondary,
    tagline,
}: ServicesFooterCTAProps) {
    return (
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 md:py-20">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl text-center">
                    {/* Tagline */}
                    <p className="mb-12 text-xl leading-relaxed font-semibold text-white md:text-2xl">{tagline}</p>

                    {/* CTA Grid */}
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Propietarios */}
                        <div className="rounded-2xl bg-gradient-to-br from-green-500 to-green-600 p-8 text-white shadow-2xl">
                            <h3 className="mb-6 text-2xl font-bold">Para Propietarios</h3>
                            <div className="space-y-3">
                                <Link
                                    href="/dashboard/terrenos/nuevo"
                                    className="block w-full rounded-lg bg-white py-3 text-center font-semibold text-green-700 transition-all hover:bg-green-50 hover:shadow-lg"
                                >
                                    {ownersPrimary}
                                </Link>
                                <Link
                                    href="/contacto"
                                    className="block w-full rounded-lg border-2 border-white py-3 text-center font-semibold text-white transition-all hover:bg-white/10"
                                >
                                    {ownersSecondary}
                                </Link>
                            </div>
                        </div>

                        {/* Promotores */}
                        <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white shadow-2xl">
                            <h3 className="mb-6 text-2xl font-bold">Para Promotores</h3>
                            <div className="space-y-3">
                                <Link
                                    href="/registro?tipo=promotor"
                                    className="block w-full rounded-lg bg-white py-3 text-center font-semibold text-blue-700 transition-all hover:bg-blue-50 hover:shadow-lg"
                                >
                                    {developersPrimary}
                                </Link>
                                <Link
                                    href="/contacto"
                                    className="block w-full rounded-lg border-2 border-white py-3 text-center font-semibold text-white transition-all hover:bg-white/10"
                                >
                                    {developersSecondary}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
