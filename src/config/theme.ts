export const projectTheme = {
  clientName: "Green Ticket",
  projectName: "Carbon Intelligence Dashboard",
  subtitle: "Mockup ejecutivo GEI y biodiversidad",
};

export const statusTone = {
  bueno: {
    label: "Bueno",
    classes: "bg-[#39B54A]/15 text-[#B9F4C0] ring-1 ring-[#39B54A]/30",
  },
  medio: {
    label: "Medio",
    classes: "bg-[#F7931E]/15 text-[#FFD39D] ring-1 ring-[#F7931E]/30",
  },
  crítico: {
    label: "Crítico",
    classes: "bg-[#ED1C24]/15 text-[#FFC0C3] ring-1 ring-[#ED1C24]/30",
  },
} as const;

export const trendTone = {
  alza: {
    label: "Alza",
    classes: "bg-[#ED1C24]/15 text-[#FFC0C3] ring-1 ring-[#ED1C24]/30",
  },
  baja: {
    label: "Baja",
    classes: "bg-[#39B54A]/15 text-[#B9F4C0] ring-1 ring-[#39B54A]/30",
  },
  estable: {
    label: "Estable",
    classes: "bg-slate-500/15 text-slate-200 ring-1 ring-slate-400/30",
  },
} as const;

export const chartPalette = [
  "#39B54A",
  "#00A99D",
  "#29ABE2",
  "#F7931E",
  "#ED1C24",
  "#662D91",
  "#C69C6D",
  "#998675",
];
