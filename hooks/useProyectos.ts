"use client"

import { proyectosService, proyectosServiceWithHandling } from "@/services"
import type { ProyectoFilters } from "@/types/api.types"
import type { CreateProyectoDTO, Proyecto, UpdateProyectoDTO } from "@/types/proyecto.types"
import { useCallback, useEffect, useState } from "react"

type Options = {
    autoFetch?: boolean
    filters?: ProyectoFilters
    withErrorHandling?: boolean // Si usar el servicio con manejo automático de errores
}

export function useProyectos(options: Options = {}) {
    const { autoFetch = true, filters, withErrorHandling = false } = options
    const [proyectos, setProyectos] = useState<Proyecto[]>([])
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
    const service = withErrorHandling ? proyectosServiceWithHandling : proyectosService

    const fetchProyectos = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await service.getAll(filters)
            setProyectos(response.data)
            setPagination(response.pagination || { page: 1, perPage: 10, total: 0, totalPages: 0, hasNext: false, hasPrev: false })
            return response
        } catch (err: any) {
            if (!withErrorHandling) {
                setError(err?.message || "Error al cargar proyectos")
            }
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [filters, service, withErrorHandling])

    const fetchMine = useCallback(
        async (customFilters?: Omit<ProyectoFilters, "promotorId">) => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await service.getMine({ ...filters, ...customFilters })
                setProyectos(response.data)
                setPagination(response.pagination || { page: 1, perPage: 10, total: 0, totalPages: 0, hasNext: false, hasPrev: false })
                return response
            } catch (err: any) {
                if (!withErrorHandling) {
                    setError(err?.message || "Error al cargar tus proyectos")
                }
                throw err
            } finally {
                setIsLoading(false)
            }
        },
        [filters, service, withErrorHandling]
    )

    const createProyecto = useCallback(
        async (payload: CreateProyectoDTO) => {
            setIsLoading(true)
            setError(null)
            try {
                const created = await service.create(payload)
                setProyectos((prev) => [created, ...prev])
                setPagination((prev) => ({ ...prev, total: prev.total + 1 }))
                return created
            } catch (err: any) {
                if (!withErrorHandling) {
                    setError(err?.message || "Error al crear proyecto")
                }
                throw err
            } finally {
                setIsLoading(false)
            }
        },
        [service, withErrorHandling]
    )

    const updateProyecto = useCallback(
        async (id: string, payload: UpdateProyectoDTO) => {
            setIsLoading(true)
            setError(null)
            try {
                const updated = await service.update(id, payload)
                setProyectos((prev) => prev.map((p) => (p.id === id ? updated : p)))
                return updated
            } catch (err: any) {
                if (!withErrorHandling) {
                    setError(err?.message || "Error al actualizar proyecto")
                }
                throw err
            } finally {
                setIsLoading(false)
            }
        },
        [service, withErrorHandling]
    )

    const deleteProyecto = useCallback(
        async (id: string) => {
            setIsLoading(true)
            setError(null)
            try {
                await service.delete(id)
                setProyectos((prev) => prev.filter((p) => p.id !== id))
                setPagination((prev) => ({ ...prev, total: Math.max(0, prev.total - 1) }))
                return true
            } catch (err: any) {
                if (!withErrorHandling) {
                    setError(err?.message || "Error al eliminar proyecto")
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
                setProyectos((prev) => prev.filter((p) => !ids.includes(p.id)))
                setPagination((prev) => ({ ...prev, total: Math.max(0, prev.total - result.deleted) }))
                return result
            } catch (err: any) {
                if (!withErrorHandling) {
                    setError(err?.message || "Error al eliminar proyectos")
                }
                throw err
            } finally {
                setIsLoading(false)
            }
        },
        [service, withErrorHandling]
    )

    const searchProyectos = useCallback(
        async (query: string, searchFilters?: Omit<ProyectoFilters, "search">) => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await service.search(query, searchFilters)
                setProyectos(response.data)
                setPagination(response.pagination || { page: 1, perPage: 10, total: 0, totalPages: 0, hasNext: false, hasPrev: false })
                return response
            } catch (err: any) {
                if (!withErrorHandling) {
                    setError(err?.message || "Error al buscar proyectos")
                }
                throw err
            } finally {
                setIsLoading(false)
            }
        },
        [service, withErrorHandling]
    )

    useEffect(() => {
        if (autoFetch) void fetchProyectos()
    }, [autoFetch, fetchProyectos])

    return {
        proyectos,
        pagination,
        total: pagination?.total || 0, // Mantener compatibilidad con verificación
        isLoading,
        error,
        fetchProyectos,
        fetchMine,
        createProyecto,
        updateProyecto,
        deleteProyecto,
        bulkDelete,
        searchProyectos,
        refetch: fetchProyectos,
    }
}

export function useProyecto(id?: string, options: { withErrorHandling?: boolean } = {}) {
    const { withErrorHandling = false } = options
    const [proyecto, setProyecto] = useState<Proyecto | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    // Elegir el servicio según la configuración
    const service = withErrorHandling ? proyectosServiceWithHandling : proyectosService

    useEffect(() => {
        if (!id) return
        let mounted = true
        setIsLoading(true)
        setError(null)
        service
            .getById(id)
            .then((p) => mounted && setProyecto(p))
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
            const p = await service.getById(id)
            setProyecto(p)
            return p
        } catch (e: any) {
            if (!withErrorHandling) {
                setError(e?.message || String(e))
            }
            throw e
        } finally {
            setIsLoading(false)
        }
    }, [id, service, withErrorHandling])

    return { proyecto, isLoading, error, refetch }
}

export default useProyectos
