import { Leaf, Mail, MapPin, Phone } from "lucide-react"
import type { translations } from "@/lib/i18n"
import Link from "next/link"

type Translations = typeof translations.es

export function Footer({ t }: { t: Translations }) {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="rounded-xl bg-primary p-2">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold">Solterra</span>
                <p className="text-xs text-muted-foreground">Advisory</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Conectando terrenos con el futuro de la energía renovable</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Navegación</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
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
            <h3 className="mb-4 font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
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
            <h3 className="mb-4 font-semibold text-foreground">Contacto</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                info@solterradvisory.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +34 900 000 000
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Madrid, España
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Solterra Advisory. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
