# solterra-front

Plataforma Solterra Advisory - Frontend Next.js

## Componentes Reutilizables

### SeccionComoFunciona

Componente que muestra el proceso completo "Cómo funciona Solterra" con tres secciones (Propietarios, Promotores, Beneficios).

**Ubicación**: `components/landing/seccion-como-funciona.tsx`

**Props**:

- `showCTA?: boolean` - Mostrar botones CTA (default: true)
- `compactMode?: boolean` - Modo compacto con menos padding (default: false)

**Ejemplos de uso**:

- Página pública: `app/como-funciona/page.tsx`
- Dashboard propietario: `app/dashboard/propietario/ayuda/page.tsx`
- Dashboard promotor: `app/dashboard/promotor/ayuda/page.tsx`

Ver documentación completa en: `components/landing/README-SeccionComoFunciona.md`

### SeccionBeneficios

Componente que muestra los beneficios de la plataforma para propietarios y promotores.

**Ubicación**: `components/landing/seccion-beneficios.tsx`

```

```
