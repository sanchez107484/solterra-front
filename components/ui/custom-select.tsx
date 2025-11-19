"use client"

import { cn } from "@/lib/utils"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown } from "lucide-react"
import * as React from "react"

export interface CustomSelectProps {
    value?: string
    onValueChange?: (value: string) => void
    placeholder?: string
    options: Array<{ value: string; label: string }>
    variant?: "primary" | "secondary"
    className?: string
    disabled?: boolean
    error?: boolean
}

const CustomSelect = React.forwardRef<HTMLButtonElement, CustomSelectProps>(
    ({ value, onValueChange, placeholder = "Selecciona una opción", options, variant = "primary", className, disabled, error }, ref) => {
        const variantStyles = {
            primary: {
                trigger: "border-primary/10 focus:border-primary data-[state=open]:border-primary",
                content: "border-primary/10",
                item: "focus:bg-primary/10 focus:text-primary data-[state=checked]:bg-primary/10 data-[state=checked]:text-primary",
                checkIcon: "text-primary",
            },
            secondary: {
                trigger: "border-secondary/10 focus:border-secondary data-[state=open]:border-secondary",
                content: "border-secondary/10",
                item: "focus:bg-secondary/10 focus:text-secondary data-[state=checked]:bg-secondary/10 data-[state=checked]:text-secondary",
                checkIcon: "text-secondary",
            },
        }

        const styles = variantStyles[variant]

        return (
            <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
                <SelectPrimitive.Trigger
                    ref={ref}
                    className={cn(
                        "bg-background flex h-14 w-full items-center justify-between rounded-lg border-2 px-4 text-lg shadow-xs transition-colors",
                        "hover:bg-accent/5 focus:ring-2 focus:ring-offset-2 focus:outline-none",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        "data-[placeholder]:text-muted-foreground",
                        error ? "border-red-500" : styles.trigger,
                        className
                    )}
                >
                    <SelectPrimitive.Value placeholder={placeholder} />
                    <SelectPrimitive.Icon asChild>
                        <ChevronDown className="h-5 w-5 opacity-50 transition-transform duration-200 data-[state=open]:rotate-180" />
                    </SelectPrimitive.Icon>
                </SelectPrimitive.Trigger>
                <SelectPrimitive.Portal>
                    <SelectPrimitive.Content
                        className={cn(
                            "bg-background relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border-2 shadow-2xl",
                            "data-[state=open]:animate-in data-[state=closed]:animate-out",
                            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                            "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
                            styles.content
                        )}
                        position="popper"
                        sideOffset={8}
                    >
                        <SelectPrimitive.Viewport className="p-2">
                            {options.map((option) => (
                                <SelectPrimitive.Item
                                    key={option.value}
                                    value={option.value}
                                    className={cn(
                                        "relative flex w-full cursor-pointer items-center rounded-md py-3 pr-4 pl-10 text-base outline-none select-none",
                                        "transition-colors duration-150",
                                        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                                        styles.item
                                    )}
                                >
                                    <span className="absolute left-3 flex h-5 w-5 items-center justify-center">
                                        <SelectPrimitive.ItemIndicator>
                                            <Check className={cn("h-5 w-5", styles.checkIcon)} />
                                        </SelectPrimitive.ItemIndicator>
                                    </span>
                                    <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                                </SelectPrimitive.Item>
                            ))}
                        </SelectPrimitive.Viewport>
                    </SelectPrimitive.Content>
                </SelectPrimitive.Portal>
            </SelectPrimitive.Root>
        )
    }
)

CustomSelect.displayName = "CustomSelect"

export { CustomSelect }
