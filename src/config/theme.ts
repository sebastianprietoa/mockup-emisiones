export const projectTheme = {
  clientName: "Nodo San Pedro",
  projectName: "Carbon Intelligence Dashboard",
  subtitle: "Mockup ejecutivo GEI y biodiversidad",
};

export const statusTone = {
  bueno: {
    label: "Bueno",
    classes: "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/30",
  },
  medio: {
    label: "Medio",
    classes: "bg-amber-500/15 text-amber-200 ring-1 ring-amber-400/30",
  },
  crítico: {
    label: "Crítico",
    classes: "bg-rose-500/15 text-rose-200 ring-1 ring-rose-400/30",
  },
} as const;

export const trendTone = {
  alza: {
    label: "Alza",
    classes: "bg-rose-500/15 text-rose-200 ring-1 ring-rose-400/30",
  },
  baja: {
    label: "Baja",
    classes: "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/30",
  },
  estable: {
    label: "Estable",
    classes: "bg-slate-500/15 text-slate-200 ring-1 ring-slate-400/30",
  },
} as const;

export const chartPalette = [
  "#34d399",
  "#14b8a6",
  "#38bdf8",
  "#60a5fa",
  "#818cf8",
  "#a78bfa",
  "#fbbf24",
  "#fb7185",
];

