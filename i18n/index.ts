import { Locale, defaultLocale } from "./config"

export type Translations = import("./locales/es").ESTranslations | import("./locales/en").ENTranslations

export async function getTranslations(locale: Locale): Promise<Translations> {
    switch (locale) {
        case "es":
            return (await import("./locales/es")).es
        case "en":
            return (await import("./locales/en")).en
        default:
            return (await import("./locales/es")).es
    }
}
