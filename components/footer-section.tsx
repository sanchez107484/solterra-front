"use client"

import Logo from "@/components/logo"
import { useTranslations } from "@/i18n/i18nContext"
import { Home, Info, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function FooterSection() {
    const { t } = useTranslations()
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-border bg-muted/30 border-t">
            <div className="container mx-auto px-4 py-10">
                {/* Main Footer Content */}
                <div className="grid gap-8 md:grid-cols-12">
                    {/* Brand Section - Takes more space */}
                    <div className="md:col-span-5">
                        <Link href="/" className="mb-4 flex items-center gap-3">
                            <Logo />
                            <div>
                                <span className="text-foreground text-2xl font-bold">Solterra</span>
                                <p className="text-muted-foreground text-xs">Advisory</p>
                            </div>
                        </Link>
                        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{t.footer?.description}</p>
                        {/* LinkedIn */}
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Síguenos en LinkedIn"
                            className="bg-primary/10 text-primary hover:bg-primary/20 inline-flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110"
                        >
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </div>

                    {/* Navigation Links */}
                    <div className="md:col-span-3">
                        <h3 className="text-foreground mb-4 text-sm font-semibold tracking-wider uppercase">Navegación</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/"
                                    className="group text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm transition-colors"
                                >
                                    <Home className="h-4 w-4" />
                                    {t.nav?.home}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/nosotros"
                                    className="group text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm transition-colors"
                                >
                                    <Info className="h-4 w-4" />
                                    {t.nav?.about}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contacto"
                                    className="group text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm transition-colors"
                                >
                                    <Mail className="h-4 w-4" />
                                    {t.nav?.contact}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="md:col-span-4">
                        <h3 className="text-foreground mb-4 text-sm font-semibold tracking-wider uppercase">{t.footer?.legal}</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/legal/aviso-legal"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    {t.footer?.legal}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/legal/privacidad"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    {t.footer?.privacy}
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/cookies" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                                    Cookies
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/terminos" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                                    {t.footer?.terms}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-border my-8 border-t"></div>

                {/* Bottom Bar */}
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-muted-foreground text-center text-sm md:text-left">
                        © {currentYear} Solterra Advisory. {t.footer?.rights}.
                    </p>
                    <p className="text-muted-foreground text-center text-xs md:text-right">
                        Plataforma conforme con RGPD y PNIEC 2023-2030
                    </p>
                </div>
            </div>
        </footer>
    )
}
