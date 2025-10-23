"use client"

import { usuariosService } from "@/services"
import type { UpdateUsuarioDTO, Usuario } from "@/types/usuario.types"
import { useCallback, useEffect, useState } from "react"

export function useProfile() {
    const [user, setUser] = useState<Usuario | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchProfile = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const profile = await usuariosService.getProfile()
            setUser(profile)
            return profile
        } catch (err: any) {
            setError(err?.message || "Error al cargar el perfil")
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [])

    const updateProfile = useCallback(async (data: UpdateUsuarioDTO) => {
        setIsLoading(true)
        setError(null)
        try {
            const updatedProfile = await usuariosService.updateProfile(data)
            setUser(updatedProfile)
            return updatedProfile
        } catch (err: any) {
            setError(err?.message || "Error al actualizar el perfil")
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [])

    const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
        setIsLoading(true)
        setError(null)
        try {
            await usuariosService.changePassword(currentPassword, newPassword)
        } catch (err: any) {
            setError(err?.message || "Error al cambiar la contraseña")
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [])

    const uploadAvatar = useCallback(
        async (file: File) => {
            setIsLoading(true)
            setError(null)
            try {
                const result = await usuariosService.uploadAvatar(file)
                // Refrescar el perfil completo para obtener la URL actualizada del avatar
                await fetchProfile()
                return result
            } catch (err: any) {
                setError(err?.message || "Error al subir el avatar")
                throw err
            } finally {
                setIsLoading(false)
            }
        },
        [fetchProfile]
    )

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    return {
        user,
        isLoading,
        error,
        fetchProfile,
        updateProfile,
        changePassword,
        uploadAvatar,
        refetch: fetchProfile,
    }
}

export default useProfile
