"use client"

import { Card } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export interface FAQItemData {
    question: string
    answer: string
    category?: "propietario" | "promotor"
}

interface FAQItemProps {
    faq: FAQItemData
    index: number
    isOpen: boolean
    onToggle: () => void
    categoryLabels?: {
        propietario?: string
        promotor?: string
    }
}

export function FAQItem({ faq, index, isOpen, onToggle, categoryLabels }: FAQItemProps) {
    return (
        <Card className="hover:border-primary/50 overflow-hidden border-2 transition-all duration-300 hover:shadow-lg">
            <button onClick={onToggle} className="group flex w-full items-center justify-between gap-4 p-6 text-left">
                <div className="flex-1">
                    {faq.category && (
                        <div className="mb-1 flex items-center gap-3">
                            <span
                                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                    faq.category === "propietario"
                                        ? "bg-primary/10 text-primary"
                                        : "bg-secondary/10 text-secondary-foreground"
                                }`}
                            >
                                {faq.category === "propietario"
                                    ? categoryLabels?.propietario || "Propietario"
                                    : categoryLabels?.promotor || "Promotor"}
                            </span>
                        </div>
                    )}
                    <h3 className="text-foreground group-hover:text-primary text-lg font-bold transition-colors">{faq.question}</h3>
                </div>
                <ChevronDown
                    className={`text-muted-foreground h-6 w-6 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="text-muted-foreground px-6 pb-6 leading-relaxed">{faq.answer}</div>
            </div>
        </Card>
    )
}

interface FAQListProps {
    faqs: FAQItemData[]
    title?: string
    categoryLabels?: {
        propietario?: string
        promotor?: string
    }
}

export function FAQList({ faqs, title = "Preguntas frecuentes", categoryLabels }: FAQListProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <div className="mt-12 text-left">
            <h3 className="text-foreground mb-6 text-center text-xl font-bold">{title}</h3>
            <div className="mx-auto max-w-2xl space-y-4">
                {faqs.map((faq, index) => (
                    <FAQItem
                        key={index}
                        faq={faq}
                        index={index}
                        isOpen={openIndex === index}
                        onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                        categoryLabels={categoryLabels}
                    />
                ))}
            </div>
        </div>
    )
}
