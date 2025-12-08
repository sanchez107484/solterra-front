# Guía de Configuración de Analytics

Este documento explica cómo está configurado el sistema de analytics en Solterra Advisory y cómo obtener las credenciales necesarias.

## 📊 Stack de Analytics

Solterra Advisory utiliza una combinación de herramientas para análisis completo:

1. **Google Analytics 4 (GA4)** - Métricas generales, conversiones, audiencia
2. **Microsoft Clarity** - Grabaciones de sesión, mapas de calor, análisis UX
3. **Vercel Analytics** - Métricas de rendimiento web (ya configurado)

## 🔧 Configuración Inicial

### 1. Google Analytics 4

#### Crear una cuenta de GA4:

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una cuenta nueva (o usa una existente)
3. Configura una propiedad para tu sitio web
4. En **Admin** → **Data Streams** → **Web**
5. Crea un nuevo stream web con la URL de tu sitio: `https://www.solterradvisory.com`
6. Copia el **Measurement ID** (formato: `G-XXXXXXXXXX`)

#### Configurar en el proyecto:

```bash
# Añade a tu archivo .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 2. Microsoft Clarity

#### Crear un proyecto en Clarity:

1. Ve a [Microsoft Clarity](https://clarity.microsoft.com/)
2. Regístrate con tu cuenta de Microsoft (gratis)
3. Crea un nuevo proyecto
4. Añade la URL de tu sitio: `https://www.solterradvisory.com`
5. En **Settings** → **Setup**, copia el **Project ID**

#### Configurar en el proyecto:

```bash
# Añade a tu archivo .env.local
NEXT_PUBLIC_CLARITY_PROJECT_ID=XXXXXXXXXX
```

## 📁 Estructura de Archivos

```
solterra-front/
├── components/
│   └── Analytics.tsx              # Componente principal que carga GA4 y Clarity
├── lib/
│   └── analytics.ts               # Funciones helper para tracking de eventos
├── app/
│   └── layout.tsx                 # Analytics montado aquí (global)
└── .env.local                     # Variables de entorno (no subir a git)
```

## 🎯 Eventos Rastreados

El sistema rastrea automáticamente los siguientes eventos:

### Eventos de Autenticación

- `sign_up` - Registro de nuevo usuario
- `login` - Login de usuario existente

### Eventos de Terrenos

- `terreno_created` - Cuando se crea un terreno nuevo
    - Incluye: tipo de suelo, superficie, provincia, municipio
- `terreno_updated` - Cuando se actualiza un terreno
- `terreno_deleted` - Cuando se elimina un terreno

### Eventos de Formularios

- `form_step` - Navegación entre pasos del wizard
    - Incluye: nombre del formulario, número de paso
- `form_error` - Errores de validación
    - Incluye: nombre del formulario, campo con error

### Eventos de Matches

- `match_created` - Cuando se crea un match terreno-proyecto
    - Incluye: IDs de terreno y proyecto, compatibilidad

### Eventos de UX

- `contact` - Cuando un usuario usa el formulario de contacto
- `search` - Búsquedas realizadas
- `language_change` - Cambio de idioma

## 🚀 Uso en el Código

### Importar funciones de tracking:

```typescript
import { trackTerrenoCreated, trackLogin, trackFormStep, trackEvent } from "@/lib/analytics"
```

### Ejemplos de uso:

```typescript
// Después de crear un terreno exitosamente
trackTerrenoCreated({
    tipoSuelo: "RUSTICO_COMUN",
    superficie: 50,
    provincia: "Madrid",
    municipio: "Alcalá de Henares",
})

// Después de login exitoso
trackLogin("email")

// En navegación de formulario
trackFormStep("nuevo-terreno", 2)

// Evento personalizado
trackEvent("custom_event_name", {
    custom_param: "value",
    another_param: 123,
})
```

## 📈 Visualización de Datos

### Google Analytics 4

1. Accede a [analytics.google.com](https://analytics.google.com/)
2. Selecciona tu propiedad
3. Ve a **Reports** para ver:
    - Usuarios en tiempo real
    - Datos demográficos
    - Comportamiento de usuarios
    - Conversiones y eventos
4. Usa **Explore** para crear reportes personalizados

### Microsoft Clarity

1. Accede a [clarity.microsoft.com](https://clarity.microsoft.com/)
2. Selecciona tu proyecto
3. Explora:
    - **Dashboard**: Métricas generales
    - **Recordings**: Grabaciones de sesiones reales
    - **Heatmaps**: Mapas de calor de clics y scroll
    - **Insights**: Análisis automático de frustración, clicks muertos, etc.

### Vercel Analytics

1. En tu [dashboard de Vercel](https://vercel.com/)
2. Selecciona el proyecto `solterra-front`
3. Ve a la pestaña **Analytics**
4. Visualiza:
    - Web Vitals (Core Web Vitals)
    - Tiempo de carga de páginas
    - Rendimiento por dispositivo/navegador

## 🔐 Seguridad y Privacidad

### Variables de entorno

- **NUNCA** subas `.env.local` a git
- Las variables `NEXT_PUBLIC_*` son visibles en el cliente
- Los IDs de GA4 y Clarity son seguros para exponer públicamente

### GDPR y Consentimiento

El proyecto incluye `CookieBanner` que gestiona el consentimiento:

- Los usuarios pueden aceptar o rechazar cookies de analytics
- Analytics solo se carga si el usuario da consentimiento
- Ver `components/cookie-banner.tsx` para la implementación

### Datos Personales

- No enviamos información personal identificable (PII) a analytics
- Los IDs de usuario/terreno son UUID, no contienen info personal
- Cumplimos con RGPD y normativa española

## 🧪 Testing en Desarrollo

Para probar analytics en desarrollo local:

1. Añade los IDs reales a tu `.env.local`
2. Ejecuta `npm run dev`
3. Abre las DevTools del navegador
4. Ve a la pestaña **Network**
5. Filtra por `google-analytics` y `clarity`
6. Realiza acciones (login, crear terreno, etc.)
7. Verás las peticiones HTTP con los eventos

También puedes instalar:

- [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger) para Chrome
- Usar `console.log` en `lib/analytics.ts` para debugging

## 📝 Mantenimiento

### Añadir nuevos eventos:

1. Añade una función helper en `lib/analytics.ts`:

```typescript
export function trackNewFeature(data: { param1: string }) {
    trackEvent("new_feature_used", {
        param_1: data.param1,
    })
}
```

2. Importa y usa en el componente correspondiente

### Actualizar configuración:

Si cambias de dominio o añades subdominios:

1. Actualiza los streams en GA4
2. Actualiza el proyecto en Clarity
3. No requiere cambios en el código

## 🆘 Troubleshooting

### "No veo datos en GA4"

- Verifica que `NEXT_PUBLIC_GA_MEASUREMENT_ID` esté configurado
- Comprueba que el formato sea `G-XXXXXXXXXX`
- GA4 puede tardar 24-48h en mostrar datos iniciales
- Usa el **Realtime** report para ver datos inmediatos

### "Clarity no graba sesiones"

- Verifica que `NEXT_PUBLIC_CLARITY_PROJECT_ID` esté configurado
- Comprueba en Network que el script de Clarity se carga
- Clarity puede tardar unos minutos en procesar grabaciones

### "Analytics no funciona en producción"

- Verifica que las variables estén configuradas en Vercel:
    - Dashboard → Settings → Environment Variables
    - Añade las mismas variables que en `.env.local`
    - Redeploy tras añadir variables

## 📚 Recursos Adicionales

- [Documentación oficial de GA4](https://developers.google.com/analytics/devguides/collection/ga4)
- [Documentación de Microsoft Clarity](https://learn.microsoft.com/en-us/clarity/)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [Eventos recomendados de GA4](https://support.google.com/analytics/answer/9267735)

---

**Última actualización**: Diciembre 2024
**Responsable**: Equipo de desarrollo Solterra Advisory
