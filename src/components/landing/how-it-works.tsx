import type { translations } from "@/src/lib/i18n"

type Translations = typeof translations.es

export function HowItWorks({ t }: { t: Translations }) {
    const steps = [
        { number: "01", title: t.howItWorks.step1.title, desc: t.howItWorks.step1.desc },
        { number: "02", title: t.howItWorks.step2.title, desc: t.howItWorks.step2.desc },
        { number: "03", title: t.howItWorks.step3.title, desc: t.howItWorks.step3.desc },
        { number: "04", title: t.howItWorks.step4.title, desc: t.howItWorks.step4.desc },
    ]

    return (
        <section className="bg-muted/50 py-20 md:py-32">
            <div className="container mx-auto px-4">
                <h2 className="mb-16 text-center text-3xl font-bold tracking-tight text-balance md:text-5xl">{t.howItWorks.title}</h2>

                <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            <div className="flex flex-col items-center text-center">
                                <div className="from-primary to-secondary text-primary-foreground mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-2xl font-bold">
                                    {step.number}
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                                <p className="text-muted-foreground text-pretty">{step.desc}</p>
                            </div>

                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="from-primary to-secondary absolute top-8 left-1/2 hidden h-0.5 w-full bg-gradient-to-r lg:block" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
