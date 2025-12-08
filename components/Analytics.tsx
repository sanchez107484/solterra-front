"use client"

import Clarity from "@microsoft/clarity"
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

    // Integrar Microsoft Clarity usando el paquete oficial de npm
    useEffect(() => {
        if (!clarityId) return

        // Inicializar Clarity con el ID del proyecto
        Clarity.init(clarityId)
    }, [clarityId])

    return (
        <>
            {/* Google Analytics 4 */}
            {gaId && <GoogleAnalytics gaId={gaId} />}

            {/* Microsoft Clarity se inicializa mediante el useEffect arriba */}
        </>
    )
}
