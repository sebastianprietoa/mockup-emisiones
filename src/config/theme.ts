export const projectTheme = {
  clientName: "Territorio Vivo",
  projectName: "Panel de Inteligencia Ambiental",
  subtitle: "Mockup ejecutivo de GEI, agua y biodiversidad",
};

export const brandColors = {
  plumDark: "#261B26",
  plum: "#3A283A",
  sand: "#F4E8DA",
  cream: "#FFF9F1",
  creamAlt: "#EBE6DB",
  text: "#362F32",
  textMuted: "#5B6165",
  cyan: "#0BA4DE",
  magenta: "#EC1B91",
  orange: "#F2753D",
  yellow: "#F5B400",
  olive: "#9EA900",
  blueGray: "#486570",
  good: "#499457",
  critical: "#A44B41",
} as const;

export const statusTone = {
  bueno: {
    label: "Bueno",
    classes: "bg-[#9EA900]/15 text-[#617000] ring-1 ring-[#9EA900]/30",
  },
  medio: {
    label: "Medio",
    classes: "bg-[#F5B400]/18 text-[#7A5C00] ring-1 ring-[#F5B400]/30",
  },
  crítico: {
    label: "Crítico",
    classes: "bg-[#A44B41]/15 text-[#7E312A] ring-1 ring-[#A44B41]/30",
  },
} as const;

export const trendTone = {
  alza: {
    label: "Alza",
    classes: "bg-[#F2753D]/15 text-[#8E3D17] ring-1 ring-[#F2753D]/30",
  },
  baja: {
    label: "Baja",
    classes: "bg-[#0BA4DE]/15 text-[#005F83] ring-1 ring-[#0BA4DE]/30",
  },
  estable: {
    label: "Estable",
    classes: "bg-[#486570]/15 text-[#486570] ring-1 ring-[#486570]/30",
  },
} as const;

export const chartPalette = [
  brandColors.cyan,
  brandColors.magenta,
  brandColors.orange,
  brandColors.yellow,
  brandColors.olive,
  brandColors.blueGray,
  "#7A5C00",
  "#D45B7A",
];
