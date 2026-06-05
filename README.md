# Carbon Intelligence Dashboard Mockup

Mockup funcional de un dashboard web para visualización de emisiones de GEI, huella hídrica y biodiversidad, inspirado en la presentación `Nodo_San_Pedro_Carbon_Intelligence_(9).pptx` y en un enfoque conceptual alineado con `GHG Protocol`, `TNFD` e `ISO 14046`.

## Objetivo

- Visualizar emisiones de GEI por alcance, categoría, instalación y evolución temporal.
- Visualizar huella hídrica con lectura de agua azul, verde y gris, intensidad, metas y trazabilidad por cuenca.
- Incluir una página complementaria de biodiversidad con KPIs y monitoreo territorial.
- Mantener una arquitectura modular, pequeña y fácil de modificar en futuras iteraciones.
- Usar una base estática en CSV o datos simulados para que los filtros exploren información realista sin backend.

## Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Recharts
- Lucide React
- React Router

## Instalación

```bash
npm install
```

Si prefieres el flujo validado en este entorno:

```bash
corepack pnpm install
```

## Ejecución local

```bash
npm run dev
```

O en este entorno:

```bash
corepack pnpm dev
```

## Estructura

```txt
src/
  main.tsx
  App.tsx
  routes/
  layouts/
  pages/
  components/
  data/
  config/
  utils/
  styles/
```

## Páginas incluidas

- Home
- Resultados generales
- Resultados Alcance 1
- Resultados Alcance 2
- Resultados Alcance 3
- Huella hídrica
- Biodiversidad / TNFD

## Base de datos estática

Los datos editables viven en archivos dentro del repo:

- `src/data/emissionsDatabase.csv`
- `src/data/biodiversityDatabase.csv`
- `src/data/waterData.ts`

La lógica de lectura y agregación está centralizada en:

- `src/data/dashboardDatabase.ts`
- `src/data/waterData.ts`

## Cómo modificar datos simulados

- Para emisiones GEI, edita `src/data/emissionsDatabase.csv`.
- Para huella hídrica, edita `src/data/waterData.ts`.
- Para biodiversidad, edita `src/data/biodiversityDatabase.csv`.
- Si agregas columnas nuevas, ajusta `src/data/dashboardDatabase.ts` o `src/data/waterData.ts` según corresponda.
- Si cambias opciones de filtros, actualiza `src/config/filters.ts`.

## Recomendaciones para iteraciones futuras

- Mantener los cambios acotados por página o por archivo de datos.
- Reutilizar los componentes comunes antes de crear variantes nuevas.
- Si cambia la narrativa visual, editar primero `src/config/theme.ts` y `src/config/navigation.ts`.
- Si se agregan nuevos filtros, extender `src/config/filters.ts` y `src/components/common/FilterBar.tsx`.
- Si quieres cambiar solo un conjunto de datos, toca solo el archivo correspondiente.
