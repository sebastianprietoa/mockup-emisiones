# Carbon Intelligence Dashboard Mockup

Mockup funcional de un dashboard web para visualización de emisiones de GEI y biodiversidad, inspirado en la presentación `Nodo_San_Pedro_Carbon_Intelligence_(9).pptx` y en un enfoque conceptual alineado con `GHG Protocol` y `TNFD`.

## Objetivo

- Visualizar emisiones de GEI por alcance, categoría, instalación y evolución temporal.
- Incluir una página complementaria de biodiversidad con KPIs y monitoreo territorial.
- Mantener una arquitectura modular, pequeña y fácil de modificar en futuras iteraciones.

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

## Ejecución local

```bash
npm run dev
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
- Biodiversidad / TNFD

## Cómo modificar datos simulados

- Emisiones generales: `src/data/emissionsSummary.ts`
- Alcance 1: `src/data/scope1Data.ts`
- Alcance 2: `src/data/scope2Data.ts`
- Alcance 3: `src/data/scope3Data.ts`
- Biodiversidad: `src/data/biodiversityData.ts`

Los componentes consumen esos archivos directamente, así que futuras iteraciones pueden concentrarse en editar datos específicos sin tocar el layout global.

## Recomendaciones para iteraciones futuras

- Mantener los cambios acotados por página o por archivo de datos.
- Reutilizar los componentes comunes antes de crear variantes nuevas.
- Si cambia la narrativa visual, editar primero `src/config/theme.ts` y `src/config/navigation.ts`.
- Si se agregan nuevos filtros, extender `src/config/filters.ts` y `src/components/common/FilterBar.tsx`.

