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
            <div className="container mx-auto px-4 py-8 md:py-10">
                {/* Desktop: Single row with 3 sections | Mobile: Brand full-width, then Nav | Legal */}
                <div className="flex flex-col gap-8 md:flex-row md:gap-12">
                    {/* Brand Section */}
                    <div className="flex flex-col items-center text-center md:flex-[5] md:items-start md:text-left">
                        <Link href="/" className="mb-4 flex items-center gap-3">
                            <Logo />
                            <div>
                                <span className="text-foreground text-xl font-bold md:text-2xl">Solterra</span>
                                <p className="text-muted-foreground text-xs">Advisory</p>
                            </div>
                        </Link>
                        <p className="text-muted-foreground mb-4 text-sm leading-relaxed md:mb-6">{t.footer?.description}</p>
                        {/* LinkedIn */}
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Síguenos en LinkedIn"
                            className="bg-primary/10 text-primary hover:bg-primary/20 inline-flex h-11 w-11 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95 md:h-10 md:w-10"
                        >
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </div>

                    {/* Navigation and Legal - 2 cols on mobile, flex on desktop */}
                    <div className="grid grid-cols-2 gap-6 md:flex md:flex-[7] md:gap-12">
                        {/* Navigation Links */}
                        <div className="flex flex-col items-center text-center md:flex-[3] md:items-start md:text-left">
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
                        <div className="flex flex-col items-center text-center md:flex-[4] md:items-start md:text-left">
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
                                    <Link
                                        href="/legal/cookies"
                                        className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                    >
                                        Cookies
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/legal/terminos"
                                        className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                    >
                                        {t.footer?.terms}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-border my-6 border-t md:my-8"></div>

                {/* Bottom Bar */}
                <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:gap-4 md:text-left">
                    <p className="text-muted-foreground text-sm">
                        © {currentYear} Solterra Advisory. {t.footer?.rights}.
                    </p>
                    <p className="text-muted-foreground text-xs md:text-right">Plataforma conforme con RGPD y PNIEC 2023-2030</p>
                </div>
            </div>
        </footer>
    )
}
