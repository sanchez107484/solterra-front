"use client"

import Clarity from "@microsoft/clarity"
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
 * - GA4 cargado manualmente con script async para evitar @next/third-parties
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

    // Cargar Google Analytics manualmente de forma diferida
    useEffect(() => {
        if (!gaId || !shouldLoad) return

        // Insertar script de gtag de forma asíncrona
        const script1 = document.createElement("script")
        script1.async = true
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
        document.head.appendChild(script1)

        // Inicializar gtag
        const script2 = document.createElement("script")
        script2.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
                page_path: window.location.pathname,
            });
        `
        document.head.appendChild(script2)

        return () => {
            // Cleanup si el componente se desmonta
            document.head.removeChild(script1)
            document.head.removeChild(script2)
        }
    }, [gaId, shouldLoad])

    // No renderizar nada, los scripts se insertan en useEffect
    return null
}
