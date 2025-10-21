# Sistema de Autenticación - Solterra Advisory

## ✅ Implementación Completa

Se ha implementado un sistema completo de autenticación que conecta el frontend Next.js con el backend NestJS.

## 📁 Archivos Creados/Modificados

### Nuevos Archivos

1. **`services/auth.service.ts`**
    - Servicio de autenticación con métodos:
        - `register(payload)` - Registro de usuarios
        - `login(payload)` - Inicio de sesión
        - `getProfile()` - Obtener perfil del usuario autenticado
        - `saveToken()`, `getToken()`, `removeToken()` - Gestión de tokens
        - `logout()` - Cerrar sesión

2. **`components/protected-route.tsx`**
    - Componente HOC para proteger rutas
    - Verifica autenticación y rol del usuario
    - Redirecciona automáticamente si no autorizado
    - Muestra loading durante validación

### Archivos Modificados

1. **`contexts/AuthContext.tsx`**
    - Proveedor de contexto de autenticación mejorado
    - Gestión de estado global de autenticación
    - Funciones: `login()`, `register()`, `logout()`, `refreshUser()`
    - Carga automática del usuario al iniciar (si hay token válido)
    - Persistencia en localStorage

2. **`app/login/propietario/page.tsx`**
    - Conectado al backend
    - Formularios de login y registro funcionales
    - Validación de campos (email, password mínimo 6 caracteres)
    - Manejo de errores con notificaciones toast
    - Estado de carga durante peticiones

3. **`app/login/promotor/page.tsx`**
    - Igual que propietario pero con rol "PROMOTOR"
    - UI diferenciada (colores secondary)

4. **`app/layout.tsx`**
    - Añadido `<Toaster />` para notificaciones globales

5. **`app/dashboard/propietario/page.tsx`**
    - Protegido con `<ProtectedRoute requiredRole="PROPIETARIO">`
    - Solo accesible para usuarios con rol PROPIETARIO

6. **`app/dashboard/promotor/page.tsx`**
    - Protegido con `<ProtectedRoute requiredRole="PROMOTOR">`
    - Solo accesible para usuarios con rol PROMOTOR

## 🔐 Flujo de Autenticación

### Registro

```typescript
// Usuario completa formulario de registro
{
  email: "usuario@ejemplo.com",
  password: "contraseña123",
  nombre: "Juan",
  rol: "PROPIETARIO" // o "PROMOTOR"
}

// Backend responde con:
{
  user: { id, email, nombre, rol, ... },
  access_token: "jwt_token_aqui"
}

// Frontend:
// 1. Guarda token en localStorage
// 2. Actualiza contexto de auth
// 3. Redirige a dashboard correspondiente
```

### Login

```typescript
// Usuario completa formulario
{
    ;(email, password)
}

// Mismo flujo que registro (token guardado, contexto actualizado, redirección)
```

### Verificación Automática

```typescript
// Al cargar la app:
// 1. AuthProvider busca token en localStorage
// 2. Si existe, llama a /auth/profile
// 3. Si válido: actualiza auth.user
// 4. Si inválido: limpia token y marca como no autenticado
```

### Protección de Rutas

```tsx
// Ejemplo: dashboard de propietario
<ProtectedRoute requiredRole="PROPIETARIO" redirectTo="/login/propietario">
    {/* Contenido solo visible para propietarios autenticados */}
</ProtectedRoute>
```

## 🚀 Cómo Usar

### 1. Configurar Backend URL

En `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

O la URL de tu backend NestJS.

### 2. Usar el Hook de Auth en Componentes

```tsx
"use client"
import { useAuth } from "@/contexts/AuthContext"

export default function MiComponente() {
    const { auth, login, logout, register } = useAuth()

    if (auth.isLoading) return <p>Cargando...</p>

    if (!auth.isAuthenticated) {
        return <button onClick={() => login({ email, password })}>Login</button>
    }

    return (
        <div>
            <p>Hola {auth.user?.nombre}</p>
            <button onClick={logout}>Cerrar sesión</button>
        </div>
    )
}
```

### 3. Proteger Rutas

```tsx
// En cualquier página que requiera autenticación
import ProtectedRoute from "@/components/protected-route"

export default function PaginaProtegida() {
    return <ProtectedRoute requiredRole="PROMOTOR">{/* Contenido */}</ProtectedRoute>
}
```

### 4. Acceder a Datos del Usuario

```tsx
const { auth } = useAuth()

// Datos disponibles:
auth.user?.id
auth.user?.email
auth.user?.nombre
auth.user?.rol // "PROPIETARIO" | "PROMOTOR" | "ADMIN"
auth.user?.empresa
auth.token
auth.isAuthenticated
auth.isLoading
```

## 🔄 API del Backend (NestJS)

El frontend espera estos endpoints:

### POST `/auth/register`

```typescript
Body: {
  email: string
  password: string (min 6 caracteres)
  nombre?: string
  rol: "PROPIETARIO" | "PROMOTOR"
}

Response: {
  user: {
    id: string
    email: string
    nombre: string | null
    rol: "PROPIETARIO" | "PROMOTOR" | "ADMIN"
  }
  token: string  // ⚠️ El backend devuelve "token", no "access_token"
}
```

### POST `/auth/login`

```typescript
Body: {
    email: string
    password: string
}

Response: {
    user: {
        id: string
        email: string
        nombre: string | null
        rol: "PROPIETARIO" | "PROMOTOR" | "ADMIN"
    }
    token: string // ⚠️ El backend devuelve "token", no "access_token"
}
```

### GET `/auth/profile`

```typescript
Headers: {
    Authorization: "Bearer {token}"
}

Response: Usuario
```

## 🎨 Características UI

- ✅ Formularios de login y registro combinados (toggle)
- ✅ Validación HTML5 (email, minlength)
- ✅ Mostrar/ocultar contraseña
- ✅ Estados de carga (botones disabled durante peticiones)
- ✅ Notificaciones toast (éxito/error)
- ✅ Diseño responsive
- ✅ Diferenciación visual propietario (primary) vs promotor (secondary)

## 🛡️ Seguridad

- ✅ Tokens JWT en localStorage
- ✅ Headers Authorization automáticos (interceptor axios)
- ✅ Validación de rol en rutas protegidas
- ✅ Redirección automática si no autenticado
- ✅ Password mínimo 6 caracteres
- ✅ Validación de email

## 📝 Próximos Pasos Sugeridos

1. **Recuperación de contraseña**
    - Crear página `/forgot-password`
    - Endpoint en backend para reset

2. **Refresh tokens**
    - Implementar rotación de tokens
    - Renovación automática antes de expirar

3. **Perfil de usuario**
    - Página para editar datos personales
    - Cambio de contraseña

4. **Logout en todas las sesiones**
    - Backend: invalidar tokens por usuario
    - Frontend: limpiar storage

5. **Middleware de Next.js**
    - Protección a nivel de routing (middleware.ts)
    - Redirección server-side

## 🐛 Debugging

### El usuario no se redirige tras login

- Verifica que el backend responda con `access_token`
- Comprueba console.log en `AuthContext` (descomentar si es necesario)

### Token no se envía en peticiones

- Verifica que `lib/api/client.ts` tenga el interceptor
- Confirma que el token existe en localStorage: `localStorage.getItem('auth_token')`

### Rutas protegidas no funcionan

- Asegúrate de que `<AuthProvider>` envuelve toda la app en `layout.tsx`
- Verifica que `auth.user.rol` coincide con `requiredRole`

## 💡 Ejemplo Completo de Uso

```tsx
// app/mi-dashboard/page.tsx
"use client"
import ProtectedRoute from "@/components/protected-route"
import { useAuth } from "@/contexts/AuthContext"

export default function MiDashboard() {
    const { auth, logout } = useAuth()

    return (
        <ProtectedRoute>
            <div>
                <h1>Dashboard de {auth.user?.nombre}</h1>
                <p>Email: {auth.user?.email}</p>
                <p>Rol: {auth.user?.rol}</p>
                <button onClick={logout}>Cerrar Sesión</button>
            </div>
        </ProtectedRoute>
    )
}
```

---

**¿Necesitas ayuda?** Revisa los archivos mencionados arriba o consulta la documentación de NestJS Auth.
