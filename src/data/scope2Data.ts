export const scope2Kpis = {
  totalKwh: 842000,
  totalEmissions: 2180,
  averageFactor: 0.259,
  renewableShare: 46,
};

export const scope2MonthlyEnergyData = [
  { month: "Ene", kwh: 142000 },
  { month: "Feb", kwh: 138000 },
  { month: "Mar", kwh: 146000 },
  { month: "Abr", kwh: 136000 },
  { month: "May", kwh: 130000 },
  { month: "Jun", kwh: 150000 },
];

export const scope2InstallationData = [
  { site: "Planta San Pedro", emissions: 1320 },
  { site: "Centro Logístico Norte", emissions: 520 },
  { site: "Oficina Central", emissions: 220 },
  { site: "Patio de Manobras", emissions: 120 },
];

export const scope2ComparisonData = [
  { month: "Ene", location: 240, market: 180 },
  { month: "Feb", location: 225, market: 170 },
  { month: "Mar", location: 248, market: 176 },
  { month: "Abr", location: 232, market: 168 },
  { month: "May", location: 218, market: 165 },
  { month: "Jun", location: 245, market: 173 },
];

export const scope2Explanation =
  "Location-based refleja el factor promedio de la red eléctrica donde opera la instalación. Market-based incorpora contratos, certificados o instrumentos de energía renovable cuando existen y permite mostrar el efecto de decisiones de compra más allá de la red física.";

