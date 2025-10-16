import { Facebook, Leaf, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import Link from "next/link"

export function FooterSectionPro() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-border bg-muted/30 border-t">
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-5">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="bg-primary rounded-xl p-2.5 shadow-lg">
                                <Leaf className="text-primary-foreground h-6 w-6" />
                            </div>
                            <div>
                                <span className="text-foreground text-2xl font-bold">Solterra</span>
                                <p className="text-muted-foreground text-xs">Advisory</p>
                            </div>
                        </div>
                        <p className="text-muted-foreground mb-6 max-w-sm">
                            Conectando terrenos con el futuro de la energía renovable. Marketplace seguro y transparente para propietarios y
                            promotores.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-primary/10 hover:bg-primary/20 text-primary flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-primary/10 hover:bg-primary/20 text-primary flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-primary/10 hover:bg-primary/20 text-primary flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Platform Column */}
                    <div>
                        <h3 className="text-foreground mb-4 text-lg font-bold">Plataforma</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Cómo funciona
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Para propietarios
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Para promotores
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Precios
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    API
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-foreground mb-4 text-lg font-bold">Empresa</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Sobre nosotros
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Equipo
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Casos de éxito
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Prensa
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h3 className="text-foreground mb-4 text-lg font-bold">Soporte</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Centro de ayuda
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Documentación
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Contacto
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Estado del servicio
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="mb-12 grid gap-6 border-b pb-12 md:grid-cols-3">
                    <div className="flex items-start gap-3">
                        <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                            <Mail className="text-primary h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-foreground mb-1 font-semibold">Email</div>
                            <a href="mailto:info@solterra.com" className="text-muted-foreground hover:text-primary transition-colors">
                                info@solterra.com
                            </a>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                            <Phone className="text-primary h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-foreground mb-1 font-semibold">Teléfono</div>
                            <a href="tel:+34900000000" className="text-muted-foreground hover:text-primary transition-colors">
                                +34 900 000 000
                            </a>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                            <MapPin className="text-primary h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-foreground mb-1 font-semibold">Oficina</div>
                            <p className="text-muted-foreground">Madrid, España</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="text-muted-foreground text-center text-sm md:text-left">
                        <p>© {currentYear} Solterra Advisory. Todos los derechos reservados.</p>
                    </div>

                    <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-6 text-sm">
                        <Link href="#" className="hover:text-primary transition-colors">
                            Términos y condiciones
                        </Link>
                        <span className="text-border">•</span>
                        <Link href="#" className="hover:text-primary transition-colors">
                            Política de privacidad
                        </Link>
                        <span className="text-border">•</span>
                        <Link href="#" className="hover:text-primary transition-colors">
                            Cookies
                        </Link>
                        <span className="text-border">•</span>
                        <Link href="#" className="hover:text-primary transition-colors">
                            Legal
                        </Link>
                    </div>
                </div>

                {/* Compliance badges */}
                <div className="mt-8 border-t pt-8 text-center">
                    <p className="text-muted-foreground text-xs">
                        Plataforma verificada y conforme con la normativa europea de protección de datos (GDPR) y el Plan Nacional Integrado
                        de Energía y Clima (PNIEC 2023-2030)
                    </p>
                </div>
            </div>
        </footer>
    )
}
