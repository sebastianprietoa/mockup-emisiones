export const homeSummary = {
  totalEmissions: 12840,
  mainScope: "Alcance 3",
  yearVariation: -6.4,
  intensity: 0.38,
  goalProgress: 72,
  executiveMessage:
    "La operación muestra una reducción sostenida en las emisiones directas, mientras la cadena de valor sigue concentrando la mayor proporción del inventario corporativo.",
};

export const homeScopeDistribution = [
  { name: "Alcance 1", value: 3120, color: "#0f766e" },
  { name: "Alcance 2", value: 2180, color: "#14b8a6" },
  { name: "Alcance 3", value: 7540, color: "#38bdf8" },
];

export const generalScopeBreakdown = [
  { name: "Alcance 1", emissions: 3120 },
  { name: "Alcance 2", emissions: 2180 },
  { name: "Alcance 3", emissions: 7540 },
];

export const generalCategoryData = [
  { category: "Combustión fija", emissions: 1480 },
  { category: "Combustión móvil", emissions: 780 },
  { category: "Electricidad comprada", emissions: 2180 },
  { category: "Bienes adquiridos", emissions: 1860 },
  { category: "Transporte aguas arriba", emissions: 1540 },
  { category: "Residuos y viajes", emissions: 1220 },
];

export const generalMonthlyData = [
  { month: "Ene", scope1: 280, scope2: 210, scope3: 980, total: 1470 },
  { month: "Feb", scope1: 260, scope2: 200, scope3: 940, total: 1400 },
  { month: "Mar", scope1: 295, scope2: 205, scope3: 1020, total: 1520 },
  { month: "Abr", scope1: 250, scope2: 195, scope3: 910, total: 1355 },
  { month: "May", scope1: 240, scope2: 198, scope3: 870, total: 1308 },
  { month: "Jun", scope1: 230, scope2: 192, scope3: 840, total: 1262 },
];

export const generalTableRows = [
  {
    source: "Caldera principal",
    scope: "1",
    activity: "Consumo de gas natural",
    factor: "0,202 kgCO2e/kWh",
    emissions: 980,
    share: 7.6,
  },
  {
    source: "Flota logística",
    scope: "1",
    activity: "Combustión móvil diésel",
    factor: "2,68 kgCO2e/litro",
    emissions: 740,
    share: 5.8,
  },
  {
    source: "Electricidad red",
    scope: "2",
    activity: "Consumo planta principal",
    factor: "0,287 kgCO2e/kWh",
    emissions: 2180,
    share: 17.0,
  },
  {
    source: "Proveedores críticos",
    scope: "3",
    activity: "Bienes y servicios adquiridos",
    factor: "0,041 tCO2e/unidad",
    emissions: 1860,
    share: 14.5,
  },
  {
    source: "Transporte tercerizado",
    scope: "3",
    activity: "Distribución aguas arriba",
    factor: "0,088 tCO2e/km",
    emissions: 1540,
    share: 12.0,
  },
  {
    source: "Gestión de residuos",
    scope: "3",
    activity: "Disposición y tratamiento",
    factor: "0,023 tCO2e/kg",
    emissions: 910,
    share: 7.1,
  },
];

