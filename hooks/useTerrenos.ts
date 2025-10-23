"use client"

import { terrenosService, terrenosServiceWithHandling } from "@/services"
import type { CreateTerrenoDTO, Terreno, TerrenoFilters, UpdateTerrenoDTO } from "@/types/terreno.types"
import { useCallback, useEffect, useState } from "react"

type Options = {
    autoFetch?: boolean
    filters?: TerrenoFilters
    withErrorHandling?: boolean // Si usar el servicio con manejo automático de errores
}

export function useTerrenos(options: Options = {}) {
    const { autoFetch = true, filters, withErrorHandling = false } = options
    const [terrenos, setTerrenos] = useState<Terreno[]>([])
    const [pagination, setPagination] = useState({
        page: 1,
        perPage: 10,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    // Elegir el servicio según la configuración
    const service = withErrorHandling ? terrenosServiceWithHandling : terrenosService

    const fetchTerrenos = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await service.getAll(filters)
            setTerrenos(response.data)
            setPagination(
                response.pagination || {
                    page: 1,
                    perPage: 10,
                    total: 0,
                    totalPages: 0,
                    hasNext: false,
                    hasPrev: false,
                }
            )
            return response
        } catch (err: any) {
            if (!withErrorHandling) {
                setError(err?.message || "Error al cargar terrenos")
            }
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [service, withErrorHandling]) // Removido 'filters' para evitar re-renders innecesarios

    const fetchMine = useCallback(
        async (customFilters?: Omit<TerrenoFilters, "propietarioId">) => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await service.getMine({ ...filters, ...customFilters })
                setTerrenos(response.data)
                setPagination(
                    response.pagination || {
                        page: 1,
                        perPage: 10,
                        total: 0,
                        totalPages: 0,
                        hasNext: false,
                        hasPrev: false,
                    }
                )
                return response
            } catch (err: any) {
                if (!withErrorHandling) {
                    setError(err?.message || "Error al cargar tus terrenos")
                }
                throw err
            } finally {
                setIsLoading(false)
            }
        },
        [service, withErrorHandling] // Removido 'filters' para evitar re-renders innecesarios
    )

    const createTerreno = useCallback(
        async (data: CreateTerrenoDTO) => {
            setIsLoading(true)
            setError(null)
            try {
                const newTerreno = await service.create(data)
                setTerrenos((prev) => [newTerreno, ...prev])
                setPagination((prev) => ({ ...prev, total: prev.total + 1 }))
                return newTerreno
            } catch (err: any) {
                if (!withErrorHandling) {
                    setError(err?.message || "Error al crear terreno")
                }
                throw err
            } finally {
                setIsLoading(false)
            }
        },
        [service, withErrorHandling]
    )

    const updateTerreno = useCallback(
        async (id: string, data: UpdateTerrenoDTO) => {
            setIsLoading(true)
            setError(null)
            try {
                const updated = await service.update(id, data)
                setTerrenos((prev) => prev.map((t) => (t.id === id ? updated : t)))
                return updated
            } catch (err: any) {
                if (!withErrorHandling) {
                    setError(err?.message || "Error al actualizar terreno")
                }
                throw err
            } finally {
                setIsLoading(false)
            }
        },
        [service, withErrorHandling]
    )

    const deleteTerreno = useCallback(
        async (id: string) => {
            setIsLoading(true)
            setError(null)
            try {
                await service.delete(id)
                setTerrenos((prev) => prev.filter((t) => t.id !== id))
                setPagination((prev) => ({ ...prev, total: Math.max(0, prev.total - 1) }))
            } catch (err: any) {
                if (!withErrorHandling) {
                    setError(err?.message || "Error al eliminar terreno")
                }
                throw err
            } finally {
                setIsLoading(false)
            }
        },
        [service, withErrorHandling]
    )

    const bulkDelete = useCallback(
        async (ids: string[]) => {
            setIsLoading(true)
            setError(null)
            try {
                const result = await service.bulkDelete(ids)
                setTerrenos((prev) => prev.filter((t) => !ids.includes(t.id)))
                setPagination((prev) => ({ ...prev, total: Math.max(0, prev.total - result.deleted) }))
                return result
            } catch (err: any) {
                if (!withErrorHandling) {
                    setError(err?.message || "Error al eliminar terrenos")
                }
                throw err
            } finally {
                setIsLoading(false)
            }
        },
        [service, withErrorHandling]
    )

    const searchTerrenos = useCallback(
        async (query: string, searchFilters?: Omit<TerrenoFilters, "search">) => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await service.search(query, searchFilters)
                setTerrenos(response.data)
                setPagination(
                    response.pagination || {
                        page: 1,
                        perPage: 10,
                        total: 0,
                        totalPages: 0,
                        hasNext: false,
                        hasPrev: false,
                    }
                )
                return response
            } catch (err: any) {
                if (!withErrorHandling) {
                    setError(err?.message || "Error al buscar terrenos")
                }
                throw err
            } finally {
                setIsLoading(false)
            }
        },
        [service, withErrorHandling]
    )

    const searchByLocation = useCallback(
        async (latitud: number, longitud: number, radio: number, locationFilters?: TerrenoFilters) => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await service.searchByLocation(latitud, longitud, radio, locationFilters)
                setTerrenos(response.data)
                setPagination(response.pagination || { page: 1, perPage: 10, total: 0, totalPages: 0, hasNext: false, hasPrev: false })
                return response
            } catch (err: any) {
                if (!withErrorHandling) {
                    setError(err?.message || "Error al buscar terrenos por ubicación")
                }
                throw err
            } finally {
                setIsLoading(false)
            }
        },
        [service, withErrorHandling]
    )

    useEffect(() => {
        if (autoFetch) void fetchTerrenos()
    }, [autoFetch, fetchTerrenos])

    return {
        terrenos,
        pagination,
        total: pagination?.total || 0, // Mantener compatibilidad con seguridad
        isLoading,
        error,
        fetchTerrenos,
        fetchMine,
        createTerreno,
        updateTerreno,
        deleteTerreno,
        bulkDelete,
        searchTerrenos,
        searchByLocation,
        refetch: fetchTerrenos,
    }
}

export function useTerreno(id?: string, options: { withErrorHandling?: boolean } = {}) {
    const { withErrorHandling = false } = options
    const [terreno, setTerreno] = useState<Terreno | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Elegir el servicio según la configuración
    const service = withErrorHandling ? terrenosServiceWithHandling : terrenosService

    useEffect(() => {
        if (!id) return
        let mounted = true
        setIsLoading(true)
        setError(null)
        service
            .getById(id)
            .then((t) => mounted && setTerreno(t))
            .catch((e) => {
                if (mounted && !withErrorHandling) {
                    setError(e?.message || String(e))
                }
            })
            .finally(() => mounted && setIsLoading(false))

        return () => {
            mounted = false
        }
    }, [id, service, withErrorHandling])

    const refetch = useCallback(async () => {
        if (!id) return null
        setIsLoading(true)
        setError(null)
        try {
            const t = await service.getById(id)
            setTerreno(t)
            return t
        } catch (e: any) {
            if (!withErrorHandling) {
                setError(e?.message || String(e))
            }
            throw e
        } finally {
            setIsLoading(false)
        }
    }, [id, service, withErrorHandling])

    return { terreno, isLoading, error, refetch }
}

export default useTerrenos
