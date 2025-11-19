"use client"

import { proyectosService, terrenosService } from "@/services"
import type { EstadoProyecto, TipoProyecto } from "@/types/proyecto.types"
import { DisponibilidadTerreno, EstadoTerreno, Orientacion, TipoSuelo } from "@/types/terreno.types"
import { useCallback, useState } from "react"

/**
 * Hook para manejar estadísticas y datos complementarios
 */
export function useAppData() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Estados para datos de catálogo
    const [provincias, setProvincias] = useState<string[]>([])
    const [municipios, setMunicipios] = useState<Record<string, string[]>>({})
    const [tiposProyecto, setTiposProyecto] = useState<TipoProyecto[]>([])
    const [estadosProyecto, setEstadosProyecto] = useState<EstadoProyecto[]>([])

    // Estados para estadísticas
    const [proyectosStats, setProyectosStats] = useState<any>(null)
    const [terrenosStats, setTerrenosStats] = useState<any>(null)

    // Array estático de provincias españolas como fallback
    const PROVINCIAS_ESPANA = [
        "Álava",
        "Albacete",
        "Alicante",
        "Almería",
        "Asturias",
        "Ávila",
        "Badajoz",
        "Barcelona",
        "Burgos",
        "Cáceres",
        "Cádiz",
        "Cantabria",
        "Castellón",
        "Ciudad Real",
        "Córdoba",
        "La Coruña",
        "Cuenca",
        "Gerona",
        "Granada",
        "Guadalajara",
        "Guipúzcoa",
        "Huelva",
        "Huesca",
        "Jaén",
        "León",
        "Lérida",
        "Lugo",
        "Madrid",
        "Málaga",
        "Murcia",
        "Navarra",
        "Orense",
        "Palencia",
        "Las Palmas",
        "Pontevedra",
        "La Rioja",
        "Salamanca",
        "Segovia",
        "Sevilla",
        "Soria",
        "Tarragona",
        "Santa Cruz de Tenerife",
        "Teruel",
        "Toledo",
        "Valencia",
        "Valladolid",
        "Vizcaya",
        "Zamora",
        "Zaragoza",
    ]

    /**
     * Cargar provincias disponibles
     */
    const loadProvincias = useCallback(async () => {
        try {
            // Intentar cargar desde el backend
            const data = await terrenosService.getProvincias()
            setProvincias(data)
            return data
        } catch (err: any) {
            console.warn("Error al cargar provincias desde el backend, usando lista estática:", err?.message)
            // Usar lista estática como fallback
            setProvincias(PROVINCIAS_ESPANA)
            return PROVINCIAS_ESPANA
        }
    }, [])

    /**
     * Cargar municipios de una provincia
     */
    const loadMunicipios = useCallback(async (provincia: string) => {
        try {
            const data = await terrenosService.getMunicipios(provincia)
            setMunicipios((prev) => ({ ...prev, [provincia]: data }))
            return data
        } catch (err: any) {
            setError(err?.message || "Error al cargar municipios")
            return []
        }
    }, [])

    /**
     * Cargar tipos de proyecto
     */
    const loadTiposProyecto = useCallback(async () => {
        try {
            const data = await proyectosService.getTipos()
            setTiposProyecto(data)
            return data
        } catch (err: any) {
            setError(err?.message || "Error al cargar tipos de proyecto")
            return []
        }
    }, [])

    /**
     * Cargar estados de proyecto
     */
    const loadEstadosProyecto = useCallback(async () => {
        try {
            const data = await proyectosService.getEstados()
            setEstadosProyecto(data)
            return data
        } catch (err: any) {
            setError(err?.message || "Error al cargar estados de proyecto")
            return []
        }
    }, [])

    /**
     * Cargar estadísticas de proyectos
     */
    const loadProyectosStats = useCallback(async () => {
        try {
            const data = await proyectosService.getStats()
            setProyectosStats(data)
            return data
        } catch (err: any) {
            setError(err?.message || "Error al cargar estadísticas de proyectos")
            return null
        }
    }, [])

    /**
     * Cargar estadísticas de terrenos
     */
    const loadTerrenosStats = useCallback(async () => {
        try {
            const data = await terrenosService.getStats()
            setTerrenosStats(data)
            return data
        } catch (err: any) {
            setError(err?.message || "Error al cargar estadísticas de terrenos")
            return null
        }
    }, [])

    /**
     * Cargar todos los datos de catálogo
     */
    const loadCatalogData = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            await Promise.all([loadProvincias(), loadTiposProyecto(), loadEstadosProyecto()])
        } finally {
            setLoading(false)
        }
    }, [loadProvincias, loadTiposProyecto, loadEstadosProyecto])

    /**
     * Cargar todas las estadísticas
     */
    const loadAllStats = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            await Promise.all([loadProyectosStats(), loadTerrenosStats()])
        } finally {
            setLoading(false)
        }
    }, [loadProyectosStats, loadTerrenosStats])

    /**
     * Validar coordenadas geográficas
     */
    const validateCoordinates = useCallback(async (latitud: number, longitud: number) => {
        try {
            return await terrenosService.validateCoordinates(latitud, longitud)
        } catch (err: any) {
            setError(err?.message || "Error al validar coordenadas")
            throw err
        }
    }, [])

    /**
     * Calcular distancia a la red eléctrica
     */
    const calculateDistanceToGrid = useCallback(async (latitud: number, longitud: number) => {
        try {
            return await terrenosService.calculateDistanceToGrid(latitud, longitud)
        } catch (err: any) {
            setError(err?.message || "Error al calcular distancia a la red")
            throw err
        }
    }, [])

    /**
     * Calcular potencial renovable
     */
    const calculateRenewablePotential = useCallback(async (latitud: number, longitud: number) => {
        try {
            return await terrenosService.calculateRenewablePotential(latitud, longitud)
        } catch (err: any) {
            setError(err?.message || "Error al calcular potencial renovable")
            throw err
        }
    }, [])

    return {
        // Estados
        loading,
        error,

        // Datos de catálogo
        provincias,
        municipios,
        tiposProyecto,
        estadosProyecto,

        // Estadísticas
        proyectosStats,
        terrenosStats,

        // Funciones
        loadProvincias,
        loadMunicipios,
        loadTiposProyecto,
        loadEstadosProyecto,
        loadProyectosStats,
        loadTerrenosStats,
        loadCatalogData,
        loadAllStats,

        // Utilidades geográficas
        validateCoordinates,
        calculateDistanceToGrid,
        calculateRenewablePotential,
    }
}

/**
 * Hook para constantes y utilidades del dominio
 */
export function useDomainConstants() {
    return {
        tiposSuelo: Object.values(TipoSuelo),
        disponibilidadTerreno: Object.values(DisponibilidadTerreno),
        estadosTerreno: Object.values(EstadoTerreno),
        orientaciones: Object.values(Orientacion),

        // Labels user-friendly
        tiposSueloLabels: {
            [TipoSuelo.RUSTICO_COMUN]: "Rústico Común",
            [TipoSuelo.RUSTICO_PROTECCION]: "Rústico de Protección",
            [TipoSuelo.NO_URBANIZABLE]: "No Urbanizable",
            [TipoSuelo.SECANO]: "Secano",
            [TipoSuelo.REGADIO]: "Regadío",
            [TipoSuelo.ERIAL]: "Erial/Barbecho",
        },

        disponibilidadLabels: {
            [DisponibilidadTerreno.VENTA]: "Venta",
            [DisponibilidadTerreno.ARRENDAMIENTO]: "Arrendamiento",
            [DisponibilidadTerreno.DERECHO_SUPERFICIE]: "Derecho de Superficie",
            [DisponibilidadTerreno.AMBOS]: "Venta y Arrendamiento",
        },

        estadosTerrenoLabels: {
            [EstadoTerreno.BORRADOR]: "Borrador",
            [EstadoTerreno.PENDIENTE_REVISION]: "Pendiente de Revisión",
            [EstadoTerreno.ACTIVO]: "Activo",
            [EstadoTerreno.PAUSADO]: "Pausado",
            [EstadoTerreno.RECHAZADO]: "Rechazado",
            [EstadoTerreno.VENDIDO]: "Vendido",
        },

        orientacionesLabels: {
            [Orientacion.NORTE]: "Norte",
            [Orientacion.SUR]: "Sur",
            [Orientacion.ESTE]: "Este",
            [Orientacion.OESTE]: "Oeste",
            [Orientacion.NORESTE]: "Noreste",
            [Orientacion.NOROESTE]: "Noroeste",
            [Orientacion.SURESTE]: "Sureste",
            [Orientacion.SUROESTE]: "Suroeste",
        },
    }
}

/**
 * Hook para formateo de datos
 */
export function useFormatters() {
    const formatCurrency = useCallback((value: number, currency = "EUR") => {
        return new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }, [])

    const formatNumber = useCallback((value: number, decimals = 0) => {
        return new Intl.NumberFormat("es-ES", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }).format(value)
    }, [])

    const formatArea = useCallback(
        (value: number, unit = "ha") => {
            return `${formatNumber(value, 2)} ${unit}`
        },
        [formatNumber]
    )

    const formatPower = useCallback(
        (value: number, unit = "MW") => {
            return `${formatNumber(value, 2)} ${unit}`
        },
        [formatNumber]
    )

    const formatDistance = useCallback(
        (value: number, unit = "km") => {
            return `${formatNumber(value, 2)} ${unit}`
        },
        [formatNumber]
    )

    const formatPercentage = useCallback(
        (value: number) => {
            return `${formatNumber(value, 1)}%`
        },
        [formatNumber]
    )

    const formatDate = useCallback((date: string | Date) => {
        const d = typeof date === "string" ? new Date(date) : date
        return new Intl.DateTimeFormat("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(d)
    }, [])

    const formatDateTime = useCallback((date: string | Date) => {
        const d = typeof date === "string" ? new Date(date) : date
        return new Intl.DateTimeFormat("es-ES", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(d)
    }, [])

    return {
        formatCurrency,
        formatNumber,
        formatArea,
        formatPower,
        formatDistance,
        formatPercentage,
        formatDate,
        formatDateTime,
    }
}
