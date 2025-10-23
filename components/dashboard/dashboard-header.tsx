"use client"

import { useTranslations } from "@/i18n/i18nContext"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"
import { UserMenu } from "./user-menu"

interface Breadcrumb {
    label: string
    href?: string
}

interface DashboardHeaderProps {
    title: string
    subtitle?: string
    breadcrumbs?: Breadcrumb[]
    actions?: ReactNode
    userType: "promotor" | "propietario"
}

export function DashboardHeader({ title, subtitle, breadcrumbs, actions, userType }: DashboardHeaderProps) {
    const { t } = useTranslations()

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60">
            <div className="flex h-16 items-center justify-between px-6">
                {/* Left side: Title and Breadcrumbs */}
                <div className="flex flex-col">
                    {/* Breadcrumbs */}
                    {breadcrumbs && breadcrumbs.length > 0 && (
                        <nav className="text-muted-foreground flex items-center space-x-1 text-sm">
                            {breadcrumbs.map((crumb, index) => (
                                <div key={index} className="flex items-center">
                                    {crumb.href ? (
                                        <Link href={crumb.href} className="hover:text-foreground transition-colors">
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span className="text-foreground font-medium">{crumb.label}</span>
                                    )}
                                    {index < breadcrumbs.length - 1 && <ChevronRight className="mx-1 h-4 w-4" />}
                                </div>
                            ))}
                        </nav>
                    )}
                    {/* Title */}
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">{title}</h1>
                    </div>
                </div>

                {/* Right side: Actions and User Menu */}
                <div className="flex items-center gap-4">
                    {actions && <div className="hidden md:block">{actions}</div>}
                    <UserMenu userType={userType} />
                </div>
            </div>

            {/* Actions on mobile */}
            {actions && (
                <div className="border-t px-6 py-3 md:hidden">
                    <div className="w-full">{actions}</div>
                </div>
            )}
        </header>
    )
}
