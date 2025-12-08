/**
 * Utilidades para tracking de eventos en Google Analytics 4
 *
 * Documentación oficial de eventos recomendados:
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events
 */

/**
 * Envia un evento personalizado a Google Analytics
 */
export function trackEvent(eventName: string, eventParams?: Record<string, unknown>) {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", eventName, eventParams)
    }
}

/**
 * Tracking de registro de usuario
 */
export function trackSignup(method: "email" | "google" = "email") {
    trackEvent("sign_up", {
        method,
    })
}

/**
 * Tracking de login de usuario
 */
export function trackLogin(method: "email" | "google" = "email") {
    trackEvent("login", {
        method,
    })
}

/**
 * Tracking de creación de terreno
 */
export function trackTerrenoCreated(data: { tipoSuelo: string; superficie: number; provincia: string; municipio: string }) {
    trackEvent("terreno_created", {
        tipo_suelo: data.tipoSuelo,
        superficie_hectareas: data.superficie,
        provincia: data.provincia,
        municipio: data.municipio,
    })
}

/**
 * Tracking de actualización de terreno
 */
export function trackTerrenoUpdated(terrenoId: string) {
    trackEvent("terreno_updated", {
        terreno_id: terrenoId,
    })
}

/**
 * Tracking de eliminación de terreno
 */
export function trackTerrenoDeleted(terrenoId: string) {
    trackEvent("terreno_deleted", {
        terreno_id: terrenoId,
    })
}

/**
 * Tracking de creación de proyecto
 */
export function trackProyectoCreated(data: { tipo: string; potencia: number; provincia: string }) {
    trackEvent("proyecto_created", {
        tipo_proyecto: data.tipo,
        potencia_mw: data.potencia,
        provincia: data.provincia,
    })
}

/**
 * Tracking de match entre terreno y proyecto
 */
export function trackMatchCreated(data: { terrenoId: string; proyectoId: string; compatibilidad?: number }) {
    trackEvent("match_created", {
        terreno_id: data.terrenoId,
        proyecto_id: data.proyectoId,
        compatibilidad: data.compatibilidad,
    })
}

/**
 * Tracking de navegación en el wizard de creación de terreno
 */
export function trackFormStep(formName: string, step: number) {
    trackEvent("form_step", {
        form_name: formName,
        step_number: step,
    })
}

/**
 * Tracking de errores de validación en formularios
 */
export function trackFormError(formName: string, errorField: string) {
    trackEvent("form_error", {
        form_name: formName,
        error_field: errorField,
    })
}

/**
 * Tracking de búsqueda
 */
export function trackSearch(searchTerm: string, resultCount: number) {
    trackEvent("search", {
        search_term: searchTerm,
        result_count: resultCount,
    })
}

/**
 * Tracking de contacto
 */
export function trackContact(contactMethod: "form" | "email" | "phone") {
    trackEvent("contact", {
        method: contactMethod,
    })
}

/**
 * Tracking de cambio de idioma
 */
export function trackLanguageChange(language: string) {
    trackEvent("language_change", {
        language,
    })
}

// Declaración de tipos para gtag
declare global {
    interface Window {
        gtag?: (command: string, ...args: unknown[]) => void
    }
}
