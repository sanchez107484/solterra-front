# Guía Completa: Indexación en Google - Solterra Advisory

## 📋 Resumen de Acciones Completadas

### ✅ 1. Archivos SEO Creados
- **`app/sitemap.ts`**: Sitemap dinámico con todas las páginas públicas
- **`app/robots.ts`**: Archivo robots.txt que permite indexación y excluye dashboard/api
- **`components/seo/structured-data.tsx`**: JSON-LD Schema.org (ya existente)
- **Metadata completa**: Open Graph, Twitter Cards, canonical URLs (ya existente)

---

## 🚀 Pasos para Indexar en Google

### **Paso 1: Verificar que el Sitemap y Robots Funcionen** ✅ (Hazlo Ahora)

Una vez que Vercel despliegue los cambios (2-3 minutos), verifica:

1. **Sitemap XML:**
   ```
   https://www.solterradvisory.com/sitemap.xml
   ```
   Deberías ver un XML con todas las URLs de tu sitio.

2. **Robots.txt:**
   ```
   https://www.solterradvisory.com/robots.txt
   ```
   Deberías ver las directivas que permiten indexación y el sitemap.

---

### **Paso 2: Registrar en Google Search Console** (5-10 minutos)

#### A) Acceder a Search Console
1. Ve a: https://search.google.com/search-console
2. Inicia sesión con tu cuenta de Google (usa una cuenta corporativa si es posible)

#### B) Añadir Propiedad
1. Click en **"Añadir propiedad"**
2. Selecciona **"Prefijo de URL"**: `https://www.solterradvisory.com`
3. Click en **"Continuar"**

#### C) Verificar Propiedad (Método HTML Tag - Recomendado)
Google te dará varias opciones. **Método recomendado: Meta Tag HTML**

1. Google te mostrará un código como:
   ```html
   <meta name="google-site-verification" content="XXXXXXXXXXXXXX" />
   ```

2. **Dime ese código** y yo lo añadiré al `<head>` de tu `app/layout.tsx`

3. Esperamos 2-3 minutos a que Vercel despliegue

4. Vuelves a Search Console y haces click en **"Verificar"**

---

### **Paso 3: Enviar Sitemap a Google Search Console** (2 minutos)

Una vez verificada la propiedad:

1. En el menú lateral izquierdo → **"Sitemaps"**
2. En el campo "Añadir un sitemap nuevo" escribe: `sitemap.xml`
3. Click en **"Enviar"**
4. Verás el estado: **"Correcto"** (puede tardar unos minutos)

---

### **Paso 4: Solicitar Indexación Manual de Páginas Clave** (5 minutos)

Google indexará automáticamente, pero puedes acelerarlo:

1. En Search Console → **"Inspección de URLs"** (arriba)
2. Introduce cada URL clave y solicita indexación:
   - `https://www.solterradvisory.com/`
   - `https://www.solterradvisory.com/nosotros`
   - `https://www.solterradvisory.com/contacto`
   - `https://www.solterradvisory.com/login/propietario`
   - `https://www.solterradvisory.com/login/promotor`

3. Para cada una:
   - Click en **"Solicitar indexación"**
   - Espera 1-2 minutos (Google comprobará la URL)
   - Confirma

---

### **Paso 5: Configurar Google Analytics 4 (Opcional pero Recomendado)** (10 minutos)

#### A) Crear Propiedad en Google Analytics
1. Ve a: https://analytics.google.com
2. **Admin** (icono engranaje abajo-izquierda) → **"Crear propiedad"**
3. Nombre: `Solterra Advisory`
4. Zona horaria: `España`
5. Moneda: `EUR`
6. Click en **"Siguiente"** → Configura sector (Real Estate / Tecnología)

#### B) Obtener ID de Medición
1. Tras crear la propiedad, ve a **"Flujos de datos"**
2. Click en **"Añadir flujo" → "Web"**
3. URL: `https://www.solterradvisory.com`
4. Nombre del flujo: `Solterra Advisory - Web`
5. Click en **"Crear flujo"**
6. **Copia el "ID de medición"** (formato: `G-XXXXXXXXXX`)

#### C) Añadir ID a Vercel
1. Ve a Vercel → Tu proyecto → **Settings → Environment Variables**
2. Añade:
   - **Key:** `NEXT_PUBLIC_GA_ID`
   - **Value:** `G-XXXXXXXXXX` (el ID que copiaste)
   - **Environments:** Production, Preview, Development
3. Guarda y redeploy

#### D) Integrar en el Código (Yo lo hago)
**Dime el ID de GA4** y yo añadiré el script de tracking a tu sitio.

---

### **Paso 6: Verificar SEO On-Page** ✅ (Ya Completado)

Verificación de elementos críticos:

- ✅ **Title tag optimizado:** "Solterra Advisory - Conectamos terrenos con energía renovable"
- ✅ **Meta description:** 150-160 caracteres con keywords
- ✅ **H1 único:** Solo en hero section de cada página
- ✅ **H2-H6 jerarquizados:** Estructura semántica correcta
- ✅ **Open Graph tags:** Para redes sociales (LinkedIn, Twitter)
- ✅ **Schema.org JSON-LD:** Organization, Service, WebSite schemas
- ✅ **Canonical URLs:** Para evitar contenido duplicado
- ✅ **Responsive design:** Mobile-friendly
- ✅ **HTTPS:** SSL configurado (Vercel)
- ✅ **Core Web Vitals:** Next.js optimizado por defecto

---

## 📊 Monitoreo y Seguimiento (Después de 3-7 Días)

### En Google Search Console:
1. **Rendimiento:** Clicks, impresiones, CTR, posición media
2. **Cobertura:** Páginas indexadas vs. excluidas
3. **Mejoras:** Core Web Vitals, usabilidad móvil
4. **Enlaces:** Backlinks internos y externos

### KPIs a Monitorizar:
- **Páginas indexadas:** Objetivo: 8-10 páginas en 7 días
- **Posición media:** Keywords objetivo (energía renovable, terrenos solares, etc.)
- **CTR:** Objetivo: > 2% en los primeros 30 días
- **Impresiones:** Crecimiento semanal

---

## 🎯 Optimizaciones Adicionales (Futuras)

### A) Contenido (Blog/Noticias)
Crear sección de blog con artículos sobre:
- Energía renovable en España
- Rentabilidad de terrenos fotovoltaicos
- PNIEC y objetivos 2030
- Guías para propietarios y promotores

### B) Link Building
- Directorios de empresas: Google My Business, Yelp, LinkedIn Company
- Asociaciones del sector: UNEF, APPA Renovables
- Prensa especializada: colaboraciones/menciones

### C) Local SEO
Si tenéis oficina física:
- Google My Business (Google Maps)
- Schema LocalBusiness
- NAP consistency (Name, Address, Phone)

---

## 📝 Checklist Final

Marca cuando completes cada paso:

- [ ] Verificar sitemap.xml accesible en producción
- [ ] Verificar robots.txt accesible en producción
- [ ] Registrar en Google Search Console
- [ ] Verificar propiedad con meta tag
- [ ] Enviar sitemap.xml a Search Console
- [ ] Solicitar indexación manual de homepage
- [ ] Solicitar indexación de 4-5 páginas clave
- [ ] (Opcional) Configurar Google Analytics 4
- [ ] Esperar 3-7 días y revisar "Cobertura" en Search Console
- [ ] Monitorizar keywords en "Rendimiento"

---

## 🆘 Problemas Comunes y Soluciones

### Problema: "URL no indexada"
**Solución:** Espera 7-14 días. Google puede tardar. Solicita indexación manual.

### Problema: "Sitemap no se puede leer"
**Solución:** Verifica que `sitemap.xml` devuelve XML válido (no HTML con error).

### Problema: "Página excluida por robots.txt"
**Solución:** Revisa `robots.txt` y asegura que no bloqueé URLs públicas.

### Problema: "Contenido duplicado"
**Solución:** Asegura canonical URLs correctos (ya implementados).

---

## 📞 Siguiente Acción

**Dime:**
1. ¿Has verificado que `sitemap.xml` y `robots.txt` funcionan en producción?
2. ¿Tienes el código de verificación de Google Search Console? (Te lo añado al sitio)
3. ¿Quieres configurar Google Analytics 4? (Dame el ID de medición)

Cuando me confirmes, continúo con los siguientes pasos.
