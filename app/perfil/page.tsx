"use client"

import ProtectedRoute from "@/components/protected-route"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useProfile } from "@/hooks/useProfile"
import { useTranslations } from "@/i18n/i18nContext"
import { usuariosService } from "@/services"
import type { UpdateUsuarioDTO } from "@/types/usuario.types"
import { BarChart3, Building, Camera, Mail, Phone, Save, Shield, TrendingUp, User } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface ProfileFormData {
    nombre: string
    apellidos: string
    email: string
    telefono: string
    empresa: string
}

interface PasswordFormData {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export default function PerfilPage() {
    const { toast } = useToast()
    const { t } = useTranslations()
    const { user, isLoading, updateProfile, changePassword, uploadAvatar } = useProfile()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [profileForm, setProfileForm] = useState<ProfileFormData>({
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        empresa: "",
    })

    const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const [isSaving, setIsSaving] = useState(false)
    const [isChangingPassword, setIsChangingPassword] = useState(false)
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
    const [stats, setStats] = useState<any>(null)
    const [isLoadingStats, setIsLoadingStats] = useState(false)

    useEffect(() => {
        if (user) {
            console.log("User object:", user)
            setProfileForm({
                nombre: user.nombre || "",
                apellidos: user.apellidos || "",
                email: user.email || "",
                telefono: user.telefono || "",
                empresa: user.empresa || "",
            })
            // Cargar estadísticas
            loadStats()
        }
    }, [user])

    const loadStats = async () => {
        setIsLoadingStats(true)
        try {
            const userStats = await usuariosService.getStats()
            setStats(userStats)
        } catch (error) {
            console.error("Error loading stats:", error)
        } finally {
            setIsLoadingStats(false)
        }
    }

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        try {
            const updateData: UpdateUsuarioDTO = {
                nombre: profileForm.nombre || undefined,
                apellidos: profileForm.apellidos || undefined,
                telefono: profileForm.telefono || undefined,
                empresa: profileForm.empresa || undefined,
            }

            await updateProfile(updateData)

            toast({
                title: t?.profile?.form?.saved,
                description: "Los cambios se han guardado correctamente.",
            })
        } catch (error) {
            toast({
                title: t?.profile?.form?.error,
                description: "No se pudo actualizar el perfil. Inténtalo de nuevo.",
                variant: "destructive",
            })
        } finally {
            setIsSaving(false)
        }
    }

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast({
                title: "Error",
                description: t?.profile?.security?.passwordMismatch,
                variant: "destructive",
            })
            return
        }

        if (passwordForm.newPassword.length < 6) {
            toast({
                title: "Error",
                description: t?.profile?.security?.passwordRequirements,
                variant: "destructive",
            })
            return
        }

        setIsChangingPassword(true)

        try {
            await changePassword(passwordForm.currentPassword, passwordForm.newPassword)

            toast({
                title: t?.profile?.security?.changed,
                description: "Tu contraseña se ha cambiado correctamente.",
            })

            setPasswordForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            })
        } catch (error) {
            toast({
                title: t?.profile?.security?.error,
                description: "No se pudo cambiar la contraseña. Verifica que la contraseña actual sea correcta.",
                variant: "destructive",
            })
        } finally {
            setIsChangingPassword(false)
        }
    }

    const handleAvatarClick = () => {
        fileInputRef.current?.click()
    }

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validar tipo de archivo
        if (!file.type.startsWith("image/")) {
            toast({
                title: "Error",
                description: t?.profile?.avatar?.invalidFileType,
                variant: "destructive",
            })
            return
        }

        // Validar tamaño (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast({
                title: "Error",
                description: t?.profile?.avatar?.fileTooLarge,
                variant: "destructive",
            })
            return
        }

        setIsUploadingAvatar(true)
        try {
            await uploadAvatar(file)
            toast({
                title: t?.profile?.avatar?.uploadSuccess,
                description: "Tu imagen de perfil se ha actualizado correctamente.",
            })
        } catch (error) {
            console.error("Error uploading avatar:", error)
            toast({
                title: t?.profile?.avatar?.uploadError,
                description: "No se pudo subir la imagen. Inténtalo de nuevo.",
                variant: "destructive",
            })
        } finally {
            setIsUploadingAvatar(false)
            // Limpiar el input file para permitir volver a subir el mismo archivo
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
    }

    const getRoleDisplayName = (role: string) => {
        const roleNames = {
            PROPIETARIO: "Propietario",
            PROMOTOR: "Promotor",
            ADMIN: "Administrador",
        }
        return roleNames[role as keyof typeof roleNames] || role
    }

    const getPlanDisplayName = (plan: string) => {
        const planNames = {
            FREE: "Gratuito",
            PRO: "Profesional",
            ENTERPRISE: "Empresarial",
        }
        return planNames[plan as keyof typeof planNames] || plan
    }

    const getAvatarUrl = (avatarPath: string | null | undefined) => {
        if (!avatarPath) return undefined

        // Si ya es una URL completa, devolverla tal como está
        if (avatarPath.startsWith("http://") || avatarPath.startsWith("https://")) {
            return avatarPath
        }

        // Construir URL completa usando la URL base del backend
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"
        const baseUrl = API_URL.replace("/api/v1", "")
        const fullUrl = `${baseUrl}${avatarPath.startsWith("/") ? "" : "/"}${avatarPath}`

        console.log("Avatar debugging:", {
            originalPath: avatarPath,
            API_URL,
            baseUrl,
            fullUrl,
        })

        return fullUrl
    }

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
            </div>
        )
    }

    return (
        <ProtectedRoute requiredRole={["PROPIETARIO", "PROMOTOR", "ADMIN"]} redirectTo="/login">
            <div className="container mx-auto max-w-4xl space-y-8 p-6">
                {/* Header */}
                <div className="flex flex-col space-y-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t?.profile?.title}</h1>
                        <p className="text-muted-foreground">{t?.profile?.subtitle}</p>
                    </div>
                    <Separator />
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Columna izquierda - Avatar y info básica */}
                    <div className="space-y-6">
                        {/* Avatar Card */}
                        <Card>
                            <CardHeader className="text-center">
                                <CardTitle>{t?.profile?.avatar?.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-center">
                                    <div className="relative">
                                        <Avatar className="h-24 w-24 cursor-pointer" onClick={handleAvatarClick}>
                                            <AvatarImage
                                                src={getAvatarUrl(user?.avatar)}
                                                alt={user?.nombre || "Usuario"}
                                                onError={(e) => {
                                                    console.log("Error loading avatar:", e)
                                                    // Fallback en caso de error
                                                    e.currentTarget.style.display = "none"
                                                }}
                                            />
                                            <AvatarFallback className="text-lg">
                                                {user?.nombre?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        {isUploadingAvatar && (
                                            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                                                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                            </div>
                                        )}
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full p-0"
                                            onClick={handleAvatarClick}
                                            disabled={isUploadingAvatar}
                                        >
                                            <Camera className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                                <div className="text-muted-foreground text-center text-sm">
                                    <p>{t?.profile?.avatar?.subtitle}</p>
                                    <p>{t?.profile?.avatar?.fileRequirements}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Info de la cuenta */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    Información de la Cuenta
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Rol:</span>
                                    <span className="text-muted-foreground text-sm">{getRoleDisplayName(user?.rol || "")}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Plan:</span>
                                    <span className="text-muted-foreground text-sm">{getPlanDisplayName(user?.planActual || "FREE")}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Verificado:</span>
                                    <span className={`text-sm ${user?.verificado ? "text-green-600" : "text-orange-600"}`}>
                                        {user?.verificado ? "Sí" : "Pendiente"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Cuenta creada:</span>
                                    <span className="text-muted-foreground text-sm">
                                        {user?.creadoEn ? new Date(user.creadoEn).toLocaleDateString("es-ES") : "-"}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Columna derecha - Formularios */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Formulario de perfil */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    {t?.profile?.personalInfo?.title}
                                </CardTitle>
                                <CardDescription>{t?.profile?.personalInfo?.subtitle}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleProfileSubmit} className="space-y-4">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="nombre">{t?.profile?.form?.name}</Label>
                                            <Input
                                                id="nombre"
                                                placeholder={t?.profile?.form?.namePlaceholder}
                                                value={profileForm.nombre}
                                                onChange={(e) => setProfileForm({ ...profileForm, nombre: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="apellidos">{t?.profile?.form?.lastNameLabel}</Label>
                                            <Input
                                                id="apellidos"
                                                placeholder={t?.profile?.form?.lastNamePlaceholder}
                                                value={profileForm.apellidos}
                                                onChange={(e) => setProfileForm({ ...profileForm, apellidos: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            {t?.profile?.form?.email}
                                        </Label>
                                        <Input id="email" type="email" value={profileForm.email} disabled className="bg-muted" />
                                        <p className="text-muted-foreground text-xs">{t?.profile?.form?.emailNotEditable}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="telefono" className="flex items-center gap-2">
                                            <Phone className="h-4 w-4" />
                                            {t?.profile?.form?.phone}
                                        </Label>
                                        <Input
                                            id="telefono"
                                            type="tel"
                                            placeholder={t?.profile?.form?.phonePlaceholder}
                                            value={profileForm.telefono}
                                            onChange={(e) => setProfileForm({ ...profileForm, telefono: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="empresa" className="flex items-center gap-2">
                                            <Building className="h-4 w-4" />
                                            {t?.profile?.form?.company}
                                        </Label>
                                        <Input
                                            id="empresa"
                                            placeholder={t?.profile?.form?.companyPlaceholder}
                                            value={profileForm.empresa}
                                            onChange={(e) => setProfileForm({ ...profileForm, empresa: e.target.value })}
                                        />
                                    </div>

                                    <Button type="submit" disabled={isSaving} className="w-full">
                                        {isSaving ? (
                                            <>
                                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                                                {t?.profile?.form?.saving}
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                {t?.profile?.form?.save}
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Estadísticas del usuario */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5" />
                                    {t?.profile?.stats?.title}
                                </CardTitle>
                                <CardDescription>{t?.profile?.stats?.subtitle}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isLoadingStats ? (
                                    <div className="flex items-center justify-center py-8">
                                        <div className="border-primary h-6 w-6 animate-spin rounded-full border-b-2"></div>
                                    </div>
                                ) : stats ? (
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {user?.rol === "PROPIETARIO" && (
                                            <>
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">{t?.profile?.stats?.totalLands}:</span>
                                                        <span className="text-muted-foreground text-sm">{stats.totalTerrenos || 0}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">{t?.profile?.stats?.activeLands}:</span>
                                                        <span className="text-muted-foreground text-sm">{stats.terrenosActivos || 0}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">{t?.profile?.stats?.interestedInLands}:</span>
                                                        <span className="text-muted-foreground text-sm">{stats.terrenosVendidos || 0}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">Superficie Total:</span>
                                                        <span className="text-muted-foreground text-sm">
                                                            {stats.superficieTotal || 0} ha
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">Valor Total:</span>
                                                        <span className="text-muted-foreground text-sm">
                                                            {new Intl.NumberFormat("es-ES", {
                                                                style: "currency",
                                                                currency: "EUR",
                                                                maximumFractionDigits: 0,
                                                            }).format(stats.valorTotal || 0)}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">Ingresos Generados:</span>
                                                        <span className="text-muted-foreground text-sm">
                                                            {new Intl.NumberFormat("es-ES", {
                                                                style: "currency",
                                                                currency: "EUR",
                                                                maximumFractionDigits: 0,
                                                            }).format(stats.ingresosGenerados || 0)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {user?.rol === "PROMOTOR" && (
                                            <>
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">{t?.profile?.stats?.totalProjects}:</span>
                                                        <span className="text-muted-foreground text-sm">{stats.totalProyectos || 0}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">{t?.profile?.stats?.activeProjects}:</span>
                                                        <span className="text-muted-foreground text-sm">{stats.proyectosActivos || 0}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">{t?.profile?.stats?.completedProjects}:</span>
                                                        <span className="text-muted-foreground text-sm">
                                                            {stats.proyectosCompletados || 0}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">Presupuesto Total:</span>
                                                        <span className="text-muted-foreground text-sm">
                                                            {new Intl.NumberFormat("es-ES", {
                                                                style: "currency",
                                                                currency: "EUR",
                                                                maximumFractionDigits: 0,
                                                            }).format(stats.presupuestoTotal || 0)}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">Potencia Total:</span>
                                                        <span className="text-muted-foreground text-sm">{stats.potenciaTotal || 0} MW</span>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {user?.rol === "ADMIN" && (
                                            <>
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">{t?.profile?.stats?.totalUsers}:</span>
                                                        <span className="text-muted-foreground text-sm">{stats.totalUsuarios || 0}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">{t?.profile?.stats?.totalProjectsAll}:</span>
                                                        <span className="text-muted-foreground text-sm">
                                                            {stats.totalPropietarios || 0}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">{t?.profile?.stats?.totalLandsAll}:</span>
                                                        <span className="text-muted-foreground text-sm">{stats.totalPromotores || 0}</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">{t?.profile?.stats?.totalLands}:</span>
                                                        <span className="text-muted-foreground text-sm">{stats.totalTerrenos || 0}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">Proyectos Totales:</span>
                                                        <span className="text-muted-foreground text-sm">{stats.totalProyectos || 0}</span>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div className="py-8 text-center">
                                        <TrendingUp className="text-muted-foreground mx-auto h-12 w-12" />
                                        <h3 className="text-muted-foreground mt-2 text-sm font-medium">No hay estadísticas disponibles</h3>
                                        <p className="text-muted-foreground mt-1 text-sm">
                                            Las estadísticas aparecerán cuando tengas actividad en la plataforma
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Formulario de cambio de contraseña */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    {t?.profile?.security?.title}
                                </CardTitle>
                                <CardDescription>{t?.profile?.security?.subtitle}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="currentPassword">{t?.profile?.security?.currentPassword}</Label>
                                        <Input
                                            id="currentPassword"
                                            type="password"
                                            placeholder={t?.profile?.security?.currentPasswordPlaceholder}
                                            value={passwordForm.currentPassword}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="newPassword">{t?.profile?.security?.newPassword}</Label>
                                        <Input
                                            id="newPassword"
                                            type="password"
                                            placeholder={t?.profile?.security?.newPasswordPlaceholder}
                                            value={passwordForm.newPassword}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">{t?.profile?.security?.confirmPassword}</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder={t?.profile?.security?.confirmPasswordPlaceholder}
                                            value={passwordForm.confirmPassword}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isChangingPassword || !passwordForm.currentPassword || !passwordForm.newPassword}
                                        className="w-full"
                                    >
                                        {isChangingPassword ? (
                                            <>
                                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                                                {t?.profile?.security?.changing}
                                            </>
                                        ) : (
                                            <>
                                                <Shield className="mr-2 h-4 w-4" />
                                                {t?.profile?.security?.changePassword}
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}
