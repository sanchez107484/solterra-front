# 🚀 Guía Paso a Paso: Despliegue Frontend en Vercel

## ✅ Pre-requisitos completados

- [x] Dependencias actualizadas y sin vulnerabilidades
- [x] Next.js 15.5.6 instalado
- [x] Build local exitoso
- [x] Linter ejecutado
- [x] Código formateado
- [x] Variables de entorno documentadas
- [x] Configuración de producción optimizada

---

## 📝 PASO 1: Subir código a GitHub

Si aún no has hecho push de tus cambios:

```powershell
cd 'c:\xampp\htdocs\Solterra Advisory\solterra-front'
git push origin main
```

---

## 🌐 PASO 2: Crear proyecto en Vercel

### 2.1. Acceder a Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub
3. Click en **"Add New"** → **"Project"**

### 2.2. Importar repositorio

1. Busca `solterra-front` en la lista de repositorios
2. Click en **"Import"**
3. Vercel detectará automáticamente que es un proyecto **Next.js**

### 2.3. Configurar el proyecto

```
Framework Preset: Next.js
Build Command: npm run build (detectado automáticamente)
Output Directory: .next (detectado automáticamente)
Install Command: npm install
```

**¡NO HAGAS DEPLOY TODAVÍA!** Primero configura las variables de entorno.

---

## 🔐 PASO 3: Configurar Variables de Entorno

Antes del primer deploy, añade las variables de entorno:

### 3.1. En la misma pantalla de configuración

Expande la sección **"Environment Variables"**

### 3.2. Añadir variables una por una

**Variable 1: API URL** (temporal - actualizaremos después de desplegar el backend)

```
Name:  NEXT_PUBLIC_API_URL
Value: http://localhost:8000/api/v1
Environment: Production, Preview, Development
```

**Variable 2: Node Environment**

```
Name:  NODE_ENV
Value: production
Environment: Production
```

> 💡 **Nota**: Después de desplegar el backend, volveremos aquí para actualizar `NEXT_PUBLIC_API_URL` con la URL real del backend en Vercel.

---

## 🎯 PASO 4: Primer Deploy

1. Click en **"Deploy"**
2. Espera 2-3 minutos (Vercel mostrará logs en tiempo real)
3. Vercel ejecutará:
    - `npm install`
    - `npm run build`
    - Deploy automático a CDN global

### 4.1. Verificar build exitoso

Deberías ver:

```
✓ Build Completed
✓ Deployment Ready
```

### 4.2. Obtener URL temporal

Vercel te asignará una URL temporal tipo:

```
https://solterra-front-xxxx.vercel.app
```

### 4.3. Probar la aplicación

1. Click en **"Visit"** o copia la URL
2. Verifica que la página principal carga
3. Intenta navegar por las secciones públicas (Nosotros, Contacto)

⚠️ **Login y Dashboard NO funcionarán aún** porque el backend no está desplegado.

---

## 🌍 PASO 5: Configurar Dominio Personalizado

### 5.1. Acceder a configuración de dominios

1. En el dashboard de tu proyecto en Vercel
2. Ve a **Settings** → **Domains**
3. Click en **"Add"**

### 5.2. Añadir dominio principal

```
Domain: www.solterradvisory.com
```

Click en **"Add"**

### 5.3. Añadir dominio sin www (redirect)

```
Domain: solterradvisory.com
```

Marca la opción: **"Redirect to www.solterradvisory.com"**

### 5.4. Configurar DNS

Vercel te mostrará los registros DNS que debes configurar en tu proveedor de dominio:

#### Para www.solterradvisory.com:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### Para solterradvisory.com (apex):

```
Type: A
Name: @
Value: 76.76.21.21
```

**O alternativamente (si tu proveedor soporta ALIAS/ANAME):**

```
Type: ALIAS
Name: @
Value: cname.vercel-dns.com
```

### 5.5. Esperar propagación DNS

- Vercel verificará automáticamente los registros DNS
- Puede tardar entre 5 minutos y 48 horas (usualmente 10-30 minutos)
- Vercel mostrará un ✅ cuando esté configurado correctamente

---

## ✅ PASO 6: Validación Final

### 6.1. Verificar HTTPS

1. Accede a `https://www.solterradvisory.com`
2. Verifica el candado SSL en la barra del navegador
3. Vercel proporciona certificados SSL automáticos

### 6.2. Verificar redirects

1. Prueba acceder a `http://solterradvisory.com` (sin www)
2. Debería redirigir a `https://www.solterradvisory.com`

### 6.3. Verificar páginas públicas

- ✅ Landing page (/)
- ✅ Nosotros (/nosotros)
- ✅ Contacto (/contacto)

### 6.4. Verificar build info

En el dashboard de Vercel → **Deployments**

- Commit hash correcto
- Build time
- Deployment status: Ready

---

## 🔄 PASO 7: Actualizar después de desplegar el backend

Una vez que despliegues el backend, deberás:

### 7.1. Actualizar NEXT_PUBLIC_API_URL

1. Ve a **Settings** → **Environment Variables**
2. Edita `NEXT_PUBLIC_API_URL`
3. Cambia el valor a: `https://solterra-backend.vercel.app/api/v1`
   (o la URL real de tu backend)
4. Marca **"Production"**, **"Preview"**, **"Development"**

### 7.2. Redeploy frontend

1. Ve a **Deployments**
2. Click en el último deployment
3. Click en **"⋯"** (tres puntos) → **"Redeploy"**
4. Confirma

O simplemente haz un nuevo commit:

```powershell
git commit --allow-empty -m "chore: redeploy after backend URL update"
git push origin main
```

---

## 📊 Monitoreo Post-Deploy

### Vercel Analytics (incluido gratis)

- Dashboard → Analytics
- Core Web Vitals
- Real User Monitoring
- Tráfico y rendimiento

### Logs en tiempo real

- Dashboard → Logs
- Ver requests, errores, warnings
- Filtrar por ruta, status code, etc.

### Sentry (opcional pero recomendado)

Si configuras Sentry:

1. Crea proyecto en [sentry.io](https://sentry.io)
2. Obtén tu DSN
3. Añade variable de entorno: `NEXT_PUBLIC_SENTRY_DSN`
4. Redeploy

---

## 🎉 ¡Listo!

Tu frontend está en producción. Próximos pasos:

1. **Desplegar Backend** (sigue la guía del backend)
2. **Actualizar NEXT_PUBLIC_API_URL** con la URL real del backend
3. **Probar login y funcionalidades completas**
4. **Configurar CI/CD** (opcional - Vercel ya tiene deploy automático por Git)
5. **Monitorear y optimizar**

---

## 🆘 Troubleshooting

### Error: "Build failed"

- Revisa los logs en Vercel
- Verifica que `npm run build` funcione en local
- Asegúrate de que todas las dependencias estén en `package.json`

### Error: "Module not found"

- Revisa imports con rutas absolutas/relativas
- Verifica case-sensitivity (Vercel es case-sensitive, Windows no)

### Páginas en blanco

- Abre DevTools Console (F12)
- Revisa errores de CORS o API
- Verifica que NEXT_PUBLIC_API_URL esté configurada

### Cambios no se reflejan

- Haz hard refresh: Ctrl+Shift+R
- Limpia caché del navegador
- Verifica que el deployment sea el más reciente en Vercel

---

**¿Necesitas ayuda?** Revisa la documentación de Vercel: https://vercel.com/docs
