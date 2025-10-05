"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap, Mail, Lock, ArrowLeft, Eye, EyeOff, Building2 } from "lucide-react"
import Link from "next/link"

export default function LoginPromotor() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary via-secondary/90 to-secondary/80 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]" />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 text-secondary-foreground">
            <div className="rounded-xl bg-secondary-foreground/20 p-2.5 backdrop-blur-sm">
              <Zap className="h-8 w-8" />
            </div>
            <div>
              <span className="text-2xl font-bold">Solterra</span>
              <p className="text-sm opacity-90">Advisory</p>
            </div>
          </Link>
        </div>

        <div className="relative z-10 space-y-6 text-secondary-foreground">
          <h1 className="text-5xl font-bold leading-tight">Encuentra terrenos ideales para tus proyectos</h1>
          <p className="text-xl opacity-90">
            Accede a una red de terrenos verificados y conecta directamente con propietarios interesados en energía
            renovable.
          </p>
          <div className="flex gap-8 pt-8">
            <div>
              <div className="text-4xl font-bold">300+</div>
              <div className="text-sm opacity-80">Promotores activos</div>
            </div>
            <div>
              <div className="text-4xl font-bold">150MW</div>
              <div className="text-sm opacity-80">En desarrollo</div>
            </div>
            <div>
              <div className="text-4xl font-bold">95%</div>
              <div className="text-sm opacity-80">Match exitoso</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-secondary-foreground/80">
          © 2025 Solterra Advisory. Todos los derechos reservados.
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>

          <Card className="p-8 shadow-xl border-2">
            <div className="mb-8 text-center">
              <div className="inline-flex rounded-2xl bg-secondary/10 p-4 mb-4">
                <Zap className="h-10 w-10 text-secondary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {isLogin ? "Bienvenido de nuevo" : "Crear cuenta"}
              </h2>
              <p className="text-muted-foreground">
                {isLogin ? "Accede a tu cuenta de promotor" : "Regístrate como promotor de proyectos"}
              </p>
            </div>

            <form className="space-y-6">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input id="name" placeholder="María García" className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input id="company" placeholder="Energías Renovables S.L." className="h-12 pl-10" />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="tu@empresa.com" className="h-12 pl-10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-input" />
                    <span className="text-muted-foreground">Recordarme</span>
                  </label>
                  <Link href="#" className="text-secondary hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              )}

              <Button className="w-full h-12 bg-secondary hover:bg-secondary/90 text-lg">
                {isLogin ? "Iniciar sesión" : "Crear cuenta"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">{isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}</span>{" "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-secondary font-semibold hover:underline">
                {isLogin ? "Regístrate" : "Inicia sesión"}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-sm text-muted-foreground mb-4">¿Eres propietario de terreno?</p>
              <Link href="/login/propietario">
                <Button variant="outline" className="w-full bg-transparent">
                  Acceder como propietario
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
