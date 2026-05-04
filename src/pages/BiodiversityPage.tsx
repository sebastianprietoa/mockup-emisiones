import { BarChart } from "../components/charts/BarChart";
import { ChartCard } from "../components/charts/ChartCard";
import { LineChart } from "../components/charts/LineChart";
import { FilterBar } from "../components/common/FilterBar";
import { PageTitle } from "../components/common/PageTitle";
import { BiodiversityKpiCard } from "../components/kpi/BiodiversityKpiCard";
import { BiodiversityMap } from "../components/maps/BiodiversityMap";
import { BiodiversityTable } from "../components/tables/BiodiversityTable";
import { biodiversityFilters } from "../config/filters";
import { buildBiodiversityView } from "../data/dashboardDatabase";
import { ecosystemStatusData, vegetationCoverageData } from "../data/biodiversityData";
import { useDashboardFilters } from "../context/DashboardFiltersContext";
import { formatCompact } from "../utils/formatters";

export function BiodiversityPage() {
  const { filters, setFilterValue } = useDashboardFilters();
  const view = buildBiodiversityView(filters);

  return (
    <div className="space-y-6">
      <PageTitle
        eyebrow="TNFD / Naturaleza"
        title="Biodiversidad y ecosistemas"
        description="Módulo complementario independiente de GEI para visualizar KPIs de especies, cobertura vegetal y monitoreo territorial."
      />

      <FilterBar fields={biodiversityFilters} values={filters} onChange={setFilterValue} title="Filtros TNFD" />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {view.kpis.map((item) => (
          <BiodiversityKpiCard
            key={item.name}
            name={item.name}
            value={formatCompact(item.value)}
            unit={item.unit}
            trend={item.trend}
            status={item.status}
            source={item.source}
          />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Evolución de riqueza de especies" description="Serie temporal de diversidad registrada.">
          <LineChart
            data={view.rows
              .filter((row) => row.kpi === "Riqueza de especies")
              .sort((left, right) => Number(left.campaign) - Number(right.campaign))
              .map((row) => ({ month: row.campaign, species: row.value }))}
            xKey="month"
            series={[{ key: "species", name: "Especies" }]}
          />
        </ChartCard>
        <ChartCard title="Cobertura vegetal por tipo" description="Superficie simulada por comunidad vegetal.">
          <BarChart data={vegetationCoverageData} xKey="type" series={[{ key: "hectares", name: "Hectáreas" }]} />
        </ChartCard>
        <ChartCard title="Estado de ecosistemas por zona" description="Distribución de condiciones ecológicas.">
          <BarChart
            data={ecosystemStatusData}
            xKey="zone"
            series={[
              { key: "healthy", name: "Bueno" },
              { key: "attention", name: "Medio" },
              { key: "critical", name: "Crítico" },
            ]}
          />
        </ChartCard>
        <ChartCard title="Registros de especies invasoras" description="Seguimiento de presión biológica sobre el territorio.">
          <LineChart
            data={view.rows
              .filter((row) => row.kpi === "Presencia de especies invasoras")
              .sort((left, right) => Number(left.campaign) - Number(right.campaign))
              .map((row) => ({ month: row.campaign, records: row.value }))}
            xKey="month"
            series={[{ key: "records", name: "Registros" }]}
          />
        </ChartCard>
      </section>

      <BiodiversityMap />

      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-soft backdrop-blur">
        <h3 className="text-base font-semibold text-white">Tabla de monitoreo territorial</h3>
        <p className="mt-1 text-sm text-slate-400">
          Consolidado base para trazabilidad ambiental y seguimiento de riesgos de naturaleza.
        </p>
        <div className="mt-4">
          <BiodiversityTable rows={view.tableRows} />
        </div>
      </section>
    </div>
  );
}
