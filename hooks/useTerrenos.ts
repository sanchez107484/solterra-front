"use client"
import terrenosService from "@/services/terrenos.service"
import type { CreateTerrenoDTO, Terreno, UpdateTerrenoDTO } from "@/types/terreno.types"
import { useCallback, useEffect, useState } from "react"

type Options = {
    autoFetch?: boolean
    filters?: Record<string, any>
    pagination?: { page?: number; perPage?: number }
}

export function useTerrenos(options: Options = {}) {
    const { autoFetch = true, filters, pagination } = options
    const [terrenos, setTerrenos] = useState<Terreno[]>([])
    const [total, setTotal] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchTerrenos = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await terrenosService.getAll({ ...(pagination as any), ...(filters as any) } as any)
            // asumimos backend: { data: Terreno[], pagination: { total } }
            setTerrenos(response.data ?? response)
            setTotal(response.pagination?.total ?? (response.data ? response.data.length : 0))
        } catch (err: any) {
            setError(err?.message || "Error al cargar terrenos")
        } finally {
            setIsLoading(false)
        }
    }, [filters, pagination])

    const fetchMine = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await terrenosService.getMine(pagination as any)
            setTerrenos(response.data ?? response)
            setTotal(response.pagination?.total ?? (response.data ? response.data.length : 0))
        } catch (err: any) {
            setError(err?.message || "Error al cargar tus terrenos")
        } finally {
            setIsLoading(false)
        }
    }, [pagination])

    const createTerreno = useCallback(async (data: CreateTerrenoDTO) => {
        setIsLoading(true)
        setError(null)
        try {
            const newTerreno = await terrenosService.create(data)
            setTerrenos((prev) => [newTerreno, ...prev])
            setTotal((prev) => prev + 1)
            return newTerreno
        } catch (err: any) {
            setError(err?.message || "Error al crear terreno")
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [])

    const updateTerreno = useCallback(async (id: string, data: UpdateTerrenoDTO) => {
        setIsLoading(true)
        setError(null)
        try {
            const updated = await terrenosService.update(id, data)
            setTerrenos((prev) => prev.map((t) => (t.id === id ? updated : t)))
            return updated
        } catch (err: any) {
            setError(err?.message || "Error al actualizar terreno")
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [])

    const deleteTerreno = useCallback(async (id: string) => {
        setIsLoading(true)
        setError(null)
        try {
            await terrenosService.delete(id)
            setTerrenos((prev) => prev.filter((t) => t.id !== id))
            setTotal((prev) => prev - 1)
        } catch (err: any) {
            setError(err?.message || "Error al eliminar terreno")
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        if (autoFetch) fetchTerrenos()
    }, [autoFetch, fetchTerrenos])

    return {
        terrenos,
        total,
        isLoading,
        error,
        fetchTerrenos,
        fetchMine,
        createTerreno,
        updateTerreno,
        deleteTerreno,
        refetch: fetchTerrenos,
    }
}

export function useTerreno(id?: string) {
    const [terreno, setTerreno] = useState<Terreno | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id) return
        let mounted = true
        setIsLoading(true)
        setError(null)
        terrenosService
            .getById(id)
            .then((t) => mounted && setTerreno(t))
            .catch((e) => setError(e?.message || String(e)))
            .finally(() => mounted && setIsLoading(false))

        return () => {
            mounted = false
        }
    }, [id])

    return { terreno, isLoading, error }
}

export default useTerrenos
