import { BarChart } from "../components/charts/BarChart";
import { ChartCard } from "../components/charts/ChartCard";
import { LineChart } from "../components/charts/LineChart";
import { FilterBar } from "../components/common/FilterBar";
import { PageTitle } from "../components/common/PageTitle";
import { BiodiversityMap } from "../components/maps/BiodiversityMap";
import { BiodiversityKpiCard } from "../components/kpi/BiodiversityKpiCard";
import { BiodiversityTable } from "../components/tables/BiodiversityTable";
import { biodiversityFilters } from "../config/filters";
import { buildBiodiversityView } from "../data/dashboardDatabase";
import { ecosystemStatusData, vegetationCoverageData } from "../data/biodiversityData";
import { useDashboardFilters } from "../context/DashboardFiltersContext";
import { formatCompact } from "../utils/formatters";

export function BiodiversityPage() {
  const { filters, setFilterValue } = useDashboardFilters();
  const view = buildBiodiversityView(filters);
  const metricCount = view.kpis.length;

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[34px] border border-[#D7CCC1] bg-[#FFF9F1] shadow-soft">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(236,27,145,0.11)_0%,rgba(236,27,145,0.11)_1.1rem,transparent_1.1rem)]" />
        <div className="relative grid gap-6 px-6 py-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8 lg:py-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0BA4DE]">TNFD / Naturaleza</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#362F32]">Biodiversidad y ecosistemas</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#5B6165]">
              Módulo GIS para visualizar KPIs de espacio, cobertura vegetal y ecosistema territorial.
            </p>
          </div>
          <div className="flex items-center justify-center rounded-[24px] bg-[#EBE6DB] p-4">
            <div className="relative h-36 w-full rounded-[24px] bg-[#F8F1E9]">
              <div className="absolute bottom-6 left-8 h-16 w-24 bg-[#486570] [clip-path:polygon(0_100%,50%_0,100%_100%)]" />
              <div className="absolute bottom-6 left-24 h-20 w-28 bg-[#F2753D] [clip-path:polygon(0_100%,50%_0,100%_100%)]" />
              <div className="absolute right-6 top-6 h-10 w-10 rounded-full bg-[#F5B400]" />
              <div className="absolute bottom-0 left-0 h-5 w-full bg-[#D8A067]" />
            </div>
          </div>
        </div>
      </section>

      <FilterBar
        fields={biodiversityFilters}
        values={filters}
        onChange={setFilterValue}
        title="FILTROS TMIX"
        description="Selección para visualización del contexto analítico"
      />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#362F32]">Indicadores clave</h2>
          <p className="mt-1 text-sm text-[#5B6165]">Actualizado el 5 jun 2026 · Fuente oficial TMIX</p>
        </div>
        <div className="rounded-full border border-[#F2753D]/30 bg-[#FFF1E7] px-4 py-2 text-sm font-semibold text-[#C75A2E]">
          ● 3 alertas activas
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
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
        <div className="rounded-[26px] border border-[#D7CCC1] bg-[#FFF9F1] p-5 shadow-soft backdrop-blur md:col-span-2 xl:col-span-1">
          <p className="text-sm text-[#5B6165]">Capas activas</p>
          <p className="mt-3 text-3xl font-semibold text-[#362F32]">{metricCount}</p>
          <p className="mt-3 text-sm leading-6 text-[#5B6165]">Indicadores activos para TNFD / naturaleza.</p>
        </div>
      </section>

      <div className="h-1 rounded-full bg-[linear-gradient(90deg,#EC1B91_0%,#EC1B91_18%,#F2753D_18%,#F2753D_38%,#F5B400_38%,#F5B400_58%,#9EA900_58%,#9EA900_78%,#392448_78%,#392448_100%)]" />

      <BiodiversityMap />

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Riqueza de especies por campaña" description="Serie temporal de diversidad registrada.">
          <LineChart
            data={view.rows
              .filter((row) => row.kpi === "Riqueza de especies")
              .sort((left, right) => Number(left.campaign) - Number(right.campaign))
              .map((row) => ({ month: row.campaign, species: row.value }))}
            xKey="month"
            series={[{ key: "species", name: "Especies" }]}
          />
        </ChartCard>
        <ChartCard title="Cobertura vegetal por formación" description="Superficie simulada por comunidad vegetal.">
          <BarChart data={vegetationCoverageData} xKey="type" series={[{ key: "hectares", name: "Hectáreas" }]} />
        </ChartCard>
        <ChartCard title="Estado ecosistémico por zona" description="Distribución de condiciones ecológicas.">
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

      <section className="rounded-[28px] border border-[#D7CCC1] bg-[#FFF9F1] p-5 shadow-soft backdrop-blur">
        <h3 className="text-base font-semibold text-[#362F32]">Tabla de monitoreo territorial</h3>
        <p className="mt-1 text-sm text-[#5B6165]">Consolidado base para trazabilidad ambiental y seguimiento de riesgos de naturaleza.</p>
        <div className="mt-4">
          <BiodiversityTable rows={view.tableRows} />
        </div>
      </section>
    </div>
  );
}
