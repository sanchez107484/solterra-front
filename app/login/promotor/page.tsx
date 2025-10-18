"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getTranslations, type Locale } from "@/lib/i18n"
import { ArrowLeft, Building2, Eye, EyeOff, Lock, Mail, Zap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function LoginPromotor() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [locale, setLocale] = useState<Locale>("es")
    const [mounted, setMounted] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setMounted(true)
        const savedLocale = (localStorage.getItem("locale") as Locale) || "es"
        setLocale(savedLocale)
    }, [])

    const t = getTranslations(locale)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implementar lógica de autenticación real
        router.push("/dashboard/promotor")
    }

    if (!mounted) return null

    return (
        <div className="flex min-h-screen">
            {/* Left side - Branding */}
            <div className="from-secondary via-secondary/90 to-secondary/80 relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br p-12 lg:flex lg:w-1/2">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]" />

                <div className="relative z-10">
                    <Link href="/" className="text-secondary-foreground flex items-center gap-3">
                        <div className="bg-secondary-foreground/20 rounded-xl p-2.5 backdrop-blur-sm">
                            <Zap className="h-8 w-8" />
                        </div>
                        <div>
                            <span className="text-2xl font-bold">Solterra</span>
                            <p className="text-sm opacity-90">Advisory</p>
                        </div>
                    </Link>
                </div>

                <div className="text-secondary-foreground relative z-10 space-y-6">
                    <h1 className="text-5xl leading-tight font-bold">{t?.login?.promoter?.heroTitle}</h1>
                    <p className="text-xl opacity-90">{t?.login?.promoter?.heroSubtitle}</p>
                    <div className="flex gap-8 pt-8">
                        <div>
                            <div className="text-4xl font-bold">300+</div>
                            <div className="text-sm opacity-80">{t?.login?.promoter?.stats?.active}</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold">150MW</div>
                            <div className="text-sm opacity-80">{t?.login?.promoter?.stats?.inDevelopment}</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold">95%</div>
                            <div className="text-sm opacity-80">{t?.login?.promoter?.stats?.matchRate}</div>
                        </div>
                    </div>
                </div>

                <div className="text-secondary-foreground/80 relative z-10 text-sm">{t?.login?.promoter?.copyright}</div>
            </div>

            {/* Right side - Form */}
            <div className="bg-background flex flex-1 items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <Link href="/" className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm">
                        <ArrowLeft className="h-4 w-4" />
                        {t?.common?.backToHome}
                    </Link>

                    <Card className="border-2 p-8 shadow-xl">
                        <div className="mb-8 text-center">
                            <div className="bg-secondary/10 mb-4 inline-flex rounded-2xl p-4">
                                <Zap className="text-secondary-foreground h-10 w-10" />
                            </div>
                            <h2 className="text-foreground mb-2 text-3xl font-bold">
                                {isLogin ? t?.login?.promoter?.welcomeBack : t?.login?.promoter?.createAccount}
                            </h2>
                            <p className="text-muted-foreground">
                                {isLogin ? t?.login?.promoter?.subtitleLogin : t?.login?.promoter?.subtitleRegister}
                            </p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {!isLogin && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="name">{t?.form?.name}</Label>
                                        <Input id="name" placeholder={t?.form?.namePlaceholder} className="h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="company">{t?.form?.company}</Label>
                                        <div className="relative">
                                            <Building2 className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
                                            <Input id="company" placeholder={t?.form?.companyPlaceholder} className="h-12 pl-10" />
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">{t?.form?.email}</Label>
                                <div className="relative">
                                    <Mail className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
                                    <Input id="email" type="email" placeholder={t?.form?.emailPlaceholder} className="h-12 pl-10" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">{t?.form?.password}</Label>
                                <div className="relative">
                                    <Lock className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder={t?.form?.passwordPlaceholder}
                                        className="h-12 pr-10 pl-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                        title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
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
                                        <span className="text-muted-foreground">{t?.form?.remember}</span>
                                    </label>
                                    <Link href="#" className="text-secondary hover:underline">
                                        {t?.form?.forgotPassword}
                                    </Link>
                                </div>
                            )}

                            <Button type="submit" className="bg-secondary hover:bg-secondary/90 h-12 w-full text-lg">
                                {isLogin ? t?.form?.loginButton : t?.form?.registerButton}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm">
                            <span className="text-muted-foreground">
                                {isLogin ? t?.login?.promoter?.noAccount : t?.login?.promoter?.haveAccount}
                            </span>{" "}
                            <button onClick={() => setIsLogin(!isLogin)} className="text-secondary font-semibold hover:underline">
                                {isLogin ? t?.login?.promoter?.register : t?.login?.promoter?.login}
                            </button>
                        </div>

                        <div className="mt-6 border-t pt-6 text-center">
                            <p className="text-muted-foreground mb-4 text-sm">{t?.login?.promoter?.ownerQuestion}</p>
                            <Link href="/login/propietario">
                                <Button variant="outline" className="w-full bg-transparent">
                                    {t?.login?.promoter?.accessAsOwner}
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
