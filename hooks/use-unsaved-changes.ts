"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef } from "react"

/**
 * Hook para prevenir la navegación cuando hay cambios sin guardar
 * @param hasUnsavedChanges - Boolean que indica si hay cambios sin guardar
 * @param message - Mensaje para mostrar al usuario (puede ser del diccionario i18n o string directamente)
 */
export function useUnsavedChanges(hasUnsavedChanges: boolean, message?: string) {
    const router = useRouter()
    const isNavigatingRef = useRef(false)
    const originalPushRef = useRef<any>(null)

    // Mensaje por defecto si no se proporciona ninguno
    const confirmMessage = message || "Tienes cambios sin guardar. ¿Estás seguro de que deseas salir? Se perderán todos los cambios."

    // Protección contra cierre/recarga del navegador (F5, Ctrl+R, cerrar pestaña/ventana)
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges && !isNavigatingRef.current) {
                e.preventDefault()
                e.returnValue = "" // Chrome requiere esto
                return ""
            }
        }

        window.addEventListener("beforeunload", handleBeforeUnload)

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload)
        }
    }, [hasUnsavedChanges])

    // Protección contra navegación del navegador (botones atrás/adelante)
    useEffect(() => {
        if (!hasUnsavedChanges) return

        const handlePopState = (e: PopStateEvent) => {
            if (hasUnsavedChanges && !isNavigatingRef.current) {
                const confirmed = window.confirm(confirmMessage)

                if (!confirmed) {
                    // Prevenir la navegación restaurando el historial
                    window.history.pushState(null, "", window.location.href)
                } else {
                    isNavigatingRef.current = true
                }
            }
        }

        // Agregar una entrada al historial para interceptar el botón "atrás"
        window.history.pushState(null, "", window.location.href)
        window.addEventListener("popstate", handlePopState)

        return () => {
            window.removeEventListener("popstate", handlePopState)
        }
    }, [hasUnsavedChanges, confirmMessage])

    // Interceptar router.push de Next.js (usado en dropdowns, onClick handlers, etc.)
    useEffect(() => {
        if (!originalPushRef.current) {
            originalPushRef.current = router.push.bind(router)
        }

        if (hasUnsavedChanges) {
            // Sobrescribir router.push
            router.push = (href: string, options?: any) => {
                if (isNavigatingRef.current) {
                    return originalPushRef.current(href, options)
                }

                const currentPath = window.location.pathname
                const targetPath = typeof href === "string" ? href : href

                // Solo preguntar si es diferente página
                if (currentPath !== targetPath) {
                    const confirmed = window.confirm(confirmMessage)

                    if (confirmed) {
                        isNavigatingRef.current = true
                        return originalPushRef.current(href, options)
                    } else {
                        // Retornar una promesa vacía para no romper el flujo
                        return Promise.resolve(false as any)
                    }
                }

                return originalPushRef.current(href, options)
            }
        } else {
            // Restaurar router.push original cuando no hay cambios
            if (originalPushRef.current) {
                router.push = originalPushRef.current
            }
        }

        return () => {
            // Restaurar en cleanup
            if (originalPushRef.current) {
                router.push = originalPushRef.current
            }
        }
    }, [hasUnsavedChanges, confirmMessage, router])

    // Protección para clicks en enlaces de navegación (sidebar, header, etc.)
    useEffect(() => {
        if (!hasUnsavedChanges) return

        const handleClick = (e: MouseEvent) => {
            if (isNavigatingRef.current) return

            const target = e.target as HTMLElement
            const link = target.closest("a")

            // Solo interceptar si es un enlace con href
            if (link && link.href) {
                try {
                    const currentHost = window.location.host
                    const linkUrl = new URL(link.href)
                    const linkHost = linkUrl.host

                    // Solo interceptar enlaces internos que cambien de ruta
                    if (currentHost === linkHost) {
                        const currentPath = window.location.pathname
                        const linkPath = linkUrl.pathname

                        // Solo interceptar si es una navegación a diferente página
                        if (currentPath !== linkPath && hasUnsavedChanges) {
                            e.preventDefault()
                            e.stopPropagation()

                            const confirmed = window.confirm(confirmMessage)

                            if (confirmed) {
                                isNavigatingRef.current = true
                                window.location.href = link.href
                            }
                        }
                    }
                } catch (error) {
                    // Si hay error al parsear la URL, no hacer nada
                    console.error("Error parsing URL:", error)
                }
            }
        }

        // Usar capture: true para interceptar antes que otros listeners
        document.addEventListener("click", handleClick, true)

        return () => {
            document.removeEventListener("click", handleClick, true)
        }
    }, [hasUnsavedChanges, confirmMessage])

    /**
     * Función para permitir la navegación programática
     * Útil cuando se guarda correctamente y se quiere navegar
     */
    const allowNavigation = useCallback(() => {
        isNavigatingRef.current = true
    }, [])

    /**
     * Función para resetear la protección
     */
    const resetProtection = useCallback(() => {
        isNavigatingRef.current = false
    }, [])

    return {
        allowNavigation,
        resetProtection,
    }
}
