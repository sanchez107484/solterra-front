"use client"

import type React from "react"

import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import { useTranslations } from "@/i18n/i18nContext"
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPropietario() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { t } = useTranslations()
    const { login, register } = useAuth()

    // Form state
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        nombre: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            if (isLogin) {
                await login({ email: formData.email, password: formData.password })
                toast({
                    title: t?.auth?.owner?.toast?.welcomeTitle,
                    description: t?.auth?.owner?.toast?.welcomeDesc,
                })
            } else {
                await register({
                    email: formData.email,
                    password: formData.password,
                    nombre: formData.nombre,
                    rol: "PROPIETARIO",
                })
                toast({
                    title: t?.auth?.owner?.toast?.registerTitle,
                    description: t?.auth?.owner?.toast?.registerDesc,
                })
            }
            router.push("/dashboard/propietario")
        } catch (err: unknown) {
            const message =
                (err as any)?.response?.data?.message ||
                (err instanceof Error ? err.message : undefined) ||
                t?.auth?.owner?.toast?.genericErrorDesc

            toast({
                title: t?.common?.errorTitle,
                description: message,
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen">
            {/* Left side - Branding */}
            <div className="from-primary via-primary/90 to-primary/80 relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br p-12 lg:flex lg:w-1/2">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]" />

                <div className="relative z-10">
                    <Link href="/" className="text-primary-foreground flex items-center gap-3">
                        <Logo />
                        <div>
                            <span className="text-2xl font-bold">Solterra</span>
                            <p className="text-sm opacity-90">Advisory</p>
                        </div>
                    </Link>
                </div>

                <div className="text-primary-foreground relative z-10 space-y-6">
                    <h1 className="text-5xl leading-tight font-bold">{t?.auth?.owner?.heroTitle}</h1>
                    <p className="text-xl opacity-90">{t?.auth?.owner?.heroSubtitle}</p>
                    <div className="flex gap-8 pt-8">
                        <div>
                            <div className="text-4xl font-bold">500+</div>
                            <div className="text-sm opacity-80">{t?.auth?.owner?.stats?.listed}</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold">€2M+</div>
                            <div className="text-sm opacity-80">{t?.auth?.owner?.stats?.contracts}</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold">98%</div>
                            <div className="text-sm opacity-80">{t?.auth?.owner?.stats?.satisfaction}</div>
                        </div>
                    </div>
                </div>

                <div className="text-primary-foreground/80 relative z-10 text-sm">{t?.copyright}</div>
            </div>

            {/* Right side - Form */}
            <div className="bg-background flex flex-1 items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <Link href="/" className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm">
                        <ArrowLeft className="h-4 w-4" />
                        {t?.auth?.common?.backToHome}
                    </Link>

                    <Card className="border-2 p-8 shadow-xl">
                        <div className="mb-8 text-center">
                            <div className="mb-4 inline-flex rounded-2xl p-4">
                                <Logo size={80} />
                            </div>
                            <h2 className="text-foreground mb-2 text-3xl font-bold">
                                {isLogin ? t?.auth?.owner?.welcomeBack : t?.auth?.owner?.createAccount}
                            </h2>
                            <p className="text-muted-foreground">
                                {isLogin ? t?.auth?.owner?.subtitleLogin : t?.auth?.owner?.subtitleRegister}
                            </p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {!isLogin && (
                                <div className="space-y-2">
                                    <Label htmlFor="name">{t?.contact?.form?.nameLabel}</Label>
                                    <Input
                                        id="name"
                                        placeholder={t?.contact?.form?.namePlaceholder}
                                        className="h-12"
                                        value={formData.nombre}
                                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                        required={!isLogin}
                                    />
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">{t?.contact?.form?.emailLabel}</Label>
                                <div className="relative">
                                    <Mail className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder={t?.contact?.form?.emailPlaceholder}
                                        className="h-12 pl-10"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">{t?.contact?.form?.passwordLabel}</Label>
                                <div className="relative">
                                    <Lock className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder={t?.contact?.form?.passwordPlaceholder}
                                        className="h-12 pr-10 pl-10"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                        minLength={6}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            {isLogin && (
                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex cursor-pointer items-center gap-2">
                                        <input type="checkbox" className="border-input rounded" />
                                        <span className="text-muted-foreground">{t?.contact?.form?.rememberMe}</span>
                                    </label>
                                    <Link href="#" className="text-primary hover:underline">
                                        {t?.contact?.form?.forgotPassword}
                                    </Link>
                                </div>
                            )}

                            <Button type="submit" className="bg-primary hover:bg-primary/90 h-12 w-full text-lg" disabled={isLoading}>
                                {isLoading
                                    ? t?.common?.loading
                                    : isLogin
                                      ? t?.contact?.form?.loginButton
                                      : t?.contact?.form?.registerButton}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm">
                            <span className="text-muted-foreground">
                                {isLogin ? t?.auth?.owner?.noAccount : t?.auth?.owner?.haveAccount}
                            </span>{" "}
                            <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-semibold hover:underline">
                                {isLogin ? t?.auth?.owner?.registerButton : t?.auth?.owner?.loginButton}
                            </button>
                        </div>

                        <div className="mt-6 border-t pt-6 text-center">
                            <p className="text-muted-foreground mb-4 text-sm">{t?.auth?.owner?.promoterQuestion}</p>
                            <Link href="/login/promotor">
                                <Button variant="outline" className="w-full bg-transparent">
                                    {t?.auth?.owner?.accessAsPromoter}
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
