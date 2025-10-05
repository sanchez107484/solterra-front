import { Leaf } from "lucide-react"
import type { translations } from "@/lib/i18n"

type Translations = typeof translations.es

export function Footer({ t }: { t: Translations }) {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="rounded-lg bg-primary p-2">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Solterra</span>
            </div>
            <p className="text-pretty text-muted-foreground">{t.footer.description}</p>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 font-semibold">{t.footer.company}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  {t.footer.about}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  {t.footer.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-semibold">{t.footer.legal}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  {t.footer.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  {t.footer.terms}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Solterra Advisory. {t.footer.rights}.
          </p>
        </div>
      </div>
    </footer>
  )
}
