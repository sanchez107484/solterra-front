# Sistema de Servicios y API - Documentación

Este documento explica cómo usar el sistema de servicios profesional creado para conectar el frontend con el backend de manera segura y eficiente.

## Estructura del Sistema

### 1. Cliente API (`lib/api/client.ts`)

- **Configuración centralizada** de axios con interceptores
- **Manejo automático de tokens** JWT
- **Refresh automático** de tokens expirados
- **Timeout y error handling** configurables
- **Logging** para desarrollo

### 2. Tipos de API (`types/api.types.ts`)

- **Respuestas tipadas** para todas las APIs
- **Paginación estandarizada**
- **Filtros específicos** por dominio
- **Manejo de errores** tipado

### 3. Servicios Base

- **`services/proyectos.service.ts`**: CRUD completo de proyectos
- **`services/terrenos.service.ts`**: CRUD completo de terrenos
- **`services/index.ts`**: Servicios con manejo automático de errores

### 4. Hooks Mejorados

- **`hooks/useProyectos.ts`**: Hook para proyectos con estado completo
- **`hooks/useTerrenos.ts`**: Hook para terrenos con estado completo
- **`hooks/useAppData.ts`**: Hook para datos de catálogo y utilidades

### 5. Manejo de Errores

- **`lib/error-handler.ts`**: Sistema centralizado de manejo de errores
- **Notificaciones automáticas** con toast
- **Mensajes user-friendly** basados en códigos de estado

## Cómo Usar

### Uso Básico - Servicios Directos

```typescript
import { proyectosService, terrenosService } from "@/services"

// Crear un proyecto
const nuevoProyecto = await proyectosService.create({
    titulo: "Proyecto Solar",
    tipo: "SOLAR_FOTOVOLTAICO",
    superficieMinima: 10,
    // ... otros campos
})

// Obtener terrenos con filtros
const terrenos = await terrenosService.getAll({
    provincia: "Madrid",
    tipoSuelo: "RUSTICO_COMUN",
    superficieMin: 5,
    page: 1,
    perPage: 20,
})
```

### Uso con Manejo Automático de Errores

```typescript
import { proyectosServiceWithHandling, terrenosServiceWithHandling } from "@/services"

// Los errores se muestran automáticamente con toast
// Los éxitos también se notifican automáticamente
const proyecto = await proyectosServiceWithHandling.create(data)
```

### Uso con Hooks (Recomendado)

```typescript
import { useProyectos, useTerrenos } from "@/hooks"

function ProyectosPage() {
    // Hook básico (manejo manual de errores)
    const { proyectos, pagination, isLoading, error, createProyecto, updateProyecto, deleteProyecto, searchProyectos } = useProyectos({
        autoFetch: true,
        filters: { estado: "ACTIVO" },
    })

    // Hook con manejo automático de errores
    const { terrenos, createTerreno } = useTerrenos({
        withErrorHandling: true,
        filters: { provincia: "Madrid" },
    })

    const handleCreate = async (data) => {
        try {
            await createProyecto(data)
            // Éxito - el hook actualiza automáticamente la lista
        } catch (error) {
            // Error - ya está manejado si usas withErrorHandling: true
        }
    }
}
```

### Datos de Catálogo y Utilidades

```typescript
import { useAppData, useDomainConstants, useFormatters } from "@/hooks/useAppData"

function FormComponent() {
    const {
        provincias,
        loadProvincias,
        loadMunicipios,
        validateCoordinates
    } = useAppData()

    const { tiposSueloLabels, disponibilidadLabels } = useDomainConstants()
    const { formatCurrency, formatArea } = useFormatters()

    useEffect(() => {
        loadProvincias()
    }, [])

    return (
        <select>
            {provincias.map(provincia => (
                <option key={provincia} value={provincia}>
                    {provincia}
                </option>
            ))}
        </select>
    )
}
```

### Manejo Manual de Errores

```typescript
import { useErrorHandler } from "@/lib/error-handler"

function MyComponent() {
    const { handleError, showSuccess, showWarning } = useErrorHandler()

    const handleAction = async () => {
        try {
            const result = await proyectosService.create(data)
            showSuccess("Proyecto creado exitosamente")
        } catch (error) {
            handleError(error, "Error personalizado al crear proyecto")
        }
    }
}
```

## Funcionalidades Avanzadas

### 1. Búsqueda y Filtros

```typescript
// Búsqueda por texto
const resultados = await proyectosService.search("solar", {
    tipo: "SOLAR_FOTOVOLTAICO",
    provincia: "Madrid",
})

// Búsqueda por ubicación (terrenos)
const terrenosCercanos = await terrenosService.searchByLocation(
    40.4168, // latitud
    -3.7038, // longitud
    50, // radio en km
    { tipoSuelo: "RUSTICO_COMUN" }
)
```

### 2. Operaciones en Lote

```typescript
// Eliminar múltiples proyectos
const resultado = await proyectosService.bulkDelete(["id1", "id2", "id3"])

// Actualizar múltiples terrenos
const resultado = await terrenosService.bulkUpdate(["id1", "id2"], { estado: "ACTIVO" })
```

### 3. Validaciones Geográficas

```typescript
// Validar coordenadas
const validacion = await terrenosService.validateCoordinates(40.4168, -3.7038)

// Calcular distancia a red eléctrica
const distancia = await terrenosService.calculateDistanceToGrid(40.4168, -3.7038)

// Calcular potencial renovable
const potencial = await terrenosService.calculateRenewablePotential(40.4168, -3.7038)
```

### 4. Estadísticas y Analytics

```typescript
// Estadísticas de proyectos
const statsProyectos = await proyectosService.getStats()
// { total, porTipo, porEstado }

// Estadísticas de terrenos
const statsTerrenos = await terrenosService.getStats()
// { total, porTipoSuelo, porEstado, superficieTotal, precioPromedio }
```

## Configuración

### Variables de Entorno

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### Configuración del Cliente API

El cliente está preconfigurado pero puedes modificar:

```typescript
// lib/api/client.ts
const api = axios.create({
    baseURL: API_URL,
    timeout: 30000, // 30 segundos
    withCredentials: true,
})
```

## Mejores Prácticas

### 1. Usar Hooks con Error Handling

```typescript
// ✅ Recomendado
const { proyectos } = useProyectos({ withErrorHandling: true })

// ❌ Evitar (manejo manual innecesario)
const { proyectos, error } = useProyectos()
```

### 2. Filtros Tipados

```typescript
// ✅ Tipado fuerte
const filtros: TerrenoFilters = {
    provincia: "Madrid",
    superficieMin: 10,
    tipoSuelo: TipoSuelo.RUSTICO_COMUN,
}

// ❌ Sin tipos
const filtros = { provincia: "madrid", superficie: "10" }
```

### 3. Paginación Consistente

```typescript
// ✅ Usar objeto pagination del hook
const { pagination, terrenos } = useTerrenos()
console.log(`Página ${pagination.page} de ${pagination.totalPages}`)

// ❌ Usar total legacy
const { total } = useTerrenos() // Mantiene compatibilidad pero no es ideal
```

### 4. Manejo de Estados de Carga

```typescript
function ListComponent() {
    const { terrenos, isLoading, error } = useTerrenos()

    if (isLoading) return <LoadingSpinner />
    if (error) return <ErrorMessage error={error} />

    return (
        <div>
            {terrenos.map(terreno => (
                <TerrenoCard key={terreno.id} terreno={terreno} />
            ))}
        </div>
    )
}
```

## Extensibilidad

El sistema está diseñado para ser fácilmente extensible:

1. **Agregar nuevos servicios**: Crear en `services/` siguiendo el patrón
2. **Nuevos hooks**: Usar `useAppData.ts` como base
3. **Filtros personalizados**: Extender tipos en `api.types.ts`
4. **Validaciones**: Agregar en servicios correspondientes

## Seguridad

- **Tokens JWT** manejados automáticamente
- **Refresh automático** de tokens
- **Timeout** para prevenir requests colgados
- **Validación de tipos** en compile-time
- **Sanitización** de errores antes de mostrar al usuario
