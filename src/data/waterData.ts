import { isAllSelection } from "../utils/filterValues";

type Selection = Record<string, string>;

type WaterRecord = {
  year: string;
  installation: string;
  basin: string;
  process: string;
  component: "Agua azul" | "Agua verde" | "Agua gris";
  volume: number;
  intensity: number;
  stress: "Bajo" | "Medio" | "Alto";
  quality: "Cumple" | "Observado" | "Crítico";
};

const waterRows: WaterRecord[] = [
  { year: "2018", installation: "Atacama Inca Tour", basin: "Loa", process: "Alojamiento", component: "Agua azul", volume: 18240, intensity: 118, stress: "Alto", quality: "Observado" },
  { year: "2018", installation: "Chile Road", basin: "Loa", process: "Operación vehicular", component: "Agua azul", volume: 12480, intensity: 96, stress: "Medio", quality: "Cumple" },
  { year: "2018", installation: "Cosmo Andino", basin: "Aconcagua", process: "Lavandería", component: "Agua verde", volume: 15680, intensity: 142, stress: "Medio", quality: "Cumple" },
  { year: "2018", installation: "Flavia Bia Expediciones", basin: "Maipo", process: "Cocina", component: "Agua gris", volume: 9640, intensity: 84, stress: "Alto", quality: "Crítico" },
  { year: "2018", installation: "Maxim Expediciones", basin: "Bío-Bío", process: "Alojamiento", component: "Agua azul", volume: 21460, intensity: 161, stress: "Alto", quality: "Observado" },
  { year: "2018", installation: "Talatur Expediciones", basin: "Loa", process: "Operación turística", component: "Agua verde", volume: 14320, intensity: 111, stress: "Bajo", quality: "Cumple" },
  { year: "2018", installation: "Lalck-Cketi Turismo", basin: "Aconcagua", process: "Alojamiento", component: "Agua gris", volume: 10880, intensity: 90, stress: "Medio", quality: "Observado" },
  { year: "2018", installation: "Hotel Ampaymi", basin: "Maipo", process: "Lavandería", component: "Agua azul", volume: 19240, intensity: 149, stress: "Alto", quality: "Crítico" },
];

function matchesSelection(record: Record<string, unknown>, selection: Selection, fields: readonly string[]) {
  return fields.every((field) => {
    const value = selection[field];
    return !value || isAllSelection(value) || String(record[field]) === value;
  });
}

function sumByKey<T extends Record<string, string | number>>(rows: T[], key: keyof T, valueKey: keyof T) {
  const totals = new Map<string, number>();
  rows.forEach((row) => {
    const name = String(row[key]);
    totals.set(name, (totals.get(name) ?? 0) + Number(row[valueKey]));
  });
  return Array.from(totals.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((left, right) => right.value - left.value);
}

function getTopName(rows: Array<{ name: string; value: number }>) {
  return rows[0]?.name ?? "";
}

function getVariation(rows: Array<{ year: string; total: number }>) {
  if (rows.length < 2) {
    return 0;
  }
  const current = rows[rows.length - 1]?.total ?? 0;
  const previous = rows[rows.length - 2]?.total ?? 0;
  return previous ? ((current - previous) / previous) * 100 : 0;
}

export function buildWaterView(selection: Selection) {
  const rows = waterRows.filter((row) => matchesSelection(row, selection, ["year", "installation", "basin"]));
  const totalFootprint = rows.reduce((sum, row) => sum + row.volume, 0);

  const componentData = sumByKey(rows, "component", "volume");
  const basinData = sumByKey(rows, "basin", "volume");
  const processData = sumByKey(rows, "process", "volume");
  const installationData = sumByKey(rows, "installation", "volume");

  const yearData = Array.from(
    rows.reduce((map, row) => {
      const entry = map.get(row.year) ?? { year: row.year, total: 0 };
      entry.total += row.volume;
      map.set(row.year, entry);
      return map;
    }, new Map<string, { year: string; total: number }>()),
  )
    .map((entry) => entry[1])
    .sort((left, right) => Number(left.year) - Number(right.year));

  const componentShares = componentData.map((item) => ({
    name: item.name,
    value: item.value,
    share: totalFootprint ? (item.value / totalFootprint) * 100 : 0,
  }));

  return {
    rows,
    totalFootprint,
    componentData,
    componentShares,
    basinData,
    processData,
    installationData,
    yearData,
    kpis: {
      dominantComponent: getTopName(componentData),
      yearVariation: getVariation(yearData),
      intensity: totalFootprint ? Math.round(totalFootprint / 904) : 0,
      goalProgress: Math.max(0, Math.min(100, Math.round(52 + totalFootprint / 5000))),
      stressHotspots: rows.filter((row) => row.stress === "Alto").length,
      qualityIssues: rows.filter((row) => row.quality !== "Cumple").length,
    },
  };
}
