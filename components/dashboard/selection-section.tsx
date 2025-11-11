import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Grid3x3, MoveHorizontal } from "lucide-react"
import { RefObject } from "react"

interface SelectionSectionProps {
    title: string
    subtitle: string
    viewMode: "horizontal" | "grid"
    onViewModeChange: (mode: "horizontal" | "grid") => void
    canScrollLeft: boolean
    canScrollRight: boolean
    onScrollLeft: () => void
    onScrollRight: () => void
    scrollContainerRef: RefObject<HTMLDivElement>
    children: React.ReactNode
    variant?: "primary" | "secondary"
    className?: string
}

export function SelectionSection({
    title,
    subtitle,
    viewMode,
    onViewModeChange,
    canScrollLeft,
    canScrollRight,
    onScrollLeft,
    onScrollRight,
    scrollContainerRef,
    children,
    variant = "primary",
    className,
}: SelectionSectionProps) {
    const colorClasses = {
        primary: {
            accent: "text-primary",
            bg: "bg-primary/5",
        },
        secondary: {
            accent: "text-secondary",
            bg: "bg-secondary/5",
        },
    }

    const colors = colorClasses[variant]

    return (
        <Card className={cn("p-6", className)}>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <p className="text-muted-foreground text-sm">{subtitle}</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={viewMode === "horizontal" ? "default" : "outline"}
                        size="sm"
                        onClick={() => onViewModeChange("horizontal")}
                        className="gap-2"
                    >
                        <MoveHorizontal className="h-4 w-4" />
                        <span className="sr-only">Vista horizontal</span>
                    </Button>
                    <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="sm"
                        onClick={() => onViewModeChange("grid")}
                        className="gap-2"
                    >
                        <Grid3x3 className="h-4 w-4" />
                        <span className="sr-only">Vista cuadrícula</span>
                    </Button>
                </div>
            </div>

            {/* Vista horizontal con scroll */}
            {viewMode === "horizontal" && (
                <div className="relative">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={onScrollLeft} disabled={!canScrollLeft} className="flex-shrink-0">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div
                            ref={scrollContainerRef}
                            className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                            {children}
                        </div>
                        <Button variant="outline" size="sm" onClick={onScrollRight} disabled={!canScrollRight} className="flex-shrink-0">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Vista grid */}
            {viewMode === "grid" && <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{children}</div>}
        </Card>
    )
}
