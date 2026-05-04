export const scope3Kpis = {
  totalEmissions: 7540,
  topCategory: "Bienes y servicios adquiridos",
  totalShare: 58.7,
  reportedCategories: 6,
};

export const scope3CategoryData = [
  { category: "Bienes y servicios adquiridos", emissions: 1860 },
  { category: "Transporte y distribución aguas arriba", emissions: 1540 },
  { category: "Residuos generados en operaciones", emissions: 910 },
  { category: "Viajes de negocios", emissions: 640 },
  { category: "Traslado de colaboradores", emissions: 820 },
  { category: "Uso de productos vendidos", emissions: 980 },
];

export const scope3TopSourceData = [
  { source: "Acero estructural", emissions: 420 },
  { source: "Servicios de transporte", emissions: 380 },
  { source: "Empaques corrugados", emissions: 350 },
  { source: "Resinas técnicas", emissions: 330 },
  { source: "Viajes aéreos", emissions: 310 },
  { source: "Commuting colaboradores", emissions: 295 },
  { source: "Tratamiento de residuos", emissions: 260 },
  { source: "Pallets y madera", emissions: 230 },
  { source: "Equipos importados", emissions: 220 },
  { source: "Consumibles indirectos", emissions: 205 },
];

export const scope3ShareData = scope3CategoryData.map((item) => ({
  name: item.category,
  value: item.emissions,
}));

export const scope3TableRows = [
  {
    category: "Bienes y servicios adquiridos",
    activity: "Compras de materiales",
    factor: "0,041 tCO2e/unidad",
    emissions: 1860,
    share: 24.7,
  },
  {
    category: "Transporte y distribución aguas arriba",
    activity: "Fletes de proveedores",
    factor: "0,088 tCO2e/km",
    emissions: 1540,
    share: 20.4,
  },
  {
    category: "Uso de productos vendidos",
    activity: "Consumo estimado del cliente",
    factor: "0,012 tCO2e/unidad",
    emissions: 980,
    share: 13.0,
  },
  {
    category: "Residuos generados en operaciones",
    activity: "Gestión y tratamiento",
    factor: "0,023 tCO2e/kg",
    emissions: 910,
    share: 12.1,
  },
  {
    category: "Traslado de colaboradores",
    activity: "Movilidad diaria",
    factor: "0,006 tCO2e/km",
    emissions: 820,
    share: 10.9,
  },
  {
    category: "Viajes de negocios",
    activity: "Aéreos y terrestres",
    factor: "0,145 tCO2e/viaje",
    emissions: 640,
    share: 8.5,
  },
];

