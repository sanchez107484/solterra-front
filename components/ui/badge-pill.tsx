import { cn } from "@/lib/utils"

interface BadgePillProps {
    children: React.ReactNode
    variant?: "primary" | "secondary" | "accent"
    className?: string
}

export function BadgePill({ children, variant = "primary", className }: BadgePillProps) {
    const variantStyles = {
        primary: "border-primary/20 bg-primary/10 text-primary",
        secondary: "border-secondary/20 bg-secondary/10 text-secondary",
        accent: "border-accent/20 bg-accent/10 text-accent",
    }

    return (
        <div
            className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold",
                variantStyles[variant],
                className
            )}
        >
            {children}
        </div>
    )
}
