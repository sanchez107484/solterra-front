## Solterra Front — Quick guidance for AI coding agents

This file contains concise, actionable guidance to help AI agents be productive in this Next.js + TypeScript + Tailwind project.

Nota de idioma: responder siempre en castellano (español) a menos que se indique lo contrario.

1. Project overview

- Framework: Next.js 15 (app router), React 19, TypeScript. TailwindCSS for styles and utility-first classes.
- Primary responsibilities: static pages in `app/`, reusable UI primitives in `components/` and `components/ui/`, and lightweight client hooks in `hooks/`.

2. Key architectural patterns (what to read first)

- App layout and providers: `app/layout.tsx` mounts global providers. Look here to add global context (i18n, analytics, fonts).
- i18n: `i18n/config.ts`, `i18n/index.ts`, `i18n/i18nContext.tsx`, and `lib/i18n.ts` handle locale loading. Strings live in `i18n/locales/{es,en}.ts` and are imported dynamically.
- UI primitives: `components/ui/*` contains Radix-based components (toast, dialog, popover, etc.). These components expose small typed APIs and are used throughout `components/` and `app/` pages.
- Toaster / Toast system: two pieces — the low-level Radix component in `components/ui/toast.tsx` and the in-memory API in `components/ui/use-toast.ts` (also `hooks/use-toast.ts`). When adding notifications, use `toast()` from the hook and ensure `<Toaster />` is mounted (search for `Toaster` usage in `app` or `layout`).

3. Conventions & patterns to follow

- "use client" at top of client-only files (hooks and interactive UI components). Keep server components free of client-only imports (no hooks, no browser APIs).
- Styling: use Tailwind utility classes and the `cn()` helper in `lib/utils.ts` to merge class names. Prefer `class-variance-authority` (cva) variants for complex component styles (see `components/ui/toast.tsx`).
- Icons: use `lucide-react` icons (import individual icons). Avoid large icon bundles.
- Component exports: UI primitives export both types and components (e.g., `ToastProps`, `ToastActionElement`). Reuse exported types when integrating.

4. Developer workflows (commands)

- Local dev: npm/pnpm/yarn may be used, but package.json scripts assume Next.js commands. Run the dev server from repo root:
    - npm: `npm run dev`
    - build: `npm run build` and `npm run start` for production.
- Linting & formatting: `npm run lint`, `npm run lint:fix`, `npm run format` and `npm run format:check` (Prettier + ESLint).

5. Integration points and external deps

- Next Themes: `components/theme-provider.tsx` uses `next-themes` for client-side theme switching.
- Radix UI: many UI primitives are thin wrappers around `@radix-ui/*` (see `components/ui/*`). Keep accessibility attributes and radix props intact when refactoring.
- Vercel Analytics: mounted in `app/layout.tsx` (remove only if replacing analytics provider).

6. Tests & build notes

- There are no test scripts in package.json. Keep code small and well-typed. If you add tests, prefer Jest or Vitest and update package.json scripts.
- Next.js 15 and React 19 expect Node versions compatible with those releases. If you add server-side features, ensure Node and Next.js compatibility.

7. Safe editing rules for AI patches

- When modifying components under `components/ui/`, preserve exported type names (e.g., `ToastProps`, `ToastActionElement`) and Radix prop passthrough.
- Avoid moving or renaming locale keys without updating `i18n/locales/*` and `i18n/index.ts` imports.
- When adding global providers, prefer editing `app/layout.tsx` so the change applies uniformly.

8. Examples to reference

- Mounting toast: `components/ui/toaster.tsx` + `components/ui/toast.tsx` (Radix) + `components/ui/use-toast.ts` — call `toast({ title, description })` from client code.
- i18n dynamic import: `i18n/index.ts` and `lib/i18n.ts` show how translations are loaded with `import()`.

9. Where to look for more context

- Global patterns: `app/layout.tsx`, `components/`, `hooks/`, `i18n/`, `lib/`.
- Scripts & deps: `package.json`.

If any section is unclear or you want more examples (e.g., add a sample change modifying the toast flow), tell me which area to expand and I will iterate.
