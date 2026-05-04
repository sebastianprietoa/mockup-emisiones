import { BarChart } from "../components/charts/BarChart";
import { ChartCard } from "../components/charts/ChartCard";
import { LineChart } from "../components/charts/LineChart";
import { FilterBar } from "../components/common/FilterBar";
import { PageTitle } from "../components/common/PageTitle";
import { BiodiversityKpiCard } from "../components/kpi/BiodiversityKpiCard";
import { BiodiversityTable } from "../components/tables/BiodiversityTable";
import { biodiversityFilters } from "../config/filters";
import {
  biodiversityKpis,
  biodiversityTableRows,
  ecosystemStatusData,
  invasiveRecordsData,
  richnessEvolutionData,
  vegetationCoverageData,
} from "../data/biodiversityData";
import { formatCompact } from "../utils/formatters";

export function BiodiversityPage() {
  return (
    <div className="space-y-6">
      <PageTitle
        eyebrow="TNFD / Naturaleza"
        title="Biodiversidad y ecosistemas"
        description="Módulo complementario independiente de GEI para visualizar KPIs de especies, cobertura vegetal y monitoreo territorial."
      />

      <FilterBar fields={biodiversityFilters} title="Filtros TNFD" />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {biodiversityKpis.map((item) => (
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
            data={richnessEvolutionData}
            xKey="month"
            series={[{ key: "species", name: "Especies" }]}
          />
        </ChartCard>
        <ChartCard title="Cobertura vegetal por tipo" description="Superficie simulada por comunidad vegetal.">
          <BarChart
            data={vegetationCoverageData}
            xKey="type"
            series={[{ key: "hectares", name: "Hectáreas" }]}
          />
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
            data={invasiveRecordsData}
            xKey="month"
            series={[{ key: "records", name: "Registros" }]}
          />
        </ChartCard>
      </section>

      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-soft backdrop-blur">
        <h3 className="text-base font-semibold text-white">Tabla de monitoreo territorial</h3>
        <p className="mt-1 text-sm text-slate-400">
          Consolidado base para trazabilidad ambiental y seguimiento de riesgos de naturaleza.
        </p>
        <div className="mt-4">
          <BiodiversityTable rows={biodiversityTableRows} />
        </div>
      </section>
    </div>
  );
}

