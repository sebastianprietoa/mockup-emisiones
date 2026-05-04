export type BiodiversityStatus = "bueno" | "medio" | "crítico";
export type BiodiversityTrend = "alza" | "baja" | "estable";

export const biodiversityKpis = [
  {
    name: "Especies amenazadas presentes",
    value: 8,
    unit: "registros",
    trend: "alza" as BiodiversityTrend,
    status: "medio" as BiodiversityStatus,
    source: "Campañas de terreno",
  },
  {
    name: "Abundancia de especies clave",
    value: 124,
    unit: "individuos/ha",
    trend: "baja" as BiodiversityTrend,
    status: "bueno" as BiodiversityStatus,
    source: "Línea base",
  },
  {
    name: "Riqueza de especies",
    value: 67,
    unit: "especies",
    trend: "alza" as BiodiversityTrend,
    status: "bueno" as BiodiversityStatus,
    source: "Monitoreo ambiental",
  },
  {
    name: "Cobertura vegetal",
    value: 78,
    unit: "%",
    trend: "estable" as BiodiversityTrend,
    status: "bueno" as BiodiversityStatus,
    source: "Información territorial",
  },
  {
    name: "Estado del ecosistema",
    value: 72,
    unit: "/100",
    trend: "estable" as BiodiversityTrend,
    status: "medio" as BiodiversityStatus,
    source: "Monitoreo ambiental",
  },
  {
    name: "Especies invasoras",
    value: 5,
    unit: "registros",
    trend: "alza" as BiodiversityTrend,
    status: "crítico" as BiodiversityStatus,
    source: "Campañas de terreno",
  },
  {
    name: "Mortalidad de fauna asociada",
    value: 2,
    unit: "casos",
    trend: "baja" as BiodiversityTrend,
    status: "medio" as BiodiversityStatus,
    source: "Línea base",
  },
];

export const richnessEvolutionData = [
  { month: "Ene", species: 52 },
  { month: "Feb", species: 54 },
  { month: "Mar", species: 55 },
  { month: "Abr", species: 58 },
  { month: "May", species: 61 },
  { month: "Jun", species: 67 },
];

export const vegetationCoverageData = [
  { type: "Bosque nativo", hectares: 240 },
  { type: "Matorral", hectares: 180 },
  { type: "Pastizal", hectares: 95 },
  { type: "Suelo desnudo", hectares: 28 },
];

export const ecosystemStatusData = [
  { zone: "Zona núcleo", healthy: 84, attention: 11, critical: 5 },
  { zone: "Zona amortiguación", healthy: 71, attention: 19, critical: 10 },
  { zone: "Corredor ecológico", healthy: 68, attention: 18, critical: 14 },
];

export const invasiveRecordsData = [
  { month: "Ene", records: 1 },
  { month: "Feb", records: 2 },
  { month: "Mar", records: 2 },
  { month: "Abr", records: 3 },
  { month: "May", records: 4 },
  { month: "Jun", records: 5 },
];

export const biodiversityTableRows = [
  {
    zone: "Zona núcleo",
    indicator: "Cobertura vegetal",
    value: 84,
    unit: "%",
    source: "Monitoreo ambiental",
    status: "bueno" as BiodiversityStatus,
  },
  {
    zone: "Zona amortiguación",
    indicator: "Riqueza de especies",
    value: 59,
    unit: "especies",
    source: "Campañas de terreno",
    status: "medio" as BiodiversityStatus,
  },
  {
    zone: "Corredor ecológico",
    indicator: "Especies invasoras",
    value: 5,
    unit: "registros",
    source: "Información pública territorial",
    status: "crítico" as BiodiversityStatus,
  },
  {
    zone: "Área operacional",
    indicator: "Mortalidad de fauna",
    value: 2,
    unit: "casos",
    source: "Línea base",
    status: "medio" as BiodiversityStatus,
  },
];

