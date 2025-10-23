# Layout de Promotor - Documentación

## Estructura Implementada

### 📁 Archivos Creados/Modificados

1. **`components/dashboard/promotor-sidebar.tsx`** - Sidebar específico para promotores
2. **`app/dashboard/promotor/layout.tsx`** - Layout principal de la sección promotor
3. **`app/dashboard/promotor/page.tsx`** - Página principal simplificada

### 🏗️ Arquitectura del Layout

```
/dashboard/promotor/ (Layout Root)
├── layout.tsx (PromotorLayout)
│   ├── PromotorSidebar (Fixed Left)
│   └── Main Content Area (ml-64)
│       └── {children} (Páginas específicas)
└── Páginas:
    ├── page.tsx (Dashboard principal)
    ├── mis-proyectos/page.tsx
    ├── nuevo-proyecto/page.tsx
    └── todos-terrenos/page.tsx
```

### 🎨 Características del Layout

#### **PromotorSidebar**

- **Posición**: Fixed (z-40, w-64)
- **Navegación**:
    - Dashboard principal
    - Mis Proyectos
    - Nuevo Proyecto
    - Todos Terrenos
- **Secciones**:
    - Logo y branding
    - Navegación principal
    - Enlaces de usuario (Perfil, Configuración, Logout)

#### **Layout Container**

- **Flexbox**: `flex min-h-screen bg-background`
- **Main Content**: `flex-1 ml-64 min-h-screen`
- **Responsivo**: Margen izquierdo para sidebar fijo

### 🔄 Ventajas de la Implementación

1. **Consistencia**: Sidebar uniforme en todas las páginas de promotor
2. **Separación de responsabilidades**: Layout vs. contenido específico
3. **Mantenibilidad**: Cambios globales en un solo lugar
4. **Performance**: Sidebar se monta una sola vez
5. **UX**: Navegación persistente y familiar

### 📋 Páginas Incluidas

#### **Dashboard Principal** (`/dashboard/promotor`)

- Estadísticas de proyectos
- Vista general con métricas
- Header con botón "Nuevo Proyecto"

#### **Mis Proyectos** (`/dashboard/promotor/mis-proyectos`)

- CRUD completo de proyectos
- Filtros y búsqueda avanzada
- Modal de creación/edición

#### **Nuevo Proyecto** (`/dashboard/promotor/nuevo-proyecto`)

- Formulario de creación paso a paso
- Validaciones completas

#### **Todos Terrenos** (`/dashboard/promotor/todos-terrenos`)

- Vista de terrenos disponibles
- Filtros por ubicación, precio, superficie
- Acciones de contacto

### 🛡️ Protección de Rutas

Todas las páginas mantienen:

```tsx
<ProtectedRoute requiredRole="PROMOTOR" redirectTo="/login/promotor">
```

### 🎯 Próximos Pasos

- [ ] Implementar layout similar para propietarios
- [ ] Añadir modo responsive para móviles
- [ ] Implementar breadcrumbs
- [ ] Añadir notificaciones globales en el layout
