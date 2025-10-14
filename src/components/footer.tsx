import { Leaf, Mail, MapPin, Phone } from "lucide-react"
import type { translations } from "@/src/lib/i18n"
import Link from "next/link"

export function Footer() {
    return (
        <footer className="border-border bg-muted/30 border-t">
            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <div className="bg-primary rounded-xl p-2">
                                <Leaf className="text-primary-foreground h-5 w-5" />
                            </div>
                            <div>
                                <span className="text-lg font-bold">Solterra</span>
                                <p className="text-muted-foreground text-xs">Advisory</p>
                            </div>
                        </div>
                        <p className="text-muted-foreground text-sm">Conectando terrenos con el futuro de la energía renovable</p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-foreground mb-4 font-semibold">Navegación</h3>
                        <ul className="text-muted-foreground space-y-2 text-sm">
                            <li>
                                <Link href="/" className="hover:text-primary">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Cómo funciona
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Sobre nosotros
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-foreground mb-4 font-semibold">Legal</h3>
                        <ul className="text-muted-foreground space-y-2 text-sm">
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Términos y condiciones
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Política de privacidad
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Cookies
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-foreground mb-4 font-semibold">Contacto</h3>
                        <ul className="text-muted-foreground space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <Mail className="text-primary h-4 w-4" />
                                info@solterradvisory.com
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="text-primary h-4 w-4" />
                                +34 900 000 000
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="text-primary h-4 w-4" />
                                Madrid, España
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-border text-muted-foreground mt-12 border-t pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Solterra Advisory. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
