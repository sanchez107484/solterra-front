"use client"

import usuariosService from "@/services/usuarios.service"
import type { CreateUsuarioDTO, UpdateUsuarioDTO, Usuario } from "@/types/usuario.types"
import { useCallback, useEffect, useState } from "react"

type Options = {
    autoFetch?: boolean
    filters?: Record<string, any>
    pagination?: { page?: number; perPage?: number }
}

export function useUsuarios(options: Options = {}) {
    const { autoFetch = true, filters, pagination } = options
    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    const [total, setTotal] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchUsuarios = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const resp = await usuariosService.getAll({ ...(pagination as any), ...(filters as any) })
            const data = resp.data ?? resp
            setUsuarios(data)
            setTotal(resp.pagination?.total ?? (Array.isArray(data) ? data.length : 0))
            return resp
        } catch (err: any) {
            setError(err?.message || "Error al cargar usuarios")
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [filters, pagination])

    const fetchMine = fetchUsuarios

    const createUsuario = useCallback(async (payload: CreateUsuarioDTO) => {
        setIsLoading(true)
        setError(null)
        try {
            const created: Usuario = await usuariosService.create(payload)
            setUsuarios((prev) => [created, ...prev])
            setTotal((prev) => prev + 1)
            return created
        } catch (err: any) {
            setError(err?.message || "Error al crear usuario")
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [])

    const updateUsuario = useCallback(async (id: string, payload: UpdateUsuarioDTO) => {
        setIsLoading(true)
        setError(null)
        try {
            const updated: Usuario = await usuariosService.update(id, payload)
            setUsuarios((prev) => prev.map((u) => (u.id === id ? updated : u)))
            return updated
        } catch (err: any) {
            setError(err?.message || "Error al actualizar usuario")
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [])

    const deleteUsuario = useCallback(async (id: string) => {
        setIsLoading(true)
        setError(null)
        try {
            await usuariosService.remove(id)
            setUsuarios((prev) => prev.filter((u) => u.id !== id))
            setTotal((prev) => Math.max(0, prev - 1))
            return true
        } catch (err: any) {
            setError(err?.message || "Error al eliminar usuario")
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        if (autoFetch) void fetchUsuarios()
    }, [autoFetch, fetchUsuarios])

    return {
        usuarios,
        total,
        isLoading,
        error,
        fetchUsuarios,
        fetchMine,
        createUsuario,
        updateUsuario,
        deleteUsuario,
        refetch: fetchUsuarios,
    }
}

export function useUsuario(id?: string) {
    const [usuario, setUsuario] = useState<Usuario | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id) return
        let mounted = true
        setIsLoading(true)
        setError(null)
        usuariosService
            .getById(id)
            .then((u) => mounted && setUsuario(u))
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
            const u = await usuariosService.getById(id)
            setUsuario(u)
            return u
        } catch (e: any) {
            setError(e?.message || String(e))
            throw e
        } finally {
            setIsLoading(false)
        }
    }, [id])

    return { usuario, isLoading, error, refetch }
}

export default useUsuarios
