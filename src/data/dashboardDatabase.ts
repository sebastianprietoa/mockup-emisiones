import emissionsCsv from "./emissionsDatabase.csv?raw";
import biodiversityCsv from "./biodiversityDatabase.csv?raw";
import type { BiodiversityStatus, BiodiversityTrend } from "./biodiversityData";
import { isAllSelection } from "../utils/filterValues";

type CsvRow = Record<string, string>;
type Selection = Record<string, string>;

type EmissionsRecord = {
  year: string;
  month: string;
  installation: string;
  country: string;
  businessUnit: string;
  scope: "1" | "2" | "3";
  category: string;
  source: string;
  activity: string;
  unit: string;
  value: number;
  factor: number;
  emissions_tco2e: number;
  fuelOrMethod: string;
  method: string;
  renewableShare: number | null;
};

type BiodiversityRecord = {
  year: string;
  campaign: string;
  zone: string;
  kpi: string;
  value: number;
  unit: string;
  trend: BiodiversityTrend;
  status: BiodiversityStatus;
  sourceType: string;
};

type SummaryRow = {
  source: string;
  scope: string;
  activity: string;
  factor: string;
  emissions: number;
  share: number;
};

type Scope1Row = {
  source: string;
  category: string;
  activity: string;
  factor: string;
  emissions: number;
  share: number;
};

type Scope3Row = {
  source: string;
  installation: string;
  businessUnit: string;
  category: string;
  activity: string;
  factor: string;
  emissions: number;
  share: number;
};

type BiodiversityTableRow = {
  zone: string;
  indicator: string;
  value: number;
  unit: string;
  source: string;
  status: BiodiversityStatus;
};

const monthOrder = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const emissionsFilterFields = ["year", "installation", "country", "businessUnit"] as const;
const biodiversityFilterFields = ["campaign", "zone"] as const;

function parseCsv(raw: string) {
  const lines = raw.trim().split(/\r?\n/);
  const headers = lines.shift()?.split(";").map((value) => value.trim()) ?? [];

  return lines
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const values = line.split(";");
      return headers.reduce<CsvRow>((acc, header, index) => {
        acc[header] = (values[index] ?? "").trim();
        return acc;
      }, {});
    });
}

function parseNumber(value: string) {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
}

function sortByMonth<T extends { month: string }>(rows: T[]) {
  return [...rows].sort((left, right) => monthOrder.indexOf(left.month) - monthOrder.indexOf(right.month));
}

function matchesSelection(record: Record<string, unknown>, selection: Selection, fields: readonly string[]) {
  return fields.every((field) => {
    const value = selection[field];
    return !value || isAllSelection(value) || String(record[field]) === value;
  });
}

function sumByField<T extends Record<string, number | string | null>>(rows: T[], key: keyof T, valueKey: keyof T) {
  const totals = new Map<string, number>();
  rows.forEach((row) => {
    const name = String(row[key]);
    totals.set(name, (totals.get(name) ?? 0) + Number(row[valueKey]));
  });
  return Array.from(totals.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((left, right) => right.value - left.value);
}

function parseEmissionsRows(): EmissionsRecord[] {
  return parseCsv(emissionsCsv).map((row) => ({
    year: row.year,
    month: row.month,
    installation: row.installation,
    country: row.country,
    businessUnit: row.businessUnit,
    scope: row.scope as "1" | "2" | "3",
    category: row.category,
    source: row.source,
    activity: row.activity,
    unit: row.unit,
    value: parseNumber(row.value),
    factor: parseNumber(row.factor),
    emissions_tco2e: parseNumber(row.emissions_tco2e),
    fuelOrMethod: row.fuelOrMethod,
    method: row.method,
    renewableShare: row.renewableShare ? parseNumber(row.renewableShare) : null,
  }));
}

function parseBiodiversityRows(): BiodiversityRecord[] {
  return parseCsv(biodiversityCsv).map((row) => ({
    year: row.year,
    campaign: row.campaign,
    zone: row.zone,
    kpi: row.kpi,
    value: parseNumber(row.value),
    unit: row.unit,
    trend: row.trend as BiodiversityTrend,
    status: row.status as BiodiversityStatus,
    sourceType: row.sourceType,
  }));
}

function filterEmissions(selection: Selection, rows: EmissionsRecord[]) {
  return rows.filter((row) => matchesSelection(row, selection, emissionsFilterFields));
}

function filterBiodiversity(selection: Selection, rows: BiodiversityRecord[]) {
  return rows.filter((row) => matchesSelection(row, selection, biodiversityFilterFields));
}

function getTotal(rows: Array<{ emissions_tco2e: number }>) {
  return rows.reduce((sum, row) => sum + row.emissions_tco2e, 0);
}

function getTopName(rows: Array<{ name: string; value: number }>) {
  return [...rows].sort((left, right) => right.value - left.value)[0]?.name ?? "";
}

function aggregateScope3ByKey(rows: EmissionsRecord[], key: "businessUnit" | "installation") {
  return sumByField(
    rows.map((row) => ({ name: row[key], value: row.emissions_tco2e })),
    "name",
    "value",
  );
}

function getMonthlyVariation(rows: Array<{ emissions: number }>) {
  if (rows.length < 2) {
    return 0;
  }
  const current = rows[rows.length - 1]?.emissions ?? 0;
  const previous = rows[rows.length - 2]?.emissions ?? 0;
  return previous ? ((current - previous) / previous) * 100 : 0;
}

function getLatestKpiRows(rows: BiodiversityRecord[]) {
  const latestByName = new Map<string, BiodiversityRecord>();

  rows.forEach((row) => {
    const current = latestByName.get(row.kpi);
    if (!current || Number(row.year) >= Number(current.year)) {
      latestByName.set(row.kpi, row);
    }
  });

  return Array.from(latestByName.values());
}

const emissionsRows = parseEmissionsRows();
const biodiversityRows = parseBiodiversityRows();

export function buildEmissionsView(selection: Selection) {
  const rows = filterEmissions(selection, emissionsRows);
  const totalEmissions = getTotal(rows);
  const scope1Rows = rows.filter((row) => row.scope === "1");
  const scope2Rows = rows.filter((row) => row.scope === "2");
  const scope3Rows = rows.filter((row) => row.scope === "3");

  const scopeBreakdown = ["1", "2", "3"]
    .map((scope) => ({
      name: `Alcance ${scope}`,
      value: rows.filter((row) => row.scope === scope).reduce((sum, row) => sum + row.emissions_tco2e, 0),
    }))
    .sort((left, right) => Number(left.name.replace("Alcance ", "")) - Number(right.name.replace("Alcance ", "")));

  const categoryData = sumByField(rows, "category", "emissions_tco2e").map((item) => ({
    category: item.name,
    emissions: item.value,
  }));

  const monthlyData = sortByMonth(
    Array.from(
      rows.reduce((map, row) => {
        const entry = map.get(row.month) ?? { month: row.month, scope1: 0, scope2: 0, scope3: 0, total: 0 };
        entry.total += row.emissions_tco2e;
        if (row.scope === "1") entry.scope1 += row.emissions_tco2e;
        if (row.scope === "2") entry.scope2 += row.emissions_tco2e;
        if (row.scope === "3") entry.scope3 += row.emissions_tco2e;
        map.set(row.month, entry);
        return map;
      }, new Map<string, { month: string; scope1: number; scope2: number; scope3: number; total: number }>()),
    ).map((entry) => entry[1]),
  );

  const tableRows: SummaryRow[] = rows
    .slice()
    .sort((left, right) => right.emissions_tco2e - left.emissions_tco2e)
    .slice(0, 6)
    .map((row) => ({
      source: row.source,
      scope: row.scope,
      activity: row.activity,
      factor: `${row.factor.toFixed(3)} kgCO2e/${row.unit.toLowerCase()}`,
      emissions: row.emissions_tco2e,
      share: totalEmissions ? (row.emissions_tco2e / totalEmissions) * 100 : 0,
    }));

  const scope1FuelData = sumByField(
    scope1Rows.map((row) => ({ name: row.fuelOrMethod || row.source, value: row.emissions_tco2e })),
    "name",
    "value",
  ).map((item) => ({ fuel: item.name, emissions: item.value }));

  const scope1SiteData = sumByField(
    scope1Rows.map((row) => ({ name: row.installation, value: row.emissions_tco2e })),
    "name",
    "value",
  ).map((item) => ({ site: item.name, emissions: item.value }));

  const scope1MonthlyData = sortByMonth(
    Array.from(
      scope1Rows.reduce((map, row) => {
        const entry = map.get(row.month) ?? { month: row.month, emissions: 0 };
        entry.emissions += row.emissions_tco2e;
        map.set(row.month, entry);
        return map;
      }, new Map<string, { month: string; emissions: number }>()),
    ).map((entry) => entry[1]),
  );

  const scope1TableRows: Scope1Row[] = scope1Rows
    .slice()
    .sort((left, right) => right.emissions_tco2e - left.emissions_tco2e)
    .slice(0, 6)
    .map((row) => ({
      source: row.source,
      category: row.category,
      activity: row.activity,
      factor: `${row.factor.toFixed(3)} kgCO2e/${row.unit.toLowerCase()}`,
      emissions: row.emissions_tco2e,
      share: totalEmissions ? (row.emissions_tco2e / totalEmissions) * 100 : 0,
    }));

  const scope2MonthlyEnergyData = sortByMonth(
    Array.from(
      scope2Rows.reduce((map, row) => {
        const entry = map.get(row.month) ?? { month: row.month, kwh: 0 };
        entry.kwh += row.value;
        map.set(row.month, entry);
        return map;
      }, new Map<string, { month: string; kwh: number }>()),
    ).map((entry) => entry[1]),
  );

  const scope2InstallationData = sumByField(
    scope2Rows.map((row) => ({ name: row.installation, value: row.emissions_tco2e })),
    "name",
    "value",
  ).map((item) => ({ site: item.name, emissions: item.value }));

  const scope2ComparisonData = sortByMonth(
    Array.from(
      scope2Rows.reduce((map, row) => {
        const entry = map.get(row.month) ?? { month: row.month, location: 0, market: 0 };
        if (row.method === "location-based") {
          entry.location += row.emissions_tco2e;
        }
        if (row.method === "market-based") {
          entry.market += row.emissions_tco2e;
        }
        map.set(row.month, entry);
        return map;
      }, new Map<string, { month: string; location: number; market: number }>()),
    ).map((entry) => entry[1]),
  );

  const scope3CategoryData = sumByField(
    scope3Rows.map((row) => ({ name: row.category, value: row.emissions_tco2e })),
    "name",
    "value",
  ).map((item) => ({ category: item.name, emissions: item.value }));

  const scope3BusinessUnitData = aggregateScope3ByKey(scope3Rows, "businessUnit").map((item) => ({
    businessUnit: item.name,
    emissions: item.value,
  }));

  const scope3TopInstallationData = aggregateScope3ByKey(scope3Rows, "installation")
    .slice(0, 10)
    .map((item) => ({ installation: item.name, emissions: item.value }));

  const scope3MonthlyData = sortByMonth(
    Array.from(
      scope3Rows.reduce((map, row) => {
        const entry = map.get(row.month) ?? { month: row.month, emissions: 0 };
        entry.emissions += row.emissions_tco2e;
        map.set(row.month, entry);
        return map;
      }, new Map<string, { month: string; emissions: number }>()),
    ).map((entry) => entry[1]),
  );

  const scope3TableData = Array.from(
    scope3Rows.reduce((map, row) => {
      const entry = map.get(row.installation) ?? {
        source: row.installation,
        installation: row.installation,
        businessUnit: row.businessUnit,
        category: row.category,
        activity: row.activity,
        factor: `${row.factor.toFixed(3)} kgCO2e/${row.unit.toLowerCase()}`,
        emissions: 0,
        share: 0,
      };
      entry.emissions += row.emissions_tco2e;
      map.set(row.installation, entry);
      return map;
    }, new Map<string, Scope3Row>()).values(),
  )
    .sort((left, right) => right.emissions - left.emissions)
    .slice(0, 8)
    .map((row) => ({
      ...row,
      share: totalEmissions ? (row.emissions / totalEmissions) * 100 : 0,
    }));

  const scope2RenewableRows = scope2Rows.filter((row) => row.renewableShare !== null);
  const scope2Kpis = {
    totalKwh: scope2Rows.reduce((sum, row) => sum + row.value, 0),
    totalEmissions: scope2Rows.reduce((sum, row) => sum + row.emissions_tco2e, 0),
    averageFactor: scope2Rows.length ? scope2Rows.reduce((sum, row) => sum + row.factor, 0) / scope2Rows.length : 0,
    renewableShare: scope2RenewableRows.length
      ? Math.round(scope2RenewableRows.reduce((sum, row) => sum + (row.renewableShare ?? 0), 0) / scope2RenewableRows.length)
      : 0,
  };

  return {
    rows,
    scopeBreakdown,
    categoryData,
    monthlyData,
    tableRows,
    scope1Kpis: {
      totalEmissions: scope1Rows.reduce((sum, row) => sum + row.emissions_tco2e, 0),
      mainFuel: getTopName(
        sumByField(
          scope1Rows.map((row) => ({ name: row.fuelOrMethod || row.source, value: row.emissions_tco2e })),
          "name",
          "value",
        ),
      ),
      topInstallation: getTopName(scope1SiteData.map((item) => ({ name: item.site, value: item.emissions }))),
      monthlyVariation: getMonthlyVariation(scope1MonthlyData),
    },
    scope1FuelData,
    scope1SiteData,
    scope1MonthlyData,
    scope1TableRows,
    scope2Kpis,
    scope2MonthlyEnergyData,
    scope2InstallationData,
    scope2ComparisonData,
    scope2Explanation:
      "Location-based refleja el promedio de la red electrica donde opera la instalacion. Market-based incorpora contratos, certificados o instrumentos renovables y permite mostrar el efecto de la compra de energia mas alla de la red fisica.",
    scope3Kpis: {
      totalEmissions: scope3Rows.reduce((sum, row) => sum + row.emissions_tco2e, 0),
      topBusinessUnit: getTopName(scope3BusinessUnitData.map((item) => ({ name: item.businessUnit, value: item.emissions }))),
      topInstallation: getTopName(scope3TopInstallationData.map((item) => ({ name: item.installation, value: item.emissions }))),
      peakMonth: getTopName(scope3MonthlyData.map((item) => ({ name: item.month, value: item.emissions }))),
      totalShare: totalEmissions ? (scope3Rows.reduce((sum, row) => sum + row.emissions_tco2e, 0) / totalEmissions) * 100 : 0,
      reportedInstallations: new Set(scope3Rows.map((row) => row.installation)).size,
      monthlyVariation: getMonthlyVariation(scope3MonthlyData),
      annualSource: "Disposicion final en vertederos de residuos solidos",
    },
    scope3CategoryData,
    scope3BusinessUnitData,
    scope3TopInstallationData,
    scope3MonthlyData,
    scope3ShareData: scope3BusinessUnitData.map((item) => ({ name: item.businessUnit, value: item.emissions })),
    scope3TableRows: scope3TableData,
  };
}

export function buildBiodiversityView(selection: Selection) {
  const rows = filterBiodiversity(selection, biodiversityRows);
  const kpiRows = getLatestKpiRows(rows);

  return {
    rows,
    kpis: kpiRows.map((row) => ({
      name: row.kpi,
      value: row.value,
      unit: row.unit,
      trend: row.trend,
      status: row.status,
      source: row.sourceType,
    })),
    tableRows: rows.map((row) => ({
      zone: row.zone,
      indicator: row.kpi,
      value: row.value,
      unit: row.unit,
      source: row.sourceType,
      status: row.status,
    })) as BiodiversityTableRow[],
  };
}
