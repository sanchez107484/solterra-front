"use client"

import { GoogleAnalytics } from "@next/third-parties/google"
import { useEffect } from "react"

/**
 * Componente para integrar Google Analytics 4 y Microsoft Clarity
 *
 * Google Analytics: Métricas generales, conversiones, audiencia
 * Microsoft Clarity: Grabaciones de sesión, mapas de calor, análisis UX
 */
export default function Analytics() {
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

    // Integrar Microsoft Clarity
    useEffect(() => {
        if (!clarityId)
            return // Script de Clarity según documentación oficial
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(function (c: any, l: Document, a: string, r: string, i: string, t: HTMLScriptElement, y: Element | null) {
            c[a] =
                c[a] ||
                function (...args: unknown[]) {
                    ;(c[a].q = c[a].q || []).push(args)
                }
            t = l.createElement(r) as HTMLScriptElement
            t.async = true
            t.src = "https://www.clarity.ms/tag/" + i
            y = l.getElementsByTagName(r)[0]
            y?.parentNode?.insertBefore(t, y)
        })(window, document, "clarity", "script", clarityId, {} as HTMLScriptElement, document.getElementsByTagName("script")[0])
    }, [clarityId])

    return (
        <>
            {/* Google Analytics 4 */}
            {gaId && <GoogleAnalytics gaId={gaId} />}

            {/* Microsoft Clarity se carga mediante el useEffect arriba */}
        </>
    )
}
