CHANGELOG - Cambios del 2025-10-16

Resumen breve

- Se aplicó la paleta nueva (secondary ámbar profesional: #D19A12) y se unificaron tokens de color en app/globals.css y styles/globals.css.
- Se corrigieron problemas de contraste/foreground en componentes que mostraban texto sobre bg-secondary/\* (reemplazos a text-secondary-foreground).
- Se solucionaron problemas de accesibilidad detectados por pa11y (H91, NoTitleEl, labels faltantes) y se verificó localmente con pa11y.

Archivos principales modificados

- app/globals.css — tokens globales (secondary unificado, dark override).
- styles/globals.css — tokens espejo y limpieza de colores antiguos.
- components/ui/button.tsx, components/ui/badge.tsx — variantes secondary ajustadas para mejor contraste y focus.
- components/landing-pro/footer-section.tsx — aria-label añadidos a enlaces sociales.
- components/sidebar.tsx — aria-label dinámico en botón menú móvil.
- app/login/promotor/page.tsx — aria-label/title en botón mostrar/ocultar contraseña.
- app/como-funciona/page.tsx, app/nosotros/page.tsx — añadido Head/title.
- components/data-table-proyectos.tsx, components/data-table-terrenos.tsx — aria-label en inputs de búsqueda.

Verificación realizada

- Se arrancó el servidor de desarrollo (npm run dev) y se ejecutó pa11y contra rutas críticas: /, /login/promotor, /como-funciona, /nosotros, /dashboard/promotor.
- Los ficheros de salida de pa11y generados durante la verificación están en la raíz del repo como pa11y-\*.json y pa11y-home.html.
- Resultado: las ejecuciones de pa11y para las rutas listadas devolvieron un array vacío (sin errores WCAG2AA detectados en estas comprobaciones tras los parches).

Cómo reproducir localmente (PowerShell)

1. Arrancar servidor dev:
   npm run dev
2. En otra PowerShell, esperar la URL y ejecutar pa11y (ejemplo):
   npx wait-on http://localhost:3000/
   npx pa11y http://localhost:3000/ --standard WCAG2AA --reporter json > .\pa11y-home.json
   npx pa11y http://localhost:3000/login/promotor --standard WCAG2AA --reporter json > .\pa11y-login-promotor.json
   npx pa11y http://localhost:3000/como-funciona --standard WCAG2AA --reporter json > .\pa11y-como-funciona.json
   npx pa11y http://localhost:3000/nosotros --standard WCAG2AA --reporter json > .\pa11y-nosotros.json
   npx pa11y http://localhost:3000/dashboard/promotor --standard WCAG2AA --reporter json > .\pa11y-dashboard-promotor.json

Notas y siguiente pasos recomendados

- Revisar manualmente las páginas y componentes en distintos navegadores y tamaños. Pa11y cubre muchas reglas, pero una revisión visual ayuda a detectar problemas contextuales.
- Añadir un job de CI (GitHub Actions) con pa11y/axe para prevenir regresiones en PRs. Puedo crear el workflow si quieres.

-- Cambios aplicados el 2025-10-16
