import { ErrorHandlerService } from "@/lib/error-handler"
import type { ApiError } from "@/types/api.types"
import { proyectosService } from "./proyectos.service"
import { terrenosService } from "./terrenos.service"

/**
 * Función helper que envuelve llamadas a servicios con manejo de errores automático
 */
function withErrorHandling<T extends (...args: any[]) => Promise<any>>(serviceMethod: T, customErrorMessage?: string): T {
    return (async (...args: Parameters<T>) => {
        try {
            return await serviceMethod(...args)
        } catch (error) {
            ErrorHandlerService.handleApiError(error as ApiError, customErrorMessage)
            throw error // Re-lanzar para que el componente pueda manejar el estado de loading
        }
    }) as T
}

/**
 * Función helper para operaciones con mensajes de éxito automáticos
 */
function withSuccessMessage<T extends (...args: any[]) => Promise<any>>(
    serviceMethod: T,
    successMessage: string,
    customErrorMessage?: string
): T {
    return (async (...args: Parameters<T>) => {
        try {
            const result = await serviceMethod(...args)
            ErrorHandlerService.showSuccess(successMessage)
            return result
        } catch (error) {
            ErrorHandlerService.handleApiError(error as ApiError, customErrorMessage)
            throw error
        }
    }) as T
}

/**
 * Servicios de proyectos con manejo de errores automático
 */
export const proyectosServiceWithHandling = {
    // Operaciones de lectura (solo manejo de errores)
    getAll: withErrorHandling(proyectosService.getAll, "Error al cargar los proyectos"),
    getById: withErrorHandling(proyectosService.getById, "Error al cargar el proyecto"),
    getMine: withErrorHandling(proyectosService.getMine, "Error al cargar tus proyectos"),
    getStats: withErrorHandling(proyectosService.getStats, "Error al cargar las estadísticas"),
    search: withErrorHandling(proyectosService.search, "Error al buscar proyectos"),
    getTipos: withErrorHandling(proyectosService.getTipos, "Error al cargar los tipos de proyecto"),
    getEstados: withErrorHandling(proyectosService.getEstados, "Error al cargar los estados de proyecto"),

    // Operaciones de escritura (con mensajes de éxito)
    create: withSuccessMessage(proyectosService.create, "Proyecto creado exitosamente", "Error al crear el proyecto"),
    update: withSuccessMessage(proyectosService.update, "Proyecto actualizado exitosamente", "Error al actualizar el proyecto"),
    updateStatus: withSuccessMessage(
        proyectosService.updateStatus,
        "Estado del proyecto actualizado",
        "Error al cambiar el estado del proyecto"
    ),
    delete: withSuccessMessage(proyectosService.delete, "Proyecto eliminado exitosamente", "Error al eliminar el proyecto"),
    bulkDelete: withSuccessMessage(proyectosService.bulkDelete, "Proyectos eliminados exitosamente", "Error al eliminar los proyectos"),
    duplicate: withSuccessMessage(proyectosService.duplicate, "Proyecto duplicado exitosamente", "Error al duplicar el proyecto"),
}

/**
 * Servicios de terrenos con manejo de errores automático
 */
export const terrenosServiceWithHandling = {
    // Operaciones de lectura (solo manejo de errores)
    getAll: withErrorHandling(terrenosService.getAll, "Error al cargar los terrenos"),
    getById: withErrorHandling(terrenosService.getById, "Error al cargar el terreno"),
    getMine: withErrorHandling(terrenosService.getMine, "Error al cargar tus terrenos"),
    getStats: withErrorHandling(terrenosService.getStats, "Error al cargar las estadísticas"),
    search: withErrorHandling(terrenosService.search, "Error al buscar terrenos"),
    searchByLocation: withErrorHandling(terrenosService.searchByLocation, "Error al buscar terrenos por ubicación"),
    getCompatibleWithProject: withErrorHandling(terrenosService.getCompatibleWithProject, "Error al buscar terrenos compatibles"),
    getProvincias: withErrorHandling(terrenosService.getProvincias, "Error al cargar las provincias"),
    getMunicipios: withErrorHandling(terrenosService.getMunicipios, "Error al cargar los municipios"),
    validateCoordinates: withErrorHandling(terrenosService.validateCoordinates, "Error al validar las coordenadas"),
    calculateDistanceToGrid: withErrorHandling(terrenosService.calculateDistanceToGrid, "Error al calcular la distancia a la red"),
    calculateRenewablePotential: withErrorHandling(terrenosService.calculateRenewablePotential, "Error al calcular el potencial renovable"),

    // Operaciones de escritura (con mensajes de éxito)
    create: withSuccessMessage(terrenosService.create, "Terreno creado exitosamente", "Error al crear el terreno"),
    update: withSuccessMessage(terrenosService.update, "Terreno actualizado exitosamente", "Error al actualizar el terreno"),
    updateStatus: withSuccessMessage(
        terrenosService.updateStatus,
        "Estado del terreno actualizado",
        "Error al cambiar el estado del terreno"
    ),
    remove: withSuccessMessage(terrenosService.remove, "Terreno eliminado exitosamente", "Error al eliminar el terreno"),
    delete: withSuccessMessage(terrenosService.delete, "Terreno eliminado exitosamente", "Error al eliminar el terreno"),
    bulkDelete: withSuccessMessage(terrenosService.bulkDelete, "Terrenos eliminados exitosamente", "Error al eliminar los terrenos"),
    bulkUpdate: withSuccessMessage(terrenosService.bulkUpdate, "Terrenos actualizados exitosamente", "Error al actualizar los terrenos"),
    duplicate: withSuccessMessage(terrenosService.duplicate, "Terreno duplicado exitosamente", "Error al duplicar el terreno"),
}

// Exportar también los servicios originales para casos donde no se quiera el manejo automático
export { proyectosService, terrenosService }
