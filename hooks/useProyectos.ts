"use client"

import proyectosService from "@/services/proyectos.service"
import type { CreateProyectoDTO, Proyecto, UpdateProyectoDTO } from "@/types/proyecto.types"
import { useCallback, useEffect, useState } from "react"

type Options = {
    autoFetch?: boolean
    filters?: Record<string, any>
    pagination?: { page?: number; perPage?: number }
}

export function useProyectos(options: Options = {}) {
    const { autoFetch = true, filters, pagination } = options
    const [proyectos, setProyectos] = useState<Proyecto[]>([])
    const [total, setTotal] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchProyectos = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const resp = await proyectosService.getAll({ ...(pagination as any), ...(filters as any) })
            const data = resp.data ?? resp
            setProyectos(data)
            setTotal(resp.pagination?.total ?? (Array.isArray(data) ? data.length : 0))
            return resp
        } catch (err: any) {
            setError(err?.message || "Error al cargar proyectos")
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [filters, pagination])

    // Algunos backends exponen un endpoint para "mis proyectos". Si no existe,
    // simplemente reutilizamos `fetchProyectos` (el caller puede pasar filtros).
    const fetchMine = fetchProyectos

    const createProyecto = useCallback(async (payload: CreateProyectoDTO) => {
        setIsLoading(true)
        setError(null)
        try {
            const created: Proyecto = await proyectosService.create(payload)
            setProyectos((prev) => [created, ...prev])
            setTotal((prev) => prev + 1)
            return created
        } catch (err: any) {
            setError(err?.message || "Error al crear proyecto")
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [])

    const updateProyecto = useCallback(async (id: string, payload: UpdateProyectoDTO) => {
        setIsLoading(true)
        setError(null)
        try {
            const updated: Proyecto = await proyectosService.update(id, payload)
            setProyectos((prev) => prev.map((p) => (p.id === id ? updated : p)))
            return updated
        } catch (err: any) {
            setError(err?.message || "Error al actualizar proyecto")
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [])

    const deleteProyecto = useCallback(async (id: string) => {
        setIsLoading(true)
        setError(null)
        try {
            await proyectosService.delete(id)
            setProyectos((prev) => prev.filter((p) => p.id !== id))
            setTotal((prev) => Math.max(0, prev - 1))
            return true
        } catch (err: any) {
            setError(err?.message || "Error al eliminar proyecto")
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        if (autoFetch) void fetchProyectos()
    }, [autoFetch, fetchProyectos])

    return {
        proyectos,
        total,
        isLoading,
        error,
        fetchProyectos,
        fetchMine,
        createProyecto,
        updateProyecto,
        deleteProyecto,
        refetch: fetchProyectos,
    }
}

export function useProyecto(id?: string) {
    const [proyecto, setProyecto] = useState<Proyecto | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id) return
        let mounted = true
        setIsLoading(true)
        setError(null)
        proyectosService
            .getById(id)
            .then((p) => mounted && setProyecto(p))
            .catch((e) => setError(e?.message || String(e)))
            .finally(() => mounted && setIsLoading(false))

        return () => {
            mounted = false
        }
    }, [id])

    const refetch = useCallback(async () => {
        if (!id) return null
        setIsLoading(true)
        setError(null)
        try {
            const p = await proyectosService.getById(id)
            setProyecto(p)
            return p
        } catch (e: any) {
            setError(e?.message || String(e))
            throw e
        } finally {
            setIsLoading(false)
        }
    }, [id])

    return { proyecto, isLoading, error, refetch }
}

export default useProyectos
