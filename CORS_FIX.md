# 🚨 Solución Error CORS - Register/Login

## Problema Identificado

El error `Cannot OPTIONS /api/v1/auth/register` indica que:

1. **CORS no está configurado** en el backend NestJS
2. El navegador hace una petición **OPTIONS** (preflight) antes del POST real
3. El backend rechaza esta petición OPTIONS, impidiendo que se ejecute el POST

## ✅ Solución en el Backend (NestJS)

### Opción 1: Configurar CORS en `main.ts` (Recomendado)

Edita el archivo `src/main.ts` de tu backend:

```typescript
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    // Configurar prefijo global (si lo usas)
    app.setGlobalPrefix("api/v1")

    // ⭐ HABILITAR CORS
    app.enableCors({
        origin: [
            "http://localhost:3000", // Next.js dev
            "http://localhost:3001", // Alternativo
            "http://192.168.x.x:3000", // Tu IP local si trabajas desde otro dispositivo
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
        exposedHeaders: ["Authorization"],
        maxAge: 3600, // Cache de preflight 1 hora
    })

    await app.listen(8000)
    console.log(`🚀 Backend corriendo en http://localhost:8000`)
}
bootstrap()
```

### Opción 2: CORS en `app.module.ts`

Si prefieres configurarlo a nivel de módulo:

```typescript
import { Module } from "@nestjs/common"
import { APP_GUARD } from "@nestjs/core"

@Module({
    imports: [
        // ... tus otros módulos
    ],
    providers: [
        {
            provide: APP_GUARD,
            useFactory: () => {
                return {
                    canActivate: (context) => {
                        const req = context.switchToHttp().getRequest()
                        const res = context.switchToHttp().getResponse()

                        // Configurar headers CORS manualmente
                        res.header("Access-Control-Allow-Origin", req.headers.origin || "*")
                        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS")
                        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept")
                        res.header("Access-Control-Allow-Credentials", "true")

                        // Si es OPTIONS, responder inmediatamente
                        if (req.method === "OPTIONS") {
                            res.status(200).send()
                            return false
                        }

                        return true
                    },
                }
            },
        },
    ],
})
export class AppModule {}
```

### Opción 3: Middleware personalizado

Crea `src/middleware/cors.middleware.ts`:

```typescript
import { Injectable, NestMiddleware } from "@nestjs/common"
import { Request, Response, NextFunction } from "express"

@Injectable()
export class CorsMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"]

        const origin = req.headers.origin

        if (origin && allowedOrigins.includes(origin)) {
            res.header("Access-Control-Allow-Origin", origin)
        }

        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS")
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept")
        res.header("Access-Control-Allow-Credentials", "true")

        if (req.method === "OPTIONS") {
            return res.status(200).send()
        }

        next()
    }
}
```

Y aplícalo en `app.module.ts`:

```typescript
import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common"
import { CorsMiddleware } from "./middleware/cors.middleware"

@Module({
    // ...
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CorsMiddleware).forRoutes("*")
    }
}
```

## ✅ Solución en el Frontend (Ya aplicada)

El frontend ya ha sido actualizado con:

### 1. `lib/api/client.ts`

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // ✅ Para CORS con credenciales
})
```

### 2. `.env.local`

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

## 🔍 Verificar que funciona

### Paso 1: Reinicia el backend

```bash
cd solterra-backend
npm run start:dev
```

### Paso 2: Reinicia el frontend

```bash
cd solterra-front
npm run dev
```

### Paso 3: Prueba el registro

1. Ve a `http://localhost:3000/login/propietario`
2. Haz clic en "Registrarse"
3. Completa el formulario
4. Envía

### Paso 4: Verifica en DevTools (F12)

#### Network Tab:

Deberías ver **2 peticiones** (esto es normal):

1. **OPTIONS** `/api/v1/auth/register` → Status 200 (preflight CORS)
2. **POST** `/api/v1/auth/register` → Status 201 o 200 (registro exitoso)

Si ves:

- ❌ OPTIONS → 404: CORS no configurado
- ✅ OPTIONS → 200 + POST → 201: Todo OK

#### Console Tab:

- ❌ Error CORS: Backend necesita configuración
- ✅ Sin errores CORS: Funciona correctamente

## 🐛 Debugging Adicional

### Ver qué envía el frontend:

En `app/login/propietario/page.tsx`, añade temporalmente:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    console.log('📤 Enviando registro:', {
        email: formData.email,
        nombre: formData.nombre,
        rol: 'PROPIETARIO'
    })

    try {
        // ... resto del código
    }
}
```

### Ver qué recibe el backend:

En `auth.controller.ts`:

```typescript
@Post('register')
async register(@Body() registerDto: RegisterDto) {
    console.log('📥 Registro recibido:', registerDto);
    return this.authService.register(registerDto);
}
```

## 📋 Checklist

- [ ] CORS habilitado en `main.ts` del backend
- [ ] Backend reiniciado tras cambios
- [ ] `.env.local` con URL correcta en frontend
- [ ] Frontend reiniciado tras cambios
- [ ] Prueba registro desde navegador
- [ ] Verificar en DevTools: OPTIONS 200 + POST 201

## 🎯 Resultado Esperado

Tras aplicar la configuración CORS, deberías ver:

```
Network Tab (DevTools):
┌─────────────────────────────────────┐
│ OPTIONS /api/v1/auth/register  200  │ ✅ Preflight OK
│ POST    /api/v1/auth/register  201  │ ✅ Registro OK
└─────────────────────────────────────┘

Console:
✅ ¡Cuenta creada!
✅ Redirigiendo a dashboard...
```

---

**¿Sigue sin funcionar?** Verifica:

1. Puerto correcto del backend (8000)
2. Prefijo `/api/v1` en el backend
3. No hay firewall bloqueando localhost
4. Navegador sin extensiones que bloqueen CORS
