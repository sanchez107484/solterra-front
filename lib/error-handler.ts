import { toast } from "@/components/ui/use-toast"
import type { ApiError } from "@/types/api.types"

/**
 * Servicio para manejo centralizado de errores de la API
 */
export class ErrorHandlerService {
    /**
     * Maneja errores de la API y muestra notificaciones apropiadas
     */
    static handleApiError(error: ApiError, customMessage?: string): void {
        const message = customMessage || this.getErrorMessage(error)

        toast({
            title: "Error",
            description: message,
            variant: "destructive",
        })

        // Log para desarrollo
        if (process.env.NODE_ENV === "development") {
            console.error("API Error:", error)
        }
    }

    /**
     * Obtiene un mensaje de error user-friendly basado en el código de estado
     */
    private static getErrorMessage(error: ApiError): string {
        switch (error.statusCode) {
            case 400:
                return error.message || "Los datos enviados no son válidos"
            case 401:
                return "No tienes autorización para realizar esta acción"
            case 403:
                return "No tienes permisos para acceder a este recurso"
            case 404:
                return "El recurso solicitado no fue encontrado"
            case 409:
                return "Ya existe un registro con estos datos"
            case 422:
                return "Los datos enviados contienen errores de validación"
            case 429:
                return "Has realizado demasiadas peticiones. Inténtalo más tarde"
            case 500:
                return "Error interno del servidor. Inténtalo más tarde"
            case 503:
                return "El servicio no está disponible temporalmente"
            default:
                return error.message || "Ha ocurrido un error inesperado"
        }
    }

    /**
     * Maneja errores de validación específicos
     */
    static handleValidationError(error: ApiError): void {
        if (error.details && Array.isArray(error.details)) {
            const validationMessages = error.details.map((detail: any) => detail.message || detail).join(", ")

            toast({
                title: "Error de validación",
                description: validationMessages,
                variant: "destructive",
            })
        } else {
            this.handleApiError(error, "Los datos enviados contienen errores")
        }
    }

    /**
     * Muestra mensaje de éxito
     */
    static showSuccess(message: string, title = "Éxito"): void {
        toast({
            title,
            description: message,
            variant: "default",
        })
    }

    /**
     * Muestra mensaje de información
     */
    static showInfo(message: string, title = "Información"): void {
        toast({
            title,
            description: message,
            variant: "default",
        })
    }

    /**
     * Muestra mensaje de advertencia
     */
    static showWarning(message: string, title = "Advertencia"): void {
        toast({
            title,
            description: message,
            variant: "destructive", // Usar destructive para advertencias ya que no hay variant warning
        })
    }
}

/**
 * Hook personalizado para manejo de errores en componentes
 */
export const useErrorHandler = () => {
    const handleError = (error: any, customMessage?: string) => {
        if (error?.statusCode) {
            ErrorHandlerService.handleApiError(error as ApiError, customMessage)
        } else if (error?.response?.data) {
            // Error de axios sin procesar
            ErrorHandlerService.handleApiError(
                {
                    message: error.response.data.message || "Error desconocido",
                    statusCode: error.response.status || 500,
                    error: error.response.data.error,
                    details: error.response.data.details,
                },
                customMessage
            )
        } else {
            // Error genérico
            toast({
                title: "Error",
                description: customMessage || error?.message || "Ha ocurrido un error inesperado",
                variant: "destructive",
            })
        }
    }

    const showSuccess = (message: string, title?: string) => {
        ErrorHandlerService.showSuccess(message, title)
    }

    const showInfo = (message: string, title?: string) => {
        ErrorHandlerService.showInfo(message, title)
    }

    const showWarning = (message: string, title?: string) => {
        ErrorHandlerService.showWarning(message, title)
    }

    return {
        handleError,
        showSuccess,
        showInfo,
        showWarning,
    }
}
