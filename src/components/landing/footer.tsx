import { Leaf } from "lucide-react"
import type { translations } from "@/src/lib/i18n"

type Translations = typeof translations.es

export function Footer({ t }: { t: Translations }) {
    return (
        <footer className="bg-muted/30 border-t">
            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="bg-primary rounded-lg p-2">
                                <Leaf className="text-primary-foreground h-6 w-6" />
                            </div>
                            <span className="text-xl font-bold">Solterra</span>
                        </div>
                        <p className="text-muted-foreground text-pretty">{t.footer.description}</p>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="mb-4 font-semibold">{t.footer.company}</h3>
                        <ul className="text-muted-foreground space-y-2 text-sm">
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
                        <ul className="text-muted-foreground space-y-2 text-sm">
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

                <div className="text-muted-foreground mt-12 border-t pt-8 text-center text-sm">
                    <p>
                        © {new Date().getFullYear()} Solterra Advisory. {t.footer.rights}.
                    </p>
                </div>
            </div>
        </footer>
    )
}
