"use client"

import Clarity from "@microsoft/clarity"
import { GoogleAnalytics } from "@next/third-parties/google"
import { useEffect, useState } from "react"

/**
 * Componente para integrar Google Analytics 4 y Microsoft Clarity
 *
 * Google Analytics: Métricas generales, conversiones, audiencia
 * Microsoft Clarity: Grabaciones de sesión, mapas de calor, análisis UX
 *
 * Optimizado para no bloquear el renderizado inicial:
 * - Carga diferida después de que la página esté interactiva
 * - requestIdleCallback para mejor performance
 */
export default function Analytics() {
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
    const [shouldLoad, setShouldLoad] = useState(false)

    // Diferir la carga de analytics hasta que la página esté interactiva
    useEffect(() => {
        // Usar requestIdleCallback si está disponible, si no, setTimeout
        if ("requestIdleCallback" in window) {
            requestIdleCallback(() => setShouldLoad(true))
        } else {
            setTimeout(() => setShouldLoad(true), 1)
        }
    }, [])

    // Integrar Microsoft Clarity una vez que shouldLoad sea true
    useEffect(() => {
        if (!clarityId || !shouldLoad) return

        // Inicializar Clarity con el ID del proyecto
        Clarity.init(clarityId)
    }, [clarityId, shouldLoad])

    // No renderizar analytics hasta que la página esté lista
    if (!shouldLoad) return null

    return (
        <>
            {/* Google Analytics 4 */}
            {gaId && <GoogleAnalytics gaId={gaId} />}

            {/* Microsoft Clarity se inicializa mediante el useEffect arriba */}
        </>
    )
}
