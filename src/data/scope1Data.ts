export const scope1Kpis = {
  totalEmissions: 3120,
  mainFuel: "Gas natural",
  topInstallation: "Planta San Pedro",
  monthlyVariation: -2.8,
};

export const scope1FuelData = [
  { fuel: "Gas natural", emissions: 1480 },
  { fuel: "Diésel", emissions: 740 },
  { fuel: "Gas licuado", emissions: 420 },
  { fuel: "Gasolina", emissions: 300 },
  { fuel: "Refrigerantes", emissions: 180 },
];

export const scope1SiteData = [
  { site: "Planta San Pedro", emissions: 1360 },
  { site: "Centro Logístico Norte", emissions: 920 },
  { site: "Oficina Central", emissions: 460 },
  { site: "Patio de Manobras", emissions: 380 },
];

export const scope1MonthlyData = [
  { month: "Ene", emissions: 520 },
  { month: "Feb", emissions: 500 },
  { month: "Mar", emissions: 540 },
  { month: "Abr", emissions: 510 },
  { month: "May", emissions: 490 },
  { month: "Jun", emissions: 460 },
];

export const scope1TableRows = [
  {
    source: "Caldera principal",
    category: "Combustión fija",
    activity: "Gas natural",
    factor: "0,202 kgCO2e/kWh",
    emissions: 980,
    share: 31.4,
  },
  {
    source: "Montacargas",
    category: "Combustión móvil",
    activity: "Diésel",
    factor: "2,68 kgCO2e/litro",
    emissions: 420,
    share: 13.5,
  },
  {
    source: "Camiones internos",
    category: "Combustión móvil",
    activity: "Diésel",
    factor: "2,68 kgCO2e/litro",
    emissions: 320,
    share: 10.3,
  },
  {
    source: "Chillers",
    category: "Fugas de refrigerantes",
    activity: "R-134a",
    factor: "1,430 tCO2e/kg",
    emissions: 180,
    share: 5.8,
  },
  {
    source: "Línea térmica",
    category: "Combustión fija",
    activity: "GLP",
    factor: "1,64 kgCO2e/litro",
    emissions: 290,
    share: 9.3,
  },
];

