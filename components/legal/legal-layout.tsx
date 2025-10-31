import { Button } from "@/components/ui/button"
import { ArrowLeft, Cookie, FileText, Scale, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"

interface LegalLayoutProps {
    children: ReactNode
    title: string
    lastUpdated: string
    icon?: "privacy" | "legal" | "cookies" | "terms"
}

const iconMap = {
    privacy: Shield,
    legal: FileText,
    cookies: Cookie,
    terms: Scale,
}

export function LegalLayout({ children, title, lastUpdated, icon = "legal" }: LegalLayoutProps) {
    const Icon = iconMap[icon]

    return (
        <div className="bg-app-bg min-h-screen">
            {/* Header con gradiente */}
            <div className="from-primary/5 via-accent/5 border-b bg-gradient-to-r to-transparent">
                <div className="container mx-auto px-4 py-8">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="mb-6 gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Volver al inicio
                        </Button>
                    </Link>

                    <div className="flex items-start gap-6">
                        <div className="from-primary/20 to-accent/20 hidden h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br md:flex">
                            <Icon className="text-primary h-8 w-8" />
                        </div>
                        <div className="flex-1">
                            <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">{title}</h1>
                            <p className="text-muted-foreground text-sm">Última actualización: {lastUpdated}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="container mx-auto px-4 py-12">
                <div className="mx-auto max-w-4xl">
                    {/* Logo de Solterra */}
                    <div className="bg-card mb-8 flex items-center gap-3 rounded-lg border p-4">
                        <Image src="/solterra-logo.svg" alt="Solterra Advisory" width={40} height={40} className="flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">Solterra Advisory S.L.</p>
                            <p className="text-muted-foreground text-sm">Plataforma de conexión para proyectos de energía renovable</p>
                        </div>
                    </div>

                    {/* Contenido legal */}
                    <div className="prose prose-gray dark:prose-invert max-w-none">{children}</div>

                    {/* Footer con enlaces rápidos */}
                    <div className="bg-muted/50 mt-16 rounded-lg border p-6">
                        <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Documentos legales</h3>
                        <div className="grid gap-2 sm:grid-cols-2">
                            <Link
                                href="/legal/aviso-legal"
                                className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors"
                            >
                                <FileText className="h-4 w-4" />
                                Aviso Legal
                            </Link>
                            <Link
                                href="/legal/privacidad"
                                className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors"
                            >
                                <Shield className="h-4 w-4" />
                                Política de Privacidad
                            </Link>
                            <Link
                                href="/legal/cookies"
                                className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors"
                            >
                                <Cookie className="h-4 w-4" />
                                Política de Cookies
                            </Link>
                            <Link
                                href="/legal/terminos"
                                className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors"
                            >
                                <Scale className="h-4 w-4" />
                                Términos y Condiciones
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
